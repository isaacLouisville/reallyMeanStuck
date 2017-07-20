app.controller('meetupsController', ['$scope', '$resource',
  function($scope, $resource){
        var Meetup = $resource('/api/meetups/:meetupId', {meetupId: '@_id'});
        console.log(Meetup);
        Meetup.query(function (results) {
          $scope.meetups = results;
        });
        $scope.meetups = []

        $scope.createMeetup = function () {
          var meetup = new Meetup();
          meetup.name = $scope.meetupName;
          meetup.$save(function (result) {
              $scope.meetups.push(result);
              $scope.meetupName = '';
          });
        };

        $scope.updateMeetup = function () {
          var update = Meetup.get({id:$routeParams.id});
          $id = update.id;
          Meetup.update({ id:$id}, update);
        };

        $scope.removeMeetup = function(meetup) {
         var index = $scope.meetups.indexOf(meetup);
        //  console.log("DOOMED", meetup)
         meetup.$delete();

         $scope.meetups.splice(index, 1);
       };
        //updated in the backend
        //--------------------------
  }
]);
