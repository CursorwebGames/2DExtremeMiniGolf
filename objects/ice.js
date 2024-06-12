class Ice extends Wall {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.disabled = false;
        this.shatter = createVector(this.x, this.y);
        this.normal = createVector(0, 0);
    }

    draw() {
        if (!this.disabled) {
            push();
            strokeWeight(1);
            stroke(255, 125);
            fill(123, 0, 255, 125);
            rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
            pop();
        } else {
            push();
            strokeWeight(1);
            stroke(255, 125);
            fill(123, 0, 255, 125);
            rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);

            // okay, time to ask on stackoverflow!
            strokeWeight(2);
            for (let i = 0; i < PI / 2; i += 0.5) {
                let vec = p5.Vector.rotate(this.normal, i).mult(this.w / 2).add(this.shatter);
                line(this.shatter.x, this.shatter.y, vec.x, vec.y);
                vec = p5.Vector.rotate(this.normal, -i).mult(this.w / 2).add(this.shatter);
                line(this.shatter.x, this.shatter.y, vec.x, vec.y);
            }
            pop();
        }
    }

    collide(obj) {
        let cx = obj.pos.x;
        let cy = obj.pos.y;

        if (cx < this.x) {
            this.shatter.y = obj.pos.y;
            this.normal = createVector(1, 0);
        }

        if (cx > this.x + this.w) {
            this.shatter.x = this.x + this.w;
            this.shatter.y = obj.pos.y;
            this.normal = createVector(-1, 0);
        }

        if (cy < this.y) {
            this.shatter.x = obj.pos.x;
            this.normal = createVector(0, 1);
        }

        if (cy > this.y + this.h) {
            this.shatter.y = this.y + this.h;
            this.shatter.x = obj.pos.x;
            this.normal = createVector(0, -1);
        }

        super.collide(obj);
        this.disabled = true;
    }

    isColliding(obj) {
        return !this.disabled && super.isColliding(obj);
    }
}