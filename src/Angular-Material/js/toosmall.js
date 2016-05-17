angular.module('tooSmall',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('TooSmallCtrl', function($scope) {

        $scope.currentRoomName = "Fishy";

        $scope.obviousExits = "West";

        $scope.textOutput = "blah\nblah\n";
        $scope.textOutput += "blabla\n";

    })

    .config(function($mdThemingProvider) {

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('grey')
            .dark();

    });

