# Compression Drawing
![Screenshot of my drawing tool Campression Drawing. A highly distorted crop of the painting "Ophelia" by John Everett Millais (A painting of a woman in a dress floating on her back down a stream. The face of the woman in the original has a heavly look of sadness and emptyness). This altered version in the app has her face painted over with a smiley face](/readme-files/screenshots/hello.png)

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

# So... can I actually run it
To the person reading this: yes! (I think)
If you are familliar with Node, NPM, and using a command-line interface, this will be very straight forward. Prerequisites are Node.JS, NPM, and GraphicsMagick

If not, I recommend watching [this playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH) by The Coding Train that I watched when first starting this project. This will hopefully give you a good explanation of Node, NPM, and command-line usage.

*_Remember: use your command-line carefully and responsibly!_*

There's a few steps that need to be followed before that can happen though. Make sure you are connected to the internet for this as you'll be downloading a few things. You will also need to use a command-line interface for a lot of these steps. I do appologize for this current requirement as it is not the most user-friendly way if you are brand new to this, but I'll try to be as detaild as possible.
Small instructions disclaimer: Since I am using a Mac, I have not tried these steps on Windows.
1. [Download and install Node.js]([https://nodejs.org/en](https://nodejs.org/en/download)) for your operating system is. Make sure you download the LTS version (at the time of writing it is 18.17.0) as that will be the most reliable. This will also install NPM version 9.6.7.
2. Test to see if they were successfully installed by going to your computers command-line interface. On Mac use Terminal, on Windows use either CMD or Powershell. Once it's open, copy and paste this:
   ```
   node -v
   npm -v
   ```
   Press enter. It should display the installed versions something like this:
   ```
   v18.17.0
   9.6.7
   ```
4. Next go install [GraphicsMagick](http://www.graphicsmagick.org/) for your opperating system. This is required for a node package the app uses (the one that dose all of the compressing and other stuff). On its own, GraphicsMagick is basically Photoshop but as a text adventure and free. (not nessesary, but if you think GM cool, I recomend checking out [ImageMagick](https://imagemagick.org/index.php) too!)
1. Download/clone this repo. The whole thing. A way to do this on your browser is to go to the top of the main page of this repo and find the button that says `<> Code`. Click it and then click the `Download ZIP` option. Once downloaded, unzip it and move it to where ever you'd like it to be.
3. Back in your command-line, type `cd`, space, and then the path to the unzipped repo folder (i.e. `cd /the/path/to/Compression-Drawing`). Once that is typed up in the command-line, press enter. You should now be inside of Compression-Drawing within your command-line.
4. Now that you're in the directory, type `npm install` and press enter to download the necessary packages in the directory(this may take a minute)
5. Finally, type `npm start` and enter to run the app
and with that, fingers and toes crossed, it should be running on your computer!
