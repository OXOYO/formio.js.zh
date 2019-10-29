# 组件JSON模式
可以在表单中呈现的每个组件还遵循一个JSON模式定义，该定义用于描述该组件在表单中的行为。表单中呈现的每个组件都共享一个公共模式，该模式用于表示在表单中呈现的组件。这是所有组件共享的通用参数

### 常用参数
| Property | Description | Value | Required | Default |
|----------|-------------|-------|----------|---------|
| type | The type of component | `address` | yes | `address` |
| key | The API key for this field. | any `string` | yes |  |
| label | The HTML label to give this component | any `string` | no |  |
| placeholder | The text to show in the input before they type. | any `string` | no |  |
| input | Determines if this is an input from the user. | `true` or `false` | yes | `true` |
| tableView | Determines if this field will show in the data tables output. | `true` or `false` | no | `true` |
| multiple | If this field should collect multiple values, creating an array of values. | `true` or `false` | no | `false` |
| protected | If the value of this field should be shown to the end user via API once it is saved. | `true` or `false` | no | `false` |
| prefix | The prefix text to put in front of the input | Any ```string``` | no | |
| suffix | The suffix text to put after the input | Any ```string``` | no | |
| defaultValue | The default value to provide to this component. | Depends based on the component | no | |
| clearOnHide | If the value of this field should be cleared when it is conditionally hidden. | `true` or `false` | no | `true` |
| unique | Validates if this field should be unique amongst other submissions in the same form. | `true` or `false` | no | `false` |
| persistent | Determines if the value of this field should be saved as persistent. | `true` or `false` | no | `true` |
| hidden | Determines if this field should be hidden from view by default. This can be overridden with the conditionals. | `true` or `false` | no | `false` |
| validate | Determines validation criteria for this component | Object with the following properties. <ul><li><strong>required</strong> - If the field is required</li><li><strong>minLength</strong> - For text input, this checks the minimum length of text for valid input</li><li><strong>maxLength</strong> - For text inputs, this checks the maximum length of text for valid input</li><li><strong>pattern</strong> - For text input, this checks the text agains a Regular expression pattern.</li><li><strong>custom</strong> - A custom javascript based validation or a JSON object for using JSON Logic</li></ul> | no | `{required: false}` |
| conditional | Determines when this component should be added to the form for both processing and input. | Object with the following properties. <ul><li><strong>show</strong> - If the field should show if the condition is true</li><li><strong>when</strong> - The field API key that it should compare its value against to determine if the condition is triggered.</li><li><strong>eq</strong> - The value that should be checked against the comparison component</li><li><strong>json</strong> - The [JSON Logic](http://jsonlogic.com/) to determine if this component is conditionally available.</li></ul> | no | |
| errors | Allows customizable errors to be displayed for each component when an error occurs. This is an object with the following keys <ul><li>required</li><li>min</li><li>max</li><li>minLength</li><li>maxLength</li><li>invalid_email</li><li>invalid_date</li><li>pattern</li><li>custom</li></ul> | An object where the keys are provided in previous cell, and the values are the strings you wish to display. Each string has the **<span v-pre>{{ field }}</span>** to use within the string. Example. <span v-pre>`{"required": "{{ field }} is required. Try again."}`</span> | no |
| logic | Allows changing the component definition in reaction to data entered in a form. For example, changing a field to required, disabled or hidden when a value is entered. | An array of instances of the [Field Logic Schema](https://github.com/formio/formio.js/wiki/Field-Logic-Schema) | no ||


以下是所有表单组件的列表以及每个组件的JSON模式规范。允许以下组件。

* [Address](https://github.com/formio/formio.js/wiki/Address-Component)
* [Button](https://github.com/formio/formio.js/wiki/Button-Component)
* [Checkbox](https://github.com/formio/formio.js/wiki/Checkbox-Component)
* [Columns](https://github.com/formio/formio.js/wiki/Columns-Component)
* [Container](https://github.com/formio/formio.js/wiki/Container-Component)
* [Content](https://github.com/formio/formio.js/wiki/Content-Component)
* [Currency](https://github.com/formio/formio.js/wiki/Currency-Component)
* [Custom](https://github.com/formio/formio.js/wiki/Custom-Component)
* [DataGrid](https://github.com/formio/formio.js/wiki/DataGrid-Component)
* [DateTime](https://github.com/formio/formio.js/wiki/DateTime-Component)
* [Day](https://github.com/formio/formio.js/wiki/Day-Component)
* [Email](https://github.com/formio/formio.js/wiki/Email-Component)
* [FieldSet](https://github.com/formio/formio.js/wiki/FieldSet-Component)
* [File](https://github.com/formio/formio.js/wiki/File-Component)
* [Form](https://github.com/formio/formio.js/wiki/Form-Component)
* [Hidden](https://github.com/formio/formio.js/wiki/Hidden-Component)
* [HTML Element](https://github.com/formio/formio.js/wiki/HTML-Element-Component)
* [Number](https://github.com/formio/formio.js/wiki/Number-Component)
* [Panel](https://github.com/formio/formio.js/wiki/Panel-Component)
* [Password](https://github.com/formio/formio.js/wiki/Password-Component)
* [Phone Number](https://github.com/formio/formio.js/wiki/Phone-Number-Component)
* [Radio](https://github.com/formio/formio.js/wiki/Radio-Component)
* [Resource](https://github.com/formio/formio.js/wiki/Resource-Component)
* [Select](https://github.com/formio/formio.js/wiki/Select-Component)
* [Select Boxes](https://github.com/formio/formio.js/wiki/Selectboxes-Component)
* [Signature](https://github.com/formio/formio.js/wiki/Signature-Component)
* [Survey](https://github.com/formio/formio.js/wiki/Survey-Component)
* [Table](https://github.com/formio/formio.js/wiki/Table-Component)
* [TextArea](https://github.com/formio/formio.js/wiki/TextArea-Component)
* [TextField](https://github.com/formio/formio.js/wiki/TextField-Component)
* [Time](https://github.com/formio/formio.js/wiki/Time-Component)
* [Well](https://github.com/formio/formio.js/wiki/Well-Component)
