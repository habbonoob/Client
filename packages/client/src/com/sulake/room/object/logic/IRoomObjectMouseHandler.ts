import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';

export interface IRoomObjectMouseHandler {
    mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void;
}
