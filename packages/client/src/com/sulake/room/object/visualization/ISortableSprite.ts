import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export interface ISortableSprite {
    get x(): number;
    get y(): number;
    get z(): number;
    get sprite(): IRoomObjectSprite;
}
