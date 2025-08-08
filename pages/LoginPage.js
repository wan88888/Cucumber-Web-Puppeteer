const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://www.saucedemo.com';
    this.selectors = {
      usernameInput: '#user-name',
      passwordInput: '#password',
      loginButton: '#login-button',
      errorMessage: '[data-test="error"]'
    };
  }

  async navigate() {
    await this.navigateTo(this.url);
  }

  async enterUsername(username) {
    await this.type(this.selectors.usernameInput, username);
  }

  async enterPassword(password) {
    await this.type(this.selectors.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.selectors.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    if (await this.isElementVisible(this.selectors.errorMessage)) {
      return await this.getText(this.selectors.errorMessage);
    }
    return null;
  }
}

module.exports = LoginPage;