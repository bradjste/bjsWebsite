var osc1, osc2, osc3 ,osc4, fft;
var osc5;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
var mPressed = false;
var splashButton, artButton, musicButton, contButton;
var op1Button,op2Button,op3Button,op4Button;
var shhButton;
var mark1,mark2,mark3;
var isSplash = true;
var artIsSelected = false;
var musicIsSelected = false;
var projIsSelected = false;
var contIsSelected = false;
var shouldDrawWF = false;
var isHovering, onTB, onTB2 = false;
var isMuted = false;
var currSong;
var titleNum = 0;
var lineGrowth = 0;
var lineGrowthSpeed = 8;
var rectX, rect2X;
var rectY, rect2Y;
var rectWidth, rect2Width;
var rectHeight, rect2Height;
var catagoryOnMobile = false;
var titleArray = [];
var artCatArray = [];
var projCatArray = [];
var songPlaying = false;
var splashButtonBool = true;
var col1, col2, col3, col4, col5, col6, col7, col8, colText;
var colBorderOff;
var firstDraw = true;
var wipeTime =0;
var wipeCount= 0;
var wipeBool = false;
var wipeNum = 28;
var currImgX = 0;
var currImgY = 0;
var currOp = 1;
var artOp = 1;
var projOp = 1;
var artImgArray= [];
var projImgArray = [];
var contImgArray =[];
var currImgArray;
var stretchFlip = true;
var canDrawFrame = false;
var isMobile = false;
var isShort = false;
var artString1 = "I am a generative artist, or an artist that uses computer science, randomness, and musical instincts to guide abstract ideas and systems to produce unprecedented results.";
var artString2 = "LACDA";
var artString3 = "UCSD";
var artString4 = "DUDLZ";
var musicString = "Hexer Quiz - The Glow"+"\n"+"Out March 23rd";
var projString1 = "For my senior project at UC San Diego, I designed and prototyped a puredata driven digital instrument with the capability to connect to an Arduino and LEDs via serial communication. I then loaded the patch onto a Raspberry Pi for portability. The patch works as a sound -> color-mapping algorithm utilizing the  HSV color space.";
var projString2 = "cutmod";
var projString3 = "pd patches";
var projString4 = "music videos";
var contString = "email:"+"\n"+"instagram:"+"\n"+"bandcamp:"+"\n"+"twitter:";
var contString2 = "bradjste@gmail.com"+"\n"+"bradjste"+"\n"+"Hexer Quiz"+"\n"+"@hexerquiz";


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360,100,100);
  background(0);
  aspectCheck();
  currSong = loadSound('assets/music/drumgum5.wav');
  currSong.setVolume(0.5);
  currSong.onended(songEnd);

  osc1 = new p5.SqrOsc(); // set frequency and type
  osc2 = new p5.SqrOsc(); // set frequency and type
  osc3 = new p5.SqrOsc(); // set frequency and type
  osc4 = new p5.SqrOsc(); // set frequency and type

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

  artCatArray[0] = "GENERATIVE ART";
  artCatArray[1] = "LACDA";
  artCatArray[2] = "UC SAN DIEGO";
  artCatArray[3] = "ANIMATIONS";

  projCatArray[0] = "SYNTEGER";
  projCatArray[1] = "PROJECTIONS";
  projCatArray[2] = "ENGN_WAVE";
  projCatArray[3] = "MUSIC VIDEOS";

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

  projImgArray[0] = loadImage('assets/projImg/synt0.jpg');
  projImgArray[1] = loadImage('assets/projImg/synt1.jpg');
  projImgArray[2] = loadImage('assets/projImg/synt2.jpg');
  projImgArray[3] = loadImage('assets/projImg/synt3.jpg');
  projImgArray[4] = loadImage('assets/projImg/synt4.jpg');
  projImgArray[5] = loadImage('assets/projImg/synt5.jpg');

  titleArray[0] = "n" + "\n" + "audio engineer";
  titleArray[1] = "\n" + "composer";
  titleArray[2] = "\n" + "creative coder";
  titleArray[3] = "\n" + "generative artist";
  titleArray[4] = "n" + "\n" + "interactive designer";
  titleArray[5] = "\n" + "recording engineer";
  titleArray[6] = "n" + "\n" + "UI designer";
  titleArray[7] = "\n" + "music producer";
  titleArray[8] = "n" + "\n" + "event manager";
  titleArray[9] = "\n" + "musical instrument prototyper";
  titleArray[10] = "\n" + "digital instrument designer";
  titleArray[11] = "\n" + "sound designer";
  titleArray[12] = "n" + "\n" + "image processor";
  titleArray[13] = "\n" + "new friend";
  titleArray[14] = "\n" + "puredata specialist";

  setInterval(titleNumInc,1000);
  setInterval(stretchFlipFunc,2500);

  splashButton = createButton('ENTER');
  splashButton.mouseOver(isHov);
  splashButton.mouseOut(isntHov);
  splashButton.style('border-radius', '20%');
  splashButton.style('background-color', '#000000');
  splashButton.style('cursor', 'cell');
  splashButton.style('outline', 'none');
  splashButton.style('opacity','0');
  splashButton.style('visibility','hidden');
  splashButton.style('-webkit-transition', 'opacity 2s');
  splashButton.style('transition', 'opacity 2s');
  splashButton.mousePressed(menuTrans);

  shhButton = createButton('| |-  S O U N D  -| |');
  shhButton.mouseOver(isHov);
  shhButton.mouseOut(isntHov);
  shhButton.style('cursor', 'cell');
  shhButton.style('background-color', '#000000');
  shhButton.style('outline', 'none');
  shhButton.mousePressed(mute);

  op1Button = createButton('|');
  op1Button.mouseOver(isHov);
  op1Button.mouseOut(isntHov);
  op1Button.hide();
  op1Button.style('outline', 'none');
  op1Button.style('cursor', 'cell');
  op1Button.style('outline', 'none');
  op1Button.style('transform', 'skewX(160deg)');
  op1Button.mousePressed(op1Select);

  op2Button = createButton('||');
  op2Button.mouseOver(isHov);
  op2Button.mouseOut(isntHov);
  op2Button.hide();
  op2Button.style('outline', 'none');
  op2Button.style('cursor', 'cell');
  op2Button.style('outline', 'none');
  op2Button.style('transform', 'skewX(160deg)');
  op2Button.mousePressed(op2Select);

  op3Button = createButton('|||');
  op3Button.mouseOver(isHov);
  op3Button.mouseOut(isntHov);
  op3Button.hide();
  op3Button.style('outline', 'none');
  op3Button.style('cursor', 'cell');
  op3Button.style('outline', 'none');
  op3Button.style('transform', 'skewX(160deg)');
  op3Button.mousePressed(op3Select);

  op4Button = createButton('||||');
  op4Button.mouseOver(isHov);
  op4Button.mouseOut(isntHov);
  op4Button.hide();
  op4Button.style('outline', 'none');
  op4Button.style('cursor', 'cell');
  op4Button.style('outline', 'none');
  op4Button.style('transform', 'skewX(160deg)');
  op4Button.mousePressed(op4Select);

  artButton = createButton('ART');
  artButton.mouseOver(isHov);
  artButton.mouseOut(isntHov);
  artButton.hide();
  artButton.style('opacity', '0');
  artButton.style('background-color', '#000000');
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
  musicButton.style('background-color', '#000000');
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
  projButton.style('background-color', '#000000');
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
  contButton.style('background-color', '#000000');
  contButton.style('border-radius', '20%');
  contButton.style('cursor', 'cell');
  contButton.style('-webkit-transition', 'opacity 1s');
  contButton.style('transition', 'opacity 1s');
  contButton.style('outline', 'none');
  contButton.mousePressed(contTrans);

  updateSizePos();
}

function draw() {
  col1 = color((colorPhase+120)%360,100*(mouseX/windowWidth),100);
  col2 = color(colorPhase,100*(mouseX/windowWidth),100);
  col3 = color(colorPhase,100,100);
  col4 = color((colorPhase+240)%360,100*(mouseX/windowWidth),100);
  col5 = color((colorPhase+240)%360,100,100);
  col6 = color((colorPhase+120)%360,100,100);
  col7 = color((colorPhase+120)%360,100,100,mouseY/windowHeight);
  col8 = color(colorPhase,100,100*(mouseX/windowWidth));
  colText = color((colorPhase+240)%360,100,20);
  colBorderOff = color(colorPhase,40,100);

  if(!isSplash) {
    fill(0,0.1);
    noStroke();
    rect(0,0,windowWidth,windowHeight);
  }

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
  if ((mouseIsPressed && !isHovering && !onTB && !onTB2 && !isMuted)|| songPlaying) {
    beginShape();
    strokeWeight(3);
    fill(colorPhase,100-(100*(mouseX/windowWidth)),100-(100*(mouseX/windowWidth)));
    stroke(colorPhase,100,100*(mouseX/windowWidth));
    for (var i = 0; i < waveform.length; i++) {
      if (i % 2 == 0) {
        var x = map(i, 0, waveform.length, 0, windowWidth);
        var y = map(waveform[i], -1, 1, windowHeight, 0);
        curveVertex(x, y+windowHeight*0.1);
      }
    }
    endShape();
  }
  strokeWeight(9);

  axisDraw();
  sing();
  if (artIsSelected || musicIsSelected || projIsSelected || contIsSelected) {
    rectDraw();
    touchRectCheck();
    if (isMobile) {
      rect2Draw();
      touchRect2Check();
      drawFrameMobile();
      contentDrawMobile();
      drawPicIndicationMobile(currImgArray.length);
    // } else if (isShort) {
    // }
  } else {
      if (canDrawFrame) {
        drawFrame();
      }
      if (artIsSelected || projIsSelected) {
        drawPicIndication(currImgArray.length);
      }
      catagoryDraw();
      contentDraw();
      sweepLineDraw(rectX+rectWidth-10,windowHeight*0.37,(rectX+rectWidth-10)
                  -(windowWidth*0.35),windowHeight*0.37);
    }
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
        if (isMobile){
         textSize(windowWidth*0.075);
         textAlign(CENTER);
         text("LOADING",windowWidth*0.45+random(windowWidth*0.1),windowHeight*0.88+random(windowWidth*0.1));
        } else {
         textSize(windowWidth*0.025);
         text("LOADING",windowWidth*0.475+random(windowWidth*0.05),windowHeight*0.88+random(windowWidth*0.03));
      }
     }
  }



  if (isSplash && !isMobile) {
    fill(col1);
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER);
    textSize(windowWidth*0.08);
    text("BRAD STEVENSON",windowWidth*0.5,windowHeight*0.4-(windowHeight*0.05)+(cos(count)*windowHeight*0.1));
    textSize(windowWidth*0.04);
    fill(col4);
    text("interdisciplinary creative",windowWidth*0.5,windowHeight*0.4+(windowHeight*0.1)+(cos(count)*windowHeight*0.1));
  } else if (!isSplash && !isMobile) {
    fill(col1);
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER);
    textSize(windowWidth*0.03);
    text("BRAD STEVENSON",windowWidth*0.5,windowHeight*0.15);
    textSize(windowWidth*0.015);
    fill(col4);
    text("interdisciplinary creative",windowWidth*0.5,windowHeight*0.2);
  } else if (isMobile) {
    mobileName();
  }

  buttonUpdate();
  mobileCatagoryDraw();

  var freq = map(mouseX, 0, windowWidth, 40, 500);
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


}

function updateSizePos() {
  aspectCheck();
  if (isMobile && !isShort){
    updateSizePosMobile();
  } else if (isShort && !isMobile) {
    updateSizePosShort();
  } else {
    updateSizePosLandscape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  updateSizePos();
  currImgX = 0;
  currImgY = 0;
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
  if (!isMuted && !songPlaying) {
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
    currImgArray = artImgArray;
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
    hideOptions();
  }
}

function musicTrans(){
  if (!musicIsSelected){
    hideOptions();
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
    hideOptions();
  }
}

function contTrans(){
  if (!contIsSelected){
    hideOptions();
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
  textSize(windowWidth*(30/1536));
  stroke(100);
  if (artIsSelected) {
    showOptions();
      canDrawFrame = true;
     if (artOp == 1) {
         currImgArray = artImgArray;
         text(artString1,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
            rectWidth*0.5,rectHeight*0.5);
     } else if (artOp == 2) {
       currImgArray = artImgArray;
       text(artString2,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
          rectWidth*0.5,rectHeight*0.5);
     } else if (artOp == 3) {
       currImgArray = artImgArray;
       text(artString3,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
          rectWidth*0.5,rectHeight*0.5);
     } else if (artOp == 4) {
       currImgArray = artImgArray;
       text(artString4,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
          rectWidth*0.5,rectHeight*0.5);
     }
  }  else if (musicIsSelected) {
      canDrawFrame = false;
      text(musicString,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
         rectWidth*0.5,rectHeight*0.5);
  }  else if (projIsSelected) {
      showOptions();
      canDrawFrame = true;
       if (projOp == 1) {
          currImgArray= projImgArray;
          text(projString1,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
              rectWidth*0.5,rectHeight*0.5);
       } else if (projOp == 2) {
         currImgArray= projImgArray;
         text(projString2,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
             rectWidth*0.5,rectHeight*0.5);
       } else if (projOp == 3) {
         currImgArray= projImgArray;
         text(projString3,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
             rectWidth*0.5,rectHeight*0.5);
       } else if (projOp == 4) {
         currImgArray= projImgArray;
         text(projString4,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
             rectWidth*0.5,rectHeight*0.5);
       }
  }  else if (contIsSelected) {
      canDrawFrame = false;
      lookingFor();
      fill(0);
      strokeWeight(1);
      textSize(windowWidth*(40/1536));
      stroke(100);
      textAlign(LEFT);
      text(contString,rectX+rectWidth*0.62,rectY+rectHeight*0.2,
         rectWidth*0.7,rectHeight*0.5);
      textAlign(RIGHT);
      text(contString2,rectX+rectWidth*0.5,rectY+rectHeight*0.2,
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

function rectDraw() {
  fill(100,0.6);
  stroke(0);
  strokeWeight(5);
  rect(rectX,rectY,rectWidth,rectHeight);
}

function wipe() {
    let cirSize = 0;
    if (isMobile) {
      cirSize = windowWidth*Math.sqrt(2);
    } else {
      cirSize = windowHeight;
    }
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
  fill(color((colorPhase+240)%360,100,100));
  textSize(windowWidth*0.035);
  textAlign(RIGHT);
  stroke(0);
  strokeWeight(5);
  if (artIsSelected){
    text(artCatArray[artOp-1],textEdge,windowHeight*0.35);
  } else if (musicIsSelected) {
    text("HEXER QUIZ",textEdge,windowHeight*0.35);
  } else if (projIsSelected){
    text(projCatArray[projOp-1],textEdge,windowHeight*0.35);
  } else {
    text("LET'S TALK",textEdge,windowHeight*0.35);
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
  let imgSize =  rectHeight-40;
  currImgX = int((mouseX/windowWidth)*currImgArray.length);
  if (currImgX < 0){
    currImgX = 0;
  } else if (currImgX > currImgArray.length - 1){
    currImgX = currImgArray.length - 1;
  }
  if (windowWidth/ windowHeight <= 0.8){
    imgSize = rectWidth-40;
  } else {
  noStroke();
  if (currImgX < currImgArray.length - 2) {
    image(currImgArray[currImgX + 2],rectX+100, rectY+30, imgSize, imgSize,
          0,0,1200,1200);
    fill(100,0.6);
    rect(rectX+100, rectY+30, imgSize, imgSize);
  }
  if (currImgX < currImgArray.length - 1) {
    image(currImgArray[currImgX + 1],rectX+60, rectY+25, imgSize, imgSize,
          0,0,1200,1200);
    fill(100,0.3);
    rect(rectX+60, rectY+25, imgSize, imgSize);
  }
  }
  image(currImgArray[currImgX],rectX+20, rectY+20, imgSize, imgSize,
          0,0,1200,1200);
  fill(0,0);
  stroke(0);
  strokeWeight(6);
  rect(rectX+20, rectY+20, imgSize, imgSize);
}

function mute(){
  currSong.stop();
  if (isMuted) {
    shhButton.style('color', col3);
  }
  isMuted = !isMuted;
  songPlaying = false;
}

function sweepLineDraw(startX,startY,endX,endY) {
  stroke(0);
  strokeWeight(2);
    if (lineGrowth<=lineGrowthSpeed) {
      line(startX,startY,endX+ (endX-startX)*(lineGrowth/lineGrowthSpeed)-(endX-startX),endY);
      lineGrowth++;
    } else {
      line(startX,startY,endX,endY);
    }
}

function lookingFor(){
  textAlign(LEFT);
  textSize(rectHeight*0.1);
  text("I am a(n)",rectX+(rectWidth*0.025),rectY+(rectWidth*0.05));
  fill(col3);
  stroke(0);
  strokeWeight(3);
  text(titleArray[titleNum]+",",rectX+(rectWidth*0.025),rectY+(rectHeight*0.18),rectWidth*0.5,rectHeight);
}

function titleNumInc() {
    titleNum = (titleNum + 1) % titleArray.length;
 }

function sing() {
   if (mouseIsPressed && !isHovering && !onTB && !onTB2 && (millis()>200) && !isMuted) {
     fill(color(colorPhase,100*(mouseY/windowHeight),100*(mouseX/windowHeight)));
     strokeWeight(3);
     stroke(0,((mouseX/windowWidth)*100),100-(100*(mouseX/windowWidth)));
     ellipse(mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20,windowWidth*0.2,windowWidth*0.2);
     fill(0);
     textSize(windowHeight*0.035)
     strokeWeight(2);
     textAlign(CENTER);
     text(int(freq1)+' Hz',mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20);
     osc1.amp(.15);
     osc2.amp(.1*(mouseY/windowHeight));
     osc3.amp(.1*(mouseY/windowHeight));
     osc4.amp(.15*(mouseY/windowHeight));
   }
   else {
     osc1.amp(0);
     osc2.amp(0);
     osc3.amp(0);
     osc4.amp(0);
   }
 }

function stretchFlipFunc() {
  stretchFlip = !stretchFlip;
}

function op1Select() {
  catagoryOnMobile = true;
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 1;
  } else if (projIsSelected){
    projOp = 1;
  }
}

function op2Select() {
  catagoryOnMobile = true;
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 2;
  } else if (projIsSelected){
    projOp = 2;
  }
}

function op3Select() {
  catagoryOnMobile = true;
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 3;
  } else if (projIsSelected){
    projOp = 3;
  }
}

function op4Select() {
  catagoryOnMobile = true;
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 4;
  } else if (projIsSelected){
    projOp = 4;
  }
}

function showOptions() {
  op1Button.show();
  op2Button.show();
  op3Button.show();
  op4Button.show();
}

function hideOptions() {
  op1Button.hide();
  op2Button.hide();
  op3Button.hide();
  op4Button.hide();
}

function drawPicIndication(arraySize) {
    let span = windowWidth*0.4;
    let freqDomain = [];
    let octBands = [];
    let phaseOffset = 120;
    let sqPadding = 4;
    let squareStart = (windowWidth*0.04/(2*tan((7*PI/18))));
    noStroke();
    for (var i = 0; i < arraySize; i++) {
      push();
      fft.smooth();
      fft.analyze();
      octBands = fft.getOctaveBands();
      freqDomain = fft.logAverages(octBands);
      translate( windowWidth*0.53+(i*span/arraySize)+(((mouseX/windowWidth)*-2*squareStart)+squareStart)
                -2*squareStart+((mouseX/windowWidth)*4*squareStart)+((sqPadding*i)/arraySize),
                rectY+rectHeight-windowWidth*0.053-2);
      shearX(((mouseX/windowWidth)*2*PI/9)-(PI/9));
      if (i == currImgX){
        fill((colorPhase+240)%360,100,100,0.7);
        rect(0,0,(span/arraySize)-sqPadding,-windowWidth*0.065*0.5);
        fill((colorPhase+120)%360,100,100,0.4);
        rect(0,0,(span/arraySize)-sqPadding,windowWidth*0.065*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.065*0.5);
      } else if (i == (currImgX+1) || i == (currImgX-1)){
        fill((colorPhase+240)%360,100,100,0.6);
        rect(0,0,(span/arraySize)-sqPadding,-windowWidth*0.052*0.5);
        fill((colorPhase+120)%360,100,100,0.4);
        rect(0,0,(span/arraySize)-sqPadding,windowWidth*0.052*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.052*0.5);
      } else if (i == (currImgX+2) || i == (currImgX-2)) {
        fill((colorPhase+240)%360,100,100,0.5);
        rect(0,0,(span/arraySize)-sqPadding,-windowWidth*0.045*0.5);
        fill((colorPhase+120)%360,100,100,0.4);
        rect(0,0,(span/arraySize)-sqPadding,windowWidth*0.045*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.045*0.5);
      } else {
        fill((colorPhase+240)%360,100,100,0.4);
        rect(0,0,(span/arraySize)-sqPadding,-windowWidth*0.04*0.5);
        fill((colorPhase+120)%360,100,100,0.4);
        rect(0,0,(span/arraySize)-sqPadding,windowWidth*0.045*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.04*0.5);
      }
      pop();
    }
}

function aspectCheck(){
  let ratio = windowWidth/windowHeight
  // if(ratio <= 1.4677 && ratio >= 0.7626) {
  //    isShort = true;
  //    isMobile = false;
  // } else if (ratio < 0.7626) {
  //   isMobile = true;
  //   isShort = false;
  // } else {
  //   isShort = false;
  //   isMobile = false;
  // }
  if(ratio <= 0.7626) {
     isMobile = true;
  } else {
    isMobile = false;
  }
}

function touchRectCheck() {
  if (mouseX >= rectX && mouseX < rectX + rectWidth) {
    if (mouseY >= rectY && mouseY < rectY + rectHeight){
      onTB = true;
      axisDraw();
    } else {
      onTB = false;
    }
  } else {
    onTB = false;
  }
}

function touchRect2Check() {
  if (mouseX >= rect2X && mouseX < rect2X + rect2Width) {
    if (mouseY >= rect2Y && mouseY < rect2Y + rect2Height){
      onTB2 = true;
      axisDraw();
    } else {
      onTB2 = false;
    }
  } else {
    onTB2 = false;
  }
}

function rect2Draw() {
  fill(100,0.6);
  stroke(0);
  strokeWeight(5);
  rect(rect2X,rect2Y,rect2Width,rect2Height);
}

function drawFrameMobile() {
  let imgSize =  rectHeight-40;
  currImgY = int(currImgArray.length-((mouseY/windowHeight)*currImgArray.length));
  if (currImgY < 0){
    currImgY = 0;
  } else if (currImgY > currImgArray.length - 1){
    currImgY = currImgArray.length - 1;
  }
  if (windowWidth <= windowHeight){
    imgSize = rectWidth-40;
  } else {
  noStroke();
  if (currImgY < currImgArray.length - 2) {
    image(currImgArray[currImgY + 2],rectX+100, rectY+30, imgSize, imgSize,
          0,0,1200,1200);
    fill(100,0.6);
    rect(rectX+100, rectY+30, imgSize, imgSize);
  }
  if (currImgY < currImgArray.length - 1) {
    image(currImgArray[currImgY + 1],rectX+60, rectY+25, imgSize, imgSize,
          0,0,1200,1200);
    fill(100,0.3);
    rect(rectX+60, rectY+25, imgSize, imgSize);
  }
  }
  image(currImgArray[currImgY],rectX+20, rectY+20, imgSize, imgSize,
          0,0,1200,1200);
  fill(0,0);
  stroke(0);
  strokeWeight(6);
  rect(rectX+20, rectY+20, imgSize, imgSize);
}

function contentDrawMobile() {
  fill(0);
  strokeWeight(1);
  textSize(windowWidth*(50/1536));
  stroke(100);
  if (artIsSelected) {
     showOptions();
     canDrawFrame = true;
     textAlign(RIGHT);
     if (artOp == 1) {
       currImgArray = artImgArray;
       text(artString1,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rectWidth*0.03,rect2Height);
     } else if (artOp == 2) {
       currImgArray = artImgArray;
       text(artString2,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rectWidth*0.03,rect2Height);
     } else if (artOp == 3) {
       currImgArray = artImgArray;
       text(artString3,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rectWidth*0.03,rect2Height);
     } else if (artOp == 4) {
       currImgArray = artImgArray;
       text(artString4,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rectWidth*0.03,rect2Height);
     }
  }  else if (musicIsSelected) {
      canDrawFrame = false;
      text(musicString,rect2X+rect2Width*0.5,rect2Y+rect2Height*0.2,
         rect2Width*0.5,rect2Height*0.5);
  }  else if (projIsSelected) {
       showOptions();
       canDrawFrame = true;
       textAlign(RIGHT);
       if (projOp == 1) {
          currImgArray= projImgArray;
          text(projString1,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
               rect2Width-rectWidth*0.03,rect2Height);
       } else if (projOp == 2) {
         currImgArray= projImgArray;
         text(projString2,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rectWidth*0.03,rect2Height);
       } else if (projOp == 3) {
         currImgArray= projImgArray;
         text(projString3,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rectWidth*0.03,rect2Height);
       } else if (projOp == 4) {
         currImgArray= projImgArray;
         text(projString4,rect2X + rectWidth*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rectWidth*0.03,rect2Height);
       }
  }  else if (contIsSelected) {
      canDrawFrame = false;
      lookingFor();
      fill(0);
      strokeWeight(1);
      textSize(windowWidth*(40/1536));
      stroke(100);
      textAlign(LEFT);
      text(contString,rect2X + rect2Width*0.5,rect2Y+rect2Height*0.05,
         rect2Width*0.7,rect2Height*0.5);
      textAlign(RIGHT);
      text(contString2,rect2X+rect2Width*0.5,rect2Y+rect2Height*0.05,
         rect2Width*0.5,rect2Height*0.5);
  }
}

function drawPicIndicationMobile(arraySize) {
  let span = windowHeight*0.28;
  let freqDomain = [];
  let octBands = [];
  let sqPadding = 4;
  let squareStart = (windowHeight*0.02/(2*tan((7*PI/18))));
  noStroke();
  for (var i = 0; i < arraySize; i++) {
    push();
    fft.smooth();
    fft.analyze();
    octBands = fft.getOctaveBands();
    freqDomain = fft.logAverages(octBands);
    translate(windowWidth*0.98,windowHeight*0.96+(-i*span/arraySize)-(((mouseY/windowHeight)*-2*squareStart)+squareStart)
              -2*squareStart-((mouseY/windowHeight)*4*squareStart)-((sqPadding*i)/arraySize));
    shearY(((mouseY/windowHeight)*2*PI/9)-(PI/9));
    if (i == currImgY){
      fill((colorPhase+240)%360,100,100,0.7);
      rect(0,0,-windowWidth*0.095*0.5,(span/arraySize)-sqPadding);
      fill((colorPhase+120)%360,100,100,0.4);
      rect(0,0,windowWidth*0.095*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.065*0.5,(span/arraySize)-sqPadding);
    } else {
      fill((colorPhase+240)%360,100,100,0.4);
      rect(0,0,-windowWidth*0.04*0.5,(span/arraySize)-sqPadding,);
      fill((colorPhase+120)%360,100,100,0.4);
      rect(0,0,windowWidth*0.04*0.5*(freqDomain[int(freqDomain.length*i/arraySize)]*(1/255))-windowWidth*0.04*0.5,(span/arraySize)-sqPadding);
    }
    pop();
  }
}

function mobileName() {
  let splitName = split("BRAD STEVENSON", '');
  let splitTitle = split("interdisciplinary creative", '');
  fill(col1);
  stroke(0);
  strokeWeight(8);
  textAlign(LEFT);
  textSize(windowHeight*0.03);
  for (var i = 1; i < splitName.length+1; i++) {
    text(splitName[i-1],windowWidth*0.04,(i/splitName.length)*((mark3)-(mark3/splitName.length)));
  }
  fill(col4);
  strokeWeight(5);
  textSize(windowHeight*0.015);
  for (var j = 1; j < splitTitle.length+1; j++) {
    text(splitTitle[j-1],windowWidth*0.15,(windowHeight*0.05)+(j/splitTitle.length)*((mark3)-(mark3/splitName.length))*0.66);
  }
  sweepLineDrawMobile(windowWidth*0.2,0,windowWidth*0.2,mark3*0.7);
}

function buttonUpdate() {
  if (artIsSelected) {
    currOp = artOp;
  } else if (projIsSelected){
    currOp = projOp;
  }

  if (isMobile) {
    op1Button.style('transform', 'skewX(200deg)');
    op2Button.style('transform', 'skewX(200deg)');
    op3Button.style('transform', 'skewX(200deg)');
    op4Button.style('transform', 'skewX(200deg)');
  } else {
    op1Button.style('transform', 'skewX('+(200-(40*(mouseX/windowWidth)))+'deg)');
    op2Button.style('transform', 'skewX('+(200-(40*(mouseX/windowWidth)))+'deg)');
    op3Button.style('transform', 'skewX('+(200-(40*(mouseX/windowWidth)))+'deg)');
    op4Button.style('transform', 'skewX('+(200-(40*(mouseX/windowWidth)))+'deg)');
  }

  switch (currOp) {
    case 1:
      op1Button.style('background-color',color(colorPhase,100,100,0.7));
      op2Button.style('background-color',color(colorPhase,100,100,0.4));
      op3Button.style('background-color',color(colorPhase,100,100,0.4));
      op4Button.style('background-color',color(colorPhase,100,100,0.4));
      break;
    case 2:
      op2Button.style('background-color',color(colorPhase,100,100,0.7));
      op1Button.style('background-color',color(colorPhase,100,100,0.4));
      op3Button.style('background-color',color(colorPhase,100,100,0.4));
      op4Button.style('background-color',color(colorPhase,100,100,0.4));
      break;
    case 3:
      op3Button.style('background-color',color(colorPhase,100,100,0.7));
      op2Button.style('background-color',color(colorPhase,100,100,0.4));
      op1Button.style('background-color',color(colorPhase,100,100,0.4));
      op4Button.style('background-color',color(colorPhase,100,100,0.4));
      break;
    case 4:
      op4Button.style('background-color',color(colorPhase,100,100,0.7));
      op2Button.style('background-color',color(colorPhase,100,100,0.4));
      op3Button.style('background-color',color(colorPhase,100,100,0.4));
      op1Button.style('background-color',color(colorPhase,100,100,0.4));
      break;
    default:
  }

  if (isSplash) {
    splashButton.position((windowWidth-splashButton.width)*0.5,
        (windowHeight*0.80)+(sin(count)*windowHeight*0.02));
    splashButton.style('border-color', col3);
    splashButton.style('color', col3);
  }

  shhButton.style('border-color', col3);
  if (!isMuted) {
    shhButton.style('color', col3);
  } else {
    shhButton.style('color', '#000');
  }
  if (!isMobile){
    shhButton.position((windowWidth-shhButton.width)*0.5,(windowHeight-(shhButton.height*
          ((mouseY-windowHeight*0.5)/(windowHeight*0.5))))+2);
  }

  if (!artIsSelected) {
    artButton.style('color', colBorderOff);
    artButton.style('border', '2px outset');
    artButton.style('border-color', colBorderOff);
    if (isMobile){
      artButton.size(windowWidth*0.25,windowWidth*0.125);
      artButton.position(windowWidth/3.5,windowHeight/20);
    } else {
      artButton.size(windowWidth*0.1,windowWidth*0.05);
      artButton.position(windowWidth*0.1,windowHeight/10);
    }
  }
  else {
    artButton.style('color',col3);
    artButton.style('border', '3px outset');
    artButton.style('border-color', col3);
    if (isMobile){
      artButton.size(windowWidth*0.27,windowWidth*0.135);
      artButton.position(windowWidth/3.5,windowHeight/20);
    } else {
      artButton.size(windowWidth*0.105,windowWidth*0.0525);
      artButton.position(windowWidth*0.1,windowHeight*0.1+(sin(count)*windowHeight*0.01));
    }
  }

  if (!musicIsSelected) {
    musicButton.style('color', colBorderOff);
    musicButton.style('border', '2px outset');
    musicButton.style('border-color', colBorderOff);
    if (isMobile){
      musicButton.size(windowWidth*0.25,windowWidth*0.125);
      musicButton.position(windowWidth/1.55,windowHeight/20);
    } else {
      musicButton.size(windowWidth*0.1,windowWidth*0.05);
      musicButton.position(windowWidth*0.225,windowHeight/10);
    }
  }
  else {
    musicButton.style('border', '3px outset');
    musicButton.style('border-color', col3);
    musicButton.style('color',col3);
    if (isMobile){
      musicButton.size(windowWidth*0.27,windowWidth*0.135);
      musicButton.position(windowWidth/1.55 ,windowHeight/20);
    } else {
      musicButton.size(windowWidth*0.105,windowWidth*0.0525);
      musicButton.position(windowWidth*0.225,windowHeight*0.1+(sin(count)*windowHeight*0.01));
    }
  }

  if (!projIsSelected) {
    projButton.style('color', colBorderOff);
    projButton.style('border', '2px outset');
    projButton.style('border-color', colBorderOff);
    if (isMobile){
      projButton.size(windowWidth*0.25,windowWidth*0.125);
      projButton.position(windowWidth/3.5,windowHeight/20 + 20 + projButton.height);
    } else {
      projButton.size(windowWidth*0.1,windowWidth*0.05);
      projButton.position(windowWidth*0.575+(projButton.width),windowHeight/10);
    }
  }
  else {
    projButton.style('border', '3px outset');
    projButton.style('border-color', col3);
    projButton.style('color',col3);
    if (isMobile){
      projButton.size(windowWidth*0.27,windowWidth*0.135);
      projButton.position(windowWidth/3.5,windowHeight/20 + 20 + projButton.height);
    } else {
      projButton.size(windowWidth*0.105,windowWidth*0.0525);
      projButton.position(windowWidth*0.575+(projButton.width),windowHeight*0.1+(sin(count)*windowHeight*0.01));
    }
  }

  if (!contIsSelected) {
    contButton.style('color', colBorderOff);
    contButton.style('border', '2px outset');
    contButton.style('border-color', colBorderOff);
    if (isMobile){
      contButton.size(windowWidth*0.25,windowWidth*0.125);
      contButton.position(windowWidth/1.55,windowHeight/20 + 20 + contButton.height);
    } else {
      contButton.size(windowWidth*0.1,windowWidth*0.05);
      contButton.position(windowWidth-(artButton.x+contButton.width),windowHeight*0.1);
    }
  }
  else {
    contButton.style('border', '3px outset');
    contButton.style('border-color', col3);
    contButton.style('color',col3);
    if (isMobile){
      contButton.size(windowWidth*0.27,windowWidth*0.135);
      contButton.position(windowWidth/1.55,windowHeight/20 + 20 + contButton.height);
    } else {
      contButton.size(windowWidth*0.105,windowWidth*0.0525);
      contButton.position(windowWidth-(artButton.x+contButton.width),windowHeight*0.1+(sin(count)*windowHeight*0.01));
    }
  }
}

function updateSizePosLandscape() {
  rectX = windowWidth*0.05;
  rectWidth = windowWidth-(rectX*2);
  rectY = windowHeight * 0.25;
  rectHeight = windowHeight * 0.72;

  rect2X = 0;
  rect2Width = 0;
  rect2Y = 0;
  rect2Height = 0;

  splashButton.size(windowWidth*0.1,windowWidth*0.05);
  splashButton.style('font-size',windowWidth*0.02 + 'px');

  op1Button.size(windowWidth*0.1,windowWidth*0.04);
  op2Button.size(windowWidth*0.1,windowWidth*0.04);
  op3Button.size(windowWidth*0.1,windowWidth*0.04);
  op4Button.size(windowWidth*0.1,windowWidth*0.04);
  op1Button.position(windowWidth*0.53,rectY+rectHeight-windowWidth*0.053);
  op2Button.position(windowWidth*0.63,rectY+rectHeight-windowWidth*0.053);
  op3Button.position(windowWidth*0.73,rectY+rectHeight-windowWidth*0.053);
  op4Button.position(windowWidth*0.83,rectY+rectHeight-windowWidth*0.053);
  op1Button.style('font-size',windowWidth*0.01 + 'px');
  op2Button.style('font-size',windowWidth*0.01 + 'px');
  op3Button.style('font-size',windowWidth*0.01 + 'px');
  op4Button.style('font-size',windowWidth*0.01 + 'px');

  shhButton.size(windowWidth*0.2,windowHeight*0.05);
  shhButton.style('font-size',windowWidth*0.014 + 'px');
  shhButton.style('transform', 'skewX(0deg)');

  artButton.style('font-size',windowWidth*0.02 + 'px');
  musicButton.style('font-size',windowWidth*0.02 + 'px');
  projButton.style('font-size',windowWidth*0.02 + 'px');
  contButton.style('font-size',windowWidth*0.018 + 'px');


}

function updateSizePosMobile() {

  mark1 = windowWidth*(1/5);
  mark2 = windowHeight*0.75;
  mark3 = mark2 + windowHeight*(0.05);

  rectX = mark1+20;
  rectWidth = windowWidth-20-rectX;
  rectY = windowHeight * 0.25;
  rectHeight = rectWidth;

  rect2X = windowWidth*0.03;
  rect2Width = windowWidth*0.89;
  rect2Y = mark3;
  rect2Height = windowHeight-(windowWidth*0.03)-mark3;


  splashButton.size(windowHeight*0.15,windowHeight*0.075);
  splashButton.style('font-size',windowHeight*0.02 + 'px');

  op1Button.style('font-size',windowWidth*0.02 + 'px');
  op2Button.style('font-size',windowWidth*0.02 + 'px');
  op3Button.style('font-size',windowWidth*0.02 + 'px');
  op4Button.style('font-size',windowWidth*0.02 + 'px');
  op1Button.size(rectWidth/4.2,windowHeight*0.04);
  op2Button.size(rectWidth/4.2,windowHeight*0.04);
  op3Button.size(rectWidth/4.2,windowHeight*0.04);
  op4Button.size(rectWidth/4.2,windowHeight*0.04);
  op1Button.position(rect2X+rect2Width-4*(rectWidth/4.2)-(0.1*(windowHeight*0.04/(tan(PI/9)))),rect2Y-windowHeight*0.038);
  op2Button.position(rect2X+rect2Width-3*(rectWidth/4.2)-(0.1*(windowHeight*0.04/(tan(PI/9)))),rect2Y-windowHeight*0.038);
  op3Button.position(rect2X+rect2Width-2*(rectWidth/4.2)-(0.1*(windowHeight*0.04/(tan(PI/9)))),rect2Y-windowHeight*0.038);
  op4Button.position(rect2X+rect2Width-1*(rectWidth/4.2)-(0.1*(windowHeight*0.04/(tan(PI/9)))),rect2Y-windowHeight*0.038);

  shhButton.size(windowWidth*0.45,windowHeight*0.034);
  shhButton.style('font-size',windowHeight*0.02 + 'px');
  shhButton.position(windowWidth*0.6,-4);
  shhButton.style('transform', 'skewX(200deg)');

  textAlign(CENTER);
  splashButton.style('font-size',windowHeight*0.025 + 'px');
  artButton.style('font-size',windowHeight*0.025 + 'px');
  musicButton.style('font-size',windowHeight*0.025 + 'px');
  projButton.style('font-size',windowHeight*0.025 + 'px');
  contButton.style('font-size',windowHeight*0.023 + 'px');

}

function updateSizePosShort() {
    splashButton.size(windowWidth*0.1,windowWidth*0.05);
    op1Button.size(windowWidth*0.1,windowWidth*0.05);
    op2Button.size(windowWidth*0.1,windowWidth*0.05);
    op3Button.size(windowWidth*0.1,windowWidth*0.05);
    op4Button.size(windowWidth*0.1,windowWidth*0.05);
}

function sweepLineDrawMobile(startX,startY,endX,endY) {

    if (lineGrowth<=lineGrowthSpeed) {
      strokeWeight(3);
      stroke(0);
      line(startX,startY,endX,endY*(lineGrowth/lineGrowthSpeed));
      stroke(col2);
      strokeWeight(2);
      line(startX,startY,endX,endY*(lineGrowth/lineGrowthSpeed));
      lineGrowth++;
    } else {
      strokeWeight(3);
      stroke(0);
      line(startX,startY,endX,endY*(lineGrowth/lineGrowthSpeed));
      stroke(col2);
      strokeWeight(2);
      line(startX,startY,endX,endY*(lineGrowth/lineGrowthSpeed));
    }
    stroke(0);
}

function mobileCatagoryDraw() {
  if (catagoryOnMobile) {
    setTimeout(eraseCatMobile,500);
    let textEdge = rectX+(rectWidth*0.5);
    fill(color((colorPhase+240)%360,100,100));
    textSize(windowWidth*0.065);
    textAlign(CENTER);
    stroke(0);
    strokeWeight(5);
    if (artIsSelected){
      text(artCatArray[artOp-1],textEdge,rectY+rectY*0.6);
    } else if (musicIsSelected) {
      text("HEXER QUIZ",textEdge,rectY+rectY*0.5);
    } else if (projIsSelected){
      text(projCatArray[projOp-1],textEdge,rectY+rectY*0.5);
    } else {
      text("LET'S TALK",textEdge,rectY+rectY*0.5);
    }
  }
}

function eraseCatMobile() {
  catagoryOnMobile = false;
}
