'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:ChanneleditCtrl
 * @description
 * # ChanneleditCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('ChanneleditCtrl',['$scope', 'apiFactory', function ($scope, apiFactory) {
    var urlGetChannels = "http://api.oktalk.com/ver2/channels/admin/handles";
    angular.element(document).ready(function () {
      $scope.init();
    });
    $scope.channelContentList = [];
    $scope.init = function () {
      apiFactory.doGetCall(urlGetChannels)
        .then(function (response) {
          console.log(response.data);
          $scope.channelContentList = response.data.channels;
        },
        function (err) {
          console.log('no data available');
          console.log(err);
        });
    };
  }]);