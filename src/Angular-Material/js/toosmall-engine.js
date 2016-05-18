angular.module('tooSmall').factory('tooSmallEngine', ['GameData', function(GameData) {

    var previousRoom = 0;
    var gameData = GameData;

    function tokenize(list, word) {
        var num = 0;

        if (word) {
            for (i = 1; i < list.length; i++) {
                var listword = list[i].substring(0, 3);
                word = word.substring(0, 3);
                if (word == listword) {
                    num = i;
                }
            }
        }
        return num;
    }

    function parseCommand(command) {
        var words = command.toUpperCase().split(" ",2);
        return {
            'verb': tokenize(GameData.Verbs, words[0]),
            'noun': tokenize(GameData.Nouns, words[1])
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
        var message = makeMessage('person', messages);
        message.user = true;
        return message;
    }

    function makeErrorMessage(message)
    {
        return makeMessage('error', [message]);
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

    function describeRoom(messageStream) {
        var room = gameData.Rooms[gameData.CurrentRoom];
        var messages = [room.Name,room.Description];
        messages = messages.concat(describeItems());
        messageStream.push(makeMessage('room', messages));
    }

    function Errorout(errorNum, insert, messageStream)
    {
        switch (errorNum)
        {
            case 0:
                messageStream.push(makeErrorMessage("Speak, O short one."));
                return;

            case 1:
                messageStream.push(makeErrorMessage("I don't understand.  Try different words."));
                return;

            case 2:
                messageStream.push(makeErrorMessage("You can't " + insert + " that."));
                return;

            case 3:
                messageStream.push(makeErrorMessage("I don't see that object here."));
                return;

            case 4:
                messageStream.push(makeErrorMessage("You already have it in your posession."));
                return;

            case 5:
                messageStream.push(makeErrorMessage("You do not have it in your posession."));
                return;

            case 6:
                messageStream.push(makeErrorMessage("You aren't strong enough."));
                return;

            case 7:
                messageStream.push(makeErrorMessage("In your shrunken state, you cannot carry any more than your current load."));
                return;
        }
    }

    function Go(VerbToken, messageStream)
    {
        var flag;
        switch (VerbToken)
        {
            case 0x12:
            case 0x16:
                flag = gameData.Rooms[gameData.CurrentRoom].N == 0;
                if (!flag)
                {
                    gameData.CurrentRoom = gameData.Rooms[gameData.CurrentRoom].N;
                }
                break;

            case 0x13:
            case 0x17:
                flag = gameData.Rooms[gameData.CurrentRoom].S == 0;
                if (!flag)
                {
                    gameData.CurrentRoom = gameData.Rooms[gameData.CurrentRoom].S;
                }
                break;

            case 20:
            case 0x18:
                flag = gameData.Rooms[gameData.CurrentRoom].E == 0;
                if (!flag)
                {
                    gameData.CurrentRoom = gameData.Rooms[gameData.CurrentRoom].E;
                }
                break;

            case 0x15:
            case 0x19:
                flag = gameData.Rooms[gameData.CurrentRoom].W == 0;
                if (!flag)
                {
                    gameData.CurrentRoom = gameData.Rooms[gameData.CurrentRoom].W;
                }
                break;

            default:
                Errorout(1, "", messageStream);
                return false;
        }
        if (flag)
        {
            messageStream.push(makeErrorMessage("You can`t go in that direction."));
            return false;
        }
        return true;
    }



    function Climb(NounToken, messageStream)
    {
        var flag;
        if (NounToken == 0)
        {
            flag = false;
            Errorout(1, "", messageStream);
            return flag;
        }
        flag = true;
        if (NounToken != 0x25)
        {
            messageStream.push(makeErrorMessage("You can't climb that."));
            return flag;
        }
        if ((gameData.CurrentRoom != 0x2e) && (gameData.CurrentRoom != 0x2c))
        {
            messageStream.push(makeErrorMessage("I don't see it here."));
            return flag;
        }
        switch (gameData.CurrentRoom)
        {
            case 0x2c:
                gameData.CurrentRoom = 0x2e;
                return flag;

            case 0x2d:
                return flag;

            case 0x2e:
                gameData.CurrentRoom = 0x2c;
                return flag;
        }
        return flag;
    }

    function handleUserCommand(command, messageStream) {
        // handle command
        var parsed = parseCommand(command);

        switch( parsed.verb ) {
            case 0:
                if( command.length != 0 ) {
                    Errorout(1, "", messageStream);
                    return;
                }
                Errorout(0, "", messageStream);
                return;

            case 14:
            case 0x1a:
                return Go(parsed.noun - 0x16, messageStream);

            case 0x11:
                return Climb(parsed.noun, messageStream);

            case 0x12:
            case 0x13:
            case 20:
            case 0x15:
            case 0x16:
            case 0x17:
            case 0x18:
            case 0x19:
                return Go(parsed.verb, messageStream);
        }
    }

    function execute(command, messageStream) {
        var previousRoom = gameData.CurrentRoom;

        // feed back user commands
        messageStream.push(makeUserMessage([command]));

        // handle command
        var ret = handleUserCommand(command, messageStream);

        // output room description, if we've moved
        if( gameData.CurrentRoom != previousRoom ) {
            describeRoom(messageStream)
        }

        return ret;
    }

    return {
        'execute': execute,
        'getCurrentRoom': getCurrentRoom,
        'describeRoom': describeRoom
    };

}]);


