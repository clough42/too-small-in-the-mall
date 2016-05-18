angular.module('tooSmall').controller('TooSmallCtrl', ['$scope', 'tooSmallEngine', function($scope, tooSmallEngine) {

    $scope.currentRoomName = "Unknown";
    $scope.obviousExits = "Unknown";
    $scope.command = '';
    $scope.messageStream = [];
    $scope.gameOver = false;

    var obviousExits = function(room) {
        return (((room.N > 0) ? " North" : "") + ((room.S > 0) ? " South" : "") + ((room.E > 0) ? " East" : "") + ((room.W > 0) ? " West" : "")).trim();
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
        //if( $scope.command ) {
            $scope.gameOver = tooSmallEngine.execute($scope.command, $scope.messageStream);
            updateRoomDisplay();
        //}
        $scope.command = '';
    }

    $scope.restart = function() {
        $scope.gameOver = false;
        $scope.command = "";
        $scope.messageStream = [];
        tooSmallEngine.restart();
        updateRoomDisplay();
    }


    // initialization
    updateRoomDisplay();
    tooSmallEngine.describeRoom($scope.messageStream);

}]);


