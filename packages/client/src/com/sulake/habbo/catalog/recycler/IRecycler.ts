import type { FurniSlotItem } from '@/com/sulake/habbo/catalog/recycler/FurniSlotItem';
import type { IRecyclerVisualization } from '@/com/sulake/habbo/catalog/recycler/IRecyclerVisualization';

export interface IRecycler {
    get timeout(): number;
    get ducketCost(): number;
    get numberOfSlots(): number;
    get recyclerDisabled(): boolean;
    init(param1?: IRecyclerVisualization): void;
    cancel(): void;
    empty(): void;
    getSlotContent(param1: number): FurniSlotItem;
    placeObjectAtSlot(param1: number, param2: number, param3: number, param4: number, param5: string, param6?: boolean): void;
    releaseSlot(param1: number): void;
    executeRecycler(): void;
    isReadyToRecycle(): boolean;
    hasEnoughDuckets(): boolean;
    getPrizeTable(param1: (...args: any[]) => any): any[];
    secondsToWait(): number;
    setNextRecycleAllowedTimestamp(param1: number): void;
}
