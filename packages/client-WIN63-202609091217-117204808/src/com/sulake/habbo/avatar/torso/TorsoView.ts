import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import type { TorsoModel } from '@/com/sulake/habbo/avatar/torso/TorsoModel';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';

export class TorsoView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.torso::TorsoView'); }

    constructor(param1: TorsoModel) {
        super(param1);
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("torso"), isIWindowContainer);
            this._window.visible = false;
            this._window.procedure = this.windowEventProc;
        }
        this._isInitialized = true;
        if (this._SafeStr_2134 && this._currentCategoryId == "") {
            this._SafeStr_2134.switchCategory("ch");
        }
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2134 = null;
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
            case "ch":
                this._currentTabName = "tab_shirt";
                break;
            case "cc":
                this._currentTabName = "tab_jacket";
                break;
            case "cp":
                this._currentTabName = "tab_prints";
                break;
            case "ca":
                this._currentTabName = "tab_accessories";
                break;
            default:
                throw new Error("[TorsoView] Unknown item category: \"" + param1 + "\"");
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
                case "tab_jacket":
                    this.switchCategory("cc");
                    break;
                case "tab_shirt":
                    this.switchCategory("ch");
                    break;
                case "tab_accessories":
                    this.switchCategory("ca");
                    break;
                case "tab_prints":
                    this.switchCategory("cp");
            }
        } else if (param1.type == "WME_OVER") {
            switch (param2.name) {
                case "tab_jacket":
                case "tab_prints":
                case "tab_shirt":
                case "tab_accessories":
                    this.activateTab(param2.name);
            }
        } else if (param1.type == "WME_OUT") {
            switch (param2.name) {
                case "tab_jacket":
                case "tab_prints":
                case "tab_shirt":
                case "tab_accessories":
                    if (this._currentTabName != param2.name) {
                        this.inactivateTab(param2.name);
                    }
            }
        }
    };
}
