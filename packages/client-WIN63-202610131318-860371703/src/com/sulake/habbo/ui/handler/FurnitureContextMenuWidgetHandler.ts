import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuildFurniContextMenuInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/GuildFurniContextMenuInfoMessageParser';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FigureSetIdsEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/clothing/FigureSetIdsEvent';
import { GuildFurniContextMenuInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/GuildFurniContextMenuInfoMessageEvent';
import { UpdateFigureDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/register/UpdateFigureDataMessageComposer';
import { CustomizeAvatarWithFurniMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/CustomizeAvatarWithFurniMessageComposer';
import { JoinHabboGroupMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/JoinHabboGroupMessageComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { MysteryBoxToolbarExtension } from '@/com/sulake/habbo/ui/widget/furniture/mysterybox/MysteryBoxToolbarExtension';
import { RoomWidgetUseProductMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUseProductMessage';

export class FurnitureContextMenuWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureContextMenuWidgetHandler'); }

    private static readonly PENDING_PURCHASABLE_CLOTHING_TIMEOUT_MS: number = 5000;
    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    declare private _widget: FurnitureContextMenuWidget;

    declare private _connection: IConnection;

    private _SafeStr_3719: IMessageEvent = null;

    declare private _SafeStr_4126: MysteryBoxToolbarExtension;

    private _SafeStr_14556: IMessageEvent = null;

    declare private _pendingPurchasableClothingFurniName: string;

    declare private _SafeStr_14557: string;

    declare private _SafeStr_14558: string;

    private _SafeStr_14559: number = -1;

    constructor() {
        this._SafeStr_4126 = new MysteryBoxToolbarExtension(this);
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_4126 != null) {
                this._SafeStr_4126.dispose();
                this._SafeStr_4126 = null;
            }
            this.unsetContainer();
            if (this._connection != null && this._SafeStr_3719) {
                this._connection.removeMessageEvent(this._SafeStr_3719);
                this._SafeStr_3719 = null;
            }
            if (this._connection != null && this._SafeStr_14556) {
                this._connection.removeMessageEvent(this._SafeStr_14556);
                this._SafeStr_14556 = null;
            }
            this._connection = null;
            this._widget = null;
            this.clearPendingPurchasableClothingRequest();
        }
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return null;
    }

    public get roomEngine(): IRoomEngine {
        return this._container ? this._container.roomEngine : null;
    }

    private unsetContainer(): void {
        if (this._container != null) {
            this._container.roomEngine.events.removeEventListener("ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG", this.onMonsterPlantSeedPlantConfirmationDialogRequested);
            this._container.roomEngine.events.removeEventListener("ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG", this.onPurchasableClothingConfirmationDialogRequested);
            this._container.roomEngine.events.removeEventListener("RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG", this.onMysteryBoxOpenDialogRequested);
            this._container.roomEngine.events.removeEventListener("RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG", this.onEffectBoxOpenDialogRequested);
            this._container.roomEngine.events.removeEventListener("RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG", this.onMysteryTrophyOpenDialogRequested);
        }
        this._container = null;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this.unsetContainer();
        this._container = param1;
        if (param1 == null) {
            return;
        }
        if (this._container.roomEngine != null) {
            this._container.roomEngine.events.addEventListener("ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG", this.onMonsterPlantSeedPlantConfirmationDialogRequested);
            this._container.roomEngine.events.addEventListener("ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG", this.onPurchasableClothingConfirmationDialogRequested);
            this._container.roomEngine.events.addEventListener("RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG", this.onMysteryBoxOpenDialogRequested);
            this._container.roomEngine.events.addEventListener("RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG", this.onEffectBoxOpenDialogRequested);
            this._container.roomEngine.events.addEventListener("RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG", this.onMysteryTrophyOpenDialogRequested);
        }
    }

    public set widget(param1: FurnitureContextMenuWidget) {
        this._widget = param1;
        if (this._container.config.getBoolean("mysterybox.tracker.active")) {
            this._SafeStr_4126.createWindow();
        }
    }

    public set connection(param1: IConnection) {
        this._connection = param1;
        if (this._connection == null) {
            return;
        }
        if (!this._SafeStr_3719) {
            this._SafeStr_3719 = new GuildFurniContextMenuInfoMessageEvent(this.onGuildFurniContextMenuInfo);
            this._connection.addMessageEvent(this._SafeStr_3719);
        }
        if (!this._SafeStr_14556) {
            this._SafeStr_14556 = new FigureSetIdsEvent(this.onFigureSetIds);
            this._connection.addMessageEvent(this._SafeStr_14556);
        }
    }

    public get roomSession(): IRoomSession {
        return this._container ? this._container.roomSession : null;
    }

    public getFurniData(param1: IRoomObject): IFurnitureData {
        let _loc2_: IFurnitureData = null;
        let _loc3_: number = 0;
        if (param1) {
            _loc3_ = param1.getModel().getNumber("furniture_type_id") | 0;
            _loc2_ = this._container.sessionDataManager.getFloorItemData(_loc3_);
        }
        return _loc2_;
    }

    public redeemPurchasableClothing(param1: number, param2: string, param3: string, param4: string): void {
        if (this._connection == null) {
            return;
        }
        this._pendingPurchasableClothingFurniName = param2;
        this._SafeStr_14557 = param3;
        this._SafeStr_14558 = param4;
        this._SafeStr_14559 = getTimer();
        this._connection.send(new CustomizeAvatarWithFurniMessageComposer(param1));
    }

    public getWidgetMessages(): any[] {
        return ["RWUPM_MONSTERPLANT_SEED"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetUseProductMessage = null;
        if (!param1) {
            return null;
        }
        let _loc3_: string = param1.type;
        if ("RWUPM_MONSTERPLANT_SEED" === _loc3_) {
            _loc2_ = param1 instanceof RoomWidgetUseProductMessage ? param1 : null;
            if (_loc2_) {
                this._container.roomSession.plantSeed(_loc2_.roomObjectId);
            }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_OPEN_FURNI_CONTEXT_MENU", "RETWE_CLOSE_FURNI_CONTEXT_MENU"];
    }

    public processEvent(param1: Event): void {
        if (this._widget == null) {
            return;
        }
        let _loc3_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IRoomObject = this.getRoomObject(_loc3_.objectId);
        if (_loc2_ == null) {
            return;
        }
        switch (param1.type) {
            case "RETWE_OPEN_FURNI_CONTEXT_MENU":
                switch (_loc3_.contextMenu) {
                    case "FRIEND_FURNITURE":
                        this._widget.showFriendFurnitureContextMenu(_loc2_);
                        break;
                    case "MONSTERPLANT_SEED":
                        if (this._container.isOwnerOfFurniture(_loc2_)) {
                            this._widget.showMonsterPlantSeedContextMenu(_loc2_, _loc3_.category);
                        }
                        break;
                    case "MYSTERY_BOX":
                        this._widget.showMysteryBoxContextMenu(_loc2_);
                        break;
                    case "RANDOM_TELEPORT":
                        this._widget.showRandomTeleportContextMenu(_loc2_, _loc3_.category);
                        break;
                    case "PURCHASABLE_CLOTHING":
                        this._widget.showUsableFurnitureContextMenu(_loc2_, _loc3_.category);
                }
                break;
            case "RETWE_CLOSE_FURNI_CONTEXT_MENU":
                this._widget.hideContextMenu(_loc2_);
        }
    }

    public update(): void {
    }

    public getObjectRectangle(param1: number): Rectangle {
        return this._container.roomEngine.getRoomObjectBoundingRectangle(this._container.roomSession.roomId, param1, 10, this._container.getFirstCanvasId());
    }

    public getObjectScreenLocation(param1: number): Point {
        return this._container.roomEngine.getRoomObjectScreenLocation(this._container.roomSession.roomId, param1, 10, this._container.getFirstCanvasId());
    }

    public sendGoToHomeRoomMessage(param1: number): void {
        this._container.navigator.goToPrivateRoom(param1);
    }

    public sendJoinToGroupMessage(param1: number): void {
        this._connection.send(new JoinHabboGroupMessageComposer(param1));
    }

    private getRoomObject(param1: number): IRoomObject {
        if (this._container == null) {
            return null;
        }
        return this._container.roomEngine.getRoomObject(this._container.roomSession.roomId, param1, 10);
    }

    private onGuildFurniContextMenuInfo = (param1: GuildFurniContextMenuInfoMessageEvent): void => {
        let _loc2_: GuildFurniContextMenuInfoMessageParser = null;
        let _loc3_: IRoomObject = null;
        if (this._widget != null) {
            _loc2_ = param1.getParser();
            _loc3_ = this.getRoomObject(_loc2_.objectId);
            if (_loc3_ != null) {
                this._widget.showGuildFurnitureContextMenu(_loc3_, _loc2_.guildId, _loc2_.guildName, _loc2_.guildHomeRoomId, _loc2_.userIsMember, _loc2_.guildHasReadableForum);
            }
        }
    };

    private onFigureSetIds = (param1: FigureSetIdsEvent): void => {
        let _loc2_: boolean = this.hasFreshPendingPurchasableClothingRequest();
        if (this._connection == null || !_loc2_) {
            if (!_loc2_) {
                this.clearPendingPurchasableClothingRequest();
            }
            return;
        }
        let _loc3_: string[] = param1.getParser().boundFurnitureNames;
        if (_loc3_ == null || _loc3_.indexOf(this._pendingPurchasableClothingFurniName) == -1) {
            return;
        }
        this._connection.send(new UpdateFigureDataMessageComposer(this._SafeStr_14557, this._SafeStr_14558));
        this.clearPendingPurchasableClothingRequest();
    };

    private hasFreshPendingPurchasableClothingRequest(): boolean {
        if (this._SafeStr_14559 < 0 || this._SafeStr_14557 == null || this._SafeStr_14558 == null || this._pendingPurchasableClothingFurniName == null) {
            return false;
        }
        return getTimer() - this._SafeStr_14559 <= 5000;
    }

    private clearPendingPurchasableClothingRequest(): void {
        this._pendingPurchasableClothingFurniName = null;
        this._SafeStr_14557 = null;
        this._SafeStr_14558 = null;
        this._SafeStr_14559 = -1;
    }

    private onMonsterPlantSeedPlantConfirmationDialogRequested = (param1: RoomEngineObjectEvent): void => {
        let _loc3_: IRoomObject = null;
        let _loc2_: boolean = false;
        if (this._widget != null) {
            _loc3_ = this.getRoomObject(param1.objectId);
            if (_loc3_ != null) {
                _loc2_ = this._container.isOwnerOfFurniture(_loc3_);
                if (!_loc2_) {
                    return;
                }
                this._widget.showPlantSeedConfirmationDialog(_loc3_);
            }
        }
    };

    private onPurchasableClothingConfirmationDialogRequested = (param1: RoomEngineObjectEvent): void => {
        let _loc3_: IRoomObject = null;
        let _loc2_: boolean = false;
        if (this._widget != null) {
            _loc3_ = this.getRoomObject(param1.objectId);
            if (_loc3_ != null) {
                _loc2_ = this._container.isOwnerOfFurniture(_loc3_);
                if (!_loc2_) {
                    return;
                }
                this._widget.showPurchasableClothingConfirmationDialog(_loc3_);
            }
        }
    };

    private onEffectBoxOpenDialogRequested = (param1: RoomEngineObjectEvent): void => {
        let _loc3_: IRoomObject = null;
        let _loc2_: boolean = false;
        if (this._widget != null) {
            _loc3_ = this.getRoomObject(param1.objectId);
            if (_loc3_ != null) {
                _loc2_ = this._container.isOwnerOfFurniture(_loc3_);
                if (!_loc2_) {
                    return;
                }
                this._widget.showEffectBoxOpenDialog(_loc3_);
            }
        }
    };

    private onMysteryTrophyOpenDialogRequested = (param1: RoomEngineObjectEvent): void => {
        let _loc3_: IRoomObject = null;
        let _loc2_: boolean = false;
        if (this._widget != null) {
            _loc3_ = this.getRoomObject(param1.objectId);
            if (_loc3_ != null) {
                _loc2_ = this._container.isOwnerOfFurniture(_loc3_);
                if (!_loc2_) {
                    return;
                }
                this._widget.showMysteryTrophyOpenDialog(_loc3_);
            }
        }
    };

    private onMysteryBoxOpenDialogRequested = (param1: RoomEngineObjectEvent): void => {
        let _loc2_: IRoomObject = null;
        if (this._widget != null) {
            _loc2_ = this.getRoomObject(param1.objectId);
            if (_loc2_ != null) {
                this._widget.showMysteryBoxOpenDialog(_loc2_);
            }
        }
    };

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public get widget(): FurnitureContextMenuWidget {
        return this._widget;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
