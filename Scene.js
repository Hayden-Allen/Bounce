class Scene {
  constructor(){
    this.objects = [];  //all non-rigid rectangles
    this.rigids = [];   //only rigid rectangles
  }
  add(o){
    if(o.property("rigid")) //if rigid, add to rigid list
      this.rigids.push(o);
    else  //else add to regular list
      this.objects.push(o);
  }
  update(cam){
    //for case of no camera
    let offx = 0, offy = 0;
    if(cam){
      offx = cam.offx;
      offy = cam.offy;
    }
    this.objects.forEach(function(o){ //draw all non-rigids
      o.draw(offx, offy);
    });
    let rigids = this.rigids;
    rigids.forEach(function(r){  //draw all rigids
      r.draw(offx, offy);
      if(r instanceof DynamicBlock){
        r.updateVelocity();
        rigids.forEach(function(r2){ //check for collision against other rigids
          if(r2 !== r)
            r2.update(r);
        });
      }
    });
  }
}
