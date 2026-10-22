import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendRequestData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class FriendRequest implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendRequest'); }

    public static readonly STATE_OPEN: number = 1;
    public static readonly STATE_ACCEPTED: number = 2;
    public static readonly STATE_DECLINED: number = 3;
    public static readonly STATE_FAILED: number = 4;

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _requesterName: string;

    declare private _SafeStr_6109: number;
    static { (this.prototype as any)._SafeStr_6109 = 0; }

    private _state: number = 1;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _view: IWindowContainer;

    constructor(param1: FriendRequestData) {
        this._requestId = param1.requestId;
        this._requesterName = param1.requesterName;
        this._SafeStr_6109 = param1.requesterUserId;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this.view != null) {
            this.view.destroy();
            this.view = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get requesterName(): string {
        return this._requesterName;
    }

    public get requesterUserId(): number {
        return this._SafeStr_6109;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public get state(): number {
        return this._state;
    }

    public set view(param1: IWindowContainer) {
        this._view = param1;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
