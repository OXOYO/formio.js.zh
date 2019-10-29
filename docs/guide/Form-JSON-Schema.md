# 表单JSON模式

在Form.io平台内呈现的所有表单都是通过使用JSON模式完成的。该架构用于告诉渲染器如何渲染表单，还提供了一种自动生成API以支持表单的方法。除了可以在Form中呈现的所有组件之外，本文档还提供了有关Form JSON Schema结构的详细规范。

## Form JSON
Form.io中定义的每个表单都以“表单定义”开头。它描述了表单本身的属性，例如表单的显示类型，表单的类型，标题，路径等。例如，以下架构描述了一个名为**Registration**的表单向导。

```json
{
  "title": "Registration",
  "name": "registration",
  "path": "register",
  "type": "form",
  "display": "wizard",
  "components": [...]
}
```

还有更多可以定义的属性，定义如下。

| 属性 | 描述 | 值 | 示例 |
|----------|-------------|--------|---------|
| title | 表单标题 | any `string` | `Registration` |
| name | 表单的API名称。必须是用作人类可读标识符的驼峰式标识符。 | any `string` | `registration` |
| path | 表单的URL路径。这是相对于Project API的 base URL的，它可以包含嵌套路径，例如“user/login”。| any `string` | 对于以下表单 https://examples.form.io/user/login, 此项目的 base URL为 "https://examples.form.io"， **path** 是 ```user/login``` |
| type | This is the type of form that is defined. Currently, there are just two types, ```resource``` and ```form```. Resources are special kinds of forms that serve as data structures that can be pulled into other forms through the resource component | `form` or `resource` | `form` |
| display | The display configuration for this form, where each display interprets the JSON schema differently. For example, the `wizard` display turns any root `Panel` component into a separate page within a wizard workflow. | `form`, `wizard`, `pdf` | `form` |
| components | An array of form components where each component is defined through a separate Schema definition described in the Components Schema section. | Array of JSON components | See [Components JSON section](https://github.com/formio/formio.js/wiki/Components-JSON-Schema) |
| _id | The unique identifier for this form object | uuid `string` | `59514e15ef644f006d512dc1` |
| modified | The modified date where this form schema was modified | ISO-8601 Date String | `2017-06-29T19:24:08.891Z` |
| created | The created date when this form was created | ISO-8601 Date String | `2017-06-29T19:24:08.891Z` |
| action | A custom URL to send the `POST` and `PUT` submission data to. | URL `string` | `https://yourdomain.com/submission/api` |
| tags | An array of free-form tags that are assigned to this form. This is useful for categorization of the forms. | Array of any `string` | `["standard", "user"]` |
| machineName | A project unique identifier for this form, which allows for seamless migration into other projects and deployments into other environments. | `string` in the format `[project id]:[form name]` | `jawjclewrjglla:benefitsEnrollment` |
| project | For forms hosted on https://form.io, this is the Project ID which contains this form. | Project ID | `59514e10ef644f006d512db9` |
| owner | The user who was authenticated (using the `x-jwt-token` header), that created this form. | Submission ID of the authenticated user | `59514e10ef644f006d512db9` |
| access | An array of role-permission mappings that assign roles to certain permissions to **form** schema. | Array of Role-Permission Schema | See [Role-Permission Schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema#role-permission-schema) |
| submissionAccess | An array of role-permission mappings that assign roles to certain permissions to **submissions** of this form. | Array of Role-Permission Schema | See [Role-Permission Schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema#role-permission-schema) |

### 角色权限架构
确定谁有权访问Form.io平台内某些操作的架构使用Role-Permission架构，如下所示。

| Property | Description | Value |
|----------|-------------|--------|
| type | The type of permission the roles have been assigned. | ```create_own```, ```create_all```, ```read_own```, ```read_all```, ```edit_own```, ```edit_all```, ```delete_own```, ```delete_all``` |
| roles | An array of Role IDs that are assigned to this role-permission type. | An array of Role ID's |
