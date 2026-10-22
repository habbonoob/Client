import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class AvatarEditorGridColorItem {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::AvatarEditorGridColorItem'); }

    private static readonly SELECTED_ASSET: string = "avatar_editor_editor_clr_13x21_3";
    private static readonly UNSELECTED_ASSET: string = "avatar_editor_editor_clr_13x21_1";
    private static readonly COLORIZATION_ASSET: string = "avatar_editor_editor_clr_13x21_2";

    declare private _SafeStr_2134: IAvatarEditorCategoryModel;

    declare private _window: IWindowContainer;

    declare private _partColor: IPartColor;

    private _isSelected: boolean = false;

    declare private _border: IStaticBitmapWrapperWindow;

    declare private _isDisabledForWearing: boolean;
    static { (this.prototype as any)._isDisabledForWearing = false; }

    constructor(param1: IWindowContainer, param2: IAvatarEditorCategoryModel, param3: IPartColor, param4: boolean = false) {
        this._SafeStr_2134 = param2;
        this._window = param1;
        this._partColor = param3;
        this._isDisabledForWearing = param4;
        this._border = asGuarded(this._window.findChildByTag("BORDER"), isIStaticBitmapWrapperWindow);
        this.setupColor();
        this.updateThumbData();
        this._window.addEventListener("WME_OVER", this.onMouseOver);
        this._window.addEventListener("WME_OUT", this.onMouseOut);
    }

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._border.assetUri = this._isSelected ? "avatar_editor_editor_clr_13x21_3" : "avatar_editor_editor_clr_13x21_1";
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._border.assetUri = "avatar_editor_editor_clr_13x21_3";
    };

    private setupColor(): void {
        let _loc1_: BitmapDataAsset = asInstanceOf(this._SafeStr_2134.controller.manager.windowManager.assets.getAssetByName("avatar_editor_editor_clr_13x21_2"), BitmapDataAsset);
        let _loc2_: BitmapData = asInstanceOf(_loc1_.content, BitmapData);
        let _loc3_: BitmapData = _loc2_.clone();
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByTag("COLOR_IMAGE"), isIBitmapWrapperWindow);
        _loc4_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
        _loc3_.colorTransform(_loc3_.rect, this._partColor.colorTransform);
        _loc4_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
        _loc3_.dispose();
    }

    public dispose(): void {
        this._SafeStr_2134 = null;
        if (this._window != null) {
            if (!this._window.disposed) {
                this._window.dispose();
            }
        }
        this._window = null;
        this._partColor = null;
    }

    public get view(): IWindowContainer {
        return this._window;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
        this._border.assetUri = this._isSelected ? "avatar_editor_editor_clr_13x21_3" : "avatar_editor_editor_clr_13x21_1";
    }

    private updateThumbData(): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        this._border.assetUri = "avatar_editor_editor_clr_13x21_3";
        let _loc1_: IWindow = this._window.findChildByTag("CLUB_ICON");
        if (this._partColor) {
            _loc1_.visible = this._partColor.clubLevel > 0;
        } else {
            _loc1_.visible = false;
        }
    }

    public get partColor(): IPartColor {
        return this._partColor;
    }

    public get isDisabledForWearing(): boolean {
        return this._isDisabledForWearing;
    }
}
