/**
 * Components that require multiple knots
 */
class Polygon {
    constructor(obj) {
        this.obj = obj;
        this.knots = [
            new Knot(width / 2 - 50, height / 2),
            new Knot(width / 2 + 50, height / 2),
            new Knot(width / 2, height / 2 + 50),
        ];
        knots.push(...this.knots);
    }

    draw() {
        this.obj.points = this.convertKnots();
        this.obj.draw();
        for (const knot of this.knots) {
            knot.draw();
        }
    }

    convertKnots() {
        return this.knots.map(knot => [knot.pos.x, knot.pos.y]);
    }
}