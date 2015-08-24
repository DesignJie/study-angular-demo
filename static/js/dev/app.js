var myapp = angular.module('myindex', ['ui.router']);

myapp.controller('indexController', ['$scope', '$http', 
	function($scope, $http){
		$http.get('./data/index.json')
			.success(function(data, state){
				console.log(data);
				console.log(state);
				$scope.greeting = data;
			})
			.error(function(data, state){
				console.log(data);
				console.log(state);
			});
			
	}
]);

myapp.controller('list', ['$scope', '$http', 
	function($scope, $http){
		$scope.name = "林倩倩";
	}
]);

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
				}
			}
		})
});
