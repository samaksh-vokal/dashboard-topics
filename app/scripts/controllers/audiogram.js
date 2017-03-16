'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('AudiogramCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
    angular.element(document).ready(function () {
      $scope.init();
    });
    // var urlGetChannels = 'http://localhost:3000/getAllChannels';

    $scope.initial = {
      theme: {
        url: "",
        user_id: "",
        content_id: "",
        img_url: "",
        width: 720,
        height: 720,
        framesPerSecond: 10,
        maxDuration: 300,
        samplesPerFrame: 128,
        pattern: "bars",
        waveTop: 600,
        waveBottom: 720,
        captionTop: 535,
        captionFont: "500 30px 'Rubik', 'Helvetica','Arial','Sans-Serif','Noto Sans Kannada'",
        captionAlign: "left",
        captionLineHeight: 34,
        captionLineSpacing: 7,
        captionLeft: 20,
        captionRight: 500,
        foregroundColor: "#FFD424",
        name: "vokal Theme 1",
        backgroundImageFile: "",
        backgroundColor: "#ffffff",
        waveColor: "#FFD424",
        captionColor: "#ffffff",
        waveLeft: 0,
        waveRight: 800,
        handle: ''
      },
      caption: ""
    };

    $scope.data = {
      theme: {
        url: "",
        user_id: "dashboard",
        content_id: "",
        img_url: "",
        width: 720,
        height: 720,
        framesPerSecond: 10,
        maxDuration: 300,
        samplesPerFrame: 128,
        pattern: "bars",
        waveTop: 600,
        waveBottom: 720,
        captionTop: 535,
        captionFont: "500 30px 'Rubik', 'Helvetica','Arial','Sans-Serif','Noto Sans Kannada'",
        captionAlign: "left",
        captionLineHeight: 34,
        captionLineSpacing: 7,
        captionLeft: 20,
        captionRight: 500,
        foregroundColor: "#FFD424",
        name: "vokal Theme 1",
        backgroundImageFile: "",
        backgroundColor: "#ffffff",
        waveColor: "#FFD424",
        captionColor: "#ffffff",
        waveLeft: 0,
        waveRight: 800,
        handle: ''
      },
      caption: ""
    }
    $scope.str = "https://s3-ap-southeast-1.amazonaws.com/oktalk.video/";

    $scope.createAudiogram = function () {
      $scope.data.caption = $scope.data.caption + " \n -@" + $scope.data.theme.handle;
      console.log($scope.data);
      document.getElementById('submitbtn').className = "form-control btn-primary disabled";
      //   document.getElementById('editBtn-' + $index).className = "btn btn-primary disabled";

      apiFactory.doPostCall('http://139.59.7.211:8889/v2/submit2', $scope.data).then(function (response) {
        $scope.data = angular.copy($scope.initial);
        document.getElementById('submitbtn').className = "btn btn-success";
        document.getElementById('submitbtn').innerHTML = "Success";
        $scope.response = "https://s3-ap-southeast-1.amazonaws.com/oktalk.video/dashboard/" + response.data.id+".mp4";
        $scope.viewResp();
        setTimeout(function () {
          document.getElementById('submitbtn').className = "btn btn-primary";
          document.getElementById('submitbtn').innerHTML = "Submit";
        }, 3000);

      }, function (err) {
        console.log(err);
        document.getElementById('submitbtn').className = "btn btn-danger";
        document.getElementById('submitbtn').innerHTML = "Failed";

        setTimeout(function () {
          document.getElementById('submitbtn').className = "btn btn-primary";
          document.getElementById('submitbtn').innerHTML = "Submit";
          $scope.init();
        }, 3000);
      });
      $scope.data = angular.copy($scope.intial);
    }

    $scope.init = function () {
      $('#response').hide();
    };
    $scope.viewResp = function () {
      $('#response').show();
    }
  }]);
