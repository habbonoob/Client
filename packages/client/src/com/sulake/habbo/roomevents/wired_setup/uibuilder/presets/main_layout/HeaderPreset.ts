import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class HeaderPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::HeaderPreset'); }

    public static readonly _SafeStr_7733: number = 0;
    public static readonly _SafeStr_8366: number = 1;
    public static readonly BUTTON_MODE_VARIABLE_MENU: number = 2;
    public static readonly _SafeStr_7972: number = 3;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: ElementTypeHolder, param6: number, param7: (...args: any[]) => any, param8: (...args: any[]) => any, param9: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._buttonMode = param6;
        this._container = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        let _loc10_: any[] = [];
        let _loc11_: WiredUIPreset = this.createTopHeaderElement(param4, param5);
        _loc10_.push(_loc11_);
        this._button = null;
        if (param6 == 1) {
            this._button = param2.createTextualButtonPreset(this.loc("wiredfurni.applysnapshot"), param7);
        } else if (param6 == 2) {
            this._button = param2.createTextualButtonPreset(this.loc("wiredfurni.view_in_menu"), param8);
        } else if (param6 == 3) {
            this._button = param2.createTextualButtonPreset(this.loc("wiredfurni.params.write_to_logs.view"), param9);
        }
        if (this._button != null) {
            this._button = this._button.alignCenter();
            _loc10_.push(this._button);
        }
        this._listPreset = param2.createSimpleListView(true, _loc10_);
        this._container.addChild(this._listPreset.window);
        this._listPreset.window.x = this._SafeStr_2144.headerMargin;
        this._listPreset.window.y = this._SafeStr_2144.headerMargin;
    }

    declare protected _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _buttonMode: number;
    static { (this.prototype as any)._buttonMode = 0; }

    declare private _container: IWindowContainer;

    declare private _listPreset: SimpleListViewPreset;

    declare private _button: WiredUIPreset;

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return [this._listPreset];
    }

    public set buttonVisible(param1: boolean) {
        if (this._button.visible != param1) {
            this._button.visible = param1;
            this.resizeToWidth(this._width);
        }
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._width = param1;
        let _loc2_: number = this._SafeStr_2144.headerMargin + (this._button == null || !this._button.visible ? this._SafeStr_2144.headerMargin : this._SafeStr_2144.headerBottomMarginWithLink);
        this._listPreset.resizeToWidth(param1 - this._SafeStr_2144.headerMargin * 2);
        this._container.width = param1;
        this._container.height = Util.getLowestPointList(asGuarded(this._listPreset.window, isIItemListWindow)) + _loc2_;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._listPreset = null;
    }

    public updateName(param1: string): void {
    }

    protected createTopHeaderElement(param1: string, param2: ElementTypeHolder): WiredUIPreset {
        return null;
    }
}
