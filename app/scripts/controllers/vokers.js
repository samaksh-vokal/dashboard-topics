angular.module('okTalkApp')
    .controller('VokersCtrl', ['$scope', 'apiFactory', function($scope, apiFactory) {
        "use strict";

        $scope.languages = ['all', 'en', 'kn', 'hi', 'ta'];
        $scope.genders = ['Male', 'Female'];
        $scope.lang = 'all';
        $scope.types = ['new', 'approved', 'spam'];
        $scope.type = 'new';
        var baseURL = "http://api.oktalk.com/v1/users/";

        // Date picker stuff
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.clear = function() {
            $scope.dt = null;
        };

        function formatDate(date) {
            var x = date || '';
            var d = new Date(x),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }
            return [year, month, day].join('-');
        }

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.popup2 = {
            opened: false
        };
        $scope.popup1 = {
            opened: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };
        var now = new Date();
        var yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        $scope.channel = {};
        $scope.channel.dt = yesterday;
        $scope.channel.dt2 = now;

        // Actions
        var reqObj = function(from, todate, lang, type) {
            this.from = from;
            this.todate = todate;
            this.lang = lang;
            this.type = type;
        };

        $scope.format = function(str) {
            return decodeURI(str);
        };

        $scope.show = function(item) {
            $scope.box1 = item === "new" ? true : false;
            $scope.box3 = item === "approved" ? true : false;
            $scope.box2 = item === "spam" ? true : false;
        };

        $scope.doAction = function(status, user, gender) {
            var url = baseURL + "/approve/user/"+ user  +"/status/" + status;
            apiFactory.doUpdateCall(url, {}).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.updateGender = function(user, gender) {
            var url = baseURL + "/approve/user/" + user +  "/gender/" + gender;
            apiFactory.doUpdateCall(url, {}).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.getData = function() {
            $scope.show($scope.type);
            var obj = new reqObj(formatDate($scope.channel.dt), formatDate($scope.channel.dt2), $scope.lang, $scope.type);
            console.log(obj);
            apiFactory.doPostCall(baseURL + 'vokers/', obj).then(function(response) {
                console.log(response.data);
                $scope.jokers = response.data.vokers;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.doUndo = function(item) {
            console.log(item);
            var status = 200 + item.report % 10;
            var k = new reqObj(item.content_id, item.owner_id, status);
            console.log(k);

        };
    }]);
