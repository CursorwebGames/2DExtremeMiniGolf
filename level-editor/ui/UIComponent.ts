import { Knot } from "./knot";

export abstract class UIComponent {
    /**
     * `draw()` will have to also draw the knots
     * to make sure the layering is correct
     */
    abstract draw(): void;
    abstract update(knot: Knot, dpos: p5.Vector): void;
}