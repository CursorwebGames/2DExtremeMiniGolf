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