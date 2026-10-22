import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { FurnitureContextInfoView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextInfoView';
import { RoomWidgetFurniActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniActionMessage';

export class RandomTeleportContextMenuView extends FurnitureContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.contextmenu::RandomTeleportContextMenuView'); }

    declare private _objectCategory: number;
    static { (this.prototype as any)._objectCategory = 0; }

    constructor(param1: IContextMenuParentWidget) {
        super(param1);
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("random_teleport_menu"), XmlAsset).content, XML);
                this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
                if (!this._window) {
                    return;
                }
                this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
                this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
                this._window.findChildByName("minimize").addEventListener("WME_CLICK", this.onMinimize);
                this._window.findChildByName("minimize").addEventListener("WME_OVER", this.onMinimizeHover);
                this._window.findChildByName("minimize").addEventListener("WME_OUT", this.onMinimizeHover);
            }
            this._window.findChildByName("furni_name").caption = "${furni.random_teleport.name}";
            this._window.findChildByName("buttons").procedure = this.buttonEventProc;
            this._window.visible = false;
            this.activeView = this._window;
            this._SafeStr_2283 = false;
        }
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        if (this.disposed || !this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                let _loc4_: string = param2.parent.name;
                if ("use" === _loc4_) {
                    this._widget.messageListener.processWidgetMessage(new RoomWidgetFurniActionMessage("RWFAM_USE", this._object.getId(), this._objectCategory));
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

    public set objectCategory(param1: number) {
        this._objectCategory = param1;
    }
}
