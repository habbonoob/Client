import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
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
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
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

    private static RESIZING_OFFSETS: number = 10;

    public static getMessagesFromProperty(param1: string): any[] {
        let _loc2_: any[] = param1.split("\t");
        if (_loc2_.length == 1 && _loc2_[0] == "") {
            return [];
        }
        return _loc2_;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("illumina_chat_bubble_xml").content, XML)), isIWindowContainer);
        this._SafeStr_2556 = asGuarded(this._root.findChildByName("message_container"), isIItemListWindow);
        this._SafeStr_5607 = asGuarded(this._SafeStr_2556.getListItemByName("message_template"), isITextWindow);
        this._SafeStr_2556.removeListItem(this._SafeStr_5607);
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

    declare private _SafeStr_5607: ITextWindow;

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    private _flipped: boolean = Boolean(IlluminaChatBubbleWidget.FLIPPED_DEFAULT.value);

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

    private _SafeStr_3681: any[] = [];
    private _SafeStr_7126: number = 0;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _userName: ILabelWindow;

    public get userName(): string {
        return this._userName.caption.slice(0, -1);
    }

    public set userName(param1: string) {
        this._userName.caption = param1 + ":";
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
        _loc1_.push(IlluminaChatBubbleWidget.MESSAGE_DEFAULT.withValue(this.getMessages().join("\t")));
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
        this._flipped = param1;
        this.refresh();
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

    public get numMessages(): number {
        return this._SafeStr_2556.numListItems;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public refresh(): void {
        let _loc1_: number = 0;
        let _loc3_: ITextWindow = null;
        if (this._SafeStr_4202) {
            return;
        }
        this._SafeStr_4202 = true;
        this._root.limits.minWidth = this._root.width;
        this._root.limits.maxWidth = this._root.width;
        this._root.height = this._SafeStr_3180.bottom;
        this._SafeStr_3180.width = this._root.width - this._SafeStr_3420.width;
        let _loc2_: number = this._SafeStr_3180.width / IlluminaChatBubbleWidget.RESIZING_OFFSETS | 0;
        if (_loc2_ != this._SafeStr_7126) {
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_2556.numListItems) {
                _loc3_ = asGuarded(this._SafeStr_2556.getListItemAt(_loc1_ >>> 0), isITextWindow);
                _loc3_.width = this._SafeStr_3180.width - 5;
                _loc1_ += 1;
            }
            this._SafeStr_7126 = _loc2_;
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

    public getMessage(param1: number): string {
        return this._SafeStr_2556.getListItemAt(param1 >>> 0).caption;
    }

    public setMessage(param1: number, param2: string): void {
        while (param1 >= this.numMessages) {
            this._SafeStr_2556.addListItem(this.createMessage());
            this._SafeStr_3681.push(0);
        }
        this._SafeStr_2556.getListItemAt(param1 >>> 0).caption = param2;
    }

    public appendMessage(param1: string, param2: boolean = false, param3: number = 0): void {
        let _loc4_: number = 0;
        if (param2) {
            _loc4_ = 0;
            this._SafeStr_2556.addListItemAt(this.createMessage(), 0);
            this._SafeStr_3681.splice(_loc4_, 0, 0);
        } else {
            _loc4_ = this.numMessages;
        }
        this.setMessage(_loc4_, param1);
        this.setAwaitingConfirmationId(_loc4_, param3);
    }

    public getMessages(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this.numMessages) {
            _loc1_.push(this.getMessage(_loc2_));
            _loc2_ += 1;
        }
        return _loc1_;
    }

    public setAwaitingConfirmationId(param1: number, param2: number): void {
        let _loc3_: ITextWindow = asGuarded(this._SafeStr_2556.getListItemAt(param1 >>> 0), isITextWindow);
        _loc3_.textColor = (param2 > 0 ? 9079434 : 0) >>> 0;
        this._SafeStr_3681[param1] = param2;
    }

    public clearAwaitingConfirmationId(param1: number): void {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2556.getListItemAt(param1 >>> 0), isITextWindow);
        _loc2_.textColor = 0;
        this._SafeStr_3681[param1] = 0;
    }

    public getAwaitingConfirmationId(param1: number): number {
        return this._SafeStr_3681[param1] | 0;
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

    private setMessages(param1: any[]): void {
        this._SafeStr_2556.removeListItems();
        this._SafeStr_3681.length = 0;
        for (const _loc2_ of param1 ?? []) {
            this.appendMessage(stringOrNull(_loc2_));
        }
    }

    private createMessage(): ITextWindow {
        return asGuarded(this._SafeStr_5607.clone(), isITextWindow);
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
