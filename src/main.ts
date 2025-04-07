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
}

window.draw = () => {
    background(255, 0, 0);
}


// why?
window.touchStarted = window.mousePressed;
window.touchEnded = window.mouseReleased;

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}