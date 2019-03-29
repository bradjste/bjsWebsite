/*
   A personal website utilizing the p5.js JavaScript library.
   Brad Stevenson
   bradjste@gmail.com
   2/22/2019
*/

var osc1, osc2, osc3 ,osc4, fft;
var colorPhase;
var freq1,freq2,freq3,freq4,freq5;
var count;
var milTemp;
var mPressed = false;
var splashButton, artButton, musicButton, contButton;
var op1Button,op2Button,op3Button,op4Button;
var shhButton, playButton, vansButton;
var mark1,mark2,mark3;
var isSplash = true;
var artIsSelected = false;
var musicIsSelected = false;
var projIsSelected = false;
var contIsSelected = false;
var isHovering, onTB, onTB2 = false;
var isMuted = true;
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
var clk4SndWasSeen = false;
var col1, col2, col3, col4, col5, col6, col7, col8, colText;
var colBorderOff;
var mobCatFadeInc = 0;
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
var artImgArray2 = [];
var artImgArray3 = [];
var artImgArray4 = [];
var projImgArray = [];
var projImgArray2 = [];
var projImgArray3 = [];
var projImgArray4 = [];
var musicImgArray = [];
var contImgArray =[];
var contStrings = [];
var currImgArray = [];
var canDrawFrame = false;
var isMobile = false;
var artString1 = "I am a generative artist, or an artist that uses computer science, randomness, and musical instincts to guide abstract ideas and systems to produce unprecedented results.";
var artString2 = "I have had the pleasure to exhibit some electronic art at the Los Angeles Center for Digital Art recently. 'HANDS WHERE i CAN SEE THEM' and 'HANDS WHERE ii CAN SEE THEM' integrate tech and art to distribute a playful, raw perspective from the computer's point of view.";
var artString3 = "At UCSD, I had my first exhibition, 'RGB', in the Triton Art Gallery. It was a set of 25 prints, distributed equally across the space. The artwork was a collection of digital artifacts from generative processes I have developed over the years.";
var artString4 = "A large cog in the machine of my workflow is using camera or image input to guide new twists on familiar sights.";
var musicString = "Under the moniker 'Hexer Quiz', I blend the weird, wild, slick and crunchy into jams that glow in the dark. My biggest influences are Tame Impala, The Strokes, KAYTRANADA, My Bloody Valentine, Porter Robinson and Flying Lotus (among thousands of others). If that sounds up your alley, check out 'The Drip' from my first album.";
var projString1 = "For my senior project at UC San Diego, I designed and prototyped a puredata driven digital instrument with the capability to connect to an Arduino and LEDs via serial communication. I then loaded the patch onto a Raspberry Pi for portability.";
var projString2 = "As an intern for CutMod Digital Media, I have worked on a few projection mapping events. One ofthe latest maps we did was in Joshua Tree National Park for Vans.";
var projString3 = "'ENGN_WAVE' is a digital musical instrument designed to mimic the revving of an engine. Each piston is variable, and the interface has real-time color response.";
var projString4 = "Myself and three others prototyped an Arduino-based audio spectrum analyzer, which moved plastic pistons with servos to indicate which frequencies were active at the moment. It was a fun challenge and a great exercise in product design/prototyping.";
var contString = "email:"+"\n"+"instagram:"+"\n"+"bandcamp:"+"\n"+"twitter:";
var contString2 = "bradjste@gmail.com"+"\n"+"bradjste"+"\n"+"Hexer Quiz"+"\n"+"@hexerquiz";
var myFont;

//Load font before displaying site
function preload() {
  myFont = loadFont('assets/Avenir.otf');
}

//Initial setup
function setup() {

  //Sets window for intial viewing
  createCanvas(windowWidth, windowHeight);
  noCursor();
  background(0);
  textAlign(CENTER);
  textSize(windowWidth*0.08);
  stroke(0);
  strokeWeight(60);
  count = 0.0;
  colorPhase=0;
  colorMode(HSB, 360,100,100);
  textFont(myFont);
  aspectCheck();

  //Load audio file
  currSong = loadSound('assets/music/float7.mp3');
  currSong.setVolume(0.5);
  currSong.onended(songEnd);
  currSong.playMode('restart');

  //Creates 4 tone generators
  osc1 = new p5.SqrOsc(); // set frequency and type
  osc2 = new p5.SqrOsc(); // set frequency and type
  osc3 = new p5.SqrOsc(); // set frequency and type
  osc4 = new p5.SqrOsc(); // set frequency and type

  //Mute music
  osc1.amp(0);
  osc2.amp(0);
  osc3.amp(0);
  osc4.amp(0);

  //Start oscs and audio analyzer
  fft = new p5.FFT();
  osc1.start();
  osc2.start();
  osc3.start();
  osc4.start();


  //ART page titles
  artCatArray[0] = "GENERATIVE ART";
  artCatArray[1] = "LACDA";
  artCatArray[2] = "UC SAN DIEGO";
  artCatArray[3] = "IMAGE PROCESSING";

  //PROJEX page titles
  projCatArray[0] = "SYNTEGER";
  projCatArray[1] = "PROJECTIONS";
  projCatArray[2] = "ENGN_WAVE";
  projCatArray[3] = "SPECTRUM ANALYZER";

  //CONTACT page titles
  contStrings[0] = "email:";
  contStrings[1] = "instagram:";
  contStrings[2] = "bandcamp:";
  contStrings[3] = "twitter:";
  contStrings[4] = "bradjste@gmail.com";
  contStrings[5] = "bradjste";
  contStrings[6] = "Hexer Quiz";
  contStrings[7] = "@hexerquiz";

  //Initializes frame
  currImgArray = artImgArray;

  //Load ART images
  artImgArray[0] = loadImage('assets/artImg/art0.jpg');
  artImgArray[1] = loadImage('assets/artImg/art1.jpg');
  artImgArray[2] = loadImage('assets/artImg/art2.jpg');
  artImgArray[3] = loadImage('assets/artImg/art3.jpg');
  artImgArray[4] = loadImage('assets/artImg/art4.jpg');
  artImgArray[5] = loadImage('assets/artImg/art5.jpg');
  artImgArray[6] = loadImage('assets/artImg/art6.jpg');
  artImgArray[7] = loadImage('assets/artImg/art7.jpg');
  artImgArray[8] = loadImage('assets/artImg/art8.jpg');

  artImgArray2[0] = loadImage('assets/artImg/lac0.png');
  artImgArray2[1] = loadImage('assets/artImg/lac1.png');
  artImgArray2[2] = loadImage('assets/artImg/lac2.png');
  artImgArray2[3] = loadImage('assets/artImg/lac3.png');
  artImgArray2[4] = loadImage('assets/artImg/lac4.png');

  artImgArray3[0] = loadImage('assets/artImg/ucsd1.jpg');
  artImgArray3[1] = loadImage('assets/artImg/ucsd2.jpg');
  artImgArray3[2] = loadImage('assets/artImg/ucsd3.jpg');
  artImgArray3[3] = loadImage('assets/artImg/ucsd4.jpg');
  artImgArray3[4] = loadImage('assets/artImg/ucsd5.jpg');
  artImgArray3[5] = loadImage('assets/artImg/ucsd6.jpg');
  artImgArray3[6] = loadImage('assets/artImg/ucsd7.jpg');

  artImgArray4[0] = loadImage('assets/artImg/im0.png');
  artImgArray4[1] = loadImage('assets/artImg/im1.png');
  artImgArray4[2] = loadImage('assets/artImg/im2.png');
  artImgArray4[3] = loadImage('assets/artImg/im3.png');
  artImgArray4[4] = loadImage('assets/artImg/im4.png');

  //Load PROJEX images
  projImgArray[0] = loadImage('assets/projImg/synt0.jpg');
  projImgArray[1] = loadImage('assets/projImg/synt1.jpg');
  projImgArray[2] = loadImage('assets/projImg/synt2.jpg');
  projImgArray[3] = loadImage('assets/projImg/synt3.jpg');
  projImgArray[4] = loadImage('assets/projImg/synt4.jpg');
  projImgArray[5] = loadImage('assets/projImg/synt5.jpg');

  projImgArray2[0] = loadImage('assets/projImg/v0.png');
  projImgArray2[1] = loadImage('assets/projImg/v1.png');

  projImgArray3[0] = loadImage('assets/projImg/en0.JPG');
  projImgArray3[1] = loadImage('assets/projImg/en1.JPG');
  projImgArray3[2] = loadImage('assets/projImg/en2.JPG');
  projImgArray3[3] = loadImage('assets/projImg/en3.JPG');

  projImgArray4[0] = loadImage('assets/projImg/span0.jpg');
  projImgArray4[1] = loadImage('assets/projImg/span1.jpg');
  projImgArray4[2] = loadImage('assets/projImg/span2.jpg');
  projImgArray4[3] = loadImage('assets/projImg/span3.jpg');
  projImgArray4[4] = loadImage('assets/projImg/span4.jpg');
  projImgArray4[5] = loadImage('assets/projImg/span5.jpg');
  projImgArray4[6] = loadImage('assets/projImg/span6.jpg');
  projImgArray4[7] = loadImage('assets/projImg/span7.jpg');
  projImgArray4[8] = loadImage('assets/projImg/span8.jpg');
  projImgArray4[9] = loadImage('assets/projImg/span9.JPG');
  projImgArray4[10] = loadImage('assets/projImg/span10.JPG');
  projImgArray4[11] = loadImage('assets/projImg/span11.jpg');

  //Load CONTACT images
  contImgArray[0] = loadImage('assets/contImg/cont1.jpg');
  contImgArray[1] = loadImage('assets/contImg/cont2.jpg');
  contImgArray[2] = loadImage('assets/contImg/cont3.jpg');

  //Job title descriptions
  titleArray[0] = "an audio engineer";
  titleArray[1] = "a composer";
  titleArray[2] = "a creative coder";
  titleArray[3] = "a generative artist";
  titleArray[4] = "an interactive designer";
  titleArray[5] = "a recording engineer";
  titleArray[6] = "a UI designer";
  titleArray[7] = "a music producer";
  titleArray[8] = "an event manager";
  titleArray[9] = "an instrument prototyper";
  titleArray[10] = "a SAG actor";
  titleArray[11] = "a sound designer";
  titleArray[12] = "an image processor";
  titleArray[13] = "a new friend";
  titleArray[14] = "a puredata specialist";

  //Begin interval functions
  setInterval(titleNumInc,1000);
  setInterval(mobileCatFade,10);

  //Initialize splash button
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

  //Initialize sound toggle button
  shhButton = createButton('| |-  S O U N D  -| |');
  shhButton.mouseOver(isHov);
  shhButton.mouseOut(isntHov);
  shhButton.style('cursor', 'cell');
  shhButton.style('background-color', '#000000');
  shhButton.style('outline', 'none');
  shhButton.mousePressed(mute);

  //Initialize play button
  playButton = createButton('<PLAY>');
  playButton.mouseOver(isHov);
  playButton.mouseOut(isntHov);
  playButton.hide();
  playButton.style('color','#FF0000');
  playButton.style('border-radius', '40%');
  playButton.style('border-color','#FF0000');
  playButton.style('background-color', '#000008');
  playButton.style('outline', 'none');
  playButton.style('cursor', 'cell');
  playButton.mousePressed(playButtonPress);

  //Initialize vans link button
  vansButton = createButton('CHECK IT OUT HERE');
  vansButton.mouseOver(isHov);
  vansButton.mouseOut(isntHov);
  vansButton.hide();
  vansButton.style('color','#FF00FF');
  vansButton.style('border-radius', '40%');
  vansButton.style('border-color','#FF00FF');
  vansButton.style('background-color', '#000008');
  vansButton.style('outline', 'none');
  vansButton.style('cursor', 'cell');
  vansButton.mousePressed(vansButtonPress);

  //Initialize option buttons
  op1Button = createButton('|');
  op1Button.mouseOver(isHov);
  op1Button.mouseOut(isntHov);
  op1Button.hide();
  op1Button.style('cursor', 'cell');
  op1Button.style('outline', 'none');
  op1Button.style('transform', 'skewX(160deg)');
  op1Button.mousePressed(op1Select);

  op2Button = createButton('||');
  op2Button.mouseOver(isHov);
  op2Button.mouseOut(isntHov);
  op2Button.hide();
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
  op3Button.style('transform', 'skewX(160deg)');
  op3Button.mousePressed(op3Select);

  op4Button = createButton('||||');
  op4Button.mouseOver(isHov);
  op4Button.mouseOut(isntHov);
  op4Button.hide();
  op4Button.style('outline', 'none');
  op4Button.style('cursor', 'cell');
  op4Button.style('transform', 'skewX(160deg)');
  op4Button.mousePressed(op4Select);

  //Initialize page buttons
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

  //Determines initial window dimensions
  updateSizePos();
}

//Main loop
function draw() {

  //Update color swatch
  updateSwatch()

  //Adds fade effect for main screen
  if(!isSplash) {
    fill(0,0.1);
    noStroke();
    rect(0,0,windowWidth,windowHeight);
  }

  //Iterates circle wipe on entry to main site
  if (wipeBool) {
     wipe();
     if (wipeCount == wipeNum){
       wipeBool = false;
     }
  }
  wipeTime = millis();

  //Increment global color change
  colorPhase++;
  colorPhase = colorPhase % 360;

  //Get audio waveform and scale to window
  var waveform = fft.waveform();
  var yMin,yMax = 0;
  if ((mouseIsPressed && !isHovering && !onTB &&
               !onTB2 && !isMuted)|| songPlaying) {
    beginShape();
    strokeWeight(3);
    fill(colorPhase,100-(100*(winMouseX/windowWidth)),100-
          (100*(winMouseX/windowWidth)));
    stroke(colorPhase,100,100*(winMouseX/windowWidth));
    for (var i = 0; i < waveform.length; i++) {
      if (i % 2 == 0) {
        var x = map(i, 0, waveform.length, 0, windowWidth);
        //Waveform follows mouseY on splash
        if (isSplash) {
          var y = map(waveform[i], -1, 1, windowHeight+ windowHeight*0.1*
                                        sin(count)*(winMouseY/windowHeight), 0);
          var my = map(winMouseY,0,windowHeight,-windowHeight/2,windowHeight/2)
        } else {
          var y = map(waveform[i], -1, 1, windowHeight+ windowHeight*0.3, 0);
          var my = 0;
        }
        curveVertex(x, y+ my);
      }
    }
    endShape();
  }
  strokeWeight(9);

  //Draw mouse axis
  axisDraw();
  sing();

  //Sound reccomendation text
  if(isSplash && isMuted && isMobile){
     clk4SndMobile();
  } else if (isSplash && isMuted && !isMobile) {
     clk4Snd();
  }

  //Content draw
  if (artIsSelected || musicIsSelected || projIsSelected || contIsSelected) {
    rectDraw();
    touchRectCheck();
    if (isMobile) {
       rect2Draw();
       touchRect2Check();
       if (!musicIsSelected){
         drawFrameMobile();
       }
       contentDrawMobile();
       drawPicIndicationMobile(currImgArray.length);
       mobileCatagoryDraw();
     } else {
       if (artIsSelected || projIsSelected || contIsSelected) {
         drawPicIndication(currImgArray.length);
       }
       catagoryDraw();
       contentDraw();
       sweepLineDraw(rectX+rectWidth-10,windowHeight*0.37,(rectX+rectWidth-10)
                  -(windowWidth*0.35),windowHeight*0.37);
     }
  }

  //Allow music to load before playing and entering site
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


  //Namecard logic and formatting
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

  //Update frame dependent button styles
  buttonUpdate();
  mobileCatagoryDraw();

  //Audio frequencies, tuned to a major 7th chord
  var freq = map(winMouseX, 0, windowWidth, 40, 500);
  freq1 = freq*1;
  freq2 = freq*1.25;
  freq3 = freq*1.481;
  freq4 = freq*1.851;
  osc1.freq(freq1);
  osc2.freq(freq2);
  osc3.freq(freq3);
  osc4.freq(freq4);

  //Animation phase update
  if (isSplash){
    count+= 0.05+((winMouseX/windowWidth)*0.08);
  } else {
    count+= 0.04;
  }
  if (count >= 6.23 || splashButtonBool) {
    count = 0;
  }

}

//Resize event listener, resets global dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  updateSizePos();
  currImgX = 0;
  currImgY = 0;
}

//Mouse move event listener
function mouseMoved() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  mPressed = true;
}

//Mouse move event listener
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  mPressed = true;
}

//Determines which function to format with based on aspect ratio
function updateSizePos() {
  aspectCheck();
  if (isMobile){
    updateSizePosMobile();
  } else {
    updateSizePosLandscape();
  }
}

//Update color swatch
function updateSwatch() {
  col1 = color((colorPhase+120)%360,100*(winMouseX/windowWidth),100);
  col2 = color(colorPhase,100*(winMouseX/windowWidth),100);
  col3 = color(colorPhase,100,100);
  col4 = color((colorPhase+240)%360,100*(winMouseX/windowWidth),100);
  col5 = color((colorPhase+240)%360,100,100);
  col6 = color((colorPhase+120)%360,100,100);
  col7 = color((colorPhase+120)%360,100,100,winMouseY/windowHeight);
  col8 = color(colorPhase,100,100*(winMouseX/windowWidth));
  colText = color((colorPhase+240)%360,100,20);
  colBorderOff = color(colorPhase,40,100);
}

//Fades from splash to main site
function menuTrans() {
  isSplash = false;
  wipeBool = true;
  clk4SndWasSeen = true;
  splashButton.style('opacity', '0');
  artButton.show();
  musicButton.show();
  projButton.show();
  contButton.show();
  milTemp = millis();
  setTimeout(loadMenu,800);
  setTimeout(playSong,1000);
}

//Plays loaded audio file
function playSong(){
  if (!isMuted && !songPlaying) {
    currSong.play();
    playButton.style('color','#00FF00');
    playButton.style('border-color','#00FF00');
    songPlaying = true;
  }
}

//Button fade in
function loadMenu() {
  splashButton.hide();
  artButton.style('opacity','100');
  musicButton.style('opacity','100');
  projButton.style('opacity','100');
  contButton.style('opacity','100');
}

//Main content manager and logic
function contentDraw() {
  fill(0);
  strokeWeight(3);
  textSize(windowWidth*(30/1536));
  stroke(100);
  if (artIsSelected) {
    showOptions();
      canDrawFrame = true;
     if (artOp == 1) {
         currImgArray = artImgArray;
         text(artString1,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
            rectWidth*0.385,rectHeight*0.5);
     } else if (artOp == 2) {
       currImgArray = artImgArray2;
       text(artString2,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
          rectWidth*0.385,rectHeight*0.5);
     } else if (artOp == 3) {
       currImgArray = artImgArray3;
       text(artString3,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
          rectWidth*0.385,rectHeight*0.5);
     } else if (artOp == 4) {
       currImgArray = artImgArray4;
       text(artString4,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
          rectWidth*0.385,rectHeight*0.5);
     }
  }  else if (musicIsSelected) {
      canDrawFrame = false;
      drip();
      fill(0);
      strokeWeight(3);
      textSize(windowWidth*(30/1536));
      stroke(100);
      text(musicString,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
         rectWidth*0.385,rectHeight*0.8);
  }  else if (projIsSelected) {
      showOptions();
      canDrawFrame = true;
       if (projOp == 1) {
          currImgArray= projImgArray;
          text(projString1,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
              rectWidth*0.385,rectHeight*0.5);
       } else if (projOp == 2) {
         currImgArray= projImgArray2;
         text(projString2,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
             rectWidth*0.385,rectHeight*0.5);
       } else if (projOp == 3) {
         currImgArray= projImgArray3;
         text(projString3,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
             rectWidth*0.385,rectHeight*0.5);
       } else if (projOp == 4) {
         currImgArray= projImgArray4;
         text(projString4,rectX+rectWidth*0.6,rectY+rectHeight*0.2,
             rectWidth*0.385,rectHeight*0.5);
       }
  }  else if (contIsSelected) {
      canDrawFrame = true;
      currImgArray = contImgArray;
      lookingFor();
      sayHowdy();
      fill(0);
      strokeWeight(1);
      textSize(windowWidth*(40/1536));
      stroke(100);
      for (var i = 0; i < 4; i++){
        textAlign(LEFT);
        text(contStrings[i],rectX + rectWidth*0.6,rectY+rectHeight*0.18+(((i%4)/4)*rectHeight/3.5),
          rectWidth*0.5,rectHeight*0.6);
        textAlign(RIGHT);
        text(contStrings[i+4],rectX+rectWidth*0.5,rectY+rectHeight*0.18+(((i%4)/4)*rectHeight/3.5),
         rectWidth*0.49,rectHeight*0.6);
      }
  }
  if (canDrawFrame) {
    drawFrame();
  }
}

//On mouse hover for buttons
function isHov() {
   isHovering = true;
}

//Off mouse hover for buttons
function isntHov() {
   isHovering = false;
}

//Resets audio for replay
function songEnd(){
   songPlaying = false;
   playButton.style('color','#FF0000');
   playButton.style('border-color','#FF0000');
}

//Draws main rectangle
function rectDraw() {
  fill(100,0.6);
  stroke(0);
  strokeWeight(5);
  rect(rectX,rectY,rectWidth,rectHeight);
}

//Wipes splash drawings for main site
function wipe() {
    let cirSize = 0;
    if (isMobile) {
      cirSize = windowWidth*Math.sqrt(2);
    } else {
      cirSize = windowHeight*Math.sqrt(2);
    }
    noStroke();
    fill(100*((wipeNum-wipeCount)*.01));
    ellipse((windowWidth*0.5),
        (windowHeight*0.80)+(sin(count)*windowHeight*0.02),
        (wipeCount/wipeNum)*cirSize,
        (wipeCount/wipeNum)*cirSize);
    wipeCount++;
}

//Draws catagory titles
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

//Draws mouse axis
function axisDraw() {
  stroke(col1);
  fill(col2);
  if (mPressed) {
    line(winMouseX,0,winMouseX,windowHeight);
    line(0,winMouseY,windowWidth,winMouseY);
    stroke(0);
    strokeWeight(2);
    line(winMouseX,0,winMouseX,windowHeight);
    line(0,winMouseY,windowWidth,winMouseY);
    ellipse(winMouseX,winMouseY,15,15);
    fill(0);
    ellipse(winMouseX,winMouseY,5,5);
  }
}

//Displays image arrays with mouse input
function drawFrame() {
  let imgSize =  rectHeight-40;
  currImgX = int((winMouseX/windowWidth)*currImgArray.length);
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
          0,0,currImgArray[currImgX + 2].width,currImgArray[currImgX + 2].width);
    fill(100,0.6);
    rect(rectX+100, rectY+30, imgSize, imgSize);
  }
  if (currImgX < currImgArray.length - 1) {
    image(currImgArray[currImgX + 1],rectX+60, rectY+25, imgSize, imgSize,
          0,0,currImgArray[currImgX + 1].width,currImgArray[currImgX + 1].width);
    fill(100,0.3);
    rect(rectX+60, rectY+25, imgSize, imgSize);
  }
  }
  image(currImgArray[currImgX],rectX+20, rectY+20, imgSize, imgSize,
          0,0,currImgArray[currImgX].width,currImgArray[currImgX].width);
  fill(0,0);
  stroke(0);
  strokeWeight(6);
  rect(rectX+20, rectY+20, imgSize, imgSize);
}

//Toggles sound
function mute(){
  clk4SndWasSeen = true;
  currSong.stop();
  if (isMuted) {
    shhButton.style('color', col3);
  }
  isMuted = !isMuted;
  songPlaying = false;
}

//Line animation
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

//Iterates through job titles on CONTACT page
function lookingFor(){
  textAlign(LEFT);
  textSize(rectHeight*0.08);
  fill(0);
  noStroke();
  if (isMobile) {
    text("I am . . .",rect2X+(rect2Width*0.025),rect2Y+(rect2Height*0.19));
  } else {
    text("I am . . . .",rectX+(rectWidth*0.530),rectY+(rectHeight*0.955));
  }
  fill(col3);
  stroke(0);
  strokeWeight(3);
  textSize(rectHeight*0.07);
  if (isMobile){
    text(titleArray[titleNum]+",",rect2X+(rect2Width*0.025),rect2Y+(rect2Height*0.22),rect2Width*0.38,rect2Height*0.81);
  } else {
    textAlign(RIGHT);
    text(titleArray[titleNum]+",",rectX+(rectWidth*0.5),rectY+(rectHeight*0.88),rectWidth*0.485,rectHeight);
  }
}

//Increments job title array
function titleNumInc() {
    titleNum = (titleNum + 1) % titleArray.length;
 }

//Plays page instrument on mouse click, updates sound and visuals
function sing() {
   if (mouseIsPressed && !isHovering && !onTB && !onTB2 && (millis()>200) && !isMuted) {
     fill(color(colorPhase,100*(winMouseY/windowHeight),100*(winMouseX/windowWidth)));
     strokeWeight(3);
     stroke(0,((winMouseX/windowWidth)*100),100-(100*(winMouseX/windowWidth)));
     ellipse(winMouseX+(random(-20,20)*(winMouseX/windowWidth)),winMouseY+(random(-20,20)*(winMouseX/windowWidth)),windowWidth*0.1+(windowHeight*0.3*(winMouseY/windowHeight)),windowWidth*0.1+(windowHeight*0.3*(winMouseY/windowHeight)));
     // fill(0);
     // textSize(windowHeight*0.035)
     // strokeWeight(2);
     // textAlign(CENTER);
     //text(int(freq1)+' Hz',winMouseX+random(40*(winMouseX/windowWidth))-20,winMouseY+random(40*(winMouseX/windowWidth))-20);
     osc1.amp(.15);
     osc2.amp(.1*(winMouseY/windowHeight));
     osc3.amp(.1*(winMouseY/windowHeight));
     osc4.amp(.15*(winMouseY/windowHeight));
     // textAlign(RIGHT);
   }
   else {
     osc1.amp(0);
     osc2.amp(0);
     osc3.amp(0);
     osc4.amp(0);
   }
 }

//Draws image indication element
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
      fft.analyze();
      octBands = fft.getOctaveBands();
      freqDomain = fft.logAverages(octBands);
      translate( windowWidth*0.53+(i*span/arraySize)+(((winMouseX/windowWidth)*-2*squareStart)+squareStart)
                -2*squareStart+((winMouseX/windowWidth)*4*squareStart)+((sqPadding*i)/arraySize),
                rectY+rectHeight-windowWidth*0.053-2);
      shearX(((winMouseX/windowWidth)*2*PI/9)-(PI/9));
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

//Checks current aspect ratio of window
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

//Checks if mouse is over base rectangle
function touchRectCheck() {
  if (winMouseX >= rectX && winMouseX < rectX + rectWidth) {
    if (winMouseY >= rectY && winMouseY < rectY + rectHeight){
      onTB = true;
      axisDraw();
    } else {
      onTB = false;
    }
  } else {
    onTB = false;
  }
}

//Updates size and position of elements for landscape aspect ratio
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

  playButton.size(rectWidth*0.25,windowHeight*0.095);
  playButton.position(rectX + 0.1*rectWidth,rectY+rectHeight*0.83);
  playButton.style('font-size',windowHeight*0.035 + 'px');

  vansButton.size(rectWidth*0.25,windowHeight*0.095);
  vansButton.position(rectX + 0.7*rectWidth,rectY+rectHeight*0.53);
  vansButton.style('font-size',windowHeight*0.035 + 'px');

  shhButton.size(windowWidth*0.2,windowHeight*0.05);
  shhButton.style('font-size',windowWidth*0.014 + 'px');
  shhButton.style('transform', 'skewX(0deg)');

  artButton.style('font-size',windowWidth*0.02 + 'px');
  musicButton.style('font-size',windowWidth*0.02 + 'px');
  projButton.style('font-size',windowWidth*0.02 + 'px');
  contButton.style('font-size',windowWidth*0.018 + 'px');


}

//Creates circular animated "SAY HOWDY" on CONTACT page
function sayHowdy() {
  let howdyArray = split("SAY*HOWDY*", '');
  let centerX = rectX+rectWidth*0.78;
  let centerY = rectY+rectHeight*0.65;
  let radius = windowHeight * 0.1;
  for (var i = 0; i < howdyArray.length; i++) {
    stroke(0);
    fill((180*sin(count+((2*PI)*(i/howdyArray.length)))+colorPhase)%360,70,100,0.4 +0.6*sin(count+((2*PI)*(i/howdyArray.length))));
    text(howdyArray[i], centerX - cos(count+((2*PI)*(i/howdyArray.length)))*3.4*radius,
        centerY + sin(count+((2*PI)*(i/howdyArray.length)))*radius*0.7);
  }
//  textAlign(CENTER);
  //text("^^^ ^^^",centerX,centerY+sin(count)*radius/3)
}

//Sound reccomendation
function clk4Snd() {
  if (!clk4SndWasSeen){
    fill(col2);
    stroke(0);
    strokeWeight(3);
    textSize(14);
    text("SOUND (RECOMMENDED) >>>",windowWidth*0.3+sin(count)*windowWidth*0.05,windowHeight*0.98);
  }
}

//"THE DRIP" animation on MUSIC page
function drip() {
  let dripArray = split("THE//DRIP", '');
  let startX = rectX+rectWidth*0.05;
  let centerY = rectY+rectHeight*0.2;
  stroke(0);
  strokeWeight(4);
  for (var i = 0; i < dripArray.length; i++) {
    fill((360*(i/dripArray.length)+ colorPhase*2.5)%360,70,100);
    textSize(windowWidth*(30/1536));
    text(dripArray[i], startX + (i/dripArray.length)*rectWidth*0.4,
        centerY + sin(count+((2*PI)*(i/dripArray.length)))*rectHeight*0.1);
    for (var j = 7; j >= 0 ; j--) {
      fill((360*(i/dripArray.length)+ colorPhase)%360,70,100,1-j/7);
      stroke(0,1-j/7);
      textSize(windowWidth*(30/1536)-(j/7)*10);
      text(dripArray[i], startX + (i/dripArray.length)*rectWidth*0.4,
          centerY + sin(count+((2*PI)*(i/dripArray.length)))*rectHeight*0.1 + (j*rectHeight*0.05));
    }
  }
  fill(0);
  noStroke();
}

/*BUTTON FUNCTIONS */
//Menu button transistions
function artTrans(){
  if (!artIsSelected){
    mobCatFadeInc = 100;
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
    mobCatFadeInc = 100;
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
    mobCatFadeInc = 100;
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
    mobCatFadeInc = 100;
    canDrawFrame = true;
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
    canDrawFrame = false;
  }
}

//Option button transitions
function op1Select() {
  if (isMobile){
    mobCatFadeInc = 100;
  }
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 1;
  } else if (projIsSelected){
    projOp = 1;
  }
}

function op2Select() {
  if (isMobile){
    mobCatFadeInc = 100;
  }
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 2;
  } else if (projIsSelected){
    projOp = 2;
  }
}

function op3Select() {
  if (isMobile){
    mobCatFadeInc = 100;
  }
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 3;
  } else if (projIsSelected){
    projOp = 3;
  }
}

function op4Select() {
  if (isMobile){
    mobCatFadeInc = 100;
  }
  mobileCatagoryDraw();
  if(artIsSelected){
    artOp = 4;
  } else if (projIsSelected){
    projOp = 4;
  }
}

//Option button display functions
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

//Updates button styling for window resize
function buttonUpdate() {
  if (artIsSelected) {
    currOp = artOp;
  } else if (projIsSelected){
    currOp = projOp;
  }

  if (musicIsSelected) {
    playButton.show();
  }
  else {
    playButton.hide();
  }

  if (projIsSelected && projOp == 2) {
    vansButton.show();
  }
  else {
    vansButton.hide();
  }

  if (isMobile) {
    op1Button.style('transform', 'skewX(200deg)');
    op2Button.style('transform', 'skewX(200deg)');
    op3Button.style('transform', 'skewX(200deg)');
    op4Button.style('transform', 'skewX(200deg)');
  } else {
    op1Button.style('transform', 'skewX('+(200-(40*(winMouseX/windowWidth)))+'deg)');
    op2Button.style('transform', 'skewX('+(200-(40*(winMouseX/windowWidth)))+'deg)');
    op3Button.style('transform', 'skewX('+(200-(40*(winMouseX/windowWidth)))+'deg)');
    op4Button.style('transform', 'skewX('+(200-(40*(winMouseX/windowWidth)))+'deg)');
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
    shhButton.position((windowWidth-shhButton.width)*0.5,windowHeight-shhButton.height+2);
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

//Play button logic
function playButtonPress() {
  if (!songPlaying) {
    if (isMuted){
      mute();
    }
    playSong();
  } else {
    currSong.pause();
    playButton.style('color','#FF0000');
    playButton.style('border-color','#FF0000');
    songPlaying = false;
  }
}

//Opens new tab to Vans video link
function vansButtonPress() {
  window.open('https://www.youtube.com/watch?v=Mi1jzYIzVt4');
}


/*MOBILE FUNCTIONS */

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
  textAlign(CENTER);
  textSize(windowHeight*0.02);
  for (var j = 1; j < splitTitle.length+1; j++) {
    text(splitTitle[j-1],windowWidth*0.15,(windowHeight*0.05)+(j/splitTitle.length)*((mark3)-(mark3/splitName.length))*0.66);
  }
  sweepLineDrawMobile(windowWidth*0.2,0,windowWidth*0.2,mark3*0.7);
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

  playButton.size(rectWidth*0.55,windowHeight*0.075);
  playButton.position(rectX + 0.2525*rectWidth,rectY+rectHeight*0.7);
  playButton.style('font-size',windowHeight*0.035 + 'px');

  vansButton.size(rect2Width*0.7,windowHeight*0.075);
  vansButton.position(rect2X + 0.15*rect2Width,rect2Y+rect2Height*0.53);
  vansButton.style('font-size',windowHeight*0.025 + 'px');

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

function dripMobile() {
  let dripArray = split("THE//DRIP", '');
  let startX = rectX+rectWidth*0.068;
  let centerY = rectY+rectHeight*0.2;
  stroke(0);
  for (var i = 0; i < dripArray.length; i++) {
    fill((360*(i/dripArray.length)+ colorPhase*2.5)%360,70,100);
    textSize(windowWidth*(50/1536));
    text(dripArray[i], startX + (i/dripArray.length)*rectWidth*0.98,
        centerY + sin(count+((2*PI)*(i/dripArray.length)))*rectHeight*0.1);
    for (var j = 7; j >= 0 ; j--) {
      fill((360*(i/dripArray.length)+ colorPhase)%360,70,100,1-j/7);
      stroke(0,1-j/7);
      textSize(windowWidth*(50/1536)-(j/7)*10);
      text(dripArray[i], startX + (i/dripArray.length)*rectWidth*0.98,
          centerY + sin(count+((2*PI)*(i/dripArray.length)))*rectHeight*0.1 + (j*rectHeight*0.05));
    }
  }
  fill(0);
  noStroke();
}

function mobileCatFade() {
  if (mobCatFadeInc > 0) {
    mobCatFadeInc= mobCatFadeInc-3;
  } else {
    mobCatFadeInc = 0;
  }
}

function clk4SndMobile() {
  if (!clk4SndWasSeen){
    fill(col2);
    stroke(0);
    strokeWeight(3);
    textSize(14);
    text("SOUND >>>",windowWidth*0.4+sin(count)*windowWidth*0.05,windowHeight*0.025);
    text("(RECOMMENDED)",windowWidth*0.4+windowWidth*0.014,windowHeight*0.048);
  }
}

function sayHowdyMobile() {
  let howdyArray = split("SAY HOWDY^^^", '');
  let startX = rect2X+rect2Width*0.15;
  let centerY = rect2Y+rect2Height*0.8;
  for (var i = 0; i < howdyArray.length; i++) {
    stroke(360*(i/howdyArray.length),70,100);
    text(howdyArray[i], startX + (i/howdyArray.length)*rect2Width*0.9,
        centerY + sin(count+((2*PI)*(i/howdyArray.length)))*rect2Height*0.1);
  }
}

function mobileCatagoryDraw() {
    if (isMobile) {
    let textEdge = rectX+(rectWidth*0.5);
    fill(color((colorPhase+240)%360,100,100,mobCatFadeInc*0.01));
    textSize(windowWidth*0.065);
    textAlign(CENTER);
    stroke(0,mobCatFadeInc*0.01);
    strokeWeight(5);
    if (artIsSelected){
      text(artCatArray[artOp-1],textEdge,rectY+rectY*0.6);
    } else if (musicIsSelected) {
      text("HEXER QUIZ",textEdge,rectY+rectY*0.5);
    } else if (projIsSelected){
      text(projCatArray[projOp-1],textEdge,rectY+rectY*0.5);
    } else if (contIsSelected){
      text("LET'S TALK",textEdge,rectY+rectY*0.5);
    }
  }
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

function drawPicIndicationMobile(arraySize) {
  let span = windowHeight*0.28;
  let freqDomain = [];
  let octBands = [];
  let sqPadding = 4;
  let squareStart = (windowHeight*0.02/(2*tan((7*PI/18))));
  noStroke();
  for (var i = 0; i < arraySize; i++) {
    push();
    fft.analyze();
    octBands = fft.getOctaveBands();
    freqDomain = fft.logAverages(octBands);
    translate(windowWidth*0.98,windowHeight*0.96+(-i*span/arraySize)-(((winMouseY/windowHeight)*-2*squareStart)+squareStart)
              -2*squareStart-((winMouseY/windowHeight)*4*squareStart)-((sqPadding*i)/arraySize));
    shearY(((winMouseY/windowHeight)*2*PI/9)-(PI/9));
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

function touchRect2Check() {
  if (winMouseX >= rect2X && winMouseX < rect2X + rect2Width) {
    if (winMouseY >= rect2Y && winMouseY < rect2Y + rect2Height){
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
  currImgY = int(currImgArray.length-((winMouseY/windowHeight)*currImgArray.length));
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
          0,0,currImgArray[currImgY + 2].width,currImgArray[currImgY + 2].width);
    fill(100,0.6);
    rect(rectX+100, rectY+30, imgSize, imgSize);
  }
  if (currImgY < currImgArray.length - 1) {
    image(currImgArray[currImgY + 1],rectX+60, rectY+25, imgSize, imgSize,
          0,0,currImgArray[currImgY + 1].width,currImgArray[currImgY + 1].width);
    fill(100,0.3);
    rect(rectX+60, rectY+25, imgSize, imgSize);
  }
  }
  image(currImgArray[currImgY],rectX+20, rectY+20, imgSize, imgSize,
          0,0,currImgArray[currImgY].width,currImgArray[currImgY].width);
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
       text(artString1,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rect2Width*0.06,rect2Height);
     } else if (artOp == 2) {
       currImgArray = artImgArray2;
       text(artString2,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rect2Width*0.06,rect2Height);
     } else if (artOp == 3) {
       currImgArray = artImgArray3;
       text(artString3,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rect2Width*0.06,rect2Height);
     } else if (artOp == 4) {
       currImgArray = artImgArray4;
       text(artString4,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
            rect2Width-rect2Width*0.06,rect2Height);
     }
  }  else if (musicIsSelected) {
      canDrawFrame = false;
      dripMobile();
      fill(0);
      strokeWeight(1);
      textSize(windowWidth*(50/1536));
      stroke(100);
      textAlign(RIGHT);
      text(musicString,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
           rect2Width-rect2Width*0.06,rect2Height);
  }  else if (projIsSelected) {
       showOptions();
       canDrawFrame = true;
       textAlign(RIGHT);
       if (projOp == 1) {
          currImgArray= projImgArray;
          text(projString1,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
               rect2Width-rect2Width*0.06,rect2Height);
       } else if (projOp == 2) {
         currImgArray= projImgArray2;
         text(projString2,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rect2Width*0.06,rect2Height);
       } else if (projOp == 3) {
         currImgArray= projImgArray3;
         text(projString3,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rect2Width*0.06,rect2Height);
       } else if (projOp == 4) {
         currImgArray= projImgArray4;
         text(projString4,rect2X + rect2Width*0.03,rect2Y+rect2Height*0.05,
              rect2Width-rect2Width*0.06,rect2Height);
       }
  }  else if (contIsSelected) {
      canDrawFrame = true;
      currImgArray = contImgArray;
      sayHowdyMobile();
      lookingFor();
      fill(0);
      strokeWeight(1);
      textSize(windowWidth*(60/1536));
      stroke(100);
      for (var i = 0; i < 4; i++){
        textAlign(LEFT);
        text(contStrings[i],rect2X + rect2Width*0.4,rect2Y+rect2Height*0.05+(((i%4)/4)*rect2Height/2),
          rect2Width*0.7,rect2Height*0.5);
        textAlign(RIGHT);
        text(contStrings[i+4],rect2X+rect2Width*0.5,rect2Y+rect2Height*0.05+(((i%4)/4)*rect2Height/2),
         rect2Width*0.5,rect2Height*0.5);
      }

  }
}
