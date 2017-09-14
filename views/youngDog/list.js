define([
    'views/common/columns',
    'views/common/tickout',
    'views/common/editDogInfo'
], function (columns, tickout, editDog) {
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
        removeEmptyProperty(params);
        params.growthStage = 1;
        datatable.config.customUrl.params = params;
        datatable.reload();
    };

    /**
     * 淘汰
     */
    var tickOut = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        tickout.doTickOut(data, datatable);
    };

    /**
     * 死亡
     */
    var died = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        tickout.doDied(data, datatable);
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
                            {view: "text", label: "警犬芯片号", name: "chipNo", width: 150, labelWidth: 70},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "父犬芯片号", name: "fatherId", width: 180, labelWidth: 70},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "母犬芯片号", name: "motherId", width: 180, labelWidth: 70},
                            {width: DEFAULT_PADDING},
                            {cols: [
                                {view: "datepicker", label: "出生日期", name: "birthdayStart", id: 'start',labelWidth: 60, width: 180, format:"%Y-%m-%d", stringResult: true},
                                {view: "datepicker", label: "-", name: "birthdayEnd", id: 'end', labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true},
                                {}
                            ]} ,
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "清空", type: "form", width: 70, paddingX: 10, click: function(){
                                $$('form').clear();
                            }},
                            {view: "button", label: "查找", type: "form", width: 70, paddingX: 10, click: search},
                            {}
                        ]
                    }
                ]
            }
        ]
    };

    var cols = columns.getColumns( //"窝编号",
        ["犬名", "芯片号", "芯片注入日期", "性别", "出生日期", "父亲芯片号", "母亲芯片号", "品种", "来源", "毛色", "毛型", "繁育员", "训导员" ],
        [{
            id: "id",
            header: "操作",
            template: '<div align="center"><a class="my_link edit" href="javascript:void(0)"><span class="webix_icon icon fa-pencil-square-o"></span></a></div>',
            tooltip: '编辑',
            width: 48
        }]
    );

    var gridPager = {
        rows: [
            {
                view: "form",
                css: "toolbar",
                paddingY: 5,
                paddingX: 10,
                height: 36,
                cols: [
                    {view: "button", label: "淘汰申请", width: 65, click: tickOut},
                    {view: "button", label: "死亡申请", width: 65, click: died},
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
                        editDog.openEdit('');
                    }
                },
                tooltip:true,
                minHeight: 80,
                datafetch: 20,//default
                customUrl: {
                    // autoload: true,
                    url: webix.proxy('customProxy','/policeDog/services/dogBaseInfo/getAll/{pageSize}/{curPage}'),
                    httpMethod: 'post',
                    params: {growthStage: 1},
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