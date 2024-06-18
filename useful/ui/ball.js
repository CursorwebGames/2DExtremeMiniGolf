class BallUI {
    constructor(obj) {
        this.obj = obj;
        this.selected = false;
    }

    draw() {
        if (this.selected) {
            fill(255, 125);
            circle(this.obj.pos.x, this.obj.pos.y, this.r * 2 + 10);
        }
        this.obj.draw();
    }

    move() {
        this.obj.pos = createVector(mouseX, mouseY);
    }

    checkCollision() {
        return this.obj.pos.dist(createVector(mouseX, mouseY)) < this.obj.r;
    }
}