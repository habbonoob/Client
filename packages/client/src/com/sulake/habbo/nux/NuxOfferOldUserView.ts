import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboNuxDialogs } from '@/com/sulake/habbo/nux/HabboNuxDialogs';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';

export class NuxOfferOldUserView {
    static { registerClassName(this, 'com.sulake.habbo.nux::NuxOfferOldUserView'); }

    constructor(param1: HabboNuxDialogs) {
        this._component = param1;
        this.show();
    }

    declare private _frame: IFrameWindow;

    declare private _component: HabboNuxDialogs;

    public dispose(): void {
        if (this._frame) {
            this._frame.dispose();
            this._frame = null;
        }
        this._component = null;
    }

    private hide(): void {
        if (this._component) {
            this._component.destroyNuxOfferView();
        }
    }

    private show(): void {
        if (this._frame != null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._component.assets.getAssetByName("nux_offer_old_user_xml"), XmlAsset);
        this._frame = asGuarded(this._component.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIFrameWindow);
        if (this._frame == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._frame.center();
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        if (_loc1_) {
            _loc1_.visible = false;
        }
        _loc1_ = this._frame.findChildByName("btnSkip");
        _loc1_.addEventListener("WME_CLICK", this.onReject);
        _loc1_ = this._frame.findChildByName("btnGo");
        _loc1_.addEventListener("WME_CLICK", this.onVerify);
    }

    private onClose(param1: WindowMouseEvent): void {
        this.hide();
    }

    private onVerify = (param1: WindowMouseEvent): void => {
        this._component.onVerify();
        this.hide();
    };

    private onReject = (param1: WindowMouseEvent): void => {
        this._component.onReject();
    };
}
