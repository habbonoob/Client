import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetAchievementResolutionTrophyDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAchievementResolutionTrophyDataUpdateEvent';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureBadgeDisplayWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureBadgeDisplayWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_ACHIEVEMENT_RESOLUTION_ENGRAVING";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING", "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED", "RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc5_: RoomWidgetFurniToWidgetMessage = null;
        let _loc4_: IRoomObject = null;
        let _loc12_: IRoomObjectModel = null;
        let _loc6_: StringArrayStuffData = null;
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc11_: string = null;
        let _loc2_: string = null;
        let _loc8_: string = null;
        let _loc9_: any = null;
        let _loc10_: RoomWidgetAchievementResolutionTrophyDataUpdateEvent = null;
        if (this.disposed || param1 == null) {
            return null;
        }
        switch (param1.type) {
            case "RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING":
            case "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                _loc5_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc5_.roomId, _loc5_.id, _loc5_.category);
                if (_loc4_ != null) {
                    _loc12_ = _loc4_.getModel();
                    if (_loc12_ != null) {
                        _loc6_ = new StringArrayStuffData();
                        _loc6_.initializeFromRoomObjectModel(_loc12_);
                        _loc7_ = this._container.localization.getBadgeName(_loc6_.getValue(1));
                        _loc3_ = "\r\n" + this._container.localization.getBadgeDesc(_loc6_.getValue(1));
                        _loc11_ = _loc6_.getValue(2);
                        _loc2_ = _loc6_.getValue(3);
                        _loc8_ = param1.type == "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING" ? "resolution.engraving.text" : "badge.display.engraving.text";
                        _loc9_ = this._container.localization.getLocalizationWithParams(_loc8_, "%badgename%", "badgename", _loc7_, "badgedesc", _loc3_);
                        if (_loc9_ == null) {
                            _loc9_ = _loc7_;
                        }
                        _loc10_ = new RoomWidgetAchievementResolutionTrophyDataUpdateEvent("RWARTDUE_TROPHY_DATA", 0, _loc11_, _loc2_, stringOrNull(_loc9_), 0);
                        this._container.events.dispatchEvent(_loc10_);
                    }
                }
                break;
            case "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED":
                this._container.windowManager.simpleAlert("${resolution.failed.title}", "${resolution.failed.subtitle}", "${resolution.failed.text}", null, null, null, "help_error_state");
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
