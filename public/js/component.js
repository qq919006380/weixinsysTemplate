/**
 * 系统通用组件
 */


//弹出窗口服务
app.factory('zxconfirm',["$modal",function($modal){
    return {
        confirm: function(showtext,callback,error){
            // 弹出删除确认
            var modalInstance = $modal.open({
                //templateUrl: 'admin/services/confirm.html',
                template:'<div class="modal-header"><h3>{{text}}</h3></div><div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">取消</button><button class="btn btn-primary" ng-click="ok()">确定</button></div>',
                backdrop:'static',//控制背景，允许的值：true（默认），false（无背景），“static” - 背景是存在的，但点击模态窗口之外时，模态窗口不关闭
                controller: 'zxConfirmController',
                size:'sm',
                resolve : {  
                    showtext : function() {  
                        return showtext;  
                    }  
                }  
            });
            modalInstance.result.then(function () {
              callback()
            },
            function (reason) {
                if (error) {
                    error(reason);
                };
            });

        }
    }

}])
app.controller('zxConfirmController', ['$scope', '$modalInstance','showtext',function($scope, $modalInstance,showtext){
    
    $scope.text = showtext;
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () { 
        $modalInstance.dismiss('cancel');
  };
}])