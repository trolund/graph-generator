
let clusterSize = 20;
let clusterNumbers = 5;
let connections = 10;

let margin = 100;
let sizeMax = 20;
let sizeMin = 10;
let custers = [];


function table() {
  console.table(points[0].partners);
}

function createCluster() {
  for (var c = 0; c < clusterNumbers; c++) {
    let points = [];

    for (var i = 0; i < clusterSize; i++) {
      points.push(new Point());
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
  createCanvas(500, 500);
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
  constructor() {
    this.x = random(0 + margin, 500 - margin);
    this.y = random(0 + margin, 500 - margin);

    this.xOrigen = this.x;
    this.yOrigen = this.y;

    this.xMove = random(1, 3);
    this.yMove = random(1, 3);

    this.xBound = random(100, 200);
    this.yBound = random(100, 200);

    this.size = random(sizeMin, sizeMax);

    this.partners = [];
  }

  move() {
    this.x += random(-this.xMove, this.xMove);
    this.y += random(-this.yMove, this.yMove);

    circle(this.x, this.y, this.size);

    fill(color(255, 204, 0));
    ellipse(this.x, this.y, this.size);

    for (var i = 0; i < this.partners.length - 1; i++) {
      stroke(color(255, 204, 0));
      line(this.partners[i].x, this.partners[i].y, this.x, this.y);
    }
  }
}