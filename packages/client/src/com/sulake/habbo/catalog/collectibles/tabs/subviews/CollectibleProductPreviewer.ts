import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { ICollectibleProductPreviewListener } from '@/com/sulake/habbo/catalog/collectibles/ICollectibleProductPreviewListener';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { EffectPreviewer } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/EffectPreviewer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';

export class CollectibleProductPreviewer implements ICollectibleProductPreviewListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs.subviews::CollectibleProductPreviewer'); }

    constructor(param1: IBitmapWrapperWindow, param2: IWidgetWindow, param3: IWidgetWindow, param4: IStaticBitmapWrapperWindow, param5: IWidgetWindow = null, param6: IStaticBitmapWrapperWindow = null, param7: IWidgetWindow = null, param8: IAvatarRenderManager = null) {
        this._SafeStr_3905 = param5;
        this._SafeStr_4083 = param2;
        this._SafeStr_3903 = param3;
        this._SafeStr_3191 = param1;
        this._SafeStr_4680 = param6;
        if (param7 != null && param8 != null) {
            this._SafeStr_3084 = new EffectPreviewer(param7, param8);
        }
        this._SafeStr_4489 = param4;
        this.clearPreviewer();
    }

    declare private _SafeStr_3955: number;
    static { (this.prototype as any)._SafeStr_3955 = NaN; }

    declare private _SafeStr_3905: IWidgetWindow;

    declare private _SafeStr_4083: IWidgetWindow;

    declare private _SafeStr_3903: IWidgetWindow;

    declare private _SafeStr_3191: IBitmapWrapperWindow;

    declare private _SafeStr_4680: IStaticBitmapWrapperWindow;

    declare private _SafeStr_3084: EffectPreviewer;

    declare private _SafeStr_4489: IStaticBitmapWrapperWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set imageResult(param1: ImageResult) {
        this.clearPreviewer();
        if (!this._SafeStr_3191) {
            return;
        }
        if (param1 != null) {
            this._SafeStr_3955 = param1.id;
            this.setPreviewImage(param1.data);
        }
    }

    public set avatarResult(param1: string) {
        this.clearPreviewer();
        if (!this._SafeStr_3905) {
            return;
        }
        this._SafeStr_3905.visible = true;
        let _loc2_: IAvatarImageWidget = asGuarded(this._SafeStr_3905.widget, isIAvatarImageWidget);
        _loc2_.figure = param1;
    }

    public set badgeResult(param1: string) {
        this.clearPreviewer();
        if (!this._SafeStr_4083) {
            return;
        }
        this._SafeStr_4083.visible = true;
        let _loc2_: IBadgeImageWidget = asGuarded(this._SafeStr_4083.widget, isIBadgeImageWidget);
        _loc2_.badgeId = param1;
    }

    public set petResult(param1: string) {
        this.clearPreviewer();
        if (!this._SafeStr_3903) {
            return;
        }
        this._SafeStr_3903.visible = true;
        let _loc2_: IPetImageWidget = asGuarded(this._SafeStr_3903.widget, isIPetImageWidget);
        _loc2_.figure = param1;
    }

    public clearPreviewer(): void {
        this._SafeStr_3955 = -1;
        if (this._SafeStr_3905 != null) {
            this._SafeStr_3905.visible = false;
        }
        if (this._SafeStr_3191 != null) {
            this._SafeStr_3191.visible = false;
        }
        if (this._SafeStr_4083 != null) {
            this._SafeStr_4083.visible = false;
        }
        if (this._SafeStr_4680 != null) {
            this._SafeStr_4680.visible = false;
        }
        if (this._SafeStr_3903 != null) {
            this._SafeStr_3903.visible = false;
        }
        if (this._SafeStr_3084 != null) {
            this._SafeStr_3084.visible = false;
        }
        if (this._SafeStr_4489 != null) {
            this._SafeStr_4489.visible = false;
        }
    }

    public setEffectResult(param1: string, param2: number): void {
        this.clearPreviewer();
        if (!this._SafeStr_3084) {
            return;
        }
        this._SafeStr_3084.visible = true;
        this._SafeStr_3084.update(param1, param2);
    }

    public setUnknownImage(): void {
        this.clearPreviewer();
        if (!this._SafeStr_4489) {
            return;
        }
        this._SafeStr_4489.visible = true;
    }

    public setPlaceholder(): void {
        this.clearPreviewer();
        if (!this._SafeStr_4680) {
            return;
        }
        this._SafeStr_4680.visible = true;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._SafeStr_3955 == param1 && this._SafeStr_3191 != null) {
            this.setPreviewImage(param2);
        }
    }

    public imageFailed(param1: number): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_3084 != null) {
            this._SafeStr_3084.dispose();
            this._SafeStr_3084 = null;
        }
        this._SafeStr_3955 = -1;
    }

    private setPreviewImage(param1: BitmapData): void {
        if (this._SafeStr_3191 == null) {
            return;
        }
        if (param1 == null) {
            this._SafeStr_3191.visible = false;
            return;
        }
        this._SafeStr_3191.bitmap = param1.clone();
        this._SafeStr_3191.visible = true;
    }

    get [IGetImageListener](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
