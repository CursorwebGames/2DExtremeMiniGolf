import p5 from "p5";
window.p5 = p5;

window.setup = () => {
    const canvas = createCanvas(windowWidth, windowHeight);
    noStroke();

    (canvas.elt as HTMLCanvasElement).addEventListener("touchmove", e => {
        e.preventDefault();
    });
}

window.draw = () => {
    background(255, 0, 0);
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}