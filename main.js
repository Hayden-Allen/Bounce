let Global = {
  c: document.getElementById("c"),  //canvas
  ctx: this.c.getContext("2d"), //canvas context
  g: 9.8, //acceleration due to gravity (m/s^2)
  currentScene: null,
  pixelsPerMeter: c.height,  //pixels/m
  fps: 60,  //frames per second (1/s)
  idealFrameTime: 1 / 60, //s,
  keys: new BitSet(0),  //input handline

  Key: {  //indices for keys
    w: 4,
    a: 3,
    s: 2,
    d: 1,
    space: 0
  },
  Time: { //all in milliseconds
    start: performance.now(),
    last: 0,  //last update
    now: 0,   //current time (for use in updateTime)
    delta: 0  //time since last frame start
  },

  t: function(x){ //convert seconds to frames
    return x * Global.idealFrameTime;
  },
  d: function(x){ //convert meters to pixels
    return x * Global.pixelsPerMeter;
  },
  v: function(x){ //convert meters/second to pixels/frame
    return x * Global.idealFrameTime * Global.pixelsPerMeter;
  },
  updateTime: function(){
    Global.Time.now = performance.now();
    Global.Time.delta = Global.Time.now - Global.Time.last;
    Global.Time.last = Global.Time.now;
  },
  clamp: function(x, min, max){ //clamps x to [min, max]
    return Math.min(max, Math.max(x, min));
  },
  rect: function(x, y, w, h, color){  //draw and fill a rect with color
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  },
  render: function(cam, scene){ //update camera, draw everything relative to it
    if(cam)
      cam.update();
    scene.update(cam);
  }
}

Global.currentScene = new Scene();

let block = new Block(0, 0, 600, 100, "#00ff00", {dampening: .1, cfk: .5}); //top block. Coefficient of kinetic friction is .5
let block2 = new Block(0, 500, 600, 100, "#0000ff", {dampening: .1, cfk: .5});  //bottom block. "
let block3 = new Block(0, 0, 10, 600, "#ffff00", {dampening: .25}); //left block
let block4 = new Block(590, 0, 10, 600, "#00ffff", {dampening: .25}); //right block

let p2 = new DynamicBlock(300, 300, 50, 50, "#ff0000", {rigid: true, vx: 10, mass: 50});  //red block
p2.addForce(new Force(Global.v(Global.g) * p2.property("mass"), Math.PI * 3 / 2));  //force of gravity

let cam = new Camera(p2); //camera to follow p2

function update(){
  Global.ctx.clearRect(0, 0, c.width, c.height);  //clear screen
  Global.updateTime();

  if(Global.keys.at(Global.Key.space) &&
    Math.abs(p2.property("vy")) < 75)  //prevents clipping through ceiling
    p2.applyForce(new Force(500, Math.PI / 2)); //accelerate upwards

  Global.render(cam, Global.currentScene);  //update Scene and draw frame

  setTimeout(update, 1000 / Global.fps);  //wait
}
update();

//input handline
window.onkeydown = function(e){
  let prevent = true;
  switch(e.keyCode){
  case 87: Global.keys.set(Global.Key.w); break;
  case 65: Global.keys.set(Global.Key.a); break;
  case 83: Global.keys.set(Global.Key.s); break;
  case 68: Global.keys.set(Global.Key.a); break;
  case 32: Global.keys.set(Global.Key.space); break;
  default: prevent = false;
  }
  if(prevent)
    e.preventDefault();
}
window.onkeyup = function(e){
  let prevent = true;
  switch(e.keyCode){
  case 87: Global.keys.reset(Global.Key.w); break;
  case 65: Global.keys.reset(Global.Key.a); break;
  case 83: Global.keys.reset(Global.Key.s); break;
  case 68: Global.keys.reset(Global.Key.a); break;
  case 32: Global.keys.reset(Global.Key.space); break;
  default: prevent = false;
  }
  if(prevent)
    e.preventDefault();
}
