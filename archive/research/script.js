// https://codepen.io/axxl/pen/PVxqPv

// https://github.com/Kimeiga/billiards?tab=readme-ov-file

var ball;
let balls = [];
let colors = ["#13527a", "#f16427", "#d62927", "#1e6032", "#d83c38",
    "#357a3d", "#d62d2c", "#dcab30", "#971a1e",
    "#0a4c7c", "#2b2826", "#b61b21",
    "#f26f28", "#482a6f",
    "#deb440"];


let holes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // let offset = 0;
    // let c = 0;
    // let ballR = 18;

    balls.push(new Ball(width / 2 - 25, height / 2, 50, "gray"));
    balls.push(new Ball(width / 2 + 25, height / 2, 50, "gray"));

    // ball = new WhiteBall(width - 100, height / 2, 20, 45);
    // balls.push(ball);

    // generate balls in triangle
    // for (var i = 0; i < 5; i++) {
    //     for (var j = 5 - i; j > 0; j--) {
    //         let b = new Ball(100 + i * ballR + i, j * ballR - (ballR * 5) / 2 + offset - ballR / 2 + height / 2 + j, ballR, colors[c]);
    //         balls.push(b);
    //         c++;
    //     }
    //     offset += ballR / 2 + 1;
    // }

    // holes.push(new Hole(0, 0));
    // holes.push(new Hole(width, 0));
    // holes.push(new Hole(width / 2, 0));
    // holes.push(new Hole(width / 2, height));
    // holes.push(new Hole(0, height));
    // holes.push(new Hole(width, height));
}

function draw() {
    background("#2b9557");


    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        if (ball.inHole) continue;

        for (let j = 0; j < balls.length; j++) {
            let test = balls[j];
            if (test.inHole) continue;
            if (ball === test) continue;
            ball.checkCollision(test);
        }
    }

    for (const ball of balls) {
        if (ball.inHole) continue;
        ball.update();
        ball.render();
    }

    if (ball) {
        stroke(255);
        line(ball.position.x, ball.position.y, mouseX, mouseY);
    }
}


function mousePressed() {
    if (!ball) {
        ball = new WhiteBall(mouseX, mouseY, 50);
        balls.push(ball);
    } else {
        let dx = mouseX - ball.position.x;
        let dy = mouseY - ball.position.y;
        let force = createVector(dx, dy).limit(10);
        ball.applyForce(force);
    }
}

class Hole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get radius() {
        return 50;
    }

    render() {
        noStroke();
        fill(0);
        ellipse(this.x, this.y, Hole.radius * .8, Hole.radius * .8);
    }
}


class PhysicsParticle {
    constructor(x, y, r, velocityLimit) {
        this.position = createVector(x, y, 0);
        this.acc = createVector(0, 0, 0);
        this.velocity = createVector(0, 0, 0);
        this.r = r;
        this.velocityLimit = velocityLimit || 30;
        this.friction = 0.968;
    }

    applyForce(f) {
        this.acc.add(f);
        this.velocity.add(this.acc);
        this.velocity.limit(this.velocityLimit);
        this.acc.mult(0);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.mult(this.friction);
        this.applyBounds();
    }

    checkCollision(b) {
        let d = this.position.dist(b.position);
        if (d <= (b.r / 2 + this.r / 2)) {
            let dx = b.position.x - this.position.x;
            let dy = b.position.y - this.position.y;
            this.computeCollision(b, dx, dy);
        }
    }

    computeCollision(b, dx, dy) {
        let speed = this.velocity.mag();// * 0.8;
        // force = mass * velocity / time
        // let time = 1 (unitless)
        // also this assumes the mass to be the same for both objects
        // refer to the complex equation.
        b.applyForce(createVector(dx, dy).setMag(speed));
        // this.velocity.mult(0.7);
    }

    applyBounds() {
        if (this.position.y + this.r / 2 >= height) {
            this.position.y = height - this.r / 2;
            this.applyForce(createVector(0, 2 * this.velocity.y * -1, 0));
        } else if (this.position.y < this.r / 2) {
            this.position.y = this.r / 2;
            this.applyForce(createVector(0, 2 * this.velocity.y * -1, 0));
        }
        if (this.position.x + this.r / 2 >= width) {
            this.position.x = width - this.r / 2;
            this.applyForce(createVector(2 * this.velocity.x * -1, 0, 0));
        } else if (this.position.x < this.r / 2) {
            this.position.x = this.r / 2;
            this.applyForce(createVector(2 * this.velocity.x * -1, 0, 0));
        }
    }
}


class Ball extends PhysicsParticle {
    constructor(x, y, r, _color, limit) {
        super(x, y, r, limit);
        this.color = _color || color(255);
        this.inHole = false;
    }

    checkCollisionWithHole(hole) {
        let dx = hole.x - this.position.x;
        let dy = hole.y - this.position.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d <= Hole.radius / 2 - this.r / 2) {
            this.inHole = true;
        }
    }


    render() {
        stroke(0);
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }
}

class WhiteBall extends Ball {
    constructor(x, y, r, limit) {
        super(x, y, r, limit);
        this.color = color(255);
    }

    checkCollisionWithHole(hole) {
        let dx = hole.x - this.position.x;
        let dy = hole.y - this.position.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d <= Hole.radius / 2 - this.r / 2) {
            this.velocity.mult(0);
            this.position.set(width - 100, height / 2);
            this.acc.mult(0);
        }
    }
}