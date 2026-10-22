import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FZipFile } from '@/deng/fzip/FZipFile';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FZipEvent extends Event {
    static { registerClassName(this, 'deng.fzip::FZipEvent'); }

    public static readonly FILE_LOADED: string = "fileLoaded";

    declare public file: FZipFile;

    constructor(param1: string, param2: FZipFile = null, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this.file = param2;
    }

    public override clone(): Event {
        return new FZipEvent(this.type, this.file, this.bubbles, this.cancelable);
    }

    public override toString(): string {
        return "[FZipEvent type=\"" + this.type + "\" filename=\"" + this.file.filename + "\" bubbles=" + this.bubbles + " cancelable=" + this.cancelable + " eventPhase=" + this.eventPhase + "]";
    }
}
