import { Knot } from "./knot";
import { StaticObjData } from "../../src/levels/levels";

/**
 * UI   == canvas ui
 * HTML == html
 * obj  == gameObject
 */
export interface UIComponent {
    /**
     * `draw()` will have to also draw the knots
     * to make sure the layering is correct
     */
    draw(): void;
    update(knot: Knot, dpos: p5.Vector): void;
}

export interface UISerializable extends UIComponent {
    toJSON(): StaticObjData;
}