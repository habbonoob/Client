/** Volume (0 to 1) and stereo panning (-1 left to 1 right) for sound playback. */
export class SoundTransform {
    volume: number;
    pan: number;
    leftToLeft = 1;
    leftToRight = 0;
    rightToLeft = 0;
    rightToRight = 1;

    constructor(vol: number = 1, panning: number = 0) {
        this.volume = vol;
        this.pan = panning;
    }
}
