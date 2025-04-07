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


// todo: into the mainb
window.mousePressed = () => {
    if (main.scene == "game") {
        if (main.mainb.inHole || main.mainb.vel.mag() != 0) return;
        main.mainb.dragOrigin = createVector(mouseX, mouseY);
    }
}

window.mouseReleased = () => {
    if (main.scene == "menu") {
        if (sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2) < 100) {
            main.transition.begin();
        }
    }

    if (main.scene == "game") {
        const vec = main.mainb.getDir().div(30);
        main.mainb.dragOrigin = null;

        if (main.mainb.vel.mag() != 0) return;
        main.mainb.vel = vec;
        main.strokes++;
        main.totalStrokes++;
    }
}

// why?
window.touchStarted = window.mousePressed;
window.touchEnded = window.mouseReleased;

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}