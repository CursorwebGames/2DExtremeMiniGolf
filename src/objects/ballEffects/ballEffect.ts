import { MainBall } from "../mainBall";

export abstract class BallEffect {
    ball: MainBall;

    constructor(ball: MainBall) {
        this.ball = ball;
    }

    abstract id: string;
    abstract draw(): void;
}