import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionQueueEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionQueueEvent'); }

    public static readonly QUEUE_STATUS: string = "RSQE_QUEUE_STATUS";
    public static readonly _SafeStr_8488: string = "c";
    public static readonly QUEUE_TYPE_NORMAL: string = "d";
    public static readonly _SafeStr_7946: number = 2;
    public static readonly _SafeStr_7981: number = 1;

    declare private _name: string;

    declare private _target: number;
    static { (this.prototype as any)._target = 0; }

    declare private _queues: UtilsMap;

    declare private _isActive: boolean;
    static { (this.prototype as any)._isActive = false; }

    declare private _SafeStr_8407: string;

    constructor(param1: IRoomSession, param2: string, param3: number, param4: boolean = false, param5: boolean = false, param6: boolean = false) {
        super("RSQE_QUEUE_STATUS", param1, param5, param6);
        this._name = param2;
        this._target = param3;
        this._queues = new UtilsMap();
        this._isActive = param4;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get queueSetName(): string {
        return this._name;
    }

    public get queueSetTarget(): number {
        return this._target;
    }

    public get queueTypes(): any[] {
        return this._queues.getKeys();
    }

    public getQueueSize(param1: string): number {
        return this._queues.getValue(param1) | 0;
    }

    public addQueue(param1: string, param2: number): void {
        this._queues.add(param1, param2);
    }
}
