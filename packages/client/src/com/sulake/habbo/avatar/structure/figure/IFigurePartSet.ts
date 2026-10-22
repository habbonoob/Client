import type { IFigurePart } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePart';

export interface IFigurePartSet {
    get type(): string;
    get id(): number;
    get gender(): string;
    get clubLevel(): number;
    get isColorable(): boolean;
    get isSelectable(): boolean;
    get isPreSelectable(): boolean;
    get isSellable(): boolean;
    get parts(): any[];
    get hiddenLayers(): any[];
    getPart(param1: string, param2: number): IFigurePart;
}
