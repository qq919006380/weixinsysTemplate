'use strict';
//services服务

angular.module('zx-services-initial', [])


/************************** 基础数据服务 ****************************/

//弹出窗口服务
.factory('InitialModal', ["$modal",
    function($modal) {

        
        return {

            getcall: function(name, call) {

            },
            getdata: function(config, callback, error) {
               // console.log(config)
                // config 参数说明 type
                // type:类型,在defaultConfig中存在就直接拿对应的URL和CTLR,可为空
                // templateUrl:页面,可为空,当type不合法的时候，就以这个为准。
                // controller:控制器,可为空,当type不合法的时候，就以这个为准。
                // data：传到弹出窗口的数据,可为空。

                if (typeof config.type == 'undefined') {
                    return;
                };

                //默认配置对象
                var defaultConfig = {
                    "vendor": { 
                        title : "供应商",
                        posturl:"VendorService/SearchVendorByKey",
                        stopflag : "vd_cstop",
                        columnDefs : [
                            {"field":"vd_cid","width":200,"displayName":"厂家编码"},
                            {"field":"vd_cname","width":200,"displayName":"厂家名称"},
                            {"field": "vd_cconman","width":200, "displayName": "联系人"},
                            {"field": "vd_ctel","width":200, "displayName": "电话"},
                            {"width": 200,"field":"cd_cclassid","displayName":"分类编码"},
                            {"width": 200,"field":"cd_cname","displayName":"分类名称"},
                        ],
                        querycoulmns : [{key:"vd_cid",operate:"like"},
                                        {key:"vd_cname",operate:"like"}]
                    },
                    "vendorclass": {
                        title : "供应商",
                        posturl:"VendorService/SearchVendorClassdtlAll",
                        stopflag : "",
                        columnDefs : [
                            {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                            {"field":"cd_cname","width":200,"displayName":"分类名称"},

                        ],
                        querycoulmns : [{key:"vd_cid",operate:"like"},
                            {key:"vd_cname",operate:"like"}]
                    },
                    "employee": { //经手人
                        title : "经手人",
                        posturl:"EmployeeService/Search",
                        columnDefs : [
                            {"field":"ee_cid","width":200,"displayName":"经手人编码"},
                            {"field":"ee_cname","width":200,"displayName":"经手人名称"},
                        ],
                        querycoulmns : [{key:"ee_cid",operate:"like"},
                                        {key:"ee_cname",operate:"like"}]
                    },
                    "customer": { //客户
                        title : "客户",
                        posturl:"CustomerService/SearchCustomerByKey",
                        stopflag : "",
                        columnDefs : [
                            {"field":"cm_cid","width":200,"displayName":"客户编码"},
                            {"field":"cm_cname","width":200,"displayName":"客户名称"},
                            {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                            {"field":"cm_cconman","width":200,"displayName":"客户联系人"},
                            {"field":"cm_ctel","width":200,"displayName":"客户电话"},
                            {"field":"cm_cdeadr","width":200,"displayName":"客户送货地址"},
                        ],
                        querycoulmns : [{key:"cm_cid",operate:"like"},
                                        {key:"cm_cname",operate:"like"}]
                    },
                    "customerClass": { //客户分类
                        title : "客户分类",
                        posturl:"CustomerService/SearchCustomerByKey",
                        stopflag : "",
                        columnDefs : [
                            {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                            {"field":"cd_cname","width":200,"displayName":"分类名称"},
                            {"field":"cd_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"cm_cid",operate:"like"},
                                        {key:"cm_cname",operate:"like"}]
                    },
                    "salenetwork": { //销售网点
                        title : "销售网点",
                        posturl:"StationService/Search",
                        stopflag : "sn_cstop",
                        columnDefs : [
                            {"field":"sn_csnid","width":200,"displayName":"销售网点编码"},
                            {"field":"sn_csnname","width":200,"displayName":"销售网点名称"},

                        ],
                        querycoulmns : [{key:"sn_csnid",operate:"like"},
                            {key:"sn_csnname",operate:"like"}]
                    },
                    "salesregion": { //销售区域
                        title : "销售区域",
                        posturl:"SalesregionService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"sr_cregionid","width":200,"displayName":"销售网点编码"},
                            {"field":"sr_cregionname","width":200,"displayName":"销售网点名称"},
                        ],
                        querycoulmns : [{key:"sr_cregionid",operate:"like"},
                            {key:"sr_cregionname",operate:"like"}]
                    },
                    "product": {
                        title : "商品",
                        posturl:"ProductService/SearchProductByKey",
                        stopflag : "pt_cstop",
                        columnDefs : [
                            {"field":"pt_cmteid","width":200,"displayName":"商品编码"},
                            {"field":"pt_cname","width":200,"displayName":"商品名称"},
                            {"field":"pt_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"pt_cmteid",operate:"like"},
                            {key:"pt_cname",operate:"like"}]
                    },
                    "productClass": {
                        title : "商品分类",
                        posturl:"ProductService/SearchProductClassdtlAll",
                        stopflag : "cd_cstop",
                        columnDefs : [
                            {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                            {"field":"cd_cname","width":200,"displayName":"分类名称"},
                            {"field":"cd_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"cd_cclassid",operate:"like"},
                            {key:"cd_cname",operate:"like"}]
                    },
                    "ColorSellPrice": { //商品颜色和单价
                        title : "颜色",
                        posturl:"ProductService/SearchProdpricesetSs",
                        stopflag : "",
                        columnDefs : [
                            {"field":"pps_cmteid","width":200,"displayName":"商品编码"},
                            {"field":"pps_cname","width":200,"displayName":"商品名称"},
                            {"field":"pps_csysid","width":200,"displayName":"商品系统ID"},
                            {"field":"pps_cfeatureid1","width":200,"displayName":"颜色编码"},
                            {"field":"ct_cname","width":200,"displayName":"颜色名称"},
                            {"field":"pps_mprice","width":200,"displayName":"单价"}
                        ],
                        querycoulmns : [{key:"pps_cmteid",operate:"like"},
                            {key:"ct_cname",operate:"like"}]
                    },
                    "SearchColor": { //商品颜色和单价
                        title : "颜色",
                        posturl:"ColorsetService/SearchColoretByKey",
                        stopflag : "ct_cstop",
                        columnDefs : [
                            {"field":"ct_ccolorid","width":200,"displayName":"颜色编码"},
                            {"field":"ct_cname","width":200,"displayName":"颜色名称"},
                            {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                            {"field":"cd_cname","width":200,"displayName":"分类名称"},
                            {"field":"ct_cstop","width":200,"displayName":"停用标识","cellFilter":"cstopfilter"},
                        ],
                        querycoulmns : [{key:"ct_ccolorid",operate:"like"},
                            {key:"ct_cname",operate:"like"}]
                    },
                    "unit": { //单位
                        title : "单位",
                        posturl:"UnitService/Search",
                        stopflag : "ut_cstop",
                        columnDefs : [
                            {"field":"ut_cunitid","width":200,"displayName":"单位编码"},
                            {"field":"ut_cname","width":200,"displayName":"单位名称"},
                        ],
                        querycoulmns : [{key:"ut_cunitid",operate:"like"},
                            {key:"ut_cname",operate:"like"}]
                    },
                    "counter": { //站点
                        title : "站点",
                        posturl:"CounterService/SearchCounter",
                        stopflag : "",
                        columnDefs : [
                            {"field":"ce_ccounterid","width":200,"displayName":"站点编码"},
                            {"field":"ce_cipaddr","width":200,"displayName":"站点名称"},
                            {"field":"ws_cwhid","width":200,"displayName":"专卖店编码"},
                            {"field":"ws_cname","width":200,"displayName":"专卖店"},
                        ],
                        querycoulmns : [{key:"ce_ccounterid",operate:"like"},
                            {key:"ce_cipaddr",operate:"like"}]
                    },
                    "payment": { //付款条件
                        title : "付款条件",
                        posturl:"PaymentService/SearchPaymentByKey",
                        stopflag : "pm_cstop",
                        columnDefs : [
                            {"field":"pm_cpyid","width":200,"displayName":"付款条件编码"},
                            {"field":"pm_cname","width":200,"displayName":"付款条件名称"},
                        ],
                        querycoulmns : [{key:"pm_cpyid",operate:"like"},
                            {key:"pm_cname",operate:"like"}]
                    },
                    "settlemode": { //结算方式
                        title : "结算方式",
                        posturl:"SettleModeService/Search",
                        stopflag : "sm_cstop",
                        columnDefs : [
                            {"field":"sm_cno","width":200,"displayName":"结算方式编码"},
                            {"field":"sm_cname","width":200,"displayName":"结算方式名称"},
                            {"field":"sm_cename","width":200,"displayName":"英文名称"},
                        ],
                        querycoulmns : [{key:"sm_cno",operate:"like"},
                            {key:"sm_cname",operate:"like"}]
                    },
                    "salesman": { //业务员
                        title : "业务员",
                        posturl:"SalesmanService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"ns_csnid","width":200,"displayName":"业务员编码"},
                            {"field":"ee_cid","width":200,"displayName":"员工编码"},
                            {"field":"ns_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"ns_csnid",operate:"like"},
                            {key:"ee_cid",operate:"like"}]
                    },
                    "warehous": { //专卖店
                        title : "专卖店",
                        posturl:"WarehousService/SearchWarehousByKey",
                        stopflag : "ws_cstop",
                        columnDefs : [
                            {"field":"ws_cwhid","width":200,"displayName":"专卖店编码"},
                            {"field":"ws_cname","width":200,"displayName":"专卖店名称"},
                        ],
                        querycoulmns : [{key:"ws_cwhid",operate:"like"},
                            {key:"ws_cname",operate:"like"}]
                    },
                    "warehous2": { //专卖店
                        title : "仓库",
                        posturl:"WarehousService/SearchWarehousByKey",
                        stopflag : "ws_cstop",
                        columnDefs : [
                            {"field":"ws_cwhid","width":200,"displayName":"仓库编码"},
                            {"field":"ws_cname","width":200,"displayName":"仓库名称"},
                        ],
                        querycoulmns : [{key:"ws_cwhid",operate:"like"},
                            {key:"ws_cname",operate:"like"}]
                    },
                    "attritem": { //属性
                        title : "属性",
                        posturl:"AttritemService/SearchAttritem",
                        stopflag : "",
                        columnDefs : [
                            {"field":"am_cattrid","width":200,"displayName":"属性编码"},
                            {"field":"am_cname","width":200,"displayName":"属性名称"},
                        ],
                        querycoulmns : [{key:"am_cattrid",operate:"like"},
                            {key:"am_cname",operate:"like"}]
                    },
                    "SearchCause": { //变更原因
                        title : "变更原因",
                        posturl:"CausService/SearchCause",
                        stopflag : "",
                        columnDefs : [
                            {"field":"cas_ccauseid","width":200,"displayName":"原因编码"},
                            {"field":"cas_cname","width":200,"displayName":"原因名称"},
                            {"field":"cas_causecount","width":200,"displayName":"最大变更次数"},
                        ],
                        querycoulmns : [{key:"cas_ccauseid",operate:"like"},
                            {key:"cas_cname",operate:"like"}]
                    },
                    "PomanService": { //采购员
                        title : "采购员",
                        posturl:"PomanService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"pn_cpnid","width":200,"displayName":"采购员编码"},
                            {"field":"ee_cid","width":200,"displayName":"员工编码"},
                            {"field":"ee_cname","width":200,"displayName":"员工名称"},
                            {"field":"pn_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"pn_cpnid",operate:"like"},
                            {key:"ee_cid",operate:"like"}]
                    },
                    "TransportationService": { //货运单位
                        title : "货运单位",
                        posturl:"TransportationService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"tt_cid","width":200,"displayName":"货运单位编码"},
                            {"field":"tt_cname","width":200,"displayName":"货运单位名称"},
                            {"field":"tt_caddr","width":200,"displayName":"地址"},
                            {"field":"tt_clinkman","width":200,"displayName":"联系人"},
                            {"field":"tt_cphone","width":200,"displayName":"联系电话"},
                            {"field":"tt_cstop","width":200,"displayName":"停用标识"},
                            {"field":"tt_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"tt_cid",operate:"like"},
                            {key:"tt_cname",operate:"like"}]
                    },
                    "VendacctService": { //帐务归属
                        title : "帐务归属",
                        posturl:"VendacctService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"vd_cid","width":200,"displayName":"供应商编码"},
                            {"field":"vda_cacctid","width":200,"displayName":"归属供应商编码"},
                            {"field":"vda_cname","width":200,"displayName":"归属供应商名称"},
                            {"field":"vda_cdefflag","width":200,"displayName":"默认标志"},
                        ],
                        querycoulmns : [{key:"vd_cid",operate:"like"},
                            {key:"vda_cacctid",operate:"like"}]
                    },
                    "PurchtypeService": { //采购类型
                        title : "采购类型",
                        posturl:"PurchtypeService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"ph_cid","width":200,"displayName":"采购类型编码"},
                            {"field":"ph_cname","width":200,"displayName":"采购类型名称"},
                            {"field":"ph_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"ph_cid",operate:"like"},
                            {key:"ph_cname",operate:"like"}]
                    },
                    "ReasonService": { //退货原因
                        title : "退货原因",
                        posturl:"ReasonService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"rn_cid","width":200,"displayName":"原因编码"},
                            {"field":"rn_cname","width":200,"displayName":"原因名称"},
                            {"field":"rn_cremark","width":200,"displayName":"备注"},
                        ],
                        querycoulmns : [{key:"rn_cid",operate:"like"},
                            {key:"rn_cid",operate:"like"}]
                    },
                    "SearchClassdtl": { //产品分类
                    title : "产品分类",
                        posturl:"ClassdtlService/SearchClassdtl",
                        stopflag : "",
                        cauditflag:"cs_iid",
                        columnDefs : [
                        {"field":"cs_iid","width":200,"displayName":"分类基础ID"},
                        {"field":"cd_cclassid","width":200,"displayName":"分类编码"},
                        {"field":"cd_cname","width":200,"displayName":"分类名称"},
                        {"field":"cd_clevel","width":200,"displayName":"颜色编码"},
                        {"field":"ct_cname","width":200,"displayName":"颜色名称"},
                        {"field":"pps_mcostprice","width":200,"displayName":"成本单价"}
                    ],
                        querycoulmns : [{key:"cd_cclassid",operate:"like"},
                        {key:"cd_cname",operate:"like"}]
                },
                    "stockset": { //库存异动类型
                        title : "库存异动类型",
                        posturl:"StocksetService/SearchStockset",
                        stopflag : "",
                        columnDefs : [
                            {"field":"se_ctypeid","width":200,"displayName":"类型编码"},
                            {"field":"se_cname","width":200,"displayName":"类型名称"}
                        ],
                        querycoulmns : [{key:"se_ctypeid",operate:"like"},
                            {key:"se_cname",operate:"like"}]
                    },
                    "ColorStchancPrice": { //商品颜色和成本单价
                        title : "颜色",
                        posturl:"ProductService/SearchProdpricesetVo",
                        stopflag : "",
                        columnDefs : [
                            {"field":"pps_cmteid","width":200,"displayName":"商品编码"},
                            {"field":"pps_cname","width":200,"displayName":"商品名称"},
                            {"field":"pps_csysid","width":200,"displayName":"商品系统ID"},
                            {"field":"pps_cfeatureid1","width":200,"displayName":"颜色编码"},
                            {"field":"ct_cname","width":200,"displayName":"颜色名称"},
                            {"field":"pps_mcostprice","width":200,"displayName":"成本单价"}
                        ],  
                        querycoulmns : [{key:"pps_cmteid",operate:"like"},
                            {key:"ct_cname",operate:"like"}]
                    },
                    "CurrencyNumber":{
                        title:"货币编号",
                        posturl:"CoinService/Search",
                        stopflag : "",
                        columnDefs : [
                            {"field":"sc_ccyid","width":200,"displayName":"货币编码"},
                            {"field":"sc_ccyname","width":200,"displayName":"货币名称"},
                            {"field":"sc_ccyename","width":200,"displayName":"英文名称"},
                            {"field":"sc_mdeftRate","width":200,"displayName":"汇率"},
                        ],
                        querycoulmns : [{key:"sc_ccyid",operate:"like"},
                            {key:"sc_ccyname",operate:"like"}]
                    }
                };

                //type不能为空,配置对象不能为空
                if (typeof config.type == 'undefined') {
                    return;
                };

                //配置信息 
                var templateUrl = ""
                var controller = ""

                if (defaultConfig[config.type]) {
                    templateUrl = "app/services/Initial/initialtemp.html";
                    controller = "InitialCtrl";
                    config.params = defaultConfig[config.type];

                    // 单选多选,默认单选
                    if (typeof config.multiSelect == 'boolean') {
                        config.params.multiSelect = config.multiSelect;
                    }else{
                        config.params.multiSelect = false;
                    };

                }else{
                    templateUrl = config.templateUrl
                    controller = config.controller
                };

                if (controller == "" || templateUrl == "") {
                    return;
                }

                var modalInstance = $modal.open({
                    templateUrl: config.templateUrl || templateUrl,
                    backdrop: 'static', //控制背景，允许的值：true（默认），false（无背景），“static” - 背景是存在的，但点击模态窗口之外时，模态窗口不关闭
                    controller: config.controller || controller,
                    size: 'lg',
                    resolve: {
                        config: function() {
                            return config || '';
                        }
                    }
                });

                modalInstance.result.then(function(data) {
                        callback(data)
                    },
                    function(reason) {
                        if (error) {
                            error(reason);
                        };
                    });

            }
        }

    }
])


//共用controller
.controller('InitialCtrl', ['$scope', '$modalInstance', 'config', 'zxhttp','i18nService','toaster',
    function($scope, $modalInstance, config, zxhttp,i18nService,toaster) {
        // 标题

       // console.log(config.params)

        $scope.title = config.params.title;
        // 显示字段
        var columns= config.params.columnDefs;
        var querycoulmns = config.params.querycoulmns;
        // API地址
        var posturl = config.params.posturl;
        // 是否多选
        var multiSelect =  config.params.multiSelect;
        // 每页显示个数
        
        var paginationPageSize = 10;

        // console.log(config.params.stopflag)
        // console.log(config.params.unstopvalue)

        // $scope.title = '颜色';
        // // 显示字段
        // var columns=[
        //     {"field":"ct_ccolorid",width:200,"displayName":"颜色编码"},
        //     {"field":"ct_cname",width:200,"displayName":"颜色名称"},
        //     {"field":"ct_cename",width:200,"displayName":"英文名称"},
        //     {"field":"ct_cremark",width:200,"displayName":"备注"}
        // ];
        // var querycoulmns = [{key:"ct_ccolorid",operate:"like"},
        //                     {key:"ct_cname",operate:"like"}];
        // // API地址
        // var posturl = "ColorsetService/SearchColoretByKey"
        // // 是否多选
        // var multiSelect =  true;
        // // 每页显示个数
        // var paginationPageSize = 10;

        /********* 数据逻辑 ********/
        $scope.gridOptions={
            //data:'items',
            columnDefs:columns,
            enableSorting: true, //是否排序
            useExternalSorting: false, //是否使用自定义排序规则
            enableGridMenu: true, //是否显示grid 菜单
            //-------- 分页属性 ----------------
            paginationPageSizes: [10, 20, 50], //每页显示个数可选项
            paginationCurrentPage:1, //当前页码
            paginationPageSize: paginationPageSize, //每页显示个数
            totalItems : 0, // 总数量
            useExternalPagination: true,//是否使用分页按钮
            //----------- 选中 ----------------------
            enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
            enableFullRowSelection : false, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
            multiSelect: multiSelect ,// 是否可以选择多个,默认为true;
            noUnselect: !multiSelect && true,//默认false,选中后是否可以取消选中

            //---------------api---------------------
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
                //分页按钮事件
                gridApi.pagination.on.paginationChanged($scope,function(nowPage, pageSize) {
                 //   console.log(nowPage + '   ' + pageSize)
                    // $scope.getallColor(nowPage,pageSize);
                    $scope.getdata(nowPage,pageSize)

                    // 记录数
                    paginationPageSize = pageSize;

                });
            }
        };
        i18nService.setCurrentLang('zh-cn');


        $scope.query = '';
        var getcondition = function(coulmns,values){
            var result = "";
            for (var i = 0;i < coulmns.length; i++ ) {
                if(coulmns[i].key && coulmns[i].operate){
                    if (coulmns[i].operate == "like") {
                        result = result + "or " + coulmns[i].key+ ".Contains('" + values + "') "
                    }else{
                        result = result + "or " + coulmns[i].key+ "='" + values + "' "
                    }
                }
            };
            if (result.length > 2) {
                result = result.substring(2, result.length);
            }else{
                result = "";
            };
            if (result) {
                result = "(" + result + ")"
            };
            return result;
        }
        //获取数据
     //   console.log(config)
        $scope.getdata=function(nowpage,PageSize){
            if (!nowpage) { nowpage = 1 };
            if (!PageSize) { PageSize = paginationPageSize };
            
            // 条件
            var Condition = getcondition(querycoulmns,$scope.query)
            if (config.Condition) {
                Condition =  Condition + " and ( " + config.Condition + ")"
            };

            //停用标识   
            if (config.params.stopflag) {
                var unstopvalue = config.params.unstopvalue||'0'
                // Condition =  Condition + " and ( "  + config.params.stopflag + " = '0')"
                Condition =  Condition + " and ( "  + config.params.stopflag + " = '"+unstopvalue+"')"
            };

            var Params = [{"ApiAuthority":0,"PageIndex":nowpage,"PageSize":PageSize,
                           "Condition":Condition}]
            var Recordset=[];
            zxhttp.post(posturl,Params,Recordset,function(data){
                //console.log(data)
                if(data.Result=="200"){
                    $scope.gridOptions.data=data.DataJson[0].Mtable||[];
                    $scope.gridOptions.totalItems = data.DataCount;
                }
                else {
                    toaster.pop("error","获取数据失败",data.ErrMsg)
                }

            })
        };
        $scope.getdata();

        /********* 返回事件 ********/
        $scope.ok = function() {
            var item = $scope.gridApi.selection.getSelectedRows();
         //   console.log(item)
            if (item.length == 0) {
                return
            }else
            {
                $modalInstance.close(item);
            };
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.loadmore = function() {
          //  console.log('加载更多数据');
        };

    }
])



//设置积分券面值
.controller('integralValueCtrl', ['$scope', '$modalInstance', 'config', 'zxhttp','i18nService','toaster','myTools',
    function($scope, $modalInstance, config, zxhttp,i18nService,toaster,myTools) {
       
        var result = "";   //可选面值有：100 200 500 1000
        var valuesGroup = [
            {text:"100",val:"100"},
            {text:"200",val:"200"},
            {text:"500",val:"500"},
            {text:"1000",val:"1000"}
        ];;

        $scope.valuesGroup = config&&config.values||valuesGroup;
        //设置第一个radio为默认选中
        if(myTools.isClass($scope.valuesGroup) === "Array"){
            $scope.valuesGroup[0].select = true;
            result = $scope.valuesGroup[0].val;
        }

        //设置选中的面值
        $scope.setValue = function(index,val){
            for(var i=0; i<$scope.valuesGroup.length; i++){
                if(index===i){
                    $scope.valuesGroup[i].select = true;
                }else{
                    $scope.valuesGroup[i].select = false;
                }
            }
            result = val;
            console.log(result);
        }

        /********* 返回事件 ********/
        $scope.ok = function() {
            $modalInstance.close(result);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);

