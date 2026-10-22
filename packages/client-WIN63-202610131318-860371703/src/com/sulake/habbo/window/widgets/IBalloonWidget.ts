import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IBalloonWidget extends IWidget {
    get arrowPivot(): string;
    set arrowPivot(param1: string);
    get arrowDisplacement(): number;
    set arrowDisplacement(param1: number);
}
