import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MysteryBoxKeysUpdateEvent } from '@/com/sulake/habbo/session/events/MysteryBoxKeysUpdateEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { FurnitureContextMenuWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureContextMenuWidgetHandler';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MysteryBoxToolbarExtension implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.mysterybox::MysteryBoxToolbarExtension'); }

    static #staticsReady = false;

    private static get _SafeStr_7679(): string {
        MysteryBoxToolbarExtension.#initStatics();
        return MysteryBoxToolbarExtension._SafeStr_7679;
    }

    public static get KEY_COLORS(): Map<any, any> {
        MysteryBoxToolbarExtension.#initStatics();
        return MysteryBoxToolbarExtension.KEY_COLORS;
    }

    constructor(param1: FurnitureContextMenuWidgetHandler) {
        this._SafeStr_2143 = param1;
    }

    declare private _window: IWindowContainer;

    declare private _SafeStr_2143: FurnitureContextMenuWidgetHandler;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get minimised(): boolean {
        return this._SafeStr_2143 != null && this._SafeStr_2143.container.config.getBoolean("mystery_box_toolbar_extension_minimised");
    }

    public createWindow(): void {
        let _loc1_: XML = asInstanceOf(this._SafeStr_2143.widget.assets.getAssetByName("mystery_box_toolbar_extension").content, XML);
        this._window = asGuarded(this._SafeStr_2143.container.windowManager.buildFromXML(_loc1_), isIWindowContainer);
        this._window.findChildByName("faq_link").visible = this._SafeStr_2143.container.config.getProperty("mysterybox.faq.url") != "";
        this._window.procedure = this.windowProcedure;
        this._SafeStr_2143.container.toolbar.extensionView.attachExtension("mystery_box", this._window);
        let _loc2_: ISessionDataManager = this._SafeStr_2143.container.sessionDataManager;
        _loc2_.events.addEventListener("mbke_update", this.onKeysUpdated);
        this.setMinimised(this.minimised);
        this.setKeyColors(_loc2_.mysteryBoxColor, _loc2_.mysteryKeyColor);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2143 != null) {
            if (this._SafeStr_2143.container) {
                this._SafeStr_2143.container.toolbar.extensionView.detachExtension("mystery_box");
                this._SafeStr_2143.container.sessionDataManager.events.removeEventListener("mbke_update", this.onKeysUpdated);
            }
            this._SafeStr_2143 = null;
        }
        this._disposed = true;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param1.target.name) {
            case "minimize_region":
                this.setMinimised(true);
                break;
            case "maximize_region":
                this.setMinimised(false);
                break;
            case "faq_link":
                HabboWebTools.openWebPage(this._SafeStr_2143.container.config.getProperty("mysterybox.faq.url"), "habboMain");
        }
    };

    private setKeyColors(param1: string, param2: string): void {
        let _loc3_: any = 0;
        let _loc6_: any = 0;
        if (this._window == null) {
            return;
        }
        let _loc5_: boolean = param1 != null && param1 != "";
        this._window.findChildByName("box_colour").visible = _loc5_;
        this._window.findChildByName("box_overlay").visible = _loc5_;
        this._window.findChildByName("small_box").visible = _loc5_ && this.minimised;
        castGuarded(this._window.findChildByName("box_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").toolTipCaption = _loc5_ ? "${mysterybox.tracker.box." + param1.toLowerCase() + "}" : "";
        if (_loc5_) {
            _loc3_ = MysteryBoxToolbarExtension.KEY_COLORS.get(param1.toLowerCase()) >>> 0;
            this._window.findChildByName("box_colour").color = _loc3_ >>> 0;
            this._window.findChildByName("small_box").color = _loc3_ >>> 0;
        }
        let _loc4_: boolean = param2 != null && param2 != "";
        this._window.findChildByName("key_colour").visible = _loc4_;
        this._window.findChildByName("key_overlay").visible = _loc4_;
        this._window.findChildByName("small_key").visible = _loc4_ && this.minimised;
        castGuarded(this._window.findChildByName("key_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").toolTipCaption = _loc4_ ? "${mysterybox.tracker.key." + param2.toLowerCase() + "}" : "";
        if (_loc4_) {
            _loc6_ = MysteryBoxToolbarExtension.KEY_COLORS.get(param2.toLowerCase()) >>> 0;
            this._window.findChildByName("key_colour").color = _loc6_ >>> 0;
            this._window.findChildByName("small_key").color = _loc6_ >>> 0;
        }
    }

    private setMinimised(param1: boolean): void {
        if (this._SafeStr_2143 != null && this._window != null) {
            if (param1) {
                this._window.findChildByName("minimize_region").visible = false;
                this._window.findChildByName("maximize_region").visible = true;
                this._window.findChildByName("small_box").visible = this._window.findChildByName("box_colour").visible;
                this._window.findChildByName("small_key").visible = this._window.findChildByName("key_colour").visible;
                this._window.height = 25;
            } else {
                this._window.findChildByName("minimize_region").visible = true;
                this._window.findChildByName("maximize_region").visible = false;
                this._window.findChildByName("small_box").visible = false;
                this._window.findChildByName("small_key").visible = false;
                this._window.height = 137;
            }
            this._SafeStr_2143.container.config.setProperty("mystery_box_toolbar_extension_minimised", param1.toString());
        }
    }

    private onKeysUpdated = (param1: MysteryBoxKeysUpdateEvent): void => {
        this.setKeyColors(param1.boxColor, param1.keyColor);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MysteryBoxToolbarExtension.#staticsReady) return;
        MysteryBoxToolbarExtension.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MysteryBoxToolbarExtension, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_7679", null);
        set("KEY_COLORS", null);
        set("_SafeStr_7679", "mystery_box_toolbar_extension_minimised");
        set("KEY_COLORS", new Dictionary());
        MysteryBoxToolbarExtension.KEY_COLORS.set("purple", 9452386);
        MysteryBoxToolbarExtension.KEY_COLORS.set("blue", 3891856);
        MysteryBoxToolbarExtension.KEY_COLORS.set("green", 6459451);
        MysteryBoxToolbarExtension.KEY_COLORS.set("yellow", 10658089);
        MysteryBoxToolbarExtension.KEY_COLORS.set("lilac", 6897548);
        MysteryBoxToolbarExtension.KEY_COLORS.set("orange", 10841125);
        MysteryBoxToolbarExtension.KEY_COLORS.set("turquoise", 2661026);
        MysteryBoxToolbarExtension.KEY_COLORS.set("red", 10104881);
    }

    get [IDisposable](): true {
        return true;
    }
}
