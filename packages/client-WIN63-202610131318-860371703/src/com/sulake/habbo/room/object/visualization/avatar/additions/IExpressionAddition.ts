import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';

export interface IExpressionAddition extends IAvatarAddition {
    get type(): number;
}
