class Point {
  constructor(x, y, color, note, p5, canvasWidth, canvasHeight, state) {
    this.x = x;
    this.y = y;
    this.vec = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.color = p5.color(color);
    this.color.setAlpha(60);
    this.opacity = 0.5;
    this.note = note;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.state = state;
    this.radius = 20;
    this.intialRadius = this.radius;
    this.isActive = false;
  }

  highlight() {
    this.isActive = true;
    this.color.setAlpha(200);
    this.radius = this.radius * 2;
    console.log(this.radius);
    console.log(this.note);
  }

  removeHighlight() {
    this.color.setAlpha(60);
    if (this.isActive) {
      this.radius = this.intialRadius;
      this.isActive = false;
    }
  }

  render(s) {
    s.push();
    s.noStroke();
    s.fill(this.color);
    s.circle(this.x, this.y, this.radius);
    s.pop();
    // if (!this.state.isPlaying) return;
    this.x += this.vec.x;
    this.y -= this.vec.y;
    if (
      this.x <= 0 + this.radius / 2 ||
      this.x >= this.canvasWidth - this.radius / 2
    ) {
      this.vec.x *= -1;
    }
    if (
      this.y <= 0 + this.radius / 2 ||
      this.y >= this.canvasHeight - this.radius / 2
    ) {
      this.vec.y *= -1;
    }
  }
}

export default Point;
