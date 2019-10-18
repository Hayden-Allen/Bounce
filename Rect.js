class Rect {
  constructor(x, y, w, h, color){
    this.x = x; this.y = y; //coordinates of top left corner
    this.w = w; this.h = h; //width and height
    this.color = color; //hex string color code
  }
  draw(offx, offy){
    Global.rect(this.x + offx, this.y + offy, this.w, this.h, this.color);  //filled rectangle
  }
}
