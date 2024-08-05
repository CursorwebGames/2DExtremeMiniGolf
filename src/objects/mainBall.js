import { Ball, maxSpeed } from "./ball";

export class MainBall extends Ball {
    constructor(x, y) {
        super(x, y, 10);

        // if ball is in hole, you are at rest, but don't be able to continue to move
        this.inHole = false;

        this.isDragging = false;
    }

    draw() {
        fill(255);
        circle(this.pos.x, this.pos.y, this.r * 2);
        if (this.isDragging) {
            this.drag();
        } else {
            main.camera.scale = lerp(main.camera.scale, 1, 0.1);
        }
    }

    drag() {
        if (this.inHole || this.vel.mag() != 0) {
            return;
        }

        let dir = createVector(this.pos.x - mousex, this.pos.y - mousey).limit(maxSpeed * 30);

        // 1 / (2/3 + 1)
        main.camera.scale = lerp(main.camera.scale, maxSpeed * 30 / (dir.mag() + maxSpeed * 30), 0.1);

        for (let i = 1; i < 6; i++) {
            const vec = createVector().lerp(dir, i / 5);
            circle(vec.x + this.pos.x, vec.y + this.pos.y, 5);
        }
    }
}