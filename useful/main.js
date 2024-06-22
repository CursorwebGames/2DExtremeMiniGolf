// wrapper class to store ui components which can affect the object properties
// components themselves can be dragged and dropped
import p5 from "p5";
window.p5 = p5;

import { Editor } from "./editor";

// once camera added, remove
window.mousex = undefined;
window.mousey = undefined;

window.main = new Editor();

window.setup = () => {
    noStroke();
    createCanvas(900, 900).parent(document.querySelector(".canvas-content"));
    main.init();
}

window.draw = () => {
    window.mousePos = createVector(mouseX, mouseY);
    main.draw();
}

window.mouseReleased = () => {
    main.hasSelected = false;
}
