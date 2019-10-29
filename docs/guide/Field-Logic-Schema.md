# 字段逻辑模式

包含触发器对象和动作对象数组的对象。

```
logic: [
  {
    trigger: {}
    actions: [{}, {}]
  }
]
```

### 触发器

触发对象-触发对象包含类型和定义属性。根据触发器类型，definition属性是不同的。当评估为true时，它将应用操作。

选项有：

#### Simple Trigger:
```
{
  type: 'simple',
  simple: {
    when: 'triggerFieldKey',
    eq: 'Value to equal',
    show: true // To trigger or not when the value is equal
  }
}
```

#### Javascript Trigger
```
{
  type: 'javascript',
  javascript: 'result = customJavascriptReturningFalsyValue;'
}
```

#### JSON Logic Trigger
```
{
  type: 'json',
  json: {} // JSON Logic object that returns true or false.
}
```

### 动作
动作对象-触发器评估为true时要应用于组件的动作的定义。操作类型有多种选项。

#### Property action
属性操作将更改组件上的属性，然后重新绘制组件以确保应用了属性更改。

```
{
  type: 'property',
  property: {
    type: 'boolean|string', // If the property is a boolean, set 'boolean'. Otherwise set 'string'.
    value: 'validate.required', // The path to the property on the component definition.
  },
  state: true|false // If type is boolean, set to true or false.
  text: 'The text is {{ myfield }}' // If type is string, the string to assign. Can use interpolation with available variables of row, data, component and result (returned from trigger).
}
```

#### Value action
当触发器评估为true时，value操作将设置组件的值。

```
{
  type: 'value',
  value: 'javascript that returns the new value' // Will be evaluated with available variables of row, data, component and result (returned from trigger).
}
```

#### Validation action
此动作正在开发中。它将触发现场的自定义验证。

