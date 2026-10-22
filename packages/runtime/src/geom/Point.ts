/** A location in a two-dimensional coordinate system. */
export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /** Distance from (0, 0) to this point. */
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v: Point): Point {
        return new Point(this.x + v.x, this.y + v.y);
    }

    subtract(v: Point): Point {
        return new Point(this.x - v.x, this.y - v.y);
    }

    offset(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    equals(toCompare: Point): boolean {
        return toCompare != null && this.x === toCompare.x && this.y === toCompare.y;
    }

    setTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(x=${this.x}, y=${this.y})`;
    }

    static distance(pt1: Point, pt2: Point): number {
        const dx = pt2.x - pt1.x;
        const dy = pt2.y - pt1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /** A point between pt1 and pt2: f = 1 gives pt1, f = 0 gives pt2. */
    static interpolate(pt1: Point, pt2: Point, f: number): Point {
        return new Point(pt2.x + f * (pt1.x - pt2.x), pt2.y + f * (pt1.y - pt2.y));
    }
}
