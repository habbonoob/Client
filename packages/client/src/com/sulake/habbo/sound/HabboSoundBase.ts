import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Sound } from '@habbo-pixi/runtime/media/Sound';
import type { SoundChannel } from '@habbo-pixi/runtime/media/SoundChannel';
import { SoundTransform } from '@habbo-pixi/runtime/media/SoundTransform';
import { IHabboSound } from '@/com/sulake/habbo/sound/IHabboSound';

export class HabboSoundBase implements IHabboSound {
    static { registerClassName(this, 'com.sulake.habbo.sound::HabboSoundBase'); }

    constructor(param1: Sound, param2: number = 0) {
        this._soundObject = param1;
        this._soundObject.addEventListener("complete", this.onComplete);
        this._volume = 1;
        this._complete = false;
        this._SafeStr_4920 = param2;
    }

    protected _soundObject: Sound = null;
    private _SafeStr_2798: SoundChannel = null;

    declare private _complete: boolean;
    static { (this.prototype as any)._complete = false; }

    declare private _SafeStr_4920: number;
    static { (this.prototype as any)._SafeStr_4920 = 0; }

    declare private _volume: number;
    static { (this.prototype as any)._volume = NaN; }

    public get volume(): number {
        return this._volume;
    }

    public set volume(param1: number) {
        this._volume = param1;
        this.setChannelVolume(param1);
    }

    public get position(): number {
        return this._SafeStr_2798.position;
    }

    public set position(param1: number) {
    }

    public get length(): number {
        return this._soundObject.length;
    }

    public get ready(): boolean {
        return !this._soundObject.isBuffering;
    }

    public get finished(): boolean {
        return !this._complete;
    }

    public get fadeOutSeconds(): number {
        return 0;
    }

    public set fadeOutSeconds(param1: number) {
    }

    public get fadeInSeconds(): number {
        return 0;
    }

    public set fadeInSeconds(param1: number) {
    }

    public dispose(): void {
        this.stop();
        this._SafeStr_2798 = null;
        this._soundObject = null;
    }

    public play(param1: number = 0): boolean {
        this._complete = false;
        this._SafeStr_2798 = this._soundObject.play(0, this._SafeStr_4920);
        this.setChannelVolume(this._volume);
        return true;
    }

    public stop(): boolean {
        if (this._SafeStr_2798) {
            this._SafeStr_2798.stop();
        }
        return true;
    }

    protected getSoundObject(): Sound {
        return this._soundObject;
    }

    protected getSoundChannel(): SoundChannel {
        return this._SafeStr_2798;
    }

    protected setSoundChannel(param1: SoundChannel): void {
        this._SafeStr_2798 = param1;
    }

    protected setComplete(param1: boolean): void {
        this._complete = param1;
    }

    protected setChannelVolume(param1: number): void {
        if (this._SafeStr_2798 != null) {
            this._SafeStr_2798.soundTransform = new SoundTransform(param1);
        }
    }

    private onComplete = (param1: Event): void => {
        this._complete = true;
    };

    get [IHabboSound](): true {
        return true;
    }
}
