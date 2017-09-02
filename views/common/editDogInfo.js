define([
    "views/common/constant"
], function (constant) {
    var self = {
        openEdit: function(dogInfo){
            var win = {};
            var ui = {
                view:"form",
                id: 'dog_base_info_form',
                elementsConfig: {
                    labelAlign: 'right',
                    labelWidth: 70
                },
                elements:[{
                    rows:[{
                        cols: [{
                            rows: [
                                {view: "text", label: "警犬名称", name: "tickoutDate", format:"%Y-%m-%d", stringResult: true},
                                {view: "text", label: "芯片编号", name: "tickoutReason", attributes:{ maxlength: 128 }},
                                {view: "datepicker", label: "注入日期", name: "tickoutReason", attributes:{ maxlength: 128 }},
                                {view: "richselect", label: "性别", value:"-1", options:[
                                    {id: '1', value: "公犬"},
                                    {id: '2', value: "母犬"}
                                ]},
                                {view: "datepicker", label: "出生日期", name: "tickoutReason", attributes:{ maxlength: 128 }},
                                {view: "richselect", label: "品种", value:"-1", options: constant.getBreedTypeOptions() },
                                {view: "richselect", label: "来源", value:"-1", options: constant.getDogSourceOptions() },
                                {view: "richselect", label: "毛色", value:"-1", options: constant.getDogColorOptions() },
                                {view: "richselect", label: "毛型", value:"-1", options: constant.getHairTypeOptions() },
                                {view: "richselect", label: "工作类型", value:"-1", options: constant.getWorkType() },
                                {view: "richselect", label: "犬种等级", value:"-1", options: constant.getDogLevel() }
                            ]
                        },{width: DEFAULT_PADDING/2},{
                            rows: [
                                {height: 28},
                                {view: "text", label: "父犬名称", name: "tickoutReason", disabled: false},
                                {view: "text", label: "母犬名称", name: "tickoutReason", disabled: false},
                                {view: "richselect", label: "成长阶段", value:"-1", options: constant.getGrowthStage()},
                                {view: "richselect", label: "工作状态", value:"-1", options: constant.getWorkStage()},
                                {view: "text", label: "警犬档案号", name: "tickoutReason", disabled: false},
                                {view: "text", label: "繁育员", name: "tickoutReason", disabled: false},
                                {view: "text", label: "训导员", name: "tickoutReason", disabled: false},
                                {view: "text", label: "复训成绩", name: "tickoutReason", disabled: false},
                                {view: "text", label: "工作单位", name: "tickoutReason", disabled: false},
                                {view: "text", label: "所属片区", name: "tickoutReason", options: constant.getDogArea() }
                            ]
                        }]
                    },{},{
                        cols:[
                            {},
                            {view: "button", label: "取消", css: 'non-essential', width: 65, click: function () {
                                win.close();
                            }},
                            {width: DEFAULT_PADDING/2},
                            {view: "button", label: "提交", width: 65, click: function () {
                                win.close();
                            }}
                        ]
                    }]
                }]
            };
            win = getWin('编辑警犬信息', ui, {height: 400, width: 600});
            win.show();
        }
    };
    return self;
});