import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';

export class ObjectLogicBase implements IRoomObjectEventHandler {
    static { registerClassName(this, 'com.sulake.room.object.logic::ObjectLogicBase'); }

    declare private _events: IEventDispatcher;

    declare private _object: IRoomObjectController;

    constructor() {
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._events;
    }

    public set eventDispatcher(param1: IEventDispatcher) {
        this._events = param1;
    }

    public getEventTypes(): any[] {
        return [];
    }

    protected getAllEventTypes(param1: any[], param2: any[]): any[] {
        let _loc3_: any[] = param1.concat();
        for (const _loc4_ of param2 ?? []) {
            if (_loc3_.indexOf(_loc4_) < 0) {
                _loc3_.push(_loc4_);
            }
        }
        return _loc3_;
    }

    public dispose(): void {
        this._object = null;
    }

    public set object(param1: IRoomObjectController) {
        if (this._object == param1) {
            return;
        }
        if (this._object != null) {
            this._object.setEventHandler(null);
        }
        if (param1 == null) {
            this.dispose();
            this._object = null;
        } else {
            this._object = param1;
            this._object.setEventHandler(this);
        }
    }

    public get object(): IRoomObjectController {
        return this._object;
    }

    public mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
    }

    public initialize(param1: XML): void {
    }

    public update(param1: number): void {
    }

    public processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        if (param1 != null) {
            if (this._object != null) {
                this._object.setLocation(param1.loc);
                this._object.setDirection(param1.dir);
            }
        }
    }

    public useObject(): void {
    }

    public tearDown(): void {
    }

    public get widget(): string {
        return null;
    }

    public get contextMenu(): string {
        return null;
    }

    get [IRoomObjectEventHandler](): true {
        return true;
    }
}
