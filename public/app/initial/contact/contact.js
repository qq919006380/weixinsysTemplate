/*contact*/

app.controller('ContactCtrl', ['$scope','$http','$filter','$timeout','$modal','toaster','myTools','zxToolsBar','zxconfirm','zxhttp','zxZtree', 'contactSever','contactsetClassServer','i18nService',function($scope, $http, $filter, $timeout, $modal, toaster, myTools, zxToolsBar,zxconfirm,zxhttp,zxZtree,contactSever,contactsetClassServer,i18nService) {

    //toaster type: "error","info","wait","success","warning"

    /************************************ 客户变量 ********************************/

    $scope.items = contactSever.getAllContacts();          //客户数据
    $scope.item = {};           //当前选中的会员分类
    $scope.tempItem = {};       //临时单个客户数据
    $scope.curActionState = ""; //当前客户的操作状态 "new"or"edit"
    $scope.classitems=contactsetClassServer.GetAll();
    $scope.query = '';         //过滤字符串
    //$scope.curGroupNode = null; //当前客户分类的树节点
  /*  $scope.edit=true;     //客户信息是否可以编辑
    $scope.tempItem.read=true;*/
    //获取全部客户分类和全部客户信息

    //区域树组件treeId
    $scope.treeId = "contactTree";


    /************************************ 客户分类数据逻辑 ********************************/
    //获取全部客户分类（树指令节点数据）
    $scope.gettreedata=function(){
        var Params = [{"cclassid":""}];
        var Recordset =[]
        zxhttp.post("webapi/customer/getcustomerclass",Params,Recordset,function(data){
            if (data.Result == "200") {
                //console.log(data)
                var result = data.DataJson||[];
                //初始化树组件
                var items = $filter('orderBy')(result,'cclevel');
                // $scope.cladata=items; //
                $scope.classitems.length = 0;
                for (var i = 0; i < result.length; i++) {
                    $scope.classitems.push(result[i]);
                }
                //将api列表数据转换为树节点数据,传入需要显示的列名
                var fileds = { name:"cclassname", level:"cclevel", key:"cclassid",classname:"全部客户分类"};
                $scope.treeData = zxZtree.transformTreeData($scope.treeId,items,fileds);
                //当客户分类加载完成后，再获取客户信息
                $scope.getData($scope.items,1,$scope.gridOptions.paginationPageSize);
            }
            else{
                toaster.pop("error", "获取客户分类", data.ErrMsg);
            };
        },function(data){
            console.log(data)
            $scope.authError = "服务器登录错误"
        })
    }();

    //打开“同级客户分类”模态窗口
    $scope.openSilibingContactModal = function(){
        //新增销售区域
       // $scope.classModelState.type="new";
       // $scope.classModelState.action = "silibing";
        var data = {title:"新增同级区域", type:"new", action:"silibing", item:{}};
        $scope.openClassModal(data);
    }

    //打开“下级区域”模态窗口
    $scope.openChildContactModal = function(){
       // $scope.classModelState.type="new";        //新增
      //  $scope.classModelState.action = "child";  //下级
        var data = {title:"新增下级区域", type:"new", action:"child",item:{}};
        $scope.openClassModal(data);
    }
    //打开“编辑区域”模态窗口
    $scope.openEditContactModal = function(){
        //检测是否选中单一节点
        if(!zxZtree.checkSingleNode($scope.treeId,"客户分类")) return;
        $scope.classModelState.type="edit";       //编辑
        var node = zxZtree.getCurSelectedNode($scope.treeId);
        //获取单条数据
        // var Params = [{"Condition":"cd_clevel ='"+node.zxlevel+"'"}];
        var Params=[{"cclassid":node.origialData.cclassid}]
        zxhttp.post("webapi/customer/getcustomerclass",Params,[],function(data){
           // console.log(data);
            if (data.Result == "200") {
                var item = data.DataJson[0];
                var modal = { title:"修改客户分类", type:"edit", item:item };
                $scope.openClassModal(modal);
            }else{
                toaster.pop("error", "修改客户分类", data.ErrMsg);
            }
        });
    };

    //删除客户分类
    $scope.deleteGroup = function(){
        //检测是否选中单一节点
        if(!zxZtree.checkSingleNode($scope.treeId,"客户分类")) return;
        //获取被选中的树节点
        var node = zxZtree.getCurSelectedNode($scope.treeId);
        // var Params = [{"Condition":"cclassid ='"+node.classId+"' and cs_iid=4"}];
        // var Params = [{Condition: "cd_clevel.StartsWith('"+node.cd_clevel+"')"}];
        console.log(node)
        var Params=[{"item":{"cclassid":node.classId,'cclevel':node.zxlevel}}]
        var Recordset =[];
        if($scope.items.length>0){ 
            console.log($scope.items)
            toaster.pop("error", "请先删除该分类下的所有信息");
        }else if($scope.items.length<=0) {
            zxhttp.post("webapi/customer/deletecustomerclas", Params, Recordset, function (data) {
              //  console.log(data)
                if (data.Result == "200") {
                    toaster.pop("success", "删除客户分类信息", "删除客户分类！");
                    //删除树节点
                    zxZtree.delTreeNode($scope.treeId, $scope.treeData, node.zxlevel);
                    contactsetClassServer.Del(node.classId)
                } else {
                    toaster.pop("error", "删除客户分类失败", data.ErrMsg);
                }
            })
        }
    };
    //选中单个客户分类
    $scope.selectGroup = function(item){

        // 每次选中新的分类节点就将当前页面设为1
        $scope.gridOptions.paginationCurrentPage=1;
        $scope.getData(item,1,$scope.gridOptions.paginationPageSize);
        $scope.item=item

        //执行桩检测,强制重新渲染模板
        setTimeout(function(){
            $scope.$digest();
        },1000);
    };


    /*******************************ui-grid配置********************************/
    
    var columns=[
        {'width':120,'field':'ccustid','displayName':'客户编码'},         //--编码
        {'width':120,'field':'ccustname','displayName':'客户名称'},       //--名称
        {'width':120,'field':'ccpwd','displayName':'客户密码'},     //--客户密码
        {'width':120,'field':'cclassid','displayName':'分类编码'},    // --客户分类
        {'width':120,'field':'cclassname','displayName':'分类名称'},  // --客户分类
        {'width':120,'field':'clinknman','displayName':'客户联系人'}, //--客户联系人
        {'width':120,'field':'caddress','displayName':'客户地址'},       //--地址
        {'width':120,'field':'cphone','displayName':'客户电话'},         //--电话
        {'width':120,'field':'cappid','displayName':'公众号appid'},  //--公众号appid
        {'width':120,'field':'cappname','displayName':'公众号名称'}, //--公众号名称
        {'width':120,'field':'capptxt','displayName':'公众认证文件名称'},     //--公众认证文件名称
        {'width':120,'field':'cbeginman','displayName':'建立人'},    //--建立人
        {'width':120,'field':'cbegindt','displayName':'建立日期'},   //--建立日期
        {'width':120,'field':'ceditman','displayName':'修改人'},     //--修改人
        {'width':120,'field':'ceditdt','displayName':'修改日期'},    //--修改日期
        // {'width':120,'field':'cuse_date','displayName':'启用日期'},  //--启用日期
        {'width':120,'field':'cend_date','displayName':'终止日期'},  //--终止日期
        {'width':120,'field':'cflag','displayName':'是否审核'},      //--是否审核
        {'width':120,'field':'cflagman','displayName':'审核人'},     //--审核人
        {'width':120,'field':'cflagdate','displayName':'审核日期'},  //--审核日期
        {'width':120,'field':'cstop','displayName':'是否停用'},      //--是否停用    0否  1是
        {'width':120,'field':'cdesc','displayName':'备注'},          // --备注
        {'width':120,'field':'csecret','displayName':'开发者密码'}, 
        {'width':120,'field':'webapiurl','displayName':' API地址'},
        {'width':120,'field':'webapiport','displayName':'端口号'},      
    ]
    $scope.gridOptions={
        // data:'items',
        columnDefs:columns,
        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        //-------- 分页属性 ----------------
        paginationPageSizes: [20,40,60], //每页显示个数可选项
        paginationCurrentPage:1, //当前页码
        paginationPageSize: 20, //每页显示个数
        totalItems : 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮
        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        //enableFullRowSelection : true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        multiSelect: false ,// 是否可以选择多个,默认为true;

        //---------------api---------------------
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            //查找
            //$scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 )
            //分页按钮事件
            gridApi.pagination.on.paginationChanged($scope,function(nowPage, pageSize) {
                $scope.getData($scope.item,nowPage,pageSize);
            });
            //行选中事件
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(rowItem,event){
                if(rowItem){
                    $scope.tempItem = rowItem.entity;

                }
            });
        }

    };
    //查找按钮事件
    $scope.searchByName=function(){
       // $scope.gridApi.grid.refresh();
        $scope.gridOptions.paginationCurrentPage=1
        $scope.getData($scope.item,1,$scope.gridOptions.paginationPageSize);
    }
    //回车事件
    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.searchByName();
        }
    }
   /* $scope.singleFilter=function(renderableRows){
        var matcher = new RegExp($scope.query);
        renderableRows.forEach( function( row ) {
            var match = false;
            ['cm_cid','cm_cname'].forEach(function( field ){
                if ( row.entity[field].match(matcher) ){
                    match = true;
                }
            });
            if (!match ){
                row.visible = false;
            }
        });
        return renderableRows;
    }*/

    i18nService.setCurrentLang('zh-cn');

    /************************************ 客户信息数据逻辑 ********************************/
    //获取客户信息
    $scope.getData = function(item,nowpage,pagesize){
        if(typeof item=="undefined" || typeof item.zxlevel=="undefined"){
            var item={zxlevel:''}
        }
        // var Params = [{"PageIndex":nowpage,"PageSize":pagesize,Condition: "cd_clevel.StartsWith('"+item.zxlevel+"') and cs_iid=4 and (cm_cid.Contains('"+$scope.query+"') or cm_cname.Contains('"+$scope.query+"')) ",}];
        console.log(item)
        var Params=[{"IndexOfpPge":nowpage,"ItemsOfPage":pagesize,"ccustid":$scope.query,"ccustname":$scope.query,"cclevel":item.zxlevel,"sql":""}]
        zxhttp.post("webapi/customer/getcustomers",Params,[],function(data){
            console.log(data)
            if (data.Result == "200") {
                var result=data.DataJson||[];
                $scope.items.length = 0;
                for (var i = 0; i < result.length; i++) {
                    var item = result[i];
                    $scope.items.push(item);
                }
                //设置分页参数
                $scope.gridOptions.totalItems = data.DataCount;
                $scope.gridOptions.data=$scope.items
            }else{
                toaster.pop("error", "获取客户信息", data.ErrMsg);
            }
        })
    };

    /************************************ 客户信息的增删改选存 ********************************/

    //新增一个客户信息
    $scope.createItem = function() {
        //检测是否选中单一节点

        //获取被选中的树节点
        var curNode = zxZtree.getCurSelectedNode($scope.treeId)||{};
        var classid=''
        if(curNode !=null){
            classid=curNode.classId
        }
       // $scope.tempItem = item;
        var data = {title:"新增客户",type:"new",item:{"cclassid" : classid ,"cclassname":curNode.name,}};
        $scope.openClassModal2(data);//打开模态窗
    };

    //删除单个客户记录
    $scope.deleteItem = function(item){
        // var Params = [{"Condition":"ccustid='"+item.ccustid+"'"}];
        var Params=[{"item":{"ccustid": item.ccustid}}]
        zxhttp.post("webapi/customer/deletecustomer",Params,[],function(data){
           // console.log(data)
            if (data.Result == "200") {
                toaster.pop("success", "删除单个客户记录成功");
                contactSever.delContact(item.ccustid)
                $scope.tempItem={};
               // $scope.items.splice($scope.items.indexOf(item),1)
            }else{
                toaster.pop("error", "删除单个客户记录失败", data.ErrMsg);
            }
        })

    };

    /************************************ 会员信息的模态窗口 ****************************/

    $scope.openClassModal2=function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/initial/contact/contactinfo.html',
            controller: 'ContactinfoCtrl',
            size : "lg", //大小配置
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                },
                tempItem:function () {
                    return{
                        data:$scope.tempItem
                    }
                },
                items:function () {
                    return{
                        data:$scope.item
                    }
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            console.log(result)
            console.log($scope.item)
            if(data.type=="new"){
                // $scope.items.push(result)
                contactSever.addOneContact(result)
            }else  if(data.type=="edit"){
                contactSever.editContact(result.ccustid,result)
                myTools.cover($scope.item,result)
            }
        }, function () {
            //分类模态页面的取消按钮
        });
    }

    /************************************ 树节点数据逻辑和监听事件 ************************/

    //监听树节点的点击事件
    $scope.zTreeOnClick = function(event,treeId,treeNode,clickFlag){
        //选中客户分类
        $scope.selectGroup(treeNode)
    }

    /*************************** “客户分类管理”的模态窗口 **********************************/

        //客户分类管理的状态对象
    $scope.classModelState = {};
    //打开分类模态窗口
    $scope.openClassModal = function (data) {

        $scope.modalInstance = $modal.open({
            templateUrl: 'app/initial/contact/customerGroupMG.html',
            controller: 'customerGroupMGCtrl',
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            //分类模态页面的确定按钮
           // $scope.classModalOk(data);
            if(data.type=="new"){
                zxZtree.addTreeNode($scope.treeId,data.action,result,$scope.treeData);
                contactsetClassServer.Add(result);
            }
            if(data.type=="edit"){
                zxZtree.updateTreeNode($scope.treeId,result);
                contactsetClassServer.Edit(result.cclassid,result)
            }
        }, function () {
            //分类模态页面的取消按钮
            $scope.classModalCancel();
        });
    };


    //分类模态页面的取消按钮
    $scope.classModalCancel = function(){
    }


    /************************************ 工具条配置 ************************************/

    /**/
    //工具条配置对象
    //必须参数：按钮类型type、按钮权限level、回调函数func
    //可选参数：名称name、可用性enable、显示状态dispaly、图标icon
    var levelID="0401";
    var config = {

        data : [/*{
            "name": "新增同级",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "action":"silibing",
            "level":levelID+"01",
            "func": function(){
                $scope.openSilibingContactModal();
            }
        },{
            "name": "新增下级",
            "type": "new",
            "level":levelID+"01",
            "action":"child",
            "func": function(){
                $scope.openChildContactModal()
            }

        },{
            "name": "修改分类",
            "type": "edit",
            "level":levelID+"02",
            "func": function(){
                //检测是否选中单一节点
                $scope.openEditContactModal()
            }
        },{
            "name": "删除分类",
            "type": "delete",
            "level":levelID+"03",
            "func": function(){
                // console.log("删除分类");
                //检测是否选中单一节点
                if(!zxZtree.checkSingleNode($scope.treeId,"客户分类")) return;
                zxconfirm.confirm('是否删除客户分类?',function(){
                    //删除客户分类
                    $scope.deleteGroup();
                });
            }
        },{
            "type":"line"
        },*/{
            "name": "新增客户",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "level":levelID+"04",
            "func": function(){
                //获取所有节点数据
                $scope.createItem();
            }
        },{
            "name": "编辑客户",
            "type": "edit",
            "level":levelID+"05",
            "func": function(){
                var data = {title:"编辑客户",type:"edit",item:$scope.tempItem};
                if(typeof $scope.tempItem.ccustid!='undefined'){
                    $scope.openClassModal2(data);
                }else {
                    toaster.pop("error", "编辑客户", "请选中其中一个客户");
                }
            }
        },
            {
                "name": "删除客户",
                "type": "delete",
                "level":levelID+"06",
                "func": function(){
                    if(typeof $scope.tempItem.ccustid=="undefined")
                    {
                        toaster.pop("erro", "请选择一个客户");
                        return
                    }
                    zxconfirm.confirm('是否删除客户?',function(){
                        //删除网点记录
                        $scope.deleteItem($scope.tempItem);
                    });
                }

            }]
    };
    $scope.toolsbar = zxToolsBar.newToolsbar(config);


    /************************************ 树结构配置 ************************************/

        //树指令配置对象
    $scope.treeConfig = {
        view : { showLine : false },
        //edit : { enable : true },
        callback : {
            onClick : $scope.zTreeOnClick
        }
    };
    //树指令句柄初始化对象
    $scope.treeHandle = {};
    $scope.treeHandle.inittedTree = function(zTreeObj){
        //console.log(zTreeObj);
        $scope.zTreeObj = zTreeObj;
    }




}]);

//用户
app.controller('ContactinfoCtrl',['$scope', '$modalInstance','$localStorage','$filter','baseDataService','fdate','modalParams','tempItem','items','zxhttp','toaster', 'contactsetClassServer','$timeout','Upload',function($scope, $modalInstance,$localStorage,$filter,baseDataService,fdate,modalParams,tempItem,items,zxhttp,toaster,contactsetClassServer,$timeout,Upload){

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);

    $scope.data=$scope.modalParams.data||{}
    //$scope.tempItem = $scope.data.item;
/*    $scope.tempItem= {
        "cm_cid" :  $scope.data.item.cm_cid,
        "cd_cclassid" :  $scope.data.item.cd_cclassid ,
        "cd_cname":$scope.data.item.cd_cname ,
        "cm_cname":  $scope.data.item.cm_cname,
        "cs_iid": $scope.data.item.cs_iid,
        "cm_ccyid": $scope.data.item.cm_ccyid,
        "sc_ccyname": $scope.data.item.sc_ccyname,
        //"avatar":  $scope.data.item.avatar,
        "cm_cpaycondtion": $scope.data.item.cm_cpaycondtion,
        "pm_cname": $scope.data.item.pm_cname,
        "cm_cconman": $scope.data.item.cm_cconman,
        "cm_ctel": $scope.data.item.cm_ctel,
        "cm_cdeadr": $scope.data.item.cm_cdeadr,
    };*/
    $scope.tempItem=$scope.data.item;
    window.t=$scope.tempItem
    $scope.todayString = $filter('date')(new Date(), 'yyyy-MM-dd');
    //设置建立人和建立时间
    $scope.tempItem.cbeginman=$localStorage.user.userid
    $scope.tempItem.cbegindt= $scope.todayString
    //设置修改人和修改时间
    $scope.tempItem.ceditman=$localStorage.user.userid
    $scope.tempItem.ceditdt=$scope.todayString
    // 获取上传文件的文件属性
    $scope.getFile=function(){
        var fileObj=document.querySelector('#uploadFile').files
        console.log(fileObj)
        $scope.tempItem.capptxt=(fileObj[0])?fileObj[0].name :""
    }
    $scope.cladata=contactsetClassServer.GetAll();

    $scope.classselect = {"cclassid": $scope.data.item.cclassid,
        "cclassname": $scope.data.item.cclassname}
    // 选择事件
    $scope.onSelectCallback = function($item){
        $scope.tempItem.cclassid =  $item.cclassid;
        $scope.tempItem.cclassname =  $item.cclassname;
    };

    //获取付款条件
    /*$scope.payments=function(){
        var Params = [{"Condition":"pm_cstop='0'"}];
        var Recordset =[]
        zxhttp.post("PaymentService/SearchPaymentByKey",Params,Recordset,function(data){
            // console.log(data)
            if (data.Result == "200") {
                $scope.payments= data.DataJson[0].Mtable||[];
            }else{
                toaster.pop("error", "获取付款条件", data.ErrMsg);
            }
        })
    }();*/
    //获取货币名称
    /*$scope.getsyscoin=function(){
        var Params = [{"Condition":"sc_cstop='0'"}];
        var Recordset =[]
        zxhttp.post("/CoinService/Search",Params,Recordset,function(data){
            //  console.log(data)
            if (data.Result == "200") {
                $scope.syscoin= data.DataJson[0].Mtable||[];
            }else{
                toaster.pop("error", "获取货币名称", data.ErrMsg);
            }
        })
    }();*/

    //保存--新增的客户信息
    $scope.doneCreateItem = function(item){
        var Params=[{"item":item}]
        zxhttp.post("webapi/customer/addcustomer",Params,[],function(data){
            //  console.log(data)
            if (data.Result == "200") {
                $modalInstance.close(item);
                toaster.pop("success", "新增客户信息成功");
            }else{
                toaster.pop("error", "新增客户信息失败", data.ErrMsg);
            }
        })

    };

    //保存--编辑的客户信息
    $scope.doneEditing = function(item){

        var Params = [];
        //var Recordset =[{"customer_cm":item}];
        var Params =[{"item":item}]
        zxhttp.post("webapi/customer/updatecustomer",Params,[],function(data){
            // console.log(data)
            if (data.Result == "200") {
                $modalInstance.close(item);
                toaster.pop("success", "编辑客户信息成功");
            }else{
                toaster.pop("error", "编辑客户信息失败", data.ErrMsg);
            }
        })
    };

    // 上传文件
    $scope.uploadPic = function (file) {
        file.upload = Upload.upload({
            // url:'http://192.168.1.209:8989/upload',
            url:'http://192.168.1.205:8989/upload',
            data: { 'cappid': $scope.tempItem.cappid },
            file: file
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            console.log(file)
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }


    //确认按钮
    $scope.ok = function () {
        if($scope.txtFile){ //上传文件
            $scope.uploadPic($scope.txtFile)
            console.log($scope.txtFile)
        }        
        if($scope.tempItem.cclassid=="" || !$scope.tempItem.cclassid ){
            console.log('客户分类'+$scope.tempItem.cclassid)
            toaster.pop("error", "客户", "客户分类不能为空！");
            return;
        }

        if($scope.data.type=="new"){
            $scope.doneCreateItem($scope.tempItem)
        }else if($scope.data.type=="edit"){
            $scope.doneEditing($scope.tempItem)

        }
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);



//客户分类管理
app.controller('customerGroupMGCtrl',['$scope', '$modalInstance','modalParams', 'zxhttp','toaster','zxZtree',function($scope, $modalInstance,modalParams,zxhttp,toaster,zxZtree){
    $scope.treeId = "contactTree";

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);

    $scope.data = $scope.modalParams.data||{};
    $scope.item=$scope.data.item;

    /************************************ 客户分类的增删改 ********************************/
        //新增一个客户分类--处理包括同级或下级
    $scope.createGroup = function(type,datas){
        
        // var Params = [{"item":{"cclevel":"","cclassid":"02","cclassname":"ch","cdesc":""}}];
        // var Recordset =[{"classdtl_cd":datas}];
        var Params=[{"item":datas}]
        zxhttp.post("webapi/customer/addcustomerclas",Params,[],function(data){
            //console.log(data)
            if (data.Result == "200") {
                toaster.pop("success", "新增客户分类信息", "新增客户分类成功！");
                datas.cclevel=data.DataJson[0].cclevel;
                $modalInstance.close(datas);
                //zxZtree.addTreeNode($scope.treeId,type,datas,$scope.treeData);
            }else{
                toaster.pop("error", "新增客户分类", data.ErrMsg);
            }
        })
    }
    //修改单个客户分类
    $scope.editGroup = function(type,datas){
        // var Params=[{"item":{"cclassid":"01","cclassname":"顺德","cdesc":"12"}}]
        var Params=[{"item":datas}]
        zxhttp.post("webapi/customer/updatecustomerclas",Params,[],function(data){
           // console.log(data)
            if (data.Result == "200") {
                toaster.pop("success", "修改客户分类信息", "修改客户分类成功！");
                //更新树节点
                // zxZtree.updateTreeNode($scope.treeId,datas);
                $modalInstance.close(datas);
            }else{
                toaster.pop("error", "修改客户分类", data.ErrMsg);
            }
        })
    };

    //确认按钮
    $scope.ok = function () {
        //新增分类方式
        if($scope.data.type=="new"){
            //获取当前选中的分类节点及其父节点
            var selectedNode = zxZtree.getCurSelectedNode($scope.treeId)||{};
            var selectedNodeParent = selectedNode.getParentNode&&selectedNode.getParentNode()||{};
            //计算层次码
            var zxlevel = "";
            if($scope.data.action=="silibing"){
                zxlevel = selectedNodeParent.zxlevel||"";
            }else if($scope.data.action=="child"){
                zxlevel = selectedNode.zxlevel||"";
            }
            $scope.item.cclevel = zxlevel;
            //新增客户分类
            $scope.createGroup($scope.data.action, $scope.item);
            //编辑分类方式
        }else if($scope.data.type=="edit"){
            //修改客户分类
            $scope.editGroup($scope.data.action, $scope.item);
        }
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

app.factory("contactSever",[function(){

    var contacts = [];

    return {
        getAllContacts : function(){
            return contacts;
        },
        getOneContact : function(id){
            for(var i=0; i<contacts.length; i++){
                if(contacts[i].ccustid === id){
                    return contacts[i];
                }
            }
        },
        addOneContact: function(item){
            contacts.push(item);
        },
        editContact : function(id,item){
            for(var i=0; i<contacts.length; i++){
                if(contacts[i].ccustid === id){
                    for(var key in item){
                        contacts[i][key] = item[key];
                    }
                    //stations[i] = angular.copy(item);
                }
            }
        },
        delContact : function(id){
            for(var i=0; i<contacts.length; i++){
                if(contacts[i].ccustid === id){
                    contacts.splice(i,1);
                }
            }
        }
    };

}]);
app.factory("contactsetClassServer", [
    function() {

        var items = [];

        return {
            GetAll: function() {
                return items;
            },
            Add: function(item) {
                items.push(item);
            },
            Edit: function(id, item) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].cclassid === id) {
                        for (var key in item) {
                            items[i][key] = item[key];
                        }
                    }
                }
            },
            Del: function(id) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].cclassid === id) {
                        items.splice(i, 1);
                    }
                }
            }
        };

    }
]);
