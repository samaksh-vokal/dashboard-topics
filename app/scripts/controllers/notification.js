
angular.module('okTalkApp')
  .controller('NotificationCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
    "use strict";
    angular.element(document).ready(function () {
      $scope.init();
    });


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

    $scope.getNotifications = function(){

    };

    $scope.editNotification = function(){

    };

    $scope.test = "test successfull";

  }]);
