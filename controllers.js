angular.module('starter')

.controller('AppCtrl', function($state,$scope, $ionicModal,$ionicPopup,$timeout,$cordovaSQLite) {

  // Form data for the login modal
  $scope.loginData = {
    username:"sai",
    password:"venky99999"
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();


  };

  // Open the login modal
  $scope.login = function() {

     $state.go('login');
  };

$scope.showToast = function() {
  if($scope.loginData.username=="sai" && $scope.loginData.password=="venky99999")
    {
      window.plugins.toast
        .show("Login Successful!Welcome "+ $scope.loginData.username , 'short', 'bottom')
        .then(function(success) {
          console.log('Success');
        }, function (error) {
          console.log('Error');
        });
      }
      else
      {
        window.plugins.toast
        .show("Login Failed!", 'short', 'bottom')
        .then(function(success) {
          console.log('Success');
        }, function (error) {
          console.log('Error');
        });

      }
    };
  


$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Alert',
     template: 'Please enter correct username/password'
   });

   alertPopup.then(function(res) {
     console.log('alert message');
   });
 };





  $scope.insertVal = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }
 
    $scope.selectVal = function(lastname) {
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
     
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    if($scope.loginData.username=="sai" && $scope.loginData.password=="venky99999")
    {
               
      $scope.closeLogin();
     $state.go('app.browse');
          
  }
  else{
    $scope.showAlert();     
    $scope.login();
  };
}
})
.controller('ListController',['$scope','$http','Speaker','SERVER_PATH',function($scope,$http,Speaker,SERVER_PATH){
  $scope.serverPath = SERVER_PATH;
      Speaker.all().success(function(speakers) {
        $scope.speakers = speakers;
      });
 
  $scope.moveItem = function(speaker,fromIndex,toIndex){
    $scope.speakers.splice(fromIndex, 1);
    $scope.speakers.splice(toIndex,0,speaker);
  };
  $scope.onItemDelete = function(speaker){
    $scope.speakers.splice($scope.speakers.indexOf(speaker),1);
  };
}]);
