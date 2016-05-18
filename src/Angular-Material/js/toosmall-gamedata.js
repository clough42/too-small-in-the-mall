angular.module('tooSmall').factory('GameData', function() {
    return {
        "Dead": false,
        "Out": false,
        "Quit": false,
        "Strength": false,
        "CurrentRoom": 47,
        "Inventory": 0,
        "Items": [
            {
                "Name": "",
                "Room": 0,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "desk",
                "Room": 1,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "sofa",
                "Room": 2,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "table",
                "Room": 3,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "recliner",
                "Room": 4,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "chair with wheels",
                "Room": 5,
                "Condition": 2,
                "Carry": 2
            },
            {
                "Name": "cat hair",
                "Room": 6,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "stair door",
                "Room": 6,
                "Condition": 1,
                "Carry": 0
            },
            {
                "Name": "parrot",
                "Room": 12,
                "Condition": 0,
                "Carry": 3
            },
            {
                "Name": "cat food",
                "Room": 12,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "cage with snake",
                "Room": 12,
                "Condition": 4,
                "Carry": 0
            },
            {
                "Name": "bubble gum",
                "Room": 14,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "popcorn",
                "Room": 14,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "jelly beans",
                "Room": 14,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "computer",
                "Room": 15,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "doll clothes",
                "Room": 16,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "toy car",
                "Room": 17,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "fishing line",
                "Room": 20,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "knife",
                "Room": 20,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "screwdriver",
                "Room": 22,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "belt sander",
                "Room": 23,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "directory",
                "Room": 21,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "manequin",
                "Room": 25,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "coat hanger",
                "Room": 26,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "pill",
                "Room": 27,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "capsule",
                "Room": 27,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "game machine",
                "Room": 28,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "grease",
                "Room": 30,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "guard",
                "Room": 31,
                "Condition": 0,
                "Carry": 3
            },
            {
                "Name": "Janine the cat",
                "Room": 31,
                "Condition": 0,
                "Carry": 3
            },
            {
                "Name": "keys",
                "Room": 31,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "rat",
                "Room": 37,
                "Condition": 0,
                "Carry": 3
            },
            {
                "Name": "cheese",
                "Room": 38,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "cereal",
                "Room": 39,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "can",
                "Room": 40,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "magazine",
                "Room": 41,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "Janine the cat",
                "Room": 44,
                "Condition": 0,
                "Carry": 3
            },
            {
                "Name": "speaker cord",
                "Room": 44,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "bookcase",
                "Room": 44,
                "Condition": 0,
                "Carry": 0
            },
            {
                "Name": "cat toy",
                "Room": 46,
                "Condition": 0,
                "Carry": 1
            },
            {
                "Name": "door to outside",
                "Room": 6,
                "Condition": 1,
                "Carry": 0
            },
            {
                "Name": "door to outside",
                "Room": 10,
                "Condition": 1,
                "Carry": 0
            },
            {
                "Name": "door to outside",
                "Room": 32,
                "Condition": 1,
                "Carry": 0
            },
            {
                "Name": "door to outside",
                "Room": 36,
                "Condition": 1,
                "Carry": 0
            }
        ],
        "Rooms": [
            {
                "Name": "",
                "Description": "",
                "N": 0,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Furniture Store",
                "Description": "  You are in the north end of the furniture store.   Judging from the type of furniture here, you seem to be in the office accessories department.  You have reached the end of the store now and the only exit is to the south. ",
                "N": 0,
                "S": 2,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Furniture Store",
                "Description": "  There are many large pieces of household furniture here.  The room extends into darkness to the north and south, and walls border the east and west. ",
                "N": 1,
                "S": 3,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Furniture Store",
                "Description": "  You are standing on a tile floor in the entrance of a very large furniture store.  You can see the west wall from here, but you can't see the north or south ends of the store.  The rest of the mall is through the entrance to the east. ",
                "N": 2,
                "S": 4,
                "E": 8,
                "W": 0
            },
            {
                "Name": "Furniture Store",
                "Description": "  The furniture in the store seems to be getting more mechanical in nature as you walk in a southerly direction.   The east and west walls appear solid, but the room continues to the north and south. ",
                "N": 3,
                "S": 5,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Furniture Store",
                "Description": "  It is very dark here.  Your head greets a solid object with a loud crack. You stagger back and soon your eyes adjust to the light.  The south wall of the store is here.  The only visible exit is to the north. ",
                "N": 4,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "North-South Hall",
                "Description": "  You are standing on the floor at the end of a long hall.  To the east, there is a door marked private.  You can see outside from here.  The hall continues to the south. ",
                "N": 0,
                "S": 7,
                "E": 0,
                "W": 0
            },
            {
                "Name": "North-South Hall",
                "Description": "  You are in a long hallway.  The light is dim, but you can see the bare east and west walls.  The hall extends into darkness to the north and south. ",
                "N": 6,
                "S": 8,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Hall Junction",
                "Description": "  You are standing at the intersection of two halls.  Halls extend to the north, south and east.  The entrance to a furniture store is to the west. ",
                "N": 7,
                "S": 9,
                "E": 13,
                "W": 3
            },
            {
                "Name": "North-South Hall",
                "Description": "  You are in a long hall.  Walls border the east and west.  The hall continues to the north and south, and you can see dim light coming from those directions. ",
                "N": 8,
                "S": 10,
                "E": 0,
                "W": 0
            },
            {
                "Name": "North-South Hall",
                "Description": "  You are at the end of a long hall.  There is a wall to the west and the entrance to a computer store to the east.  The hall continues to the north. ",
                "N": 9,
                "S": 0,
                "E": 15,
                "W": 0
            },
            {
                "Name": "Stair",
                "Description": "  You are on a stairway that extends up to the east and down to the west.  The walls are bare, but you can see an open door at the bottom of the stairway. ",
                "N": 0,
                "S": 0,
                "E": 42,
                "W": 6
            },
            {
                "Name": "Pet Store",
                "Description": "  The walls are lined with cages of glass and steel.  You see animals of all shapes and sizes.  This is a very small store.  The only direction you can go is out of the store to the south. ",
                "N": 0,
                "S": 13,
                "E": 0,
                "W": 0
            },
            {
                "Name": "East-West Hall",
                "Description": "  You are standing at end of an east-west hall.  To the north is a pet store and south of you is a candy store.  To the west you can just make out a large store entrance and in an easterly direction, you see only a faint glow. ",
                "N": 12,
                "S": 14,
                "E": 18,
                "W": 8
            },
            {
                "Name": "Candy Store",
                "Description": "  There is a faint light all around you but you cannot see its source.  Around the walls of this room are containers holding every kind of candy you can imagine.  There is an exit to the north, but you hesitate to leave. ",
                "N": 13,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Computer Store",
                "Description": "  Climbing over the threshhold, you enter a dimly lit room.  Red lights blink on and off around its perimeter.  As you get closer, you realize that the lights belong to pieces of electronic equipment in the store. The only exit is to the west. ",
                "N": 0,
                "S": 0,
                "E": 0,
                "W": 10
            },
            {
                "Name": "Toy Store",
                "Description": "  It is very warm here.  Simething smells like it's burning, but it is difficult to tell.  The back wall of the store is here.  You can only go south. ",
                "N": 0,
                "S": 17,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Toy Store",
                "Description": "  You are overcome with the joy of a small child as you look at all the toys this store.  They line the east and west walls as well as the aisles in the center.  The room continues to the north and the store entrance is to the south. ",
                "N": 16,
                "S": 18,
                "E": 0,
                "W": 0
            },
            {
                "Name": "East-West Hall",
                "Description": "  You are in a long east-west hall.  To the west you can see faint light, but no definite objects.  To the east, you can only see darkness.  North of you is the entrance of a toy store, and to the south is a sporting goods store. ",
                "N": 17,
                "S": 19,
                "E": 21,
                "W": 13
            },
            {
                "Name": "Sporting Goods Store",
                "Description": "  You are in a rather small room.  The walls are lined with glass cases containing firearms and ammunition.  The store entrance is north of you, and store continues to the south. ",
                "N": 18,
                "S": 20,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Sporting goods Store",
                "Description": "  This room has all kinds of fishing and hunting eqipment.  Walls border the south, west and east.  Because this end of the room is a little lighter, you can see only darkness to the north. ",
                "N": 19,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "East-West Hall",
                "Description": "  You are in an east-west hall.  The walls on the north and south sides are bare.  There is no visible source of light, but strangely you can see.  The hall continues to the east and west. ",
                "N": 0,
                "S": 0,
                "E": 24,
                "W": 18
            },
            {
                "Name": "Hardware Store",
                "Description": "  There is enought light here to see clearly.  There are aisles of lumber and rows and rows of tools.  There are walls to the north, west and east.  The only exit appears to be to the south. ",
                "N": 0,
                "S": 23,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Hardware Store",
                "Description": "  It is very dark here.  You seem to be between two aisles in a large hardware store.  You can see light to the north, and the store entrance is to the south.  The east and west are bordered by walls. ",
                "N": 22,
                "S": 24,
                "E": 0,
                "W": 0
            },
            {
                "Name": "East-West Hall",
                "Description": "  The light here is very dim.  You can see the entrance of a hardware store to the north and the entrance to a clothing store to the south.  You can see some light to the east and west, and in the west, there is a large shadow. ",
                "N": 23,
                "S": 25,
                "E": 29,
                "W": 21
            },
            {
                "Name": "Clothing Store",
                "Description": "  Everywhre you look, there are clothes.  Too bad you're too small to wear them.  The entrace of the store is to the north, and the store continues to the south.  The east and west are bordered by walls. ",
                "N": 24,
                "S": 26,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Clothing Store",
                "Description": "  This part of the store is bare.  You can see the bare south, west and east walls.  It seems as though the area is being recarpeted.  The floor is bare wood.  You can see that the rest of the store is to the north. ",
                "N": 25,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Drugstore",
                "Description": "  As you look around, you see that the room is bare.  All the shelves are empty.  Is is as though the store is not being used.  Walls border the north, west and south, and the store entrance is east of you. ",
                "N": 0,
                "S": 0,
                "E": 32,
                "W": 0
            },
            {
                "Name": "Arcade",
                "Description": "  You are in an arcade.  The floor is very dirty.  It seems like a place that a lot of shady characters would hang out.  To the north, east and west are walls.  The entrance is to the south. ",
                "N": 0,
                "S": 29,
                "E": 0,
                "W": 0
            },
            {
                "Name": "East-West Hall",
                "Description": "  You are in a very boring section of hallway.  There is an arcade to the north and a restaurant to the south.  The hall continues to the east and west. ",
                "N": 28,
                "S": 30,
                "E": 34,
                "W": 24
            },
            {
                "Name": "Restaurant",
                "Description": "  You are in a fast-food restaurant--if you call it a restaurant.  The south, east and west walls are splattered with grease, ketchup and many other nondescript materials.   The store entrance is to the north. ",
                "N": 29,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Security",
                "Description": "  This room is well lit.  You can see rows and rows of flashing lights, video screens and other miscellaneous pieces of equipment.  They are probably part of the mall's security system. ",
                "N": 0,
                "S": 0,
                "E": 36,
                "W": 0
            },
            {
                "Name": "North-South Hallway",
                "Description": "  You are in the end of a north-south hallway.  There is the entrance to a drugstore to the west and a blank wall to the east.  The hall continues to the south. ",
                "N": 0,
                "S": 33,
                "E": 0,
                "W": 27
            },
            {
                "Name": "North-South Hallway",
                "Description": "  You are in a very boring section of north-south hallway.  The only things of interest are the east and west walls--and there's nothing special about them.  The hall continues to the north and south. ",
                "N": 32,
                "S": 34,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Hall Junction",
                "Description": "  You are standing in the junction of two halls.  They extend to the west, north and south.  There is the entrance of a grocery store to the east. ",
                "N": 33,
                "S": 35,
                "E": 39,
                "W": 29
            },
            {
                "Name": "North-South Hallway",
                "Description": "  You are in a very boring section of north-south hallway.  Even the walls on the east and west are boring.  The hall continues to the north and south. ",
                "N": 34,
                "S": 36,
                "E": 0,
                "W": 0
            },
            {
                "Name": "North-South Hallway",
                "Description": "  You are in the end of a long north-south hall.  You can see outside from here.  The east wall is bare.  To the west is a door marked 'Security.'  The hall continues to the north. ",
                "N": 35,
                "S": 0,
                "E": 0,
                "W": 31
            },
            {
                "Name": "Grocery Store",
                "Description": "  There are groceries here.  Walls border the north, west and east.  The store continues to the south. ",
                "N": 0,
                "S": 38,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Grocery Store",
                "Description": "  There are groceries here.  There are walls to the east and west.  The store extends to the north and south. ",
                "N": 37,
                "S": 39,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Grocery Store",
                "Description": "  There are groceries here.  There is a wall to the east and the store continues to the north and south.  The store entrance is west of you. ",
                "N": 38,
                "S": 40,
                "E": 0,
                "W": 34
            },
            {
                "Name": "Grocery Store",
                "Description": "  There are groceries here.  There are walls to the east and west.  The store continues to the north and south. ",
                "N": 39,
                "S": 41,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Grocery Store",
                "Description": "  There are groceries here.  You can see walls on the south, west and east sides.  The store continues to the north. ",
                "N": 40,
                "S": 0,
                "E": 0,
                "W": 0
            },
            {
                "Name": "Evil Scientist Rex's Lab",
                "Description": "  This place is a mess.  There is a wall north of you.  You can go east, west and south. ",
                "N": 0,
                "S": 43,
                "E": 44,
                "W": 11
            },
            {
                "Name": "Evil Scientist Rex's Lab",
                "Description": "  This place is a mess.  There are walls to the south and west.  You can go north and east. ",
                "N": 42,
                "S": 0,
                "E": 45,
                "W": 0
            },
            {
                "Name": "Evil Scientist Rex's Lab",
                "Description": "  This place is a mess.  There are walls to the north and east.  You can go south and west. ",
                "N": 0,
                "S": 45,
                "E": 0,
                "W": 42
            },
            {
                "Name": "Evil Scientist Rex's Lab",
                "Description": "  This place is a mess.  There are walls to the south and east.  You can go north and west. ",
                "N": 44,
                "S": 0,
                "E": 0,
                "W": 43
            },
            {
                "Name": "On Rex's Bookcase",
                "Description": "  You are on top of a tall bookcase.  There is a speaker cord on the wall.",
                "N": 0,
                "S": 0,
                "E": 47,
                "W": 0
            },
            {
                "Name": "In Your Cage",
                "Description": "  You are in a cage on top of a tall bookcase.",
                "N": 0,
                "S": 0,
                "E": 0,
                "W": 46
            }
        ],
        "Verbs": [
            "__DUMMY_PLACEHOLDER__",
            "GET",
            "TAKE",
            "PUT",
            "DROP",
            "PUSH",
            "KICK",
            "THROW",
            "HELP",
            "JUMP",
            "SAY",
            "EAT",
            "SWALLOW",
            "LIFT",
            "RUN",
            "HIT",
            "PUNCH",
            "CLIMB",
            "N",
            "S",
            "E",
            "W",
            "NORTH",
            "SOUTH",
            "EAST",
            "WEST",
            "GO",
            "PULL",
            "TURN",
            "BREAK",
            "YELL",
            "OPEN",
            "CLOSE",
            "LOCK",
            "UNLOCK",
            "SAVE",
            "LOAD",
            "QUIT",
            "LOOK",
            "EXAMINE",
            "SEARCH",
            "READ",
            "CUT",
            "SHUT",
            "GRAB",
            "SHOVE",
            "TOSS",
            "KILL",
            "STAB",
            "SLASH",
            "STEAL",
            "GIVE",
            "FIX",
            "INVENTOR"
        ],
        "Nouns": [
            "__DUMMY_PLACEHOLDER__",
            "DESK",
            "SOFA",
            "TABLE",
            "RECLINER",
            "CHAIR",
            "HAIR",
            "DOOR",
            "PARROT",
            "FOOD",
            "CAGE",
            "GUM",
            "POPCORN",
            "BEANS",
            "COMPUTER",
            "CLOTHES",
            "CAR",
            "LINE",
            "KNIFE",
            "SCREWDRIVER",
            "SANDER",
            "DIRECTORY",
            "MANEQUIN",
            "HANGER",
            "PILL",
            "CAPSULE",
            "MACHINE",
            "GREASE",
            "GUARD",
            "CAT",
            "KEYS",
            "RAT",
            "CHEESE",
            "CEREAL",
            "CAN",
            "MAGAZINE",
            "CAT",
            "CORD",
            "BOOKCASE",
            "TOY",
            "DOOR",
            "DOOR",
            "DOOR",
            "DOOR",
            "NORTH",
            "SOUTH",
            "EAST",
            "WEST"
        ]
    };
});
