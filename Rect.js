class Rect {
  constructor(x, y, w, h, color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    Global.currentScene.add(this);
  }
  draw(offx, offy){
    Global.rect(this.x + offx, this.y + offy, this.w, this.h, this.color);
  }
}
