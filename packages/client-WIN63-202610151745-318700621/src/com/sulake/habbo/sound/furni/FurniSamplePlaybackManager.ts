import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomEngineObjectSamplePlaybackEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectSamplePlaybackEvent';
import type { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboSoundWithPitch } from '@/com/sulake/habbo/sound/HabboSoundWithPitch';

export class FurniSamplePlaybackManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.sound.furni::FurniSamplePlaybackManager'); }

    declare private _soundManager: HabboSoundManagerFlash10;

    declare private _roomEvents: IEventDispatcher;

    private _disposed: boolean = false;
    private _loadedSamples: UtilsMap = new UtilsMap();
    private _loadingSamples: UtilsMap = new UtilsMap();
    private _SafeStr_3286: UtilsMap = new UtilsMap();
    private _volume: number = 1;

    constructor(param1: HabboSoundManagerFlash10, param2: IEventDispatcher) {
        this._soundManager = param1;
        this._roomEvents = param2;
        this._roomEvents.addEventListener("REOSPE_ROOM_OBJECT_INITIALIZED", this.onRoomObjectInitializedEvent);
        this._roomEvents.addEventListener("REOSPE_ROOM_OBJECT_DISPOSED", this.onRoomObjectDisposedEvent);
        this._roomEvents.addEventListener("REOSPE_PLAY_SAMPLE", this.onRoomObjectPlaySampleEvent);
        this._roomEvents.addEventListener("REOSPE_CHANGE_PITCH", this.onRoomObjectChangeSamplePitchEvent);
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._roomEvents) {
                this._roomEvents.removeEventListener("REOSPE_ROOM_OBJECT_INITIALIZED", this.onRoomObjectInitializedEvent);
                this._roomEvents.removeEventListener("REOSPE_ROOM_OBJECT_DISPOSED", this.onRoomObjectDisposedEvent);
                this._roomEvents.removeEventListener("REOSPE_PLAY_SAMPLE", this.onRoomObjectPlaySampleEvent);
                this._roomEvents.removeEventListener("REOSPE_CHANGE_PITCH", this.onRoomObjectChangeSamplePitchEvent);
                this._roomEvents = null;
            }
            if (this._loadedSamples) {
                this._loadedSamples.dispose();
                this._loadedSamples = null;
            }
            if (this._loadingSamples) {
                this._loadingSamples.dispose();
                this._loadingSamples = null;
            }
            if (this._SafeStr_3286) {
                this._SafeStr_3286.dispose();
                this._SafeStr_3286 = null;
            }
            this._soundManager = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public updateVolume(param1: number): void {
        this._volume = param1;
        for (const _loc2_ of this._loadedSamples.getValues() ?? []) {
            _loc2_.volume = this._volume;
        }
    }

    private onRoomObjectInitializedEvent = (param1: RoomEngineObjectSamplePlaybackEvent): void => {
        if (param1.sampleId != -1) {
            this.addSampleForFurni(param1.objectId, param1.sampleId);
            if (this._SafeStr_3286.hasKey(param1.objectId)) {
                this._SafeStr_3286.remove(param1.objectId);
            }
            this._SafeStr_3286.add(param1.objectId, param1.pitch);
        }
    };

    private onRoomObjectDisposedEvent = (param1: RoomEngineObjectSamplePlaybackEvent): void => {
        this.removeSampleForFurni(param1.objectId);
    };

    private onRoomObjectPlaySampleEvent = (param1: RoomEngineObjectSamplePlaybackEvent): void => {
        if (this._loadedSamples.getValue(param1.objectId) != null) {
            this.playSample(param1.objectId);
        }
    };

    private onRoomObjectChangeSamplePitchEvent = (param1: RoomEngineObjectSamplePlaybackEvent): void => {
        if (this._loadedSamples.getValue(param1.objectId) != null) {
            this.changeSamplePitch(param1.objectId, param1.pitch);
        }
    };

    private addSampleForFurni(param1: number, param2: number): void {
        if (this._loadedSamples.getValue(param1) == null && this._loadingSamples.getValues().indexOf(param2) == -1) {
            this.loadSample(param2, param1);
        }
    }

    private removeSampleForFurni(param1: number): void {
        let _loc2_: HabboSoundWithPitch = this._loadedSamples.getValue(param1);
        if (_loc2_ != null) {
            this._soundManager.removeUpdateReceiver(_loc2_);
            _loc2_.dispose();
            this._loadedSamples.remove(param1);
        }
    }

    private playSample(param1: number): void {
        let _loc2_: HabboSoundWithPitch = this._loadedSamples.getValue(param1);
        if (_loc2_ != null) {
            _loc2_.stop();
            _loc2_.play();
        }
    }

    private changeSamplePitch(param1: number, param2: number): void {
        let _loc3_: HabboSoundWithPitch = this._loadedSamples.getValue(param1);
        if (_loc3_ != null) {
            _loc3_.setPitch(param2);
        }
    }

    private loadSample(param1: number, param2: number): void {
        let _loc5_: string = this._soundManager.getProperty("flash.dynamic.download.url");
        _loc5_ = _loc5_ + this._soundManager.getProperty("flash.dynamic.download.samples.template");
        _loc5_ = _loc5_.replace(/%typeid%/, param1.toString());
        let _loc3_: URLRequest = new URLRequest(_loc5_);
        let _loc4_: Sound = new Sound();
        _loc4_.addEventListener("complete", this.onSampleLoadComplete);
        _loc4_.addEventListener("ioError", this.ioErrorHandler);
        _loc4_.load(_loc3_);
        this._loadingSamples.add(_loc4_, param2);
    }

    private onSampleLoadComplete = (param1: Event): void => {
        if (this.disposed) {
            return;
        }
        let _loc4_: Sound = asInstanceOf(param1.target, Sound);
        if (_loc4_ == null || this._loadingSamples.getValue(_loc4_) == null) {
            return;
        }
        let _loc3_: number = this._loadingSamples.getValue(_loc4_) | 0;
        let _loc2_: HabboSoundWithPitch = new HabboSoundWithPitch(_loc4_, Number(this._SafeStr_3286.getValue(_loc3_)));
        this._soundManager.registerUpdateReceiver(_loc2_, 0);
        _loc2_.volume = this._volume;
        this._loadedSamples.add(_loc3_, _loc2_);
        this._loadingSamples.remove(_loc4_);
    };

    private ioErrorHandler = (param1: IOErrorEvent): void => {
        Logger.log("Error loading sound " + param1.target + " text " + param1.text);
    };

    get [IDisposable](): true {
        return true;
    }
}
