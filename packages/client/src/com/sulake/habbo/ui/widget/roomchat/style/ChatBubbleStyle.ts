import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';

export class ChatBubbleStyle {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat.style::ChatBubbleStyle'); }

    private static getXmlElementAssetId(param1: XML, param2: string): string {
        let _loc3_: XMLList = param1.child(param2);
        if (_loc3_.length() < 1) {
            return null;
        }
        let _loc4_: XMLList = XML.from(_loc3_.item(0)).attribute("assetId");
        if (_loc4_.length() < 1) {
            return null;
        }
        return _loc4_.item(0)?.toString() ?? null;
    }

    constructor(param1: IAssetLibrary, param2: IHabboWindowManager, param3: XML) {
        this._styleId = Number(param3.attribute("id").item(0)) | 0;
        this._styleName = param3.attribute("name").item(0)?.toString() ?? null;
        this._isSystemStyle = !!param3.attribute("systemstyle").item(0);
        this._isStaffOverrideable = !!param3.attribute("staffoverride").item(0);
        let _loc11_: XML = param3.child("layouts").item(0);
        let _loc4_: XML = param3.child("bitmaps").item(0);
        this._normalLayout = this.buildBubbleWindow(param2, param1, ChatBubbleStyle.getXmlElementAssetId(_loc11_, "speakLayout"));
        this._whisperLayout = this.buildBubbleWindow(param2, param1, ChatBubbleStyle.getXmlElementAssetId(_loc11_, "whisperLayout"));
        this._shoutLayout = this.buildBubbleWindow(param2, param1, ChatBubbleStyle.getXmlElementAssetId(_loc11_, "shoutLayout"));
        let _loc9_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "leftBitmap");
        let _loc6_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "leftColorBitmap");
        let _loc7_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "middleBitmap");
        let _loc5_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "rightBitmap");
        let _loc10_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "pointerBitmap");
        if (_loc9_) {
            this._leftBitmapData = this.getBitmapDataFor(_loc9_, param1);
        }
        if (_loc6_) {
            this._leftColorBitmapData = this.getBitmapDataFor(_loc6_, param1);
        }
        if (_loc7_) {
            this._middleBitmapData = this.getBitmapDataFor(_loc7_, param1);
        }
        if (_loc5_) {
            this._rightBitmapData = this.getBitmapDataFor(_loc5_, param1);
        }
        if (_loc10_) {
            this._pointerBitmapData = this.getBitmapDataFor(_loc10_, param1);
        }
        let _loc8_: string = ChatBubbleStyle.getXmlElementAssetId(_loc4_, "previewIconBitmap");
        if (_loc8_) {
            this._selectorPreviewIconBitmapData = this.getBitmapDataFor(_loc8_, param1);
        }
    }

    declare private _styleId: number;
    static { (this.prototype as any)._styleId = 0; }

    declare private _styleName: string;

    private _isSystemStyle: boolean = false;
    private _isStaffOverrideable: boolean = false;

    declare private _leftBitmapData: BitmapData;

    declare private _leftColorBitmapData: BitmapData;

    declare private _middleBitmapData: BitmapData;

    declare private _rightBitmapData: BitmapData;

    declare private _pointerBitmapData: BitmapData;

    declare private _selectorPreviewIconBitmapData: BitmapData;

    declare private _normalLayout: IRegionWindow;

    public get normalLayout(): IRegionWindow {
        return this._normalLayout;
    }

    declare private _whisperLayout: IRegionWindow;

    public get whisperLayout(): IRegionWindow {
        return this._whisperLayout;
    }

    declare private _shoutLayout: IRegionWindow;

    public get shoutLayout(): IRegionWindow {
        return this._shoutLayout;
    }

    public get leftBitmapData(): BitmapData {
        return this._leftBitmapData;
    }

    public get leftColorBitmapData(): BitmapData {
        return this._leftColorBitmapData;
    }

    public get middleBitmapData(): BitmapData {
        return this._middleBitmapData;
    }

    public get rightBitmapData(): BitmapData {
        return this._rightBitmapData;
    }

    public get pointerBitmapData(): BitmapData {
        return this._pointerBitmapData;
    }

    public get isSystemStyle(): boolean {
        return this._isSystemStyle;
    }

    public get isStaffOverrideable(): boolean {
        return this._isStaffOverrideable;
    }

    public get selectorPreviewIconBitmapData(): BitmapData {
        return this._selectorPreviewIconBitmapData;
    }

    private buildBubbleWindow(param1: IHabboWindowManager, param2: IAssetLibrary, param3: string): IRegionWindow {
        if (param3 == null) {
            return null;
        }
        let _loc5_: IAsset = param2.getAssetByName(this.localAssetName(param3 + "_xml"));
        let _loc4_: IRegionWindow = asGuarded(param1.buildFromXML(asInstanceOf(_loc5_.content, XML), 1), isIRegionWindow);
        _loc4_.tags.push("roomchat_bubble");
        _loc4_.x = 0;
        _loc4_.y = 0;
        _loc4_.width = 0;
        _loc4_.background = true;
        _loc4_.mouseThreshold = 0;
        _loc4_.setParamFlag(1073741824, true);
        return _loc4_;
    }

    private localAssetName(param1: string): string {
        return "roomchat_styles_" + this._styleName + "_" + param1;
    }

    private getBitmapDataFor(param1: string, param2: IAssetLibrary): BitmapData {
        let _loc3_: IAsset = param2.getAssetByName(this.localAssetName(param1));
        if (_loc3_) {
            return castTo(_loc3_.content, BitmapData);
        }
        throw new Error("Configured bitmapdata asset missing for chat bubble style: " + this.localAssetName(param1));
    }
}
