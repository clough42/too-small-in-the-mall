angular.module('tooSmall').factory('tooSmallEngine', ['GameData', function(GameData) {

    var previousRoom = 0;
    var gameData = JSON.parse(JSON.stringify(GameData));

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

    function makeSuccessMessage(message)
    {
        return makeMessage('done', [message]);
    }

    function describeItems() {
        var items = [];

        angular.forEach(gameData.Items, function(item) {
            if( item.Room == gameData.CurrentRoom ) {
                items.push(item.Name);
            }
        });

        if( items.length > 0 ) {
            items = ['You can see: ' + items.join(", ")];
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

    function Take(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
        }
        else if ((gameData.Items[NounToken].Room != gameData.CurrentRoom) || (gameData.Items[NounToken].Condition == 2))
        {
            if (gameData.Items[NounToken].Condition == 2)
            {
                messageStream.push(makeErrorMessage("You cannot move it because one of the wheels is broken and you're not bigenough to carry it."));
            }
            else if (gameData.Items[NounToken].Room == 0)
            {
                Errorout(4, "", messageStream);
            }
            else
            {
                Errorout(3, "", messageStream);
            }
        }
        else
        {
            if (gameData.Inventory < 5)
            {
                if ((gameData.Items[NounToken].Carry == 1) || ((gameData.Items[NounToken].Carry == 2) && gameData.Strength))
                {
                    gameData.Items[NounToken].Room = 0;
                    gameData.Inventory++;
                    messageStream.push(makeSuccessMessage(gameData.Items[NounToken].Name + " taken."));
                }
                else
                {
                    Errorout(6, "", messageStream);
                }
            }
            else
            {
                Errorout(7, "", messageStream);
            }
            return true;
        }
        return false;
    }

    function Drop(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        if (gameData.Items[NounToken].Room != 0)
        {
            Errorout(5, "", messageStream);
            return false;
        }
        gameData.Items[NounToken].Room = gameData.CurrentRoom;
        gameData.Inventory--;
        messageStream.push(makeSuccessMessage(gameData.Items[NounToken].Name + " dropped."));
        return true;
    }

    function ThrowFunc(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        if (gameData.Items[NounToken].Room != 0)
        {
            Errorout(5, "", messageStream);
            return false;
        }
        if (gameData.CurrentRoom == 0x2e)
        {
            gameData.Items[NounToken].Room = 0x2c;
        }
        else
        {
            gameData.Items[NounToken].Room = gameData.CurrentRoom;
        }
        gameData.Inventory--;
        messageStream.push(makeSuccessMessage(gameData.Items[NounToken].Name + " thrown."));
        return true;
    }

    function Guard(messageStream)
    {
        if (gameData.Items[6].Room == 0)
        {
            messageStream.push(makeMessage('not_interested', ["The guard sneezes and wakes up.  Deciding that he had better go do his rounds, "+
                "he gets up.  He is still sleepy enough that he doesn''t even notice when he " +
                "steps on you on his way out of the room."]));
            gameData.Dead = true;
        }
        else
        {
            messageStream.push(makeMessage('play_arrow', ["The guard is snoring loudly."]));
        }
    }

    function Milbourne29(messageStream)
    {
        if (gameData.Items[11].Room == 0)
        {
            messageStream.push(makeMessage('play_arrow', ["Janine the cat pounces on you and steals your gum, but when she tries to "+
                "eat it, she gets all tangled up and her ferocious jaws become fused."]));
            gameData.Items[11].Room = gameData.CurrentRoom;
            gameData.Inventory--;
            gameData.Items[11].Carry = 0;
        }
        else if (gameData.Items[11].Room == gameData.CurrentRoom)
        {
            messageStream.push(makeMessage('play_arrow', ["Janine is rolling around in the corner, tangled in a wad of bubble gum."]));
        }
        else
        {
            messageStream.push(makeMessage('not_interested', ["Janine the cat jumps on you and begins to eat.  You are now quite dead."]));
            gameData.Dead = true;
        }
    }

    function Rat(messageStream)
    {
        if (gameData.Items[0x20].Room == 0x25)
        {
            messageStream.push(makeMessage('play_arrow', ["The rat pounces on the cheese and it is gone almost instantly.  The rat then turns its head back in your direction in a threatening manner."]));
            gameData.Items[0x20].Room = 0xff;
        }
        else if (gameData.Items[0x20].Room == 0)
        {
            messageStream.push(makeMessage('play_arrow', ["The rat seems to be begging for something"]));
        }
        else
        {
            messageStream.push(makeMessage('not_interested', ["The rat pounces on you and you are soon quite dead."]));
            gameData.Dead = true;
        }
    }

    function Milbourne36(messageStream)
    {
        if (gameData.Items[0x27].Room == gameData.CurrentRoom)
        {
            messageStream.push(makeMessage('play_arrow',["Janine the cat is busily chewing on the cat toy."]));
        }
        else
        {
            messageStream.push(makeMessage('not_interested',["Janine, because she has nothing else to play with, decides to chew on you for a while.  You have become quite dead."]));
            gameData.Dead = true;
        }
    }

    function Parrot(messageStream)
    {
        var num = Math.floor(Math.random() * 10);
        switch (num)
        {
            case 0:
                messageStream.push(makeMessage('chat', ["From the parrot: Hello, Hello"]));
                return;

            case 1:
                messageStream.push(makeMessage('chat', ["From the parrot: Haaa! Ha! Ha! Ha! Haaa!"]));
                return;

            case 2:
                messageStream.push(makeMessage('chat', ["From the parrot: Beware of large cats."]));
                return;

            case 3:
                messageStream.push(makeMessage('chat', ["From the parrot: Violence will accomplish nothing."]));
                return;

            case 4:
                messageStream.push(makeMessage('chat', ["From the parrot: A penny saved is a penny."]));
                return;

            case 5:
                messageStream.push(makeMessage('chat', ["From the parrot: Nothing is ever as simple as it first seems."]));
                return;

            case 6:
                messageStream.push(makeMessage('chat', ["From the parrot: Go West, Short One, go West."]));
                return;

            case 7:
                messageStream.push(makeMessage('chat', ["From the parrot: The hospital called, your brain is ready."]));
                return;

            case 8:
                messageStream.push(makeMessage('chat', ["From the parrot: I'm allergic to cats."]));
                return;

            case 9:
                messageStream.push(makeMessage('chat', ["From the parrot: Leftover nuts never match leftover bolts."]));
                return;
        }
    }

    function Animate(messageStream)
    {
        for (i = 1; i < gameData.Items.length; i++)
        {
            if ((gameData.Items[i].Carry == 3) && (gameData.Items[i].Room == gameData.CurrentRoom))
            {
                switch (i)
                {
                    case 28:
                        Guard(messageStream);
                        break;

                    case 29:
                        Milbourne29(messageStream);
                        break;

                    case 0x1f:
                        Rat(messageStream);
                        break;

                    case 0x24:
                        Milbourne36(messageStream);
                        break;

                    case 8:
                        Parrot(messageStream);
                        break;
                }
            }
        }
    }

    function handleUserCommand(command, messageStream) {
        // handle command
        var parsed = parseCommand(command);

        switch( parsed.verb ) {
            case 0:
                if( command.length != 0 ) {
                    Errorout(1, "", messageStream);
                    return false;
                }
                Errorout(0, "", messageStream);
                return false;

            case 1:
            case 2:
            case 13:
            case 0x2c:
            case 50:
                return Take(parsed.noun, messageStream);

            case 3:
            case 4:
            case 0x33:
                return Drop(parsed.noun, messageStream);

            case 7:
            case 0x2e:
                return ThrowFunc(parsed.noun, messageStream);

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
        handleUserCommand(command, messageStream);

        // output room description, if we've moved
        if( gameData.CurrentRoom != previousRoom ) {
            describeRoom(messageStream)
        }

        Animate(messageStream);

        return gameData.Dead || gameData.Out || gameData.Quit;
    }

    function restart() {
        gameData = JSON.parse(JSON.stringify(GameData));
    }

    return {
        'execute': execute,
        'getCurrentRoom': getCurrentRoom,
        'describeRoom': describeRoom,
        'restart': restart
    };

}]);


