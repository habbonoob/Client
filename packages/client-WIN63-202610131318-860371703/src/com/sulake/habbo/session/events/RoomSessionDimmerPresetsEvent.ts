import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionDimmerPresetsEventPresetItem } from '@/com/sulake/habbo/session/events/RoomSessionDimmerPresetsEventPresetItem';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionDimmerPresetsEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionDimmerPresetsEvent'); }

    public static readonly ROOM_DIMMER_PRESETS: string = "RSDPE_PRESETS";
    private _selectedPresetId: number = 0;
    private _presets: any[] = [];

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _isOn: boolean;
    static { (this.prototype as any)._isOn = false; }

    constructor(param1: string, param2: IRoomSession, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }

    public get selectedPresetId(): number {
        return this._selectedPresetId;
    }

    public get presetCount(): number {
        return this._presets.length | 0;
    }

    public set selectedPresetId(param1: number) {
        this._selectedPresetId = param1;
    }

    public get itemId(): number {
        return this._itemId;
    }

    public set itemId(param1: number) {
        this._itemId = param1;
    }

    public get isOn(): boolean {
        return this._isOn;
    }

    public set isOn(param1: boolean) {
        this._isOn = param1;
    }

    public storePreset(param1: number, param2: number, param3: number, param4: number): void {
        let _loc5_: RoomSessionDimmerPresetsEventPresetItem = new RoomSessionDimmerPresetsEventPresetItem(param1, param2, param3 >>> 0, param4 >>> 0);
        this._presets[param1 - 1] = _loc5_;
    }

    public getPreset(param1: number): RoomSessionDimmerPresetsEventPresetItem {
        // (AS3 reads a `count` arrays do not have: undefined, so the upper bound never fails)
        if (param1 < 0 || param1 >= (this._presets as unknown as { count: number }).count) {
            return null;
        }
        return this._presets[param1];
    }
}
