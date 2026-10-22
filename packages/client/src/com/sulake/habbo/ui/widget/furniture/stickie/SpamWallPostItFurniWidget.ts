import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetSpamWallPostItEditEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSpamWallPostItEditEvent';
import type { RoomWidgetStickieDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetStickieDataUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { StickieFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/stickie/StickieFurniWidget';
import { RoomWidgetSpamWallPostItFinishEditingMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetSpamWallPostItFinishEditingMessage';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class SpamWallPostItFurniWidget extends StickieFurniWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.stickie::SpamWallPostItFurniWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        SpamWallPostItFurniWidget.#initStatics();
        return SpamWallPostItFurniWidget._log;
    }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._windowName = "spamwall_postit_container";
    }

    private _location: string = "";

    public override dispose(): void {
        this._objectId = -1;
        this._location = "";
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        param1.addEventListener("RWSWPUE_OPEN_EDITOR", this.onEditPostItRequest);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWSWPUE_OPEN_EDITOR", this.onEditPostItRequest);
    }

    protected override sendUpdate(): void {
        let _loc1_: RoomWidgetSpamWallPostItFinishEditingMessage = null;
        if (this._objectId != -1) {
            this.storeTextFromField();
            SpamWallPostItFurniWidget._log.info("Spamwall Post-It Widget Send Update");
            if (this.messageListener != null) {
                _loc1_ = new RoomWidgetSpamWallPostItFinishEditingMessage("RWSWPFEE_SEND_POSTIT_DATA", this._objectId, this._location, this._text, this._colorHex);
                this.messageListener.processWidgetMessage(_loc1_);
            }
            this.hideInterface(false);
        }
    }

    protected override sendSetColor(param1: number): void {
        this.storeTextFromField();
        let _loc2_: string = param1.toString(16).toUpperCase();
        if (_loc2_.length > 6) {
            _loc2_ = _loc2_.slice(_loc2_.length - 6, _loc2_.length);
        }
        if (_loc2_ == this._colorHex) {
            return;
        }
        this._colorHex = _loc2_;
        this.showInterface();
    }

    protected override sendDelete(): void {
        this.hideInterface(false);
    }

    protected override onObjectUpdate(param1: RoomWidgetStickieDataUpdateEvent): void {
    }

    private onEditPostItRequest = (param1: RoomWidgetSpamWallPostItEditEvent): void => {
        this.hideInterface(false);
        this._objectId = param1.objectId;
        this._location = param1.location;
        this._objectType = param1.objectType;
        this._text = "";
        this._colorHex = "FFFF33";
        this._controller = true;
        this.showInterface();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SpamWallPostItFurniWidget.#staticsReady) return;
        SpamWallPostItFurniWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SpamWallPostItFurniWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.furniture.stickie.SpamWallPostItFurniWidget"));
    }
}
