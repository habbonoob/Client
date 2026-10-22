import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IChatStyle } from '@/com/sulake/habbo/freeflowchat/style/IChatStyle';
import type { IChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/style/IChatStyleLibrary';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ChatStyle } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ChatStyleLibrary implements IDisposable, IChatStyleLibrary {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization.style::ChatStyleLibrary'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ChatStyleLibrary.#initStatics();
        return ChatStyleLibrary._log;
    }

    private readonly DEFAULT_STYLE: number = 0;

    constructor(param1: IAssetLibrary) {
        let _loc8_: number = 0;
        let _loc9_: string = null;
        let _loc6_: any = false;
        let _loc2_: any = false;
        let _loc3_: any = false;
        let _loc5_: any = false;
        let _loc7_: any = false;
        let _loc12_: any = false;
        let _loc4_: any = false;
        let _loc10_: ChatStyle = null;
        this._styles = new UtilsMap();
        this._assets = param1;
        let _loc11_: XML = XML.from(this._assets.getAssetByName("chatstyles_xml").content);
        for (const _loc13_ of _loc11_.child("style") ?? []) {
            _loc8_ = Number(_loc13_.attribute("id").item(0)) | 0;
            _loc9_ = _loc13_.attribute("assetId").item(0)?.toString() ?? null;
            _loc6_ = _loc13_.attribute("systemStyle").item(0)?.toString() == "true";
            _loc2_ = _loc13_.attribute("purchasable").item(0)?.toString() == "true";
            _loc3_ = _loc13_.attribute("hcOnly").item(0)?.toString() == "true";
            _loc5_ = _loc13_.attribute("staffOverrideable").item(0)?.toString() == "true";
            _loc7_ = _loc13_.attribute("allowHTML").item(0)?.toString() == "true";
            _loc12_ = _loc13_.attribute("ambassadorOnly").item(0)?.toString() == "true";
            _loc4_ = _loc13_.attribute("notification").item(0)?.toString() == "true";
            try {
                _loc10_ = this.initializeStyleFromAssets(_loc9_, _loc6_, _loc2_, _loc3_, _loc5_, _loc7_, _loc12_, _loc4_);
                this._styles.add(_loc8_, _loc10_);
            } catch (e) {
                ChatStyleLibrary._log.error("Error initializing chat style: " + _loc8_ + ", error message: " + e.message);
            }
        }
    }

    declare private _assets: IAssetLibrary;

    declare private _styles: UtilsMap;

    public get disposed(): boolean {
        return this._assets == null;
    }

    public dispose(): void {
        this._styles.dispose();
        this._styles = null;
        this._assets = null;
    }

    public getStyleIds(): any[] {
        return this._styles.getKeys();
    }

    public getStyle(param1: number): IChatStyle {
        if (this._styles.hasKey(param1)) {
            return this._styles.getValue(param1);
        }
        return this._styles.getValue(0);
    }

    private initializeStyleFromAssets(param1: string, param2: boolean, param3: boolean, param4: boolean, param5: boolean, param6: boolean, param7: boolean, param8: boolean): ChatStyle {
        let _loc17_: BitmapData = null;
        let _loc32_: string = String(this._assets.getAssetByName("style_" + param1 + "_regpoints").content);
        let _loc33_: BitmapData = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_base").content, BitmapData);
        let _loc23_: Rectangle = new Rectangle(this.getConfigPoint(_loc32_, "9sliceXY").x, this.getConfigPoint(_loc32_, "9sliceXY").y, this.getConfigPoint(_loc32_, "9sliceWH").x, this.getConfigPoint(_loc32_, "9sliceWH").y);
        let _loc18_: Point = this.hasConfig(_loc32_, "faceXY") ? this.getConfigPoint(_loc32_, "faceXY") : null;
        let _loc27_: number = 0;
        let _loc28_: any[] = null;
        let _loc25_: boolean = this.hasConfig(_loc32_, "anonymous") ? this.getConfigBoolean(_loc32_, "anonymous") : false;
        if (!_loc25_) {
            _loc17_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_pointer").content, BitmapData);
            _loc27_ = this.getConfigCSV(_loc32_, "pointerY")[0] | 0;
            _loc28_ = this.hasConfig(_loc32_, "pointerXMargins") ? this.getConfigIntArray(_loc32_, "pointerXMargins") : null;
        }
        let _loc9_: BitmapData = this._assets.hasAsset("style_" + param1 + "_icon") ? asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_icon").content, BitmapData) : null;
        let _loc16_: Rectangle = this.getConfigRect(_loc32_, "textFieldMargins");
        let _loc26_: BitmapData = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_selector_preview").content, BitmapData);
        let _loc10_: BitmapData = null;
        if (this._assets.hasAsset("style_" + param1 + "_chat_bubble_color")) {
            _loc10_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_color").content, BitmapData);
        }
        let _loc31_: Point = this.hasConfig(_loc32_, "colorXY") ? this.getConfigPoint(_loc32_, "colorXY") : null;
        let _loc14_: Rectangle = this.hasConfig(_loc32_, "overlapRect") ? this.getConfigRect(_loc32_, "overlapRect") : null;
        let _loc22_: number = (this.hasConfig(_loc32_, "textColorRGB") ? this.getConfigCSV(_loc32_, "textColorRGB")[0] >>> 0 : 0) >>> 0;
        let _loc12_: string = stringOrNull(this.hasConfig(_loc32_, "fontFace") ? this.getConfigCSV(_loc32_, "fontFace")[0] : "Volter");
        let _loc29_: number = this.hasConfig(_loc32_, "fontSize") ? this.getConfigCSV(_loc32_, "fontSize")[0] | 0 : 9;
        let _loc24_: TextFormat = new TextFormat(_loc12_, _loc29_, _loc22_);
        let _loc20_: number = this.hasConfig(_loc32_, "linkColorRGB") ? this.getConfigCSV(_loc32_, "linkColorRGB")[0] >>> 0 : _loc22_;
        let _loc30_: number = this.hasConfig(_loc32_, "linkHoverColorRGB") ? this.getConfigCSV(_loc32_, "linkHoverColorRGB")[0] >>> 0 : _loc22_;
        let _loc21_: number = this.hasConfig(_loc32_, "linkActiveColorRGB") ? this.getConfigCSV(_loc32_, "linkActiveColorRGB")[0] >>> 0 : _loc22_;
        let _loc11_: StyleSheet = new StyleSheet();
        let _loc13_: any = {};
        _loc13_.textDecoration = "underline";
        _loc13_.color = this.toHexString(_loc20_);
        _loc11_.setStyle("a:link", _loc13_);
        let _loc19_: any = {};
        _loc19_.color = this.toHexString(_loc21_);
        _loc11_.setStyle("a:active", _loc19_);
        let _loc15_: any = {};
        _loc15_.color = this.toHexString(_loc30_);
        _loc11_.setStyle("a:hover", _loc15_);
        return new ChatStyle(_loc33_, _loc23_, _loc17_, _loc27_, _loc28_, _loc16_, _loc24_, _loc25_, _loc18_, _loc9_, _loc26_, param2, param3, param4, param5, param7, param8, _loc10_, _loc31_, _loc14_, param6, _loc11_);
    }

    private toHexString(param1: number): string {
        let _loc2_: string = param1.toString(16);
        while (_loc2_.length < 6) {
            _loc2_ = "0" + _loc2_;
        }
        return "#" + _loc2_;
    }

    private hasConfig(param1: string, param2: string): boolean {
        return param1.indexOf(param2) != -1;
    }

    private getConfigCSV(param1: string, param2: string): any[] {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: any = false;
        let _loc7_: string = null;
        let _loc4_: number = param1.indexOf(param2);
        if (_loc4_ != -1) {
            _loc5_ = param1.indexOf("=", _loc4_);
            _loc6_ = param1.indexOf("\r\n", _loc5_);
            if (_loc6_ == -1) {
                _loc6_ = param1.indexOf("\n", _loc5_);
            }
            if (_loc6_ == -1) {
                _loc6_ = param1.length;
            }
            _loc3_ = param1.charAt(_loc5_ + 1) == " ";
            _loc7_ = param1.substr(_loc5_ + (_loc3_ ? 2 : 1), _loc6_ - _loc5_ - (_loc3_ ? 2 : 1));
            return _loc7_.split(",");
        }
        return null;
    }

    private getConfigPoint(param1: string, param2: string): Point {
        return new Point(this.getConfigCSV(param1, param2)[0] | 0, this.getConfigCSV(param1, param2)[1] | 0);
    }

    private getConfigIntArray(param1: string, param2: string): any[] {
        let _loc4_: any[] = this.getConfigCSV(param1, param2);
        let _loc3_: any[] = [];
        for (const _loc5_ of _loc4_ ?? []) {
            _loc3_.push(_loc5_);
        }
        return _loc3_;
    }

    private getConfigRect(param1: string, param2: string): Rectangle {
        return new Rectangle(this.getConfigCSV(param1, param2)[0] | 0, this.getConfigCSV(param1, param2)[1] | 0, this.getConfigCSV(param1, param2)[2] | 0, this.getConfigCSV(param1, param2)[3] | 0);
    }

    private getConfigBoolean(param1: string, param2: string): boolean {
        return this.getConfigCSV(param1, param2)[0] == "true";
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ChatStyleLibrary.#staticsReady) return;
        ChatStyleLibrary.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ChatStyleLibrary, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.freeflowchat.viewer.visualization.style.ChatStyleLibrary"));
    }

    get [IDisposable](): true {
        return true;
    }
}
