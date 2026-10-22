import { Container } from 'pixi.js';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DisplayObject } from './DisplayObject';
import { Graphics } from './Graphics';
import { VectorView, hitContext, renderGraphics } from './vectorView';

/** A display object that is just a vector drawing (no children, no input). */
export class Shape extends DisplayObject {
    readonly #graphics: Graphics;
    readonly #view: VectorView;

    constructor() {
        super(new Container());
        this.#graphics = new Graphics(() => this.#view?.markDirty());
        this.#view = new VectorView(this.#graphics, this);
        this.node.addChild(this.#view.sprite);
    }

    get graphics(): Graphics {
        return this.#graphics;
    }

    protected override localBounds(): Rectangle {
        return this.#graphics.bounds(true);
    }

    protected override localRect(): Rectangle {
        return this.#graphics.bounds(false);
    }

    protected override hitTestOwnContent(x: number, y: number): boolean {
        return this.#graphics.hitTest(x, y, hitContext());
    }

    protected override renderContent(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void {
        renderGraphics(ctx, this.#graphics, this);
    }

    protected override contentChanged(): void {
        this.#view?.markDirty();
    }
}
