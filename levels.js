function genLevels() {
    return [
        {
            mainb: [0, 0],
            hole: [-500, -500],
            bounds: [],
            static: [
                new PolygonWall([
                    [30, 30],
                    [80, 30],
                    [150, 90],
                    [100, 180],
                    [40, 170]
                ]),
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
                new Bouncer(80, 30, 30, 100),
                new Bouncer(30, 80, 30, 100),
            ],
            balls: [

            ]
        },
    ];
}