class MainBall extends Ball {
    constructor(x, y) {
        super(x, y, 15);
    }

    draw() {
        this.update();
        fill(255);
        circle(this.pos.x, this.pos.y, this.r * 2);

        if (this.vel.mag() == 0) {
            for (let i = 1; i < 6; i++) {
                let x = lerp(this.pos.x, mousex, i / 5);
                let y = lerp(this.pos.y, mousey, i / 5);
                circle(x, y, 5);
            }
        }
    }
}