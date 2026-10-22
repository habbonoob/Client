import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataController } from '@/com/sulake/core/window/Classes.group';
import { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';

const preSuperBitmapWrapperController: ((self: BitmapWrapperController) => void)[] = [];

export class BitmapWrapperController extends BitmapDataController implements IBitmapWrapperWindow, IBitmapDataContainer {
    static { registerClassName(this, 'com.sulake.core.window.components::BitmapWrapperController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        preSuperBitmapWrapperController.push((self: BitmapWrapperController) => {
            self._disposesBitmap = Boolean(param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3)._SafeStr_2119("handle_bitmap_disposing"));
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    declare protected _disposesBitmap: boolean;

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.unshift(this.createProperty("handle_bitmap_disposing", this._disposesBitmap));
        _loc1_.unshift(this.createProperty("bitmap_asset_name", this._bitmapAssetName));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "handle_bitmap_disposing":
                    this._disposesBitmap = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "bitmap_asset_name":
                    this._bitmapAssetName = typeof _loc2_.value === "string" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    declare protected _bitmapAssetName: string;

    public get bitmapAssetName(): string {
        return this._bitmapAssetName;
    }

    public set bitmapAssetName(param1: string) {
        this._bitmapAssetName = param1;
    }

    public get bitmap(): BitmapData {
        return this._bitmapData;
    }

    public set bitmap(param1: BitmapData) {
        if (this._disposesBitmap && this._bitmapData && param1 != this._bitmapData) {
            this._bitmapData.dispose();
        }
        this._bitmapData = param1;
        this.fitSize();
        this._context.invalidate(this, null, 1);
    }

    public set bitmapData(param1: BitmapData) {
        this.bitmap = param1;
    }

    public get disposesBitmap(): boolean {
        return this._disposesBitmap;
    }

    public set disposesBitmap(param1: boolean) {
        this._disposesBitmap = param1;
    }

    public override clone(): IWindow {
        let _loc1_: BitmapWrapperController = asInstanceOf(super.clone(), BitmapWrapperController);
        _loc1_._bitmapData = this._disposesBitmap && this._bitmapData ? this._bitmapData.clone() : this._bitmapData;
        _loc1_._disposesBitmap = this._disposesBitmap;
        _loc1_._bitmapAssetName = this._bitmapAssetName;
        return _loc1_;
    }

    public override dispose(): void {
        if (this._bitmapData) {
            if (this._disposesBitmap) {
                this._bitmapData.dispose();
            }
            this._bitmapData = null;
        }
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this._disposesBitmap = false;
        preSuperBitmapWrapperController.pop()!(this);
        super.initInstanceFields();
    }

    public override get bitmapData(): BitmapData {
        return super.bitmapData;
    }

    get [IBitmapWrapperWindow](): true {
        return true;
    }
}
