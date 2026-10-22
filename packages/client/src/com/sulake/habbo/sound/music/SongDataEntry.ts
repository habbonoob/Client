import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import { PlayListEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListEntry';

export class SongDataEntry extends PlayListEntry implements ISongInfo {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::SongDataEntry'); }

    constructor(param1: number, param2: number, param3: string, param4: string, param5: IHabboSound) {
        super(param1, param2, param3, param4);
        this._soundObject = param5;
    }

    private _SafeStr_5208: string = "";
    private _SafeStr_7259: number = -1;

    public override get id(): number {
        return this._SafeStr_4873;
    }

    public override get length(): number {
        return this._length;
    }

    public override get name(): string {
        return this._songName;
    }

    public override get creator(): string {
        return this._creator;
    }

    private _soundObject: IHabboSound = null;

    public get soundObject(): IHabboSound {
        return this._soundObject;
    }

    public set soundObject(param1: IHabboSound) {
        this._soundObject = param1;
    }

    public get loaded(): boolean {
        return this._soundObject != null ? this._soundObject.ready : false;
    }

    public get songData(): string {
        return this._SafeStr_5208;
    }

    public set songData(param1: string) {
        this._SafeStr_5208 = param1;
    }

    public get diskId(): number {
        return this._SafeStr_7259;
    }

    public set diskId(param1: number) {
        this._SafeStr_7259 = param1;
    }
}
