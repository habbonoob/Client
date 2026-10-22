import { Container } from 'pixi.js';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { Graphics } from './Graphics';
import { VectorView, hitContext, renderGraphics } from './vectorView';

/**
 * A container that can also draw (its `graphics`, rendered beneath its children) and act as a
 * button (`buttonMode` shows the hand cursor over it when `useHandCursor` is on).
 */
export class Sprite extends DisplayObjectContainer {
    /** Show the hand cursor over this sprite (with useHandCursor). */
    buttonMode = false;
    useHandCursor = true;
    /** Another sprite whose shape stands in for this one's in mouse hit tests. */
    hitArea: Sprite | null = null;

    #graphics: Graphics | null = null;
    #view: VectorView | null = null;

    constructor() {
        super(new Container());
    }

    get graphics(): Graphics {
        if (!this.#graphics) {
            this.#graphics = new Graphics(() => this.#view?.markDirty());
            this.#view = new VectorView(this.#graphics, this);
            this.node.addChildAt(this.#view.sprite, 0);
        }
        return this.#graphics;
    }

    protected override childNodeOffset(): number {
        return this.#view ? 1 : 0;
    }

    protected override ownBounds(): Rectangle {
        return this.#graphics ? this.#graphics.bounds(true) : new Rectangle();
    }

    protected override ownRect(): Rectangle {
        return this.#graphics ? this.#graphics.bounds(false) : new Rectangle();
    }

    protected override hitTestOwnContent(x: number, y: number): boolean {
        return this.#graphics != null && this.#graphics.hitTest(x, y, hitContext());
    }

    protected override renderContent(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void {
        if (this.#graphics) renderGraphics(ctx, this.#graphics, this);
    }

    protected override contentChanged(): void {
        this.#view?.markDirty();
    }
}
