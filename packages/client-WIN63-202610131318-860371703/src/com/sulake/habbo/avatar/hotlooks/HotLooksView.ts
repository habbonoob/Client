import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import type { HotLooksModel } from '@/com/sulake/habbo/avatar/hotlooks/HotLooksModel';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class HotLooksView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.hotlooks::HotLooksView'); }

    declare private _window: IWindowContainer;

    declare private _SafeStr_2134: HotLooksModel;

    declare private _SafeStr_3688: IItemGridWindow;

    constructor(param1: HotLooksModel) {
        this._SafeStr_2134 = param1;
    }

    public init(): void {
        if (this._SafeStr_3688) {
            this._SafeStr_3688.removeGridItems();
        }
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("hotlooks"), isIWindowContainer);
            this._SafeStr_3688 = asGuarded(this._window.findChildByName("hotlooks"), isIItemGridWindow);
            this._window.visible = false;
        }
        this.update();
    }

    public dispose(): void {
        this._SafeStr_3688.removeGridItems();
        this._window = null;
        this._SafeStr_2134 = null;
    }

    public update(): void {
        let _loc2_: IWindow = null;
        this._SafeStr_3688.removeGridItems();
        for (const _loc1_ of this._SafeStr_2134.hotLooks ?? []) {
            _loc2_ = _loc1_.view.window;
            this._SafeStr_3688.addGridItem(_loc2_);
            _loc2_.procedure = this.hotLooksEventProc;
        }
    }

    public getWindowContainer(): IWindowContainer {
        return this._window;
    }

    private hotLooksEventProc = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc3_: number = 0;
        if (param2 == null) {
            param2 = asGuarded(param1.target, isIWindow);
        }
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._SafeStr_3688.getGridItemIndex(param2.parent);
            this._SafeStr_2134.selectHotLook(_loc3_);
        }
    };

    public switchCategory(param1: string): void {
    }

    public showPalettes(param1: string, param2: number): void {
    }

    public reset(): void {
    }
}
