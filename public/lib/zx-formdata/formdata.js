(function (window, angular) {
    "use strict";
    var formdata=angular.module('zx.form.data', []);
    formdata.directive("zxFormData",[function(){
        return{
            restrict: 'ECA',
            templateUrl : 'lib/zx-formdata/formdata.html',
            scope: false,
            replace: true,
            controller : function($scope,$filter){
                $scope.numberto2=function (value) {
                    if($scope.dataarr[value]){
                        $scope.dataarr[value]=$scope.dataarr[value].toFixed(2);
                        $scope.dataarr[value]=parseFloat($scope.dataarr[value]);
                    }
                }
            },
            link : function($scope,elem){

            }
        };
    }]);
    formdata.directive("zxFormData2",[function(){
        return{
            restrict: 'ECA',
            templateUrl : 'lib/zx-formdata/formdata2.html',
            scope: {
                formdata:"=",
                dataarr:"=",
            },
            controller : function($scope){

            },
            link : function($scope,elem){

            }
        };
    }]);
})(window, window.angular);