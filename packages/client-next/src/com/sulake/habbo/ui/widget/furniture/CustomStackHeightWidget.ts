import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SetAdjacentCustomStackingHeightComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetAdjacentCustomStackingHeightComposer';
import { SetCustomStackingHeightComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetCustomStackingHeightComposer';
import { FurnitureCustomStackHeightWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureCustomStackHeightWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class CustomStackHeightWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture::CustomStackHeightWidget'); }

    private static readonly SLIDER_RANGE: number = 10;
    private static readonly MAX_HEIGHT: number = 80;
    private static readonly SLIDER_BUTTON_WIDTH: number = 20;
    private static readonly SLIDER_LIVE_UPDATE_INTERVAL_MS: number = 30;

    declare private _window: IWindowContainer;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _ignoreCheckboxEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxEvents = false; }

    declare private _ignoreInputChangeEvents: boolean;
    static { (this.prototype as any)._ignoreInputChangeEvents = false; }

    declare private _SafeStr_14745: boolean;
    static { (this.prototype as any)._SafeStr_14745 = false; }

    declare private _hasUnsavedInputChanges: boolean;
    static { (this.prototype as any)._hasUnsavedInputChanges = false; }

    declare private _SafeStr_14746: boolean;
    static { (this.prototype as any)._SafeStr_14746 = false; }

    declare private _SafeStr_14747: boolean;
    static { (this.prototype as any)._SafeStr_14747 = false; }

    declare private _SafeStr_14748: boolean;
    static { (this.prototype as any)._SafeStr_14748 = false; }

    private _lastSliderSendTime: number = -30;
    private _SafeStr_14749: number = NaN;

    declare private _SafeStr_14750: Timer;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        castTo(param1, FurnitureCustomStackHeightWidgetHandler).widget = this;
        this._SafeStr_14750 = new Timer(30, 1);
        this._SafeStr_14750.addEventListener("timerComplete", this.onSliderSendTimer);
    }

    public override dispose(): void {
        this.destroyWindow();
        if (this._SafeStr_14750) {
            this._SafeStr_14750.stop();
            this._SafeStr_14750.removeEventListener("timerComplete", this.onSliderSendTimer);
            this._SafeStr_14750 = null;
        }
        super.dispose();
    }

    public override get mainWindow(): IWindow {
        return this._window;
    }

    private createWindow(): void {
        if (!this._window) {
            this._window = castGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("custom_stack_height_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._window.procedure = this.windowProcedure;
            this._window.center();
            this.multiWalkCheckbox.addEventListener("WE_SELECTED", this.onMultiWalkChange);
            this.multiWalkCheckbox.addEventListener("WE_UNSELECTED", this.onMultiWalkChange);
            this.inputHeightField.addEventListener("WE_CHANGE", this.onInputHeightChange);
            this.inputHeightField.addEventListener("WE_UNFOCUS", this.onInputHeightUnfocus);
            this.inputHeightField.addEventListener("WE_UNFOCUSED", this.onInputHeightUnfocus);
        }
    }

    private onMultiWalkChange = (param1: WindowEvent): void => {
        if (this._ignoreCheckboxEvents) {
            return;
        }
        this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, this.currentHeight, this.multiWalkMode]));
    };

    public open(param1: number, param2: number, param3: boolean, param4: boolean): void {
        this._furniId = param1;
        param2 = Math.min(param2, 80);
        this.resetInteractionState();
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
        this._SafeStr_14749 = param2;
        this._window.caption = this.localizations.getLocalization("widget.custom." + _loc5_ + ".height.title");
        this._window.findChildByName("height_text").caption = this.localizations.getLocalization("widget.custom." + _loc5_ + ".height.text");
        this.setInputHeightCaption(param2.toString());
        this.updateSlider();
        this._window.visible = true;
    }

    public hide(): void {
        if (this._window == null) {
            return;
        }
        this.resetInteractionState();
        this._window.visible = false;
    }

    private destroyWindow(): void {
        if (this._window) {
            this.cancelPendingSliderSend();
            this.multiWalkCheckbox.removeEventListener("WE_SELECTED", this.onMultiWalkChange);
            this.multiWalkCheckbox.removeEventListener("WE_UNSELECTED", this.onMultiWalkChange);
            this.inputHeightField.removeEventListener("WE_CHANGE", this.onInputHeightChange);
            this.inputHeightField.removeEventListener("WE_UNFOCUS", this.onInputHeightUnfocus);
            this.inputHeightField.removeEventListener("WE_UNFOCUSED", this.onInputHeightUnfocus);
            this._window.procedure = null;
            this._window.dispose();
            this._window = null;
        }
        this.resetInteractionState();
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string;
        if (param2 == null) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_floor_level":
                    this.cancelPendingSliderSend();
                    this.discardInputHeightEdit();
                    this.altitude = 0;
                    this.sendCurrentHeight();
                    break;
                case "button_above_stack":
                    this.cancelPendingSliderSend();
                    this.discardInputHeightEdit();
                    this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, -100]));
                    break;
                case "button_move_down":
                    this.cancelPendingSliderSend();
                    this.discardInputHeightEdit();
                    this.sendAdjacentHeightRequest(true);
                    break;
                case "button_move_up":
                    this.cancelPendingSliderSend();
                    this.discardInputHeightEdit();
                    this.sendAdjacentHeightRequest(false);
                    break;
                case "header_button_close":
                    this.destroyWindow();
                    break;
                case "slider":
                    this.discardInputHeightEdit();
                    this.sliderButton.x = this.clampSliderButtonX(castTo(param1, WindowMouseEvent).localX) | 0;
                    this.updateHeightSelection();
                    this.sendCurrentHeight();
                    this._lastSliderSendTime = getTimer();
            }
        } else if (param1.type == "WME_DOWN") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this._SafeStr_14745 = true;
                this.discardInputHeightEdit();
                this._SafeStr_14746 = false;
            }
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this._SafeStr_14745 = false;
                if (this._SafeStr_14746) {
                    this.requestFinalSliderSend();
                }
            }
        } else if (param1.type == "WME_DOUBLE_CLICK") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this.discardInputHeightEdit();
                this.updateHeightSelection(true);
                this.sendCurrentHeight();
                this._lastSliderSendTime = getTimer();
            }
        } else if (param1.type == "WE_RELOCATED") {
            _loc3_ = param2.name;
            if ("slider_button" === _loc3_) {
                this.updateHeightSelection();
                if (this._SafeStr_14745) {
                    this._SafeStr_14746 = true;
                    this.queueSliderLiveSend();
                }
            }
        } else if (param1.type == "WKE_KEY_DOWN") {
            if (param2.name == "input_height") {
                if (castTo(param1, WindowKeyboardEvent).keyCode == 13) {
                    this.cancelPendingSliderSend();
                    this._hasUnsavedInputChanges = false;
                    this.updateSlider();
                    this.sendCurrentHeight();
                }
            }
        }
    };

    private sendCurrentHeight(): void {
        this.handler.container.connection.send(new SetCustomStackingHeightComposer([this._furniId, this.currentHeight]));
    }

    private sendAdjacentHeightRequest(param1: boolean): void {
        this.handler.container.connection.send(new SetAdjacentCustomStackingHeightComposer(this._furniId, param1));
    }

    private get currentHeight(): number {
        return this.currentHeightValue * 100 | 0;
    }

    private get multiWalkMode(): boolean {
        return this.multiWalkCheckbox.isSelected;
    }

    private updateSlider(): void {
        let _loc3_: number = this.currentHeightValue;
        let _loc1_: number = _loc3_ / 10;
        _loc1_ = Math.min(_loc1_, 1);
        let _loc2_: number = this.slider.width - 20;
        this._window.procedure = null;
        this.sliderButton.x = _loc2_ * _loc1_ | 0;
        this._window.procedure = this.windowProcedure;
    }

    private updateHeightSelection(param1: boolean = false): void {
        let _loc4_: number = param1 ? 1 : 100;
        let _loc3_: number = this.slider.width - 20;
        let _loc2_: number = this.clampSliderButtonX(this.sliderButton.x) / _loc3_;
        let _loc5_: number = _loc2_ * 10 * _loc4_;
        this.setInputHeightCaption(((_loc5_ | 0) / (_loc4_ * 1)).toString());
    }

    private get handler(): FurnitureCustomStackHeightWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureCustomStackHeightWidgetHandler ? this._SafeStr_2143 : null;
    }

    private set altitude(param1: number) {
        if (this._window != null) {
            this.setInputHeightCaption(param1.toString());
            this.updateSlider();
        }
    }

    public updateHeight(param1: number, param2: number): void {
        if (this._furniId == param1) {
            this._SafeStr_14749 = param2;
            if (this.canApplyLiveHeight()) {
                this.altitude = param2;
            }
        }
    }

    private get walkTileContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("walktile_container"), isIWindowContainer);
    }

    private get multiWalkCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("multiwalk_checkbox"), isICheckBoxWindow);
    }

    private get inputHeightField(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("input_height"), isITextFieldWindow);
    }

    private get slider(): IWindow {
        return this._window.findChildByName("slider");
    }

    private get sliderButton(): IWindow {
        return this._window.findChildByName("slider_button");
    }

    private get currentHeightValue(): number {
        let _loc1_: number = parseFloat(this.inputHeightField.caption);
        return isNaN(_loc1_) ? 0 : _loc1_;
    }

    private onInputHeightChange = (param1: WindowEvent): void => {
        if (this._ignoreInputChangeEvents) {
            return;
        }
        this._hasUnsavedInputChanges = true;
    };

    private onInputHeightUnfocus = (param1: WindowEvent): void => {
        if (this._hasUnsavedInputChanges && !isNaN(this._SafeStr_14749)) {
            this.altitude = this._SafeStr_14749;
        }
        this._hasUnsavedInputChanges = false;
    };

    private queueSliderLiveSend(): void {
        this._SafeStr_14747 = true;
        this.scheduleSliderSend();
    }

    private requestFinalSliderSend(): void {
        this._SafeStr_14748 = true;
        this.scheduleSliderSend();
    }

    private scheduleSliderSend(): void {
        if (!this._SafeStr_14750) {
            return;
        }
        let _loc1_: number = getTimer() - this._lastSliderSendTime;
        if (_loc1_ >= 30) {
            this.sendPendingSliderHeight();
            return;
        }
        this._SafeStr_14750.reset();
        this._SafeStr_14750.delay = Math.max(1, 30 - _loc1_);
        this._SafeStr_14750.start();
    }

    private onSliderSendTimer = (param1: TimerEvent): void => {
        this.sendPendingSliderHeight();
    };

    private sendPendingSliderHeight(): void {
        if (!this._SafeStr_14747 && !this._SafeStr_14748) {
            return;
        }
        this.sendCurrentHeight();
        this._lastSliderSendTime = getTimer();
        this._SafeStr_14747 = false;
        if (!this._SafeStr_14745) {
            this._SafeStr_14748 = false;
        }
    }

    private cancelPendingSliderSend(): void {
        if (this._SafeStr_14750) {
            this._SafeStr_14750.reset();
        }
        this._SafeStr_14747 = false;
        this._SafeStr_14748 = false;
        this._SafeStr_14745 = false;
        this._SafeStr_14746 = false;
    }

    private resetInteractionState(): void {
        this.cancelPendingSliderSend();
        this._hasUnsavedInputChanges = false;
        this._lastSliderSendTime = -30;
    }

    private canApplyLiveHeight(): boolean {
        return !this._SafeStr_14745 && !this._hasUnsavedInputChanges && !this._SafeStr_14748 && !this._SafeStr_14747;
    }

    private discardInputHeightEdit(): void {
        this._hasUnsavedInputChanges = false;
    }

    private setInputHeightCaption(param1: string): void {
        this._ignoreInputChangeEvents = true;
        this.inputHeightField.caption = param1;
        this._ignoreInputChangeEvents = false;
    }

    private clampSliderButtonX(param1: number): number {
        return Math.max(0, Math.min(param1, this.slider.width - 20));
    }
}
