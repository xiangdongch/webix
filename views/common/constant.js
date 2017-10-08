define([
    'views/common/columns'
], function (columns) {

    var constant = {
        /**
         * 品种
         */
        breedType: [
            "史宾格犬",
            "罗威纳犬",
            "拉布拉多犬",
            "德国牧羊犬",
            "荷兰牧羊犬",
            "昆明犬",
            "马里努阿犬",
            "金毛犬",
            "杜宾犬（杜博文）",
            "杂交犬",
            "其他"
        ],
        getBreedTypeOptions: function (hasAll) {
            var options = [];
            if(hasAll){
                options.push({id: '-1', value: '全部'});
            }
            for(var i = 0; i<constant.breedType.length; i++){
                var v = constant.breedType[i];
                options.push({id: v, value: v});
            }
            return options;
        },
        /**
         * 毛色
         */
        dogColor: [
            '黑',
            '黄',
            '棕',
            '黑背黄腹',
            '浅黄',
            '棕黄',
            '黑白',
            '棕白',
            '豹纹',
            '狼青',
            '枯草黄',
            '其他'
        ],
        getDogColorOptions: function (hasAll) {
            var options = [];
            if(hasAll){
                options.push({id: '-1', value: '全部'});
            }
            for(var i = 0; i<constant.dogColor.length; i++){
                var v = constant.dogColor[i];
                options.push({id: v, value: v});
            }
            return options;
        },
        /**
         * 毛型
         */
        hairType: [
            "短毛",
            "长毛",
            "中长毛",
            "其他"
        ],
        getHairTypeOptions: function () {
            var options = [];
            for(var i = 0; i<constant.dogColor.length; i++){
                var v = constant.dogColor[i];
                options.push({id: v, value: v});
            }
            return options;
        },
        /**
         * 来源
         */
        dog_source: [
            "自繁",
            "南京片区",
            "沈阳片区",
            "昆明片区",
            "南昌片区",
            "民间",
            "部队",
            "国外",
            "动检系统",
            "其他"
        ],
        getDogSourceOptions: function () {
            var options = [];
            for(var i = 0; i<constant.dog_source.length; i++){
                var v = constant.dog_source[i];
                options.push({id: v, value: v});
            }
            return options;
        },
        work_unit: [
            "刑侦总队",
            "公交总队",
            "特警总队",
            "天安门分局",
            "西站分局",
            "开发局分局",
            "清河分局",
            "东城分局",
            "西城分局",
            "朝阳分局",
            "海淀分局",
            "丰台分局",
            "通州分局",
            "昌平分局",
            "石景山分局",
            "门头沟分局",
            "大兴分局",
            "怀柔分局",
            "房山分局",
            "平谷分局",
            "顺义分局",
            "密云分局",
            "延庆县分局",
            "消防",
            "振远",
            "警卫局",
            "机场",
            "警院"
        ],
        getUnitOptions: function () {
            var options = [];
            for(var i = 0; i<constant.work_unit.length; i++){
                var v = constant.work_unit[i];
                options.push({id: v, value: v});
            }
            return options;
        },
        getWorkType: function () {
            return [
                {id: '1', value: '工作犬'},
                {id: '2', value: '非工作犬'}
            ];
        },
        getDogLevel: function () {
            return [
                {id: '1', value: '一级'},
                {id: '2', value: '二级'},
                {id: '3', value: '三级'}
            ];
        },
        getGrowthStage: function () {
            return [
                {id: '1', value: '幼犬'},
                {id: '2', value: '成犬'}
            ];
        },
        getWorkStage: function () {
            return [
                {id: '1', value: '待分配'},
                {id: '2', value: '已分配'},
                {id: '3', value: '已淘汰'},
                {id: '4', value: '死亡'}
            ];
        },
        getDogArea: function () {
            return [
                {id: '0', value: '基地'},
                {id: '1', value: '南京片区'},
                {id: '2', value: '沈阳片区'},
                {id: '4', value: '昆明片区'},
                {id: '5', value: '南昌片区'},
                {id: '6', value: '部队'}
            ];
        },
        showRelative: function (data) {
            var girl = data.result.girl;
            for(var i in girl){
                delete girl[i].id;
            }
            var boy = data.result.boy;
            for(var i in boy){
                delete boy[i].id;
            }
            var cssFormat = function(val, item, id){
                if('_Tag' == item.dogColour){
                    return 'orange_color';
                }
            };
            var win = {};
            win = getWin('校验结果', {
                rows: [
                    {
                        cols: [{
                            rows: [{
                                template: '公犬三代亲属信息',
                                borderless: true,
                                css: 'check_title',
                                height: 30
                            },{
                                view:"datatable",
                                height: 220,
                                columns:[
                                    { id:"dogSource", header:"关系", width:55, cssFormat: cssFormat},
                                    { id:"chipNo", header:"芯片号", width:100, cssFormat: cssFormat},
                                    { id:"dogName", header:"警犬名称", width:100, cssFormat: cssFormat},
                                    { id:"birthday", header:"出生日期", width:100, format: webix.Date.dateToStr("%Y-%m-%d"), cssFormat: cssFormat}
                                ],
                                data: boy
                            }]
                        },{
                            rows: [{
                                template: '母犬三代亲属信息',
                                borderless: true,
                                css: 'check_title',
                                height: 30
                            },{
                                view:"datatable",
                                height: 220,
                                columns:[
                                    { id:"dogSource", header:"关系", width:55, cssFormat: cssFormat},
                                    { id:"chipNo", header:"芯片号", width:100, cssFormat: cssFormat},
                                    { id:"dogName", header:"警犬名称", width:100, cssFormat: cssFormat},
                                    { id:"birthday", header:"出生日期", width:100, format: webix.Date.dateToStr("%Y-%m-%d"), cssFormat: cssFormat}
                                ],
                                data: girl
                            }]
                        }]
                    },
                    {
                        height: 40,
                        template: '<div style="font-weight: bold; font-size: 14px;color: #color#">校验结果：#message#</div>',
                        data: {
                            color: data.message ? 'yellow' : '#fff',
                            message: data.message || '验证通过，双方亲属无交叉关系'
                        }
                    }
                ]
            }, {width: 730, height: 350});
            win.show();
        },
        showDogDetail: function(item){
            if(item.sex == 1){
                item.sexStr = '公';
            }else if(item.sex == 2){
                item.sexStr = '母';
            }else{
                item.sexStr = '';
            }
            if(item.dogType == 1){
                item.dogTypeStr = '工作犬';
            }else if(item.dogType == 2){
                item.dogTypeStr = '非工作犬';
            }else{
                item.dogTypeStr = '';
            }
            var win = getWin('警犬详细信息', {
                css: 'dogDetail',
                cols: [
                    {
                        rows: [
                            {
                                borderless: true,
                                template:
                                '<span class="tab_label">犬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>#dogName#<br>' +
                                '<span class="tab_label">芯&nbsp;&nbsp;片&nbsp;&nbsp;号：</span>#chipNo#<br>' +
                                '<span class="tab_label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>#sexStr#<br>' +
                                '<span class="tab_label">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>#birthday#<br>' +
                                '<span class="tab_label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</span>#breed#<br>' +
                                '<span class="tab_label">带犬民警：</span>#tutor#<br>' +
                                '<span class="tab_label">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源：</span>#dogSource#<br>' +
                                '<span class="tab_label">毛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>#dogColour#<br>' +
                                // '<span class="tab_label">外貌特征：</span><br>' +
                                '<span class="tab_label">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>#dogTypeStr#<br>' +
                                '<span class="tab_label">训练成绩：</span>#trainScore#<br>' +
                                '<span class="tab_label">种犬等级：</span>#dogLevel#<br>' +
                                '<span class="tab_label">工作单位：</span>#workPlace#<br>' +
                                '<span class="tab_label">省&nbsp;&nbsp;区&nbsp;&nbsp;市：</span>#workProvince#',
                                data: item
                            }
                        ]
                    },
                    {
                        rows: [
                            {
                                height: 200,
                                cols: [
                                    {},
                                    {borderless: true, template: '<img src="' + item.dogPhoto + '" height="200">', width: 200}
                                ]
                            },
                            {height: 16},
                            {height: 190, borderless: true,
                                template:
                                '<div><span class="tab_label"">毛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>#hairType#</div>' +
                                '<div style="height: 58px"></div>' +
                                '<div><span class="tab_label"">近交系数：</span>#inbreeding#</div>' +
                                '<div style="height: 30px"></div>' +
                                '<div><span class="tab_label"">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</span>#workArea#</div>',
                                data: item
                            },
                            {height: 10},
                            {height: 35, borderless: true, template: '<span class="tab_label"">填写日期：</span>&nbsp;&nbsp;' + webix.Date.dateToStr("%Y&nbsp;年&nbsp;%m&nbsp;月&nbsp;%d&nbsp;日")(new Date()) },
                            {}
                        ]
                    }
                ]
            }, {height: 530});
            win.show();
        },
        setDogList: function (textId, valId) {
            return {
                onItemClick: function () {
                    constant.showDogList(function (datatable) {
                        var data = datatable.getCheckedData();
                        console.log(data);
                        var item = data[data.length - 1];
                        console.log(item.chipNo);
                        $$(textId).setValue(item.dogName);
                        $$(textId).config.val = item.dogName;
                        $$(valId).setValue(item.chipNo);
                    });
                },
                onChange: function (newVal, oldVal) {
                    if($$(textId).config.val){
                        $$(textId).setValue($$(textId).config.val);
                    }
                }
            }
        },
        showDogList: function (callback, params) {
            params = params || {};
            var datatableId = webix.uid().toString();
            var pageId = webix.uid().toString();
            var cols = columns.getColumns(
                ["犬名", "芯片号", "芯片注入日期", "性别", "出生日期", "品种", "来源", "毛色", "毛型", "繁育员", "训导员" ]
            );
            var win = getWin('选择警犬', {
                rows: [
                    {
                        id: datatableId,
                        view: "datatable",
                        select: false,
                        minHeight: 80,
                        datafetch: 20,//default
                        tooltip:false,
                        columns: cols,
                        on: {
                            onBeforeLoad: function () {
                                this.showOverlay("Loading...");
                            },
                            onAfterLoad: function () {
                                this.hideOverlay();
                            },
                            onCheck: function(row, column, state){
                                callback && callback($$(datatableId));
                                win.close();
                            }
                        },
                        customUrl: {
                            // autoload: true,
                            url: webix.proxy('customProxy','/policeDog/services/dogBaseInfo/getAll/{pageSize}/{curPage}'),
                            httpMethod: 'post',
                            params: params,
                            datatype: 'customJson'
                        },
                        pager: pageId
                    },
                    {
                        view: "pager",
                        id: pageId,
                        size: 20,
                        group: 5,
                        template: "{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}<div style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;总共#count#条</div>"
                    },
                    {
                        cols: [
                            {
                                template: '请选择一条警犬，如果选择了多个，只以第一个为准', borderless: true
                            },
                            {
                                view: "button", label: "关闭", css: 'non-essential', width: 65, click: function () {
                                win.close();
                            }
                            },
                            {width: DEFAULT_PADDING / 2},
                            {view: "button", label: "确定", width: 65, click: function(){
                                var datatable = $$(datatableId);
                                callback && callback(datatable);
                                win.close();
                            }}
                        ]
                    }
                ]
            }, {height: 500, width: 800});
            win.show();
        }
    };

    var l = loading('loading', 30);
    webix.ajax().headers({'Content-Type':  'application/json'}).sync().post('/policeDog/services/config/getOrgList', '{}', function(response){
        var data = JSON.parse(response);
        console.log(data);
    });
    l.close();
    return constant;
});