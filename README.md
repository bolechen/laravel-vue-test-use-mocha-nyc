# Integrate Mocha and Nyc code-coverage with Laravel Mix 4

在使用 Laravel + Vue 开发，做前端单元测试的时候，因为 Laravel 用的不是官方的 Vue 配置，而是用了 Laravel-Mix 这个中间件。  
导致 Vue 官方的教程跑不通，网上的资料又比较少，这里记录下踩坑过程，希望可以帮你省下时间  

Vue.js 官方的单元测试工具 `@vue/test-utils` 推荐用的组合是 Jest 或 Karma + Mocha
这里选用的方案是 Mocha，代码覆盖工具用的是 `mocha-webpack` + `nyc` 组合，相对于 Karma 来说更轻量

### 建立一个新的 Laravel 项目
```bash
$ laravel new laravel-test
```

### 安装依赖
这里用 yarn，你习惯用 npm 的话自己改下
```bash
$ yarn
$ yarn add @vue/test-utils babel-plugin-istanbul@^4.1.5 expect jsdom jsdom-global mocha@^5.0.0 mocha-webpack@^2.0.0-beta nyc@^12.0.2 -D
```
