import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SliderWindowControllerNew } from '@/com/sulake/habbo/roomevents/wired_setup/common/SliderWindowControllerNew';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SliderPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::SliderPreset'); }

    declare private _container: IWindowContainer;

    declare private _listPreset: SimpleListViewPreset;

    declare private _slider: SliderWindowControllerNew;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number = 0, param5: number = 1, param6: number = 0) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        let _loc7_: IWindowContainer = param3.createSlider();
        this._slider = new SliderWindowControllerNew(_loc7_, param4, param5, param6);
        this._listPreset = param2.createSimpleListView(false, [param2.createIconButtonPreset("left", this._slider.moveSliderToLeft), this.wrapWindow(_loc7_), param2.createIconButtonPreset("right", this._slider.moveSliderToRight)], true);
        this._listPreset.spacing = param3.LRContainerSpacing;
        this._container.addChild(this._listPreset.window);
        this._listPreset.window.x = param3.LRContainerMargin;
        this._listPreset.window.y = param3.LRContainerTopBottomPadding;
    }

    public set value(param1: number) {
        this._slider.setValue(param1);
    }

    public get value(): number {
        return this._slider.getValue() | 0;
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._slider.addEventListener(param1, param2);
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
        this._listPreset.resizeToWidth(param1 - this._SafeStr_2144.LRContainerMargin * 2);
        this._container.height = this._listPreset.window.height + 2 * this._SafeStr_2144.LRContainerTopBottomPadding;
    }

    protected override get childPresets(): any[] {
        return [this._listPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._listPreset = null;
        this._slider.dispose();
        this._slider = null;
    }
}
