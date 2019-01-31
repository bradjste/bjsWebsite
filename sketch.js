var osc1, osc2, osc3 ,osc4, fft;
var osc5;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
var mPressed = false;
var splashButton, artButton, musicButton, contButton;
var shhButton;
var isSplash = true;
var artIsSelected = false;
var musicIsSelected = false;
var projIsSelected = false;
var contIsSelected = false;
var shouldDrawWF = false;
var isHovering, onTB = false;
var isMuted = false;
var currSong;
var titleNum = 0;
var lineGrowth = 0;
var lineGrowthSpeed = 10;
var rectX;
var rectY;
var rectWidth;
var rectHeight;
var titleArray = [];
var songPlaying = false;
var splashButtonBool = true;
var col1, col2, col3, col4, col5, col6, colText;
var colBorderOff;
var firstDraw = true;
var wipeTime =0;
var wipeCount= 0;
var wipeBool = false;
var wipeNum = 18;
var currImg = 0;
var artImgArray= [];
var projImgArray = [];
var contImgArray =[];
var currImgArray;
var canDrawFrame = false;
var artString = "I am a generative artist, or an artist that uses computer science, randomness, and musical instincts to guide abstract ideas and systems to produce unprecedented results.";
var musicString = "Hexer Quiz - The Glow"+"\n"+"Out March 23rd";
var projString = "stuff stuff stuff proj stuff stuff stuff stuff proj stuff stuff stuff stuff proj stuff stuff stuff stuff proj stuff";
var contString = "stuff stuff stuff cont stuff stuff stuff stuff cont stuff stuff stuff stuff cont stuff stuff stuff stuff cont stuff";

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360,100,100);
  background(0);

  currSong = loadSound('assets/music/drumgum5.wav');
  currSong.setVolume(0.5);
  currSong.onended(songEnd);

  osc1 = new p5.SqrOsc(); // set frequency and type
  osc2 = new p5.TriOsc(); // set frequency and type
  osc3 = new p5.TriOsc(); // set frequency and type
  osc4 = new p5.TriOsc(); // set frequency and type

  osc1.amp(0);
  osc2.amp(0);
  osc3.amp(0);
  osc4.amp(0);

  colorPhase=0;
  fft = new p5.FFT();
  osc1.start();
  osc2.start();
  osc3.start();
  osc4.start();

  noCursor();
  background(0);
  textAlign(CENTER);
  textSize(windowWidth*0.08);
  stroke(0);
  strokeWeight(60);
  count = 0.0;

  currImgArray = artImgArray;

  artImgArray[0] = loadImage('assets/artImg/art0.jpg');
  artImgArray[1] = loadImage('assets/artImg/art1.jpg');
  artImgArray[2] = loadImage('assets/artImg/art2.jpg');
  artImgArray[3] = loadImage('assets/artImg/art3.jpg');
  artImgArray[4] = loadImage('assets/artImg/art4.jpg');
  artImgArray[5] = loadImage('assets/artImg/art5.jpg');
  artImgArray[6] = loadImage('assets/artImg/art6.jpg');
  artImgArray[7] = loadImage('assets/artImg/art7.jpg');
  artImgArray[8] = loadImage('assets/artImg/art8.jpg');

  titleArray[0] = "audio engineer";
  titleArray[1] = "composer";
  titleArray[2] = "creative coder";
  titleArray[3] = "generative artist";
  titleArray[4] = "interactive designer";
  titleArray[5] = "web designer";
  titleArray[6] = "UI designer";
  titleArray[7] = "music producer";
  titleArray[8] = "event manager";
  titleArray[9] = "musical instrument prototyper";
  titleArray[10] = "digital instrument designer";
  titleArray[11] = "sound designer";
  titleArray[12] = "image processor";
  titleArray[13] = "new friend";
  titleArray[14] = "puredata specialist";

    setInterval(titleNumInc,1000);

  splashButton = createButton('ENTER');
  splashButton.mouseOver(isHov);
  splashButton.mouseOut(isntHov);
  splashButton.style('border-radius', '20%');
  splashButton.style('cursor', 'cell');
  splashButton.style('outline', 'none');
  splashButton.style('opacity','0');
  splashButton.style('visibility','hidden');
  splashButton.style('-webkit-transition', 'opacity 2s');
  splashButton.style('transition', 'opacity 2s');
  splashButton.mousePressed(menuTrans);
  splashButton.size(windowWidth*0.1,windowWidth*0.05);

  shhButton = createButton('sound');
  shhButton.mouseOver(isHov);
  shhButton.mouseOut(isntHov);
  shhButton.style('cursor', 'cell');
  shhButton.style('outline', 'none');
  shhButton.mousePressed(mute);

  artButton = createButton('ART');
  artButton.mouseOver(isHov);
  artButton.mouseOut(isntHov);
  artButton.hide();
  artButton.style('opacity', '0');
  artButton.style('border-radius', '20%');
  artButton.style('cursor', 'cell');
  artButton.style('-webkit-transition', 'opacity 1s');
  artButton.style('transition', 'opacity 1s');
  artButton.style('outline', 'none');
  artButton.mousePressed(artTrans);

  musicButton = createButton('MUSIC');
  musicButton.mouseOver(isHov);
  musicButton.mouseOut(isntHov);
  musicButton.hide();
  musicButton.style('opacity', '0');
  musicButton.style('border-radius', '20%');
  musicButton.style('cursor', 'cell');
  musicButton.style('-webkit-transition', 'opacity 1s');
  musicButton.style('transition', 'opacity 1s');
  musicButton.style('outline', 'none');
  musicButton.mousePressed(musicTrans);

  projButton = createButton('PROJEX');
  projButton.mouseOver(isHov);
  projButton.mouseOut(isntHov);
  projButton.hide();
  projButton.style('opacity', '0');
  projButton.style('border-radius', '20%');
  projButton.style('cursor', 'cell');
  projButton.style('-webkit-transition', 'opacity 1s');
  projButton.style('transition', 'opacity 1s');
  projButton.style('outline-style', 'none');
  projButton.mousePressed(projTrans);

  contButton = createButton('CONTACT');
  contButton.mouseOver(isHov);
  contButton.mouseOut(isntHov);
  contButton.hide();
  contButton.style('opacity', '0');
  contButton.style('border-radius', '20%');
  contButton.style('cursor', 'cell');
  contButton.style('-webkit-transition', 'opacity 1s');
  contButton.style('transition', 'opacity 1s');
  contButton.style('outline', 'none');
  contButton.mousePressed(contTrans);
}

function draw() {
  col1 = color((colorPhase+120)%360,100*(mouseX/windowWidth),100);
  col2 = color(colorPhase,100*(mouseX/windowWidth),100);
  col3 = color(colorPhase,100,100);
  col4 = color((colorPhase+240)%360,100*(mouseX/windowWidth),100);
  col5 = color((colorPhase+240)%360,100,100);
  col6 = color((colorPhase+120)%360,100,100);
  colText = color((colorPhase+240)%360,100,20);
  colBorderOff = color(colorPhase,40,100);



  if (wipeBool) {
     wipe();
     if (wipeCount == wipeNum){
       wipeBool = false;
     }
  }

  wipeTime = millis();


  colorPhase++;
  colorPhase = colorPhase % 360;
  var waveform = fft.waveform();
  var yMin,yMax = 0;
  if ((mouseIsPressed && !isHovering && !onTB && !isMuted)|| songPlaying) {
    beginShape();
    strokeWeight(3);
    stroke(0);
    for (var i = 0; i < waveform.length; i++){
      if (i % 2 == 0) {
      var x = map(i, 0, waveform.length, 0, windowWidth);
      var y = map(waveform[i], -1, 1, windowHeight, 0);
      fill(colorPhase,100-(100*(mouseX/windowWidth)),100);
      curveVertex(x, y+windowHeight*0.1);
    }
    }
    endShape();
  }
  strokeWeight(9);


  if (artIsSelected || musicIsSelected || projIsSelected || contIsSelected) {
    fill(100,0.6);
    stroke(0);
    strokeWeight(5);
    rectX = windowWidth*0.05;
    rectWidth = windowWidth-(rectX*2);
    rectY = windowHeight * 0.25;
    rectHeight = windowHeight * 0.72;
    rect(rectX,rectY,rectWidth,rectHeight);
    if (mouseX >= rectX && mouseX < rectX + rectWidth) {
      if (mouseY >= rectY && mouseY < rectY + rectHeight){
        onTB = true;
      } else {
        onTB = false;
      }
    } else {
      onTB = false;
    }
    axisDraw();
    if (canDrawFrame) {
      drawFrame();
    }
    catagoryDraw();
    contentDraw();
    sweepLineDraw();
  } else {
    axisDraw();
  }

  if (splashButtonBool){
    if (currSong.isLoaded()) {
      splashButton.style('opacity','100');
      splashButton.style('visibility', 'visible');
      splashButtonBool = false;
    } else {
        fill(col3);
        stroke(0);
        strokeWeight(8);
        textSize(windowWidth*0.025);
        text("LOADING",windowWidth*0.475+random(windowWidth*0.05),windowHeight*0.88+random(windowWidth*0.03));
     }
 }


  if (mouseIsPressed && !isHovering && !onTB && (millis()>200) && !isMuted) {
    fill(col3);
    strokeWeight(3);
    stroke(0);
    ellipse(mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20,windowWidth*0.2,windowWidth*0.2);
    textSize(windowWidth*0.02);
    fill(0);
    text(int(freq1)+' Hz',mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20);
    osc1.amp(.2);
    osc2.amp(.2);
    osc3.amp(.2);
    osc4.amp(.3);
  }
  else {
    osc1.amp(0);
    osc2.amp(0);
    osc3.amp(0);
    osc4.amp(0);
  }
  if (isSplash){
    fill(col1);
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER);
    textSize(windowWidth*0.08);
    text("BRAD STEVENSON",windowWidth*0.5,windowHeight*0.4-(windowHeight*0.05)+(cos(count)*windowHeight*0.1));
    textSize(windowWidth*0.04);
    fill(col4);
    text("interdisciplinary creative",windowWidth*0.5,windowHeight*0.4+(windowHeight*0.1)+(cos(count)*windowHeight*0.1));
  }
  else {
    fill(col1);
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER);
    textSize(windowWidth*0.03);
    text("BRAD STEVENSON",windowWidth*0.5,windowHeight*0.15);
    textSize(windowWidth*0.015);
    fill(col4);
    text("interdisciplinary creative",windowWidth*0.5,windowHeight*0.2);
  }

  splashButton.style('border-color', col3);
  splashButton.style('color', col3);
  splashButton.style('background-color', '#000000');
  splashButton.style('font-size',windowWidth*0.02 + 'px');
  splashButton.position((windowWidth*0.45),
      (windowHeight*0.80)+(sin(count)*windowHeight*0.02));
  splashButton.style('font-size',windowWidth*0.02 + 'px');

  if (isMuted) {
    shhButton.style('border-color', col3);
    shhButton.style('color', '#000');
    shhButton.style('background-color', '#FFF');
  } else {
    shhButton.style('border-color', col3);
    shhButton.style('color', col3);
    shhButton.style('background-color', '#000000');
    shhButton.value('shound');
  }
  shhButton.style('font-size',windowWidth*0.01 + 'px');
  shhButton.size(windowWidth*0.05,windowWidth*0.02);
  shhButton.position(windowWidth*0.95+2,(windowHeight-(windowWidth*0.02))+2);

  if (!artIsSelected) {
    artButton.style('color', colBorderOff);
    artButton.style('border', '2px outset');
    artButton.style('background-color', '#000000');
    artButton.size(windowWidth*0.1,windowWidth*0.05);
    artButton.style('border-color', colBorderOff);
    artButton.position(windowWidth*0.1,windowHeight*0.1);
  }
  else {
    artButton.style('color',col5);
    artButton.style('border', '5px outset');
    artButton.style('border-color', col6);
    artButton.size(windowWidth*0.105,windowWidth*0.0525);
    artButton.position(windowWidth*0.1,windowHeight*0.1+(sin(count)*windowHeight*0.01));
  }
  artButton.style('font-size',windowWidth*0.02 + 'px');

  if (!musicIsSelected) {
    musicButton.style('color', colBorderOff);
    musicButton.style('border', '2px outset');
    musicButton.style('background-color', '#000000');
    musicButton.size(windowWidth*0.1,windowWidth*0.05);
    musicButton.style('border-color', colBorderOff);
    musicButton.position(windowWidth*0.2+(windowWidth*0.025),windowHeight*0.1);
  }
  else {
    musicButton.style('border', '5px outset');
    musicButton.style('border-color', col6);
    musicButton.style('color',col5);
    musicButton.size(windowWidth*0.105,windowWidth*0.0525);
    musicButton.position(windowWidth*0.225,windowHeight*0.1+(sin(count)*windowHeight*0.01));
  }
  musicButton.style('font-size',windowWidth*0.02 + 'px');

  if (!projIsSelected) {
    projButton.style('color', colBorderOff);
    projButton.style('border', '2px outset');
    projButton.style('background-color', '#000000');
    projButton.size(windowWidth*0.1,windowWidth*0.05);
    projButton.style('border-color', colBorderOff);
    projButton.position(windowWidth-((musicButton.x)+windowWidth*0.1),windowHeight*0.1);
  }
  else {
    projButton.style('border', '5px outset');
    projButton.size(windowWidth*0.105,windowWidth*0.0525);
    projButton.style('border-color', col6);
    projButton.style('color',col5);
    projButton.position(windowWidth-((musicButton.x)+windowWidth*0.1),windowHeight*0.1+(sin(count)*windowHeight*0.01));
  }
  projButton.style('font-size',windowWidth*0.02 + 'px');

  if (!contIsSelected) {
    contButton.style('color', colBorderOff);
    contButton.style('border', '2px outset');
    contButton.style('background-color', '#000000');
    contButton.size(windowWidth*0.1,windowWidth*0.05);
    contButton.style('border-color', colBorderOff);
    contButton.position(windowWidth-(artButton.x+windowWidth*0.1),windowHeight*0.1);
  }
  else {
    contButton.style('border', '5px outset');
    contButton.size(windowWidth*0.105,windowWidth*0.0525);
    contButton.style('border-color', col6);
    contButton.style('color',col5);
    contButton.position(windowWidth-(artButton.x+windowWidth*0.1),windowHeight*0.1+(sin(count)*windowHeight*0.01));
  }
  contButton.style('font-size',windowWidth*0.018 + 'px');

  var freq = map(mouseX, 0, width, 40, 500);
  freq1 = freq*1;
  freq2 = freq*1.25;
  freq3 = freq*1.481;
  freq4 = freq*1.851;
  osc1.freq(freq1);
  osc2.freq(freq2);
  osc3.freq(freq3);
  osc4.freq(freq4);

  if (isSplash){
    count+= 0.05+((mouseX/windowWidth)*0.08);
  } else {
    count+= 0.04;
  }
  if (count >= 6.23 || splashButtonBool) {
    count = 0;
  }


  if(!isSplash) {
    fill(0,0.1);
    rect(0,0,windowWidth,windowHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function menuTrans() {
  isSplash = false;
  wipeBool = true;
  splashButton.style('opacity', '0');
  artButton.show();
  musicButton.show();
  projButton.show();
  contButton.show();
  milTemp = millis();
  setTimeout(loadMenu,800);
  setTimeout(playSong,1000);
}

function playSong(){
  if (!isMuted) {
    currSong.play();
    songPlaying = true;
  }
}

function loadMenu() {
  splashButton.hide();
  artButton.style('opacity','100');
  musicButton.style('opacity','100');
  projButton.style('opacity','100');
  contButton.style('opacity','100');
}

function artTrans(){
  if (!artIsSelected){
    artIsSelected = true;
    musicIsSelected = false;
    projIsSelected = false;
    contIsSelected = false;
    count = 0;
    lineGrowth = 0;
  } else {
    background(0);
    artIsSelected = false;
    canDrawFrame = false;
  }
}

function musicTrans(){
  if (!musicIsSelected){
    musicIsSelected = true;
    artIsSelected = false;
    contIsSelected = false;
    projIsSelected = false;
    count = 0;
    lineGrowth = 0;
  } else {
    background(0);
    musicIsSelected = false;
  }
}

function projTrans(){
  if (!projIsSelected){
    projIsSelected = true;
    artIsSelected = false;
    contIsSelected = false;
    musicIsSelected = false;
    count = 0;
    lineGrowth = 0;
  } else {
    background(0);
    projIsSelected = false;
    canDrawFrame = false;
  }
}

function contTrans(){
  if (!contIsSelected){
    contIsSelected = true;
    artIsSelected = false;
    projIsSelected = false;
    musicIsSelected = false;
    count = 0;
    lineGrowth = 0;
  } else {
    background(0);
    contIsSelected = false;
  }
}

function contentDraw() {
  fill(0);
  strokeWeight(1);
  textSize(40);
  stroke(100);
  if (artIsSelected) {
      canDrawFrame = true;
      text(artString,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
         rectWidth*0.5,rectHeight*0.5);
      currImgArray = artImgArray;
  }  else if (musicIsSelected) {
      canDrawFrame = false;
      text(musicString,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
         rectWidth*0.5,rectHeight*0.5);
  }  else if (projIsSelected) {
      canDrawFrame = true;
      text(projString,rectX+rectWidth*0.5,rectY+rectHeight*0.4,
         rectWidth*0.5,rectHeight*0.5);
  }  else if (contIsSelected) {
      canDrawFrame = false;
      lookingFor();
      text(contString,rectX+rectWidth*0.5,rectY+rectHeight*0.4,
         rectWidth*0.5,rectHeight*0.5);
  }
}



function isHov() {
   isHovering = true;
}

function isntHov() {
   isHovering = false;
}

function songEnd(){
   songPlaying = false;
}

function wipe() {
    noStroke();
    fill(100*((wipeNum-wipeCount)*.01));
    ellipse((windowWidth*0.5),
        (windowHeight*0.80)+(sin(count)*windowHeight*0.02),
        (wipeCount/wipeNum)*windowWidth*Math.sqrt(2),
        (wipeCount/wipeNum)*windowWidth*Math.sqrt(2));
    wipeCount++;
}

function catagoryDraw() {
  let textEdge = rectX+(rectWidth*0.98);
  fill(col3);
  textSize(windowWidth*0.035);
  textAlign(RIGHT);
  stroke(0);
  strokeWeight(5);
  if (artIsSelected){
    text("ART",textEdge,windowHeight*0.35);
  } else if (musicIsSelected) {
    text("MUSIC",textEdge,windowHeight*0.35);
  } else if (projIsSelected){
    text("PROJEX",textEdge,windowHeight*0.35);
  } else {
    text("CONTACT",textEdge,windowHeight*0.35);
  }
}

function axisDraw() {
  stroke(col1);
  fill(col2);
  if (mPressed) {
    line(mouseX,0,mouseX,windowHeight);
    line(0,mouseY,windowWidth,mouseY);
    stroke(0);
    strokeWeight(2);
    line(mouseX,0,mouseX,windowHeight);
    line(0,mouseY,windowWidth,mouseY);
    ellipse(mouseX,mouseY,15,15);
    fill(0);
    ellipse(mouseX,mouseY,5,5);
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function mouseMoved() {
  mPressed = true;
}

function drawFrame() {
  currImg = int((mouseX/windowWidth)*currImgArray.length) % currImgArray.length;
  noStroke();
  if (currImg < currImgArray.length - 2) {
    image(currImgArray[currImg + 2],rectX+100, rectY+30, rectHeight-40, rectHeight-40,
          0,0,1200,1200);
    fill(100,0.6);
    rect(rectX+100, rectY+30, rectHeight-40, rectHeight-40);
  }
  if (currImg < currImgArray.length - 1) {
    image(currImgArray[currImg + 1],rectX+60, rectY+25, rectHeight-40, rectHeight-40,
          0,0,1200,1200);
    fill(100,0.3);
    rect(rectX+60, rectY+25, rectHeight-40, rectHeight-40);
  }
  image(currImgArray[currImg],rectX+20, rectY+20, rectHeight-40, rectHeight-40,
          0,0,1200,1200);
  fill(0,0);
  stroke(0);
  strokeWeight(6);
  rect(rectX+20, rectY+20, rectHeight-40, rectHeight-40);
}

function mute(){
  currSong.stop();
  isMuted = !isMuted;
  songPlaying = false;
}

function sweepLineDraw() {
  stroke(0);
  strokeWeight(2);
  if (lineGrowth<=lineGrowthSpeed) {
    line(rectX+rectWidth-10,windowHeight*0.37,(rectX+rectWidth-10)-((windowWidth*0.35)*(lineGrowth/lineGrowthSpeed)),windowHeight*0.37);
    lineGrowth++;
  } else {
    line(rectX+rectWidth-10,windowHeight*0.37,(rectX+rectWidth-10)-(windowWidth*0.35),windowHeight*0.37);
  }
}

function lookingFor(){
  textAlign(LEFT);
  textSize(rectHeight*0.1);
  text("Looking for a(n)",rectX+(rectWidth*0.05),rectY+(rectWidth*0.05));
  stroke(col3);
  text(titleArray[titleNum]+"?",rectX+(rectWidth*0.05),rectY+(rectHeight*0.35));
}

function titleNumInc() {
   titleNum = int(random(15));
 }
