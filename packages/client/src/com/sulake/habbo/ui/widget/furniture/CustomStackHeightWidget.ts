import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SetCustomStackingHeightComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetCustomStackingHeightComposer';
import { FurnitureCustomStackHeightWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureCustomStackHeightWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class CustomStackHeightWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture::CustomStackHeightWidget'); }

    private static readonly SLIDER_RANGE: number = 10;
    private static readonly MAX_HEIGHT: number = 80;
    private static readonly SLIDER_BUTTON_WIDTH: number = 20;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        castTo(param1, FurnitureCustomStackHeightWidgetHandler).widget = this;
    }

    declare private _window: IWindowContainer;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _ignoreCheckboxEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxEvents = false; }

    public override get mainWindow(): IWindow {
        return this._window;
    }

    private get currentHeight(): number {
        return parseFloat(this._window.findChildByName("input_height").caption) * 100 | 0;
    }

    private get multiWalkMode(): boolean {
        return this.multiWalkCheckbox.isSelected;
    }

    private get handler(): FurnitureCustomStackHeightWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureCustomStackHeightWidgetHandler ? this._SafeStr_2143 : null;
    }

    private set altitude(param1: number) {
        if (this._window != null) {
            this._window.findChildByName("input_height").caption = param1.toString();
            this.updateSlider();
        }
    }

    private get walkTileContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("walktile_container"), isIWindowContainer);
    }

    private get multiWalkCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("multiwalk_checkbox"), isICheckBoxWindow);
    }

    public override dispose(): void {
        this.destroyWindow();
        super.dispose();
    }

    public open(param1: number, param2: number, param3: boolean, param4: boolean): void {
        this._furniId = param1;
        param2 = Math.min(param2, 80);
        if (this._window == null) {
            this.createWindow();
        }
        this.walkTileContainer.visible = param3;
        if (param3) {
            this._ignoreCheckboxEvents = true;
            if (param4) {
                this.multiWalkCheckbox.select();
            } else {
                this.multiWalkCheckbox.unselect();
            }
            this._ignoreCheckboxEvents = false;
        }
        this._window.height = param3 ? this._window.limits.maxHeight : this._window.limits.minHeight;
        let _loc5_: string = param3 ? "walk" : "stack";
        this._window.caption = this.localizations.getLocalization("widget.custom." + _loc5_ + ".height.title");
        this._window.findChildByName("height_text").caption = this.localizations.getLocalization("widget.custom." + _loc5_ + ".height.text");
        this._window.findChildByName("input_height").caption = param2.toString();
        this.updateSlider();
        this._window.visible = true;
    }

    public hide(): void {
        if (this._window == null) {
            return;
        }
        this._window.visible = false;
    }

    public updateHeight(param1: number, param2: number): void {
        if (this._furniId == param1) {
            this.altitude = param2;
        }
    }

    private createWindow(): void {
        if (!this._window) {
            this._window = castGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("custom_stack_height_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._window.procedure = this.windowProcedure;
            this._window.center();
            this.multiWalkCheckbox.addEventListener("WE_SELECTED", this.onMultiWalkChange);
            this.multiWalkCheckbox.addEventListener("WE_UNSELECTED", this.onMultiWalkChange);
        }
    }

    private onMultiWalkChange = (param1: WindowEvent): void => {
        if (this._ignoreCheckboxEvents) {
            return;
        }
        this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, this.currentHeight, this.multiWalkMode]));
    };

    private destroyWindow(): void {
        if (this._window) {
            this._window.procedure = null;
            this._window.dispose();
            this._window = null;
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: any;
        if (param2 == null) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_floor_level":
                    this.altitude = 0;
                    this.sendCurrentHeight();
                    break;
                case "button_above_stack":
                    this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, -100]));
                    break;
                case "header_button_close":
                    this.destroyWindow();
                    break;
                case "slider":
                    this._window.findChildByName("slider_button").x = castTo(param1, WindowMouseEvent).localX | 0;
                    this.sendCurrentHeight();
            }
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this.sendCurrentHeight();
            }
        } else if (param1.type == "WME_DOUBLE_CLICK") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this.updateHeightSelection(true);
                this.sendCurrentHeight();
            }
        } else if (param1.type == "WE_RELOCATED") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this.updateHeightSelection();
            }
        } else if (param1.type == "WKE_KEY_DOWN") {
            if (param2.name == "input_height") {
                if (castTo(param1, WindowKeyboardEvent).keyCode == 13) {
                    this.updateSlider();
                    this.sendCurrentHeight();
                }
            }
        }
    };

    private sendCurrentHeight(): void {
        this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, this.currentHeight]));
    }

    private updateSlider(): void {
        let _loc3_: number = parseFloat(this._window.findChildByName("input_height").caption);
        let _loc1_: number = _loc3_ / 10;
        _loc1_ = Math.min(_loc1_, 1);
        let _loc2_: number = this._window.findChildByName("slider").width - 20;
        this._window.procedure = null;
        this._window.findChildByName("slider_button").x = _loc2_ * _loc1_ | 0;
        this._window.procedure = this.windowProcedure;
    }

    private updateHeightSelection(param1: boolean = false): void {
        let _loc4_: number = param1 ? 1 : 100;
        let _loc3_: number = this._window.findChildByName("slider").width - 20;
        let _loc2_: number = this._window.findChildByName("slider_button").x / _loc3_;
        let _loc5_: number = _loc2_ * 10 * _loc4_;
        this._window.findChildByName("input_height").caption = ((_loc5_ | 0) / (_loc4_ * 1)).toString();
    }
}
