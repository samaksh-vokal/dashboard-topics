angular.module('okTalkApp')
    .controller('TrendingCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
        "use strict";
        angular.element(document).ready(function () {
            // $scope.init();
            var myLatlng = new google.maps.LatLng(20.5937, 78.9629);
            var myOptions = {
                zoom: 5,
                center: myLatlng
            }
            var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            var geocoder = new google.maps.Geocoder();

            google.maps.event.addListener(map, 'click', function (event) {
                $scope.getWOEID(event.latLng.lat(), event.latLng.lng());
                // console.log(x.query.results.place.woeid)
            });
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
            var url = 'http://api.oktalk.com/v1/images/bing/suggestions?q=' + formattedStr + '&count=30&offset=0';
            apiFactory.doGetCall(url)
                .then(function (response) {
                    console.log(response);
                    $scope.pics = response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.getWOEID = function (lat, lng) {
            console.log(lat);
            lat = parseFloat(lat.toFixed(2));
            lng = parseFloat(lng.toFixed(2));
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20woeid%20from%20geo.places%20where%20text%3D%22(%20" + lat + "," + lng + ")%22%20limit%201&diagnostics=false&format=json"
            // alert(url);
            apiFactory.doGetCall(url)
                .then(function (response) {
                    console.log(response.data);
                    $scope.init(response.data.query.results.place.woeid);
                }, function (error) {
                    console.log(error);
                    // return error;
                });
        }




        var spacecamel = function (s) {
            return s.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        $scope.formatStr = function (s) {
            return encodeURI(spacecamel(s.replace('#', '')))
        }

        $scope.formatStr2 = function (s) {
            return spacecamel(s);
        }

        $scope.getThis = function () {
            console.log(this);
            return JSON.stringify(this.x);
        };

        $scope.init = function (s) {
            console.log('init called ' + s);
            // $scope.url = "http://localhost:3300/trending/" + $scope.sel;
            $scope.url = "http://localhost:3300/trending/" + s;
            // $scope.url = "http://localhost:3300/trending/2288986";
            apiFactory.doGetCall($scope.url)
                .then(function (response) {
                    console.log(response);
                    $scope.trending = response.data;
                }, function (error) {
                    console.log(error);
                });
        };
        $scope.setImageName = function (s) {
            console.log(s);
            $scope.item.img = s;
        }
    }]);
