import { Ball } from "../ball";

export abstract class BallEffect {
    abstract id: string;
    abstract draw(ball: Ball): void;
}