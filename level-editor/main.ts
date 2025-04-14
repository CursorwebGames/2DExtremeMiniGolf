/**
 * Motivation: wrapper class to store ui components which can affect the object properties
 * The components themselves can be dragged and dropped
 */
/**
 * No gamemanager because this doesn't need to save game states ... it's a small subset of the game really
 */
import p5 from "p5";
window.p5 = p5;

window.setup = () => {
    noStroke();
    const canvas = createCanvas(0.8 * windowWidth, windowHeight).parent(document.querySelector(".canvas-content") as HTMLDivElement);
    canvas.mousePressed(mousePressed);
    canvas.mouseClicked(mouseClicked);
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
};