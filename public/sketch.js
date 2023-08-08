
var saveButton
var sprayOptions
var drawOptions

var spreadX = 10
var spreadY = 10

var paths = []
var painting = false
var next = 0
var saveEditing = false

var blendSel

var Hue, Saturation, Lightness
var colorDiv
var clr, sprayClr, pickClr, mainClr
var h, s, l, a
var img;

var gifButton;
var dirFolderName
var dirSet

var imgNumber = 0
var stringNumber
var standAloneSaveNum = 0

// I think this function is used for the numbering of the files to fill it up with 0's?
function setup() {
  //process to make padded number for filename
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

  pixelDensity(2)
  var cRatio = 720
  var cnv = createCanvas(cRatio, floor(cRatio*0.67))
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

  compressButton = createButton("compress");
  compressButton.mousePressed(compress);
  compressButton.mouseReleased(returnServedImage)
  compressButton.parent("compressButton")
  compressButton.style("font-family:courier;margin-top:25px;")

  saveButton = createButton("save")
  saveButton.mousePressed(justSaveCanvas);
  saveButton.parent("saveButton")
  saveButton.style("font-family:courier;margin-top:15px;")

  gifButton=createButton("make_gif");
  gifButton.mousePressed(makeGif);
  gifButton.mouseReleased(finishGif)
  gifButton.parent("gifButton")
  gifButton.style("font-family:courier;margin-top:15px;")

  saveFileName=createInput("thisCanvas");
  saveFileName.parent("setFileName")
  saveFileName.attribute('disabled', '');
  saveFileName.style("font-family:courier;")

  resetButDiv = createDiv("img count: "+imgNumber);
  resetButDiv.parent("resetBut")
  resetButDiv.style("margin-top:15px;")
  resetBut = createButton("reset img counter");
  resetBut.parent("resetBut");
  resetBut.attribute('disabled', '');
  resetBut.style("font-family:courier;font-size:13px;width:150px;");
  resetBut.mousePressed(resetImgNum)

  enSave=createCheckbox('edit settings');
  enSave.parent("enableSaveChk");
  enSave.changed(enableSaveOp);
  enSave.style("width:150px;margin-top:15px;margin-bottom:25px;")

  zoom = createSlider(0, 500, 0, 0.5)
  zoomDiv = createDiv("img zoom: " + zoom.value() + "px", true)
  zoomDiv.parent("zoom")
  zoom.parent("zoom")
  zoom.style("width:200px;")
  zoomDiv.style("padding-top:20px;border-style: solid none none none; border-color: #afabaf")

  // 75 is GM's default so I have that set as the default here too
  // I want to encurage lossy-ness but quality can be set to a max of 100
  quality = createSlider(1,100,45,1)
  qualityDiv=createDiv("qulaity: "+quality.value(),true)
  qualityDiv.parent("quality")
  quality.parent("quality")
  quality.style('width','200px')

  saturationSlider=createSlider(0,100,0,1)
  saturationDiv=createDiv("saturation: "+saturationSlider.value(),true)
  saturationDiv.parent("extras")
  saturationSlider.parent("extras")
  saturationSlider.style("width:200px;")

  redChan=createSlider(-0.25,0.25,0,0.01)
  redDiv=createDiv("red: "+redChan.value(),true)
  redDiv.parent("redC")
  redChan.parent("redC")
  redChan.style('width','175px')

  greenChan=createSlider(-0.25,0.25,0,0.01)
  greenDiv=createDiv("green: "+greenChan.value(),true)
  greenDiv.parent("greenC")
  greenChan.parent("greenC")
  greenChan.style('width','175px')

  blueChan=createSlider(-0.25,0.25,0,0.01)
  blueDiv=createDiv("blue: "+blueChan.value(),true)
  blueDiv.parent("blueC")
  blueChan.parent("blueC")
  blueChan.style('width','175px')

  sharpnessSlider = createSlider(1,100,1,1)
  sharpnessDiv=createDiv("sharpness: "+sharpnessSlider.value(),true)
  sharpnessDiv.parent("extras")
  sharpnessSlider.parent("extras")
  sharpnessSlider.style("width:200px;")

  rotateImg = createSlider(-90, 90, 0, 1)
  rotateImgDiv = createDiv("rotate: " + rotateImg.value() + "°", true)
  rotateImgDiv.parent("rotate")
  rotateImg.parent("rotate")
  rotateImg.style('width','200px')

  jitterImg=createSlider(0, 10, 0, 0.5);
  jitterDiv=createDiv("jitter: "+ jitterImg.value(),true);
  jitterDiv.parent("jitter");
  jitterImg.parent("jitter");
  jitterImg.style("width:200px;margin-bottom:25px;")

  noiseSlider = createSlider(0,100,0,1);
  noiseDiv = createDiv("noise: " + noiseSlider.value(), true);
  noiseDiv.parent("noise");
  noiseSlider.parent("noise");
  noiseSlider.style('width', '200px');
  noiseDiv.style("padding-top:20px;border-style: solid none none none; border-color: #afabaf")

  imgOpacity=createSlider(0.01, 1, 1, 0.01);
  imgOpDiv=createDiv("opacity: " + floor(imgOpacity.value()*100), true);
  imgOpDiv.parent("imgOpacity");
  imgOpacity.parent("imgOpacity");
  imgOpacity.style('width','200px');

  smpSize=createSlider(0.5,2,1.9,0.1);
  smpSizeDiv=createDiv("sample factor: "+smpSize.value(),true);
  smpSizeDiv.parent("sampleSize");
  smpSize.parent("sampleSize");
  smpSize.style("width:200px;")

  blendSel = createSelect()
  blendSel.option(BLEND)
  blendSel.option(DARKEST)
  blendSel.option(LIGHTEST)
  blendSel.option(ADD)
  blendSel.option(MULTIPLY)
  blendSel.option(SCREEN)
  blendSel.option(OVERLAY)
  blendSel.option(HARD_LIGHT)
  blendSel.option(SOFT_LIGHT)
  blendSel.option(DODGE)
  blendSel.option(BURN)
  blendSel.option(DIFFERENCE)
  blendSel.option(EXCLUSION)
  blendSel.parent("blendSelect")
  blendSel.style("font-family:courier;margin-left:20px;")

  blendSelImg = createSelect()
  blendSelImg.option(BLEND)
  blendSelImg.option(DARKEST)
  blendSelImg.option(LIGHTEST)
  blendSelImg.option(ADD)
  blendSelImg.option(MULTIPLY)
  blendSelImg.option(SCREEN)
  blendSelImg.option(OVERLAY)
  blendSelImg.option(HARD_LIGHT)
  blendSelImg.option(SOFT_LIGHT)
  blendSelImg.option(DODGE)
  blendSelImg.option(BURN)
  blendSelImg.option(DIFFERENCE)
  blendSelImg.option(EXCLUSION)
  blendSelImg.parent("blendSelectImg")
  blendSelImg.style("font-family:courier;margin-bottom:10px")

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

  clrPBlk = createDiv('')
  clrPBlk.parent("colorPalBlk")
  clrPGry = createDiv('')
  clrPGry.parent("colorPalGry")
  clrPWht = createDiv('');
  clrPWht.parent("colorPalWht")
  clrPRed = createDiv('');
  clrPRed.parent("colorPalRed")
  clrPBlu = createDiv('');
  clrPBlu.parent("colorPalBlu")
  clrPYlw = createDiv('');
  clrPYlw.parent("colorPalYlw")

  clrPGrn = createDiv('');
  clrPGrn.parent("colorPalGrn")
  clrPOrg = createDiv('');
  clrPOrg.parent("colorPalOrg");
  clrPPrp = createDiv('');
  clrPPrp.parent("colorPalPrp");
  clrPCyn = createDiv('');
  clrPCyn.parent("colorPalCyn");
  clrPMgt = createDiv('');
  clrPMgt.parent("colorPalMgt");
  clrPLim = createDiv('');
  clrPLim.parent("colorPalLim")

  //draw stuff
  drawOptions = createRadio("drwOpt");
  var temp = drawOptions.option('1',"line");   //line
  drawOptions.option('2', "spray");             //spray
  drawOptions.option('3', "color picker");             //color picker
  drawOptions.parent("drawOptions");
  temp.checked = true

  imageFit = createRadio("imgFit");
  var fitTemp = imageFit.option('1',"contain");
  imageFit.option('2',"cover");
  imageFit.parent("dropFit");
  imageFit.style("margin-bottom:20px;")
  fitTemp.checked = true

  //Line
  lineOptions = document.getElementById("lineContainter")

  lineSize = createSlider(1, 100, 1, 1)
  lineSizeDiv = createDiv('line size: ' + lineSize.value(), true)
  lineSizeDiv.parent('lineSize')
  lineSize.parent('lineSize')
  lineSize.style('width','200px')

  lineAlpha = createSlider(0.01, 1, 1, 0.01)
  lineAlphaDiv = createDiv('line opacity: ' + floor(lineAlpha.value()*100), true)
  lineAlphaDiv.parent('lineAlpha')
  lineAlpha.parent('lineAlpha')
  lineAlpha.style('width','200px')

  //Spray
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


  sprayDensity = createSlider(1, 100, 20, 1)
  densityDiv = createDiv('spray density: ' + sprayDensity.value(), true)
  densityDiv.parent('sprayDensity')
  sprayDensity.parent('sprayDensity')
  sprayDensity.style('width','200px')

  sprayDotSize = createSlider(0.5, 10, 1, 0.5)
  dotSizeDiv = createDiv('dot size: ' + sprayDotSize.value(), true)
  dotSizeDiv.parent('dotSize')
  sprayDotSize.parent('dotSize')
  sprayDotSize.style('width','200px')

  sprayAlpha = createSlider(0.01, 1, 0.7, 0.01)
  sAlphaDiv = createDiv('spray opacity: ' + floor(sprayAlpha.value()*100), true)
  sAlphaDiv.parent('sprayAlpha')
  sprayAlpha.parent('sprayAlpha')
  sprayAlpha.style('width','200px')
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

//drag and drop image
function gotFile(file) {
  if (saveEditing == false){
    blendMode(blendSelImg.value())
    imageMode(CENTER)
    pg = createGraphics(width,height);
    img = createImg(file.data).hide();
    //dropped image sizing
    var setFitting = CONTAIN
    var fitVal = imageFit.value()
    if (fitVal === '1'){
      setFitting = CONTAIN //resizes dropped image to fit inside canvas
    } else{
      setFitting = COVER //resizes dropped image to fill canvas space
    }
    tint(100,imgOpacity.value())
    pg.image(img, 0, 0, width, height, 0, 0, img.width, img.height, setFitting)
    image(pg,width/2,height/2)
  }
}

//reset image numbers for current project
function resetImgNum(){
  imgNumber = 0;
  standAloneSaveNum = 0;
}

function draw() {
  blendSel.changed(selectBlendMode)

  //slider values to be updated in draw loop
  diameterDiv.html('spray diameter: ' + sprayDiameter.value(), false);
  densityDiv.html('spray density: ' + sprayDensity.value(), false);
  dotSizeDiv.html('particle size: ' + sprayDotSize.value(), false);
  sAlphaDiv.html('spray opacity: ' + floor(sprayAlpha.value()*100), false);

  lineSizeDiv.html('line size: ' + lineSize.value(), false);
  lineAlphaDiv.html('line opacity: ' + floor(lineAlpha.value()*100), false);

  zoomDiv.html("zoom: " + zoom.value() + "px", false)
  qualityDiv.html("qulaity: "+quality.value(),false)
  smpSizeDiv.html("sample factor: "+smpSize.value(),false);

  rotateImgDiv.html("rotate: " + rotateImg.value() + "°", false)

  jitterDiv.html("jitter: " + jitterImg.value(),false)

  noiseDiv.html("noise: " + noiseSlider.value(), false)

  saturationDiv.html("saturation: "+saturationSlider.value(),false)
  sharpnessDiv.html("sharpness: "+sharpnessSlider.value(),false)

  imgOpDiv.html("opacity: "+ floor(imgOpacity.value()*100),false)

  redDiv.html("red: "+redChan.value(),false)
  greenDiv.html("green: "+greenChan.value(),false)
  blueDiv.html("blue: "+blueChan.value(), false)

  resetButDiv.html("img count: "+imgNumber, false)

  //color selection slider values
  h = Hue.value()
  s = Saturation.value()
  l = Lightness.value()
  clr = color(h, s, l, a) //selected color data
  sprayClr = color(h, s, l, random(a*0.75,a)) //color data for spray tool
  //display current color in color select
  colorDiv.style("width:60px;height:55px;background-color:hsl(" + h + "," + s + "%," + l + "%);margin-left:5px;padding-bottom:5px");
  clrPBlk.style("width:10px;height:10px;background-color:hsl(0,100%,0%);")
  clrPWht.style("width:9px;height:9px;background-color:hsl(0,100%,100%);border:black 1px;border-style: solid solid none none")
  clrPGry.style("width:9px;height:9px;background-color:hsl(0,0%,50%);border:black 1px;border-style: solid solid none none")
  clrPRed.style("width:9px;height:9px;background-color:hsl(0,100%,50%);border:black 1px;border-style: solid solid none none")
  clrPGrn.style("width:9px;height:9px;background-color:hsl(120,100%,25%);border:black 1px;border-style: solid solid none none")
  clrPBlu.style("width:9px;height:9px;background-color:hsl(240,100%,50%);border:black 1px;border-style: solid solid none none")
  clrPCyn.style("width:8px;height:9px;background-color:hsl(180,100%,50%);border:black 1px;border-style: solid solid solid solid")
  clrPMgt.style("width:9px;height:9px;background-color:hsl(300,100%,50%);border:black 1px;border-style: solid solid solid none")
  clrPYlw.style("width:9px;height:9px;background-color:hsl(60,100%,50%);border:black 1px;border-style: solid solid solid none")
  clrPOrg.style("width:9px;height:9px;background-color:hsl(39,100%,50%);border:black 1px;border-style: solid solid solid none")
  clrPLim.style("width:9px;height:9px;background-color:hsl(90,100%,50%);border:black 1px;border-style: solid solid solid none")
  clrPPrp.style("width:9px;height:9px;background-color:hsl(300,100%,25%);border:black 1px;border-style: solid solid solid none")

  var blkPicked = document.getElementById("colorPalBlk")
  blkPicked.onclick = function(){
    document.getElementById("test").value = 0;document.getElementById("test1").value = 100;document.getElementById("test2").value = 0;
  }
  var gryPicked = document.getElementById("colorPalGry")
  gryPicked.onclick = function(){
    document.getElementById("test").value = 0;document.getElementById("test1").value = 0;document.getElementById("test2").value = 50;
  }
  var whtPicked = document.getElementById("colorPalWht")
  whtPicked.onclick = function(){
    document.getElementById("test").value = 0;document.getElementById("test1").value = 100;document.getElementById("test2").value = 100;
  }

  var redPicked = document.getElementById("colorPalRed")
  redPicked.onclick = function(){
    document.getElementById("test").value = 0;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var grnPicked = document.getElementById("colorPalGrn")
  grnPicked.onclick = function(){
    document.getElementById("test").value = 120;document.getElementById("test1").value = 100;document.getElementById("test2").value = 25;
  }
  var bluPicked = document.getElementById("colorPalBlu")
  bluPicked.onclick = function(){
    document.getElementById("test").value = 240;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var cynPicked = document.getElementById("colorPalCyn")
  cynPicked.onclick = function(){
    document.getElementById("test").value = 180;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var mgtPicked = document.getElementById("colorPalMgt")
  mgtPicked.onclick = function(){
    document.getElementById("test").value = 300;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var ylwPicked = document.getElementById("colorPalYlw")
  ylwPicked.onclick = function(){
    document.getElementById("test").value = 60;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var orgPicked = document.getElementById("colorPalOrg")
  orgPicked.onclick = function(){
    document.getElementById("test").value = 39;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var limPicked = document.getElementById("colorPalLim")
  limPicked.onclick = function(){
    document.getElementById("test").value = 120;document.getElementById("test1").value = 100;document.getElementById("test2").value = 50;
  }
  var prpPicked = document.getElementById("colorPalPrp")
  prpPicked.onclick = function(){
    document.getElementById("test").value = 300;document.getElementById("test1").value = 100;document.getElementById("test2").value = 25;
  }

  var drawVal = drawOptions.value()

  //show and hide line options
  if (drawVal == '1') {
    a = lineAlpha.value();
    lineOptions.style.display = "flex";
    lineOptions.style.flexDirection = "column";
  } else {
    lineOptions.style.display = "none"
  }
  //line tool
  if (mouseIsPressed & drawVal == '1' & saveEditing == false) {
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

  //show and hide spray options
  if (drawVal == '2') {
    a = sprayAlpha.value()
    sprayOptions.style.display = "flex"
    sprayOptions.style.flexDirection = "column"
  } else {
    sprayOptions.style.display = "none"
  }
  //spray tool
  if (mouseIsPressed & drawVal == '2' & saveEditing == false) {
    var sDiameter = sprayDiameter.value()/2;
    var sDensity = sprayDensity.value();
    var sDotSize = sprayDotSize.value();
    // var sAlpha = sprayAlpha.value();
    // var sDotRand = sprayDotRand.value()
    var items = random(sDensity) * ((sDiameter / 2)/sDotSize);
    for (var i = 0; i < items; i++) {
      var x = 0 + sDiameter * Math.cos(2 * Math.PI * i / (items*random(-1,1)));
      var y = 0 + sDiameter * Math.sin(2 * Math.PI * i / (items*random(-1,1)));
      push();
      translate(mouseX, mouseY)
      rotate(random(360))
      noStroke()
      fill(sprayClr)
      ellipse(random(x), random(y), random(0.25, sDotSize * 1.5))
      pop()
    }
  }

  //show and hide color picker options
  // if (drawVal == '3') {
  //   compressButton.hide()
  // } else {
  //   compressButton.show()
  // }
  //color picker tool
  if (mouseIsPressed & drawVal == '3' & mouseX>0&mouseX<width&mouseY>0&mouseY<height) {
    c = get(mouseX, mouseY)
    temp = rgbToHsl()
    document.getElementById("test").value = temp[0]
    document.getElementById("test1").value = temp[1]
    document.getElementById("test2").value = temp[2]
  }
}

//Enables file options and dissable saving and drawing
function enableSaveOp(){
  if (this.checked()){
    saveEditing = true;
    saveFileName.removeAttribute('disabled');
    resetBut.removeAttribute('disabled');

    saveButton.attribute('disabled', '');
    compressButton.attribute('disabled', '');
    gifButton.attribute('disabled', '');
  }
  //Disables file options and enables saving and drawing
  else{
    saveEditing = false;
    saveFileName.attribute('disabled', '');
    resetBut.attribute('disabled', '');

    saveButton.removeAttribute('disabled');
    compressButton.removeAttribute('disabled');
    gifButton.removeAttribute('disabled');
  }
}

var temp

//Draw vertex stuff
//Adapted from the p5.js example "Hello P5: drawing"
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


var on = false

//Save current canvas with no added compression
function justSaveCanvas() {
  stringNumber = String(standAloneSaveNum).padStart(5,'0')
  save(saveFileName.value()+stringNumber+".jpg");
  standAloneSaveNum++;
}

//Send current canvas to server to compress when button/key is pressed
function compress() {
  stringNumber = String(imgNumber).padStart(5,'0')
  cmprssName = saveFileName.value()+"-cmprss-"
  save(cmprssName+stringNumber+".jpg");
  on = true;
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
    blueVal: 1+blueChan.value(),
    saveName: "/"+cmprssName,
    canvasWidth: width,
    scaleFctr: smpSize.value()
  }
  socket.emit('trigger', cData)

}

//Open compressed canvas on key/button release
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
      image(img, 0, 0, width + zoom.value() + random(jitterImg.value()*-1,jitterImg.value()), height + (zoom.value()*0.67) + random(jitterImg.value()*-1,jitterImg.value()));

      selectBlendMode()
    });
  }, 250)
}

//press tilde key to compress image
function keyPressed(){
  if (keyCode === 192 & saveEditing == false){
    compress()
  }
}
function keyReleased(){
  if (keyCode === 192 & saveEditing == false){
    returnServedImage()
  }
}

//RGB to HSL formula
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

//Sends data to server to make a gif of current sequence
function makeGif(){
  gifOn=true;
  gifName=saveFileName.value()
  var cData2 = {
    trig2:gifOn,
    sendCounter:100,// imgNumber
    saveName: "/"+gifName+"*",
    saveNameOut: "/"+gifName
  }
  console.log("it's in gif")
  socket.emit('gif',cData2)
}

//resets gif button to false
function finishGif(){
  gifOn=false
}
