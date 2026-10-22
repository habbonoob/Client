import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6112 } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/_SafeCls_6112';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { _SafeCls_6038 } from '@/com/sulake/habbo/communication/enum/_SafeCls_6038';
import { BadgeInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgeInfoEvent';
import { GetBadgeInfoComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/GetBadgeInfoComposer';
import { _SafeCls_6046 } from '@/com/sulake/habbo/groups/_SafeCls_6046';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetAchievementResolutionTrophyDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAchievementResolutionTrophyDataUpdateEvent';
import { TrophyTheme } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyTheme';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureBadgeDisplayWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureBadgeDisplayWidgetHandler'); }

    private static readonly TROPHY_VIEW_TYPE: number = 0;
    private _disposed: boolean = false;

    declare private _SafeStr_14715: BadgeInfoEvent;

    private _container: IRoomWidgetHandlerContainer = null;

    declare private _pendingBadgeCode: string;

    declare private _SafeStr_14716: string;

    declare private _pendingFrameTitle: string;

    declare private _pendingMessage: string;

    declare private _pendingUserName: string;

    constructor() {
        this._SafeStr_14715 = new BadgeInfoEvent(this.onBadgeInfo);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_ACHIEVEMENT_RESOLUTION_ENGRAVING";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container != null && this._container.connection != null) {
            this._container.connection.removeMessageEvent(this._SafeStr_14715);
        }
        this._container = param1;
        if (this._container != null && this._container.connection != null) {
            this._container.connection.addMessageEvent(this._SafeStr_14715);
        }
    }

    public dispose(): void {
        if (this._container != null && this._container.connection != null) {
            this._container.connection.removeMessageEvent(this._SafeStr_14715);
        }
        this._disposed = true;
        this.clearPendingBadgeDisplayRequest();
        this._SafeStr_14715 = null;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING", "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED", "RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        if (this.disposed || param1 == null) {
            return null;
        }
        switch (param1.type) {
            case "RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING":
                this.handleEngravingRequest(param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null, true);
                break;
            case "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                this.clearPendingBadgeDisplayRequest();
                this.handleEngravingRequest(param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null, false);
                break;
            case "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED":
                this.clearPendingBadgeDisplayRequest();
                this._container.windowManager.simpleAlert("${resolution.failed.title}", "${resolution.failed.subtitle}", "${resolution.failed.text}", null, null, null, "help_error_state");
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
    }

    public update(): void {
    }

    private handleEngravingRequest(param1: RoomWidgetFurniToWidgetMessage, param2: boolean): void {
        let _loc5_: StringArrayStuffData = this.getStuffData(param1);
        if (_loc5_ == null) {
            return;
        }
        let _loc7_: string = _loc5_.getValue(1);
        let _loc6_: string = this._container.localization.getBadgeName(_loc7_);
        let _loc4_: string = "\r\n" + this._container.localization.getBadgeDesc(_loc7_);
        let _loc10_: string = _loc5_.getValue(2);
        let _loc3_: string = _loc5_.getValue(3);
        let _loc8_: string = param2 ? "badge.display.engraving.text" : "resolution.engraving.text";
        let _loc9_: string = this._container.localization.getLocalizationWithParams(_loc8_, "%badgename%", "badgename", _loc6_, "badgedesc", _loc4_);
        if (_loc9_ == null) {
            _loc9_ = _loc6_;
        }
        if (!param2) {
            this.dispatchTrophyDataUpdate(_loc10_, _loc3_, _loc9_, this._container.localization.getLocalization("widget.furni.trophy.title", "Trophy"), TrophyTheme.getHeaderColor(0), 0, 16777215);
            return;
        }
        this._pendingBadgeCode = _loc7_;
        this._pendingUserName = _loc10_;
        this._SafeStr_14716 = _loc3_;
        this._pendingMessage = _loc9_;
        this._pendingFrameTitle = this._container.localization.getLocalization("widget.furni.badge_display.title", "Badge Display");
        if (this._container != null && this._container.connection != null) {
            this._container.connection.send(new GetBadgeInfoComposer(_loc7_));
            return;
        }
        this.dispatchTrophyDataUpdate(_loc10_, _loc3_, _loc9_, this._pendingFrameTitle, this.getBadgeDisplayHeaderColor(0), this.getBadgeDisplayBackgroundTheme(0), this.getBadgeDisplayBackgroundColor(0));
        this.clearPendingBadgeDisplayRequest();
    }

    private getStuffData(param1: RoomWidgetFurniToWidgetMessage): StringArrayStuffData {
        if (this._container == null || param1 == null) {
            return null;
        }
        let _loc2_: IRoomObject = this._container.roomEngine.getRoomObject(param1.roomId, param1.id, param1.category);
        if (_loc2_ == null) {
            return null;
        }
        let _loc4_: IRoomObjectModel = _loc2_.getModel();
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: StringArrayStuffData = new StringArrayStuffData();
        _loc3_.initializeFromRoomObjectModel(_loc4_);
        return _loc3_;
    }

    private onBadgeInfo = (param1: BadgeInfoEvent): void => {
        if (this.disposed || this._pendingBadgeCode == null || param1 == null) {
            return;
        }
        let _loc2_: _SafeCls_6112 = param1.getParser();
        if (_loc2_ == null || _loc2_.badgeCode != this._pendingBadgeCode) {
            return;
        }
        this.dispatchTrophyDataUpdate(this._pendingUserName, this._SafeStr_14716, this.getBadgeDisplayMessage(this._pendingMessage, _loc2_.badgeRarityId, _loc2_.ownerCount), this._pendingFrameTitle, this.getBadgeDisplayHeaderColor(_loc2_.badgeRarityId), this.getBadgeDisplayBackgroundTheme(_loc2_.badgeRarityId), this.getBadgeDisplayBackgroundColor(_loc2_.badgeRarityId));
        this.clearPendingBadgeDisplayRequest();
    };

    private getBadgeDisplayMessage(param1: string, param2: number, param3: number): string {
        let _loc4_: any[] = [];
        if (param1 != null && param1 != "") {
            _loc4_.push(param1 + "\n\n\n");
        }
        _loc4_.push(this.getBadgeRarityLine(param2));
        if (_SafeCls_6046.shouldShowOwnerCount(param3)) {
            _loc4_.push(" - " + this.getBadgeOwnerCountLine(param3));
        }
        return _loc4_.join("");
    }

    private getBadgeRarityLine(param1: number): string {
        return this._container.localization.getLocalizationWithParams("badge.rarity.badge", "%rarity% badge", "rarity", this.getBadgeRarityText(param1));
    }

    private getBadgeOwnerCountLine(param1: number): string {
        return this._container.localization.getLocalizationWithParams("badge.owner_count", "Owned by %count% users", "count", _SafeCls_6046.formatOwnerCount(param1));
    }

    private getBadgeRarityText(param1: number): string {
        let _loc2_: string = _SafeCls_6038.getLabelLocalizationKey(param1, this.isUncommonBadgeRarityEnabled());
        return this._container.localization.getLocalization(_loc2_, _loc2_);
    }

    private dispatchTrophyDataUpdate(param1: string, param2: string, param3: string, param4: string, param5: number, param6: number, param7: number): void {
        let _loc8_: RoomWidgetAchievementResolutionTrophyDataUpdateEvent = new RoomWidgetAchievementResolutionTrophyDataUpdateEvent("RWARTDUE_TROPHY_DATA", param6 + 1, param1, param2, param3, 0, param4, param5, param6, param7);
        this._container.events.dispatchEvent(_loc8_);
    }

    private clearPendingBadgeDisplayRequest(): void {
        this._pendingBadgeCode = null;
        this._pendingUserName = null;
        this._SafeStr_14716 = null;
        this._pendingMessage = null;
        this._pendingFrameTitle = null;
    }

    private getBadgeDisplayBackgroundTheme(param1: number): number {
        return param1 == 6 ? 0 : 1;
    }

    private getBadgeDisplayBackgroundColor(param1: number): number {
        if (!_SafeCls_6038.isStandaloneTier(param1, this.isUncommonBadgeRarityEnabled()) || param1 == 6) {
            return 16777215;
        }
        return this.getBadgeDisplayTintColor(param1);
    }

    private getBadgeDisplayHeaderColor(param1: number): number {
        if (!_SafeCls_6038.isStandaloneTier(param1, this.isUncommonBadgeRarityEnabled())) {
            return TrophyTheme.getHeaderColor(1);
        }
        if (param1 == 6) {
            return TrophyTheme.getHeaderColor(0);
        }
        return this.multiplyColor(TrophyTheme.getHeaderColor(1), this.getBadgeDisplayTintColor(param1));
    }

    private getBadgeDisplayTintColor(param1: number): number {
        return this.lightenColor(_SafeCls_6038.getDisplayColor(param1, this.isUncommonBadgeRarityEnabled()), this.getBackgroundLighteningFactor(param1));
    }

    private getBackgroundLighteningFactor(param1: number): number {
        switch (param1 - 1) {
            case 0:
                return 0.25;
            case 1:
                return 0.3;
            case 2:
                return 0.35;
            case 3:
                return 0.4;
            case 4:
                return 0.45;
            default:
                return 0;
        }
    }

    private isUncommonBadgeRarityEnabled(): boolean {
        return this._container != null && this._container.config != null && this._container.config.getBoolean("badge_rarity.uncommon");
    }

    private lightenColor(param1: number, param2: number): number {
        let _loc3_: number = (param1 >> 16 & 0xFF) >>> 0;
        let _loc4_: number = (param1 >> 8 & 0xFF) >>> 0;
        let _loc5_: number = (param1 & 0xFF) >>> 0;
        _loc3_ += (255 - _loc3_) * param2 >>> 0;
        _loc4_ += (255 - _loc4_) * param2 >>> 0;
        _loc5_ += (255 - _loc5_) * param2 >>> 0;
        return (0xFF000000 | _loc3_ << 16 | _loc4_ << 8 | _loc5_) >>> 0;
    }

    private multiplyColor(param1: number, param2: number): number {
        let _loc3_: number = (param1 >> 16 & 0xFF) * (param2 >> 16 & 0xFF) / 255 >>> 0;
        let _loc4_: number = (param1 >> 8 & 0xFF) * (param2 >> 8 & 0xFF) / 255 >>> 0;
        let _loc5_: number = (param1 & 0xFF) * (param2 & 0xFF) / 255 >>> 0;
        return (0xFF000000 | _loc3_ << 16 | _loc4_ << 8 | _loc5_) >>> 0;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
