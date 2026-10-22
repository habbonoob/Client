import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboSoundManager extends IUnknown {
    set genericVolume(param1: number);
    set traxVolume(param1: number);
    set furniVolume(param1: number);
    get genericVolume(): number;
    get traxVolume(): number;
    get furniVolume(): number;
    get musicController(): IHabboMusicController;
    playSound(param1: string, param2?: number): void;
    stopSound(param1: string): void;
    playSoundAtPitch(param1: string, param2: number): IHabboSound;
    loadTraxSong(param1: number, param2: string): IHabboSound;
    mute(param1: boolean): void;
    previewVolume(param1: number, param2: number, param3: number): void;
    get events(): IEventDispatcher;
}

export const IHabboSoundManager = Symbol('com.sulake.habbo.sound::IHabboSoundManager');
registerClassName(IHabboSoundManager, 'com.sulake.habbo.sound::IHabboSoundManager');

export function isIHabboSoundManager(value: unknown): value is IHabboSoundManager {
    return (value as { [IHabboSoundManager]?: true } | null | undefined)?.[IHabboSoundManager] === true;
}
