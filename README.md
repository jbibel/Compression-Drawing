# Compression Drawing

*July 17 2023 note: I have covid right now and I'm having a hard time focusing on writing so much info all at once. I am committing this as is just so I can get it out now. More text such as a tour will be added when my brain is not full of mucus.

## What is this exactly?
Compression Drawing is a drawing tool that explores JPEG compression artifacts and recursive image processing.
It is made with p5.js for drawing and displaying images.
I started making this about four years ago but lost motivation around the beginning of 2020
Node.js is used to make a server that uses the node package gm to compress the saved images (and also make a gif of your resulting image sequence).
Express and Socket.IO are used to communicate between the p5.js sketch and the node server.
This is all wrapped in Electron to act as a desktop application.

## **Important Note:**
### This project is at a point where I would like to package it into a .dmg for macOS and theoretically a .exe for Windows. **_However_** there are a number of problems that I need to solve and learn before I can do that:
###  - I greatly overestimated how easy it is to built a multi platform app *(no .exe yet)*
- A classic. When I decided to use Electron I though *"Oh yeah, I can make this for Windows. This will just work, easy peasy."* Unfortunately, no. When trying to figuring out how to make a nested directory through the app, I found out that there are some functions that are not compatible between macOS and Windows. I believe I haven't used any OS specific functions, but since I only have a Mac on hand I have no way of testing it out currently. I'll look into investing in a virtual machine to look into it further.

###  - I don't really know how secure this app is *(though I believe it is fine?)*
- First of all, this app does not and should not connect to the internet. Everything should run locally, even though it is written in javascript and tools meant for web apps and online communication (Electron, Node, Express, Socket.IO). Maybe I'm being too paranoid but I worry that some outside actor could use it as a way to get to ones file system. This has not happened to me while working on it, and from my limited knowledge everything should be fine, but it's still something I think about and I would hate it if someone was hurt by this. A way to boost security I've read is to use an HTTPS server instead of a HTTP server that is being used. The 'S' stands for secure by the way. With this kind of server, there needs to be a generated key and certificate to access the HTTPS server. Until I have a better understanding or have a second pair of eyes to look at this

###  - Other issues *(file system, memory leak, optimization in general)*
- I'm still trying wrap my head around how to set a directory selected by the user to make a folder with a given name to save the canvas images of the project. Currently, images are saved in a folder within the project itself and if packaged like this, the app will not be able to save to the folder inside of itself thinking it doesn't exist. Unfortunately I'm not having any luck as to how to create a dynamic path for the server to access another folder outside of it's root (i.e. you make a folder on your desktop thru the app, the app knows how to navigate where it is to where that new folder is)
- A few days ago I got a warning that there was a memory leak caused by the app. I figure the culprit is within the node server and the functions that are called within. How things are structured, the function that creates the compressed image can get overwhelmed if it gets too many requests to do its job. I try not to go too fast with this app, but sometimes I have and it either loads an image from a previous session or gives an error saying the image does not exist. Just wait for the compressed image to show up on the canvas before hitting compress again.
- I don't have much experience with javascript, node, and electron. I was using javascript because thats all I really know and have had some experience with. More accurately, I only really know the library p5.js hahaha. So it should go without saying that things have been written and composed in a weird, not too great way. I'm sure I could rewrite a bunch of aspects that could be simplified/abstracted so things could run smoother. A bigger issue is that javascript is not a good language for an app like this that requires to frequently save and load images semi-seamlessly. There are so many finicky I have done to get things to work as they do now that I am still kinda shocked it still holds up (for the most part).


## Why Electron
All I really know is a slim understanding of javascript. Specifically p5.
This started off... I'll get back to this at another time

## So... can I actually run it
To the person reading this: yes (I think).
Some prerequisites: Node.js and NPM. I will link a guide for this
### 1. Download/clone this repo
### 2. In Terminal or Console, use cd to change the directory to the repo folder (i.e. cd the/path/to/Compression-Drawing)
### 3. Now that you're in the directory, type npm install to download the necessary packages (this may take a minute)
### 4. Finally, type npm start to run the app
and with that, it should be running on your computer!
