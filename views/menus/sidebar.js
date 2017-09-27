define(function(){

	var checkPermission = function(item){
		var hasPermission = false;
        if(item.permission){
            if(window.permissions.indexOf(item.permission) != -1){
                hasPermission = true;
            }
        }else{
            hasPermission = true;
        }
        return hasPermission;
	};
	var allData = [
        { id: "dashboard", value: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首页", icon: "", details: "" },

        {id: "work", value: "警犬使用", open: true,  data:[
            { id: "adult.work", value: "警犬工作管理", permission: 'work', icon: "flag-o", $css: "products", details:""},
        ]},

        {id: "train", open: true, value:"培训/考核", data:[
            { id: "train.publish", value: "培训/考核信息", permission: 'train.publish', icon: "pencil", $css: "products", details:""},
            { id: "train.createTrain", value: "创建培训考核名单", permission: 'train.create', icon: "file-text", $css: "products", details:""},
            { id: "train.scoreMgmt", value: "培训成绩管理", permission: 'train.score.mgmt', icon: "check-square-o", $css: "products", details:""},
            { id: "train.trainSocre", value: "我的培训", permission: 'train.myList', icon: "list", $css: "products", details:""},
            { id: "train.profession", value: "专业技能", permission: 'train.prof', icon: "list-alt", $css: "products", details:""},
        ]},

        {id: "apply", open: true, value:"配发管理", data:[
            { id: "apply.list", value: "申请配发", permission: 'apply.dog', icon: "table", $css: "products", details:""}
        ]},

        {id: "main", value: "繁育管理", permission: 'breed', open: true, data:[
            { id: "breed.mating", value: "交配管理", icon: 'venus-mars', $css: "dashboard", details:""},
            { id: "breed.index", value: "警犬繁殖", icon: 'venus-mars', $css: "dashboard", details:""},
            { id: "youngDog.index", value: "幼犬管理", icon: "github-alt", $css: "orders", details:""},

            { id: "wormImmue.worm", value: "除虫管理", icon: "bug", details: "" },
            { id: "wormImmue.immue", value: "免疫管理", icon: "eyedropper", details: ""}
        ]},


        {id: "dogMgmt", value: "警犬管理", open: true, data:[
            { id: "adult.adultList", value: "警犬列表", permission: 'dog.list', icon: 'list', $css: "dashboard", details:""},
            { id: "adult.addDog", value: "外来警犬信息录入", permission: 'dog.addDog', icon: "plus", details: "" },
        ]},

        {id: "news", open: true, value:"宣传模块", data:[
            { id: "news.publish", value: "动态发布", permission:'news.publish', icon: "pencil", $css: "products", details:""},
            { id: "news.list", value: "动态管理", permission: 'news.list', icon: "list", $css: "products", details:""},
        ]}

    ];

	var data = [];
	for(var i = 0; i<allData.length; i++){
		var item = allData[i];
		var hasPermission = checkPermission(item);
		if(hasPermission) {
            var children = [];
            if (item.data) {
                for (var j = 0; j < item.data.length; j++) {
                    var ci = item.data[j];
                    if (checkPermission(ci)) {
                        children.push(ci);
                    }
                }
            }
            if (children.length > 0) {
                item.data = children;
                data.push(item);
            }
        }
	}

	return {
		$ui:{
			width: 200,
			id: 'left_menu',
			rows:[
				{
					view: "tree",
					id: "app:menu",
					type: "menuTree2",
					css: "menu",
					activeTitle: true,
					select: true,
					tooltip: {
						template: function(obj){
							return obj.$count?"":obj.details;
						}
					},
					on:{
						onBeforeSelect:function(id){
							if(this.getItem(id).$count){
								return false;
							}
						},
						onAfterSelect:function(id){
							var item = this.getItem(id);
							this.$scope.show("./"+id);
							webix.$$("title").parse({title: item.value, details: item.details});
						}
					},
					data: data
				}
			]
		}
	};

});
