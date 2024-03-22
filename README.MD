# **搭建一个 简单的Single-SPA + React + TS主子应用**

## 项目初始化

首先根据[官方文档](https://single-spa.js.org/docs/getting-started-overview#quick-start)的步骤分别创建出主应用和子应用。

创建主应用

```jsx
npx create-single-spa --moduleType root-config
```

创建子应用

```jsx
npx create-single-spa --moduleType app-parcel
```

创建过程中需要填写组织名称，用来命名各种应用包，此处我写的是`happi`，还有**记得选择React 和Typescript**。创建好后，通过分别运行`yarn start`启动两个应用。

## 注册子应用

single spa的脚手架默认加载了一个`@single-spa/welcome`的子应用：

主应用`happi-root-config.ts`

```jsx
registerApplication({
  name: '@happi/my-app',
  app: () => System.import<LifeCycles>('@happi/my-app'),
  activeWhen: ['/']
});
```

主应用`index.ejs`

```jsx
<script type="systemjs-importmap">
  {
    "imports": {
      "@happi/root-config": "//localhost:9000/happi-root-config.js",
  }
  }
</script>
```

我们试试来注册一下刚才新建的子应用，我的子应用为`my-app`，步骤如下：

在**`single-spa`**主应用中，你可以通过**`registerApplication`**函数的加载器来从远程URL动态加载子应用

### 模块映射

**`importmap`**提供了一种映射机制，告诉SystemJS如何将模块标识符（如**`react`**）解析为具体的URL。当子应用尝试导入模块时（例如，通过**`import React from 'react';`**），SystemJS会参照**`importmap`**来确定从哪个URL加载**`react`**模块。

```jsx
 <script type="systemjs-importmap">
    {
      "imports": {
        "@happi/root-config": "//localhost:9000/happi-root-config.js",
        "@happi/my-app": "//localhost:8080/happi-my-app.js",
        "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.development.js"
      }
    }
  </script>
```

### 注册应用

使用`registerApplication`函数，该作用是告诉**`single-spa`**框架有哪些子应用，每个子应用的加载方式，何时激活（即何时加载和展示）这些子应用，以及提供这些子应用的生命周期钩子。

设置`activeWhen`为`['/home']`，可以发现我们把路由切换到`/home`的时候，可以看到子应用页面。
