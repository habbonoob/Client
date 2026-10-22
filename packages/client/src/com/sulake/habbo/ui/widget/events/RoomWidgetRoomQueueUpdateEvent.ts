import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRoomQueueUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRoomQueueUpdateEvent'); }

    public static readonly VISITOR_QUEUE_STATUS: string = "RWRQUE_VISITOR_QUEUE_STATUS";
    public static readonly SPECTATOR_QUEUE_STATUS: string = "RWRQUE_SPECTATOR_QUEUE_STATUS";

    constructor(param1: string, param2: number, param3: boolean, param4: boolean, param5: boolean, param6: boolean = false, param7: boolean = false) {
        super(param1, param6, param7);
        this._position = param2;
        this._hasHabboClub = param3;
        this._isActive = param4;
        this._isClubQueue = param5;
    }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    declare private _hasHabboClub: boolean;
    static { (this.prototype as any)._hasHabboClub = false; }

    declare private _isActive: boolean;
    static { (this.prototype as any)._isActive = false; }

    declare private _isClubQueue: boolean;
    static { (this.prototype as any)._isClubQueue = false; }

    public get position(): number {
        return this._position;
    }

    public get hasHabboClub(): boolean {
        return this._hasHabboClub;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get isClubQueue(): boolean {
        return this._isClubQueue;
    }
}
