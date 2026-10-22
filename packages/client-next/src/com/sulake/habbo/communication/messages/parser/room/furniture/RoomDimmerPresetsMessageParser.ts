import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomDimmerPresetsMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RoomDimmerPresetsMessageData';

export class RoomDimmerPresetsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::RoomDimmerPresetsMessageParser'); }

    private _selectedPresetId: number = 0;
    private _presets: any[] = [];
    private _itemId: number = 0;
    private _isOn: boolean = false;

    constructor() {
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get presetCount(): number {
        return this._presets.length | 0;
    }

    public get selectedPresetId(): number {
        return this._selectedPresetId;
    }

    public getPreset(param1: number): RoomDimmerPresetsMessageData {
        if (param1 < 0 || param1 >= this.presetCount) {
            return null;
        }
        return this._presets[param1];
    }

    public get isOn(): boolean {
        return this._isOn;
    }

    public flush(): boolean {
        this._presets = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc6_: string = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc8_: RoomDimmerPresetsMessageData = null;
        let _loc4_: number = param1.readInteger();
        this._selectedPresetId = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc7_ = param1.readInteger();
            _loc9_ = param1.readInteger();
            _loc6_ = param1.readString();
            _loc2_ = parseInt(_loc6_.substr(1), 16) | 0;
            _loc3_ = param1.readInteger();
            _loc8_ = new RoomDimmerPresetsMessageData(_loc7_);
            _loc8_.type = _loc9_;
            _loc8_.color = _loc2_ >>> 0;
            _loc8_.light = _loc3_;
            _loc8_.setReadOnly();
            this._presets.push(_loc8_);
            _loc5_++;
        }
        this._isOn = param1.readBoolean();
        this._itemId = param1.readInteger();
        return true;
    }
}
