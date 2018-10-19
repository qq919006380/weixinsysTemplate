/**
 * 系统通用服务
 */

/************************** 系统服务 ****************************/
app.factory('SysCode',['zxhttp','toaster',function (zxhttp,toaster) {
    var code;
    return {
        Code:function () {
            return code
        },
        getSysCode:function (levelID,fun) {
            let  Params=[{"Cmodeid":"","Clevel":levelID}];
            zxhttp.post("SysCodeService/GetNumber",Params,[],function(data){
                if (data.Result == "200") {
                    code=data.DataJson[0].Mtable[0];
                    fun(code);
                }else {
                    toaster.pop("error", "获取单号失败", data.ErrMsg);
                }
            })
        }
    }
}]);

//在ui-grid报表编辑状态时，触发日期控件的指令
app.directive("inputDate",function(){
    return {
        restrict : "AE",
        replace : true,
        template : "<input type='text' datepicker-popup='yyyy-MM-dd' ng-click='opendate()' is-open='opened[column]' />",
        link : function(scope,elem,attr){
            //
            scope.date = "";
            scope.column = attr.inputDate;

            scope.opendate = function(str){
                str = scope.column;
                //console.log("--------opendate--------:"+str);
                scope.opened = {};
                scope.opened[str] = true;
            }
        }
    }
});

//指令zxAuditflag：为单据添加“审核”标识
//用法：为目标元素添加属性zx-auditflag="expression"，其中expression是控制“已审核标识”显隐状态的表达式，解释后是boolean类型值
//可选属性：zx-class，其作用就是为“已审核标识”添加一个自定义的css class，方便自定义修改标识的样式
//例子：<div class="panel panel-default clearfix" zx-auditflag="integralItem.ip_cauditflag==='1'" zx-class="myClass" >
app.directive("zxAuditflag",["$parse",function($parse){

    return{
        restrict : 'EA',
        scope : true,
        link : function(scope,elem,attrs){    
            //console.log("---------zxAuditflag------------:");


            //获取标识的显隐状态,true/false
            function getAuditflag(){
                //解释值
                var auditflag = $parse(expression)(scope.$parent);
                //设置标识的显隐状态
                setShowState(auditflag);
            }

            //设置标识的显隐状态
            function setShowState(state){
                if(state){
                    target.find(".auditflag").show();
                }else{
                    target.find(".auditflag").hide();
                }
            }


            //获取目标元素
            var target = $(attrs.$$element);
            //设置目标元素的postion
            target.css("position","relative");
            //为auditflag元素添加自定义css class
            var myClass = attrs.zxClass||"";
            //在目标元素的开头插入auditflag元素，默认为隐藏状态
            target.prepend("<div class='auditflag "+myClass+"' style='display:none;'>已审核</div>");


            //获取控制auditflag元素显隐状态的表达式
            var expression = attrs.zxAuditflag;
            //console.log("---attr---:"+expression);
            //获取标识的显隐状态
            getAuditflag();


            //监听父作用域中进行异步加载的数据对象
            scope.$watch(expression,function(){
                //console.log("-----watch Auditflag------");
                //获取标识的显隐状态
                getAuditflag();
            });

        }
    }
}]);

//获取货币
app.factory('CoinService',['zxhttp','toaster',function (zxhttp,toaster) {
    var coin;
    return {
        getCoinService:function (fun) {
            zxhttp.post("CoinService/Search",[],[],function(data){
                if (data.Result == "200") {
                    var coin=[];
                    angular.forEach(data.DataJson[0].Mtable,function(data, index, array){
                        if(data.sc_cstop==0){
                            coin.push(data);
                        }
                    });
                    fun(coin);
                }else {
                    toaster.pop("error", "获取货币数据失败");
                }
            })
        }
    }
}]);
//销售单的子表的过滤
app.filter('chuliflag', function() {
    var Hash = {
        2: '赠品',
        1: '特价',
        4: 'vip价',
        5: '普通'
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//订货变更单过滤
app.filter('changemode', function() {
    var Hash = {
        1: '新增',
        2: '修改',
        3: '取消',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//审核标识过滤
app.filter('cauditflag', function() {
    var Hash = {
        0: '未审核',
        1: '已审核',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//审核标识过滤
app.filter('cstopfilter', function() {
    var Hash = {
        0: '否',
        1: '是',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//计划状态过滤
app.filter('jihuazt', function() {
    var Hash = {
        1: '未审核',
        2: '已审核',
        3: '执行中',
        4: '已完成',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//定购产品采购状态
app.filter('fbkcstate', function() {
    var Hash = {
        0: '未安排',
        1: '计划中',
        2: '订货中',
        3: '已到货',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//货款清类型
app.filter('s_flagfilter', function() {
    var Hash = {
        0: '货清',
        1: '款清',
        2: '全清',
    };
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//状态标志
app.filter('s_endflagfilter', function() {
    var Hash = {0: '已关闭', 1: '未关闭'};
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
app.filter('guanbifilter', function() {
    var Hash = {1: '已关闭', 0: '未关闭'};
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//状态标志
app.filter('datafilter',[ "fdate", function(fdate) {
        return function(input) {
            if (!input){
                return '';
            } else {
                return fdate.formatjsondate(input, 'yyyy-MM-dd');;
            }
        };
    }])
// 单据类型A1订货单，04销售单，A9变更单，A8预收款单，05退货单，06补货单）
app.filter('ordertypefilter', function() {
    var Hash = {'A1 ': '订货单', '041': '订单转销售', '042': '直接销售','A9 ':'变更单','A8 ':'预收款单','05 ':'退货单','06 ':'补货单'};
    return function(input) {
        if (!input){
            return '';
        } else {
            return Hash[input];
        }
    };
});
//拦截器服务
app.factory('TokenInterceptor',[ "$q", "$window", "$location","$timeout","$rootScope","$localStorage",
    function($q, $window, $location,$timeout,$rootScope,$localStorage) {
    return {
        request: function (config) {
            $rootScope.loading=true;
            // config.headers = config.headers || {};
            // if ($window.sessionStorage.token) {
            //     // console.log($window.sessionStorage.token)
            //     config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            // }
            // if ($localStorage.token) {
            //     config.headers.token = $localStorage.token;
            // };
            // config.headers.Client = 'zxsoft';
            return config;
        },

        requestError: function(rejection) {
            $rootScope.loading = false;
            return $q.reject(rejection);

        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            $rootScope.loading=false;
            try{
                if (response.data.Result == '403') {
                    // $location.url('/');
                    // $state.go("auth.login");

                };
                // if (response.data.Result == '500' && response.data.ErrMsg == 'token匹配不正确') {
                //     $location.url('/auth/login');
                // };
            }catch(err){
                console.log(err);
            };
            // response.config.responseTimestamp = new Date().getTime();
            return response || $q.when(response);
        },
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            $rootScope.loading=false;
            if(rejection.status==401) {
                $location.url('/auth/login');
            }
            return $q.reject(rejection);
        }
    };
}])



//Post服务
app.factory('zxhttp',["$http","$q","$rootScope","md5","$localStorage","$modal",
    function($http,$q,$rootScope,md5,$localStorage,$modal){
        
    //图片路径
    $rootScope.imgurl="";
    //服务器地址
    var host = "";
    //获取本地配置信息
    if(window.localStorage){
        if(window.localStorage.serverUrl){
            host=window.localStorage.serverUrl;
        }
        if(window.localStorage.ServerConfigUrl){
            $rootScope.ServerConfigUrl=JSON.parse(window.localStorage.ServerConfigUrl);
            $rootScope.imgurl=$rootScope.ServerConfigUrl.imgUrl;
        }
    }

    //读取配置文件
    $http.get("./configs/server-config.json").success(function(data){
        window.localStorage.serverUrl=data[0].serverUrl;
        $rootScope.ServerConfigUrl=data[0];
        window.localStorage.ServerConfigUrl=JSON.stringify(data[0]);
        host= data[0].serverUrl;
        $rootScope.imgurl= data[0].imgUrl
    });

    //组装条件格式
    var FormatCondition =  function(Params){
        var Condition = "";
        // {key:'corder',compare :'=',cvalue:'001'}
        var formatcheck = { "=" :'=',
            "!=" :'!=',
            ">" :'>',
            ">=" :">=",
            "<" :"<" ,
            "<=" :"<=",
            "contains" :'Contains',
            "startsWith" :'StartsWith',
            "endsWith" :'EndsWith'
        };
        Params.compare = Params.compare || '';
        var compare = formatcheck[Params.compare.toLowerCase()] ||'';
        var key = Params.key ||'';
        var cvalue = Params.cvalue ||'';

        if (compare == '' || key == '' || cvalue == '') {
            return ''
        };

        if (compare == 'Contains' || compare == 'StartsWith' || compare == 'EndsWith' ) {
            Condition = key + "."+compare+"('"+ cvalue +"') "
        }else{
            Condition = key + compare  + " '" + cvalue + "' "
        };
        return Condition;
    };

    return {
        //get请求
        Get: function(url){
            return $http.get(url);
        },
        //post请求
        post: function(url,Params,Recordset,callback,callerror){

            //默认参数对象
            var postdata  = {
                "IsEncrypt":"N",
                // "Sign":"",
                "CustData":{
                    "AccountDB":"zcwxdb",
                    "UserID":"sa",
                    "passWord":"",
                    "Params":[{"cclassid":""}],
                    "Recordset":[{"cmtename":"","cmteid":"","classid":""}],
                    "CID":$localStorage.cid,
                    "isadmin":$localStorage.isadmin
                }
            };

            //设置Params、Recordset、ApiAuthority
            postdata.CustData.Params = Params;
            postdata.CustData.Recordset = Recordset;
            /*if (postdata.CustData.Params[0]) {
                postdata.CustData.Params[0].ApiAuthority = 0;
            }else
            {
                postdata.CustData.Params.push({"ApiAuthority":0 })
            };*/

            //设置Authorization
            if ($localStorage.Authorization) {
                // $http.defaults.headers.common['Authorization'] = $localStorage.Authorization;
                $http.defaults.headers.common['token'] = $localStorage.Authorization;

                // console.log($http.defaults.headers)
                if ( angular.isDefined($localStorage.user) ) {
                    var user = $localStorage.user;
                    if (user.password) {
                        // md5验证
                        var CustDatastr  = angular.toJson(postdata.CustData).replace(/\s+/g,'')
                        // var CustDatastr  = JSON.stringify(postdata.CustData).replace(/\s+/g,'')
                        // var md5str = md5.createHash(CustDatastr + user.password);
                        var md5str = md5.hex_md5(CustDatastr + user.password);
                        postdata.Sign = md5str;
                        postdata.IsEncrypt = "Y";
                        // console.log(CustDatastr + user.password)
                        // console.log(md5str)
                    };
                };

            };

            //发起post请求
            var promise = $http.post(host + url,postdata).success(function(data, status, headers, config) {
                // console.log(data)
                //执行成功回调
                if (typeof callback == "function") {
                    callback(data, status, headers, config);
                }
                //检查登录状态，若未登录则弹出模态窗口
                /*try{
                    if (data.Result == '403' || data.Result == '406' || data.Result == '410' || data.Result == '419' ) {
                        var modalInstance = $modal.open({
                            templateUrl: 'admin/services/loginmodal.html',
                            backdrop: 'static', //控制背景，允许的值：true（默认），false（无背景），“static” - 背景是存在的，但点击模态窗口之外时，模态窗口不关闭
                            controller: 'loginmodalctrl',
                            size: '',
                            resolve: {
                                ErrMsg: function() {
                                    return data.ErrMsg || "";
                                }
                            }
                        });
                        modalInstance.result.then(function(data) {
                                // callback(data)
                            },
                            function(reason) {
                                // if (error) {
                                //     error(reason);
                                // };
                            });
                    };
                }catch(err){
                    console.log(err);
                };*/

            })
            .error(function(data,status, headers, config) {
                console.log("连接错误!")
                if (typeof callerror == "function") {
                    //执行失败回调
                    callerror(data,status, headers, config)
                };
            });

            return promise;
        },
        //配置图片路径格式
        GetImg: function(params) {
            console.log($rootScope.imgurl)
            var url = params.url||$rootScope.imgurl;
            var apiPath = url + "image?path="+ params.name + "&w=" + params.w + "&h=" + params.h+"&"+Date.now();
            return apiPath;
        },
        //获取条件筛选对象
        getCondition: function(date){
            var Condition = "";
            for (var i = 0; i < date.length ; i++ ) {

                var operator = date[i].operator || 'and';
                date[i].condition = date[i].condition||[];
                if (date[i].condition.length  >  0) {
                    if( Condition.length == 0 ){
                        Condition =  '(' + getCondition(date[i].condition) + ')'
                    }else{
                        Condition =  Condition + ' '+operator+' (' + getCondition(date[i].condition) + ')'
                    }
                }else
                {
                    if( Condition.length == 0 ){
                        Condition =  FormatCondition(date[i])
                    }else{
                        Condition = Condition + ' '+ operator+' ' + FormatCondition(date[i])
                    }
                }
            };
            return Condition;
        }
    }
}]);


//Message信息提示服务
app.factory('Message',["$ionicLoading","$timeout","$ionicActionSheet",function($ionicLoading,$timeout,$ionicActionSheet){

    return {
        Message : function(templatename,times){
            $ionicLoading.show({
                template: templatename
            });
            //延时2000ms来模拟载入的耗时行为
            $timeout(function(){
                //隐藏载入指示器
                $ionicLoading.hide();
            },times||300);
            return;
        },
        Loading: function(templatename){
            var loadStr = '<i class="fa fa-spinner fa-pulse fa-3x" aria-hidden="true"></i>';
            loadStr = templatename!=undefined?templatename:loadStr;
            $ionicLoading.show({
               template: loadStr
            });
        },
        Hide: function(){
            $ionicLoading.hide();
        },
        //动作是否执行提示框
        Makesure : function(title,YesCallback,NoCallback){
            $ionicActionSheet.show({
                buttons: [
                    { text: '确定' }
                ],
                titleText: '<center>'+title+'</center>',
                cancelText:"取消",
                cancel: function() {
                    if(NoCallback){
                        NoCallback();
                    }
                    return false;
                },
                buttonClicked: function(index) {
                    if(YesCallback){
                        YesCallback();
                    }
                    return true;
                }
            });
        }
    }
}]);


/************************** 数据管理 ***************************/

//系统信息管理
app.factory('setting', [function(){
    return {
        viewpermission : {
            webserversurl:"",
            webserversport:"",
            userid:"",
            username:"",
            passpword:"",
            rememberpsw:"",
            account:{CSYSCODE:"",CCNAME:"",username:""}
        }
    }
}]);


//用户
app.factory('userdata',["$http","$localStorage",function($http,$localStorage){
    var user = {"userid":"","username":"","password":""};
    if ( angular.isDefined($localStorage.user) ) {
        user.userid =  $localStorage.user.userid;
        user.username =  $localStorage.user.username;
        // $scope.user.password =  $localStorage.user.password;
    };
    return {
        all: function(){
            return user
        }
    }
}]);


//权限菜单
app.factory('navsdata',["$http","$localStorage",function($http,$localStorage){

    var navs = [];
    var usernavs = [];


    function getTrees(a, idStr, pidStr, chindrenStr) {
        var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
        for(; i < len; i++){
            hash[a[i][id]] = a[i];
        }
        for(; j < len; j++){
            var aVal = a[j], hashVP = hash[aVal[pid]];
            if(hashVP){
                !hashVP[children] && (hashVP[children] = []);
                hashVP[children].push(aVal);
            }else{
                r.push(aVal);
            }
        }
        // console.log('最终等到的tree结构数据: ', r);
        return r;
    }



    return {
        all: function(){
            return usernavs
        },
        get: function(callback) {

            // $http.get('admin/configs/zx-nav-config-bak.json').success(function (data) {          
            //     navs = data.navs;
            //     callback(navs);
            // });

            $http.get('admin/configs/zx-nav-config.json').success(function (data) {          
                navs = data.navs;

                if ( angular.isDefined($localStorage.popeset) ) {
                    var popeset = $localStorage.popeset;
                };

                // 权限菜单
                for (var i = navs.length - 1; i >= 0; i--) {
                    navs[i].cflag = '0'
                };
                for (var i = navs.length - 1; i >= 0; i--) {
                    for (var k = popeset.length - 1; k >= 0; k--) {
                        if (popeset[k].clevel == navs[i].clevel) {
                            navs[i].cflag = '1'
                        };
                    };
                };
                for (var i = navs.length - 1; i >= 0; i--) {
                    if (navs[i].cflag == '0') {
                        navs.splice(i, 1);
                    }; 
                };

                // 更改格式
                navs = getTrees(navs, 'clevel', 'parent_id', 'chindren');
                callback(navs);
            });
        },
        //
        /*getOne : function(sref){
            console.log(usernavs);
            for(var i=0; i<usernavs.length; i++){
                var childs = usernavs[i].childs;
                for(var k=0; k<childs.length; k++){
                    console.log(JSON.stringify(childs[k]));
                    if(childs[k].sref === sref) return childs[k];
                }
            }
        },*/
        Init: function(callback){
            var promise = $http.get('./configs/zx-nav-config.json').success(function(data) {
                navs = data.navs;
                usernavs.length = 0;
                /*
                if ( angular.isDefined($localStorage.popeset) ) {
                    var popeset = $localStorage.popeset;
                };

                // 权限菜单
                for (var i = navs.length - 1; i >= 0; i--) {
                    navs[i].cflag = '0'
                };
                for (var i = navs.length - 1; i >= 0; i--) {
                    for (var k = popeset.length - 1; k >= 0; k--) {
                        if (popeset[k].clevel == navs[i].clevel) {
                            navs[i].cflag = '1'
                        };
                    };
                };
                for (var i = navs.length - 1; i >= 0; i--) {
                    if (navs[i].cflag == '0') {
                        navs.splice(i, 1);
                    }; 
                };
                // 更改格式
                navs = changenavs(navs);
                for (var i = 0 ; i < navs.length ; i++ ) {
                    usernavs.push(navs[i]);
                };

                if (callback) {
                    callback(navs)
                };
                */

                for (var i = navs.length - 1; i >= 0; i--) {
                    navs[i].cflag = '1';
                };

                // 更改格式
                navs = getTrees(navs, 'clevel', 'parent_id', 'chindren');
                for (var i = 0 ; i < navs.length ; i++ ) {
                    usernavs.push(navs[i]);
                };

                if (callback) {
                    callback(usernavs)
                };

                //console.log(JSON.stringify(usernavs));
                //console.log("------------2--------------");

            });
            return promise;

        },
        CheckLevel:function(clevel) {
            /*var popeset = [];
            if ( angular.isDefined($localStorage.popeset) ) {
                popeset = $localStorage.popeset;

                for (var i = popeset.length - 1; i >= 0; i--) {
                    if(popeset[i].clevel == clevel)
                    {
                        return true;
                    }
                };

            };
            return false;*/
        }

    }
}]);


/************************** 基础资料服务 ****************************/

app.factory("baseDataService",["zxhttp","toaster",function(zxhttp,toaster){

    //本地数据
    var data = {};
    var classItems = {};

    //针对于服务器数据API的配置信息，操作方法与对应api关系
    //actions: "Search"/"Create"/"Update"/"Delete"
    var configs = {
        //用户
        "UserlistService" : {
            "primaryKey" : "cid",
            "primaryClassKey" : "cclassid",
            "apis" : { 
                "SearchClass" : "webapi/userlist/getusersclas" , 
                "CreateClass" : "webapi/userlist/addusersclas",
                "UpdateClass" : "webapi/userlist/updateusersclas",
                "DeleteClass" : "webapi/userlist/deleteusersclas",
                "Search" : "webapi/userlist/getusers" , 
                "Create" : "webapi/userlist/addusers" , 
                "Update" : "webapi/userlist/updateuser" , 
                "Delete" : "webapi/userlist/deleteusers" 
            }
        },
        //角色
        "PoperoleService" : {
            "primaryKey" : "pr_croleid",
            "apis" : { 
                "Search" : "PoperoleService/SearchPoperole" , 
                "Create" : "PoperoleService/CreatePoperole" , 
                "Update" : "PoperoleService/UpdatePoperole" , 
                "Delete" : "PoperoleService/DeletePoperole" 
            }
        },
        //货币
        "CoinService" : {
            "primaryKey" : "sc_ccyid",
            "apis" : { 
                "Search" : "CoinService/Search" , 
                "Create" : "CoinService/Create" , 
                "Update" : "CoinService/Update" , 
                "Delete" : "CoinService/Delete" 
            }
        },
        //单位
        "UnitService" : {
            "primaryKey" : "ut_cunitid",
            "apis" : { 
                "Search" : "UnitService/Search" , 
                "Create" : "UnitService/Create" , 
                "Update" : "UnitService/Update" , 
                "Delete" : "UnitService/Delete" 
            }
        },
        //颜色
        "ColorsetService" : {
            "primaryKey" : "ct_ccolorid",
            "primaryClassKey" : "cd_cclassid",
            "apis" : { 
                "SearchClass" : "ColorsetService/SearchColoretClassdtlAll" , 
                "CreateClass" : "ClassdtlService/CreateClassdtl",
                "UpdateClass" : "ClassdtlService/UpdateClassdtl",
                "DeleteClass" : "ClassdtlService/DeleteClassdtl",
                "Search" : "ColorsetService/SearchColoretByKey" , 
                "Create" : "ColorsetService/CreateColorset" , 
                "Update" : "ColorsetService/UpdateColorset" , 
                "Delete" : "ColorsetService/DeleteColorset" 
            }
        },
        //仓库
        "WarehousService" : {
            "primaryKey" : "ws_cwhid",
            "primaryClassKey" : "cd_cclassid",
            "apis" : { 
                "SearchClass" : "WarehousService/SearchWarehousClassdtlAll" , 
                "SearchClassByUser" : "WarehousService/SearchWarehousByUser" , 
                "CreateClass" : "ClassdtlService/CreateClassdtl",
                "UpdateClass" : "ClassdtlService/UpdateClassdtl",
                "DeleteClass" : "ClassdtlService/DeleteClassdtl",

                "Search" : "WarehousService/SearchWarehousByKey" , 
                "Create" : "WarehousService/CreateWarehous" , 
                "Update" : "WarehousService/UpdateWarehous" , 
                "Delete" : "WarehousService/DeleteWarehous" 
            }
        },
        //销售网点
        "StationService" : {
            "primaryKey" : "sn_csnid",
            "primaryClassKey" : "sr_cregionid",
            "apis" : { 
                "SearchClass" : "SalesregionService/Search" , 
                "CreateClass" : "SalesregionService/Create",
                "UpdateClass" : "SalesregionService/Update",
                "DeleteClass" : "SalesregionService/Delete",
                "Search" : "StationService/Search" , 
                "Create" : "StationService/Create" , 
                "Update" : "StationService/Update" , 
                "Delete" : "StationService/Delete" 
            }
        },
        //供应商
        "VendorService" : {
            "primaryKey" : "vd_cid",
            "primaryClassKey" : "cd_cclassid",
            "apis" : { 
                "SearchClass" : "VendorService/SearchVendorClassdtlAll" , 
                "CreateClass" : "ClassdtlService/CreateClassdtl",
                "UpdateClass" : "ClassdtlService/UpdateClassdtl",
                "DeleteClass" : "ClassdtlService/DeleteClassdtl",
                "Search" : "VendorService/SearchVendorByKey" , 
                "Create" : "VendorService/CreateVendor" , 
                "Update" : "VendorService/UpdateVendor" , 
                "Delete" : "VendorService/DeleteVendor" 
            }
        },
        //结算方式
        //..
        //付款条件
        "PaymentService" : {
            "primaryKey" : "pm_cpyid",
            "primaryClassKey" : "cd_cclassid",
            "apis" : { 
                "SearchClass" : "PaymentService/SearchPaymentClassdtlAll" , 
                "CreateClass" : "ClassdtlService/CreateClassdtl",
                "UpdateClass" : "ClassdtlService/UpdateClassdtl",
                "DeleteClass" : "ClassdtlService/DeleteClassdtl",
                "Search" : "PaymentService/SearchPaymentByKey" , 
                "Create" : "PaymentService/CreatePayment" , 
                "Update" : "PaymentService/UpdatePayment" , 
                "Delete" : "PaymentService/DeletePayment" 
            }
        },
        //部门
        "DeptService" : {
            "primaryKey" : "cdclassid",
            "apis" : { 
                "Search" : "webapi/employee/getdepartments" , 
                "Create" : "webapi/employee/adddepartment" , 
                "Update" : "webapi/employee/updatedepartment" , 
                "Delete" : "webapi/employee/deletedepartment" 
            }
        },
        //员工
        "EmployeeService" : {
            "primaryKey" : "ceid",
            "apis" : { 
                "Search" : "webapi/employee/getemployees" , 
                "Create" : "webapi/employee/addemployee" , 
                "Update" : "webapi/employee/updateemployee" , 
                "Delete" : "webapi/employee/deleteemployee" 
            }
        },
        //客户资料
        "CustomerService" : {
            "primaryKey" : "cm_cid",
            "primaryClassKey" : "cd_cclassid",
            "apis" : { 
                "SearchClass" : "webapi/customer/getcustomerclass" , 
                "CreateClass" : "webapi/customer/addcustomerclass",
                "UpdateClass" : "webapi/customer/updatecustomerclas",
                "DeleteClass" : "webapi/customer/deletecustomerclas",
                "Search" : "webapi/customer/getcustomers" , 
                "Create" : "webapi/customer/addcustomer" , 
                "Update" : "webapi/customer/updatecustomer" , 
                "Delete" : "webapi/customer/deletecustomer" 
            }
        },
        //采购周期表业务
        "PocycleBllService":{
            "primaryKey" : "po_cycid",
            "apis" : {
                "Search" : "PocycleService/SearchPocycleView" ,
                "Search2" : "PocycleService/SearchPocyclecView" ,
                "Search3" : "PocycleService/SearchPopocView" ,
                "Create" : "PocycleService/CreatePocycle" ,
                "Update" : "PocycleService/UpdatePocycle" ,
                "Delete" : "PocycleService/DeletePocycle"
            }
        }
    };

    //针对于本地数据进行操作data[name]
    //method:"GetItems/GetItem/AddItems/AddItem/EditItem/DelItem"
    var dataMethods = {
        //获取全部
        GetAll : function(){
            return this.items||[];
        },
        //获取单个
        GetItem : function(id){
            var items = this.items||[];
            var _key = this.primaryKey;
            for (var i = 0; i < items.length; i++) {
                if (items[i][_key] === id) {
                    return items[i];
                }
            }
        },
        //添加多个
        AddItems : function(data){
            if(!data||!data.length) return;
            var items = this.items||[];
            for(var i=0; i<data.length; i++){
                items.push(data[i]);
            }
        },
        //添加单个
        AddItem : function(item){
            if(!item) return;
            var items = this.items||[];
            items.push(item);
        },
        //编辑单个
        EditItem : function(id,data){
            if(!id||!data) return;
            var items = this.items||[];
            var _key = this.primaryKey;
            for (var i = 0; i < items.length; i++) {
                if (items[i][_key] === id) {
                    for (var key in data) {
                        items[i][key] = data[key];
                    }
                }
            }
        },
        //删除单个
        DelItem: function(id){
            if(!id) return;
            var items = this.items||[];
            var _key = this.primaryKey;
            for (var i = 0; i < items.length; i++) {
                if (items[i][_key] === id) {
                    items.splice(i, 1);
                }
            }
        }
    };

    //针对于分类数据进行操作classData[name]
    var classMethods = {
        //获取全部
        GetAllClass : function(){
            return this.classItems||[];
        },
        //获取单个
        GetClassItem : function(id){
            var classItems = this.classItems||[];
            var _key = this.primaryClassKey;
            for (var i = 0; i < classItems.length; i++) {
                if (classItems[i][_key] === id) {
                    return classItems[i];
                }
            }
        },
        //添加多个
        AddClassItems : function(data){
            if(!data||!data.length) return;
            var classItems = this.classItems||[];
            for(var i=0; i<data.length; i++){
                classItems.push(data[i]);
            }
        },
        //添加单个
        AddClassItem : function(item){
            if(!item) return;
            var classItems = this.classItems||[];
            classItems.push(item);
        },
        //编辑单个
        EditClassItem : function(id,data){
            if(!id||!data) return;
            var classItems = this.classItems||[];
            var _key = this.primaryClassKey;
            for (var i = 0; i < classItems.length; i++) {
                if (classItems[i][_key] === id) {
                    for (var key in data) {
                        classItems[i][key] = data[key];
                    }
                }
            }
        },
        //删除单个
        DelClassItem: function(id){
            if(!id) return;
            var classItems = this.classItems||[];
            var _key = this.primaryClassKey;
            for (var i = 0; i < classItems.length; i++) {
                if (classItems[i][_key] === id) {
                    classItems.splice(i, 1);
                }
            }
        }
    };

    //发起请求
    function Post(Url,Params,Recordset){
        if(!Url||!Params) return;
        var promise = zxhttp.post(Url,Params,Recordset||[]);
        promise.error(function(){
            console.log("请求失败!");
            toaster.pop("error", "请求失败","请检查网络原因");
        })
        return promise;
    }

    return {
        //获取实例对象
        getService : function(name){
            //创建service实例对象
            var service = { "name" : name };
            if(!data[name]) data[name]=[];
            service.items = data[name];
            if(!classItems[name]) classItems[name]=[];
            service.classItems = classItems[name];
            return this.initService(service);
        },
        //初始化对象
        initService : function(service){
            //获取配置信息
            var config = configs[service.name]||{};
            var primaryKey = config.primaryKey;
            var primaryClassKey = config.primaryClassKey;
            var apis = config.apis;
            service.primaryKey = primaryKey;
            service.primaryClassKey = primaryClassKey;
            service.apis = apis;
            //添加api配置信息中的"Search"/"Create"/"Update"/"Delete"方法
            for(var key in apis){
                service[key] = (function(url){
                    return function(){
                        var args = Array.prototype.slice.apply(arguments);
                        args.unshift(url);
                        return Post.apply(service,args);
                    }
                })(apis[key]);
            }
            //添加GetAll/GetOne/AddItems/AddOne/EditOne/DelOne方法    
            for(var key in dataMethods){
                service[key] = (function(funcName){ 
                    return function(){
                        var func = dataMethods[funcName];
                        var args = Array.prototype.slice.apply(arguments);
                        return func.apply(service,args);
                    }
                })(key); 
            }  
            //若primaryClassKey不为空，将添加...方法
            if(primaryClassKey){
                for(var key in classMethods){
                    service[key] = (function(funcName){ 
                        return function(){
                            var func = classMethods[funcName];
                            var args = Array.prototype.slice.apply(arguments);
                            return func.apply(service,args);
                        }
                    })(key); 
                } 
            }
            console.log(service);
            return service;
        }
    };
}]);

/**
 ** 说明：javascript的运算结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accSub(arg, this);
};

function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

app.service("$uiSize",function(){
    return{
        addListenter:function(callback){
            window.addEventListener("resize",function(){
                callback();
            })
        }
    }
});
app.directive("reSize",['$uiSize',function($uiSize){

    return{
        restrict : 'EAC',
        link   : function(scope,elem,attr){
            var resize=function(){
                var height=$(window).height()  ;
                var width=$(window).width();
                //  console.log(width);console.log(height);
                if(attr.w)
                {
                    var f=parseFloat(attr.w);
                    if(f){
                        var data=attr.minW;
                        var ls=width-f;
                        if(ls>data){
                            elem.css("width",ls+"px");
                        }else  if(ls<data){
                            elem.css("width",data+"px");
                        }else{
                            elem.css("width",ls+"px");
                        }

                    }

                }
                if(attr.h)
                {   var f=parseFloat(attr.h);
                    if(f){
                        var data=attr.minH;
                        var ls=height-f;
                        if(ls>data){
                            elem.css("height",ls+"px");
                        }else if(ls<data){
                            elem.css("height",data+"px");
                        }else {
                            elem.css("height",ls+"px");
                        }

                    }
                }
            }
            resize();
            $(window).resize(function(e){
                resize();
            });
            $uiSize.addListenter(function(){
                resize();
            });

        }
    }
}]);

app.directive("zxToolShowDow",['$uiSize',function($uiSize){

    return{
        restrict : 'EAC',
        templateUrl : 'tpl/Template/zxToolShowDow.html',
        scope:{
            data:'=',
            call:'='
        },
        controller : function($scope){
            $scope.$watch("data",function(o,e,p){
                $scope.getstr();
            },true);
            $scope.getstr=function(){
                $scope.content=[];
                for(var o=0;o<$scope.data.length;o++)
                {
                    if (typeof $scope.data[o].value=="object")
                    {
                        $scope.setobj($scope.data[o]);
                    }else if (typeof $scope.data[o].value=="string")
                    {
                        $scope.setstr($scope.data[o]);
                    }
                }
            }
            $scope.setstr=function(data){
                if(data.value!="")
                {
                    var obj={"name":data.title,data:"str",str:data.value,ord:data};
                    $scope.content.push(obj)
                }
            }

            $scope.setclear=function(data){
                for(var t=$scope.content.length;t>0;t--)
                {
                    if($scope.content[t-1].name==data.title)
                    {
                        $scope.content.splice($scope.content.indexOf($scope.content[t-1]), 1);
                    }
                }
            }

            $scope.setobj=function(data){
                if(data.value[0].value&&data.value[0].value)
                {
                    var t=0;
                    var obj={"name":data.title,data:"obj",str:data.value,ord:data};
                    if(data.value[0].value){
                        t=t+1;
                    }
                    if(data.value[1].value){
                        t=t+1;
                    }
                    if(data.value[1].value && (data.type=='radio' || data.type=='select' || data.type=='radioEvent')){
                        t=t+1;
                    }
                    if(t==3){
                        obj.data="val"
                    }
                    if(t==2){
                        obj.data="obj"
                    }
                    if(t==1){
                        obj.data="tit"
                    }
                    $scope.content.push(obj)
                }else {
                    $scope.setclear(data);
                }

            }
        },
        link   : function(scope,elem,attr){

        }
    }
}]);

//滚动的指令
app.directive("scrollBar",[function(){
    return {
        restrict : "AE",
        replace : false,
        template: '',
        link : function(scope,elem,attr){
            const ps = new PerfectScrollbar(elem[0], {
            });
        }
    }
}]);