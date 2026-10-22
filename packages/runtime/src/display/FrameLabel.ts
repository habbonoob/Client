/** A named frame of a MovieClip timeline. */
export class FrameLabel {
    readonly name: string;
    readonly frame: number;

    constructor(name: string, frame: number) {
        this.name = name;
        this.frame = frame;
    }
}
