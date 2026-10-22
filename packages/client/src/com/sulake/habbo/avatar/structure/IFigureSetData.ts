import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';

export interface IFigureSetData {
    getSetType(param1: string): ISetType;
    getPalette(param1: number): IPalette;
    getFigurePartSet(param1: number): IFigurePartSet;
}
