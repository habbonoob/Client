import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectTileCursorUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectTileCursorUpdateMessage';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';

export class RoomTileCursorLogic extends ObjectLogicBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.room::RoomTileCursorLogic'); }

    private static readonly STATE_ENABLED: number = 0;
    private static readonly STATE_DISABLED: number = 1;
    private static readonly STATE_SHOW_TILE_HEIGHT: number = 6;

    declare private _SafeStr_5775: string;

    declare private _hiddenOnPurpose: boolean;
    static { (this.prototype as any)._hiddenOnPurpose = false; }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        let _loc2_: IRoomObjectModelController = null;
        if (this.object != null) {
            _loc2_ = this.object.getModelController();
            if (_loc2_ != null) {
                _loc2_.setNumber("furniture_alpha_multiplier", 1);
                this.object.setState(1, 0);
            }
        }
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: number = NaN;
        let _loc4_: number = 0;
        let _loc2_: RoomObjectTileCursorUpdateMessage = param1 instanceof RoomObjectTileCursorUpdateMessage ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_5775 != null && this._SafeStr_5775 == _loc2_.sourceEventId) {
            return;
        }
        if (_loc2_.toggleVisibility) {
            this._hiddenOnPurpose = !this._hiddenOnPurpose;
        }
        super.processUpdateMessage(param1);
        if (this.object != null) {
            if (this._hiddenOnPurpose) {
                this.object.setState(1, 0);
            } else if (!_loc2_.visible) {
                this.object.setState(1, 0);
            } else {
                _loc3_ = _loc2_.height;
                this.object.getModelController().setNumber("tile_cursor_height", _loc3_);
                _loc4_ = _loc3_ > 0.8 ? 6 : 0;
                this.object.setState(_loc4_, 0);
            }
        }
        this._SafeStr_5775 = _loc2_.sourceEventId;
    }
}
