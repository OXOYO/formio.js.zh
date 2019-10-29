# 模块
Form.io Renderer允许使用许多模块，这些模块允许外部库更改此库的行为。可以提供以下模块。

*   Templates：允许您引入新的模板和CSS框架（例如Bootstrap，Semantic等）
*   Components：允许将自定义组件引入渲染器。
*   Framework：允许在加载时强制使用css框架。
*   Providers：允许为文件组件提供自定义存储提供程序（即将推出）。
*   Fetch：提供一种方法来拦截向Form.io渲染器发出的所有API请求。

## 创建一个模块
可以通过在应用程序中包含一个外部库来创建新模块，该库导出了以下结构。

```js
export default {
  framework: 'semantic', // Sets the default template to a specific framework.
  components: {
    /* List of custom components */
  },
  templates: {
    semantic: {
      /* List of templates found @ https://github.com/formio/formio.js/blob/master/src/templates/bootstrap/index.js */
    }
  },
  fetch: {
    fetchname: CustomFetchPluginClass
  }
}
```

## 注册一个模块
要将模块注册到渲染器中，必须使用`use`方法，而将Module定义传递给此方法。

**Example**
```js
import MyModule from './MyModule';
import { Formio } from 'formiojs';
Formio.use(MyModule);
```

现有模块
-----------------------
 *   Semantic UI Template: [https://github.com/formio/semantic](https://github.com/formio/semantic)
 *   Bulma Template: [https://github.com/formio/bulma](https://github.com/formio/bulma)
