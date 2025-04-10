class Magicer { constructor(...args) { this.args = args; } }

class Bouncer extends Magicer { }
class Ice extends Magicer { }
class PolygonWall extends Magicer { }
class Sand extends Magicer { }
class Slope extends Magicer { }
class Teleporter extends Magicer { }
class Wall extends Magicer { }
class Water extends Magicer { }


function createVector(x, y) { return [x, y]; }



const items = [{
    mainb: [80, 80],
    hole: [509, 354],
    static: [new Ice(0, 225, 699, 56),
    new Slope(378, 22, 104, 184, createVector(0, 1)),
    ],
    balls: [],
    bounds: [[0, 0], [700, 0], [700, 400], [0, 400]],
    text: "Ice breaks when you touch it",
    par: 2
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
    par: 2,
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
    par: 7
},
{
    mainb: [-25, 54],
    hole: [541, 698],
    static: [new PolygonWall([[373, 683], [485, 705], [377, 749], [327, 712], [366, 557]]),
    new Slope(112, 247, 181, 140, createVector(0, 1)),
    ],
    balls: [],
    bounds: [[-100, 0], [300, 0], [300, 400], [500, 600], [700, 600], [600, 800], [300, 800], [300, 600], [100, 400], [100, 200], [-100, 200]],
    par: 3
},
{
    mainb: [240, 108],
    hole: [396, 553],
    static: [new PolygonWall([[356, 390], [395, 471], [430, 388], [523, 379], [455, 317], [467, 234], [390, 274], [310, 235], [330, 320], [254, 367]]),
    new Bouncer(391, 131),
    new Bouncer(208, 266),
    new Bouncer(260, 503),
    new Bouncer(540, 497),
    new Bouncer(565, 234),
    ],
    balls: [],
    bounds: [[150, 0], [500, 0], [650, 150], [650, 600], [150, 600]],
    par: 5
},
{
    mainb: [70, 705],
    hole: [505, 269],
    static: [new Water([[546, 250], [543, 741], [56, 740]]),
    ],
    balls: [],
    bounds: [[550, 200], [550, 750], [0, 750]],
    text: "Don't touch the water!",
    par: 2
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
    par: 5,
},
{
    mainb: [61, 195],
    hole: [956, 55],
    static: [new Bouncer(235, 56),
    new Bouncer(398, 186),
    new Bouncer(595, 58),
    new Bouncer(783, 187),
    ],
    balls: [],
    bounds: [[0, 0], [1050, 0], [1050, 250], [0, 250]],
    par: 4
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
    par: 2
},
{
    mainb: [69, 162],
    hole: [1218, 113],
    static: [],
    balls: [],
    bounds: [[50, 0], [150, 150], [250, 0], [350, 150], [450, 0], [550, 150], [650, 0], [750, 150], [850, 0], [950, 150], [1050, 0], [1150, 150], [1250, 0], [1250, 150], [1150, 300], [1050, 150], [950, 300], [850, 150], [750, 300], [650, 150], [550, 300], [450, 150], [350, 300], [250, 150], [150, 300], [50, 200]],
    par: 6
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
    par: 4,
},
{
    mainb: [80, 80],
    hole: [391, 63],
    static: [
        new Sand([[243, 17], [134, 12], [121, 59], [149, 97], [202, 128], [281, 84], [311, 34]]),
    ],
    balls: [],
    bounds: [[0, 0], [526, -2], [528, 168], [3, 177]],
    par: 2
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
    par: 5,
},
{
    mainb: [95, 145],
    hole: [280, 479],
    static: [new Wall(4, 346, 195, 48),
    new Teleporter(167, 437, 99, 230),
    new Water([[22, 440], [73, 429], [101, 512], [17, 543]]),
    new Bouncer(176, 622),
    ],
    balls: [],
    bounds: [[0, 100], [200, 100], [200, 400], [400, 400], [400, 700], [0, 700]],
    par: 3,
},
{
    mainb: [80, 80],
    hole: [1149, 666],
    static: [
        new Sand([[1032, 198], [981, 252], [720, 248], [602, 264], [529, 242], [490, 100], [626, 150], [989, 56]]),
        new Sand([[1109, 448], [1093, 349], [677, 476], [733, 676]]),
        new Water([[544, 485], [53, 436], [83, 708], [534, 679]]),
        new Bouncer(220, 108),
        new Ice(928, 621, 164, 62),
        new Ice(1099, 515, 120, 94),
        new Ice(1003, 555, 92, 62),
        new Teleporter(482, 363, 28, 33),
        new Wall(620, 296, 621, 31),
        new Wall(617, 411, 28, 329),
        new Slope(312, 16, 134, 311, createVector(1, 0)),
    ],
    balls: [],
    bounds: [[0, 0], [1250, 0], [1250, 750], [0, 750]],
    par: 7,
},
{
    mainb: [58, 60],
    hole: [441, 364],
    static: [new Water([[438, 78], [379, -66], [209, -14]]),
    new Bouncer(274, 128),
    new Bouncer(284, 306),
    new Sand([[55, 312], [30, 518], [204, 448], [159, 346]]),
    new Bouncer(125, 205),
    new PolygonWall([[251, 171], [251, 241], [193, 207]]),
    ],
    balls: [],
    bounds: [[0, 0], [400, -100], [600, 350], [0, 600]],
    par: 3,
},
{
    mainb: [149, 100],
    hole: [998, 102],
    static: [new PolygonWall([[63, 219], [25, 295], [19, 378], [99, 372], [251, 285], [121, 274]]),
    new PolygonWall([[267, 127], [287, 239], [253, 168], [186, 164]]),
    new PolygonWall([[167, 504], [145, 379], [93, 475], [158, 556], [284, 581]]),
    new Slope(301, 439, 547, 233, createVector(1, 0)),
    new PolygonWall([[914, 340], [910, 386], [958, 430], [950, 355], [1004, 317]]),
    new PolygonWall([[1055, 266], [1074, 368], [1014, 407], [1122, 382]]),
    new PolygonWall([[900, 153], [1046, 188], [943, 202], [932, 312]]),
    ],
    balls: [],
    bounds: [[0, 0], [300, 0], [300, 400], [850, 400], [850, 0], [1150, 0], [1150, 450], [850, 750], [300, 750], [0, 450]],
    par: 6,
}];

/*
{
    mainb: [80, 80],
    hole: [509, 354],
    static: [new Ice(0, 225, 699, 56),
    new Slope(378, 22, 104, 184, createVector(0, 1)),
    ],
    balls: [],
    bounds: [[0, 0], [700, 0], [700, 400], [0, 400]],
    text: "Ice breaks when you touch it",
    par: 2
} 
*/
/*
{
    "ball": [48, 45],
    "hole": [297, 310],
    "obstacles": [],
    "bounds": [[0, 0], [200, 0], [400, 100], [400, 400], [200, 400], [200, 200], [0, 200]],
    "text": "Pull back and release",
    "par": 2
},
*/

let output = [];

for (const { mainb, hole, static, balls, bounds, text, par } of items) {
    output += `,
    {
        "ball": ${JSON.stringify(mainb)},
        "hole": ${JSON.stringify(hole)},
        "obstacles": [${static.map(x =>
        JSON.stringify([x.constructor.name, x.args])
    ).join(", ")}],
        "bounds": ${JSON.stringify(bounds)},${text ? `\n"text": "${text}",` : ""}
        "par": ${par}
    }`;
}

console.log(output);