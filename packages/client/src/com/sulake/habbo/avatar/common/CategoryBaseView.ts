import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TabUtils } from '@/com/sulake/habbo/avatar/common/TabUtils';

export class CategoryBaseView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::CategoryBaseView'); }

    constructor(param1: IAvatarEditorCategoryModel) {
        this._SafeStr_2134 = param1;
    }

    declare protected _window: IWindowContainer;

    protected _currentCategoryId: string = "";
    protected _currentTabName: string = "";

    declare protected _SafeStr_2134: IAvatarEditorCategoryModel;

    declare protected _isInitialized: boolean;
    static { (this.prototype as any)._isInitialized = false; }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_2134 = null;
        this._isInitialized = false;
    }

    public init(): void {
    }

    public reset(): void {
        this._currentCategoryId = "";
        this._currentTabName = "";
        this._isInitialized = false;
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        return this._window;
    }

    public showPalettes(param1: string, param2: number): void {
        this._SafeStr_2134.controller.view.gridView.showPalettes(param2);
    }

    protected updateGridView(param1: string): void {
        this._SafeStr_2134.controller.view.gridView.initFromList(this._SafeStr_2134, param1);
    }

    protected activateTab(param1: string): void {
        let _loc2_: IStaticBitmapWrapperWindow = null;
        if (!this._window) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName(param1), isIWindowContainer);
        if (_loc3_) {
            _loc2_ = asGuarded(_loc3_.findChildByTag("BITMAP"), isIStaticBitmapWrapperWindow);
            TabUtils.setElementImage(_loc2_, true);
        }
    }

    protected inactivateTab(param1: string): void {
        let _loc2_: IStaticBitmapWrapperWindow = null;
        if (!this._window) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName(param1), isIWindowContainer);
        if (_loc3_) {
            _loc2_ = asGuarded(_loc3_.findChildByTag("BITMAP"), isIStaticBitmapWrapperWindow);
            TabUtils.setElementImage(_loc2_, false);
        }
    }
}
