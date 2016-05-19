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
                messageStream.push(makeErrorMessage("You cannot move it because one of the wheels is broken and you're not big enough to carry it."));
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

    function Push(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
        }
        else if (gameData.Items[NounToken].Room != gameData.CurrentRoom)
        {
            Errorout(3, "", messageStream);
        }
        else
        {
            switch (gameData.Items[NounToken].Carry)
            {
                case 0:
                    messageStream.push(makeErrorMessage("No matter how much effort you exert, it refuses to move."));
                    break;

                case 1:
                    messageStream.push(makeSuccessMessage("It moves."));
                    break;

                case 2:
                    messageStream.push(makeSuccessMessage("With great effort, you can make it move, but not over any great distance."));
                    break;

                case 3:
                    messageStream.push(makeErrorMessage("It refuses to let you move it."));
                    break;
            }
            return true;
        }
        return false;
    }

    function Hit(messageStream)
    {
        messageStream.push(makeMessage('warning', [ "I warn you, your meager attempts at violence will bring about your end."]));
        return true;
    }

    function Jump(messageStream)
    {
        if (gameData.CurrentRoom == 0x2e)
        {
            messageStream.push(makeMessage('sentiment_very_dissatisfied', ["You should really be more careful about heights.  I will spare you the " +
                "details, but you are now quite dead."]));
            gameData.Dead = true;
        }
        else
        {
            messageStream.push(makeSuccessMessage("Wheeeeeeeee!  Doesn't that just thrill you?"));
        }
        return true;
    }

    function Help(messageStream)
    {
        messageStream.push(makeMessage('live_help', [
        "Enter your commands as two words--a verb and a noun.  (take rock, climb rope)",
        "Some commands require only one word.  (n, north, west)",
        "Many objects have more than one word in their name, but each is still " +
        "referred to with one word that best describes it.",
        "Have fun and be careful.  Remember, you're only a foot tall."]));
        return false;
    }

    function Say(messageStream)
    {
        messageStream.push(makeMessage('sentiment_dissatisfied', ["Are you talking to yourself?"]));
        return true;
    }

    function Guard(messageStream)
    {
        if (gameData.Items[6].Room == 0)
        {
            messageStream.push(makeMessage('sentiment_very_dissatisfied', ["The guard sneezes and wakes up.  Deciding that he had better go do his rounds, "+
                "he gets up.  He is still sleepy enough that he doesn't even notice when he " +
                "steps on you on his way out of the room."]));
            gameData.Dead = true;
        }
        else
        {
            messageStream.push(makeMessage('play_arrow', ["The guard is snoring loudly."]));
        }
    }

    function Yell(messageStream)
    {
        messageStream.push(makeMessage('sms_failed', ["Aaaaarrrgh!",
            "Do you feel better now?"]));
        return true;
    }

    function Examine(NounToken, messageStream)
    {
        switch (NounToken)
        {
            case 1:
                messageStream.push(makeMessage('info',["It is a large oak desk."]));
                break;

            case 2:
                messageStream.push(makeMessage('info',["It is a very lagre, soft sofa."]));
                break;

            case 3:
                messageStream.push(makeMessage('info',["It is tall and the legs are too smooth to climb."]));
                break;

            case 4:
                messageStream.push(makeMessage('info',["It's just a dumb old recliner."]));
                break;

            case 5:
                messageStream.push(makeMessage('info',["It is too heavy to carry, but you might be able to roll it."]));
                break;

            case 6:
                messageStream.push(makeMessage('info',["This seems to be very special cat hair."]));
                break;

            case 7:
                messageStream.push(makeMessage('info',["It is locked."]));
                break;

            case 8:
                messageStream.push(makeMessage('info',["The parrot flies away whenever you try to get close to it."]));
                break;

            case 9:
                messageStream.push(makeMessage('info',["The cat food is brown and crunchy."]));
                break;

            case 10:
                messageStream.push(makeMessage('info',["This cage contains a deadly cobra."]));
                break;

            case 11:
                messageStream.push(makeMessage('info',["The bubble gum is soft and it looks delicious."]));
                break;

            case 12:
                messageStream.push(makeMessage('info',["The popcorn is crisp and appetizing."]));
                break;

            case 13:
                messageStream.push(makeMessage('info',["The jelly beans are soft and they look terrible."]));
                break;

            case 14:
                messageStream.push(makeMessage('info',["It is turned off and there is no power switch."]));
                break;

            case 15:
                messageStream.push(makeMessage('info',["They are too small for you."]));
                break;

            case 0x10:
                messageStream.push(makeMessage('info',["It has no batteries."]));
                break;

            case 0x11:
                messageStream.push(makeMessage('info',["It is wrapped up tightly."]));
                break;

            case 0x12:
                messageStream.push(makeMessage('info',["It looks like quite the deadly weapon."]));
                break;

            case 0x13:
                messageStream.push(makeMessage('info',["It's a brand new flat-head screwdriver."]));
                break;

            case 20:
                messageStream.push(makeMessage('info',["This belt sander looks quite deadly."]));
                break;

            case 0x15:
                messageStream.push(makeMessage('info',["It has a bunch of writing on it."]));
                break;

            case 0x16:
                messageStream.push(makeMessage('info',["It is stark naked."]));
                break;

            case 0x17:
                messageStream.push(makeMessage('info',["It's just a plain old plastic coat hanger."]));
                break;

            case 0x18:
                messageStream.push(makeMessage('info',["It is small, round and white."]));
                break;

            case 0x19:
                messageStream.push(makeMessage('info',["It is blue and pink and very small."]));
                break;

            case 0x1a:
                messageStream.push(makeMessage('info',["It is unplugged and the cord is out of your reach."]));
                break;

            case 0x1b:
                messageStream.push(makeMessage('info',["It's very slimy.  It might come in handy."]));
                break;

            case 0x1c:
                messageStream.push(makeMessage('info',["He is sleeping.  Don't disturb him."]));
                break;

            case 0x1d:
                messageStream.push(makeMessage('info',["The white cat looks quite deadly."]));
                break;

            case 30:
                messageStream.push(makeMessage('info',["It looks like a bunch of keys on a metal ring."]));
                break;

            case 0x1f:
                messageStream.push(makeMessage('info',["He is large, black and ugly."]));
                break;

            case 0x20:
                messageStream.push(makeMessage('info',["Swiss cheese, my favorite."]));
                break;

            case 0x21:
                messageStream.push(makeMessage('info',["It is a bunch of crunchy flakes."]));
                break;

            case 0x22:
                messageStream.push(makeMessage('info',["It is hard, round and made of metal."]));
                break;

            case 0x23:
                messageStream.push(makeMessage('info',["Some dumb sports magazine."]));
                break;

            case 0x24:
                messageStream.push(makeMessage('info',["The large, white cat looks dangerous."]));
                break;

            case 0x25:
                messageStream.push(makeMessage('info',["It runs from the floor to the top of the bookcase where it enters the wall."]));
                break;

            case 0x26:
                messageStream.push(makeMessage('info',["It is tall and smooth."]));
                break;

            case 0x27:
                messageStream.push(makeMessage('info',["It looks well used."]));
                break;

            case 0x2b:
                messageStream.push(makeMessage('info',["It is tall and looks like a door with a window in it."]));
                break;

            case 0:
                Errorout(1, "");
                return false;
        }
        return true;
    }

    function Fix(NounToken, messageStream)
    {
        var flag = true;
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        if (gameData.Items[NounToken].Room != gameData.CurrentRoom)
        {
            Errorout(3, "", messageStream);
            return flag;
        }
        if (gameData.Items[NounToken].Condition != 2)
        {
            messageStream.push(makeErrorMessage("It's not broken."));
            return flag;
        }
        if (gameData.Items[0x13].Room != 0)
        {
            messageStream.push(makeErrorMessage("You don't have the proper tools."));
            return flag;
        }
        gameData.Items[NounToken].Condition -= 2;
        messageStream.push(makeSuccessMessage("Fixed."));
        return flag;
    }

    function DisplayInventory(messageStream)
    {
        var text = [];
        var flag = true;
        text.push("You have in your posession:");
        for (i = 1; i < gameData.Items.length; i++)
        {
            var item = gameData.Items[i];
            if (item.Room == 0)
            {
                text.push(item.Name);
                flag = false;
            }
        }
        if (flag)
        {
            text.push("     (nothing)");
        }

        messageStream.push(makeMessage('info', text));
        return true;
    }

    function ReadFunc(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        var flag = true;
        if (gameData.Items[NounToken].Room != gameData.CurrentRoom)
        {
            Errorout(3, "", messageStream);
            return flag;
        }
        if (NounToken != 0x15)
        {
            messageStream.push(makeErrorMessage("There is no writing here of any importance."));
            return flag;
        }
        messageStream.push(makeSuccessMessage("There is a map of the mall here, but that'd make it too easy, wouldn't it?"));
        return flag;
    }

    function Eat(NounToken, messageStream)
    {
        var flag2 = true;
        var flag = false;
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            flag = true;
            flag2 = false;
        }
        if ((gameData.Items[NounToken].Room != 0) && !flag)
        {
            Errorout(5, "", messageStream);
            flag = true;
        }
        if (!flag)
        {
            if ((((NounToken == 6) || (NounToken == 9)) || ((NounToken == 11) || (NounToken == 12))) || ((((NounToken == 13) || (NounToken == 0x18)) || ((NounToken == 0x19) || (NounToken == 0x1b))) || ((NounToken == 0x20) || (NounToken == 0x21))))
            {
                messageStream.push(makeSuccessMessage("Eaten."));
                gameData.Inventory--;
                gameData.Items[NounToken].Room = 0xff;
                switch (NounToken)
                {
                    case 0x18:
                        gameData.Strength = true;
                        messageStream.push(makeSuccessMessage("After a few minutes, you begin to feel much stronger than you did before."));
                        return flag2;

                    case 0x19:
                        gameData.Dead = true;
                        messageStream.push(makeErrorMessage("You really shouldn't eat things you find on the floor.  You are now beginning" +
                            "to feel quite dead."));
                        return flag2;
                }
                return flag2;
            }
            messageStream.push(makeErrorMessage("You can't eat that."));
        }
        return flag2;
    }

    function Open(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        var flag = true;
        if (NounToken != 0x2b)
        {
            messageStream.push(makeErrrorMessage("You can't open that."));
            return flag;
        }
        if (gameData.Items[NounToken].Room != gameData.CurrentRoom)
        {
            if (((gameData.CurrentRoom == 6) || (gameData.CurrentRoom == 10)) || (gameData.CurrentRoom == 0x20))
            {
                messageStream.push(makeErrorMessage("It's jammed shut."));
                return flag;
            }
            messageStream.push(makeErrorMessage("I don't see it here."));
            return flag;
        }
        if (gameData.Items[NounToken].Condition == 1)
        {
            messageStream.push(makeErrorMessage("It's locked."));
            return flag;
        }
        messageStream.push(makeSuccessMessage("The door slowly swings open and you see daylight peeking over the horizon."));
        gameData.Out = true;
        return flag;
    }

    function Unlock(NounToken, messageStream)
    {
        if (NounToken == 0)
        {
            Errorout(1, "", messageStream);
            return false;
        }
        var flag = true;
        if (NounToken != 0x2b)
        {
            messageStream.push(makeErrorMessage("You can't unlock that."));
            return flag;
        }
        if (gameData.Items[NounToken].Room != gameData.CurrentRoom)
        {
            if (((gameData.CurrentRoom == 6) || (gameData.CurrentRoom == 10)) || (gameData.CurrentRoom == 0x20))
            {
                messageStream.push(makeErrorMessage("The lock is jammed."));
                return flag;
            }
            messageStream.makeErrorMessage("I don't see it here.");
            return flag;
        }
        if (gameData.Items[30].Room != 0)
        {
            messageStream.push(makeErrorMessage("You don't have any keys."));
            return flag;
        }
        if ((gameData.Items[5].Room != 0) && (gameData.Items[5].Room != gameData.CurrentRoom))
        {
            messageStream.push(makeErrorMessage("You are not tall enough to reach the lock."));
            return flag;
        }
        messageStream.push(makeSuccessMessage("The door is unlocked."));
        gameData.Items[NounToken].Condition = 0;
        return flag;
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
            messageStream.push(makeMessage('sentiment_very_dissatisfied', ["Janine the cat jumps on you and begins to eat.  You are now quite dead."]));
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
            messageStream.push(makeMessage('sentiment_very_dissatisfied', ["The rat pounces on you and you are soon quite dead."]));
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
            messageStream.push(makeMessage('sentiment_very_dissatisfied',["Janine, because she has nothing else to play with, decides to chew on you for a while.  You have become quite dead."]));
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

    function Save(messageStream)
    {
        if( !storageAvailable('localStorage') ) {
            messageStream.push(makeErrorMessage("You browser does not support saving games."));
            return false;
        }
        localStorage.tooSmallSavedGame = JSON.stringify(gameData);
        messageStream.push(makeSuccessMessage("Game progress saved."));
        localStorage.tooSmallSavedStream = JSON.stringify(messageStream);
    }

    function Load(messageStream)
    {
        if( !storageAvailable('localStorage') ) {
            messageStream.push(makeErrorMessage("You browser does not support saving games."));
            return false;
        }

        if( !localStorage.tooSmallSavedGame || !localStorage.tooSmallSavedStream ) {
            messageStream.push(makeErrorMessage("No saved game data found in this browser."));
        }

        gameData = JSON.parse(localStorage.tooSmallSavedGame);
        messageStream.length = 0;
        angular.forEach(JSON.parse(localStorage.tooSmallSavedStream), function(message) {
            messageStream.push(message);
        });

        messageStream.push(makeSuccessMessage("Game progress loaded."));
    }

    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
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

            case 5:
            case 0x1b:
            case 0x1c:
            case 0x2d:
                return Push(parsed.noun, messageStream);

            case 6:
            case 15:
            case 0x10:
            case 0x1d:
            case 0x2a:
            case 0x2f:
            case 0x30:
            case 0x31:
                return Hit(messageStream);

            case 7:
            case 0x2e:
                return ThrowFunc(parsed.noun, messageStream);

            case 8:
                return Help(messageStream);

            case 9:
                return Jump(messageStream);

            case 10:
                return Say(messageStream);

            case 11:
            case 12:
                return Eat(parsed.noun, messageStream);

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

            case 30:
                return Yell(messageStream);

            case 0x1f:
                return Open(parsed.noun, messageStream);

            case 0x22:
                return Unlock(parsed.noun, messageStream);

            case 0x23:
                return Save(messageStream);

            case 0x24:
                return Load(messageStream);

            case 0x25:
                gameData.Quit = true;
                return true;

            case 0x26:
            case 40:
                describeRoom(messageStream);
                return true;

            case 0x27:
                return Examine(parsed.noun, messageStream);

            case 0x29:
                return ReadFunc(parsed.noun, messageStream);

            case 0x34:
                return Fix(parsed.noun, messageStream);

            case 0x35:
                return DisplayInventory(messageStream);
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


