import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { ChatBubbleStyle } from '@/com/sulake/habbo/ui/widget/roomchat/style/ChatBubbleStyle';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ChatBubbleFactory {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat.style::ChatBubbleFactory'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ChatBubbleFactory.#initStatics();
        return ChatBubbleFactory._log;
    }

    private static readonly _SafeStr_7821: number = 0;

    constructor(param1: IAssetLibrary, param2: IHabboWindowManager, param3: XML) {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc7_: string = null;
        let _loc6_: XML = null;
        let _loc8_: ChatBubbleStyle = null;
        this._styles = new UtilsMap();
        for (const _loc9_ of param3.child("style") ?? []) {
            _loc4_ = Number(_loc9_.attribute("id").item(0)) | 0;
            _loc5_ = _loc9_.attribute("assetId").item(0)?.toString() ?? null;
            _loc7_ = "roomchat_styles_" + _loc5_ + "_style_xml";
            _loc6_ = XML.from(param1.getAssetByName(_loc7_).content);
            try {
                _loc8_ = new ChatBubbleStyle(param1, param2, _loc6_);
                this._styles.add(_loc4_, _loc8_);
            } catch (e) {
                ChatBubbleFactory._log.error("Error initializing chat style: " + _loc4_ + ", error message: " + e.message);
            }
        }
    }

    declare private _styles: UtilsMap;

    public getBubbleWindow(param1: number, param2: number): IRegionWindow {
        let _loc3_: ChatBubbleStyle = this.getSafeChatBubbleStyle(param1);
        switch (param2) {
            case 0:
                return castGuarded(_loc3_.normalLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            case 1:
                if (_loc3_.whisperLayout != null) {
                    return castGuarded(_loc3_.whisperLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
                }
                return castGuarded(_loc3_.normalLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
                break;
            case 2:
                if (_loc3_.shoutLayout != null) {
                    return castGuarded(_loc3_.shoutLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
                }
                return castGuarded(_loc3_.normalLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
                break;
            default:
                if (_loc3_.whisperLayout != null) {
                    return castGuarded(_loc3_.whisperLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
                }
                return castGuarded(_loc3_.normalLayout.clone(), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        }
    }

    public getPointerBitmapData(param1: number): BitmapData {
        return this.getSafeChatBubbleStyle(param1).pointerBitmapData;
    }

    public buildBubbleImage(param1: number, param2: number, param3: number, param4: number, param5: number): BitmapData {
        let _loc14_: ChatBubbleStyle = null;
        let _loc12_: any = 0;
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        _loc14_ = this.getSafeChatBubbleStyle(param1);
        let _loc16_: number = 0;
        let _loc11_: Point = new Point();
        let _loc13_: BitmapData = new BitmapData(_loc14_.leftBitmapData.width + param3 + _loc14_.rightBitmapData.width, param4, true, 0);
        _loc16_ += _loc14_.leftBitmapData.width;
        _loc13_.copyPixels(_loc14_.leftBitmapData, _loc14_.leftBitmapData.rect, _loc11_);
        if (_loc14_.leftColorBitmapData != null) {
            _loc12_ = 232;
            let _loc8_: number = 177;
            let _loc6_: number = 55;
            if (param5 != 0) {
                _loc12_ = (param5 >> 16 & 0xFF) >>> 0;
                _loc8_ = (param5 >> 8 & 0xFF) >>> 0;
                _loc6_ = (param5 >> 0 & 0xFF) >>> 0;
            }
            _loc13_.draw(_loc14_.leftColorBitmapData, null, new ColorTransform(_loc12_ / 255, _loc8_ / 255, _loc6_ / 255), "darken");
        }
        let _loc7_: Matrix = new Matrix();
        if (_loc14_.middleBitmapData.width == 1) {
            _loc7_.scale(param3 / _loc14_.middleBitmapData.width, 1);
            _loc7_.translate(_loc16_, 0);
            _loc13_.draw(_loc14_.middleBitmapData, _loc7_);
        } else {
            _loc7_.translate(_loc16_, 0);
            _loc9_ = param3 / _loc14_.middleBitmapData.width + 1 | 0;
            _loc10_ = 0;
            while (_loc10_ < _loc9_) {
                _loc13_.draw(_loc14_.middleBitmapData, _loc7_);
                _loc7_.translate(_loc14_.middleBitmapData.width, 0);
                _loc10_++;
            }
        }
        _loc16_ += param3;
        _loc11_.x = _loc16_;
        _loc13_.copyPixels(_loc14_.rightBitmapData, _loc14_.rightBitmapData.rect, _loc11_);
        let _loc15_: Rectangle = _loc14_.rightBitmapData.rect.clone();
        _loc15_.offsetPoint(_loc11_);
        return _loc13_;
    }

    public getStyleIds(): any[] {
        return this._styles.getKeys();
    }

    public getAllowedUserInputStyleIds(): any[] {
        let _loc3_: ChatBubbleStyle = null;
        let _loc2_: any[] = [];
        for (const _loc1_ of this.getStyleIds() ?? []) {
            _loc3_ = this._styles.getValue(_loc1_);
            if (!_loc3_.isSystemStyle && !_loc3_.isStaffOverrideable) {
                _loc2_.push(_loc1_);
            }
        }
        return _loc2_;
    }

    public getStaffOverrideableStyleIds(): any[] {
        let _loc3_: ChatBubbleStyle = null;
        let _loc2_: any[] = [];
        for (const _loc1_ of this.getStyleIds() ?? []) {
            _loc3_ = this._styles.getValue(_loc1_);
            if (_loc3_.isStaffOverrideable) {
                _loc2_.push(_loc1_);
            }
        }
        return _loc2_;
    }

    public getStyleSelectorPreviewBitmap(param1: number): BitmapData {
        let _loc2_: ChatBubbleStyle = this.getSafeChatBubbleStyle(param1);
        return _loc2_.selectorPreviewIconBitmapData;
    }

    public getActualBubbleHeight(param1: number): number {
        let _loc2_: ChatBubbleStyle = this.getSafeChatBubbleStyle(param1);
        return _loc2_.middleBitmapData.height;
    }

    private getSafeChatBubbleStyle(param1: number): ChatBubbleStyle {
        if (!this._styles.hasKey(param1)) {
            param1 = 0;
        }
        return castTo(this._styles.getValue(param1), ChatBubbleStyle);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ChatBubbleFactory.#staticsReady) return;
        ChatBubbleFactory.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ChatBubbleFactory, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.roomchat.style.ChatBubbleFactory"));
    }
}
