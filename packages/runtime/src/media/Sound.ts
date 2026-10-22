import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { SampleDataEvent } from '@habbo-pixi/runtime/events/SampleDataEvent';
import { join, request } from '@habbo-pixi/runtime/net/http';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import { audioContext } from './audio';
import { SoundChannel } from './SoundChannel';
import type { SoundTransform } from './SoundTransform';

/** Samples requested per sampleData event (the listener must write 2048–8192; fewer ends the sound). */
const REQUEST = 4096;

/**
 * A sound: loaded from a URL (MP3 or anything the browser decodes), embedded, built from PCM
 * bytes, or generated — with no audio of its own and a sampleData listener, play() asks that
 * listener for samples (32-bit float stereo pairs at 44.1 kHz) as playback needs them.
 */
export class Sound extends EventDispatcher {
    #buffer: AudioBuffer | null = null;
    #abort: (() => void) | null = null;
    #bytesLoaded = 0;
    #bytesTotal = 0;
    url: string | null = null;

    constructor(stream: URLRequest = null, context: unknown = null) {
        super();
        void context;
        if (stream) this.load(stream);
    }

    /** Decode compressed audio (MP3, …) into samples at 44.1 kHz. */
    static decode(bytes: Uint8Array<ArrayBuffer>): Promise<AudioBuffer> {
        return audioContext().decodeAudioData(bytes.slice().buffer);
    }

    get bytesLoaded(): number {
        return this.#bytesLoaded;
    }

    get bytesTotal(): number {
        return this.#bytesTotal;
    }

    get isBuffering(): boolean {
        return this.#abort !== null;
    }

    /** Length in milliseconds (of what is loaded). */
    get length(): number {
        return this.#buffer ? this.#buffer.duration * 1000 : 0;
    }

    load(stream: URLRequest, context: unknown = null): void {
        void context;
        this.close();
        this.url = stream.url;
        const chunks: Uint8Array[] = [];
        this.#abort = request(stream, {
            open: () => runGuarded(() => this.dispatchEvent(new Event(Event.OPEN))),
            status: () => {},
            chunk: (data, loaded, total) => runGuarded(() => {
                chunks.push(data);
                this.#bytesLoaded = loaded;
                this.#bytesTotal = total;
                this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, loaded, total));
            }),
            done: () => {
                this.#abort = null;
                Sound.decode(join(chunks)).then(
                    buffer => runGuarded(() => {
                        this.#buffer = buffer;
                        this.dispatchEvent(new Event(Event.COMPLETE));
                    }),
                    () => runGuarded(() => this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, `The sound could not be decoded: ${stream.url}`))),
                );
            },
            error: message => runGuarded(() => {
                this.#abort = null;
                this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, message));
            }),
        });
    }

    /** Use already decoded audio (embedded sounds). */
    useDecodedAudio(buffer: AudioBuffer): void {
        this.#buffer = buffer;
        this.#bytesLoaded = this.#bytesTotal = buffer.length * 8;
    }

    /** Samples from 32-bit float PCM (or 16-bit with format 'short'). */
    loadPCMFromByteArray(bytes: ByteArray, samples: number, format: string = 'float', stereo: boolean = true, sampleRate: number = 44100): void {
        const channels = stereo ? 2 : 1;
        const buffer = audioContext().createBuffer(channels, Math.max(1, samples), sampleRate);
        const data = [...Array(channels)].map((_, c) => buffer.getChannelData(c));
        for (let i = 0; i < samples; i++) {
            for (let c = 0; c < channels; c++) data[c][i] = format === 'short' ? bytes.readShort() / 32768 : bytes.readFloat();
        }
        this.#buffer = buffer;
    }

    /**
     * Copy up to `length` samples (from `startPosition`, or after the last extracted sample) into
     * `target` as 32-bit float stereo pairs; returns how many were copied.
     */
    extract(target: ByteArray, length: number, startPosition: number = -1): number {
        const b = this.#buffer;
        if (!b) return 0;
        const start = startPosition < 0 ? this.#extractPos : Math.floor(startPosition);
        const n = Math.max(0, Math.min(length, b.length - start));
        const l = b.getChannelData(0), r = b.numberOfChannels > 1 ? b.getChannelData(1) : l;
        for (let i = 0; i < n; i++) {
            target.writeFloat(l[start + i]);
            target.writeFloat(r[start + i]);
        }
        this.#extractPos = start + n;
        return n;
    }

    #extractPos = 0;

    /** Start playing `startTime` ms in, repeating `loops` more times; null when there is nothing to play. */
    play(startTime: number = 0, loops: number = 0, sndTransform: SoundTransform = null): SoundChannel | null {
        const ctx = audioContext();
        if (this.#buffer) {
            const channel = new SoundChannel(sndTransform);
            const source = ctx.createBufferSource();
            source.buffer = this.#buffer;
            const offset = Math.max(0, startTime) / 1000;
            if (loops > 0) {
                source.loop = true;
                source.loopStart = 0;
                source.loopEnd = this.#buffer.duration;
                source.start(0, offset, this.#buffer.duration * (loops + 1) - offset);
            } else {
                source.start(0, offset);
            }
            channel.start(source, startTime, loops > 0 ? this.#buffer.duration * 1000 : 0);
            return channel;
        }
        if (this.hasEventListener(SampleDataEvent.SAMPLE_DATA)) return this.#playGenerated(sndTransform);
        return null;
    }

    close(): void {
        this.#abort?.();
        this.#abort = null;
    }

    /** Playback that asks the sampleData listener for audio as it goes. */
    #playGenerated(transform: SoundTransform | null): SoundChannel {
        const ctx = audioContext();
        const channel = new SoundChannel(transform);
        const node = ctx.createScriptProcessor(REQUEST, 0, 2);
        let queueL = new Float32Array(0), queueR = new Float32Array(0);
        let position = 0, finished = false;
        const refill = () => {
            const data = new ByteArray();
            runGuarded(() => { this.dispatchEvent(new SampleDataEvent(SampleDataEvent.SAMPLE_DATA, false, false, position, data)); });
            const samples = Math.floor(data.length / 8);
            if (samples < 2048) finished = true;
            const view = new DataView(byteArrayAccess.view(data).slice().buffer);
            const l = new Float32Array(queueL.length + samples), r = new Float32Array(queueR.length + samples);
            l.set(queueL);
            r.set(queueR);
            const little = data.endian === 'littleEndian';
            for (let i = 0; i < samples; i++) {
                l[queueL.length + i] = view.getFloat32(i * 8, little);
                r[queueR.length + i] = view.getFloat32(i * 8 + 4, little);
            }
            queueL = l;
            queueR = r;
            position += samples;
        };
        const source = ctx.createConstantSource();   // drives onended / stop() for the channel
        node.onaudioprocess = ev => {
            const outL = ev.outputBuffer.getChannelData(0), outR = ev.outputBuffer.getChannelData(1);
            while (queueL.length < outL.length && !finished) refill();
            const n = Math.min(outL.length, queueL.length);
            outL.set(queueL.subarray(0, n));
            outR.set(queueR.subarray(0, n));
            outL.fill(0, n);
            outR.fill(0, n);
            queueL = queueL.subarray(n);
            queueR = queueR.subarray(n);
            if (finished && queueL.length === 0) {
                node.onaudioprocess = null;
                node.disconnect();
                try { source.stop(); } catch { /* stopped */ }
            }
        };
        node.connect(channel.input);
        const silent = ctx.createGain();
        silent.gain.value = 0;
        source.connect(silent);
        silent.connect(ctx.destination);
        source.start();
        channel.start(source, 0, 0);
        channel.addEventListener(Event.SOUND_COMPLETE, () => node.disconnect());
        return channel;
    }
}

