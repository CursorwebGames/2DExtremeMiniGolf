import { StaticObjData } from "../../src/levels/levels";
import { Ball } from "../../src/objects/ball";
import { MainBall } from "../../src/objects/mainBall";
import { EditorScene } from "../scenes/editorScene";
import { SingleUI } from "./singleUI";

export class MainBallUI extends SingleUI {
    constructor(obj: Ball, editor: EditorScene) {
        super(obj, editor);
        this.obj = new EditorMainBall(obj);
    }

    toJSON(): StaticObjData {
        return super.toJSON(MainBall.name);
    }
}

/**
 * By extending `Ball` instead of `mainBall`
 * we get rid of the idle animation during the editor sequence
 */
class EditorMainBall extends Ball {
    constructor(obj: Ball) {
        super(obj.pos.x, obj.pos.y, obj.r);
    }

    draw() {
        super.draw();
    }
}