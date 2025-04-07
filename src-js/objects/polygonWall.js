import { circPolyCol } from "../collisions";

export class PolygonWall {
    constructor(points) {
        this.points = points;
    }

    draw() {
        fill(217, 238, 255);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape();
    }

    collide(obj, { projPoint, edge }) {
        let diff = p5.Vector.sub(obj.pos, projPoint);
        let speed = obj.vel.mag();

        // based on the clockwise/counterclockwise of the polygon render
        // the angle can be either positive or negative, but we want positive (just think quadrant 1 vs quadrant 2)
        let ang = Math.abs(obj.vel.angleBetween(edge));

        obj.pos.add(p5.Vector.setMag(diff, obj.r - diff.mag()));
        obj.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}