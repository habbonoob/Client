import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FurnitureExternalImageVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureExternalImageVisualization';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { setInterval } from '@habbo-pixi/runtime/utils/setInterval';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ExtraDataManager {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::ExtraDataManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ExtraDataManager.#initStatics();
        return ExtraDataManager._log;
    }

    public static readonly STATUS_REJECTED: string = "REJECTED";
    private static readonly BATCH_MAX_QUERY_AMOUNT: number = 50;
    private static instance: ExtraDataManager;

    public static requestExtraDataUrl(param1: FurnitureExternalImageVisualization): void {
        ExtraDataManager.getInstance().inputVisualizationQueue.push(param1);
    }

    public static furnitureDisposed(param1: FurnitureExternalImageVisualization): void {
        ExtraDataManager.getInstance().removeFurniFromManager(param1);
    }

    private static getInstance(): ExtraDataManager {
        if (!ExtraDataManager.instance) {
            ExtraDataManager.instance = new ExtraDataManager();
        }
        return ExtraDataManager.instance;
    }

    constructor() {
        this.setTimedBatchCheck();
    }

    private inputVisualizationQueue: FurnitureExternalImageVisualization[] = [];
    private outputVisualizationQueue: FurnitureExternalImageVisualization[] = [];

    private setTimedBatchCheck(): void {
        setInterval(this.handleBatch, 200);
    }

    private removeFurniFromManager(param1: FurnitureExternalImageVisualization): void {
        if (this.inputVisualizationQueue.indexOf(param1) != -1) {
            this.inputVisualizationQueue.splice(this.inputVisualizationQueue.indexOf(param1), 1);
        }
        if (this.outputVisualizationQueue.indexOf(param1) != -1) {
            this.outputVisualizationQueue.splice(this.outputVisualizationQueue.indexOf(param1), 1);
        }
    }

    private handleBatch = (): void => {
        let _loc8_: string = null;
        let _loc4_: number = 0;
        let _loc5_: FurnitureExternalImageVisualization = null;
        let _loc7_: string = null;
        if (this.inputVisualizationQueue.length == 0) {
            return;
        }
        let _loc2_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < 50) {
            if (this.inputVisualizationQueue.length > 0) {
                _loc5_ = this.inputVisualizationQueue.shift();
                _loc7_ = _loc5_.getExternalImageUUID();
                _loc2_.push(_loc7_);
                _loc8_ = _loc5_.getExtraDataUrl();
                this.outputVisualizationQueue.push(_loc5_);
            }
            _loc4_++;
        }
        if (_loc2_.length == 0) {
            return;
        }
        let _loc1_: URLRequest = new URLRequest();
        _loc1_.method = "POST";
        _loc1_.contentType = "application/json";
        let _loc6_: string = JSON.stringify(_loc2_);
        _loc1_.data = _loc6_;
        _loc1_.url = _loc8_;
        let _loc3_: URLLoader = new URLLoader(_loc1_);
        _loc3_.dataFormat = "text";
        _loc3_.addEventListener("complete", this.onExtraDataLoaded);
        _loc3_.addEventListener("ioError", this.onExtraDataError);
    };

    private onExtraDataLoaded = (param1: Event): void => {
        let _loc3_: any;
        let _loc2_: any[] = null;
        let _loc6_: string = null;
        let _loc4_: string = stringOrNull(param1.currentTarget.data);
        if (_loc4_ && _loc4_.length > 0) {
            try {
                _loc2_ = asGuarded(JSON.parse(_loc4_), Array.isArray);
                for (const _loc5_ of _loc2_ ?? []) {
                    _loc6_ = stringOrNull(_loc5_.id);
                    for (_loc3_ of this.outputVisualizationQueue ?? []) {
                        if (_loc3_.getExternalImageUUID() == _loc6_) {
                            if (_loc5_.status && _loc5_.status == "REJECTED") {
                                _loc3_.onUrlFromExtraDataService("REJECTED");
                            } else {
                                _loc3_.onUrlFromExtraDataService(stringOrNull(_loc5_.url));
                            }
                            this.removeFurniFromManager(_loc3_);
                        }
                    }
                }
            } catch (error) {
                ExtraDataManager._log.warn("Failed to read JSON from ExtraData service");
            }
        }
    };

    private onExtraDataError = (param1: IOErrorEvent): void => {
        ExtraDataManager._log.warn("Failed to load ExtraData batch " + param1.toString());
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ExtraDataManager.#staticsReady) return;
        ExtraDataManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ExtraDataManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.room.object.visualization.data.ExtraDataManager"));
    }
}
