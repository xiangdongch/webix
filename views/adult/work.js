define([
    "views/common/columns"
], function (column) {
    var datatableId = webix.uid().toString();
    /**
     * 除虫操作
     */
    var doWorm = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        var w = loading();
        doPost('wormImmue/finishWorm', data, function(data){
            console.log(data);
            w.close();
            if(data.success){
                datatable.reload();
            }else{
                msgBox('操作失败<br>' + data.message)
            }
        });
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

    var addWorm = function () {
        var submit = function () {
            var form = $$('tickout_form');
            if(form.validate()){
                // doIPost('dogBaseInfo/tickout', data, function (data) {
                //     if (data.success) {
                //         datatable.reload();
                msgBox('操作成功，记录新增成功');
                win.close();
                // } else {
                //     msgBox('操作失败<br>' + data.message)
                // }
                // });
            }else{
                msgBox('请填写除虫信息');
            }

        };
        var win = {};
        win = getWin("补充除虫记录", {
            rows: [
                {
                    view:"scrollview",
                    id:"scrollview",
                    scroll:"y",
                    height: 200,
                    body:{
                        rows:[
                            {
                                view:"form",
                                id: 'tickout_form',
                                elementsConfig: {
                                    labelAlign: 'right',
                                    labelWidth: 70
                                },
                                elements:[
                                    {view: "text", label: "警犬窝编号", name: "nestNo", width: 300, attributes:{ maxlength: 64 }},
                                    {view: "text", label: "警犬芯片号", name: "dogId", width: 300, attributes:{ maxlength: 64 }},
                                    {view: "text", label: "除虫周期", name: "wormDesc", value: '补充', width: 300, attributes:{ maxlength: 64 }},
                                    {view: "datepicker", label: "除虫日期", name: "wormDateStr", width: 240, format:"%Y-%m-%d", stringResult: true},
                                    {view: "text", label: "操作人员", name: "policeName", width: 300, attributes:{ maxlength: 128 }}
                                ],
                                rules:{
                                    "nestNo":webix.rules.isNotEmpty,
                                    "dogId":webix.rules.isNotEmpty,
                                    "wormDesc":webix.rules.isNotEmpty,
                                    "wormDateStr":webix.rules.isNotEmpty,
                                    "policeName":webix.rules.isNotEmpty
                                }
                            }
                        ]
                    }
                },
                {width: 400},
                {
                    cols:[
                        {},
                        {view: "button", label: "取消申请", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "提交申请", width: 65, click: submit}
                    ]
                }
            ]
        }, {height: 290});
        win.show();
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
                            {view: "text", label: "警犬芯片号", name: "father", width: 180, labelWidth: 75},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "用犬单位", name: "father", width: 180, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "案件性质", name: "father", width: 180, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {view: "datepicker", label: "使用日期", name: "immueDateStr",labelWidth: 60, width: 170, format:"%Y-%m-%d", stringResult: true},
                            {view: "datepicker", label: "-", name: "immueDateStr",labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true},
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "查找幼犬", type: "form", width: 100, paddingX: 10, click: search},
                            {}
                        ]
                    }
                ],
                rules:{
                    "father":webix.rules.isNotEmpty,
                    "mother":webix.rules.isNotEmpty
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
                    {view: "button", label: "添加", width: 50},
                    {view: "button", label: "删除", width: 50},
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
                    {id: "$index", header: "NO.", width: 45},
                    {id: "dogInfo.dogName", header: "犬名", width: 90, template: function(obj){ return obj.dogInfo.dogName || ''; } },
                    {id: "creationDate", header: "日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "profName", header: "时间", width: 100},
                    {id: "chipNo", header: "用犬单位", width: 110 },
                    {id: "chipNo", header: "出勤人员", width: 110 },
                    {id: "chipNo", header: "案件性质", width: 110 },
                    {id: "chipNo", header: "案件编号", width: 110 },
                    {id: "chipNo", header: "案件等级", width: 110 },
                    {id: "chipNo", header: "主要任务", width: 110 },
                    {id: "chipNo", header: "使用结果", width: 110 },
                    {width: 1}
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
                tooltip:true,
                minHeight: 80,
                datafetch: 20,//default
                data: [],
                // customUrl: {
                //     url: webix.proxy('customProxy','/policeDog/services/profession/getList/{pageSize}/{curPage}'),
                //     httpMethod: 'post',
                //     datatype: 'customJson'
                // },
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