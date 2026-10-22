import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuSoundSettingsView } from '@/com/sulake/habbo/toolbar/memenu/soundsettings/MeMenuSoundSettingsView';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MeMenuSoundSettingsSlider } from '@/com/sulake/habbo/toolbar/memenu/soundsettings/MeMenuSoundSettingsSlider';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class MeMenuSoundSettingsItem implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu.soundsettings::MeMenuSoundSettingsItem'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        MeMenuSoundSettingsItem.#initStatics();
        return MeMenuSoundSettingsItem._log;
    }

    public static readonly TYPE_UI_VOLUME: number = 0;
    public static readonly TYPE_FURNI_VOLUME: number = 1;
    public static readonly TYPE_TRAX_VOLUME: number = 2;

    constructor(param1: MeMenuSoundSettingsView, param2: number, param3: IWindowContainer) {
        let _loc4_: IWindow = null;
        this._type = param2;
        this._SafeStr_2614 = param1;
        this._window = param3;
        this._slider = new MeMenuSoundSettingsSlider(this, asGuarded(this._window.findChildByName("volume_container"), isIWindowContainer), this._SafeStr_2614.widget.toolbar.assets, 0, 1);
        _loc4_ = this._window.findChildByName("sounds_off");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        _loc4_ = this._window.findChildByName("sounds_on");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        this.updateSoundIcons();
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _volume: number;
    static { (this.prototype as any)._volume = NaN; }

    declare private _window: IWindowContainer;

    declare private _slider: MeMenuSoundSettingsSlider;

    declare private _SafeStr_2614: MeMenuSoundSettingsView;

    public get disposed(): boolean {
        return this._SafeStr_2614 == null;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._slider) {
                this._slider.dispose();
                this._slider = null;
            }
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
        }
    }

    public saveVolume(param1: number, param2: boolean): void {
        this._volume = param1;
        switch (this._type) {
            case 0:
                this._SafeStr_2614.saveVolume(param1, -1, -1, param2);
                break;
            case 1:
                this._SafeStr_2614.saveVolume(-1, param1, -1, param2);
                break;
            case 2:
                this._SafeStr_2614.saveVolume(-1, -1, param1, param2);
        }
        this.updateSoundIcons();
        this._SafeStr_2614.updateSettings();
    }

    public setValue(param1: number): void {
        this._slider.setValue(param1);
        this.updateSoundIcons();
    }

    private updateSoundIcons(): void {
        if (this._volume == 0) {
            this.setBitmap("sounds_on_icon", "sounds_on_white");
            this.setBitmap("sounds_off_icon", "sounds_off_color");
        } else {
            this.setBitmap("sounds_on_icon", "sounds_on_color");
            this.setBitmap("sounds_off_icon", "sounds_off_white");
        }
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "sounds_off":
                this.saveVolume(0, false);
                break;
            case "sounds_on":
                this.saveVolume(1, false);
                break;
            default:
                MeMenuSoundSettingsItem._log.warn("Me Menu Settings, Sound settings item: unknown button: " + _loc3_);
        }
    };

    private setBitmap(param1: string, param2: string): void {
        castGuarded(this._window.findChildByName(param1), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "toolbar_memenu_settings_" + param2;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MeMenuSoundSettingsItem.#staticsReady) return;
        MeMenuSoundSettingsItem.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MeMenuSoundSettingsItem, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.toolbar.memenu.soundsettings.MeMenuSoundSettingsItem"));
    }

    get [IDisposable](): true {
        return true;
    }
}
