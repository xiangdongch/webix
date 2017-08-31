define(function(){
	
	return {
		$ui:{
			width: 200,

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
								debugger;
								return false;
							}
							
						},
						onAfterSelect:function(id){
							this.$scope.show("./"+id);
							var item = this.getItem(id);
							webix.$$("title").parse({title: item.value, details: item.details});
						}
					},
					data:[
						{id: "main", value: "繁育模块", open: true, data:[
							{ id: "breed.index", value: "警犬繁殖", icon: 'venus-mars', $css: "dashboard", details:"reports and statistics"},
							{ id: "youngDog.index", value: "幼犬管理", icon: "github-alt", $css: "orders", details:"order reports and editing"}
						]},

                        {id: "wormImmue", open: true, value:"除虫免疫", data:[
                            { id: "wormImmue.worm", value: "除虫管理", icon: "bug", details: "datatable examples" },
                            { id: "wormImmue.immue", value: "免疫管理", icon: "eyedropper", details: "charts examples"}
                        ]},

                        {id: "adult", open: true, value:"成犬管理", data:[
                            { id: "adult.apply", value: "申请调配", icon: "random", $css: "products", details:"all products"},
                            { id: "adult.profession", value: "专业技能", icon: "list-alt", $css: "products", details:"all products"},
                            { id: "adult.work", value: "技术使用", icon: "flag-o", $css: "products", details:"all products"},
                            { id: "adult.train", value: "培训训练", icon: "dribbble", $css: "products", details:"all products"},
                            { id: "adult.index", value: "警犬管理", icon: "table", $css: "products", details:"all products"},
                        ]},

                        {id: "news", open: true, value:"宣传模块", data:[
                            { id: "news.publish", value: "动态发布", icon: "pencil", $css: "products", details:"all products"},
                            { id: "news.management", value: "动态管理", icon: "list", $css: "products", details:"all products"},
						]},

                        {id: "components", open: true, value:"Components", data:[
                            { id: "datatables", value: "Datatables", icon: "table", details: "datatable examples" },
                            { id: "charts", value: "Charts", icon: "bar-chart-o", details: "charts examples"},
                            { id: "forms", value: "Forms", icon: "list-alt", details: "forms examples"},
							{ id: "product_edit", value: "Product Edit", icon: "pencil-square-o", details: "changing product data"}
                        ]},

						{id: "uis", value:"UI Examples", open:1, data:[
							{ id: "calendar", value: "My Calendar", icon: "calendar", details: "calendar example" },
							{ id: "files", value: "File Manager", icon: "folder-open-o", details: "file manager example" }

						]}
					]
				}
			]
		}
	};

});
