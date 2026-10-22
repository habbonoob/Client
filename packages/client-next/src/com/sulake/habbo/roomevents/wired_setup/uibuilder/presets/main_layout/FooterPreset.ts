import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { ButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonRowPreset';
import type { SplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SplitterPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class FooterPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::FooterPreset'); }

    declare private _container: IItemListWindow;

    declare private _splitter: SplitterPreset;

    declare private _buttons: ButtonRowPreset;

    declare private _SafeStr_2570: ButtonPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._splitter = param2.createSplitter();
        this._SafeStr_2570 = param2.createButton(this.loc("wiredfurni.ready"), param4);
        let _loc6_: ButtonPreset = param2.createButton(this.loc("cancel"), param5);
        this._buttons = param2.createButtonRow([this._SafeStr_2570, _loc6_]);
        this._buttons.window.x = param3.sectionLeftRightMargin;
        this._container.spacing = this._SafeStr_2144.sectionSpacing;
        this._container.addListItem(this._splitter.window);
        this._container.addListItem(this._buttons.window);
    }

    public set saveButtonDisabled(param1: boolean) {
        this._SafeStr_2570.disabled = param1;
    }

    public set saveButtonCaption(param1: string) {
        if (this._SafeStr_2570 != null && this._SafeStr_2570.window != null) {
            this._SafeStr_2570.window.caption = param1;
        }
    }

    public override get window(): IWindow {
        return this._container;
    }

    public set splitterVisible(param1: boolean) {
        this._splitter.visible = param1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
        this._splitter.resizeToWidth(param1);
        this._buttons.resizeToWidth(param1 - this._SafeStr_2144.sectionLeftRightMargin * 2);
    }

    protected override get childPresets(): any[] {
        return [this._splitter, this._buttons];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._splitter = null;
        this._buttons = null;
        this._SafeStr_2570 = null;
    }
}
