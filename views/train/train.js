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
                            {view: "text", label: "警犬芯片号", name: "father", width: 300},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "窝编号", name: "nestNo", width: 300, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {view: "richselect", label: "完成状态", value:"-1", width: 180, labelWidth: 60, options:[
                                {id: '-1', value: "全部"},
                                {id: '2', value: "未完成"},
                                {id: '1', value: "已完成"}
                            ]},
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

    var cols = column.getColumns([
        "类型", "日期", "培训单位", "班级名称", "犬名_2", "窝编号_2", "芯片号_2", "教练员", "带犬民警", "基础评分", "总分", "下次复训时间", "培训地点"
    ], []);

    var gridPager = {
        rows: [
            {
                view: "form",
                css: "toolbar",
                paddingY: 5,
                paddingX: 10,
                height: 36,
                cols: [
                    {view: "button", label: "添加", width: 70, click: addWorm},
                    {view: "button", label: "取消报名", width: 50, click: cancel},
                    {}
                ]
            },
            {
                id: datatableId,
                view: "datatable",
                select: true,
                columns: cols,
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
                customUrl: {
                    url: webix.proxy('customProxy','/policeDog/services/train/getList/{pageSize}/{curPage}'),
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