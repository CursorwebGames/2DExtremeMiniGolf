import "p5";
import { Teleporter } from "./objects/teleporter";
import { Wall } from "./objects/wall";
import { PolygonWall } from "./objects/polygonWall";
import { Ice } from "./objects/ice";
import { Bouncer } from "./objects/bouncer";

export function genLevels() {
    return [
        {
            mainb: [20, 20],
            hole: [200, height / 2 + 200],
            bounds: [],
            static: [
                new Teleporter(80, 80, 80, height - 100),
                new Wall(0, height / 2 - 50, width, 100)
            ],
            balls: [

            ]
        },
        {
            mainb: [200, 100],
            hole: [710, 117],
            bounds: [],
            static: [
                new PolygonWall([
                    [204, 153],
                    [102, 261],
                    [179, 383],
                    [362, 486],
                    [388, 329],
                    [380, 265],
                    [290, 278],
                    [234, 213],
                    [235, 161]
                ]),
                new PolygonWall([
                    [275, 113],
                    [296, 179],
                    [376, 193],
                    [495, 176],
                    [500, 248],
                    [470, 329],
                    [448, 383],
                    [496, 421],
                    [563, 430],
                    [620, 326],
                    [650, 221],
                    [632, 103],
                    [554, 49],
                    [410, 20],
                    [304, 45]
                ]),
                new PolygonWall([
                    [407, 450],
                    [405, 557],
                    [500, 478]
                ]),
                new PolygonWall([
                    [144, 523],
                    [214, 624],
                    [420, 645],
                    [631, 589],
                    [719, 469],
                    [726, 329],
                    [726, 226],
                    [782, 212],
                    [860, 259],
                    [914, 329],
                    [914, 477],
                    [848, 579],
                    [736, 652],
                    [568, 707],
                    [384, 729],
                    [172, 721],
                    [37, 621]
                ])
            ],
            balls: []
        },
        {
            mainb: [0, 0],
            hole: [300, 300],
            bounds: [],
            static: [
                new Ice(0, 200, 300 - 50, 50),
                new Ice(200, 0, 50, 300 - 50),
            ],
            balls: [

            ]
        },
        {
            mainb: [0, 0],
            hole: [300, 300],
            bounds: [],
            static: [
                new Bouncer(80, 30, 30),
                new Bouncer(30, 80, 30),
            ],
            balls: [

            ]
        },
    ];
}