import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IAnimationManager } from '@/com/sulake/habbo/avatar/animation/IAnimationManager';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IAvatarRenderManager extends IUnknown {
    get assets(): IAssetLibrary;
    get mode(): string;
    set mode(param1: string);
    get events(): IEventDispatcher;
    get effectMap(): Map<any, any>;
    get isReady(): boolean;
    createAvatarImage(param1: string, param2: string, param3?: string, param4?: IAvatarImageListener, param5?: IAvatarEffectListener): IAvatarImage;
    createBlockedAvatarImage(param1: string, param2: string): IAvatarImage;
    getFigureData(): IFigureSetData;
    getFigureStringWithFigureIds(param1: string, param2: string, param3: number[]): string;
    isValidFigureSetForGender(param1: number, param2: string): boolean;
    getMandatoryAvatarPartSetIds(param1: string, param2: number): any[];
    getAssetByName(param1: string): IAsset;
    injectFigureData(param1: XML): void;
    createFigureContainer(param1: string): IAvatarFigureContainer;
    isFigureReady(param1: IAvatarFigureContainer): boolean;
    downloadFigure(param1: IAvatarFigureContainer, param2: IAvatarImageListener): void;
    getAnimationManager(): IAnimationManager;
    resetAssetManager(): void;
    resolveClubLevel(param1: IAvatarFigureContainer, param2: string, param3?: any[]): number;
    getItemIds(): any[];
    purgeAssets(): void;
    resetAllCaches(): void;
}

export const IAvatarRenderManager = Symbol('com.sulake.habbo.avatar::IAvatarRenderManager');
registerClassName(IAvatarRenderManager, 'com.sulake.habbo.avatar::IAvatarRenderManager');

export function isIAvatarRenderManager(value: unknown): value is IAvatarRenderManager {
    return (value as { [IAvatarRenderManager]?: true } | null | undefined)?.[IAvatarRenderManager] === true;
}
