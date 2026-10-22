import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';

export interface IPalette {
    get id(): number;
    get colors(): Map<any, any>;
    getColor(param1: number): IPartColor;
}
