angular.module('okTalkApp')
    .controller('TrendingCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
        angular.element(document).ready(function () {
            $scope.init();
        });

        $scope.trending = [];
        $scope.item = [];
        $scope.pics = [];
        $scope.findItem = function (obj) {
            $scope.item = JSON.parse(obj);
            $scope.getSuggestedImages($scope.item.name);
            console.log(JSON.parse(obj));
        }

        $scope.getSuggestedImages = function (s) {
            var formattedStr = $scope.formatStr(s);
            var url = 'http://int.oktalk.com/v1/images/bing/suggestions?q='+formattedStr+'&count=30&offset=0';
              apiFactory.doGetCall(url)
                .then(function (response) {
                    console.log(response);
                    $scope.pics = response.data;
                }, function (error) {
                    console.log(error);
                });          
        }

        var spacecamel = function (s) {
            return s.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        $scope.formatStr = function(s){
            return encodeURI(spacecamel(s.replace('#', '')))
        }

        $scope.getThis = function () {
            console.log(this);
            return JSON.stringify(this.x);
        };

        $scope.init = function () {
            $scope.url = "http://localhost:3300/trending";
            apiFactory.doGetCall($scope.url)
                .then(function (response) {
                    console.log(response);
                    $scope.trending = response.data;
                }, function (error) {
                    console.log(error);
                });
        };
        $scope.setImageName = function(s){
            console.log(s);
            $scope.item.img = s;
        }
    }]);
