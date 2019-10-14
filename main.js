var c = document.getElementById("c");
var ctx = c.getContext("2d");

let Global = {
  g: 9.8, //m/s^2
  currentScene: null,
  pixelsPerMeter: c.height,  //p/m
  fps: 60,  //s^-1
  idealFrameTime: 1 / 60, //s,
  keys: new BitSet(0),

  Key: {
    w: 4,
    a: 3,
    s: 2,
    d: 1,
    space: 0
  },
  Time: {
    start: performance.now(),
    last: 0,
    now: 0,
    delta: 0
  },

  t: function(x){
    return x * Global.idealFrameTime;
  },
  d: function(x){
    return x * Global.pixelsPerMeter;
  },
  v: function(x){
    return x * Global.idealFrameTime * Global.pixelsPerMeter;
  },
  updateTime: function(){
    Global.Time.now = performance.now();
    Global.Time.delta = Global.Time.now - Global.Time.last;
    Global.Time.last = Global.Time.now;
  },
  clamp: function(x, min, max){
    return Math.min(max, Math.max(x, min));
  },
  rect: function(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  },
  render: function(cam, scene){
    cam.update();
    scene.update(cam);
  }
}

Global.currentScene = new Scene();

let block = new Block(0, 0, 600, 100, "#00ff00", {dampening: .1, cfk: .25});
let block2 = new Block(0, 500, 600, 100, "#0000ff", {dampening: .1, cfk: .25});
let block3 = new Block(0, 0, 10, 600, "#ffff00", {dampening: .25});
let block4 = new Block(590, 0, 10, 600, "#00ffff", {dampening: .25});

let p2 = new DynamicBlock(300, 300, 50, 50, "#ff0000", {vx: 10, mass: 50});
p2.addForce(new Force(Global.v(Global.g) * p2.property("mass"), Math.PI * 3 / 2));
console.log(p2.property("vt"));

function update(){
  ctx.clearRect(0, 0, c.width, c.height);
  Global.updateTime();

  p2.draw(0, 0);
  //p2.applyImpulse(new Force(-Global.v(Global.g) * p2.property("mass"), Math.PI * 3 / 2));
  p2.update(null);

  //console.log(p2.property("vx"));

  block.draw(0, 0);
  block.update(p2);
  block2.draw(0, 0);
  block2.update(p2);
  block3.draw(0, 0);
  block3.update(p2);
  block4.draw(0, 0);
  block4.update(p2);

  setTimeout(update, 1000 / 60);
}
update();

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
