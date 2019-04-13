## 伪造的MD风格对话框

> JOJO我转生对话框啦！
（参数照搬自mdui<<https://www.mdui.org/docs/dialog>>//表格也是）

> 什么？你个低配山寨货也敢自称Dio？！

#### 使用导航

* [引入文件](#引入文件)
* [自定义对话框](#自定义对话框)
* [警告框](#警告框)
* [确认框](#输入框)
* [输入框](#输入框)

#### 引入文件

    <link rel="stylesheet" href="path/to/dio-alert.min.css">
    <script src="path/to/dio-alert.min.js"></script>

[_回到顶部_](#伪造的MD风格对话框)

#### 自定义对话框

* 使用示例

```javascript
var options = {
    title: '这是标题',
    content: '这是内容',
    cssClass: 'additional-class',
    buttons: [
        {
            text: '取消',
            bold: false,
            close: true,
            onClick: function () {
                console.log('这是取消');
            }
        },
        {
            text: '确定',
            bold: false,
            close: true,
            onClick: function () {
                console.log('这是确定');
            }
        }
    ],
    modal: false,
    overlay: true,
    history: true,
    closeOnEsc: true,
    stackedButtons: false,
    destroyOnClosed: true,
    onOpen: function () {
        console.log('onOpen');
    },
    onOpened: function () {
        console.log('onOpened');
    },
    onClose: function () {
        console.log('onClose');
    },
    onClosed: function () {
        console.log('onClosed');
    }
};
var instDialog = Dio.dialog(options);
```

* options

参数名 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`title` | `string` | | （可选）对话框的标题。
`content` | `string` | | （可选）对话框的内容。
`cssClass` | `string` | | （可选）添加到 `.dio-dialog` 上的 CSS 类。
`buttons` | `array` | | （可选）按钮数组，每个按钮都是一个带按钮参数的对象（见下面表格）。
`modal` | `boolean` | `false` | （可选）是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。
`overlay` | `boolean` | `true` | （可选）打开对话框后是否显示遮罩层。
`history` | `boolean` | `true` | （可选）是否监听 `hashchange` 事件，为 true 时可以通过 Android 的返回键或浏览器后退按钮关闭对话框。
`closeOnEsc` | `boolean` | `true` | （可选）按下 Esc 键时是否关闭对话框。
`stackedButtons` | `boolean` | `false` | （可选）按钮是否垂直排列。
`destroyOnClosed` | `boolean` | `true` | （可选）关闭对话框后是否自动销毁对话框。
`onOpen` | `function` | | （可选）打开动画开始时的回调。
`onOpened` | `function` | | （可选）打开动画结束时的回调。
`onClose` | `function` | | （可选）关闭动画开始时的回调。
`onClosed` | `function` | | （可选）关闭动画结束时的回调。

* option - buttons

参数名 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`text` | `string` | | （可选）按钮文本。
`bold` | `boolean` | `false` | （可选）按钮文本是否加粗。
`close` | `boolean` | `true` | （可选）点击按钮后是否关闭对话框。
`onClick` | `function` | | （可选）点击按钮的回调函数。

[_回到顶部_](#伪造的MD风格对话框)

#### 警告框

* 使用示例

```javascript
var options = {
    title: '这是标题',
    text: '这是文本',
    modal: false,
    overlay: true,
    history: true,
    closeOnEsc: true,
    confirmText: '确定',
    onConfirm: function () {
        console.log('onConfirm');
    }
};
var instAlert = Dio.alert(options);
```

* options

参数名 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`title` | `string` | | （可选）警告框的标题。
`text` | `string` | | （可选）警告框的文本。
`modal` | `boolean` | `false` | （可选）是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。
`overlay` | `boolean` | `true` | （可选）打开对话框后是否显示遮罩层。
`history` | `boolean` | `true` | （可选）是否监听 `hashchange` 事件，为 true 时可以通过 Android 的返回键或浏览器后退按钮关闭对话框。
`closeOnEsc` | `boolean` | `true` | （可选）按下 Esc 键时是否关闭对话框。
`confirmText` | `string` | `确定` | （可选）确认按钮的文本。
`onConfirm` | `function` | | （可选）点击确认按钮的回调。

[_回到顶部_](#伪造的MD风格对话框)

#### 确认框

* 使用示例

```javascript
var options = {
    title: '这是标题',
    text: '这是文本',
    modal: false,
    overlay: true,
    history: true,
    closeOnEsc: true,
    cancelText: '取消',
    confirmText: '确定',
    onCancel: function () {
        console.log('onCancel');
    },
    onConfirm: function () {
        console.log('onConfirm');
    }
};
var instConfirm = Dio.confirm(options);
```

* options

参数名 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`title` | `string` | | （可选）确认框的标题。
`text` | `string` | | （可选）确认框的文本。
`modal` | `boolean` | `false` | （可选）是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。
`overlay` | `boolean` | `true` | （可选）打开对话框后是否显示遮罩层。
`history` | `boolean` | `true` | （可选）是否监听 `hashchange` 事件，为 true 时可以通过 Android 的返回键或浏览器后退按钮关闭对话框。
`closeOnEsc` | `boolean` | `true` | （可选）按下 Esc 键时是否关闭对话框。
`cancelText` | `string` | `取消` | （可选）取消按钮的文本。
`confirmText` | `string` | `确定` | （可选）确认按钮的文本。
`onCancel` | `function` | | （可选）点击取消按钮的回调。
`onConfirm` | `function` | | （可选）点击确认按钮的回调。

[_回到顶部_](#伪造的MD风格对话框)

#### 输入框

* 使用示例

```javascript
var options = {
    type: 'textarea',
    label: '多行文本框',
    maxlength: 10,
    placeholder: '这是占位符',
    defaultValue: '这是默认值',
    modal: false,
    overlay: true,
    history: true,
    closeOnEsc: true,
    cancelText: '取消',
    confirmText: '确定',
    confirmOnEnter: false,
    onCancel: function (value) {
        console.log('onCancel, value:\n' + value);
    },
    onConfirm: function (value) {
        console.log('onConfirm, value:\n' + value);
    }
};
var instPrompt = Dio.prompt(options);
```

* options

参数名 | 类型 | 默认值 | 说明
--- | --- | --- | ---
`type` | `string` | `text` | （可选）文本框的类型。<ul><li>`text` : 单行文本框</li><li>`textarea` : 多行文本框</li></ul>
`label` | `string` | | （可选）文本框浮动标签的文本。
`maxlength` | `int` | | （可选）最大输入字符数量。
`placeholder` | `string` | | （可选）文本框的占位符。
`defaultValue` | `string` | | （可选）文本框的默认值。
`modal` | `boolean` | `false` | （可选）是否模态化对话框。为 false 时点击对话框外面的区域时关闭对话框，否则不关闭。
`overlay` | `boolean` | `true` | （可选）打开对话框后是否显示遮罩层。
`history` | `boolean` | `true` | （可选）是否监听 `hashchange` 事件，为 true 时可以通过 Android 的返回键或浏览器后退按钮关闭对话框。
`closeOnEsc` | `boolean` | `true` | （可选）按下 Esc 键时是否关闭对话框。
`cancelText` | `string` | `取消` | （可选）取消按钮的文本。
`confirmText` | `string` | `确定` | （可选）确认按钮的文本。
`confirmOnEnter` | `boolean` | `false` | （可选）按下 Enter 键时触发 `onConfirm` 回调函数。
`onCancel` | `function` | | （可选）点击取消按钮的回调。参数是文本框的值。
`onConfirm` | `function` | | （可选）点击确认按钮的回调。参数是文本框的值。

[_回到顶部_](#伪造的MD风格对话框)