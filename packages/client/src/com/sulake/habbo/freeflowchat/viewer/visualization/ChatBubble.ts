import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { IChatStyleInternal } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/style/IChatStyleInternal';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TextEvent } from '@habbo-pixi/runtime/events/TextEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { ChatBubbleWidth } from '@/com/sulake/habbo/freeflowchat/viewer/enum/ChatBubbleWidth';

export class ChatBubble extends Sprite {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization::ChatBubble'); }

    public static readonly MAX_WIDTH_DEFAULT: number = 300;
    public static readonly _SafeStr_8526: number = 15;
    private static readonly DESKTOP_MARGIN_LEFT: number = 85;
    private static readonly DESKTOP_MARGIN_RIGHT: number = 190;
    private static readonly LINEAR_INTERPOLATION_MS: number = 150;
    private static readonly MAX_HEIGHT: number = 108;
    private static readonly _SafeStr_7689: number = 28;
    private static readonly POINTER_DEFAULT_MARGIN_RIGHT: number = 15;
    private static readonly ZERO_POINT: Point = new Point(0, 0);

    constructor(param1: ChatItem, param2: IChatStyleInternal, param3: BitmapData, param4: string, param5: number, param6: HabboFreeFlowChat, param7: number = -1, param8: boolean = false, param9: number = -1) {
        let _loc21_: number = 0;
        let _loc24_: number = 0;
        let _loc25_: any[] = null;
        let _loc14_: string = null;
        let _loc17_: string = null;
        let _loc18_: string = null;
        let _loc20_: number = 0;
        let _loc23_: any = null;
        super();
        this._component = param6;
        this._chatItem = param1;
        this._style = param2;
        this._background = param2.getNewBackgroundSprite(param5);
        this._pointer = param2.isAnonymous ? null : new Bitmap(param2.pointer);
        this._SafeStr_6227 = param8;
        let _loc22_: number = 300;
        if (param7 != -1) {
            _loc22_ = ChatBubbleWidth.accordingToRoomChatSetting(param7);
        } else if (param6.roomChatSettings) {
            _loc22_ = ChatBubbleWidth.accordingToRoomChatSetting(param6.roomChatSettings.bubbleWidth);
        }
        _loc22_ -= 15;
        this.cacheAsBitmap = true;
        let _loc12_: number = _loc22_ - param2.textFieldMargins.x - param2.textFieldMargins.width | 0;
        this._SafeStr_2179 = new TextField();
        this._SafeStr_2179.width = _loc12_;
        this._SafeStr_2179.multiline = true;
        this._SafeStr_2179.wordWrap = true;
        this._SafeStr_2179.selectable = false;
        this._SafeStr_2179.thickness = -15;
        this._SafeStr_2179.sharpness = 80;
        this._SafeStr_2179.antiAliasType = "advanced";
        this._SafeStr_2179.embedFonts = true;
        this._SafeStr_2179.gridFitType = "pixel";
        this._SafeStr_2179.cacheAsBitmap = true;
        this._SafeStr_2179.defaultTextFormat = param2.textFormat;
        this._SafeStr_2179.styleSheet = this._style.styleSheet;
        this._SafeStr_2179.addEventListener("link", this.onTextLinkEvent);
        let _loc11_: any = param1.chatType == 0;
        let _loc19_: any = param1.chatType == 2;
        let _loc13_: boolean = !_loc11_ && !_loc19_ && !this._style.isAnonymous;
        if (_loc13_) {
            this._SafeStr_2179.alpha = 0.6;
        }
        let _loc16_: string = (_loc13_ ? "<i>" : "") + (this._style.isAnonymous ? "" : "<b>" + param4 + ": </b>");
        _loc16_ = _loc16_ + (_loc19_ ? "<b>" : "") + param1.text + (_loc19_ ? "</b>" : "");
        _loc16_ = _loc16_ + (_loc13_ ? "</i>" : "");
        if (param1.links == null || param1.links[0] == null) {
            this._SafeStr_2179.htmlText = _loc16_;
        } else {
            _loc24_ = -1;
            _loc25_ = [];
            _loc21_ = 0;
            while (_loc21_ < param1.links.length) {
                _loc14_ = stringOrNull(param1.links[_loc21_][0][1]);
                _loc17_ = "<a href=\"" + _loc14_ + "\">" + _loc14_ + "</a>";
                _loc18_ = "{" + _loc21_ + "}";
                _loc20_ = param1.text.indexOf(_loc18_);
                _loc24_ = _loc20_ + _loc17_.length;
                _loc25_.push([_loc20_, _loc24_]);
                _loc16_ = _loc16_.replace(_loc18_, _loc17_);
                _loc21_++;
            }
            this._SafeStr_2179.htmlText = _loc16_;
        }
        let _loc15_: number = Math.min(_loc22_, this._SafeStr_2179.textWidth + param2.textFieldMargins.x + param2.textFieldMargins.width) | 0;
        let _loc10_: number = this._SafeStr_2179.textHeight + param2.textFieldMargins.y + param2.textFieldMargins.height | 0;
        if (!this._style.isSystemStyle) {
            _loc10_ = Math.min(108, _loc10_) | 0;
        }
        if (param9 != -1) {
            _loc10_ = Math.max(param9, _loc10_) | 0;
        }
        _loc15_ = Math.max(_loc15_, this._background.width) | 0;
        _loc10_ = Math.max(_loc10_, this._background.height) | 0;
        this._background.width = _loc15_;
        this._background.height = _loc10_;
        this._background.x = 0;
        this._background.y = 0;
        this._background.cacheAsBitmap = true;
        this.addChild(this._background);
        if (!this._style.isAnonymous) {
            this._pointer.x = Math.max(param2.getPointerLeftMargin(28), Math.min(param2.getPointerRightMargin(15), this.userRelativePosX));
            this._pointer.y = _loc10_ - param2.pointerOffsetToBubbleBottom;
            this.addChild(this._pointer);
        }
        if (param3 != null && param2.faceOffset != null) {
            if (param3.height > _loc10_) {
                _loc23_ = new BitmapData(param3.width, _loc10_);
                _loc23_.copyPixels(param3, new Rectangle(0, param3.height - _loc10_, param3.width, _loc10_), new Point(0, 0));
            } else {
                _loc23_ = param3;
            }
            this._SafeStr_2500 = new Bitmap(_loc23_);
            this._SafeStr_2500.x = param2.faceOffset.x - _loc23_.width / 2;
            this._SafeStr_2500.y = Math.max(1, param2.faceOffset.y - _loc23_.height / 2);
            this.addChild(this._SafeStr_2500);
        }
        this._SafeStr_2179.width = Math.min(_loc12_, this._SafeStr_2179.textWidth + this._style.textFieldMargins.width);
        this._SafeStr_2179.height = this._SafeStr_2179.textHeight + this._style.textFieldMargins.height;
        this._SafeStr_2179.x = param2.textFieldMargins.x;
        this._SafeStr_2179.y = param2.textFieldMargins.y;
        this.addChild(this._SafeStr_2179);
        if (this._style.isNotification && this._SafeStr_2500 != null) {
            this._SafeStr_2500.y = Math.max(1, this.height / 2 - _loc23_.height / 2);
        }
        if (!this._style.isSystemStyle && this._SafeStr_2179.textHeight > 108) {
            this._SafeStr_2833 = new Sprite();
            this._SafeStr_2833.graphics.clear();
            this._SafeStr_2833.graphics.beginFill(16777215);
            this._SafeStr_2833.graphics.drawRect(0, 0, this._SafeStr_2179.textWidth + 5, 108 - param2.textFieldMargins.height);
            this._SafeStr_2179.mask = this._SafeStr_2833;
            this.addChild(this._SafeStr_2833);
        }
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    declare private _component: HabboFreeFlowChat;

    declare private _chatItem: ChatItem;

    declare private _background: Sprite;

    declare private _pointer: Bitmap;

    declare private _SafeStr_2500: Bitmap;

    declare private _SafeStr_2179: TextField;

    declare private _style: IChatStyleInternal;

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

    private _hasHitDesktopMargin: boolean = false;

    public get hasHitDesktopMargin(): boolean {
        return this._hasHitDesktopMargin;
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
                return ChatBubble.ZERO_POINT;
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

    private get userRelativePosX(): number {
        return this.userScreenPos.x - this.x | 0;
    }

    public dispose(): void {
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this.removeEventListener("click", this.onMouseClick);
        if (this._SafeStr_2833) {
            this.removeChild(this._SafeStr_2833);
        }
        if (this._SafeStr_2179) {
            this._SafeStr_2179.removeEventListener("link", this.onTextLinkEvent);
        }
        this.removeChild(this._SafeStr_2179);
        if (this._SafeStr_2500 != null && this._style.faceOffset != null) {
            this.removeChild(this._SafeStr_2500);
        }
        if (this._pointer && this._pointer.parent) {
            this.removeChild(this._pointer);
        }
        this.removeChild(this._background);
        this._SafeStr_2833 = null;
        this._SafeStr_2179 = null;
        this._SafeStr_2500 = null;
        this._pointer = null;
        this._background = null;
        this._style = null;
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
        this.repositionPointer();
    }

    public update(param1: number): void {
        let _loc2_: any = 0;
        this._SafeStr_3280 += param1;
        if (this.proxyX != this._SafeStr_3728 || this.y != this._SafeStr_3634) {
            _loc2_ = this._SafeStr_3280 - this._SafeStr_6129 >>> 0;
            if (_loc2_ < 150) {
                this.proxyX = this._SafeStr_6411 + _loc2_ * this._SafeStr_6870 | 0;
                this.y = this._SafeStr_6085 + _loc2_ * this._SafeStr_7007 | 0;
            } else {
                this.proxyX = this._SafeStr_3728;
                this.y = this._SafeStr_3634;
            }
        }
        this.repositionPointer();
    }

    public repositionPointer(): void {
        if (this._pointer && this._pointer.parent) {
            this._pointer.x = Math.max(this._style.getPointerLeftMargin(28), Math.min(this._background.width - this._style.getPointerRightMargin(15), this.userRelativePosX));
            this._pointer.y = this._background.height - this._style.pointerOffsetToBubbleBottom;
        }
    }

    public drawToBitmap(param1: BitmapData): void {
        param1.draw(this);
    }

    private onTextLinkEvent = (param1: TextEvent): void => {
        if (param1.text && param1.text.length > 0) {
            this._component.context.createLinkEvent(param1.text);
        }
    };

    private onAddedToStage = (param1: Event): void => {
        this.addEventListener("click", this.onMouseClick);
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
