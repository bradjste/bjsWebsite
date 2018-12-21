var osc1, osc2, osc3 ,osc4, fft;
var osc5;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
var button, artButton, musicButton;
var isSplash = true;


function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  colorMode(HSB, 360,100,100);
  osc1 = new p5.TriOsc(); // set frequency and type
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

  button = createButton('ENTER');
  artButton = createButton('ART');
  musicButton = createButton('MUSIC');
  artButton.hide();
  musicButton.hide();
  artButton.style('opacity', '0');
  musicButton.style('opacity', '0');

  button.style('border-radius', '20%');
  button.style('cursor', 'pointer');
  button.style('-webkit-transition', 'opacity 1s');
  button.style('transition', 'opacity 1s');
  button.mousePressed(menuTrans);

  artButton.style('border-radius', '20%');
  artButton.style('cursor', 'pointer');
  artButton.style('-webkit-transition', 'opacity 1s');
  artButton.style('transition', 'opacity 1s');
  //artButton.mousePressed(artTrans);
  musicButton.style('border-radius', '20%');
  musicButton.style('cursor', 'pointer');
  musicButton.style('-webkit-transition', 'opacity 1s');
  musicButton.style('transition', 'opacity 1s');
  //musicButton.mousePressed(musicTrans);
  //button.position(windowWidth*0.5-(button.width*0.5), windowHeight*0.5);
  button.size(windowWidth*0.1,windowWidth*0.05);
  //button.style('background-color', col);

//button.mousePressed(changeBG);
}

function draw() {
  colorPhase++;
  colorPhase = colorPhase % 360;
  var waveform = fft.waveform();
  var yMin,yMax = 0;
  beginShape();
  strokeWeight(3);
  stroke(0);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, windowWidth);
    var y = map(waveform[i], -1, 1, windowHeight, 0);
    fill(colorPhase,100-(100*(mouseX/windowWidth)),100);
    vertex(x, y+(cos(count)*windowWidth*0.1));
  }
  endShape();
  strokeWeight(9);
  var col = color((colorPhase+120)%360,100*(mouseX/windowWidth),100);
  var col4 = color((colorPhase+240)%360,100*(mouseX/windowWidth),100);
  var col2 = color(colorPhase,100*(mouseX/windowWidth),100);
  var col3 = color(colorPhase,100,100);
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
  if (mouseIsPressed) {
    fill(col3);
    strokeWeight(3);
    ellipse(mouseX+random(40*(mouseX/windowWidth))-20,mouseY+random(40*(mouseX/windowWidth))-20,windowWidth*0.2,windowWidth*0.2);
    textSize(windowWidth*0.02);
    fill(0);
    text(int(freq1)+' Hz',mouseX,mouseY);
    osc1.amp(.2);
    osc2.amp(.2);
    osc3.amp(.2);
    osc4.amp(.1);
    osc5.amp(.4);
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
  button.style('border-color', col3);
  button.style('color', col3);
  button.style('background-color', '#000000');
  button.style('font-size',windowWidth*0.02 + 'px');
  button.size(windowWidth*0.1,windowWidth*0.05);
  button.position((windowWidth*0.5)-(button.width*0.5),
      (windowHeight*0.85)-(button.height*0.5)+(sin(count)*windowHeight*0.02));

  artButton.style('border-color', col3);
  artButton.style('color', col3);
  artButton.style('background-color', '#000000');
  artButton.style('font-size',windowWidth*0.02 + 'px');
  artButton.size(windowWidth*0.1,windowWidth*0.05);
  artButton.position(windowWidth*0.1,windowHeight*0.1);

  musicButton.style('border-color', col3);
  musicButton.style('color', col3);
  musicButton.style('background-color', '#000000');
  musicButton.style('font-size',windowWidth*0.02 + 'px');
  musicButton.size(windowWidth*0.1,windowWidth*0.05);
  musicButton.position(windowWidth*0.1+(artButton.width*0.25)+artButton.width,windowHeight*0.1);

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
  resizeCanvas(windowWidth-5, windowHeight-5);
}

function menuTrans() {
  isSplash = false;
  button.style('opacity', '0');
  //background(0);
  artButton.show();
  musicButton.show();
  milTemp = millis();
}

function loadMenu() {
  button.hide();
  artButton.style('opacity','100');
  musicButton.style('opacity','100');
}
