import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';
import { TraxSongLoadEvent } from '@/com/sulake/habbo/sound/events/TraxSongLoadEvent';
import { TraxSample } from '@/com/sulake/habbo/sound/trax/TraxSample';

export class TraxSampleManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.sound.music::TraxSampleManager'); }

    private static readonly SAMPLE_PROCESS_LIMIT_MS: number = 60;
    private static readonly SAMPLE_LENGTH_MEMORY_LIMIT: number = 25165823;
    private static readonly SAMPLE_LENGTH_PURGE_TO: number = 16777215;

    declare private _soundManager: HabboSoundManagerFlash10;

    private _loadingSamples: UtilsMap = new UtilsMap();
    private _loadedSamples: any[] = [];
    private _traxSamples: UtilsMap = new UtilsMap();
    private _SafeStr_4242: ByteArray = new ByteArray();

    declare private _loadErrorCallback: (...args: any[]) => any;

    private _SafeStr_7115: boolean = false;
    private _disposed: boolean = false;

    constructor(param1: HabboSoundManagerFlash10, param2: (...args: any[]) => any) {
        this._loadErrorCallback = param2;
        this._soundManager = param1;
        if (this._soundManager.getBoolean("trax.player.sample.memory.purge.enabled")) {
            this._SafeStr_7115 = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_4242 = null;
            this._loadedSamples = null;
            if (this._traxSamples != null) {
                this._traxSamples.dispose();
                this._traxSamples = null;
            }
            if (this._loadingSamples != null) {
                this._loadingSamples.dispose();
                this._loadingSamples = null;
            }
            this._soundManager = null;
            this._disposed = true;
        }
    }

    public get traxSamples(): UtilsMap {
        return this._traxSamples;
    }

    public loadSample(param1: number): void {
        let _loc4_: string = this._soundManager.getProperty("flash.dynamic.download.url");
        _loc4_ = _loc4_ + this._soundManager.getProperty("flash.dynamic.download.samples.template");
        _loc4_ = _loc4_.replace(/%typeid%/, param1.toString());
        let _loc2_: URLRequest = new URLRequest(_loc4_);
        let _loc3_: Sound = new Sound();
        _loc3_.addEventListener("complete", this.onSampleLoadComplete);
        _loc3_.addEventListener("ioError", this.ioErrorHandler);
        _loc3_.load(_loc2_);
        this._loadingSamples.add(_loc3_, param1);
    }

    public update(param1: number): void {
        this.processLoadedSamples();
    }

    private onSampleLoadComplete = (param1: Event): void => {
        let _loc2_: Sound = asInstanceOf(param1.target, Sound);
        this._loadedSamples.push(_loc2_);
    };

    private ioErrorHandler = (param1: Event): void => {
        this._soundManager.events.dispatchEvent(new TraxSongLoadEvent("TSLE_TRAX_LOAD_FAILED", this._soundManager.loadingSongId));
        this._loadErrorCallback();
    };

    private processLoadedSample(param1: Sound): void {
        let _loc3_: number = 0;
        let _loc4_: number = NaN;
        let _loc2_: TraxSample = null;
        if (this._loadingSamples.getValue(param1) != null) {
            _loc3_ = this._loadingSamples.remove(param1) | 0;
            if (this._traxSamples.getValue(_loc3_) == null) {
                this._SafeStr_4242.clear();
                _loc4_ = param1.length;
                param1.extract(this._SafeStr_4242, _loc4_ * 44.1 | 0);
                _loc2_ = new TraxSample(this._SafeStr_4242, _loc3_, "sample_44khz", "sample_16bit");
                this._traxSamples.add(_loc3_, _loc2_);
            }
        }
    }

    private processLoadedSamples(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: Sound = null;
        if (this._loadedSamples.length > 0) {
            _loc3_ = getTimer();
            _loc1_ = _loc3_;
            while (_loc1_ - _loc3_ < 60 && this._loadedSamples.length > 0) {
                _loc2_ = this._loadedSamples.splice(0, 1)[0];
                this.processLoadedSample(_loc2_);
                _loc1_ = getTimer();
            }
            if (this._loadingSamples.length == 0 && this._soundManager.loadingSongId != -1) {
                this._soundManager.events.dispatchEvent(new TraxSongLoadEvent("TSLE_TRAX_LOAD_COMPLETE", this._soundManager.loadingSongId));
                if (this._SafeStr_7115) {
                    this.processSampleMemoryUsage();
                }
            }
        }
    }

    private logSampleUsage(): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: any = null;
    }

    private processSampleMemoryUsage(): void {
        let _loc8_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: TraxSample = null;
        let _loc3_: any[] = null;
        let _loc6_: any = 0;
        let _loc9_: number = 0;
        let _loc12_: TraxSample = null;
        let _loc2_: TraxSample = null;
        let _loc10_: number = 0;
        let _loc7_: any[] = [];
        let _loc1_: any[] = this._soundManager.musicController.samplesIdsInUse;
        _loc8_ = 0;
        while (_loc8_ < this._traxSamples.length) {
            _loc4_ = this._traxSamples.getKey(_loc8_) | 0;
            _loc5_ = this._traxSamples.getWithIndex(_loc8_);
            if (_loc5_.usageCount != 0 && _loc1_.indexOf(_loc4_) == -1) {
                _loc7_.push(_loc5_);
            }
            _loc10_ += _loc5_.length;
            _loc8_++;
        }
        if (_loc10_ > 25165823) {
            _loc3_ = [];
            Logger.log("Sample memory limit reached, clearing the oldest and least frequently used samples");
            _loc7_.sort(this.orderUsageAndTimeStamp);
            _loc6_ = 0;
            _loc9_ = 0;
            while (_loc6_ < _loc10_ - 16777215 && _loc9_ < _loc7_.length) {
                _loc12_ = _loc7_[_loc9_++];
                _loc6_ += _loc12_.length;
                _loc3_.push(_loc12_.id);
            }
            _loc7_ = null;
            if (_loc3_.length > 0) {
                for (const _loc11_ of _loc3_ ?? []) {
                    Logger.log("Purging sample : " + _loc11_);
                    _loc2_ = asInstanceOf(this._traxSamples.getValue(_loc11_), TraxSample);
                    _loc2_.dispose();
                    this._traxSamples.remove(_loc11_);
                }
                this._soundManager.musicController.samplesUnloaded(_loc3_);
            }
        }
    }

    private orderUsageAndTimeStamp = (param1: TraxSample, param2: TraxSample): number => {
        if (param1.usageCount < param2.usageCount) {
            return -1;
        }
        if (param1.usageCount > param2.usageCount) {
            return 1;
        }
        if (param1.usageTimeStamp < param2.usageTimeStamp) {
            return -1;
        }
        if (param1.usageTimeStamp > param2.usageTimeStamp) {
            return 1;
        }
        return 0;
    };

    get [IDisposable](): true {
        return true;
    }
}
