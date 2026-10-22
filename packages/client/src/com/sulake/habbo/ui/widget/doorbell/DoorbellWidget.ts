import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetDoorbellEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDoorbellEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { DoorbellView } from '@/com/sulake/habbo/ui/widget/doorbell/DoorbellView';
import { RoomWidgetLetUserInMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetLetUserInMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class DoorbellWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.doorbell::DoorbellWidget'); }

    private static readonly MAX_USERS_ON_DOORBELL_LIST: number = 50;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this._view = new DoorbellView(this);
        this._users = [];
    }

    declare private _view: DoorbellView;

    public override get mainWindow(): IWindow {
        return this._view.mainWindow;
    }

    declare private _users: any[];

    public get users(): any[] {
        return this._users;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._users = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWDE_RINGING", this.onDoorbellRinging);
        param1.addEventListener("RWDE_REJECTED", this.onDoorbellHandled);
        param1.addEventListener("RWDE_ACCEPTED", this.onDoorbellHandled);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWDE_RINGING", this.onDoorbellRinging);
        param1.removeEventListener("RWDE_REJECTED", this.onDoorbellHandled);
        param1.removeEventListener("RWDE_ACCEPTED", this.onDoorbellHandled);
    }

    public addUser(param1: string): void {
        if (this._users.indexOf(param1) != -1) {
            return;
        }
        if (this._users.length >= 50) {
            this.deny(param1);
            return;
        }
        this._users.push(param1);
        this._view.update();
    }

    public removeUser(param1: string): void {
        let _loc2_: number = this._users.indexOf(param1);
        if (_loc2_ == -1) {
            return;
        }
        this._users.splice(_loc2_, 1);
        this._view.update();
    }

    public accept(param1: string): void {
        let _loc2_: RoomWidgetLetUserInMessage = new RoomWidgetLetUserInMessage(param1, true);
        this.messageListener.processWidgetMessage(_loc2_);
        this.removeUser(param1);
    }

    public deny(param1: string): void {
        let _loc2_: RoomWidgetLetUserInMessage = new RoomWidgetLetUserInMessage(param1, false);
        this.messageListener.processWidgetMessage(_loc2_);
        this.removeUser(param1);
    }

    public denyAll(): void {
        while (this._users.length > 0) {
            this.deny(stringOrNull(this._users[0]));
        }
    }

    private onDoorbellRinging = (param1: RoomWidgetDoorbellEvent): void => {
        this.addUser(param1.userName);
    };

    private onDoorbellHandled = (param1: RoomWidgetDoorbellEvent): void => {
        this.removeUser(param1.userName);
    };
}
