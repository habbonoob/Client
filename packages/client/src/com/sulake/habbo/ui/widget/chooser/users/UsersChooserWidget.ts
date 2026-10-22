import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetChooserContentEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChooserContentEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { UserChooserWidgetHandler } from '@/com/sulake/habbo/ui/handler/UserChooserWidgetHandler';
import { ChooserWidgetBase } from '@/com/sulake/habbo/ui/widget/chooser/ChooserWidgetBase';
import { UsersView } from '@/com/sulake/habbo/ui/widget/chooser/users/UsersChooserTableObject.group';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';

export class UsersChooserWidget extends ChooserWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.users::UsersChooserWidget'); }

    private readonly STATE_USER_CHOOSER_CLOSED: number = 0;
    private readonly STATE_USER_CHOOSER_OPEN: number = 1;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    declare private _SafeStr_2851: UsersView;

    public override get state(): number {
        if (this._SafeStr_2851 != null && this._SafeStr_2851.isOpen()) {
            return 1;
        }
        return 0;
    }

    declare private _items: any[];

    public get items(): any[] {
        return this._items;
    }

    public override dispose(): void {
        if (this._SafeStr_2851 != null) {
            this._SafeStr_2851.dispose();
            this._SafeStr_2851 = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWCCE_USER_CHOOSER_CONTENT", this.onChooserContent);
        param1.addEventListener("RWROUE_USER_REMOVED", this.onUpdateUserChooser);
        param1.addEventListener("RWROUE_USER_ADDED", this.onUpdateUserChooser);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWCCE_USER_CHOOSER_CONTENT", this.onChooserContent);
        param1.removeEventListener("RWROUE_USER_REMOVED", this.onUpdateUserChooser);
        param1.removeEventListener("RWROUE_USER_ADDED", this.onUpdateUserChooser);
    }

    public override initialize(param1: number = 0): void {
        let _loc2_: RoomWidgetRequestWidgetMessage = null;
        super.initialize(param1);
        if (castTo(this._SafeStr_2143, UserChooserWidgetHandler).isChooserDisabled()) {
            return;
        }
        if (param1 == 1) {
            _loc2_ = new RoomWidgetRequestWidgetMessage("RWRWM_USER_CHOOSER");
            this.messageListener.processWidgetMessage(_loc2_);
        }
    }

    private onChooserContent = (param1: RoomWidgetChooserContentEvent): void => {
        if (param1 == null || param1.items == null) {
            return;
        }
        if (this._SafeStr_2851 == null) {
            this._SafeStr_2851 = new UsersView(this, "${widget.chooser.user.title}");
        }
        this._items = [];
        for (const _loc2_ of param1.items ?? []) {
            this._items.push(_loc2_);
        }
        this._items.sort((a, b) => (String(a.lowerCaseName) < String(b.lowerCaseName) ? -1 : String(a.lowerCaseName) > String(b.lowerCaseName) ? 1 : 0) || a.id - b.id);
        this._SafeStr_2851.onItemsChanged();
    };

    private onUpdateUserChooser = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        let delayedAction: Timer;
        let event: RoomWidgetRoomObjectUpdateEvent = param1;
        if (this._SafeStr_2851 == null || !this._SafeStr_2851.isOpen()) {
            return;
        }
        delayedAction = new Timer(100, 1);
        delayedAction.addEventListener("timer", (param1: TimerEvent): void => {
                if (this.disposed) {
                    return;
                }
                this.messageListener.processWidgetMessage(new RoomWidgetRequestWidgetMessage("RWRWM_USER_CHOOSER"));
            });
        delayedAction.start();
    };
}
