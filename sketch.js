let clusterSize = 20;
let clusterNumbers = 5;
let connections = 12;

let margin = 100;
let sizeMax = 20;
let sizeMin = 10;
let custers = [];

let canvasWidth = 1200;
let canvasHeight = 800;

function table() {
  console.table(points[0].partners);
}

function createCluster() {
  for (var c = 0; c < clusterNumbers; c++) {
    let points = [];
    let clusterColor = color(random(0, 255), random(0, 255), random(0, 255));

    for (var i = 0; i < clusterSize; i++) {
      points.push(new Point(clusterColor));
    }

    console.log("points: ", points);

    for (var j = 0; j < clusterSize; j++) {
      let partIndex = [];
      for (var u = 0; u < connections; u++) {
        var pos = round(random(0, clusterSize - 1));
        if (!partIndex.includes(pos)) {
          partIndex.push(pos);
          console.log("con", points[pos], "pos: ", pos);
          points[j].partners.push(points[pos]);
        }
      }
      console.log(points[j]);
    }
    custers.push(points);
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  createCluster();
}

function draw() {
  background(250);
  for (c = 0; c < clusterNumbers; c++) {
    for (i = 0; i < clusterSize; i++) {
      custers[c][i].move();
    }
  }
}

class Point {
  constructor(color) {

    this.x = random(margin, canvasWidth - margin);
    this.y = random(margin, canvasHeight - margin);

    this.xOrigen = this.x;
    this.yOrigen = this.y;

    this.xMove = random(1, 3);
    this.yMove = random(1, 3);

    this.xBound = random(100, 200);
    this.yBound = random(100, 200);

    this.size = random(sizeMin, sizeMax);

    this.partners = [];

    // random color
    this.color = color; //color(random(0, 255), random(0, 255), random(0, 255));
  }

  move() {
    this.x += random(-this.xMove, this.xMove);
    this.y += random(-this.yMove, this.yMove);

    circle(this.x, this.y, this.size);

    fill(this.color);
    ellipse(this.x, this.y, this.size);

    for (var i = 0; i < this.partners.length - 1; i++) {
      stroke(this.color);
      line(this.partners[i].x, this.partners[i].y, this.x, this.y);
    }
  }
}