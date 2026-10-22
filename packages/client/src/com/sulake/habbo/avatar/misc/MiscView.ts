import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';

export class MiscView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.misc::MiscView'); }

    private readonly defaultCategory: string = "pt";

    constructor(param1: IAvatarEditorCategoryModel) {
        super(param1);
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("misc"), isIWindowContainer);
            this._window.visible = false;
            this._window.procedure = this.windowEventProc;
        }
        this._isInitialized = true;
        if (this._SafeStr_2134 && this._currentCategoryId == "") {
            this._SafeStr_2134.switchCategory("pt");
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
            case "pt":
                this._currentTabName = "tab_pets";
                break;
            case "mc":
                this._currentTabName = "tab_misc";
                break;
            default:
                throw new Error("[MiscView] Unknown item category: \"" + param1 + "\"");
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
                case "tab_pets":
                    this.switchCategory("pt");
                    break;
                case "tab_misc":
                    this.switchCategory("mc");
            }
        } else if (param1.type == "WME_OVER") {
            switch (param2.name) {
                case "tab_pets":
                case "tab_misc":
                    this.activateTab(param2.name);
            }
        } else if (param1.type == "WME_OUT") {
            switch (param2.name) {
                case "tab_pets":
                case "tab_misc":
                    if (this._currentTabName != param2.name) {
                        this.inactivateTab(param2.name);
                    }
            }
        }
    };
}
