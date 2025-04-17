import { PolygonWall } from "../../src/objects/polygonWall";
import { Sand } from "../../src/objects/sand";
import { Water } from "../../src/objects/water";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { UIComponent } from "./UIComponent";

type PolygonUIObj = PolygonWall | Water | Sand;

export class PolygonUI implements UIComponent {
    obj: PolygonUIObj;

    constructor(obj: PolygonUIObj, editor: EditorScene) {
        this.obj = obj;
    }

    draw(): void {
        throw new Error("Method not implemented.");
    }

    update(knot: Knot): void {
        throw new Error("Method not implemented.");
    }
}