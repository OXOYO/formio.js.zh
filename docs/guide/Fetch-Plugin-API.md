# Fetch Plugin API

Formio.js可以通过多种方式注册可挂接到请求调用的插件。

## 插件方法

### Formio.registerPlugin(plugin, [name])

向Formio.js注册插件。可以提供一个可选的name参数，以与Formio.getPlugin（）一起使用。

插件必须是一个对象，并且可以具有以下任何可选属性：

*   `priority`：插件相对于其他确定呼叫顺序的插件的优先级。数字越大优先级越高。如果未指定，则默认优先级为0。
*   `init`：向Formio注册时调用的初始化函数。它将接收全局Formio对象作为其第一个参数。
*   `deregister`：向Formio注销时调用的注销功能。它将接收全局Formio对象作为其第一个参数。

有关在插件中使用钩子的信息，请参见[下文](#plugin-hooks)。

### Formio.getPlugin(name)

返回以给定名称注册的插件。

### Formio.deregisterPlugin(plugin)

使用Formio.js取消注册插件。在插件注销之前，将调用`deregister`函数。该`plugin`参数可以是插件或注册时提供的可选名称的实例。如果插件已成功注销，则返回true；如果插件不存在，则返回false。

### Formio.events

这是一个[EventEmitter](https://nodejs.org/api/events.html) ，可以用作插件中的事件发布/订阅系统。

## 插件钩子

插件可以提供在库中不同位置调用的钩子。要在下面使用特定的钩子，请向您的插件添加与该钩子同名的函数。

以下是当前可用的钩子。

### preRequest(requestArgs)

在请求之前调用。如果返回promise，Formio.js将在开始请求之前等待其resolve。

`requestArgs` 是包含以下属性的对象：

 - `formio`: 调用请求的Formio实例。
 - `type`: 请求的资源类型（例如：form，forms，submission）。
 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。
 - `opts`: 请求配置

### request(requestArgs)

在请求之前调用，使插件有机会在发送请求之前完成请求。如果返回非空，未定义的值（或解析为一个的Promise），该值将用作请求的结果，而不是发出默认的网络请求。

只有返回值的第一高优先级将替换内容。如果优先级较高的插件返回值，则不会调用您的插件的钩子。

`requestArgs` 是包含以下属性的对象：

 - `formio`: 调用请求的Formio实例。
 - `type`: 请求的资源类型（例如：form，forms，submission）。
 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。
 - `opts`: 请求配置

### wrapRequestPromise(promise, requestArgs)

在发出请求时调用，并使插件可以访问用户发出请求时返回的promise。从此钩子返回的承诺将返回给用户。您可以使用该钩子包装原始的Promise或扩展Promise链。（您必须返回使用原始承诺的承诺，否则返回给用户的承诺将无法按预期解决）。

`promise` 是请求的承诺。

`requestArgs` 是包含以下属性的对象：

 - `formio`: 调用请求的Formio实例。
 - `type`: 请求的资源类型（例如：form，forms，submission）。
 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。
 - `opts`: 请求配置

### preStaticRequest(requestArgs)

与`preRequest`钩子相同，但用于使用全局Formio对象而不是Formio实例的请求。这包括类似功能`Formio.loadProjects()`，`Formio.availableActions()`，`Formio.currentUser()`。

`requestArgs` 是包含以下属性的对象：

 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。

### staticRequest(requestArgs)

与`request`钩子相同，但用于使用全局Formio对象而不是Formio实例的请求。这包括类似功能`Formio.loadProjects()`，`Formio.availableActions()`，`Formio.currentUser()`。

`requestArgs` 是包含以下属性的对象：

 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。

### wrapStaticRequestPromise(promise, requestArgs)

与`wrapRequestPromise`钩子相同，但用于使用全局Formio对象而不是Formio实例的请求。这包括类似功能`Formio.loadProjects()`，`Formio.availableActions()`，`Formio.currentUser()`。

`promise` 是请求的承诺。

`requestArgs` 是包含以下属性的对象：

 - `url`: 请求的网址。
 - `method`: HTTP请求方法。
 - `data`: HTTP请求正文（如果有）。

## 示例插件

此示例插件会将所有请求延迟5秒

```javascript
var DelayPlugin = {
  priority: 0,
  preRequest: function(requestArgs) {
    return new Promise(function(resolve, reject){
      setTimeout(resolve, 5000);
    })
  }
}

Formio.registerPlugin(DelayPlugin, 'delay');
// Can later access with
// Formio.getPlugin('delay')
```
