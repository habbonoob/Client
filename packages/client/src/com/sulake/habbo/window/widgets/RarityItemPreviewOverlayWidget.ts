import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { IRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';

export class RarityItemPreviewOverlayWidget implements IRarityItemPreviewOverlayWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::RarityItemPreviewOverlayWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "rarity_item_overlay_preview";
    private static readonly _SafeStr_8255: string = "rarity_item_overlay_preview:level";

    private static get RARITY_LEVEL_DEFAULT(): PropertyStruct {
        RarityItemPreviewOverlayWidget.#initStatics();
        return RarityItemPreviewOverlayWidget.RARITY_LEVEL_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("rarity_item_overlay_preview_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_6148 = asGuarded(this._root.findChildByName("level"), isITextWindow);
        this._SafeStr_2293.rootWindow = this._root;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _SafeStr_6148: ITextWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public set rarityLevel(param1: number) {
        this._rarityLevel = param1;
        this._SafeStr_6148.caption = param1.toString();
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(RarityItemPreviewOverlayWidget.RARITY_LEVEL_DEFAULT.withValue(this.rarityLevel));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: any = _loc2_.key;
            if ("rarity_item_overlay_preview:level" === _loc3_) {
                this.rarityLevel = _loc2_.value | 0;
            }
        }
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
        }
        this._disposed = true;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RarityItemPreviewOverlayWidget.#staticsReady) return;
        RarityItemPreviewOverlayWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RarityItemPreviewOverlayWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("RARITY_LEVEL_DEFAULT", null);
        set("RARITY_LEVEL_DEFAULT", new PropertyStruct("rarity_item_overlay_preview:level", 0, "int"));
    }

    get [IRarityItemPreviewOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
