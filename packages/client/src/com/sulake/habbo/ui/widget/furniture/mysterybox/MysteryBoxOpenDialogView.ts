import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GotMysteryBoxPrizeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/GotMysteryBoxPrizeMessageParser';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CancelMysteryBoxWaitMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/mysterybox/CancelMysteryBoxWaitMessageEvent';
import { GotMysteryBoxPrizeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/mysterybox/GotMysteryBoxPrizeMessageEvent';
import { ShowMysteryBoxWaitMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/mysterybox/ShowMysteryBoxWaitMessageEvent';
import { MysteryBoxWaitingCanceledMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/mysterybox/MysteryBoxWaitingCanceledMessageComposer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { MysteryBoxToolbarExtension } from '@/com/sulake/habbo/ui/widget/furniture/mysterybox/MysteryBoxToolbarExtension';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class MysteryBoxOpenDialogView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.mysterybox::MysteryBoxOpenDialogView'); }

    constructor(param1: FurnitureContextMenuWidget) {
        this._widget = param1;
        this._SafeStr_4539 = new ShowMysteryBoxWaitMessageEvent(this.onShowMysteryBoxWait);
        this._SafeStr_4653 = new CancelMysteryBoxWaitMessageEvent(this.onCancelMysteryBoxWait);
        this._SafeStr_4570 = new GotMysteryBoxPrizeMessageEvent(this.onGotMysteryBoxPrize);
        let _loc2_: IConnection = this.connection;
        if (_loc2_ != null) {
            _loc2_.addMessageEvent(this._SafeStr_4539);
            _loc2_.addMessageEvent(this._SafeStr_4653);
            _loc2_.addMessageEvent(this._SafeStr_4570);
        }
    }

    declare private _widget: FurnitureContextMenuWidget;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    declare private _object: IRoomObject;

    declare private _SafeStr_4539: ShowMysteryBoxWaitMessageEvent;

    declare private _SafeStr_4653: CancelMysteryBoxWaitMessageEvent;

    declare private _SafeStr_4570: GotMysteryBoxPrizeMessageEvent;

    private _SafeStr_3965: number = -1;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private set rewardBitmap(param1: BitmapData) {
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("reward_image"), isIBitmapWrapperWindow);
        let _loc2_: IWindow = this._window.findChildByName("bitmap_container");
        _loc3_.bitmap = param1;
        _loc2_.width = param1.width;
        _loc2_.height = param1.height;
        _loc2_.width++;
    }

    private get connection(): IConnection {
        if (this._widget == null || this._widget.handler == null || this._widget.handler.container == null) {
            return null;
        }
        return this._widget.handler.container.connection;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.closeWindow();
        let _loc1_: IConnection = this.connection;
        if (_loc1_ != null) {
            _loc1_.removeMessageEvent(this._SafeStr_4539);
            _loc1_.removeMessageEvent(this._SafeStr_4653);
            _loc1_.removeMessageEvent(this._SafeStr_4570);
        }
        this._SafeStr_4539 = null;
        this._SafeStr_4653 = null;
        this._SafeStr_4570 = null;
        this._object = null;
        this._widget = null;
        this._disposed = true;
    }

    public startOpenFlow(param1: IRoomObject): void {
        this._object = param1;
        let _loc2_: IConnection = this.connection;
        if (_loc2_ != null) {
            _loc2_.send(new UseFurnitureMessageComposer(param1.getId()));
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (param1 == this._SafeStr_3965) {
            this._SafeStr_3965 = -1;
            this.rewardBitmap = param2;
        }
    }

    public imageFailed(param1: number): void {
    }

    private onShowMysteryBoxWait = (param1: ShowMysteryBoxWaitMessageEvent): void => {
        this.showWaitWindow();
    };

    private onCancelMysteryBoxWait = (param1: CancelMysteryBoxWaitMessageEvent): void => {
        this.closeWindow();
    };

    private onGotMysteryBoxPrize = (param1: GotMysteryBoxPrizeMessageEvent): void => {
        let _loc2_: GotMysteryBoxPrizeMessageParser = param1.getParser();
        this.showRewardWindow(_loc2_.contentType, _loc2_.classId);
    };

    private showWaitWindow(): void {
        this.closeWindow();
        let _loc1_: XML = asInstanceOf(this._widget.assets.getAssetByName("mystery_box_open_dialog").content, XML);
        this._SafeStr_2492 = this._widget.handler.container.windowManager.buildModalDialogFromXML(_loc1_);
        this._window = asGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer);
        this._window.procedure = this.waitWindowProcedure;
        let _loc4_: boolean = this._widget.handler.container.isOwnerOfFurniture(this._object);
        let _loc5_: string = _loc4_ ? "mysterybox.dialog.owner." : "mysterybox.dialog.other.";
        this._window.caption = "${" + _loc5_ + "title}";
        this._window.findChildByName("subtitle_text").caption = "${" + _loc5_ + "subtitle}";
        this._window.findChildByName("waiting_text").caption = "${" + _loc5_ + "waiting}";
        this._window.findChildByName("cancel_button").caption = "${" + _loc5_ + "cancel}";
        castGuarded(this._window.findChildByName("reward_base"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc4_ ? "mysterybox_box_base" : "mysterybox_key_base";
        castGuarded(this._window.findChildByName("reward_overlay"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc4_ ? "mysterybox_box_overlay" : "mysterybox_key_overlay";
        castGuarded(this._window.findChildByName("needed_base"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc4_ ? "mysterybox_key_base" : "mysterybox_box_base";
        castGuarded(this._window.findChildByName("needed_overlay"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc4_ ? "mysterybox_key_overlay" : "mysterybox_box_overlay";
        let _loc6_: ISessionDataManager = this._widget.handler.container.sessionDataManager;
        let _loc2_: string = _loc4_ ? _loc6_.mysteryBoxColor : _loc6_.mysteryKeyColor;
        if (_loc2_ == null || _loc2_ == "") {
            return;
        }
        let _loc3_: number = MysteryBoxToolbarExtension.KEY_COLORS.get(_loc2_.toLowerCase()) >>> 0;
        this._window.findChildByName("reward_base").color = _loc3_;
        this._window.findChildByName("needed_base").color = _loc3_;
    }

    private waitWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IConnection = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_button":
                this.closeWindow();
                _loc3_ = this.connection;
                if (_loc3_ != null) {
                    _loc3_.send(new MysteryBoxWaitingCanceledMessageComposer(this._widget.handler.container.getFurnitureOwnerId(this._object)));
                }
        }
    };

    private showRewardWindow(param1: string, param2: number): void {
        this.closeWindow();
        let _loc3_: XML = asInstanceOf(this._widget.assets.getAssetByName("mystery_box_reward").content, XML);
        this._SafeStr_2492 = this._widget.handler.container.windowManager.buildModalDialogFromXML(_loc3_);
        this._window = asGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer);
        this._window.procedure = this.rewardWindowProcedure;
        this._SafeStr_3965 = -1;
        let _loc4_: ImageResult = null;
        switch (param1) {
            case "s":
                _loc4_ = this._widget.handler.container.roomEngine.getFurnitureImage(param2, new Vector3d(90, 0, 0), 64, this, 0);
                break;
            case "i":
                _loc4_ = this._widget.handler.container.roomEngine.getWallItemImage(param2, new Vector3d(90, 0, 0), 64, this, 0);
                break;
            case "e":
                this.rewardBitmap = this._widget.handler.container.catalog.getPixelEffectIcon(param2);
                break;
            case "h":
                this.rewardBitmap = this._widget.handler.container.catalog.getSubscriptionProductIcon(param2);
                break;
            default:
                return;
        }
        if (_loc4_ != null) {
            if (_loc4_.data != null) {
                this.rewardBitmap = _loc4_.data;
            }
            this._SafeStr_3965 = _loc4_.id;
        }
    }

    private rewardWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param1.target.name) {
            case "header_button_close":
            case "close_button":
                this.closeWindow();
        }
    };

    private closeWindow(): void {
        if (this._SafeStr_2492 != null && !this._SafeStr_2492.disposed) {
            this._window = null;
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
