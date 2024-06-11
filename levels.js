function genLevels() {
    return [
        {
            mainb: [0, 0],
            hole: [300, 300],
            bounds: [[0, 0], [900, 900]],
            static: [
                new Wall(50, 50, 30, 100),
            ],
            balls: [

            ]
        },
        {
            mainb: [0, 0],
            hole: [300, 300],
            bounds: [[0, 0], [500, 800]],
            static: [
                new Bouncer(80, 30, 30, 100),
                new Bouncer(30, 80, 30, 100),
            ],
            balls: [

            ]
        },
    ];
}