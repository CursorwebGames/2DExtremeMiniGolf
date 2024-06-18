class Water {
    constructor(points) {
        this.points = points;
    }

    draw() {
        fill(40, 150, 255);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape();
    }

    collide(obj) {
        obj.pos = obj.prevPos.copy();
        obj.vel.setMag(0);
        // todo: transition
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}