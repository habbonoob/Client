import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IHabboAvatarEditorAvatarEffect } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorAvatarEffect';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { EffectsView__com_sulake_habbo_avatar_effects as EffectsView } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridViewEffects.group';
import { EffectsParamView } from '@/com/sulake/habbo/avatar/effects/EffectsParamView';
import { isIHabboAvatarEditorAvatarEffect } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorAvatarEffect';

export class EffectsModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.effects::EffectsModel'); }

    public static readonly GRIDTYPE_EFFECTS: string = "effects";
    private _selectedIndex: Map<any, any> = new Dictionary();

    declare private _SafeStr_5538: EffectsParamView;

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this._isInitialized = true;
        if (!this._view) {
            this._view = new EffectsView(this);
            this._SafeStr_5538 = new EffectsParamView(this, this.controller.manager.windowManager, this.controller.manager.assets);
            if (this._view) {
                this._view.init();
            }
        }
    }

    public get effects(): any[] {
        if (this.controller.manager.inventory == null) {
            return [];
        }
        return this.controller.manager.inventory.getAvatarEffects();
    }

    public override selectPart(param1: string, param2: number): void {
        let _loc3_: IHabboAvatarEditorAvatarEffect = null;
        this.setSelectionVisual(param1, this._selectedIndex.get(param1) | 0, false);
        let _loc5_: number = this.controller.figureData.avatarEffectType;
        if (param2 == -1 && _loc5_ != -1) {
            param2 = castTo(this._view, EffectsView).getGridIndex(_loc5_);
            for (const _loc4_ of this.effects ?? []) {
                if (_loc4_.type == _loc5_) {
                    _loc3_ = castGuarded(_loc4_, isIHabboAvatarEditorAvatarEffect, "com.sulake.habbo.avatar.IHabboAvatarEditorAvatarEffect");
                    _loc3_.isSelected = true;
                    break;
                }
            }
        } else if (param2 == -1 && _loc5_ == -1 || param2 == 0) {
            param2 = 0;
            this.controller.setAvatarEffectType(-1);
            this._SafeStr_5538.updateView(null);
        } else {
            _loc3_ = castGuarded(this.effects[param2 - 1], isIHabboAvatarEditorAvatarEffect, "com.sulake.habbo.avatar.IHabboAvatarEditorAvatarEffect");
            _loc3_.isSelected = true;
            this.controller.setAvatarEffectType(_loc3_.type);
        }
        this._selectedIndex.set(param1, param2);
        this.setSelectionVisual(param1, param2, true);
        this._SafeStr_5538.updateView(_loc3_);
    }

    private setSelectionVisual(param1: string, param2: number, param3: boolean): void {
        castTo(this._view, EffectsView).updateSelectionVisual(param1, param2, param3);
    }
}
