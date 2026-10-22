import { asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import { AccountPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/preferences/AccountPreferencesEvent';
import { SetSoundSettingsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetSoundSettingsComposer';
import { GetSoundSettingsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/GetSoundSettingsComposer';
import { AccountPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/preferences/AccountPreferencesParser';
import { isIHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import { RoomEngineObjectPlaySoundEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlaySoundEvent';
import { isIRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { TraxSongLoadEvent } from '@/com/sulake/habbo/sound/events/TraxSongLoadEvent';
import { FurniSamplePlaybackManager } from '@/com/sulake/habbo/sound/furni/FurniSamplePlaybackManager';
import { HabboSoundBase } from '@/com/sulake/habbo/sound/HabboSoundBase';
import { HabboSoundWithPitch } from '@/com/sulake/habbo/sound/HabboSoundWithPitch';
import { isIHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import { HabboMusicController } from '@/com/sulake/habbo/sound/music/HabboMusicController';
import { TraxSampleManager } from '@/com/sulake/habbo/sound/music/TraxSampleManager';
import { TraxData } from '@/com/sulake/habbo/sound/trax/TraxData';
import { TraxSequencer } from '@/com/sulake/habbo/sound/trax/TraxSequencer';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboSoundManagerFlash10 extends Component implements IHabboSoundManager, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.sound::HabboSoundManagerFlash10'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboSoundManagerFlash10.#initStatics();
        return HabboSoundManagerFlash10._log;
    }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null, param4: boolean = true) {
        super(param1, param2, param3);
        if (param4) {
            this.queueInterface(new IIDHabboCommunicationManager(), this.onCommunicationManagerReady);
            this.queueInterface(new IIDRoomEngine(), this.onRoomEngineReady);
            this.queueInterface(new IIDHabboNotifications(), this.onNotificationsReady);
        }
        this.events.addEventListener("TSLE_TRAX_LOAD_COMPLETE", this.onTraxLoadComplete);
        this.registerUpdateReceiver(this, 1);
        HabboSoundManagerFlash10._log.info("Sound manager 10 init");
    }

    declare private _communication: IHabboCommunicationManager;

    declare private _connection: IConnection;

    declare private _roomEngine: IRoomEngine;

    declare private _notifications: IHabboNotifications;

    private _genericSamples: UtilsMap = new UtilsMap();
    private _loadingSongId: number = -1;

    declare private _SafeStr_2923: TraxSequencer;

    declare private _musicController: IHabboMusicController;

    declare private _SafeStr_2992: TraxSampleManager;

    declare private _SafeStr_3815: FurniSamplePlaybackManager;

    private _SafeStr_4526: UtilsMap = new UtilsMap();
    private _SafeStr_6103: boolean = false;
    private _SafeStr_3441: UtilsMap = new UtilsMap();
    private _genericVolume: number = 0;

    public get genericVolume(): number {
        return this._genericVolume;
    }

    public set genericVolume(param1: number) {
        this.updateVolumeSetting(param1, this._furniVolume, this._traxVolume);
        this.storeVolumeSetting();
    }

    private _traxVolume: number = 1;

    public get traxVolume(): number {
        return this._traxVolume;
    }

    public set traxVolume(param1: number) {
        this.updateVolumeSetting(this._genericVolume, this._furniVolume, param1);
        this.storeVolumeSetting();
    }

    private _furniVolume: number = 1;

    public get furniVolume(): number {
        return this._furniVolume;
    }

    public set furniVolume(param1: number) {
        this.updateVolumeSetting(this._genericVolume, param1, this._traxVolume);
        this.storeVolumeSetting();
    }

    public get musicController(): IHabboMusicController {
        return this._musicController;
    }

    public get loadingSongId(): number {
        return this._loadingSongId;
    }

    public override dispose(): void {
        this._connection = null;
        if (this._musicController) {
            this._musicController.dispose();
            this._musicController = null;
        }
        if (this._SafeStr_2992) {
            this._SafeStr_2992.dispose();
            this._SafeStr_2992 = null;
        }
        if (this._genericSamples) {
            this._genericSamples.dispose();
            this._genericSamples = null;
        }
        if (this._SafeStr_3441) {
            this._SafeStr_3441.dispose();
            this._SafeStr_3441 = null;
        }
        if (this._SafeStr_3815) {
            this._SafeStr_3815.dispose();
            this._SafeStr_3815 = null;
        }
        if (this._communication) {
            this._communication.release(new IIDHabboCommunicationManager());
            this._communication = null;
        }
        if (this._roomEngine) {
            this._roomEngine.events.removeEventListener("REPSE_PLAY_SOUND", this.onRoomEngineObjectPlaySound);
            this._roomEngine.events.removeEventListener("REPSE_PLAY_SOUND_AT_PITCH", this.onRoomEngineObjectPlaySound);
            this._roomEngine.release(new IIDRoomEngine());
            this._roomEngine = null;
        }
        if (this._notifications) {
            this._notifications.release(new IIDHabboNotifications());
            this._notifications = null;
        }
        super.dispose();
    }

    public previewVolume(param1: number, param2: number, param3: number): void {
        this.updateVolumeSetting(param1, param2, param3);
    }

    public playSound(param1: string, param2: number = 0): void {
        let _loc5_: number = 0;
        let _loc7_: Sound = null;
        let _loc6_: number = getTimer();
        let _loc3_: any = this._SafeStr_3441.getValue(param1);
        if (_loc3_ != null) {
            _loc5_ = _loc3_ | 0;
            if (_loc6_ - _loc5_ <= 200) {
                return;
            }
        }
        let _loc4_: IHabboSound = this._genericSamples.getValue(param1);
        if (_loc4_ == null) {
            _loc7_ = this.getSoundBySoundId(param1);
            if (_loc7_ != null) {
                _loc4_ = new HabboSoundBase(_loc7_, param2);
                this._genericSamples.add(param1, _loc4_);
            }
        }
        _loc4_.volume = this._genericVolume;
        this._SafeStr_3441.remove(param1);
        this._SafeStr_3441.add(param1, _loc6_);
        _loc4_.play();
    }

    public playSoundAtPitch(param1: string, param2: number): IHabboSound {
        let _loc4_: Sound = this.getSoundBySoundId(param1);
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: HabboSoundWithPitch = new HabboSoundWithPitch(_loc4_, param2);
        _loc3_.volume = this._genericVolume;
        _loc3_.play();
        return _loc3_;
    }

    public stopSound(param1: string): void {
        let _loc2_: IHabboSound = this._genericSamples.getValue(param1);
        if (_loc2_ != null) {
            _loc2_.stop();
        }
    }

    public loadTraxSong(param1: number, param2: string): IHabboSound {
        if (this._SafeStr_2923 != null) {
            return this.addTraxSongForDownload(param1, param2);
        }
        let _loc3_: TraxSequencer = this.createTraxInstance(param1, param2);
        if (!_loc3_.ready) {
            this._SafeStr_2923 = _loc3_;
            this._loadingSongId = param1;
        }
        return isIHabboSound(_loc3_) ? _loc3_ : null;
    }

    public notifyPlayedSong(param1: string, param2: string): void {
        if (this._notifications == null) {
            return;
        }
        this._notifications.addSongPlayingNotification(param1, param2);
    }

    public update(param1: number): void {
        if (this._SafeStr_2992 != null) {
            this._SafeStr_2992.update(param1);
        }
        this.loadNextSong();
    }

    public mute(param1: boolean): void {
        this._SafeStr_6103 = param1;
        this.updateVolumeSetting(this._genericVolume, this._furniVolume, this._traxVolume);
    }

    protected setMusicController(param1: IHabboMusicController): void {
        this._musicController = param1;
    }

    private onSampleLoadError = (): void => {
        this._loadingSongId = -1;
        this._SafeStr_2923 = null;
    };

    private getSoundBySoundId(param1: string): Sound {
        let _loc2_: any = "";
        switch (param1) {
            case "HBST_call_for_help":
                _loc2_ = "sound_call_for_help";
                break;
            case "HBST_guide_invitation":
                _loc2_ = "sound_guide_received_invitation";
                break;
            case "HBST_guide_request":
                _loc2_ = "sound_guide_help_requested";
                break;
            case "HBST_message_received":
                _loc2_ = "sound_console_new_message";
                break;
            case "HBST_message_sent":
                _loc2_ = "sound_console_message_sent";
                break;
            case "HBST_pixels":
                _loc2_ = "sound_catalogue_duckets";
                break;
            case "HBST_purchase":
                _loc2_ = "sound_catalogue_cash";
                break;
            case "HBST_respect":
                _loc2_ = "sound_respect_received";
                break;
            case "CAMERA_shutter":
                _loc2_ = "sound_camera_shutter";
                break;
            case "HBSTG_snowwar_get_snowball":
            case "HBSTG_snowwar_hit1":
            case "HBSTG_snowwar_hit2":
            case "HBSTG_snowwar_hit3":
            case "HBSTG_snowwar_make_snowball":
            case "HBSTG_snowwar_miss":
            case "HBSTG_snowwar_throw":
            case "HBSTG_snowwar_walk":
            case "HBSTG_ig_countdown":
            case "HBSTG_ig_winning":
            case "HBSTG_ig_losing":
                _loc2_ = param1;
                break;
            case "FURNITURE_cuckoo_clock":
                _loc2_ = param1;
                break;
            default:
                HabboSoundManagerFlash10._log.warn("Unknown sound request: " + param1);
                return null;
        }
        return this.getSoundByAssetName(stringOrNull(_loc2_));
    }

    private getSoundByAssetName(param1: string): Sound {
        let _loc2_: IAsset = this.assets.getAssetByName(param1);
        return asInstanceOf(_loc2_.content, Sound);
    }

    private addTraxSongForDownload(param1: number, param2: string): IHabboSound {
        let _loc3_: TraxSequencer = this.createTraxInstance(param1, param2, false);
        if (!_loc3_.ready) {
            this._SafeStr_4526.add(param1, _loc3_);
        }
        return _loc3_;
    }

    private createTraxInstance(param1: number, param2: string, param3: boolean = true): TraxSequencer {
        let _loc5_: TraxData = new TraxData(param2);
        let _loc4_: TraxSequencer = new TraxSequencer(param1, _loc5_, this._SafeStr_2992.traxSamples, this.events);
        _loc4_.volume = this._genericVolume;
        this.validateSampleAvailability(_loc4_, param3);
        return _loc4_;
    }

    private validateSampleAvailability(param1: TraxSequencer, param2: boolean): void {
        let _loc4_: number = 0;
        let _loc6_: TraxData = param1.traxData;
        let _loc5_: any[] = _loc6_.getSampleIds();
        let _loc3_: boolean = false;
        _loc4_ = 0;
        while (_loc4_ < _loc5_.length) {
            if (this._SafeStr_2992.traxSamples.getValue(_loc5_[_loc4_] | 0) == null) {
                if (param2) {
                    this._SafeStr_2992.loadSample(_loc5_[_loc4_] | 0);
                }
                _loc3_ = true;
            }
            _loc4_++;
        }
        if (_loc3_) {
            param1.ready = false;
        } else {
            param1.ready = true;
        }
    }

    private onCommunicationManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        let _loc3_: IConnection = null;
        if (param2 != null) {
            this._communication = castGuarded(param2, isIHabboCommunicationManager, "com.sulake.habbo.communication.IHabboCommunicationManager");
            _loc3_ = this._communication.connection;
            if (_loc3_ != null) {
                this.onConnectionReady(_loc3_);
                this.init();
            }
        }
    };

    private onRoomEngineReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (param2 == null) {
            return;
        }
        this._roomEngine = castGuarded(param2, isIRoomEngine, "com.sulake.habbo.room.IRoomEngine");
        this.init();
    };

    private onNotificationsReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (param2 == null) {
            return;
        }
        this._notifications = castGuarded(param2, isIHabboNotifications, "com.sulake.habbo.notifications.IHabboNotifications");
    };

    private onConnectionReady(param1: IConnection): void {
        if (this.disposed) {
            return;
        }
        if (param1 != null) {
            this._connection = param1;
        }
        this.init();
    }

    private init(): void {
        if (this._connection == null || this._roomEngine == null || this._musicController != null) {
            return;
        }
        this._musicController = new HabboMusicController(this, this.events, this._roomEngine.events, this._connection);
        this._SafeStr_2992 = new TraxSampleManager(this, this.onSampleLoadError);
        this._SafeStr_3815 = new FurniSamplePlaybackManager(this, this._roomEngine.events);
        this._roomEngine.events.addEventListener("REPSE_PLAY_SOUND", this.onRoomEngineObjectPlaySound);
        this._roomEngine.events.addEventListener("REPSE_PLAY_SOUND_AT_PITCH", this.onRoomEngineObjectPlaySound);
        this._connection.addMessageEvent(new AccountPreferencesEvent(this.onSoundSettingsEvent));
        this._connection.send(new GetSoundSettingsComposer());
    }

    private storeVolumeSetting(): void {
        if (this._connection != null) {
            this._connection.send(new SetSoundSettingsComposer(this._traxVolume * 100 | 0, this._furniVolume * 100 | 0, this._genericVolume * 100 | 0));
        }
    }

    private updateVolumeSetting(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_6103) {
            this._genericVolume = 0;
            this._furniVolume = 0;
            this._traxVolume = 0;
            this._musicController.updateVolume(0);
            this._SafeStr_3815.updateVolume(0);
        } else {
            this._genericVolume = param1;
            this._furniVolume = param2;
            this._traxVolume = param3;
            this._musicController.updateVolume(param3);
            this._SafeStr_3815.updateVolume(param2);
        }
    }

    private onSoundSettingsEvent = (param1: IMessageEvent): void => {
        let _loc3_: AccountPreferencesEvent = param1 instanceof AccountPreferencesEvent ? param1 : null;
        let _loc2_: AccountPreferencesParser = asInstanceOf(_loc3_.getParser(), AccountPreferencesParser);
        let _loc4_: number = _loc2_.uiVolume;
        if (_loc4_ == 1) {
            _loc4_ = 100;
        }
        this.updateVolumeSetting(_loc4_ / 100, _loc2_.furniVolume / 100, _loc2_.traxVolume / 100);
    };

    private loadNextSong(): void {
        let _loc2_: number = 0;
        let _loc1_: TraxSequencer = null;
        if (this._SafeStr_2923 == null && this._SafeStr_4526.length > 0) {
            _loc2_ = this._SafeStr_4526.getKey(0) | 0;
            _loc1_ = this._SafeStr_4526.remove(_loc2_);
            if (_loc1_ != null && !_loc1_.disposed) {
                this.validateSampleAvailability(_loc1_, true);
                if (_loc1_.ready) {
                    this.events.dispatchEvent(new TraxSongLoadEvent("TSLE_TRAX_LOAD_COMPLETE", _loc2_));
                } else {
                    this._SafeStr_2923 = _loc1_;
                    this._loadingSongId = _loc2_;
                }
            }
        }
    }

    private onTraxLoadComplete = (param1: Event): void => {
        let _loc2_: TraxSongLoadEvent = param1 instanceof TraxSongLoadEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_2923 == null) {
            return;
        }
        this._SafeStr_2923.ready = true;
        if (this._musicController == null) {
            return;
        }
        this._musicController.onSongLoaded(_loc2_.id);
        this._SafeStr_2923 = null;
        this._loadingSongId = -1;
    };

    private onRoomEngineObjectPlaySound = (param1: Event): void => {
        let _loc2_: RoomEngineObjectPlaySoundEvent = castTo(param1, RoomEngineObjectPlaySoundEvent);
        if (param1.type == "REPSE_PLAY_SOUND") {
            this.playSound(_loc2_.soundId);
        }
        if (param1.type == "REPSE_PLAY_SOUND_AT_PITCH") {
            this.playSoundAtPitch(_loc2_.soundId, _loc2_.pitch);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboSoundManagerFlash10.#staticsReady) return;
        HabboSoundManagerFlash10.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboSoundManagerFlash10, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.sound.HabboSoundManagerFlash10"));
    }

    get [IHabboSoundManager](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
