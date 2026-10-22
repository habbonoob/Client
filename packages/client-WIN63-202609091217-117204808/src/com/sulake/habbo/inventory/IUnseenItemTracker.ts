export interface IUnseenItemTracker {
    resetCategory(param1: number): boolean;
    resetItems(param1: number, param2: any[]): boolean;
    resetCategoryIfEmpty(param1: number): boolean;
    isUnseen(param1: number, param2: number): boolean;
    removeUnseen(param1: number, param2: number): boolean;
    getIds(param1: number): any[];
    getCount(param1: number): number;
    setUnseenItem(param1: number, param2: number): void;
    setUnseenItemMovedToTop(param1: number, param2: any[]): void;
    isUnseenItemMovedToTop(param1: number, param2: number): boolean;
}
