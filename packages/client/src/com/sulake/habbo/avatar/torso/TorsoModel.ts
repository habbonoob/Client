import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { TorsoView } from '@/com/sulake/habbo/avatar/torso/TorsoView';

export class TorsoModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.torso::TorsoModel'); }

    constructor(param1: HabboAvatarEditor) {
        super(param1);
    }

    protected override init(): void {
        super.init();
        this.initCategory("cc");
        this.initCategory("ch");
        this.initCategory("ca");
        this.initCategory("cp");
        this._isInitialized = true;
        if (!this._view) {
            this._view = new TorsoView(this);
            if (this._view) {
                this._view.init();
            }
        }
    }
}
