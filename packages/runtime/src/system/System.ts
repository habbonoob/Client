import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';

interface MemoryInfo { usedJSHeapSize: number; totalJSHeapSize: number }

function memory(): MemoryInfo | null {
    return (performance as unknown as { memory?: MemoryInfo }).memory ?? null;
}

/**
 * Runtime services: clipboard text, memory figures (the JavaScript heap, where the browser
 * reports it; 0 otherwise) and exit. Garbage collection is the JavaScript engine's own, so the
 * collection hints have nothing to trigger.
 */
export class System {
    static useCodePage = false;

    static get totalMemory(): number {
        return memory()?.usedJSHeapSize ?? 0;
    }

    static get totalMemoryNumber(): number {
        return memory()?.usedJSHeapSize ?? 0;
    }

    static get privateMemory(): number {
        return memory()?.totalJSHeapSize ?? 0;
    }

    static get freeMemory(): number {
        const m = memory();
        return m ? m.totalJSHeapSize - m.usedJSHeapSize : 0;
    }

    static setClipboard(string: string): void {
        void navigator.clipboard?.writeText(string).catch(() => {});
    }

    static gc(): void {}

    static pauseForGCIfCollectionImminent(imminence: number = 0.75): void {
        void imminence;
    }

    /** Release an XML object's memory now (it is released when no longer referenced anyway). */
    static disposeXML(node: unknown): void {
        void node;
    }

    static exit(code: number): void {
        NativeApplication.nativeApplication.exit(code);
    }
}
