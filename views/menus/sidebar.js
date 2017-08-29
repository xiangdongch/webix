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
							{ id: "breed.index", value: "警犬繁殖", icon: 'table', $css: "dashboard", details:"reports and statistics"},
							{ id: "youngDog.index", value: "幼犬管理", icon: "table", $css: "orders", details:"order reports and editing"},
							{ id: "adult.index1", value: "除虫管理", icon: "table", $css: "products", details:"all products"},
							{ id: "adult.index2", value: "疫苗管理", icon: "table", $css: "products", details:"all products"},
							{ id: "adult.index", value: "警犬管理", icon: "table", $css: "products", details:"all products"},
							{ id: "product_edit", value: "Product Edit", icon: "pencil-square-o", details: "changing product data"}
						]},
						{id: "components", open: true, value:"Components", data:[
							{ id: "datatables", value: "Datatables", icon: "table", details: "datatable examples" },
							{ id: "charts", value: "Charts", icon: "bar-chart-o", details: "charts examples"},
							{ id: "forms", value: "Forms", icon: "list-alt", details: "forms examples"}

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
