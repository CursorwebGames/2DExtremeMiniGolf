import { Bouncer, Ice, PolygonWall, Sand, Slope, Teleporter, Wall, Water } from "../src/objects";
import { htmlSlopeUI, htmlUIRenderer } from "./htmlObjUI";
import { PolygonUI } from "./ui/polygonUI";
import { RectUI } from "./ui/rectUI";
import { SingleUI } from "./ui/singleUI";
import { TeleporterUI } from "./ui/teleporterUI";

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
        render: htmlSlopeUI,
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
    {
        name: "Teleporter",
        create: (x, y) => new TeleporterUI(new Teleporter(x, y, x, y)),
    }
];

const templateEl = document.querySelector(".object-template");
const objectsList = document.querySelector(".objects-list");

for (const template of objTemplates) {
    const btn = document.createElement("button");
    btn.textContent = template.name;

    btn.addEventListener("click", () => {
        const obj = template.create(width / 2, height / 2);
        main.staticObjs.push(obj);

        console.log(obj)
        const renderer = template.render || htmlUIRenderer;
        const el = renderer(obj, template.name);
        objectsList.append(el);
    });

    templateEl.append(btn);
}