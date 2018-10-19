// app/auth/ctrl.js
app.controller('LoadingController',function($scope,$resource,$state){
    var $com = $resource($scope.app.host + "/auth/info/?");
    $com.get(function(){
        $scope.session_user = $localStorage.user = data; //保存用户信息
        $state.go('app.home');
    },function(){
        $state.go('auth.login');
    }) 
});
app.controller('LoginController',function($scope,$state,$localStorage,userdata,zxhttp,$rootScope){
    console.log("LoginController");
    //console.log($scope);
    // console.log($localStorage.user)

    $scope.user = userdata.all();

    // $scope.user = {"userid":"","username":"","password":""};
    // if ( angular.isDefined($localStorage.user) ) {
    //     // $scope.user =  JSON.parse($localStorage.user);
    //     $scope.user =  $scope.user||{}
    //     $scope.user.userid =  $localStorage.user.userid;
    //     $scope.user.username =  $localStorage.user.username;
    //     // $scope.user.password =  $localStorage.user.password;
    // };

    $scope.login = function(){

        var Params = [{"cid":$scope.user.userid,"pwd":$scope.user.password}]
        var Recordset = [];
        zxhttp.post("webapi/system/login",Params,Recordset,function(data){
            // 用户信息
            console.log(data.Result);
            if (data.Result == "200") {
                // 保存token
                console.log(data)
                $scope.user.username = data.DataJson[0].cusername;
                $localStorage.user =  $scope.user;
                $rootScope.session_user=$scope.user;
                // 是否有管理员权限
                $localStorage.isadmin =  data.DataJson[0].isadmin
                $localStorage.cid= $scope.user.userid
                // 权限列表
                /*$localStorage.popeset = [];
                for (var i = 0; i < data.DataJson[0].Mtable.length; i++) {
                    $localStorage.popeset.push({ "clevel":data.DataJson[0].Mtable[i].pl_clevel })
                };*/
                $localStorage.Authorization = data.DataJson[0].token;
                $state.go('app.home');
            }else{
                // $scope.authError = "服务器登录错误"
                $scope.authError = data.ErrMsg;
            };
        },
        function(data){
            // console.log(data)
           $scope.authError = "服务器登录错误" 
        })


        // $scope.authError = ""
        // var authdata = Base64.encode($scope.user.username + ':' + $scope.user.password);
        // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

        // console.log($http.defaults.headers)

        // console.log($scope.app)
        // $localStorage.auth = authdata;
        // $state.go('app.dashboard');

        // 错误信息
        // $scope.authError = "服务器登录错误"


        // $scope.session_user = $localStorage.user = data; //保存用户信息

        // var $com = $resource($scope.app.host + "/auth/info/?");
        // $com.get(function(){

        //     $scope.session_user = $localStorage.user = data; //保存用户信息
        //     $localStorage.auth = authdata;
        //     $state.go('app.dashboard');
        // },function(){
        //     $scope.authError = "服务器登录错误"
        // })

    }
});
