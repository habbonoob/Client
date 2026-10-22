import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { FurnitureContextInfoView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextInfoView';
import { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget.group';

export class FriendFurniContextMenuView extends FurnitureContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.friendfurni::FriendFurniContextMenuView'); }

    constructor(param1: IContextMenuParentWidget) {
        super(param1);
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        let _loc2_: IWindow = null;
        if (this._widget == null || this._widget.assets == null || this._widget.windowManager == null) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (this._window == null || Boolean(this._window.disposed)) {
                _loc1_ = asInstanceOf(this._widget.assets.getAssetByName("friendfurni_menu").content, XML);
                this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
                if (this._window == null) {
                    return;
                }
                this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
                this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
                _loc2_ = this._window.findChildByName("minimize");
                if (_loc2_ != null) {
                    _loc2_.addEventListener("WME_CLICK", this.onMinimize);
                    _loc2_.addEventListener("WME_OVER", this.onMinimizeHover);
                    _loc2_.addEventListener("WME_OUT", this.onMinimizeHover);
                }
            }
            this._window.findChildByName("buttons").procedure = this.buttonEventProc;
            this._window.visible = false;
            this.activeView = this._window;
            this._SafeStr_2283 = false;
        }
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: FurnitureContextMenuWidget = null;
        if (this.disposed || this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                let _loc5_: any = param2.parent.name;
                if ("use" === _loc5_) {
                    _loc4_ = this._widget instanceof FurnitureContextMenuWidget ? this._widget : null;
                    if (_loc4_ != null) {
                        _loc4_.handler.container.connection.send(new UseFurnitureMessageComposer(this._object.getId()));
                    }
                }
            }
            _loc3_ = true;
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this._widget.removeView(this, false);
        }
    }
}
