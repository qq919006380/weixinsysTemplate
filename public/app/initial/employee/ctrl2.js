/**
 * Created by appistrator on 2016/11/1 0001.
 */


'use strict';

/*app.factory("employeeServer", function () {
    var employee_ee =
    {
        results: [{
            ee_cid: '1',
            ee_cname: '小米',
            dt_cid:'A',
            ee_cbrkerflag:'B',
            ee_csec:'男',
            ee_cmarry :'否',
            ee_cdegree :'大专',
            ee_dbirth :'1991-1-1',
            ee_cstatus :'在职状况',
            ee_cnativep :'籍贯',
            ee_ccertify :'身份证编码',
            ee_ddate1 :'2016-1-1',
            ee_ddate2 :'2016-1-1',
            ee_cnative1 :'家庭住址1',
            ee_cnative2 :'家庭住址1',
            ee_coficetel :'11111111',
            ee_coficete2 :'11111111',
            ee_cselftel1 :'11111111',
            ee_cselftel2 :'11111111',
            ee_cremark :'不错',
        },
            {
                ee_cid: '2',
                ee_cname: '小米',
                dt_cid:'A',
                ee_cbrkerflag:'B',
                ee_csec:'男',
                ee_cmarry :'否',
                ee_cdegree :'大专',
                ee_dbirth :'1991-1-1',
                ee_cstatus :'在职状况',
                ee_cnativep :'籍贯',
                ee_ccertify :'身份证编码',
                ee_ddate1 :'2016-1-1',
                ee_ddate2 :'2016-1-1',
                ee_cnative1 :'家庭住址1',
                ee_cnative2 :'家庭住址1',
                ee_coficetel :'11111111',
                ee_coficete2 :'11111111',
                ee_cselftel1 :'11111111',
                ee_cselftel2 :'11111111',
                ee_cremark :'不错',
            },
            {
                ee_cid: '3',
                ee_cname: '小米',
                dt_cid:'A',
                ee_cbrkerflag:'B',
                ee_csec:'男',
                ee_cmarry :'否',
                ee_cdegree :'大专',
                ee_dbirth :'1991-1-1',
                ee_cstatus :'在职状况',
                ee_cnativep :'籍贯',
                ee_ccertify :'身份证编码',
                ee_ddate1 :'2016-1-1',
                ee_ddate2 :'2016-1-1',
                ee_cnative1 :'家庭住址1',
                ee_cnative2 :'家庭住址1',
                ee_coficetel :'11111111',
                ee_coficete2 :'11111111',
                ee_cselftel1 :'11111111',
                ee_cselftel2 :'11111111',
                ee_cremark :'不错',
            },
            {
                ee_cid: '4',
                ee_cname: '小米',
                dt_cid:'A',
                ee_cbrkerflag:'B',
                ee_csec:'男',
                ee_cmarry :'否',
                ee_cdegree :'大专',
                ee_dbirth :'1991-1-1',
                ee_cstatus :'在职状况',
                ee_cnativep :'籍贯',
                ee_ccertify :'身份证编码',
                ee_ddate1 :'2016-1-1',
                ee_ddate2 :'2016-1-1',
                ee_cnative1 :'家庭住址1',
                ee_cnative2 :'家庭住址1',
                ee_coficetel :'11111111',
                ee_coficete2 :'11111111',
                ee_cselftel1 :'11111111',
                ee_cselftel2 :'11111111',
                ee_cremark :'不错',
            },
            {
                ee_cid: '5',
                ee_cname: '小米',
                dt_cid:'A',
                ee_cbrkerflag:'B',
                ee_csec:'男',
                ee_cmarry :'否',
                ee_cdegree :'大专',
                ee_dbirth :'1991-1-1',
                ee_cstatus :'在职状况',
                ee_cnativep :'籍贯',
                ee_ccertify :'身份证编码',
                ee_ddate1 :'2016-1-1',
                ee_ddate2 :'2016-1-1',
                ee_cnative1 :'家庭住址1',
                ee_cnative2 :'家庭住址1',
                ee_coficetel :'11111111',
                ee_coficete2 :'11111111',
                ee_cselftel1 :'11111111',
                ee_cselftel2 :'11111111',
                ee_cremark :'不错',
            },]
    };

    return {
        all: function() {
            return employee_ee;
        },
        get: function(employeeid) {

            for (var i = 0; i < employee_ee.results.length; i++) {
                if (employee_ee.results[i].ee_cid == employeeid) {
                    return employee_ee.results[i];
                }
            }
            return null;
        },

        ee_cid: '1',
        ee_cname: '小米',
        dt_cid:'A',
        ee_cbrkerflag:'B',
        ee_csec:'男',
        ee_cmarry :'否',
        ee_cdegree :'大专',
        ee_dbirth :'1991-1-1',
        ee_cstatus :'在职状况',
        ee_cnativep :'籍贯',
        ee_ccertify :'身份证编码',
        ee_ddate1 :'2016-1-1',
        ee_ddate2 :'2016-1-1',
        ee_cnative1 :'家庭住址1',
        ee_cnative2 :'家庭住址1',
        ee_coficetel :'11111111',
        ee_coficete2 :'11111111',
        ee_cselftel1 :'11111111',
        ee_cselftel2 :'11111111',
        ee_cremark :'不错',
        update:function (employe) {
            for (var i = 0; i < employee_ee.results.length; i++) {
                if (employee_ee.results[i].ee_cid == employe.ee_cid) {
                    employee_ee.results[i].ee_cname=employe.ee_cname;
                    employee_ee.results[i].dt_cid=employe.dt_cid;
                    employee_ee.results[i].ee_cbrkerflag=employe.ee_cbrkerflag;
                    employee_ee.results[i].ee_csec=employe.ee_csec;
                    employee_ee.results[i].ee_cmarry=employe.ee_cmarry;
                    employee_ee.results[i].ee_cdegree=employe.ee_cdegree;
                    employee_ee.results[i].ee_dbirth=employe.ee_dbirth;
                    employee_ee.results[i].ee_cstatus=employe.ee_cstatus;
                    employee_ee.results[i].ee_cnativep=employe.ee_cnativep;
                    employee_ee.results[i].ee_ccertify=employe.ee_ccertify;
                    employee_ee.results[i].ee_ddate1=employe.ee_ddate1;
                    employee_ee.results[i].ee_ddate2=employe.ee_ddate2;
                    employee_ee.results[i].ee_cnative1=employe.ee_cnative1;
                    employee_ee.results[i].ee_cnative2=employe.ee_cnative2;
                    employee_ee.results[i].ee_coficetel=employe.ee_coficetel;
                    employee_ee.results[i].ee_coficete2=employe.ee_coficete2;
                    employee_ee.results[i].ee_cselftel1=employe.ee_cselftel1;
                    employee_ee.results[i].ee_cselftel2=employe.ee_cselftel2;
                    employee_ee.results[i].ee_cremark=employe.ee_cremark;
                    return window.console.log("修改成功");;
                }
            }
            return window.console.log("查找不到数据");
        },
        createUsers:function (employe) {
            var add={
                ee_cname: employe.ee_cname,
                dt_cid: employe.dt_cid,
                ee_cbrkerflag: employe.ee_cbrkerflag,
                ee_csec: employe.ee_csec,
                ee_cmarry: employe.ee_cmarry,
                ee_cdegree: employe.ee_cdegree,
                ee_dbirth: employe.ee_dbirth,
                ee_cstatus: employe.ee_cstatus,
                ee_cnativep: employe.ee_cnativep,
                ee_ccertify: employe.ee_ccertify,
                ee_ddate1: employe.ee_ddate1,
                ee_ddate2: employe.ee_ddate2,
                ee_cnative1: employe.ee_cnative1,
                ee_cnative2: employe.ee_cnative2,
                ee_coficetel: employe.ee_coficetel,
                ee_coficete2: employe.ee_coficete2,
                ee_cselftel1: employe.ee_cselftel1,
                ee_cselftel2: employe.ee_cselftel2,
                ee_cremark: employe.ee_cremark,
            }
            employee_ee.results.push(add);
        }
    };

});*/

//时间格式转换,JsonDate转换date类型
app.controller('EmployeeController', ['$scope','$http','$filter','$timeout','$modal','toaster','myTools','zxToolsBar','zxconfirm','zxhttp','i18nService','fdate','zxZtree', function($scope, $http, $filter, $timeout, $modal, toaster, myTools, zxToolsBar,zxconfirm,zxhttp,i18nService,fdate,zxZtree) {
    /*function($scope, $resource,$stateParams,$modal,$state,zxToolsBar,zxhttp,$filter,toaster,zxconfirm,fdate,zxZtree,i18nService,myTools)*/


    $scope.employees = [];//员工数据列表
    $scope.treeId = "employeeTree";
    $scope.employee = {};       //临时单个数据

    //$scope.treeData = [];

    $scope.getDatas = function(deptid){
        //console.log(deptid)
        //树节点选择条件
        var Params;
        //if(typeof deptid=="undefined" ||typeof deptid.classId=="undefined" ){
        if(typeof deptid=="undefined" ||typeof deptid.zxlevel=="undefined"){
             Params = [{Condition: "dt_cid=dt_cid"}];
        }else {
            //console.log(deptid.classId,"deptid")
             Params = [{Condition: "dt_cid='"+deptid.classId+"'"}];
        }
        //获取页面数据
        zxhttp.post("EmployeeService/Search", Params, [], function (data) {
            console.log(data,"一级页面");
            //console.log(fdate);
            if (data.Result == "200") {
                //全部员工
                $scope.employees=data.DataJson[0].Mtable||[];
                /*for (var i= 0;i<$scope.employees.length;i++){
                    //日期格式
                    if ($scope.employees[i].ee_dbirth != null) {
                        $scope.employees[i].ee_dbirth = fdate.formatjsondate($scope.employees[i].ee_dbirth, 'yyyy-MM');
                    }
                    if ($scope.employees[i].ee_ddate1 != null) {
                        $scope.employees[i].ee_ddate1 = fdate.formatjsondate($scope.employees[i].ee_ddate1, 'yyyy-MM-dd');
                    }
                    if ($scope.employees[i].ee_ddate2 != null) {
                        $scope.employees[i].ee_ddate2 = fdate.formatjsondate($scope.employees[i].ee_ddate2, 'yyyy-MM-dd');
                    }
                    //经手人标识
                    if($scope.employees[i].ee_cbrkerflag!=" "){
                        $scope.employees[i].ee_cbrkerflag =($scope.employees[i].ee_cbrkerflag==1)?'是':'否' ;
                    }
                    //婚姻状况
                    if($scope.employees[i].ee_cmarry!=" "){
                        if($scope.employees[i].ee_cmarry==0){
                            $scope.employees[i].ee_cmarry="已婚";
                        }else if($scope.employees[i].ee_cmarry==1){
                            $scope.employees[i].ee_cmarry="未婚";
                        }else if($scope.employees[i].ee_cmarry==2){
                            $scope.employees[i].ee_cmarry="离异";
                        }
                    }
                    //在职状况
                    if($scope.employees[i].ee_cstatus!=" "){
                        $scope.employees[i].ee_cstatus =($scope.employees[i].ee_cstatus==1)?'离职':'在职' ;
                    }
                    //部门编码显示
                    switch ($scope.employees[i].dt_cid)
                    {
                        case "01":
                            $scope.employees[i].dt_cid="销售部";
                            break;
                        case "02":
                            $scope.employees[i].dt_cid="生产部";
                            break;
                        case "03":
                            $scope.employees[i].dt_cid="财务部";
                            break;
                        case "04":
                            $scope.employees[i].dt_cid="仓储部";
                            break;
                        case "05":
                            $scope.employees[i].dt_cid="人力资源部";
                            break;
                        case "06":
                            $scope.employees[i].dt_cid="办公室";
                            break;
                        case "07":
                            $scope.employees[i].dt_cid="采购部";
                            break;
                        case "08":
                            $scope.employees[i].dt_cid="有关部门";
                            break;
                        case "1":
                            $scope.employees[i].dt_cid="部门1";
                            break;
                    }
                    //学历
                    switch ($scope.employees[i].ee_cdegree)
                    {
                        case "0":
                            $scope.employees[i].ee_cdegree="高中";
                            break;
                        case "1":
                            $scope.employees[i].ee_cdegree="大专";
                            break;
                        case "2":
                            $scope.employees[i].ee_cdegree="本科";
                            break;
                        case "3":
                            $scope.employees[i].ee_cdegree="硕士";
                            break;
                        case "4":
                            $scope.employees[i].ee_cdegree="博士";
                            break;
                    }
                    //性别
                    if($scope.employees[i].ee_csec!=" "){
                        $scope.employees[i].ee_csec =($scope.employees[i].ee_csec==1)?'女':'男' ;
                    }
                }*/
                angular.forEach($scope.employees, function(item,i) {
                    //console.log($scope.employees)
                    //console.log(item)
                    //日期格式
                    $scope.employees[i].ee_dbirth = fdate.formatjsondate(item.ee_dbirth, 'yyyy-MM');
                    $scope.employees[i].ee_ddate1 = fdate.formatjsondate(item.ee_ddate1, 'yyyy-MM-dd');
                    $scope.employees[i].ee_ddate2 = fdate.formatjsondate(item.ee_ddate2, 'yyyy-MM-dd');
                })
                $scope.gridOptions.data=$scope.employees;
            } else {
                $scope.authError = "服务器登录错误"
            }
        });
    };
    $scope.getDatas($scope.employees);
    //删除事件
    /*$scope.del = function(item){
        var Params = [{"Condition": "ee_cid = '"+item.ee_cid+"'"}];
        var Recordset =[]
        zxhttp.post("EmployeeService/Delete",Params,Recordset,function(data){
            console.log(data)
            if (data.Result == "200") {
                toaster.pop("success", "删除成功");
            }
        })
    }*/



    /***************************************************************** 树节点 ********************************************************************/
    //监听树节点的点击事件(顺序)
    $scope.zTreeOnClick = function(event,treeId,treeNode,clickFlag){
        //console.log(treeNode);
        $scope.treeNode = treeNode;
        //选中客户分类
        $scope.selectGroup(treeNode)

    }

    //树指令配置对象
    $scope.treeConfig = {
        view : { showLine : false},
        callback : {
            onClick : $scope.zTreeOnClick
}
    };

    //获取全部数据-树节点
    $scope.getTreeData = function(){
        var Params = [];
        zxhttp.post("DeptService/Search",Params,[],function(data){
            //console.log(data,"树节点数据");
            if (data.Result == "200"){
                var result = data.DataJson[0].Mtable||[];
                var items = $filter('orderBy')(result,'dt_clevel');
                //将api列表数据转换为树节点数据,传入需要显示的列名
                var fileds = { name:"dt_cname", level:"dt_clevel", key:"dt_cid"};
                //树节点（将api列表数据转换为树节点数据,传入需要显示的列名）
                $scope.treeData = zxZtree.transformTreeData($scope.treeId,items,fileds);
                //console.log($scope.treeData,"treeData");
                //当区域数据加载完成后，再去拉取网点数据
                $scope.getDatas();
            }else{
                toaster.pop("error", "获取区域数据", data.ErrMsg);
            }
        });
    }();

    //选中单个分类
    $scope.selectGroup = function(deptid){
        // 每次选中新的分类节点就将当前页面设为1
        $scope.getDatas(deptid);
        //$scope.deptid=deptid
        //执行桩检测,强制重新渲染模板
        setTimeout(function(){
            $scope.$digest();
        },1000);
    };

    //创建一个新的员工
    /*$scope.createItem = function(){
        //获取选中节点
        console.log($scope.treeNode,"选中节点");
        var myDate=new Date();
        var time=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
        if(typeof $scope.treeNode != "undefined"){
            var item = {
                "ee_cid": "",
                "ee_cname": "",
                "ws_cename": "",
                "dt_cid": $scope.treeNode.classId,
                "ee_cbrkerflag": "",
                "ee_csec": "",
                "ee_cmarry": "",
                "ee_cdegree": "",
                "ee_dbirth": "",
                "ee_cstatus": "",
                "ee_cnativep": "",
                "ee_ccertify": "",
                "ee_ddate1": time,
                "ee_ddate2": "",
                "ee_cnative1": "",
                "ee_cnative2": "",
                "ee_coficetel": "",
                "ee_coficete2": "",
                "ee_cselftel1": "",
                "ee_cselftel2": "",
                "ee_cremark": ""
            };
        }else {
            var item = {
                "ee_cid": "",
                "ee_cname": "",
                "ws_cename": "",
                "dt_cid": "1",
                "ee_cbrkerflag": "",
                "ee_csec": "",
                "ee_cmarry": "",
                "ee_cdegree": "",
                "ee_dbirth": "",
                "ee_cstatus": "",
                "ee_cnativep": "",
                "ee_ccertify": "",
                "ee_ddate1": time,
                "ee_ddate2": "",
                "ee_cnative1": "",
                "ee_cnative2": "",
                "ee_coficetel": "",
                "ee_coficete2": "",
                "ee_cselftel1": "",
                "ee_cselftel2": "",
                "ee_cremark": ""
            };
        }
        $scope.employee = item;
        var data = { title:"新增员工信息", type:"new", item:item}
        $scope.openClassModal(data);
    };*/

    //ng-grid表格配置(columnDefs与$scope.gridOptions顺序)
    $scope.columns=[
        {"width":"120","field":"ee_cid","displayName":"员工编码"},
        {"width":"120","field":"ee_cname","displayName":"员工名称"},
        {"width":"120","field":"dt_cid","displayName":"部门编码"},
        {"width":"120","field":"dt_cname","displayName":"部门名称"},
        {"width":"120","field":"ee_cbrkerflag","displayName":"经手人标识","cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>是</div><div ng-if = 'row.entity[col.field]== 0'>否</div>"},
        {"width":"120","field":"ee_csec","displayName":"性别","cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>女</div><div ng-if = 'row.entity[col.field]== 0'>男</div>"},
        {"width":"120","field":"ee_cmarry","displayName":"婚姻状况","cellTemplate": "<div ng-if = 'row.entity[col.field] == 2'>离异</div><div ng-if = 'row.entity[col.field] == 1'>未婚</div><div ng-if = 'row.entity[col.field]== 0'>已婚</div>"},
        {"width":"120","field":"ee_cdegree","displayName":"学历",
            "cellTemplate": "<div ng-if = 'row.entity[col.field] == 0'>高中</div><div ng-if = 'row.entity[col.field] == 1'>大专</div><div ng-if = 'row.entity[col.field]== 2'>本科</div><div ng-if = 'row.entity[col.field]== 3'>硕士</div><div ng-if = 'row.entity[col.field]== 4'>博士</div>"},
        {"width":"120","field":"ee_dbirth","displayName":"出生年月"},
        {"width":"120","field":"ee_cstatus","displayName":"在职状况","cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>离职</div><div ng-if = 'row.entity[col.field]== 0'>在职</div>"},
        {"width":"120","field":"ee_cnativep","displayName":"籍贯"},
        {"width":"120","field":"ee_ccertify","displayName":"身份证编码"},
        {"width":"120","field":"ee_ddate1","displayName":"入职日期"},
        {"width":"120","field":"ee_ddate2","displayName":"离职日期"},
        {"width":"120","field":"ee_cnative1","displayName":"家庭住址1"},
        {"width":"120","field":"ee_cnative2","displayName":"家庭住址2"},
        {"width":"120","field":"ee_coficetel","displayName":"办公电话1"},
        {"width":"120","field":"ee_coficete2","displayName":"办公电话2"},
        {"width":"120","field":"ee_cselftel1","displayName":"个人电话1"},
        {"width":"120","field":"ee_cselftel2","displayName":"个人电话2"},
        {"width":"120","field":"ee_cremark","displayName":"备注"}

    ]
    $scope.gridOptions = {
        columnDefs: $scope.columns,
        //data: $scope.employees,
        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        showGridFooter: true,
        //-------- 分页属性 ----------------
        //paginationPageSizes: [10, 15, 20], //每页显示个数可选项
        //paginationCurrentPage:1, //当前页码
        //paginationPageSize: 10, //每页显示个数
        //totalItems : 0, // 总数量
        //useExternalPagination: false,//是否使用分页按钮
        //showPager:false,
        enablePagination: false, //是否分页，默认为true
        enablePaginationControls: false, //使用默认的底部分页
        //----------- 选中 ----------------------
        enableFooterTotalSelected: false, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        //enableFullRowSelection : true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        multiSelect: false ,// 是否可以选择多个,默认为true;
        //---------------api---------------------
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;

            //查找
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200)

            //行选中事件
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(rowItem,event){
                if(rowItem){
                    $scope.employee = rowItem.entity;
                    //console.log($scope.employee,"选中");
                    //选中单个角色
                    //$scope.selectRole(rowItem.entity.pr_croleid);
                }
            });
        }
    };
    i18nService.setCurrentLang('zh-cn');

    //搜索框操作
    $scope.search = function(){
        //console.log("搜索")
        $scope.gridApi.grid.refresh();
    }
    $scope.singleFilter=function(renderableRows){
        var matcher = new RegExp($scope.query);
        renderableRows.forEach( function( row ) {
            var match = false;
            ['ee_cid','ee_cname'].forEach(function( field ){
                if ( row.entity[field].match(matcher) ){
                    match = true;
                }
            });
            if ( !match ){
                row.visible = false;
            }
        });
        return renderableRows;
    }

    //回车搜索
    $scope.enterSearch = function(e) {
        //console.log(e)
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search();
        }
    }

    /*************************************************** 模态窗口 **********************************************/
    //仓库分类管理的状态对象
    $scope.classModelState = {};
    //打开新增、修改员工信息窗口
    $scope.openClassModal=function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/initial/employee/detail.html',
            controller: 'employeeDetailController',
            size : "lg", //大小配置
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                },
                tempItem:function () {
                    return{
                        data:$scope.employee
                    }
                },
                items:function () {
                    return{
                        data:$scope.employees
                    }
                }
            }
        });
        //console.log(data)
        $scope.modalInstance.result.then(function (result) {
            //console.log(data,"模态窗data")
            if(data.type=="new"){
                //$scope.items.push(data);
                $scope.gridOptions.data.push(result)
                /*!//新增仓库
                 $scope.items.push($scope.tempItem);
                 toaster.pop("success", "新增仓库信息成功");*/
            }else if(data.type=="edit"){
                myTools.cover($scope.employee,result);
            }
            //分类模态页面的确定按钮
        }, function () {
            //分类模态页面的取消按钮

        });
    }

    //部门信息窗口
    $scope.openDeptModal = function (data) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/initial/employee/dept.html',
            controller: 'deptmodelCtrl',
            resolve: {
                modalParams: function () {
                    return {
                        data : data
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function (result) {
            //console.log(result,"模态窗data")
            //console.log()
            if(data.type=="new"){
                zxZtree.addTreeNode($scope.treeId,data.action,result,$scope.treeData);
            }
            if(data.type=="edit"){
                zxZtree.updateTreeNode($scope.treeId,result);
            }

        }, function () {
            //分类模态页面的取消按钮
            $scope.classModalCancel();
        });
    };
    //分类模态页面的取消按钮
    $scope.classModalCancel = function(){
    };

    //工具条配置对象
    //必须参数：按钮类型type、回调函数func
    //可选参数：名称name、可用性enable、显示状态dispaly、图标icon
    var levelID = "0220";
    var config = {
        data : [{
            "name": "新增部门",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "level": levelID+"01",
            "func": function(){
                //console.log("新增部门");
                var data = {title:"新增部门",type:"new", item:{}};
                $scope.classModelState.type="new";          //新增
                $scope.openDeptModal(data);
            }
        },{
            "name": "修改部门",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "level": levelID+"02",
            "func": function(){
                //console.log("修改部门");
                //检测是否选中单一节点
                $scope.classModelState.type="edit";
                if(!zxZtree.checkSingleNode($scope.treeId,"修改部门分类")) return;
                var node = zxZtree.getCurSelectedNode($scope.treeId);
                //获取单条数据
                var Params = [{"Condition":"dt_cid='"+node.classId+"'" }];
                zxhttp.post("DeptService/Search",Params,[],function(data){
                        //console.log(data);
                        if (data.Result == "200") {
                            var item = data.DataJson[0].Mtable[0];
                            var data = { title:"修改部门", type:"edit", item:item };
                            $scope.openDeptModal(data);
                        }else{
                            toaster.pop("error", "修改部门", data.ErrMsg);
                        }
                    });
            }
        },{
            "name": "删除部门",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "level": levelID+"03",
            "func": function(){
                //console.log("删除部门");
                //console.log($scope.employees,"删除的部门下的员工");
                if(!zxZtree.checkSingleNode($scope.treeId,"删除部门")) return;
                var node = zxZtree.getCurSelectedNode($scope.treeId);
                    zxconfirm.confirm('是否删除该部门?',function(){
                    //获取被选中的树节点
                    var Params = [{"Condition":"dt_cid ='"+node.classId+"'"}];
                    var Recordset =[];
                    if($scope.employees.length>0){
                        toaster.pop("error", "请先删除该分类下的所有信息");
                    }else if($scope.employees.length<=0) {
                        zxhttp.post("DeptService/Delete", Params, Recordset, function (data) {
                            //console.log(data)
                            if (data.Result == "200") {
                                toaster.pop("success", "删除部门", "删除部门成功！");
                                //删除树节点
                                zxZtree.delTreeNode($scope.treeId, $scope.treeData, node.zxlevel);
                            } else {
                                toaster.pop("error", "删除部门失败", data.ErrMsg);
                            }
                        })
                    }
                });


            }
        }, {
            "type":"line"
        },{
            "name": "新增员工",
            "type": "new",
            "enable":true,
            "dispaly":true,
            "level": levelID+"04",
            "func": function(){
                //console.log("新增员工");
                //if(!zxZtree.checkSingleNode($scope.treeId)) return;
                //$scope.createItem();
                //获取选中节点
                //console.log($scope.treeNode,"选中节点");
                var myDate=new Date();
                var time=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
                var classId = '';
                if(typeof $scope.treeNode!="undefined"){
                    classId = $scope.treeNode.classId;
                }
                /*if(typeof $scope.treeNode != "undefined"){
                    var item = {
                        "ee_cid": "",
                        "ee_cname": "",
                        "ws_cename": "",
                        "dt_cid": $scope.treeNode.classId,
                        "ee_cbrkerflag": "",
                        "ee_csec": "",
                        "ee_cmarry": "",
                        "ee_cdegree": "",
                        "ee_dbirth": "",
                        "ee_cstatus": "",
                        "ee_cnativep": "",
                        "ee_ccertify": "",
                        "ee_ddate1": time,
                        "ee_ddate2": "",
                        "ee_cnative1": "",
                        "ee_cnative2": "",
                        "ee_coficetel": "",
                        "ee_coficete2": "",
                        "ee_cselftel1": "",
                        "ee_cselftel2": "",
                        "ee_cremark": ""
                    };
                }else {
                    var item = {
                        "ee_cid": "",
                        "ee_cname": "",
                        "ws_cename": "",
                        "dt_cid": "1",
                        "ee_cbrkerflag": "",
                        "ee_csec": "",
                        "ee_cmarry": "",
                        "ee_cdegree": "",
                        "ee_dbirth": "",
                        "ee_cstatus": "",
                        "ee_cnativep": "",
                        "ee_ccertify": "",
                        "ee_ddate1": time,
                        "ee_ddate2": "",
                        "ee_cnative1": "",
                        "ee_cnative2": "",
                        "ee_coficetel": "",
                        "ee_coficete2": "",
                        "ee_cselftel1": "",
                        "ee_cselftel2": "",
                        "ee_cremark": ""
                    };
                }*/
                //$scope.employee = item;
                var data = { title:"新增员工信息", type:"new", item:{dt_cid:classId,ee_ddate1: time}}
                $scope.openClassModal(data);
            }
        },{
            "name": "编辑员工",
            "type": "edit",
            "level": levelID+"05",
            "func": function(){
                //console.log("编辑员工");
                var data = {title:"修改员工资料",type:"edit",item:$scope.employee};
                $scope.classModelState.type="edit"
                //console.log($scope.employee.ee_cid)
                if($scope.employee.ee_cid==""||typeof $scope.employee.ee_cid=='undefined'){
                    toaster.pop("error", "修改员工", "请选中其中一个员工");
                }else {
                    $scope.openClassModal(data);
                }
            }
        },{
            "name": "删除员工",
            "type": "delete",
            "level": levelID+"06",
            "func": function(){
                //console.log("删除员工");
                var item = $scope.gridApi.selection.getSelectedRows();
                if(item[0]){
                    zxconfirm.confirm('是否删除该员工?',function(){
                        for(var i=0;i<$scope.employees.length;i++){
                            if($scope.employee.ee_cid==$scope.employees[i].ee_cid){
                                //$scope.del($scope.employee)
                                var Params = [{"Condition": "ee_cid = '"+$scope.employee.ee_cid+"'"}];
                                var Recordset =[]
                                zxhttp.post("EmployeeService/Delete",Params,Recordset,function(data){
                                    //console.log(data)
                                    if (data.Result == "200") {
                                        $scope.employees.splice(i,1);
                                        toaster.pop("success", "员工编号："+$scope.employee.ee_cid,"已删除成功");
                                    }else {
                                        toaster.pop("error", "员工编号："+$scope.employee.ee_cid,"删除失败");
                                    }
                                })
                                return;
                            }
                        }
                    });
                }else {
                    toaster.pop("error", "删除员工信息", "请选中一个员工信息");
                }
            }
        }]
    };
    $scope.toolsbar = zxToolsBar.newToolsbar(config);
    //console.log(JSON.stringify($scope.toolsbar));

}]);
app.controller('deptmodelCtrl',['$scope', '$modalInstance','modalParams','zxhttp','zxZtree','toaster', function($scope, $modalInstance,modalParams,zxhttp,zxZtree,toaster){

    //传输参数
    $scope.modalParams = modalParams;
    //console.log($scope.modalParams);
    //$scope.data = $scope.modalParams.data.item||{};
    $scope.treeId = "employeeTree";
    $scope.data = $scope.modalParams.data||{};
    $scope.item=$scope.data.item;

    //console.log($scope.data,"data.action");

    //是否可读
    if ($scope.data.type == "edit") {
        $scope.item.read = true;
    } else {
        $scope.item.read = false;
    }

    //新增一个仓库分类--处理包括同级或下级
    $scope.createGroup = function(type,datas){
        //console.log(datas)
        var Params = [];
        var Recordset = [{"dept_dt":datas}];
        zxhttp.post("DeptService/Create",Params,Recordset,function(data){
            //console.log(data);
            if (data.Result == "200") {
                toaster.pop("success", "新增部门", "新增成功！");
                //新增树节点
                datas.dt_clevel = data.DataJson[0].Mtable[0].dt_clevel;
               // zxZtree.addTreeNode($scope.treeId,type,datas,$scope.treeData);
                $modalInstance.close(datas);
            }else{
                toaster.pop("error", "新增部门", data.ErrMsg);
            }
        });

    }

    //修改单个仓库分类
    $scope.editGroup = function(type,datas){
        var Params = [];
        var Recordset =[{"dept_dt":datas}]
        zxhttp.post("DeptService/Update",Params,Recordset,function(data){
            //console.log(data)
            if (data.Result == "200") {
                //console.log("修改成功");
                toaster.pop("success", "修改部门信息", "修改部门信息成功！");
                //$scope.editTreeNode(type,datas);
                //zxZtree.updateTreeNode($scope.treeId,datas);
                $modalInstance.close(datas);

            }
        })
    };

    //确认按钮
    $scope.ok = function () {
        //console.log(JSON.stringify(data));
        //console.log($scope.classModelState.type);
        //新增分类方式
        if($scope.data.type=="new"){
            //获取当前选中的分类节点及其父节点
            //var selectedNode = zxZtree.getCurSelectedNode($scope.treeId)||{};
            //var selectedNodeParent = selectedNode.getParentNode&&selectedNode.getParentNode()||{};
            //计算层次码
            var zxlevel = "";
            /*if($scope.data.action=="silibing"){
                zxlevel = selectedNodeParent.zxlevel||"";
            }else if($scope.data.action=="child"){
                zxlevel = selectedNode.zxlevel||"";
            }*/
            $scope.item.dt_clevel = zxlevel;
            //console.log( $scope.item)
            //新增仓库分类
            $scope.createGroup($scope.data.action,$scope.item);
            //编辑分类方式
        }else if($scope.data.type=="edit"){
            //修改部门信息
            $scope.editGroup($scope.data.action,$scope.item);
        }
        //$modalInstance.close($scope.data);
    };
    //取消按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])

app.controller('employeeDetailController', ['$scope', '$modalInstance','modalParams','tempItem', 'zxhttp','toaster','$filter',function($scope, $modalInstance,modalParams,tempItem,zxhttp,toaster,$filter){


        $scope.modalParams = modalParams;
        $scope.data = $scope.modalParams.data || {}
        //$scope.employee = $scope.data.item;
        $scope.employee = {
            "ee_cid": $scope.data.item.ee_cid,
            "ee_cname": $scope.data.item.ee_cname,
            "ws_cename": $scope.data.item.ws_cename,
            "dt_cid": $scope.data.item.dt_cid,
            "ee_cbrkerflag": $scope.data.item.ee_cbrkerflag,
            "ee_csec": $scope.data.item.ee_csec,
            "ee_cmarry": $scope.data.item.ee_cmarry,
            "ee_cdegree": $scope.data.item.ee_cdegree,
            "ee_dbirth": $scope.data.item.ee_dbirth,
            "ee_cstatus": $scope.data.item.ee_cstatus,
            "ee_cnativep": $scope.data.item.ee_cnativep,
            "ee_ccertify": $scope.data.item.ee_ccertify,
            "ee_ddate1": $scope.data.item.ee_ddate1,
            "ee_ddate2": $scope.data.item.ee_ddate2,
            "ee_cnative1": $scope.data.item.ee_cnative1,
            "ee_cnative2": $scope.data.item.ee_cnative2,
            "ee_coficetel": $scope.data.item.ee_coficetel,
            "ee_coficete2": $scope.data.item.ee_coficete2,
            "ee_cselftel1": $scope.data.item.ee_cselftel1,
            "ee_cselftel2": $scope.data.item.ee_cselftel2,
            "ee_cremark": $scope.data.item.ee_cremark
        };
        //console.log($scope.employee,"传输参数");

        //部门编码数据获取
        var Params = [];
        zxhttp.post("DeptService/Search", Params, [], function (data) {
            //console.log(data, "部门数据");
            if (data.Result == "200") {
                $scope.dept = data.DataJson[0].Mtable;
                //console.log($scope.dept, "部门编码1");
            } else {
                $scope.authError = data.ErrMsg
            }
        });

        //保存--创建的仓库信息
        $scope.doneCreateItem = function(item){
            //console.log(item,"保存-创建")
            var Params = [];
            var Recordset = [{"employee_ee": item}]
            //console.log(Recordset)
            zxhttp.post("EmployeeService/Create", Params, Recordset, function (data) {
                //console.log("新增仓库")
                //console.log(data)
                if (data.Result == "200") {
                    for (var i= 0; i<$scope.dept.length;i++){
                        if (item.dt_cid==$scope.dept[i].dt_cid){
                            item.dt_cname =$scope.dept[i].dt_cname;
                        }
                    }
                    $modalInstance.close(item);
                    toaster.pop("success", "新增成功");

                } else {
                    toaster.pop("error", "新增失败", data.ErrMsg);
                }
            })

        };
        //保存--编辑的仓库信息
        $scope.doneEditing = function(item){
            //console.log($scope.dept, "部门编码1");
            var Params = [];
            var Recordset =[{"employee_ee":item}]
            console.log(Recordset,"保存-编辑")
            zxhttp.post("EmployeeService/Update",Params,Recordset,function(data){
                //console.log(data)
                if (data.Result == "200") {
                    //console.log("编辑成功");
                    for (var i= 0; i<$scope.dept.length;i++){
                        if (item.dt_cid==$scope.dept[i].dt_cid){
                            item.dt_cname =$scope.dept[i].dt_cname;
                        }
                    }
                    $modalInstance.close(item);
                    toaster.pop("success", "编辑成功");
                }else{
                    toaster.pop("error", "编辑失败",data.ErrMsg);
                }
            })
            //myTools.cover($scope.item,item);
        };

        //仓库表单确认按钮
        $scope.ok = function () {
            //console.log($scope.employee.ee_cname);
            $scope.employee.ee_dbirth=$filter("date")($scope.employee.ee_dbirth, 'yyyy-MM')
            $scope.employee.ee_ddate1=$filter("date")($scope.employee.ee_ddate1, 'yyyy-MM-dd')
            $scope.employee.ee_ddate2=$filter("date")($scope.employee.ee_ddate2, 'yyyy-MM-dd')
            if ($scope.employee.ee_cid == ""|| typeof $scope.employee.ee_cid=='undefined'){
                toaster.pop("error", "员工编码未输入");
            }else if($scope.employee.ee_cname == ""||typeof $scope.employee.ee_cname=='undefined'){
                toaster.pop("error", "员工名称未输入");
            }else if($scope.employee.ee_cstatus == ""){
                toaster.pop("error", "员工在职状况未选择");
            }else {
                if ($scope.employee.ee_cbrkerflag) {
                    $scope.employee.ee_cbrkerflag = '1';
                } else {
                    $scope.employee.ee_cbrkerflag = '0';
                };
                //console.log($scope.tempItem.py_cid)
                //console.log($scope.data.item,"关闭")
                if ($scope.data.type == "new") {
                    $scope.doneCreateItem($scope.employee)
                } else if ($scope.data.type == "edit") {
                    $scope.doneEditing($scope.employee)
                }
            }
        };

        //取消按钮
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

 }])