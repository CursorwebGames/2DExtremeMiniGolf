export class Transition {
    private progress: number;

    /**
     * * `1` = forwards
     * * `-1` = backwards
     */
    private direction: number;
    private onDone?: () => void;

    constructor() {
        this.progress = 0;
        this.direction = 0;
    }

    draw() {
        fill(255, this.progress);
        rect(0, 0, width, height);

        if (this.direction != 0) {
            this.update();
        }
    }

    private update() {
        this.progress += this.direction * 5;

        // we actually call halfway (so it fades out to next level)
        if (this.progress == 300) {
            this.onDone!();
            this.direction = -1;
        }

        if (this.progress < 0) {
            this.end();
        }
    }

    private end() {
        this.direction = 0;
        this.progress = 0;
    }

    transition(onDone: () => void) {
        this.direction = 1;
        this.onDone = onDone;
    }
}
