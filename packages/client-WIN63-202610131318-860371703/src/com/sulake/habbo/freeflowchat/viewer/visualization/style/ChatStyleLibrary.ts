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
import { Logger } from '@/com/sulake/habbo/Logger';

export class ChatStyleLibrary implements IDisposable, IChatStyleLibrary {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization.style::ChatStyleLibrary'); }

    private readonly DEFAULT_STYLE: number = 0;

    declare private _assets: IAssetLibrary;

    declare private _styles: UtilsMap;

    constructor(param1: IAssetLibrary) {
        let _loc8_: number = 0;
        let _loc9_: string = null;
        let _loc6_: boolean = false;
        let _loc2_: boolean = false;
        let _loc3_: boolean = false;
        let _loc5_: boolean = false;
        let _loc7_: boolean = false;
        let _loc12_: boolean = false;
        let _loc4_: boolean = false;
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
                Logger.log("Error initializing chat style: " + _loc8_ + ", error message: " + e.message);
            }
        }
    }

    public dispose(): void {
        this._styles.dispose();
        this._styles = null;
        this._assets = null;
    }

    public get disposed(): boolean {
        return this._assets == null;
    }

    private initializeStyleFromAssets(param1: string, param2: boolean, param3: boolean, param4: boolean, param5: boolean, param6: boolean, param7: boolean, param8: boolean): ChatStyle {
        let _loc20_: BitmapData = null;
        let _loc37_: string = String(this._assets.getAssetByName("style_" + param1 + "_regpoints").content);
        let _loc38_: BitmapData = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_base").content, BitmapData);
        let _loc28_: Rectangle = new Rectangle(this.getConfigPoint(_loc37_, "9sliceXY").x, this.getConfigPoint(_loc37_, "9sliceXY").y, this.getConfigPoint(_loc37_, "9sliceWH").x, this.getConfigPoint(_loc37_, "9sliceWH").y);
        let _loc22_: Point = this.hasConfig(_loc37_, "faceXY") ? this.getConfigPoint(_loc37_, "faceXY") : null;
        let _loc32_: number = 0;
        let _loc33_: any[] = null;
        let _loc30_: boolean = this.hasConfig(_loc37_, "anonymous") ? this.getConfigBoolean(_loc37_, "anonymous") : false;
        if (!_loc30_) {
            _loc20_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_pointer").content, BitmapData);
            _loc32_ = this.getConfigCSV(_loc37_, "pointerY")[0] | 0;
            _loc33_ = this.hasConfig(_loc37_, "pointerXMargins") ? this.getConfigIntArray(_loc37_, "pointerXMargins") : null;
        }
        let _loc18_: BitmapData = null;
        let _loc19_: Point = null;
        if (this.hasConfig(_loc37_, "emblemXY") && this._assets.hasAsset("style_" + param1 + "_chat_bubble_emblem")) {
            _loc18_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_emblem").content, BitmapData);
            _loc19_ = this.getConfigPoint(_loc37_, "emblemXY");
        }
        let _loc12_: BitmapData = null;
        let _loc23_: Point = null;
        if (this.hasConfig(_loc37_, "emblemMultilineXY") && this._assets.hasAsset("style_" + param1 + "_chat_bubble_emblem_multiline")) {
            _loc12_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_emblem_multiline").content, BitmapData);
            _loc23_ = this.getConfigPoint(_loc37_, "emblemMultilineXY");
        }
        let _loc9_: BitmapData = this._assets.hasAsset("style_" + param1 + "_icon") ? asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_icon").content, BitmapData) : null;
        let _loc17_: Rectangle = this.getConfigRect(_loc37_, "textFieldMargins");
        let _loc31_: BitmapData = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_selector_preview").content, BitmapData);
        let _loc10_: BitmapData = null;
        if (this._assets.hasAsset("style_" + param1 + "_chat_bubble_color")) {
            _loc10_ = asInstanceOf(this._assets.getAssetByName("style_" + param1 + "_chat_bubble_color").content, BitmapData);
        }
        let _loc36_: Point = this.hasConfig(_loc37_, "colorXY") ? this.getConfigPoint(_loc37_, "colorXY") : null;
        let _loc15_: Rectangle = this.hasConfig(_loc37_, "overlapRect") ? this.getConfigRect(_loc37_, "overlapRect") : null;
        let _loc27_: number = (this.hasConfig(_loc37_, "textColorRGB") ? this.getConfigCSV(_loc37_, "textColorRGB")[0] >>> 0 : 0) >>> 0;
        let _loc13_: string = stringOrNull(this.hasConfig(_loc37_, "fontFace") ? this.getConfigCSV(_loc37_, "fontFace")[0] : "Volter");
        let _loc34_: number = this.hasConfig(_loc37_, "fontSize") ? this.getConfigCSV(_loc37_, "fontSize")[0] | 0 : 9;
        let _loc29_: TextFormat = new TextFormat(_loc13_, _loc34_, _loc27_);
        let _loc25_: number = this.hasConfig(_loc37_, "linkColorRGB") ? this.getConfigCSV(_loc37_, "linkColorRGB")[0] >>> 0 : _loc27_;
        let _loc35_: number = this.hasConfig(_loc37_, "linkHoverColorRGB") ? this.getConfigCSV(_loc37_, "linkHoverColorRGB")[0] >>> 0 : _loc27_;
        let _loc26_: number = this.hasConfig(_loc37_, "linkActiveColorRGB") ? this.getConfigCSV(_loc37_, "linkActiveColorRGB")[0] >>> 0 : _loc27_;
        let _loc11_: StyleSheet = new StyleSheet();
        let _loc14_: any = {};
        _loc14_.textDecoration = "underline";
        _loc14_.color = this.toHexString(_loc25_);
        _loc11_.setStyle("a:link", _loc14_);
        let _loc24_: any = {};
        _loc24_.color = this.toHexString(_loc26_);
        _loc11_.setStyle("a:active", _loc24_);
        let _loc16_: any = {};
        _loc16_.color = this.toHexString(_loc35_);
        _loc11_.setStyle("a:hover", _loc16_);
        let _loc21_: boolean = this.hasConfig(_loc37_, "usePixelPerfectNineSlice") ? this.getConfigBoolean(_loc37_, "usePixelPerfectNineSlice") : false;
        return new ChatStyle(_loc38_, _loc28_, _loc20_, _loc32_, _loc33_, _loc17_, _loc29_, _loc30_, _loc18_, _loc19_, _loc12_, _loc23_, _loc22_, _loc9_, _loc31_, param2, param3, param4, param5, param7, param8, _loc10_, _loc36_, _loc15_, param6, _loc11_, _loc21_);
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
        let _loc3_: boolean = false;
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

    public getStyleIds(): any[] {
        return this._styles.getKeys();
    }

    public getStyle(param1: number): IChatStyle {
        if (this._styles.hasKey(param1)) {
            return this._styles.getValue(param1);
        }
        return this._styles.getValue(0);
    }

    get [IDisposable](): true {
        return true;
    }
}
