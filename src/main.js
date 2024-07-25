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
    createCanvas(windowWidth, windowHeight);
    noStroke();

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

window.mouseClicked = () => {
    if (main.scene == "menu") {
        if (sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2) < 100) {
            main.transition.begin();
        }
    }
    if (main.scene == "game") {
        if (main.mainb.vel.mag() != 0) return;
        const vec = p5.Vector.sub(createVector(mousex, mousey), main.mainb.pos).div(32);
        main.mainb.vel = vec;
        main.strokes++;
        main.totalStrokes++;
    }
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}