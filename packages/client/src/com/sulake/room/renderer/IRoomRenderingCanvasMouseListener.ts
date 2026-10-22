import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';

export interface IRoomRenderingCanvasMouseListener {
    processRoomCanvasMouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomObject, param3: IRoomGeometry): void;
}
