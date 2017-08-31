define([], function () {
    var datatableId = webix.uid().toString();

    var addPro = function () {
        var win = getWin('授予权限', {
            rows: [
                {
                    cols: [{
                        rows:[
                            {view: "text", label: "芯片号", name: "chipNo", width: 300, on:{onChange: function(){
                                // onChange(this.getValue(), true);
                            }}},
                            {view: "text", label: "犬名", name: "dogName", width: 300, readonly: true, placeholder: '自动填充'},
                            {view: "text", label: "品种", name: "breed", width: 300, readonly: true, placeholder: '自动填充'},
                            {view: "datepicker", label: "交配日期", name: "mateDate", width: 300, value: new Date(), format:"%Y-%m-%d", stringResult: true},
                            {view: "text", label: "产仔数", name: "litterSize", width: 300}
                        ]
                    },{}]
                },
                {},
                {
                    cols: [
                        {},
                        {view:"button", width: 60, value:"取消", css: "non-essential"},
                        {width: 10},
                        {view:"button", width: 60, value:"确定"},
                        {}
                    ]
                }
            ]
        }, {width: 450});
        win.show();
    };

    /**
     * 除虫操作
     */
    var doWorm = function () {
        var datatable = $$(datatableId);
        var checkData = datatable.getCheckedData();
        console.log(checkData);
    };

    /**
     * 执行搜索
     */
    var search = function () {
        var datatable = $$(datatableId);
        var params = $$('form').getValues();
        datatable.config.customUrl.params = params;
        datatable.reload();
    };

    var searchForm = {
        type: "clean",
        rows: [
            {
                view: "toolbar",
                css: "highlighted_header header1",
                paddingX: 5,
                paddingY: 5,
                height: 35,
                cols: [{
                    "template": "查找",
                    "css": "sub_title2",
                    borderless: true
                }]
            },
            {
                view: "form",
                id: 'form',
                elementsConfig: {
                    labelWidth: 90
                },
                elements: [
                    {
                        cols: [
                            {view: "text", label: "警犬芯片号", name: "father", width: 300},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "窝编号", name: "nestNo", width: 300, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {
                                view: "richselect", label: "完成状态", value: "-1", width: 180, labelWidth: 60, options: [
                                {id: '-1', value: "全部"},
                                {id: '2', value: "未完成"},
                                {id: '1', value: "已完成"}
                            ]
                            },
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "查找幼犬", type: "form", width: 100, paddingX: 10, click: search},
                            {}
                        ]
                    }
                ],
                rules: {
                    "father": webix.rules.isNotEmpty,
                    "mother": webix.rules.isNotEmpty
                }
            }
        ]
    };


    var gridPager = {
        rows: [
            {
                view: "form",
                css: "toolbar",
                paddingY: 5,
                paddingX: 10,
                height: 36,
                cols: [
                    {view: "button", label: "授予技能", width: 70, click: addPro},
                    {view: "button", label: "删除技能", width: 70, click: doWorm},
                    {}
                ]
            },
            {
                id: datatableId,
                view: "datatable",
                select: true,
                columns: [
                    {
                        id: "$check",
                        header: {content: "masterCheckbox"},
                        checkValue: true,
                        uncheckValue: false,
                        template: "{common.checkbox()}",
                        width: 40
                    },
                    {id: "$index", header: "NO.", width: 60},
                    {id: "nestNo", header: "窝编号", width: 130, sort: "string"},
                    {id: "dogName", header: "犬名", width: 90},
                    {id: "chipNo", header: "芯片号", width: 90},
                    {id: "wormDate", header: "除虫日期", width: 100, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "tutor", header: "次序", width: 100},
                    {
                        id: "wormState", header: "是否完成", width: 100, template: function (obj, common, value) {
                        return value == 2 ? '已完成' : '未进行';
                    }
                    },
                    {id: "chipNoInject", header: "芯片注入日期", width: 90, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "sex", header: "性别", width: 90},
                    {id: "birthday", header: "出生日期", sort: "string", format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "breed", header: "品种", width: 130, sort: "string"},
                    {id: "dogSource", header: "来源", width: 130, sort: "string"},
                    {id: "dogColour", header: "毛色", width: 130, sort: "string"},
                    {id: "hairType", header: "毛型", width: 130, sort: "string"},
                    {id: "breeder", header: "繁育员", width: 130, sort: "string"}
                ],
                on: {
                    onBeforeLoad: function () {
                        this.showOverlay("Loading...");
                    },
                    onAfterLoad: function () {
                        this.hideOverlay();
                    }
                },
                onClick: {
                    edit: function (a, b, c) {
                        console.log([a, b, c]);
                    },
                    webix_icon: function (e, id) {
                        webix.confirm({
                            text: "Are you sure sdfds", ok: "Yes", cancel: "Cancel",
                            callback: function (res) {
                                if (res) {
                                    webix.$$("orderData").remove(id);
                                }
                            }
                        });
                    }
                },
                tooltip: true,
                minHeight: 80,
                datafetch: 20,//default
                customUrl: {
                    url: webix.proxy('customProxy', '/policeDog/services/dogBaseInfo/getAll/{pageSize}/{curPage}'),
                    httpMethod: 'post',
                    datatype: 'customJson'
                },
                pager: "pagerA"
            },
            {
                view: "pager",
                id: "pagerA",
                size: 20,
                group: 5,
                template: "{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}<div style='float: right'>总共#count#条</div>"
            }
        ]
    };


    var datatable = {
        type: "clean",
        rows: [
            {
                view: "toolbar",
                css: "highlighted_header header1",
                paddingX: 5,
                paddingY: 5,
                height: 35,
                cols: [
                    {
                        "template": "结果",
                        "css": "sub_title2",
                        borderless: true
                    }
                ]
            },
            gridPager
        ]
    };

    return {
        $ui: {
            type: "space",
            // type: "wide",
            rows: [
                {rows: [searchForm, datatable]}
            ]
        }
    };
});