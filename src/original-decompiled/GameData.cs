namespace TooSmall
{
    using System;

    [Serializable]
    public class GameData
    {
        public int CurrentRoom;
        public bool Dead;
        public int Inventory;
        public Item[] ObjectArray;
        public bool Out;
        public bool Quit;
        public bool Strength;
    }
}
