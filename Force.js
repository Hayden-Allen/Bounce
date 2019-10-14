class Force {
  constructor(n, theta){
    this.n = n;
    this.theta = theta;
  }
  x(){
    return this.n * Math.cos(this.theta);
  }
  y(){
    return this.n * -Math.sin(this.theta);
  }
}
