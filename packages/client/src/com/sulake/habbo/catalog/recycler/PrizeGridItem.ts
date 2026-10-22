import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { ProductGridItem } from '@/com/sulake/habbo/catalog/viewer/ProductGridItem';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PrizeGridItem extends ProductGridItem implements IGetImageListener, IGridItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::PrizeGridItem'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PrizeGridItem.#initStatics();
        return PrizeGridItem._log;
    }

    constructor(param1: HabboCatalog) {
        super(param1);
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        this.setIconImage(param2, true);
    }

    public imageFailed(param1: number): void {
    }

    protected initProductIcon(param1: IRoomEngine, param2: string, param3: number, param4: string = ""): void {
        let _loc5_: ImageResult = null;
        let _loc7_: BitmapData = null;
        let _loc6_: BitmapData = null;
        switch (param2) {
            case "s":
                _loc5_ = param1.getFurnitureIcon(param3, this);
                break;
            case "i":
                _loc5_ = param1.getWallItemIcon(param3, this, param4);
                break;
            case "chat_style":
                _loc7_ = this.catalog.freeFlowChat.chatStyleLibrary.getStyle(param3).selectorPreview.clone();
                _loc6_ = new BitmapData(_loc7_.width / 2 | 0, _loc7_.height / 2 | 0, true, 0);
                _loc6_.draw(_loc7_, new Matrix(0.5, 0, 0, 0.5), null, null, null, true);
                break;
            default:
                PrizeGridItem._log.warn("[PrizeItemContainer] Can not yet handle this type of product: " + param2);
                return;
        }
        if (_loc5_ != null) {
            _loc6_ = _loc5_.data;
        }
        if (_loc6_ != null) {
            this.setIconImage(_loc6_, true);
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PrizeGridItem.#staticsReady) return;
        PrizeGridItem.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PrizeGridItem, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.recycler.PrizeGridItem"));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
