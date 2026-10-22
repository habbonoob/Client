/** Measurements of one line of a text field. */
export class TextLineMetrics {
    x: number;
    width: number;
    height: number;
    ascent: number;
    descent: number;
    leading: number;

    constructor(x: number, width: number, height: number, ascent: number, descent: number, leading: number) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.ascent = ascent;
        this.descent = descent;
        this.leading = leading;
    }
}
