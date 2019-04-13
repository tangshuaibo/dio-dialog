/* global Dio */
document.addEventListener('DOMContentLoaded', function () {

    // 自定义对话框
    document.querySelector('#btn-dialog').addEventListener('click', function () {
        var instDialog = Dio.dialog({
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
        });
    });

    // 警告框
    document.querySelector('#btn-alert').addEventListener('click', function () {
        var instAlert = Dio.alert({
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
        });
    });

    // 确认框
    document.querySelector('#btn-confirm').addEventListener('click', function () {
        var instConfirm = Dio.confirm({
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
        });
    });

    // 输入框
    document.querySelector('#btn-prompt').addEventListener('click', function () {
        var instPrompt = Dio.prompt({
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
        });
    });

});