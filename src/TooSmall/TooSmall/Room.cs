namespace TooSmall
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Runtime.Serialization;
    using System.Runtime.Serialization.Json;

    [DataContract]
    public class Room
    {
        [DataMember(Order = 1)]
        public string Name;
        [DataMember(Order = 2)]
        public string Description;
        [DataMember(Order = 3)]
        public int N;
        [DataMember(Order = 4)]
        public int S;
        [DataMember(Order = 5)]
        public int E;
        [DataMember(Order = 6)]
        public int W;

        public static Room[] rooms = new Room[] { 
            new Room("", "", 0, 0, 0, 0), 
            new Room("Furniture Store", "  You are in the north end of the furniture store.   Judging from the type of furniture here, you seem to be in the office accessories department.  You have reached the end of the store now and the only exit is to the south. ", 0, 2, 0, 0), 
            new Room("Furniture Store", "  There are many large pieces of household furniture here.  The room extends into darkness to the north and south, and walls border the east and west. ", 1, 3, 0, 0), 
            new Room("Furniture Store", "  You are standing on a tile floor in the entrance of a very large furniture store.  You can see the west wall from here, but you can't see the north or south ends of the store.  The rest of the mall is through the entrance to the east. ", 2, 4, 8, 0), 
            new Room("Furniture Store", "  The furniture in the store seems to be getting more mechanical in nature as you walk in a southerly direction.   The east and west walls appear solid, but the room continues to the north and south. ", 3, 5, 0, 0), 
            new Room("Furniture Store", "  It is very dark here.  Your head greets a solid object with a loud crack. You stagger back and soon your eyes adjust to the light.  The south wall of the store is here.  The only visible exit is to the north. ", 4, 0, 0, 0), 
            new Room("North-South Hall", "  You are standing on the floor at the end of a long hall.  To the east, there is a door marked private.  You can see outside from here.  The hall continues to the south. ", 0, 7, 0, 0), 
            new Room("North-South Hall", "  You are in a long hallway.  The light is dim, but you can see the bare east and west walls.  The hall extends into darkness to the north and south. ", 6, 8, 0, 0), 
            new Room("Hall Junction", "  You are standing at the intersection of two halls.  Halls extend to the north, south and east.  The entrance to a furniture store is to the west. ", 7, 9, 13, 3),
            new Room("North-South Hall", "  You are in a long hall.  Walls border the east and west.  The hall continues to the north and south, and you can see dim light coming from those directions. ", 8, 10, 0, 0),
            new Room("North-South Hall", "  You are at the end of a long hall.  There is a wall to the west and the entrance to a computer store to the east.  The hall continues to the north. ", 9, 0, 15, 0), 
            new Room("Stair", "  You are on a stairway that extends up to the east and down to the west.  The walls are bare, but you can see an open door at the bottom of the stairway. ", 0, 0, 0x2a, 6), 
            new Room("Pet Store", "  The walls are lined with cages of glass and steel.  You see animals of all shapes and sizes.  This is a very small store.  The only direction you can go is out of the store to the south. ", 0, 13, 0, 0), 
            new Room("East-West Hall", "  You are standing at end of an east-west hall.  To the north is a pet store and south of you is a candy store.  To the west you can just make out a large store entrance and in an easterly direction, you see only a faint glow. ", 12, 14, 0x12, 8), 
            new Room("Candy Store", "  There is a faint light all around you but you cannot see its source.  Around the walls of this room are containers holding every kind of candy you can imagine.  There is an exit to the north, but you hesitate to leave. ", 13, 0, 0, 0),
            new Room("Computer Store", "  Climbing over the threshhold, you enter a dimly lit room.  Red lights blink on and off around its perimeter.  As you get closer, you realize that the lights belong to pieces of electronic equipment in the store. The only exit is to the west. ", 0, 0, 0, 10),
            new Room("Toy Store", "  It is very warm here.  Simething smells like it's burning, but it is difficult to tell.  The back wall of the store is here.  You can only go south. ", 0, 0x11, 0, 0), 
            new Room("Toy Store", "  You are overcome with the joy of a small child as you look at all the toys this store.  They line the east and west walls as well as the aisles in the center.  The room continues to the north and the store entrance is to the south. ", 0x10, 0x12, 0, 0), 
            new Room("East-West Hall", "  You are in a long east-west hall.  To the west you can see faint light, but no definite objects.  To the east, you can only see darkness.  North of you is the entrance of a toy store, and to the south is a sporting goods store. ", 0x11, 0x13, 0x15, 13),
            new Room("Sporting Goods Store", "  You are in a rather small room.  The walls are lined with glass cases containing firearms and ammunition.  The store entrance is north of you, and store continues to the south. ", 0x12, 20, 0, 0), 
            new Room("Sporting goods Store", "  This room has all kinds of fishing and hunting eqipment.  Walls border the south, west and east.  Because this end of the room is a little lighter, you can see only darkness to the north. ", 0x13, 0, 0, 0), 
            new Room("East-West Hall", "  You are in an east-west hall.  The walls on the north and south sides are bare.  There is no visible source of light, but strangely you can see.  The hall continues to the east and west. ", 0, 0, 0x18, 0x12),
            new Room("Hardware Store", "  There is enought light here to see clearly.  There are aisles of lumber and rows and rows of tools.  There are walls to the north, west and east.  The only exit appears to be to the south. ", 0, 0x17, 0, 0),
            new Room("Hardware Store", "  It is very dark here.  You seem to be between two aisles in a large hardware store.  You can see light to the north, and the store entrance is to the south.  The east and west are bordered by walls. ", 0x16, 0x18, 0, 0),
            new Room("East-West Hall", "  The light here is very dim.  You can see the entrance of a hardware store to the north and the entrance to a clothing store to the south.  You can see some light to the east and west, and in the west, there is a large shadow. ", 0x17, 0x19, 0x1d, 0x15),
            new Room("Clothing Store", "  Everywhre you look, there are clothes.  Too bad you're too small to wear them.  The entrace of the store is to the north, and the store continues to the south.  The east and west are bordered by walls. ", 0x18, 0x1a, 0, 0), 
            new Room("Clothing Store", "  This part of the store is bare.  You can see the bare south, west and east walls.  It seems as though the area is being recarpeted.  The floor is bare wood.  You can see that the rest of the store is to the north. ", 0x19, 0, 0, 0),
            new Room("Drugstore", "  As you look around, you see that the room is bare.  All the shelves are empty.  Is is as though the store is not being used.  Walls border the north, west and south, and the store entrance is east of you. ", 0, 0, 0x20, 0),
            new Room("Arcade", "  You are in an arcade.  The floor is very dirty.  It seems like a place that a lot of shady characters would hang out.  To the north, east and west are walls.  The entrance is to the south. ", 0, 0x1d, 0, 0),
            new Room("East-West Hall", "  You are in a very boring section of hallway.  There is an arcade to the north and a restaurant to the south.  The hall continues to the east and west. ", 0x1c, 30, 0x22, 0x18),
            new Room("Restaurant", "  You are in a fast-food restaurant--if you call it a restaurant.  The south, east and west walls are splattered with grease, ketchup and many other nondescript materials.   The store entrance is to the north. ", 0x1d, 0, 0, 0),
            new Room("Security", "  This room is well lit.  You can see rows and rows of flashing lights, video screens and other miscellaneous pieces of equipment.  They are probably part of the mall's security system. ", 0, 0, 0x24, 0),
            new Room("North-South Hallway", "  You are in the end of a north-south hallway.  There is the entrance to a drugstore to the west and a blank wall to the east.  The hall continues to the south. ", 0, 0x21, 0, 0x1b), 
            new Room("North-South Hallway", "  You are in a very boring section of north-south hallway.  The only things of interest are the east and west walls--and there's nothing special about them.  The hall continues to the north and south. ", 0x20, 0x22, 0, 0), 
            new Room("Hall Junction", "  You are standing in the junction of two halls.  They extend to the west, north and south.  There is the entrance of a grocery store to the east. ", 0x21, 0x23, 0x27, 0x1d), 
            new Room("North-South Hallway", "  You are in a very boring section of north-south hallway.  Even the walls on the east and west are boring.  The hall continues to the north and south. ", 0x22, 0x24, 0, 0), 
            new Room("North-South Hallway", "  You are in the end of a long north-south hall.  You can see outside from here.  The east wall is bare.  To the west is a door marked 'Security.'  The hall continues to the north. ", 0x23, 0, 0, 0x1f),
            new Room("Grocery Store", "  There are groceries here.  Walls border the north, west and east.  The store continues to the south. ", 0, 0x26, 0, 0), 
            new Room("Grocery Store", "  There are groceries here.  There are walls to the east and west.  The store extends to the north and south. ", 0x25, 0x27, 0, 0), 
            new Room("Grocery Store", "  There are groceries here.  There is a wall to the east and the store continues to the north and south.  The store entrance is west of you. ", 0x26, 40, 0, 0x22),
            new Room("Grocery Store", "  There are groceries here.  There are walls to the east and west.  The store continues to the north and south. ", 0x27, 0x29, 0, 0),
            new Room("Grocery Store", "  There are groceries here.  You can see walls on the south, west and east sides.  The store continues to the north. ", 40, 0, 0, 0), 
            new Room("Evil Scientist Rex's Lab", "  This place is a mess.  There is a wall north of you.  You can go east, west and south. ", 0, 0x2b, 0x2c, 11),
            new Room("Evil Scientist Rex's Lab", "  This place is a mess.  There are walls to the south and west.  You can go north and east. ", 0x2a, 0, 0x2d, 0), 
            new Room("Evil Scientist Rex's Lab", "  This place is a mess.  There are walls to the north and east.  You can go south and west. ", 0, 0x2d, 0, 0x2a), 
            new Room("Evil Scientist Rex's Lab", "  This place is a mess.  There are walls to the south and east.  You can go north and west. ", 0x2c, 0, 0, 0x2b), 
            new Room("On Rex's Bookcase", "  You are on top of a tall bookcase.  There is a speaker cord on the wall.", 0, 0, 0x2f, 0), 
            new Room("In Your Cage", "  You are in a cage on top of a tall bookcase.", 0, 0, 0, 0x2e)
        };



        public Room(string name, string description, int n, int s, int e, int w)
        {
            this.Name = name;
            this.Description = description;
            this.N = n;
            this.S = s;
            this.E = e;
            this.W = w;
        }

        public static void Dump()
        {
            using (Stream stream = File.OpenWrite("gen_rooms.json"))
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(List<Room>));
                ser.WriteObject(stream, new List<Room>(rooms));
            }
        }
    }
}
