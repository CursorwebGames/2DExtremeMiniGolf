/**
 * Name map is necessary because minification mangles class names
 */
import { nameToObj } from "../../src/levels/levels";

/**
 * `[mangled class name] => Bouncer`
 */
export const objToName: Record<string, keyof typeof nameToObj> = Object.fromEntries(
    Object.entries(nameToObj).map(([k, v]) => [v.name, k as keyof typeof nameToObj])
);
