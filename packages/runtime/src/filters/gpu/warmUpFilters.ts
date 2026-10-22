import { ColorMatrixFilter as PixiColorMatrixFilter, Container, RenderTexture, Sprite, Texture, type Filter, type Renderer } from 'pixi.js';
import { FlashFilter } from './FlashFilter';

/**
 * Renders a few pixels through each kind of filter once, so their shader programs are compiled and linked while the
 * client loads rather than the first time something uses them: the first window with a drop shadow (the help
 * window, say) otherwise stalled the client for a frame or two while the GPU driver built them.
 */
export function warmUpFilters(renderer: Renderer): void {
    const sprite = new Sprite(Texture.WHITE);
    sprite.width = 8;
    sprite.height = 8;
    const container = new Container();
    container.addChild(sprite);
    const target = RenderTexture.create({ width: 16, height: 16 });
    const shadow = { dx: 1, dy: 1, color: 0, alpha: 1, strength: 1, inner: false, knockout: false, hideObject: false };
    const filters: Filter[] = [
        new FlashFilter({ blurX: 2, blurY: 2, quality: 1 }),
        new FlashFilter({ blurX: 2, blurY: 2, quality: 1, shadow }),
        new FlashFilter({ blurX: 2, blurY: 2, quality: 1, shadow: { ...shadow, inner: true } }),
        new PixiColorMatrixFilter(),
    ];
    try {
        for (const filter of filters) {
            container.filters = [filter];
            renderer.render({ container, target, clear: true });
        }
    } finally {
        // the filters are let go, not destroyed: a filter's programs are the ones every filter of its kind shares
        // (GlProgram.from caches them), and destroying them broke every later glow, shadow and blur
        container.filters = [];
        container.destroy({ children: true });
        target.destroy(true);
    }
}
