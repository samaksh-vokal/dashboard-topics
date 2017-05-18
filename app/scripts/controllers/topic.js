'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('TopicCtrl', ['$scope', 'apiFactory', 'Upload', '$timeout', function ($scope, apiFactory, Upload, $timeout) {
    angular.element(document).ready(function () {
      $scope.init();

    });
    // var urlGetChannels = 'http://localhost:3000/getAllChannels';

    $scope.initial = {};

    $scope.showModalAttr = 1;
    $scope.channel = [];
    $scope.isContentAvailable = [];

    $scope.channelContentList = [];

    $scope.channel.language = 'kn';

    $scope.checkResults = [];

    $scope.deleteElement = function (prop) {
      $scope.channelContentList.splice(_.indexOf($scope.channelContentList, _.findWhere($scope.channelContentList, { uuid: prop })), 1);
    };

    $scope.$watchCollection('checkModel', function () {
      $scope.checkResults = [];
      angular.forEach($scope.checkModel, function (value, key) {
        if (value) {
          $scope.checkResults.push(key);
        }
      });
    });
    $scope.onFileSelect = function ($files) {
      $scope.uploadProgress = 0;
      $scope.selectedFile = $files;
    };
    $scope.onFileSelect2 = function ($files) {
      $scope.uploadProgress = 0;
      $scope.selectedFile = $files;
    };
    function formatDate(date) {
      var d = new Date(date),
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
    function formatTime(date) {
      var d = new Date(date);
      var hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
      var mins = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
      var secs = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();

      return hours + ':' + mins + ':' + secs;
    }

    function formatTimeToStr(time) {
      var d = new Date(time);
      var h = d.getUTCHours();
      var m = d.getUTCMinutes();
      var day = d.getUTCDay();
      var tStr = m + ' ' + h + ' * * ' + day;
      console.log(tStr);
      return tStr;
    }

    $scope.addChannel = function (channel) {
      console.log($scope.channel);
      console.log($scope.channel.dt)
      channel.uuid = $scope.uuid();
      channel.created_at = formatDate($scope.channel.dt) + 'T' + formatTime($scope.channel.dt) + 'Z';
      channel.weightage = parseInt(channel.weightage);
      console.log(channel);
      // channel.langModel = $scope.checkResults[0];
      $scope.channelContentList.push(channel);
      console.log($scope.channelContentList);
      console.log($scope.init())
      $scope.channel = [];
      $scope.hideModal();
    };

    $scope.today = function () {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };



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

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup2 = {
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

    $scope.createNewChannel = function (channel, $index) {
      console.log(channel);
      var rv = {
        ref_id: channel['ref_id'],
        title: channel['title'],
        language: channel['language'],
        voice_desc: channel['voice_desc'],
        image: channel['image'],
        type: channel['type'],
        default_text: channel['default_text'],
        weightage: parseInt(channel['weightage']),
        created_at: formatDate(channel.dt) + 'T' + formatTime(channel.dt) + 'Z',
        hashtag: channel['hashtag'],
        message: channel['message'],
        to: channel['to'],
        time: formatTimeToStr(channel.time)
      };

      document.getElementById('submitBtn-' + $index).className = "btn btn-primary disabled";
      document.getElementById('editBtn-' + $index).className = "btn btn-primary disabled";

      apiFactory.doPostCall('http://api.oktalk.com/web/channels/owner/topics/create', rv).then(function (response) {
        $scope.isContentAvailable = response.data;
        console.log(response.data);
        $scope.channel = angular.copy($scope.initial);
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
          document.getElementById('editBtn-' + $index).className = "btn btn-primary";
          document.getElementById('submitBtn-' + $index).innerHTML = "Submit";
        }, 3000);
      });
      $scope.channel = angular.copy($scope.intial);
    };
    $scope.uploadFiles = function (file, errFiles, filetype) {
      var endpoint = (filetype === 'image') ? 'http://api.oktalk.com/web/channels/owner/topics/image/upload' : 'http://api.oktalk.com/web/channels/owner/topics/voice_desc/upload';
      var isImage = (filetype === 'image') ? 1 : 0;
      if (isImage) {
        $scope.f = file;
      } else {
        $scope.f1 = file;
      }

      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: endpoint,
          data: { content_file: file }
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            if (isImage) {
              $scope.channel.image = response.data.url;
            } else {
              $scope.channel.voice_desc = response.data.url;
            }

          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    };

    $scope.init = function () {
    };
    // $scope.isContentAvailable = "false";

    $scope.showModal = function () {
      document.getElementById('myModal').modal('show');
    };
    $scope.hideModal = function () {
      document.getElementById('hideBtnModal').click();
    };
  }]);
