# Form Utilities

## 用法
这是在应用程序中使用此库的方法

```js
import Formio from 'formiojs';
import FormioUtils from 'formiojs/utils';

let formio = new Formio('https://examples.form.io/example');
formio.loadForm().then((form) => {
  FormioUtils.eachComponent(form.components, (component) => {
    console.log(component);
  });
});
```

## 功能

### eachComponent(components, fn, includeAll, path)

调用`fn(component)`中的每个组件`components`，以说明嵌套的布局组件。（除非includeAll为true，否则不调用布局组件本身）。

调用中的每个组件，以说明嵌套的布局组件。（除非includeAll为true，否则不调用布局组件本身）。

```javascript
var utils = require('formiojs/utils');
utils.eachComponent(form.components, function(component) {
  // Do something...
})
```

### getComponent(components, key)

返回具有给定`key`或未定义的组件（如果找不到）。

```javascript
var utils = require('formiojs/utils');
var component = utils.getComponent(form.components, 'myKey');
```

### findComponents(components, query)
返回与查找查询条件匹配的组件数组。此查询与MongoDB非常相似，在MongoDB中，如果希望查找嵌套查询，则可以使用点表示法将键提供为属性的路径。这是一个例子。

```javascript
// Find all textfields with a specific custom property.
var utils = require('formiojs/utils');
var comps = utils.findComponents(form.components, {
  'type': 'textfield',
  'properties.objectId': '2345'
});

// Should return all textfield components with 'properties.objectId' = '2345'.
console.log(comps);
```

### flattenComponents(components, includeAll)

返回一个键值对象，其中键是其中每个组件的键`components`，每个键都指向相应的组件。这也包括嵌套的组件。如果要包含布局组件，请为includeAll传递true。

```javascript
var utils = require('formiojs/utils');
var flattened = utils.flattenComponents(form.components);
console.log(flattened['myNestedComponent']);
```

### isLayoutComponent(component)

确定组件是否为布局组件。

```javascript
var utils = require('formiojs/utils');
var layoutComponent = utils.isLayoutComponent(form.components[0]);
console.log(layoutComponent);
```

### getValue(submission, componentKey)

从给定的提交中获取组件API密钥的值。递归地搜索提交中的密钥。

```javascript
var utils = require('formiojs/utils');
var value = utils.getValue(submission, 'myComponent'); // The value or undefined.
```

### parseFloat(value)

标准[parseFloat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) 函数的扩展，该函数还清除输入字符串。
对于[Currency component](https://help.form.io/userguide/form-components/#currency) 很有用。

```javascript
utils.parseFloat('12,345,678.90'); // -> 12345678.90
```

### formatAsCurrency(value)

以[Currency component](https://help.form.io/userguide/form-components/#currency) 使用方式格式化提供的值。

```javascript
utils.formatAsCurrency(123.4); // -> '123.40'
utils.formatAsCurrency(12345678.9); // -> '12,345,678.90'
utils.formatAsCurrency(12345678.915); // -> '12,345,678.92'
utils.formatAsCurrency('12345678.915'); // -> '12,345,678.92'
```

### escapeRegExCharacters(value)

在提供的String值中转义RegEx字符。

```javascript
utils.escapeRegExCharacters('[form.io](https://form.io/)'); // -> '\[form\.io\]\(https:\/\/form\.io\)'
```
