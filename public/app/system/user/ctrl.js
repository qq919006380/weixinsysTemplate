//用户数据
app.controller('UserformController', ['$scope','$modal','$filter','zxhttp','zxToolsBar','zxZtree','$localStorage','toaster','zxconfirm','InitialModal','baseDataService','i18nService',function($scope,$modal,$filter,zxhttp,zxToolsBar,zxZtree,$localStorage,toaster,zxconfirm,InitialModal,baseDataService,i18nService){

    /************************ 实例化服务 ************************/

    //获取用户资料服务实例对象
    var UserlistService = baseDataService.getService("UserlistService");
    
    /*************************** 变量设置 ***************************/

    //搜索框文本
    $scope.search_context = "";
    $scope.items = UserlistService.GetAll();            //本地用户数据
    $scope.classitems = UserlistService.GetAllClass();  //本地用户分类数据

    //区域树组件treeId
    $scope.treeId = "userTree";


    /************************* 用户分类数据逻辑 **********************/

    //初始化树组件
    $scope.initTreeData = function(data){
        if(!data||!data.length) return;
        data = $filter('orderBy')(data,'clevel');
        // var fileds = { name:"cd_cname", level:"cd_clevel", key:"cd_cclassid", classname:"全部用户分类"  };
        var fileds = { name:"cclassname", level:"clevel", key:"cclassid", classname:"全部用户分类"  };
        $scope.treeData = zxZtree.transformTreeData($scope.treeId,data,fileds);
    }   

    //获取用户分类数据
    $scope.getClass = function(){
        // var Params = [{"Condition": "cs_iid = 8 "}];
        var Params = [{"cclassid": ""}];
        UserlistService.SearchClass(Params,[]).success(function(data){
            console.log(data);
            if (data.Result == "200"){
                //添加分类数据
                $scope.classitems.length = 0;
                UserlistService.AddClassItems(data.DataJson);
                //初始化树组件
                $scope.initTreeData($scope.classitems);
                //当区域数据加载完成后，再去拉取用户数据
                $scope.getData('');
            }else{
                toaster.pop("error", "获取用户分类数据", data.ErrMsg);
            }
        });
    }();


    //新增一条分类数据
    $scope.addClass = function(action,item){
        // var Params=[{"item":{"cclassid":"0404","cclassname": "普通用户4", "clevel":"", "cremark": ""}}]
            var Params=[{item}]
        // var Recordset = [{ "classdtl_cd": item }];
        UserlistService.CreateClass(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                var result = data.DataJson[0];
                //添加分类
                UserlistService.AddClassItem(result);
                console.log("result:"+result)
                //增加树节点
                zxZtree.addTreeNode($scope.treeId,action,result,$scope.treeData);
                toaster.pop("success", "新增用户分类", "新增用户分类成功！");
            } else {
                toaster.pop("error", "新增用户分类", data.ErrMsg);
            }
        });
    }

    //编辑一条分类数据
    $scope.editClass = function(item){
        // var Recordset = [{ "classdtl_cd": item }];
        var Params=[{'item':item}]
        UserlistService.UpdateClass(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //编辑分类
                UserlistService.EditClassItem(item.clevel, item);
                //更新树节点
                zxZtree.updateTreeNode($scope.treeId,item);
                toaster.pop("success", "修改用户分类", "修改用户分类！");
            } else {
                toaster.pop("error", "修改用户分类", data.ErrMsg);
            }
        });
    }

    //删除单个分类数据
    $scope.delClass = function(clevel,item) {
        // var Params = [{ "Condition": "cs_iid = 8 and clevel ='" + clevel + "'" }];
        var Params = [{'item':item}]
        if($scope.items.length>0){ 
            console.log($scope.items)
            toaster.pop("error", "请先删除该分类下的所有信息");
        }else if($scope.items.length<=0) {
            console.log('可执行删除')
            UserlistService.DeleteClass(Params).success(function(data){
            //console.log(data);
                if (data.Result == "200") {
                    //删除用户分类
                    UserlistService.DelClassItem(clevel);
                    //删除树节点
                    zxZtree.delTreeNode($scope.treeId,$scope.treeData,clevel);
                    toaster.pop("success", "删除用户分类", "删除用户分类成功！");
                } else {
                    toaster.pop("error", "删除用户分类", data.ErrMsg);
                }
            });
        }
        
    };


    /************************** 用户数据逻辑 ************************/

    //获取用户数据
    $scope.getData = function(clevel,treeNode_cclassid){
        //默认按搜索框文本条件进行检索
        // var Params = [{"Condition":"(ul_cid.Contains('"+$scope.search_context+"') or ul_cname.Contains('"+$scope.search_context+"'))"}];
        var Params=[{"cclassid":treeNode_cclassid,"cid":$scope.search_context,"cusername":$scope.search_context}]

        //设置分页
        Params[0].ItemsOfPage= $scope.gridUserOpts.paginationPageSize;
        Params[0].IndexOfpPge= $scope.gridUserOpts.paginationCurrentPage;
        console.log(Params);
        //按层次码进行检索
        if(typeof clevel != "undefined"){
            // Params[0].Condition += "and (clevel.StartsWith('"+clevel+"'))";
            console.log("clevel:"+clevel)
            Params[0].clevel=clevel
        }
        UserlistService.Search(Params,[]).success(function(data){
            console.log(data);
            if (data.Result == "200"){
                $scope.items.length=0;
                UserlistService.AddItems(data.DataJson);
                //设置分页参数
                $scope.gridUserOpts.data=$scope.items;
                //设置记录总数
                $scope.gridUserOpts.totalItems=data.DataCount;
            }else{
                toaster.pop("error", "获取用户数据", data.ErrMsg);
            }
        });
    }

    //新增一条用户数据
    $scope.addData = function(item){
        // var Recordset = [{ "userlist_ul": item }];
        var Params=[{"item":item}]        
        UserlistService.Create(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //添加用户
                UserlistService.AddItem(item);
                toaster.pop("success", "新增用户记录", "新增用户成功！");
            } else {
                toaster.pop("error", "新增用户记录", data.ErrMsg);
            }
        });
    }

    //编辑一条用户数据
    $scope.editData = function(item){
        var Params=[{'item':item}]
        UserlistService.Update(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //编辑用户
                UserlistService.EditItem(item.cid, item);
                console.log("test");
                console.log(item.cid);
                console.log(item);
                toaster.pop("success", "修改用户记录", "修改用户成功！");
            } else {
                toaster.pop("error", "修改用户记录", data.ErrMsg);
            }
        });
    }

    //删除单个记录
    $scope.delData = function(item) {
        // var Params = [{ "Condition": "ul_cid ='" + item.ul_cid + "'" }];
        var Params=[{'item':item}]
        UserlistService.Delete(Params).success(function(data){
            //console.log(data);
            if (data.Result == "200") {
                //删除用户
                UserlistService.DelItem(item.cid);
                toaster.pop("success", "删除用户记录", "删除成功！");
            } else {
                toaster.pop("error", "删除用户记录", data.ErrMsg);
            }
        });
    };

    //重置用户密码
    $scope.updatePassword = function(){
        //判断是否选中用户记录
        var selected = $scope.userGridApi.selection.getSelectedRows();
        if(!selected[0]){ 
            toaster.pop("error", "重置用户密码","请选中一个用户记录");
            return;
        }
        //如果是系统管理员本人修改自己的密码则为非法操作
        if(angular.isDefined($localStorage.user)&&$localStorage.user.userid===selected[0].cid){
            toaster.pop("error", "重置用户密码","非法操作，不能重置本人的密码！");
            return;
        }
        //打开弹窗
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/system/user/updatePasswordForm.html',
            controller: 'updatePasswordFormCtrl',
            backdrop:'static',
            resolve: {
                modalParams: function () {
                    return {
                        data : { item:selected[0] }
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            //console.log(result);
        },function () {
            //分类模态页面的取消按钮
            //$scope.classModalCancel();
        });
    }

    /************************* 事件监听处理 *************************/

    //通过搜索--获取用户数据
    $scope.search = function(){
        //获取用户数据
        $scope.getData("");
    }

    //监听“回车键”搜索
    $scope.enterSearch = function(e) {
        //console.log(e)
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13) $scope.search();
    }


    /************************* 配置分类模态窗口 **********************/

    //打开分类模态窗口
    $scope.openClassModal = function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/system/user/userClassFormMG.html',
            controller: 'userClassFormMGCtrl',
            backdrop:'static',
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            //新增分类方式
            if(data.type=="new"){
                // 增加分类
                $scope.addClass(data.action,result);
            //编辑分类方式
            }else if(data.type=="edit"){
                // 更新分类
                $scope.editClass(result);
            }
        }, function () {
            //分类模态页面的取消按钮
            //$scope.classModalCancel();
        });
    };


    //打开“新增分类”模态窗口
    $scope.openAddUserClassModal = function(action){
        //获取当前选中的分类节点及其父节点
        var selectedNode = zxZtree.getCurSelectedNode($scope.treeId)||{};
        var selectedNodeParent = selectedNode.getParentNode&&selectedNode.getParentNode()||{};
        //计算父级层次码
        var clevel = "";
        if(action=="silibing"){
            clevel = selectedNodeParent.zxlevel||"";
            console.log('clevel:'+selectedNodeParent.zxlevel||"")
        }else if(action=="child"){
            clevel = selectedNode.zxlevel||"";
            console.log('clevel:'+selectedNode.zxlevel||"")
        }
        console.log("clevel:"+clevel);
        var data = {title:"新增用户分类", type:"new", action:action, item:{
            "clevel": clevel,
            "cs_iid" : 8
        }};
        $scope.openClassModal(data);
        console.log(data)
    }

    //打开“编辑分类”模态窗口
    $scope.openEditUserClassModal = function(){
        var node = zxZtree.getCurSelectedNode($scope.treeId);
        //console.log(node.origialData);
        if(node){
            var data = { title:"修改用户分类", type:"edit", item:node.origialData };
            $scope.openClassModal(data);
        }else{
            toaster.pop("error", "提示", "选择一个用户分类");
        }
    }


    /************************ 配置用户模态窗口 ************************/

    //打开用户表单模态窗口
    $scope.openUserModal=function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/system/user/userFormMG.html',
            controller: 'userFormMGCtrl',
            backdrop:'static',
            size : "lg", //大小配置
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            if(data.type=="new"){
                //新增用户记录
                $scope.addData(result);
                console.log('新增模态框输入的数据：'+result)
            }else if(data.type=="edit"){
                //修改用户信息
                $scope.editData(result);
                console.log('修改模态框输入的数据：'+result)
                window.result=result
            }
        }, function () {
            //用户模态页面的取消按钮
            //$scope.userModalCancel();
        });
    };

    //打开“新增网点”模态窗口
    $scope.openAddUserModal = function(){
        //检测是否选中单一区域节点
        var node = zxZtree.getCurSelectedNode($scope.treeId)||{};
        //新增网点操作
        var data = { title:"新增用户信息", type:"new", item:{cclassid:node.classId, cclassname:node.name, cstop:'0'}}
        $scope.openUserModal(data);
    }

    //打开“编辑用户”模态窗口
    $scope.openEditUserModal = function(){
        var selected = $scope.userGridApi.selection.getSelectedRows();
        if(selected[0]){
            var data = { title:"编辑用户信息", type:"edit", item:angular.copy(selected[0])}
            $scope.openUserModal(data);
        }else{
            toaster.pop("error", "编辑用户信息","请选中一个用户记录");
        }
    }


    


    /************************ 树节点逻辑处理 ************************/

    //监听树节点的点击事件
    $scope.zTreeOnClick = function(event,treeId,treeNode,clickFlag){
        console.log(treeNode);
        //选中客户分类
        $scope.selectOneUserClass(treeNode||'')
    }

    //选中单个用户分类
    $scope.selectOneUserClass = function(treeNode){
        var treeNode_cclassid=treeNode.origialData.cclassid
        var treeNode_cclassname=treeNode.origialData.cclassname
        //获取该分类的用户数据
        $scope.getData(treeNode.zxlevel,treeNode_cclassid);
    };

    //选中单个用户记录
    $scope.selectOneUser = function(cid){
        console.log(cid);
        //获取角色数据
        // $scope.getRoleData(ul_cid);
    }


    /************************* 工具条配置 ****************************/

    /**/
    //工具条配置对象
    //必须参数：按钮类型type、按钮权限level、回调函数func
    //可选参数：名称name、可用性enable、显示状态dispaly、图标icon
    var levelID = "0104";
    var config = {
        data : [/*{
            "name": "新增同级分类", "type": "new", "level":levelID+"01",
            "func": function(){
                console.log("新增同级");
                //打开“同级分类”模态窗口
                $scope.openAddUserClassModal("silibing");
            }
        },{
            "name": "新增下级分类", "type": "new", "level":levelID+"01",
            "func": function(){
                console.log("新增下级");
                //打开“下级分类”模态窗口
                $scope.openAddUserClassModal("child");
            }

        },{
            "name": "修改分类", "type": "edit", "level":levelID+"02",
            "func": function(){
                console.log("修改分类");
                //打开“编辑分类”模态窗口
                $scope.openEditUserClassModal();
            }
        },{
            "name": "删除分类", "type": "delete", "level":levelID+"03",
            "func": function(){
                console.log("删除用户分类");
                var node = zxZtree.getCurSelectedNode($scope.treeId);
                if (!node) {
                    toaster.pop("error", "提示", "选择一条分类记录");
                    return;
                };
                var item = node.origialData
                //删除客户分类
                zxconfirm.confirm('是否删除用户分类?',function(){
                    console.log("---------------delete------------------");
                    //删除用户分类记录
                    $scope.delClass(node.zxlevel,item);
                });
            }
        },{ 
            "type":"line"
        },*/{ 
            "name": "新增用户", "type": "new", "level":levelID+"04",
            "func": function(){ 
                console.log("新增"); 
                //打开“新增网点”模态窗口
                $scope.openAddUserModal();
            }
        },{ 
            "name": "编辑用户", "type": "edit", "level":levelID+"05",
            "func": function(){ 
                console.log("编辑"); 
                //打开“编辑用户”模态窗口
                $scope.openEditUserModal();
            }  
        },{ 
            "name": "删除用户", "type": "delete", "level":levelID+"06",
            "func": function(){ 
                  console.log("删除用户记录"); 
                  var item = $scope.userGridApi.selection.getSelectedRows();
                  if (!item[0]) {
                        toaster.pop("error", "提示", "选择一条用户记录");
                        return;
                  };
                  zxconfirm.confirm('是否删除用户记录?',function(){
                      console.log("---------------delete------------------");
                      //删除用户记录
                      $scope.delData(item[0]);
                  });
            }  
        },{ 
            "name": "重置密码", "icon":"fa fa-gavel", "type": "custom", "level":levelID+"07",
            "func": function(){ 
                    console.log("重置用户密码"); 
                    //修改密码
                    $scope.updatePassword();
            }  
        },{
            "type":"line"
        }]
    };
    $scope.toolsbar = zxToolsBar.newToolsbar(config);


    /*************************** 树结构配置 ***************************/

    //树指令配置对象
    $scope.treeConfig = {
        view : { showLine : false },
        //edit : { enable : true },
        callback : {
            onClick : $scope.zTreeOnClick
        }
    };


    /**************************** 用户列表配置 ******************************/
    // $scope.columnDefsUsers = [
    //     { field:'ul_cid', displayName:'用户编码' },
    //     { field:'ul_cname', displayName:'用户名称' },
    //     { field:'ul_ceeid', displayName:'员工编码' },
    //     { field:'cd_cclassid', displayName:'分类编码' },
    //     { field:'cd_cname', displayName:'分类名称' },
    //     { field:'ul_cstop', displayName:'停用标识',"cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>是</div><div ng-if = 'row.entity[col.field]== 0'>否</div>" },
    //     { field:'ul_cremark', displayName:'备注' }
    // ];

    $scope.columnDefsUsers = [
        { field:'cid', displayName:'用户编码' },
        { field:'cusername', displayName:'用户名称' },
        { field:'ceeid', displayName:'员工编码' },
        { field:'cclassid', displayName:'分类编码' },
        { field:'cclassname', displayName:'分类名称' },
        { field:'cstop', displayName:'停用标识',"cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>是</div><div ng-if = 'row.entity[col.field]== 0'>否</div>" },
        { field:'csuper', displayName:'超级用户',"cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>是</div><div ng-if = 'row.entity[col.field]== 0'>否</div>" },
        { field:'cremark', displayName:'备注' }
    ];

    //ui-grid的属性
    $scope.gridUserOpts = {
        columnDefs: $scope.columnDefsUsers,
        data: $scope.items,
        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        //-------- 分页属性 ----------------
        paginationPageSizes: [20, 25, 30], //每页显示个数可选项
        paginationCurrentPage:1, //当前页码
        paginationPageSize: 20, //每页显示个数
        totalItems : 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮
        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        enableFullRowSelection : false, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        multiSelect: false ,// 是否可以选择多个,默认为true;
        //---------------api---------------------
        onRegisterApi: function(gridApi) {
            $scope.userGridApi = gridApi;
            //行选中事件
            $scope.userGridApi.selection.on.rowSelectionChanged($scope,function(rowItem,event){
                if(rowItem){
                    //选中单个用户记录
                    $scope.selectOneUser(rowItem.entity.cid);
                }
            });
            //分页切换事件
            $scope.userGridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
                //获取数据
                $scope.getData();
            });
        }
    };
    i18nService.setCurrentLang('zh-cn');

}]);


//用户分类模态页
app.controller('userClassFormMGCtrl',['$scope', '$modalInstance','modalParams','zxhttp','toaster', function($scope, $modalInstance,modalParams,zxhttp,toaster){

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);

    $scope.data = $scope.modalParams.data;
    $scope.tempItem = $scope.data.item||{};

    //确认按钮
    $scope.ok = function(){
        $modalInstance.close($scope.tempItem);
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);


//用户表单模态页
app.controller('userFormMGCtrl',['$scope', '$modalInstance','modalParams','zxhttp','toaster','baseDataService', function($scope, $modalInstance,modalParams,zxhttp,toaster,baseDataService){

    /************************ 实例化服务 ************************/

    //获取用户资料服务实例对象
    var UserlistService = baseDataService.getService("UserlistService");

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);

    $scope.data = $scope.modalParams.data;
    $scope.tempItem = $scope.data.item||{};

    $scope.classitems = UserlistService.GetAllClass();  //本地用户分类数据
    $scope.classselect = {"cclassid": $scope.tempItem.cclassid, "cclassname": $scope.tempItem.cclassname}

    // 选择事件
    $scope.onSelectCallback = function($item){
      $scope.tempItem.cclassid =  $item.cclassid;
      $scope.tempItem.cclassname =  $item.cclassname;
    };

    //确认按钮
    $scope.ok = function(){
        //检查分类不能为空
        if(!$scope.tempItem.cclassid||$scope.tempItem.cclassid==""){
            toaster.pop("error", "用户", "用户分类不能为空！");
            return;
        }
        //停用标识
        $scope.tempItem.cstop = $scope.tempItem.cstop?"1":"0";
        $scope.tempItem.csuper = $scope.tempItem.csuper?"1":"0";

        //关闭窗口并返回对象
        $modalInstance.close($scope.tempItem);
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

//修改用户密码
app.controller('updatePasswordFormCtrl',['$scope', '$modalInstance','modalParams','zxhttp','toaster', function($scope, $modalInstance,modalParams,zxhttp,toaster){

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);

    $scope.data = $scope.modalParams.data;
    $scope.tempItem = $scope.data.item||{};
    $scope.tempItem.password = "";
    $scope.tempItem.repassword = "";

    //确认按钮
    $scope.ok = function(){
        if($scope.tempItem.password==""||$scope.tempItem.repassword==""){
            toaster.pop("error", "重置用户密码","用户密码不能为空！");
            return;
        }
        if($scope.tempItem.password!==$scope.tempItem.repassword){
            toaster.pop("error", "重置用户密码","密码不一致！");
            return;
        }
        // var Params = [{"UserID":$scope.tempItem.cid,"NewPassword":$scope.tempItem.password}];
        var Params = [{"cid":$scope.tempItem.cid,"newpassword":$scope.tempItem.password}]
        zxhttp.post("webapi/userlist/resetpwd",Params,[],function(data){
            console.log(data);
            if (data.Result == "200") {
                $scope.tempItem.cpwd = $scope.tempItem.password;
                $modalInstance.close($scope.tempItem);
                toaster.pop("success", "重置用户密码", "重置成功！");
            }else{
                toaster.pop("error", "重置用户密码", data.ErrMsg);
            }
        });
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);



