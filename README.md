# Cucumber + Puppeteer Web自动化测试框架

基于Cucumber和Puppeteer构建的Web自动化测试框架，采用POM（Page Object Model）设计模式。

## 项目结构

```
Cucumber-Web-Puppeteer/
├── features/                    # Cucumber特性文件
│   ├── login.feature           # 登录功能测试场景
│   ├── step_definitions/       # 步骤定义
│   │   └── login_steps.js      # 登录步骤实现
│   └── support/                # 支持文件
│       └── world.js            # 测试环境配置
├── pages/                      # 页面对象模型
│   ├── BasePage.js             # 基础页面类
│   ├── LoginPage.js            # 登录页面类
│   └── ProductsPage.js         # 产品页面类
├── reports/                    # 测试报告目录
├── package.json                # 项目依赖配置
├── cucumber.js                 # Cucumber配置文件
└── README.md                   # 项目说明文档
```

## 安装依赖

```bash
npm install
```

## 运行测试

### 运行测试（控制台输出）
```bash
npm test
```

### 运行测试并生成HTML报告
```bash
npm run test:report
```

### 运行无头模式测试
```bash
npm run test:headless
```

### CI环境测试（生成HTML和JSON报告）
```bash
npm run test:ci
```

测试报告将生成在 `reports/cucumber-report.html`

## 测试场景

当前包含的测试场景：
- **登录功能测试**：使用有效凭据登录SauceDemo网站
  - 测试网站：https://www.saucedemo.com
  - 测试用户：standard_user
  - 密码：secret_sauce

## POM设计模式

项目采用Page Object Model设计模式：

- **BasePage.js**：基础页面类，包含通用的页面操作方法
- **LoginPage.js**：登录页面类，封装登录页面的元素和操作
- **ProductsPage.js**：产品页面类，封装产品页面的元素和验证

## 配置说明

- **cucumber.js**：Cucumber运行配置，包括步骤定义路径、报告格式等
- **world.js**：测试环境配置，包括浏览器启动、页面对象初始化等

## 扩展测试

要添加新的测试场景：
1. 在 `features/` 目录下创建新的 `.feature` 文件
2. 在 `features/step_definitions/` 目录下创建对应的步骤定义文件
3. 如需要，在 `pages/` 目录下创建新的页面对象类

## CI/CD 集成

项目包含 GitHub Actions 工作流配置，支持：

- **自动触发**：推送到 main/develop 分支或创建 Pull Request 时自动运行
- **Node.js 版本**：固定使用 Node.js 20.x 版本
- **失败截图**：测试失败时自动上传截图到 GitHub Artifacts
- **测试报告**：自动生成并上传 HTML 和 JSON 格式的测试报告

### GitHub Actions 工作流

工作流文件位于 `.github/workflows/test.yml`，包含以下步骤：
1. 检出代码
2. 设置 Node.js 20.x 环境
3. 安装依赖
4. 运行测试（无头模式）
5. 上传测试报告和截图

## 运行模式

- **本地开发**：默认使用可视化模式（headless: false）
- **CI环境**：自动检测 CI 环境变量，使用无头模式（headless: true）
- **手动无头模式**：使用 `npm run test:headless` 命令

## 失败截图

- 测试失败时自动截图保存到 `screenshots/` 目录
- 截图文件名包含场景名称和时间戳
- CI 环境中失败截图会自动上传到 GitHub Artifacts

## 注意事项

- 确保网络连接正常，能够访问测试网站
- Puppeteer 会自动下载所需的 Chrome 浏览器
- 本地开发时可以看到浏览器窗口，CI 环境使用无头模式