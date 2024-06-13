export function circCircCol(vec1: p5.Vector, r1: number, vec2: p5.Vector, r2: number) {
    return vec1.dist(vec2) <= r1 + r2;
}

export function circRectCol(cx: number, cy: number, r: number, rx: number, ry: number, rw: any, rh: any) {
    let testx: number, testy: number;

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

export function circPolyCol(circPoint: p5.Vector, r: number, points: [number, number][]) {
    for (let i = 0; i < points.length; i++) {
        const n = (i + 1) % points.length;

        const start = createVector(...points[i]);
        const end = createVector(...points[n]);

        const res = circLineCol(circPoint, r, start, end);
        if (res) {
            return res;
        }
    }

    return false;
}