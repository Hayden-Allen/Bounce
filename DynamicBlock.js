class DynamicBlock extends Block {
  constructor(x, y, w, h, color, properties){
    super(x, y, w, h, color, properties);
    if(!this.property("vx"))
      this.properties.vx = 0;
    if(!this.property("vy"))
      this.properties.vy = 0;
    if(!this.property("mass"))
      this.properties.mass = 100;
    //v^2 = totalfsum/(.5cpa)

    this.forces = [];
    this.fxsum = 0;
    this.fysum = 0;
    this.properties.vt = Math.sqrt(this.totalForce() / (.5 * 1.1 * 1.225 * (this.w / Global.pixelsPerMeter) ** 2));
  }
  addForce(f){
    this.forces.push(f);
    this.fxsum += f.x();
    this.fysum += f.y();
    this.properties.vt = Math.sqrt(this.totalForce() / (.5 * 1.1 * 1.225 * (this.w / Global.pixelsPerMeter) ** 2));
  }
  totalForce(){
    return Math.sqrt(this.fxsum ** 2 + this.fysum ** 2);
  }
  addVx(x){
    this.properties.vx += x;
    if(Math.sqrt(this.property("vx") ** 2 + this.property("vy") ** 2) > this.property("vt"))
      this.properties.vx = Math.sign(this.property("vx")) * Math.sqrt(this.property("vt") ** 2 - this.property("vy") ** 2);
  }
  addVy(y){
    this.properties.vy += y;
    if(Math.sqrt(this.property("vx") ** 2 + this.property("vy") ** 2) > this.property("vt"))
      this.properties.vy = Math.sign(this.property("vy")) * Math.sqrt(this.property("vt") ** 2 - this.property("vx") ** 2);
  }
  applyForce(f){
    this.addVx(f.x() / this.property("mass"));
    this.addVy(f.y() / this.property("mass"));
  }
  applyImpulse(f){  //applies impulse of average force f for Global.idealFrameTime
    this.applyForce(new Force(f.n * Global.idealFrameTime, f.theta));
  }
  update(p){
    let self = this;
    this.forces.forEach(function(f){
      self.applyImpulse(f);
    });

    this.x += this.property("vx");
    this.y += this.property("vy");

    if(p)
      super.update(p);
  }
}
