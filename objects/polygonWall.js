class PolygonWall {
    constructor(points) {
        this.points = points;
    }

    draw() {
        fill(123, 0, 255);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape();
    }

    collide(obj, projPoint) {
        let diff = p5.Vector.sub(obj.pos, projPoint);
        let speed = obj.vel.mag();
        obj.applyForce(diff.setMag(2 * speed));
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}