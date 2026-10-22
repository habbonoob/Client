import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetSpamWallPostItEditEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetSpamWallPostItEditEvent'); }

    public static readonly _SafeStr_7741: string = "RWSWPUE_OPEN_EDITOR";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _location: string;

    declare private _objectType: string;

    constructor(param1: string, param2: number, param3: string, param4: string, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._objectId = param2;
        this._location = param3;
        this._objectType = param4;
    }

    public get location(): string {
        return this._location;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectType(): string {
        return this._objectType;
    }
}
