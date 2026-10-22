import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';

export interface ISetType {
    get type(): string;
    get paletteID(): number;
    get partSets(): UtilsMap;
    getPartSet(param1: number): IFigurePartSet;
    isMandatory(param1: string, param2: number): boolean;
    optionalFromClubLevel(param1: string): number;
}
