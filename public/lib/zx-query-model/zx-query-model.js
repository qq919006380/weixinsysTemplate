/**
 * Created by Administrator on 2017-4-1.
 */

;(function(angular){
    'use strict';

    //配置对象
    var CONF = {
        baseUrl: 'lib/zx-query-model/templates/',
        digestTtl: 35
    };

angular.module('zx.query.model', [],["$rootScopeProvider",function($rootScopeProvider){
        $rootScopeProvider.digestTtl(CONF.digestTtl)
    }])
.directive('zxSetFocusOn',function(){
        return{
            restrict:'EAC',

            link: function($scope, $element, $attrs) {
                var sInx;
                setTimeout(function(){
                    sInx=$element.find("input:text");
                    jQuery("input:text:eq(0)").focus();
                },500);
                $element.bind('keydown', function (e) {
                    var key = e.which;
                    var tit=$element.find("input:text:focus");

                    if (key == 13) {
                        e.preventDefault();
                        var nxtIdx = sInx.index(tit) + 1;
                        jQuery("input:text:eq(" + nxtIdx + ")").focus();
                    }
                });

            }
        }
    })
.factory("$zxQueryModel",['$state','$location',"$modal",function($state,$location,$modal){
        var modalInstance;
        function AlertQuery(appData,call){
            // console.log("-- test open--");
            modalInstance = $modal.open({
                templateUrl: CONF.baseUrl+"query.html",
                backdrop: 'static', //控制背景，允许的值：true（默认），false（无背景），“static” - 背景是存在的，但点击模态窗口之外时，模态窗口不关闭
                controller: "zxQueryModalCtrl",
                size: 'ss',
                resolve: {config: function () {return appData;}}
            });


            modalInstance.result.then(function (data) {
                var str={str:data,"static":appData}
                    call(str);
                    $location.search({});
                    modalInstance=null;
                },function (reason) {
                    $location.search({});
                    modalInstance=null;
            });
        }
        return {

            setInit:function(scope){
                //监听事件
                scope.$on('openZxQueryModel',function(event,state,app,call){
                    var curViewName = $state.$current.name;
                    if(curViewName === state){
                        AlertQuery(app,call);
                    }
                });
                //clear
                scope.$on('$stateChangeStart',function(){
                     modalInstance=null;
                });
            }
        };
    }])
.directive('queryZxModel', ['$document',"InitialModal", function($document,InitialModal) {
        return {
            restrict: 'EAC',
            // replace: true,
            templateUrl : CONF.baseUrl+'list-tree.html',
            scope:{
                "data":"=",
                "cancel":"="
            },
            controller : function($scope,$rootScope){
                $scope.setDataClick=function(content,d){
                    content.value[0].value= d.id;
                    content.value[1].value= d.name;
                    return content;
                }
                $scope.selectChangeEvent=function(content,d){
                    content.value[0].value= d.id;
                    content.value[1].value= d.name;
                    // $rootScope.$broadcast('selectChanged',content,$scope.cancel);
                    // $rootScope.$on('selectChanged', function(event, data,colseModal){
                    //     $scope.content=data
                    // })
                    // return content;
                }
                $scope.ngselectChange=function(content){
                    // content.value[0].content.value[0].value
                    // content.value[1].content.value[0].value
                    console.log("post22222222")
                    $rootScope.$broadcast('selectChanged',content,$scope.cancel);
                    
                    return content;
                }
                $scope.radioClick=function(content,x){
                    $rootScope.$broadcast('radioClick',content,$scope.cancel);
                    content.value[0].value=x.id
                    content.value[1].value=x.name
                    return content;
                }
                
                $scope.opendate=function(list){
                    list.opened=false;
                    list.opened=true;
                    return list;
                }
                $scope.setfocusdata=function(content){
                    if(content.value[0].value)
                    {
                        if(content.value[1].value=="")
                        {
                            content.value[1].value=content.value[0].value;
                        }
                    }
                    return content;
                }

                $scope.changeEnter=function(){
                    if(window.event){
                        if (window.event.keyCode==9)
                        {

                        }

                    }

                }

                $scope.getSelectData=function(cont,id){
                    InitialModal.getdata({
                        type : cont.data,
                    },function(data){
                        cont.value[id].value=data[0][cont.cval];
                        return cont;
                    });
                }
                $scope.getSelectText=function(cont){
                    InitialModal.getdata({
                        type : cont.data,
                    },function(data){
                        cont.value=data[0][cont.cval];
                        return cont;
                    });
                }
                $scope.getValue=function(content,d){
                    for(var p=0;p<content.length;p++)
                    {
                        if(content[p].id==d)
                        {
                            return content[p].name
                        }
                    }
                    return "";
                }
            },
            link: function(scope, $element, attrs) {

            }
        };
    }
    ])
.controller('zxQueryModalCtrl', ['$scope', '$modalInstance', 'config','zxhttp',"uiGridConstants","fdate","$filter",
        function($scope, $modalInstance, config,zxhttp,uiGridConstants,fdate,$filter) {

            $scope.data=config;

            $scope.configGetData=function(data){
                if(data.type=="date")
                {
                    var str=""
                    if(data.value[0].value!=""&&data.value[0].value!=null)
                    {

                        str+=data.id+">=" +fdate.forMatDate(data.value[0].value,"yyyy,MM,dd");
                    }
                    if(data.value[1].value!=""&&data.value[1].value!=null)
                    {
                        if(str!=""){
                            str=str+" and ";
                        }
                        str+=data.id+"<=" +fdate.forMatDate(data.value[1].value,"yyyy,MM,dd");
                    }
                    return str;
                }else if(data.type=="input")
                {
                    if(data.value=="")
                    {
                        return ""
                    }
                    var str=data.id+"."+data.query+"('"+data.value+"')";
                    return str;
                }else if(data.type=="select")
                {
                    var str="";
                    if(data.value[0].value=="")
                    {
                        return ""
                    }
                    if(data.datatype=="number"){
                        str=data.id+"="+data.value[0].value;
                    }else {
                        str=data.id+"='"+data.value[0].value+"'";
                    }

                    return str;
                }else if(data.type=="selectEvent")
                {
                    var str="";
                    if(data.value[0].value=="")
                    {
                        return ""
                    }
                    if(data.datatype=="number"){
                        str=data.id+"="+data.value[0].value;
                    }else {
                        str=data.id+"='"+data.value[0].value+"'";
                    }

                    return str;
                }else if(data.type=="selectOn")
                {   var str=""
                    if(data.value[0].value!="")
                    {
                        str+=data.id+">='" +data.value[0].value+"'";
                    }
                    if(data.value[1].value!="")
                    {
                        if(str!=""){
                            str=str+" and ";
                        }
                        str+=data.id+"<='" +data.value[1].value+"'";
                    }

                    return str;
                }else if(data.type=="radioEvent")
                {   var str=""
                    if(data.value[0].value!="")
                    {
                        // str+=data.id+"='" +data.value[0].value+"'";
                    }
                    /*if(data.value[1].value!="")
                    {
                        if(str!=""){
                            str=str+" and ";
                        }
                        str+=data.id+"<='" +data.value[1].value+"'";
                    }*/

                    return str;
                }
                else if(data.type=="selectText")
                {   var str=""
                    if(data.value!="")
                    {
                        if(str!=""){
                            str=str+" and ";
                        }
                        str+=data.id+"='" +data.value+"'";
                    }

                    return str;
                }
            }

            $scope.getDataMac=function(){
                var str=""
                for (var i=0;i<$scope.data.length;i++)
                {
                    if(i==0)
                    {
                        str+=$scope.configGetData($scope.data[i]);
                    }else {
                        var sty=$scope.configGetData($scope.data[i])
                        if(sty!="")
                        {
                            if(str=="")
                            {
                                str+=sty;
                            }else {
                                str+=" and "+sty;
                            }

                        }

                    }
                }
                return str;
            }


            $scope.getSelectData=function(cont,data){
                InitialModal.getdata({
                    type : cont.data,
                },function(data){

                });
            }


            $scope.getDateToStr=function(){
                for (var i=0;i<$scope.data.length;i++)
                {
                    if($scope.data[i].type=="date")
                    {
                        if(typeof $scope.data[i].value[0].value=="object")
                        {
                            $scope.data[i].value[0].value=$filter('date')($scope.data[i].value[0].value,"yyyy-MM-dd");
                        }
                        if(typeof $scope.data[i].value[1].value=="object")
                        {
                            $scope.data[i].value[1].value=$filter('date')($scope.data[i].value[1].value,"yyyy-MM-dd");
                        }
                    }
                }
            }

            $scope.clearValue=function(data){
                if(typeof data.value=="string")
                {
                    data.value="";
                }else {
                    data.value[0].value=""
                    data.value[1].value=""
                }
            }

            $scope.clear = function() {
                for (var i=0;i<$scope.data.length;i++)
                {
                    $scope.clearValue($scope.data[i]);
                }
            };

            var footer=$scope.$watch("data",function(o,n,s){
                $scope.getDateToStr();
            },true);
            $scope.ok = function() {

                $modalInstance.close($scope.getDataMac());
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);


})(window.angular);

