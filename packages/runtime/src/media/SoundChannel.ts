import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { audioContext, masterOutput } from './audio';
import { SoundMixer } from './SoundMixer';
import { SoundTransform } from './SoundTransform';

/**
 * One playing sound. `position` is the playback position in milliseconds (within the current
 * loop); soundComplete is dispatched when it finishes on its own (not after stop()).
 */
export class SoundChannel extends EventDispatcher {
    readonly #gain: GainNode;
    readonly #pan: StereoPannerNode;
    #source: AudioScheduledSourceNode | null = null;
    #startedAt = 0;
    #offset = 0;
    #loopLength = 0;
    #stopped = false;
    #transform: SoundTransform;

    /** @internal Created by Sound.play(). */
    constructor(transform: SoundTransform | null) {
        super();
        const ctx = audioContext();
        this.#gain = ctx.createGain();
        this.#pan = ctx.createStereoPanner();
        this.#gain.connect(this.#pan);
        this.#pan.connect(masterOutput());
        this.#transform = transform ? new SoundTransform(transform.volume, transform.pan) : new SoundTransform();
        this.#apply();
    }

    /** @internal Start `source`, begun `offsetMs` into the sound, whose loop is `loopMs` long (0: not looped). */
    start(source: AudioScheduledSourceNode, offsetMs: number, loopMs: number): void {
        this.#source = source;
        this.#offset = offsetMs;
        this.#loopLength = loopMs;
        this.#startedAt = audioContext().currentTime;
        source.connect(this.#gain);
        source.onended = () => runGuarded(() => {
            SoundMixer.track(this, false);
            if (!this.#stopped) this.dispatchEvent(new Event(Event.SOUND_COMPLETE));
        });
        SoundMixer.track(this, true);
    }

    /** @internal The node generated sound is written to (for sample-data sounds). */
    get input(): AudioNode {
        return this.#gain;
    }

    get position(): number {
        if (!this.#source) return 0;
        const ms = this.#offset + (audioContext().currentTime - this.#startedAt) * 1000;
        return this.#loopLength > 0 ? ms % this.#loopLength : ms;
    }

    get soundTransform(): SoundTransform {
        return new SoundTransform(this.#transform.volume, this.#transform.pan);
    }

    set soundTransform(value: SoundTransform) {
        this.#transform = new SoundTransform(value.volume, value.pan);
        this.#apply();
    }

    get leftPeak(): number {
        return 0;
    }

    get rightPeak(): number {
        return 0;
    }

    stop(): void {
        if (this.#stopped) return;
        this.#stopped = true;
        try { this.#source?.stop(); } catch { /* already ended */ }
        SoundMixer.track(this, false);
    }

    #apply(): void {
        this.#gain.gain.value = Math.max(0, this.#transform.volume);
        this.#pan.pan.value = Math.max(-1, Math.min(1, this.#transform.pan));
    }
}
