movers = [];
mm = 20;
  
function setup() {
  createCanvas(600, 600);
  newMovers();
}

function newMovers(){
 for(i = 0; i<mm ; i++){
   movers[i] = new Mover(random(1,5), random(width), random(height))
 }
}

function runMovers(){
  for(i = 0; i<mm; i++){
    movers[i].run();
  }
}

function draw() {
background(255);
runMovers();
}

function Mover(x, y, r) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.col = (random(255));
  this.maxSpeed = random(200);
  this.maxForce = random(20);
}

Mover.prototype.run = function() {
  this.update();
  this.checkEdges();
  this.render();
}

Mover.prototype.update = function() {
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  this.rpl = new p5.Vector.sub(this.pos, repeller.pos);
  this.rpl.normalize();
  this.rpl.mult(3);

  if (this.pos.dist(repeller.pos) < 150) {
    this.applyForce(this.rpl);
  }

  this.atr = new p5.Vector.sub(repeller.pos, this.pos);
  this.atr.normalize();
  this.atr.mult(3);

  if (this.pos.dist(repeller.pos) > 180) {
    this.applyForce(this.atr);
  }

  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Mover.prototype.checkEdges = function() {
  if (this.pos.x > width) {
    this.pos.x = width;
    this.vel.x *= -1;
  } else if (this.loc.x < 0) {
    this.vel.x *= -1;
    this.pos.x = 0;
  }

  if (this.pos.y > height) {
    this.vel.y *= -1;
    this.pos.y = height;
  }
}

Mover.prototype.render = function(){
  stroke(0);
  fill(this.col);
  ellipse(this.pos.x, this.pos.y, r, r);
}

Boid.prototype = new Mover();
function Boid(){
  
}

Repeller.prototype = new Mover();
function Repeller(){

}

Attractor.prototype = new Mover();
function Attractor(){
  
}
