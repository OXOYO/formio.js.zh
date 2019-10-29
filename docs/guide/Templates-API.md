# 模板

> 此功能是4.x分支中的新增功能。如果您使用的是3.x分支，我们建议您进行升级以获得此新功能。

## 简介
formio.js库（和相应的框架库）的4.x分支具有一些重要的增强和改进。此页面将概述更改以及如何使用它们进一步自定义form.io表单。

从3.x分支更改4.x分支的主要方法有三种。

1.  **组件实例化**

在formio.js的早期版本中，仅在DOM中可见组件时才实例化组件。在4.x及更高版本中，所有组件都将被实例化，无论它们是否可见。这对于设置初始值，隐藏时计算以及对隐藏组件运行验证非常重要。它还可以极大地清理表，数据网格和选项卡等更复杂的组件。

1.  **组件生命周期**

在早期版本的formio.js中，组件只有一个生命周期功能，即build方法。每当将组件添加到DOM并期望初始化该组件，将DOM元素添加到根元素（通常使用`this.ce()`）并将所有事件附加到dom元素时，就会触发此操作。这是一个非常静态的过程，其中函数将逐个元素构建组件元素的所有DOM元素，然后将其手动添加到DOM中。此外，更改DOM或将动作附加到DOM元素的逻辑与渲染过程完全混合在一起。最终结果是组件具有静态布局。从理论上讲，可以通过覆盖构建方法来覆盖呈现的DOM，但实际上，它实际上涉及创建一个全新的组件。

现在，在4.x分支中，生命周期分为三个阶段。这些是init，render和attach。实例化组件时运行init。除非调用重建，否则它将不会再次运行。然后调用render方法，该方法应返回代表整个组件的html字符串。然后将此字符串添加到DOM中，并返回对该组件的根DOM元素的引用。最后，将调用attach方法并将引用传递给根DOM元素。期望attach方法可以找到DOM的相关部分并将事件和逻辑附加到它们。当需要更改DOM的呈现方式时，例如要隐藏某个组件，则在该组件上设置一个隐藏标志，然后重新绘制它。组件本身不需要隐藏。

1.  **CSS框架模板和自定义模板。**

由于我们现在具有适当的呈现层，因此我们现在支持其他CSS框架进行引导。特别是，我们具有引导程序3，引导程序4，语义UI，并且正计划增加对Materialize（通用Material UI框架）的支持。现在，您可以选择要在其中呈现表单的CSS Framework模板，并相应地应用不同的CSS。此外，您甚至可以通过表单自定义html输出，以修改组件的呈现方式。

## 设置CSS框架

设置应用程序时，可以选择要将输出呈现到的CSS Framework。Form.io当前支持以下框架：

*   Bootstrap 3 (bootstrap3)
*   Bootstrap 4 (bootstrap)
*   Semantic UI (semantic)
*   Other - 与我们联系以帮助实现其他框架！

当前默认模板是Bootstrap 4，因此，如果您要使用它，则无需执行其他任何操作。为了切换到其他框架，您需要全局设置它，以便渲染器将使用框架的模板。

```javascript
import { Templates } from 'formiojs';

Templates.framework = 'semantic';
```

如果使用的是框架包装器，则应从该包装器而不是formio.js导入模板，以便它也将应用于包装器内的Formio实例。例如，如果您正在使用`react-formio`，则应执行以下操作：

```javascript
import { Templates } from 'react-formio';

Templates.framework = 'semantic';
```

## 插件注册
模板也可以通过插件系统注册，该系统向渲染器提供了一个外部模板。有关如何完成此操作的示例，请参见 [https://github.com/formio/semantic](https://github.com/formio/semantic)


## 覆盖模板

除了设置全局CSS框架外，您还可以覆盖该框架内的特定模板。这样，即使组件继续发挥相同的功能，也可以更改组件的html输出。为此，只需在`Templates`对象上设置模板，渲染器便会开始使用它。

您可以通过以下两种方法之一来执行此操作。首先，通过设置多个模板：

```javascript
Templates.current = {
  input: {
    form: '<div>My custom template</div>'
  },
  html: {
    form: '<div>My other custom template</div>'
  }
};
```

或单独：

```javascript
Templates.setTemplate('input', {
  form: '<div>My custom template</div>'
});
```

### 特定模板
模板可以由多个组件共享。例如，许多组件使用`input`模板来呈现html输入元素。有时您可能只想为某些组件而不是所有组件覆盖它。您可以通过设置模板名称以包括特定信息来执行此操作。这可以是组件类型，也可以是组件属性名称（API密钥）。您甚至都可以做。渲染器将​​按此顺序搜索第一个匹配项，以确定要选择的组件：

```javascript
`${templateName}-${component.type}-${component.key}`,
`${templateName}-${component.type}`,
`${templateName}-${component.key}`,
`${templateName}`,
```

如果您为“input-number”设置模板，它将仅覆盖number组件的input模板。如果您为“input-number-total”设置模板，则只会覆盖属性名称为“total”的number组件的input模板；

### 渲染模式
除了模板之外，还有一些渲染模式允许相同组件的不同表示。默认模式是`form`将所有组件呈现为表单组件。另一个常见的模式是\`\`html''，它将只呈现组件的html表示形式，而没有诸如输入之类的任何表单元素。这对于显示数据很有用。

内置的渲染模式为：
 - form - 默认渲染以表单形式呈现。
 - html - 将数据呈现为通用html，而不是表单。
 - flat - 与表单相似，但是会扁平化倾向于隐藏数据的选项卡和向导等组件。
 - builder - 组件的构建器视图（在表单构建器之外不经常使用）。

要设置渲染模式，请在实例化表单时在选项上进行设置。

```javascript
import { Form } from 'formiojs';

const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example', {
  renderMode: 'html'
});
```

您甚至可以创建自己的渲染模式，并将其与表单一起使用。

```javascript
import { Form, Templates } from 'formiojs';

Templates.current = {
  input: {
    foo: '<div>bar</div>'
  }
};

const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example', {
  renderMode: 'foo'
});
```

## 自定义组件模板
您可以使用相同的生命周期方法创建自定义组件。

可以在[https://github.com/formio/react-app-starterkit/blob/master/src/components/CheckMatrix.js](https://github.com/formio/react-app-starterkit/blob/master/src/components/CheckMatrix.js)中找到一个示例

### 引用
使用form.io模板功能，底层DOM结构可以非常不同，甚至完全是自定义的。因此，将事件添加到DOM需要能够找到DOM的正确部分以添加事件。为此，formio.js库用于`refs`引用DOM的各个部分。然后可以选择它们，而不管它们在DOM中的位置。

渲染模板时，可以使用ref属性设置参考字符串。然后，在附加阶段，您可以获取具有该引用的所有DOM元素，无论它们位于何处。为了简化此操作，formio.js具有“ loadRefs”功能，该功能可以查找所有引用并将其添加到中`this.refs`。

```
import { Templates, Components, Component } from 'formiojs';

Templates.addTemplate('mytemplate', {
    form: `
<div>
  <div ref="myref">
    {{ ctx.foo }}
    <div ref="mychild">1</div>
    <div ref="mychild">2</div>
    <div ref="mychild">3</div>
  </div>
</div>
`
});

class MyComponent extends Component {
  init() {
    // Init tasks here.
  }

  render() {
    // By calling super.render, it wraps in component wrappers.
    return super.render(this.renderTemplate('mytemplate', {
        foo: 'bar',
        data: 'these are available in the template'
    }));
  }

  attach(element) {
    this.loadRefs(element, {
      myref: 'single',
      mychild: 'multiple',
    });

    this.refs.myref; // This will be either null or the div with "myref" set on it.
    this.refs.mychild; // This will be either null or an array of divs with "mychild" set on them.
  }

  detach() {
    // Called on redraw or rebuild. The opposite of attach.
  }

  destroy() {
    // Called on rebuild. The opposite of init.
  }
}

Components.addComponent('mycomponent', MyComponent);
```

### 布局组件引用

布局组件可以在其中包含其他组件，包括相同类型的其他组件。因此，请注意布局组件中的引用，并确保将组件ID附加到每个键上。这样，loadRefs仅选择该组件的引用，而不选择任何嵌套的组件。

## 服务器端渲染

4.x分支的目标之一是使formio.js渲染器与服务器端渲染兼容。尽管由于所做的更改，它应该与此兼容，但是我们还没有机会对其进行全面测试。我们非常欢迎在测试中提供帮助。

这是设计工作方式的方法：

在服务器端：
```javascript
import { Form } from 'formiojs';

// Instead of a URL, you can also use a form definition JSON instead.
const form = new Form('https://examples.form.io/example');
form.ready.then(function(instance) {
  const html = instance.render();
  // At this point you can put the html in the page.
});
```

在客户端：
```javascript
import { Form } from 'formiojs';

const form = new Form('https://examples.form.io/example');
// Find the DOM element wherever it is.
const element = document.getElementById('formio');
form.ready.then(function(instance) {
  instance.attach(element);
});
```

我们欢迎您就如何改进此过程提供反馈。如果有任何帮助或建议，请与支持人员联系。
