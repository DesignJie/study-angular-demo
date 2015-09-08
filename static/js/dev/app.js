var commonModule = angular.module('commonModule',[]);
commonModule.service('returnInfo', function(){
	return {
		money : 5000,
		address : 'fuzhou'
	}
});

var myapp = angular.module('myindex', ['ui.router', 'commonModule']);

myapp.controller('indexController', ['$scope', '$http', 
	function($scope, $http){
		$http.get('./data/index.json')
			.success(function(data, state, headers, config){
				// console.log(data);
				// console.log(state);
				// console.log(headers);
				// console.log(config);
				$scope.greeting = data;
			})
			.error(function(data, state, headers, config){
				console.log(data);
				console.log(state);
			});
		$scope.ctrlFlavor = '百威';
		$scope.sayHello = function(name){
			alert('hello ' + name);
		}			
	}
]);

myapp.factory('game', function(){
	return {
		gameName : 'running'
	}
});

myapp.service('returngame', function(game){
	return {
		games : game.gameName + ' linjie'
	}
});

myapp.controller('list', ['$scope', '$http', 'returnInfo',
	function($scope, $http, returnInfo){
		$scope.name = "林倩倩";
		console.log(returnInfo);
		$scope.loader =  function(){
			console.log('加载数据中......');
		}
	}
]);

myapp.directive('hello', function(){
	return {
		restrict : 'AE',
		templateUrl : 'template/hello.html',
		replace : true,
		transclude : true,
		link : function(scope, element, attrs){
			element.bind('mouseenter', function(){
				//scope.loader();
				///scope.$apply('loader()');
				scope.$apply(attrs.howtoload);
			});
		}
	}
});

myapp.directive('superman', function(){
	return {
		scope : { //独立的scope ，每个指令都是对应的scope 
			//三种形式绑定 @ , = , & ,
		}, 
		restrict : 'AE',
		template : '<div>{{name}}</div><div ng-transclude></div>',
		replace : true,
		transclude : true,
		controller : function($scope){ //提供外面的公共方法
			$scope.arr = [];
			this.strength = function(){
				$scope.arr.push('strength');
			}
			this.speed = function(){
				$scope.arr.push('speed');
			}
			this.light = function(){
				$scope.arr.push('light');
			}
		},
		link : function(scope, element, attrs){
			element.bind('mouseenter', function(){
				console.log(scope.arr);
			});
		}
	}
});
myapp.directive('strength', function(){
	return {
		require : '^superman',  //依赖于superman指令
		link : function(scope, element, attrs, supermanCtrl){
			supermanCtrl.strength();
		}
	}
});
myapp.directive('speed', function(){
	return {
		require : '^superman', //依赖于superman指令
		link : function(scope, element, attrs, supermanCtrl){
			supermanCtrl.speed();
		}
	}
});
myapp.directive('light', function(){
	return {
		require : '^superman', //依赖于superman指令
		link : function(scope, element, attrs, supermanCtrl){
			supermanCtrl.light();
		}
	}
});


myapp.directive('drink', function(){
	return {
		scope : {
			flavor : '@'   //scope的绑定策略  把当前属性作为属性字符串传递，你还可以绑定来自外层scope的值，只属性值中插入{{}}即可
		},
		restrict : 'AE',
		template : '<div>{{flavor}}</div>',
		replace : true,
		// controller : function($scope){
		// 	$scope.flavor = $scope.ctrlFlavor;
		// }
		// ,
		// link : function(scope, element, attrs){
		// 	scope.flavor = attrs.flavor;
		// }
	}
});

myapp.directive('drinks', function(){
	return {
		scope : {
			flavor : '='   //scope的绑定策略  于父集scope中的属性进行双向绑定
		},
		restrict : 'AE',
		template : '<input ng-model="flavor">',
		replace : true,
		// controller : function($scope){
		// 	$scope.flavor = $scope.ctrlFlavor;
		// }
		// ,
		// link : function(scope, element, attrs){
		// 	scope.flavor = attrs.flavor;
		// }
	}
});
myapp.directive('greeting', function(){
	return {
		scope : {
			greet : '&' //scope的绑定策略  传递一个来自父scope的函数 ，稍后调用
		},
		restrict : 'AE',
		template : '<div><input ng-model="username"><button ng-click="greet({name:username})">greeting</button></div>',
		replace : true,
		// controller : function($scope){
		// 	$scope.flavor = $scope.ctrlFlavor;
		// }
		// ,
		// link : function(scope, element, attrs){
		// 	scope.flavor = attrs.flavor;
		// }
	}
});
myapp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/index');

	$stateProvider
		.state('index',{
			url : '/index',
			views : {
				'' : {
					templateUrl : 'template/index.html'
				},
				'header@index' : {
					templateUrl : 'template/header.html'
				},
				'body@index' : {
					templateUrl : 'template/body.html'
				},
				'footer@index' : {
					templateUrl : 'template/footer.html'
				}
			}
		})
		.state('index.list',{
			url : '/list',
			views : {
				'body@index' : {
					templateUrl : 'template/list.html'
				},
				'detail@index.list' : {
					templateUrl : 'template/detail.html'
				}
			}
		})
});
