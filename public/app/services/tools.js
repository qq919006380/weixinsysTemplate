//zx.tools工具服务
//app特性处理、日期处理、localstorage存取处理、js对象处理等工具 

angular.module('zx.tools', [])


    //日期处理工具
    .factory('fdate',["$timeout","$filter",function($timeout,$filter){

        //补零处理函数
        var p = function(s) {
            if (s < 10){
                return '0' + s
            } else{
                return s
            };
        };

        //JsonDate转换date类型
        var JsonDateToJsDate = function (jsondate) {
            var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
            return date;
        };

        return {
            //转换格式为"/Date(1482508800000+0800)/"的后台日期
            formatjsondate : function(jsondate,format){
                if (jsondate) {
                    return $filter('date')(JsonDateToJsDate(jsondate), format);
                }
                else{
                    return '';
                };
            },
            // 转换指定格式
            forMatDate2 : function(jsondate,format){
                if (jsondate) {
                    return $filter('date')(jsondate, format);
                }
                else{
                    return '';
                };
            },
            forMatDate : function(jsondate,format){
                if (jsondate) {
                    return "DateTime("+$filter('date')(jsondate, format)+")";
                }
                else{
                    return '';
                };
            },
            //拿当前日期
            gettoday : function(format){
                var myDate = new Date();
                return $filter('date')(myDate, format);
            },
            //获取当前月的第一天
            getfristday : function(format){
                var myDate = new Date();
                myDate.setDate(1);
                return $filter('date')(myDate, format);
            },
            //获取当前月的最后一天
            getlastday : function(format){
                var myDate = new Date();
                myDate.setMonth(myDate.getMonth() + 1,1); 
                myDate.setDate(0); 
                return $filter('date')(myDate, format);
            },
            //增加天数,myDate格式为日期或日期格式的字符串
            deliveryday : function(myDate,d){
                if (typeof myDate  == 'string') {
                    myDate = new Date(myDate);
                };
                if (!d) { d = 0; };
                var day = myDate.getDate();
                day = day + parseInt(d);
                myDate.setDate(day);
                return $filter('date')(myDate, 'yyyy-MM-dd');
            }

        }
    }])

    //日期格式过滤器
    .filter("todate",["$filter","fdate",function($filter,fdate){
      return function(myDate){
            if(!myDate){
                return "";
            }
            //处理后台的JsonDate转换date类型，转换格式为"/Date(1482508800000+0800)/"的后台日期
            if(typeof myDate === "string" && myDate.indexOf("/Date(")>-1){
                myDate = new Date(parseInt(myDate.replace("/Date(", "").replace(")/", ""), 10));
            }
            return $filter('date')(myDate,"yyyy-MM-dd");
      }
    }])

    //js对象处理工具
    .factory('myTools', function() {

        return {
            //检测对象的类型，返回字符串格式
            isClass : function(obj){
                if(obj===null) return "Null";
                if(obj===undefined) return "Undefined";
                return Object.prototype.toString.call(obj).slice(8,-1);
            },
            //深度克隆一个对象
            deepClone : function(obj){
                var _self = this;
                function clone(target){

                    var result = {}, oClass=_self.isClass(target);

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
            },
            //继承属性
            extend : function(target,obj){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        target[key] = obj[key];
                    }
                }
            },
            //覆盖属性值
            cover : function(target,obj){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)&&target[key]!==undefined){
                        target[key] = obj[key];
                    }
                }
            }

        };
    })

    // 排序
    .factory('ArraySort', function() {
        function compare(v1, v2) {
            var t1 = typeof v1;
            var t2 = typeof v2;
            if (t1 === t2) {
                if (t1 === "string") {
                    v1 = v1.toLowerCase();
                    v2 = v2.toLowerCase();
                }
                if (v1 === v2) return 0;
                return v1 < v2 ? -1 : 1;
            } else {
                return t1 < t2 ? -1 : 1;
            }
        }
        //数组排序
        return {

            ArraySort:function(Array,type,esc){
                if (esc == 'desc') {
                    return Array.sort(function(a,b){return compare(b[type],a[type])});//降序
                }else
                {
                    return Array.sort(function(a,b){return compare(a[type],b[type])});//升序
                };
            },

            ArraySortUp:function(Array,type){
               return Array.sort(function(a,b){return compare(a[type],b[type])});//升序
            },

            ArraySortDown:function(Array,type){
                return Array.sort(function(a,b){return compare(b[type],a[type])});//降序
            }
        }
    })




;

