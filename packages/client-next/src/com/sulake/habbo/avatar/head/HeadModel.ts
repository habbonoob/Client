import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { HeadView } from '@/com/sulake/habbo/avatar/head/HeadView';

export class HeadModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.head::HeadModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this.initCategory("hr");
        this.initCategory("ha");
        this.initCategory("he");
        this.initCategory("ea");
        this.initCategory("fa");
        this._isInitialized = true;
        if (!this._view) {
            this._view = new HeadView(this);
            if (this._view) {
                this._view.init();
            }
        }
    }
}
