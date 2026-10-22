import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IPollDialog } from '@/com/sulake/habbo/ui/widget/poll/IPollDialog';
import type { PollWidget } from '@/com/sulake/habbo/ui/widget/poll/PollWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { RoomWidgetPollMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPollMessage';

export class PollOfferDialog implements IPollDialog {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.poll::PollOfferDialog'); }

    public static readonly OK: string = "POLL_OFFER_STATE_OK";
    public static readonly CANCEL: string = "POLL_OFFER_STATE_CANCEL";
    public static readonly UNKNOWN: string = "POLL_OFFER_STATE_UNKNOWN";

    constructor(param1: number, param2: string, param3: string, param4: PollWidget) {
        let _loc9_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc7_: IWindow = null;
        let _loc6_: IWindow = null;
        let _loc8_: IItemListWindow = null;
        let _loc12_: ITextWindow = null;
        let _loc10_: ITextWindow = null;
        this._id = param1;
        this._widget = param4;
        let _loc11_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("poll_offer"), XmlAsset);
        if (_loc11_ != null) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc11_.content, XML)), isIFrameWindow);
            if (this._window) {
                this._window.center();
                _loc9_ = this._window.findChildByName("poll_offer_button_ok");
                if (_loc9_ != null) {
                    _loc9_.addEventListener("WME_CLICK", this.onOk);
                }
                _loc5_ = this._window.findChildByName("poll_offer_button_cancel");
                if (_loc5_ != null) {
                    _loc5_.addEventListener("WME_CLICK", this.onCancel);
                }
                _loc7_ = this._window.findChildByName("poll_offer_button_later");
                if (_loc7_ != null) {
                    _loc7_.addEventListener("WME_CLICK", this.onLater);
                }
                _loc6_ = this._window.findChildByName("header_button_close");
                if (_loc6_ != null) {
                    _loc6_.addEventListener("WME_CLICK", this.onClose);
                }
                _loc12_ = asGuarded(this._window.findChildByName("poll_offer_headline"), isITextWindow);
                if (_loc12_) {
                    _loc12_.htmlText = param2;
                    _loc8_ = asGuarded(this._window.findChildByName("poll_offer_headline_wrapper"), isIItemListWindow);
                    if (_loc8_) {
                        this._window.height += _loc8_.scrollableRegion.height - _loc8_.visibleRegion.height;
                    }
                }
                _loc10_ = asGuarded(this._window.findChildByName("poll_offer_summary"), isITextWindow);
                if (_loc10_) {
                    _loc10_.htmlText = param3;
                    _loc8_ = asGuarded(this._window.findChildByName("poll_offer_summary_wrapper"), isIItemListWindow);
                    if (_loc8_) {
                        this._window.height += _loc8_.scrollableRegion.height - _loc8_.visibleRegion.height;
                    }
                }
            }
        }
    }

    declare private _window: IFrameWindow;

    private _state: string = "POLL_OFFER_STATE_UNKNOWN";

    declare private _widget: PollWidget;

    private _id: number = -1;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get state(): string {
        return this._state;
    }

    public start(): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._widget = null;
    }

    private onOk = (param1: WindowEvent): void => {
        if (this._state != "POLL_OFFER_STATE_UNKNOWN") {
            return;
        }
        this._state = "POLL_OFFER_STATE_OK";
        this._widget.messageListener.processWidgetMessage(new RoomWidgetPollMessage("RWPM_START", this._id));
    };

    private onCancel = (param1: WindowEvent): void => {
        if (this._state != "POLL_OFFER_STATE_UNKNOWN") {
            return;
        }
        this._state = "POLL_OFFER_STATE_CANCEL";
        this._widget.messageListener.processWidgetMessage(new RoomWidgetPollMessage("RWPM_REJECT", this._id));
        this._widget.pollCancelled(this._id);
    };

    private onLater = (param1: WindowEvent): void => {
        if (this._state != "POLL_OFFER_STATE_UNKNOWN") {
            return;
        }
        this._state = "POLL_OFFER_STATE_CANCEL";
        this._widget.pollCancelled(this._id);
    };

    private onClose = (param1: WindowEvent): void => {
        if (this._state != "POLL_OFFER_STATE_UNKNOWN") {
            return;
        }
        this._state = "POLL_OFFER_STATE_CANCEL";
        this._widget.messageListener.processWidgetMessage(new RoomWidgetPollMessage("RWPM_REJECT", this._id));
        this._widget.pollCancelled(this._id);
    };

    get [IDisposable](): true {
        return true;
    }
}
