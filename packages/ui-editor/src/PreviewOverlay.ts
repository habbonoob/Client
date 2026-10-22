import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { ID_TAG, type LayoutDocument } from './LayoutDocument';

interface Placed { window: IWindow; depth: number; order: number }

/** A drag in progress: moving the selected window, or resizing it from its bottom-right corner. */
interface Drag { id: number; mode: 'move' | 'resize'; startX: number; startY: number; x: number; y: number; width: number; height: number; moved: boolean }

/** How near the selection's bottom-right corner (in pixels) a press resizes rather than moves. */
const HANDLE = 8;
/** How far the pointer goes before a press is a drag, not a click. */
const DRAG_START = 3;

/**
 * Over the preview: takes the pointer (the client's windows do not react while editing), finds which layout
 * element is under it, and outlines the one hovered and the one selected. Built windows are matched to their
 * elements by the id tag the preview source gives them; windows a skin adds (a frame's title bar) belong to the
 * element they are in.
 */
export class PreviewOverlay {
    readonly #hover: HTMLElement;
    readonly #selection: HTMLElement;
    readonly #label: HTMLElement;
    #placed = new Map<number, Placed>();
    #selected: number | null = null;
    #hovered: number | null = null;
    #drag: Drag | null = null;
    /** Called with the element id clicked (null: empty space). */
    onSelect: (id: number | null) => void = () => {};
    /** Called when a drag of an element ends: how far it moved, or its new size. */
    onMoved: (id: number, dx: number, dy: number) => void = () => {};
    onResized: (id: number, width: number, height: number) => void = () => {};

    constructor(surface: HTMLElement) {
        this.#hover = this.#box('hover');
        this.#selection = this.#box('selection');
        this.#label = document.createElement('div');
        this.#label.className = 'box-label';
        this.#selection.appendChild(this.#label);
        this.#selection.appendChild(Object.assign(document.createElement('div'), { className: 'handle' }));
        surface.addEventListener('pointermove', e => {
            if (this.#drag) this.#dragTo(e.clientX, e.clientY);
            else this.#setHovered(this.#idAt(e.clientX, e.clientY));
        });
        surface.addEventListener('pointerleave', () => this.#setHovered(null));
        surface.addEventListener('pointerdown', e => {
            // the drag goes on outside the preview (the capture fails for a pointer that is already gone)
            try { surface.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
            this.#press(e.clientX, e.clientY);
        });
        surface.addEventListener('pointerup', e => {
            if (surface.hasPointerCapture(e.pointerId)) surface.releasePointerCapture(e.pointerId);
            this.#release();
        });
    }

    /** A press on the selection drags it (its corner resizes it); anywhere else selects what is there. */
    #press(x: number, y: number): void {
        const placed = this.#selected == null ? undefined : this.#placed.get(this.#selected);
        if (placed) {
            const r = new Rectangle();
            placed.window.getGlobalRectangle(r);
            const inside = x >= r.x && y >= r.y && x < r.x + r.width + HANDLE && y < r.y + r.height + HANDLE;
            const corner = x >= r.x + r.width - HANDLE && y >= r.y + r.height - HANDLE;
            // a press inside the selection on something deeper selects that instead
            const under = this.#idAt(x, y);
            if (inside && (corner || under === this.#selected)) {
                const w = placed.window;
                this.#drag = { id: this.#selected!, mode: corner ? 'resize' : 'move', startX: x, startY: y, x: w.x, y: w.y, width: w.width, height: w.height, moved: false };
                return;
            }
        }
        this.onSelect(this.#idAt(x, y));
    }

    #dragTo(x: number, y: number): void {
        const drag = this.#drag!;
        const dx = Math.round(x - drag.startX), dy = Math.round(y - drag.startY);
        if (!drag.moved && Math.abs(dx) < DRAG_START && Math.abs(dy) < DRAG_START) return;
        drag.moved = true;
        const w = this.#placed.get(drag.id)?.window;
        if (!w) return;
        // the built window follows the pointer; the layout is changed once, when the drag ends
        if (drag.mode === 'move') {
            w.x = drag.x + dx;
            w.y = drag.y + dy;
        } else {
            w.width = Math.max(1, drag.width + dx);
            w.height = Math.max(1, drag.height + dy);
        }
        this.refresh();
    }

    #release(): void {
        const drag = this.#drag;
        this.#drag = null;
        if (!drag?.moved) return;
        const w = this.#placed.get(drag.id)?.window;
        if (!w) return;
        if (drag.mode === 'move') this.onMoved(drag.id, w.x - drag.x, w.y - drag.y);
        else this.onResized(drag.id, w.width, w.height);
    }

    /** The windows of a new build of `doc` (null: nothing built). */
    setBuild(root: IWindow | null, doc: LayoutDocument): void {
        this.#placed.clear();
        if (root) {
            const order = new Map(doc.allElements().map(({ element, depth }, i) => [doc.idOf(element), { depth, order: i }]));
            const walk = (w: IWindow) => {
                const id = idOf(w);
                const known = id == null ? undefined : order.get(id);
                if (id != null && known && !this.#placed.has(id)) this.#placed.set(id, { window: w, ...known });
                const count = (w as unknown as { numChildren?: number }).numChildren ?? 0;
                for (let i = 0; i < count; i++) walk(w.getChildAt(i));
            };
            walk(root);
        }
        this.refresh();
    }

    select(id: number | null): void {
        this.#selected = id;
        this.refresh();
    }

    /** Moves the outlines to where their windows are now. */
    refresh(): void {
        this.#place(this.#hover, this.#hovered !== this.#selected ? this.#hovered : null);
        this.#place(this.#selection, this.#selected);
    }

    #setHovered(id: number | null): void {
        if (id === this.#hovered) return;
        this.#hovered = id;
        this.refresh();
    }

    /** The deepest element under a point (the last in the document, when they are as deep: it is drawn on top). */
    #idAt(x: number, y: number): number | null {
        let best: number | null = null;
        let bestPlaced: Placed | null = null;
        const r = new Rectangle();
        for (const [id, placed] of this.#placed) {
            if (!shown(placed.window)) continue;
            placed.window.getGlobalRectangle(r);
            if (x < r.x || y < r.y || x >= r.x + r.width || y >= r.y + r.height) continue;
            if (!bestPlaced || placed.depth > bestPlaced.depth || (placed.depth === bestPlaced.depth && placed.order > bestPlaced.order)) {
                best = id;
                bestPlaced = placed;
            }
        }
        return best;
    }

    #place(box: HTMLElement, id: number | null): void {
        const placed = id == null ? undefined : this.#placed.get(id);
        if (!placed) {
            box.style.display = 'none';
            return;
        }
        const r = new Rectangle();
        placed.window.getGlobalRectangle(r);
        box.style.display = 'block';
        box.style.left = `${r.x}px`;
        box.style.top = `${r.y}px`;
        box.style.width = `${r.width}px`;
        box.style.height = `${r.height}px`;
        if (box === this.#selection) this.#label.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
    }

    #box(kind: string): HTMLElement {
        const box = document.createElement('div');
        box.className = `box ${kind}`;
        document.body.appendChild(box);
        return box;
    }
}

/** The element id a built window carries in its tags. */
function idOf(w: IWindow): number | null {
    for (const tag of w.tags ?? []) {
        if (typeof tag === 'string' && tag.startsWith(ID_TAG)) return Number(tag.slice(ID_TAG.length));
    }
    return null;
}

/** Whether the window and everything it is in are visible. */
function shown(w: IWindow): boolean {
    for (let at: IWindow | null = w; at; at = at.parent as IWindow | null) {
        if (!at.visible) return false;
    }
    return true;
}
