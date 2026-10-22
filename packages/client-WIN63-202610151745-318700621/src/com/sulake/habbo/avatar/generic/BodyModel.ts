import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AvatarEditorGridColorItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridColorItem';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { BodyView } from '@/com/sulake/habbo/avatar/generic/BodyView';

export class BodyModel extends CategoryBaseModel implements IAvatarEditorCategoryModel, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar.generic::BodyModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this.initCategory("hd");
        this._isInitialized = true;
        if (!this._view) {
            this._view = new BodyView(this);
            if (this._view) {
                this._view.init();
            }
        }
    }

    public override switchCategory(param1: string = ""): void {
        this._view.switchCategory(param1);
    }

    public override selectColor(param1: string, param2: number, param3: number): void {
        let _loc4_: CategoryData = this._categories[param1];
        if (_loc4_ == null) {
            return;
        }
        _loc4_.selectColorIndex(param2, param3);
        let _loc5_: AvatarEditorGridColorItem = _loc4_.getSelectedColor(param3);
        if (_loc5_.isDisabledForWearing) {
            this._controller.openHabboClubAdWindow();
            return;
        }
        this._controller.figureData.savePartSetColourId(param1, _loc4_.getSelectedColorIds(), true);
        this.updateSelectionsFromFigure("hd");
    }

    protected override updateSelectionsFromFigure(param1: string): void {
        let _loc2_: CategoryData = this.getFaceCategoryData();
        if (!_loc2_) {
            return;
        }
        this.updateIconImage(_loc2_);
    }

    private getFaceCategoryData(): CategoryData {
        if (!this._categories) {
            return null;
        }
        let _loc1_: CategoryData = this._categories["hd"];
        if (_loc1_ == null) {
            return null;
        }
        let _loc3_: number = this._controller.figureData.getPartSetId("hd");
        let _loc2_: any[] = this._controller.figureData.getColourIds("hd");
        _loc1_.selectPartId(_loc3_);
        _loc1_.selectColorIds(_loc2_);
        return _loc1_;
    }

    private updateIconImage(param1: CategoryData, param2: string = null): void {
        let _loc5_: string = null;
        let _loc4_: IAvatarImage = null;
        for (const _loc3_ of param1.parts ?? []) {
            if (_loc3_.partSet) {
                _loc5_ = this._controller.figureData.getFigureStringWithFace(_loc3_.id | 0);
                if (param2 == null || param2 == _loc5_) {
                    _loc4_ = this._controller.manager.avatarRenderManager.createAvatarImage(_loc5_, "h", null, this);
                    _loc3_.iconImage = _loc4_.getCroppedImage("head");
                    _loc4_.dispose();
                }
            }
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: CategoryData = this.getFaceCategoryData();
        if (!_loc2_) {
            return;
        }
        this.updateIconImage(_loc2_, param1);
    }

    get [IDisposable](): true {
        return true;
    }
}
