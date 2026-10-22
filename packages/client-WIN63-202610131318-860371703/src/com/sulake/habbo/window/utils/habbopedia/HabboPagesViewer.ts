import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { HTMLTextController } from '@/com/sulake/core/window/Classes.group';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

const habbopedia_window_layout_binAsset = embedBytes("window/habbopedia_window_layout.bin");
const habbopedia_edit_layout_binAsset = embedBytes("window/habbopedia_edit_layout.bin");
const habbopedia_css_binAsset = embedBytes("window/habbopedia_css.bin");

export class HabboPagesViewer implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.habbopedia::HabboPagesViewer'); }

    static #staticsReady = false;

    public static habbopedia_window_layout = habbopedia_window_layout_binAsset;

    public static habbopedia_edit_layout = habbopedia_edit_layout_binAsset;

    public static habbopedia_css = habbopedia_css_binAsset;

    public static get styleSheet(): StyleSheet {
        HabboPagesViewer.#initStatics();
        return HabboPagesViewer.styleSheet;
    }
    public static set styleSheet(value: StyleSheet) {
        HabboPagesViewer.#initStatics();
        HabboPagesViewer.styleSheet = value;
    }

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _window: IWindowContainer;

    constructor(param1: HabboWindowManagerComponent) {
        this._windowManager = param1;
        this._windowManager.context.addLinkEventTracker(this);
        HabboPagesViewer.createStyleSheet();
    }

    private static createStyleSheet(): StyleSheet {
        let _loc2_: StyleSheet = new StyleSheet();
        let _loc3_: ByteArray = asInstanceOf(new HabboPagesViewer.habbopedia_css(), ByteArray);
        let _loc1_: string = _loc3_.readUTFBytes(_loc3_.length);
        _loc2_.parseCSS(_loc1_);
        return _loc2_;
    }

    private set visible(param1: boolean) {
        if (this._window == null || Boolean(this._window.disposed)) {
            this._window = this.createWindow(HabboPagesViewer.habbopedia_window_layout, this.windowProcedure);
            (asGuarded(this._window.findChildByName("content"), isITextWindow)).styleSheet = HabboPagesViewer.styleSheet;
            (asGuarded(this._window.findChildByName("content"), isITextWindow)).addEventListener("WE_CHANGE", this.onChanged);
        }
        this._window.visible = param1;
    }

    private onChanged = (param1: WindowEvent): void => {
        (asGuarded(this._window.findChildByName("scroller"), isIScrollbarWindow)).scrollV = 0;
    };

    private get visible(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    private createWindow(param1: any, param2: (...args: any[]) => any): IWindowContainer {
        let _loc3_: ByteArray = asInstanceOf(new param1(), ByteArray);
        let _loc4_: XML = new XML(_loc3_.readUTFBytes(_loc3_.length));
        let _loc5_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(_loc4_), isIWindowContainer);
        _loc5_.procedure = param2;
        return _loc5_;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.visible = false;
                break;
            case "close":
                this._window.visible = false;
        }
    };

    private parseAndSetHtml(param1: string, param2: string): void {
        this._window.caption = param2;
        (asInstanceOf(this._window.findChildByName("content"), HTMLTextController)).htmlText = param1;
        (asGuarded(this._window.findChildByName("content"), isITextWindow)).styleSheet = HabboPagesViewer.styleSheet;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._windowManager = null;
    }

    public get disposed(): boolean {
        return this._windowManager == null;
    }

    public get linkPattern(): string {
        return "habbopages/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        _loc2_.shift();
        let _loc3_: string = _loc2_.join("/");
        this.openPage(_loc3_);
    }

    public openPage(param1: string): void {
        let _loc4_: AssetLoaderStruct = null;
        let _loc2_: string = this._windowManager.getProperty("habbopages.url");
        let _loc5_: string = _loc2_ + param1;
        if (this._windowManager.assets.hasAsset(_loc5_)) {
            Logger.log("[HabboPagesViewer] reload page: " + _loc5_);
            this._windowManager.assets.removeAsset(this._windowManager.assets.getAssetByName(_loc5_));
        }
        let _loc3_: URLRequest = new URLRequest(_loc2_ + param1);
        _loc4_ = this._windowManager.assets.loadAssetFromFile(_loc5_, _loc3_, "text/plain");
        _loc4_.addEventListener("AssetLoaderEventComplete", this.onDownloadComplete);
        _loc4_.addEventListener("AssetLoaderEventError", this.onDownloadError);
    }

    private onDownloadError = (param1: Event = null): void => {
        let _loc3_: AssetLoaderEvent = param1 instanceof AssetLoaderEvent ? param1 : null;
        let _loc2_: number = 0;
        if (_loc3_ != null) {
            _loc2_ = _loc3_.status;
        }
        HabboWebTools.logEventLog("habbopages download error " + _loc2_);
    };

    private onDownloadComplete = (param1: Event = null): void => {
        let _loc6_: any[] = null;
        let _loc7_: string = null;
        let _loc5_: string = null;
        let _loc4_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: RegExp = /\n\r|\n|\r/gm;
        let _loc3_: string = asGuarded(_loc4_.assetLoader.content, isString);
        if (_loc3_ != null) {
            _loc6_ = _loc3_.split(_loc2_);
            _loc7_ = stringOrNull(_loc6_.shift());
            _loc5_ = _loc6_.join("");
            this.visible = true;
            this.parseAndSetHtml(_loc5_, _loc7_);
            this._window.activate();
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboPagesViewer.#staticsReady) return;
        HabboPagesViewer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboPagesViewer, name, { value, writable: true, configurable: true, enumerable: true });
        set("styleSheet", null);
        set("styleSheet", HabboPagesViewer.createStyleSheet());
    }
}
