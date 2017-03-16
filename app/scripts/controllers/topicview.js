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

  }]);
