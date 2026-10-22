import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';

export class GroupCreatedWindowCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::GroupCreatedWindowCtrl'); }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
    }

    declare private _manager: HabboGroupsManager;

    declare private _window: IFrameWindow;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get disposed(): boolean {
        return this._manager == null;
    }

    public dispose(): void {
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public show(param1: number): void {
        this._groupId = param1;
        this.prepareWindow();
        this._window.visible = true;
        this._window.activate();
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("group_created_window"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onClose;
        this._window.findChildByName("ok_button").procedure = this.onClose;
        this._window.center();
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
            this._manager.send(new GetHabboGroupDetailsMessageComposer(this._groupId, false));
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
