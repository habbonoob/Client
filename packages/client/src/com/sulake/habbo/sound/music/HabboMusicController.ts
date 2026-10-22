import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { SongInfoEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/SongInfoEntry';
import type { SoundCompleteEvent } from '@/com/sulake/habbo/sound/events/SoundCompleteEvent';
import type { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import type { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TraxSongInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/TraxSongInfoMessageEvent';
import { UserSongDisksInventoryMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/sound/UserSongDisksInventoryMessageEvent';
import { GetNowPlayingMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetNowPlayingMessageComposer';
import { GetSongInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetSongInfoMessageComposer';
import { GetUserSongDisksMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetUserSongDisksMessageComposer';
import { TraxSongInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/TraxSongInfoMessageParser';
import { UserSongDisksInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/UserSongDisksInventoryMessageParser';
import { NowPlayingEvent } from '@/com/sulake/habbo/sound/events/NowPlayingEvent';
import { SongDiskInventoryReceivedEvent } from '@/com/sulake/habbo/sound/events/SongDiskInventoryReceivedEvent';
import { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import { isIHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import { isIPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import { JukeboxPlayListController } from '@/com/sulake/habbo/sound/music/JukeboxPlayListController';
import { SongDataEntry } from '@/com/sulake/habbo/sound/music/SongDataEntry';
import { SongStartRequestData } from '@/com/sulake/habbo/sound/music/SongStartRequestData';
import { SoundMachinePlayListController } from '@/com/sulake/habbo/sound/music/SoundMachinePlayListController';
import { TraxSequencer } from '@/com/sulake/habbo/sound/trax/TraxSequencer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboMusicController implements IHabboMusicController, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::HabboMusicController'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboMusicController.#initStatics();
        return HabboMusicController._log;
    }

    public static readonly SKIP_POSITION_SET: number = -1;
    private static readonly MAXIMUM_NOTIFY_PRIORITY: number = 0;

    constructor(param1: HabboSoundManagerFlash10, param2: IEventDispatcher, param3: IEventDispatcher, param4: IConnection) {
        let _loc5_: number = 0;
        this._SafeStr_2566 = new UtilsMap();
        this._SafeStr_3266 = new UtilsMap();
        this._SafeStr_3127 = [];
        this._SafeStr_2742 = [];
        this._SafeStr_3689 = [];
        this._SafeStr_2788 = new UtilsMap();
        this._SafeStr_3723 = [];
        this._messageEvents = [];
        this._soundManager = param1;
        this._events = param2;
        this._roomEvents = param3;
        this._connection = param4;
        this._messageEvents.push(new TraxSongInfoMessageEvent(this.onSongInfoMessage));
        this._messageEvents.push(new UserSongDisksInventoryMessageEvent(this.onSongDiskInventoryMessage));
        for (const _loc6_ of this._messageEvents ?? []) {
            this._connection.addMessageEvent(_loc6_);
        }
        this._roomEvents.addEventListener("ROSM_JUKEBOX_INIT", this.onJukeboxInit);
        this._roomEvents.addEventListener("ROSM_JUKEBOX_DISPOSE", this.onJukeboxDispose);
        this._roomEvents.addEventListener("ROSM_SOUND_MACHINE_INIT", this.onSoundMachineInit);
        this._roomEvents.addEventListener("ROSM_SOUND_MACHINE_DISPOSE", this.onSoundMachineDispose);
        this._SafeStr_4138 = new Timer(1000);
        this._SafeStr_4138.start();
        this._SafeStr_4138.addEventListener("timer", this.sendNextSongRequestMessage);
        this._events.addEventListener("SCE_TRAX_SONG_COMPLETE", this.onSongFinishedPlayingEvent);
        _loc5_ = 0;
        while (_loc5_ < 4) {
            this._SafeStr_2742[_loc5_] = null;
            this._SafeStr_3689[_loc5_] = 0;
            _loc5_++;
        }
    }

    declare private _soundManager: HabboSoundManagerFlash10;

    declare private _connection: IConnection;

    declare private _events: IEventDispatcher;

    declare private _roomEvents: IEventDispatcher;

    declare private _SafeStr_2566: UtilsMap;

    declare private _SafeStr_3266: UtilsMap;

    declare private _SafeStr_3127: any[];

    private _SafeStr_2820: IPlayListController = null;

    declare private _SafeStr_2742: any[];

    declare private _SafeStr_3689: any[];

    private _SafeStr_2476: number = -1;
    private _SafeStr_4451: number = -1;
    private _SafeStr_5305: number = -1;

    declare private _SafeStr_4138: Timer;

    declare private _SafeStr_2788: UtilsMap;

    declare private _SafeStr_3723: any[];

    declare private _messageEvents: any[];

    private _SafeStr_6604: number = -1;
    private _previousNotificationTime: number = -1;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public get samplesIdsInUse(): any[] {
        let _loc5_: number = 0;
        let _loc3_: SongStartRequestData = null;
        let _loc2_: SongDataEntry = null;
        let _loc1_: TraxSequencer = null;
        let _loc4_: any[] = [];
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2742.length) {
            if (this._SafeStr_2742[_loc5_] != null) {
                _loc3_ = this._SafeStr_2742[_loc5_];
                _loc2_ = this._SafeStr_2566.getValue(_loc3_.songId);
                if (_loc2_ != null) {
                    _loc1_ = asInstanceOf(_loc2_.soundObject, TraxSequencer);
                    if (_loc1_ != null) {
                        _loc4_ = _loc4_.concat(_loc1_.traxData.getSampleIds());
                    }
                }
            }
            _loc5_++;
        }
        return _loc4_;
    }

    public dispose(): void {
        let _loc3_: number = 0;
        let _loc1_: SongDataEntry = null;
        let _loc2_: IHabboSound = null;
        if (!this._disposed) {
            this._soundManager = null;
            this._SafeStr_3127 = null;
            if (this._connection) {
                for (const _loc4_ of this._messageEvents ?? []) {
                    this._connection.removeMessageEvent(_loc4_);
                    _loc4_.dispose();
                }
                this._messageEvents = null;
                this._connection = null;
            }
            if (this._SafeStr_2820) {
                this._SafeStr_2820.dispose();
                this._SafeStr_2820 = null;
            }
            if (this._SafeStr_2566) {
                _loc3_ = 0;
                while (_loc3_ < this._SafeStr_2566.length) {
                    _loc1_ = asInstanceOf(this._SafeStr_2566.getWithIndex(_loc3_), SongDataEntry);
                    _loc2_ = asGuarded(_loc1_.soundObject, isIHabboSound);
                    if (_loc2_ != null) {
                        _loc2_.stop();
                    }
                    _loc1_.soundObject = null;
                    _loc3_++;
                }
                this._SafeStr_2566.dispose();
                this._SafeStr_2566 = null;
            }
            if (this._SafeStr_3266 != null) {
                this._SafeStr_3266.dispose();
                this._SafeStr_3266 = null;
            }
            this._SafeStr_4138.stop();
            this._SafeStr_4138 = null;
            if (this._roomEvents) {
                this._roomEvents.removeEventListener("ROSM_JUKEBOX_INIT", this.onJukeboxInit);
                this._roomEvents.removeEventListener("ROSM_JUKEBOX_DISPOSE", this.onJukeboxDispose);
                this._roomEvents.removeEventListener("ROSM_SOUND_MACHINE_INIT", this.onSoundMachineInit);
                this._roomEvents.removeEventListener("ROSM_SOUND_MACHINE_DISPOSE", this.onSoundMachineDispose);
            }
            if (this._SafeStr_2788 != null) {
                this._SafeStr_2788.dispose();
                this._SafeStr_2788 = null;
            }
            this._disposed = true;
        }
    }

    public getRoomItemPlaylist(param1: number = -1): IPlayListController {
        return this._SafeStr_2820;
    }

    public playSong(param1: number, param2: number, param3: number = 0, param4: number = 0, param5: number = 0.5, param6: number = 0.5): boolean {
        HabboMusicController._log.info("Requesting " + param1 + " for playing");
        if (!this.addSongStartRequest(param2, param1, param3, param4, param5, param6)) {
            return false;
        }
        if (!this.processSongEntryForPlaying(param1)) {
            return false;
        }
        if (param2 >= this._SafeStr_2476) {
            this.playSongObject(param2, param1);
        } else {
            HabboMusicController._log.info("Higher priority song blocked playing. Stored song " + param1 + " for priority " + param2);
        }
        return true;
    }

    public stop(param1: number): void {
        let _loc2_: any = param1 == this._SafeStr_2476;
        let _loc3_: any = this.getTopRequestPriority() == param1;
        if (_loc2_) {
            this.resetSongStartRequest(param1);
            this.stopSongAtPriority(param1);
        } else {
            this.resetSongStartRequest(param1);
            if (_loc3_) {
                this.reRequestSongAtPriority(this._SafeStr_2476);
            }
        }
    }

    public updateVolume(param1: number): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: SongDataEntry = null;
        _loc3_ = 0;
        while (_loc3_ < 4) {
            _loc4_ = this.getSongIdPlayingAtPriority(_loc3_);
            if (_loc4_ >= 0) {
                _loc2_ = asInstanceOf(this.getSongDataEntry(_loc4_), SongDataEntry);
                if (_loc2_ != null && _loc2_.soundObject != null) {
                    _loc2_.soundObject.volume = param1;
                }
            }
            _loc3_++;
        }
    }

    public onSongLoaded(param1: number): void {
        let _loc3_: number = 0;
        HabboMusicController._log.info("Song loaded : " + param1);
        let _loc2_: number = this.getTopRequestPriority();
        if (_loc2_ >= 0) {
            _loc3_ = this.getSongIdRequestedAtPriority(_loc2_);
            if (param1 == _loc3_) {
                this.playSongObject(_loc2_, param1);
            }
        }
    }

    public addSongInfoRequest(param1: number): void {
        this.requestSong(param1, true);
    }

    public requestSongInfoWithoutSamples(param1: number): void {
        this.requestSong(param1, false);
    }

    public getSongInfo(param1: number): ISongInfo {
        let _loc2_: SongDataEntry = this.getSongDataEntry(param1);
        if (_loc2_ == null) {
            this.requestSongInfoWithoutSamples(param1);
        }
        return _loc2_;
    }

    public requestUserSongDisks(): void {
        if (this._connection == null) {
            return;
        }
        this._connection.send(new GetUserSongDisksMessageComposer());
    }

    public getSongDiskInventorySize(): number {
        return this._SafeStr_2788.length | 0;
    }

    public getSongDiskInventoryDiskId(param1: number): number {
        if (param1 >= 0 && param1 < this._SafeStr_2788.length) {
            return this._SafeStr_2788.getKey(param1) | 0;
        }
        return -1;
    }

    public getSongDiskInventorySongId(param1: number): number {
        if (param1 >= 0 && param1 < this._SafeStr_2788.length) {
            return this._SafeStr_2788.getWithIndex(param1) | 0;
        }
        return -1;
    }

    public getSongIdPlayingAtPriority(param1: number): number {
        if (param1 != this._SafeStr_2476) {
            return -1;
        }
        return this._SafeStr_4451;
    }

    public samplesUnloaded(param1: any[]): void {
        let _loc5_: number = 0;
        let _loc3_: SongDataEntry = null;
        let _loc4_: TraxSequencer = null;
        let _loc2_: any[] = null;
        let _loc6_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2566.length) {
            _loc3_ = asInstanceOf(this._SafeStr_2566.getWithIndex(_loc5_), SongDataEntry);
            _loc4_ = asInstanceOf(_loc3_.soundObject, TraxSequencer);
            if (_loc3_.id != this._SafeStr_4451 && _loc4_ != null && _loc4_.ready) {
                _loc2_ = _loc4_.traxData.getSampleIds();
                _loc6_ = 0;
                while (_loc6_ < param1.length) {
                    if (_loc2_.indexOf(param1[_loc6_]) != -1) {
                        _loc3_.soundObject = null;
                        _loc4_.dispose();
                        HabboMusicController._log.info("Unloaded " + _loc3_.name + " by " + _loc3_.creator);
                    }
                    _loc6_++;
                }
            }
            _loc5_++;
        }
    }

    private addSongStartRequest(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number): boolean {
        if (param1 < 0 || param1 >= 4) {
            return false;
        }
        let _loc7_: SongStartRequestData = new SongStartRequestData(param2, param3, param4, param5, param6);
        this._SafeStr_2742[param1] = _loc7_;
        this._SafeStr_3689[param1] += 1;
        return true;
    }

    private getSongStartRequest(param1: number): SongStartRequestData {
        return this._SafeStr_2742[param1];
    }

    private getSongIdRequestedAtPriority(param1: number): number {
        if (param1 < 0 || param1 >= 4) {
            return -1;
        }
        if (this._SafeStr_2742[param1] == null) {
            return -1;
        }
        let _loc2_: SongStartRequestData = this._SafeStr_2742[param1];
        return _loc2_.songId;
    }

    private getSongRequestCountAtPriority(param1: number): number {
        if (param1 < 0 || param1 >= 4) {
            return -1;
        }
        return this._SafeStr_3689[param1] | 0;
    }

    private getTopRequestPriority(): number {
        let _loc1_: number = 0;
        _loc1_ = this._SafeStr_2742.length - 1;
        while (_loc1_ >= 0) {
            if (this._SafeStr_2742[_loc1_] != null) {
                return _loc1_;
            }
            _loc1_--;
        }
        return -1;
    }

    private resetSongStartRequest(param1: number): void {
        if (param1 >= 0 && param1 < 4) {
            this._SafeStr_2742[param1] = null;
        }
    }

    private reRequestSongAtPriority(param1: number): void {
        let _loc2_: any = param1;
        let _loc3_: any = this._SafeStr_3689[_loc2_] + 1;
        this._SafeStr_3689[_loc2_] = _loc3_;
    }

    private processSongEntryForPlaying(param1: number, param2: boolean = true): boolean {
        let _loc4_: SongDataEntry = this.getSongDataEntry(param1);
        if (_loc4_ == null) {
            this.addSongInfoRequest(param1);
            return false;
        }
        if (_loc4_.soundObject == null) {
            _loc4_.soundObject = this._soundManager.loadTraxSong(_loc4_.id, _loc4_.songData);
        }
        let _loc3_: IHabboSound = _loc4_.soundObject;
        if (!_loc3_.ready) {
            return false;
        }
        return true;
    }

    private playSongWithHighestPriority(): void {
        let _loc2_: any = 0;
        let _loc3_: number = 0;
        this._SafeStr_2476 = -1;
        this._SafeStr_4451 = -1;
        this._SafeStr_5305 = -1;
        let _loc1_: number = this.getTopRequestPriority();
        _loc2_ = _loc1_;
        while (_loc2_ >= 0) {
            _loc3_ = this.getSongIdRequestedAtPriority(_loc2_ | 0);
            if (_loc3_ >= 0 && this.playSongObject(_loc2_ | 0, _loc3_)) {
                return;
            }
            _loc2_--;
        }
    }

    private stopSongAtPriority(param1: number): boolean {
        let _loc3_: number = 0;
        let _loc2_: SongDataEntry = null;
        if (param1 == this._SafeStr_2476 && this._SafeStr_2476 >= 0) {
            _loc3_ = this.getSongIdPlayingAtPriority(param1);
            if (_loc3_ >= 0) {
                _loc2_ = this.getSongDataEntry(_loc3_);
                this.stopSongDataEntry(_loc2_);
                return true;
            }
        }
        return false;
    }

    private stopSongDataEntry(param1: SongDataEntry): void {
        let _loc2_: IHabboSound = null;
        if (param1 != null) {
            HabboMusicController._log.info("Stopping current song " + param1.id);
            _loc2_ = param1.soundObject;
            if (_loc2_ != null) {
                _loc2_.stop();
            }
        }
    }

    private getSongDataEntry(param1: number): SongDataEntry {
        let _loc2_: SongDataEntry = null;
        if (this._SafeStr_2566 != null) {
            _loc2_ = asInstanceOf(this._SafeStr_2566.getValue(param1), SongDataEntry);
        }
        return _loc2_;
    }

    private requestSong(param1: number, param2: boolean): void {
        if (this._SafeStr_3266.getValue(param1) == null) {
            this._SafeStr_3266.add(param1, param2);
            this._SafeStr_3127.push(param1);
        }
    }

    private onSongInfoMessage = (param1: IMessageEvent): void => {
        let _loc8_: number = 0;
        let _loc9_: SongInfoEntry = null;
        let _loc10_: any = false;
        let _loc4_: boolean = false;
        let _loc11_: IHabboSound = null;
        let _loc12_: SongDataEntry = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: TraxSongInfoMessageEvent = param1 instanceof TraxSongInfoMessageEvent ? param1 : null;
        let _loc2_: TraxSongInfoMessageParser = asInstanceOf(_loc3_.getParser(), TraxSongInfoMessageParser);
        let _loc7_: any[] = _loc2_.songs;
        _loc8_ = 0;
        while (_loc8_ < _loc7_.length) {
            _loc9_ = _loc7_[_loc8_];
            _loc10_ = this.getSongDataEntry(_loc9_.id) == null;
            _loc4_ = this.areSamplesRequested(_loc9_.id);
            if (_loc10_) {
                _loc11_ = null;
                if (_loc4_) {
                    _loc11_ = this._soundManager.loadTraxSong(_loc9_.id, _loc9_.data);
                }
                _loc12_ = new SongDataEntry(_loc9_.id, _loc9_.length, _loc9_.name, _loc9_.creator, _loc11_);
                _loc12_.songData = _loc9_.data;
                this._SafeStr_2566.add(_loc9_.id, _loc12_);
                _loc5_ = this.getTopRequestPriority();
                _loc6_ = this.getSongIdRequestedAtPriority(_loc5_);
                if (_loc11_ != null && _loc11_.ready && _loc9_.id == _loc6_) {
                    this.playSongObject(_loc5_, _loc6_);
                }
                this._events.dispatchEvent(new SongInfoReceivedEvent("SIR_TRAX_SONG_INFO_RECEIVED", _loc9_.id));
                while (this._SafeStr_3723.indexOf(_loc9_.id) != -1) {
                    this._SafeStr_3723.splice(this._SafeStr_3723.indexOf(_loc9_.id), 1);
                    if (this._SafeStr_3723.length == 0) {
                        this._events.dispatchEvent(new SongDiskInventoryReceivedEvent("SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT"));
                    }
                }
                HabboMusicController._log.info("Received song info : " + _loc9_.id);
            }
            _loc8_++;
        }
    };

    private playSongObject(param1: number, param2: number): boolean {
        if (param2 == -1 || param1 < 0 || param1 >= 4) {
            return false;
        }
        let _loc6_: boolean = false;
        if (this.stopSongAtPriority(this._SafeStr_2476)) {
            _loc6_ = true;
        }
        let _loc5_: SongDataEntry = this.getSongDataEntry(param2);
        if (_loc5_ == null) {
            HabboMusicController._log.warn("WARNING: Unable to find song entry id " + param2 + " that was supposed to be loaded.");
            return false;
        }
        let _loc3_: IHabboSound = _loc5_.soundObject;
        if (_loc3_ == null || !_loc3_.ready) {
            return false;
        }
        if (_loc6_) {
            HabboMusicController._log.info("Waiting previous song to stop before playing song " + param2);
            return true;
        }
        _loc3_.volume = this._soundManager.traxVolume;
        let _loc9_: number = -1;
        let _loc7_: number = 0;
        let _loc4_: number = 2;
        let _loc8_: number = 1;
        let _loc10_: SongStartRequestData = this.getSongStartRequest(param1);
        if (_loc10_ != null) {
            _loc9_ = _loc10_.startPos;
            _loc7_ = _loc10_.playLength;
            _loc4_ = _loc10_.fadeInSeconds;
            _loc8_ = _loc10_.fadeOutSeconds;
        }
        if (_loc9_ >= _loc5_.length / 1000) {
            return false;
        }
        if (_loc9_ == -1) {
            _loc9_ = 0;
        }
        _loc3_.fadeInSeconds = _loc4_;
        _loc3_.fadeOutSeconds = _loc8_;
        _loc3_.position = _loc9_;
        _loc3_.play(_loc7_);
        this._SafeStr_2476 = param1;
        this._SafeStr_5305 = this.getSongRequestCountAtPriority(param1);
        this._SafeStr_4451 = param2;
        if (this._SafeStr_2476 <= 0) {
            this.notifySongPlaying(_loc5_);
        }
        if (param1 > 0) {
            this._events.dispatchEvent(new NowPlayingEvent("NPE_USER_PLAY_SONG", param1, _loc5_.id, -1));
        }
        HabboMusicController._log.info("Started playing song " + param2 + " at position " + _loc9_ + " for " + _loc7_ + " seconds (length " + _loc5_.length / 1000 + ") with priority " + param1);
        return true;
    }

    private notifySongPlaying(param1: SongDataEntry): void {
        let _loc2_: number = 8000;
        let _loc3_: number = getTimer();
        if (param1.length >= _loc2_ && (this._SafeStr_6604 != param1.id || _loc3_ > this._previousNotificationTime + _loc2_)) {
            this._soundManager.notifyPlayedSong(param1.name, param1.creator);
            this._SafeStr_6604 = param1.id;
            this._previousNotificationTime = _loc3_;
        }
    }

    private areSamplesRequested(param1: number): boolean {
        if (this._SafeStr_3266.getValue(param1) == null) {
            return false;
        }
        return this._SafeStr_3266.getValue(param1);
    }

    private onSongDiskInventoryMessage = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: UserSongDisksInventoryMessageEvent = param1 instanceof UserSongDisksInventoryMessageEvent ? param1 : null;
        let _loc2_: UserSongDisksInventoryMessageParser = asInstanceOf(_loc3_.getParser(), UserSongDisksInventoryMessageParser);
        this._SafeStr_2788.reset();
        _loc4_ = 0;
        while (_loc4_ < _loc2_.songDiskCount) {
            _loc5_ = _loc2_.getDiskId(_loc4_);
            _loc6_ = _loc2_.getSongId(_loc4_);
            this._SafeStr_2788.add(_loc5_, _loc6_);
            if (this._SafeStr_2566.getValue(_loc6_) == null) {
                this._SafeStr_3723.push(_loc6_);
                this.requestSongInfoWithoutSamples(_loc6_);
            }
            _loc4_++;
        }
        if (this._SafeStr_3723.length == 0) {
            this._events.dispatchEvent(new SongDiskInventoryReceivedEvent("SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT"));
        }
    };

    private disposeRoomPlaylist(): void {
        if (this._SafeStr_2820 != null) {
            this._SafeStr_2820.dispose();
            this._SafeStr_2820 = null;
        }
    }

    protected onSongFinishedPlayingEvent = (param1: SoundCompleteEvent): void => {
        let _loc2_: number = 0;
        HabboMusicController._log.info("Song " + param1.id + " finished playing");
        if (this.getSongIdPlayingAtPriority(this._SafeStr_2476) == param1.id) {
            if (this.getTopRequestPriority() == this._SafeStr_2476 && this.getSongRequestCountAtPriority(this._SafeStr_2476) == this._SafeStr_5305) {
                this.resetSongStartRequest(this._SafeStr_2476);
            }
            _loc2_ = this._SafeStr_2476;
            this.playSongWithHighestPriority();
            if (_loc2_ >= 2) {
                this._events.dispatchEvent(new NowPlayingEvent("NPW_USER_STOP_SONG", _loc2_, param1.id, -1));
            }
        }
    };

    private sendNextSongRequestMessage = (param1: TimerEvent): void => {
        if (this._SafeStr_3127.length < 1) {
            return;
        }
        if (this._connection == null) {
            return;
        }
        this._connection.send(new GetSongInfoMessageComposer(this._SafeStr_3127));
        HabboMusicController._log.info("Requested song info\'s : " + this._SafeStr_3127);
        this._SafeStr_3127 = [];
    };

    private onSoundMachineInit = (param1: Event): void => {
        this.disposeRoomPlaylist();
        this._SafeStr_2820 = asGuarded(new SoundMachinePlayListController(this._soundManager, this, this._events, this._roomEvents, this._connection), isIPlayListController);
    };

    private onSoundMachineDispose = (param1: Event): void => {
        this.disposeRoomPlaylist();
    };

    private onJukeboxInit = (param1: Event): void => {
        this.disposeRoomPlaylist();
        this._SafeStr_2820 = asGuarded(new JukeboxPlayListController(this._soundManager, this, this._events, this._connection), isIPlayListController);
        this._connection.send(new GetNowPlayingMessageComposer());
    };

    private onJukeboxDispose = (param1: Event): void => {
        this.disposeRoomPlaylist();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboMusicController.#staticsReady) return;
        HabboMusicController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboMusicController, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.sound.music.HabboMusicController"));
    }

    get [IDisposable](): true {
        return true;
    }
}
