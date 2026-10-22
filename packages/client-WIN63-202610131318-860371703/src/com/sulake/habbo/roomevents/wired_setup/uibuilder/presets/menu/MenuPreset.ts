import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IMenuElement } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/IMenuElement';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { MenuItem } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/MenuItem';
import { MenuSpacer } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/MenuSpacer';
import { MenuItemView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/views/MenuItemView';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MenuPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.menu::MenuPreset'); }

    static #staticsReady = false;

    public static get SPACER(): IMenuElement {
        MenuPreset.#initStatics();
        return MenuPreset.SPACER;
    }

    declare private _container: IWindowContainer;

    declare private _SafeStr_4532: IRegionWindow;

    declare private _SafeStr_4597: IWindow;

    declare private _SafeStr_3239: MenuItemView[];

    declare private _SafeStr_4308: IWindow;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: IWindow) {
        let _loc6_: MenuItem = null;
        let _loc11_: MenuSpacer = null;
        let _loc10_: MenuItemView = null;
        super(param1, param2, param3);
        this._SafeStr_4308 = param5;
        this._container = param3.createQuickMenu();
        let _loc9_: IItemListWindow = this.menuList;
        let _loc7_: number = this._container.width - _loc9_.width;
        let _loc8_: number = this._container.height - _loc9_.height;
        this._SafeStr_4532 = asGuarded(_loc9_.removeListItem(_loc9_.findChildByName("menu_item_template")), isIRegionWindow);
        this._SafeStr_4597 = _loc9_.removeListItem(_loc9_.findChildByName("spacer_template"));
        this._SafeStr_3239 = [];
        let _loc12_: number = 0;
        for (const _loc13_ of param4 ?? []) {
            _loc6_ = _loc13_ instanceof MenuItem ? _loc13_ : null;
            _loc11_ = _loc13_ instanceof MenuSpacer ? _loc13_ : null;
            if (_loc6_ != null) {
                _loc10_ = new MenuItemView(this, _loc6_);
                this._SafeStr_3239.push(_loc10_);
                _loc9_.addListItem(_loc10_.window);
                if (_loc10_.requestedMinWidth > _loc12_) {
                    _loc12_ = _loc10_.requestedMinWidth;
                }
            } else if (_loc11_ != null) {
                _loc9_.addListItem(this._SafeStr_4597.clone());
            }
        }
        this._container.width = _loc12_ + _loc7_ + param3.menuRightOffset;
        this._container.height = _loc9_.height + _loc8_;
        this._container.addEventListener("WE_DEACTIVATED", this.onDeactivate);
    }

    private onDeactivate = (param1: WindowEvent): void => {
        this.requestClose();
    };

    public requestOpen(): void {
        let _loc1_: IDesktopWindow = this._roomEvents.windowManager.getDesktop(1);
        if (_loc1_ != null) {
            _loc1_.addChild(this._container);
        }
        let _loc2_: Point = new Point();
        this._SafeStr_4308.getGlobalPosition(_loc2_);
        this._container.x = _loc2_.x | 0;
        this._container.y = _loc2_.y + this._SafeStr_4308.height | 0;
        this._container.visible = true;
        this._container.activate();
    }

    public requestClose(): void {
        let _loc1_: IDesktopWindow = this._roomEvents.windowManager.getDesktop(1);
        if (_loc1_ != null) {
            _loc1_.removeChild(this._container);
        }
    }

    public setSelected(param1: number, param2: boolean): void {
        this._SafeStr_3239[param1].selected = param2;
    }

    public getSelected(param1: number): boolean {
        return this._SafeStr_3239[param1].selected;
    }

    public setDisabled(param1: number, param2: boolean): void {
        this._SafeStr_3239[param1].disabled = param2;
    }

    public getDisabled(param1: number): boolean {
        return this._SafeStr_3239[param1].disabled;
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    public override hasStaticWidth(): boolean {
        return false;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    protected override get childPresets(): any[] {
        return [];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        for (const _loc1_ of this._SafeStr_3239 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3239 = null;
        this._container.dispose();
        this._container = null;
        this._SafeStr_4532.dispose();
        this._SafeStr_4532 = null;
        this._SafeStr_4597.dispose();
        this._SafeStr_4597 = null;
        this._SafeStr_4308 = null;
    }

    private get menuList(): IItemListWindow {
        return asGuarded(this._container.findChildByName("menu_list"), isIItemListWindow);
    }

    public get menuItemTemplate(): IRegionWindow {
        return this._SafeStr_4532;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MenuPreset.#staticsReady) return;
        MenuPreset.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MenuPreset, name, { value, writable: true, configurable: true, enumerable: true });
        set("SPACER", null);
        set("SPACER", new MenuSpacer());
    }
}
