export function circCircCol(vec1: p5.Vector, r1: number, vec2: p5.Vector, r2: number) {
    return vec1.dist(vec2) <= r1 + r2;
}

export function circRectCol(cx: number, cy: number, r: number, rx: number, ry: number, rw: number, rh: number) {
    let testx, testy;

    // check if on left edge, then check collision left edge, etc
    if (cx < rx) testx = rx;
    else if (cx > rx + rw) testx = rx + rw;
    else testx = cx; // within the rect, so collide

    if (cy < ry) testy = ry;
    else if (cy > ry + rh) testy = ry + rh;
    else testy = cy;

    const distx = cx - testx;
    const disty = cy - testy;

    return Math.sqrt(distx ** 2 + disty ** 2) < r;
}

export function circLineCol(circPoint: p5.Vector, r: number, startPoint: p5.Vector, endPoint: p5.Vector) {
    // project circle onto line
    // then check if that point is on the line segment
    // and check if radius < r
    // https://en.wikipedia.org/wiki/Vector_projection

    const circVec = p5.Vector.sub(circPoint, startPoint);
    const lineVec = p5.Vector.sub(endPoint, startPoint);

    const projPoint = lineVec.setMag(circVec.dot(lineVec) / lineVec.mag()).add(startPoint);

    // increase length by r for leftmost and rightmost points
    if (projPoint.dist(startPoint) + projPoint.dist(endPoint) > startPoint.dist(endPoint) + r) {
        return false;
    }

    if (projPoint.dist(circPoint) < r) {
        return projPoint;
    } else {
        return false;
    }
}

/** All properties are optional because `let { projPoint } = false;` means `projPoint` is `undefined` */
export type CircPolyColResult = {
    /**
     * Where on the edge of the polygon the center of the circle collided with
     */
    projPoint?: p5.Vector;

    /**
     * The specific edge of the polygon that the circle collided with
     */
    edge?: p5.Vector;
};

export type MaybeCircPolyColResult = false | CircPolyColResult;

export function circPolyCol(circPoint: p5.Vector, r: number, points: PointArr): MaybeCircPolyColResult {
    for (let i = 0; i < points.length; i++) {
        const n = (i + 1) % points.length;

        const start = createVector(...points[i]);
        const end = createVector(...points[n]);

        const projPoint = circLineCol(circPoint, r, start, end);
        if (projPoint) {
            return { projPoint, edge: p5.Vector.sub(end, start) };
        }
    }

    return false;
}

/** 
 * check if the point is actually in the polygon
 * as circPolyCol only checks edges
 */
export function pointPolyCol(point: p5.Vector, points: PointArr) {
    let collide = false;

    const px = point.x;
    const py = point.y;

    for (let i = 0; i < points.length; i++) {
        const n = (i + 1) % points.length;

        const start = createVector(...points[i]);
        const end = createVector(...points[n]);

        // bro literally no one knows what this thing does LOL
        if (((start.y >= py && end.y < py) || (start.y < py && end.y >= py)) &&
            (px < (end.x - start.x) * (py - start.y) / (end.y - start.y) + start.x)) {
            collide = !collide;
        }

    }

    return collide;
}

export function pointRectCol(px: number, py: number, x: number, y: number, w: number, h: number) {
    return px >= x && py >= y && px <= x + w && py <= y + h;
}