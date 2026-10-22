import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetRoomQueueUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomQueueUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetRoomQueueMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomQueueMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class RoomQueueWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomqueue::RoomQueueWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration) {
        super(param1, param2, param3, param4);
        this._config = param5;
    }

    declare private _window: IFrameWindow;

    declare private _config: ICoreConfiguration;

    declare private _queuePosition: number;
    static { (this.prototype as any)._queuePosition = 0; }

    declare private _SafeStr_6895: boolean;
    static { (this.prototype as any)._SafeStr_6895 = false; }

    declare private _activeTarget: string;

    declare private _isClubQueue: boolean;
    static { (this.prototype as any)._isClubQueue = false; }

    public override dispose(): void {
        this.removeWindow();
        this._config = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWRQUE_VISITOR_QUEUE_STATUS", this.onQueueStatus);
        param1.addEventListener("RWRQUE_SPECTATOR_QUEUE_STATUS", this.onQueueStatus);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWRQUE_VISITOR_QUEUE_STATUS", this.onQueueStatus);
        param1.removeEventListener("RWRQUE_SPECTATOR_QUEUE_STATUS", this.onQueueStatus);
    }

    private removeWindow(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private createWindow(): boolean {
        if (this._window != null) {
            return true;
        }
        let _loc2_: XmlAsset = asInstanceOf(this.assets.getAssetByName("room_queue"), XmlAsset);
        this._window = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIFrameWindow);
        if (this._window == null) {
            return false;
        }
        this._window.visible = false;
        let _loc1_: IWindow = this._window.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.exitQueue);
        }
        _loc1_ = this._window.findChildByName("cancel_button");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.exitQueue);
        }
        _loc1_ = this._window.findChildByName("link_text");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.openLink);
        }
        _loc1_ = this._window.findChildByName("change_button");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.changeQueue);
        }
        return true;
    }

    private showInterface(): void {
        if (!this.createWindow()) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("info_text"), isITextWindow);
        if (_loc2_ != null) {
            switch (this._activeTarget) {
                case "RWRQUE_VISITOR_QUEUE_STATUS":
                    _loc2_.caption = this._isClubQueue ? "${room.queue.position.hc}" : "${room.queue.position}";
                    break;
                case "RWRQUE_SPECTATOR_QUEUE_STATUS":
                    _loc2_.caption = this._isClubQueue ? "${room.queue.spectator.position.hc}" : "${room.queue.spectator.position}";
            }
        }
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("club_container"), isIWindowContainer);
        if (_loc1_ != null) {
            _loc1_.visible = !this._SafeStr_6895;
        }
        this._window.visible = true;
    }

    private exitQueue = (param1: WindowMouseEvent): void => {
        if (this.messageListener == null) {
            return;
        }
        let _loc2_: RoomWidgetRoomQueueMessage = new RoomWidgetRoomQueueMessage("RWRQM_EXIT_QUEUE");
        this.messageListener.processWidgetMessage(_loc2_);
        this.removeWindow();
    };

    private openLink = (param1: WindowMouseEvent): void => {
        this.messageListener.processWidgetMessage(new RoomWidgetRoomQueueMessage("RWRQM_CLUB_LINK"));
    };

    private changeQueue = (param1: WindowMouseEvent): void => {
        let _loc2_: RoomWidgetRoomQueueMessage = null;
        if (this.messageListener == null) {
            return;
        }
        if (this._activeTarget == "RWRQUE_VISITOR_QUEUE_STATUS") {
            _loc2_ = new RoomWidgetRoomQueueMessage("RWRQM_CHANGE_TO_SPECTATOR_QUEUE");
        } else {
            _loc2_ = new RoomWidgetRoomQueueMessage("RWRQM_CHANGE_TO_VISITOR_QUEUE");
        }
        this.messageListener.processWidgetMessage(_loc2_);
        this.removeWindow();
    };

    private onQueueStatus = (param1: RoomWidgetRoomQueueUpdateEvent): void => {
        if (param1 == null) {
            return;
        }
        if (param1.isActive) {
            this._activeTarget = param1.type;
            this._queuePosition = param1.position;
        }
        this._SafeStr_6895 = param1.hasHabboClub;
        this._isClubQueue = param1.isClubQueue;
        this.localizations.registerParameter("room.queue.position", "position", this._queuePosition.toString());
        this.localizations.registerParameter("room.queue.position.hc", "position", this._queuePosition.toString());
        this.localizations.registerParameter("room.queue.spectator.position", "position", this._queuePosition.toString());
        this.localizations.registerParameter("room.queue.spectator.position.hc", "position", this._queuePosition.toString());
        this.showInterface();
    };
}
