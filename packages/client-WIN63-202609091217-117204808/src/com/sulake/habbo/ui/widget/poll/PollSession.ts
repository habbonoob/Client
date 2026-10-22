import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IPollDialog } from '@/com/sulake/habbo/ui/widget/poll/IPollDialog';
import type { PollWidget } from '@/com/sulake/habbo/ui/widget/poll/PollWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PollContentDialog } from '@/com/sulake/habbo/ui/widget/poll/PollContentDialog';
import { PollOfferDialog } from '@/com/sulake/habbo/ui/widget/poll/PollOfferDialog';

export class PollSession implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.poll::PollSession'); }

    private _id: number = -1;

    declare private _SafeStr_4172: PollWidget;

    declare private _SafeStr_2958: IPollDialog;

    declare private _SafeStr_2957: IPollDialog;

    private _endMessage: string = "";
    private _disposed: boolean = false;

    constructor(param1: number, param2: PollWidget) {
        this._id = param1;
        this._SafeStr_4172 = param2;
    }

    public get id(): number {
        return this._id;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_2958 != null) {
            this._SafeStr_2958.dispose();
            this._SafeStr_2958 = null;
        }
        if (this._SafeStr_2957 != null) {
            this._SafeStr_2957.dispose();
            this._SafeStr_2957 = null;
        }
        this._SafeStr_4172 = null;
        this._disposed = true;
    }

    public showOffer(param1: string, param2: string): void {
        this.hideOffer();
        this._SafeStr_2958 = new PollOfferDialog(this._id, param1, param2, this._SafeStr_4172);
        this._SafeStr_2958.start();
    }

    public hideOffer(): void {
        if (this._SafeStr_2958 instanceof PollOfferDialog) {
            if (!this._SafeStr_2958.disposed) {
                this._SafeStr_2958.dispose();
            }
            this._SafeStr_2958 = null;
        }
    }

    public showContent(param1: string, param2: string, param3: any[], param4: boolean): void {
        this.hideOffer();
        this.hideContent();
        this._endMessage = param2;
        this._SafeStr_2957 = new PollContentDialog(this._id, param1, param3, this._SafeStr_4172, param4);
        this._SafeStr_2957.start();
    }

    public hideContent(): void {
        if (this._SafeStr_2957 instanceof PollContentDialog) {
            if (!this._SafeStr_2957.disposed) {
                this._SafeStr_2957.dispose();
            }
            this._SafeStr_2957 = null;
        }
    }

    public showThanks(): void {
        this._SafeStr_4172.windowManager.alert("${poll_thanks_title}", this._endMessage, 0, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         });
    }

    get [IDisposable](): true {
        return true;
    }
}
