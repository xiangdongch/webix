import {isString, isFunction, isNumber, forEach, wrap, mapValues} from "lodash";
import {validate} from "./helpers/validator";

window.webix_view = {
    $init(config) {
        if (this.load) {
            this.$ready.push(function () {
                this.attachEvent("onAfterLoad", function () {
                    // TODO, 对于请求失败，也要还原这个设置，否则无法查询
                    this._hwload_flag = false;
                });
            });
        }

        this.show = wrap(this.show, function (fun, ...args) {
            if (args[2] || this.hwCheckPermission()) {
                return fun.apply(this, args);
            }
            // TODO
            return false;
        });

        this.enable = wrap(this.enable, function (fun, ...args) {
            if (this.hwCheckPermission()) {
                return fun.apply(this, args);
            }
        });



        // load custom plugins
        forEach(config.hwPlugins, (plugin) => {
            this.hwLoadPlugin(plugin, config);
        });
    },
    hwLoadPlugin: function (plugin, config) {
        // plugin init
        if (plugin.$init) plugin.$init.call(this, config || this.config);

        // plugin events
        forEach(plugin.on, (fun, evt) => {
            this.attachEvent(evt, fun);
        });
    },
    getPermissions: function () {
        return window.hwPermissions || [];
    },
    _hasPermission: function (permission) {
        if (typeof window["hwPermissionsMode"] === "undefined") window["hwPermissionsMode"] = true;

        return (window["hwPermissionsMode"] || false) ? this.getPermissions().indexOf(permission) !== -1 : true;
    },
    _isHasMode: function (mode) {
        return mode === "hasPermission";
    },
    /**
     * @description 根据权限表达式，检查当前用户是否包含某单个或多个权限，如果有返回true，否则返回false
     * @param expression
     *            权限表达式，支持 逻辑与 “,” 逻辑或 “|”，但表达式同时只能使用一种逻辑。
     * @param _model
     *            模式，有hasPermission 与 noPermisson两种，不传默认为hasPermission
     */
    _permission_check: function (expression, _model) {
        var model = _model || "hasPermission";
        if (expression.indexOf("|") >= 0 && expression.indexOf(",") >= 0) {
            webix.log("permission 权限点标注错误，不能同时使用逻辑与“$”与逻辑或“,”来控制元素显示:" + expression);
            return false;
        }
        if (expression.indexOf("|") >= 0) {
            return this._permission_checkAnyOne(expression.split("|"), model);
        } else if (expression.indexOf(",") >= 0) {
            return this._permission_checkAll(expression.split(","), model);
        }

        return this._permission_checkOthers(expression, model);
    },
    /**
     * @decription model为hasPermission时候，检查用户是否包其中某一个权限,
     *             model���noPermission时候检查用户是否没有其中任意一个权限
     * @param permissions
     *            {Array}
     * @param model
     *            {String} 两种模式，1 hasPermission 2 noPermission
     * @return boo {boolean}
     */
    _permission_checkAnyOne: function (permissions, model) {
        var isHasMode = this._isHasMode(model);
        var result = false;
        forEach(permissions, (permission) => {
            result = isHasMode === this._hasPermission(permission);
            return !result;
        });
        return result;
    },
    /**
     * @decription model为hasPermission时候，检查用户是否包含参数提供的所有权限,
     *             model为noPermission时候检查用户是否没有权限表达式中的任意一个权限
     * @param permissions
     *            {Array}
     * @param model
     *            {String} 两种模式，1 hasPermission 2 noPermission
     * @return boo {boolean}
     */
    _permission_checkAll: function (permissions, model) {
        var isHasMode = this._isHasMode(model);
        var result = true;
        forEach(permissions, (permission) => {
            result = isHasMode === this._hasPermission(permission);
            return result;
        });
        return result;
    },
    /**
     * @decription model为hasPermission时候，检查用户是否包含某单个权限,
     *             model为noPermission时候检查用户是否没有某单个权限
     * @param {Object}
     *            permissions
     * @param {String}
     *            model 两种模式，1 hasPermission 2 noPermission
     * @return {boolean}
     */
    _permission_checkOthers: function (permission, model) {
        var hasPermission = this._hasPermission(permission);
        return this._isHasMode(model) ? hasPermission : !hasPermission;
    },
    /**
     * [permission_setter description]
     * @param {Array} _value 权限表达式, 权限模式, 是否保留
     * @return {Array}       同上
     * @example
     * permission: ["Service$Lookup.Classify$read,Service$Lookup.Classify$delete", "hasPermission", true]
     * permission: ["Service$Lookup.Classify$read|Service$Lookup.Classify$delete", null, true]
     * permission: ["Service$Lookup.Classify$read,Service$Lookup.Classify$delete", "noPermission", true]
     * permission: ["Service$Lookup.Classify$read|Service$Lookup.Classify$delete", "noPermission", true]
     */
    permission_setter: function (_value) {
        var value = _value;
        if (value) {
            if (typeof (value) === "string") {
                value = [value, 'hasPermission', window.hwPermissionsMode || false];
            }

            if (!this._permission_check.apply(this, value)) {
                if (webix.isArray(value) && value.length === 3 && value[2] === true) {
                    this.disable("No permission");
                } else {
                    this.hide();
                }
            }
        }
        return value;
    },

    hwCheckPermission: function () {
        if (this.config.permission) return this._permission_check.apply(this, this.config.permission);
        return true;
    },

    hwValue_setter(value) {
        let config = this.config;
        return config.value = config.hwValue = value;
    },

    hwUrl_setter: function (value) {
        if (value) {

            if (value.url && value.autoload !== false) {
                this.define("url", value.url);
            }

            if (value.dataFeed) {
                this.define("dataFeed", value.dataFeed);
            }

            if (value.datatype) {
                if (typeof (value.datatype) === "object") {
                    var datatype = "temp_" + webix.uid();
                    webix.DataDriver[datatype] = value.datatype;
                    value.datatype = datatype;

                    this.attachEvent("onDestruct", function () {
                        value.datatype = webix.copy(webix.DataDriver[datatype]);
                        delete webix.DataDriver[datatype];
                    });
                }
                this.define("datatype", value.datatype);
                if (this.data) {
                    this.data.driver = webix.DataDriver[value.datatype];
                }
            }
        }
        return value;
    },

    hwSetUrlParams(params: Object, resetOrigin = false) {
        let setParams = (target) => {
            if (resetOrigin) target.params = {};
            webix.extend(target.params, params, true);
        };
        let hwUrl = this.config.hwUrl;

        if (hwUrl && hwUrl.params) {
            setParams(hwUrl);
            return this;
        }

        let url = this.data.url;
        if (!url && hwUrl) url = hwUrl.url;

        if (url) {
            if (url.params) {
                setParams(url);
            } else if (url.source.params && url.source.params.params) {
                setParams(url.source.params);
            }
        }

        return this;
    },

    hwRestoreUrl: function () {
        var config = this.config;
        var url = config.url || config.hwUrl.url;
        webix.assert(url, "You need to set url for hwload");
        if (isString(url) && url.indexOf("->") !== -1) {
            var parts = url.split("->");
            url = webix.proxy(parts[0], parts[1]);
        }
        var data = this.data;
        if (data) data.url = url;

        var driver = config.datatype || config.hwUrl.datatype || this.data.driver;
        webix.assert(driver, "You need to set driver");
        if (isString(driver)) {
            if (data) data.driver = webix.DataDriver[driver];
        } else {
            this.define("hwUrl", {
                datatype: driver
            });
        }

        return url;
    },

    hwload(page = 0) {
        if (!this.config.hwUncheck && this.hwIsDirty && this.hwIsDirty()) {
            webix.hwMessageDialog({
                type: "info",
                message: webix.i18n["common.save.notice"],
                autofocus: true
            }, (flag) => {
                if (flag) {
                    this._hwload(page);
                }
            });
        } else {
            this._hwload(page);
        }
    },

    _hwload(page = 0) {
        if (this._hwload_flag) return;

        if (isFunction(this.getState)) {
            const state = this.getState();
            if (state) this.scrollTo(state.scroll.x - 0.000001, 0);
        }

        this._hwload_flag = true;

        if (this.editStop) this.editStop();

        var config = this.config;
        var tooltip = config.tooltip;
        if (tooltip && tooltip.hide) tooltip.hide();

        this.clearAll();
        var dp = this.hwGetDP ? this.hwGetDP() : null;
        if (dp) dp.reset();

        if (this.getPager && this.getPager()) config.datafetch = this.getPager().config.size;

        var url = this.hwRestoreUrl();
        var callback = {
            before: function () {
                if (this.setPage) this.setPage(page);
            }
        };
        var details = {
            start: config.datafetch * page,
            count: config.datafetch
        };

        if (this.getState) {
            const state = this.getState();
            details.sort = state.sort;
            if (config.hwSort && details.sort) {
                details.sort.type = config.hwSort;
            }
            details.filter = state.filter;
        }
        details.abilityFilter = this.abilityFilterQueryParams;
        this.load(url, callback, details);
        this.hwloadPage = page;
    },

    _get_input_selection: function (el) {
        var start = 0;
        var end = 0;
        var normalizedValue;
        var range;
        var textInputRange;
        var len;
        var endRange;

        if (isNumber(el.selectionStart) && isNumber(el.selectionEnd)) {
            start = el.selectionStart;
            end = el.selectionEnd;
        } else {
            range = document.selection.createRange();

            if (range && range.parentElement() == el) {
                len = el.value.length;
                normalizedValue = el.value.replace(/\r\n/g, "\n");

                // Create a working TextRange that lives only in the input
                textInputRange = el.createTextRange();
                textInputRange.moveToBookmark(range.getBookmark());

                // Check if the start and end of the selection are at the very end
                // of the input, since moveStart/moveEnd doesn't return what we want
                // in those cases
                endRange = el.createTextRange();
                endRange.collapse(false);

                if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                    start = end = len;
                } else {
                    start = -textInputRange.moveStart("character", -len);
                    start += normalizedValue.slice(0, start).split("\n").length - 1;

                    if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                        end = len;
                    } else {
                        end = -textInputRange.moveEnd("character", -len);
                        end += normalizedValue.slice(0, end).split("\n").length - 1;
                    }
                }
            }
        }
        return {
            start: start,
            end: end
        };
    },
// 基于webix.KeysNavigation修改，支持在编辑模式下键盘导航
    _navigation_helper: function (mode) {
        return function (view, e) {
            var tag = (e.srcElement || e.target);
            var name = tag.tagName.toUpperCase();

            if (!view._in_edit_mode) {
                // ignore clipboard listener
                if (!tag.getAttribute("webixignore")) {
                    // ignore hotkeys if focus in the common input
                    // to allow normal text edit operations
                    if (name === "INPUT" || name === "TEXTAREA" || name === "SELECT") return true;
                }

                if (view && view.moveSelection && view.config.navigation && !view._in_edit_mode) {
                    return view.moveSelection(mode, e.shiftKey);
                }
            } else if (!e.shiftKey) {
                if (!tag.getAttribute("webixignore")) {
                    if (name === "INPUT") {
                        var selection = view._get_input_selection(tag);
                        var valLen = tag.value.length;
                        if (
                            // 在单元格最左边，向左移动
                        (mode === 'left' && selection.start === 0) ||
                        // 在单元格最右边，向右移动
                        (mode === 'right' && valLen === selection.end) ||
                        // 向上移动
                        (mode === 'up') ||
                        // 向下移动
                        (mode === 'down')) {
                            view.editStop();
                            view.moveSelection(mode, e.shiftKey);
                        }
                        return true;
                    } else if (name === "TEXTAREA" || name === "SELECT") {
                        return true;
                    }
                }
            }

            return true;
        };
    },

    hwValidators_setter(config) {
        let rules = mapValues(config, function (validators) {

            if (isString(validators)) return validators;

            return function (value, data, key) {
                let invalidMessage = [];

                [].concat(validators).forEach(validator => {
                    if (isString(validator)) {
                        if (webix.rules[validator] && !webix.rules[validator].call(this, value, data, key))
                            invalidMessage.push(this.elements[key].config.invalidMessage)
                    }
                    else if (validator.type === "custom") {
                        if (!validate(data, validator.expression))
                            invalidMessage.push(validator.invalidMessage);
                    }
                    // TODO
                })

                if (invalidMessage.length > 0) {
                    this.elements[key].config.invalidMessage = invalidMessage.join("; ");
                    return false;
                }
                return true;
            }
        })

        this.define("rules", rules);
        return config;
    },

    /**
     * 获取最顶层View对象
     * (处理某些组件无法通过getTopParentView方法获取最顶层的问题)
     *
     * @returns view
     */
    hwGetTopView() {
        let parent = this.getParentView();
        return parent ? parent.hwGetTopView() : this;
    },

// 判断组件当前是否处于设计器的画布中，用于组件在不同环境下渲染出不同外观
// 判断依据是递归 _parent_cell，如果找到 id 为 EDITOR_CONTEXT 的父级则表示处于设计器的画布中，否则不是
    isInDesigner() {

        let designer = $$('EDITOR_CONTEXT');
        return designer && designer.isVisible();
        //     let result = false,
        // parent_cell = this._parent_cell;
        // while (parent_cell) {
        //   if (parent_cell.config.id === 'EDITOR_CONTEXT') {
        //     result = true;
        //     break;
        //   } else {
        //     parent_cell = parent_cell._parent_cell;
        //   }
        // }

        // return result;
    }
};
