import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { UserInfoCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';

export class UserInfoFrameCtrl implements IDisposable, ITrackedWindow {
    static { registerClassName(this, 'com.sulake.habbo.moderation::UserInfoFrameCtrl'); }

    constructor(param1: ModerationManager, param2: number, param3: IssueMessageData = null) {
        this._main = param1;
        this._userId = param2;
        this._SafeStr_4861 = param3;
    }

    declare private _main: ModerationManager;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _frame: IFrameWindow;

    declare private _SafeStr_3907: UserInfoCtrl;

    declare private _SafeStr_4861: IssueMessageData;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this._frame = castGuarded(this._main.getXmlWindow("user_info_frame"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._frame.caption = "User Info";
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        _loc1_.procedure = this.onClose;
        this._SafeStr_3907 = new UserInfoCtrl(this._frame, this._main, this._SafeStr_4861, null, true);
        this._SafeStr_3907.load(this._frame.content, this._userId);
        this._frame.visible = true;
    }

    public getType(): number {
        return 1;
    }

    public getId(): string {
        return "" + this._userId;
    }

    public getFrame(): IFrameWindow {
        return this._frame;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        if (this._SafeStr_3907 != null) {
            this._SafeStr_3907.dispose();
            this._SafeStr_3907 = null;
        }
        this._SafeStr_4861 = null;
        this._main = null;
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.dispose();
    };

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}
