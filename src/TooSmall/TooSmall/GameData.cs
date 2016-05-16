namespace TooSmall
{
    using System;
    using System.IO;
    using System.Runtime.Serialization;
    using System.Runtime.Serialization.Json;

    [Serializable]
    [DataContract]
    public class GameData
    {
        [DataMember(Order = 1)]
        public bool Dead;
        [DataMember(Order = 2)]
        public bool Out;
        [DataMember(Order = 3)]
        public bool Quit;
        [DataMember(Order = 4)]
        public bool Strength;
        [DataMember(Order = 5)]
        public int CurrentRoom;
        [DataMember(Order = 6)]
        public int Inventory;
        [DataMember(Order = 7)]
        public Item[] Items;
        [DataMember(Order = 8)]
        public Room[] Rooms;
        [DataMember(Order = 9)]
        public String[] Verbs;
        [DataMember(Order = 10)]
        public String[] Nouns;


        public GameData()
        {
            this.CurrentRoom = 0x2f;
            this.Strength = false;
            this.Inventory = 0;
            this.Dead = false;
            this.Out = false;
            this.Quit = false;
            this.Items = new Item[Item.items.Length];
            for (int i = 0; i < Item.items.Length; i++)
            {
                this.Items[i] = new Item(Item.items[i]);
            }
            this.Rooms = Room.rooms;
            this.Verbs = Verb.verbs;
            this.Nouns = Noun.nouns;
        }

        public void Dump()
        {
            using (Stream stream = File.OpenWrite("gen_gamedata.json"))
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(GameData));
                ser.WriteObject(stream, this);
            }
        }
    }
}
