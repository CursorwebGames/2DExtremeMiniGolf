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
            mainb: [49, 48],
            hole: [66, 1069],
            static: [new Slope(42, 182, 124, 137, createVector(0, 1)),
            new Slope(313, 437, 249, 115, createVector(1, 0)),
            new Slope(738, 688, 122, 228, createVector(0, 1)),
            new Slope(215, 1037, 336, 128, createVector(-1, 0)),
            ],
            balls: [],
            bounds: [[0, 0], [200, 0], [200, 400], [700, 400], [900, 600], [900, 1000], [700, 1200], [0, 1200], [0, 1000], [700, 1000], [700, 600], [200, 600], [0, 400]],
        },
        {
            mainb: [406, 43],
            hole: [406, 711],
            static: [new Bouncer(128, 197),
            new Bouncer(574, 102),
            new Bouncer(345, 318),
            new Bouncer(116, 541),
            new Bouncer(504, 669),
            new Sand([[257, 127], [406, 291], [543, 52]]),
            new Sand([[344, 504], [206, 450], [36, 495], [69, 257], [273, 243]]),
            new Sand([[742, 188], [637, 242], [515, 212], [491, 363], [584, 488], [752, 352]]),
            new Sand([[385, 467], [480, 440], [537, 514], [514, 601], [371, 668], [418, 549]]),
            new Sand([[286, 556], [170, 617], [53, 599], [66, 724], [263, 710]]),
            new Bouncer(433, 390),
            new Bouncer(665, 171),
            new Bouncer(188, 68),
            new Bouncer(745, 430),
            new Bouncer(237, 522),
            new Bouncer(341, 607),
            new Bouncer(658, 499),
            new Bouncer(591, 581),
            ],
            balls: [],
            bounds: [[0, 0], [800, 0], [800, 550], [550, 750], [0, 750]],
        },
        {
            mainb: [-25, 54],
            hole: [541, 698],
            static: [new PolygonWall([[373, 683], [485, 705], [377, 749], [327, 712], [366, 557]]),
            new Slope(112, 247, 181, 140, createVector(0, 1)),
            ],
            balls: [],
            bounds: [[-100, 0], [300, 0], [300, 400], [500, 600], [700, 600], [600, 800], [300, 800], [300, 600], [100, 400], [100, 200], [-100, 200]],
        },
        {
            mainb: [80, 80],
            hole: [762, 743],
            static: [new PolygonWall([[342, 411], [411, 471], [323, 477], [285, 552], [258, 477], [150, 460], [237, 420], [214, 330], [285, 370], [370, 330]]),
            new Bouncer(78, 382),
            new Bouncer(296, 261),
            new Bouncer(469, 451),
            new Bouncer(371, 537),
            new Bouncer(110, 517),
            new Bouncer(434, 348),
            new Bouncer(165, 283),
            ],
            balls: [],
            bounds: [[0, 0], [300, 0], [300, 200], [400, 200], [800, 600], [800, 800], [700, 800], [700, 600], [100, 600], [-200, 300], [0, 300]],
        },
        {
            mainb: [399, 152],
            hole: [805, 150],
            static: [new Ice(335, 2, 28, 296),
            new Ice(437, 4, 29, 295),
            new Ice(487, 3, 25, 297),
            new Ice(286, 4, 28, 293),
            new Ice(232, 0, 31, 303),
            new Ice(182, 2, 37, 299),
            new Ice(137, 2, 31, 301),
            new Ice(532, 3, 33, 299),
            new Ice(579, 3, 34, 296),
            new Ice(633, 3, 34, 296),
            ],
            balls: [],
            bounds: [[0, 0], [750, 0], [750, 100], [850, 100], [850, 200], [750, 200], [750, 300], [0, 300]],
        },
        {
            mainb: [80, 80],
            hole: [700, 700],
            static: [new Wall(133, 2, 52, 648),
            new Wall(268, 104, 65, 640),
            new Wall(435, 7, 65, 625),
            new Wall(589, 138, 59, 612),
            new Slope(81, 662, 105, 75, createVector(1, 0)),
            new Slope(209, 7, 121, 84, createVector(1, 0)),
            new Slope(351, 654, 154, 82, createVector(1, 0)),
            new Slope(524, 12, 118, 108, createVector(1, 0)),
            new Slope(703, 346, 38, 137, createVector(0, 1)),
            ],
            balls: [],
            bounds: [[50, 0], [750, 0], [750, 750], [50, 750]],
        },
        {
            mainb: [26, 166],
            hole: [197, 657],
            static: [new Teleporter(720, 188, 92, 177),
            new Teleporter(89, 317, 728, 327),
            new Teleporter(730, 473, 92, 454),
            new Teleporter(89, 596, 729, 601),
            new PolygonWall([[35, 610], [35, 715], [143, 716]]),
            new Slope(68, 9, 41, 119, createVector(0, 1)),
            new Wall(2, 520, 700, 42),
            ],
            balls: [],
            bounds: [[0, 0], [800, 0], [800, 750], [0, 750]],
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
