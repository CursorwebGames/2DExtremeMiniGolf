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

/** Maps String to Class */
const staticObjMap = {
    Bouncer,
    Ice,
    PolygonWall,
    Sand,
    Slope,
    Teleporter,
    Wall,
    Water
};


type StaticObjData = {
    // ["Bouncer", [x: int, y: int]]
    [K in keyof typeof staticObjMap]: [K, ConstructorParameters<typeof staticObjMap[K]>]
}[keyof typeof staticObjMap];

export interface LevelData {
    ball: [number, number],
    hole: [number, number],
    obstacles: StaticObjData[],
    bounds: PointArr,
    guideText: string,
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
    const cls = staticObjMap[className] as new (...params: any[]) => Obstacle;
    return new cls(...params);
}