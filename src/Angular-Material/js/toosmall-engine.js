angular.module('tooSmall').factory('tooSmallEngine', ['GameData', function(GameData) {

    var previousRoom = 0;
    var gameData = GameData;

    function parseCommand(command) {
        var words = command.toUpperCase().split(" ",2);
        return {
            'verb': GameData.Verbs.indexOf(words[0]),
            'noun': GameData.Nouns.indexOf(words[1])
        };
    }

    function getCurrentRoom() {
        return gameData.Rooms[gameData.CurrentRoom];
    }

    function makeMessage(icon, messages) {
        return {
            'icon': icon,
            'messages': messages
        };
    }

    function makeUserMessage(messages) {
        return {
            'icon': 'person',
            'messages': messages,
            'user': true
        };
    }

    function describeItems() {
        var items = [];

        angular.forEach(gameData.Items, function(item) {
            if( item.Room == gameData.CurrentRoom ) {
                items.push(item.Name);
            }
        });

        if( items.length > 0 ) {
            items = ['You can see:'].concat(items);
        }

        return items;
    }

    function describeRoom() {
        var room = gameData.Rooms[gameData.CurrentRoom];
        var messages = [room.Name,room.Description];
        messages = messages.concat(describeItems());
        return makeMessage('room', messages);
    }

    function execute(command) {
        var previousRoom = gameData.CurrentRoom;
        var messages = [];

        // feed back user commands
        messages.push(makeUserMessage([command]));

        // handle command
        var parsed = parseCommand(command);

        // output room description, if we've moved
        if( gameData.currentRoom != previousRoom ) {
            messages.push(describeRoom());
        }

        return messages;
    }

    return {
        'execute': execute,
        'getCurrentRoom': getCurrentRoom,
        'describeRoom': describeRoom
    };

}]);


