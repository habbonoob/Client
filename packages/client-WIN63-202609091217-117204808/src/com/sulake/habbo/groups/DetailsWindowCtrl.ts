import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GroupDetailsCtrl } from '@/com/sulake/habbo/groups/GroupDetailsCtrl';

export class DetailsWindowCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::DetailsWindowCtrl'); }

    declare private _manager: HabboGroupsManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_4100: GroupDetailsCtrl;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
        this._SafeStr_4100 = new GroupDetailsCtrl(param1, true);
    }

    public dispose(): void {
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_4100) {
            this._SafeStr_4100.dispose();
            this._SafeStr_4100 = null;
        }
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    public isDisplayingGroup(param1: number): boolean {
        return this._window != null && Boolean(this._window.visible) && param1 == this._groupId;
    }

    public onGroupDetails(param1: HabboGroupDetailsData): void {
        if (this._window != null && Boolean(this._window.visible) && param1.groupId == this._groupId || param1.openDetails) {
            this._groupId = param1.groupId;
            this.prepareWindow();
            this._SafeStr_4100.onGroupDetails(castGuarded(this._window.findChildByName("group_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), param1);
            if (param1.openDetails) {
                this._window.visible = true;
                this._window.activate();
            }
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("group_info_window"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onClose;
        this._window.center();
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.close();
    };

    public close(): void {
        if (this._window != null) {
            this._groupId = 0;
            this._window.visible = false;
        }
    }

    public onGroupDeactivated(param1: number): void {
        if (this._groupId == param1) {
            this.close();
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
