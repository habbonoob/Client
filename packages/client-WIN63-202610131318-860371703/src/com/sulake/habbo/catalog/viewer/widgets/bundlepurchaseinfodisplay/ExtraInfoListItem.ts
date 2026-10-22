import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ExtraInfoListItem implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay::ExtraInfoListItem'); }

    public static readonly ALIGN_TOP: number = 0;
    public static readonly ALIGN_BOTTOM: number = 1;
    public static readonly ALIGN_OVERLAY: number = 2;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _data: ExtraInfoItemData;

    declare private _alignment: number;
    static { (this.prototype as any)._alignment = 0; }

    declare private _alwaysOnTop: boolean;
    static { (this.prototype as any)._alwaysOnTop = false; }

    private _disposed: boolean = false;

    declare private _creationSeconds: number;
    static { (this.prototype as any)._creationSeconds = NaN; }

    declare private _removalSeconds: number;
    static { (this.prototype as any)._removalSeconds = NaN; }

    private _SafeStr_6786: boolean = false;

    constructor(param1: BundlePurchaseExtraInfoWidget, param2: number, param3: ExtraInfoItemData, param4: number = 0, param5: boolean = false) {
        this._id = param2;
        this._data = param3;
        this._alignment = param4;
        this._alwaysOnTop = param5;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._data = null;
        this._disposed = true;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get data(): ExtraInfoItemData {
        return this._data;
    }

    public set data(param1: ExtraInfoItemData) {
        this._data = param1;
    }

    public get alignment(): number {
        return this._alignment;
    }

    public get alwaysOnTop(): boolean {
        return this._alwaysOnTop;
    }

    public get creationSeconds(): number {
        return this._creationSeconds;
    }

    public set creationSeconds(param1: number) {
        this._creationSeconds = param1;
    }

    public get isItemRemoved(): boolean {
        return this._SafeStr_6786;
    }

    public get removalSeconds(): number {
        return this._removalSeconds;
    }

    public set removalSeconds(param1: number) {
        this._removalSeconds = param1;
        this._SafeStr_6786 = true;
    }

    public getRenderedWindow(): IWindowContainer {
        return null;
    }

    get [IDisposable](): true {
        return true;
    }
}
