import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class CollapseExpandSectionButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::CollapseExpandSectionButtonPreset'); }

    declare private _SafeStr_2394: IRegionWindow;

    declare private _callback: (...args: any[]) => any;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: boolean) {
        super(param1, param2, param3);
        this._callback = param4;
        this._SafeStr_2394 = param3.createExpandCollapseSectionRegion();
        this.upArrow.visible = param5;
        this.downArrow.visible = !param5;
        this._SafeStr_2394.addEventListener("WME_CLICK", this.onButtonClicked);
    }

    public override get window(): IWindow {
        return this._SafeStr_2394;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return this._SafeStr_2394.width;
    }

    public get isExpanded(): boolean {
        return this.upArrow.visible;
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: boolean = !this.isExpanded;
        this.upArrow.visible = _loc2_;
        this.downArrow.visible = !_loc2_;
        if (this._callback != null) {
            this._callback(_loc2_);
        }
    };

    private get upArrow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2394.findChildByName("up_arrow"), isIStaticBitmapWrapperWindow);
    }

    private get downArrow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._SafeStr_2394.findChildByName("down_arrow"), isIStaticBitmapWrapperWindow);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2394.dispose();
        this._SafeStr_2394 = null;
        this._callback = null;
    }
}
