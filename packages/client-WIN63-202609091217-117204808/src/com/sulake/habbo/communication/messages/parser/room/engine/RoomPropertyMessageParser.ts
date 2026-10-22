import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomPropertyMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::RoomPropertyMessageParser'); }

    private _floorType: string = null;
    private _wallType: string = null;
    private _landscapeType: string = null;
    private _animatedLandscapeType: string = null;

    constructor() {
    }

    public get floorType(): string {
        return this._floorType;
    }

    public get wallType(): string {
        return this._wallType;
    }

    public get landscapeType(): string {
        return this._landscapeType;
    }

    public get animatedLandscapeType(): string {
        return this._animatedLandscapeType;
    }

    public flush(): boolean {
        this._floorType = null;
        this._wallType = null;
        this._landscapeType = null;
        this._animatedLandscapeType = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: string = param1.readString();
        let _loc2_: string = param1.readString();
        switch (_loc3_) {
            case "floor":
                this._floorType = _loc2_;
                break;
            case "wallpaper":
                this._wallType = _loc2_;
                break;
            case "landscape":
                this._landscapeType = _loc2_;
                break;
            case "landscapeanim":
                this._animatedLandscapeType = _loc2_;
        }
        return true;
    }
}
