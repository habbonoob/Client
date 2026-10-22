import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class RedeemItemCodeCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RedeemItemCodeCatalogWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    declare private _SafeStr_3581: IButtonWindow;

    declare private _SafeStr_3566: ITextFieldWindow;

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_3581 != null) {
            this._SafeStr_3581.removeEventListener("WME_CLICK", this.onRedeem);
            this._SafeStr_3581 = null;
        }
        if (this._SafeStr_3566 != null) {
            this._SafeStr_3566.removeEventListener("WKE_KEY_DOWN", this.windowKeyEventProcessor);
            this._SafeStr_3566 = null;
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_3581 = asGuarded(this._window.findChildByName("redeem"), isIButtonWindow);
        if (this._SafeStr_3581 != null) {
            this._SafeStr_3581.addEventListener("WME_CLICK", this.onRedeem);
        }
        this._SafeStr_3566 = asGuarded(this._window.findChildByName("voucher_code"), isITextFieldWindow);
        if (this._SafeStr_3566 != null) {
            this._SafeStr_3566.addEventListener("WKE_KEY_DOWN", this.windowKeyEventProcessor);
        }
        return true;
    }

    private onRedeem = (param1: WindowMouseEvent): void => {
        this.redeem();
    };

    private windowKeyEventProcessor = (param1: WindowEvent = null, param2: IWindow = null): void => {
        let _loc3_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc3_.charCode == 13) {
            this.redeem();
        }
    };

    private redeem(): void {
        let voucher: string;
        let input: IWindow = this._window.findChildByName("voucher_code");
        if (input != null) {
            voucher = input.caption;
            if (voucher.length > 0) {
                this.page.viewer.catalog.redeemVoucher(voucher);
                input.caption = "";
            } else {
                this.page.viewer.catalog.windowManager.alert("${catalog.voucher.empty.title}", "${catalog.voucher.empty.desc}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                        param1.dispose();
                    });
            }
        }
    }
}
