/**
 * Per-channel `value * multiplier + offset`, applied to red, green, blue
 * and alpha (offsets in 0-255 units). No clamping happens here; it happens when pixels are written.
 */
export class ColorTransform {
    redMultiplier: number;
    greenMultiplier: number;
    blueMultiplier: number;
    alphaMultiplier: number;
    redOffset: number;
    greenOffset: number;
    blueOffset: number;
    alphaOffset: number;

    constructor(
        redMultiplier: number = 1, greenMultiplier: number = 1, blueMultiplier: number = 1, alphaMultiplier: number = 1,
        redOffset: number = 0, greenOffset: number = 0, blueOffset: number = 0, alphaOffset: number = 0,
    ) {
        this.redMultiplier = redMultiplier;
        this.greenMultiplier = greenMultiplier;
        this.blueMultiplier = blueMultiplier;
        this.alphaMultiplier = alphaMultiplier;
        this.redOffset = redOffset;
        this.greenOffset = greenOffset;
        this.blueOffset = blueOffset;
        this.alphaOffset = alphaOffset;
    }

    /** The RGB offsets as 0xRRGGBB; setting it zeroes the RGB multipliers (a solid tint). */
    get color(): number {
        return ((this.redOffset << 16) | (this.greenOffset << 8) | this.blueOffset) >>> 0;
    }

    set color(value: number) {
        this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
        this.redOffset = (value >> 16) & 0xff;
        this.greenOffset = (value >> 8) & 0xff;
        this.blueOffset = value & 0xff;
    }

    /** Combine with `second`, which is applied to colours first. */
    concat(second: ColorTransform): void {
        this.redOffset += this.redMultiplier * second.redOffset;
        this.greenOffset += this.greenMultiplier * second.greenOffset;
        this.blueOffset += this.blueMultiplier * second.blueOffset;
        this.alphaOffset += this.alphaMultiplier * second.alphaOffset;
        this.redMultiplier *= second.redMultiplier;
        this.greenMultiplier *= second.greenMultiplier;
        this.blueMultiplier *= second.blueMultiplier;
        this.alphaMultiplier *= second.alphaMultiplier;
    }

    toString(): string {
        return `(redMultiplier=${this.redMultiplier}, greenMultiplier=${this.greenMultiplier}, blueMultiplier=${this.blueMultiplier}, alphaMultiplier=${this.alphaMultiplier}, redOffset=${this.redOffset}, greenOffset=${this.greenOffset}, blueOffset=${this.blueOffset}, alphaOffset=${this.alphaOffset})`;
    }
}
