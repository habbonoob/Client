import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';

export interface IAnimationLayerData {
    get id(): string;
    get action(): IActiveActionData;
    get animationFrame(): number;
    get dx(): number;
    get dy(): number;
    get dz(): number;
    get directionOffset(): number;
}
