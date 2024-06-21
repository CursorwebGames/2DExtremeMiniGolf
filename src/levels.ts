import "p5";
import { Teleporter } from "./objects/teleporter";
import { Wall } from "./objects/wall";
import { PolygonWall } from "./objects/polygonWall";
import { Ice } from "./objects/ice";
import { Bouncer } from "./objects/bouncer";

export function genLevels() {
    return [
        {
            mainb: [505, 428],
            hole: [948, 416],
            static: [new Sand([
                [453, 295],
                [635, 363],
                [588, 523],
                [376, 618],
                [506, 669],
                [692, 617],
                [778, 507],
                [789, 385],
                [761, 235],
                [627, 162],
                [488, 161]
            ])],
            balls: [],
            bounds: [
                [80, 279],
                [545, 46],
                [1240, 344],
                [1210, 850],
                [170, 797]
            ]
        },
        {
            mainb: [110, 90],
            hole: [820, 570],
            static: [new PolygonWall([
                [313, 261],
                [452, 292],
                [479, 416],
                [387, 519],
                [255, 470],
                [232, 353]
            ]), new PolygonWall([
                [824, 261],
                [722, 305],
                [729, 416],
                [780, 522],
                [952, 474],
                [978, 345]
            ])],
            balls: []
        },
        {
            mainb: [110, 90],
            hole: [820, 570],
            static: [
                new Water([
                    [450, 228],
                    [378, 269],
                    [358, 453],
                    [620, 498],
                    [623, 328]
                ]), new PolygonWall([
                    [243, 402],
                    [261, 563],
                    [418, 629],
                    [233, 679],
                    [135, 504]
                ]),
            ],
            balls: []
        },
        {
            mainb: [20, 20],
            hole: [200, height / 2 + 200],
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
            bounds: [[-120, -120], [width / 2, -250], [width + 130, 0], [width + 280, height / 2], [width, height], [width / 2, height + 130], [0, height]],
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
            mainb: [30, 30],
            hole: [300, 300],
            static: [
                new Ice(0, 200, 300 - 50, 50),
                new Ice(200, 0, 50, 300 - 50),
            ],
            balls: [

            ]
        },
        {
            mainb: [30, 30],
            hole: [300, 300],
            static: [
                new Bouncer(80, 30, 30),
                new Bouncer(30, 80, 30),
            ],
            balls: [

            ]
        },
    ];
}