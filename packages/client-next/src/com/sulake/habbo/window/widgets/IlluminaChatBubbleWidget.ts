import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IUpdatingTimeStampWidget } from '@/com/sulake/habbo/window/widgets/IUpdatingTimeStampWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { _SafeCls_6053 } from '@/com/sulake/habbo/window/widgets/_SafeCls_6053';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IIlluminaChatBubbleWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaChatBubbleWidget';
import { isIUpdatingTimeStampWidget } from '@/com/sulake/habbo/window/widgets/IUpdatingTimeStampWidget';

export class IlluminaChatBubbleWidget implements IIlluminaChatBubbleWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::IlluminaChatBubbleWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "illumina_chat_bubble";
    private static readonly _SafeStr_8374: string = "illumina_chat_bubble:flipped";
    private static readonly USER_NAME_KEY: string = "illumina_chat_bubble:user_name";
    private static readonly FIGURE_KEY: string = "illumina_chat_bubble:figure";
    private static readonly MESSAGE_KEY: string = "illumina_chat_bubble:message";
    private static readonly _SafeStr_14769: number = 80;
    private static readonly _SafeStr_14770: number = 2;
    private static readonly _SafeStr_14771: number = -1;
    private static readonly HABBICON_DIRECTION_RIGHT: number = 1;
    private static readonly PENDING_MESSAGE_BLEND: number = 0.45;
    private static RESIZING_OFFSETS: number = 10;

    private static get FLIPPED_DEFAULT(): PropertyStruct {
        IlluminaChatBubbleWidget.#initStatics();
        return IlluminaChatBubbleWidget.FLIPPED_DEFAULT;
    }

    private static get USER_NAME_DEFAULT(): PropertyStruct {
        IlluminaChatBubbleWidget.#initStatics();
        return IlluminaChatBubbleWidget.USER_NAME_DEFAULT;
    }

    private static get FIGURE_DEFAULT(): PropertyStruct {
        IlluminaChatBubbleWidget.#initStatics();
        return IlluminaChatBubbleWidget.FIGURE_DEFAULT;
    }

    private static get MESSAGE_DEFAULT(): PropertyStruct {
        IlluminaChatBubbleWidget.#initStatics();
        return IlluminaChatBubbleWidget.MESSAGE_DEFAULT;
    }

    declare private _SafeStr_5607: ITextWindow;

    declare private _SafeStr_14772: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    private _flipped: boolean = Boolean(IlluminaChatBubbleWidget.FLIPPED_DEFAULT.value);

    declare private _userName: ILabelWindow;

    declare private _SafeStr_3420: IWindow;

    declare private _avatarWidget: IAvatarImageWidget;

    declare private _SafeStr_3180: IWindow;

    declare private _postTime: IUpdatingTimeStampWidget;

    declare private _offline: IRegionWindow;

    declare private _arrowPoint: IStaticBitmapWrapperWindow;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_2556: IItemListWindow;

    declare private _SafeStr_6334: IItemListWindow;

    private _messages: _SafeCls_6053[] = new Array<_SafeCls_6053>(0).fill(null);
    private _SafeStr_3681: any[] = [];

    declare private _SafeStr_14773: boolean;
    static { (this.prototype as any)._SafeStr_14773 = false; }

    private _SafeStr_7126: number = 0;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("illumina_chat_bubble_xml").content, XML)), isIWindowContainer);
        this._SafeStr_2556 = asGuarded(this._root.findChildByName("message_container"), isIItemListWindow);
        this._SafeStr_5607 = asGuarded(this._SafeStr_2556.getListItemByName("message_template"), isITextWindow);
        this._SafeStr_2556.removeListItem(this._SafeStr_5607);
        this._SafeStr_14772 = asGuarded(this._SafeStr_2556.getListItemByName("habbicon_template"), isIWindowContainer);
        this._SafeStr_2556.removeListItem(this._SafeStr_14772);
        this._SafeStr_6334 = asGuarded(this._root.findChildByName("spaced_message_container"), isIItemListWindow);
        this._userName = asGuarded(this._root.findChildByName("user_name"), isILabelWindow);
        let _loc3_: IWidgetWindow = asGuarded(this._root.findChildByName("user_avatar"), isIWidgetWindow);
        this._SafeStr_3420 = _loc3_.parent;
        this._avatarWidget = asGuarded(_loc3_.widget, isIAvatarImageWidget);
        this._SafeStr_3180 = this._root.findChildByName("bubble_wrapper");
        this._postTime = asGuarded(castGuarded(this._root.findChildByName("post_time"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIUpdatingTimeStampWidget);
        this._offline = asGuarded(this._root.findChildByName("offline_placeholder"), isIRegionWindow);
        this._offline.height = 0;
        this._arrowPoint = asGuarded(this._root.findChildByName("arrow_point"), isIStaticBitmapWrapperWindow);
        this._root.findChildByName("message_region").setParamFlag(1, false);
        this._root.procedure = this.rootProcedure;
        this.userName = String(IlluminaChatBubbleWidget.USER_NAME_DEFAULT.value);
        this.figure = String(IlluminaChatBubbleWidget.FIGURE_DEFAULT.value);
        this.setMessages(IlluminaChatBubbleWidget.getMessagesFromProperty(String(IlluminaChatBubbleWidget.MESSAGE_DEFAULT.value)));
        this._SafeStr_2293.rootWindow = this._root;
        this._SafeStr_2293.setParamFlag(147456);
        this._root.width = this._SafeStr_2293.width;
    }

    public static getMessagesFromProperty(param1: string): any[] {
        let _loc2_: any[] = param1.split("\t");
        if (_loc2_.length == 1 && _loc2_[0] == "") {
            return [];
        }
        return _loc2_;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(IlluminaChatBubbleWidget.FLIPPED_DEFAULT.withValue(this.flipped));
        _loc1_.push(IlluminaChatBubbleWidget.USER_NAME_DEFAULT.withValue(this.userName));
        _loc1_.push(IlluminaChatBubbleWidget.FIGURE_DEFAULT.withValue(this.figure));
        _loc1_.push(IlluminaChatBubbleWidget.MESSAGE_DEFAULT.withValue(this.getSerializedMessages().join("\t")));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "illumina_chat_bubble:flipped":
                    this.flipped = Boolean(_loc2_.value);
                    break;
                case "illumina_chat_bubble:user_name":
                    this.userName = String(_loc2_.value);
                    break;
                case "illumina_chat_bubble:figure":
                    this.figure = String(_loc2_.value);
                    break;
                case "illumina_chat_bubble:message":
                    this.setMessages(IlluminaChatBubbleWidget.getMessagesFromProperty(String(_loc2_.value)));
            }
        }
    }

    public get flipped(): boolean {
        return this._flipped;
    }

    public set flipped(param1: boolean) {
        if (this._flipped == param1) {
            return;
        }
        this._flipped = param1;
        this.refresh();
    }

    public get userName(): string {
        return this._userName.caption.slice(0, -1);
    }

    public set userName(param1: string) {
        this._userName.caption = param1 + ":";
    }

    public get userId(): number {
        return this._avatarWidget.userId;
    }

    public set userId(param1: number) {
        this._avatarWidget.userId = param1;
    }

    public get figure(): string {
        return this._avatarWidget.figure;
    }

    public set figure(param1: string) {
        this._avatarWidget.figure = param1;
    }

    public get timeStamp(): number {
        return this._postTime.timeStamp;
    }

    public set timeStamp(param1: number) {
        this._postTime.timeStamp = param1;
    }

    public set friendOnlineStatus(param1: boolean) {
        this._offline.height = !param1 ? 16 : 0;
    }

    public refresh(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindow = null;
        let _loc4_: ITextWindow = null;
        if (this._SafeStr_4202) {
            return;
        }
        this._SafeStr_4202 = true;
        this._root.limits.minWidth = this._root.width;
        this._root.limits.maxWidth = this._root.width;
        this._root.height = this._SafeStr_3180.bottom;
        this._SafeStr_3180.width = this._root.width - this._SafeStr_3420.width;
        let _loc3_: number = this._SafeStr_3180.width / IlluminaChatBubbleWidget.RESIZING_OFFSETS | 0;
        if (_loc3_ != this._SafeStr_7126) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2556.numListItems) {
                _loc1_ = this._SafeStr_2556.getListItemAt(_loc2_ >>> 0);
                _loc4_ = isITextWindow(_loc1_) ? _loc1_ : null;
                if (_loc4_ != null) {
                    _loc4_.width = this._SafeStr_3180.width - 5;
                } else {
                    _loc1_.width = 80;
                    _loc1_.height = 80;
                }
                _loc2_ += 1;
            }
            this._SafeStr_7126 = _loc3_;
        }
        this._SafeStr_2556.width = this._SafeStr_3180.width;
        this._SafeStr_6334.width = this._SafeStr_3180.width;
        this._avatarWidget.direction = this._flipped ? 4 : 2;
        if (this._flipped) {
            this._SafeStr_3420.x = this._root.width - this._SafeStr_3420.width;
            this._arrowPoint.zoomX = 1;
            this._arrowPoint.x = this._SafeStr_3420.x;
            this._SafeStr_3180.x = 0;
        } else {
            this._SafeStr_3420.x = 0;
            this._arrowPoint.zoomX = -1;
            this._arrowPoint.x = this._SafeStr_3420.right - this._arrowPoint.width;
            this._SafeStr_3180.x = this._SafeStr_3420.right;
        }
        this._root.limits.setEmpty();
        this._arrowPoint.invalidate();
        this._SafeStr_4202 = false;
    }

    private rootProcedure = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WE_RESIZED":
                this.refresh();
                break;
            case "WE_CHILD_RESIZED":
                this.refresh();
                break;
            case "WME_CLICK":
                if (this.userId > 0 && param2.name == "user_name_region") {
                    this._windowManager.communication.connection.send(new GetExtendedProfileMessageComposer(this.userId));
                }
        }
    };

    public get numMessages(): number {
        return this._messages.length | 0;
    }

    public getMessage(param1: number): _SafeCls_6053 {
        return this._messages[param1];
    }

    public setMessage(param1: number, param2: any): void {
        let _loc4_: IWindow = null;
        let _loc5_: _SafeCls_6053 = this.normalizeMessage(param2);
        while (param1 >= this.numMessages) {
            this._messages.push(_SafeCls_6053.text(""));
            this._SafeStr_2556.addListItem(this.createMessageWindow(this._messages[this._messages.length - 1]));
            this._SafeStr_3681.push(0);
        }
        let _loc6_: number = this._SafeStr_3681[param1] | 0;
        let _loc3_: _SafeCls_6053 = this._messages[param1];
        this._messages[param1] = _loc5_;
        if (_loc3_.type != _loc5_.type) {
            _loc4_ = this._SafeStr_2556.removeListItemAt(param1);
            _loc4_.dispose();
            this._SafeStr_2556.addListItemAt(this.createMessageWindow(_loc5_), param1 >>> 0);
        } else {
            this.updateMessageWindow(param1, _loc5_);
        }
        this.setAwaitingConfirmationId(param1, _loc6_);
    }

    public appendMessage(param1: any, param2: boolean = false, param3: number = 0): void {
        let _loc5_: number = 0;
        let _loc4_: _SafeCls_6053 = this.normalizeMessage(param1);
        if (param2) {
            _loc5_ = 0;
            this._messages.splice(_loc5_, 0, _loc4_);
            this._SafeStr_2556.addListItemAt(this.createMessageWindow(_loc4_), 0);
            this._SafeStr_3681.splice(_loc5_, 0, param3);
        } else {
            _loc5_ = this.numMessages;
            this._messages.push(_loc4_);
            this._SafeStr_2556.addListItem(this.createMessageWindow(_loc4_));
            this._SafeStr_3681.push(param3);
        }
        this.setAwaitingConfirmationId(_loc5_, param3);
    }

    private setMessages(param1: any[]): void {
        this.disposeMessageWindows();
        this._messages.length = 0;
        this._SafeStr_3681.length = 0;
        for (const _loc2_ of param1 ?? []) {
            this.appendMessage(_SafeCls_6053.text(stringOrNull(_loc2_)));
        }
    }

    public getMessages(): any[] {
        return this.getSerializedMessages();
    }

    private getSerializedMessages(): any[] {
        let _loc2_: number = 0;
        let _loc3_: _SafeCls_6053 = null;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this.numMessages) {
            _loc3_ = this.getMessage(_loc2_);
            _loc1_.push(_loc3_.type == 0 ? _loc3_.textValue : "");
            _loc2_ += 1;
        }
        return _loc1_;
    }

    public setAwaitingConfirmationId(param1: number, param2: number): void {
        this.applyConfirmationVisual(param1, param2);
        this._SafeStr_3681[param1] = param2;
    }

    public clearAwaitingConfirmationId(param1: number): void {
        this.applyConfirmationVisual(param1, 0);
        this._SafeStr_3681[param1] = 0;
    }

    public getAwaitingConfirmationId(param1: number): number {
        return this._SafeStr_3681[param1] | 0;
    }

    private createMessageWindow(param1: _SafeCls_6053): IWindow {
        if (param1.type == 1) {
            return this.createHabbiconMessage(param1);
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_5607.clone(), isITextWindow);
        _loc2_.caption = param1.textValue;
        return _loc2_;
    }

    private normalizeMessage(param1: any): _SafeCls_6053 {
        if (param1 instanceof _SafeCls_6053) {
            return param1 instanceof _SafeCls_6053 ? param1 : null;
        }
        return _SafeCls_6053.text(param1 == null ? "" : String(param1));
    }

    private createHabbiconMessage(param1: _SafeCls_6053): IWindowContainer {
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_14772.clone(), isIWindowContainer);
        _loc2_.visible = true;
        _loc2_.width = 80;
        _loc2_.height = 80;
        this.renderHabbicon(_loc2_, param1.habbiconId);
        return _loc2_;
    }

    private updateMessageWindow(param1: number, param2: _SafeCls_6053): void {
        let _loc3_: IWindow = this._SafeStr_2556.getListItemAt(param1 >>> 0);
        if (param2.type == 1) {
            this.renderHabbicon(isIWindowContainer(_loc3_) ? _loc3_ : null, param2.habbiconId);
        } else {
            _loc3_.caption = param2.textValue;
        }
    }

    private renderHabbicon(param1: IWindowContainer, param2: number): void {
        param1.width = 80;
        param1.height = 80;
        let _loc3_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("habbicon_bitmap"), isIBitmapWrapperWindow);
        _loc3_.disposesBitmap = true;
        _loc3_.bitmap = this.createHabbiconBitmap(param2);
    }

    private createHabbiconBitmap(param1: number): BitmapData {
        let _loc4_: Matrix = null;
        let _loc3_: BitmapData = new BitmapData(80, 80, true, 0);
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1, false);
        if (_loc2_ == null) {
            if (!this._SafeStr_14773) {
                HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
                this._SafeStr_14773 = true;
            }
            return _loc3_;
        }
        _loc4_ = new Matrix();
        if (this.shouldMirrorHabbicon(param1)) {
            _loc4_.scale(-2, 2);
            _loc4_.translate(_loc2_.width * 2, 0);
        } else {
            _loc4_.scale(2, 2);
        }
        _loc3_.draw(_loc2_, _loc4_, null, null, null, false);
        return _loc3_;
    }

    private shouldMirrorHabbicon(param1: number): boolean {
        let _loc3_: number = this._flipped ? -1 : 1;
        let _loc2_: number = HabbiconAssetManager.getDirection(param1);
        return _loc3_ != 0 && _loc2_ != 0 && _loc3_ != _loc2_;
    }

    private onHabbiconAssetsLoaded = (param1: Event): void => {
        let _loc2_: number = 0;
        let _loc3_: _SafeCls_6053 = null;
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        this._SafeStr_14773 = false;
        if (this._disposed) {
            return;
        }
        _loc2_ = 0;
        while (_loc2_ < this.numMessages) {
            _loc3_ = this._messages[_loc2_];
            if (_loc3_.type == 1) {
                this.renderHabbicon(asGuarded(this._SafeStr_2556.getListItemAt(_loc2_ >>> 0), isIWindowContainer), _loc3_.habbiconId);
            }
            _loc2_ += 1;
        }
    };

    private applyConfirmationVisual(param1: number, param2: number): void {
        let _loc3_: IWindow = this._SafeStr_2556.getListItemAt(param1 >>> 0);
        let _loc5_: ITextWindow = isITextWindow(_loc3_) ? _loc3_ : null;
        let _loc4_: number = param2 > 0 ? 0.45 : 1;
        if (_loc5_ != null) {
            _loc5_.textColor = (param2 > 0 ? 9079434 : 0) >>> 0;
        } else {
            _loc3_.blend = _loc4_;
            (isIWindowContainer(_loc3_) ? _loc3_ : null).findChildByName("habbicon_bitmap").blend = _loc4_;
        }
    }

    private disposeMessageWindows(): void {
        let _loc1_: IWindow = null;
        while (this._SafeStr_2556.numListItems > 0) {
            _loc1_ = this._SafeStr_2556.removeListItemAt(0);
            _loc1_.dispose();
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IlluminaChatBubbleWidget.#staticsReady) return;
        IlluminaChatBubbleWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IlluminaChatBubbleWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("FLIPPED_DEFAULT", null);
        set("USER_NAME_DEFAULT", null);
        set("FIGURE_DEFAULT", null);
        set("MESSAGE_DEFAULT", null);
        set("FLIPPED_DEFAULT", new PropertyStruct("illumina_chat_bubble:flipped", false, "Boolean"));
        set("USER_NAME_DEFAULT", new PropertyStruct("illumina_chat_bubble:user_name", "", "String"));
        set("FIGURE_DEFAULT", new PropertyStruct("illumina_chat_bubble:figure", "", "String"));
        set("MESSAGE_DEFAULT", new PropertyStruct("illumina_chat_bubble:message", "", "String"));
    }

    get [IIlluminaChatBubbleWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
