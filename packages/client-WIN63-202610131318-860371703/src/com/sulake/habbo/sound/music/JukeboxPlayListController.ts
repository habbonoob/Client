import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { SoundCompleteEvent } from '@/com/sulake/habbo/sound/events/SoundCompleteEvent';
import type { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { HabboMusicController } from '@/com/sulake/habbo/sound/music/HabboMusicController';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { JukeboxPlayListFullMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/JukeboxPlayListFullMessageEvent';
import { JukeboxSongDisksMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/JukeboxSongDisksMessageEvent';
import { NowPlayingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/NowPlayingMessageEvent';
import { GetJukeboxPlayListMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetJukeboxPlayListMessageComposer';
import { JukeboxSongDisksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/JukeboxSongDisksMessageParser';
import { NowPlayingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/NowPlayingMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { NowPlayingEvent } from '@/com/sulake/habbo/sound/events/NowPlayingEvent';
import { PlayListStatusEvent } from '@/com/sulake/habbo/sound/events/PlayListStatusEvent';
import { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import { SongDataEntry } from '@/com/sulake/habbo/sound/music/SongDataEntry';

export class JukeboxPlayListController implements IPlayListController {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::JukeboxPlayListController'); }

    private _disposed: boolean = false;
    private _isPlaying: boolean = false;
    private _entries: any[] = [];

    declare private _musicController: IHabboMusicController;

    declare private _events: IEventDispatcher;

    declare private _connection: IConnection;

    declare private _soundManager: HabboSoundManagerFlash10;

    private _nowPlayingSongId: number = -1;
    private _missingSongInfo: any[] = [];

    declare private _messageEvents: any[];

    private _playPosition: number = -1;

    constructor(param1: HabboSoundManagerFlash10, param2: HabboMusicController, param3: IEventDispatcher, param4: IConnection) {
        this._soundManager = param1;
        this._musicController = param2;
        this._events = param3;
        this._connection = param4;
        this._messageEvents = [];
        this._messageEvents.push(new NowPlayingMessageEvent(this.onNowPlayingMessage));
        this._messageEvents.push(new JukeboxSongDisksMessageEvent(this.onJukeboxSongDisksMessage));
        this._messageEvents.push(new JukeboxPlayListFullMessageEvent(this.onJukeboxPlayListFullMessage));
        for (const _loc5_ of this._messageEvents ?? []) {
            this._connection.addMessageEvent(_loc5_);
        }
        this._events.addEventListener("SCE_TRAX_SONG_COMPLETE", this.onSongFinishedPlayingEvent);
        this._musicController.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
    }

    public get priority(): number {
        return 0;
    }

    public get nowPlayingSongId(): number {
        return this._nowPlayingSongId;
    }

    public get playPosition(): number {
        return this._playPosition;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public get length(): number {
        if (this._entries == null) {
            return 0;
        }
        return this._entries.length | 0;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.stopPlaying();
            if (this._musicController.events) {
                this._musicController.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
            }
            this._musicController = null;
            this._soundManager = null;
            if (this._connection) {
                for (const _loc1_ of this._messageEvents ?? []) {
                    this._connection.removeMessageEvent(_loc1_);
                    _loc1_.dispose();
                }
                this._messageEvents = null;
                this._connection = null;
            }
            if (this._events) {
                this._events.removeEventListener("SCE_TRAX_SONG_COMPLETE", this.onSongFinishedPlayingEvent);
                this._events = null;
            }
            this._disposed = true;
        }
    }

    public stopPlaying(): void {
        this._musicController.stop(this.priority);
        this._nowPlayingSongId = -1;
        this._playPosition = -1;
        this._isPlaying = false;
    }

    public requestPlayList(): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new GetJukeboxPlayListMessageComposer());
    }

    public getEntry(param1: number): ISongInfo {
        if (param1 < 0 || param1 >= this._entries.length) {
            return null;
        }
        return this._entries[param1];
    }

    protected onSongFinishedPlayingEvent = (param1: SoundCompleteEvent): void => {
    };

    private onNowPlayingMessage = (param1: IMessageEvent): void => {
        let _loc3_: NowPlayingMessageEvent = param1 instanceof NowPlayingMessageEvent ? param1 : null;
        let _loc2_: NowPlayingMessageParser = asInstanceOf(_loc3_.getParser(), NowPlayingMessageParser);
        Logger.log("Received Now Playing message with: " + _loc2_.currentSongId + ", " + _loc2_.nextSongId + ", " + _loc2_.syncCount);
        this._isPlaying = _loc2_.currentSongId != -1;
        if (_loc2_.currentSongId >= 0) {
            this._musicController.playSong(_loc2_.currentSongId, 0, _loc2_.syncCount / 1000, 0, 1, 1);
            this._nowPlayingSongId = _loc2_.currentSongId;
        } else {
            this.stopPlaying();
        }
        if (_loc2_.nextSongId >= 0) {
            this._musicController.addSongInfoRequest(_loc2_.nextSongId);
        }
        this._playPosition = _loc2_.currentPosition;
        this._soundManager.events.dispatchEvent(new NowPlayingEvent("NPE_SONG_CHANGED", 0, _loc2_.currentSongId, _loc2_.currentPosition));
    };

    private onJukeboxSongDisksMessage = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: SongDataEntry = null;
        let _loc5_: JukeboxSongDisksMessageEvent = param1 instanceof JukeboxSongDisksMessageEvent ? param1 : null;
        let _loc2_: JukeboxSongDisksMessageParser = asInstanceOf(_loc5_.getParser(), JukeboxSongDisksMessageParser);
        Logger.log("Received Jukebox song disks (=playlist) message, length of playlist: " + _loc2_.songDisks.length);
        this._entries = [];
        _loc4_ = 0;
        while (_loc4_ < _loc2_.songDisks.length) {
            _loc7_ = _loc2_.songDisks.getWithIndex(_loc4_) | 0;
            _loc6_ = _loc2_.songDisks.getKey(_loc4_) | 0;
            _loc3_ = asInstanceOf(this._musicController.getSongInfo(_loc7_), SongDataEntry);
            if (_loc3_ == null) {
                _loc3_ = new SongDataEntry(_loc7_, -1, null, null, null);
                if (this._missingSongInfo.indexOf(_loc7_) < 0) {
                    this._missingSongInfo.push(_loc7_);
                    this._musicController.requestSongInfoWithoutSamples(_loc7_);
                }
            }
            _loc3_.diskId = _loc6_;
            this._entries.push(_loc3_);
            _loc4_++;
        }
        if (this._missingSongInfo.length == 0) {
            this._events.dispatchEvent(new PlayListStatusEvent("PLUE_PLAY_LIST_UPDATED"));
        }
    };

    private onJukeboxPlayListFullMessage = (param1: IMessageEvent): void => {
        Logger.log("Received jukebox playlist full message.");
        this._events.dispatchEvent(new PlayListStatusEvent("PLUE_PLAY_LIST_FULL"));
    };

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        let _loc4_: number = 0;
        let _loc2_: ISongInfo = null;
        let _loc6_: number = 0;
        let _loc3_: SongDataEntry = null;
        _loc4_ = 0;
        while (_loc4_ < this.length) {
            _loc2_ = this._entries[_loc4_];
            if (_loc2_.id == param1.id) {
                _loc6_ = _loc2_.diskId;
                _loc3_ = asInstanceOf(this._musicController.getSongInfo(param1.id), SongDataEntry);
                if (_loc3_ != null) {
                    _loc3_.diskId = _loc6_;
                    this._entries[_loc4_] = _loc3_;
                }
                break;
            }
            _loc4_++;
        }
        let _loc5_: number = this._missingSongInfo.indexOf(param1.id);
        if (_loc5_ >= 0) {
            this._missingSongInfo.splice(_loc5_, 1);
        }
        if (this._missingSongInfo.length == 0) {
            this._events.dispatchEvent(new PlayListStatusEvent("PLUE_PLAY_LIST_UPDATED"));
        }
    };

    get [IPlayListController](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
