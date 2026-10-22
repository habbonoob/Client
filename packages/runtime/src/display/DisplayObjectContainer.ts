import type { Container } from 'pixi.js';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { DisplayObject, displayState } from './DisplayObject';
import { InteractiveObject } from './InteractiveObject';
import { rootHook } from './rootHook';

/**
 * A display object with children. The child list is mirrored into the PIXI node (after any nodes the
 * container draws itself, e.g. a Sprite's graphics). Adding a child that has another parent removes
 * it there first. Events: `added` (bubbles) after a child is inserted, then `addedToStage` through
 * its subtree if the container is on the stage; `removed` (bubbles) and `removedFromStage` while the
 * child is still attached, then it is detached.
 */
export class DisplayObjectContainer extends InteractiveObject {
    /** Whether children can be targets of mouse events (otherwise this container is). */
    mouseChildren = true;
    tabChildren = true;

    #children: DisplayObject[] = [];

    constructor(node?: Container) {
        super(node);
    }

    get numChildren(): number {
        return this.#children.length;
    }

    addChild(child: DisplayObject): DisplayObject {
        return this.addChildAt(child, child.parent === this ? this.#children.length - 1 : this.#children.length);
    }

    addChildAt(child: DisplayObject, index: number): DisplayObject {
        if (child == null) throw new TypeError('Parameter child must be non-null.');
        if (child === this || (child instanceof DisplayObjectContainer && child.contains(this))) {
            throw new ArgumentError('An object cannot be added as a child of itself or one of its children (or children of children, etc.).');
        }
        if (child.parent === this) {
            // moving within this container: no removal or insertion events
            if (index < 0 || index >= this.#children.length) throw new RangeError('The supplied index is out of bounds.');
            this.#move(child, index);
            return child;
        }
        if (index < 0 || index > this.#children.length) throw new RangeError('The supplied index is out of bounds.');
        child.parent?.removeChild(child);
        this.#children.splice(index, 0, child);
        this.node.addChildAt(child.node, index + this.childNodeOffset());
        displayState.setParent(child, this);
        child.dispatchEvent(new Event(Event.ADDED, true));
        if (this.stage) dispatchSubtree(child, Event.ADDED_TO_STAGE);
        return child;
    }

    removeChild(child: DisplayObject): DisplayObject {
        const i = this.#children.indexOf(child);
        if (i < 0) throw new ArgumentError('The supplied DisplayObject must be a child of the caller.');
        return this.removeChildAt(i);
    }

    removeChildAt(index: number): DisplayObject {
        const child = this.#children[index];
        if (!child) throw new RangeError('The supplied index is out of bounds.');
        child.dispatchEvent(new Event(Event.REMOVED, true));
        if (this.stage) dispatchSubtree(child, Event.REMOVED_FROM_STAGE);
        // listeners may have moved things around; remove it from wherever it now is in this container
        const at = this.#children.indexOf(child);
        if (at >= 0) {
            this.#children.splice(at, 1);
            this.node.removeChild(child.node);
            displayState.setParent(child, null);
        }
        return child;
    }

    removeChildren(beginIndex: number = 0, endIndex: number = 0x7fffffff): void {
        const end = Math.min(endIndex, this.#children.length - 1);
        if (beginIndex < 0 || (this.#children.length && beginIndex > end)) throw new RangeError('The supplied index is out of bounds.');
        for (let i = end; i >= beginIndex; i--) this.removeChildAt(i);
    }

    getChildAt(index: number): DisplayObject {
        const child = this.#children[index];
        if (!child) throw new RangeError('The supplied index is out of bounds.');
        return child;
    }

    /** The first child with this name, or null. */
    getChildByName(name: string): DisplayObject | null {
        return this.#children.find(c => c.name === name) ?? null;
    }

    getChildIndex(child: DisplayObject): number {
        const i = this.#children.indexOf(child);
        if (i < 0) throw new ArgumentError('The supplied DisplayObject must be a child of the caller.');
        return i;
    }

    setChildIndex(child: DisplayObject, index: number): void {
        const i = this.getChildIndex(child);
        if (index < 0 || index >= this.#children.length) throw new RangeError('The supplied index is out of bounds.');
        if (i !== index) this.#move(child, index);
    }

    swapChildren(child1: DisplayObject, child2: DisplayObject): void {
        this.swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2));
    }

    swapChildrenAt(index1: number, index2: number): void {
        const a = this.getChildAt(index1), b = this.getChildAt(index2);
        if (a === b) return;
        this.#children[index1] = b;
        this.#children[index2] = a;
        this.node.swapChildren(a.node, b.node);
    }

    /** Is `child` this container or one of its descendants? */
    contains(child: DisplayObject): boolean {
        for (let o: DisplayObject | null = child; o; o = o.parent) if (o === this) return true;
        return false;
    }

    /** The descendants whose own content lies under the stage point, in rendering order. */
    getObjectsUnderPoint(point: Point): DisplayObject[] {
        const out: DisplayObject[] = [];
        const walk = (c: DisplayObjectContainer) => {
            for (const child of c.#children) {
                if (child.hitTestContent(point.x, point.y)) out.push(child);
                if (child instanceof DisplayObjectContainer) walk(child);
            }
        };
        walk(this);
        return out;
    }

    /** The children in display order (a copy). */
    childList(): DisplayObject[] {
        return [...this.#children];
    }

    /** Bounds of this container's own content plus all visible and invisible children. */
    protected override localBounds(): Rectangle {
        return this.#union(this.ownBounds(), c => c.getBounds(this));
    }

    protected override localRect(): Rectangle {
        return this.#union(this.ownRect(), c => c.getRect(this));
    }

    /** Content the container draws itself (e.g. a Sprite's graphics), in local space. */
    protected ownBounds(): Rectangle {
        return new Rectangle();
    }

    protected ownRect(): Rectangle {
        return this.ownBounds();
    }

    protected override hitTestLocal(x: number, y: number): boolean {
        if (this.hitTestOwnContent(x, y)) return true;
        const p = this.localToGlobal(new Point(x, y));
        return this.#children.some(c => c.hitTestPoint(p.x, p.y, true));
    }

    /** A container has no content of its own unless a subclass draws some (a Sprite's graphics). */
    protected override hitTestOwnContent(x: number, y: number): boolean {
        void x;
        void y;
        return false;
    }

    /** PIXI nodes the container keeps before its children's nodes. */
    protected childNodeOffset(): number {
        return 0;
    }

    static {
        rootHook.setAdopter((stage, child) => {
            const s = stage as DisplayObjectContainer, c = child as DisplayObject;
            s.#children.push(c);
            s.node.addChild(c.node);
            displayState.setParent(c, s);
        });
    }

    #move(child: DisplayObject, index: number): void {
        this.#children.splice(this.#children.indexOf(child), 1);
        this.#children.splice(index, 0, child);
        this.node.setChildIndex(child.node, index + this.childNodeOffset());
    }

    #union(own: Rectangle, childBounds: (c: DisplayObject) => Rectangle): Rectangle {
        let r = own.isEmpty() ? null : own;
        for (const c of this.#children) {
            const b = childBounds(c);
            if (b.width === 0 && b.height === 0) continue;
            r = r ? r.union(b) : b;
        }
        return r ?? new Rectangle();
    }
}

/** Dispatch a non-bubbling event to an object and all of its descendants, parents before children. */
function dispatchSubtree(o: DisplayObject, type: string): void {
    o.dispatchEvent(new Event(type));
    if (o instanceof DisplayObjectContainer) for (const c of o.childList()) dispatchSubtree(c, type);
}
