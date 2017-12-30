define([], function () {
    return {
        $ui:{
            view: "scrollview",
            id: 'new_contain',
            body: {
                rows: [{
                    template: '<div align="center" style="font-size: 18px;font-weight: bold;border-bottom: 1px solid #fff;line-height: 30px">#title#</div>',
                    height: 50,
                    id: 'new_title',
                    borderless: true,
                    data: {title: ''}
                }, {
                    height: 25,
                    template: '<div align="center">作者：#author#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布日期：#date#</div>',
                    id: 'new_info',
                    borderless: true,
                    data: {author: '', date: ''}
                }, {
                    cols: [
                        {width: 80},
                        {
                            template: '<div id="content_id" style="overflow-y: auto;">#content#</div>',
                            id: 'new_content',
                            borderless: true,
                            data: {content: ''}
                        },
                        {width: 80}
                    ]
                }]
            }
        },
        $oninit: function () {
            var id = sessionStorage.getItem("newId");
            if(!id || id.length == 0){
                window.close();
                return ;
            }
            var height = document.body.offsetHeight - 200;
            doIPost('news/getById', {id: id}, function (resp) {
                if(resp.success && resp.result){
                    var news = resp.result;
                    $$('new_title').data.title = news.title;
                    $$('new_title').refresh();
                    $$('new_content').data.content = news.content || '';
                    $$('new_content').refresh();
                    $$('new_info').data.author = news.publisher || '';
                    $$('new_info').data.date = news.publishDate || '';
                    $$('new_info').data.date = $$('new_info').data.date.split(' ')[0];
                    $$('new_info').refresh();
                    document.getElementById("content_id").style.height = height + 'px';
                }
            });
        }
    };
});