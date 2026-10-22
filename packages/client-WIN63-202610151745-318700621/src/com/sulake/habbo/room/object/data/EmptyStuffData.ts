import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class EmptyStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::EmptyStuffData'); }

    constructor() {
        super();
    }

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        super.initializeFromIncomingMessage(param1);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
    }

    public override getLegacyString(): string {
        return "";
    }

    public override compare(param1: IStuffData): boolean {
        return super.compare(param1);
    }
}
