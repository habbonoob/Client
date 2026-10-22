import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';

export interface IPlayListController extends IDisposable {
    get priority(): number;
    get length(): number;
    get playPosition(): number;
    get nowPlayingSongId(): number;
    get isPlaying(): boolean;
    getEntry(param1: number): ISongInfo;
    requestPlayList(): void;
}

export const IPlayListController = Symbol('com.sulake.habbo.sound::IPlayListController');
registerClassName(IPlayListController, 'com.sulake.habbo.sound::IPlayListController');

export function isIPlayListController(value: unknown): value is IPlayListController {
    return (value as { [IPlayListController]?: true } | null | undefined)?.[IPlayListController] === true;
}
