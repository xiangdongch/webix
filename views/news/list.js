define([
], function () {
    var datatableId = webix.uid().toString();

    var doImmue = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        var w = loading();
        doPost('wormImmue/finishImmue', data, function(data){
            console.log(data);
            w.close();
            if(data.success){
                datatable.reload();
            }else{
                msgBox('操作失败<br>' + data.message)
            }
        });
    };

    var del = function(){
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        webix.confirm({
            text:"确定删除？删除不可恢复", ok:"是", cancel:"否",
            callback:function(res){
                if(res){
                    var w = loading();
                    doPost('apply/dog/delete', data, function(data){
                        w.close();
                        if(data.success){
                            datatable.reload();
                        }else{
                            msgBox('操作失败<br>' + data.message)
                        }
                    });
                }
            }
        });
    };
    
    var addImmue = function () {
        var submit = function () {
            var form = $$('tickout_form');
            if(form.validate()){
                doIPost('wormImmue/addImmue', form.getValues(), function (data) {
                    console.log(data);
                    if (data.success) {
                        msgBox('操作成功，记录新增成功');
                        $$(datatableId).reload();
                        win.close();
                    } else {
                        msgBox('操作失败<br>' + data.message)
                    }
                });
            }else{
                msgBox('请填写免疫信息');
            }
        };
        var win = {};
        win = getWin("补充免疫记录", {
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
                                    {view: "text", label: "疫苗名称", name: "immueDesc", value: '补充', width: 300, attributes:{ maxlength: 64 }},
                                    {view: "datepicker", label: "免疫日期", name: "immueDateStr", width: 240, format:"%Y-%m-%d", stringResult: true},
                                    {view: "text", hidden: true, name: "immueState", value: 2},
                                    {view: "text", label: "操作人员", name: "policeName", width: 300, attributes:{ maxlength: 128 }}
                                ],
                                rules:{
                                    "nestNo":webix.rules.isNotEmpty,
                                    "dogId":webix.rules.isNotEmpty,
                                    "immueDesc":webix.rules.isNotEmpty,
                                    "immueDateStr":webix.rules.isNotEmpty,
                                    "immueState":webix.rules.isNotEmpty,
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

    var exportFile = function(){
        var win = {};
        win = getWin("导出名单", {
            rows: [{
                height: 300,
                view: "datatable",
                id: 'for_export',
                select: true,
                columns: [
                    {id: "$index", header: "NO.", width: 45},
                    {id: "dogInfo.dogName", header: "犬名", width: 90, template: function(obj){ return _.get(obj, 'dogInfo.dogName', ''); } },
                    {id: "immueDate", header: "免疫日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
                    {id: "immueName", header: "疫苗名称", width: 100},
                    {id: "immueState", header: "状态", width: 55, template: function(obj, common, value){
                        if(value == 2){
                            return '已完成';
                        }else if(new Date(obj.immueDate) <= new Date()){
                            return '已超期'
                        }else{
                            return '未进行';
                        }
                    }},
                    {id: "nestNo", header: "窝编号", width: 130, sort: "string"},
                    {id: "dogInfo.chipNo", header: "芯片号", width: 90, template: function(obj){ return _.get(obj, 'dogInfo.chipNo', ''); } },
                    {id: "dogInfo.sex", header: "性别", width: 50, template: function(obj){ return ({'1': '公', '2':'母', '3': ''}[_.get(obj, 'dogInfo.sex', '3')]); } },
                    {id: "dogInfo.birthday", header: "出生日期", width: 85, sort: "string", template: function(item){
                        return webix.Date.dateToStr("%Y-%m-%d")( _.get(item, 'dogInfo.birthday', '') );
                    }},
                    {id: "dogInfo.breed", header: "品种", width: 70, sort: "string", template: function(obj){ return _.get(obj, 'dogInfo.breed', ''); } },
                    {id: "dogInfo.dogSource", header: "来源", width: 50, sort: "string", template: function(obj){ return _.get(obj, 'dogInfo.dogSource', ''); } },
                    {id: "dogInfo.dogColour", header: "毛色", width: 50, sort: "string", template: function(obj){ return _.get(obj, 'dogInfo.dogColour', ''); } },
                    {id: "dogInfo.hairType", header: "毛型", width: 50, sort: "string", template: function(obj){ return _.get(obj, 'dogInfo.hairType', '') || ''; } },
                    {id: "dogInfo.breeder", header: "繁育员", width: 80, sort: "string", template: function(obj){ return _.get(obj, 'dogInfo.breeder', ''); } }
                ],
                on: {
                    onBeforeLoad: function () {
                        this.showOverlay("Loading...");
                    },
                    onAfterLoad: function () {
                        this.hideOverlay();
                    }
                },
                tooltip:true,
                minHeight: 80,
                datafetch: 20,
                customUrl: {
                    url: webix.proxy('customProxy','/policeDog/services/wormImmue/list/immue/1000/1'),
                    httpMethod: 'post',
                    datatype: 'customJson',
                    params: {immueState: 1, immueDateEnd: webix.Date.dateToStr("%Y-%m-%d")(new Date())}
                }
            },
                {
                    cols:[
                        {},
                        {view: "button", label: "下载名单", width: 65, click: function(){
                            var win = loading('正在生成');
                            webix.toExcel($$('for_export'));
                            win.close();
                        }}
                    ]
                }]
        },{width: 600});
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
                id: 'breed_from',
                elements: [
                    {
                        cols: [
                            {view: "text", label: "新闻标题", name: "title",labelWidth: 70, width: 500},
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "清空", type: "form", width: 70, paddingX: 10, click: function(){
                                $$('breed_from').clear();
                                $$('breed_from').setValues({immueState: -1});
                            }},
                            {view: "button", label: "查找", type: "form", width: 70, paddingX: 10, click: function(){
                                var params = $$('breed_from').getValues();
                                removeEmptyProperty(params, true);
                                console.log(params);
                                var tab = $$(datatableId);
                                tab.config.customUrl.params = params;
                                tab.reload();
                            }},
                            {}
                        ]
                    }
                ]
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
                    {view: "button", label: "删除", width: 70, click: del},
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
                    {id: "$index", header: "NO.", width: 45},{
                        id: "id",
                        header: "操作",
                        template: function (item) {
                            if(item.applyState == 1 || item.applyState == 3){
                                return '<a class="my_link edit" href="javascript:void(0)"><span class="webix_icon icon fa-pencil-square-o"></span></a>';
                            }else{
                                return '';//<span class="webix_icon icon fa-pencil-square-o"></span>'
                            }
                        },
                        tooltip: '编辑',
                        width: 60
                    },
                    {id: "publishDate", header: "发布日期", width: 150, format: webix.Date.dateToStr("%Y-%m-%d %H:%i:%s")},
                    {id: "title", header: "新闻标题", width: 100, fillspace: 1},
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
                    url: webix.proxy('customProxy','/policeDog/services/news/getList/{pageSize}/{curPage}'),
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