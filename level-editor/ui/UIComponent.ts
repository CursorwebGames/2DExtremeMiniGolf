import { Knot } from "./knot";

export interface UIComponent {
    draw(): void;
    update(knot: Knot): void;
}