import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { SetRoomBackgroundColorDataComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetRoomBackgroundColorDataComposer';
import { FurnitureBackgroundColorWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureBackgroundColorWidgetHandler';
import { BackgroundColorWidgetSlider } from '@/com/sulake/habbo/ui/widget/furniture/backgroundcolor/BackgroundColorWidgetSlider';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class BackgroundColorFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.backgroundcolor::BackgroundColorFurniWidget'); }

    private static readonly PARAMETER_HUE: string = "hue";
    private static readonly PARAMETER_SATURATION: string = "saturation";
    private static readonly PARAMETER_LIGHTNESS: string = "lightness";

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        this.handler.widget = this;
    }

    declare private _window: IFrameWindow;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    private _sliders: BackgroundColorWidgetSlider[] = [];

    declare private _hue: number;
    static { (this.prototype as any)._hue = 0; }

    declare private _saturation: number;
    static { (this.prototype as any)._saturation = 0; }

    declare private _lightness: number;
    static { (this.prototype as any)._lightness = 0; }

    public get handler(): FurnitureBackgroundColorWidgetHandler {
        return this._SafeStr_2143 instanceof FurnitureBackgroundColorWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        this.destroyWindow();
        super.dispose();
    }

    public open(param1: number, param2: number, param3: number, param4: number): void {
        this._furniId = param1;
        this._hue = Math.max(param2, 0) | 0;
        this._saturation = Math.max(param3, 0) | 0;
        this._lightness = Math.max(param4, 0) | 0;
        this.createWindow();
    }

    public setParameterCallback(param1: string, param2: number): void {
        switch (param1) {
            case "hue":
                this._hue = param2;
                break;
            case "saturation":
                this._saturation = param2;
                break;
            case "lightness":
                this._lightness = param2;
        }
        this.renderColorPreview();
    }

    private createWindow(): void {
        if (!this._window) {
            this._window = castGuarded(this.windowManager.buildFromXML(asInstanceOf(this.assets.getAssetByName("background_color_ui_xml").content, XML)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._window.procedure = this.windowProcedure;
            this._window.center();
            this._sliders.push(new BackgroundColorWidgetSlider(this, "hue", castGuarded(this._window.findChildByName("hue_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), this._hue));
            this._sliders.push(new BackgroundColorWidgetSlider(this, "saturation", castGuarded(this._window.findChildByName("saturation_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), this._saturation));
            this._sliders.push(new BackgroundColorWidgetSlider(this, "lightness", castGuarded(this._window.findChildByName("lightness_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), this._lightness));
        }
    }

    private destroyWindow(): void {
        for (const _loc1_ of this._sliders ?? []) {
            _loc1_.dispose();
        }
        this._sliders = [];
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private renderColorPreview(): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName("color_preview_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc2_: BitmapData = new BitmapData(_loc3_.width, _loc3_.height, false);
        let _loc1_: number = ColorConverter.hslToRGB(((this._hue & 0xFF) << 16) + ((this._saturation & 0xFF) << 8) + (this._lightness & 0xFF) >>> 0);
        _loc2_.fillRect(_loc2_.rect, _loc1_);
        _loc3_.bitmap = _loc2_;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param2 != null && param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "apply_button":
                    this.handler.container.connection.send(new SetRoomBackgroundColorDataComposer(this._furniId, this._hue, this._saturation, this._lightness));
                    break;
                case "on_off_button":
                    this.handler.container.connection.send(new UseFurnitureMessageComposer(this._furniId));
                    break;
                case "header_button_close":
                    this.destroyWindow();
            }
        }
    };
}
