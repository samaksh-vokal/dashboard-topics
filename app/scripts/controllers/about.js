'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('AboutCtrl', ['$scope', 'apiFactory', '$sce', function ($scope, apiFactory, $sce) {
    var urlGetContent = "http://api.oktalk.com/ver2/channels/admin/handles";
    var urlGetHandleContent = "http://api.oktalk.com/ver2/channels/admin/handle/";
    var urlDeleteHandleContent = "http://api.oktalk.com/ver2/channels/admin/1/handle/";
    // var urlUpdateHandleContent = "http://api.oktalk.com/ver2/channels/admin/handle/";
    // console.log($scope.contentData.handle.pristine);
    $scope.channelD = [];
    angular.element(document).ready(function () {
      $scope.init();
    });
    $scope.init = function () {
      apiFactory.doGetCall(urlGetContent)
        .then(function (response) {
          $scope.channelD = response.data;
        },
        function (err) {
          console.log('no data available');
          console.log(err);
        });
    };

    $scope.trustSrc = function (src) {
      // console.log(src);
      return $sce.trustAsResourceUrl(src);
    };

    $scope.getChannelData = function (handle) {
      apiFactory.doGetCall(urlGetHandleContent + handle)
        .then(function (response) {
          console.log(response.data.contents);
          $scope.contentData = response.data.contents;
        },
        function (err) {
          console.log('no data available');
          console.log(err);
        });
    };

    $scope.deleteElement = function (data) {
      var url = urlDeleteHandleContent + data.handle + '/content/' + data.content_id;
      apiFactory.doDeleteCall(url)
        .then(function (response) {
          console.log(response.data);
          $scope.getChannelData(data.handle);
        },
        function (err) {
          console.log('no data available');
          console.log(err);
          $scope.getChannelData(data.handle);
        });
    };

    $scope.updateElement = function (data) {
      console.log(data.content_id);
      var d = {
        title: data.title,
        type: data.type,
        is_comment: data.is_comment,
        data: {
          duration: data.data.duration,
          img: data.data.img,
          payload: data.data.payload
        },
        // lang: data.lang,
        // certificate: data.certificate,
        // category: data.category
      };

      var url = urlDeleteHandleContent + data.handle + "/content/" + data.content_id;

      apiFactory.doUpdateCall(url, d)
        .then(function (response) {
          console.log(response.data);
          $scope.getChannelData(data.handle);
        },
        function (err) {
          console.log('no data available');
          console.log(err);
          $scope.getChannelData(data.handle);
        });
    };
    $scope.contentData = [];
  }]);



