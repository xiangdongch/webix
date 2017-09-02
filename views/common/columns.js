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
        '获得日期': {id: "wormDate", header: "获得日期", width: 85, format: webix.Date.dateToStr("%Y-%m-%d")}
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