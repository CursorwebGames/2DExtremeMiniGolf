import { circPolyCol, MaybeCircPolyColResult } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export class PolygonWall implements Obstacle<MaybeCircPolyColResult> {
    points: PointArr;

    constructor(points: PointArr) {
        this.points = points;
    }

    draw() {
        fill(0, 0.25 * 255);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x + 1.5, y + 1.5);
        }
        endShape();

        push();
        fill(255);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape();
        pop();
    }

    collide(obj: Ball, { projPoint, edge }: { projPoint: p5.Vector, edge: p5.Vector }) {
        let diff = p5.Vector.sub(obj.pos, projPoint!);
        let speed = obj.vel.mag();

        // based on the clockwise/counterclockwise of the polygon render
        // the angle can be either positive or negative, but we want positive (just think quadrant 1 vs quadrant 2)
        let ang = Math.abs(obj.vel.angleBetween(edge!));

        obj.pos.add(p5.Vector.setMag(diff, obj.r - diff.mag()));
        obj.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
    }

    isColliding(ball: Ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}