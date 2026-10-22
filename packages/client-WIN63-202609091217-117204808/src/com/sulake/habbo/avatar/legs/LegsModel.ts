import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { LegsView } from '@/com/sulake/habbo/avatar/legs/LegsView';

export class LegsModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.legs::LegsModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this.initCategory("lg");
        this.initCategory("sh");
        this.initCategory("wa");
        this._isInitialized = true;
        if (!this._view) {
            this._view = new LegsView(this);
            if (this._view) {
                this._view.init();
            }
        }
    }
}
