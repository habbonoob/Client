import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';

export class LegsView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.legs::LegsView'); }

    constructor(param1: IAvatarEditorCategoryModel) {
        super(param1);
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("legs"), isIWindowContainer);
            this._window.visible = false;
            this._window.procedure = this.windowEventProc;
        }
        this._isInitialized = true;
        if (this._SafeStr_2134 && this._currentCategoryId == "") {
            this._SafeStr_2134.switchCategory("lg");
        }
    }

    public switchCategory(param1: string): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        param1 = param1 == "" ? this._currentCategoryId : param1;
        this.inactivateTab(this._currentTabName);
        switch (param1) {
            case "lg":
                this._currentTabName = "tab_pants";
                break;
            case "sh":
                this._currentTabName = "tab_shoes";
                break;
            case "wa":
                this._currentTabName = "tab_belts";
                break;
            default:
                throw new Error("[LegsView] Unknown item category: \"" + param1 + "\"");
        }
        this._currentCategoryId = param1;
        this.activateTab(this._currentTabName);
        if (!this._isInitialized) {
            this.init();
        }
        this.updateGridView(this._currentCategoryId);
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "tab_pants":
                    this.switchCategory("lg");
                    break;
                case "tab_shoes":
                    this.switchCategory("sh");
                    break;
                case "tab_belts":
                    this.switchCategory("wa");
            }
        } else if (param1.type == "WME_OVER") {
            switch (param2.name) {
                case "tab_pants":
                case "tab_shoes":
                case "tab_belts":
                    this.activateTab(param2.name);
            }
        } else if (param1.type == "WME_OUT") {
            switch (param2.name) {
                case "tab_pants":
                case "tab_shoes":
                case "tab_belts":
                    if (this._currentTabName != param2.name) {
                        this.inactivateTab(param2.name);
                    }
            }
        }
    };
}
