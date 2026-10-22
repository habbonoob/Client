import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';

export class LibraryProgressEvent extends ProgressEvent {
    static { registerClassName(this, 'com.sulake.core.runtime.events::LibraryProgressEvent'); }

    constructor(param1: string, param2: number = 0, param3: number = 0, param4: number = 0) {
        super("progress", false, false, param2, param3);
        this._fileName = param1;
        this._elapsedTime = param4;
    }

    private _elapsedTime: number = 0;

    public get elapsedTime(): number {
        return this._elapsedTime;
    }

    private _fileName: string = "";

    public get fileName(): string {
        return this._fileName;
    }
}
