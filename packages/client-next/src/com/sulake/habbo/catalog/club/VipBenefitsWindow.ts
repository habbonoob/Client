import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class VipBenefitsWindow implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::VipBenefitsWindow'); }

    private _disposed: boolean = false;

    declare private _window: IWindowContainer;

    constructor(param1: HabboCatalog) {
        this._window = asGuarded(param1.utils.createWindow("vip_benefits"), isIWindowContainer);
        this._window.findChildByName("header_button_close").addEventListener("WME_CLICK", this.onClose);
        this._window.center();
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._window != null) {
                this._window.dispose();
                this._window = null;
            }
        }
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    get [IDisposable](): true {
        return true;
    }
}
