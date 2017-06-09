angular.module('okTalkApp')
    .controller('VokersCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
       
        $scope.clear = function () {
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

        var reqObj = function (from, todate, lang, type) {
            this.from = from;
            this.todate = todate;
            this.lang = lang;
            this.type = type;
        }

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];

        $scope.popup2 = {
            opened: false
        };
        $scope.popup1 = {
            opened: false
        };

        $scope.format = function (str) {
            return decodeURI(str);
        }

        $scope.show = function (item) {
            if (item === 1) {
                $scope.box1 = true;
                $scope.box2 = false;
                $scope.box3 = false;
            } else if (item === 2) {
                $scope.box1 = false;
                $scope.box2 = false;
                $scope.box3 = true;
            } else {
                $scope.box1 = false;
                $scope.box2 = true;
                $scope.box3 = false;
            }

        }

        $scope.languages = ['all', 'en', 'kn', 'hi', 'ta'];
        $scope.genders = ['Male', 'Female'];
        $scope.lang = 'all';
        $scope.types = ['new', 'approved', 'spam'];
        $scope.type = 'new';


        $scope.doAction = function (status, user, gender) {
            var url = "http://api.oktalk.com/v1/users/approve/user/" + user + "/status/" + status + "/gender/" + gender;
            apiFactory.doUpdateCall(url, {}).then(function (response) {
                console.log(response.data);
                $scope.getData();
            });
        };


        $scope.updateGender = function(user,gender){
            var url = "http://api.oktalk.com/v1/users/approve/user/" + user + "/gender/" + gender;
            apiFactory.doUpdateCall(url, {}).then(function (response) {
                console.log(response.data);
                $scope.getData();
            });
        }

        $scope.getData = function () {
            if ($scope.type === "new") {
                $scope.show(1);
            } else if ($scope.type === "approved") {
                $scope.show(2);
            } else {
                $scope.show(3);
            }
            var obj = new reqObj(formatDate($scope.channel.dt), formatDate($scope.channel.dt2), $scope.lang, $scope.type);
            console.log(obj);
            apiFactory.doPostCall('http://api.oktalk.com/v1/users/vokers/', obj).then(function (response) {
                console.log(response.data);
                $scope.jokers = response.data.vokers;
            }, function (err) {
                console.log(err);

            });
        }

        $scope.doUndo = function (item) {
            console.log(item);
            var status = 200 + item.report % 10;
            var k = new objR2(item.content_id, item.owner_id, status);
            console.log(k);

        }


        $scope.show = function (item) {
            if (item === 1) {
                $scope.box1 = true;
                $scope.box2 = false;
                $scope.box3 = false;
            } else if (item === 2) {
                $scope.box1 = false;
                $scope.box2 = false;
                $scope.box3 = true;
            } else {
                $scope.box1 = false;
                $scope.box2 = true;
                $scope.box3 = false;
            }

        }

    }])