import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TraxData } from '@/com/sulake/habbo/sound/trax/TraxData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { SampleDataEvent } from '@habbo-pixi/runtime/events/SampleDataEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import type { SoundChannel } from '@habbo-pixi/runtime/media/SoundChannel';
import { SoundTransform } from '@habbo-pixi/runtime/media/SoundTransform';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SoundCompleteEvent } from '@/com/sulake/habbo/sound/events/SoundCompleteEvent';
import { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';
import { TraxChannel } from '@/com/sulake/habbo/sound/trax/TraxChannel';
import { TraxChannelSample } from '@/com/sulake/habbo/sound/trax/TraxChannelSample';
import { TraxSample } from '@/com/sulake/habbo/sound/trax/TraxSample';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class TraxSequencer implements IHabboSound, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxSequencer'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        TraxSequencer.#initStatics();
        return TraxSequencer._log;
    }

    private static readonly SAMPLES_PER_SECOND: number = 44100;
    private static readonly BUFFER_LENGTH: number = 8192;
    private static readonly SAMPLES_BAR_LENGTH: number = 88000;
    private static readonly BAR_LENGTH: number = 88000;
    private static readonly SAMPLES_PER_BAR: number = 88200;
    private static readonly ROUND_UP_THRESHOLD_BIAS: number = 0.875;
    private static readonly MIXING_BUFFER: number[] = new Array<number>(8192).fill(0);
    private static readonly INTERPOLATION_BUFFER: number[] = new Array<number>(8192).fill(0);

    constructor(param1: number, param2: TraxData, param3: UtilsMap, param4: IEventDispatcher) {
        this._events = param4;
        this._SafeStr_4873 = param1;
        this._volume = 1;
        this._sound = new Sound();
        this._SafeStr_2798 = null;
        this._samples = param3;
        this._traxData = param2;
        this._SafeStr_3794 = true;
        this._SafeStr_2456 = 0;
        this._SafeStr_2642 = [];
        this._SafeStr_4061 = false;
        this._lengthSamples = 0;
        this._finished = false;
        this._SafeStr_3299 = false;
        this._SafeStr_3070 = false;
        this._fadeInLengthSamples = 0;
        this._fadeOutLengthSamples = 0;
        this._SafeStr_3458 = 0;
        this._SafeStr_2611 = 0;
    }

    declare private _events: IEventDispatcher;

    declare private _sound: Sound;

    declare private _SafeStr_2798: SoundChannel;

    declare private _traxData: TraxData;

    declare private _samples: UtilsMap;

    declare private _SafeStr_3794: boolean;
    static { (this.prototype as any)._SafeStr_3794 = false; }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    private _playLengthSamples: number = 0;

    declare private _SafeStr_2456: number;
    static { (this.prototype as any)._SafeStr_2456 = 0; }

    declare private _SafeStr_2642: any[];

    declare private _SafeStr_4061: boolean;
    static { (this.prototype as any)._SafeStr_4061 = false; }

    private _finished: boolean = true;

    declare private _lengthSamples: number;
    static { (this.prototype as any)._lengthSamples = 0; }

    private _SafeStr_5854: number = 30;

    declare private _SafeStr_3299: boolean;
    static { (this.prototype as any)._SafeStr_3299 = false; }

    declare private _SafeStr_3070: boolean;
    static { (this.prototype as any)._SafeStr_3070 = false; }

    declare private _fadeInLengthSamples: number;
    static { (this.prototype as any)._fadeInLengthSamples = 0; }

    declare private _fadeOutLengthSamples: number;
    static { (this.prototype as any)._fadeOutLengthSamples = 0; }

    declare private _SafeStr_3458: number;
    static { (this.prototype as any)._SafeStr_3458 = 0; }

    declare private _SafeStr_2611: number;
    static { (this.prototype as any)._SafeStr_2611 = 0; }

    declare private _SafeStr_3153: Timer;

    declare private _SafeStr_2875: Timer;

    declare private _useCutMode: boolean;
    static { (this.prototype as any)._useCutMode = false; }

    private _SafeStr_3744: number = 0;
    private _SafeStr_5070: number = 0;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _volume: number;
    static { (this.prototype as any)._volume = NaN; }

    public get volume(): number {
        return this._volume;
    }

    public set volume(param1: number) {
        this._volume = param1;
        if (this._SafeStr_2798 != null) {
            this._SafeStr_2798.soundTransform = new SoundTransform(this._volume);
        }
    }

    public get position(): number {
        return this._SafeStr_2456 / 44100;
    }

    public set position(param1: number) {
        this._SafeStr_2456 = param1 * 44100 >>> 0;
    }

    public get ready(): boolean {
        return this._SafeStr_3794;
    }

    public set ready(param1: boolean) {
        this._SafeStr_3794 = param1;
    }

    public get finished(): boolean {
        return this._finished;
    }

    public get fadeOutSeconds(): number {
        return this._fadeOutLengthSamples / 44100;
    }

    public set fadeOutSeconds(param1: number) {
        this._fadeOutLengthSamples = param1 * 44100 | 0;
    }

    public get fadeInSeconds(): number {
        return this._fadeInLengthSamples / 44100;
    }

    public set fadeInSeconds(param1: number) {
        this._fadeInLengthSamples = param1 * 44100 | 0;
    }

    public get traxData(): TraxData {
        return this._traxData;
    }

    public get length(): number {
        return this._lengthSamples / 44100;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.stopImmediately();
            this._traxData = null;
            this._samples = null;
            this._SafeStr_2642 = null;
            this._events = null;
            this._sound = null;
            this._disposed = true;
        }
    }

    public prepare(): boolean {
        if (!this._SafeStr_3794) {
            TraxSequencer._log.warn("Cannot start trax playback until samples ready!");
            return false;
        }
        if (!this._SafeStr_4061) {
            if (this._traxData != null) {
                this._useCutMode = false;
                if (this._traxData.hasMetaData) {
                    this._useCutMode = this._traxData.metaCutMode;
                }
                if (this._useCutMode) {
                    if (!this.prepareSequence()) {
                        TraxSequencer._log.warn("Cannot start playback, prepare sequence failed!");
                        return false;
                    }
                } else if (!this.prepareLegacySequence()) {
                    TraxSequencer._log.warn("Cannot start playback, prepare legacy sequence failed!");
                    return false;
                }
            }
        }
        return true;
    }

    public play(param1: number = 0): boolean {
        if (!this.prepare()) {
            return false;
        }
        this.removeFadeoutStopTimer();
        if (this._SafeStr_2798 != null) {
            this.stopImmediately();
        }
        if (this._fadeInLengthSamples > 0) {
            this._SafeStr_3299 = true;
            this._SafeStr_3458 = 0;
        }
        this._SafeStr_3070 = false;
        this._SafeStr_2611 = 0;
        this._finished = false;
        this._sound.addEventListener("sampleData", this.onSampleData);
        this._playLengthSamples = param1 * 44100 | 0;
        this._SafeStr_3744 = 0;
        this._SafeStr_5070 = 0;
        this._SafeStr_2798 = this._sound.play();
        this.volume = this._volume;
        return true;
    }

    public stop(): boolean {
        if (this._fadeOutLengthSamples > 0 && !this._finished) {
            this.stopWithFadeout();
        } else {
            this.playingComplete();
        }
        return true;
    }

    private prepareLegacySequence(): boolean {
        let _loc8_: number = 0;
        let _loc3_: UtilsMap = null;
        let _loc7_: TraxChannel = null;
        let _loc4_: any = 0;
        let _loc2_: any = 0;
        let _loc9_: number = 0;
        let _loc5_: number = 0;
        let _loc12_: TraxSample = null;
        let _loc11_: number = 0;
        let _loc6_: number = 0;
        let _loc10_: number = 0;
        if (this._SafeStr_2642 == null) {
            return false;
        }
        let _loc1_: number = getTimer() >>> 0;
        _loc8_ = 0;
        while (_loc8_ < this._traxData.channels.length) {
            _loc3_ = new UtilsMap();
            _loc7_ = asInstanceOf(this._traxData.channels[_loc8_], TraxChannel);
            _loc4_ = 0;
            _loc2_ = 0;
            _loc9_ = 0;
            while (_loc9_ < _loc7_.itemCount) {
                _loc5_ = _loc7_.getItem(_loc9_).id;
                _loc12_ = asInstanceOf(this._samples.getValue(_loc5_), TraxSample);
                _loc12_.setUsageFromSong(this._SafeStr_4873, _loc1_);
                if (_loc12_ == null) {
                    TraxSequencer._log.error("Error in prepareLegacySequence(), sample was null!");
                    return false;
                }
                _loc11_ = this.getSampleBars(_loc12_.length);
                _loc6_ = _loc7_.getItem(_loc9_).length / _loc11_ | 0;
                _loc10_ = 0;
                while (_loc10_ < _loc6_) {
                    if (_loc5_ != 0) {
                        _loc3_.add(_loc4_, _loc12_);
                    }
                    _loc2_ += _loc11_;
                    _loc4_ = _loc2_ * 88000;
                    _loc10_++;
                }
                if (this._lengthSamples < _loc4_) {
                    this._lengthSamples = _loc4_ >>> 0;
                }
                _loc9_++;
            }
            this._SafeStr_2642.push(_loc3_);
            _loc8_++;
        }
        this._SafeStr_4061 = true;
        return true;
    }

    private prepareSequence(): boolean {
        let _loc6_: number = 0;
        let _loc12_: UtilsMap = null;
        let _loc5_: TraxChannel = null;
        let _loc2_: any = 0;
        let _loc11_: any = 0;
        let _loc13_: boolean = false;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        let _loc9_: TraxSample = null;
        let _loc3_: number = 0;
        let _loc14_: number = 0;
        let _loc8_: number = 0;
        let _loc1_: number = 0;
        if (this._SafeStr_2642 == null) {
            return false;
        }
        let _loc10_: number = getTimer() >>> 0;
        _loc6_ = 0;
        while (_loc6_ < this._traxData.channels.length) {
            _loc12_ = new UtilsMap();
            _loc5_ = asInstanceOf(this._traxData.channels[_loc6_], TraxChannel);
            _loc2_ = 0;
            _loc11_ = 0;
            _loc13_ = false;
            _loc7_ = 0;
            while (_loc7_ < _loc5_.itemCount) {
                _loc4_ = _loc5_.getItem(_loc7_).id;
                _loc9_ = asInstanceOf(this._samples.getValue(_loc4_), TraxSample);
                _loc9_.setUsageFromSong(this._SafeStr_4873, _loc10_);
                if (_loc9_ == null) {
                    TraxSequencer._log.error("Error in prepareSequence(), sample was null!");
                    return false;
                }
                _loc3_ = _loc11_ | 0;
                _loc14_ = _loc2_ | 0;
                _loc8_ = this.getSampleBars(_loc9_.length);
                _loc1_ = _loc5_.getItem(_loc7_).length;
                while (_loc3_ < _loc11_ + _loc1_) {
                    if (_loc4_ != 0 || _loc13_) {
                        _loc12_.add(_loc14_, _loc9_);
                        _loc13_ = false;
                    }
                    _loc3_ += _loc8_;
                    _loc14_ = _loc3_ * 88000;
                    if (_loc3_ > _loc11_ + _loc1_) {
                        _loc13_ = true;
                    }
                }
                _loc11_ += _loc5_.getItem(_loc7_).length;
                _loc2_ = _loc11_ * 88000;
                if (this._lengthSamples < _loc2_) {
                    this._lengthSamples = _loc2_ >>> 0;
                }
                _loc7_++;
            }
            this._SafeStr_2642.push(_loc12_);
            _loc6_++;
        }
        this._SafeStr_4061 = true;
        return true;
    }

    private stopImmediately(): void {
        this.removeStopTimer();
        if (this._SafeStr_2798 != null) {
            this._SafeStr_2798.stop();
            this._SafeStr_2798 = null;
        }
        if (this._sound != null) {
            this._sound.removeEventListener("sampleData", this.onSampleData);
        }
    }

    private stopWithFadeout(): void {
        if (this._SafeStr_3153 == null) {
            this._SafeStr_3070 = true;
            this._SafeStr_2611 = 0;
            this._SafeStr_3153 = new Timer(this._SafeStr_5854 + this._fadeOutLengthSamples / (44100 / 1000), 1);
            this._SafeStr_3153.start();
            this._SafeStr_3153.addEventListener("timerComplete", this.onFadeOutComplete);
        }
    }

    private getSampleBars(param1: number): number {
        let _loc2_: number = param1 / 88200;
        if (this._useCutMode) {
            return Math.round(_loc2_) | 0;
        }
        return Math.floor(_loc2_ + 0.875) | 0;
    }

    private getChannelSequenceOffsets(): any[] {
        let _loc1_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: UtilsMap = null;
        let _loc4_: number = 0;
        let _loc2_: any[] = [];
        if (this._SafeStr_2642 != null) {
            _loc1_ = this._SafeStr_2642.length | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc1_) {
                _loc5_ = this._SafeStr_2642[_loc3_];
                _loc4_ = 0;
                while (_loc4_ < _loc5_.length && _loc5_.getKey(_loc4_) < this._SafeStr_2456) {
                    _loc4_++;
                }
                _loc2_.push(_loc4_ - 1);
                _loc3_++;
            }
        }
        return _loc2_;
    }

    private mixChannelsIntoBuffer(): void {
        let _loc6_: number = 0;
        let _loc7_: UtilsMap = null;
        let _loc14_: number = 0;
        let _loc8_: TraxSample = null;
        let _loc2_: number = 0;
        let _loc5_: number = 0;
        let _loc13_: number = 0;
        let _loc11_: number = 0;
        let _loc3_: any = 0;
        let _loc10_: number = 0;
        let _loc9_: number = 0;
        if (this._SafeStr_2642 == null) {
            return;
        }
        let _loc4_: any[] = this.getChannelSequenceOffsets();
        let _loc1_: number = this._SafeStr_2642.length | 0;
        let _loc12_: TraxChannelSample = null;
        _loc6_ = _loc1_ - 1;
        while (_loc6_ >= 0) {
            _loc7_ = this._SafeStr_2642[_loc6_];
            _loc14_ = _loc4_[_loc6_] | 0;
            _loc8_ = _loc7_.getWithIndex(_loc14_);
            if (_loc8_ == null) {
                _loc12_ = null;
            } else {
                _loc2_ = _loc7_.getKey(_loc14_) | 0;
                _loc5_ = this._SafeStr_2456 - _loc2_;
                if (_loc8_.id == 0 || _loc5_ < 0) {
                    _loc12_ = null;
                } else {
                    _loc12_ = new TraxChannelSample(_loc8_, _loc5_);
                }
            }
            _loc13_ = 8192;
            if (this._lengthSamples - this._SafeStr_2456 < _loc13_) {
                _loc13_ = this._lengthSamples - this._SafeStr_2456;
            }
            _loc11_ = 0;
            while (_loc11_ < _loc13_) {
                _loc3_ = _loc13_;
                if (_loc14_ < _loc7_.length - 1) {
                    _loc10_ = _loc7_.getKey(_loc14_ + 1) | 0;
                    if (_loc13_ + this._SafeStr_2456 >= _loc10_) {
                        _loc3_ = _loc10_ - this._SafeStr_2456;
                    }
                }
                if (_loc3_ > _loc13_ - _loc11_) {
                    _loc3_ = _loc13_ - _loc11_;
                }
                if (_loc6_ == _loc1_ - 1) {
                    if (_loc12_ != null) {
                        _loc12_.setSample(TraxSequencer.MIXING_BUFFER, _loc11_, _loc3_ | 0);
                        _loc11_ = _loc11_ + _loc3_ | 0;
                    } else {
                        _loc9_ = 0;
                        while (_loc9_ < _loc3_) {
                            TraxSequencer.MIXING_BUFFER[_loc11_++] = 0;
                            _loc9_++;
                        }
                    }
                } else {
                    if (_loc12_ != null) {
                        _loc12_.addSample(TraxSequencer.MIXING_BUFFER, _loc11_, _loc3_ | 0);
                    }
                    _loc11_ = _loc11_ + _loc3_ | 0;
                }
                if (_loc11_ < _loc13_) {
                    _loc8_ = _loc7_.getWithIndex(++_loc14_);
                    if (_loc8_ == null || _loc8_.id == 0) {
                        _loc12_ = null;
                    } else {
                        _loc12_ = new TraxChannelSample(_loc8_, 0);
                    }
                }
            }
            _loc6_--;
        }
    }

    private checkSongFinishing(): void {
        let _loc1_: number = (this._lengthSamples < this._playLengthSamples ? this._lengthSamples : (this._playLengthSamples > 0 ? this._playLengthSamples : this._lengthSamples)) | 0;
        if (this._SafeStr_2456 > _loc1_ + this._SafeStr_5854 * (44100 / 1000) && !this._finished) {
            this._finished = true;
            if (this._SafeStr_2875 != null) {
                this._SafeStr_2875.reset();
                this._SafeStr_2875.removeEventListener("timerComplete", this.onPlayingComplete);
            }
            this._SafeStr_2875 = new Timer(2, 1);
            this._SafeStr_2875.start();
            this._SafeStr_2875.addEventListener("timerComplete", this.onPlayingComplete);
        } else if (this._SafeStr_2456 > _loc1_ - this._fadeOutLengthSamples && !this._SafeStr_3070) {
            this._SafeStr_3299 = false;
            this._SafeStr_3070 = true;
            this._SafeStr_2611 = 0;
        }
    }

    private writeAudioToOutputStream(param1: ByteArray, param2: number): void {
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        let _loc6_: any = 0;
        if (param2 > 0) {
            if (!this._SafeStr_3299 && !this._SafeStr_3070) {
                this.writeMixingBufferToOutputStream(param1, param2);
            } else {
                if (this._SafeStr_3299) {
                    _loc3_ = 1 / this._fadeInLengthSamples;
                    _loc4_ = this._SafeStr_3458 / this._fadeInLengthSamples;
                    this._SafeStr_3458 += 8192;
                    if (this._SafeStr_3458 > this._fadeInLengthSamples) {
                        this._SafeStr_3299 = false;
                    }
                } else if (this._SafeStr_3070) {
                    _loc3_ = -1 / this._fadeOutLengthSamples;
                    _loc4_ = 1 - this._SafeStr_2611 / this._fadeOutLengthSamples;
                    this._SafeStr_2611 += 8192;
                    if (this._SafeStr_2611 > this._fadeOutLengthSamples) {
                        this._SafeStr_2611 = this._fadeOutLengthSamples;
                    }
                }
                this.writeMixingBufferToOutputStreamWithFade(param1, param2, _loc4_, _loc3_);
            }
        }
        let _loc5_: number = 0;
        _loc6_ = param2;
        while (_loc6_ < 8192) {
            param1.writeFloat(_loc5_);
            param1.writeFloat(_loc5_);
            _loc6_++;
        }
    }

    private writeMixingBufferToOutputStream(param1: ByteArray, param2: number): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param2) {
            _loc4_ = TraxSequencer.MIXING_BUFFER[_loc3_] * 0.000030517578125;
            param1.writeFloat(_loc4_);
            param1.writeFloat(_loc4_);
            _loc3_++;
        }
    }

    private writeMixingBufferToOutputStreamWithFade(param1: ByteArray, param2: number, param3: number, param4: number): void {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < param2) {
            if (param3 < 0 || param3 > 1) {
                break;
            }
            _loc6_ = TraxSequencer.MIXING_BUFFER[_loc5_] * 0.000030517578125 * param3;
            param3 += param4;
            param1.writeFloat(_loc6_);
            param1.writeFloat(_loc6_);
            _loc5_++;
        }
        if (param3 < 0) {
            while (_loc5_ < param2) {
                param1.writeFloat(0);
                param1.writeFloat(0);
                _loc5_++;
            }
        } else if (param3 > 1) {
            while (_loc5_ < param2) {
                _loc6_ = TraxSequencer.MIXING_BUFFER[_loc5_] * 0.000030517578125;
                param3 += param4;
                param1.writeFloat(_loc6_);
                param1.writeFloat(_loc6_);
                _loc5_++;
            }
        }
    }

    private playingComplete(): void {
        this.stopImmediately();
        this._events.dispatchEvent(new SoundCompleteEvent("SCE_TRAX_SONG_COMPLETE", this._SafeStr_4873));
    }

    private removeFadeoutStopTimer(): void {
        if (this._SafeStr_3153 != null) {
            this._SafeStr_3153.removeEventListener("timerComplete", this.onFadeOutComplete);
            this._SafeStr_3153.reset();
            this._SafeStr_3153 = null;
        }
    }

    private removeStopTimer(): void {
        if (this._SafeStr_2875 != null) {
            this._SafeStr_2875.reset();
            this._SafeStr_2875.removeEventListener("timerComplete", this.onPlayingComplete);
            this._SafeStr_2875 = null;
        }
    }

    public render(param1: SampleDataEvent): boolean {
        if (!this.prepare()) {
            return false;
        }
        while (!this._finished) {
            this.onSampleData(param1);
        }
        return true;
    }

    private onSampleData = (param1: SampleDataEvent): void => {
        if (param1.position > this._SafeStr_3744) {
            this._SafeStr_5070 = this._SafeStr_5070 + 1;
            TraxSequencer._log.info("Audio buffer under run...");
            this._SafeStr_3744 = param1.position | 0;
        }
        if (this.volume > 0) {
            this.mixChannelsIntoBuffer();
        }
        let _loc2_: number = 8192;
        if (this._lengthSamples - this._SafeStr_2456 < _loc2_) {
            _loc2_ = this._lengthSamples - this._SafeStr_2456;
            if (_loc2_ < 0) {
                _loc2_ = 0;
            }
        }
        if (this.volume <= 0) {
            _loc2_ = 0;
        }
        this.writeAudioToOutputStream(param1.data, _loc2_);
        this._SafeStr_2456 += 8192;
        this._SafeStr_3744 += 8192;
        if (this._SafeStr_2798 != null) {
            this._SafeStr_5854 = param1.position / 44100 * 1000 - this._SafeStr_2798.position >>> 0;
        }
        this.checkSongFinishing();
    };

    private onPlayingComplete = (param1: TimerEvent): void => {
        if (this._finished) {
            this.playingComplete();
        }
    };

    private onFadeOutComplete = (param1: TimerEvent): void => {
        this.removeFadeoutStopTimer();
        this.playingComplete();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TraxSequencer.#staticsReady) return;
        TraxSequencer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TraxSequencer, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.sound.trax.TraxSequencer"));
    }

    get [IHabboSound](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
