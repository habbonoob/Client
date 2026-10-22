/** A point or direction in three dimensions, with an optional w component. */
export class Vector3D {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /** Length of (x, y, z); w is ignored. */
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    clone(): Vector3D {
        return new Vector3D(this.x, this.y, this.z, this.w);
    }

    /** Scale (x, y, z) to unit length and return the length it had. */
    normalize(): number {
        const len = this.length;
        if (len !== 0) {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
        return len;
    }

    /** Scale (x, y, z); w is left alone. */
    scaleBy(s: number): void {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    toString(): string {
        return `Vector3D(${this.x}, ${this.y}, ${this.z})`;
    }
}
