class Camera {
  constructor(follow){
    this.follow = follow;
    this.offx = 0;
    this.offy = 0;
  }
  update(){
    this.offx = Global.c.width / 2 - (this.follow.x + this.follow.w / 2);
    this.offy = Global.c.height / 2 - (this.follow.y + this.follow.h / 2);
  }
}
