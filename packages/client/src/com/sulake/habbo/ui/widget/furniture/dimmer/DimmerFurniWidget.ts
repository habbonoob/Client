import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetDimmerStateUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerStateUpdateEvent';
import type { RoomWidgetDimmerUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerUpdateEvent';
import type { RoomWidgetDimmerUpdateEventPresetItem } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDimmerUpdateEventPresetItem';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { DimmerFurniWidgetPresetItem } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerFurniWidgetPresetItem';
import { DimmerView } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerView';
import { RoomWidgetDimmerChangeStateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerChangeStateMessage';
import { RoomWidgetDimmerPreviewMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerPreviewMessage';
import { RoomWidgetDimmerSavePresetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDimmerSavePresetMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class DimmerFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.dimmer::DimmerFurniWidget'); }

    private static readonly AVAILABLE_COLORS: any[] = [7665141, 21495, 15161822, 15353138, 15923281, 8581961, 0];
    private static readonly _minLights: any[] = [76, 76];

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    declare private _view: DimmerView;

    declare private _presets: any[];

    declare private _selectedPresetIndex: number;
    static { (this.prototype as any)._selectedPresetIndex = 0; }

    declare private _SafeStr_7290: number;
    static { (this.prototype as any)._SafeStr_7290 = 0; }

    declare private _effectId: number;
    static { (this.prototype as any)._effectId = 0; }

    private _color: number = 16777215;
    private _brightness: number = 255;

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _isOn: boolean;
    static { (this.prototype as any)._isOn = false; }

    public get isOn(): boolean {
        return this._isOn;
    }

    public get presets(): any[] {
        return this._presets;
    }

    public get colors(): any[] {
        return DimmerFurniWidget.AVAILABLE_COLORS;
    }

    public get minLights(): any[] {
        return DimmerFurniWidget._minLights;
    }

    public get selectedPresetIndex(): number {
        return this._selectedPresetIndex;
    }

    public set selectedPresetIndex(param1: number) {
        this._selectedPresetIndex = param1;
    }

    public override dispose(): void {
        this.disposeInterface();
        this._presets = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWDUE_PRESETS", this.onPresets);
        param1.addEventListener("RWDUE_HIDE", this.onHide);
        param1.addEventListener("RWDSUE_DIMMER_STATE", this.onDimmerState);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWDUE_PRESETS", this.onPresets);
        param1.removeEventListener("RWDUE_HIDE", this.onHide);
        param1.removeEventListener("RWDSUE_DIMMER_STATE", this.onDimmerState);
    }

    public storeCurrentSetting(param1: boolean): void {
        let _loc6_: RoomWidgetDimmerSavePresetMessage = null;
        if (!this._isOn) {
            return;
        }
        if (this.messageListener == null) {
            return;
        }
        let _loc7_: number = this._selectedPresetIndex + 1;
        if (this._presets == null || _loc7_ < 0 || _loc7_ > this._presets.length) {
            return;
        }
        let _loc5_: number = this._view.selectedType;
        let _loc4_: number = this.colors[this._view.selectedColorIndex] >>> 0;
        let _loc3_: number = this._view.selectedBrightness;
        let _loc2_: DimmerFurniWidgetPresetItem = asInstanceOf(this._presets[this._selectedPresetIndex], DimmerFurniWidgetPresetItem);
        if (_loc2_ != null && _loc2_.type == _loc5_ && _loc2_.color == _loc4_ && _loc2_.light == _loc3_ && !param1) {
            return;
        }
        _loc2_.type = _loc5_;
        _loc2_.color = _loc4_;
        _loc2_.light = _loc3_ >>> 0;
        if (!this.validateBrightness(_loc3_ >>> 0, _loc5_)) {
            return;
        }
        _loc6_ = new RoomWidgetDimmerSavePresetMessage(_loc7_, _loc5_, _loc4_, _loc3_, param1, this._itemId);
        this.messageListener.processWidgetMessage(_loc6_);
    }

    public previewCurrentSetting(): void {
        let _loc1_: RoomWidgetDimmerPreviewMessage = null;
        if (!this._isOn) {
            return;
        }
        if (this.messageListener == null) {
            return;
        }
        if (!this.validateBrightness(this._view.selectedBrightness >>> 0, this._view.selectedType)) {
            return;
        }
        _loc1_ = new RoomWidgetDimmerPreviewMessage(this.colors[this._view.selectedColorIndex] >>> 0, this._view.selectedBrightness, this._view.selectedType == 2);
        this.messageListener.processWidgetMessage(_loc1_);
    }

    public changeRoomDimmerState(): void {
        let _loc1_: RoomWidgetDimmerChangeStateMessage = null;
        if (this.messageListener != null) {
            _loc1_ = new RoomWidgetDimmerChangeStateMessage(this._itemId);
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    public removePreview(): void {
        let _loc1_: RoomWidgetDimmerPreviewMessage = null;
        if (this.messageListener == null) {
            return;
        }
        if (!this.validateBrightness(this._brightness, this._effectId)) {
            return;
        }
        _loc1_ = new RoomWidgetDimmerPreviewMessage(this._color, this._brightness | 0, this._effectId == 2);
        this.messageListener.processWidgetMessage(_loc1_);
    }

    private disposeInterface(): void {
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
    }

    private showInterface(): void {
        if (this._view == null) {
            this._view = new DimmerView(this);
        }
        if (this._view != null) {
            this._view.showInterface();
        }
    }

    private validateBrightness(param1: number, param2: number): boolean {
        return true;
    }

    private onPresets = (param1: RoomWidgetDimmerUpdateEvent): void => {
        let _loc3_: number = 0;
        let _loc4_: RoomWidgetDimmerUpdateEventPresetItem = null;
        let _loc2_: DimmerFurniWidgetPresetItem = null;
        this._itemId = param1.itemId;
        this._isOn = param1.isOn;
        this._selectedPresetIndex = param1.selectedPresetId - 1;
        this._presets = [];
        _loc3_ = 0;
        while (_loc3_ < param1.presets.length) {
            _loc4_ = param1.presets[_loc3_];
            _loc2_ = new DimmerFurniWidgetPresetItem(_loc4_.id, _loc4_.type, _loc4_.color, _loc4_.light >>> 0);
            this._presets.push(_loc2_);
            _loc3_++;
        }
        this.showInterface();
    };

    private onHide = (param1: RoomWidgetDimmerUpdateEvent): void => {
        if (this._itemId == param1.itemId) {
            this.disposeInterface();
        }
    };

    private onDimmerState = (param1: RoomWidgetDimmerStateUpdateEvent): void => {
        let _loc2_: RoomWidgetDimmerPreviewMessage = null;
        if (param1 == null) {
            return;
        }
        if (param1.state > 0) {
            this._SafeStr_7290 = param1.objectId | 0;
        }
        if (this._SafeStr_7290 == param1.objectId) {
            this._effectId = param1.effectId;
            this._color = param1.color;
            this._brightness = param1.brightness;
        }
        if (this._itemId == param1.objectId) {
            this._isOn = param1.state > 0;
        }
        if (this._view != null) {
            this._view.update();
        }
        if (!this.validateBrightness(this._brightness, this._effectId)) {
            return;
        }
        _loc2_ = new RoomWidgetDimmerPreviewMessage(this._color, this._brightness | 0, this._effectId == 2);
        this.messageListener.processWidgetMessage(_loc2_);
    };
}
