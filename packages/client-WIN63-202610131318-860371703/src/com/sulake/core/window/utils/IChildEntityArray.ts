import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { IChildEntityArrayReader } from '@/com/sulake/core/window/utils/IChildEntityArrayReader';

export interface IChildEntityArray extends IChildEntityArrayReader {
    addChild(param1: IChildEntity): IChildEntity;
    addChildAt(param1: IChildEntity, param2: number): IChildEntity;
    removeChild(param1: IChildEntity): IChildEntity;
    removeChildAt(param1: number): IChildEntity;
    setChildIndex(param1: IChildEntity, param2: number): void;
    swapChildren(param1: IChildEntity, param2: IChildEntity): void;
    swapChildrenAt(param1: number, param2: number): void;
}
