var sounds =[];
var rows = 2;
var singleH;
var singleW;
var padding;
var trim;
var myFont;

function preload(){
  // put preload code here
  sounds.push({name: "Story 1", sound: loadSound('assets/Piazza di San Marco 7.ogg')});
  sounds.push({name: "Story 2", sound: loadSound('assets/Piazza di San Marco 8.ogg')});
  sounds.push({name: "Story 3", sound: loadSound('assets/Piazza di San Marco 9.ogg')});
  sounds.push({name: "Story 4", sound: loadSound('assets/Via San Zanobi.ogg')});

  myFont = loadFont("assets/Roboto/Roboto-Regular.ttf");
}

function setup() {
  // put setup code here
  createCanvas(window.innerWidth,window.innerHeight);

  singleW = (width)/(rows+1);
  padding = singleW/2;
  singleH = (height-2*padding)/(sounds.length/(rows));
  trim = 10;

  textAlign(CENTER,CENTER);
  textFont(myFont);
  textSize(32);
}

function draw() {
  // put drawing code here


  background(37,64,143);
  text("Click on a Button To Listen To a Story",padding,10,width-(2*padding),padding);


  for ( var i = 0 ; i < rows ; i++ ) {
    for ( var j = 0 ; j < (sounds.length/rows) ; j++ ) {
      // button color
      if ( sounds[(i+j*rows)].sound.isPlaying() ) {
        fill(213,74,118); // pink
        stroke(255,255,255);
      } else {
        fill(255,255,255,40); // yellow
        stroke(255,255,255);
      }
      // button
      rect(padding+trim+(i*singleW),padding+trim+(j*singleH),singleW-(trim*2),singleH-(trim*2));
      // lable
      fill(255,242,0)
      text(sounds[(i+j*rows)].name,padding+trim+(i*singleW),padding+trim+(j*singleH),singleW-(trim*2),singleH-(trim*2));
    }
  }

}

function mousePressed() {

  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  var x = floor((mouseX-padding)/(singleW));
  var y = floor((mouseY-padding)/(singleH));
  console.log(sounds[x+y*rows].name + " playing");
  for( var k = 0 ; k < sounds.length ; k++) {
    sounds[k].sound.stop();
  }

  if ( sounds[(x+y*rows)].sound.isPlaying() ) {
    sounds[x+y*rows].sound.stop();
  } else {
    sounds[x+y*rows].sound.play();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  singleW = (width)/(rows+1);
  padding = singleW/2;
  singleH = (height-2*padding)/(sounds.length/(rows));
  trim = 10;
}
