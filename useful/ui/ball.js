class BallUI {
    constructor(obj) {
        this.obj = obj;
    }

    draw() {
        this.obj.draw();
    }

    move() {
        this.obj.pos = createVector(mouseX, mouseY);
    }

    checkCollision() {
        return this.obj.pos.dist(createVector(mouseX, mouseY)) < this.obj.r;
    }
}