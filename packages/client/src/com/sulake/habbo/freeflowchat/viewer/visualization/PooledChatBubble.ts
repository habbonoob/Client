import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { IChatStyleInternal } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/style/IChatStyleInternal';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TextEvent } from '@habbo-pixi/runtime/events/TextEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { ChatBubbleWidth } from '@/com/sulake/habbo/freeflowchat/viewer/enum/ChatBubbleWidth';

export class PooledChatBubble extends Sprite {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization::PooledChatBubble'); }

    public static readonly MAX_WIDTH_DEFAULT: number = 300;
    private static readonly DESKTOP_MARGIN_LEFT: number = 85;
    private static readonly DESKTOP_MARGIN_RIGHT: number = 190;
    private static readonly LINEAR_INTERPOLATION_MS: number = 150;
    private static readonly MAX_HEIGHT: number = 108;
    private static readonly _SafeStr_7689: number = 28;
    private static readonly POINTER_DEFAULT_MARGIN_RIGHT: number = 15;
    private static readonly POINTER_REPOSITION_INTERVAL_MS: number = 2000;
    private static readonly ZERO_POINT: Point = new Point(0, 0);

    constructor(param1: HabboFreeFlowChat) {
        super();
        this._component = param1;
        this._pointer = new Bitmap();
        this._SafeStr_2500 = new Bitmap();
        this._SafeStr_2179 = new TextField();
        this._SafeStr_2833 = new Sprite();
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("removedFromStage", this.onRemovedFromStage);
    }

    declare private _component: HabboFreeFlowChat;

    declare private _chatItem: ChatItem;

    declare private _background: Sprite;

    declare private _pointer: Bitmap;

    declare private _SafeStr_2500: Bitmap;

    declare private _SafeStr_3440: BitmapData;

    declare private _SafeStr_2179: TextField;

    private _SafeStr_3280: number = 0;

    declare private _SafeStr_6129: number;
    static { (this.prototype as any)._SafeStr_6129 = 0; }

    declare private _SafeStr_3728: number;
    static { (this.prototype as any)._SafeStr_3728 = 0; }

    declare private _SafeStr_3634: number;
    static { (this.prototype as any)._SafeStr_3634 = 0; }

    declare private _SafeStr_6411: number;
    static { (this.prototype as any)._SafeStr_6411 = 0; }

    declare private _SafeStr_6085: number;
    static { (this.prototype as any)._SafeStr_6085 = 0; }

    declare private _SafeStr_6870: number;
    static { (this.prototype as any)._SafeStr_6870 = NaN; }

    declare private _SafeStr_7007: number;
    static { (this.prototype as any)._SafeStr_7007 = NaN; }

    private _readyToRecycle: boolean = false;
    private _SafeStr_4968: number = 0;

    declare private _proxyX: number;
    static { (this.prototype as any)._proxyX = 0; }

    private _SafeStr_6227: boolean = false;

    declare private _SafeStr_2833: Sprite;

    private _SafeStr_4963: number = 0;
    private _minHeight: number = -1;

    declare private _style: IChatStyleInternal;

    public set style(param1: IChatStyleInternal) {
        this._style = param1;
    }

    private _hasHitDesktopMargin: boolean = false;

    public get hasHitDesktopMargin(): boolean {
        return this._hasHitDesktopMargin;
    }

    public set chatItem(param1: ChatItem) {
        this._chatItem = param1;
    }

    public set face(param1: BitmapData) {
        this._SafeStr_3440 = param1;
    }

    public get displayedHeight(): number {
        return this._style.isSystemStyle ? this.height : Math.min(108, this.height);
    }

    public get proxyX(): number {
        return this._proxyX;
    }

    public set proxyX(param1: number) {
        let _loc2_: any = 0;
        let _loc3_: number = 0;
        this._proxyX = param1;
        if (this._SafeStr_6227 && this.stage) {
            _loc2_ = this._proxyX + this._SafeStr_4968;
            this._hasHitDesktopMargin = false;
            _loc3_ = this.stage.stageWidth - 190 - this.width | 0;
            if (_loc2_ > _loc3_) {
                _loc2_ = _loc3_;
                this._hasHitDesktopMargin = true;
            }
            if (_loc2_ < 85) {
                _loc2_ = 85;
                this._hasHitDesktopMargin = true;
            }
            this.x = Number(_loc2_);
        } else {
            this.x = this._proxyX + this._SafeStr_4968;
        }
    }

    public get readyToRecycle(): boolean {
        return this._readyToRecycle;
    }

    public set readyToRecycle(param1: boolean) {
        this._readyToRecycle = param1;
        if (param1) {
            this.removeEventListener("click", this.onMouseClick);
        }
    }

    public get timeStamp(): number {
        return this._chatItem.timeStamp;
    }

    public set component(param1: HabboFreeFlowChat) {
        this._component = param1;
    }

    public get userScreenPos(): Point {
        if (this._chatItem.forcedScreenLocation) {
            if (this._component.displayObject.stage == null) {
                return PooledChatBubble.ZERO_POINT;
            }
            return new Point(Number(this._component.displayObject.stage.stageWidth / 2 + this._chatItem.forcedScreenLocation), 500);
        }
        return this._component.getScreenPointFromRoomLocation(this._chatItem.roomId, this._chatItem.userLocation);
    }

    public get roomId(): number {
        return this._chatItem.roomId;
    }

    public set roomPanOffsetX(param1: number) {
        if (this._SafeStr_4968 != param1) {
            this._SafeStr_4968 = param1;
            this.warpTo(this._SafeStr_3728, this._SafeStr_3634);
        }
    }

    public get overlap(): Rectangle {
        return this._style.overlap;
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    private get userRelativePosX(): number {
        return this.userScreenPos.x - this.x | 0;
    }

    public recreate(param1: string, param2: number, param3: boolean = false, param4: number = -1): void {
        let _loc10_: number = 0;
        let _loc14_: number = 0;
        let _loc16_: any[] = null;
        let _loc15_: string = null;
        let _loc19_: string = null;
        let _loc20_: string = null;
        let _loc8_: number = 0;
        let _loc12_: BitmapData = null;
        this._background = this._style.getNewBackgroundSprite(param2);
        this._pointer.bitmapData = this._style.pointer;
        this._SafeStr_6227 = param3;
        let _loc11_: number = this._component.roomChatSettings ? ChatBubbleWidth.accordingToRoomChatSetting(this._component.roomChatSettings.bubbleWidth) : 300;
        let _loc9_: number = _loc11_ - this._style.textFieldMargins.x - this._style.textFieldMargins.width | 0;
        this._SafeStr_2179.width = _loc9_;
        this._SafeStr_2179.multiline = true;
        this._SafeStr_2179.wordWrap = true;
        this._SafeStr_2179.selectable = false;
        this._SafeStr_2179.thickness = -15;
        this._SafeStr_2179.sharpness = 80;
        this._SafeStr_2179.antiAliasType = "advanced";
        this._SafeStr_2179.embedFonts = true;
        this._SafeStr_2179.gridFitType = "pixel";
        this._SafeStr_2179.cacheAsBitmap = !this._style.allowHTML;
        this._SafeStr_2179.styleSheet = null;
        this._SafeStr_2179.defaultTextFormat = this._style.textFormat;
        this._SafeStr_2179.styleSheet = this._style.styleSheet;
        this._SafeStr_2179.addEventListener("link", this.onTextLinkEvent);
        let _loc7_: any = this._chatItem.chatType == 0;
        let _loc6_: any = this._chatItem.chatType == 2;
        let _loc13_: boolean = !_loc7_ && !_loc6_ && !this._style.isAnonymous;
        if (_loc13_) {
            this._SafeStr_2179.alpha = 0.6;
        } else {
            this._SafeStr_2179.alpha = 1;
        }
        let _loc18_: string = (_loc13_ ? "<i>" : "") + (this._style.isAnonymous ? "" : "<b>" + param1 + ": </b>");
        _loc18_ = _loc18_ + (_loc6_ ? "<b>" : "") + this._chatItem.text + (_loc6_ ? "</b>" : "");
        _loc18_ = _loc18_ + (_loc13_ ? "</i>" : "");
        if (this._chatItem.links == null || this._chatItem.links[0] == null) {
            this._SafeStr_2179.htmlText = _loc18_;
        } else {
            _loc14_ = -1;
            _loc16_ = [];
            _loc10_ = 0;
            while (_loc10_ < this._chatItem.links.length) {
                _loc15_ = stringOrNull(this._chatItem.links[_loc10_][0][1]);
                _loc19_ = "<a href=\"" + _loc15_ + "\">" + _loc15_ + "</a>";
                _loc20_ = "{" + _loc10_ + "}";
                _loc8_ = this._chatItem.text.indexOf(_loc20_);
                _loc14_ = _loc8_ + _loc19_.length;
                _loc16_.push([_loc8_, _loc14_]);
                _loc18_ = _loc18_.replace(_loc20_, _loc19_);
                _loc10_++;
            }
            this._SafeStr_2179.htmlText = _loc18_;
        }
        this._minHeight = param4;
        let _loc17_: number = Math.min(_loc11_, this._SafeStr_2179.textWidth + this._style.textFieldMargins.x + this._style.textFieldMargins.width) | 0;
        let _loc5_: number = this._SafeStr_2179.textHeight + this._style.textFieldMargins.y + this._style.textFieldMargins.height | 0;
        if (!this._style.isSystemStyle) {
            _loc5_ = Math.min(108, _loc5_) | 0;
        }
        if (param4 != -1) {
            _loc5_ = Math.max(param4, _loc5_) | 0;
        }
        _loc17_ = Math.max(_loc17_, this._background.width) | 0;
        _loc5_ = Math.max(_loc5_, this._background.height) | 0;
        this._background.width = _loc17_;
        this._background.height = _loc5_;
        this._background.x = 0;
        this._background.y = 0;
        this._background.cacheAsBitmap = true;
        this.addChild(this._background);
        if (!this._style.isAnonymous) {
            this._pointer.x = Math.max(this._style.getPointerLeftMargin(28), Math.min(this._style.getPointerRightMargin(15), this.userRelativePosX));
            this._pointer.y = _loc5_ - this._style.pointerOffsetToBubbleBottom;
            this.addChild(this._pointer);
        }
        if (this._SafeStr_3440 != null && this._style.faceOffset != null) {
            if (this._SafeStr_3440.height > _loc5_) {
                _loc12_ = new BitmapData(this._SafeStr_3440.width, _loc5_);
                _loc12_.copyPixels(this._SafeStr_3440, new Rectangle(0, this._SafeStr_3440.height - _loc5_, this._SafeStr_3440.width, _loc5_), new Point(0, 0));
            } else {
                _loc12_ = this._SafeStr_3440;
            }
            this._SafeStr_2500.bitmapData = _loc12_;
            this._SafeStr_2500.x = this._style.faceOffset.x - _loc12_.width / 2;
            this._SafeStr_2500.y = Math.max(1, this._style.faceOffset.y - _loc12_.height / 2);
            this.addChild(this._SafeStr_2500);
        }
        this._SafeStr_2179.width = Math.min(_loc9_, this._SafeStr_2179.textWidth + this._style.textFieldMargins.width);
        this._SafeStr_2179.height = this._SafeStr_2179.textHeight + this._style.textFieldMargins.height;
        this._SafeStr_2179.x = this._style.textFieldMargins.x;
        this._SafeStr_2179.y = this._style.textFieldMargins.y;
        this.addChild(this._SafeStr_2179);
        if (!this._style.isSystemStyle && this._SafeStr_2179.textHeight > 108) {
            this._SafeStr_2833.graphics.clear();
            this._SafeStr_2833.graphics.beginFill(16777215);
            this._SafeStr_2833.graphics.drawRect(0, 0, this._SafeStr_2179.textWidth + 5, 108 - this._style.textFieldMargins.height);
            this._SafeStr_2833.graphics.endFill();
            this._SafeStr_2179.mask = this._SafeStr_2833;
            this.addChild(this._SafeStr_2833);
            this._SafeStr_2833.x = this._SafeStr_2179.x;
            this._SafeStr_2833.y = this._SafeStr_2179.y;
        } else {
            this._SafeStr_2833.graphics.clear();
            this._SafeStr_2179.mask = null;
        }
        if (this._style.isNotification && this._SafeStr_2500 != null && this._SafeStr_2500.bitmapData != null) {
            this._SafeStr_2500.y = Math.max(1, this.height / 2 - this._SafeStr_2500.bitmapData.height / 2);
            this._SafeStr_2500.x -= 0.5;
            if (!this._style.isAnonymous) {
                this._SafeStr_2500.y -= this._pointer.height / 2 - 1;
            }
        }
        this.cacheAsBitmap = !this._style.allowHTML;
        this._readyToRecycle = false;
        this._SafeStr_3280 = 0;
        this._SafeStr_4963 = 0;
        this.visible = false;
    }

    public unregister(): void {
        this.cacheAsBitmap = false;
        this.removeEventListener("click", this.onMouseClick);
        if (this._SafeStr_2833.parent == this) {
            this.safelyRemoveChild(this._SafeStr_2833);
        }
        this.safelyRemoveChild(this._SafeStr_2179);
        if (this._style.faceOffset != null && this._SafeStr_2500.parent == this) {
            this.safelyRemoveChild(this._SafeStr_2500);
            this._SafeStr_2500.bitmapData = null;
        }
        if (this._pointer && this._pointer.parent) {
            this.safelyRemoveChild(this._pointer);
        }
        this.safelyRemoveChild(this._background);
        if (this._SafeStr_2179) {
            this._SafeStr_2179.removeEventListener("link", this.onTextLinkEvent);
        }
    }

    public moveTo(param1: number, param2: number): void {
        if (this._SafeStr_3728 != param1 || this._SafeStr_3634 != param2) {
            this._SafeStr_6129 = this._SafeStr_3280;
            this._SafeStr_6411 = this.proxyX;
            this._SafeStr_6085 = this.y | 0;
            this._SafeStr_3728 = param1;
            this._SafeStr_3634 = param2;
            this._SafeStr_6870 = (param1 - this.proxyX) / 150;
            this._SafeStr_7007 = (param2 - this.y) / 150;
        }
    }

    public warpTo(param1: number, param2: number): void {
        this._SafeStr_3728 = param1;
        this._SafeStr_3634 = param2;
        this.proxyX = param1;
        this.y = param2;
    }

    public update(param1: number): void {
        let _loc2_: any = 0;
        this._SafeStr_3280 += param1;
        if (this.proxyX != this._SafeStr_3728 || this.y != this._SafeStr_3634) {
            _loc2_ = this._SafeStr_3280 - this._SafeStr_6129 >>> 0;
            if (_loc2_ < 150 && _loc2_ > 0) {
                this.proxyX = this._SafeStr_6411 + _loc2_ * this._SafeStr_6870 | 0;
                this.y = this._SafeStr_6085 + _loc2_ * this._SafeStr_7007 | 0;
            } else {
                this.proxyX = this._SafeStr_3728;
                this.y = this._SafeStr_3634;
            }
        }
        if (this._SafeStr_3280 > this._SafeStr_4963 + 2000) {
            this.repositionPointer();
            this._SafeStr_4963 = this._SafeStr_3280;
        }
        if (this._SafeStr_3280 > 150 && !this.visible) {
            this.visible = true;
        }
    }

    public repositionPointer(): void {
        if (this._pointer && this._pointer.parent) {
            this._pointer.x = Math.max(this._style.getPointerLeftMargin(28), Math.min(this._background.width - this._style.getPointerRightMargin(15), this.userRelativePosX));
            this._pointer.y = this._background.height - this._style.pointerOffsetToBubbleBottom;
        }
    }

    private safelyRemoveChild(param1: DisplayObject): void {
        try {
            this.removeChild(param1);
        } catch ($e) {
            if ($e instanceof ArgumentError) {
                let error: ArgumentError = $e;
            } else {
                throw $e;
            }
        }
    }

    private onTextLinkEvent = (param1: TextEvent): void => {
        let _loc7_: string = null;
        let _loc4_: string = null;
        let _loc3_: TextField = null;
        let _loc2_: Point = null;
        let _loc5_: Rectangle = null;
        let _loc6_: string = null;
        if (param1.text && param1.text.length > 0) {
            _loc7_ = param1.text;
            _loc4_ = "highlight/";
            if (_loc7_.indexOf(_loc4_) > -1) {
                _loc3_ = asInstanceOf(param1.target, TextField);
                _loc2_ = new Point(_loc3_.mouseX, _loc3_.mouseY);
                _loc2_ = _loc3_.localToGlobal(_loc2_);
                _loc5_ = new Rectangle(_loc2_.x, _loc2_.y);
                _loc6_ = _loc7_.substr(_loc7_.indexOf(_loc4_) + _loc4_.length, _loc7_.length);
                this._component.windowManager.hideHint();
                this._component.windowManager.showHint(_loc6_.toLocaleUpperCase(), _loc5_);
            } else {
                this._component.context.createLinkEvent(param1.text);
            }
        }
    };

    private onAddedToStage = (param1: Event): void => {
        this.addEventListener("click", this.onMouseClick);
    };

    private onRemovedFromStage = (param1: Event): void => {
        this.removeEventListener("click", this.onMouseClick);
    };

    private onMouseClick = (param1: MouseEvent): void => {
        if (this._style && this._style.isAnonymous) {
            return;
        }
        if (!this._component.clickHasToPropagate(param1)) {
            this._component.selectAvatarWithChatItem(this._chatItem);
            param1.stopImmediatePropagation();
        }
    };
}
