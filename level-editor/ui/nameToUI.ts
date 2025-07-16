import { nameToObj } from "../../src/levels/levels";
import { EditorScene } from "../scenes/editorScene";
import { PolygonUI } from "./polygonUI";
import { RectUI } from "./rectUI";
import { SingleUI } from "./singleUI";
import { TeleporterUI } from "./teleporterUI";
import { UISerializable } from "./UIComponent";

export const nameToUI: Record<keyof typeof nameToObj, new (obj: any, editor: EditorScene) => UISerializable> = {
    Bouncer: SingleUI,
    Ice: RectUI,
    PolygonWall: PolygonUI,
    Sand: PolygonUI,
    Slope: RectUI,
    Teleporter: TeleporterUI,
    Wall: RectUI,
    Water: PolygonUI,
};