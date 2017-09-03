define([], function () {
    var columns = {
        '窝编号': {id: "nestNo", header: "窝编号", width: 120, sort: "string"},
        '犬名': {id: "dogName", header: "犬名", width: 90},
        '芯片号': {id: "chipNo", header: "芯片号", width: 110},
        '芯片注入日期': {id: "chipNoInject", header: "芯片注入日期", width: 90, format: webix.Date.dateToStr("%Y-%m-%d")},
        '性别': {id: "sex", header: "性别", width: 50, template: function(obj){ return '<div align="center">' + (obj.sex == 1 ? '公' : '母') + '</div>'; } },
        '出生日期': {id: "birthday", header: "出生日期", width: 85, sort: "string", format: webix.Date.dateToStr("%Y-%m-%d")},
        '父亲芯片号': {id: "fatherId", header: "父亲芯片号", width: 90},
        '母亲芯片号': {id: "motherId", header: "母亲芯片号", width: 90},
        '品种': {id: "breed", header: "品种", width: 90, sort: "string"},
        '来源': {id: "dogSource", header: "来源", width: 60, sort: "string"},
        '毛色': {id: "dogColour", header: "毛色", width: 80, sort: "string"},
        '毛型': {id: "hairType", header: "毛型", width: 70, sort: "string"},
        '繁育员': {id: "breeder", header: "繁育员", width: 100, sort: "string"},
        '训导员': {id: "tutor", header: "训导员", width: 100},
        '专业名称': {id: "wormDesc", header: "专业名称", width: 100},
        '获得日期': {id: "wormDate", header: "获得日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},



        '窝编号_2':{id: "dogInfo.nestNo", header: "窝编号", width: 90, template: function(obj){ return obj.dogInfo.nestNo || ''; } },
        '犬名_2':{id: "dogInfo.dogName", header: "犬名", width: 90, template: function(obj){ return obj.dogInfo.dogName || ''; } },
        '芯片号_2':{id: "dogInfo.chipNo", header: "芯片号", width: 90, template: function(obj){ return obj.dogInfo.chipNo || ''; } },
        '芯片注入日期_2' :{id: "dogInfo.chipNoInject", header: "芯片注入日期", width: 85, template: function(item){
                return webix.Date.dateToStr("%Y-%m-%d")(item.dogInfo.chipNoInject);
            }},
        '性别_2' :{id: "dogInfo.sex", header: "性别", width: 50, template: function(obj){ return '<div align="center">' + (obj.dogInfo.sex == 1 ? '公' : '母') + '</div>'; } },
        '出生日期_2' :{id: "dogInfo.birthday", header: "出生日期", width: 85, sort: "string", template: function(item){
                return webix.Date.dateToStr("%Y-%m-%d")(item.dogInfo.birthday);
            }},
        '品种_2' :{id: "dogInfo.breed", header: "品种", width: 70, sort: "string", template: function(obj){ return obj.dogInfo.breed || ''; } },
        '来源_2' :{id: "dogInfo.dogSource", header: "来源", width: 50, sort: "string", template: function(obj){ return obj.dogInfo.dogSource || ''; } },
        '毛色_2' :{id: "dogInfo.dogColour", header: "毛色", width: 50, sort: "string", template: function(obj){ return obj.dogInfo.dogColour || ''; } },
        '毛型_2' :{id: "dogInfo.hairType", header: "毛型", width: 50, sort: "string", template: function(obj){ return obj.dogInfo.hairType || ''; } },
        '繁育员_2' :{id: "dogInfo.breeder", header: "繁育员", width: 80, sort: "string", template: function(obj){ return obj.dogInfo.breeder || ''; } },


        '类型': {id: "dogSource", header: "类型", width: 60, template: function(item){ var dic = {"1": "培训", "2": "复训", "3": "考核"}; return dic[item.trainStage] || '';}},
        '日期': {id: "trainDate", header: "日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
        '复训日期': {id: "trainDate", header: "复训日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
        '考核日期': {id: "trainDate", header: "考核日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")},
        '班级名称': {id: "trainClassName", header: "班级名称", width: 100},
        '培训单位': {id: "trainUnit", header: "培训单位", width: 100},
        '培训地点': {id: "trainAddr", header: "培训地点", width: 130},
        '教练员': {id: "trainUser", header: "教练员", width: 130},
        '基础评分': {id: "trainUser", header: "基础评分", width: 80, template: '<a class="score_detail">点击查看</a>'},
        '总分': {id: "totalScore", header: "总分", width: 80},
        '下次复训时间': {id: "nextTrainDate", header: "下次复训时间", width: 100, format: webix.Date.dateToStr("%Y-%m-%d")},
        '带犬民警': {id: "policeName", header: "带犬民警", width: 80},
        '主考人': {id: "main_train_user", header: "主考人", width: 80},

    };
    var methods = {
        getColumns: function (headers, startCols) {
            var cols = [
                {
                    id: "$check",
                    header: {content: "masterCheckbox"},
                    checkValue: true,
                    uncheckValue: false,
                    template: "{common.checkbox()}",
                    width: 40
                },
                {id: "$index", header: "NO.", width: 45}
            ];
            if(startCols){
                for(var i = 0; i<startCols.length; i++){
                    cols.push(startCols[i]);
                }
            }
            for(var i = 0; i<headers.length; i++){
                cols.push(methods.get(headers[i]));
            }
            return cols;
        },
        get: function (name) {
            return columns[name];
        }
    };
    return methods;
});