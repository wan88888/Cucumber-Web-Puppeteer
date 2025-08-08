const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.page = null;
    this.loginPage = null;
    this.productsPage = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: process.env.CI ? "new" : false, // CI环境使用无头模式，本地开发可视化
      slowMo: 50,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // 避免CI环境内存问题
        '--disable-gpu',
        '--start-maximized' // 启动时最大化窗口
      ]
    });
    
    // 获取浏览器默认页面而不是创建新页面，避免多个标签页
    const pages = await this.browser.pages();
    this.page = pages[0]; // 使用默认的第一个页面
    
    // 设置视口为全屏
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // 初始化页面对象
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async takeScreenshot(scenarioName) {
    if (this.page) {
      // 确保screenshots目录存在
      const screenshotsDir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      // 生成截图文件名
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.png`;
      const screenshotPath = path.join(screenshotsDir, filename);
      
      // 截图
      await this.page.screenshot({ 
        path: screenshotPath, 
        fullPage: true 
      });
      
      console.log(`截图已保存: ${screenshotPath}`);
      return screenshotPath;
    }
  }
}

setWorldConstructor(CustomWorld);

Before(async function() {
  await this.init();
});

After(async function(scenario) {
  // 如果测试失败，进行截图
  if (scenario.result.status === 'FAILED') {
    console.log(`测试场景失败: ${scenario.pickle.name}`);
    try {
      await this.takeScreenshot(scenario.pickle.name);
    } catch (error) {
      console.error('截图失败:', error.message);
    }
  }
  
  await this.cleanup();
});