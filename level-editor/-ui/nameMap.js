/**
 * Name map is necessary because minification mangles class names
 */
import { Ball, Bouncer, Hole, Ice, PolygonWall, Sand, Slope, Teleporter, Wall, Water } from "../../src/objects";
import { MovingPlatform } from "../../src/objects/movingPlatform";

export const nameMap = {
    [Ball]: "Ball",
    [Bouncer]: "Bouncer",
    [Hole]: "Hole",
    [Ice]: "Ice",
    [PolygonWall]: "PolygonWall",
    [Sand]: "Sand",
    [Slope]: "Slope",
    [Teleporter]: "Teleporter",
    [Wall]: "Wall",
    [Water]: "Water",
    [MovingPlatform]: "MovingPlatform"
};