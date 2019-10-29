# Form Renderer
该库包括一个健壮的普通JavaScript表单呈现引擎，该引擎能够使用JSON模式动态生成Webforms。一个非常简单的例子如下。

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        Formio.createForm(document.getElementById('formio'), {
          components: [
            {
              type: 'textfield',
              key: 'firstName',
              label: 'First Name',
              placeholder: 'Enter your first name.',
              input: true
            },
            {
              type: 'textfield',
              key: 'lastName',
              label: 'Last Name',
              placeholder: 'Enter your last name',
              input: true
            },
            {
              type: 'button',
              action: 'submit',
              label: 'Submit',
              theme: 'primary'
            }
          ]
        });
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

您还可以将此渲染器与使用Form.io通过 ```src``` 参数生成的Forms一起使用。一个例子如下。

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
    <script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

这将在您的应用程序中呈现以下表单。

![Alt text](https://monosnap.com/file/iOZ1yB0wPntJLWQwyhdt7ucToLHEfF.png)

## Formio.createForm
此方法是工厂方法，它将根据表单的显示类型创建 ```FormioForm``` 类的实例。例如，如果您设置的形式呈现为向导，那么这个工厂将加载的形式，阅读形式的显示属性，然后创建的任何实例 ```FormioForm```，```FormioWizard``` 或 ```FormioPDF``` 基于表单的显示屏上。

## 表单嵌入
您还可以使用单行代码将此库用作表单的JavaScript嵌入。例如，要将 https://examples.form.io/example 表单嵌入到您的应用程序中，您只需使用以下嵌入代码即可。

```html
<script src="https://unpkg.com/formiojs@latest/dist/formio.embed.min.js?src=https://examples.form.io/example"></script>
```

有关其外观和工作方式的示例，请查看以下 [Form.io Form Embedding CodePen](http://codepen.io/travist/pen/ggQOBa)

## 使用表单渲染器
通过创建 ```FormioForm``` 类的实例来利用表单渲染器。可以使用以下 ```Formio.createForm``` 方法创建此类。

```js
Formio.createForm([element], [src|form], [options]).then((form) => {

});
```

| 属性 | 描述 | 示例 |
|----------|-------------|---------|
| element | 您要在其中呈现表单的HTML DOM元素。 | document.getElementById('formio') |
| src\|form | 表单的URL或表单JSON对象 |  |
| options | 更改渲染行为的选项。 | 见下文 |

### 选项
以下选项可用，并且可以按以下方式提供给渲染器。

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
});
```

| 属性 | 描述 | 默认 |
|--------|-------------|---------|
| readOnly | 如果表单应呈现为禁用状态（只读） | false |
| noAlerts | 如果表单不应该在表单顶部呈现警报对话框。传递“ true”以禁用。 | false |
| i18n | 您要提供给渲染器的翻译实例。 | See [this file](https://github.com/formio/formio.js/blob/master/src/locals/en.js) for an example. |
| template | 提供一种连接到每个元素的渲染的方式。 | See [templating section]() |
| hooks | 一个对象，描述了应用于表单的钩子。请参阅下面的钩子部分。 |
| inputsOnly | 如果您只想显示输入而没有标签等。 | false |

以下选项仅在基于向导的表单上可用。

| 属性 | 描述 | 默认 |
|--------|-------------|---------|
| buttonSettings.showCancel | 如果应该显示取消按钮 | true |
| buttonSettings.showNext| 如果应该显示下一个按钮 | true |
| buttonSettings.showPrevious | 如果应该显示上一个按钮	 | true |
| breadcrumbSettings.clickable | 如果面包屑栏是可单击的 | true |

## 渲染表单
有两种渲染表单的方法。通过向表单提供JSON模式，或向对象提供Form.io嵌入URL。这两个工作如下。

### 渲染JSON模式表单
```js
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
});
```

### 从[Form.io](https://form.io)渲染一个表单
```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
```

## 设置提交
渲染表单后，接下来要做的就是设置表单的提交。可以使用 ```submission``` 表单渲染器的属性来完成此操作。

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then(function(form) {
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    }
  };
});
```

您还可以通过在表单渲染器上设置 ```readOnly``` 属性，将其设为“只读”提交视图。

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
}).then(function(form) {
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    }
  };
});
```

## 实例方法
创建表单后，它将创建 ```FormioForm``` 类的实例。然后可以在该表单上使用以下方法。

| 方法 | 描述 | 示例 |
|--------|-------------|---------|
| setForm | 设置表单JSON | form.setForm({components:[....]}) |
| reset | 重置提交对象，将所有字段重置为默认值或为空。 | form.reset() |
| render | 渲染或重新渲染表单 | form.render() |
| setAlert | 将新警报添加到表单。设置为false以清除 | form.setAlert('danger', 'This is an alert!') |
| showErrors | 在警报框中显示表单的所有错误。 | form.showErrors() |
| on | 注册表单渲染器中触发的事件。 | form.on('error', () => {}); |
| submit | 提交表单。 | form.submit() |

## 事件
表单渲染器的另一个主要元素是在表单渲染器中注册触发事件。例如，您可能希望注册该`error`事件并在您的应用程序中进行处理。或者，您可能希望知道用户何时提交表单，以便您可以在应用程序中处理提交对象。这使用事件系统来通知您的应用程序某些事件的发生。例如，您可以执行以下操作来处理表单的提交和错误。

```ts
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
}).then(function(form) {
  form.on('submit', (submission) => {
    console.log('The form was just submitted!!!');
  });
  form.on('error', (errors) => {
    console.log('We have errors!');
  })
});
```

以下事件可用。

| 事件 | 描述 | 值 |
|-------|-------------|-------|
| submit | 该表单刚刚提交。如果`src`提供了，则将包含保存的提交，如果`form`提供了，则这将只是JSON提交对象。 | 提交的价值 |
| error | 发生错误事件。 | 表单中触发的错误数组。 |
| submitDone | 仅当它是保存的提交时才触发。 | 保存的提交值。 |
| change | 在表单中进行的每个更改都会触发。 | 更改内容的组成部分和价值。 |
| render | 表单渲染完成后触发。 | 表单已呈现并准备就绪。 |
| prevPage | 在上一页中导航时在向导中触发 | 页面信息 |
| nextPage | 在导航下一页时在向导中触发 | 页面信息 |

## 钩子
钩子允许您更改表单的行为并阻止某些功能的执行，以提供自己的逻辑。一个很好的例子是提供一个`beforeSubmit`钩子，您可以在其中阻止提交，更改提交甚至执行自己的验证。像这样，每个钩子都是使用渲染器的选项提供的。

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeSubmit: (submission, next) => {
      // Alter the submission
      submission.data.email = 'me@example.com';
      
      // Only call next when we are ready.
      next();
    }
  }
})
```

这是渲染器中所有可用钩子的列表。

### beforeSubmit(submission, next)
允许您在向服务器进行提交之前挂接到提交处理程序。每个参数描述如下。

| 参数 | 描述 |
|-------|-------------|
| submission | 将要提交到服务器的提交数据对象。这使您可以实时更改提交数据对象。 |
| next | `beforeSubmit`处理程序执行完毕时调用。如果您在没有任何参数的情况下调用此方法，例如`next()`，则意味着不应将任何错误添加到默认表单验证中。如果要引入自己的自定义错误，则可以使用单个错误对象或一系列错误来调用此方法，例如下面的示例。 |

#### beforeSubmit: Custom Errors
向提交处理程序提供您自己的自定义错误是非常常见的用例。为此，您可以`next`使用单个错误对象或希望引入错误处理程序的错误数组来调用回调。这是一个如何引入一些自定义错误的示例。

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeSubmit: (submission, next) => {
      // Make a custom ajax call.
      $.ajax({
        url: 'https://myserver.com/validate',
        method: 'POST',
        data: submission,
        complete: (errors) => {
          let submitErrors = null;
          if (errors) {
            submitErrors = [];
            errors.forEach((error) => {
              submitErrors.push({
                message: error.toString()
              });
            });
          }
          next(submitErrors);
        }
      });
    }
  }
})
```

### beforeNext(currentPage, submission, next)
允许您在切换到下一页之前进入提交处理程序。每个参数描述如下。

| 参数 | 描述 |
|-------|-------------|
| currentPage | 当前页面数据对象。这使您可以将页面数据用于每个页面上的提交。 |
| submission | 将要提交到服务器的提交数据对象。这使您可以实时更改提交数据对象。 |
| next | `beforeNext`处理程序执行完毕时调用。如果您在没有任何参数的情况下调用此方法，例如`next()`，则意味着不应将任何错误添加到默认表单验证中。如果要引入自己的自定义错误，则可以使用单个错误对象或一系列错误来调用此方法，例如下面的示例。 |

#### beforeNext: Custom Errors
在用户切换到下一页之前，向提交处理程序提供您自己的自定义错误是非常常见的用例。为此，您可以`next`使用单个错误对象或希望引入错误处理程序的错误数组来调用回调。这是一个如何引入一些自定义错误的示例。

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeNext: (currentPage, submission, next) => {
      // Make a custom ajax call.
      $.ajax({
        url: 'https://myserver.com/validate',
        method: 'POST',
        data: submission,
        complete: (errors) => {
          let submitErrors = null;
          if (errors) {
            submitErrors = [];
            errors.forEach((error) => {
              submitErrors.push({
                message: error.toString()
              });
            });
          }
          next(submitErrors);
        }
      });
    }
  }
})
```
