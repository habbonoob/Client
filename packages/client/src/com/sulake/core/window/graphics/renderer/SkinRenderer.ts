import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import type { ISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import { isISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';

export class SkinRenderer implements ISkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::SkinRenderer'); }

    static #staticsReady = false;

    protected static get ETCHING_POSITION(): Map<any, any> {
        SkinRenderer.#initStatics();
        return SkinRenderer.ETCHING_POSITION;
    }

    constructor(param1: string) {
        this._name = param1;
        this._templatesByName = new Dictionary();
        this._SafeStr_2726 = new Dictionary();
        this._layoutsByName = new Dictionary();
        this._SafeStr_2960 = new Dictionary();
    }

    declare protected _templatesByName: Map<any, any>;

    declare protected _SafeStr_2726: Map<any, any>;

    declare protected _layoutsByName: Map<any, any>;

    declare protected _SafeStr_2960: Map<any, any>;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public parse(param1: IAsset, param2: XMLList, param3: IAssetLibrary): void {
    }

    public dispose(): void {
        let _loc1_: string = null;
        if (!this._disposed) {
            for (_loc1_ of this._layoutsByName?.keys() ?? []) {
                castGuarded(this._layoutsByName.get(_loc1_), isISkinLayout, "com.sulake.core.window.graphics.renderer.ISkinLayout").dispose();
                this._layoutsByName.delete(_loc1_);
            }
            this._layoutsByName = null;
            this._SafeStr_2960 = null;
            for (_loc1_ of this._templatesByName?.keys() ?? []) {
                castGuarded(this._templatesByName.get(_loc1_), isISkinTemplate, "com.sulake.core.window.graphics.renderer.ISkinTemplate").dispose();
                this._templatesByName.delete(_loc1_);
            }
            this._templatesByName = null;
            this._SafeStr_2726 = null;
        }
    }

    public draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
    }

    public isStateDrawable(param1: number): boolean {
        return false;
    }

    public getLayoutByState(param1: number): ISkinLayout {
        return this._SafeStr_2960.get(param1);
    }

    public registerLayoutForRenderState(param1: number, param2: string): void {
        let _loc3_: ISkinLayout = this._layoutsByName.get(param2);
        if (_loc3_ == null) {
            throw new Error("Layout \"" + param2 + "\" not found in renderer!");
        }
        this._SafeStr_2960.set(param1, _loc3_);
    }

    public removeLayoutFromRenderState(param1: number): void {
        this._SafeStr_2960.delete(param1);
    }

    public hasLayoutForState(param1: number): boolean {
        return this._SafeStr_2960.get(param1) != null;
    }

    public getTemplateByState(param1: number): ISkinTemplate {
        return this._SafeStr_2726.get(param1);
    }

    public registerTemplateForRenderState(param1: number, param2: string): void {
        let _loc3_: ISkinTemplate = this._templatesByName.get(param2);
        if (_loc3_ == null) {
            throw new Error("Template \"" + param2 + "\" not found in renderer!");
        }
        this._SafeStr_2726.set(param1, _loc3_);
    }

    public removeTemplateFromRenderState(param1: number): void {
        this._SafeStr_2726.delete(param1);
    }

    public hasTemplateForState(param1: number): boolean {
        return this._SafeStr_2726.get(param1) != null;
    }

    public addLayout(param1: ISkinLayout): ISkinLayout {
        this._layoutsByName.set(param1.name, param1);
        return param1;
    }

    public getLayoutByName(param1: string): ISkinLayout {
        return this._layoutsByName.get(param1);
    }

    public removeLayout(param1: ISkinLayout): ISkinLayout {
        let _loc2_: any = 0;
        let _loc3_: any = null;
        param1 = this._templatesByName.get(param1.name);
        if (param1 != null) {
            for (_loc3_ of this._SafeStr_2960?.keys() ?? []) {
                _loc2_ = typeof _loc3_ === "number" && _loc3_ >>> 0 === _loc3_ ? _loc3_ : null;
                if (this._SafeStr_2960.get(_loc2_) == param1) {
                    this.removeLayoutFromRenderState(_loc2_ >>> 0);
                }
            }
            this._layoutsByName.delete(param1.name);
        }
        return param1;
    }

    public addTemplate(param1: ISkinTemplate): ISkinTemplate {
        this._templatesByName.set(param1.name, param1);
        return param1;
    }

    public getTemplateByName(param1: string): ISkinTemplate {
        return this._templatesByName.get(param1);
    }

    public removeTemplate(param1: ISkinTemplate): ISkinTemplate {
        let _loc2_: any = 0;
        let _loc3_: any = null;
        param1 = this._templatesByName.get(param1.name);
        if (param1 != null) {
            for (_loc3_ of this._SafeStr_2726?.keys() ?? []) {
                _loc2_ = typeof _loc3_ === "number" && _loc3_ >>> 0 === _loc3_ ? _loc3_ : null;
                if (this._SafeStr_2726.get(_loc2_) == param1) {
                    this.removeTemplateFromRenderState(_loc2_ >>> 0);
                }
            }
            this._templatesByName.delete(param1.name);
        }
        return param1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SkinRenderer.#staticsReady) return;
        SkinRenderer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SkinRenderer, name, { value, writable: true, configurable: true, enumerable: true });
        set("ETCHING_POSITION", null);
        set("ETCHING_POSITION", new Dictionary());
        SkinRenderer.ETCHING_POSITION.set("top-left", { "x": -1, "y": -1 });
        SkinRenderer.ETCHING_POSITION.set("top", { "x": 0, "y": -1 });
        SkinRenderer.ETCHING_POSITION.set("top-right", { "x": 1, "y": -1 });
        SkinRenderer.ETCHING_POSITION.set("left", { "x": -1, "y": 0 });
        SkinRenderer.ETCHING_POSITION.set("right", { "x": 1, "y": 0 });
        SkinRenderer.ETCHING_POSITION.set("bottom-left", { "x": -1, "y": 1 });
        SkinRenderer.ETCHING_POSITION.set("bottom", { "x": 0, "y": 1 });
        SkinRenderer.ETCHING_POSITION.set("bottom-right", { "x": 1, "y": 1 });
    }

    get [ISkinRenderer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
