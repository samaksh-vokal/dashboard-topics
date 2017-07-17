'use strict';

/**
 * @ngdoc overview
 * @name okTalkApp
 * @description
 * # okTalkApp
 *
 * Main module of the application.
 */
angular
  .module('okTalkApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'xeditable',
    'ui.bootstrap',
    'ngFileUpload',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/topic.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/channel', {
        templateUrl: 'views/channel.html',
        controller: 'ChannelCtrl',
        controllerAs: 'channel'
      })
      .when('/channelEdit', {
        templateUrl: 'views/channeledit.html',
        controller: 'ChanneleditCtrl',
        controllerAs: 'channelEdit'
      })
      .when('/message', {
        templateUrl: 'views/message.html',
        controller: 'MessageCtrl',
        controllerAs: 'message'
      })
      .when('/topic', {
        templateUrl: 'views/topic.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic'
      })
      .when('/topicview', {
        templateUrl: 'views/topicview.html',
        controller: 'TopicViewCtrl',
        controllerAs: 'topicview'
      })
      .when('/audiogram', {
        templateUrl: 'views/audiogram.html',
        controller: 'AudiogramCtrl',
        controllerAs: 'audiogram'
      })
       .when('/trending', {
        // templateUrl: 'views/trending.html',
        // controller: 'TrendingCtrl',
        // controllerAs: 'trending'
        redirectTo: '/'
      })
       .when('/vokers', {
        templateUrl: 'views/vokers.html',
        controller: 'VokersCtrl',
        controllerAs: 'vokers'
        // redirectTo: '/'
      })
       .when('/notification', {
        templateUrl: 'views/notification.html',
        controller: 'NotificationCtrl',
        controllerAs: 'notification'
        // redirectTo: '/'
      })
       .when('/spam-vokes', {
        templateUrl: 'views/spam.html',
        controller: 'SpamCtrl',
        controllerAs: 'spam'
      })
       .when('/spam-topics', {
        templateUrl: 'views/spam-topics.html',
        controller: 'SpamTopicsCtrl',
        controllerAs: 'stCtrl'
       })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  })
  .directive('bsNavbar', ['$location', function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch(function () {
          return $location.path();
        }, function (path) {
          angular.forEach(element.children(), (function (li) {
            var $li = angular.element(li),
              regex = new RegExp('^' + $li.attr('data-match-route'), 'i'),
              isActive = regex.test(path);
            $li.toggleClass('active', isActive);
          }));
        });
      }
    };
  }])
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://s3-ap-southeast-1.amazonaws.com/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
      //'http://myapp.example.com/clickThru**'
    ]);
  })
  .config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.options = {};
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);
