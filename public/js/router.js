/**
 * 路由配置信息
 */

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	//默认路由
	$urlRouterProvider.otherwise('/auth/login');
	//路由配置
	$stateProvider
	/*--------------------用户登录-------------------*/
	.state('auth', {
        abstract: true,
        url: '/auth',
        template: '<div ui-view class="fade-in"></div>',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('app/auth/ctrl.js');
            }]
        }
    })
    .state('auth.loading', {
        url: '/loading',
        templateUrl: 'app/auth/loading.html',
    })
    .state('auth.login', {
        url: '/login',
        templateUrl: 'app/auth/login.html'
    })
    /*--------------------主页-------------------*/
  	.state('app', {
      	abstract: true,
      	url: '/app',
      	templateUrl: 'app/app.html',
        resolve: {
            deps: ['$ocLazyLoad','navsdata', function ($ocLazyLoad,navsdata) {
                    return $ocLazyLoad.load(['ui.select','toaster', 'ui.grid', 'ui.grid.selection', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.autoResize','ui.grid.validate','ui.grid.resizeColumns','ui.grid.grouping']).then(function(){
                        return navsdata.Init();
                    });
            }]
        }
  	})
    .state('app.home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        tabview: { "name":"主页" },
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('app/home/ctrl.js');
            }]
        },
        ncyBreadcrumb: {
            label: '<i class="fa fa-home"></i> 首页'
        }
    })
    /*--------------------用户管理-------------------*/
    .state('app.user', {
        abstract: true,
        url: '/user',
        template: '<div ui-view class="fade-in"></div>',
        resolve: {
            deps: ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load('app/system/user/ctrl.js');
            }]
        }
    })
    .state('app.user.list', {
        url: '/list?page&search',
        templateUrl: 'app/system/user/list.html',
        tabview: { "name":"用户管理" },
        ncyBreadcrumb: {
            parent: 'app.home',
            label: '用户管理',
        }
    })
    //客户资料
    .state('app.contact', {
        url: '/contact',
        templateUrl: 'app/initial/contact/contact.html',
        ncyBreadcrumb: {
            parent: 'app.home',
            label: '客户资料',
        },
        /*resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load('app/initial/contact/contact.js');
                }]
        }*/
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load('ngFileUpload').then(
                        function () {
                            return $ocLazyLoad.load([ 'app/initial/contact/contact.js']);
                        }
                    );
                }]
        }
    })
    .state('app.contact.list', {
        url: '/list?page&search',
        templateUrl: 'app/initial/contact/contact.html',
        tabview: { "name":"客户资料" },
        ncyBreadcrumb: {
            parent: 'app.home',
            label: '客户资料',
        }
    })
    // 员工资料
    .state('app.employee', {
        abstract: true,
        url: '/employee',
        template: '<div ui-view class="fade-in"></div>',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load('app/initial/employee/ctrl.js');
                }]
        }
    })
    .state('app.employee.list', {
        url: '/list?page&search',
        templateUrl: 'app/initial/employee/list.html',
        tabview: { "name":"员工资料" },
        ncyBreadcrumb: {
            parent: 'app.home',
            label: '员工资料',
        }
    })
}]);
