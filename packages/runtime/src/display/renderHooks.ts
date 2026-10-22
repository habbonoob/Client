// Work that must happen after a frame's events and before it is drawn (re-rasterising changed
// vector drawings and text fields, uploading changed bitmaps). Each module registers its own step,
// so the stage doesn't depend on every kind of content.

type Step = (resolution: number) => void;

const steps: Step[] = [];

export function addBeforeRender(step: Step): void {
    steps.push(step);
}

let running = false;

/** The steps, once: a step that draws (a bitmap drawing the display list) does not start them over. */
export function runBeforeRender(resolution: number): void {
    if (running) return;
    running = true;
    try {
        for (const step of steps) step(resolution);
    } finally {
        running = false;
    }
}

// A redraw on the next screen refresh, between frames (the stage registers how)
let redraw: () => void = () => {};

export function setRedraw(handler: () => void): void {
    redraw = handler;
}

/** Show what changed on the next screen refresh instead of the next frame. */
export function requestRedraw(): void {
    redraw();
}
