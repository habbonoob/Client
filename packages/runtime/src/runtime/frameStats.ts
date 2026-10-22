// Frame timing shown in the page's top-left corner (not part of the client's display list): frames
// per second against the stage's frame rate, the average time a frame spends in the client's frame
// events (update) and in drawing (draw), the slowest frame, the shortest and longest time between
// frames (gap: how evenly they are paced), the time spent handling browser input events between
// frames (input), and the JS heap where the browser reports it. Off with ?fps=0
// (runtimeConfig.showFrameStats).

const REFRESH_MS = 500;

let panel: HTMLDivElement | null = null;
let windowStart = 0;
let frames = 0;
let updateTotal = 0;
let drawTotal = 0;
let slowest = 0;
let lastFrame = 0;
let shortestGap = Infinity;
let longestGap = 0;
let inputTotal = 0;
let inputEvents = 0;
let inputSlowest = 0;

/** Record the time (ms) one browser input event took to handle. */
export function recordInput(ms: number): void {
    inputTotal += ms;
    inputEvents++;
    inputSlowest = Math.max(inputSlowest, ms);
}

/** Record one frame's times (ms); refreshes the panel every half second. */
export function recordFrame(now: number, update: number, draw: number, targetFps: number): void {
    if (!panel) return;
    if (windowStart === 0) windowStart = now;
    if (lastFrame !== 0) {
        const gap = now - lastFrame;
        shortestGap = Math.min(shortestGap, gap);
        longestGap = Math.max(longestGap, gap);
    }
    lastFrame = now;
    frames++;
    updateTotal += update;
    drawTotal += draw;
    slowest = Math.max(slowest, update + draw);
    const elapsed = now - windowStart;
    if (elapsed < REFRESH_MS) return;
    const fps = (frames * 1000) / elapsed;
    const heap = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize;
    panel.textContent = [
        `${fps.toFixed(1)} fps / ${Math.round(targetFps)}`,
        `update ${(updateTotal / frames).toFixed(1)} ms`,
        `draw ${(drawTotal / frames).toFixed(1)} ms`,
        `max ${slowest.toFixed(1)} ms`,
        `input ${((inputTotal * 1000) / elapsed).toFixed(0)} ms/s (${Math.round((inputEvents * 1000) / elapsed)}/s, max ${inputSlowest.toFixed(1)} ms)`,
        `gap ${Number.isFinite(shortestGap) ? shortestGap.toFixed(0) : '-'}–${longestGap.toFixed(0)} ms`,
        ...(heap ? [`heap ${Math.round(heap / 1e6)} MB`] : []),
    ].join('  ·  ');
    windowStart = now;
    frames = 0;
    updateTotal = 0;
    drawTotal = 0;
    slowest = 0;
    shortestGap = Infinity;
    longestGap = 0;
    inputTotal = 0;
    inputEvents = 0;
    inputSlowest = 0;
}

/** Put the panel on the page. */
export function showFrameStats(): void {
    if (panel) return;
    panel = document.createElement('div');
    Object.assign(panel.style, {
        position: 'fixed', left: '0', top: '0', zIndex: '10000', pointerEvents: 'none',
        padding: '2px 6px', font: '11px/1.4 monospace', color: '#9f9', background: 'rgba(0, 0, 0, 0.6)',
        whiteSpace: 'pre',
    });
    panel.textContent = '… fps';
    document.body.appendChild(panel);
}
