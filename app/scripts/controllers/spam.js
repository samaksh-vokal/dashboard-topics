angular.module('okTalkApp')
    .controller('SpamCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
        angular.element(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });

        // $scope.reports = [{"title":"Asdfghjjlljgf","reporters":[{"user_id":765,"report":1,"phone":"8217306529","name":"ராஜா","handle":"ikik"}],"profile_image":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagingbucket/user_742/ab0ded71-cd16-463f-aac1-2584d5ebf544_voke_img_crop_f85216b9-46ed-4e09-a473-8fa83f090c29.jpg","payload":"https://s3-ap-southeast-1.amazonaws.com/oktalk.video/630f601e-3a0f-11e7-b89e-066de2de0677.mp3","name":"Aman 😇😁","lang":"ta","img":null,"handle":"aman.arora879t","created_at":"2017-05-17T08:54:59Z","count":1,"content_id":"630f601e-3a0f-11e7-b89e-066de2de0677"},{"title":"Dkxjxkckccjxixixidud","reporters":[{"user_id":537,"report":1,"phone":"7411125418","name":"samsung hefhhg fhh","handle":"samsung"}],"profile_image":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagingbucket/user_991/aad6f004-b9fd-431c-8335-32c02e1f354e_voke_img_crop_2f18b373-5d16-4cab-871b-da0b0dbd44ea.jpg","payload":"https://s3-ap-southeast-1.amazonaws.com/oktalk.video/9ec0ad94-3617-11e7-ab8c-066de2de0677.mp3","name":"vyshak5","lang":"kn","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/sim1/voke_img_crop_f4fa3b60-67bc-4bc9-8fd4-77d59b634354.jpg","handle":"vyshak5","created_at":"2017-05-17T09:45:11Z","count":1,"content_id":"9ec0ad94-3617-11e7-ab8c-066de2de0677"},{"title":"Gbbbjgdssdfgg","reporters":[{"user_id":742,"report":1,"phone":"7795023069","name":"Aman 😇😁","handle":"aman.arora879t"}],"profile_image":"","payload":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/shweta.gqebbdk/c5c4ab8d-4af0-481c-bf4b-123a334fcc4d1493924848602.mp3","name":"testhkmznx","lang":"hi","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/aman.arora879t/voke_img_crop_454ed690-b910-46ca-abc5-7e171a2cd468.jpg","handle":"shweta.gqebbdk","created_at":"2017-05-10T12:50:07Z","count":1,"content_id":"ea3631ec-30fc-11e7-89b4-066de2de0677"},{"title":"Vkbivibobobob","reporters":[{"user_id":742,"report":2,"phone":"7795023069","name":"Aman 😇😁","handle":"aman.arora879t"}],"profile_image":"","payload":"https://s3-ap-southeast-1.amazonaws.com/oktalk.video/51a47b14-354d-11e7-9ce4-066de2de0677.mp3","name":"Aniruddha","lang":"hi","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/vokalani/voke_img_crop_51be5042-fb38-4c15-b736-0db274a4eeea.jpg","handle":"vokalani","created_at":"2017-05-10T12:55:53Z","count":1,"content_id":"51a47b14-354d-11e7-9ce4-066de2de0677"},{"title":"Dvhfhdhfufjgfyuig","reporters":[{"user_id":742,"report":2,"phone":"7795023069","name":"Aman 😇😁","handle":"aman.arora879t"}],"profile_image":"","payload":"https://s3-ap-southeast-1.amazonaws.com/oktalk.video/7d439cb4-34ad-11e7-804f-066de2de0677.mp3","name":"vyshak3","lang":"hi","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/dhvb/voke_img_crop_0d2aad10-cb68-4420-a39a-6f24ae179bb0.jpg","handle":"vyshak3","created_at":"2017-05-10T13:00:04Z","count":1,"content_id":"7d439cb4-34ad-11e7-804f-066de2de0677"},{"title":"Gbbbjgdssdfgg","reporters":[{"user_id":742,"report":2,"phone":"7795023069","name":"Aman 😇😁","handle":"aman.arora879t"}],"profile_image":"","payload":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/shweta.gqebbdk/31284ff7-50d2-4dcd-9ecb-6151e84e7d201493925149059.mp3","name":"testhkmznx","lang":"hi","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/aman.arora879t/voke_img_crop_454ed690-b910-46ca-abc5-7e171a2cd468.jpg","handle":"shweta.gqebbdk","created_at":"2017-05-10T12:50:00Z","count":1,"content_id":"9dc57ca4-30fd-11e7-9310-066de2de0677"},{"title":"Qqqqqqqqqwwww","reporters":[{"user_id":742,"report":2,"phone":"7795023069","name":"Aman 😇😁","handle":"aman.arora879t"}],"profile_image":"","payload":"https://s3-ap-southeast-1.amazonaws.com/oktalk.video/a661cdb4-34ad-11e7-a713-066de2de0677.mp3","name":"vyshak3","lang":"hi","img":"https://s3-ap-southeast-1.amazonaws.com/ok.talk.stagechannels/shweta.gqebbdk/voke_img_crop_1491c207-fd79-414a-b993-3f8217da60be.jpg","handle":"vyshak3","created_at":"2017-05-10T12:59:18Z","count":1,"content_id":"a661cdb4-34ad-11e7-a713-066de2de0677"}];

        var objR = function(content_id, owner_id) {
            this.content_id = content_id;
            this.owner_id = owner_id;
        }

        var objR2 = function(content_id, owner_id,status){
            this.content_id = content_id;
            this.owner_id = owner_id;
            this.status = status;
        }


        $scope.getTotal = (reporters) => {
            var reportDetails = {
                spam: 0,
                abuse: 0,
                others: 0
            };
            reporters.forEach(function (element) {

                if (element.report === 1) {
                    reportDetails.spam++
                } else if (element.report === 2) {
                    reportDetails.abuse++
                } else {
                    reportDetails.others++
                }
            }, this);

            return 'spam:(' + reportDetails.spam + ')   abuse:(' + reportDetails.abuse + ') others:(' + reportDetails.others + ')';
        };

        $scope.doAction = (content_id, action, owner_id) => {
            console.log(content_id, action);
            var k = new objR2(content_id, owner_id,"");
            console.log(k);
            apiFactory.doUpdateCall('http://int.oktalk.com/v1/users/report/' + action, k).then(function (response) {
                console.log(response.data);
                $scope.getData()
            });
        }

        $scope.doUndo = (item) => {
            console.log(item);
            var status =200+ item.report%10;
            var k = new objR2(item.content_id, item.owner_id,status);
            console.log(k);
            apiFactory.doUpdateCall('http://int.oktalk.com/v1/users/reportc/undo',k).then(function (response) {
                console.log(response.data);
                $scope.getData();
            });
        }

          $scope.doActionFromIgnored = (item,type) => {
            console.log(item);
            var status = item.report%10;
            if(type === "spam_undo"){
                status +=100;
            }else{
                status +=150;
            }
            var k = new objR2(item.content_id, item.owner_id,status);
            console.log(k);
            apiFactory.doUpdateCall('http://int.oktalk.com/v1/users/report/'+type,k).then(function (response) {
                console.log(response.data);
                $scope.getData()
            });
        }

        $scope.languages = ['all', 'en', 'kn', 'hi', 'ta'];
        $scope.lang = 'all';
        $scope.types = ['reported', 'removed', 'ignored'];
        $scope.type = 'reported';

        $scope.clear = function () {
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
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };
       
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
        $scope.getPeople = (reporters) => {
            var x = [];
            var k = '';
            reporters.forEach(function (element) {
                // console.log(element) 
                k = element.handle + '|' + element.user_id + '|' + $scope.getName(element.report);
                x.push(k);
            }, this);
            return x;
        };

        $scope.getData = () => {
            if ($scope.type === "reported") {
              $scope.show(1);
            } else if ($scope.type === "removed") {
                $scope.show(2);
            } else {
              $scope.show(3);
            }
            $scope.url = 'http://int.oktalk.com/v1/users/spam/' + $scope.type + '?lang=' + $scope.lang + '&from=' + formatDate($scope.channel.dt) + '&to=' + formatDate($scope.channel.dt2);
            apiFactory.doGetCall($scope.url)
                .then(function (response) {
                    console.log(response.data);
                    $scope.reports = response.data.report;
                },
                function (err) {
                    console.log(err);
                    $scope.reports = '';
                });
        }

        $scope.getName = (num) => {
            var arr = ['-', 'Spam', 'Abusive', 'Others']
            return arr[num] || '';
        };

        $scope.show = (item) => {
            if (item === 1) {
                $scope.box1=true;
                $scope.box2 = false;
                $scope.box3=false;
            } else if (item === 2) {
                $scope.box1=false;
                $scope.box2 = false;
                $scope.box3=true;
            } else {
                $scope.box1=false;
                $scope.box2 = true;
                $scope.box3=false;
            }

        }

    }
    ]);