import levelsJSON from "./levelData.json";

export interface Level {
    ball: [number, number],
    hole: [number, number],
    staticObjs: {}[], // todo
    bounds: PointArr,
    text: string,
    par: number
}

const levels = levelsJSON as unknown as Level[];

export function getLevel(idx: number) {
    if (idx >= levels.length) {
        return null;
    }

    return levels[idx];
}