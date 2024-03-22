# Hixtrip FE Online

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图

## 需求

1. 目前已经有`src/api/user.ts` 以及 `src/api/org.ts` 两个 API
2. 需要实现如下效果界面：

![](./docs/preview.jpg)

> 功能要求：
- 不限 ```React``` 或者 ```Vue```
- 需要拆分 `OrgTree` 以及 `UserTable` 两个组件
  - 两个组件自己维护相关的数据。
  - 体现两个组件的互相通信。
- 组织架构根据点上级节点进行查询子级节点实现异步加载。
- 用户 ```Table ``` 数据跟据点击 ```组织架构树形节点``` 以及 ```输入搜索关键字``` 查询。
  - 需要考虑防抖节流等功能点
- 风格不限
  - 示例图仅仅是效果展示，不需要完全符合。
  - 可以使用 ```UI Framework```, 如 ```ant-design```, ```element-ui```等
  - 如果不用```UI Framework```, 可以直接用原生的```<ul> <li>```, ```<table>``` 实现，不用实现相关的CSS样式, 可以加分。

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`
```json
{
  "userId": 111323290434354540545
}
```

```js
JSON.parse('{"userId": 111323290434354540545}')
```


### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

不能使用setinterval, 因为setinterval不会清除定时器队列，每重复执行1次都会导致定时器叠加，最终卡死你的网页。但是setTimeout是自带清除定时器的。
可以使用setTimeout函数来实现每隔1秒发送一次请求

```js
const axios = require('axios');
// 定义一个函数，用于向服务端发送请求
async function requestAPI() {
  try {
    const response = await axios.get('http://xxx.com');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    // 在请求完成后设置下一个定时器
    setTimeout(requestAPI, 1000);
  }
}

// 立即调用一次requestAPI函数，等待接口返回后, 然后每隔1秒再调用一次
requestAPI();

```



### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？
使用场景 全局常用的状态，比如用户登录状态、用户信息、主题等，需要在多个组件之间共享
作用: 全局共享状态，方便管理和维护,


### 为什么`ESM`与`CJS`不能兼容？

ESM (ECMAScript Modules) 和 CJS (CommonJS) 是两种不同的 JavaScript 模块系统，它们之间存在一些关键的差异，导致它们不能完全兼容：

1. **导入/导出语法**：CJS 使用 `require()` 来导入模块，`module.exports` 或 `exports` 来导出。而 ESM 使用 `import` 和 `export` 关键字。

2. **静态 vs 动态**：ESM 是静态的，这意味着所有的导入和导出必须在顶层作用域，并且在编译时就能被确定。而 CJS 是动态的，可以在运行时的任何地方调用 `require()`。

3. **异步 vs 同步**：ESM 是异步加载的，这使得它们更适合于浏览器环境，因为它们不会阻塞页面渲染。而 CJS 是同步加载的，这在服务器端环境中是可以接受的，但在浏览器中可能会导致性能问题。

4. **this 的值**：在 CJS 中，模块顶层的 `this` 是 `exports` 对象，而在 ESM 中，`this` 是 `undefined`。

5. **默认导出**：CJS 有一个明确的 `module.exports` 用于默认导出，而 ESM 则使用 `export default`。

由于这些差异，使得 ESM 和 CJS 不能直接兼容。然而，现代的 JavaScript 运行环境和打包工具，如 Node.js 和 webpack，提供了一些机制来在一定程度上实现 ESM 和 CJS 之间的互操作。
