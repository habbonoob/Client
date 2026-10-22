import type { IAnimation } from '@/com/sulake/habbo/avatar/animation/IAnimation';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';

export interface IAnimationManager {
    get animations(): Map<any, any>;
    getAnimation(param1: string): IAnimation;
    getLayerData(param1: string, param2: number, param3: string): IAnimationLayerData;
}
