const balls = [];
const walls = [];
let mainb;

const rad = 30;
const friction = 0.016;

class Ball {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
    }

    draw() {
        this.update();
        fill(100);
        circle(this.pos.x, this.pos.y, rad * 2);
    }

    /**
     * In each frame, multiple forces can be applied
     * And then in update, they will subsequently affect the ball's movement
     * @param {p5.Vector} f Force
     */
    applyForce(f) {
        this.vel.add(f);
    }

    update() {
        this.checkBounds();
        this.pos.add(this.vel);
        this.vel.mult(1 - friction);
    }

    checkBounds() {
        if (this.pos.x > width - rad) {
            this.vel.x *= -1;
            this.pos.x = width - rad;
        }

        if (this.pos.x < rad) {
            this.vel.x *= - 1;
            this.pos.x = rad;
        }

        if (this.pos.y > height - rad) {
            this.vel.y *= -1;
            this.pos.y = height - rad;
        }

        if (this.pos.y < rad) {
            this.vel.y *= -1;
            this.pos.y = rad;
        }
    }

    collide(other) {
        // why the perpendicular?
        let dir = p5.Vector.sub(other.pos, this.pos);
        this.vel.mult(0.8);
        let speed = this.vel.mag();
        other.applyForce(dir.setMag(speed));
    }
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        fill(123, 0, 255);
        rect(this.x, this.y, this.w, this.h);
    }

    collide(obj) {
        let cx = obj.pos.x;
        let cy = obj.pos.y;

        // apply -2 * v to the component
        // as a "bounce"
        // energy loss
        if (cx < this.x) {
            obj.vel.x *= -1;
            obj.pos.x = this.x - rad;
        }

        if (cx > this.x + this.w) {
            obj.vel.x *= -1;
            obj.pos.x = this.x + this.w + rad;
        }

        if (cy < this.y) {
            obj.vel.y *= -1;
            obj.pos.y = this.y - rad;
        }

        if (cy > this.y + this.h) {
            obj.vel.y *= -1;
            obj.pos.y = this.y + this.h + rad;
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    balls.push(new Ball(width / 2 - rad, height / 2));
    balls.push(new Ball(width / 2 + rad, height / 2));

    walls.push(new Wall(width / 2 - 100, height / 2 - 200, 200, 40));
}

function draw() {
    background(255);

    // duplicate twice, so as to newton's third law
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = 0; j < balls.length; j++) {
            if (i == j) continue;
            const other = balls[j];
            if (circCircCol(ball.pos, rad, other.pos, rad)) {
                ball.collide(other);
            }
        }

        for (const wall of walls) {
            if (circRectCol(ball.pos.x, ball.pos.y, rad, wall.x, wall.y, wall.w, wall.h)) {
                wall.collide(ball);
            }
        }
    }

    for (const ball of balls) {
        ball.draw();
    }

    for (const wall of walls) {
        wall.draw();
    }
}

function mouseClicked() {
    if (!mainb) {
        mainb = new Ball(mouseX, mouseY);
        balls.push(mainb);
    } else {
        mainb.vel = p5.Vector.sub(createVector(mouseX, mouseY), mainb.pos).limit(16);
    }
}

function circCircCol(vec1, r1, vec2, r2) {
    return vec1.dist(vec2) <= r1 + r2;
}

function circRectCol(cx, cy, r, rx, ry, rw, rh) {
    let testx, testy;

    // check if on left edge, then check collision left edge, etc
    if (cx < rx) testx = rx;
    else if (cx > rx + rw) testx = rx + rw;
    else testx = cx; // within the rect, so collide

    if (cy < ry) testy = ry;
    else if (cy > ry + rh) testy = ry + rh;
    else testy = cy;

    let distx = cx - testx;
    let disty = cy - testy;

    return Math.sqrt(distx ** 2 + disty ** 2) < r;
}