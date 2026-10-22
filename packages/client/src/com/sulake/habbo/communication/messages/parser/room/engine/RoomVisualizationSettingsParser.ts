import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomVisualizationSettingsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::RoomVisualizationSettingsParser'); }

    constructor() {
    }

    private _wallsHidden: boolean = false;
    private _wallThicknessMultiplier: number = 1;
    private _floorThicknessMultiplier: number = 1;

    public get wallsHidden(): boolean {
        return this._wallsHidden;
    }

    public get wallThicknessMultiplier(): number {
        return this._wallThicknessMultiplier;
    }

    public get floorThicknessMultiplier(): number {
        return this._floorThicknessMultiplier;
    }

    public flush(): boolean {
        this._wallsHidden = false;
        this._wallThicknessMultiplier = 1;
        this._floorThicknessMultiplier = 1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._wallsHidden = param1.readBoolean();
        let _loc3_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        if (_loc3_ < -2) {
            _loc3_ = -2;
        } else if (_loc3_ > 1) {
            _loc3_ = 1;
        }
        if (_loc2_ < -2) {
            _loc2_ = -2;
        } else if (_loc2_ > 1) {
            _loc2_ = 1;
        }
        this._wallThicknessMultiplier = Math.pow(2, _loc3_);
        this._floorThicknessMultiplier = Math.pow(2, _loc2_);
        return true;
    }
}
