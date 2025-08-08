class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'networkidle2' });
  }

  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async click(selector) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.waitForElement(selector);
    await this.page.type(selector, text);
  }

  async getText(selector) {
    await this.waitForElement(selector);
    return await this.page.$eval(selector, el => el.textContent.trim());
  }

  async isElementVisible(selector) {
    try {
      await this.waitForElement(selector, 2000);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;