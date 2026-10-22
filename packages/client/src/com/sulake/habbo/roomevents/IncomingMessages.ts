import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { ObjectRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveMessageParser';
import type { OpenMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/OpenMessageParser';
import type { WiredFurniActionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniActionMessageParser';
import type { WiredFurniAddonMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniAddonMessageParser';
import type { WiredFurniConditionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniConditionMessageParser';
import type { WiredFurniSelectorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniSelectorMessageParser';
import type { WiredFurniTriggerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniTriggerMessageParser';
import type { WiredFurniVariableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniVariableMessageParser';
import type { WiredRewardResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredRewardResultMessageParser';
import type { WiredValidationErrorParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredValidationErrorParser';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { ObjectRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { OpenEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/OpenEvent';
import { WiredFurniActionEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniActionEvent';
import { WiredFurniAddonEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniAddonEvent';
import { WiredFurniConditionEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniConditionEvent';
import { WiredFurniSelectorEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniSelectorEvent';
import { WiredFurniTriggerEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniTriggerEvent';
import { WiredFurniVariableEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniVariableEvent';
import { WiredRewardResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredRewardResultMessageEvent';
import { WiredSaveSuccessEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredSaveSuccessEvent';
import { WiredValidationErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredValidationErrorEvent';
import { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import { OpenMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/OpenMessageComposer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class IncomingMessages implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::IncomingMessages'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        IncomingMessages.#initStatics();
        return IncomingMessages._log;
    }

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        let _loc2_: IHabboCommunicationManager = this._roomEvents.communication;
        this.addMessageEvent(new WiredFurniTriggerEvent(this.onTrigger));
        this.addMessageEvent(new WiredFurniAddonEvent(this.onAddon));
        this.addMessageEvent(new OpenEvent(this.onOpen));
        this.addMessageEvent(new WiredFurniConditionEvent(this.onCondition));
        this.addMessageEvent(new WiredSaveSuccessEvent(this.onSaveSuccess));
        this.addMessageEvent(new GuildMembershipsMessageEvent(this.onGuildMemberships));
        this.addMessageEvent(new WiredFurniSelectorEvent(this.onSelector));
        this.addMessageEvent(new UserObjectEvent(this.onUserObject));
        this.addMessageEvent(new WiredFurniVariableEvent(this.onVariable));
        this.addMessageEvent(new WiredRewardResultMessageEvent(this.onRewardFailed));
        this.addMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit));
        this.addMessageEvent(new WiredValidationErrorEvent(this.onValidationError));
        this.addMessageEvent(new WiredFurniActionEvent(this.onAction));
        this.addMessageEvent(new ObjectRemoveMessageEvent(this.onObjectRemove));
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _messageEvents: IMessageEvent[];

    public get disposed(): boolean {
        return this._roomEvents == null;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        let _loc2_: IHabboCommunicationManager = this._roomEvents.communication;
        if (this._messageEvents != null && _loc2_ != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                _loc2_.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        this._roomEvents = null;
    }

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._roomEvents.communication.addHabboConnectionMessageEvent(param1));
    }

    private onOpen = (param1: IMessageEvent): void => {
        let _loc2_: OpenMessageParser = (param1 instanceof OpenEvent ? param1 : null).getParser();
        this._roomEvents.send(new OpenMessageComposer(_loc2_.stuffId));
    };

    private onTrigger = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniTriggerMessageParser = (param1 instanceof WiredFurniTriggerEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onAction = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniActionMessageParser = (param1 instanceof WiredFurniActionEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onCondition = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniConditionMessageParser = (param1 instanceof WiredFurniConditionEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onAddon = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniAddonMessageParser = (param1 instanceof WiredFurniAddonEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onVariable = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniVariableMessageParser = (param1 instanceof WiredFurniVariableEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onSelector = (param1: IMessageEvent): void => {
        let _loc2_: WiredFurniSelectorMessageParser = (param1 instanceof WiredFurniSelectorEvent ? param1 : null).getParser();
        this._roomEvents.wiredCtrl.prepareForUpdate(_loc2_.def);
    };

    private onUserObject = (param1: IMessageEvent): void => {
        let _loc2_: UserObjectMessageParser = (param1 instanceof UserObjectEvent ? param1 : null).getParser();
        this._roomEvents.userName = _loc2_.name;
    };

    private onRoomExit = (param1: IMessageEvent): void => {
        this._roomEvents.wiredCtrl.close();
    };

    private onObjectRemove = (param1: IMessageEvent): void => {
        let _loc2_: ObjectRemoveMessageParser = (param1 instanceof ObjectRemoveMessageEvent ? param1 : null).getParser();
        IncomingMessages._log.info("Received object remove event: " + _loc2_.id + ", " + _loc2_.isExpired);
        this._roomEvents.wiredCtrl.stuffRemoved(_loc2_.id);
    };

    private onRewardFailed = (param1: IMessageEvent): void => {
        let _loc2_: WiredRewardResultMessageParser = castTo(param1, WiredRewardResultMessageEvent).getParser();
        if (_loc2_.reason == 6) {
            this._roomEvents.windowManager.alert(this._roomEvents.localization.getLocalization("wiredfurni.rewardsuccess.title"), this._roomEvents.localization.getLocalization("wiredfurni.rewardsuccess.body"), 0, null);
        } else if (_loc2_.reason == 7) {
            this._roomEvents.windowManager.alert(this._roomEvents.localization.getLocalization("wiredfurni.badgereceived.title"), this._roomEvents.localization.getLocalization("wiredfurni.badgereceived.body"), 0, null);
        } else {
            this._roomEvents.windowManager.alert(this._roomEvents.localization.getLocalization("wiredfurni.rewardfailed.title"), this._roomEvents.localization.getLocalization("wiredfurni.rewardfailed.reason." + _loc2_.reason), 0, null);
        }
    };

    private onValidationError = (param1: IMessageEvent): void => {
        let _loc3_: WiredValidationErrorParser = castTo(param1, WiredValidationErrorEvent).getParser();
        let _loc6_: UtilsMap = new UtilsMap();
        for (const _loc5_ of _loc3_.parameters ?? []) {
            _loc6_.add(_loc5_.key, _loc5_.value);
        }
        let _loc2_: string = this._roomEvents.localization.getLocalizationWithParamMap(_loc3_.localizationKey, _loc3_.localizationKey, _loc6_);
        let _loc4_: string = this._roomEvents.localization.getLocalization("wiredfurni.error.title", "Update failed");
        this._roomEvents.windowManager.alert(_loc4_, _loc2_, 0, null);
        this._roomEvents.wiredCtrl.onSaveFailure();
    };

    private onSaveSuccess = (param1: IMessageEvent): void => {
        this._roomEvents.wiredCtrl.onSaveSuccess();
    };

    private onGuildMemberships = (param1: GuildMembershipsMessageEvent): void => {
        this._roomEvents.wiredCtrl.onGuildMemberships(param1);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IncomingMessages.#staticsReady) return;
        IncomingMessages.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IncomingMessages, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.roomevents.IncomingMessages"));
    }

    get [IDisposable](): true {
        return true;
    }
}
