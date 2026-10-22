import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';

export interface IPalette {
    get id(): number;
    getColor(param1: number): IPartColor;
    get colors(): Map<any, any>;
}
