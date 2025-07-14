import p5 from "p5";
import { SceneManager } from "./scenes/sceneManager";
window.p5 = p5;

let sceneManager: SceneManager;

window.setup = () => {
    const canvas = createCanvas(windowWidth, windowHeight);
    noStroke();

    (canvas.elt as HTMLCanvasElement).addEventListener("touchmove", e => {
        e.preventDefault();
    });

    sceneManager = new SceneManager();
};

window.draw = () => {
    sceneManager.draw();
};

window.mousePressed = () => {
    sceneManager.scene.mousePressed();
};

window.mouseReleased = () => {
    sceneManager.scene.mouseReleased();
};

window.keyPressed = () => {
    sceneManager.scene.keyPressed();
};


// why?
window.touchStarted = window.mousePressed;
window.touchEnded = window.mouseReleased;

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    sceneManager.scene.windowResized();
}