# 翻译

Formio.js使用轻量级翻译模块i18n来允许用户在表单构建过程中传递翻译选项。这使用户可以控制复杂的元素，例如：动态设置表单语言，更改Form.io的默认错误消息以及允许转换我们在表单JSON定义中配置的自定义错误消息。下面的示例说明了如何在任何应用程序中利用此模块，而不考虑框架的偏好。  

## 表单构造
此示例包括一个简单的HTML，该HTML具有Form.io样式表，Core库，用于切换语言的按钮组以及div `createForm`方法，该方法将呈现表单。 

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div class="btn-group">
  <button type="button" class="btn btn-default" onclick="setLanguage('en')">English</button>
  <button type="button" class="btn btn-default" onclick="setLanguage('sp')">Español</button>
</div>
<div id="formio"></div>
```
在`createForm`方法期间，第一个参数确定在何处呈现表单。此示例`<div>`使用`formio`ID 定位HTML 元素。第二个参数直接接受表单路径（URL字符串）或表单组件。第三个参数处理表单选项，例如翻译，`readOnly`或在这种情况下为翻译。 

```ts
Formio.createForm(document.getElementById('formio'), 'https://wzddkgsfhfvtlmv.form.io/translations', {
 language: 'sp',
  i18n: {
    en: {
      'Submit': 'Complete'
    },
    sp: {
      'Submit': 'Enviar',
      'Please correct all errors before submitting.': 'Por favor, corrija todos los errores antes de enviar.',
      'My custom error message' : 'Mi mensaje de error personalizado',
      required : '{{field}} es requerido.',
      invalid_email: '{{field}} debe ser un correo electrónico válido.',
      error : 'Por favor, corrija los siguientes errores antes de enviar.',
    }
  }
}).then(function(form) {
  window.setLanguage = function(lang) {
    form.language = lang;
  };
});
```
有关表单翻译的一些注意事项。首先，可以在创建表单时设置默认语言，在此示例中，将其设置为西班牙语。其次，用户可以翻译Form.io的英语默认值。结果，可以将系统配置为符合用户需求。上面的示例会将`submit`改为`Complete`改为。最后，{{}}语法可用于获取字段值或其他字段属性，例如长度或正则表达式。 

## 表单默认设置
以下是一些有用的默认设置的列表：

```ts
{
  error : "Please fix the following errors before submitting.",
  invalid_date :"{{field}} is not a valid date."
  invalid_email : "{{field}} must be a valid email."
  invalid_regex : "{{field}} does not match the pattern {{regex}}."
  mask : "{{field}} does not match the mask."
  max : "{{field}} cannot be greater than {{max}}."
  maxLength : "{{field}} must be shorter than {{length}} characters."
  min : "{{field}} cannot be less than {{min}}."
  minLength : "{{field}} must be longer than {{length}} characters."
  next : "Next"
  pattern : "{{field}} does not match the pattern {{pattern}}"
  previous : "Previous"
  required : "{{field}} is required"
}
```
