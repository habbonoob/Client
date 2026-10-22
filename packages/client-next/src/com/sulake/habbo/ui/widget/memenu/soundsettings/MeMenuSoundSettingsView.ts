import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomWidgetSettingsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSettingsUpdateEvent';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { MeMenuSoundSettingsItem } from '@/com/sulake/habbo/ui/widget/memenu/soundsettings/MeMenuSoundSettingsItem';
import { RoomWidgetGetSettingsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetSettingsMessage';
import { RoomWidgetStoreSettingsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetStoreSettingsMessage';

export class MeMenuSoundSettingsView implements IMeMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu.soundsettings::MeMenuSoundSettingsView'); }

    declare private _widget: MeMenuWidget;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3617: MeMenuSoundSettingsItem;

    declare private _SafeStr_3588: MeMenuSoundSettingsItem;

    declare private _SafeStr_3573: MeMenuSoundSettingsItem;

    declare private _soundsOffIconColor: BitmapData;

    declare private _soundsOffIconWhite: BitmapData;

    declare private _soundsOnIconColor: BitmapData;

    declare private _soundsOnIconWhite: BitmapData;

    private _genericVolume: number = 1;
    private _furniVolume: number = 1;
    private _traxVolume: number = 1;

    constructor() {
    }

    public init(param1: MeMenuWidget, param2: string): void {
        this._widget = param1;
        this.createWindow(param2);
    }

    public dispose(): void {
        this.saveVolume(this._genericVolume, this._furniVolume, this._traxVolume);
        this._widget = null;
        if (this._window != null) {
            this._window.dispose();
        }
        this._window = null;
        if (this._SafeStr_3617 != null) {
            this._SafeStr_3617.dispose();
        }
        this._SafeStr_3617 = null;
        if (this._SafeStr_3588 != null) {
            this._SafeStr_3588.dispose();
        }
        this._SafeStr_3588 = null;
        if (this._SafeStr_3573 != null) {
            this._SafeStr_3573.dispose();
        }
        this._SafeStr_3573 = null;
        if (this._soundsOffIconColor) {
            this._soundsOffIconColor.dispose();
            this._soundsOffIconColor = null;
        }
        if (this._soundsOffIconWhite) {
            this._soundsOffIconWhite.dispose();
            this._soundsOffIconWhite = null;
        }
        if (this._soundsOnIconColor) {
            this._soundsOnIconColor.dispose();
            this._soundsOnIconColor = null;
        }
        if (this._soundsOnIconWhite) {
            this._soundsOnIconWhite.dispose();
            this._soundsOnIconWhite = null;
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public updateSettings(param1: RoomWidgetSettingsUpdateEvent): void {
        this._genericVolume = param1.uiVolume;
        this._furniVolume = param1.furniVolume;
        this._traxVolume = param1.traxVolume;
        if (this._SafeStr_3617 != null) {
            this._SafeStr_3617.setValue(this._genericVolume);
        }
        if (this._SafeStr_3588 != null) {
            this._SafeStr_3588.setValue(this._furniVolume);
        }
        if (this._SafeStr_3573 != null) {
            this._SafeStr_3573.setValue(this._traxVolume);
        }
    }

    private createWindow(param1: string): void {
        let _loc2_: IWindow = null;
        let _loc5_: number = 0;
        let _loc4_: BitmapDataAsset = null;
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("memenu_settings"), XmlAsset);
        if (_loc3_) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        }
        if (this._window == null) {
            throw new Error("Failed to construct sound settings window from XML!");
        }
        this._window.name = param1;
        _loc5_ = 0;
        while (_loc5_ < this._window.numChildren) {
            _loc2_ = this._window.getChildAt(_loc5_);
            _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
            _loc5_++;
        }
        _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("sounds_off_color"), BitmapDataAsset);
        if (_loc4_ != null && _loc4_.content != null) {
            this._soundsOffIconColor = (asInstanceOf(_loc4_.content, BitmapData)).clone();
        }
        _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("sounds_off_white"), BitmapDataAsset);
        if (_loc4_ != null && _loc4_.content != null) {
            this._soundsOffIconWhite = (asInstanceOf(_loc4_.content, BitmapData)).clone();
        }
        _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("sounds_on_color"), BitmapDataAsset);
        if (_loc4_ != null && _loc4_.content != null) {
            this._soundsOnIconColor = (asInstanceOf(_loc4_.content, BitmapData)).clone();
        }
        _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("sounds_on_white"), BitmapDataAsset);
        if (_loc4_ != null && _loc4_.content != null) {
            this._soundsOnIconWhite = (asInstanceOf(_loc4_.content, BitmapData)).clone();
        }
        this._SafeStr_3617 = new MeMenuSoundSettingsItem(this, 0, this.uiVolumeContainer);
        this._SafeStr_3588 = new MeMenuSoundSettingsItem(this, 1, this.furniVolumeContainer);
        this._SafeStr_3573 = new MeMenuSoundSettingsItem(this, 2, this.traxVolumeContainer);
        this._widget.messageListener.processWidgetMessage(new RoomWidgetGetSettingsMessage("RWGSM_GET_SETTINGS"));
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        let _loc4_: string = _loc3_;
        if ("back_btn" !== _loc4_) {
            Logger.log("Me Menu Settings View: unknown button: " + _loc3_);
        } else {
            this._widget.changeView("me_menu_settings_view");
        }
    };

    public saveVolume(param1: number, param2: number, param3: number, param4: boolean = true): void {
        let _loc5_: RoomWidgetStoreSettingsMessage = null;
        if (param4) {
            _loc5_ = new RoomWidgetStoreSettingsMessage("RWSSM_STORE_SOUND");
        } else {
            _loc5_ = new RoomWidgetStoreSettingsMessage("RWSSM_PREVIEW_SOUND");
        }
        _loc5_.genericVolume = param1 != -1 ? param1 : this._genericVolume;
        _loc5_.furniVolume = param2 != -1 ? param2 : this._furniVolume;
        _loc5_.traxVolume = param3 != -1 ? param3 : this._traxVolume;
        this._widget.messageListener.processWidgetMessage(_loc5_);
    }

    public updateUnseenItemCount(param1: string, param2: number): void {
    }

    public get uiVolumeContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("ui_volume_container"), isIWindowContainer);
    }

    public get furniVolumeContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("furni_volume_container"), isIWindowContainer);
    }

    public get traxVolumeContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("trax_volume_container"), isIWindowContainer);
    }

    public get widget(): MeMenuWidget {
        return this._widget;
    }

    public get soundsOffIconColor(): BitmapData {
        return this._soundsOffIconColor;
    }

    public get soundsOffIconWhite(): BitmapData {
        return this._soundsOffIconWhite;
    }

    public get soundsOnIconColor(): BitmapData {
        return this._soundsOnIconColor;
    }

    public get soundsOnIconWhite(): BitmapData {
        return this._soundsOnIconWhite;
    }
}
