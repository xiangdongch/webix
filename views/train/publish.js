define([
], function () {
    var datatableId = webix.uid().toString();

    var dateCheck = function(obj){
        if(!$$('start').getValue() ) return false;
        if(!$$('end').getValue() ) return false;
        if($$('start').getValue() > $$('end').getValue()){
            msgBox('开始日期不能大于结束日期');
            return false;
        }
        return true;
    };

    var add = function () {

        var win = {};

        var submit = function () {
            var form = $$('tickout_form');
            if (form.validate() && dateCheck()) {
                doIPost('train/setting/add', form.getValues(), function (data) {
                    if (data.success) {
                        msgBox('操作成功');
                        win.close();
                        $$(datatableId).reload();
                    } else {
                        msgBox('操作失败<br>' + data.message)
                    }
                });
            } else {
                msgBox('信息不完整信息');
            }
        };

        win = getWin("新建培训", {
            rows: [
                {
                    view:"form",
                    id: 'tickout_form',
                    elementsConfig: {
                        labelAlign: 'right',
                        labelWidth: 70
                    },
                    elements:[
                        {view: "richselect", label: "培训科目", name: 'trainName', width: 300,
                            options:[
                                {id: '体能考核', value: "体能考核"},
                                {id: '服从性考核', value: "服从性考核"},
                                {id: '防爆考核', value: "防爆考核"},
                                {id: '搜寻考核', value: "搜寻考核"}
                            ]
                        },
                        {cols: [
                            {view: "datepicker", label: "起止日期", name: "startDateStr", id: 'start', width: 180, format:"%Y-%m-%d", stringResult: true, on: { onChange: dateCheck }},
                            {view: "datepicker", label: "-", name: "endDateStr", id: 'end', labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true, on: { onChange: dateCheck }},
                            {}
                        ]} ,
                        {view: "text", label: "培训单位", name: "trainUnit", width: 300, attributes:{ maxlength: 128 }},
                        {view: "text", label: "培训地址", name: "trainAddr", width: 300, attributes:{ maxlength: 200 }},
                        {view: "text", label: "主考人", name: 'trainUser', width: 300, attributes:{ maxlength: 64 }},
                        {view: "textarea", label: "主要内容", name: "trainDesc", width: 300, attributes:{ maxlength: 200 }}
                    ],
                    rules:{
                        "trainName":webix.rules.isNotEmpty,
                        "startDateStr":webix.rules.isNotEmpty,
                        "endDateStr":webix.rules.isNotEmpty,
                        "trainUnit":webix.rules.isNotEmpty,
                        "trainAddr":webix.rules.isNotEmpty,
                        "trainDesc":webix.rules.isNotEmpty
                    }
                },
                {width: 400},
                {
                    cols:[
                        {},
                        {view: "button", label: "取消", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "提交", width: 65, click: submit}
                    ]
                }
            ]
        }, {height: 350});
        win.show();
    };

    var update = function () {
        var win = {};
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        var item = data[data.length-1];

        var submit = function () {
            var values = $$('tickout_form').getValues();
            console.log(values);
            var param = {
                "id": item.id,
                "trainName": values.trainName,
                "startDateStr": values.startDateStr,
                "endDateStr": values.endDateStr,
                "trainUnit": values.trainUnit,
                "trainAddr": values.trainAddr,
                "trainUser": values.trainUser,
                "trainDesc": values.trainDesc
            };
            doPost('train/setting/update', param, function(data){
                if(data.success){
                    datatable.reload();
                    msgBox('修改成功');
                    win.close();
                }else{
                    msgBox('操作失败<br>' + data.message)
                }
            });
        };

        win = getWin("编辑培训", {
            rows: [
                {
                    view:"form",
                    id: 'tickout_form',
                    elementsConfig: {
                        labelAlign: 'right',
                        labelWidth: 70
                    },
                    elements:[
                        {view: "richselect", label: "培训科目", name: 'trainName', width: 300,  value: item.trainName,
                            options:[
                                {id: '体力培训', value: "体力培训"},
                                {id: '服从性培训', value: "服从性培训"},
                                {id: '防爆培训', value: "防爆培训"},
                                {id: '搜索培训', value: "搜索培训"}
                            ]
                        },
                        {cols: [
                            {view: "datepicker", label: "起止日期", name: "startDateStr", value: item.startDate, id: 'start', width: 180, format:"%Y-%m-%d", stringResult: true, on: { onChange: dateCheck }},
                            {view: "datepicker", label: "-", name: "endDateStr", value: item.endDate, id: 'end', labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true, on: { onChange: dateCheck }},
                            {}
                        ]} ,
                        {view: "text", label: "培训单位", name: "trainUnit", value: item.trainUnit, width: 300, attributes:{ maxlength: 128 }},
                        {view: "text", label: "培训地址", name: "trainAddr", value: item.trainAddr, width: 300, attributes:{ maxlength: 200 }},
                        {view: "text", label: "主考人", name: 'trainUser',  value: item.trainUser, width: 300, attributes:{ maxlength: 64 }},
                        {view: "textarea", label: "主要内容", name: "trainDesc", value: item.trainDesc, width: 300, attributes:{ maxlength: 200 }}
                    ],
                    rules:{
                        "trainName":webix.rules.isNotEmpty,
                        "startDateStr":webix.rules.isNotEmpty,
                        "endDateStr":webix.rules.isNotEmpty,
                        "trainUnit":webix.rules.isNotEmpty,
                        "trainAddr":webix.rules.isNotEmpty,
                        "trainUser":webix.rules.isNotEmpty,
                        "trainDesc":webix.rules.isNotEmpty
                    }
                },
                {width: 400},
                {
                    cols:[
                        {},
                        {view: "button", label: "取消", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "提交", width: 65, click: submit}
                    ]
                }
            ]
        }, {height: 350});
        win.show();
    };

    var del = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        console.log(data);
        webix.confirm({
            text:"确定删除？删除后报名数据也将被删除", ok:"是", cancel:"否",
            callback:function(res){
                if(res){
                    doIPost('train/setting/delete', data, function (data) {
                        if(data.success){
                            msgBox('删除成功');
                            datatable.reload();
                        }else{
                            msgBox('删除失败');
                        }
                    })
                }
            }
        });
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
                id: 'search_from',
                elementsConfig: {
                    labelWidth: 90
                },
                elements: [
                    {
                        cols: [
                            {view: "richselect", label: "培训科目", name: 'trainName', value:"安检", width: 180, labelWidth: 60,
                                options:[
                                    {id: '体能考核', value: "体能考核"},
                                    {id: '服从性考核', value: "服从性考核"},
                                    {id: '防爆考核', value: "防爆考核"},
                                    {id: '搜寻考核', value: "搜寻考核"}
                                ]
                            },
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "培训单位", name: "trainUnit", width: 180, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {view: "datepicker", label: "开始日期", name: "startDateStr",labelWidth: 60, width: 170, format:"%Y-%m-%d", stringResult: true},
                            {view: "datepicker", label: "-", name: "endDateStr",labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true},
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "查找", type: "form", width: 100, paddingX: 10, click: function () {
                                var datatable = $$(datatableId);
                                var params = $$('search_from').getValues();
                                for(var n in params){
                                    if(!params[n]){
                                        delete params[n];
                                    }
                                };
                                datatable.config.customUrl.params = params;

                                datatable.reload();
                            }},
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
                    {view: "button", label: "添加", width: 55, click: add},
                    {view: "button", label: "修改", width: 55, click: update},
                    {view: "button", label: "删除", width: 55, click: del},
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
                        checkValue: 'on',
                        uncheckValue: 'off',
                        template: "{common.checkbox()}",
                        width: 40
                    },
                    {id: "$index", header: "NO.", width: 45},
                    {id: "trainName", header: "培训科目", width: 120},
                    {id: "startDate", header: "开始日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "endDate", header: "结束日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "trainDesc", header: "培训内容", width: 200},
                    {id: "trainUnit", header: "培训单位", width: 200},
                    {id: "trainUser", header: "主考人", width: 200},
                    {id: "trainAddr", header: "培训地点", minWidth: 400, fillspace: true}
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
                customUrl: {
                    url: webix.proxy('customProxy','/policeDog/services/train/setting/getList/{pageSize}/{curPage}'),
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
                        "template": "已发布的培训/考核信息",
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