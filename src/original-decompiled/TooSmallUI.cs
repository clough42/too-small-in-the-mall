namespace TooSmall
{
    using System;

    public interface TooSmallUI
    {
        void addText(string text);
        void displayRoomInfo(Room room);
        void displayVanityPlate();
        string getLoadFileName();
        string getSaveFileName();
    }
}
