/**
 * polyfill
 */
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
    
            let to = Object(target);
    
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
    
                if (nextSource != null) { // Skip over if undefined or null
                    for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

/**
 * Dio对话框
 */
var Dio = (function () {
    
    // 构造器
    function dio (option) {
        /**
         * 私有属性
         */
        // 默认参数
        var DEFAULT = {
            modal: false,
            overlay: true,
            history: true,
            closeOnEsc: true,
            stackedButtons: false,
            destroyOnClosed: true
        };
        /**
         * 实例属性
         */
        // 用户参数
        this.opt = Object.assign(DEFAULT, option);
        // 遮罩层对象
        this.overlay = null;
        // 对话框容器对象
        this.dialog = null;
        // 对话框标题对象
        this.dialogTitle = null;
        // 对话框内容对象
        this.dialogContent = null;
        // 对话框行为对象
        this.dialogActions = null;
    }

    // 原型
    dio.prototype = {
        // 构造方法
        constructor: dio,
        /**
         * 实例方法
         */
        // 过滤用户参数
        filterOpt: function () {
            var optString = [
                'title',
                'content'
            ];
            var optTrue = [
                'overlay',
                'history',
                'closeOnEsc',
                'destroyOnClosed'
            ];
            var optFalse = [
                'modal',
                'stackedButtons'
            ];
            optString.forEach(function (item) {
                if (typeof this.opt[item] !== 'string') {
                    this.opt[item] = null;
                }
            }, this);
            optTrue.forEach(function (item) {
                if (typeof this.opt[item] !== 'boolean') {
                    this.opt[item] = true;
                }
            }, this);
            optFalse.forEach(function (item) {
                if (typeof this.opt[item] !== 'boolean') {
                    this.opt[item] = false;
                }
            }, this);
            if (Array.isArray(this.opt.buttons)) {
                this.opt.buttons.forEach(function (item) {
                    if (typeof item.text !== 'string') {
                        item.text = null;
                    }
                    if (typeof item.bold !== 'boolean') {
                        item.bold = false;
                    }
                    if (typeof item.close !== 'boolean') {
                        item.close = true;
                    }
                    if (typeof item.onClick !== 'function') {
                        item.onClick = null;
                    }
                });
            }
        },
        // 显示对话框
        showDialog: function () {
            var self = this, OPT = this.opt;
            // 显示元素对象
            (function () {
                this.overlay.classList.add('show');
                this.dialog.classList.add('show');
            }).call(this);
            // open事件相关
            (function () {
                var cbOpen = function () {
                    if (OPT.onOpen) {
                        OPT.onOpen();
                    }
                    self.dialog.removeEventListener('animationstart', cbOpen);
                };
                this.dialog.addEventListener('animationstart', cbOpen);
                this.dialog.dispatchEvent(new Event('open'));
                this.dialog.state = 'open';
            }).call(this);
            // opened事件相关
            (function () {
                var cbOpened = function () {
                    if (OPT.onOpened) {
                        OPT.onOpened();
                    }
                    self.dialog.removeEventListener('animationend', cbOpened);
                };
                this.dialog.addEventListener('animationend', cbOpened);
                this.dialog.dispatchEvent(new Event('opened'));
                this.dialog.state = 'opened';
            }).call(this);
            // 历史记录相关
            (function () {
                if (OPT.history) {
                    this.watchHashChange();
                }
            }).call(this);
        },
        // 隐藏对话框
        hideDialog: function () {
            var self = this, OPT = this.opt;
            // 隐藏元素对象
            (function () {
                this.overlay.classList.add('hide');
                this.dialog.classList.add('hide');
                var cbOverlay = function () {
                    self.overlay.classList.remove('show', 'hide');
                    self.overlay.removeEventListener('animationend', cbOverlay);
                };
                this.overlay.addEventListener('animationend', cbOverlay);
                var cbDialog = function () {
                    self.dialog.classList.remove('show', 'hide');
                    self.dialog.removeEventListener('animationend', cbDialog);
                };
                this.dialog.addEventListener('animationend', cbDialog);
            }).call(this);
            // close事件相关
            (function () {
                var cbClose = function () {
                    if (OPT.onClose) {
                        OPT.onClose();
                    }
                    self.dialog.removeEventListener('animationstart', cbClose);
                };
                this.dialog.addEventListener('animationstart', cbClose);
                this.dialog.dispatchEvent(new Event('close'));
                this.dialog.state = 'close';
            }).call(this);
            // closed事件相关
            (function () {
                var cbClosed = function () {
                    if (OPT.onClosed) {
                        OPT.onClosed();
                    }
                    self.dialog.removeEventListener('animationend', cbClosed);
                    if (OPT.destroyOnClosed) {
                        self.overlay.parentNode.removeChild(self.overlay);
                        self.dialog.parentNode.removeChild(self.dialog);
                        self.destroy();
                    }
                };
                this.dialog.addEventListener('animationend', cbClosed);
                this.dialog.dispatchEvent(new Event('closed'));
                this.dialog.state = 'closed';
            }).call(this);
            // 历史记录相关
            (function () {
                if (OPT.history && arguments[0] !== 'back') {
                    history.back();
                }
            }).call(this);
        },
        // 监听hash变化
        watchHashChange: function () {
            var self = this;
            if (location.hash && location.hash !== '#dio-dialog') {
                location.hash += '?dio-dialog';
            } else if (!location.hash) {
                location.hash = 'dio-dialog';
            }
            var cbHashChange = function () {
                if (location.hash.lastIndexOf('dio-dialog') < 0) {
                    if (self.dialog.state === 'opened') {
                        self.hideDialog('back');
                    }
                    window.removeEventListener('hashchange', cbHashChange);
                }
            };
            window.addEventListener('hashchange', cbHashChange);
        },
        // 模态化对话框
        modalDialog: function () {
            var self = this, OPT = this.opt;
            if (!OPT.modal) {
                this.overlay.addEventListener('click', function (event) {
                    if (this === event.target) {
                        self.hideDialog();
                    }
                });
            }
        },
        // 关联esc键
        keyCodeEsc: function () {
            var self = this, OPT = this.opt;
            if (OPT.closeOnEsc) {
                var cbKeyupEsc = function (event) {
                    if (27 === event.keyCode) {
                        self.hideDialog();
                    }
                    if (OPT.destroyOnClosed) {
                        document.removeEventListener('keyup', cbKeyupEsc);
                    }
                };
                if (OPT.destroyOnClosed) {
                    this.dialog.addEventListener('closed', function () {
                        document.removeEventListener('keyup', cbKeyupEsc);
                    });
                }
                document.addEventListener('keyup', cbKeyupEsc);
            }
        },
        // 渲染对话框
        render: function () {
            var OPT = this.opt, self = this;
            // 遮罩层
            (function () {
                this.overlay = document.createElement('div');
                this.overlay.classList.add('dio-overlay');
                if (!OPT.overlay) {
                    this.overlay.classList.add('invisible');
                }
                document.body.appendChild(this.overlay);
            }).call(this);
            // 对话框容器
            (function () {
                this.dialog = document.createElement('div');
                this.dialog.classList.add('dio-dialog');
                if (OPT.cssClass) {
                    this.dialog.classList.add(OPT.cssClass);
                }
                document.body.appendChild(this.dialog);
            }).call(this);
            // 对话框标题
            (function () {
                if (OPT.title) {
                    this.dialogTitle = document.createElement('div');
                    this.dialogTitle.classList.add('dio-dialog-title');
                    this.dialogTitle.innerHTML = OPT.title;
                    this.dialog.appendChild(this.dialogTitle);
                }
            }).call(this);
            // 对话框内容
            (function () {
                if (OPT.content) {
                    this.dialogContent = document.createElement('div');
                    this.dialogContent.classList.add('dio-dialog-content');
                    this.dialogContent.innerHTML = OPT.content;
                    this.dialog.appendChild(this.dialogContent);
                }
            }).call(this);
            // 对话框按钮
            (function () {
                if (OPT.buttons && OPT.buttons.length > 0) {
                    this.dialogActions = document.createElement('div');
                    this.dialogActions.classList.add('dio-dialog-actions');
                    if (OPT.stackedButtons) {
                        this.dialogActions.classList.add('stacked');
                    }
                    OPT.buttons.forEach(function (value) {
                        var item = Object.assign({
                            text: '',
                            bold: false,
                            close: true,
                            onClick: null
                        }, value);
                        if (item.text) {
                            var dialogBtn = document.createElement('span');
                            dialogBtn.classList.add('dio-dialog-btn');
                            dialogBtn.innerHTML = item.text;
                            self.dialogActions.appendChild(dialogBtn);
                            if (item.bold) {
                                dialogBtn.classList.add('bold');
                            }
                            if (item.close) {
                                dialogBtn.addEventListener('click', function () {
                                    self.hideDialog();
                                });
                            }
                            if (item.onClick) {
                                dialogBtn.addEventListener('click', function () {
                                    item.onClick();
                                });
                            }
                        }
                    });
                    this.dialog.appendChild(this.dialogActions);
                }
            }).call(this);
        },
        // 初始化
        init: function () {
            this.filterOpt();
            this.render();
            this.showDialog();
            this.keyCodeEsc();
            this.modalDialog();
        },
        // 清空实例属性
        destroy: function () {
            for (var key in this) {
                delete this[key];
            }
        }
    };

    /**
     * 静态方法
     */
    // 自定义对话框
    dio.dialog = function (option) {
        var instance = new dio(option);
        instance.init();
        return instance;
    };
    // 警告框
    dio.alert = function (option) {
        // 用户参数检查
        (function () {
            option = option || {};
            if (!option.confirmText || typeof option.confirmText !== 'string') {
                option.confirmText = '确定';
            }
        })();
        // 返回实例对象
        return dio.dialog({
            title: option.title,
            content: option.text,
            buttons: [
                {
                    text: option.confirmText,
                    bold: false,
                    close: true,
                    onClick: option.onConfirm
                }
            ],
            modal: option.modal,
            overlay: option.overlay,
            history: option.history,
            closeOnEsc: option.closeOnEsc
        });
    };
    // 确认框
    dio.confirm = function (option) {
        // 用户参数检查
        (function () {
            option = option || {};
            if (!option.cancelText || typeof option.cancelText !== 'string') {
                option.cancelText = '取消';
            }
            if (!option.confirmText || typeof option.confirmText !== 'string') {
                option.confirmText = '确定';
            }
        })();
        // 返回实例对象
        return dio.dialog({
            title: option.title,
            content: option.text,
            buttons: [
                {
                    text: option.cancelText,
                    bold: false,
                    close: true,
                    onClick: option.onCancel
                },
                {
                    text: option.confirmText,
                    bold: false,
                    close: true,
                    onClick: option.onConfirm
                }
            ],
            modal: option.modal,
            overlay: option.overlay,
            history: option.history,
            closeOnEsc: option.closeOnEsc
        });
    };
    // 输入框
    dio.prompt = function (option) {
        // 用户参数检查
        (function () {
            option = option || {
                onCancel: function () {},
                onConfirm: function () {}
            };
            if (!option.cancelText || typeof option.cancelText !== 'string') {
                option.cancelText = '取消';
            }
            if (!option.confirmText || typeof option.confirmText !== 'string') {
                option.confirmText = '确定';
            }
        })();
        // 文本框实例
        var instTf = new DioTextfield({
            type: option.type,
            label: option.label,
            maxlength: option.maxlength,
            placeholder: option.placeholder,
            defaultValue: option.defaultValue
        }).init();
        // 对话框实例
        var instDialog = dio.dialog({
            buttons: [
                {
                    text: option.cancelText,
                    bold: false,
                    close: true,
                    onClick: function () {
                        option.onCancel(instTf.getInput());
                    }
                },
                {
                    text: option.confirmText,
                    bold: false,
                    close: true,
                    onClick: function () {
                        option.onConfirm(instTf.getInput());
                    }
                }
            ],
            modal: option.modal,
            overlay: option.overlay,
            history: option.history,
            closeOnEsc: option.closeOnEsc
        });
        // 添加对话框内容
        (function () {
            instDialog.dialogContent = document.createElement('div');
            instDialog.dialogContent.classList.add('dio-dialog-content');
            instDialog.dialogContent.appendChild(instTf.tf);
            instDialog.dialog.insertBefore(instDialog.dialogContent, instDialog.dialogActions);
        })();
        // 监听enter按键
        (function () {
            if (typeof option.confirmOnEnter === 'boolean') {
                if (option.confirmOnEnter) {
                    instTf.tfInput.addEventListener('keyup', function (event) {
                        if (event.keyCode === 13) {
                            instTf.setInput(instTf.getInput().replace(/\n/g, ''));
                            instDialog.dialogActions
                                .querySelector('.dio-dialog-btn:last-of-type')
                                .dispatchEvent(new MouseEvent('click'));
                        }
                    });
                }
            } else {
                option.confirmOnEnter = false;
            }
        })();
        // 返回实例对象
        return instDialog;
    };

    // 暴露构造器
    return dio;

})();

/**
 * Dio文本框
 */
var DioTextfield = (function () {
    
    // 构造器
    function dioTf (option) {
        // 默认参数
        var DEFAULT = {
            type: 'text',
            label: null,
            maxlength: null,
            placeholder: null,
            defaultValue: null
        };
        // 用户参数
        this.opt = Object.assign(DEFAULT, option);
        // 文本框容器对象
        this.tf = null;
        // 文本框标题对象
        this.tfLabel = null;
        // 文本框输入区域对象
        this.tfInput = null;
    }

    // 原型
    dioTf.prototype = {
        // 构造方法
        constructor: dioTf,
        // 过滤用户参数
        filterOpt: function () {
            if (this.opt.type !== 'textarea') {
                this.opt.type = 'text';
            }
            if (typeof this.opt.maxlength !== 'number' || this.opt.maxlength < 0) {
                this.opt.maxlength = null;
            } else {
                this.opt.maxlength = Math.round(this.opt.maxlength);
            }
            ['label', 'placeholder', 'defaultValue'].forEach(function (item) {
                if (typeof this.opt[item] !== 'string') {
                    this.opt[item] = null;
                }
            }, this);
        },
        // 生成文本框
        create: function () {
            // 文本框容器
            (function () {
                this.tf = document.createElement('div');
                this.tf.classList.add('dio-textfield');
                this.tf.addEventListener('click', function (event) {
                    this.classList.add('focus');
                    event.stopPropagation();
                });
                var self = this;
                var cbToggleFocus = function () {
                    if (self && self.tf) {
                        self.tf.classList.remove('focus');
                    } else {
                        document.removeEventListener('click', cbToggleFocus);
                    }
                };
                document.addEventListener('click', cbToggleFocus);
            }).call(this);
            // 文本框标题
            (function () {
                if (this.opt.label) {
                    this.tfLabel = document.createElement('label');
                    this.tfLabel.classList.add('dio-textfield-label');
                    this.tfLabel.innerHTML = this.opt.label;
                    this.tf.appendChild(this.tfLabel);
                }
            }).call(this);
            // 文本框输入区域
            (function () {
                if (this.opt.type === 'text') {
                    this.tfInput = document.createElement('input');
                    if (this.opt.maxlength) {
                        this.tfInput.setAttribute('maxlength', this.opt.maxlength);
                    }
                    if (this.opt.placeholder) {
                        this.tfInput.setAttribute('placeholder', this.opt.placeholder);
                    }
                    if (this.opt.defaultValue) {
                        this.tfInput.setAttribute('value', this.opt.defaultValue);
                    }
                } else {
                    this.tfInput = document.createElement('div');
                    this.tfInput.setAttribute('contenteditable', true);
                    var self = this;
                    if (this.opt.maxlength) {
                        this.tfInput.addEventListener('input', function () {
                            if (this.innerText.length > self.opt.maxlength) {
                                if (window.getSelection) {
                                    var selection = getSelection();
                                    var anchorOffset = selection.anchorOffset;
                                    var tempText = this.innerText.substr(0, self.opt.maxlength);
                                    var partA = tempText.substr(0, anchorOffset);
                                    var partB = tempText.substr(anchorOffset);
                                    selection.selectAllChildren(this);
                                    var range = selection.getRangeAt(0);
                                    range.deleteContents();
                                    range.insertNode(document.createTextNode(partB));
                                    if (partA === '') {
                                        range.collapse(false);
                                    } else {
                                        range.insertNode(document.createTextNode(partA));
                                        range.setStart(this, 1);
                                        range.collapse(true);
                                    }
                                } else {
                                    this.innerText = this.innerText.substr(0, self.opt.maxlength);
                                }
                            }
                        });
                    }
                    if (this.opt.placeholder) {
                        this.tfInput.setAttribute('placeholder', this.opt.placeholder);
                    }
                    if (this.opt.defaultValue) {
                        this.tfInput.innerText = this.opt.defaultValue;
                    }
                }
                this.tfInput.classList.add('dio-textfield-input');
                this.tf.appendChild(this.tfInput);
            }).call(this);
        },
        // 渲染文本框
        render: function (nodeObj) {
            if (nodeObj) {
                nodeObj.appendChild(this.tf);
            }
        },
        // 获取文本框输入内容
        getInput: function () {
            if (this.opt.type === 'text') {
                return this.tfInput.value;
            } else {
                return this.tfInput.innerText;
            }
        },
        // 设置文本框输入内容
        setInput: function (value) {
            if (this.opt.type === 'text') {
                this.tfInput.value = value;
            } else {
                this.tfInput.innerText = value;
            }
        },
        // 初始化
        init: function (nodeObj) {
            this.filterOpt();
            this.create();
            this.render(nodeObj);
            return this;
        },
        // 清空实例属性
        destroy: function () {
            for (var key in this) {
                delete this[key];
            }
        }
    };

    // 暴露构造器
    return dioTf;

})();