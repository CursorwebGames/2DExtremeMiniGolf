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
}

window.draw = () => {
    main.draw();
}

window.mouseClicked = () => {
    const vec = p5.Vector.sub(createVector(mousex, mousey), main.mainb.pos).div(32);
    main.mainb.vel = vec;
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}