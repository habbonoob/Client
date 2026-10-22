import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IGameObject extends IDisposable {
    get gameObjectId(): number;
    get isGhost(): boolean;
    get ghostObjectId(): number;
}
