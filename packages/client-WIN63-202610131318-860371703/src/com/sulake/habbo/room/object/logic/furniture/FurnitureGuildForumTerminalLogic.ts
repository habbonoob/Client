import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureGuildCustomizedLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureGuildCustomizedLogic';

export class FurnitureGuildForumTerminalLogic extends FurnitureGuildCustomizedLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureGuildForumTerminalLogic'); }

    constructor() {
        super();
    }

    protected override openContextMenu(): void {
    }

    protected override updateGuildId(param1: string): void {
        super.updateGuildId(param1);
        this.object.getModelController().setString("furniture_internal_link", "groupforum/" + param1);
    }

    public override useObject(): void {
        if (this.eventDispatcher != null && this.object != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_INTERNAL_LINK", this.object));
        }
        super.useObject();
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["ROWRE_INTERNAL_LINK"]);
    }
}
