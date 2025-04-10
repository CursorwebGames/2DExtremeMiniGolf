import p5 from "p5";
import { GameManager } from "./gameManager";
window.p5 = p5;

let gameManager: GameManager;

window.setup = () => {
    const canvas = createCanvas(windowWidth, windowHeight);
    noStroke();

    (canvas.elt as HTMLCanvasElement).addEventListener("touchmove", e => {
        e.preventDefault();
    });

    gameManager = new GameManager();
};

window.draw = () => {
    gameManager.draw();
};

window.mousePressed = () => {
    gameManager.sceneManager.scene.mousePressed();
};

window.mouseReleased = () => {
    gameManager.sceneManager.scene.mouseReleased();
};


// why?
window.touchStarted = window.mousePressed;
window.touchEnded = window.mouseReleased;

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    gameManager.sceneManager.scene.windowResized();
}