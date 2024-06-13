// https://physics.stackexchange.com/questions/631322/is-it-possible-to-find-the-final-velocities-of-two-objects-in-a-perfectly-elasti

/*
vaf = (ma - mb)/(ma + mb) * va + (2 * mb)/(ma + mb) * vb
vbf = (2 * ma)/(ma + mb) * va - (ma - mb)/(ma + mb) * vb
*/

// todo: queue system for multiple collisions at once
// okay, so like, we learned lots of cool things
// but also, LOL bro really thought he should use equations instead
// of good old forces
// honestly a common physics L

const ma = 2;
const mb = 3;
const r = 25;
const friction = 0.005;

class Ball {
    constructor(x, y, vx = 0, vy = 0) {
        this.vel = createVector(vx, vy);
        this.pos = createVector(x, y);
        // this.dvel = createVector(0, 0);
    }

    draw() {
        // if (this.dvel.mag() != 0) {
        //     this.vel.add(this.dvel);
        //     this.dvel.setMag(0);
        // }

        fill(100);
        circle(this.pos.x, this.pos.y, 2 * r);
        this.pos.add(this.vel);

        // this.vel.slerp(createVector(0, 0), friction);

        // research:
        if (this.vel.mag() < 0.02) {
            this.vel.setMag(0);
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }

        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    collide(other) {
        let va = this.vel;
        let vb = other.vel;

        // this.vel
        let vel1 = p5.Vector.mult(va, (ma - mb) / (ma + mb)).add(p5.Vector.mult(vb, (2 * mb) / (ma + mb)));
        let vel2 = p5.Vector.mult(va, (2 * ma) / (ma + mb)).sub(p5.Vector.mult(vb, (ma - mb) / (ma + mb)));

        this.vel = vel1;
        other.vel = vel2;
        // this.dvel.add(vel1.sub(va));
        // other.dvel.add(vel2.sub(vb));
    }
}

/** @type {Ball[]} */
let balls = [];
let mainb;

function setup() {
    createCanvas(windowWidth, windowHeight);
    balls.push(new Ball(width / 2 - 26, height / 2));
    balls.push(new Ball(width / 2 + 26, height / 2));
}

function draw() {
    background("white");

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let ball1 = balls[i];
            let ball2 = balls[j];
            if ((ball1.vel.mag() != 0 || ball2.vel.mag() != 0) && circCircCol(ball1.pos, r, ball2.pos, r)) {
                ball1.collide(ball2);
            }
        }
    }

    for (const ball of balls) {
        ball.draw();
    }
}

function mouseClicked() {
    if (!mainb) {
        mainb = new Ball(mouseX, mouseY);
        balls.push(mainb);
    } else {
        mainb.vel = p5.Vector.sub(createVector(mouseX, mouseY), mainb.pos).normalize().mult(8);
    }
}

function circCircCol(vec1, r1, vec2, r2) {
    return vec1.dist(vec2) <= r1 + r2;
}