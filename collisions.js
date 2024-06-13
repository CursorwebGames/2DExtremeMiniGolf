function circCircCol(vec1, r1, vec2, r2) {
    return vec1.dist(vec2) <= r1 + r2;
}

function circRectCol(cx, cy, r, rx, ry, rw, rh) {
    let testx, testy;

    // check if on left edge, then check collision left edge, etc
    if (cx < rx) testx = rx;
    else if (cx > rx + rw) testx = rx + rw;
    else testx = cx; // within the rect, so collide

    if (cy < ry) testy = ry;
    else if (cy > ry + rh) testy = ry + rh;
    else testy = cy;

    let distx = cx - testx;
    let disty = cy - testy;

    return Math.sqrt(distx ** 2 + disty ** 2) < r;
}

function circLineCol(cx, cy, r, x1, y1, x2, y2) {
    // project circle onto line
    // then check if that point is on the line segment
    // and check if radius < r
    // https://en.wikipedia.org/wiki/Vector_projection

    let startPoint = createVector(x1, y1);
    let endPoint = createVector(x2, y2);
    let circPoint = createVector(cx, cy);

    let circVec = p5.Vector.sub(circPoint, startPoint);
    let lineVec = createVector(x2, y2).sub(startPoint);

    let projPoint = lineVec.setMag(circVec.dot(lineVec) / lineVec.mag()).add(startPoint);
    // console.log(projPoint.x, projPoint.y);

    fill(255, 0, 0);
    circle(projPoint.x, projPoint.y, 5);

    // increase length by 2 for the r on left and right of line from center
    if (projPoint.dist(startPoint) + projPoint.dist(endPoint) > startPoint.dist(endPoint) + 2 * r) {
        return false;
    }

    return projPoint.dist(circPoint) < r;
}