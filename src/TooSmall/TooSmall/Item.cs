namespace TooSmall
{
    using System;

    [Serializable]
    public class Item
    {
        public int Carry;
        public int Condition;
        public static Item[] items = new Item[] { 
            new Item("", 0, 0, 0),
            new Item("desk", 1, 0, 0),
            new Item("sofa", 2, 0, 0),
            new Item("table", 3, 0, 0),
            new Item("recliner", 4, 0, 0), 
            new Item("chair with wheels", 5, 2, 2), 
            new Item("cat hair", 6, 1, 0), 
            new Item("stair door", 6, 0, 1), 
            new Item("parrot", 12, 3, 0), 
            new Item("cat food", 12, 1, 0), 
            new Item("cage with snake", 12, 0, 4), 
            new Item("bubble gum", 14, 1, 0), 
            new Item("popcorn", 14, 1, 0), 
            new Item("jelly beans", 14, 1, 0), 
            new Item("computer", 15, 0, 0), 
            new Item("doll clothes", 0x10, 1, 0),
            new Item("toy car", 0x11, 0, 0), 
            new Item("fishing line", 20, 1, 0), 
            new Item("knife", 20, 1, 0), 
            new Item("screwdriver", 0x16, 1, 0), 
            new Item("belt sander", 0x17, 0, 0), 
            new Item("directory", 0x15, 0, 0), 
            new Item("manequin", 0x19, 0, 0), 
            new Item("coat hanger", 0x1a, 1, 0), 
            new Item("pill", 0x1b, 1, 0), 
            new Item("capsule", 0x1b, 1, 0), 
            new Item("game machine", 0x1c, 0, 0), 
            new Item("grease", 30, 1, 0), 
            new Item("guard", 0x1f, 3, 0), 
            new Item("Janine the cat", 0x1f, 3, 0), 
            new Item("keys", 0x1f, 1, 0), 
            new Item("rat", 0x25, 3, 0),
            new Item("cheese", 0x26, 1, 0), 
            new Item("cereal", 0x27, 1, 0), 
            new Item("can", 40, 1, 0), 
            new Item("magazine", 0x29, 1, 0), 
            new Item("Janine the cat", 0x2c, 3, 0), 
            new Item("speaker cord", 0x2c, 0, 0), 
            new Item("bookcase", 0x2c, 0, 0), 
            new Item("cat toy", 0x2e, 1, 0), 
            new Item("door to outside", 6, 0, 1), 
            new Item("door to outside", 10, 0, 1), 
            new Item("door to outside", 0x20, 0, 1), 
            new Item("door to outside", 0x24, 0, 1)
        };
        public string Name;
        public int Room;

        public Item()
        {
        }

        public Item(Item it)
        {
            this.Name = it.Name;
            this.Room = it.Room;
            this.Carry = it.Carry;
            this.Condition = it.Condition;
        }

        public Item(string name, int room, int carry, int condition)
        {
            this.Name = name;
            this.Room = room;
            this.Carry = carry;
            this.Condition = condition;
        }
    }
}
