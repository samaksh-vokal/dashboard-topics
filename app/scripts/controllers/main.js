'use strict';

/**
 * @ngdoc function
 * @name okTalkApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the okTalkApp
 */
angular.module('okTalkApp')
  .controller('MainCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
    var Obj = function (handle, title, type, lang, certificate, category, comment, payload, contentId, img) {
      this.handle = handle;
      this.title = title;
      this.type = type;
      this.lang = lang;
      this.certificate = certificate;
      this.category = category;
      this.comment = comment;
      this.payload = payload;
      this.contentId = contentId;
      this.img = img;
    };

    var oArr = [];
    $scope.selectedIndex = 0;

    $scope.deleteElement = function (prop) {
      $scope.data.splice(_.indexOf($scope.data, _.findWhere($scope.data, { contentId: prop })), 1);
    };

    $scope.emptyRow = function () {
      var emptyObj = new Obj("", "", "", "", "", "", "", "", $scope.generateUUID(), "");
      //console.log(emptyObj);
      oArr.push(emptyObj);
      $scope.data = oArr;

    };
    // $scope.readCSV = function () {
    //   // http get request to read CSV file content
    //   $http.get('/angular/file2.csv').success($scope.processData);
    // };

    $scope.processData = function (allText) {
      $scope.$apply(function () {

        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');

        for (var i = 1; i < allTextLines.length; i++) {
          //console.log(allTextLines[i]);
          if (allTextLines[i].startsWith(',')) {
            continue;
          }
          // split content based on comma
          var data = allTextLines[i].split(',');
          //console.log(i);
          if (data.length === headers.length) {
            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
              // if (data[j] === '') {
              //   //console.log('inside break');
              //   continue;
              // }
              tarr.push(data[j]);
            }
            var cId = $scope.generateUUID();
            //console.log(cId);
            var o = new Obj(tarr[0], tarr[1], tarr[2], tarr[3], tarr[4], tarr[5], tarr[6], tarr[7], cId, tarr[8]);
            oArr.push(o);
            //console.log(oArr);
            // lines.push(tarr);
          }
        }
        // $scope.data = lines;
        $scope.data = oArr;
      });
    };

    $scope.generateUUID = function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    $scope.addToList = function (data, $index) {
      $scope.selectedIndex = 1;
      document.getElementById('submitBtn-' + $index).className = "btn btn-primary disabled";
      document.getElementById('editBtn-' + $index).className = "btn btn-primary disabled";

      // //console.log(document.getElementById('submitBtn-' + $index));
      apiFactory.doPostCall('http://54.251.170.254:3000', data).then(function (response) {
        //console.log(response.body);
        document.getElementById('submitBtn-' + $index).className = "btn btn-success";
        document.getElementById('submitBtn-' + $index).innerHTML = "success";
      }, function (err) {
        //console.log(err);
        document.getElementById('submitBtn-' + $index).className = "btn btn-danger";
        document.getElementById('submitBtn-' + $index).innerHTML = "Failed";
      });
    };

    $scope.fileChanged = function (element) {
      $scope.$apply(function () {
        var file = element.files[0];
        var reader = new FileReader();
        reader.addEventListener("loadend", function () {

        });

        reader.onload = function (e) {
          $scope.processData(e.target.result);
        };
        reader.readAsText(file);
      });
    };
  }])
  .factory('apiFactory', function ($http, $q) {
    return {
      doGetCall: function (url) {
        console.log('called doGetCall');
        var deferred = $q.defer();
        $http.get(url)
          .then(function (resp) {
            deferred.resolve(resp);
          }, function (error) {
            deferred.reject(error);
          }, function (updates) {
            deferred.update(updates);
          });
        return deferred.promise;
      },
      doPostCall: function (url, data, config) {
        if (!config) {
          config = {
            "headers": {
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            }
          };
        }
        console.log(config);
        // console.log((JSON.stringify(data)));

        // data = JSON.stringify(data);

        var deferred = $q.defer();
        $http.post(url, data, config)
          .then(function (resp) {
            //console.log('resolved');
            deferred.resolve(resp);
          }, function (error) {
            //console.log('error');
            deferred.reject(error);
          }, function (updates) {
            //console.log('updates');
            deferred.update(updates);
          });
        return deferred.promise;
      },
      doDeleteCall: function (url) {
        var deferred = $q.defer();
        $http.delete(url)
          .then(function (resp) {
            //console.log('resolved');
            deferred.resolve(resp);
          }, function (error) {
            //console.log('error');
            deferred.reject(error);
          }, function (updates) {
            //console.log('updates');
            deferred.update(updates);
          });
        return deferred.promise;
      },
      doUpdateCall: function (url, data, config) {
        if (!config) {
          config = {
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache"
            }
          };
        }
        var deferred = $q.defer();
        //console.log(data);
        $http.put(url, data, config)
          .then(function (resp) {
            //console.log('resolved');
            deferred.resolve(resp);
          }, function (error) {
            //console.log('error');
            deferred.reject(error);
          }, function (updates) {
            //console.log('updates');
            deferred.update(updates);
          });
        return deferred.promise;
      }
    };
  });



