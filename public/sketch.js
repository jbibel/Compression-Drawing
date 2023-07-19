
var saveButton
var sprayOptions
var drawOptions

var spreadX = 10
var spreadY = 10

var paths = []
var painting = false
var next = 0

var blendSel

// var cnv

//color var's
var Hue, Saturation, Lightness
var colorDiv
var clr, sprayClr, pickClr, mainClr
var h, s, l, a
var img;

var gifButton;
var dirFolderName
var dirSet

// I think this function is used for the numbering of the files to fill it up with 0's?
function setup() {

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




  pixelDensity(1)
  var cRatio = 960
  var cnv = createCanvas(cRatio, floor(cRatio*0.56))
  // var cnv = createCanvas(512, 512)
  cnv.parent("myCanvas");
  cnv.drop(gotFile)
  background(255)

  // remove if express and socket not needed
  socket = io.connect('http://localhost:8888')
  // socket = io.connect('http://127.0.0.1:8888')

  imageMode(CENTER)
  ellipseMode(CENTER)
  rectMode(CENTER)
  colorMode(HSL)
  angleMode(DEGREES)

  gifButton=createButton("make_gif");
  gifButton.mousePressed(makeGif);
  gifButton.mouseReleased(finishGif)
  gifButton.parent("gifButton")
  gifButton.style("font-family:courier;margin:5px")

  // dirSet=createButton("make/set")
  // dirSet.mousePressed(sendDir)
  // dirSet.parent("dirSetButton")
  // dirSet.style("font-family:courier;")
  //
  // dirFolderName=createInput("not_working");
  // dirFolderName.parent("dirSetInput")
  // dirFolderName.style("font-family:courier;")
  //
  // var setPuplicDir
  // setPuplicDir = "/"+dirFolderName.value()

  // function sendDir(){
  //   // dirFolderName.value("dumb")
  //
  //   var data3 = {
  //     sentDirName:"bug";
  //   }
  //   socket.emit('dumb',data3)
  // }

  zoom = createSlider(0, 500, 0, 0.5)
  zoomDiv = createDiv("img zoom: " + zoom.value() + "px", true)
  zoomDiv.parent("zoom")
  zoom.parent("zoom")
  zoom.style('width','200px')

  quality = createSlider(1,75,50,1)
  qualityDiv=createDiv("qulaity: "+quality.value(),true)
  qualityDiv.parent("quality")
  quality.parent("quality")
  quality.style('width','200px')

  saturationSlider=createSlider(0,100,0,1)
  saturationDiv=createDiv("saturation: "+saturationSlider.value(),true)
  saturationDiv.parent("extras")
  saturationSlider.parent("extras")
  saturationSlider.style('width','200px')

  redChan=createSlider(-0.125,0.125,0,0.001)
  redDiv=createDiv("red: "+redChan.value(),true)
  redDiv.parent("redC")
  redChan.parent("redC")
  redChan.style('width','175px')

  greenChan=createSlider(-0.125,0.125,0,0.001)
  greenDiv=createDiv("green: "+greenChan.value(),true)
  greenDiv.parent("greenC")
  greenChan.parent("greenC")
  greenChan.style('width','175px')

  blueChan=createSlider(-0.125,0.125,0,0.001)
  blueDiv=createDiv("blue: "+blueChan.value(),true)
  blueDiv.parent("blueC")
  blueChan.parent("blueC")
  blueChan.style('width','175px')

  sharpnessSlider = createSlider(1,100,1,1)
  sharpnessDiv=createDiv("sharpness: "+sharpnessSlider.value(),true)
  sharpnessDiv.parent("extras")
  sharpnessSlider.parent("extras")
  sharpnessSlider.style('width','200px')

  rotateImg = createSlider(-90, 90, 0, 0.05)
  rotateImgDiv = createDiv("rotate: " + rotateImg.value() + "°", true)
  rotateImgDiv.parent("rotate")
  rotateImg.parent("rotate")
  rotateImg.style('width','200px')

  jitterImg=createSlider(0, 30, 0, 0.5);
  jitterDiv=createDiv("jitter: "+ jitterImg.value(),true);
  jitterDiv.parent("jitter");
  jitterImg.parent("jitter");
  jitterImg.style('width','200px')

  noiseSlider = createSlider(0,100,0,1);
  noiseDiv = createDiv("noise: " + noiseSlider.value(), true);
  noiseDiv.parent("noise");
  noiseSlider.parent("noise");
  noiseSlider.style('width', '200px')

  // gifCompression=createSlider(0, 10000, 100, 10);
  // gifCompDiv=createDiv("gif quality: "+ gifCompression.value(),true);
  // gifCompDiv.parent("gifCompTxt");
  // gifCompDiv.style("font-size:12px;margin-left:10px");
  // gifCompression.parent("gifCompSld");
  // gifCompression.style("width:175px;margin-left:10px")

  imgOpacity=createSlider(0, 1, 1, 0.01);
  imgOpDiv=createDiv("opacity: " + floor(imgOpacity.value()*100), true);
  imgOpDiv.parent("imgOpacity");
  imgOpacity.parent("imgOpacity");
  imgOpacity.style('width','200px');

  blendSel = createSelect()
  blendSel.option(BLEND)
  blendSel.option(ADD)
  blendSel.option(DARKEST)
  blendSel.option(LIGHTEST)
  blendSel.option(MULTIPLY)
  blendSel.option(SCREEN)
  blendSel.option(OVERLAY)
  blendSel.option(SOFT_LIGHT)
  blendSel.option(DODGE)
  blendSel.option(BURN)
  blendSel.option(DIFFERENCE)
  blendSel.option(EXCLUSION)
  blendSel.parent("blendSelect")
  blendSel.style("font-family:courier;")
  // blendSel.id("test3")

  blendSelImg = createSelect()
  blendSelImg.option(BLEND)
  blendSelImg.option(ADD)
  blendSelImg.option(DARKEST)
  blendSelImg.option(LIGHTEST)
  blendSelImg.option(MULTIPLY)
  blendSelImg.option(SCREEN)
  blendSelImg.option(OVERLAY)
  blendSelImg.option(SOFT_LIGHT)
  blendSelImg.option(DODGE)
  blendSelImg.option(BURN)
  blendSelImg.option(DIFFERENCE)
  blendSelImg.option(EXCLUSION)
  blendSelImg.parent("blendSelectImg")
  blendSelImg.style("font-family:courier;")
  // blendSelImg.id("test4")


  compressButton = createButton("compress");
  compressButton.mousePressed(compress);
  compressButton.mouseReleased(returnServedImage)
  compressButton.parent("compressButton")
  compressButton.style("font-family:courier;")

  saveButton = createButton("save")
  saveButton.mousePressed(justSaveCanvas);
  saveButton.parent("saveButton")
  saveButton.style("font-family:courier;margin:5px")

  //color stuff
  Hue = createSlider(0, 360, 0, 1)
  Saturation = createSlider(0, 100, 50, 1)
  Lightness = createSlider(0, 100, 0, 1)
  Hue.id("test")
  Saturation.id("test1")
  Lightness.id("test2")
  Hue.parent("Hue")
  Saturation.parent("Saturation")
  Lightness.parent("Lightness")
  colorDiv = createDiv('')
  colorDiv.parent("colorBox")

  //draw stuff
  drawOptions = createRadio();
  var temp = drawOptions.option('1',"line");   //line
  drawOptions.option('2', "spray");             //spray
  drawOptions.option('3', "color picker");             //color picker
  drawOptions.parent("drawOptions")
  temp.checked = true

  //Line
  lineOptions = document.getElementById("lineContainter")

  lineSize = createSlider(1, 100, 1, 1)
  lineSizeDiv = createDiv('line size: ' + lineSize.value(), true)
  lineSizeDiv.parent('lineSize')
  lineSize.parent('lineSize')
  lineSize.style('width','200px')

  lineAlpha = createSlider(0, 1, 1, 0.01)
  lineAlphaDiv = createDiv('line alpha: ' + floor(lineAlpha.value()*100), true)
  lineAlphaDiv.parent('lineAlpha')
  lineAlpha.parent('lineAlpha')
  lineAlpha.style('width','200px')

  //Spraypaint
  sprayOptions = document.getElementById("sprayContainer")

  sprayDiameter = createSlider(1, 100, 25, 1)
  diameterDiv = createDiv('spray diameter: ' + sprayDiameter.value(), true)
  diameterDiv.parent('sprayDiameter')
  sprayDiameter.parent('sprayDiameter')
  sprayDiameter.style('width','200px')
    // document.getElementById("sprayDiameter").oninput=function(){testFunc()}

  // function testFunc(){
  //   diameterDiv.html('spray diameter: '+sprayDiameter.value(),true)
  // }


  sprayDensity = createSlider(0.1, 20, 5, 0.1)
  densityDiv = createDiv('spray density: ' + sprayDensity.value(), true)
  densityDiv.parent('sprayDensity')
  sprayDensity.parent('sprayDensity')
  sprayDensity.style('width','200px')

  sprayDotSize = createSlider(0.5, 10, 1, 0.5)
  dotSizeDiv = createDiv('dot size: ' + sprayDotSize.value(), true)
  dotSizeDiv.parent('dotSize')
  sprayDotSize.parent('dotSize')
  sprayDotSize.style('width','200px')

  sprayAlpha = createSlider(0, 1, 0.7, 0.01)
  sAlphaDiv = createDiv('spray alpha: ' + floor(sprayAlpha.value()*100), true)
  sAlphaDiv.parent('sprayAlpha')
  sprayAlpha.parent('sprayAlpha')
  sprayAlpha.style('width','200px')

  // h = Hue.value();
  // s = Saturation.value();
  // l = Lightness.value();

}



var drawLineWeight = 0
var bItem
var bImgItem

function selectBlendMode() {
  bItem = blendSel.value();
  blendMode(bItem)
}
function selectBlendModeImg() {
  bImgItem = blendSelImg.value()
  blendMode(bImgItem)
}

function gotFile(file) {
  blendMode(BLEND)
  img = createImg(file.data).hide();
  image(img, width / 2, height / 2)
  selectBlendMode()
  // item = blendSel.value();
}

function draw() {
  // console.log(drawVal)
  blendSel.changed(selectBlendMode)
  // blendSelImg.changed(selectBlendModeImg)

  // sprayDiameter.style("margin:10px;width: 200px;")
  // sprayDensity.style("margin:10px;width: 200px;")
  // sprayDotSize.style("margin:10px;width: 200px;")
  // sprayAlpha.style("margin:10px;width: 200px;")

  // this below used to update the displayed slider values. Can't fix it right now

  diameterDiv.html('spray diameter: ' + sprayDiameter.value(), false);
  densityDiv.html('spray density: ' + sprayDensity.value(), false);
  dotSizeDiv.html('particle size: ' + sprayDotSize.value(), false);
  sAlphaDiv.html('spray alpha: ' + floor(sprayAlpha.value()*100), false);
  //
  lineSizeDiv.html('line size: ' + lineSize.value(), false);
  lineAlphaDiv.html('line alpha: ' + floor(lineAlpha.value()*100), false);
  //
  zoomDiv.html("zoom: " + zoom.value() + "px", false)
  qualityDiv.html("qulaity: "+quality.value(),false)
  //
  rotateImgDiv.html("rotate: " + rotateImg.value() + "°", false)

  jitterDiv.html("jitter: " + jitterImg.value(),false)

  noiseDiv.html("noise: " + noiseSlider.value(), false)

  // gifCompDiv.html("gif quality: " + gifCompression.value())

  saturationDiv.html("saturation: "+saturationSlider.value(),false)
  sharpnessDiv.html("sharpness: "+sharpnessSlider.value(),false)

  imgOpDiv.html("opacity: "+ floor(imgOpacity.value()*100),false)

  redDiv.html("red: "+redChan.value(),false)
  greenDiv.html("green: "+greenChan.value(),false)
  blueDiv.html("blue: "+blueChan.value(), false)

  // End of slider stuff that needs fixing above

  //color draw stuff
  // console.log(temp[0])
  h = Hue.value()
  s = Saturation.value()
  l = Lightness.value()
  // a = 1
  clr = color(h, s, l, a)
  sprayClr = color(h, s, l, random(a/10,a))
    // pickClr = color()
    // mainClr=
  colorDiv.style("width:60px;height:50px;background-color:hsl(" + h + "," + s + "%," + l + "%);margin:5px;padding-bottom:10px")



  var drawVal = drawOptions.value()
  if (mouseIsPressed & drawVal == '1') {
    // console.log("running")
    if (millis() > next && painting) {
      paths[paths.length - 1].add(1)
      next = millis()
    }
    next = 0
    painting = true
    paths.push(new DrawLine())
    beginShape()
    for (var i = 0; i < paths.length; i++) {
      paths[i].update()
      paths[i].display();
    }
    endShape()
  } else {
    painting = false
    paths = []
  }
  //show and hide line options
  if (drawVal == '1') {
    a = lineAlpha.value();
    lineOptions.style.display = "flex";
    lineOptions.style.flexDirection = "column";
  } else {
    lineOptions.style.display = "none"
  }

  //show and hide spray options
  if (drawVal == '2') {
    a = sprayAlpha.value()
    sprayOptions.style.display = "flex"
    sprayOptions.style.flexDirection = "column"
  } else {
    sprayOptions.style.display = "none"
  }

  if (mouseIsPressed & drawVal == '2') {
    // h = Hue.value()
    // s = Saturation.value()
    // l = Lightness.value()
      // console.log(sprayOptions)

    var sDiameter = sprayDiameter.value();
    var sDensity = sprayDensity.value();
    var sDotSize = sprayDotSize.value();
    // var sAlpha = sprayAlpha.value();
    // var sDotRand = sprayDotRand.value()

    var items = random(sDensity) * (sDiameter / 1.5);
    for (var i = 0; i < items; i++) {

      var x = 0 + sDiameter * Math.cos(2 * Math.PI * i / items);
      var y = 0 + sDiameter * Math.sin(2 * Math.PI * i / items);
      push();
      translate(mouseX, mouseY)
      rotate(random(360))
      noStroke()
      fill(sprayClr)

      ellipse(random(x), random(y), random(0.25, sDotSize * 1.5))
      pop()
    }
  }
  if (mouseIsPressed & drawVal == '3' & mouseX>0&mouseX<width&mouseY>0&mouseY<height) {
    c = get(mouseX, mouseY)
    temp = rgbToHsl()
    document.getElementById("test").value = temp[0]
    document.getElementById("test1").value = temp[1]
    document.getElementById("test2").value = temp[2]
  //   h = temp[0]
  // s = temp[1]
  // l = temp[2]
  }
  if (drawVal == '3') {
    compressButton.hide()
  } else {
    compressButton.show()
  }
  // console.log(drawOptions.value())
}
var temp
  //Draw vertex stuff
function DrawLine() {
  this.vertexs = [];
}
DrawLine.prototype.add = function() {
  this.vertexs.push(new DrawVertex())
}
DrawLine.prototype.update = function() {
  for (var i = 0; i < this.vertexs.length; i++) {
    this.vertexs[i].update()
  }
}
DrawLine.prototype.display = function() {
  for (var i = this.vertexs.length - 1; i >= 0; i--) {
    if (this.vertexs[i].life <= 0) {
      this.vertexs.splice(i, 1)
    } else {
      this.vertexs[i].display(this.vertexs[i + 1])
    }
  }
}

function DrawVertex(position) {
  this.x = mouseX
  this.y = mouseY
  this.life = 5;
}
DrawVertex.prototype.update = function() {
  this.life--
}
DrawVertex.prototype.display = function() {
    stroke(clr)
    strokeWeight(lineSize.value())
    noFill()
    strokeCap(SQUARE)
    strokeJoin(ROUND)
    curveVertex(this.x, this.y)
  }
  //Draw vertex stuff end



var imgNumber = 0
var stringNumber
var standAloneSaveNum = 0
var on = false

function justSaveCanvas() {
  stringNumber = String(standAloneSaveNum).padStart(5,'0')
  save("just the canvas MyCanvas"+stringNumber+".jpg");
  standAloneSaveNum++;
}

function compress() {
  stringNumber = String(imgNumber).padStart(5,'0')
  // if (button.mousePressed() === true){
  // save(cnv,"image"+imgNumber,".jpg")
  // selectBlendMode()
  save("MyCanvas"+stringNumber+".jpg");
  // save("MyCurrentCanvas.jpg");
  // save('../111/'+"MyCanvas"+stringNumber+".jpg");
  on = true;
  // calledThing()
  // } else{
  //   on=false
  // }
  imgNumber = imgNumber + 1
  var cData = {
    trig: on,
    sendNumber: imgNumber,
    qualityNum: quality.value(),
    sendWidth: width,
    sendHeight: height,
    sharpNum: sharpnessSlider.value(),
    saturationNum: saturationSlider.value(),
    noiseNum: noiseSlider.value(),
    redVal: 1+redChan.value(),
    greenVal: 1+greenChan.value(),
    blueVal: 1+blueChan.value()
  }
  // console.log("it's in compress")
  socket.emit('trigger', cData)
  // console.log(on)
    //   setTimeout(function(){
    //     loadImage(imgNumber+"MyCanvas.jpg", function(img) {
    //       translate(windowWidth/2,windowHeight/2)
    //   image(img, 0, 0,650,650);
    // });
    //   },1500)

}



function returnServedImage() {
  stringNumber = String(imgNumber).padStart(5,'0')
  on = false
  // currentImg = loadImage("MyCurrentCanvas.jpg")
  // image(currentImg, 0, 0, width, height)
  setTimeout(function() {
    // loadImage("images/canvas/MyCanvas"+stringNumber+".jpg", function(img) {
    loadImage("images/canvas/currentCanvas.jpg", function(img) {
    // loadImage("../111/rotate.png", function(img) {
      // blendMode(BLEND)
      selectBlendModeImg()
      tint(100,imgOpacity.value());
      translate(width/2+random(jitterImg.value()*-1,jitterImg.value()), height/2+random(jitterImg.value()*-1,jitterImg.value()))
      image(img, 0, 0, width, height);
      rotate(rotateImg.value())

      image(img, 0, 0, width + zoom.value() + random(jitterImg.value()*-1,jitterImg.value()), height + zoom.value() + random(jitterImg.value()*-1,jitterImg.value()));



      selectBlendMode()
    });
  }, 250)
}

function keyPressed(){
  if (keyCode === 192){
    compress()
  }
}
function keyReleased(){
  if (keyCode === 192){
    returnServedImage()
  }
}

function rgbToHsl(r, g, b) {
  r = c[0]
  g = c[1]
  b = c[2]
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}
var gifOn=false
function makeGif(){
  gifOn=true;
  var cData2 = {
    trig2:gifOn,
    sendCounter:100// imgNumber
    // gifComp:gifCompression.value()
  }
  console.log("it's in gif")
  socket.emit('gif',cData2)
}
function finishGif(){
  gifOn=false
}
var sharpOn=false
function sharpEvent(){
  if (this.checked()){
    sharpOn=true
  } else{
    sharpOn=false
  }
}

// function sendDir(){
//   // dirFolderName.value("dumb")
//
//   var data3 = {
//     folderName:dirFolderName.value()
//   }
//   socket.emit('dumb',data3)
// }
