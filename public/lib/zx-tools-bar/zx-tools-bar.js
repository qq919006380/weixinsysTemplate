//工具条组件指令
;(function(angular){
  'use strict';

  //配置对象
  var CONF = {
      baseUrl: 'lib/zx-tools-bar/templates/',
      digestTtl: 35
  };

//注册模块
angular.module('zx.tools.bar', [], ["$rootScopeProvider",function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
}])


//针对工具条每条记录的配置参数config的注释：
//必须参数：
// "type" : string 默认可选的按钮类型有："new","view","edit","delete","save","copy","audit","unaudit","set","filter",如果是自定的类型填写"custom"
// "func" : function  按钮触发的回调函数
//可选参数：
// "name" : string 按钮的显示名称
// "key" : string 按钮的唯一标识码
// "level" : string 按钮的api操作权限码,用于与后台进行匹配
// "enable" : true/false  按钮是否可用，默认为可用true
// "dispaly" : true/false  按钮的显示状态，默认为显示状态true
// "icon" : string  按钮的显示图标,缺省时会自动设置为默认图标


//实例化一个按钮组
//$scope.toolsbar = zxToolsBar.newToolsbar(config);
//--》 { key:unique, data:btnsGroup, btnsMap:btnsMapObj };
//key : string 按钮组对象的唯一标识码
//data ： array 按钮组对象的数据
//btnsMap : object 按钮组对象的映射对象，用于动态修改单个按钮对象的状态


//属性key用法：
//从映射对象中获取“指定按钮”对象，动态修改其状态，如显示文本的内容、显隐状态、是否可用状态等
/*
    //示例："新增同级区域"的按钮配置如下：
    var btnConfig = { 
        "name": "新增同级区域",
        "key":"mainbtn",    //关键点
        "type": "new",  
        "level":"010101",   //用于匹配操作权限的level
        "func": function(){ 
          console.log("新增同级销售区域"); 
          //打开“同级区域”模态窗口
          $scope.openSilibingRegionModal();
        }
    }
    $timeout(function(){
        var mainbtn = $scope.toolsbar.btnsMap["mainbtn"]; 
        console.log(mainbtn);
        mainbtn.dispaly = false;  //隐藏按钮
    },2000);
    $timeout(function(){
        var mainbtn = $scope.toolsbar.btnsMap["mainbtn"]; 
        console.log(mainbtn);
        mainbtn.name = "测试按钮";
        mainbtn.enable = false;           //不可用
        mainbtn.dispaly = true;   //显示按钮
    },4000);
*/


//工具条service
.factory("zxToolsBar",['$localStorage',function($localStorage){
    
    //检测对象的类型，返回字符串格式
    function isClass(obj){
        if(obj===null) return "Null";
        if(obj===undefined) return "Undefined";
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
    //深度克隆一个对象
    function deepClone(obj){
        var _self = this;
        function clone(target){

            var result = {}, oClass=isClass(target);

            if(oClass==="Object"){
                result = {};
            }else if(oClass==="Array"){
                result = [];
            }else{
                return target;
            }

            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var item = target[key];
                    //是一个Object或Array
                    if(oClass === "Object" || oClass === "Array"){
                        result[key] = clone(item);
                    }else{
                        result[key] = item;
                    }
                }
            }
            return result;
        }

        return clone(obj);
    }

    //默认配置对象
    var defaultBtnConfig = {
        "new" : {  
            "name": "新增",
            "type": "new",
            "icon": "fa fa-plus"
        },
        "view" : { 
            "name": "查看",  
            "type": "view",
            "icon": "fa fa-eye" 
        },
        "edit" : { 
            "name": "修改",  
            "type": "edit",
            "icon": "fa fa-edit" 
        },
        "delete" : { 
            "name": "删除",  
            "type": "delete",
            "icon": "fa fa-trash"   
        },
        "save" : { 
            "name": "保存",  
            "type": "save",
            "icon": "fa fa-floppy-o"  
        },
        "copy" : { 
            "name": "复制",  
            "type": "copy",
            "icon": "fa fa-clipboard"  
        },
        "audit" : { 
            "name": "审核",  
            "type": "audit",
            "icon": "fa fa-check-square-o"  
        },
        "unaudit" : { 
            "name": "弃审",  
            "type": "unaudit",
            "icon": "fa fa-share"  
        },
        "set" : { 
            "name": "设置",  
            "type": "set",
            "icon": "fa fa-cog"  
        },
        "filter" : { 
            "name": "查询条件",  
            "type": "filter",
            "icon": "fa fa-filter"  
        },
        "custom" : { 
            "name": "自定义",  
            "type": "custom",
            "icon": "fa fa-info"  
        },
        "line" : { 
            "name": "",  
            "type": "line",
            "icon": "fa"  
        }
    };
    //默认的回调函数
    var defaultFunc = function(){
      console.log("------------------ 执行了默认操作中的--"+this.type+"--操作------------------");
    }
    //基础绑定函数
    var baseBingFunc = function(obj,func){
        return function(){
            func.apply(obj,arguments);      
        }
    }
    //按钮组权限配置对象
    var btnsPermitConfig = {};
    //全局按钮对象
    var globalBtns = {};

    return {
      //创建一条工具栏
      newToolsbar : function(configs){
          //设置按钮组权限对象
          this.setPermitConfig($localStorage.popeset);
          return this.transform(configs.data||[]);
      },
      //设置按钮组权限对象
      setPermitConfig : function(popeset){
          if(!popeset || !popeset.length) return;
          for(var i=0; i<popeset.length; i++){
              var clevel = popeset[i].clevel||"";
              btnsPermitConfig[clevel] = true;
          }
          //console.log(btnsPermitConfig);
      },
      //根据配置对象组装成按钮数组
      transform : function(configs){
          var unique = new Date().getTime();
          var btnsGroup = [];
          var btnsMapObj = {};
          for(var i=0; i<configs.length; i++){
            //获取每条配置对象
            var config = configs[i]||{};
            //判断按钮是否具有权限
            /*暂时屏蔽权限判断
            if(config.level&&btnsPermitConfig[config.level]!==true){
                //console.log(config.level);
                //console.log(btnsPermitConfig[config.level]);
                console.log("按钮"+config.level+"不具有权限!");
                continue;
            }*/
            //创建一个按钮对象
            var newBtnObj = {};
            if(typeof defaultBtnConfig[config.type] !== "undefined"){
                newBtnObj = deepClone(defaultBtnConfig[config.type]);
            }else{
                newBtnObj = deepClone(defaultBtnConfig["custom"]);
            }
            //配置对象中显示名称不为空
            if(typeof config.name !== "undefined"){
                newBtnObj.name = config.name;
            }
            //enable、dispaly
            newBtnObj.enable = config.enable===false?false:true;
            newBtnObj.dispaly = config.dispaly===false?false:true;
            //icon
            if(typeof config.icon !== "undefined"){
                newBtnObj.icon = config.icon;
            }
            //配置对象中回调函数不为空
            if(typeof config.func !== "undefined"){
                newBtnObj.func = config.func;
            }else{
                newBtnObj.func = baseBingFunc(newBtnObj,defaultFunc);
            }
            //为按钮对象建立映射关系
            if(config.key){
                btnsMapObj[config.key] = newBtnObj;
            }
            //添加进按钮组
            btnsGroup.push(newBtnObj);
          }

          //挂载到全局按钮对象
          globalBtns[unique] = { key:unique, data:btnsGroup, btnsMap:btnsMapObj };
          //console.log(globalBtns[unique]);

          return globalBtns[unique];
      }
    };

}])


//工具条指令
.directive("zxToolsBar",[function(){
  return {
    restrict : 'E',
    templateUrl : CONF.baseUrl+'zx-tools-bar.html',
    scope: {
      "config":"="
    },
    controller : function($scope){
      //console.log("--------------------zxToolsBar----------------------");
      //console.log(JSON.stringify($scope.config));
    },
    link : function($scope,elem){  

    }
  };

}])


;

})(window.angular);
