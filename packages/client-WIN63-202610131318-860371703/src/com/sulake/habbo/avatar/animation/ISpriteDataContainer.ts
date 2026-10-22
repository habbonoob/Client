import type { IAnimation } from '@/com/sulake/habbo/avatar/animation/IAnimation';

export interface ISpriteDataContainer {
    get animation(): IAnimation;
    get id(): string;
    get ink(): number;
    get member(): string;
    get hasDirections(): boolean;
    get hasStaticY(): boolean;
    getDirectionOffsetX(param1: number): number;
    getDirectionOffsetY(param1: number): number;
    getDirectionOffsetZ(param1: number): number;
}
