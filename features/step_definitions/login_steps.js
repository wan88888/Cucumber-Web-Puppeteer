const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I am on the SauceDemo login page', async function () {
  await this.loginPage.navigate();
});

When('I enter valid username {string} and password {string}', async function (username, password) {
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLoginButton();
});

Then('I should be redirected to the products page', async function () {
  // 等待产品页面的关键元素出现
  await this.page.waitForSelector('#inventory_container', { timeout: 15000 });
  
  const isOnProductsPage = await this.productsPage.isOnProductsPage();
  expect(isOnProductsPage).to.be.true;
});

Then('I should see the products header', async function () {
  const isProductsPageLoaded = await this.productsPage.isProductsPageLoaded();
  expect(isProductsPageLoaded).to.be.true;
  
  const headerText = await this.productsPage.getProductsHeader();
  expect(headerText).to.equal('Products');
});