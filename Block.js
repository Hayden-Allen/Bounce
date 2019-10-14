class Block extends Rect {
  constructor(x, y, w, h, color, properties){ //dampening, cfk
    super(x, y, w, h, color);
    this.properties = properties;
    this.properties.dampening = this.property("dampening") === undefined ? 1 : Global.clamp(Math.abs(this.property("dampening")), 0, 1);

    this.properties.cfk = this.property("cfk") === undefined ? 1 : Math.max(Math.abs(this.property("cfk")), 0);
    this.properties.rigid = this.property("rigid") === undefined ? true : this.property("rigid");
  }
  property(key){
    if(!this.properties)
      return undefined;
    return this.properties[key];
  }
  update(p){
    let distances = [
			Math.abs(this.y - (p.y + p.h)),
			Math.abs(this.x - (p.x + p.w)),
			Math.abs(p.y - (this.y + this.h)),
			Math.abs(p.x - (this.x + this.w))
		];
    let min = 0;
		for(var i = 1; i < distances.length; i++)
			min = (distances[min] > distances[i] ? i : min);

    let dampening = this.property("dampening");
    let cfk = this.property("cfk");

    let prop = p.properties;
		if(p.x + p.w > this.x && p.x < this.x + this.w){
      let collision = false;
			if(min === 0 && p.y + p.h > this.y){
        p.y = this.y - p.h;
        prop.vy = -Math.sqrt((1 - dampening) * ((prop.vy * prop.vy) - 2 * Global.v(p.fysum / prop.mass) * (p.y + p.h - this.y)));
        collision = true;
      }
			else if(min === 2 && p.y < this.y + this.h){
				p.y = this.y + this.h;
        prop.vy = Math.sqrt((1 - dampening) * ((prop.vy * prop.vy) - 2 * Global.v(p.fysum / prop.mass) * (this.y + this.h - p.y)));
        collision = true;
      }
      if(collision){
        if(prop.vx > 0)
          p.applyImpulse(new Force(cfk * p.fysum / prop.mass, min === 0 ? Math.PI : 0));
        else if(prop.vx < 0)
          p.applyImpulse(new Force(cfk * p.fysum / prop.mass, min === 0 ? 0 : Math.PI));
      }
		}
		if(p.y + p.h > this.y && p.y < this.y + this.h){
      let collision = false;
			if(min === 1 && p.x + p.w > this.x){
				p.x = this.x - p.w;
        prop.vx = -Math.sqrt((1 - dampening) * ((prop.vx * prop.vx) - 2 * Global.v(p.fxsum / prop.mass) * (p.x + p.w - this.x)));
        collision = true;
      }
			else if(min === 3 && p.x < this.x + this.w){
				p.x = this.x + this.w;
        prop.vx = Math.sqrt((1 - dampening) * ((prop.vx * prop.vx) - 2 * Global.v(p.fxsum / prop.mass) * (this.x + this.w - p.x)));
        collision = true;
      }
      if(collision)
        if(prop.vy > 0)
          p.applyImpulse(new Force(cfk * p.fxsum / prop.mass, Math.PI / 2));
        else if(prop.vy < 0)
          p.applyImpulse(new Force(cfk * p.fxsum / prop.mass, Math.PI * 3 / 2));
		}
  }
}
