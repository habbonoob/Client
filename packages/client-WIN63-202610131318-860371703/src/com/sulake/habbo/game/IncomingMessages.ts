import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HabboGameManager } from '@/com/sulake/habbo/game/HabboGameManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { InfoHotelClosedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/InfoHotelClosedMessageEvent';
import { InfoHotelClosingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/InfoHotelClosingMessageEvent';
import { MaintenanceStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/MaintenanceStatusMessageEvent';

export class IncomingMessages implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game::IncomingMessages'); }

    declare private _gameManager: HabboGameManager;

    private _disposed: boolean = false;

    constructor(param1: HabboGameManager) {
        this._gameManager = param1;
        let _loc2_: IHabboCommunicationManager = this._gameManager.communication;
        _loc2_.addHabboConnectionMessageEvent(new InfoHotelClosingMessageEvent(this.onHotelClosed));
        _loc2_.addHabboConnectionMessageEvent(new InfoHotelClosedMessageEvent(this.onHotelClosed));
        _loc2_.addHabboConnectionMessageEvent(new MaintenanceStatusMessageEvent(this.onHotelClosed));
    }

    public dispose(): void {
        this._gameManager = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onHotelClosed = (param1: IMessageEvent): void => {
        this._gameManager.hotelClosed = true;
    };

    get [IDisposable](): true {
        return true;
    }
}
