var express = require('express');
var app = express();
// var gm = require('gm');
var gm = require('gm').subClass({
  // imageMagick: true
});

// const imagemin = require('imagemin');
// const imageminGiflossy = require('imagemin-giflossy');
// const imageminJpegoptim = require('imagemin-jpegoptim');
// const imageminJpegRecompress = require('imagemin-jpeg-recompress');

// const makeDir = require('make-dir');

// var mkdirp = require('mkdirp')


var cnvDir = __dirname + "/public/images/canvas"
var gifDir = __dirname + "/public/images/gif"

// var setPuplicDir = "temp"

var server = app.listen(8888);

var socket = require('socket.io');

var io = socket(server);


// require("http").createServer(function (req, res) {
//     res.end("Hello from server started by Electron app!");
// }).listen(9000)

// makeDir(dir+'/unicorn/rainbow/cake').then(path => {
//     console.log(path);
//     //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake'
// });

app.use(express.static('public'));

console.log("we did it, for now")

io.sockets.on('connection', newConnection);

// const fs = require('fs')
// var dir = './111HA2'
//
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }


function newConnection(socket) {
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
      padString = String(padString || ' ');
      if (this.length > targetLength) {
        return String(this);

      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }


  // console.log('dang shit aa./.a`_');
  // console.log(socket.id);
  socket.on('trigger', triggerMsg);

  var test

  // new Promise(function(resolve, reject))
  function triggerMsg(cData) {
    console.log("got it")
    if (cData.trig === true) {
      // console.log('trigger is on')
      // String(cData.sendNumber).padStart(5,"0")
      setTimeout(function() {


        gm(cnvDir + "/MyCanvas" + (String(cData.sendNumber - 1).padStart(5, "0")) + ".jpg")
        .monitor()
          .modulate(100, 100 + cData.saturationNum)
          .sharpen(0,0.01 * cData.sharpNum)

          // .noise('impulse')
          .operator("All","Noise-Random",cData.noiseNum+"%")
          .operator("Red","Gamma",cData.redVal)
          .operator("Green","Gamma",cData.greenVal)
          .operator("Blue","Gamma",cData.blueVal)
          //.channel("Blue")
          // .noise(0.2)
          .compress("JPEG")
          .quality(cData.qualityNum)
          // .write(cnvDir + "/MyCanvas" + (String(cData.sendNumber).padStart(5, "0")) + ".jpg", function(err) {
          .write(cnvDir + "/currentCanvas.jpg", function(err) {
            if (err) throw err;
          });

      }, 50);
    }
  }


  socket.on('gif', makeGif)
  var timer

  function makeGif(cData2) {
    console.log(cData2.trig2)
    if (cData2.trig2 === true) {
      // console.log("doing it")
      new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 500);
      }).then(function(result) {
        gm(cnvDir + "/MyCanvas*.jpg")
        .scale(500)
        .dither(true)
        .colors(254)
        .delay(1)
        .loop(1)
          .write(gifDir + "/CanvasGif_test.gif", function(err) {
            if (err) throw err;
          })
      });

      // .then(function(result) {
      //   console.log("made gif, optimizing in " + (Math.floor(cData2.sendCounter * 0.5)) + " seconds sorry")
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => resolve(result), cData2.sendCounter * 500)
      //   })
      // }).then(function(result) {
      //   imagemin([dir + '/CanvasGif_test.gif'], 'public', {
      //     use: [imageminGiflossy({
      //       colors: 512,
      //       interlaced:true,
      //       colorMethod: 'blend-diversity',
      //       lossy: cData2.gifComp
      //     })]
        // })
        // .then(() => {
        //   console.log("well, I hope it's made by now!");
        // });
      // });


    }
  }

  // socket.on('dumb', setDirName)
  // function setDirName(data3){
  //   console.log("this is: " + data3.folderName)
  //   setPuplicDir = "/"+data3.folderName
  //   makeDir(dir + "/"+data3.folderName).then(path => {
  //       console.log(path);
  //       //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake'
  //   });
  // }

}
