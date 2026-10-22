import { ColorTransform } from './ColorTransform';
import type { Matrix } from './Matrix';
import type { Rectangle } from './Rectangle';

/** What a Transform reads and writes on its display object. */
export interface TransformTarget {
    transformMatrix(): Matrix;
    setTransformMatrix(m: Matrix): void;
    transformColor(): ColorTransform;
    setTransformColor(ct: ColorTransform): void;
    concatenatedTransformMatrix(): Matrix;
    concatenatedTransformColor(): ColorTransform;
    stagePixelBounds(): Rectangle;
}

/**
 * A display object's geometric and colour transform. Getters return copies and setters copy their
 * argument, so `obj.transform.colorTransform.redMultiplier = 0` has no effect until the transform is
 * assigned back — callers change a copy and assign it.
 */
export class Transform {
    readonly #target: TransformTarget;

    constructor(target: TransformTarget) {
        this.#target = target;
    }

    get matrix(): Matrix {
        return this.#target.transformMatrix();
    }

    set matrix(value: Matrix) {
        this.#target.setTransformMatrix(value);
    }

    get colorTransform(): ColorTransform {
        return this.#target.transformColor();
    }

    set colorTransform(value: ColorTransform) {
        this.#target.setTransformColor(value);
    }

    /** The combined matrix from this object's space to the stage. */
    get concatenatedMatrix(): Matrix {
        return this.#target.concatenatedTransformMatrix();
    }

    /** The combined colour transform of this object and its ancestors. */
    get concatenatedColorTransform(): ColorTransform {
        return this.#target.concatenatedTransformColor();
    }

    /** Bounds on the stage, in whole pixels. */
    get pixelBounds(): Rectangle {
        return this.#target.stagePixelBounds();
    }
}
