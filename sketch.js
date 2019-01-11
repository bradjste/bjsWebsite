var osc1, osc2, osc3 ,osc4, fft;
var osc5;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
var mPressed = false;
var splashButton, artButton, musicButton, contButton;
var isSplash = true;
var artIsSelected = false;
var musicIsSelected = false;
var projIsSelected = false;
var contIsSelected = false;
var shouldDrawWF = false;
var isHovering, onTB = false;
var crayon;
var rectX;
var rectY;
var rectWidth;
var rectHeight;
var songPlaying = false;
var splashButtonBool = true;
var col1, col2, col3, col4, col5, col6, colText;
var colBorderOff;
var firstDraw = true;
var wipeTime =0;
var wipeCount= 0;
var wipeBool = false;
var wipeNum = 18;

function setup() {
  createCanvas(windowWidth+5, windowHeight+5);
  colorMode(HSB, 360,100,100);
  background(0);

  crayon = loadSound('assets/drumgum5.wav');
  crayon.setVolume(0.5);
  crayon.onended(songEnd);

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

  splashButton = createButton('ENTER');
  splashButton.mouseOver(isHov);
  splashButton.mouseOut(isntHov);
  splashButton.style('border-radius', '20%');
  splashButton.style('cursor', 'cell');
  splashButton.style('outline', 'none');
  splashButton.style('opacity','0');
  splashButton.style('visibility','hidden');
  splashButton.mousePressed(menuTrans);
  splashButton.size(windowWidth*0.1,windowWidth*0.05);

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

  if (splashButtonBool){
    if (crayon.isLoaded()) {
    splashButton.style('-webkit-transition', 'opacity 2s');
    splashButton.style('transition', 'opacity 2s');
    splashButton.style('opacity','100');
    splashButton.style('visibility', 'visible');
    splashButtonBool = false;
  }
  else {
      fill(col3);
      textSize(windowWidth*0.025);
      text("LOADING",windowWidth*0.475+random(windowWidth*0.05),windowHeight*0.88+random(windowWidth*0.03));
  }
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
  if ((mouseIsPressed && !isHovering && !onTB)|| songPlaying) {
    beginShape();
    strokeWeight(3);
    stroke(0);
    for (var i = 0; i < waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, windowWidth);
      var y = map(waveform[i], -1, 1, windowHeight, 0);
      fill(colorPhase,100-(100*(mouseX/windowWidth)),100);
      vertex(x, y+windowHeight*0.1);
    }
    endShape();
  }
  strokeWeight(9);



  if (artIsSelected || musicIsSelected || projIsSelected || contIsSelected) {
    fill(20,0.9);
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
    fill(col3);
    textSize(windowWidth*0.035);
    stroke(0);
    strokeWeight(5);
    if (artIsSelected){
      text("ART",windowWidth*0.5,windowHeight*0.35);
    } else if (musicIsSelected) {
      text("MUSIC",windowWidth*0.5,windowHeight*0.35);
    } else if (projIsSelected){
      text("PROJEX",windowWidth*0.5,windowHeight*0.35);
    } else {
      text("CONTACT",windowWidth*0.5,windowHeight*0.35);
    }
    contentDraw();
  } else {
    axisDraw();
  }


  if (mouseIsPressed && !isHovering && !onTB && (millis()>200)) {
    fill(col3);
    strokeWeight(3);
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
  var off = map(mouseY, 0, height, 0.5, .01);
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

  if (milTemp+800 < millis()){
    loadMenu();
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
  playSong();
}

function playSong(){
  crayon.play();
  songPlaying = true;
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
  } else {
    background(0);
    artIsSelected = false;
  }
}

function musicTrans(){
  if (!musicIsSelected){
    musicIsSelected = true;
    artIsSelected = false;
    contIsSelected = false;
    projIsSelected = false;
    count = 0;
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
  } else {
    background(0);
    projIsSelected = false;
  }
}

function contentDraw() {
  fill(100);
  strokeWeight(2);
  textSize(40);
  if (artIsSelected) {
    text("stuff stuff stuff art stuff",rectX+rectWidth*0.5,rectY+rectHeight*0.4);
  }
  if (musicIsSelected) {
    text("stuff stuff stuff music stuff",rectX+rectWidth*0.5,rectY+rectHeight*0.4);
  }
  if (projIsSelected) {
    text("stuff stuff stuff project stuff",rectX+rectWidth*0.5,rectY+rectHeight*0.4);
  }
  if (contIsSelected) {
    text("stuff stuff stuff contact stuff",rectX+rectWidth*0.5,rectY+rectHeight*0.4);
  }
}

function contTrans(){
  if (!contIsSelected){
    contIsSelected = true;
    artIsSelected = false;
    projIsSelected = false;
    musicIsSelected = false;
    count = 0;
  } else {
    background(0);
    contIsSelected = false;
  }
}

function loadingScreen(){
   fill(random(360),100,100);
   ellipse(windowWidth*0.5,windowHeight*0.5,30,30);
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
        (windowHeight*0.80)+(sin(count)*windowHeight*0.02),(wipeCount/wipeNum)*windowWidth*Math.sqrt(2),(wipeCount/wipeNum)*windowWidth*Math.sqrt(2));
    wipeCount++;
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
