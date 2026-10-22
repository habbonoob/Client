import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';

export interface IStuffData {
    initializeFromIncomingMessage(param1: IMessageDataWrapper): void;
    initializeFromRoomObjectModel(param1: IRoomObjectModel): void;
    writeRoomObjectModel(param1: IRoomObjectModelController): void;
    getLegacyString(): string;
    getJSONValue(param1: string): string;
    compare(param1: IStuffData): boolean;
    set flags(param1: number);
    get uniqueSerialNumber(): number;
    get uniqueSeriesSize(): number;
    set uniqueSerialNumber(param1: number);
    set uniqueSeriesSize(param1: number);
    get rarityLevel(): number;
    get contentsCount(): number;
    get chestName(): string;
    get state(): number;
}

export const IStuffData = Symbol('com.sulake.habbo.room::IStuffData');
registerClassName(IStuffData, 'com.sulake.habbo.room::IStuffData');

export function isIStuffData(value: unknown): value is IStuffData {
    return (value as { [IStuffData]?: true } | null | undefined)?.[IStuffData] === true;
}
