import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IFurnitureImageWidget extends IWidget {
    get furnitureType(): string;
    set furnitureType(param1: string);
    get scale(): number;
    set scale(param1: number);
    get direction(): number;
    set direction(param1: number);
}
