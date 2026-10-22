// Timers that keep time while the page is hidden. A hidden page (another tab, a minimised or fully
// covered window) gets no animation frames, and its own timers are slowed to once a second (in
// Chrome, after five minutes, to once a minute); the desktop app ran on in the background. A
// worker's timers are not slowed, so the runtime's timers (Timer, setTimeout, setInterval) are
// kept there, and the stage runs its frames from one while the page is hidden.

const WORKER_SOURCE = `
const timers = new Map();
onmessage = ({ data: [id, delay, repeat] }) => {
    if (delay < 0) { clearTimeout(timers.get(id)); clearInterval(timers.get(id)); timers.delete(id); return; }
    timers.set(id, repeat
        ? setInterval(() => postMessage(id), delay)
        : setTimeout(() => { timers.delete(id); postMessage(id); }, delay));
};`;

const callbacks = new Map<number, { callback: () => void; repeat: boolean }>();
let nextId = 1;
let worker: Worker | null = null;

function clockWorker(): Worker {
    if (worker) return worker;
    const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
    worker = new Worker(url);
    URL.revokeObjectURL(url);
    worker.onmessage = ({ data: id }: MessageEvent<number>) => {
        const timer = callbacks.get(id);
        // (stopped while the message was on its way: nothing to do)
        if (!timer) return;
        if (!timer.repeat) callbacks.delete(id);
        timer.callback();
    };
    return worker;
}

/** Call `callback` after `delay` ms, or every `delay` ms when `repeat`; returns an id for stopTimer. */
export function startTimer(delay: number, repeat: boolean, callback: () => void): number {
    const id = nextId++;
    callbacks.set(id, { callback, repeat });
    clockWorker().postMessage([id, Math.max(0, delay), repeat]);
    return id;
}

/** Stop a timer (an id already stopped, or finished, is ignored). */
export function stopTimer(id: number): void {
    if (!callbacks.delete(id)) return;
    clockWorker().postMessage([id, -1, false]);
}
