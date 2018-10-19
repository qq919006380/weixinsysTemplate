//员工

app.controller('EmployeeController', ['$scope','$modal','$filter','zxToolsBar','zxZtree','toaster','zxconfirm','baseDataService','i18nService','fdate',function($scope,$modal,$filter,zxToolsBar,zxZtree,toaster,zxconfirm,baseDataService,i18nService,fdate){

    /************************ 实例化服务 ************************/

    //获取部门和员工资料服务实例对象
    var DeptService = baseDataService.getService("DeptService");
    var EmployeeService = baseDataService.getService("EmployeeService");


    /************************* 变量初始化 *************************/
    
    $scope.title = "员工列表";                          //标题
    $scope.treeId = "DeptTree";                     //部门-树组件的标识符
    $scope.query = '';                                  //过滤字符串
    $scope.Condition = {"clevel":""};
    $scope.items = EmployeeService.GetAll();            //本地员工数据
    $scope.classitems = DeptService.GetAll();      //本地部门数据
    console.log($scope.classitems)
    /************************ 数据逻辑处理 **********************/

    //初始化树组件
    $scope.initTreeData = function(data){
        if(!data||!data.length) return;
        console.log('init ......')
        data = $filter('orderBy')(data,'cdclassid');
        var fileds = { name:"cdtname", level:"cdtlevel", key:"cdclassid" };
        $scope.treeData = zxZtree.transformTreeData($scope.treeId,data,fileds);
    }

    //获取全部部门数据
    $scope.getClass = function(){
        var Params = [{"cdclassid":""}];
        DeptService.Search(Params).success(function(data){
            //console.log(data);
            if (data.Result == "200") {
                //添加部门数据
                $scope.classitems.length = 0;
                DeptService.AddItems(data.DataJson);
                //初始化树组件
                $scope.initTreeData($scope.classitems);
                console.log($scope.classitems)
                //默认获取第一个部门节点对应的员工数据
                $scope.getData(1,$scope.gridOpts.paginationPageSize);
            }else {
                toaster.pop("error", "获取部门失败", data.ErrMsg);
            }
        });
    }();

    //新增一条部门数据
    $scope.addClass = function(action,item){
        var Params=[{"item":item}]
        DeptService.Create(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                var result = data.DataJson[0];
                //添加部门
                DeptService.AddItem(result);
                //增加树节点
                zxZtree.addTreeNode($scope.treeId,action,result,$scope.treeData);
                toaster.pop("success", "新增部门", "新增部门成功！");
            } else {
                toaster.pop("error", "新增部门", data.ErrMsg);
            }
        });
    }

    //编辑一条部门数据
    $scope.editClass = function(item){
        // var Recordset = [{ "dept_dt": item }];
        var Params=[{"item":item}]
        DeptService.Update(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //编辑部门
                DeptService.EditItem(item.cdtlevel, item);
                //更新树节点
                zxZtree.updateTreeNode($scope.treeId,item);
                toaster.pop("success", "修改部门", "修改部门！");
            } else {
                toaster.pop("error", "修改部门", data.ErrMsg);
            }
        });
    }

    //删除单个部门数据
    $scope.delClass = function(cdtlevel,classid) {
        // var Params = [{ "Condition": "cdtlevel ='" + cdtlevel + "'" }];
        console.log(cdtlevel,classid)
        var Params=[{"item":{"cdclassid":classid,"cdtlevel":cdtlevel}}]
        DeptService.Delete(Params).success(function(data){
            if($scope.items.length>0){ 
            console.log($scope.items)
            toaster.pop("error", "请先删除该分类下的所有信息");
        }else if($scope.items.length<=0) {
            //console.log(data);
            if (data.Result == "200") {
                //删除部门
                DeptService.DelItem(cdtlevel);
                //删除树节点
                zxZtree.delTreeNode($scope.treeId,$scope.treeData,cdtlevel);
                toaster.pop("success", "删除部门", "删除部门成功！");
            } else {
                toaster.pop("error", "删除部门", data.ErrMsg);
            }
        }
            
        });
    };

    //获取全部数据
    $scope.getData = function(nowpage,pagesize){
        // var Params = [{"PageIndex":nowpage,"PageSize":pagesize,"Condition": "cdtlevel.StartsWith('"+$scope.Condition.clevel+"')and (ee_cid.Contains('"+$scope.query+"') or ee_cname.Contains('"+$scope.query+"')) "}];
        // var Params=[{"IndexOfpPge ":"10","ItemsOfPage":"10","ceid":"","cename":"","celevel":""}]
        var Params=[{"IndexOfpPge":nowpage,"ItemsOfPage":pagesize,"celevel":$scope.Condition.clevel,"ceid":$scope.query,"cename":$scope.query}]
        EmployeeService.Search(Params).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                $scope.items.length = 0;
                var jsonData = data.DataJson;
                for(var i=0; i<jsonData.length; i++){
                    jsonData[i].cedbirth = fdate.formatjsondate(jsonData[i].cedbirth,'yyyy-MM-dd');
                    jsonData[i].ddate1 = fdate.formatjsondate(jsonData[i].ddate1,'yyyy-MM-dd');
                    jsonData[i].ddate2 = fdate.formatjsondate(jsonData[i].ddate2,'yyyy-MM-dd');
                }
                //添加员工
                EmployeeService.AddItems(jsonData);
                //设置分页参数
                $scope.gridOpts.data=$scope.items;
                $scope.gridOpts.totalItems=data.DataCount;
            }else {
                toaster.pop("error", "获取员工失败", data.ErrMsg);
            }
        });
    }

    //新增一条数据
    $scope.addData = function(item){
        // var Recordset = [{ "employee_ee": item }];
        /*var Params=[{"item":{"ceid": "00022",
                            "cename": "lin",
                            "cdclassid":"02",
                            "cesec":"0",
                            "cemarry":"0",
                            "cedegree":"",
                            "cedbirth":"1900-01-01",
                            "cestatus": "",
                            "cenativep": "",
                            "cecertify": "",
                            "ddate1": "1900-01-01",
                            "ddate2": "1900-01-01",
                            "cnative1": "",
                            "cnative2": "",
                            "coficetel1": "",
                            "coficetel2": "",
                            "cselftel1": "",
                            "cselftel2": "",
                            "cephone": "",
                            "cremark": ""}}]*/
        var Params=[{"item":item}]
        EmployeeService.Create(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //添加员工
                EmployeeService.AddItem(item);
                toaster.pop("success", "新增员工记录", "新增员工成功！");
            } else {
                toaster.pop("error", "新增员工记录", data.ErrMsg);
            }
        });
    }

    //编辑一条数据
    $scope.editData = function(item){
        console.log(item)
        // var Recordset = [{ "employee_ee": item }];
        /*var Params=[{"item":{"ceid": "00001",
                    "cename":"hym22",
                    "cdclassid":"01","cesec": "0",
                    "cemarry":"0",
                    "cedegree":"",
                    "cedbirth":"1900-01-01", 
                    "cestatus":"",
                    "cenativep": "",
                    "cecertify": "",
                    "ddate1": "1900-01-01",
                    "ddate2": "1900-01-01", 
                    "cnative1": "",
                    "cnative2": "",
                    "coficetel1": "",
                    "coficetel2": "",
                    "cselftel1": "",
                    "cselftel2": "",
                    "cephone": "",
                    "cremark": ""}}]*/
        var Params=[{"item":item}]                    
        EmployeeService.Update(Params, []).success(function(data){
            console.log(data);
            if (data.Result == "200") {
                //编辑员工
                EmployeeService.EditItem(item.ceid, item);
                toaster.pop("success", "修改员工记录", "修改员工成功！");
            } else {
                toaster.pop("error", "修改员工记录", data.ErrMsg);
            }
        });
    }

    //删除单个记录
    $scope.delData = function(item) {
        console.log(item)
        // var Params = [{ "Condition": "ee_cid ='" + item.ee_cid + "'" }];
        var Params=[{"item":{"ceid": item.ceid}}]
        EmployeeService.Delete(Params).success(function(data){
            //console.log(data);
            if (data.Result == "200") {
                //删除员工
                EmployeeService.DelItem(item.ceid);
                toaster.pop("success", "删除员工记录", "删除成功！");
            } else {
                toaster.pop("error", "删除员工记录", data.ErrMsg);
            }
        });
    };


    /************************* 事件监听处理 *************************/

    //点击“搜索按钮”事件
    $scope.search = function(){
        console.log($scope.query)
        $scope.gridOpts.paginationCurrentPage=1;
        $scope.getData(1,$scope.gridOpts.paginationPageSize);
    }
    //监听“回车键”搜索
    $scope.enterSearch = function(e) {
        //console.log(e)
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13) $scope.search();
    }


    /************************* 配置部门模态窗口 **********************/
    
    //打开部门模态窗口
    $scope.openClassModal = function(data) {
      $scope.modalInstance = $modal.open({
        templateUrl: 'app/initial/employee/dept.html',
        controller: 'DeptFormCtrl',
        //backdrop: 'static',
        // size: "lg", //大小配置
        resolve: {
          modalParams: function() {
            return {
              data: data
            };
          }
        }
      });
      $scope.modalInstance.result.then(function(result) {
        //新增或修改成功
        if (data.type == 'new') {
          //新增一条部门数据
          $scope.addClass(data.action,result);
        };
        if (data.type == 'edit') {
          //编辑一条部门数据
          $scope.editClass(result);
        };

      }, function() {
        //模态页面的取消按钮
      });
    };

    //打开“新增”窗口
    $scope.openAddClassModal = function(newtype) {
      //获取选中节点
      var node = zxZtree.getCurSelectedNode($scope.treeId)||{};
      console.log(node)
      var clevel = '';
      var action = 'child';
      if (node) {
        clevel = node.zxlevel||'';
      };
      // 当增加下级而且父级不为空时.
      if (newtype == 'same' && clevel.length >= 3 ) {
        clevel = clevel.substring(0 , clevel.length - 3);
        action = 'silibing';
      };
      var data = { title: "新增",type: "new",action: action, item: {
        "ceid": '',
        "cdtlevel": clevel, 
        "cdtname": '',
        "cremark": '',
        }
      };
      $scope.openClassModal(data);
    }

    //打开“编辑”窗口
    $scope.openEditClassModal = function() {
      //获取选中节点
      var node = zxZtree.getCurSelectedNode($scope.treeId);
      console.log(node)
      if (!node) {
        toaster.pop("error", "提示", "选择一条部门记录");
        return;
      };
      var data = { title: "修改",type: "edit", item: {
          "cdclassid": node.origialData.cdclassid, //dt_cid
          "cdtlevel": node.origialData.cdtlevel, //dt_clevel
          "cdtname": node.origialData.cdtname,  //dt_cname
          "cremark": node.origialData.cremark,//dt_cremark
          }
      };
      $scope.openClassModal(data); 
    }


    /************************ 配置员工模态窗口 ************************/

    //打开员工模态窗口
    $scope.openModal = function(data) {
        //初始化模态窗口
        $scope.modalInstance = $modal.open({
            templateUrl: 'app/initial/employee/detail.html',
            controller: 'EmployeeDetailController',
            backdrop: 'static',
            size: "lg", //大小配置
            resolve: {
                modalParams: function() {
                    return {
                        data: data
                    };
                }
            }
        });
        $scope.modalInstance.result.then(function(result) {
            console.log(result)
            //新增或修改成功
            if (data.type == 'new') {
                //新增一条数据
                $scope.addData(result);
            };
            if (data.type == 'edit') {
                //编辑一条数据
                $scope.editData(result);
            };
        }, function() {
            //模态页面的取消按钮
        });
    };

    //打开“新增”窗口
    $scope.openAddModal = function() {
        //获取选中节点
        var node = zxZtree.getCurSelectedNode($scope.treeId)||{};
        var classid = ''
        if (node) {
            classid = node.classId || '';
        };
        var data = {
            title: "新增",
            type: "new",
            item: { "cdclassid": classid ,"cdtname":node.name}
        }
        $scope.openModal(data);
    }

    //打开“编辑”窗口
    $scope.openEditModal = function(item) {
        //获取选中的员工记录
        var item = $scope.gridApi.selection.getSelectedRows();
        if (!item[0]) {
            toaster.pop("error", "提示", "选择一条员工记录");
            return;
        };
        var data = {
            title: "修改",
            type: "edit",
            item: item[0]
        };
        $scope.openModal(data);
    }


    /************************* 配置按钮组 *************************/

    //工具条配置对象
    //必须参数：按钮类型type、按钮权限level、回调函数func
    //可选参数：名称name、可用性enable、显示状态dispaly、图标icon
    var levelID="0207"
    var config = {
      data : [/*{ 
          "name": "新增同级部门","type": "new",  "level":levelID+"01",
          "func": function(){ 
            // console.log("新增同级部门"); 
            //打开“同级”模态窗口
            $scope.openAddClassModal('same');
          }
      },{ 
          "name": "新增下级部门","type": "new",  "level":levelID+"01",
          "func": function(){ 
            // console.log("新增下级部门"); 
            //打开“下级”模态窗口
            $scope.openAddClassModal('next');
          }
      },{ 
          "name": "编辑部门","type": "edit",  "level":levelID+"02",
          "func": function(){ 
            // console.log("编辑部门"); 
            //打开“编辑”模态窗口
            $scope.openEditClassModal();
          }
      },{ 
          "name": "删除部门","type": "delete",  "level":levelID+"03",
          "func": function(){ 
            // console.log("删除部门"); 
            var node = zxZtree.getCurSelectedNode($scope.treeId);
            if (!node) {
                toaster.pop("error", "提示", "选择一条部门记录");
                return;
            };
            zxconfirm.confirm('是否删除该部门记录?',function(){
                //删除
                var classId=node.origialData.cdclassid
                $scope.delClass(node.zxlevel,classId);
            });
          }
      },{ 
        "type":"line"
      },*/{ 
          "name": "新增员工","type": "new",  "level":levelID+"04",
          "func": function(){ 
            // console.log("新增"); 
            //打开“新增”模态窗口
            $scope.openAddModal();
          }
      },{ 
          "name": "编辑员工",  "type": "edit","level":levelID+"05",
          "func": function(){ 
            // console.log("编辑"); 
            //打开“编辑”模态窗口
            $scope.openEditModal();
          }  
      },{ 
          "name": "删除员工",  "type": "delete","level":levelID+"06",
          "func": function(){ 
            // console.log("删除员工"); 
            var item = $scope.gridApi.selection.getSelectedRows();
            if (!item[0]) {
                toaster.pop("error", "提示", "选择一条员工记录");
                return;
            };
            zxconfirm.confirm('是否删除该员工记录?', function() {
                //删除
                $scope.delData(item[0]);
            });
          }  
      }]
    };
    $scope.toolsbar = zxToolsBar.newToolsbar(config);


    /************************* 配置树组件 *************************/

    //监听树节点的点击事件
    $scope.zTreeOnClick = function(event,treeId,treeNode,clickFlag){
        console.log(treeNode);
        //获取“选中节点”的层级码
        $scope.Condition.clevel = treeNode.zxlevel;
        //重新筛选数据
        $scope.getData(1,$scope.gridOpts.paginationPageSize);
    };
    
    //树指令配置对象
    $scope.treeConfig = {
        view : { showLine : false },
        callback : {
            onClick : $scope.zTreeOnClick
        }
    };


    /************************* 配置ui-grid组件 *************************/

    //主表配置
   /* $scope.columnDefs = [
      {"field": "ee_cid","displayName": "员工编码"}, 
      {"field": "ee_cname","displayName": "员工名称"}, 
      {"field": "dt_cid","displayName": "部门编码"}, 
      {"field": "dt_cname","displayName": "部门名称"}, 
      {"field": "ee_cstatus","displayName": "在职状态",
        "cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>在职</div><div ng-if = 'row.entity[col.field]== 0'>离职</div>"}
    ];*/
     $scope.columnDefs = [
      {"field": "ceid","displayName": "员工编码"}, 
      {"field": "cename","displayName": "员工名称"}, 
      {"field": "cdclassid","displayName": "部门编码"}, 
      {"field": "cdtname","displayName": "部门名称"}, 
      {"field": "cestatus","displayName": "在职状态",
        "cellTemplate": "<div ng-if = 'row.entity[col.field] == 1'>在职</div><div ng-if = 'row.entity[col.field]== 0'>离职</div>"}
    ];

    //ui-grid的属性
    $scope.gridOpts = {
        columnDefs: $scope.columnDefs,
        data: $scope.items,
        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        showGridFooter: true,
        //-------- 分页属性 ----------------
        paginationPageSizes: [10, 15, 20], //每页显示个数可选项
        paginationCurrentPage:1, //当前页码
        paginationPageSize: 20, //每页显示个数
        // //paginationTemplate:"<div></div>", //自定义底部分页代码
        totalItems : 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮
        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        multiSelect: false, // 是否可以选择多个,默认为true;
        noUnselect: true, //取消选择
        //---------------api---------------------
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged($scope,function(nowPage, pageSize) {
                $scope.getData(nowPage,pageSize);
            });
        }
    };
    i18nService.setCurrentLang('zh-cn');

}]);


//部门模态窗口
app.controller('DeptFormCtrl', ['$scope', '$modalInstance', 'modalParams', 'toaster',
  function($scope, $modalInstance, modalParams, toaster) {
    
    /************************* 初始化 *************************/

    //传输参数
    $scope.modalParams = modalParams;
    $scope.data = $scope.modalParams.data;
    $scope.tempItem = {
      "cdclassid": $scope.data.item.cdclassid,//dt_cid
      "cdtlevel": $scope.data.item.cdtlevel, //dt_clevel
      "cdtname": $scope.data.item.cdtname,//dt_cname
      "cremark": $scope.data.item.cremark//dt_cremark
    };


    /************************* 事件监听处理 *************************/

    //确认按钮
    $scope.ok = function() {
      $modalInstance.close($scope.tempItem);
    };

    //取消按钮
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }
]);


//员工数据模态窗口
app.controller('EmployeeDetailController',['$scope', '$modalInstance','modalParams', 'baseDataService', function($scope, $modalInstance,modalParams,baseDataService){

    //获取员工资料服务实例对象
    var EmployeeService = baseDataService.getService("EmployeeService");
    var DeptService = baseDataService.getService("DeptService");


    /************************* 初始化 *************************/

    //传输参数
    $scope.modalParams = modalParams;
    $scope.data = $scope.modalParams.data;
    /*$scope.employee = {
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
    };*/
    $scope.employee = {
        "ceid": $scope.data.item.ceid,
        "cename": $scope.data.item.cename,
        "cdtname": $scope.data.item.cdtname,
        "cdclassid": $scope.data.item.cdclassid,
        "ee_cbrkerflag": $scope.data.item.ee_cbrkerflag,
        "cesec": $scope.data.item.cesec,
        "cemarry": $scope.data.item.cemarry,
        "cedegree": $scope.data.item.cedegree,
        "cedbirth": $scope.data.item.cedbirth,
        "cestatus": $scope.data.item.cestatus,
        "cenativep": $scope.data.item.cenativep,
        "cecertify": $scope.data.item.cecertify,
        "ddate1": $scope.data.item.ddate1,
        "ddate2": $scope.data.item.ddate2,
        "cnative1": $scope.data.item.cnative1,
        "cnative2": $scope.data.item.cnative2,
        "coficetel1": $scope.data.item.coficetel1,
        "coficetel1": $scope.data.item.coficetel1,
        "cselftel1": $scope.data.item.cselftel1,
        "cselftel1": $scope.data.item.cselftel1,
        "cremark": $scope.data.item.cremark
    };
    window.t=$scope.employee
    //新增时，“停用”默认为否
    if ($scope.data.type == 'new') {
        //$scope.employee.ee_cstatus = '0';
        $scope.employee.ee_cbrkerflag = '0';
    };

    //获取部门
    $scope.classitems = DeptService.GetAll();
    console.log($scope.classitems);
    $scope.classselect = { "ceid": $scope.data.item.ceid, "cdtname": $scope.data.item.cdtname };

    /************************* 事件监听处理 *************************/

    // 选择事件
    $scope.onSelectCallback = function($item){
      $scope.employee.ceid =  $item.ceid;
      $scope.employee.cdtname =  $item.cdtname;
    };

    //点击确认按钮
    $scope.ok = function(){
        //console.log("保存")
        //$scope.employee.ee_cstatus = $scope.employee.ee_cstatus?'1':'0';
        $scope.employee.ee_cbrkerflag = $scope.employee.ee_cbrkerflag?'1':'0';
        //关闭窗口并返回对象
        $modalInstance.close($scope.employee);
    };

    //点击取消按钮
    $scope.cancel = function () {
        //console.log("取消")
        $modalInstance.dismiss('cancel');
    };

}]);