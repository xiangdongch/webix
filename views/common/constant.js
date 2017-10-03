define([], function () {
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
        }
    };
    return constant;
});