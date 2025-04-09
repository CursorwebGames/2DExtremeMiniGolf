import { Ball } from "./ball";

export interface Obstacle<T = boolean> {
    draw(): void;

    /** apply any forces */
    collide(obj: Ball, result: T): void;

    /** Check for collision only (extensible) */
    isColliding(obj: Ball): T;
}
