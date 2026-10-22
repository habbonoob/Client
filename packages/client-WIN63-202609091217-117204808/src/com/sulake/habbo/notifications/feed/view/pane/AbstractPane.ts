import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPane } from '@/com/sulake/habbo/notifications/feed/view/pane/IPane';

export class AbstractPane implements IPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::AbstractPane'); }

    public static readonly PANE_VIEW_LEVEL_BASE: number = 0;
    public static readonly PANE_VIEW_LEVEL_FEED: number = 1;
    public static readonly PANE_VIEW_LEVEL_MODAL: number = 2;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare protected _SafeStr_3209: boolean;
    static { (this.prototype as any)._SafeStr_3209 = false; }

    declare private _paneLevel: number;
    static { (this.prototype as any)._paneLevel = 0; }

    declare protected _window: IWindowContainer;

    declare protected _SafeStr_2276: NotificationView;

    declare protected _name: string;

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer, param4: number) {
        if (param3 == null) {
            throw new Exception("Window was null for feed pane: " + param1);
        }
        this._name = param1;
        this._SafeStr_2276 = param2;
        this._paneLevel = param4;
        this._window = param3;
    }

    public dispose(): void {
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get name(): string {
        return this._name;
    }

    public get paneLevel(): number {
        return this._paneLevel;
    }

    public set isVisible(param1: boolean) {
        this._SafeStr_3209 = param1;
        this._window.visible = this._SafeStr_3209;
    }

    public get isVisible(): boolean {
        return this._SafeStr_3209;
    }

    get [IPane](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
