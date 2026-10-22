import { masterOutput } from './audio';
import { SoundTransform } from './SoundTransform';

/** Global sound control: the overall volume of everything playing. */
export class SoundMixer {
    static #transform = new SoundTransform();
    static readonly #channels = new Set<{ stop(): void }>();
    static audioPlaybackMode = 'media';
    static bufferTime = 0;

    static get soundTransform(): SoundTransform {
        const t = SoundMixer.#transform;
        return new SoundTransform(t.volume, t.pan);
    }

    static set soundTransform(value: SoundTransform) {
        SoundMixer.#transform = new SoundTransform(value.volume, value.pan);
        masterOutput().gain.value = Math.max(0, value.volume);
    }

    /** Stop every sound that is playing. */
    static stopAll(): void {
        for (const c of [...SoundMixer.#channels]) c.stop();
    }

    /** Channels register while they play (for stopAll). */
    static track(channel: { stop(): void }, playing: boolean): void {
        if (playing) SoundMixer.#channels.add(channel);
        else SoundMixer.#channels.delete(channel);
    }
}
