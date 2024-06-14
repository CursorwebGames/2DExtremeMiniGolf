class Teleporter {
    constructor(sx, sy, ex, ey) {
        this.start = createVector(sx, sy);
        this.end = createVector(ex, ey);
        this.r = 14;
        this.cooldown = 0;
    }

    draw() {
        push();
        noFill();
        strokeWeight(4);
        stroke(123, 123, 255);
        circle(this.start.x, this.start.y, this.r * 2);
        stroke(255, 179, 3);
        circle(this.end.x, this.end.y, this.r * 2);
        pop();

        if (this.cooldown > 0) this.cooldown--;
    }

    collide(obj, from) {
        let pos;
        if (from == -1) {
            pos = this.start.copy();
        } else {
            pos = this.end.copy();
        }

        // make sure you can't get stuck
        obj.vel.mult(1.05);
        if (obj.vel.mag() == 0) {
            obj.vel = p5.Vector.sub(pos, obj.pos).setMag(0.5);
        }

        obj.pos = pos;
    }

    isColliding(obj) {
        if (this.cooldown > 0) return false;

        if (circCircCol(obj.pos, obj.r, this.start, this.r)) {
            this.cooldown = 30;
            return 1;
        }

        if (circCircCol(obj.pos, obj.r, this.end, this.r)) {
            this.cooldown = 30;
            return -1;
        }
    }
}