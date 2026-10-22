import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetDimmerUpdateEventPresetItem } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerUpdateEventPresetItem';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetDimmerUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetDimmerUpdateEvent'); }

    public static readonly _SafeStr_8217: string = "RWDUE_PRESETS";
    public static readonly DIMMER_HIDE: string = "RWDUE_HIDE";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }

    private _selectedPresetId: number = 0;
    private _presets: any[] = [];
    private _itemId: number = 0;
    private _isOn: boolean = false;

    public get selectedPresetId(): number {
        return this._selectedPresetId;
    }

    public set selectedPresetId(param1: number) {
        this._selectedPresetId = param1;
    }

    public get presetCount(): number {
        return this._presets.length | 0;
    }

    public get presets(): any[] {
        return this._presets;
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
        let _loc5_: RoomWidgetDimmerUpdateEventPresetItem = new RoomWidgetDimmerUpdateEventPresetItem(param1, param2, param3 >>> 0, param4 >>> 0);
        this._presets[param1 - 1] = _loc5_;
    }

    public getPreset(param1: number): RoomWidgetDimmerUpdateEventPresetItem {
        // (AS3 reads a `count` arrays do not have: undefined, so the upper bound never fails)
        if (param1 < 0 || param1 >= (this._presets as unknown as { count: number }).count) {
            return null;
        }
        return this._presets[param1];
    }
}
