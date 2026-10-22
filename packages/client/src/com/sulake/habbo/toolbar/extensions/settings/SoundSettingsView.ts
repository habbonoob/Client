import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SoundSettingsItem } from '@/com/sulake/habbo/toolbar/extensions/settings/SoundSettingsItem';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class SoundSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.settings::SoundSettingsView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        SoundSettingsView.#initStatics();
        return SoundSettingsView._log;
    }

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this.createWindow();
    }

    declare private _SafeStr_3617: SoundSettingsItem;

    declare private _SafeStr_3588: SoundSettingsItem;

    declare private _SafeStr_3573: SoundSettingsItem;

    private _genericVolume: number = 1;
    private _furniVolume: number = 1;
    private _traxVolume: number = 1;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    declare private _soundsOffIconColor: BitmapData;

    public get soundsOffIconColor(): BitmapData {
        return this._soundsOffIconColor;
    }

    declare private _soundsOffIconWhite: BitmapData;

    public get soundsOffIconWhite(): BitmapData {
        return this._soundsOffIconWhite;
    }

    declare private _soundsOnIconColor: BitmapData;

    public get soundsOnIconColor(): BitmapData {
        return this._soundsOnIconColor;
    }

    declare private _soundsOnIconWhite: BitmapData;

    public get soundsOnIconWhite(): BitmapData {
        return this._soundsOnIconWhite;
    }

    declare private _toolbar: HabboToolbar;

    public get toolbar(): HabboToolbar {
        return this._toolbar;
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

    public dispose(): void {
        this.saveVolume(this._genericVolume, this._furniVolume, this._traxVolume);
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

    public updateSettings(): void {
        this._genericVolume = this._toolbar.soundManager.genericVolume;
        this._furniVolume = this._toolbar.soundManager.furniVolume;
        this._traxVolume = this._toolbar.soundManager.traxVolume;
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

    public saveVolume(param1: number, param2: number, param3: number, param4: boolean = true): void {
        let _loc6_: number = param2 != -1 ? param2 : this._furniVolume;
        let _loc5_: number = param1 != -1 ? param1 : this._genericVolume;
        let _loc7_: number = param3 != -1 ? param3 : this._traxVolume;
        if (param4) {
            if (this._toolbar == null) {
                return;
            }
            this._toolbar.soundManager.furniVolume = _loc6_;
            this._toolbar.soundManager.genericVolume = _loc5_;
            this._toolbar.soundManager.traxVolume = _loc7_;
        } else {
            this._toolbar.soundManager.previewVolume(_loc5_, _loc6_, _loc7_);
        }
    }

    public updateUnseenItemCount(param1: string, param2: number): void {
    }

    private createWindow(): void {
        let _loc1_: IWindow = null;
        let _loc3_: number = 0;
        let _loc2_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("me_menu_sound_settings_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        _loc3_ = 0;
        while (_loc3_ < this._window.numChildren) {
            _loc1_ = this._window.getChildAt(_loc3_);
            _loc1_.addEventListener("WME_CLICK", this.onButtonClicked);
            _loc3_++;
        }
        this._SafeStr_3617 = new SoundSettingsItem(this, 0, this.uiVolumeContainer);
        this._SafeStr_3588 = new SoundSettingsItem(this, 1, this.furniVolumeContainer);
        this._SafeStr_3573 = new SoundSettingsItem(this, 2, this.traxVolumeContainer);
        this.updateSettings();
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        SoundSettingsView._log.info(_loc3_);
        let _loc4_: any = _loc3_;
        if ("back_btn" !== _loc4_) {
            SoundSettingsView._log.warn("Me Menu Settings View: unknown button: " + _loc3_);
        } else {
            this.dispose();
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SoundSettingsView.#staticsReady) return;
        SoundSettingsView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SoundSettingsView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.toolbar.extensions.settings.SoundSettingsView"));
    }
}
