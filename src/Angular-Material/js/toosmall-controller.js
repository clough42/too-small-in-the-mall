angular.module('tooSmall').controller('TooSmallCtrl', ['$scope', 'tooSmallEngine', function($scope, tooSmallEngine) {

    $scope.currentRoomName = "Unknown";
    $scope.obviousExits = "Unknown";
    $scope.command = '';
    $scope.history = [];

    var obviousExits = function(room) {
        return ((room.N > 0) ? " North" : "") + ((room.S > 0) ? " South" : "") + ((room.E > 0) ? " East" : "") + ((room.W > 0) ? " West" : "").trim();
    }

    function updateRoomDisplay() {
        var room = tooSmallEngine.getCurrentRoom();
        $scope.currentRoomName = room.Name;
        $scope.obviousExits = obviousExits(room);
    }

    function pushArray(array1, array2) {
        array1.push.apply( array1, array2 );
    }

    $scope.submit = function() {
        if( $scope.command ) {
            var result = tooSmallEngine.execute($scope.command);
            pushArray($scope.history, result);
            updateRoomDisplay();
        }
        $scope.command = '';
    }


    // initialization
    updateRoomDisplay();
    $scope.history.push(tooSmallEngine.describeRoom());

}]);


