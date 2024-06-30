import { Bouncer, Ice, PolygonWall, Sand, Slope, Wall, Water } from "../src/objects";
import { PolygonUI } from "./ui/polygonUI";
import { RectUI } from "./ui/rectUI";
import { SingleUI } from "./ui/singleUI";

const objTemplates = [
    {
        name: "Square Wall",
        create: (x, y) => new RectUI(new Wall(x, y, 30, 30)),
    },
    {
        name: "Ice",
        create: (x, y) => new RectUI(new Ice(x, y, 30, 30)),
    },
    {
        name: "Bouncer",
        create: (x, y) => new SingleUI(new Bouncer(x, y)),
    },
    {
        name: "Slope",
        create: (x, y) => new RectUI(new Slope(x, y, 30, 30, createVector(1, 0))),
    },
    {
        name: "Polygon Wall",
        create: () => {
            const ui = new PolygonUI(new PolygonWall([]));
            main.selectedPolygon = ui;
            return ui;
        },
    },
    {
        name: "Water",
        create: () => {
            const ui = new PolygonUI(new Water([]));
            main.selectedPolygon = ui;
            return ui;
        },
    },
    {
        name: "Sand",
        create: () => {
            const ui = new PolygonUI(new Sand([]));
            main.selectedPolygon = ui;
            return ui;
        },
    },
];

const templateEl = document.querySelector(".object-template");

for (const obj of objTemplates) {
    const btn = document.createElement("button");
    btn.textContent = obj.name;

    btn.addEventListener("click", () => {
        const objUI = obj.create(width / 2, height / 2);
        main.staticObjs.push(objUI);
    });

    templateEl.append(btn);
}