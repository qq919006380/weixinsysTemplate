//nav列表指令组件指令
;(function(angular){
  'use strict';

  //配置对象
  var CONF = {
      baseUrl: 'lib/zx-aside-nav/templates/',
      digestTtl: 35
  };

//注册模块
angular.module('zx.aside.nav', [], ["$rootScopeProvider",function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
}])


//左侧栏nav列表指令
.directive("zxAsideNav",[function(){
  return {
    restrict : 'AE',
    replace: true,
    templateUrl : CONF.baseUrl+'zx-aside-nav.html',
    scope: {
      "data":"="
    },
    controller : function($scope){
      //console.log("--------------------zxAsideNav----------------------");
      //console.log(JSON.stringify($scope.data));
      console.log($scope.data)
    },
    link : function($scope,elem){

    }
  };

}])


;

})(window.angular);
