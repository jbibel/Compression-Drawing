# Compression Drawing

### **Important Note:**
<details><summary>
This project is at a point where I would like to package it into a .dmg for macOS and theoretically a .exe for Windows. However there is a big problem and other smaller ones that I need to solve and better understand before I can do that. Click for more thoughts.
</summary>
  
###  - I greatly overestimated how easy it is to built a multi platform app *(no .exe yet)*
- A classic. When I decided to use Electron I though *"Oh yeah, I can make this for Windows. This will just work, easy peasy."* Unfortunately, no. When trying to figuring out how to make a nested directory through the app, I found out that there are some functions that are not compatible between macOS and Windows. I believe I haven't used any OS specific functions, but since I only have a Mac on hand I have no way of testing it out currently. I'll look into investing in a virtual machine to look into it further.

###  - Other issues *(file system, memory leak(?), optimization in general)*
- I'm still trying wrap my head around how to set a directory selected by the user to make a folder with a given name to save the canvas images of the project. Currently, images are saved in a folder within the project itself and if packaged like this, the app will not be able to save to the folder inside of itself thinking it doesn't exist. Unfortunately I'm not having any luck as to how to create a dynamic path for the server to access another folder outside of it's root (i.e. you make a folder on your desktop thru the app, the app knows how to navigate where it is to where that new folder is)
- A few days ago I got a warning that there was a memory leak caused by the app. I figure the culprit is within the node server and the functions that are called within. How things are structured, the function that creates the compressed image can get overwhelmed if it gets too many requests to do its job. I try not to go too fast with this app, but sometimes I have and it either loads an image from a previous session or gives an error saying the image does not exist. Just wait for the compressed image to show up on the canvas before hitting compress again.
- I don't have much experience with javascript, node, and electron. I was using javascript because thats all I really know and have had some experience with. More accurately, I only really know the library p5.js hahaha. So it should go without saying that things have been written and composed in a weird, not too great way. I'm sure I could rewrite a bunch of aspects that could be simplified/abstracted so things could run smoother. A bigger issue is that javascript is not a good language for an app like this that requires to frequently save and load images semi-seamlessly. There are so many finicky I have done to get things to work as they do now that I am still kinda shocked it still holds up (for the most part).
</details>

## What is this exactly?
Compression Drawing is a drawing tool that explores JPEG compression artifacts and recursive image processing.
It is made with p5.js for drawing and displaying images.
I started making this about four years ago but lost motivation around the beginning of 2020
Node.js is used to make a server that uses the node package gm to compress the saved images (and also make a gif of your resulting image sequence).
Express and Socket.IO are used to communicate between the p5.js sketch and the node server.
This is all wrapped in Electron to act as a desktop application.

## Why JavaScript/P5/Electron?
I just feel comfortable using P5 and I'm too stuborn to seek out a better language for raster graphic creation and manipulation. Learning P5 was my first real step into learning how to code anything. While I do want to revisit this idea in a more sutable language, I really wanted to push myself to follow through with a big (big in my perspective, bigger than anything I've done so far) project like this.
Electron is a popular name I saw a lot when searching online back when I first started, and since I was eager to make a desktop app I thought "sure, why not?".
I guess the biggest reason why I stuck with JavaScript and Electron was its hypothetical reach. It doesn't matter if you are on a Mac or PC, if you have a web browser you can run a P5 sketch. And since Electron is Google Chrome (Chromium) running the JavaScript and displaying the HTML, it can be easily released for Mac and PC (but it's very easy to say that, in practice it can be and most likely will be harder).

## So... can I actually run it
To the person reading this: yes (I think).
Some prerequisites: Node.js, NPM, and Graphicmagick. I will link a guide for these
1. Download/clone this repo
2. In Terminal or Console, use cd to change the directory to the repo folder (i.e. cd the/path/to/Compression-Drawing)
3. Now that you're in the directory, type npm install to download the necessary packages (this may take a minute)
4. Finally, type npm start to run the app
and with that, it should be running on your computer!
