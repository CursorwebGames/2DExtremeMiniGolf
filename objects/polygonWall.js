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

    collide(obj, { projPoint, edge }) {
        let diff = p5.Vector.sub(obj.pos, projPoint);
        let speed = obj.vel.mag();

        let vel = p5.Vector.mult(obj.vel, -1);
        let ang = vel.angleBetween(edge);

        obj.pos.add(p5.Vector.setMag(diff, obj.r - diff.mag()));
        obj.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}