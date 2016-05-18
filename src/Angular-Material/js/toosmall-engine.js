angular.module('tooSmall').factory('tooSmallEngine', ['GameData', function(GameData) {

    var gameData = GameData;

    var parseCommand = function(command) {
        var words = command.toUpperCase().split(" ",2);
        return {
            'verb': GameData.Verbs.indexOf(words[0]),
            'noun': GameData.Nouns.indexOf(words[1])
        };
    }

    var execute = function(command) {
        var parsed = parseCommand(command);
        return {
            'icon': 'person',
            'messages': [ command ]
        };
    }

    return {
        'execute': execute
    };

}]);


