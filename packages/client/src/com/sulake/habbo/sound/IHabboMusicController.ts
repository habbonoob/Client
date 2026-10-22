import type { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboMusicController {
    get samplesIdsInUse(): any[];
    get events(): IEventDispatcher;
    getRoomItemPlaylist(param1?: number): IPlayListController;
    getSongDiskInventorySize(): number;
    getSongDiskInventoryDiskId(param1: number): number;
    getSongDiskInventorySongId(param1: number): number;
    getSongInfo(param1: number): ISongInfo;
    getSongIdPlayingAtPriority(param1: number): number;
    playSong(param1: number, param2: number, param3?: number, param4?: number, param5?: number, param6?: number): boolean;
    stop(param1: number): void;
    addSongInfoRequest(param1: number): void;
    requestSongInfoWithoutSamples(param1: number): void;
    requestUserSongDisks(): void;
    onSongLoaded(param1: number): void;
    updateVolume(param1: number): void;
    samplesUnloaded(param1: any[]): void;
    dispose(): void;
}
