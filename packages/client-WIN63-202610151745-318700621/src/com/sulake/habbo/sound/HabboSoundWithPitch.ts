import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { SoundTransform } from '@habbo-pixi/runtime/media/SoundTransform';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { HabboSoundBase } from '@/com/sulake/habbo/sound/HabboSoundBase';

export class HabboSoundWithPitch extends HabboSoundBase implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.sound::HabboSoundWithPitch'); }

    private readonly SILENCE_MS: number = 50;
    private readonly FADEIN_MS: number = 175;

    declare private _pitch: number;
    static { (this.prototype as any)._pitch = NaN; }

    declare private _SafeStr_4302: Sound;

    declare private _loadedSamples: ByteArray;

    declare private _numSamples: number;
    static { (this.prototype as any)._numSamples = 0; }

    private _SafeStr_5239: number = 0;
    private _SafeStr_5478: number = 0;
    private _SafeStr_5524: boolean = false;

    constructor(param1: Sound, param2: number = 1) {
        super(param1);
        this._pitch = param2;
        this._SafeStr_4302 = new Sound();
        this.extractMonoSamples();
        this.setPitch(this._pitch);
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_4302 = null;
        if (this._loadedSamples != null) {
            this._loadedSamples.clear();
            this._loadedSamples = null;
        }
    }

    public override play(param1: number = 0): boolean {
        this.stop();
        this._SafeStr_5478 = this._SafeStr_5239;
        this._SafeStr_5524 = false;
        this.setComplete(false);
        this.setSoundChannel(this._SafeStr_4302.play(0, 0, new SoundTransform(0)));
        return true;
    }

    public override stop(): boolean {
        if (this.getSoundChannel() != null) {
            this.getSoundChannel().stop();
        }
        return true;
    }

    public update(param1: number): void {
        this._SafeStr_5239 += param1;
        let _loc2_: number = this._SafeStr_5239 - this._SafeStr_5478 >>> 0;
        if (this._SafeStr_5478 > 0 && _loc2_ < 50) {
            this.setChannelVolume(0);
        } else if (this._SafeStr_5478 > 0 && _loc2_ >= 50 && _loc2_ < 175) {
            this.setChannelVolume(this.volume * (_loc2_ / 175));
        } else if (!this._SafeStr_5524) {
            this.setChannelVolume(this.volume);
            this._SafeStr_5524 = true;
        }
    }

    public get disposed(): boolean {
        return this._loadedSamples == null;
    }

    public setPitch(param1: number): void {
        let _loc5_: number = NaN;
        let _loc4_: number = 0;
        this._pitch = param1;
        let _loc6_: ByteArray = new ByteArray();
        let _loc3_: number = (this._loadedSamples.length / 4 * this._pitch | 0) >>> 0;
        let _loc2_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < _loc3_ && (_loc2_ | 0) * 4 < this._loadedSamples.length) {
            this._loadedSamples.position = (_loc2_ | 0) * 4 >>> 0;
            _loc5_ = Number(this._loadedSamples.readFloat());
            _loc6_.writeFloat(_loc5_);
            _loc6_.writeFloat(_loc5_);
            _loc2_ += this._pitch;
            _loc4_++;
        }
        _loc6_.position = 0;
        this._SafeStr_4302.loadPCMFromByteArray(_loc6_, _loc6_.length / 8 >>> 0, "float");
    }

    private extractMonoSamples(): void {
        let _loc2_: number = 0;
        let _loc3_: number = NaN;
        let _loc1_: ByteArray = new ByteArray();
        this._soundObject.extract(_loc1_, this._soundObject.length * 44.1 | 0, 0);
        this._loadedSamples = new ByteArray();
        this._numSamples = _loc1_.length / 8 | 0;
        _loc1_.position = 0;
        _loc2_ = 0;
        while (_loc2_ < this._numSamples) {
            _loc3_ = Number(_loc1_.readFloat());
            _loc1_.readFloat();
            this._loadedSamples.writeFloat(_loc3_);
            _loc2_++;
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
