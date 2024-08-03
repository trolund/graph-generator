let clusterSize = 5;
let clusterNumbers = 1;
let connections = 2;
let margin = 100;
let custers = [];
let canvasWidth = 800;
let canvasHeight = 500;
let smoothAnimation = true;
let maxSpeed = 3;
let minSpeed = 0;
let sizeMax = 20;
let sizeMin = 10;
let bgColor;

function table() {
  console.log(custers);
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
      while (partIndex.length < connections) {
        var pos = round(random(0, clusterSize - 1));
        if (pos == j) {
          continue;
        }

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

  bgColor = random(0, 255);
}

function draw() {
  background(bgColor);
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

    this.xMove = random(minSpeed, maxSpeed);
    this.yMove = random(minSpeed, maxSpeed);

    this.xBound = this.xOrigen + random(100, 200);
    this.yBound = this.yOrigen + random(100, 200);

    this.size = random(sizeMin, sizeMax);

    this.partners = [];

    // random color
    this.color = color; //color(random(0, 255), random(0, 255), random(0, 255));
  }

  move() {
    this.draw();

    if (smoothAnimation) {
      this.x += this.xMove;
      if (this.x > (canvasWidth - this.size / 2) || this.x < (0 + this.size / 2)) {
        this.xMove *= -1;
      }

      this.y += this.yMove;
      if (this.y > (canvasHeight - this.size / 2) || this.y < (0 + this.size / 2)) {
        this.yMove *= -1;
      }
    } else {
      this.x += random(-this.xMove, this.xMove);
      this.y += random(-this.yMove, this.yMove);
    }


  }

  draw() {
    circle(this.x, this.y, this.size);

    fill(this.color);
    ellipse(this.x, this.y, this.size);

    for (var i = 0; i < this.partners.length - 1; i++) {
      stroke(this.color);
      line(this.partners[i].x, this.partners[i].y, this.x, this.y);
    }
  }
}