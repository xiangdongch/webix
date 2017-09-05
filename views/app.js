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

        elements: [
            {view: "label", label: "<img class='photo' src='assets/imgs/logo.png' height='45'/>", width: 60},
            {template: '北京市公安局警犬技术工作管理与实战应用系统', css: "header_title"},
            // {template: 'webix-master', css: "header_title"},

            {},
            // {view: "icon", icon: "search",  width: 45, popup: "searchPopup"},
            // {view: "icon", icon: "envelope-o", value: 3, width: 45, popup: "mailPopup"},
            {view: "icon", icon: "comments-o", value: 5, width: 45, popup: "messagePopup"},
            {
                height: 46, id: "person_template", css: "header_person", borderless: true, width: 150,
                data: {id: 3, name: "张山泉"},
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
                view: "scrollview", scroll: "native-y",
                body: {cols: [{$subview: true}]}
            }
        ]
    };

    var layout = {
        rows: [
            mainToolbar,
            {
                cols: [
                    menu,
                    {view: 'resizer'},
                    body
                ]
            }
        ]
    };

    return {
        $ui: layout,
        $menu: "app:menu",
        $oninit: function (view, scope) {
            if(window.location.href.indexOf("dashboard") != -1){
                $$('title').hide();
                $$('left_menu').hide();
            }else{
                $$('title').show();
                $$('left_menu').show();
            }
            scope.ui(search.$ui);
            scope.ui(message.$ui);
            scope.ui(profile.$ui);
        }
    };

});