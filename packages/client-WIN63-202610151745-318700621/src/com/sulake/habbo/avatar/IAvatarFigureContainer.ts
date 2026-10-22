import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IAvatarFigureContainer {
    getPartTypeIds(): any[];
    hasPartType(param1: string): boolean;
    getPartSetId(param1: string): number;
    getPartColorIds(param1: string): any[];
    updatePart(param1: string, param2: number, param3: any[]): void;
    removePart(param1: string): void;
    getFigureString(): string;
}

export const IAvatarFigureContainer = Symbol('com.sulake.habbo.avatar::IAvatarFigureContainer');
registerClassName(IAvatarFigureContainer, 'com.sulake.habbo.avatar::IAvatarFigureContainer');

export function isIAvatarFigureContainer(value: unknown): value is IAvatarFigureContainer {
    return (value as { [IAvatarFigureContainer]?: true } | null | undefined)?.[IAvatarFigureContainer] === true;
}
