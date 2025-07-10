export abstract class Scene {
    /**
     * The draw cycle for the scene
     */
    abstract draw(): void;

    mousePressed() { }
    mouseReleased() { }
    mouseDragged() { }
    mouseWheel(_e: WheelEvent) { }

    keyPressed() { }

    windowResized() { }
}