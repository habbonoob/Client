import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { LoaderInfo } from '@habbo-pixi/runtime/display/LoaderInfo';
import type { ErrorEvent } from '@habbo-pixi/runtime/events/ErrorEvent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { IsometricImageFurniVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/IsometricImageFurniVisualization';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ExternalIsometricImageFurniVisualization extends IsometricImageFurniVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::ExternalIsometricImageFurniVisualization'); }

    static #staticsReady = false;

    private static get _log_ExternalIsometricImageFurniVisualization(): SimpleLogger {
        ExternalIsometricImageFurniVisualization.#initStatics();
        return ExternalIsometricImageFurniVisualization._log_ExternalIsometricImageFurniVisualization;
    }

    constructor() {
        super();
    }

    private _thumbnailUrl: string = null;

    protected override updateModel(param1: number): boolean {
        let _loc4_: string = null;
        let _loc2_: Loader = null;
        let _loc3_: LoaderContext = null;
        if (this.object != null) {
            _loc4_ = this.getThumbnailURL();
            if (this._thumbnailUrl != _loc4_) {
                this._thumbnailUrl = _loc4_;
                if (this._thumbnailUrl != null && this._thumbnailUrl != "") {
                    _loc2_ = new Loader();
                    _loc2_.name = _loc4_;
                    _loc2_.contentLoaderInfo.addEventListener("complete", this.onThumbnailLoaded);
                    _loc2_.contentLoaderInfo.addEventListener("ioError", ExternalIsometricImageFurniVisualization.onThumbnailError);
                    _loc2_.contentLoaderInfo.addEventListener("securityError", ExternalIsometricImageFurniVisualization.onThumbnailError);
                    _loc3_ = new LoaderContext(true);
                    _loc3_.checkPolicyFile = true;
                    _loc2_.load(new URLRequest(_loc4_), _loc3_);
                } else {
                    this.setThumbnailImages(null);
                }
            }
        }
        return super.updateModel(param1);
    }

    protected getThumbnailURL(): string {
        throw new Exception("This method must be overridden!");
    }

    private static onThumbnailError(param1: ErrorEvent): void {
        ExternalIsometricImageFurniVisualization._log_ExternalIsometricImageFurniVisualization.warn("External Image thumbnail download error: " + param1.toString());
    }

    private onThumbnailLoaded = (param1: Event): void => {
        let _loc3_: LoaderInfo = asInstanceOf(param1.target, LoaderInfo);
        let _loc2_: Bitmap = asInstanceOf(_loc3_.content, Bitmap);
        if (_loc2_ != null) {
            this.setThumbnailImages(_loc2_.bitmapData);
        } else {
            this.setThumbnailImages(null);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ExternalIsometricImageFurniVisualization.#staticsReady) return;
        ExternalIsometricImageFurniVisualization.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ExternalIsometricImageFurniVisualization, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_ExternalIsometricImageFurniVisualization", null);
        set("_log_ExternalIsometricImageFurniVisualization", new SimpleLogger("com.sulake.habbo.room.object.visualization.furniture.ExternalIsometricImageFurniVisualization"));
    }
}
