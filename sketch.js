let vid;
let cam;
let pg;
let px = 4;
let hsb = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo("waves_express.mp4");
  // vid = createVideo("https://imgur.com/YJfuwv6");
  vid.loop();
  vid.hide();
  noStroke();
  
  cam = createCapture(VIDEO);
  cam.hide();
  noStroke();
  colorMode(RGB, 255);
}
function draw() {
  background(46, 49, 179);
  // drawGradient();
  vid.loadPixels();
  cam.loadPixels();
  translate(((width-vid.width)/2),((height-vid.height)/2));
  
  // code inspired by allison parrish https://creative-coding.decontextualize.com/video/
  for (let y = 0; y < vid.height; y += px) {
    for (let x = 0; x < vid.width; x += px) {
      let offset = ((y*vid.width)+x)*4;
      if (random() > 0.4) {
        fill(vid.pixels[offset],
          vid.pixels[offset+1],
          vid.pixels[offset+2]);
        rect(x, y, px, px); 
      } else {
        fill(cam.pixels[offset],
            cam.pixels[offset+1],
            cam.pixels[offset+2], 200);
        rect(x,y,px,px);
      }
    }
  }
}

function isCanvasCenter(x,y) {
  let vy = (height-vid.height)/2;
  let vx = (width-vid.width)/2;
  fill('red')
  rect(vy,vx,25,25);
  return (y > vy && y <= vy+vid.height) &&
    (x > vx && x <= vx+vid.width);
}

function keyPressed() {
  if (hsb) {
    colorMode(HSB, 255);
    hsb = false;
  }
  else {
    colorMode(RGB, 255);
    hsb = true;
  }
}
