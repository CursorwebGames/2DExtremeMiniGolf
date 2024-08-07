// motivation: wrapper class to store ui components which can affect the object properties
// the components themselves can be dragged and dropped
import p5 from "p5";
window.p5 = p5;

import { EditorManager, EditorPlayer } from "./editorManager";
import "./htmlUIBuilder";

window.mousex = undefined;
window.mousey = undefined;

window.main = new EditorManager();

window.setup = () => {
    noStroke();
    const canvas = createCanvas(0.8 * windowWidth, windowHeight).parent(document.querySelector(".canvas-content"));
    canvas.mousePressed(mousePressed);
    canvas.mouseClicked(mouseClicked);
    canvas.mouseWheel(mouseWheel);
    canvas.elt.addEventListener("selectstart", e => e.preventDefault());
    canvas.elt.addEventListener("contextmenu", e => e.preventDefault());
    canvas.elt.addEventListener("wheel", e => e.preventDefault());
    canvas.elt.addEventListener("mousedown", e => {
        if (e.button == 1) { // middle click
            e.preventDefault();
        }
    });
    main.init();
}

window.draw = () => {
    push();
    main.draw();
    pop();

    if (main.selectedPolygon) {
        fill(0);
        textAlign(CENTER);
        textSize(20);
        text("Left click to add vertex, Right click to remove vertex\nEsc to finish", width / 2, 30);
    }
}

// todo: move into editorManager?
function mousePressed() {
    if (main instanceof EditorPlayer) {
        return;
    }

    // camera logic
    if (mouseButton == CENTER) {
        main.camera.beginMove();
    }


    // polygon logic
    if (!main.selectedPolygon) {
        return;
    }

    let poly = main.selectedPolygon;

    if (mouseButton == LEFT) {
        poly.addPoint(mousePos.x, mousePos.y);
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
}

function mouseClicked() {
    if (main instanceof EditorPlayer) {
        const vec = p5.Vector.sub(createVector(mousex, mousey), main.mainb.pos).div(32);
        main.mainb.vel = vec;
    }
}

window.keyPressed = () => {
    if (main.selectedPolygon && key == "Escape") {
        main.selectedPolygon = null;
    }
}

window.mouseReleased = () => {
    if (main instanceof EditorPlayer) {
        return;
    }

    main.hasSelected = false;
    main.camera.endMove();
}

function mouseWheel(e) {
    main.camera.changeScale(e.deltaY);
}

// todo
document.querySelector(".play-btn").addEventListener("click", () => {
    if (main instanceof EditorPlayer) {
        main.reset();
    } else {
        main.playMode();
    }
});

document.querySelector(".edit-bound-btn").addEventListener("click", () => {
    main.selectedPolygon = main.levelBounds;
});

document.querySelector(".export-btn").addEventListener("click", () => {
    let staticObjs = "";

    for (const obj of main.staticObjs) {
        staticObjs += obj.export() + ",\n";
    }

    let out = `{
mainb: [${main.mainb.knot}],
hole: [${main.hole.knot}],
static: [${staticObjs}],
balls: [],
bounds: ${main.levelBounds.export()},
}`;

    document.querySelector(".export-text").value = out;
});

document.querySelector(".copy-export-btn").addEventListener("click", async () => {
    const text = document.querySelector(".export-text").value;
    await navigator.clipboard.writeText(text);

    document.querySelector(".copy-export-btn").textContent = "Copied!";

    setTimeout(() => {
        document.querySelector(".copy-export-btn").textContent = "Copy";
    }, 1000);
});

window.onbeforeunload = () => {
    return 'Are you sure you want to leave?';
};