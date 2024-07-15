import { Sand, PolygonWall, Wall, Water, Teleporter, Ice, Bouncer } from "./objects";

export function genLevels() {
    return [
        {
            mainb: [80, 80],
            hole: [391.2800612794955, 63.499999046325684],
            static: [new Sand([[243.62552216523315, 17.428570474897114], [134.89321948012318, 12.428570474897114], [121.14545707166101, 59.928570474897114], [149.89077847117278, 97.42857047489711], [202.38223493984654, 128.67857047489713], [281.1194196428572, 84.92857047489711], [311.1145376249566, 34.928570474897114]]),],
            balls: [],
            bounds: [[0, 0], [526.2580921989422, -2.7500009536743164], [528.7576853641172, 168.49999904632568], [3.1401100996744624, 177.24999904632568]],
        }
    ];
}