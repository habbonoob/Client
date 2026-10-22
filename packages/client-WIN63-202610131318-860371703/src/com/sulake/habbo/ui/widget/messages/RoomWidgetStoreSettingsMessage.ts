import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetStoreSettingsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetStoreSettingsMessage'); }

    public static readonly STORE_ALL_SETTINGS: string = "RWSSM_STORE_SETTINGS";
    public static readonly STORE_SOUND_SETTING: string = "RWSSM_STORE_SOUND";
    public static readonly PREVIEW_SOUND_SETTING: string = "RWSSM_PREVIEW_SOUND";

    declare private _traxVolume: number;
    static { (this.prototype as any)._traxVolume = NaN; }

    declare private _furniVolume: number;
    static { (this.prototype as any)._furniVolume = NaN; }

    declare private _genericVolume: number;
    static { (this.prototype as any)._genericVolume = NaN; }

    constructor(param1: string) {
        super(param1);
    }

    public get traxVolume(): number {
        return this._traxVolume;
    }

    public set traxVolume(param1: number) {
        this._traxVolume = param1;
    }

    public get furniVolume(): number {
        return this._furniVolume;
    }

    public set furniVolume(param1: number) {
        this._furniVolume = param1;
    }

    public get genericVolume(): number {
        return this._genericVolume;
    }

    public set genericVolume(param1: number) {
        this._genericVolume = param1;
    }
}
