//树指令组件指令
;(function(angular){
  'use strict';

  //配置对象
  var CONF = {
      baseUrl: 'lib/zx-ztree/templates/',
      digestTtl: 35
  };

//注册模块
angular.module('zx.ztree', [], ["$rootScopeProvider",function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
}])


//树组件管理服务
//功能：将后台数据转换为树节点格式的数组、指定树节点要显示的列名、获取选中的单一树节点、检测是否选中单一树节点、新增树节点、更新树节点、删除树节点等
//示例：该服务api的示例请参考“系统管理模块中的销售网点”的controller,StationListController
//路径：admin/station/ctrl.js
.factory("zxZtree",["toaster",function(toaster){

    var globalMapObjs = {};
    var globalFileds = {};   // { name:"sr_cregionname", level:"sr_clevel", key:"sr_cregionid", classname:"全部分类" };

    return {
        //获取TreeObj
        getTreeObjById : function(treeId){
            return $.fn.zTree.getZTreeObj(treeId);
        },
        //获取对应表列名fileds
        getFileds : function(treeId){
            return globalFileds[treeId]||{};
        },
        //设置对应表列名fileds
        setFileds : function(treeId,fileds){
            globalFileds[treeId] = fileds;
        },
        //获取所有选中的节点
        getAllSelectedNodes : function(treeId){
            var treeObj = this.getTreeObjById(treeId);
            var selectedNodes = treeObj.getSelectedNodes();
            return selectedNodes||[];
        },
        //获取所有输入框被勾选中的节点
        getCheckedNodes : function(treeId){
            var treeObj = this.getTreeObjById(treeId);
            var nodes = treeObj.getCheckedNodes(true);
            return nodes||[];
        },
        //获取当前选中的单个节点
        getCurSelectedNode : function(treeId){
            var treeObj = this.getTreeObjById(treeId);
            var selectedNodes = treeObj.getSelectedNodes();
            var curSelectedNode = null;
            if(selectedNodes&&selectedNodes.length===1){
              curSelectedNode = selectedNodes[0];
            }
            return curSelectedNode;
        },
        //检测是否选中单个节点
        checkSingleNode : function(treeId,title){
            var treeObj = this.getTreeObjById(treeId);
            var selectedNodes = treeObj.getSelectedNodes();
            if(!selectedNodes||selectedNodes.length===0){
              console.log("没有选中节点");
              toaster.pop("error", "新增"+title+"信息", "请选中"+title);
              return false;
            }else if(selectedNodes.length>2){
              console.log("请选中单一节点");
              toaster.pop("error", "新增"+title+"信息", "请选中一个"+title);
              return false;
            }else{
              console.log("已选中单一节点");
              return true;
            }
        },
        //新增树节点
        addTreeNode : function(treeId,type,data,treeData){

            //获取树组件对象
            var treeObj = this.getTreeObjById(treeId);

            //获取树的节点映射对象
            var mapObj = this.getTreeMapobj(treeId);

            //获取对应表列名fileds
            var fileds = this.getFileds(treeId);

            //计算父节点的层次码和获取父节点对象
            var parentLevel = data[fileds.level].slice(0,data[fileds.level].length-3);
            var parentNode = mapObj[parentLevel];
            //console.log(parentLevel);
            //console.log(parentNode);

            //新增区域配置数据
            // var newRegion = {name:data[fileds.name]+"（"+data[fileds.level]+"）", 
            //                 zxlevel:data[fileds.level], 
            //                 classId:data[fileds.key], 
            //                 open:true, children:[]};
            var newRegion = {name:data[fileds.name]+"（"+data[fileds.key]+"）", 
                            zxlevel:data[fileds.level], 
                            classId:data[fileds.key], 
                            open:true, children:[]};
            //排除是第一层节点的情况
            if(parentNode&&parentNode.children){
                parentNode.children.push(newRegion);
            }else{
                treeData.push(newRegion);
            }
            //更新映射对象
            mapObj[data[fileds.level]] = newRegion;

            //获取当前选中的销售区域节点及其父节点
            var selectedNode = this.getCurSelectedNode(treeId);
            var selectedNodeParent = selectedNode&&selectedNode.getParentNode();
            var nodes = treeObj.getNodes();
            //console.log(nodes);
            //新增区域树节点
            var parentTreeNode = null;
            if(type=="silibing"){
                parentTreeNode = selectedNodeParent||nodes[0];
            }else if(type=="child"){
                parentTreeNode = selectedNode||nodes[0];
            }
            //console.log(parentTreeNode);
            // var newNodes = [{name:data[fileds.name]+"（"+data[fileds.level]+"）", 
            // zxlevel:data[fileds.level], 
            // classId:data[fileds.key]}];
            var newNodes = [{
                name:data[fileds.name]+"（"+data[fileds.key]+"）", 
                zxlevel:data[fileds.level], 
                classId:data[fileds.key],
                origialData:data
            }];
            treeObj.addNodes(parentTreeNode,newNodes);   
        }, 
        //更新树节点
        updateTreeNode : function(treeId,data){
            //获取树的节点映射对象
            var mapObj = this.getTreeMapobj(treeId);

            //获取对应表列名fileds
            var fileds = this.getFileds(treeId);

            //
            var targetNode = mapObj[data[fileds.level]];
            console.log(targetNode);
            // targetNode.name = data[fileds.name]+"（"+data[fileds.level]+"）";
            targetNode.name = data[fileds.name]+"（"+data[fileds.key]+"）";

            //获取当前选中的区域节点
            var selectedNode = this.getCurSelectedNode(treeId);
            // selectedNode.name = data[fileds.name]+"（"+data[fileds.level]+"）";
            selectedNode.name = data[fileds.name]+"（"+data[fileds.key]+"）";

            var treeObj = this.getTreeObjById(treeId);
            treeObj.updateNode(selectedNode);

            // 更新原始数据
            for (var key in selectedNode.origialData ) {
                selectedNode.origialData[key] = data[key];
            };

        }, 
        //删除树节点
        delTreeNode : function(treeId,treeData,clevel){
            //还有两种情况未处理，1：删除父节点时自级是否全删除，2:是否开启多选删除

            //获取树的节点映射对象
            var mapObj = this.getTreeMapobj(treeId);

            var targetNode = mapObj[clevel];
            //treeData.splice(treeData.indexOf(targetNode),1);
            //console.log(JSON.stringify(treeData));
            //获取当前选中的区域节点
            var selectedNode = this.getCurSelectedNode(treeId);
            //console.log(selectedNode);
            var treeObj = this.getTreeObjById(treeId);
            treeObj.removeNode(selectedNode);
        }, 
        //获取树的节点映射对象
        getTreeMapobj : function(treeId){
            return globalMapObjs[treeId]||{};
        }, 
        //设置树的节点映射对象
        setTreeMapobj : function(treeId,mapObj){
            globalMapObjs[treeId] = mapObj;
        }, 
        //更新树的节点映射对象
        updateTreeMapobj : function(){}, 
        //将api列表数据转换为树节点数据
        transformTreeData : function(treeId,data,fileds,levelLen){
            //treeId： 对应树组件的id
            //data： api返回的数据列表
            //fileds的格式： { name:"", level:"", key:"", classname:"" }
            //levelLen： 层次码level的层次长度，默认为3
            if(!treeId||treeId===""){
              console.log("参数"+treeId+"不能为空！");
              return [];
            }
            //设置fileds
            this.setFileds(treeId,fileds);
            levelLen = (levelLen||3);
            var result = [];  //返回的数组
            var mapObj = {};  //映射对象
            for(var i=0; i<data.length; i++){
                var item = data[i];

                // var obj = { name:item[fileds.name]+"（"+item[fileds.level]+"）", 
                //             zxlevel:item[fileds.level], 
                //             classId:item[fileds.key], 
                //             children:[], 
                //             origialFileds:fileds, 
                //             origialData:item };
                //console.log(JSON.stringify(item));
                var obj = { name:fileds.displayName?item[fileds.displayName]:(item[fileds.name] +"（"+item[fileds.key]+"）"), 
                            zxlevel:item[fileds.level], 
                            classId:item[fileds.key], 
                            checked : item.checked,         //初始化“是否选中”状态
                            chkDisabled : item.chkDisabled, //初始化“是否可选”状态
                            children:[], 
                            origialFileds:fileds, 
                            origialData:item };
                //排除第一层
                if(item[fileds.level].length>levelLen){
                    var parentLevel = item[fileds.level].slice(0,item[fileds.level].length-(levelLen||3));
                    var parentNode = mapObj[parentLevel];
                    //父节点为空时,创建一个临时父节点
                    if(!parentNode){
                        parentNode = { name:"未知",zxlevel:item[fileds.level],classId:item[fileds.key],children:[], origialFileds:fileds, origialData:item };
                        result.push(parentNode);
                        mapObj[parentLevel] = parentNode;
                    }
                    parentNode.children.push(obj);
                }else{
                    //如果临时节点已经存在
                    if(mapObj[item[fileds.level]]){
                        obj.children = mapObj[item[fileds.level]].children;
                        mapObj[item[fileds.level]] = obj;
                    }else{
                        //默认第一层为打开状态
                        obj.open = true;
                        result.push(obj);
                    }
                }
                mapObj[item[fileds.level]] = obj;
            }
            //设置树的节点映射对象
            this.setTreeMapobj(treeId,mapObj);

            return [{ name:fileds.classname||"全部分类",zxlevel:"",classId:"",children:result, origialFileds:fileds, origialData:{}, open:true }];
        }
    };
}])


//树指令
.directive("zxZtree",[function(){
  return {
    restrict : 'E',
    replace: true,
    template:"<ul></ul>",
    scope: {
      "config":"=",
      "data":"=",
      "handle":"="
    },
    controller : function($scope){
      console.log("--------------------zxZtree----------------------");
      //console.log(JSON.stringify($scope.config));
      //console.log(JSON.stringify($scope.data));

    },
    link : function($scope,elem){  

        var zTreeObj;
        // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
        var setting = $scope.config||{};
        // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
        var zNodes = $scope.data||[];

        //初始化数插件
        zTreeObj = $.fn.zTree.init($(elem), setting, zNodes);

        //初始化controller中数句柄对象
        /*if($scope.handle&&$scope.handle.inittedTree){
          $scope.handle.inittedTree(zTreeObj);
        }*/

        //监听“刷新指定树的节点数据”事件
        $scope.$on("refreshZTree",function(event,treeId,data){
          if($(elem)[0]&&$(elem)[0].id===treeId){
              $.fn.zTree.init($(elem), setting, data);
          }
        });
        
    }
  };

}])


;

})(window.angular);
