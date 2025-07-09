/**
 * Motivation: wrapper class to store ui components which can affect the object properties
 * The components themselves can be dragged and dropped
 */
/**
 * No gamemanager because this doesn't need to save game states ... it's a small subset of the game really
 */
import p5 from "p5";
import { EditorManager } from "./editorManager";
window.p5 = p5;

let editorManager: EditorManager;

window.setup = () => {
    noStroke();
    const canvas = createCanvas(0.8 * windowWidth, windowHeight).parent(document.querySelector(".canvas-content") as HTMLDivElement);
    canvas.mousePressed(mousePressed);
    canvas.mouseReleased(mouseReleased);
    canvas.mouseWheel(mouseWheel);

    const canvasElt = canvas.elt as HTMLCanvasElement;
    canvasElt.addEventListener("selectstart", e => e.preventDefault());
    canvasElt.addEventListener("contextmenu", e => e.preventDefault());
    canvasElt.addEventListener("wheel", e => e.preventDefault());
    canvasElt.addEventListener("mousedown", e => {
        if (e.button == 1) { // middle click
            e.preventDefault();
        }
    });

    editorManager = new EditorManager();
};

window.draw = () => {
    editorManager.draw();
};

function mousePressed() {
    editorManager.scene.mousePressed();
}

function mouseReleased() {
    editorManager.scene.mouseReleased();
}

window.mouseDragged = () => {
    editorManager.scene.mouseDragged();
};

// hack cuz @types/p5 uses object | WheelEvent fsr
function mouseWheel(e?: object) {
    editorManager.scene.mouseWheel(e as WheelEvent);
}

window.keyPressed = () => {
    editorManager.scene.keyPressed();
};

// window.onbeforeunload = () => {
//     return "Are you sure you want to leave?";
// };