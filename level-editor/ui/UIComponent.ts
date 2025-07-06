import { Knot } from "./knot";

export interface UIComponent {
    /**
     * `draw()` will have to also draw the knots
     * to make sure the layering is correct
     */
    draw(): void;
    update(knot: Knot, dpos: p5.Vector): void;
}