import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import { CategoryBaseModel } from '@/com/sulake/habbo/avatar/common/CategoryBaseModel';
import { HotLooksView } from '@/com/sulake/habbo/avatar/hotlooks/HotLooksView';
import { Outfit } from '@/com/sulake/habbo/avatar/wardrobe/Outfit';
import { HotLooksMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/hotlooks/HotLooksMessageEvent';
import { GetHotLooksMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/hotlooks/GetHotLooksMessageComposer';

export class HotLooksModel extends CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.hotlooks::HotLooksModel'); }

    public static readonly CATEGORY_HOT_LOOKS: string = "hot_looks";
    public static readonly CATEGORY_MY_LOOKS: string = "my_looks";
    private static readonly MAXIMUM_HOT_LOOKS: number = 20;

    declare private _hotLooks: Map<any, any>;

    declare private _SafeStr_4157: HotLooksMessageEvent;

    constructor(param1: HabboAvatarEditor) {
        super(param1);
        this._hotLooks = new Dictionary();
        this._hotLooks.set("M", []);
        this._hotLooks.set("F", []);
        this._hotLooks.set("M.index", 0);
        this._hotLooks.set("F.index", 0);
        this.requestHotLooks(param1);
    }

    private requestHotLooks(param1: HabboAvatarEditor): void {
        if (param1.manager.communication) {
            this._SafeStr_4157 = new HotLooksMessageEvent(this.onHotLooksMessage);
            param1.manager.communication.addHabboConnectionMessageEvent(this._SafeStr_4157);
            param1.manager.communication.connection.send(new GetHotLooksMessageComposer(20));
        }
    }

    private onHotLooksMessage = (param1: HotLooksMessageEvent): void => {
        for (const _loc2_ of param1.getParser().hotLooks ?? []) {
            (asGuarded(this._hotLooks.get(_loc2_.gender.toUpperCase()), Array.isArray)).push(new Outfit(this._controller, stringOrNull(_loc2_.figureString), stringOrNull(_loc2_.gender)));
        }
    };

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_4157) {
            if (this.controller && this.controller.manager && this.controller.manager.communication) {
                this.controller.manager.communication.removeHabboConnectionMessageEvent(this._SafeStr_4157);
            }
            this._SafeStr_4157 = null;
        }
        this._hotLooks = null;
    }

    protected override init(): void {
        if (!this._view) {
            this._view = new HotLooksView(this);
        }
        this._view.init();
        this._isInitialized = true;
    }

    public selectHotLook(param1: number): void {
        let _loc2_: any[] = this._hotLooks.get(this._controller.gender);
        let _loc3_: Outfit = _loc2_[param1];
        if (_loc3_ != null) {
            if (_loc3_.figure == "") {
                return;
            }
            this._controller.loadAvatarInEditor(_loc3_.figure, _loc3_.gender, this._controller.clubMemberLevel);
        }
    }

    public get hotLooks(): any[] {
        return this._hotLooks.get(this._controller.gender);
    }

    public override switchCategory(param1: string = ""): void {
    }

    public override getCategoryData(param1: string): CategoryData {
        return null;
    }

    public override selectPart(param1: string, param2: number): void {
    }
}
