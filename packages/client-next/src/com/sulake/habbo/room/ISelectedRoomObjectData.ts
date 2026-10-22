import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface ISelectedRoomObjectData {
    get id(): number;
    get category(): number;
    get operation(): string;
    get typeId(): number;
    get instanceData(): string;
    get stuffData(): IStuffData;
    get state(): number;
    get animFrame(): number;
    get posture(): string;
}
