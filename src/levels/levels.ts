import levelsJSON from "./levelData.json";
import { Wall } from "../objects/wall";
import { Bouncer } from "../objects/bouncer";
import { Ice } from "../objects/ice";
import { PolygonWall } from "../objects/polygonWall";
import { Sand } from "../objects/sand";
import { Slope } from "../objects/slope";
import { Teleporter } from "../objects/teleporter";
import { Water } from "../objects/water";
import { Obstacle } from "../objects/obstacle";

/**
 * Maps String to Class
 * `[Bouncer] => mangled class object`
 */
// *clever* abuse of syntax: Bouncer (as the key) is the string, but Bouncer (as the value) is a class!
export const nameToObj = {
    Bouncer,
    Ice,
    PolygonWall,
    Sand,
    Slope,
    Teleporter,
    Wall,
    Water
};

/**
 * Creates an "array"-like constructor call, e.g.
 * ```js
 * ["Bouncer", [5, 6]],
 * ["PolygonWall", [[10, 20], [30, 40]]]
 * ```
 */
export type StaticObjData = [keyof typeof nameToObj, (number | PointArr | [number, number])[]];

export interface LevelData {
    ball: [number, number],
    hole: [number, number],
    obstacles: StaticObjData[],
    bounds: PointArr,
    guideText?: string,
    par: number
}

const levels = levelsJSON as unknown as LevelData[];

export function levelExists(idx: number) {
    return idx < levels.length;
}

export function getLevel(idx: number) {
    return levels[idx];
}

export function levelToObject(obj: StaticObjData) {
    const [className, params] = obj;

    // TODO: ask stack overflow for help
    const Cls = nameToObj[className] as new (...p: typeof params) => Obstacle;
    return new Cls(...params);
}