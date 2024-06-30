// wrapper class to store ui components which can affect the object properties
// components themselves can be dragged and dropped
import p5 from "p5";
window.p5 = p5;

import { EditorManager } from "./editorManager";
import "./htmlUIBuilder";

// once camera added, remove
window.mousex = undefined;
window.mousey = undefined;

window.main = new EditorManager();

window.setup = () => {
    noStroke();
    const canvas = createCanvas(0.8 * windowWidth, windowHeight).parent(document.querySelector(".canvas-content"));
    canvas.mousePressed(mousePressed);
    canvas.elt.addEventListener("contextmenu", e => e.preventDefault());
    main.init();
}

window.draw = () => {
    window.mousePos = createVector(mouseX, mouseY);
    main.draw();

    if (main.selectedPolygon) {
        fill(0);
        textAlign(CENTER);
        textSize(20);
        text("Left click to add vertex, Right click to remove vertex\nEsc to finish", width / 2, 30);
    }
}

// todo: move into editorManager?
function mousePressed() {
    if (!main.selectedPolygon) {
        return;
    }

    let poly = main.selectedPolygon;

    if (mouseButton == LEFT) {
        poly.addPoint(mouseX, mouseY);
    } else if (mouseButton == RIGHT) {
        for (let i = poly.knots.length - 1; i >= 0; i--) {
            const knot = poly.knots[i];
            // this so lazy lmao
            if (knot.check()) {
                poly.knots.splice(i, 1);
                poly.update();
                break;
            }
        }
    }

    return false;
}

window.keyPressed = () => {
    if (main.selectedPolygon && key == 'Escape') {
        main.selectedPolygon = null;
    }
}

window.mouseReleased = () => {
    main.hasSelected = false;
}
