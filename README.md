# Compression Drawing
![Screenshot of my drawing tool Campression Drawing. A highly distorted crop of the painting "Ophelia" by John Everett Millais (A painting of a woman in a dress floating on her back down a stream. The face of the woman in the original has a heavly look of sadness and emptyness). This altered version in the app has her face painted over with a smiley face](/readme-files/screenshots/hello.png)

Compression Drawing is a drawing tool that explores JPEG compression artifacts and recursive image processing.<br>

You can draw images on the canvas, save it, and then seamlessly place that saved image on the canvas to draw back on top of.<br>
The process of saving an image as a jpeg file is lossy, meaning some data can be lost every time it is saved and can't be restored. Over many repeated saves, visual distortions can start to emerge known as compression artifacts. While generally considered undesired, I find them aesthetically and conceptually interesting with how they age an image like how physical media deteriorates overtime. This tool was made to streamline the process of propigating these artifacts and add to them by drawing with each save. Utilize generation loss to find new textures and digitaly age your art.

It is made with [p5.js](https://p5js.org/) and the node package [GM](https://aheckmann.github.io/gm/) wraped in [Electron](https://www.electronjs.org/).<br>

## Select Examples:

![](readme-files/example-images/littleLegs.jpg)

![](readme-files/example-images/thisCanvas-cmprss-00627.jpg)

![](readme-files/example-images/wormBod.jpg)

![](readme-files/example-images/bark00001.jpg)

![](readme-files/example-images/shoot00001.jpg)

[More can be found here.](readme-files/example-images)


# How do I work this thing?

<details><summary>*this section is a work in progress*</summary>
- First of all, when you click the "compress" button in the lower left area that will compress the current canvas.  
- You can also press the tilde key (`~`) to also compress.  
- The sliders and options on the right will effect how the image is processed. A key slider, the one labeled "quality", determines the overall compression. Higher means less compression and lower mean more.

If you've used MS Paint then you'll feel slightly at home!  
- There are three drawing tools to use; line, spray, and color picker.  
- The line draws a line on the canvas. You can adjust the size and alpha/transparency.  
- The spray tool acts like a spray can. You can adjust the diameter of the spray, the dot size of the spray, the density of the dots, and the alpha/transparency of the spray.  
- Finally, the color picker will get the color value of whatever you click on inside of the canvas and will be used as the color for drawing tools.

To view your image files, enter the app directory and head into the `public` folder and then into the `images` folder.  
- Inside are two folders: `canvas` and `gif`. Your still images will be inside of the `canvas`.  
- **IMPORTANT:** remember to move your images to a new and safe location after you exit the app. If you don't and start it up again the new drawing will save over the old ones.</details>

# So... can I actually run it

<details><summary>To the person reading this: yes! (click for instuctions)</summary>
If you are familiar with Node, NPM, and using a command-line interface, this will be very straight forward. Prerequisites are Node.JS, NPM, and GraphicsMagick

If not, I recommend watching [this playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH) by The Coding Train that I watched when first starting this project. This will hopefully give you a good explanation of Node, NPM, and command-line usage.

*_Remember: use your command-line carefully and responsibly!_*

There's a few steps that need to be followed before that can happen though. Make sure you are connected to the internet for this as you'll be downloading a few things. You will also need to use a command-line interface for a lot of these steps. I do apologize for this current requirement as it is not the most user-friendly way if you are brand new to this, but I'll try to be as detailed as possible.
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
4. Next go install [GraphicsMagick](http://www.graphicsmagick.org/) for your operating system. This is required for a node package the app uses (the one that dose all of the compressing and other stuff). On its own, GraphicsMagick is basically Photoshop but as a text adventure and free. (not necessary, but if you think GM cool, I recommend checking out [ImageMagick](https://imagemagick.org/index.php) too!)
1. Download/clone this repo. The whole thing. A way to do this on your browser is to go to the top of the main page of this repo and find the button that says `<> Code`. Click it and then click the `Download ZIP` option. Once downloaded, unzip it and move it to where ever you'd like it to be.
3. Back in your command-line, type `cd`, space, and then the path to the unzipped repo folder (i.e. `cd /the/path/to/Compression-Drawing`). Once that is typed up in the command-line, press enter. You should now be inside of Compression-Drawing within your command-line.
4. Now that you're in the directory, type `npm install` and press enter to download the necessary packages in the directory(this may take a minute)
5. Finally, type `npm start` and enter to run the app
and with that, fingers and toes crossed, it should be running on your computer!</details>

# Sources and Thanks

[p5.js Electron template](https://github.com/garciadelcastillo/p5js-electron-templates)<br>
[padded number algorithm](https://stackoverflow.com/a/43658705)<br>
[random point on a circumference algorithm](https://stackoverflow.com/a/9879291)<br>
[rgb to hsl algorithm](https://gist.github.com/mjackson/5311256)<br>
[line tool adapted from this p5.js example](https://p5js.org/examples/hello-p5-drawing.html)




