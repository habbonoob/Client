import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { DoorbellWidget } from '@/com/sulake/habbo/ui/widget/doorbell/DoorbellWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class DoorbellView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.doorbell::DoorbellView'); }

    declare private _doorbell: DoorbellWidget;

    declare private _frame: IFrameWindow;

    declare private _SafeStr_2221: IItemListWindow;

    constructor(param1: DoorbellWidget) {
        this._doorbell = param1;
    }

    public dispose(): void {
        this._SafeStr_2221 = null;
        this._doorbell = null;
        if (this._frame) {
            this._frame.dispose();
            this._frame = null;
        }
    }

    public update(): void {
        let _loc1_: number = 0;
        if (this._doorbell.users.length == 0) {
            this.hide();
            return;
        }
        if (this._frame == null) {
            this.createMainWindow();
        }
        this._frame.visible = true;
        if (this._SafeStr_2221 != null) {
            this._SafeStr_2221.destroyListItems();
            _loc1_ = 0;
            while (_loc1_ < this._doorbell.users.length) {
                this._SafeStr_2221.addListItem(this.createListItem(asGuarded(this._doorbell.users[_loc1_], isString), _loc1_));
                _loc1_++;
            }
        }
    }

    public get mainWindow(): IWindow {
        return this._frame;
    }

    private createListItem(param1: string, param2: number): IWindow {
        let _loc5_: IWindow = null;
        let _loc4_: XmlAsset = asInstanceOf(this._doorbell.assets.getAssetByName("doorbell_list_entry"), XmlAsset);
        let _loc3_: IWindowContainer = asGuarded(this._doorbell.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIWindowContainer);
        if (_loc3_ == null) {
            throw new Error("Failed to construct window from XML!");
        }
        let _loc6_: ITextWindow = asGuarded(_loc3_.findChildByName("user_name"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = param1;
        }
        _loc3_.name = param1;
        if (param2 % 2 == 0) {
            _loc3_.color = 4294967295;
        }
        _loc5_ = _loc3_.findChildByName("accept");
        if (_loc5_ != null) {
            _loc5_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        _loc5_ = _loc3_.findChildByName("deny");
        if (_loc5_ != null) {
            _loc5_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        return _loc3_;
    }

    private hide(): void {
        if (this._frame) {
            this._frame.dispose();
            this._frame = null;
        }
    }

    private createMainWindow(): void {
        if (this._frame != null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._doorbell.assets.getAssetByName("doorbell"), XmlAsset);
        this._frame = asGuarded(this._doorbell.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIFrameWindow);
        if (this._frame == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._SafeStr_2221 = asGuarded(this._frame.findChildByName("user_list"), isIItemListWindow);
        this._frame.visible = false;
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onClose);
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this._doorbell.denyAll();
    };

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: string = param1.window.parent.name;
        switch (param1.window.name) {
            case "accept":
                this._doorbell.accept(_loc2_);
                break;
            case "deny":
                this._doorbell.deny(_loc2_);
        }
    };
}
