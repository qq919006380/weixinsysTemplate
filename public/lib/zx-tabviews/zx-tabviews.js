/**
 * zx-tabviews
 * Eric.Cui.
 * 2017-09-15
 * 依赖说明：
 * 1.基于$rootScope、$state服务和$location服务
 * 使用例子：
 * 1.指令使用
   <!-- Tab导航栏 -->
   <zx-tab-nav></zx-tab-nav>
   <!-- Tab视图集容器 -->
   <zx-tab-views></zx-tab-views>
 * 2.state对象配置
 	.state('app.home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        tabview: { "name":"主页" }
    })
    //具有tabview属性说明可用于“多标签显示”组件，name属性是标签导航显示的名称。
 */
 

(function (window, angular, undefined) {
"use strict";

	//定义模块
	var zxTabviews = angular.module('zx.tabviews', ['ng', 'ui.router']);

	//tabs服务管理
	zxTabviews.factory("zxTabsService",["$rootScope","$state","$location","$timeout",function($rootScope,$state,$location,$timeout){

		//标签页数据
		//格式：[{ "sref":"app.home", "name":"home", "opened":true, "active":true }]
		var tabs = [];	
		var defaultTab = {"sref":"app.home", "params":{}};

		return {
			//获取所有Tabs
			getTabs : function(){
				return tabs;
			},
			//获取单个tab
			getTab : function(sref){
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref) return tabs[i];
				}
				return false;
			},
			//打开Tab
			openTab : function(sref){
				//若“tab未存在”，则新增Tab,切换到该Tab并设置路由跳转，若“已存在”，则切换到指定Tab并更新url
				//console.log("isExisted:"+this.isExistedTab(sref));
				if(!this.isExistedTab(sref)){
					//新增Tab
					this.addTab(sref);
					//切换到目标Tab
					this.switchToTab(sref);
					//执行路由跳转
					$state.go(sref);
				}else{
					console.log("*****test1****");
					//切换到目标Tab
					this.switchToTab(sref);
					//重置页面URL
					var url = this.getTabUrl(sref);
					//console.log(url);
					$location.url(url);
				}
				//console.log(JSON.stringify(tabs));
			},
			//新增Tab
			addTab : function(sref){
				//console.log("----addTab-----");
				var data = $state.get(sref);
				console.log(JSON.stringify(data));
				var name = data.tabview&&data.tabview.name||sref;
				var tab = { "sref":sref, "name":name, "opened":false, "active":false };
				tabs.push(tab);
			},
			//新增Tab，不要触发路由跳转
			addTabByRouter : function(state){
				//console.log("----addTabByRouter-----");
				//console.log(JSON.stringify(tabs));
				if(!state||!state.name) return;
				state.sref = state.name;
				if(this.isExistedTab(state.name)) return;
				var data = $state.get(state.name);
				var name = data.tabview&&data.tabview.name||state.name;
				var tab = { "sref":data.sref, "name":name, "opened":false, "active":false };
				tabs.push(tab);
			},
			//关闭Tab
			closeTab : function(sref){
				console.log("---------closeTab---------");
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref){
						tabs.splice(i,1);
						//广播“清除指定TabView”事件
						$rootScope.$broadcast('$tabview.clearup',tabs[i]);
					}
				}
				if(tabs.length==0){
					$state.go(defaultTab.sref,defaultTab.params);
					return;
				}
				var lastIndex = tabs.length-1;
				//console.log(JSON.stringify(tabs[lastIndex]));
				if(tabs.length==0){
					$state.go(defaultTab.sref,defaultTab.params);
				}else if(tabs[lastIndex]){
					var url = this.getTabUrl(tabs[lastIndex].sref);
					this.switchToTab(tabs[lastIndex].sref);
					//重置页面URL
					//console.log(url);
					$location.url(url);
				}
			},
			//关闭全部
			closeAllTab : function(){
				for(var i=tabs.length-1; i>=0; i--){
					tabs.splice(i,1);
					//广播“清除指定TabView”事件
					$rootScope.$broadcast('$tabview.clearup',tabs[i]);
				}
				$timeout(function(){
					$state.go(defaultTab.sref,defaultTab.params);
					console.log("----go home---");
				},500);
			},
			//切换到目标Tab
			switchToTab : function(sref){
				if($state.current&&$state.current.name===sref) return;
				//console.log(Tab);
				//console.log($state);
				//...
				//激活Tab
				this.activeTab(sref);
				//广播“切换到指定TabView”事件
				//$rootScope.$broadcast('$tabview.switch',tab);
			},
			//激活Tab
			activeTab : function(sref){
				console.log("*****test2****");
				var isExisted = this.isExistedTab(sref);
				//console.log("---------test---------");
				//console.log(JSON.stringify(tab));
				if(!isExisted) return;
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref == sref){
						tabs[i].active = true;
					}else{
						tabs[i].active = false;
					}
				}
				console.log(JSON.stringify(tabs));
				//广播“激活指定TabView”事件
				//$rootScope.$broadcast('$tabview.active',tab);
			},
			//获取tab对应的url
			getTabUrl : function(data){
				var arr = data.split(".");
				var url = arr.join("/");
				return "/"+url;
			},
			//设置为“已打开”状态
			setOpenedTab : function(sref){
				if(!sref) return;
				//console.log(JSON.stringify(tab));
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref) tabs[i].opened = true; 
				}
				//console.log(JSON.stringify(tabs));
			},
			//是否处于“已存在”状态
			isExistedTab : function(sref){
				//console.log(JSON.stringify(tabs));
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref) return true;
				}
				return false;
			},
			//是否处于“打开”状态
			isOpenedTab : function(sref){
				//console.log(JSON.stringify(tabs));
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref && tabs[i].opened === true) return true;
				}
				return false;
			},
			//是否处于“激活”状态
			isActivedTab : function(sref){
				for(var i=0; i<tabs.length; i++){
					if(tabs[i].sref === sref && tabs[i].active === true) return true;
				}
				return false;
			}
		};
	}]);

	//tab导航栏指令
	zxTabviews.directive("zxTabNav",["zxTabsService",function(zxTabsService){

		return{
			restrict: 'ECA',
			//template : '<ul class="list"><li class="item" ng-show="tab.show" ng-class="{\'active\':tab.active}" ng-repeat="tab in tabs track by $index" ng-click="switchTab(tab)" >{{tab.title}} <span class="closeBtn" ng-click="closeTab(tab,$event)" >X</span> </li></ul>',//'lib/zx-router-test/zx-router-test.html',//'lib/zx-aside-nav/templates/zx-aside-nav.html',
			templateUrl : 'lib/zx-tabviews/templates/zx-tab-nav.html',
			scope : {},
			link: function(scope, element, attrs) {

				//初始化Tabs
				scope.tabs = zxTabsService.getTabs();
 
				//关闭Tab
				scope.closeTab = function(tab,event){
				    event.stopPropagation();
				    zxTabsService.closeTab(tab.sref);
				}

				//关闭全部
				scope.CloseAllTab = function(){
					zxTabsService.closeAllTab();
				}

				//切换Tab
				scope.switchTab = function(tab){
				    zxTabsService.openTab(tab.sref);
				}
				//滚动条
                const ps = new PerfectScrollbar(element.children()[0], {
                });
                //监听滚动条
                scope.$watch('tabs', function(newVal){
                    ps.update();
                }, true);
			}
		};

	}]);

	//tab视图集指令
	zxTabviews.directive("zxTabViews",["$rootScope","$state","$interpolate","$compile","$timeout","zxTabsService",function($rootScope,$state,$interpolate,$compile,$timeout,zxTabsService){

		return{
			restrict: 'EA',
			//transclude: true,
			//terminal: true,
    		//priority: 400,
    		//replace : true,
    		//template: '<div class="tab-views" ng-transclude ><zx-tab-view views="tabviews" ng-repeat="tabview in tabviews" ></zx-tab-view></div>',
    		templateUrl : 'lib/zx-tabviews/templates/zx-tab-views.html',
			compile: function (tElement, tAttrs, transclude) {
				return function(scope, element, attrs) {
					//console.log("-------------zxTabView-------------");

					var latestLocals;
					//console.log($state);

					//初始化TabViews
					var tabviews = scope.tabviews = zxTabsService.getTabs();

					//var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
		            //var navViewName = attrs.name;
		            //var parent = element.parent().inheritedData('$uiView');


		            //隐藏所有TabView
		            function hideAllTabView(){
		            	console.log("----------hideAllTabView----------");
						for(var i=0; i<tabviews.length; i++){
							tabviews[i].active = false;
						}
						//console.log(tabviews);
		            }

		            //显示当前TabView
		            function showCurTabView(sref){
		            	//console.log("----------showCurTabView----------");
		            	console.log("*****test3****");
						for(var i=0; i<tabviews.length; i++){
							if(tabviews[i].sref===sref){
								tabviews[i].active = true;
								//console.log(tabviews[i]);
							}
						}
						// console.log(JSON.stringify(tabviews));
						console.log("*****test end****");
		            }

		            //清除指定TabView
		            function clearupTabView(tab){
		            	console.log("----------clearupTabView----------");
						// console.log(JSON.stringify(tabviews));
		            }


		            //切换到指定TabView
		            function switchToTabView(tab){
		            	console.log("-----2-----switchToTabView-----2-----");

		            }

		            //更新TabView
		            function updateTabView(){

		            	//当前State不能为空
		            	if(!$state.$current.name) return;

		            	//隐藏所有TabView
		            	hideAllTabView();

		            	//检查当前State是否已创建了TabView
		            	var sref = $state.current&&$state.current.name||"";
		            	var isExisted = zxTabsService.isExistedTab(sref);
		            	var isOpened = zxTabsService.isOpenedTab(sref);
		            	console.log($state.current.name);
		            	console.log("isExistedTab:"+isExisted);
		            	console.log("isOpenedTab:"+isOpened);

		            	//检查当前State是否已创建了对应Tab
		            	if(!isExisted){
		            		//创建新的TabView
		            		zxTabsService.addTabByRouter($state.current);
		            	}

		            	if(!isExisted||!isOpened){
		            		//渲染指定TabView,延迟执行
		            		$timeout(function(){
		            			$rootScope.$broadcast('$tabview.render',$state.current.name);
		            		},0);
		            	}

		            	//显示当前TabView
		            	showCurTabView(sref);
		            }


		            /***************************** 监听事件 ********************************/

		            
		            //监听“stateChangeSuccess”事件
		            scope.$on('$stateChangeSuccess', function(self, toParams, fromself, fromParams) {
		                console.log("-------------stateChangeSuccess-------------");
		                //console.log();
		                if(fromParams.name===toParams.name || !$state.is(toParams.name)) return;
		                //更新TabView
		                updateTabView();
		            });

		            //监听“清除指定TabView”事件
		            scope.$on('$tabview.clearup', function(event,tab) {
		                //console.log("-------------tabview.clearup-------------");
		                //清除指定TabView
		                clearupTabView(tab);
		            });

		            //监听“切换到指定TabView”事件
		            scope.$on('$tabview.switch', function(event,tab) {
		                //console.log("-------------tabview.switch-------------");
		                //切换到指定TabView
		                switchToTabView(tab);
		            });
		            

		            //监听“viewContentLoading”事件
		            scope.$on('$viewContentLoading', function() {
		                //console.log("-------------viewContentLoading-------------");
		            });

				}
			}
		};
	}]);

	//tab视图指令
	zxTabviews.directive("zxTabView",["$state","$interpolate","$compile","$timeout","zxTabsService",function($state,$interpolate,$compile,$timeout,zxTabsService){
		return{
			restrict: 'ECA',
			replace: true,
    		template: "<div class='tab-view' ng-show='tabview.active' viewname='{{tabview.name}}' view='{{tabview.sref}}' ></div>",
    		// ng-if='tabview.open' ng-show='tabview.active' 
			scope : true,
			compile: function (tElement, tAttrs, transclude) {
				return function(scope, element, attrs) {

					//获取父级视图名称
		            function getParentStateName(name){
		            	var arr = name.split(".");
		                var pname = "";
		                for (var i = 0; i < arr.length - 1; i++) {
		                    if (pname == "") {
		                        pname += arr[i];
		                    } else {
		                        pname += "." + arr[i];
		                    }
		                }
		                return pname;
		            }

		            //渲染TabView
					function renderTabView(){
						console.log("-----------renderTabView-------------");
						var curViewName = $state.$current.name;
		            	var parentViewName = getParentStateName($state.$current.name);
		            	var viewName = "";
		            	for(var key in $state.current.views){
		            		viewName += key;
		            		break;
		            	}
		            	viewName = viewName + '@' + parentViewName;
		            	console.log($state);
		            	console.log(viewName);
		            	var viewNameData = $state.$current.locals[viewName];
		            	//console.log(viewNameData);

		            	if(!viewNameData) return;

		            	var template = viewNameData.$template;
		                var compiledHtml = $compile(template)(scope);
		                console.log("-----append--compiledHtml---");
		                //element.html("");
		                element.append(compiledHtml);

		                //element.find(".tab-view").removeClass("hide");
		                zxTabsService.setOpenedTab(curViewName);

					}


					/***************************** 监听事件 ********************************/
					
					//监听“渲染指定TabView”事件
		            scope.$on('$tabview.render', function(event,view) {
		                console.log("-------------tabview.render-------------");
		                var targetView = element.attr("view");
		                console.log("view:"+view);
		                console.log("targetView:"+targetView);
		                if(view&&view===targetView){
		                	//console.log(targetView);
		                	//console.log(element);
		                	//渲染指定TabView
		                	renderTabView();
		                }
		            });


				};
			}
		};
	}]);

})(window, window.angular);