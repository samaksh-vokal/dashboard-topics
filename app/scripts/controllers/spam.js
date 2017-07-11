angular.module('okTalkApp')
    .controller('SpamCtrl', ['$scope', 'apiFactory', function($scope, apiFactory) {
        'use strict';
        angular.element(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });

        var objR = function(content_id, owner_id) {
            this.content_id = content_id;
            this.owner_id = owner_id;
        };

        var objR2 = function(content_id, owner_id, status) {
            this.content_id = content_id;
            this.owner_id = owner_id;
            this.status = status;
        };

        $scope.getTotal = function(reporters) {
            var reportDetails = {
                spam: 0,
                abuse: 0,
                others: 0
            };
            reporters.forEach(function(element) {

                if (element.report === 1) {
                    reportDetails.spam++;
                } else if (element.report === 2) {
                    reportDetails.abuse++;
                } else {
                    reportDetails.others++;
                }
            }, this);

            return 'spam:(' + reportDetails.spam + ')   abuse:(' + reportDetails.abuse + ') others:(' + reportDetails.others + ')';
        };

        $scope.doAction = function(content_id, action, owner_id) {
            console.log(content_id, action);
            var k = new objR2(content_id, owner_id, "");
            console.log(k);
            apiFactory.doUpdateCall('http://api.oktalk.com/v1/users/report/' + action, k).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.doUndo = function(item) {
            console.log(item);
            var status = 200 + item.report % 10;
            var k = new objR2(item.content_id, item.owner_id, status);
            console.log(k);
            apiFactory.doUpdateCall('http://api.oktalk.com/v1/users/reportc/undo', k).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.doActionFromIgnored = function(item, type) {
            console.log(item);
            var status = item.report % 10;
            if (type === "spam_undo") {
                status += 100;
            } else {
                status += 150;
            }
            var k = new objR2(item.content_id, item.owner_id, status);
            console.log(k);
            apiFactory.doUpdateCall('http://api.oktalk.com/v1/users/report/' + type, k).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.languages = ['all', 'en', 'kn', 'hi', 'ta'];
        $scope.lang = 'all';
        $scope.types = ['reported', 'removed', 'ignored'];
        $scope.type = 'reported';

        $scope.clear = function() {
            $scope.dt = null;
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
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
        $scope.open1 = function() {
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
        $scope.getPeople = function(reporters) {
            var x = [];
            var k = '';
            reporters.forEach(function(element) {
                // console.log(element)
                k = element.handle + '|' + element.user_id + '|' + $scope.getName(element.report);
                x.push(k);
            }, this);
            return x;
        };

        $scope.getData = function() {
            if ($scope.type === "reported") {
                $scope.show(1);
            } else if ($scope.type === "ignored") {
                $scope.show(2);
            } else {
                $scope.show(3);
            }
            $scope.url = 'http://api.oktalk.com/v1/users/spam/' + $scope.type + '?lang=' + $scope.lang + '&from=' + formatDate($scope.channel.dt) + '&to=' + formatDate($scope.channel.dt2);
            apiFactory.doGetCall($scope.url)
                .then(function(response) {
                        console.log(response.data);
                        $scope.reports = response.data.report;
                    },
                    function(err) {
                        console.log(err);
                        $scope.reports = '';
                    });
        };

        $scope.getName = function(num) {
            var arr = ['-', 'Spam', 'Abusive', 'Others'];
            return arr[num] || '';
        };

        $scope.show = function(item) {
            $scope.box1 = item === 1 ? true : false;
            $scope.box2 = item === 2 ? true : false;
            $scope.box3 = item === 3 ? true : false;
        };

    }])
    .controller('SpamTopicsCtrl', ['$scope', 'apiFactory', function($scope, apiFactory) {
        'use strict';
        // Enable tooltips
        angular.element(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });

        $scope.languages = ['all', 'en', 'kn', 'hi', 'ta'];
        $scope.lang = 'all';
        $scope.types = ['reported', 'removed', 'ignored'];
        $scope.type = 'reported';
        var baseURL = "http://api.oktalk.com/web/topics/";

        // Datepicker stuff
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.popup2 = {
            opened: false
        };
        $scope.popup1 = {
            opened: false
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.clear = function() {
            $scope.dt = null;
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

        $scope.show = function(item) {
            $scope.box1 = item === "reported" ? true : false;
            $scope.box2 = item === "ignored" ? true : false;
            $scope.box3 = item === "removed" ? true : false;
        };

        // Get total spam details to display
        $scope.getTotal = function(reporters) {
            var reportDetails = {
                spam: 0,
                abuse: 0,
                disliked: 0,
                others: 0
            };
            reporters.forEach(function(element) {
                console.log(element.report);
                switch (element.report) {
                    case 1:
                        reportDetails.spam++;
                        break;
                    case 2:
                        reportDetails.abuse++;
                        break;
                    case 3:
                        reportDetails.disliked++;
                        break;
                    default:
                        reportDetails.others++;
                }
            }, this);
            return 'Spam: (' + reportDetails.spam + ') ' +
                   'Abusive: (' + reportDetails.abuse + ') ' +
                   'Disliked: (' + reportDetails.disliked + ') ' +
                   'Others: (' + reportDetails.others + ')';
        };

        // Get the reported topics
        $scope.getData = function() {
            $scope.url = baseURL + 'spam/' + $scope.type + '?lang=' + $scope.lang + '&from=' + formatDate($scope.channel.dt) + '&to=' + formatDate($scope.channel.dt2);
            apiFactory.doGetCall($scope.url)
                .then(function(response) {
                        console.log(response.data);
                        $scope.reports = response.data.report;
                        // Show the related buttons
                        $scope.show($scope.type);
                    }, function(err) {
                        console.log(err);
                        $scope.reports = '';
                    }
                );
        };

        var objR2 = function(topic_id, owner_id, status) {
            this.topic_id = topic_id;
            this.owner_id = owner_id;
            this.status = status;
        };

        $scope.doAction = function(topic_id, action, owner_id) {
            console.log(topic_id, action);
            var k = new objR2(topic_id, owner_id, "");
            console.log(k);
            apiFactory.doUpdateCall(baseURL + 'report/' + action, k)
                .then(function(response) {
                    console.log("hi");
                    console.log(response.data);
                    $scope.getData();
                });
        };

        $scope.doUndo = function(item) {
            console.log(item);
            var status = 200 + item.report % 10;
            var k = new objR2(item.topic_id, item.owner_id, status);
            console.log(k);
            apiFactory.doUpdateCall(baseURL + 'reportc/undo', k).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };

        $scope.doActionFromIgnored = function(item, type) {
            console.log(item);
            var status = item.report % 10;
            if (type === "spam_undo") {
                status += 100;
            } else {
                status += 150;
            }
            var k = new objR2(item.topic_id, item.owner_id, status);
            console.log(k);
            apiFactory.doUpdateCall(baseURL + 'report/' + type, k).then(function(response) {
                console.log(response.data);
                $scope.getData();
            });
        };


        $scope.getPeople = function(reporters) {
            var x = [];
            var k = '';
            reporters.forEach(function(element) {
                // console.log(element)
                k = element.handle + '|' + element.user_id + '|' + $scope.getName(element.report);
                x.push(k);
            }, this);
            return x;
        };


        $scope.getName = function(num) {
            var arr = [_, 'Spam', 'Abusive', 'Disliked', 'Others'];
            return arr[num] || '';
        };

    }]);
