class Bouncer {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
    }

    draw() {
        fill("pink");
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    isColliding(obj) {
        return circCircCol(obj.pos, obj.r, this.pos, this.r);
    }

    collide(obj) {
        let dir = p5.Vector.sub(obj.pos, this.pos);
        let speed = obj.vel.mag();
        obj.applyForce(dir.setMag(speed * 4).limit(50));
    }
}