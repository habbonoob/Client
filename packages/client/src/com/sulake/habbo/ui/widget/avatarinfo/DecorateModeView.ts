import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';

export class DecorateModeView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::DecorateModeView'); }

    constructor(param1: AvatarInfoWidget, param2: number, param3: string, param4: number) {
        super(param1);
        this._SafeStr_2318 = false;
        AvatarContextInfoButtonView.setup(this, param2, param3, param4, 1);
    }

    protected override set activeView(param1: IWindowContainer) {
        if (!param1) {
            return;
        }
        this._SafeStr_2220 = param1;
    }

    public override get maximumBlend(): number {
        return 0.8;
    }

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (!this._window) {
            _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("own_avatar_decorating"), XmlAsset).content, XML);
            this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
            if (!this._window) {
                return;
            }
            this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
            this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
            this._buttons = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
            this._buttons.procedure = this.eventProc;
            this.updateButtons();
        }
        this.activeView = this._window;
    }

    public override show(): void {
        if (this._SafeStr_2220 != null) {
            this._SafeStr_2220.visible = true;
            this._SafeStr_2220.activate();
        }
    }

    public override hide(param1: boolean): void {
        if (this._SafeStr_2220 != null) {
            this._SafeStr_2220.visible = false;
        }
        this._SafeStr_2283 = false;
    }

    public isVisible = (): boolean => {
        return !!(this._SafeStr_2220 && this._SafeStr_2220.visible);
    };

    public updateButtons(): void {
        this.showButton("decorate");
    }

    private eventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                let _loc3_: any = param2.parent.name;
                if ("decorate" === _loc3_) {
                    this.widget.isUserDecorating = false;
                }
            }
        } else if (param1.type == "WME_OVER") {
            super.buttonEventProc(param1, param2);
            this._SafeStr_2283 = true;
        } else if (param1.type == "WME_OUT") {
            super.buttonEventProc(param1, param2);
            this._SafeStr_2283 = false;
        } else {
            super.buttonEventProc(param1, param2);
        }
    };
}
