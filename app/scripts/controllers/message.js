'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('MessageCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isWarning = false;
    $scope.contacts = [];
    $scope.addContact = function () {
      if ($scope.contacts.length < 10) {
        $scope.contacts.push({
        });
      } else {
        $scope.isWarning = true;
        setTimeout(function () {
          console.log('****');
          $scope.$apply(function () {
            $scope.isWarning = false;
            $scope.messageStatus = '';
          });
        }, 2000);
        $scope.messageStatus = 'Maximum 10 phones can be added at a time.';
      }

    };
    $scope.sendMessage = function () {
      var url = 'http://api.oktalk.com/ver2/users/admin/message';
      var contactArr = [];

      document.getElementById("submit").className = "disabled";
      document.getElementById("addPhone").className = "btn btn-primary disabled";

      for (var i = 0; i < $scope.contacts.length; i++) {
        // console.log('inside');
        if ($scope.contacts[i].phone) {
          contactArr.push($scope.contacts[i].phone);
        }

      }
      var data = {
        message: $scope.msgComment,
        users: contactArr
      };

      console.log(data);
      apiFactory.doPostCall(url, data).then(function (response) {
        console.log(response.body);

        setTimeout(function () {
          document.getElementById('submit').innerHTML = "Submit";
          document.getElementById("submit").className = "btn btn-primary";
          document.getElementById("addPhone").className = "medWidth topMargin bottomMargin";
        }, 2000);

        document.getElementById('submit').className = "btn btn-success";
        document.getElementById('submit').innerHTML = "Success";

        $scope.contacts = [];
        $scope.msgComment = "";
      }, function (err) {
        $scope.contacts = [];
        console.log(err);

        setTimeout(function () {
          document.getElementById('submit').innerHTML = "Submit";
          document.getElementById("submit").className = "btn btn-primary";
          document.getElementById("addPhone").className = "medWidth topMargin bottomMargin";
        }, 2000);
        document.getElementById('submit').className = "btn btn-danger";
        document.getElementById('submit').innerHTML = "Failed";
      });
    };

  }]);
