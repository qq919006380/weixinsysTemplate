
'use strict';

var app = angular.module('app', [
    'ngSanitize',
    'ngResource',
    'ngCookies',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    //'ui.load',
    'ui.jq',
    //'ui.validate',
    'ui.utils',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ncy-angular-breadcrumb',
    'angular-md5',
    //'zx-services',
     'zx.tools',
    'zx.aside.nav',
    'zx.tools.bar',
    'zx.ztree',
    'zx.tabviews',
    'zx-services-initial',
    'zx.query.model',
    'zx.form.data',
]);


//接口配置
app.config(["$controllerProvider", "$compileProvider", "$filterProvider", "$provide", function($controllerProvider, $compileProvider, $filterProvider, $provide) {

    //接口
    app.controller = $controllerProvider.register;
    app.directive  = $compileProvider.directive;
    //app.component = $compileProvider.registerComponent;
    app.filter     = $filterProvider.register;
    app.factory    = $provide.factory;
    app.service    = $provide.service;
    app.constant   = $provide.constant;
    app.value      = $provide.value;

}]);


//配置拦截器
app.config(function ($httpProvider) {
    //
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('TokenInterceptor');
});


//配置中文化参数
app.config(['$translateProvider', function($translateProvider){
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('cn');
    $translateProvider.useLocalStorage();
}]);
// 配置面包屑导航breadcrumb
app.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      templateUrl: 'tpl/blocks/breadcrumb.html',
    });
});

//APP
app.controller('AppCtrl',["$scope","$state","$translate","$modal","$localStorage","zxTabsService","zxhttp",function($scope,$state,$translate,$modal,$localStorage,zxTabsService,zxhttp){
    //console.log("AppCtrl");
	  // config

    $scope.app = {
        name: '智成商场',
        version: '1.0.0',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
    };

    // angular translate
    $scope.lang = { isopen: false };
    $scope.langs = {en:'English', cn:'中文'};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
    $scope.setLang = function(langKey, $event) {
      // set the current lang
      $scope.selectLang = $scope.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };


    /************************************ 修改密码的模态窗口 ****************************/
    
    $scope.openPassworeModal = function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/editpassword.html',
            controller: 'PasswordMGCtrl',
            size: "lg", //大小配置
            resolve: {
                modalParams: function () {
                    return {
                        data: data
                    };
                },
            }
        });
    };

    //退出登录
    $scope.logout = function(){
        var Params = [];
        var Recordset = [];
        // zxhttp.post("LoginService/Quit",Params,Recordset,function(data){
        //     // 用户信息
        //     if (data.Result == "200") {
        //         // 保存token
        //          console.log("退出成功")
        //     }else{
        //         console.log("退出失败"+data.ErrMsg)
        //         // $scope.authError = "服务器登录错误"
        //         $scope.authError = data.ErrMsg
        //     };
        // },function(data){
        //     // console.log(data)
        //    $scope.authError = "服务器登录错误" 
        // })

        $localStorage.Authorization = null;
        $state.go("auth.login");
    }

}]);


//导航栏
app.controller('NavCtrl',["$scope","navsdata","zxTabsService",function($scope,navsdata,zxTabsService){
    //console.log("NavCtrl");

    //左侧菜单导航
    $scope.navs = navsdata.all();

}]);


//修改密码
app.controller('PasswordMGCtrl', ['$scope', 'modalParams', '$modalInstance', '$localStorage','toaster','zxhttp','$state','$timeout', function ($scope, modalParams, $modalInstance,$localStorage,toaster,zxhttp,$state,$timeout) {
    $scope.modalParams = modalParams;
    $scope.data = $scope.modalParams.data;
    //确认按钮
    $scope.ok = function () {
        UpdatePassword($scope.user);

    }
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.user=angular.copy($localStorage.user);
    function UpdatePassword(result) {
        console.log(result)
        var Params = [
            // {"OldPassword": result.OldPassword},
            // {"NewPassword": result.NewPassword}
            {"oldpassword":result.OldPassword,"newpassword":result.NewPassword,"cid":result.userid}
        ];
        var Recordset = [];
        zxhttp.post("webapi/userlist/changepwd", Params, Recordset, function (data) {
            //console.log(data);
            if (data.Result == "200") {
                toaster.pop("success", "修改成功");
                $modalInstance.dismiss('cancel');
                $localStorage.user.password = "";
                $timeout(function() {
                    $state.go("auth.login");
                },0);
            } else {
                toaster.pop("error", "修改失败", data.ErrMsg);
            }
        });
    }
}]);


//测试页
app.controller('TestController',["$scope",function($scope){
  console.log("TestController");
}])
//单击时件.控制在1S内不能多次点击
/*.config(['$provide',
  function($provide) {
    $provide.decorator('ngClickDirective', ['$delegate', '$timeout',
      function($delegate, $timeout) {

        var original = $delegate[0].compile;    //获取原编译方法
        var delay = 500;   //1s延迟

        //编写新编译方法
        $delegate[0].compile = function(element, attrs, transclude) {

          //获取原链接方法
          var originalLink = original(element, attrs, transclude);
          //console.log(originalLink);

          //编写新链接方法
          function link(scope, element, attr) {
            var disabled = false;
            function onClick(evt) {
              console.log("11111");
              if (disabled) {
                //取消默认事件和事件冒泡
                evt.preventDefault();
                evt.stopImmediatePropagation();
              } else {
                disabled = true;
                $timeout(function() {
                  disabled = false;
                  //console.log("22222");
                }, delay, false);
              }
            }
            //绑定点击事件
            element.on('click', onClick);

            //执行原链接事件
            return originalLink(scope, element, attr);
          };

          //返回新链接方法
          return link;
        };

        return $delegate;
      }
    ]);
  }
]);*/
