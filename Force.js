class Force {
  constructor(n, theta){  //stored in polar coordinates
    this.n = n; //magnitude in newtons
    this.theta = theta; //angle in radians
  }
  x(){  //x component
    return this.n * Math.cos(this.theta);
  }
  y(){  //y component. Negative because positive y-axis is downwards
    return this.n * -Math.sin(this.theta);
  }
}
