import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';

export class NewUserHelpView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::NewUserHelpView'); }

    public static setup_NewUserHelpView(param1: AvatarContextInfoButtonView, param2: number, param3: string, param4: number, param5: number): void {
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._caption = param1.localization.getLocalization("room.enter.infostand.caption", "");
        this._SafeStr_5779 = param1.configuration.getInteger("room.enter.infostand.fade.start.delay", 5000);
    }

    private _caption: string = "";

    public get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        let _loc2_: IWindow = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (!this._window) {
            _loc1_ = asInstanceOf(this._widget.assets.getAssetByName("new_user_help").content, XML);
            this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
            if (!this._window) {
                return;
            }
            _loc2_ = this._window.findChildByName("help");
            _loc2_.caption = this._caption;
            this._window.invalidate();
        }
        this.activeView = this._window;
    }
}
