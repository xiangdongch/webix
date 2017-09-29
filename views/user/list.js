define([
    "../common/constant"
], function (constant) {
    var datatableId = webix.uid().toString();

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
                    doPost('user/delete', data, function(data){
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

    var addOrUpdate = function (item) {
        item = item || {};
        var submit = function () {
            var form = $$('tickout_form');
            if(form.validate()){
                var url = 'user/add';
                if(item.id){
                    url = 'user/update';
                }
                var data = form.getValues();
                removeEmptyProperty(data);
                doIPost(url, data, function (data) {
                    if (data.success) {
                        msgBox('操作成功');
                        $$(datatableId).reload();
                        win.close();
                    } else {
                        msgBox('操作失败<br>' + data.message)
                    }
                });
            }else{
                msgBox('请填写申请信息');
            }
        };
        var win = {};
        win = getWin("添加民警", {
            rows: [
                {
                    view:"scrollview",
                    id:"scrollview",
                    scroll:"y",
                    height: 430,
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
                                    {view: "text", hidden: true, name: "id", width: 300, value: item.id},
                                    {
                                        cols: [
                                            {view: "text", label: "姓名", name: "policeName", width: 300, value: item.policeName, attributes:{ maxlength: 64 }},
                                            {view: "text", label: "警号", name: "policeId", width: 300, attributes:{ maxlength: 64 }, value: item.policeId},
                                            {view: "richselect", label: "性别", name: "sex", width: 300, value: item.sex || '男', options: [
                                                {id: '男', value: '男'},
                                                {id: '女', value: '女'},
                                            ]},
                                        ]
                                    },
                                    {view: "text", label: "系统密码", name: "password", type: 'password', width: 300, attributes:{ maxlength: 16 }, value: item.password},
                                    {
                                        cols: [
                                            {view: "text", label: "民族", name: "national", width: 300, attributes:{ maxlength: 8 }, value: item.national},
                                            {view: "text", label: "身份证号", name: "idNun", width: 300, attributes:{ maxlength: 18 }, value: item.idNun},
                                            {view: "datepicker", label: "出生日期", name: "birthday",width: 300, format:"%Y-%m-%d", stringResult: true, value: item.birthday},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "毕业院校", name: "graduFrom", width: 300, attributes:{ maxlength: 32 }, value: item.graduFrom},
                                            {view: "text", label: "学历", name: "education", width: 300, attributes:{ maxlength: 8 }, value: item.education},
                                            {view: "text", label: "学位", name: "degree", width: 300, attributes:{ maxlength: 8 }, value: item.degree},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "richselect", label: "政治面貌", name: "onFace", width: 300, value: item.onFace|| '群众' , options: [
                                                {id: '群众', value: '群众'},
                                                {id: '团员', value: '团员'},
                                                {id: '党员', value: '党员'},
                                            ]},
                                            {view: "text", label: "专业", name: "major", width: 300, attributes:{ maxlength: 64 }, value: item.major},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "联系方式", name: "contactInfo", width: 300, attributes:{ maxlength: 32 }, value: item.contactInfo},
                                            {view: "richselect", label: "工作单位", name: "workUnit", width: 300, options: constant.getUnitOptions(), value: item.workUnit},
                                            {view: "richselect", label: "身份类别", name: "workType", width: 300, value: item.workType||'民警', options: [
                                                {id: '民警', value: '民警'},
                                                {id: '辅警', value: '辅警'},
                                            ]},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "部门", name: "dept", width: 300, attributes:{ maxlength: 32 }, value: item.dept},
                                            {view: "text", label: "职务", name: "job", width: 300, attributes:{ maxlength:16 }, value: item.job},
                                            {view: "text", label: "职称", name: "jobTitle", width: 300, attributes:{ maxlength: 16 }, value: item.jobTitle},
                                        ]
                                    },
                                    {
                                        cols: [
                                            {view: "text", label: "证书资格", name: "certQuali", width: 300, attributes:{ maxlength: 16 }, value: item.certQuali},
                                            {view: "text", label: "证书编号", name: "certNum", width: 300, attributes:{ maxlength: 32 }, value: item.certNum},
                                        ]
                                    },
                                    {view: "textarea", label: "立功信息<br>获奖信息", name: "rewardInfo", width: 900, height: 120, value: item.rewardInfo},
                                ],
                                rules:{
                                }
                            }
                        ]
                    }
                },
                {
                    cols:[
                        {},
                        {view: "button", label: "取消", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "保存", width: 65, click: submit}
                    ]
                }
            ]
        }, {height: 550, width: 950});
        win.show();
    };

    var update = function (item) {
        var submit = function () {
            var form = $$('update_form');
            if(form.validate()){
                doIPost('/apply/dog/update', form.getValues(), function (data) {
                    if (data.success) {
                        msgBox('操作成功');
                        $$(datatableId).reload();
                        win.close();
                    } else {
                        msgBox('操作失败<br>' + data.message)
                    }
                });
            }else{
                msgBox('请填写申请信息');
            }
        };
        var win = {};
        win = getWin("修改申请信息", {
            rows: [
                {
                    view:"scrollview",
                    scroll:"y",
                    height: 200,
                    body:{
                        rows:[
                            {
                                view:"form",
                                id: 'update_form',
                                elementsConfig: {
                                    labelAlign: 'right',
                                    labelWidth: 70
                                },
                                elements:[
                                    {view: "text", hidden: true, name: "id", width: 300, value: item.id},
                                    {view: "text", hidden: true, name: "applyState", width: 300, value: 1},
                                    {view: "text", label: "数量", name: "applyAmount", width: 300, attributes:{ maxlength: 3 },value: item.applyAmount},
                                    {view: "textarea", label: "备注", name: "applyDesc", width: 300, attributes:{ maxlength: 128 }, height: 100, value: item.applyDesc},
                                ],
                                rules:{
                                    "applyDesc":webix.rules.isNotEmpty,
                                    "applyAmount":webix.rules.isNotEmpty
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

    var approve = function () {
        var datatable = $$(datatableId);
        var data = datatable.getCheckedData();
        if(data.length == 0){
            msgBox("请至少选择一条数据");
            return ;
        }
        var win = getWin("批量审批", {
            rows: [{
                height: 30,
                borderless: true,
                template: '一共选择了'+data.length+'条申请，请审批'
            }, {
                view: "richselect", label: "审批结果", id: 'applyState', width: 200, value: '2', labelWidth: 60,
                options: [
                    {id: '2', value: "通过"},
                    {id: '3', value: "驳回"}
                ]
            },
                {view: "text", label: "审批意见", name: "approveDetail", id: 'approveDetail', labelWidth: 60, width: 280},
                {width: 400},
                {
                    cols:[
                        {},
                        {view: "button", label: "取消", css: 'non-essential', width: 65, click: function () {
                            win.close();
                        }},
                        {width: DEFAULT_PADDING/2},
                        {view: "button", label: "提交", width: 65, click: function () {
                            var da = [];
                            var applyState = $$('applyState').getValue();
                            var approveDetail = $$('approveDetail').getValue();
                            for(var i = 0; i<data.length; i++){
                                da.push({
                                    id: data[i].id,
                                    dogId: data[i].dogId,
                                    applyState: applyState,
                                    applyDateStr: webix.Date.dateToStr("%Y-%m-%d")(new Date()) ,
                                    approveDetail: approveDetail
                                });
                            }
                            doIPost('apply/die/update', da, function(res){
                                win.close();
                                if(res.success){
                                    $$(datatableId).reload();
                                }else{
                                    msgBox('操作失败<br>' + res.message)
                                }
                            });
                        }}
                    ]
                }]
        }, {width: 400, height: 160});
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
                            {view: "text", label: "民警姓名", name: "policeNameLike",labelWidth: 60, width: 220},
                            // {width: DEFAULT_PADDING},
                            {width: DEFAULT_PADDING},
                            {view: "button", label: "清空", type: "form", width: 70, paddingX: 10, click: function(){
                                $$('breed_from').clear();
                            }},
                            {view: "button", label: "查找", type: "form", width: 70, paddingX: 10, click: function(){
                                var params = $$('breed_from').getValues();
                                removeEmptyProperty(params, true);
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
                    {view: "button", label: "添加", width: 70, click: function(){addOrUpdate()}},
                    {view: "button", label: "删除", width: 70, click: del},
                    {},
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
                    {
                        id: "id",
                        header: "操作",
                        template: '<a class="my_link edit" href="javascript:void(0)"><span class="webix_icon icon fa-pencil-square-o"></span></a>',
                        tooltip: '编辑',
                        width: 50
                    },
                    {id: "policeId", header: "警号", width: 80, sort: "string"},
                    {id: "policeName", header: "姓名", width: 80, sort: "string"},
                    {id: "sex", header: "性别", width: 50, sort: "string"},
                    {id: "national", header: "民族", width: 50, sort: "string"},
                    {id: "idNun", header: "身份证号", width: 145, sort: "string"},
                    {id: "birthday", header: "出生日期", width: 80, sort: "string"},
                    {id: "onFace", header: "政治面貌", width: 80, sort: "string"},
                    {id: "education", header: "学历", width: 80, sort: "string"},
                    {id: "degree", header: "学位", width: 80, sort: "string"},
                    {id: "graduFrom", header: "毕业院校", width: 80, sort: "string"},
                    {id: "major", header: "专业", width: 120, sort: "string"},
                    {id: "contactInfo", header: "联系方式", width: 100, sort: "string"},
                    {id: "workUnit", header: "工作单位", width: 120, sort: "string"},
                    {id: "workType", header: "身份类别", width: 80, sort: "string"},
                    {id: "dept", header: "部门", width: 80, sort: "string"},
                    {id: "jobTitle", header: "职称", width: 80, sort: "string"},
                    {id: "job", header: "职务", width: 80, sort: "string"},
                    {id: "certQuali", header: "证书资格", width: 80, sort: "string"},
                    {id: "certNum", header: "证书编号", width: 80, sort: "string"},
                    {id: "rewardInfo", header: "立功授奖信息", width: 80, sort: "string"},
                    {id: "userRole", header: "系统角色", width: 80, sort: "string", template: function (item) {
                        return {
                            "JingYuan": "带犬民警",
                            "JuZhang": "分局局长",
                            "JiuZhiDui": "九支队",
                            "GuanLiYuan": "分局管理员",
                            "FanZhiRenYuan": "繁殖人员",
                            "PeiXunRenYuan": "培训人员",
                            "SuperMan": "超级管理员"
                        }[item.userRole] || '未配置';
                    }},
                    {id: "approveRole", header: "是否审批人", width: 80, sort: "string", template: function(item){ if(item.approveRole) return '是'; else return '' }},
                    {id: "creationDate", header: "创建日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
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
                    edit: function (ev, obj) {
                        var datatable = $$(datatableId);
                        var item = datatable.getItem(obj.row);
                        console.log(item);
                        addOrUpdate(item);
                    },
                    showDetail: function (ev, obj, el) {
                        var datatable = $$(datatableId);
                        var item = datatable.getItem(obj.row);
                        if(item.approveDetail){
                            var detail = JSON.parse(item.approveDetail);
                            if(detail.length > 0){

                            }else{
                                msgBox('暂无审批')
                            }
                        }else{
                            msgBox('暂无审批')
                        }
                    }
                },
                tooltip:true,
                minHeight: 80,
                datafetch: 20,//default
                customUrl: {
                    url: webix.proxy('customProxy','/policeDog/services/user/getList/{pageSize}/{curPage}'),
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