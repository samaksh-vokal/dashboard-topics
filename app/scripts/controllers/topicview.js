'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('TopicViewCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
    angular.element(document).ready(function () {
      $scope.init();
    });
    // var urlGetChannels = 'http://localhost:3000/getAllChannels';
    $scope.orderByField = 'title';
    $scope.reverseSort = false;
    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
    $scope.initial = {};

    $scope.showModalAttr = 1;
    $scope.channel = [];
    $scope.isContentAvailable = [];

    $scope.channelContentList = [];
    $scope.ref_id = '';
    $scope.addChannel = function (channel) {
      channel.uuid = $scope.uuid();
      $scope.channelContentList.push(channel);
      console.log($scope.channelContentList);
      $scope.channel = angular.copy($scope.init);
      setTimeout(function () {
        console.log('timeout');
      }, 3000);
    };

    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.languages = ['all', 'en', 'kn', 'hi','ta'];
    $scope.lang = 'all';
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.getData = function () {

      // var fromD = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
      var a = '';

      if ( $scope.channel == undefined || isNaN($scope.channel.dt) ) {
        a = 'ref_id=' + $scope.ref_id;
      } else if ($scope.ref_id == undefined || $scope.ref_id == '') {
        var d1 = formatDate($scope.channel.dt) + 'T00:00:00Z';
        var d2 = formatDate($scope.channel.dt2) + 'T00:00:00Z';
        a = 'lang=' + $scope.lang + '&from_date=' + d1 + '&to_date=' + d2;
      } else {
        a = 'ref_id=' + $scope.ref_id;
      }

      var url = 'http://api.oktalk.com/web/channels/topics?' + a;

      console.log(url);
      apiFactory.doGetCall(url)
        .then(function (response) {
          $scope.mydata = response.data;
        },
        function (err) {
          console.log(err);
          $scope.mydata = '';
        });
    };
    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
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
      // dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1
    };
    // Disable weekend selection
    // function disabled(data) {
    //   var date = data.date,
    //     mode = data.mode;
    //   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    // }
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

    $scope.uuid = function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    $scope.deleteElement = function (channel, $index) {
      console.log(channel);
      channel.status = 0;
      // $scope.mydata.topics.splice(_.indexOf($scope.data, _.findWhere($scope.mydata.topics, { uuid: prop })), 1);
      apiFactory.doPostCall('http://api.oktalk.com/web/channels/owner/topics/edit', channel).then(function (response) {

        $scope.isContentAvailable = response.data;
        // $scope.channel = angular.copy($scope.intial);
        document.getElementById('deleteBtn-' + $index).className = "btn btn-success";
        document.getElementById('deleteBtn-' + $index).innerHTML = "deleted";

        setTimeout(function () {
          document.getElementById('deleteBtn-' + $index).className = "btn btn-danger";
          document.getElementById('deleteBtn-' + $index).innerHTML = "delete";
          $scope.getData();
        }, 3000);
      }, function (err) {
        console.log(err);
        document.getElementById('submitBtn-' + $index).className = "btn btn-danger";
        document.getElementById('submitBtn-' + $index).innerHTML = "Fail delete";
        setTimeout(function () {
          document.getElementById('submitBtn-' + $index).className = "btn btn-danger";
          document.getElementById('submitBtn-' + $index).innerHTML = "delete";
          $scope.getData();
        }, 3000);
      });
      // $scope.channel = angular.copy($scope.intial);
    };


    $scope.createNewChannel = function (channel, $index) {
      // console.log(channel);
      document.getElementById('submitBtn-' + $index).className = "btn btn-primary disabled";
      document.getElementById('editBtn-' + $index).className = "btn btn-primary disabled";

      apiFactory.doPostCall('http://api.oktalk.com/web/channels/owner/topics/edit', channel).then(function (response) {
        $scope.isContentAvailable = response.data;
        // $scope.channel = angular.copy($scope.intial);
        document.getElementById('submitBtn-' + $index).className = "btn btn-success";
        document.getElementById('submitBtn-' + $index).innerHTML = "Success";

        setTimeout(function () {
          document.getElementById('submitBtn-' + $index).className = "btn btn-primary";
          document.getElementById('submitBtn-' + $index).innerHTML = "Submit";
          document.getElementById('editBtn-' + $index).className = "btn btn-primary";
          $scope.getData();
        }, 3000);

      }, function (err) {
        console.log(err);
        document.getElementById('submitBtn-' + $index).className = "btn btn-danger";
        document.getElementById('submitBtn-' + $index).innerHTML = "Failed";
        setTimeout(function () {
          document.getElementById('submitBtn-' + $index).className = "btn btn-primary";
          document.getElementById('submitBtn-' + $index).innerHTML = "Submitted";
          $scope.getData();
        }, 3000);
      });
      // $scope.channel = angular.copy($scope.intial);
    };

    $scope.init = function () {

    };
    // $scope.isContentAvailable = "false";

    $scope.showModal = function () {
      document.getElementById('myModal').modal('show');
    };


    $scope.mydata = {
      "topics": [

      ]
    };

  }]);
