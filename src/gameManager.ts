import { Ball } from "./objects/ball";

export const CCD_STEPS = 2;

// todo: separation of genLevels
export class GameManager {
    ball: Ball;

    constructor() {
        this.ball = new Ball(width / 2, height / 2);
    }
}
