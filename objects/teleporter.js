class Teleporter {
    constructor(sx, sy, ex, ey) {
        this.start = createVector(sx, sy);
        this.end = createVector(ex, ey);
        this.r = 14;

        // which portal it should be touching
        // at the end
        this.hasTeleported = false;
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
    }

    collide(obj, dest) {
        let destPos, checkPos;
        if (dest == -1) {
            destPos = this.start.copy();
        } else {
            destPos = this.end.copy();
        }

        if (this.hasTeleported == -1) {
            checkPos = this.start.copy();
        } else {
            checkPos = this.end.copy();
        }

        if (obj.pos.dist(checkPos) <= this.r + obj.r) {
            return;
        }

        obj.pos = destPos;
    }

    isColliding(obj) {
        if (circCircCol(obj.pos, obj.r, this.start, this.r)) {
            if (!this.hasTeleported) {
                this.hasTeleported = 1;
            }

            return 1;
        }

        if (circCircCol(obj.pos, obj.r, this.end, this.r)) {
            if (!this.hasTeleported) {
                this.hasTeleported = -1;
            }

            return -1;
        }

        this.hasTeleported = false;
    }
}