// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls

import p5 from "p5";
window.p5 = p5;

import { GameManager } from "./gameManager";

// do this because
// the downsides of vite glitches just aren't worth it
window.main = new GameManager();

window.setup = () => {
    const canvas = createCanvas(windowWidth, windowHeight);
    noStroke();

    canvas.elt.addEventListener("touchmove", e => {
        e.preventDefault();
    });

    main.init();
    main.generateLevel();
}

window.draw = () => {
    if (main.scene == "game") {
        main.draw();
    } else if (main.scene == "menu") {
        main.drawMenu();
    } else if (main.scene == "end") {
        main.drawEnd();
    }
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