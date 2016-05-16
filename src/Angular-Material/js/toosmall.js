angular.module('tooSmall',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('TooSmallCtrl', function($scope) {

    })

    .config(function($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('grey')
            .dark();

    });

