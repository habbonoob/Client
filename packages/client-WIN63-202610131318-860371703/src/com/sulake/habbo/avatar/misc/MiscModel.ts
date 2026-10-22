import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import { MiscView } from '@/com/sulake/habbo/avatar/misc/MiscView';

export class MiscModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.misc::MiscModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this.initCategory("pt");
        this.initCategory("mc");
        this.ensureEmptyCategory("pt");
        this.ensureEmptyCategory("mc");
        this._isInitialized = true;
        if (!this._view) {
            this._view = new MiscView(this);
            if (this._view) {
                this._view.init();
            }
        }
    }

    private ensureEmptyCategory(param1: string): void {
        if (!this._categories || this._categories[param1] != null) {
            return;
        }
        this._categories[param1] = new CategoryData([], []);
    }
}
