import { Point } from './Point';

/** An area defined by its top-left corner (x, y), width and height. */
export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /** Moving the left edge keeps the right edge in place. */
    get left(): number {
        return this.x;
    }

    set left(value: number) {
        this.width += this.x - value;
        this.x = value;
    }

    get right(): number {
        return this.x + this.width;
    }

    set right(value: number) {
        this.width = value - this.x;
    }

    /** Moving the top edge keeps the bottom edge in place. */
    get top(): number {
        return this.y;
    }

    set top(value: number) {
        this.height += this.y - value;
        this.y = value;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    set bottom(value: number) {
        this.height = value - this.y;
    }

    get topLeft(): Point {
        return new Point(this.x, this.y);
    }

    set topLeft(value: Point) {
        this.width += this.x - value.x;
        this.height += this.y - value.y;
        this.x = value.x;
        this.y = value.y;
    }

    get bottomRight(): Point {
        return new Point(this.x + this.width, this.y + this.height);
    }

    set bottomRight(value: Point) {
        this.width = value.x - this.x;
        this.height = value.y - this.y;
    }

    get size(): Point {
        return new Point(this.width, this.height);
    }

    set size(value: Point) {
        this.width = value.x;
        this.height = value.y;
    }

    clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /** The right and bottom edges are outside the rectangle. */
    contains(x: number, y: number): boolean {
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }

    containsPoint(point: Point): boolean {
        return this.contains(point.x, point.y);
    }

    containsRect(rect: Rectangle): boolean {
        if (rect.isEmpty()) return false;
        return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
    }

    equals(toCompare: Rectangle): boolean {
        return toCompare != null && this.x === toCompare.x && this.y === toCompare.y
            && this.width === toCompare.width && this.height === toCompare.height;
    }

    isEmpty(): boolean {
        return this.width <= 0 || this.height <= 0;
    }

    setEmpty(): void {
        this.x = this.y = this.width = this.height = 0;
    }

    setTo(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /** The overlapping area; an all-zero rectangle when the two don't overlap. */
    intersection(toIntersect: Rectangle): Rectangle {
        if (this.isEmpty() || toIntersect.isEmpty()) return new Rectangle();
        const left = Math.max(this.x, toIntersect.x);
        const top = Math.max(this.y, toIntersect.y);
        const right = Math.min(this.right, toIntersect.right);
        const bottom = Math.min(this.bottom, toIntersect.bottom);
        if (right <= left || bottom <= top) return new Rectangle();
        return new Rectangle(left, top, right - left, bottom - top);
    }

    intersects(toIntersect: Rectangle): boolean {
        return !this.intersection(toIntersect).isEmpty();
    }

    /** The smallest rectangle containing both; an empty rectangle contributes nothing. */
    union(toUnion: Rectangle): Rectangle {
        if (this.isEmpty()) return toUnion.clone();
        if (toUnion.isEmpty()) return this.clone();
        const left = Math.min(this.x, toUnion.x);
        const top = Math.min(this.y, toUnion.y);
        return new Rectangle(left, top, Math.max(this.right, toUnion.right) - left, Math.max(this.bottom, toUnion.bottom) - top);
    }

    inflate(dx: number, dy: number): void {
        this.x -= dx;
        this.width += 2 * dx;
        this.y -= dy;
        this.height += 2 * dy;
    }

    offset(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    offsetPoint(point: Point): void {
        this.x += point.x;
        this.y += point.y;
    }

    toString(): string {
        return `(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`;
    }
}
