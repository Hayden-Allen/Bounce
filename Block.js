class Block extends Rect {
  constructor(x, y, w, h, color, properties){
    super(x, y, w, h, color); //create visual representation of object
    this.properties = properties; //object containing various optional values
    //for energy calculations
    this.properties.dampening = this.property("dampening") === undefined ? 1 : Global.clamp(Math.abs(this.property("dampening")), 0, 1);
    //coefficient of kinetic friction
    this.properties.cfk = this.property("cfk") === undefined ? 1 : Math.max(Math.abs(this.property("cfk")), 0);
    //whether or not this Block interacts with other Blocks
    this.properties.rigid = this.property("rigid") === undefined ? true : this.property("rigid");
    Global.currentScene.add(this);  //add to Scene for automatic rendering/update
  }
  property(key){  //returns the value in the properties object with the given name
    if(!this.properties)
      return undefined;
    return this.properties[key];
  }
  update(p){
    let distances = [
			Math.abs(this.y - (p.y + p.h)),  //distance between bottom of p and top of this
			Math.abs(this.x - (p.x + p.w)),  //distance between right of p and left of this
			Math.abs(p.y - (this.y + this.h)), //distance between top of p and bottom of this
			Math.abs(p.x - (this.x + this.w))  //distance between left of p and right of this
		];
    let min = 0;
    //determine index of minimum distanc
    //this is a prediction of the direction from which a collision is most likely
		for(var i = 1; i < distances.length; i++)
			min = (distances[min] > distances[i] ? i : min);

    let dampening = this.property("dampening");
    let cfk = this.property("cfk");

    let prop = p.properties;
		if(p.x + p.w > this.x && p.x < this.x + this.w){  //if right of p is past left of this AND left of p is not past right of this
      let collision = false;  //flag to determine whether or not this Block should apply a force to p
      //if minimum distance is between bottom of p and top of this AND bottom of p is past top of this
      if(min === 0 && p.y + p.h > this.y){  //if p is moving down through this
        p.y = this.y - p.h; //set y position so that it's just touching top

        //.5 * m * vf^2 = (1 - dampening) * (.5 * m * v0^2) = .5 * m * (1 - dampening) * v0^2
        //vf = sqrt((1 - dampening) * v0^2) = sqrt(1 - dampening) * v0
        //multiply by -1 to reverse direction
        prop.vy = -Math.sqrt(1 - dampening) * prop.vy;
        collision = true;
      }
			else if(min === 2 && p.y < this.y + this.h){ //if p is moving up through this
				p.y = this.y + this.h;  //set y position so that it's just touching bottom
        prop.vy = -Math.sqrt(1 - dampening) * prop.vy;
        collision = true;
      }
      if(collision){
        if(prop.vx > 0) //to the right
          p.applyImpulse(new Force(cfk * p.fysum / prop.mass, Math.PI));  //to the left
        else if(prop.vx < 0)  //to the left
          p.applyImpulse(new Force(cfk * p.fysum / prop.mass, 0));  //to the right
      }
		}
		if(p.y + p.h > this.y && p.y < this.y + this.h){  //if bottom of p is past top of this AND top of p is not past bottom of this
      let collision = false;
			if(min === 1 && p.x + p.w > this.x){ //if p is moving left through this
				p.x = this.x - p.w; //set x position so that it's just touching left
        prop.vx = -Math.sqrt(1 - dampening) * prop.vx;
        collision = true;
      }
			else if(min === 3 && p.x < this.x + this.w){ //if p is moving right though this
				p.x = this.x + this.w;  //set x position so that it's just touching right
        prop.vx = -Math.sqrt(1 - dampening) * prop.vx;
        collision = true;
      }
      if(collision)
        if(prop.vy > 0) //down
          p.applyImpulse(new Force(cfk * p.fxsum / prop.mass, Math.PI / 2));  //up
        else if(prop.vy < 0)  //up
          p.applyImpulse(new Force(cfk * p.fxsum / prop.mass, Math.PI * 3 / 2));  //down
		}
  }
}
