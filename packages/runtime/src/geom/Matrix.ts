import { Point } from './Point';

/**
 * A 2D affine transform
 *     | a  c  tx |
 *     | b  d  ty |
 * mapping (x, y) to (a·x + c·y + tx, b·x + d·y + ty).
 */
export class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    clone(): Matrix {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }

    identity(): void {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    }

    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    /** Apply `m` after this matrix. */
    concat(m: Matrix): void {
        const a = this.a * m.a + this.b * m.c;
        const b = this.a * m.b + this.b * m.d;
        const c = this.c * m.a + this.d * m.c;
        const d = this.c * m.b + this.d * m.d;
        const tx = this.tx * m.a + this.ty * m.c + m.tx;
        const ty = this.tx * m.b + this.ty * m.d + m.ty;
        this.setTo(a, b, c, d, tx, ty);
    }

    /** Replace with the inverse transform (plain float maths: a singular matrix yields non-finite values). */
    invert(): void {
        const det = this.a * this.d - this.b * this.c;
        const a = this.d / det;
        const b = -this.b / det;
        const c = -this.c / det;
        const d = this.a / det;
        const tx = -(a * this.tx + c * this.ty);
        const ty = -(b * this.tx + d * this.ty);
        this.setTo(a, b, c, d, tx, ty);
    }

    /** Rotate by `angle` radians, after the existing transform. */
    rotate(angle: number): void {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        this.setTo(
            this.a * cos - this.b * sin, this.a * sin + this.b * cos,
            this.c * cos - this.d * sin, this.c * sin + this.d * cos,
            this.tx * cos - this.ty * sin, this.tx * sin + this.ty * cos,
        );
    }

    /** Scale after the existing transform. */
    scale(sx: number, sy: number): void {
        this.a *= sx;
        this.b *= sy;
        this.c *= sx;
        this.d *= sy;
        this.tx *= sx;
        this.ty *= sy;
    }

    /** Translate after the existing transform. */
    translate(dx: number, dy: number): void {
        this.tx += dx;
        this.ty += dy;
    }

    /** Equivalent to identity(), rotate(rotation), scale(scaleX, scaleY), translate(tx, ty). */
    createBox(scaleX: number, scaleY: number, rotation: number = 0, tx: number = 0, ty: number = 0): void {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        this.setTo(cos * scaleX, sin * scaleY, -sin * scaleX, cos * scaleY, tx, ty);
    }

    /** The box a gradient of width × height at (tx, ty) is drawn in; gradients span 1638.4 units at scale 1. */
    createGradientBox(width: number, height: number, rotation: number = 0, tx: number = 0, ty: number = 0): void {
        this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
    }

    transformPoint(point: Point): Point {
        return new Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);
    }

    /** Transform without the translation. */
    deltaTransformPoint(point: Point): Point {
        return new Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
    }

    toString(): string {
        return `(a=${this.a}, b=${this.b}, c=${this.c}, d=${this.d}, tx=${this.tx}, ty=${this.ty})`;
    }
}
