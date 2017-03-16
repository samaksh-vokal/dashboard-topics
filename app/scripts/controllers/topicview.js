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

    $scope.initial = {};

    $scope.showModalAttr = 1;
    $scope.channel = [];
    $scope.isContentAvailable = [];

    $scope.channelContentList = [];

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
    $scope.languages = ['English', 'Kannada', 'Hindi'];
    $scope.lang = 'English';
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.getData = function () {
      console.log('yo got it');
    }
    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };
    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
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
    $scope.uuid = function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    $scope.deleteElement = function (prop) {
      $scope.data.splice(_.indexOf($scope.data, _.findWhere($scope.data, { uuid: prop })), 1);
    };

      $scope.createNewChannel = function (channel, $index) {
        document.getElementById('submitBtn-' + $index).className = "btn btn-primary disabled";
        document.getElementById('editBtn-' + $index).className = "btn btn-primary disabled";

        apiFactory.doPostCall('http://api.oktalk.com/ver2/channels/admin/1/handle', channel).then(function (response) {
          $scope.isContentAvailable = response.data;
          $scope.channel = angular.copy($scope.intial);
          document.getElementById('submitBtn-' + $index).className = "btn btn-success";
          document.getElementById('submitBtn-' + $index).innerHTML = "Success";

          setTimeout(function () {
            document.getElementById('submitBtn-' + $index).className = "btn btn-primary";
            document.getElementById('submitBtn-' + $index).innerHTML = "Submit";
            document.getElementById('editBtn-' + $index).className = "btn btn-primary";
          }, 3000);

        }, function (err) {
          console.log(err);
          document.getElementById('submitBtn-' + $index).className = "btn btn-danger";
          document.getElementById('submitBtn-' + $index).innerHTML = "Failed";
          setTimeout(function () {
            document.getElementById('submitBtn-' + $index).className = "btn btn-primary";
            document.getElementById('submitBtn-' + $index).innerHTML = "Submit";
          }, 3000);
        });
        $scope.channel = angular.copy($scope.intial);
      }

    $scope.init = function () {

    };
    // $scope.isContentAvailable = "false";

    $scope.showModal = function () {
      document.getElementById('myModal').modal('show');
    };


    $scope.mydata = {
      "topics": [
        {
          "voice_desc": "https://s3-ap-southeast-1.amazonaws.com/ok.talk.channels/abelmathews88/7717A30A-35EE-443A-86F4-51167714D233.mp3",
          "topic_id": 19,
          "title": "What is your pet name?",
          "status": 1,
          "n_vokes": 16,
          "location": null,
          "language": "kn",
          "image": "http://static.bestmediainfo.com/wp-content/uploads/2016/07/the-baap-of-bollywood.jpg",
          "hashtag": null,
          "description": "let me know your pet name",
          "default_text": "question from shahid",
          "creator": "namit",
          "created_at": "2017-03-15T08:52:49Z"
        }
      ]
    }

  }]);
