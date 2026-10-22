import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class RoomQueueSet {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::RoomQueueSet'); }

    constructor(param1: string, param2: number) {
        this._name = param1;
        this._target = param2;
        this._queues = new UtilsMap();
    }

    declare private _target: number;
    static { (this.prototype as any)._target = 0; }

    declare private _queues: UtilsMap;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get target(): number {
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
