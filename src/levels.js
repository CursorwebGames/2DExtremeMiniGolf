import { Sand, PolygonWall, Wall, Water, Teleporter, Ice, Bouncer, Slope } from "./objects";

export function genLevels() {
    return [
        {
            mainb: [48, 45],
            hole: [297, 310],
            static: [],
            balls: [],
            bounds: [[0, 0], [200, 0], [400, 100], [400, 400], [200, 400], [200, 200], [0, 200]],
        },
        {
            mainb: [165, 182],
            hole: [989, 82],
            static: [new Wall(498, 1, 226, 299), new Teleporter(882, 172, 340, 181),],
            balls: [], bounds: [[0, 0], [1200, 0], [1200, 300], [0, 300]],
        },
        {
            mainb: [80, 80],
            hole: [509, 354],
            static: [new Ice(0, 225, 699, 56),
            new Slope(378, 22, 104, 184, createVector(0, 1)),
            ],
            balls: [],
            bounds: [[0, 0], [700, 0], [700, 400], [0, 400]],
        },
        {
            mainb: [666, 160],
            hole: [691, 757],
            static: [
                new Bouncer(377, 282),
                new Bouncer(446, 377),
                new Bouncer(510, 471),
                new Bouncer(597, 368),
                new Bouncer(516, 271),
                new Bouncer(602, 565),
                new Bouncer(681, 467),
                new Bouncer(834, 465),
                new Bouncer(749, 559),
                new Bouncer(675, 664),
                new Bouncer(741, 364),
                new Bouncer(865, 360),
                new Bouncer(670, 272),
                new Bouncer(808, 259),
                new Bouncer(935, 245),
                new Slope(174, 13, 897, 92, createVector(0, 1)),
            ],
            balls: [],
            bounds: [[1100, 0], [100, 0], [700, 900]],
        },
        {
            mainb: [80, 80],
            hole: [391, 63],
            static: [
                new Sand([[243, 17], [134, 12], [121, 59], [149, 97], [202, 128], [281, 84], [311, 34]]),
            ],
            balls: [],
            bounds: [[0, 0], [526, -2], [528, 168], [3, 177]],
        },
        {
            mainb: [58, -847],
            hole: [594, 186],
            static: [
                new Slope(444, -494, 323, 488, createVector(0, 1)),
                new Bouncer(175, -646),
                new Bouncer(423, -846),
                new Bouncer(705, -638),
                new Bouncer(828, -772),
                new PolygonWall([
                    [251, -795],
                    [302, -559],
                    [522, -646],
                    [570, -539],
                    [647, -759],
                    [379, -661]
                ]),
                new Water([
                    [268, 85],
                    [405, 145],
                    [401, 50]
                ]),
                new Water([
                    [819, 41],
                    [953, 35],
                    [856, 148]
                ]),
                new PolygonWall([
                    [973, -821],
                    [997, -779],
                    [991, -706],
                    [968, -664],
                    [889, -597],
                    [827, -665],
                    [903, -691],
                    [953, -758],
                    [892, -830],
                    [799, -845],
                    [926, -848]
                ]),
            ],
            balls: [],
            bounds: [
                [0, 0],
                [400, 0],
                [400, -500],
                [200, -500],
                [0, -700],
                [0, -900],
                [500, -900],
                [1100, -900],
                [1100, -700],
                [800, -500],
                [800, 0],
                [1200, 0],
                [600, 300]
            ],
        }
    ];
}