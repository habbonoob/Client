import type { FurniSlotItem } from '@/com/sulake/habbo/catalog/recycler/FurniSlotItem';
import type { IRecyclerVisualization } from '@/com/sulake/habbo/catalog/recycler/IRecyclerVisualization';

export interface IRecycler {
    init(param1?: IRecyclerVisualization): void;
    cancel(): void;
    empty(): void;
    getSlotContent(param1: number): FurniSlotItem;
    placeObjectAtSlot(param1: number, param2: number, param3: number, param4: number, param5: string, param6?: boolean): void;
    releaseSlot(param1: number): void;
    executeRecycler(): void;
    isReadyToRecycle(): boolean;
    hasEnoughDuckets(): boolean;
    get timeout(): number;
    get ducketCost(): number;
    getPrizeTable(param1: (...args: any[]) => any): any[];
    get numberOfSlots(): number;
    secondsToWait(): number;
    get recyclerDisabled(): boolean;
    setNextRecycleAllowedTimestamp(param1: number): void;
}
