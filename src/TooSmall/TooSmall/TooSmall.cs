namespace TooSmall
{
    using System;
    using System.IO;
    using System.Runtime.Serialization.Formatters.Binary;

    public class TooSmall
    {
        private GameData game;
        private const int MaxInventory = 5;
        private Random random;
        public const string THE_STORY_SO_FAR = "Too Small in the Mall\r\n\r\n     You no doubt have already assumed that the title has a lot to do with the game.  Well you're right.  It does have a lot to do with the game.  Does the fact that you were right make you feel like you've fulfilled your part of Life, the Universe and Everything?  You haven't.\r\n\r\n     You have been kidnapped by Evil Scientist Rex.  (Sounds like a really nice guy, huh?)  He has shrunken you down to a height of twelve inches.  (Well, that makes sense.  It's the kind of thing I enjoy spending my weekends doing.) As you will soon discover, this has changed your view of things drastically.\r\n     The local police stormed Rex's lab this morning and arrested him, but they failed to notice you in your cage way up on top of Rex's bookcase.  You are extremely lucky in the fact that your cage door just happens to be open. (I know it sounds a little fishy, but it's only a game.  Forget it.)\r\n     When you escape from Rex's lab, you will find yourself in a shopping mall after hours.  Have fun escaping and beware of large cats.\r\n\r\n";
        private TooSmallUI ui;

        public TooSmall(TooSmallUI ui)
        {
            this.ui = ui;
            this.random = new Random();
            this.game = new GameData();
            this.init();
        }

        private void Animate()
        {
            for (int i = 1; i < this.game.Items.Length; i++)
            {
                if ((this.game.Items[i].Carry == 3) && (this.game.Items[i].Room == this.game.CurrentRoom))
                {
                    switch (i)
                    {
                        case 0x1c:
                            this.Guard();
                            break;

                        case 0x1d:
                            this.Milbourne29();
                            break;

                        case 0x1f:
                            this.Rat();
                            break;

                        case 0x24:
                            goto Label_0081;

                        case 8:
                            goto Label_0061;
                    }
                }
                continue;
            Label_0061:
                this.Parrot();
                continue;
            Label_0081:
                this.Milbourne36();
            }
        }

        private bool Climb(int NounToken)
        {
            bool flag;
            if (NounToken == 0)
            {
                flag = false;
                this.Errorout(1, "");
                return flag;
            }
            flag = true;
            if (NounToken != 0x25)
            {
                this.Writeln("You can't climb that.");
                return flag;
            }
            if ((this.game.CurrentRoom != 0x2e) && (this.game.CurrentRoom != 0x2c))
            {
                this.Writeln("I don't see it here.");
                return flag;
            }
            switch (this.game.CurrentRoom)
            {
                case 0x2c:
                    this.game.CurrentRoom = 0x2e;
                    return flag;

                case 0x2d:
                    return flag;

                case 0x2e:
                    this.game.CurrentRoom = 0x2c;
                    return flag;
            }
            return flag;
        }

        private bool DisplayInventory()
        {
            bool flag = true;
            this.Writeln("You have in your posession:");
            for (int i = 1; i < this.game.Items.Length; i++)
            {
                Item item = this.game.Items[i];
                if (item.Room == 0)
                {
                    this.Writeln("     " + item.Name);
                    flag = false;
                }
            }
            if (flag)
            {
                this.Writeln("     (nothing)");
            }
            return true;
        }

        private void DisplayObjects()
        {
            bool flag = true;
            for (int i = 1; i < this.game.Items.Length; i++)
            {
                Item item = this.game.Items[i];
                if (item.Room == this.game.CurrentRoom)
                {
                    if (flag)
                    {
                        this.Writeln("You can see:");
                        this.Writeln("     " + item.Name);
                        flag = false;
                    }
                    else
                    {
                        this.Writeln("     " + item.Name);
                    }
                }
            }
        }

        private bool Drop(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            if (this.game.Items[NounToken].Room != 0)
            {
                this.Errorout(5, "");
                return false;
            }
            this.game.Items[NounToken].Room = this.game.CurrentRoom;
            this.game.Inventory--;
            this.Writeln(this.game.Items[NounToken].Name + " dropped.");
            return true;
        }

        private bool Eat(int NounToken)
        {
            bool flag2 = true;
            bool flag = false;
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                flag = true;
                flag2 = false;
            }
            if ((this.game.Items[NounToken].Room != 0) && !flag)
            {
                this.Errorout(5, "");
                flag = true;
            }
            if (!flag)
            {
                if ((((NounToken == 6) || (NounToken == 9)) || ((NounToken == 11) || (NounToken == 12))) || ((((NounToken == 13) || (NounToken == 0x18)) || ((NounToken == 0x19) || (NounToken == 0x1b))) || ((NounToken == 0x20) || (NounToken == 0x21))))
                {
                    this.Writeln("Eaten.");
                    this.game.Inventory--;
                    this.game.Items[NounToken].Room = 0xff;
                    switch (NounToken)
                    {
                        case 0x18:
                            this.game.Strength = true;
                            this.Writeln("After a few minutes, you begin to feel much stronger than you did before.");
                            return flag2;

                        case 0x19:
                            this.game.Dead = true;
                            this.Writeln("You really shouldn't eat things you find on the floor.  You are now beginning");
                            this.Writeln("to feel quite dead.");
                            return flag2;
                    }
                    return flag2;
                }
                this.Writeln("You can't eat that.");
            }
            return flag2;
        }

        private void Errorout(int errorNum, string Insert)
        {
            switch (errorNum)
            {
                case 0:
                    this.Writeln("Speak, O short one.");
                    return;

                case 1:
                    this.Writeln("I don't understand.  Try different words.");
                    return;

                case 2:
                    this.Writeln("You can't " + Insert + " that.");
                    return;

                case 3:
                    this.Writeln("I don't see that object here.");
                    return;

                case 4:
                    this.Writeln("You already have it in your posession.");
                    return;

                case 5:
                    this.Writeln("You do not have it in your posession.");
                    return;

                case 6:
                    this.Writeln("You aren't strong enough.");
                    return;

                case 7:
                    this.Writeln("In your shrunken state, you cannot carry any more than your current load.");
                    return;
            }
        }

        private bool Examine(int NounToken)
        {
            switch (NounToken)
            {
                case 1:
                    this.Writeln("It is a large oak desk.");
                    break;

                case 2:
                    this.Writeln("It is a very lagre, soft sofa.");
                    break;

                case 3:
                    this.Writeln("It is tall and the legs are too smooth to climb.");
                    break;

                case 4:
                    this.Writeln("It's just a dumb old recliner.");
                    break;

                case 5:
                    this.Writeln("It is too heavy to carry, but you might be able to roll it.");
                    break;

                case 6:
                    this.Writeln("This seems to be very special cat hair.");
                    break;

                case 7:
                    this.Writeln("It is locked.");
                    break;

                case 8:
                    this.Writeln("The parrot flies away whenever you try to get close to it.");
                    break;

                case 9:
                    this.Writeln("The cat food is brown and crunchy.");
                    break;

                case 10:
                    this.Writeln("This cage contains a deadly cobra.");
                    break;

                case 11:
                    this.Writeln("The bubble gum is soft and it looks delicious.");
                    break;

                case 12:
                    this.Writeln("The popcorn is crisp and appetizing.");
                    break;

                case 13:
                    this.Writeln("The jelly beans are soft and they look terrible.");
                    break;

                case 14:
                    this.Writeln("It is turned off and there is no power switch.");
                    break;

                case 15:
                    this.Writeln("They are too small for you.");
                    break;

                case 0x10:
                    this.Writeln("It has no batteries.");
                    break;

                case 0x11:
                    this.Writeln("It is wrapped up tightly.");
                    break;

                case 0x12:
                    this.Writeln("It looks like quite the deadly weapon.");
                    break;

                case 0x13:
                    this.Writeln("It's a brand new flat-head screwdriver.");
                    break;

                case 20:
                    this.Writeln("This belt sander looks quite deadly.");
                    break;

                case 0x15:
                    this.Writeln("It has a bunch of writing on it.");
                    break;

                case 0x16:
                    this.Writeln("It is stark naked.");
                    break;

                case 0x17:
                    this.Writeln("It's just a plain old plastic coat hanger.");
                    break;

                case 0x18:
                    this.Writeln("It is small, round and white.");
                    break;

                case 0x19:
                    this.Writeln("It is blue and pink and very small.");
                    break;

                case 0x1a:
                    this.Writeln("It is unplugged and the cord is out of your reach.");
                    break;

                case 0x1b:
                    this.Writeln("It's very slimy.  It might come in handy.");
                    break;

                case 0x1c:
                    this.Writeln("He is sleeping.  Don't disturb him.");
                    break;

                case 0x1d:
                    this.Writeln("The white cat looks quite deadly.");
                    break;

                case 30:
                    this.Writeln("It looks like a bunch of keys on a metal ring.");
                    break;

                case 0x1f:
                    this.Writeln("He is large, black and ugly.");
                    break;

                case 0x20:
                    this.Writeln("Swiss cheese, my favorite.");
                    break;

                case 0x21:
                    this.Writeln("It is a bunch of crunchy flakes.");
                    break;

                case 0x22:
                    this.Writeln("It is hard, round and made of metal.");
                    break;

                case 0x23:
                    this.Writeln("Some dumb sports magazine.");
                    break;

                case 0x24:
                    this.Writeln("The large, white cat looks dangerous.");
                    break;

                case 0x25:
                    this.Writeln("It runs from the floor to the top of the bookcase where it enters the wall.");
                    break;

                case 0x26:
                    this.Writeln("It is tall and smooth.");
                    break;

                case 0x27:
                    this.Writeln("It looks well used.");
                    break;

                case 0x2b:
                    this.Writeln("It is tall and looks like a door with a window in it.");
                    break;

                case 0:
                    this.Errorout(1, "");
                    return false;
            }
            return true;
        }

        private bool Fix(int NounToken)
        {
            bool flag = true;
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            if (this.game.Items[NounToken].Room != this.game.CurrentRoom)
            {
                this.Errorout(3, "");
                return flag;
            }
            if (this.game.Items[NounToken].Condition != 2)
            {
                this.Writeln("It's not broken.");
                return flag;
            }
            if (this.game.Items[0x13].Room != 0)
            {
                this.Writeln("You don't have the proper tools.");
                return flag;
            }
            this.game.Items[NounToken].Condition -= 2;
            this.Writeln("Fixed.");
            return flag;
        }

        private bool Go(int VerbToken)
        {
            bool flag;
            switch (VerbToken)
            {
                case 0x12:
                case 0x16:
                    flag = game.Rooms[this.game.CurrentRoom].N == 0;
                    if (!flag)
                    {
                        this.game.CurrentRoom = game.Rooms[this.game.CurrentRoom].N;
                    }
                    break;

                case 0x13:
                case 0x17:
                    flag = game.Rooms[this.game.CurrentRoom].S == 0;
                    if (!flag)
                    {
                        this.game.CurrentRoom = game.Rooms[this.game.CurrentRoom].S;
                    }
                    break;

                case 20:
                case 0x18:
                    flag = game.Rooms[this.game.CurrentRoom].E == 0;
                    if (!flag)
                    {
                        this.game.CurrentRoom = game.Rooms[this.game.CurrentRoom].E;
                    }
                    break;

                case 0x15:
                case 0x19:
                    flag = game.Rooms[this.game.CurrentRoom].W == 0;
                    if (!flag)
                    {
                        this.game.CurrentRoom = game.Rooms[this.game.CurrentRoom].W;
                    }
                    break;

                default:
                    this.Errorout(1, "");
                    return false;
            }
            if (flag)
            {
                this.Writeln("You can`t go in that direction.");
                return false;
            }
            return true;
        }

        private void Guard()
        {
            if (this.game.Items[6].Room == 0)
            {
                this.Writeln("The guard sneezes and wakes up.  Deciding that he had better go do his rounds,");
                this.Writeln("he gets up.  He is still sleepy enough that he doesn''t even notice when he");
                this.Writeln("steps on you on his way out of the room.");
                this.game.Dead = true;
            }
            else
            {
                this.Writeln("The guard is snoring loudly.");
            }
        }

        private bool Help()
        {
            this.Writeln("Enter your commands as two words--a verb and a noun.  (take rock, climb rope)");
            this.Writeln("Some commands require only one word.  (n, north, west)");
            this.Writeln("Many objects have more than one word in their name, but each is still");
            this.Writeln("referred to with one word that best describes it.");
            this.Writeln("Have fun and be careful.  Remember, you're only a foot tall.");
            return false;
        }

        private bool Hit()
        {
            this.Writeln("I warn you, your meager attempts at violence will bring about your end.");
            return true;
        }

        private void InformUser()
        {
            this.ui.displayRoomInfo(game.Rooms[this.game.CurrentRoom]);
            this.Writeln(game.Rooms[this.game.CurrentRoom].Name);
            this.Writeln(game.Rooms[this.game.CurrentRoom].Description);
            this.DisplayObjects();
        }

        public void init()
        {
            this.Writeln("Too Small in the Mall\r\n\r\n     You no doubt have already assumed that the title has a lot to do with the game.  Well you're right.  It does have a lot to do with the game.  Does the fact that you were right make you feel like you've fulfilled your part of Life, the Universe and Everything?  You haven't.\r\n\r\n     You have been kidnapped by Evil Scientist Rex.  (Sounds like a really nice guy, huh?)  He has shrunken you down to a height of twelve inches.  (Well, that makes sense.  It's the kind of thing I enjoy spending my weekends doing.) As you will soon discover, this has changed your view of things drastically.\r\n     The local police stormed Rex's lab this morning and arrested him, but they failed to notice you in your cage way up on top of Rex's bookcase.  You are extremely lucky in the fact that your cage door just happens to be open. (I know it sounds a little fishy, but it's only a game.  Forget it.)\r\n     When you escape from Rex's lab, you will find yourself in a shopping mall after hours.  Have fun escaping and beware of large cats.\r\n\r\n");
            this.InformUser();
        }

        private bool Jump()
        {
            if (this.game.CurrentRoom == 0x2e)
            {
                this.Writeln("You should really be more careful about heights.  I will spare you the");
                this.Writeln("details, but you are now quite dead.");
                this.game.Dead = true;
            }
            else
            {
                this.Writeln("Wheeeeeeeee!");
                this.Writeln("Doesn't that just thrill you?");
            }
            return true;
        }

        private bool Load()
        {
            string path = this.ui.getLoadFileName();
            if (path == null)
            {
                this.Writeln("Load canceled.");
                return true;
            }
            this.Writeln("Loading game from: " + path);
            FileStream serializationStream = null;
            try
            {
                serializationStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                BinaryFormatter formatter = new BinaryFormatter {
                    Binder = new TooSmallBinder()
                };
                this.game = (GameData) formatter.Deserialize(serializationStream);
                this.Writeln("Game loaded.");
                this.Writeln();
            }
            catch (Exception exception)
            {
                this.Writeln("Load failed: " + exception.Message);
            }
            finally
            {
                if (serializationStream != null)
                {
                    serializationStream.Close();
                }
            }
            return true;
        }

        private void Milbourne29()
        {
            if (this.game.Items[11].Room == 0)
            {
                this.Writeln("Janine the cat pounces on you and steals your gum, but when she tries to");
                this.Writeln("eat it, she gets all tangled up and her ferocious jaws become fused.");
                this.game.Items[11].Room = this.game.CurrentRoom;
                this.game.Inventory--;
                this.game.Items[11].Carry = 0;
            }
            else if (this.game.Items[11].Room == this.game.CurrentRoom)
            {
                this.Writeln("Janine is rolling around in the corner, tangled in a wad of bubble gum.");
            }
            else
            {
                this.Writeln("Janine the cat jumps on you and begins to eat.  You are now quite dead.");
                this.game.Dead = true;
            }
        }

        private void Milbourne36()
        {
            if (this.game.Items[0x27].Room == this.game.CurrentRoom)
            {
                this.Writeln("Janine the cat is busily chewing on the cat toy.");
            }
            else
            {
                this.Writeln("Janine, because she has nothing else to play with, decides to chew on you for a while.  You have become quite dead.");
                this.game.Dead = true;
            }
        }

        private bool Open(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            bool flag = true;
            if (NounToken != 0x2b)
            {
                this.Writeln("You can't open that.");
                return flag;
            }
            if (this.game.Items[NounToken].Room != this.game.CurrentRoom)
            {
                if (((this.game.CurrentRoom == 6) || (this.game.CurrentRoom == 10)) || (this.game.CurrentRoom == 0x20))
                {
                    this.Writeln("It's jammed shut.");
                    return flag;
                }
                this.Writeln("I don't see it here.");
                return flag;
            }
            if (this.game.Items[NounToken].Condition == 1)
            {
                this.Writeln("It's locked.");
                return flag;
            }
            this.Writeln("The door slowly swings open and you see daylight peeking over the horizon.");
            this.game.Out = true;
            return flag;
        }

        private void Parrot()
        {
            int num = -1;
            while (num < 0)
            {
                num = this.random.Next(10);
            }
            this.Write("From the parrot:  ");
            switch (num)
            {
                case 0:
                    this.Writeln("Hello, Hello");
                    return;

                case 1:
                    this.Writeln("Haaa! Ha! Ha! Ha! Haaa!");
                    return;

                case 2:
                    this.Writeln("Beware of large cats.");
                    return;

                case 3:
                    this.Writeln("Violence will accomplish nothing.");
                    return;

                case 4:
                    this.Writeln("A penny saved is a penny.");
                    return;

                case 5:
                    this.Writeln("Nothing is ever as simple as it first seems.");
                    return;

                case 6:
                    this.Writeln("Go West, Short One, go West.");
                    return;

                case 7:
                    this.Writeln("The hospital called, your brain is ready.");
                    return;

                case 8:
                    this.Writeln("I'm allergic to cats.");
                    return;

                case 9:
                    this.Writeln("Leftover nuts never match leftover bolts.");
                    return;
            }
        }

        private bool Push(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
            }
            else if (this.game.Items[NounToken].Room != this.game.CurrentRoom)
            {
                this.Errorout(3, "");
            }
            else
            {
                switch (this.game.Items[NounToken].Carry)
                {
                    case 0:
                        this.Writeln("No matter how much effort you exert, it refuses to move.");
                        break;

                    case 1:
                        this.Writeln("It moves.");
                        break;

                    case 2:
                        this.Writeln("With great effort, you can make it move, but not over any great distance.");
                        break;

                    case 3:
                        this.Writeln("It refuses to let you move it.");
                        break;
                }
                return true;
            }
            return false;
        }

        private void Rat()
        {
            if (this.game.Items[0x20].Room == 0x25)
            {
                this.Writeln("The rat pounces on the cheese and it is gone almost instantly.  The rat then turns its head back in your direction in a threatening manner.");
                this.game.Items[0x20].Room = 0xff;
            }
            else if (this.game.Items[0x20].Room == 0)
            {
                this.Writeln("The rat seems to be begging for something");
            }
            else
            {
                this.Writeln("The rat pounces on you and you are soon quite dead.");
                this.game.Dead = true;
            }
        }

        private bool ReadFunc(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            bool flag = true;
            if (this.game.Items[NounToken].Room != this.game.CurrentRoom)
            {
                this.Errorout(3, "");
                return flag;
            }
            if (NounToken != 0x15)
            {
                this.Writeln("There is no writing here of any importance.");
                return flag;
            }
            this.Writeln("There is a map of the mall here, but that'd make it too easy, wouldn't it?");
            this.ui.displayVanityPlate();
            return flag;
        }

        private bool Save()
        {
            string path = this.ui.getSaveFileName();
            if (path == null)
            {
                this.Writeln("Save canceled.");
                return true;
            }
            this.Writeln("Saving game to: " + path);
            FileStream serializationStream = null;
            try
            {
                serializationStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                new BinaryFormatter { Binder = new TooSmallBinder() }.Serialize(serializationStream, this.game);
                this.Writeln("Game saved.");
                this.Writeln();
            }
            catch (Exception exception)
            {
                this.Writeln("Save failed: " + exception.Message);
            }
            finally
            {
                if (serializationStream != null)
                {
                    serializationStream.Close();
                }
            }
            return true;
        }

        private bool Say()
        {
            this.Writeln("Are you talking to yourself?");
            return true;
        }

        private bool Take(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
            }
            else if ((this.game.Items[NounToken].Room != this.game.CurrentRoom) || (this.game.Items[NounToken].Condition == 2))
            {
                if (this.game.Items[NounToken].Condition == 2)
                {
                    this.Writeln("You cannot move it because one of the wheels is broken and you're not big");
                    this.Writeln("enough to carry it.");
                }
                else if (this.game.Items[NounToken].Room == 0)
                {
                    this.Errorout(4, "");
                }
                else
                {
                    this.Errorout(3, "");
                }
            }
            else
            {
                if (this.game.Inventory < 5)
                {
                    if ((this.game.Items[NounToken].Carry == 1) || ((this.game.Items[NounToken].Carry == 2) && this.game.Strength))
                    {
                        this.game.Items[NounToken].Room = 0;
                        this.game.Inventory++;
                        this.Writeln(this.game.Items[NounToken].Name + " taken.");
                    }
                    else
                    {
                        this.Errorout(6, "");
                    }
                }
                else
                {
                    this.Errorout(7, "");
                }
                return true;
            }
            return false;
        }

        private bool ThrowFunc(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            if (this.game.Items[NounToken].Room != 0)
            {
                this.Errorout(5, "");
                return false;
            }
            if (this.game.CurrentRoom == 0x2e)
            {
                this.game.Items[NounToken].Room = 0x2c;
            }
            else
            {
                this.game.Items[NounToken].Room = this.game.CurrentRoom;
            }
            this.game.Inventory--;
            this.Writeln(this.game.Items[NounToken].Name + " thrown.");
            return true;
        }

        public int tokenizeNoun(string noun)
        {
            int num = 0;
            for (int i = 1; i < game.Nouns.Length; i++)
            {
                if (game.Nouns[i].ToUpper().Equals(noun.ToUpper()))
                {
                    num = i;
                }
            }
            return num;
        }

        public int tokenizeVerb(string verb)
        {
            int num = 0;
            for (int i = 1; i < game.Verbs.Length; i++)
            {
                string str = game.Verbs[i];
                if (str.Length > 3)
                {
                    str = str.Substring(0, 3);
                }
                if (verb.Length > 3)
                {
                    verb = verb.Substring(0, 3);
                }
                if (str.ToUpper().Equals(verb.ToUpper()))
                {
                    num = i;
                }
            }
            return num;
        }

        private bool Unlock(int NounToken)
        {
            if (NounToken == 0)
            {
                this.Errorout(1, "");
                return false;
            }
            bool flag = true;
            if (NounToken != 0x2b)
            {
                this.Writeln("You can't unlock that.");
                return flag;
            }
            if (this.game.Items[NounToken].Room != this.game.CurrentRoom)
            {
                if (((this.game.CurrentRoom == 6) || (this.game.CurrentRoom == 10)) || (this.game.CurrentRoom == 0x20))
                {
                    this.Writeln("The lock is jammed.");
                    return flag;
                }
                this.Writeln("I don't see it here.");
                return flag;
            }
            if (this.game.Items[30].Room != 0)
            {
                this.Writeln("You don't have any keys.");
                return flag;
            }
            if ((this.game.Items[5].Room != 0) && (this.game.Items[5].Room != this.game.CurrentRoom))
            {
                this.Writeln("You are not tall enough to reach the lock.");
                return flag;
            }
            this.Writeln("The door is unlocked.");
            this.game.Items[NounToken].Condition = 0;
            return flag;
        }

        public bool userCommand(string command)
        {
            bool flag = false;
            int nounToken = 0;
            int verbToken = 0;
            string[] strArray = command.Split(new char[] { ' ', '\t' });
            try
            {
                verbToken = this.tokenizeVerb(strArray[0]);
                nounToken = this.tokenizeNoun(strArray[1]);
            }
            catch (IndexOutOfRangeException)
            {
            }
            switch (verbToken)
            {
                case 0:
                    if (command.Length != 0)
                    {
                        this.Errorout(1, "");
                        return flag;
                    }
                    this.Errorout(0, "");
                    return flag;

                case 1:
                case 2:
                case 13:
                case 0x2c:
                case 50:
                    return this.Take(nounToken);

                case 3:
                case 4:
                case 0x33:
                    return this.Drop(nounToken);

                case 5:
                case 0x1b:
                case 0x1c:
                case 0x2d:
                    return this.Push(nounToken);

                case 6:
                case 15:
                case 0x10:
                case 0x1d:
                case 0x2a:
                case 0x2f:
                case 0x30:
                case 0x31:
                    return this.Hit();

                case 7:
                case 0x2e:
                    return this.ThrowFunc(nounToken);

                case 8:
                    return this.Help();

                case 9:
                    return this.Jump();

                case 10:
                    return this.Say();

                case 11:
                case 12:
                    return this.Eat(nounToken);

                case 14:
                case 0x1a:
                    return this.Go(nounToken - 0x16);

                case 0x11:
                    return this.Climb(nounToken);

                case 0x12:
                case 0x13:
                case 20:
                case 0x15:
                case 0x16:
                case 0x17:
                case 0x18:
                case 0x19:
                    return this.Go(verbToken);

                case 30:
                    return this.Yell();

                case 0x1f:
                    return this.Open(nounToken);

                case 0x22:
                    return this.Unlock(nounToken);

                case 0x23:
                    return this.Save();

                case 0x24:
                    return this.Load();

                case 0x25:
                    this.game.Quit = true;
                    return true;

                case 0x26:
                case 40:
                    this.InformUser();
                    return true;

                case 0x27:
                    return this.Examine(nounToken);

                case 0x29:
                    return this.ReadFunc(nounToken);

                case 0x34:
                    return this.Fix(nounToken);

                case 0x35:
                    return this.DisplayInventory();
            }
            this.Errorout(1, "");
            return true;
        }

        public bool userInput(string input)
        {
            int currentRoom = this.game.CurrentRoom;
            this.Writeln();
            this.Writeln("> " + input);
            this.Writeln();
            if (!this.userCommand(input))
            {
                return true;
            }
            if (currentRoom != this.game.CurrentRoom)
            {
                this.InformUser();
            }
            this.Animate();
            return ((!this.game.Dead && !this.game.Out) && !this.game.Quit);
        }

        private void Write(string msg)
        {
            this.ui.addText(msg);
        }

        private void Writeln()
        {
            this.Writeln("");
        }

        private void Writeln(string msg)
        {
            this.ui.addText(msg + "\n");
        }

        private bool Yell()
        {
            this.Writeln("Aaaaarrrgh!");
            this.Writeln("Do you feel better now?");
            return true;
        }
    }
}
