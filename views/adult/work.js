define([
    "views/common/columns"
], function (column) {
    var datatableId = webix.uid().toString();

    /**
     * 执行搜索
     */
    var search = function () {
        var datatable = $$(datatableId);
        var params = $$('form').getValues();
        removeEmptyProperty(params, true);
        datatable.config.customUrl.params = params;
        datatable.reload();
    };

    var add = function () {
        var picMap = {};
        var submit = function () {
            var form = $$('add_form');
            var values = form.getValues();
            var uploader = $$('uploader_pic');
            var picList = [];
            uploader.files.data.getRange().each(function(item){
                picList.push(item.serverName);
            });

            values.workPic = picList.join(',');
            var data = [values];
            if(form.validate()){
                doIPost('work/add', data, function (data) {
                    if (data.success) {
                        $$(datatableId).reload();
                        msgBox('操作成功，记录新增成功');
                        win.close();
                    } else {
                        msgBox('操作失败<br>' + data.message)
                    }
                });
            }else{
                msgBox('请填写必要信息');
            }

        };
        var win = {};
        win = getWin("添加使用记录", {
            rows: [
                {
                    view:"scrollview",
                    id:"scrollview",
                    scroll:"y",
                    height: 330,
                    body:{
                        rows:[
                            {
                                view:"form",
                                id: 'add_form',
                                elementsConfig: {
                                    labelAlign: 'right',
                                    labelWidth: 70
                                },
                                elements:[
                                    {
                                        cols: [
                                            {view: "richselect", label: "工作类型", name: 'workType', value:"安检", width: 240,
                                                options:[
                                                    {id: '安检', value: "安检"},
                                                    {id: '巡逻', value: "巡逻"},
                                                    {id: '刑侦', value: "刑侦"},
                                                    {id: '其他', value: "其他"}
                                                ],
                                                on: {
                                                    onChange: function (newVal) {
                                                        console.log(newVal);
                                                        if(newVal == '安检'){
                                                            $$('security_check_area').enable();
                                                        }else{
                                                            $$('security_check_area').disable();
                                                        }
                                                        if(newVal == '刑侦'){
                                                            $$('case_num').enable();
                                                            $$('case_type').enable();
                                                        }else{
                                                            $$('case_num').disable();
                                                            $$('case_type').disable();
                                                        }
                                                    }
                                                }
                                            },
                                            {view: "text", label: "警犬芯片号", name: "dogChipNo", width: 240},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "用犬单位", name: "workUnit", width: 240, attributes:{ maxlength: 64 }},
                                            {view: "text", label: "出勤人员", name: "attPerson", width: 240, attributes:{ maxlength: 64 }},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "datepicker", label: "开始时间", timepicker: true, name: "startTimeStr", width: 240, format:"%Y-%m-%d %h:%i:%s", stringResult: true},
                                            {view: "datepicker", label: "结束时间", timepicker: true, name: "endTimeStr", width: 240, format:"%Y-%m-%d %h:%i:%s", stringResult: true},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "案件编号", id: 'case_num', name: "caseProperty", disabled: true, width: 240, attributes:{ maxlength: 7 }},
                                            {view: "richselect", label: "案件类型", id: 'case_type', name: "caseNo", disabled: true, width: 240,
                                                options:[
                                                    {id: '一般', value: "一般"},
                                                    {id: '重大', value: "重大"},
                                                    {id: '特大', value: "特大"}
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        cols: [
                                            {
                                                view: "richselect", label: "是否起作用", name: 'isWork', value: "起作用", width: 240,
                                                options: [
                                                    {id: '起作用', value: "起作用"},
                                                    {id: '不起作用', value: "不起作用"}
                                                ]
                                            },
                                            {view: "text", label: "安检面积", id: 'security_check_area', name: "securityCheckArea", width: 240, attributes:{ maxlength: 7 }},
                                        ]
                                    },
                                    {view: "textarea", label: "使用成果", name: "workResult", attributes:{ maxlength: 200 }, height: 80},
                                    {
                                        rows: [
                                            {
                                                view:"uploader",
                                                value:"上传图片",
                                                id: 'uploader_pic',
                                                name: 'workPic',
                                                link:"mylist",
                                                upload:"/policeDog/services/file/upload",
                                                datatype:"json"
                                            },
                                            {
                                                view:"list",
                                                id:"mylist",
                                                type:"uploader",
                                                autoheight:true,
                                                borderless:true
                                            }
                                        ]
                                    }
                                ],
                                rules:{
                                    "dogChipNo":webix.rules.isNotEmpty,
                                    "attPerson":webix.rules.isNotEmpty,
                                    "workUnit":webix.rules.isNotEmpty,
                                    "startTimeStr":webix.rules.isNotEmpty,
                                    "endTimeStr":webix.rules.isNotEmpty,
                                    "isWork":webix.rules.isNotEmpty,
                                    "workResult":webix.rules.isNotEmpty,
                                }
                            }
                        ]
                    }
                },
                {width: 500},
                {
                    cols:[
                        {},
                        {view: "button", label: "关闭", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "保存", width: 65, click: submit}
                    ]
                }
            ]
        }, {height: 430});
        win.show();
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
                    doPost('work/delete', data, function(data){
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
                            {view: "text", label: "警犬芯片号", name: "dogChipNo", width: 180, labelWidth: 75},
                            {width: DEFAULT_PADDING},
                            {view: "text", label: "用犬单位", name: "workUnit", width: 180, labelWidth: 60},
                            {width: DEFAULT_PADDING},
                            {
                                view: "richselect", label: "工作类型", name: 'workType', value: "-1", width: 140,  labelWidth: 60,
                                options: [
                                    {id: '-1', value: "全部"},
                                    {id: '安检', value: "安检"},
                                    {id: '巡逻', value: "巡逻"},
                                    {id: '刑侦', value: "刑侦"},
                                    {id: '其他', value: "其他"}
                                ],
                            },
                            {width: DEFAULT_PADDING},
                            {view: "datepicker", label: "使用日期", name: "startTimeStr",labelWidth: 60, width: 170, format:"%Y-%m-%d", stringResult: true},
                            {view: "datepicker", label: "-", name: "endTimeStr",labelWidth: 10, width: 120, format:"%Y-%m-%d", stringResult: true},
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "查找", type: "form", width: 100, paddingX: 10, click: search},
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
                    {view: "button", label: "添加", width: 50, click: add},
                    {view: "button", label: "删除", width: 50, click: del},
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
                    {id: "workType", header: "类型", width: 100},
                    {id: "dogInfo.dogName", header: "犬名", width: 90, template: function(obj){ return obj.dogInfo.dogName || ''; } },
                    {id: "startTime", header: "开始时间", width: 140, format: webix.Date.dateToStr("%Y-%m-%d %h:%i:%s")},
                    {id: "endTime", header: "结束时间", width: 140, format: webix.Date.dateToStr("%Y-%m-%d %h:%i:%s")},
                    {id: "workUnit", header: "用犬单位", width: 110 },
                    {id: "attPerson", header: "出勤人员", width: 110 },
                    {id: "chipProperty", header: "案件性质", width: 110 },
                    {id: "chipNo", header: "案件编号", width: 110 },
                    {id: "isWork", header: "是否起作用", width: 110 },
                    {id: "securityCheckArea", header: "安检面积", width: 110 },
                    {id: "workResult", header: "成果", width: 110 },
                    {id: "", header: "图片", width: 110, template: function (item) {
                        console.log(item);
                        return '<a href="#">查看图片</a>';
                    }},
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
                customUrl: {
                    url: webix.proxy('customProxy','/policeDog/services/work/getList/{pageSize}/{curPage}'),
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