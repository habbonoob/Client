// The shared WebAudio context. It runs at 44.1 kHz, the rate the client's audio code (sample data
// generation, extract) works in. Browsers start audio suspended until the user interacts with the
// page; the context resumes on the first pointer or key press.

let context: AudioContext | null = null;
let master: GainNode | null = null;

export function audioContext(): AudioContext {
    if (!context) {
        context = new AudioContext({ sampleRate: 44100 });
        master = context.createGain();
        master.connect(context.destination);
        const resume = () => { void context!.resume(); };
        window.addEventListener('pointerdown', resume, { capture: true });
        window.addEventListener('keydown', resume, { capture: true });
    }
    return context;
}

/** Everything plays through this node (SoundMixer's global volume). */
export function masterOutput(): GainNode {
    audioContext();
    return master!;
}
