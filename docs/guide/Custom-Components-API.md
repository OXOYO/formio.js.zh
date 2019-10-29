# 自定义组件

Form.io渲染器允许创建自定义组件。这些可以通过在Form.io中扩展基本组件，然后在核心渲染器中注册它们来创建。这可以如下进行。

## 创建自定义组件
```js
import Base from 'formiojs/components/_classes/component/Component';
import editForm from 'formiojs/components/table/Table.form'

export default class CheckMatrix extends Base {
  constructor(component, options, data) {
    super(component, options, data);
    this.foo = 'bar';
  }

  static schema() {
    return Base.schema({
      type: 'checkmatrix',
      numRows: 3,
      numCols: 3
    });
  }

  static builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema()
  }

  static editForm = editForm

  /**
   * Render returns an html string of the fully rendered component.
   *
   * @param children - If this class is extendended, the sub string is passed as children.
   * @returns {string}
   */
  render(children) {
    // To make this dynamic, we could call this.renderTemplate('templatename', {}).

    let tableClass = 'table ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });

    let content = '';

    for (let i = 0; i < this.component.numRows; i++) {
      let row = '<tr>';
      for (let j = 0; j < this.component.numCols; j++) {
        let cell = '<td>';

        cell += this.renderTemplate('input', {
          input: {
            type: 'input',
            ref: `${this.component.key}-${i}`,
            attr: {
              id: `${this.component.key}-${i}-${j}`,
              class: 'form-control',
              type: 'checkbox',
            }
          }
        });

        cell += '</td>';
        row += cell;
      }
      row += '</tr>';
      content += row;
    }

    // Calling super.render will wrap it html as a component.
    return super.render(`
<table class=${tableClass}>
  <tbody>
     ${content}
  </tbody>
</table>
    `);
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {};

    for (let i = 0; i < this.component.numRows; i++) {
      refs[`${this.component.key}-${i}`] = 'multiple';
    }

    this.loadRefs(element, refs);

    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);

      // Attach click events to each input in the row
      this.checks[i].forEach(input => {
        this.addEventListener(input, 'click', () => this.updateValue())
      });
    }

    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    var value = [];
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      value[rowIndex] = [];
      for (var colIndex in row) {
        var col = row[colIndex];
        value[rowIndex][colIndex] = !!col.checked;
      }
    }
    return value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    if (!value) {
      return;
    }
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      if (!value[rowIndex]) {
        break;
      }
      for (var colIndex in row) {
        var col = row[colIndex];
        if (!value[rowIndex][colIndex]) {
          return false;
        }
        let checked = value[rowIndex][colIndex] ? 1 : 0;
        col.value = checked;
        col.checked = checked;
      }
    }
  }
}
```

## 自定义编辑表单

**Edit Form**是将组件拖放到“表单”上时看到的表单，模态显示为带有表单的表单，您可以在其中配置表单。可以通过在`editForm`方法的返回范围内提供Form.io JSON表单来完全自定义此编辑表单，如下所示。

```js
export default class CheckMatrix extends Base {
  static editForm() {
    return {
      components: [
        {
          type: 'textfield',
          key: 'label',
          label: 'Label'
        }
      ]
    };
  }
}
```

## 注册组件
可以使用以下`registerComponent`方法将组件注册到渲染器中。

```js
import CheckMatrix from './CheckMatrix';
import { Formio } from 'formiojs';
Formio.registerComponent('checkmatrix', CheckMatrix);
```

## 注册一个插件
也可以通过插件系统注册组件。这样做如下。

***MyPlugin.js***
```js
import CheckMatrix from './CheckMatrix';
import ButtonSelect from './ButtonSelect';
export default {
  components: {
    checkmatrix: CheckMatrix,
    buttonselect: ButtonSelect
  },
  templates: {
    bootstrap: {
      checkmatrix: `<div>..TEMPLATE FOR CHECKMATRIX...</div>`,
      buttonselect: `<div>....TEMPLATE FOR BUTTONSELECT...</div>`
    },
    bootstrap3: {
      checkmatrix: `<div>..TEMPLATE FOR CHECKMATRIX...</div>`,
      buttonselect: `<div>....TEMPLATE FOR BUTTONSELECT...</div>`
    }
  }
};
```

```js
import MyPlugin from './MyPlugin';
import { Formio } from 'formiojs';
Formio.use(MyPlugin);
```
