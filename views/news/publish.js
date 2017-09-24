define([], function () {
    return {
        $ui: {
            type: "space",
            rows: [
                {
                    cols: [
                        {
                            width: 700,
                            rows: [
                                {view: "text", label: "标题", name: "title", id: 'ntitle', width: 600, labelWidth: 60},
                            ]
                        },
                        {view: "datepicker", label: "发布日期", name: "date", id: 'date',labelWidth: 60, width: 180, value: new Date(), format:"%Y-%m-%d", stringResult: true},
                        {}
                    ]
                },

                {
                    height: 360,
                    borderless: true,
                    view:"iframe", id:"content-body", src:"news/publish.html", on: {
                        onAfterLoad: function(){
                        }
                    }
                },
                {
                    cols: [
                        {},
                        {view: "button", label: "发布", type: "form", width: 90, click: function () {
                            var title = $$('ntitle').getValue();
                            var date = $$('date').getValue();
                            var content = $$('content-body').getWindow().getAllHtml();
                            doIPost('news/add', {
                                title: title,
                                publishDateStr: date,
                                content: content,
                                // newsType: '',
                            }, function (data) {
                                if(data.success){
                                    msgBox("发布成功");
                                    window.open('#!/app/news.list', '_self');
                                }else{
                                    msgBox("发布失败")
                                }
                            });
                        }},
                        {},
                    ]
                },
                {},
            ]
        }
    };
});