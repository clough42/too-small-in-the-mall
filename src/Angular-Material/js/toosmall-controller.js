angular.module('tooSmall').controller('TooSmallCtrl', ['$scope', 'tooSmallEngine', function($scope, tooSmallEngine) {

    $scope.currentRoomName = "Unknown";
    $scope.obviousExits = "Unknown";
    $scope.command = '';
    $scope.history = [];

    $scope.submit = function() {
        if( $scope.command ) {
            result = tooSmallEngine.execute($scope.command);
            $scope.history.push( result );
        }
        $scope.command = '';
    }

}]);


