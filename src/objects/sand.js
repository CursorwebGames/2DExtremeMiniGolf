// todo: AHHHHH
const _friction = 0.05;

class Sand {
    constructor(points) {
        this.points = points;
        let minx = points[0][0], miny = points[0][1], maxx = points[0][0], maxy = points[0][1];

        for (let i = 1; i < points.length; i++) {
            let [x, y] = points[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }

        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;

        // from light to dark
        this.from = color(255, 247, 128);
        this.to = color(217, 210, 111);
    }

    draw() {
        push();

        push();
        strokeWeight(16);
        stroke(this.to);
        fill(255, 247, 128);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();

        beginClip();
        strokeWeight(16);
        stroke(0);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape();
        endClip();

        // push();
        // noFill();
        // strokeWeight(16);
        // // todo: introduce variables
        // for (let i = 0; i < 4; i++) {
        //     const c = lerpColor(this.from, this.to, i / 4);
        //     stroke(c);
        //     for (let y = this.miny + i * 16; y < this.maxy; y += 16 * 5) {
        //         beginShape();
        //         let deltaY = 1;
        //         for (let x = this.minx; x < this.maxx; x += 80) {
        //             vertex(x, y);
        //             bezierVertex(
        //                 x + 40, y + deltaY * 10,
        //                 x + 40, y + deltaY * 10,
        //                 x + 80, y
        //             );
        //             deltaY *= -1;
        //         }
        //         endShape();
        //     }
        // }
        // pop();

        pop(); // pop all
    }

    collide(ball) {
        // do note this will be amplified
        // based on ccd count
        ball.vel.mult(1 - _friction);
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points) || pointPolyCol(ball.pos, this.points);
    }
}