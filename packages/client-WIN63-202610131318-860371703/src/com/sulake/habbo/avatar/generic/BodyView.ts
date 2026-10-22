import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';

export class BodyView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.generic::BodyView'); }

    private readonly TAB_BOY_ID: string = "tab_boy";
    private readonly TAB_GIRL_ID: string = "tab_girl";

    constructor(param1: IAvatarEditorCategoryModel) {
        super(param1);
        this._currentCategoryId = "hd";
    }

    public override reset(): void {
        super.reset();
        this._currentCategoryId = "hd";
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("generic"), isIWindowContainer);
            this._window.visible = false;
            this._window.procedure = this.windowEventProc;
        }
        this.updateGridView("hd");
        this._isInitialized = true;
        this.updateGenderTab();
    }

    public override getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        this.updateGenderTab();
        return this._window;
    }

    public updateGenderTab(): void {
        if (this._SafeStr_2134 == null) {
            return;
        }
        switch (this._SafeStr_2134.controller.gender) {
            case "M":
                this.activateTab("tab_boy");
                this.inactivateTab("tab_girl");
                break;
            case "F":
                this.activateTab("tab_girl");
                this.inactivateTab("tab_boy");
        }
    }

    public switchCategory(param1: string): void {
        this.updateGenderTab();
        this.updateGridView(param1 == "" ? this._currentCategoryId : param1);
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "tab_boy":
                    this._SafeStr_2134.controller.gender = "M";
                    param1.stopPropagation();
                    break;
                case "tab_girl":
                    this._SafeStr_2134.controller.gender = "F";
                    param1.stopPropagation();
            }
        } else if (param1.type == "WME_OVER") {
            switch (param2.name) {
                case "tab_boy":
                case "tab_girl":
                    this.activateTab(param2.name);
            }
        } else if (param1.type == "WME_OUT") {
            switch (param2.name) {
                case "tab_boy":
                case "tab_girl":
                    this.updateGenderTab();
            }
        }
    };
}
