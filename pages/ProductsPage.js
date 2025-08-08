const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      productsHeader: '.title',
      inventoryContainer: '#inventory_container',
      menuButton: '#react-burger-menu-btn',
      logoutLink: '#logout_sidebar_link'
    };
  }

  async getProductsHeader() {
    return await this.getText(this.selectors.productsHeader);
  }

  async isProductsPageLoaded() {
    return await this.isElementVisible(this.selectors.inventoryContainer);
  }

  async isOnProductsPage() {
    const url = await this.getCurrentUrl();
    return url.includes('/inventory.html');
  }

  async logout() {
    await this.click(this.selectors.menuButton);
    await this.click(this.selectors.logoutLink);
  }
}

module.exports = ProductsPage;