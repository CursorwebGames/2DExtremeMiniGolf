/**
 * Name map is necessary because minification mangles class names
 */
import { staticObjMap } from "../../src/levels/levels";

/**
 * `[mangled class name] => Bouncer`
 */
export const nameMap: Record<string, keyof typeof staticObjMap> = Object.fromEntries(
    Object.entries(staticObjMap).map(([k, v]) => [v.name, k as keyof typeof staticObjMap])
);
