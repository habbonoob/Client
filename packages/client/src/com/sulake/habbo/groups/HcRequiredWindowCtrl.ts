import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';

export class HcRequiredWindowCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::HcRequiredWindowCtrl'); }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
    }

    declare private _manager: HabboGroupsManager;

    declare private _window: IFrameWindow;

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

    public show(param1: boolean): void {
        this.prepareWindow();
        this._window.findChildByName("info_txt").caption = param1 ? "${group.hcrequired.info.manage}" : "${group.hcrequired.info.join}";
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
        this._window = castGuarded(this._manager.getXmlWindow("club_required"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onClose;
        this._window.findChildByName("cancel_link_region").procedure = this.onClose;
        this._window.findChildByName("join_button").procedure = this.onOpenCatalog;
        this._window.findChildByName("more_info_link_region").procedure = this.onOpenCatalog;
        this._window.center();
    }

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
        }
    };

    private onOpenCatalog = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._manager.openVipPurchase("HcRequiredWindowCtrl");
            this.close();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
