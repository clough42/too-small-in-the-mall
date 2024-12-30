# Too Small in the Mall
Text adventure game circa 1989

This is a text adventure game that I wrote in 1989 when I was a sophomore in high school.  It was originally written in Turbo Pascal on
a Compaq Portable (a.k.a Luggable).  For the kids out there:  http://www.oldcomputers.net/compaqi.html

In the game, you have been kidnapped by Evil Scientist Rex and he has shrunk you to a height of 12".  You must escape from Rex's
laboratory, which turns out to be located in an abandoned shopping mall.  At the time it was written, it was loosely modeled on
Karcher Mall, in Nampa, Idaho.  Now, almost 30 years later, this is strangely appropriate.  The owners of Karcher Mall have attempted
to reinvigorate it several times over the years, to no avail.  It's still operating as of this writing, but it is run-down
and half-empty, and it would make a great location for a supervillain's lair.

[2024 Update] Karcher Mall is no more.  Sort of.  They tore down about half of it (a section in the middle) leaving something
called The 208, which is about half the size of what it once was, and one of the anchor stores, now standalone.

The antagonist cat in the game was originally named Melbourne, but I later renamed it Janine, after one of my coworkers.  At the
time, she thought it was funny.

Over the years, I translated it to other languages and embedded it as an Easter egg in several software projects I have worked
on.  It has been delivered as a Java applet in a web-based enterprise application and as an encrypted .NET DLL in a Microsoft
SmartClient UI.  There was also a GWT variant.  It was triggered by a magic phrase typed into a text box in the application.

The version here is a .NET Windows Forms application version that I created and compiled for my kids many years ago.  I couldn't find
the original source code this time around, so I decompiled the .exe with Red Gate Reflector and got it running again in Visual
Studio 2010.

A few things you might note:

- The initialized arrays all have a dummy object at index zero.  This is because Turbo Pascal arrays started at index 1 and I
didn't bother to translate all the references.
- There are a lot of numeric references and magic numbers in the code.  Remember that this was written by a self-taught high-school
sophomore in Turbo Pascal in 1989.  And that same high-school sophomore has been able to find better things to do for the last
30 years than fix it.
- The magic numbers are about half decimal and half hexadecimal.  This is an artifact of the decompiler.




