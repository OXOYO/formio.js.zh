# 安装
要在您的应用程序中安装此库，可以使用以下内容。

```
npm install --save formiojs
```

## 完整的Developer SDK文档
要查看完整的SDK文档，请转到 [Developer SDK Documentation](https://formio.github.io/formio.js/docs/)

## 组件
然后，您可以在应用程序中包括以下主要组件。

 - [JavaScript API](https://github.com/formio/formio.js/wiki/JavaScript-API) - 此组件使您可以像这样从JavaScript应用程序轻松地与Form.io API进行通信。

    ```js
    import Formio from 'formiojs';
    let formApi = new Formio('https://examples.form.io/example');
    formApi.loadForm().then(function(form) {
      console.log(form)
    });
    ```

  - [Form Renderer](https://github.com/formio/formio.js/wiki/Form-Renderer) - 这是核心的表单呈现库，用于在您的页面内呈现Form.io JSON表单架构。

    ```js
    import FormioForm from 'formiojs/form';
    let form = new FormioForm(document.getElementById('formelement'));
    form.src = 'https://examples.form.io/example';
    ```

  - [Form Wizard](https://github.com/formio/formio.js/wiki/Form-Renderer#wizard-rendering) - 这使您可以在应用程序中呈现向导。
    ```js
    import FormioWizard from 'formiojs/wizard';
    let form = new FormioWizard(document.getElementById('formelement'));
    form.src = 'https://examples.form.io/wizard';
    ```

  - [Form Embedding](https://github.com/formio/formio.js/wiki/Form-Renderer#form-embedding) - 允许您通过包含以下单个`script`标签在应用程序中嵌入表单。

    ```html
    <script src="https://unpkg.com/formiojs@latest/dist/formio.embed.min.js?src=https://examples.form.io/example"></script>
    ```


  - [Form Utilities](https://github.com/formio/formio.js/wiki/Form-Utilities) - 这是一个实用程序javascript库，在您的应用程序中提供了一些常用的实用程序。

    ```js
    import Formio from 'formiojs';
    import FormioUtils from 'formiojs/utils';

    let form = new Formio('https://examples.form.io/example');
    form.loadForm().then((form) => {
      FormioUtils.eachComponent(form.components, (component) => {
        console.log(component);
      });
    });
    ```
