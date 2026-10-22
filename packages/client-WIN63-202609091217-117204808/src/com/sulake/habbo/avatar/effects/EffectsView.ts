import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CategoryBaseView } from '@/com/sulake/habbo/avatar/common/CategoryBaseView';
import { AvatarEditorGridViewEffects } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridViewEffects.group';

export class EffectsView extends CategoryBaseView implements IAvatarEditorCategoryView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.effects::EffectsView'); }

    constructor(param1: IAvatarEditorCategoryModel) {
        super(param1);
    }

    public override init(): void {
        if (!this._window) {
            this._window = asGuarded(this._SafeStr_2134.controller.view.getCategoryContainer("effects"), isIWindowContainer);
            this._window.visible = false;
        }
        if (this._SafeStr_2134 && this._currentCategoryId == "") {
            this._SafeStr_2134.switchCategory("effects");
        }
        this._isInitialized = true;
        this.updateGridView(this._currentCategoryId);
    }

    public override reset(): void {
        this.updateGridView(this._currentCategoryId);
        this._SafeStr_2134.selectPart(this._currentCategoryId, -1);
    }

    public switchCategory(param1: string): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        param1 = param1 == "" ? this._currentCategoryId : param1;
        this._currentCategoryId = param1;
        if (!this._isInitialized) {
            this.init();
        }
        this.updateGridView(this._currentCategoryId);
    }

    public updateSelectionVisual(param1: string, param2: number, param3: boolean): void {
        castTo(this._SafeStr_2134.controller.view.effectsGridView, AvatarEditorGridViewEffects).updateSelection(param2, param3);
    }

    public getGridIndex(param1: number): number {
        return castTo(this._SafeStr_2134.controller.view.effectsGridView, AvatarEditorGridViewEffects).getGridIndex(param1);
    }

    protected override updateGridView(param1: string): void {
        this._SafeStr_2134.controller.view.effectsGridView.initFromList(this._SafeStr_2134, param1);
    }
}
