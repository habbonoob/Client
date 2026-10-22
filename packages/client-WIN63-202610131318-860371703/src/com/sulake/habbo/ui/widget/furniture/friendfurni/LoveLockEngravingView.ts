import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import type { FriendFurniEngravingWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingWidget';
import { FriendFurniEngravingView } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingView';

export class LoveLockEngravingView extends FriendFurniEngravingView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.friendfurni::LoveLockEngravingView'); }

    constructor(param1: FriendFurniEngravingWidget, param2: StringArrayStuffData) {
        super(param1, param2);
    }

    protected override assetName(): string {
        return "lovelock_engraving_xml";
    }
}
