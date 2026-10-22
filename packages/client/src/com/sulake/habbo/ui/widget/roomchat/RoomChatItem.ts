import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomWidgetChatUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChatUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { RoomChatWidget } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatItem.group';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RoomChatItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat::RoomChatItem'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RoomChatItem.#initStatics();
        return RoomChatItem._log;
    }

    public static readonly CHAT_ITEM_STACKING_HEIGHT: number = 18;
    private static readonly MESSAGE_TEXT_MARGIN_LEFT: number = 6;
    private static readonly MESSAGE_TEXT_MARGIN_RIGHT: number = 6;
    private static readonly RESPECT_ICON_MARGIN_RIGHT: number = 35;
    private static readonly _SafeStr_8420: number = 26;
    private static readonly NAME: string = "name";
    private static readonly MESSAGE: string = "message";
    private static readonly POINTER: string = "pointer";
    private static readonly BACKGROUND: string = "background";

    private static readonly TOOLTIP_DRAG_FOR_HISTORY: string = "${chat.history.drag.tooltip}";

    constructor(param1: RoomChatWidget, param2: IHabboWindowManager, param3: IAssetLibrary, param4: string, param5: IHabboLocalizationManager, param6: string) {
        this._widget = param1;
        this._windowManager = param2;
        this._SafeStr_3052 = param3;
        this._id = param4;
        this._SafeStr_2259 = param5;
        this._SafeStr_5822 = param6;
    }

    declare private _widget: RoomChatWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_2259: IHabboLocalizationManager;

    declare private _window: IRegionWindow;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _id: string;

    declare private _SafeStr_5822: string;

    private _screenLevel: number = -1;

    declare private _chatType: number;
    static { (this.prototype as any)._chatType = 0; }

    declare private _chatStyle: number;
    static { (this.prototype as any)._chatStyle = 0; }

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    private _message: string = "";

    declare private _SafeStr_2932: any[];

    declare private _SafeStr_3760: any[];

    declare private _timeStamp: number;
    static { (this.prototype as any)._timeStamp = 0; }

    declare private _senderX: number;
    static { (this.prototype as any)._senderX = NaN; }

    declare private _senderImage: BitmapData;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    declare private _petType: number;
    static { (this.prototype as any)._petType = 0; }

    declare private _SafeStr_4337: number;
    static { (this.prototype as any)._SafeStr_4337 = 0; }

    private _SafeStr_5221: boolean = false;
    private _topOffset: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _SafeStr_4778: boolean = false;
    private _aboveLevels: number = 0;

    public get aboveLevels(): number {
        return this._aboveLevels;
    }

    public set aboveLevels(param1: number) {
        this._aboveLevels = param1;
    }

    private _senderName: string = "";

    public set senderName(param1: string) {
        this._senderName = param1;
    }

    declare private _senderColor: number;
    static { (this.prototype as any)._senderColor = 0; }

    public set senderColor(param1: number) {
        this._senderColor = param1;
    }

    private _width: number = 0;

    public get width(): number {
        return this._width;
    }

    private _originalBackgroundYOffset: number = 0;

    public get originalBackgroundYOffset(): number {
        return this._originalBackgroundYOffset;
    }

    public set senderImage(param1: BitmapData) {
        this._senderImage = param1;
    }

    public set chatType(param1: number) {
        this._chatType = param1;
    }

    public get view(): IWindowContainer {
        return this._window;
    }

    public get screenLevel(): number {
        return this._screenLevel;
    }

    public set screenLevel(param1: number) {
        this._screenLevel = param1;
    }

    public get timeStamp(): number {
        return this._timeStamp;
    }

    public set timeStamp(param1: number) {
        this._timeStamp = param1;
    }

    public get senderX(): number {
        return this._senderX;
    }

    public set senderX(param1: number) {
        this._senderX = param1;
    }

    public get height(): number {
        return 18;
    }

    public get message(): string {
        return this._message;
    }

    public set message(param1: string) {
        this._message = param1;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public set x(param1: number) {
        this._SafeStr_2126 = param1;
        if (this._window != null) {
            this._window.x = param1 | 0;
        }
    }

    public get y(): number {
        return this._y;
    }

    public set y(param1: number) {
        this._y = param1;
        if (this._window != null) {
            this._window.y = param1 - this._topOffset + this._originalBackgroundYOffset | 0;
        }
    }

    public get chatStyle(): number {
        return this._chatStyle;
    }

    private get isNotify(): boolean {
        return this._chatStyle == 1;
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
            this._widget = null;
            this._windowManager = null;
            this._SafeStr_2259 = null;
            this._senderImage = null;
        }
    }

    public hidePointer(): void {
        let _loc1_: IWindow = null;
        if (this._window) {
            _loc1_ = this._window.findChildByName("pointer");
            if (_loc1_) {
                _loc1_.visible = false;
            }
        }
    }

    public setPointerOffset(param1: number): void {
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("pointer"), isIBitmapWrapperWindow);
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("middle"), isIBitmapWrapperWindow);
        if (_loc2_ == null || _loc3_ == null) {
            return;
        }
        _loc3_.visible = true;
        param1 += this._window.width / 2;
        param1 = Math.min(param1, _loc2_.rectangle.right - _loc3_.width);
        param1 = Math.max(param1, _loc2_.rectangle.left);
        _loc3_.x = param1 | 0;
    }

    public checkOverlap(param1: number, param2: number, param3: number, param4: number, param5: number): boolean {
        let _loc6_: Rectangle = new Rectangle(this._SafeStr_2126, this._y, this.width, param1);
        let _loc7_: Rectangle = new Rectangle(param2, param3, param4, param5);
        return _loc6_.intersects(_loc7_);
    }

    public hideView(): void {
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
        this._SafeStr_5221 = false;
    }

    public renderView(): void {
        let _loc15_: IBitmapWrapperWindow = null;
        let _loc14_: number = 0;
        let _loc12_: number = 0;
        let _loc16_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc17_: string = null;
        let _loc18_: string = null;
        let _loc2_: number = 0;
        let _loc20_: TextFormat = null;
        let _loc10_: any[] = null;
        if (this._SafeStr_5221) {
            return;
        }
        this._SafeStr_5221 = true;
        if (this._window) {
            return;
        }
        this._window = RoomChatWidget.chatBubbleFactory.getBubbleWindow(this._chatStyle, this._chatType);
        if (!this._window) {
            return;
        }
        this._window.toolTipIsDynamic = true;
        let _loc9_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("background"), isIBitmapWrapperWindow);
        let _loc13_: ILabelWindow = asGuarded(this._window.findChildByName("name"), isILabelWindow);
        let _loc5_: ITextWindow = asGuarded(this._window.findChildByName("message"), isITextWindow);
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("pointer"), isIBitmapWrapperWindow);
        let _loc1_: number = Number(this._window.height);
        let _loc19_: BitmapData = RoomChatWidget.chatBubbleFactory.getPointerBitmapData(this._chatStyle);
        this._originalBackgroundYOffset = _loc9_.y;
        let _loc8_: number = _loc5_.x <= 26 ? 0 : _loc5_.x - 26;
        if (this._senderImage != null) {
            this._topOffset = Math.max(0, (this._senderImage.height - _loc9_.height) / 2);
            _loc1_ = Math.max(_loc1_, this._senderImage.height);
            _loc1_ = Math.max(_loc1_, _loc9_.height);
        }
        this._width = 0;
        this._window.x = this._SafeStr_2126 | 0;
        this._window.y = this._y | 0;
        this._window.width = 0;
        this._window.height = _loc1_ | 0;
        this.enableDragTooltip();
        this.addEventListeners(this._window);
        if (this._senderImage && !this.isNotify) {
            _loc15_ = asGuarded(this._window.findChildByName("user_image"), isIBitmapWrapperWindow);
            if (_loc15_) {
                _loc15_.width = this._senderImage.width;
                _loc15_.height = this._senderImage.height;
                _loc15_.bitmap = this._senderImage;
                _loc15_.disposesBitmap = false;
                _loc14_ = _loc15_.x - this._senderImage.width / 2 | 0;
                _loc12_ = Math.max(0, (_loc9_.height - this._senderImage.height) / 2) | 0;
                if (this._userType == 2) {
                    if (this._petType == 15) {
                        if (this._senderImage.height > _loc9_.height) {
                            _loc12_ = (this._senderImage.height - _loc9_.height) / 2 | 0;
                        }
                    }
                }
                _loc15_.x = _loc14_;
                _loc15_.y += _loc12_;
                this._width += _loc15_.x + this._senderImage.width;
            }
        }
        if (_loc13_ != null) {
            if (!this.isNotify) {
                _loc13_.text = this._senderName + ": ";
                _loc13_.y += this._topOffset;
                _loc13_.width = _loc13_.textWidth + 6 | 0;
            } else {
                _loc13_.text = "";
                _loc13_.width = 0;
            }
            this._width += _loc13_.width;
        }
        if (this._chatType == 3) {
            _loc5_.text = this._SafeStr_2259.registerParameter("widgets.chatbubble.respect", "username", this._senderName);
            this._width = 35;
        } else if (this._chatType == 4) {
            _loc5_.text = this._SafeStr_2259.registerParameter("widget.chatbubble.petrespect", "petname", this._senderName);
            this._width = 35;
        } else if (this._chatType == 6) {
            _loc5_.text = this._SafeStr_2259.registerParameter("widget.chatbubble.pettreat", "petname", this._senderName);
            this._width = 35;
        } else if (this._chatType == 7) {
            _loc5_.text = this.message;
            this._width = 35;
        } else if (this._chatType == 8) {
            _loc5_.text = this.message;
            this._width = 35;
        } else if (this._chatType == 9) {
            _loc5_.text = this.message;
            this._width = 35;
        } else if (this._chatType == 5) {
            _loc5_.text = this.message;
            this._width = 35;
        } else if (this._SafeStr_2932 == null) {
            _loc5_.text = this.message;
        } else {
            this._SafeStr_3760 = [];
            _loc7_ = -1;
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_2932.length) {
                _loc17_ = stringOrNull(this._SafeStr_2932[_loc4_][1]);
                _loc18_ = "{" + _loc4_ + "}";
                _loc2_ = this._message.indexOf(_loc18_);
                _loc7_ = _loc2_ + _loc17_.length;
                this._SafeStr_3760.push([_loc2_, _loc7_]);
                this._message = this._message.replace(_loc18_, _loc17_);
                _loc4_++;
            }
            _loc5_.text = this.message;
            _loc5_.immediateClickMode = true;
            _loc5_.setParamFlag(16, false);
            _loc5_.setParamFlag(1073741824, true);
            _loc20_ = _loc5_.getTextFormat();
            switch (this._chatStyle - 2) {
                case 0:
                    _loc20_.color = 14540253;
                    break;
                default:
                    _loc20_.color = 2710438;
            }
            _loc20_.underline = true;
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_3760.length) {
                _loc10_ = this._SafeStr_3760[_loc4_];
                try {
                    _loc5_.setTextFormat(_loc20_, _loc10_[0] | 0, _loc10_[1] | 0);
                } catch ($e) {
                    if ($e instanceof RangeError) {
                        let e: RangeError = $e;
                        RoomChatItem._log.warn("Chat message links were malformed. Could not set TextFormat");
                    } else {
                        throw $e;
                    }
                }
                _loc4_++;
            }
        }
        if (_loc5_.visible) {
            _loc5_.x = this._width + _loc8_ | 0;
            if (_loc13_ != null) {
                _loc5_.x = _loc13_.x + _loc13_.width;
                if (_loc13_.width > 6) {
                    _loc5_.x -= 6 - 1;
                }
            }
            _loc5_.y += this._topOffset;
            _loc16_ = _loc5_.textWidth | 0;
            _loc5_.width = _loc16_ + 6;
            this._width += _loc5_.width;
        }
        if (_loc3_ != null && Boolean(_loc3_.visible)) {
            _loc3_.bitmap = _loc19_;
            _loc3_.disposesBitmap = false;
            _loc3_.x = this._width / 2 | 0;
            _loc3_.y += this._topOffset;
        }
        let _loc6_: number = _loc5_.width;
        if (_loc13_) {
            _loc6_ += _loc13_.width;
        }
        let _loc11_: BitmapData = RoomChatWidget.chatBubbleFactory.buildBubbleImage(this._chatStyle, this._chatType, _loc6_, _loc9_.height, this._senderColor);
        this._window.width = _loc11_.width;
        this._window.y -= this._topOffset;
        this._window.y += this._originalBackgroundYOffset;
        this._width = this._window.width;
        _loc9_.bitmap = _loc11_;
        _loc9_.y = this._topOffset | 0;
    }

    public enableDragTooltip(): void {
        this._SafeStr_4778 = true;
        this.refreshTooltip();
    }

    public disableDragTooltip(): void {
        this._SafeStr_4778 = false;
        this.refreshTooltip();
    }

    private refreshTooltip(): void {
        if (this._window == null) {
            return;
        }
        this._window.toolTipCaption = "";
        if (this._widget.isGameSession) {
            return;
        }
        if (this._SafeStr_4778) {
            this._window.toolTipCaption = "${chat.history.drag.tooltip}";
        }
        this._window.toolTipDelay = 500;
    }

    private addEventListeners(param1: IWindowContainer): void {
        param1.setParamFlag(1, true);
        param1.addEventListener("WME_CLICK", this.onBubbleMouseClick);
        param1.addEventListener("WME_DOWN", this.onBubbleMouseDown);
        param1.addEventListener("WME_OVER", this.onBubbleMouseOver);
        param1.addEventListener("WME_OUT", this.onBubbleMouseOut);
        param1.addEventListener("WME_UP", this.onBubbleMouseUp);
    }

    private testMessageLinkMouseClick(param1: number, param2: number): boolean {
        let _loc3_: number = 0;
        let _loc4_: ITextWindow = asGuarded(this._window.getChildByName("message"), isITextWindow);
        let _loc5_: number = _loc4_.getCharIndexAtPoint(param1 - _loc4_.x, param2 - _loc4_.y);
        if (_loc5_ > -1) {
            _loc3_ = 0;
            while (_loc3_ < this._SafeStr_3760.length) {
                if (_loc5_ >= this._SafeStr_3760[_loc3_][0] && _loc5_ <= this._SafeStr_3760[_loc3_][1]) {
                    if (this._SafeStr_2932[_loc3_][2] == 0) {
                        HabboWebTools.openExternalLinkWarning(stringOrNull(this._SafeStr_2932[_loc3_][0]));
                    } else if (this._SafeStr_2932[_loc3_][2] == 1) {
                        HabboWebTools.openWebPage(this._SafeStr_5822 + this._SafeStr_2932[_loc3_][0], "habboMain");
                    } else {
                        HabboWebTools.openWebPage(this._SafeStr_5822 + this._SafeStr_2932[_loc3_][0]);
                    }
                    return true;
                }
                _loc3_++;
            }
        }
        return false;
    }

    private onBubbleMouseClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2932 && this._SafeStr_2932.length > 0) {
            if (this.testMessageLinkMouseClick(param1.localX | 0, param1.localY | 0)) {
                return;
            }
        }
        this._widget.onItemMouseClick(this._senderId, this._senderName, this._SafeStr_4337, this._roomId, param1);
    };

    private onBubbleMouseDown = (param1: WindowMouseEvent): void => {
        this._widget.onItemMouseDown(this._senderId, this._SafeStr_4337, this._roomId, param1);
    };

    private onBubbleMouseOver = (param1: WindowMouseEvent): void => {
        this._widget.onItemMouseOver(this._senderId, this._SafeStr_4337, this._roomId, param1);
    };

    private onBubbleMouseOut = (param1: WindowMouseEvent): void => {
        this._widget.onItemMouseOut(this._senderId, this._SafeStr_4337, this._roomId, param1);
    };

    private onBubbleMouseUp = (param1: WindowMouseEvent): void => {
        this._widget.mouseUp();
    };

    public define(param1: RoomWidgetChatUpdateEvent): void {
        this._chatType = param1.chatType;
        this._chatStyle = param1.styleId;
        this._senderId = param1.userId;
        this._senderName = param1.userName;
        this._SafeStr_4337 = param1.userCategory;
        this._message = param1.text;
        this._SafeStr_2932 = param1.links;
        this._senderX = param1.userX;
        this._senderImage = param1.userImage;
        this._senderColor = param1.userColor;
        this._roomId = param1.roomId;
        this._userType = param1.userType;
        this._petType = param1.petType;
        this.renderView();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomChatItem.#staticsReady) return;
        RoomChatItem.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomChatItem, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.roomchat.RoomChatItem"));
    }
}
