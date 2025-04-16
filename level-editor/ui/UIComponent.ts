import { Knot } from "./knot";

export abstract class UIComponent {
    abstract draw(): void;
    abstract update(knot: Knot): void;
}