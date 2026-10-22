import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class MadMoneyCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::MadMoneyCatalogWidget'); }

    declare private _SafeStr_4124: IButtonWindow;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_4124 != null) {
            this._SafeStr_4124.removeEventListener("WME_CLICK", this.eventProc);
            this._SafeStr_4124 = null;
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_4124 = asGuarded(this._window.findChildByName("ctlg_madmoney_button"), isIButtonWindow);
        if (this._SafeStr_4124 != null) {
        }
        return true;
    }

    private eventProc = (param1: WindowMouseEvent): void => {
        let event: WindowMouseEvent = param1;
        this.page.viewer.catalog.windowManager.alert("TODO", "Fix in MadMoneyCatalogWidget.as", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         });
    };
}
