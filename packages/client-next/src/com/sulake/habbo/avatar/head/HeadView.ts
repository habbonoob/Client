import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';

export class HeadView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.head::HeadView'); }

    constructor(param1: IAvatarEditorCategoryModel) {
        super(param1);
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("head"), isIWindowContainer);
            this._window.visible = false;
            this._window.procedure = this.windowEventProc;
        }
        this._isInitialized = true;
        if (this._SafeStr_2134 && this._currentCategoryId == "") {
            this._SafeStr_2134.switchCategory("hr");
        }
    }

    public switchCategory(param1: string): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        this.inactivateTab(this._currentTabName);
        param1 = param1 == "" ? this._currentCategoryId : param1;
        switch (param1) {
            case "hr":
                this._currentTabName = "tab_hair";
                break;
            case "ha":
                this._currentTabName = "tab_hat";
                break;
            case "he":
                this._currentTabName = "tab_accessories";
                break;
            case "ea":
                this._currentTabName = "tab_eyewear";
                break;
            case "fa":
                this._currentTabName = "tab_masks";
                break;
            default:
                throw new Error("[HeadView] Unknown item category: \"" + param1 + "\"");
        }
        this._currentCategoryId = param1;
        this.activateTab(this._currentTabName);
        if (!this._isInitialized) {
            this.init();
        }
        this.updateGridView(param1);
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "tab_hair":
                    this.switchCategory("hr");
                    break;
                case "tab_hat":
                    this.switchCategory("ha");
                    break;
                case "tab_accessories":
                    this.switchCategory("he");
                    break;
                case "tab_eyewear":
                    this.switchCategory("ea");
                    break;
                case "tab_masks":
                    this.switchCategory("fa");
            }
        } else if (param1.type == "WME_OVER") {
            switch (param2.name) {
                case "tab_hair":
                case "tab_hat":
                case "tab_accessories":
                case "tab_eyewear":
                case "tab_masks":
                    this.activateTab(param2.name);
            }
        } else if (param1.type == "WME_OUT") {
            switch (param2.name) {
                case "tab_hair":
                case "tab_hat":
                case "tab_accessories":
                case "tab_eyewear":
                case "tab_masks":
                    if (this._currentTabName != param2.name) {
                        this.inactivateTab(param2.name);
                    }
            }
        }
    };
}
