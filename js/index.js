var app=angular.module('todo',[]);
app.controller('mainCtrl',['$scope',function($scope){
    $scope.colors=['logo1','logo2','logo3','logo4','logo5','logo6','logo7'];
    $scope.yuan=['li1','li2','li3','li4','li5','li6','li7'];
    $scope.col=['col1','col2','col3','col4','col5','col6','col7'];
    $scope.box={'li1':'col1','li2':'col2','li3':'col3','li4':'col4','li5':'col5','li6':'col6','li7':'col7'};
    $scope.zuobox={'li1':'logo1','li2':'logo2','li3':'logo3','li4':'logo4','li5':'logo5','li6':'logo6','li7':'logo7'};
    $scope.title={'logo1':'col1','logo2':'col2','logo3':'col3','logo4':'col4','logo5':'col5','logo6':'col6','logo7':'col7'};

    $scope.todos=[
        {id:1,theme:'logo1',title:'默认',list:[
            {id:1,title:'买东西',state:1},
            {id:2,title:'买cai',state:0}
        ]},
        {id:2,theme:'logo2',title:'新列表1',list:[]},
        {id:3,theme:'logo3',title:'新列表2',list:[]},
        {id:4,theme:'logo4',title:'新列表3',list:[]},
        {id:5,theme:'logo5',title:'新列表4',list:[]}
    ];

    //定义一个变量，变量代表一个类
    $scope.current=$scope.todos[0];
    $scope.setcurrent=function(v){
        $scope.current=v;
        $scope.col.forEach(function(v){
            $('.box').removeClass(v)
        });
        $('.box').addClass($scope.title[v.theme]);
    };
    //v~li1,li2..想加col，logo的类要加v代表着每个相加得类
    $scope.change=function(v){
        $scope.col.forEach(function(x){
            $('.box').removeClass(x)
        });
        $('.box').addClass($scope.box[v]);
        $scope.current.theme=$scope.zuobox[v];
    }
    $scope.delete=function(id){
        $scope.current.list=$scope.current.list.filter(function(v){
            return v.id!==id;
        })
    };
    $scope.index=0;
    $scope.current.list.filter(function(v){
        if(v.state==1){
            $scope.index+=1;
        }
    });
    $scope.jian=function(){
        $scope.index-=1;
    }
    $scope.jia=function(){
        $scope.index+=1;
    }
    $scope.addlist=function(e){
        if(e.keyCode==13) {
            var maxid = 0;
            $scope.current.list.forEach(function (v) {
                if (v.id > maxid) {
                    maxid = v.id;
                }
            });
        //}
        var item={id:maxid+1,title:$scope.title,state:'0'};
            //if(e.keyCode==13){
                $scope.current.list.push(item);
                $scope.title='';
            }
    };

    $scope.add=function(){
        var maxid=0;
        $scope.todos.forEach(function(v){
            if(v.id>maxid){
                maxid= v.id;
            }
        });

        //item是对象加入
        var item={id:maxid+1, theme:$scope.colors[$scope.todos.length%7], title:'新列表'+($scope.todos.length)};
        $scope.todos.push(item)
    };
    //小框的删除
    $scope.shanchu=function(id){
        var a=0;
        $scope.todos.forEach(function(v,i){
            if(v.id==id){
                a=i;
            }
        });
       $scope.todos=$scope.todos.filter(function(v){
            return v.id!==id;
        });
        $scope.current=$scope.todos[a];

    }
}]);


app.directive('myOption',[function(){
    return{
        restrict:'AE',
        replace:true,
        transclude:true,
        template:'<div class="title"><div ng-transclude></div></div>',
        link:function(scope,el){
            $('.option').on('click',function(){
                $('.new-list').toggleClass('show');
                return false;
            });
            $('.new-list').on('click',false);
            $('.list-can').on('click',function(){
                $('.new-list').removeClass('show');
            });
            $(document).on('click',function(){
                $('.new-list').removeClass('show');
            });
        }
    }
}]);


app.directive('myDiv',[function(){
    return{
        restrict:'AE',
        replace:true,
        transclude:true,
        template:'<ul class="li"><div ng-transclude></div></ul>',
        link:function(scope,el){
            $(el).on('mousedown',false);
            $('.li').on('dblclick','li',function(){
                var input=$(this).find('input');
                $(this).addClass('show');
                input.val(input.val()).focus();
            });
            $('.li').on('blur','li input',function(){
                $(this).closest('li').removeClass('show');
            });
            $('.li').on('click','li',function(){
                $('.li li').removeClass('active show');
                $(this).addClass('active')
            });
            $('.li').on('keyup',false);
            $(document).on('keyup',function(e){
                if(e.keyCode==8){
                    var id=parseInt($(el).find('.active').attr('data-id'));
                    var index=parseInt($(el).find('.active').index());
                    scope.$apply(function(){
                       scope.todos=scope.todos.filter(function(v){
                            return v.id!==id;
                        });
                        scope.current=scope.todos[index];
                    })
                }

            });
            $('.box').on('keyup',false);

        }
    }
}])
$(function(){
    $('.shurus').val('');
    $('.box').on('click','li',function(){
        $('.box li').removeClass('active');
        $(this).addClass('active');
    })
})