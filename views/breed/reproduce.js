define([
    'views/common/constant'
],function(constant) {

    var currentStep = 1;
    var lastCount  = 0;

    var nextStep = function(){
        if(currentStep == 1){
            if(!validStrep1()){
                return ;
            }

            currentStep = 2;
            $$('step1').hide();
            $$('step2').show();
            $$('step3').hide();
            $$('preStep').show();
            var stepInfo = $$('stepInfo');
            stepInfo.data.step1 = 'reproduce_finish';
            stepInfo.data.step2 = 'reproduce_active';
            stepInfo.data.step3 = '';
            stepInfo.refresh();
            addChild();
        }else if(currentStep == 2){
            currentStep = 3;
            $$('step1').hide();
            $$('step2').hide();
            $$('step3').show();
            $$('preStep').hide();
            $$('nextStep').hide();
            $$('finishStep').show();
            var stepInfo = $$('stepInfo');
            stepInfo.data.step1 = 'reproduce_finish';
            stepInfo.data.step2 = 'reproduce_finish';
            stepInfo.data.step3 = 'reproduce_active';
            stepInfo.refresh();
        }
    };

    var preStep = function () {
        if(currentStep == 2){
            currentStep = 1;
            $$('step1').show();
            $$('step2').hide();
            $$('step3').hide();
            $$('preStep').hide();
            var stepInfo = $$('stepInfo');
            stepInfo.data.step1 = 'reproduce_active';
            stepInfo.data.step2 = '';
            stepInfo.data.step3 = '';
            stepInfo.refresh();
        }else if(currentStep == 3){
            currentStep = 2;
            $$('step1').hide();
            $$('step2').show();
            $$('step3').hide();
            $$('preStep').show();
            var stepInfo = $$('stepInfo');
            stepInfo.data.step1 = 'reproduce_finish';
            stepInfo.data.step2 = 'reproduce_active';
            stepInfo.data.step3 = '';
            stepInfo.refresh();
        }
    };

    var finished = function () {
        currentStep = 1;
        $$('step1').show();
        $$('step2').hide();
        $$('step3').hide();
        $$('preStep').hide();
        $$('nextStep').show();
        $$('finishStep').hide();
        var stepInfo = $$('stepInfo');
        stepInfo.data.step1 = 'reproduce_active';
        stepInfo.data.step2 = '';
        stepInfo.data.step3 = '';
        stepInfo.refresh();
    };

    var addChild = function () {
        var contain = $$('step2');
        var values = $$('reproduce').getValues();
        var count = values.litterSize || 0;
        var fatherName = values.father_name;
        var motherName = values.mother_name;
        var father_type = values.father_type;
        for(var i = lastCount; i<count; i++) {
            contain.addView(
                {
                    cols: [
                        {view: "text", label: "犬名:", name: "dog_name", width: 200, value: fatherName + '_' + motherName + '_幼犬' + (i + 1), labelWidth: 45},
                        {width: 10},
                        {
                            view: "select",
                            label: "性别:",
                            name: 'sex',
                            value: "1",
                            width: 125,
                            editable: false,
                            labelWidth: 45,
                            options: [{id: 1, value: "公犬"}, {id: 2, value: "母犬"}]
                        },
                        {width: 10},
                        {
                            view: "select", label: "犬品种:", name: "breed", width: 180, labelWidth: 65, value: father_type,
                            options: constant.breedType
                        },
                        {width: 10},
                        {
                            view: "select", label: "毛色:", name: "dogColour", width: 130, labelWidth: 45,
                            options: constant.dogColor
                        },
                        {width: 10},
                        {
                            view: "select", label: "毛型:", name: "hireType", width: 130, labelWidth: 45,
                            options: constant.hairType
                        }, {}
                    ]
                }
            );
            lastCount = count;
        }
    };

    var validStrep1 = function () {
        var state = true;
        var msg = [];
        var values = $$('reproduce').getValues();
        if(!values.father_chip_no){
            state = false;
            msg.push('请填写父犬芯片号');
        }
        if(!values.father_name){
            state = false;
            msg.push('请填写父犬名称');
        }
        if(!values.father_type){
            state = false;
            msg.push('请填写父犬品种');
        }

        if(!values.mother_chip_no){
            state = false;
            msg.push('请填写母犬芯片号');
        }
        if(!values.mother_name){
            state = false;
            msg.push('请填写母犬名称');
        }
        if(!values.mother_type){
            state = false;
            msg.push('请填写母犬品种');
        }

        if(!values.mateDate){
            state = false;
            msg.push('请填写交配日期');
        }
        if(!values.litterSize){
            state = false;
            msg.push('请填写产仔数');
        }
        if(!values.birthday){
            state = false;
            msg.push('请填写生育时间');
        }
        if(!values.breeder){
            state = false;
            msg.push('请填写繁育员');
        }
        if(msg.length > 0) {
            msgBox('<div align="left">信息填写不完整，请检查：<br>' + msg.join("<br>") + '</div>');
        }
        return true;
    };

    var layout = {
        type: "clean",
        rows: [
            {
                view: "toolbar",
                css: "highlighted_header header1",
                paddingX: 5,
                paddingY: 5,
                height: 40,
                cols: [{
                    template: "幼犬繁育",
                    css: "sub_title2",
                    borderless: true
                }]
            },
            {
                view: "form",
                id: 'reproduce',
                elementsConfig: {
                    labelWidth: 90
                },
                elements: [
                    {
                        id: 'step1',
                        cols: [
                            {
                                rows: [
                                    {view: "text", label: "父犬芯片号", name: "father_chip_no", width: 300},
                                    {view: "text", label: "父犬犬名", name: "father_name", width: 300},
                                    {
                                        view: "select", label: "父犬品种:", name: "father_type", width: 300, value: '其他',
                                        options: constant.breedType
                                    },
                                    {view: "datepicker", label: "交配日期", name: "mateDate", width: 300, format:"%Y-%m-%d"},
                                    {view: "text", label: "产仔数", name: "litterSize", width: 300}
                                ]
                            },
                            {width: DEFAULT_PADDING},
                            {
                                rows: [
                                    {view: "text", label: "母犬芯片号", name: "mother_chip_no", width: 300},
                                    {view: "text", label: "母犬犬名", name: "mother_name", width: 300},
                                    {
                                        view: "select", label: "母犬品种:", name: "mother_type", width: 300, value: '其他',
                                        options: constant.breedType
                                    },
                                    {view: "datepicker", label: "生育时间", name: "birthday", width: 300, format:"%Y-%m-%d"},
                                    {view: "text", label: "繁育员", name: "breeder", width: 300}
                                ]
                            },
                            {}
                        ]
                    },
                    {
                        id: 'step2',
                        hidden: true,
                        rows: [
                            {
                                template: '<div style="border-bottom: 1px solid #DDDDDD;">请填写幼犬简要信息</div>',
                                height: 30,
                                borderless: true
                            }
                        ]
                    },
                    {
                        id: 'step3',
                        hidden: true,
                        rows: [{},{
                            cols: [{
                                borderless: true,
                                template: '<div align="center" style="font-size: 16px; font-weight: bold;">数据已保存</div><div align="center">档案、除虫免疫等信息请到幼犬管理模块处理</div>'
                            }]
                        },{}]
                    },
                    {
                        template: '<div style="border-top: 1px solid #DDDDDD;"></div>',
                        height: 10,
                        borderless: true
                    },
                    {
                        cols: [
                            {
                                width: 638,//458
                                borderless: true,
                                id: 'stepInfo',
                                template: '<span class="reproduce_flu">繁育步骤</span>：<span class="#step1#">种犬信息</span>-><span class="#step2#">幼犬信息</span>-><span class="#step3#">完成</span>',
                                data: {
                                    step1: 'reproduce_active',
                                    step2: '',
                                    step3: ''
                                }
                            },
                            {view: "button", label: "上一步", width: 100, hidden:true, id: 'preStep', click: preStep},
                            {view: "button", label: "下一步", type: "form", width: 100,id: 'nextStep', click: nextStep},
                            {view: "button", label: "完 成", type: "form", hidden:true, width: 100, id: 'finishStep', click: finished},
                            {}
                        ]
                    }

                    // {}
                ],
                rules:{
                    "father":webix.rules.isNotEmpty,
                    "mother":webix.rules.isNotEmpty
                }
            }
        ]
    };

    return { $ui:layout };
});