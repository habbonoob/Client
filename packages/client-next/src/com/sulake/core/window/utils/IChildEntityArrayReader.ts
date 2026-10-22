import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';

export interface IChildEntityArrayReader {
    get numChildren(): number;
    getChildAt(param1: number): IChildEntity;
    getChildByID(param1: number): IChildEntity;
    getChildByName(param1: string): IChildEntity;
    getChildIndex(param1: IChildEntity): number;
    groupChildrenWithID(param1: number, param2: any[]): number;
}
