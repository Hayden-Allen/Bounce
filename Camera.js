class Camera {
  constructor(follow){
    this.follow = follow; //target rect
    this.offx = 0;  //offsets for drawing an object relative to an object
    this.offy = 0;
  }
  update(){ //calculate offset coords based on target position.
            //
            //this.follow.x + this.offx = Global.c.width / 2 - this.follow.w / 2
            //this.offx = Global.c.width / 2 - this.follow.w / 2 - this.follow.x
            //this.offx = Global.c.width / 2 - (this.follow.x + this.follow.w / 2)
            //same for y
    this.offx = Global.c.width / 2 - (this.follow.x + this.follow.w / 2);
    this.offy = Global.c.height / 2 - (this.follow.y + this.follow.h / 2);
  }
}
