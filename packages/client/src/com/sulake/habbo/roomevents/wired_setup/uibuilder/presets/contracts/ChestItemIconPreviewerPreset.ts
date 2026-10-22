import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';
import { ChestItemTypeRenderableWrapper } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/ChestItemTypeRenderableWrapper';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class ChestItemIconPreviewerPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::ChestItemIconPreviewerPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._window = param3.createProductIconPreviewer();
        (asGuarded(this.widgetWindow.widget, isIProductIconWidget)).unknownImageUri = "";
    }

    declare private _item: ChestItemType;

    declare private _window: IBorderWindow;

    public override get window(): IWindow {
        return this._window;
    }

    public override get staticWidth(): number {
        return this._window.width;
    }

    public get item(): ChestItemType {
        return this._item;
    }

    public set item(param1: ChestItemType) {
        this._item = param1;
        let _loc2_: ChestItemTypeRenderableWrapper = null;
        if (param1 != null) {
            _loc2_ = new ChestItemTypeRenderableWrapper(param1);
        }
        (asGuarded(this.widgetWindow.widget, isIProductIconWidget)).productInfo = _loc2_;
    }

    private get widgetWindow(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("icon_preview"), isIWidgetWindow);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
    }
}
