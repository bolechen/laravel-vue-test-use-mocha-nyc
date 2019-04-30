# Integrate Mocha and Nyc code-coverage with Laravel Mix 4

在使用 Laravel + Vue 开发，做前端单元测试的时候，因为 Laravel 用的不是官方的 Vue 配置，而是用了 Laravel-Mix 这个中间件。
导致 Vue 官方的教程跑不通，网上的资料又比较少，这里记录下踩坑过程，希望可以帮你省下时间。  

Vue.js 官方的单元测试工具 `@vue/test-utils` 推荐用的组合是 Jest 或 Karma + Mocha。
这里选用的方案是 Mocha，代码覆盖工具用的是 `mocha-webpack` + `nyc` 组合，相对于 Karma 要安装一个虚拟浏览器来说更轻量。  

### 建立一个新的 Laravel 项目
```bash
$ laravel new laravel-test
```

### 安装依赖
这里用 yarn，你习惯用 npm 的话自己改下，下面有指定版本的不能随意改，不然的话会导致依赖不正确，跑不起来
```bash
$ yarn
$ yarn add @vue/test-utils babel-plugin-istanbul@^4.1.5 expect jsdom jsdom-global mocha@^5.0.0 mocha-webpack@^2.0.0-beta nyc@^12.0.2 -D
```

## 修改 package.json
scripts 部分增加两行 test 用
```
    "scripts": {
        //...
        "test": "cross-env NODE_ENV=test mocha-webpack --webpack-config=node_modules/laravel-mix/setup/webpack.config.js --require tests/Vue/setup.js tests/Vue/**/*.spec.js",
        "test-with-coverage": "cross-env NODE_ENV=test nyc --reporter=lcov --reporter=text npm run test"
    },
 ```

末尾增加一节 nyc 的配置，设置默认要进行测试代码覆盖的文件
```
"nyc": {
    "include": [
        "resources/js/**/*.(js|vue)"
    ],
    "instrument": false,
    "sourceMap": false
}
```

## 创建测试目录及初步配置
根据 Laravel 的目录规则，所有测试文件放在 tests 目录下，我们新建一个 Vue 目录来放前端相应的测试文件
```bash
$ mkdir -p tests/Vue/Unit
```

测试脚本需要一个入口，设置初始变量，我们放在 tests/Vue/setup.js 下，具体内容可以直接看 repo，这里不贴了

## 建立第一个测试文件
Vue 所有单测，我们放在 Vue/Unit 目录下，上面 `package.json` 增加的脚本中有写路径，如果你没有放在这个位置，上面脚本路径需要对应修改
```javascript
import { shallowMount } from '@vue/test-utils'
import ExampleComponent from '../../../resources/js/components/ExampleComponent.vue'

describe('ExampleComponent.vue', () => {
    it('my first test', () => {
        const wrapper = shallowMount(ExampleComponent)
        expect(wrapper.html()).toContain('I\'m an example component.')
    })

    it('my second test', () => {
        const wrapper = shallowMount(ExampleComponent)
        expect(wrapper.contains('div.card-body')).toBe(true)
    })
})
```

## 这个时候就可以跑了
```bash
$ yarn test
```

## 增加代码覆盖测试
需要用到 `babel-plugin-istanbul` 这个插件，项目根目录下建一个 `.babelrc` 文件
```javascript
{
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
}
```
这时再运行
```bash
$ yarn test-with-coverage
```
出现下图就代表成功了，同时在根目录 `coverage/lcov-report/` 下会生成一份 html 版本的报告，可以更详细的看到结果

## All Done




