var osc1, osc2, osc3 ,osc4, fft;
var osc5;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
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

function preload() {
//  background(0);
  crayon = loadSound('assets/drumgum5.wav');
  crayon.setVolume(0.5);
  crayon.onended(songEnd);
}

function setup() {
  createCanvas(windowWidth+5, windowHeight+5);
  colorMode(HSB, 360,100,100);
  osc1 = new p5.SqrOsc(); // set frequency and type
  osc2 = new p5.TriOsc(); // set frequency and type
  osc3 = new p5.TriOsc(); // set frequency and type
  osc4 = new p5.SqrOsc(); // set frequency and type
  osc5 = new p5.TriOsc(); // set frequency and type

  colorPhase=0;
  fft = new p5.FFT();
  osc1.start();
  osc2.start();
  osc3.start();
  osc4.start();
  osc5.start();

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
  splashButton.style('cursor', 'pointer');
  splashButton.style('-webkit-transition', 'opacity 2s');
  splashButton.style('transition', 'opacity 2s');
  splashButton.style('outline', 'none');
  splashButton.mousePressed(menuTrans);
  splashButton.size(windowWidth*0.1,windowWidth*0.05);

  artButton = createButton('ART');
  artButton.mouseOver(isHov);
  artButton.mouseOut(isntHov);
  artButton.hide();
  artButton.style('opacity', '0');
  artButton.style('border-radius', '20%');
  artButton.style('cursor', 'pointer');
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
  musicButton.style('cursor', 'pointer');
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
  projButton.style('cursor', 'pointer');
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
  contButton.style('cursor', 'pointer');
  contButton.style('-webkit-transition', 'opacity 1s');
  contButton.style('transition', 'opacity 1s');
  contButton.style('outline', 'none');
  contButton.mousePressed(contTrans);

}

function draw() {
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
  var col = color((colorPhase+120)%360,100*(mouseX/windowWidth),100);
  var col4 = color((colorPhase+240)%360,100*(mouseX/windowWidth),100);
  var col2 = color(colorPhase,100*(mouseX/windowWidth),100);
  var col3 = color(colorPhase,100,100);
  var col5 = color((colorPhase+240)%360,100,100);
  var col6 = color((colorPhase+120)%360,100,100);

  if (artIsSelected || musicIsSelected || projIsSelected || contIsSelected) {
    fill(20,0.9);
    strokeWeight(5);
    rectX = artButton.x;
    rectWidth = windowWidth-(2*artButton.x);
    if (artIsSelected){
      rectY = musicButton.y+musicButton.height+(windowHeight*0.05);
      rectHeight = windowHeight-(2*musicButton.y+musicButton.height);
    } else {
      rectY = artButton.y+artButton.height+(windowHeight*0.05);
      rectHeight = windowHeight-(2*artButton.y+artButton.height);
    }
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
    fill(col3);
    textSize(60);
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
  }

  stroke(col);
  fill(col2);
  line(mouseX,0,mouseX,windowHeight);
  line(0,mouseY,windowWidth,mouseY);
  stroke(0);
  strokeWeight(2);
  line(mouseX,0,mouseX,windowHeight);
  line(0,mouseY,windowWidth,mouseY);
  ellipse(mouseX,mouseY,15,15);
  fill(0);
  ellipse(mouseX,mouseY,5,5);
  if (mouseIsPressed && !isHovering && !onTB) {
    fill(col3);
    strokeWeight(3);
    ellipse(mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20,windowWidth*0.2,windowWidth*0.2);
    textSize(windowWidth*0.02);
    fill(0);
    text(int(freq1)+' Hz',mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20);
    osc1.amp(.2);
    osc2.amp(.2);
    osc3.amp(.2);
    osc4.amp(.4);
    osc5.amp(0);
  }
  else {
    osc1.amp(0);
    osc2.amp(0);
    osc3.amp(0);
    osc4.amp(0);
    osc5.amp(0);
  }
  if (isSplash){
    fill(col);
    stroke(0);
    strokeWeight(8);
    textSize(windowWidth*0.08);
    text("BRAD STEVENSON",windowWidth*0.5,windowHeight*0.5-(windowHeight*0.05)+(cos(count)*windowHeight*0.1));
    textSize(windowWidth*0.04);
    fill(col4);
    text("interdisciplinary creative",windowWidth*0.5,windowHeight*0.5+(windowHeight*0.1)+(cos(count)*windowHeight*0.1));
  }
  else {
    fill(col);
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
  splashButton.position((windowWidth*0.5)-(splashButton.width*0.5),
      (windowHeight*0.85)-(splashButton.height*0.5)+(sin(count)*windowHeight*0.02));

  if (!artIsSelected) {
    artButton.style('color', col3);
    artButton.style('border-color', col3);
    artButton.style('border', '2px outset');
    artButton.style('background-color', '#000000');
    artButton.size(windowWidth*0.1,windowWidth*0.05);
  }
  else {
    artButton.style('color',col5);
    artButton.style('border', '5px outset');
    artButton.style('border-color', col6);
    artButton.size(windowWidth*0.105,windowWidth*0.0525);
  }
  artButton.style('font-size',windowWidth*0.02 + 'px');
  artButton.position(windowWidth*0.1,windowHeight*0.1);

  if (!musicIsSelected) {
    musicButton.style('border-color', col3);
    musicButton.style('color', col3);
    musicButton.style('border', '2px outset');
    musicButton.style('background-color', '#000000');
    musicButton.size(windowWidth*0.1,windowWidth*0.05);
  }
  else {
    musicButton.style('border', '5px outset');
    musicButton.style('border-color', col6);
    musicButton.style('color',col5);
    musicButton.size(windowWidth*0.105,windowWidth*0.0525);
  }
  musicButton.style('font-size',windowWidth*0.02 + 'px');
  musicButton.position(windowWidth*0.2+(artButton.width*0.25),windowHeight*0.1);

  if (!projIsSelected) {
    projButton.style('border-color', col3);
    projButton.style('color', col3);
    projButton.style('border', '2px outset');
    projButton.style('background-color', '#000000');
    projButton.size(windowWidth*0.1,windowWidth*0.05);
  }
  else {
    projButton.style('border', '5px outset');
    projButton.size(windowWidth*0.105,windowWidth*0.0525);
    projButton.style('border-color', col6);
    projButton.style('color',col5);
  }
  projButton.style('font-size',windowWidth*0.02 + 'px');
  projButton.position(windowWidth-((musicButton.x)+musicButton.width),windowHeight*0.1);

  if (!contIsSelected) {
    contButton.style('border-color', col3);
    contButton.style('color', col3);
    contButton.style('border', '2px outset');
    contButton.style('background-color', '#000000');
    contButton.size(windowWidth*0.1,windowWidth*0.05);
  }
  else {
    contButton.style('border', '5px outset');
    contButton.size(windowWidth*0.105,windowWidth*0.0525);
    contButton.style('border-color', col6);
    contButton.style('color',col5);
  }
  contButton.style('font-size',windowWidth*0.02 + 'px');
  contButton.position(windowWidth-(artButton.x+contButton.width),windowHeight*0.1);

  var freq = map(mouseX, 0, width, 40, 500);
  var off = map(mouseY, 0, height, 20, .01);
  freq1 = freq*1;
  freq2 = freq*1.25;
  freq3 = freq*1.481;
  freq4 = freq*1.851;
  freq5 = freq*2.111;
  osc1.freq(freq1+off);
  osc2.freq(freq2+off);
  osc3.freq(freq3+off);
  osc4.freq(freq4+off);
  osc5.freq(freq5+off);

  if(isSplash) {
    count+= 0.05+((mouseX/windowWidth)*0.08);
    count = count%6.23;
  }
  else {
    count = PI*0.5;
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
  playSong();
  splashButton.style('opacity', '0');
  background(0);
  artButton.show();
  musicButton.show();
  projButton.show();
  contButton.show();
  milTemp = millis();

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
  } else {
    background(0);
    projIsSelected = false;
  }
}

function contTrans(){
  if (!contIsSelected){
    contIsSelected = true;
    artIsSelected = false;
    projIsSelected = false;
    musicIsSelected = false;
  } else {
    background(0);
    contIsSelected = false;
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

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
