import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { SoundCompleteEvent } from '@/com/sulake/habbo/sound/events/SoundCompleteEvent';
import type { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { HabboMusicController } from '@/com/sulake/habbo/sound/music/HabboMusicController';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PlayListMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListMessageEvent';
import { PlayListSongAddedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListSongAddedMessageEvent';
import { GetSoundMachinePlayListMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetSoundMachinePlayListMessageComposer';
import { PlayListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/PlayListMessageParser';
import { PlayListSongAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/PlayListSongAddedMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { PlayListStatusEvent } from '@/com/sulake/habbo/sound/events/PlayListStatusEvent';
import { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import { SongDataEntry } from '@/com/sulake/habbo/sound/music/SongDataEntry';

export class SoundMachinePlayListController implements IPlayListController {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::SoundMachinePlayListController'); }

    declare private _soundManager: HabboSoundManagerFlash10;

    declare private _musicController: HabboMusicController;

    declare private _connection: IConnection;

    declare private _events: IEventDispatcher;

    declare private _roomEvents: IEventDispatcher;

    private _nowPlayingSongId: number = -1;
    private _playListEntries: any[] = [];

    declare private _isPlaying: boolean;
    static { (this.prototype as any)._isPlaying = false; }

    private _disposed: boolean = false;

    declare private _messageEvents: any[];

    constructor(param1: HabboSoundManagerFlash10, param2: HabboMusicController, param3: IEventDispatcher, param4: IEventDispatcher, param5: IConnection) {
        this._soundManager = param1;
        this._events = param3;
        this._roomEvents = param4;
        this._connection = param5;
        this._musicController = param2;
        this._messageEvents = [];
        this._messageEvents.push(new PlayListMessageEvent(this.onPlayListMessage));
        this._messageEvents.push(new PlayListSongAddedMessageEvent(this.onPlayListSongAddedMessage));
        for (const _loc6_ of this._messageEvents ?? []) {
            this._connection.addMessageEvent(_loc6_);
        }
        this._events.addEventListener("SCE_TRAX_SONG_COMPLETE", this.onSongFinishedPlayingEvent);
        this._events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
        this._roomEvents.addEventListener("ROSM_SOUND_MACHINE_SWITCHED_ON", this.onSoundMachinePlayEvent);
        this._roomEvents.addEventListener("ROSM_SOUND_MACHINE_SWITCHED_OFF", this.onSoundMachineStopEvent);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get priority(): number {
        return 0;
    }

    public get length(): number {
        if (this._playListEntries == null) {
            return 0;
        }
        return this._playListEntries.length | 0;
    }

    public get playPosition(): number {
        return -1;
    }

    public get nowPlayingSongId(): number {
        return this._nowPlayingSongId;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public set playPosition(param1: number) {
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._isPlaying) {
                this.stopPlaying();
            }
            this._soundManager = null;
            if (this._connection) {
                for (const _loc1_ of this._messageEvents ?? []) {
                    this._connection.removeMessageEvent(_loc1_);
                    _loc1_.dispose();
                }
                this._messageEvents = null;
                this._connection = null;
            }
            this._playListEntries = null;
            this._musicController = null;
            if (this._events) {
                this._events.removeEventListener("SCE_TRAX_SONG_COMPLETE", this.onSongFinishedPlayingEvent);
                this._events = null;
            }
            if (this._roomEvents) {
                this._roomEvents.removeEventListener("ROSM_SOUND_MACHINE_SWITCHED_ON", this.onSoundMachinePlayEvent);
                this._roomEvents.removeEventListener("ROSM_SOUND_MACHINE_SWITCHED_OFF", this.onSoundMachineStopEvent);
                this._roomEvents = null;
            }
            this._disposed = true;
        }
    }

    private onSoundMachinePlayEvent = (param1: Event): void => {
        this.startPlaying();
    };

    private onSoundMachineStopEvent = (param1: Event): void => {
        this.stopPlaying();
    };

    public startPlaying(): void {
        if (this._isPlaying) {
            return;
        }
        if (this._playListEntries == null || this._playListEntries.length == 0) {
            this.requestPlayList();
            this._isPlaying = true;
            return;
        }
        this.stopPlaying();
        this._nowPlayingSongId = -1;
        this._isPlaying = true;
        this.playNextSong();
    }

    public checkSongPlayState(param1: number): void {
        let _loc2_: SongDataEntry = null;
        if (this._nowPlayingSongId == param1) {
            this.playCurrentSongAndNotify(this._nowPlayingSongId);
            _loc2_ = this.getNextEntry();
            if (_loc2_ != null) {
                this._musicController.addSongInfoRequest(_loc2_.id);
            }
        }
    }

    public stopPlaying(): void {
        this._nowPlayingSongId = -1;
        this._isPlaying = false;
        this._musicController.stop(0);
    }

    public updateVolume(param1: number): void {
    }

    public addItem(param1: ISongInfo, param2: number = 0): number {
        return -1;
    }

    public moveItem(param1: number, param2: number): void {
    }

    public removeItem(param1: number): void {
    }

    private onSongFinishedPlayingEvent = (param1: SoundCompleteEvent): void => {
        if (param1.id == this._nowPlayingSongId) {
            this.playNextSong();
        }
    };

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        let _loc2_: SongDataEntry = null;
        let _loc4_: number = 0;
        let _loc3_: SongDataEntry = null;
        if (this._playListEntries == null || this._playListEntries.length == 0) {
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < this._playListEntries.length) {
            _loc2_ = this._playListEntries[_loc4_];
            if (_loc2_.id == param1.id) {
                _loc3_ = asInstanceOf(this._musicController.getSongInfo(param1.id), SongDataEntry);
                if (_loc3_ != null) {
                    this._playListEntries[_loc4_] = _loc3_;
                }
                return;
            }
            _loc4_++;
        }
    };

    private playNextSong(): void {
        let _loc1_: SongDataEntry = this.getNextEntry();
        if (_loc1_ != null) {
            this._nowPlayingSongId = _loc1_.id;
            this.playCurrentSongAndNotify(this._nowPlayingSongId);
        }
    }

    private playCurrentSongAndNotify(param1: number): void {
        let _loc2_: SongDataEntry = asInstanceOf(this.getEntryWithId(param1), SongDataEntry);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: number = _loc2_.startPlayHeadPos;
        _loc2_.startPlayHeadPos = 0;
        if (this._musicController.playSong(param1, 0, _loc3_, 0, 0, 0)) {
            Logger.log("Trax song started by playlist: " + _loc2_.name + " by " + _loc2_.creator);
        }
    }

    private getNextEntry(): SongDataEntry {
        let _loc1_: SongDataEntry = null;
        let _loc2_: number = 0;
        if (this._playListEntries == null || this._playListEntries.length == 0) {
            return null;
        }
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._playListEntries.length) {
            _loc1_ = this._playListEntries[_loc2_];
            if (_loc1_.id == this._nowPlayingSongId) {
                _loc3_ = _loc2_ + 1;
            }
            _loc2_++;
        }
        if (_loc3_ >= this._playListEntries.length) {
            _loc3_ = 0;
        }
        return this._playListEntries[_loc3_];
    }

    public getEntry(param1: number): ISongInfo {
        if (this._playListEntries == null || param1 < 0 || param1 >= this._playListEntries.length) {
            return null;
        }
        return this._playListEntries[param1];
    }

    public getEntryWithId(param1: number): ISongInfo {
        let _loc2_: SongDataEntry = null;
        let _loc3_: number = 0;
        if (this._playListEntries == null || this._playListEntries.length == 0) {
            return null;
        }
        _loc3_ = 0;
        while (_loc3_ < this._playListEntries.length) {
            _loc2_ = this._playListEntries[_loc3_];
            if (_loc2_.id == param1) {
                return _loc2_;
            }
            _loc3_++;
        }
        return null;
    }

    public requestPlayList(): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new GetSoundMachinePlayListMessageComposer());
    }

    private convertParserPlayList(param1: any[]): any[] {
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(new SongDataEntry(_loc2_.id | 0, _loc2_.length | 0, stringOrNull(_loc2_.name), stringOrNull(_loc2_.creator), null));
        }
        return _loc3_;
    }

    private onPlayListMessage = (param1: IMessageEvent): void => {
        let _loc2_: SongDataEntry = null;
        let _loc7_: number = 0;
        let _loc5_: PlayListMessageEvent = param1 instanceof PlayListMessageEvent ? param1 : null;
        let _loc4_: PlayListMessageParser = asInstanceOf(_loc5_.getParser(), PlayListMessageParser);
        let _loc6_: number = _loc4_.synchronizationCount;
        let _loc3_: any[] = this.convertParserPlayList(_loc4_.playList);
        if (_loc3_ == null || _loc3_.length == 0) {
            return;
        }
        this._playListEntries = _loc3_;
        let _loc8_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < _loc3_.length) {
            _loc2_ = this._playListEntries[_loc7_];
            _loc8_ += _loc2_.length;
            _loc7_++;
        }
        if (_loc6_ < 0) {
            _loc6_ = 0;
        }
        _loc6_ %= _loc8_;
        _loc7_ = 0;
        while (_loc7_ < _loc3_.length) {
            _loc2_ = this._playListEntries[_loc7_];
            if (_loc6_ <= _loc2_.length) {
                this._nowPlayingSongId = _loc2_.id;
                _loc2_.startPlayHeadPos = _loc6_ / 1000;
                break;
            }
            _loc6_ -= _loc2_.length;
            _loc7_++;
        }
        this._events.dispatchEvent(new PlayListStatusEvent("PLUE_PLAY_LIST_UPDATED"));
        if (_loc2_ != null && this._isPlaying) {
            this.playCurrentSongAndNotify(_loc2_.id);
        }
    };

    private onPlayListSongAddedMessage = (param1: IMessageEvent): void => {
        let _loc4_: PlayListSongAddedMessageEvent = param1 instanceof PlayListSongAddedMessageEvent ? param1 : null;
        let _loc3_: PlayListSongAddedMessageParser = asInstanceOf(_loc4_.getParser(), PlayListSongAddedMessageParser);
        let _loc2_: SongDataEntry = new SongDataEntry(_loc3_.entry.id, _loc3_.entry.length, _loc3_.entry.name, _loc3_.entry.creator, null);
        if (_loc2_ == null) {
            return;
        }
        this._playListEntries.push(_loc2_);
        this._events.dispatchEvent(new PlayListStatusEvent("PLUE_PLAY_LIST_UPDATED"));
        if (!this._isPlaying) {
            return;
        }
        if (this._playListEntries.length == 1) {
            this.playCurrentSongAndNotify(_loc2_.id);
        } else {
            this.checkSongPlayState(_loc2_.id);
        }
    };

    get [IPlayListController](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
