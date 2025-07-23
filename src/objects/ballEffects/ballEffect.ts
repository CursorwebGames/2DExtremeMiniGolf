import { MainBall } from "../mainBall";

/**
 * The purpose of `BallEffect` is to store more extended state on the ball
 * during a collision with an obstacle, as well as altering ball rendering
 */
export abstract class BallEffect {
    ball: MainBall;

    constructor(ball: MainBall) {
        this.ball = ball;
    }

    abstract id: string;
    abstract draw(): void;
}