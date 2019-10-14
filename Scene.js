class Scene {
  constructor(){
    this.objects = [];
    this.rigids = [];
  }
  add(o){
    if(o.properties && o.property("rigid"))
      this.rigids.push(o);
    else
      this.objects.push(o);
  }
  update(cam){
    this.objects.forEach(function(o){
      o.draw(cam.offx, cam.offy);
    });
    this.rigids.forEach(function(r){
      r.draw(cam.offx, cam.offy);
      if(r.property("dynamic")){
        this.rigids.forEach(function(r2){
          if(r2 !== r)
            r2.update(r);
        });
      }
    });
  }
}
