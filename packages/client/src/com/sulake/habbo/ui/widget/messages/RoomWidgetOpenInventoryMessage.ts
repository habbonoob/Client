import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetOpenInventoryMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetOpenInventoryMessage'); }

    public static readonly _SafeStr_7865: string = "RWGOI_MESSAGE_OPEN_INVENTORY";
    public static readonly INVENTORY_EFFECTS: string = "inventory_effects";
    public static readonly INVENTORY_BADGES: string = "inventory_badges";
    public static readonly INVENTORY_CLOTHES: string = "inventory_clothes";
    public static readonly INVENTORY_FURNITURE: string = "inventory_furniture";

    constructor(param1: string) {
        super("RWGOI_MESSAGE_OPEN_INVENTORY");
        this._inventoryType = param1;
    }

    declare private _inventoryType: string;

    public get inventoryType(): string {
        return this._inventoryType;
    }
}
