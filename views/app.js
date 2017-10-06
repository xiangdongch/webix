define([
    "views/menus/search",
    "views/menus/message",
    "views/menus/profile",
    "views/menus/sidebar",
    "views/webix/icon",
    "views/webix/menutree"
], function (search, message, profile, menu) {

    //Top toolbar
    var mainToolbar = {
        view: "toolbar",

        css: 'load_page_border',
        elements: [
            {view: "label", label: "<img class='photo' src='assets/imgs/logo_gold.png' height='48'/>", width: 60},
            {template: '<span style="font-size: 22px; line-height:38px;">北京市公安局警犬技术工作管理与实战应用系统</span>', css: "header_title"},
            // {template: 'webix-master', css: "header_title"},

            {},
            // {view: "icon", icon: "search",  width: 45, popup: "searchPopup"},
            // {view: "icon", icon: "envelope-o", value: 3, width: 45, popup: "mailPopup"},
            // {view: "icon", icon: "comments-o", value: 5, width: 45, popup: "messagePopup"},
            {
                height: 46, id: "person_template", css: "header_person", borderless: true, width: 150,
                data: {id: 3, name: USER_INFO.policeName},
                template: function (obj) {
                    var html = "<div align='right' style='height:100%;width:100%;' onclick='webix.$$(\"profilePopup\").show(this)'>";
                    html += "<img class='photo' src='assets/imgs/photos/" + obj.id + ".png' /><div style='float: left;width: 68px;text-align: left;margin-left: 9px;color:#fff;'>" + obj.name + "</div>";
                    html += "<span class='webix_icon fa-angle-down'></span></div>";
                    return html;
                }
            }
        ]
    };

    var body = {
        rows: [
            {
                height: 49,
                id: "title",
                css: "title",
                template: "<div class='header'>#title#</div>",
                data: {text: "", title: ""}
            },
            {
                $subview: true
                // view: "scrollview",
                // body: {cols: [{}]}
            }
        ]
    };

    var layout = {
        rows: [
            mainToolbar,
            {
                cols: [
                    menu,
                    {view: 'resizer', id: 'resizer'},
                    body
                ]
            }
        ]
    };

    window.onhashchange = function() {
        if(window.location.href.indexOf("dashboard") != -1){
            $$('title').hide();
            $$('left_menu').hide();
            $$('resizer').hide();
        }else{
            $$('title').show();
            $$('left_menu').show();
            $$('resizer').show();
        }
    };

    return {
        $ui: layout,
        $menu: "app:menu",
        $oninit: function (view, scope) {
            scope.ui(search.$ui);
            scope.ui(message.$ui);
            scope.ui(profile.$ui);
            window.onhashchange();
        }
    };

});