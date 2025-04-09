import p5 from "p5";

// https://github.com/Gaweph/p5-typescript-starter/blob/master/global.d.ts
import * as p5Global from "p5/global";
import module = require("p5");
export = module;
export as namespace p5;


declare global {
    // hack cuz @types/p5 is doing a bad job
    function beginClip(): void;
    function endClip(): void;

    type PointArr = [number, number][];

    interface Window {
        p5: typeof p5;
        mousex: number;
        mousey: number;
    }

    interface Window extends p5EventFunctions {
    }

    // https://github.com/GoSubRoutine/Steering-Text-Paths/blob/main/typings/p5-global.d.ts
    interface p5EventFunctions {
        registerMethod(register: P5RegTypes, callback: (this: p5) => void): void
        registerPreloadMethod(name: PropertyKey, proto: object): void

        preload(this: p5): void
        setup(this: p5): void
        draw(this: p5): void

        windowResized(this: p5, evt?: UIEvent): boolean | void

        keyTyped(this: p5, evt?: KeyboardEvent): boolean | void
        keyPressed(this: p5, evt?: KeyboardEvent): boolean | void
        keyReleased(this: p5, evt?: KeyboardEvent): boolean | void

        touchStarted(this: p5, evt?: TouchEvent): boolean | void
        touchMoved(this: p5, evt?: TouchEvent): boolean | void
        touchEnded(this: p5, evt?: TouchEvent): boolean | void

        mouseWheel(this: p5, evt?: WheelEvent): boolean | void

        mouseMoved(this: p5, evt?: MouseEvent): boolean | void
        mouseDragged(this: p5, evt?: DragEvent): boolean | void

        mousePressed(this: p5, evt?: MouseEvent): boolean | void
        mouseReleased(this: p5, evt?: MouseEvent): boolean | void

        mouseClicked(this: p5, evt?: MouseEvent): boolean | void
        doubleClicked(this: p5, evt?: MouseEvent): boolean | void
        preload(this: p5): void
        setup(this: p5): void
        draw(this: p5): void

        windowResized(this: p5, evt?: UIEvent): boolean | void

        keyTyped(this: p5, evt?: KeyboardEvent): boolean | void
        keyPressed(this: p5, evt?: KeyboardEvent): boolean | void
        keyReleased(this: p5, evt?: KeyboardEvent): boolean | void

        touchStarted(this: p5, evt?: TouchEvent): boolean | void
        touchMoved(this: p5, evt?: TouchEvent): boolean | void
        touchEnded(this: p5, evt?: TouchEvent): boolean | void

        mouseWheel(this: p5, evt?: WheelEvent): boolean | void

        mouseMoved(this: p5, evt?: MouseEvent): boolean | void
        mouseDragged(this: p5, evt?: DragEvent): boolean | void

        mousePressed(this: p5, evt?: MouseEvent): boolean | void
        mouseReleased(this: p5, evt?: MouseEvent): boolean | void

        mouseClicked(this: p5, evt?: MouseEvent): boolean | void
        doubleClicked(this: p5, evt?: MouseEvent): boolean | void
    }
}
