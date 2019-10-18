class DynamicBlock extends Block {
  constructor(x, y, w, h, color, properties){
    super(x, y, w, h, color, properties);
    if(!this.property("vx"))  //x velocity
      this.properties.vx = 0;
    if(!this.property("vy"))  //y velocity
      this.properties.vy = 0;
    if(!this.property("mass"))
      this.properties.mass = 100;

    this.forces = []; //list of all forces acting on this Block
    this.fxsum = 0; //total x component of all forces
    this.fysum = 0; //total y component of all forces
  }
  addForce(f){
    this.forces.push(f);  //add to list
    this.fxsum += f.x();  //add components
    this.fysum += f.y();
  }
  totalForce(){ //Pythagorean theorem
    return Math.sqrt(this.fxsum ** 2 + this.fysum ** 2);
  }
  addVx(x){
    this.properties.vx += x;
  }
  addVy(y){
    this.properties.vy += y;
  }
  applyForce(f){  //F = ma, a = F/m
    this.addVx(f.x() / this.property("mass"));
    this.addVy(f.y() / this.property("mass"));
  }
  applyImpulse(f){  //applies impulse of average force f for Global.idealFrameTime
    this.applyForce(new Force(f.n * Global.idealFrameTime, f.theta));
  }
  updateVelocity(){
    let self = this;
    this.forces.forEach(function(f){
      self.applyImpulse(f);
    });

    this.x += this.property("vx");
    this.y += this.property("vy");
  }
}
