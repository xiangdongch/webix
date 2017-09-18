define(function(){
	
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
					data:[
                        { id: "dashboard", value: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首页", icon: "", details: "" },

						{id: "work", value: "警犬使用", open: true, data:[
                            { id: "adult.work", value: "警犬工作管理", icon: "flag-o", $css: "products", details:""},
						]},

                        {id: "train", open: true, value:"培训/考核", data:[
                            { id: "train.publish", value: "培训/考核信息", icon: "pencil", $css: "products", details:""},
                            { id: "train.createTrain", value: "创建培训考核名单", icon: "file-text", $css: "products", details:""},
                            { id: "train.train", value: "培训成绩管理", icon: "check-square-o", $css: "products", details:""},
                            { id: "train.signMgmt", value: "成绩管理", icon: "list", $css: "products", details:""},
                            { id: "adult.profession", value: "专业技能", icon: "list-alt", $css: "products", details:""},
                        ]},

                        {id: "adult", open: true, value:"配发管理", data:[
                            { id: "adult.applyIssue", value: "申请配发", icon: "table", $css: "products", details:""},
                            { id: "adult.applySendBack", value: "申请退回", icon: "table", $css: "products", details:""},
                            { id: "adult.adultList", value: "警犬管理", icon: "table", $css: "products", details:""},
                            { id: "adult.applyList", value: "待配发警犬", icon: "table", $css: "products", details:""},
                        ]},

                        {id: "main", value: "繁育管理", open: true, data:[
                            { id: "breed.mating", value: "交配管理", icon: 'venus-mars', $css: "dashboard", details:""},
                            { id: "breed.index", value: "警犬繁殖", icon: 'venus-mars', $css: "dashboard", details:""},
                            { id: "youngDog.index", value: "幼犬管理", icon: "github-alt", $css: "orders", details:""},

                            { id: "wormImmue.worm", value: "除虫管理", icon: "bug", details: "" },
                            { id: "wormImmue.immue", value: "免疫管理", icon: "eyedropper", details: ""}
                        ]},

                        {id: "news", open: true, value:"宣传模块", data:[
                            { id: "news.publish", value: "动态发布", icon: "pencil", $css: "products", details:""},
                            { id: "news.management", value: "动态管理", icon: "list", $css: "products", details:""},
                        ]},

                        {id: "news", open: true, value:"流程管理", data:[
                            { id: "news.publish", value: "我的申请", icon: "check-square", $css: "products", details:""},
                            { id: "news.management", value: "我的待办", icon: "list", $css: "products", details:""},
                        ]},
                        {id: "system", open: true, value:"系统设置", data:[
                            { id: "user.profile", value: "个人信息", icon: "user", $css: "products", details:""},
                            { id: "system.permission", value: "权限管理", icon: "shield", $css: "products", details:""},
                            { id: "system.user", value: "人员管理", icon: "users", $css: "products", details:""},
                            { id: "system.immue", value: "疫苗周期", icon: "bug", $css: "products", details:""},
                            { id: "system.worm", value: "除虫周期", icon: "eyedropper", $css: "products", details:""},
                        ]}

					]
				}
			]
		}
	};

});
