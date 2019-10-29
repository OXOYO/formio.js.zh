# 覆盖定界符和十进制分隔符

Formio.js使用浏览器的语言环境设置，将分隔符和十进制分隔符放置在“Currency 和 Number 组件”中。这使浏览器可以根据语言控制定界符，有时浏览器未对某些语言进行正确的设置，在这种情况下，允许用户覆盖它，选择语言并将小数点分隔符和定界符传递给自我形成。下一个示例显示如何覆盖货币和数字成分的浏览器区域设置。

## 创建表单
该示例包括一个简单的HTML，该HTML具有Form.io样式表，Core库和div其中方法将呈现表单的HTML 。`createForm`方法将呈现表单。

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```
在`createForm`方法期间，第一个参数确定在何处呈现表单。此示例`<div>`使用`formio`ID 定位HTML 元素。第二个参数直接接受表单路径（URL字符串）或表单组件。第三个参数处理表单选项，例如，`readOnly`在本例中为languageOverride属性。 

```ts
Formio.createForm(document.getElementById('formio'), 'https://nyycarismsxlmbj.form.io/overridelanguage', {
 languageOverride: {
   'en-US': {
    decimalSeparator: '.',
    delimiter: ','
   }
 }
}).then(function(form) {
  // On form submit check the submission.
  form.on('submit', function(ev, submission){
    console.log(submission);
  })
});
```
请注意，在美国英语中，定界符为（“,”），十进制分隔符为（“.”），这意味着在languageOverride之前必须将10000.00显示为10,000.00。

在languageOverride之后，因为我们已作为languageOverride属性传递并更改了定界符和小数点分隔符，所以应显示10000.00 10.000,00。
