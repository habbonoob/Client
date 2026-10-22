import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { RoomObjectBadgeAssetEvent } from '@/com/sulake/habbo/room/events/RoomObjectBadgeAssetEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectGroupBadgeUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectGroupBadgeUpdateMessage';
import { RoomObjectSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectSelectedMessage';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureGuildCustomizedLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureGuildCustomizedLogic'); }

    public static readonly GUILD_ID_STUFFDATA_KEY: number = 1;
    public static readonly BADGE_CODE_STUFFDATA_KEY: number = 2;
    public static readonly COLOR_1_STUFFDATA_KEY: number = 3;
    public static readonly COLOR_2_STUFFDATA_KEY: number = 4;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROGBE_LOAD_BADGE", "ROWRE_GUILD_FURNI_CONTEXT_MENU", "ROWRE_CLOSE_FURNI_CONTEXT_MENU"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: StringArrayStuffData = null;
        let _loc6_: RoomObjectEvent = null;
        super.processUpdateMessage(param1);
        let _loc5_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc5_ != null) {
            _loc3_ = asInstanceOf(_loc5_.data, StringArrayStuffData);
            if (_loc3_ != null) {
                this.updateGuildId(_loc3_.getValue(1));
                this.updateGuildBadge(_loc3_.getValue(2));
                this.updateGuildColors(_loc3_.getValue(3), _loc3_.getValue(4));
            }
        }
        let _loc4_: RoomObjectGroupBadgeUpdateMessage = param1 instanceof RoomObjectGroupBadgeUpdateMessage ? param1 : null;
        if (_loc4_ != null) {
            if (_loc4_.assetName != "loading_icon") {
                this.object.getModelController().setString("furniture_guild_customized_asset_name", _loc4_.assetName);
                this.update(getTimer());
            }
        }
        let _loc2_: RoomObjectSelectedMessage = param1 instanceof RoomObjectSelectedMessage ? param1 : null;
        if (_loc2_) {
            if (this.eventDispatcher != null && this.object != null) {
                if (!_loc2_.selected) {
                    _loc6_ = new RoomObjectWidgetRequestEvent("ROWRE_CLOSE_FURNI_CONTEXT_MENU", this.object);
                    this.eventDispatcher.dispatchEvent(_loc6_);
                }
            }
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc3_: string = param1.type;
        if ("click" === _loc3_) {
            this.openContextMenu();
        }
        super.mouseEvent(param1, param2);
    }

    protected openContextMenu(): void {
        let _loc1_: RoomObjectEvent = new RoomObjectWidgetRequestEvent("ROWRE_GUILD_FURNI_CONTEXT_MENU", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }

    private updateGuildColors(param1: string, param2: string): void {
        this.object.getModelController().setNumber("furniture_guild_customized_color_1", parseInt(param1, 16));
        this.object.getModelController().setNumber("furniture_guild_customized_color_2", parseInt(param2, 16));
    }

    private updateGuildBadge(param1: string): void {
        this.eventDispatcher.dispatchEvent(new RoomObjectBadgeAssetEvent("ROGBE_LOAD_BADGE", this.object, param1, true));
    }

    protected updateGuildId(param1: string): void {
        this.object.getModelController().setNumber("furniture_guild_customized_guild_id", parseInt(param1));
    }
}
