# JavaScript API
JavaScript API是一个简约的API库，可让您在JavaScript中使用Form.io API。

## 用法
创建Formio的实例很简单，并且仅采用路径（URL字符串）。路径可能不同，具体取决于所需的输出。Formio实例还可以访问更高级别的操作，具体取决于您开始使用的路径的粒度。

```javascript
var formio = new Formio(<endpoint>);
```
其中***endpoint***是Form.io中的任何有效API端点。这些URL可以根据终结点的粒度提供多种不同的方法。这使您可以使用相同的界面，但可以访问不同的方法，具体取决于端点url的粒度。

## 项目上下文
项目上下文是Form.io API的最高级别。此上下文提供项目中任何项目的项目级别信息。要在这种情况下声明Formio对象，您只需要像这样提供项目的URL。

```js
var formio = new Formio('https://myproject.form.io');
```

### 项目API

#### `formio.loadProject()`
这将在上下文中加载当前项目

**Example**
```js
var formio = new Formio('https://myproject.form.io');
formio.loadProject().then(function(project) {
  console.log(project);
});
```

#### `formio.saveProject(<project>)`
使用给定的有效负载保存父项目。

**Example**
```js
var formio = new Formio('https://myproject.form.io');
formio.loadProject().then(function(project) {
  project.title = 'Changed title';
  formio.saveProject(project).then(function(saved) {
    console.log(saved);
  });
});
```

#### `formio.deleteProject()`
删除父项目。

**Example**
```js
var formio = new Formio('https://myproject.form.io');
formio.deleteProject();
```

#### `formio.loadForms(<query>)`
加载项目中的所有表单。

**Example**
```js
var formio = new Formio('https://myproject.form.io');

// Load all forms within a project
formio.loadForms({params: {type: 'form'}}).then(function(forms) {
  console.log(forms);
});

// Load all resources within a project
formio.loadForms({params: {type: 'resource'}}).then(function(resources) {
  console.log(resources);
});
```
## 表单上下文
通过传递您要引用的表单的端点，将表单上下文提供给Formio类。

```js
var formio = new Formio('https://myproject.form.io/myform');
```

以下API方法可用于此上下文。

* 所有Project API均可用

#### `formio.loadForm()`
加载给定的表单。

```js
var formio = new Formio('https://myproject.form.io/myform');
formio.loadForm().then(function(form) {
  console.log(form);
});
```

#### `formio.saveForm()`
使用给定的有效负载保存给定的Form。

```js
var formio = new Formio('https://myproject.form.io/myform');
formio.loadForm().then(function(form) {
  form.title = 'Changed title';
  formio.saveForm(form).then(function(changed) {
    console.log(changed);
  });
});
```

#### `formio.deleteForm()`
删除给定的表单。

```js
var formio = new Formio('https://myproject.form.io/myform');
formio.deleteForm();
```

#### `formio.loadSubmissions(<query>)`
加载此特定表单的所有提交。

```js
var formio = new Formio('https://myproject.form.io/myform');

// Load all submissions whose first name is "Travis"
formio.loadSubmissions({params:{'data.firstName':'Travis'}}).then(function(submissions) {
  console.log(submissions);
});
```

#### `formio.loadActions(<query>)`
加载此表单可用的所有操作。

```js
var formio = new Formio('https://myproject.form.io/myform');

// Give me all email actions attached to this form.
formio.loadActions({params:{type: 'email'}}).then(function(emailActions) {
  console.log(emailActions);
});
```

#### `formio.canSubmit()`
确定当前登录的用户是否可以提交此表单。

```js
var formio = new Formio('https://myproject.form.io/myform');
formio.canSubmit().then(function(canSubmit) {
  if (canSubmit) {
    console.log('This user can submit this form!');
  }
});
```

#### `formio.saveSubmission(<submission>)`
保存新的提交，或更新现有的提交。如果未随提交对象一起提供```_id```，则这是一个新的提交，如果提供了```_id```，则成为更新。

##### 创建一个新的提交
```js
var formio = new Formio('https://myproject.form.io/myform');
formio.saveSubmission({
  data: {
    firstName: 'Joe',
    lastName: 'Smith'
  }
}).then(function(created) {
  console.log(created);
});
```

##### 更新现有的提交。
```js
var formio = new Formio('https://myproject.form.io/myform');
formio.saveSubmission({
  _id: '234234234234234234',
  data: {
    firstName: 'Joe',
    lastName: 'Thompson'
  }
}).then(function(updated) {
  console.log(updated);
});
```

### 提交上下文
通过将单个提交端点传递给Formio构造函数来提供提交上下文。

```js
var formio = new Formio('https://myproject.form.io/myform/submission/234234234234');
```

* 所有项目上下文API均可用
* 所有Form Context API都可用

#### `formio.loadSubmission()`
加载提交。

```js
var formio = new Formio('https://myproject.form.io/myform/submission/234234234234');
formio.loadSubmission().then(function(submission) {
  console.log(submission);
});
```

#### `formio.saveSubmission(<submission>)`
保存新的提交，或更新现有的提交。如果未随提交对象一起提供```_id```，则这是一个新的提交，如果提供了```_id```，则成为更新。

***请参阅上面表单上下文中的示例***

#### `formio.deleteSubmission()`
删除提交

```js
var formio = new Formio('https://myproject.form.io/myform/submission/234234234234');
formio.deleteSubmission();
```

#### `formio.getDownloadUrl()`
检索此提交的PDF下载URL。

```js
var formio = new Formio('https://myproject.form.io/myform/submission/234234234234');
formio.getDownloadUrl().then(function(url) {
  console.log(url);
});
```

## 静态方法

### `Formio.setBaseUrl(<url>)`
设置基本URL来告诉该库您正在使用哪个根API。

```js
Formio.setBaseUrl('https://forms.myserver.com');
```

### `Formio.getBaseUrl()`
获取库URL配置。

### `Formio.setProjectUrl(<url>)`
设置项目终结点URL。

```js
Formio.setProjectUrl('https://myproject.form.io');
```

### `Formio.setToken(<token>)`
设置此库的JWT Auth令牌。

### `Formio.getToken()`
获取当前用户的JWT令牌。

### `Formio.currentUser()`
从Project api中检索当前用户。

```js
Formio.currentUser().then(function(user) {
  console.log(user);
});
```

### `Formio.accessInfo()`
从目前项目基本URL的获取accessInfo。

```js
Formio.accessInfo().then(function(access) {
  console.log(access);
});
```

### `Formio.setUser(<user>)`
设置localStorage中的当前用户对象。

### `Formio.getUser()`
从localStorage中获取当前登录的用户对象。

### `Formio.loadProjects(<query>)`
加载您的帐户有权访问的所有项目。

```js
Formio.loadProjects().then(function(projects) {
  console.log(projects);
});
```

### `Formio.clearCache()`
清除静态http请求缓存。这将确保下一个API请求实际上到达网络并获取新数据。

```js
Formio.clearCache();
Formio.loadProjects().then(function(projects) {
  console.log(projects);
});
```

### `Formio.logout()`
注销当前的API并删除存储的JWT令牌。

此外，该库还为正在提交的内容提供插件支持，以便可以使用我们的离线模式之类的库。
