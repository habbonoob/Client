import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IHabboSound {
    get volume(): number;
    set volume(param1: number);
    get position(): number;
    set position(param1: number);
    get length(): number;
    get ready(): boolean;
    get finished(): boolean;
    get fadeOutSeconds(): number;
    set fadeOutSeconds(param1: number);
    get fadeInSeconds(): number;
    set fadeInSeconds(param1: number);
    play(param1?: number): boolean;
    stop(): boolean;
}

export const IHabboSound = Symbol('com.sulake.habbo.sound::IHabboSound');
registerClassName(IHabboSound, 'com.sulake.habbo.sound::IHabboSound');

export function isIHabboSound(value: unknown): value is IHabboSound {
    return (value as { [IHabboSound]?: true } | null | undefined)?.[IHabboSound] === true;
}
