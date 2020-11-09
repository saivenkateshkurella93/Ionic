// Ionic Starter App

var db=null;
angular.module('starter', ['ionic','ngResource','ngCordova'])

.run(function($ionicPlatform,$state,$ionicHistory,$cordovaSQLite) {

$ionicPlatform.registerBackButtonAction(function (event) {
 // var db = null;
   if($state.current.name=="app.browse"){
      navigator.app.exitApp();
    }
    else if ($state.current.name=="app.session")
    {
       $state.go('app.sessions');
 
    }
    else if ($state.current.name=="app.speaker")
    {
       $state.go('app.speakers');
 
    }

    else {
      //navigator.app.backHistory();
         // $state.go('app.browse');

         $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $state.go('app.browse');

    }
  }, 100);





  $ionicPlatform.ready(function() {
    // Hiding the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)






var now = new Date().getTime(),
        _5_sec_from_now = new Date(now + 5*1000);

cordova.plugins.notification.local.schedule({
    id: 1,
    text: "Test Notification for every hour",
    firstAt: _5_sec_from_now,
    every: "hour" // "minute", "hour", "week", "month", "year"
});

  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB({ name: 'my.db',location: 'default'});
    console.log($cordovaSQLite.openDB({ name: 'my.db',location: 'default'}));
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
})


/*.config(function($stateProvider, $urlRouterProvider,$ionicPlatform) {
   $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.home"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
    })*/


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
  .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
    
 
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AppCtrl'


  })


  

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller : 'ListController'
      }
    }
  })


 .state('app.startpage', {
    url: '/startpage',
    views: {
      'menuContent': {
        templateUrl: 'templates/startpage.html',
        controller : 'AppCtrl'
      }
    }
  })

  .state('app.sessions', {
    url: "/sessions",
    views: {
      'menuContent' :{
        templateUrl: "templates/sessions.html",
        controller: "SessionListCtrl"
      }
    }
  })


  .state('app.aboutus', {
    url: "/learn",
    views: {
      'menuContent' :{
        templateUrl: "templates/learn.html",
        controller: "SessionListCtrl"
      }
    }
  })

  .state('app.session', {
    url: "/sessions/:sessionId",
    views: {
      'menuContent' :{
        templateUrl: "templates/session.html",
        controller: "SessionCtrl"
      }
    }
  })
  .state('app.speakers', {
    url: "/speakers",
    views: {
      'menuContent' :{
        templateUrl: "templates/speakers.html",
        controller: "SpeakerListCtrl"
      }
    }
  })
 .state('app.address', {
    url: "/address",
    views: {
      'menuContent' :{
        templateUrl: "templates/address.html",
        controller: "MapController"
      }
    }
  })
 .state('app.videos', {
    url: "/videos",
    views: {
      'menuContent' :{
        templateUrl: "templates/videos.html",
        controller: "VideosCtrl"
      }
    }
  })
 .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent' :{
        templateUrl: "templates/contact.html", 
                controller: "ContactCtrl"

      }
    }
  })
 

  .state('app.speaker', {
    url: "/speakers/:speakerId",
    views: {
      'menuContent' :{
        templateUrl: "templates/speaker.html",
        controller: "SpeakerCtrl"
      }
    }
  });
  // if none of the above states are matched, login is the fallback
  $urlRouterProvider.otherwise('/login');
})
.constant('SERVER_PATH','http://localhost:5000')
 // Services
 .factory('Speaker', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/speakers');
    },
    get: function(speakerId) {
      return $http.get(SERVER_PATH + '/speakers/' + speakerId);
    }
  };
})
 .factory('Session', function ($resource) {
  return $resource('http://localhost:5000/sessions/:sessionId');
})
    //Controllers
    .controller('SpeakerListCtrl', function ($scope, Speaker, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.speakers = [];
      Speaker.all().success(function(speakers) {
        $scope.speakers = speakers;
      });
      $scope.doRefresh = function() {
        $scope.speakers = Speaker.all().success(function(speakers) {
          $scope.speakers = speakers;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
    })

    .controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      Speaker.get($stateParams.speakerId).success(function(speaker) {
        $scope.speaker = speaker;
      });
    })


 .controller('VideosCtrl', function ($scope, $stateParams, Speaker, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.stopVideo = function() {

 var iframe = document.getElementsByTagName("iframe")[0].contentWindow;

   iframe.postMessage('{"event":"command","func":"' + 'stopVideo' +   '","args":""}', '*');
}
      
    })

    .controller('MenuCtrl', function($state,$scope, $ionicModal, $ionicPopup,$timeout,$window) {
       $scope.loginData = {
    username:"sai",
    password:"venky99999"
  };
      $scope.login = function() {
    //    $scope.insertVal("Sai","Venkatesh");
//$scope.selectVal("Venkatesh");
     $state.go('login');
  };


    $scope.pauseVideo = function() {

            var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
           iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' +   '","args":""}', '*');
        }


        $scope.playVideo = function() {
            var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
           iframe.postMessage('{"event":"command","func":"' + 'playVideo' +   '","args":""}', '*');
        }


         



        $scope.$on('$ionicView.beforeLeave', function(){
         
            $scope.pauseVideo();
        });

        $scope.$on('$ionicView.enter', function(){
            $scope.playVideo();
        });

   })


 .controller('ContactCtrl', function ($scope,$state,$cordovaSQLite,$stateParams,Session,SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.insertVal = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }
    $scope.names=[];
 
    $scope.selectVal = function() {
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query,[]).then(function(res) {
            if(res.rows.length > 0) {
                  for(var i=0; i<res.rows.length; i++)
                  {
         //$scope.res.push(res.rows.item(i));
                console.log("SELECTED -> " + res.rows.item(i).firstname + " " + res.rows.item(i).lastname);
                $scope.names.push({fname:res.rows.item(i).firstname ,
                  lname:res.rows.item(i).lastname
                });

                
              }
             // $state.go('app.videos');
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

    })

    .controller('SessionListCtrl', function ($scope, Session, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.sessions = Session.query();
    })

    .controller('SessionCtrl', function ($scope, $stateParams, Session, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.session = Session.get({sessionId: $stateParams.sessionId});
    })

.controller('MapController', function($scope, $ionicLoading,$stateParams, Session, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
      $scope.session = Session.get({sessionId: $stateParams.sessionId});
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
    });
 
});
