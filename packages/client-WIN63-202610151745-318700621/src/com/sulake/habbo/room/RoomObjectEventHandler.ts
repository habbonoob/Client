import { asGuarded, asInstanceOf, castGuarded, castTo, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { FurniStackingHeightMap } from '@/com/sulake/habbo/room/utils/FurniStackingHeightMap';
import type { LegacyWallGeometry } from '@/com/sulake/habbo/room/utils/LegacyWallGeometry';
import type { TileObjectMap } from '@/com/sulake/habbo/room/utils/TileObjectMap';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomRenderingCanvasMouseListener } from '@/com/sulake/room/renderer/IRoomRenderingCanvasMouseListener';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RedeemNftLootBoxMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/RedeemNftLootBoxMessageComposer';
import { GetResolutionAchievementsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/lobby/GetResolutionAchievementsMessageComposer';
import { LookToMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/LookToMessageComposer';
import { ClickCharacterComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/ClickCharacterComposer';
import { ClickFurniMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/ClickFurniMessageComposer';
import { GetItemDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/GetItemDataMessageComposer';
import { MoveAvatarMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MoveAvatarMessageComposer';
import { MoveEntityInFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MoveEntityInFlatMessageComposer';
import { MoveObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MoveObjectMessageComposer';
import { MovePetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MovePetMessageComposer';
import { MoveWallItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/MoveWallItemMessageComposer';
import { PickupObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PickupObjectMessageComposer';
import { PlaceBotMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlaceBotMessageComposer';
import { PlaceObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlaceObjectMessageComposer';
import { PlacePetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlacePetMessageComposer';
import { RemoveBotFromFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemoveBotFromFlatMessageComposer';
import { RemoveItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemoveItemMessageComposer';
import { SetItemDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/SetItemDataMessageComposer';
import { SetObjectDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/SetObjectDataMessageComposer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { UseWallItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseWallItemMessageComposer';
import { DiceOffMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/DiceOffMessageComposer';
import { EnterOneWayDoorMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/EnterOneWayDoorMessageComposer';
import { GetGuildFurniContextMenuInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/GetGuildFurniContextMenuInfoMessageComposer';
import { PlacePostItMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/PlacePostItMessageComposer';
import { SetRandomStateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetRandomStateMessageComposer';
import { SpinWheelOfFortuneMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SpinWheelOfFortuneMessageComposer';
import { ThrowDiceMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/ThrowDiceMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomEngineDimmerStateEvent } from '@/com/sulake/habbo/room/events/RoomEngineDimmerStateEvent';
import { RoomEngineHSLColorEnableEvent } from '@/com/sulake/habbo/room/events/RoomEngineHSLColorEnableEvent';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { RoomEngineObjectPlacedEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedEvent';
import { RoomEngineObjectPlacedOnUserEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedOnUserEvent';
import { RoomEngineObjectPlaySoundEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlaySoundEvent';
import { RoomEngineObjectSamplePlaybackEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectSamplePlaybackEvent';
import { RoomEngineSoundMachineEvent } from '@/com/sulake/habbo/room/events/RoomEngineSoundMachineEvent';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { RoomEngineUseProductEvent } from '@/com/sulake/habbo/room/events/RoomEngineUseProductEvent';
import { RoomObjectBadgeAssetEvent } from '@/com/sulake/habbo/room/events/RoomObjectBadgeAssetEvent';
import { RoomObjectDimmerStateUpdateEvent } from '@/com/sulake/habbo/room/events/RoomObjectDimmerStateUpdateEvent';
import { RoomObjectFurniIconAssetEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurniIconAssetEvent';
import { RoomObjectHSLColorEnableEvent } from '@/com/sulake/habbo/room/events/RoomObjectHSLColorEnableEvent';
import { RoomObjectPlaySoundIdEvent } from '@/com/sulake/habbo/room/events/RoomObjectPlaySoundIdEvent';
import { RoomObjectRoomAdEvent } from '@/com/sulake/habbo/room/events/RoomObjectRoomAdEvent';
import { RoomObjectSamplePlaybackEvent } from '@/com/sulake/habbo/room/events/RoomObjectSamplePlaybackEvent';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import { RoomObjectWallMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectWallMouseEvent';
import { RoomObjectAvatarSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSelectedMessage';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectSelectedMessage';
import { RoomObjectTileCursorUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectTileCursorUpdateMessage';
import { RoomObjectVisibilityUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVisibilityUpdateMessage';
import { RoomAreaSelectionManager } from '@/com/sulake/habbo/room/utils/RoomAreaSelectionManager';
import { SelectedRoomObjectData } from '@/com/sulake/habbo/room/utils/SelectedRoomObjectData';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomObjectEventHandler implements IRoomRenderingCanvasMouseListener {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomObjectEventHandler'); }

    private static readonly ROOM_OBJECT_EVENT_HANDLER_ID: string = "object_handler";
    private static readonly USER_ALLOWED_DIRECTIONS: any[] = [0, 45, 90, 135, 180, 225, 270, 315];
    private _roomEngine: IRoomEngineServices = null;
    private _SafeStr_3447: UtilsMap = null;
    private _SafeStr_4267: number = -1;
    private _SafeStr_4226: number = -1;
    private _SafeStr_5457: number = -2;

    declare private _SafeStr_5660: string;

    declare private _SafeStr_14634: boolean;
    static { (this.prototype as any)._SafeStr_14634 = false; }

    private _SafeStr_14635: boolean = false;
    private _SafeStr_14636: number = -1;
    private _SafeStr_14637: number = -1;
    private _moveMouseEventCache: RoomObjectMouseEvent = null;

    constructor(param1: IRoomEngineServices) {
        this._SafeStr_3447 = new UtilsMap();
        this._roomEngine = param1;
    }

    protected get roomEngine(): IRoomEngineServices {
        return this._roomEngine;
    }

    public dispose(): void {
        if (this._SafeStr_3447 != null) {
            this._SafeStr_3447.dispose();
            this._SafeStr_3447 = null;
        }
        this._roomEngine = null;
    }

    public initializeRoomObjectInsert(param1: string, param2: number, param3: number, param4: number, param5: number, param6: string = null, param7: IStuffData = null, param8: number = -1, param9: number = -1, param10: string = null, param11: boolean = false): boolean {
        this._SafeStr_5660 = param1;
        this._SafeStr_14635 = param11;
        let _loc12_: IVector3d = new Vector3d(-100, -100);
        let _loc13_: IVector3d = new Vector3d(0);
        if (param11 && param4 == 10 && param5 == this._SafeStr_14636 && this._SafeStr_14637 >= 0) {
            _loc13_ = new Vector3d(this._SafeStr_14637);
        } else {
            this.clearRepeatedPlacementData();
        }
        this.setSelectedObjectData(param2, param3, param4, _loc12_, _loc13_, "OBJECT_PLACE", param5, param6, param7, param8, param9, param10);
        if (this._roomEngine != null) {
            this._roomEngine.setObjectMoverIconSprite(param5, param4, false, param6, param7, param8, param9, param10);
            this._roomEngine.setObjectMoverIconSpriteVisible(false);
        }
        if (param11) {
            this.recalibrateMovements(param2, false);
        }
        return true;
    }

    public cancelRoomObjectInsert(param1: number): boolean {
        this._SafeStr_14635 = false;
        this.clearRepeatedPlacementData();
        this.resetSelectedObjectData(param1);
        return true;
    }

    private getSelectedObjectData(param1: number): SelectedRoomObjectData {
        if (this._roomEngine == null) {
            return null;
        }
        let _loc2_: ISelectedRoomObjectData = this._roomEngine.getSelectedObjectData(param1);
        return _loc2_ instanceof SelectedRoomObjectData ? _loc2_ : null;
    }

    private clearRepeatedPlacementData(): void {
        this._SafeStr_14636 = -1;
        this._SafeStr_14637 = -1;
    }

    private setSelectedObjectData(param1: number, param2: number, param3: number, param4: IVector3d, param5: IVector3d, param6: string, param7: number = 0, param8: string = null, param9: IStuffData = null, param10: number = -1, param11: number = -1, param12: string = null): void {
        this.resetSelectedObjectData(param1);
        this.startOrStopMoveOrPlacing(param6);
        if (this._roomEngine == null) {
            return;
        }
        let _loc13_: SelectedRoomObjectData = new SelectedRoomObjectData(param2, param3, param6, param4, param5, param7, param8, param9, param10, param11, param12);
        this._roomEngine.setSelectedObjectData(param1, _loc13_);
    }

    private updateSelectedObjectData(param1: number, param2: number, param3: number, param4: IVector3d, param5: IVector3d, param6: string, param7: number = 0, param8: string = null, param9: IStuffData = null, param10: number = -1, param11: number = -1, param12: string = null): void {
        if (this._roomEngine == null) {
            return;
        }
        this.startOrStopMoveOrPlacing(param6);
        let _loc13_: SelectedRoomObjectData = new SelectedRoomObjectData(param2, param3, param6, param4, param5, param7, param8, param9, param10, param11, param12);
        this._roomEngine.setSelectedObjectData(param1, _loc13_);
    }

    private startOrStopMoveOrPlacing(param1: string): void {
        if (param1 == "OBJECT_MOVE" || param1 == "OBJECT_PLACE") {
            this.startMoveOrPlacing();
        } else {
            this.stopMoveOrPlacing();
        }
    }

    private startMoveOrPlacing(): void {
        this._SafeStr_14634 = true;
        this._roomEngine.setClickSettings("object_handler", true, false);
    }

    private stopMoveOrPlacing(): void {
        if (this._SafeStr_14634) {
            this._SafeStr_14634 = false;
            this._roomEngine.setClickSettings("object_handler", false, false);
        }
    }

    private resetSelectedObjectData(param1: number): void {
        let _loc5_: IRoomObjectController = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (this._roomEngine == null) {
            return;
        }
        if (this._roomEngine != null) {
            this._roomEngine.removeObjectMoverIconSprite();
        }
        let _loc2_: SelectedRoomObjectData = this.getSelectedObjectData(param1);
        if (_loc2_ != null) {
            if (_loc2_.operation == "OBJECT_MOVE" || _loc2_.operation == "OBJECT_MOVE_TO") {
                _loc5_ = asGuarded(this._roomEngine.getRoomObject(param1, _loc2_.id, _loc2_.category), isIRoomObjectController);
                if (_loc5_ != null && _loc2_.operation != "OBJECT_MOVE_TO") {
                    _loc5_.setLocation(_loc2_.loc);
                    _loc5_.setDirection(_loc2_.dir);
                }
                this.setObjectAlphaMultiplier(_loc5_, 1);
                if (_loc2_.category == 20) {
                    this._roomEngine.updateObjectRoomWindow(param1, _loc2_.id, true);
                }
                this.updateSelectedObjectData(param1, _loc2_.id, _loc2_.category, _loc2_.loc, _loc2_.dir, "OBJECT_MOVE", _loc2_.typeId, _loc2_.instanceData, _loc2_.stuffData, _loc2_.state, _loc2_.animFrame, _loc2_.posture);
            }
            if (_loc2_.operation == "OBJECT_PLACE") {
                _loc3_ = _loc2_.id;
                switch (_loc4_ = _loc2_.category) {
                    case 10:
                        this._roomEngine.disposeObjectFurniture(param1, _loc3_);
                        break;
                    case 20:
                        this._roomEngine.disposeObjectWallItem(param1, _loc3_);
                        break;
                    case 100:
                        this._roomEngine.disposeObjectUser(param1, _loc3_);
                }
            }
            this.stopMoveOrPlacing();
            this._roomEngine.setSelectedObjectData(param1, null);
        }
    }

    public setSelectedObject(param1: number, param2: number, param3: number, param4: boolean = false): void {
        let _loc6_: IRoomObjectController = null;
        if (this._roomEngine == null) {
            return;
        }
        let _loc5_: IEventDispatcher = this._roomEngine.events;
        if (_loc5_ == null) {
            return;
        }
        switch (param3) {
            case 100:
            case 10:
            case 20:
                if (param3 == 100) {
                    this.deselectObject(param1);
                    this.setSelectedAvatar(param1, param2, true);
                } else {
                    this.setSelectedAvatar(param1, 0, false);
                    if (param2 != this._SafeStr_4226) {
                        this.deselectObject(param1);
                        _loc6_ = asGuarded(this._roomEngine.getRoomObject(param1, param2, param3), isIRoomObjectController);
                        if (_loc6_ != null && _loc6_.getEventHandler() != null) {
                            _loc6_.getEventHandler().processUpdateMessage(new RoomObjectSelectedMessage(true));
                            this._SafeStr_4226 = param2;
                            this._SafeStr_5457 = param3;
                        }
                    }
                }
                _loc5_.dispatchEvent(new RoomEngineObjectEvent("REOE_SELECTED", param1, param2, param3, false, false, param4));
        }
    }

    public enterNewRoom(): void {
        this._SafeStr_4267 = -1;
        this._SafeStr_4226 = -1;
        this._SafeStr_5457 = -2;
        this._SafeStr_5660 = null;
        this.stopMoveOrPlacing();
    }

    private deselectObject(param1: number): void {
        let _loc2_: IRoomObjectController = null;
        if (this._SafeStr_4226 != -1) {
            _loc2_ = asGuarded(this._roomEngine.getRoomObject(param1, this._SafeStr_4226, this._SafeStr_5457), isIRoomObjectController);
            if (_loc2_ != null && _loc2_.getEventHandler() != null) {
                _loc2_.getEventHandler().processUpdateMessage(new RoomObjectSelectedMessage(false));
                this._SafeStr_4226 = -1;
                this._SafeStr_5457 = -2;
            }
        }
    }

    public processRoomCanvasMouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomObject, param3: IRoomGeometry): void {
        if (RoomEnterEffect.isRunning()) {
            return;
        }
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc6_: string = param2.getType();
        let _loc5_: number = this._roomEngine.getRoomObjectCategory(_loc6_);
        if (_loc5_ == 100 && this._roomEngine.clickThroughUsers || (_loc5_ == 20 || _loc5_ == 10) && this._roomEngine.clickThroughFurni) {
            return;
        }
        if (_loc5_ != 0) {
            if (!this._roomEngine.getActiveRoomIsPlayingGame()) {
                _loc5_ = -2;
            } else if (_loc5_ != 100) {
                _loc5_ = -2;
            }
        }
        let _loc4_: string = this.getMouseEventId(_loc5_, param1.type);
        if (_loc4_ == param1.eventId) {
            if (param1.type == "click" || param1.type == "doubleClick" || param1.type == "mouseDown" || param1.type == "mouseUp" || param1.type == "mouseMove") {
                return;
            }
        } else if (param1.eventId != null) {
            this.setMouseEventId(_loc5_, param1.type, param1.eventId);
        }
        if (param2.getMouseHandler() != null) {
            param2.getMouseHandler().mouseEvent(param1, param3);
        }
    }

    public handleRoomObjectEvent(param1: RoomObjectEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        if (param1 instanceof RoomObjectMouseEvent) {
            this.handleRoomObjectMouseEvent(param1 instanceof RoomObjectMouseEvent ? param1 : null, param2);
            return;
        }
        switch (param1.type) {
            case "ROSCE_STATE_CHANGE":
                this.handleObjectStateChange(param1 instanceof RoomObjectStateChangeEvent ? param1 : null, param2);
                break;
            case "ROSCE_STATE_RANDOM":
                this.handleObjectRandomStateChange(param1 instanceof RoomObjectStateChangeEvent ? param1 : null, param2);
                break;
            case "RODSUE_DIMMER_STATE":
                this.handleObjectDimmerStateEvent(param1, param2);
                break;
            case "ROME_POSITION_CHANGED":
                this.handleSelectedObjectMove(param1, param2);
                break;
            case "ROME_OBJECT_REMOVED":
                this.handleSelectedObjectRemove(param1, param2);
                break;
            case "ROME_SLIDE_ANIMATION":
                this.handleObjectSlide(param1, param2);
                break;
            case "ROWRE_OPEN_WIDGET":
            case "ROWRE_CLOSE_WIDGET":
            case "ROWRE_OPEN_FURNI_CONTEXT_MENU":
            case "ROWRE_CLOSE_FURNI_CONTEXT_MENU":
            case "ROWRE_PLACEHOLDER":
            case "ROWRE__CREDITFURNI":
            case "ROWRE__STICKIE":
            case "ROWRE_PRESENT":
            case "ROWRE_TROPHY":
            case "ROWRE_TEASER":
            case "ROWRE_ECOTRONBOX":
            case "ROWRE_DIMMER":
            case "ROWRE_WIDGET_REMOVE_DIMMER":
            case "ROWRE_CLOTHING_CHANGE":
            case "ROWRE_JUKEBOX_PLAYLIST_EDITOR":
            case "ROWRE_MANNEQUIN":
            case "ROWRE_PET_PRODUCT_MENU":
            case "ROWRE_GUILD_FURNI_CONTEXT_MENU":
            case "ROWRE_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG":
            case "ROWRE_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG":
            case "ROWRE_BACKGROUND_COLOR":
            case "ROWRE_HIDE_AREA":
            case "ROWRE_MYSTERYBOX_OPEN_DIALOG":
            case "ROWRE_EFFECTBOX_OPEN_DIALOG":
            case "ROWRE_MYSTERYTROPHY_OPEN_DIALOG":
            case "ROWRE_ACHIEVEMENT_RESOLUTION_OPEN":
            case "ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING":
            case "ROWRE_ACHIEVEMENT_RESOLUTION_FAILED":
            case "ROWRE_FRIEND_FURNITURE_CONFIRM":
            case "ROWRE_FRIEND_FURNITURE_ENGRAVING":
            case "ROWRE_BADGE_DISPLAY_ENGRAVING":
            case "ROWRE_HIGH_SCORE_DISPLAY":
            case "ROWRE_HIDE_HIGH_SCORE_DISPLAY":
            case "ROWRE_INTERNAL_LINK":
            case "ROWRE_ROOM_LINK":
                this.handleObjectWidgetRequestEvent(param1, param2);
                break;
            case "ROFCAE_DICE_ACTIVATE":
            case "ROFCAE_DICE_OFF":
            case "ROFCAE_USE_HABBOWHEEL":
            case "ROFCAE_STICKIE":
            case "ROFCAE_ENTER_ONEWAYDOOR":
            case "ROFCAE_NFT_REWARD_BOX":
                this.handleObjectActionEvent(param1, param2);
                break;
            case "ROFCAE_SOUND_MACHINE_INIT":
            case "ROFCAE_SOUND_MACHINE_START":
            case "ROFCAE_SOUND_MACHINE_STOP":
            case "ROFCAE_SOUND_MACHINE_DISPOSE":
                this.handleObjectSoundMachineEvent(param1, param2);
                break;
            case "ROFCAE_JUKEBOX_INIT":
            case "ROFCAE_JUKEBOX_START":
            case "ROFCAE_JUKEBOX_MACHINE_STOP":
            case "ROFCAE_JUKEBOX_DISPOSE":
                this.handleObjectJukeboxEvent(param1, param2);
                break;
            case "ROFHO_ADD_HOLE":
            case "ROFHO_REMOVE_HOLE":
                this.handleObjectFloorHoleEvent(param1, param2);
                break;
            case "RORAE_ROOM_AD_FURNI_CLICK":
            case "RORAE_ROOM_AD_FURNI_DOUBLE_CLICK":
            case "RORAE_ROOM_AD_TOOLTIP_SHOW":
            case "RORAE_ROOM_AD_TOOLTIP_HIDE":
            case "RORAE_ROOM_AD_LOAD_IMAGE":
                this.handleObjectRoomAdEvent(param1, param2);
                break;
            case "ROGBE_LOAD_BADGE":
                this.handleObjectGroupBadgeEvent(param1, param2);
                break;
            case "ROFIAE_LOAD_FURNI_ICON":
                this.handleObjectFurniIconAssetEvent(param1, param2);
                break;
            case "ROFCAE_MOUSE_ARROW":
            case "ROFCAE_MOUSE_BUTTON":
                this.handleRoomActionMouseRequestEvent(param1, param2);
                break;
            case "ROPSIE_PLAY_SOUND":
            case "ROPSIE_PLAY_SOUND_AT_PITCH":
                this.handleRoomObjectPlaySoundEvent(castTo(param1, RoomObjectPlaySoundIdEvent), param2);
                break;
            case "ROPSPE_ROOM_OBJECT_INITIALIZED":
            case "ROPSPE_ROOM_OBJECT_DISPOSED":
            case "ROPSPE_PLAY_SAMPLE":
                this.handleRoomObjectSamplePlaybackEvent(castTo(param1, RoomObjectSamplePlaybackEvent), param2);
                break;
            case "ROHSLCEE_ROOM_BACKGROUND_COLOR":
                this.handleRoomObjectHSLColorEnableEvent(castTo(param1, RoomObjectHSLColorEnableEvent), param2);
                break;
            case "RODRE_CURRENT_USER_ID":
            case "RODRE_URL_PREFIX":
                this.handleRoomObjectDataRequestEvent(param1, param2);
                break;
            default:
                Logger.log("*** Unhandled room object event in RoomObjectEventHandler::handleRoomObjectEvent !!! ***");
        }
    }

    private setMouseEventId(param1: number, param2: string, param3: string): void {
        let _loc4_: UtilsMap = asInstanceOf(this._SafeStr_3447.getValue(String(param1)), UtilsMap);
        if (_loc4_ == null) {
            _loc4_ = new UtilsMap();
            this._SafeStr_3447.add(param1, _loc4_);
        }
        _loc4_.remove(param2);
        _loc4_.add(param2, param3);
    }

    private getMouseEventId(param1: number, param2: string): string {
        let _loc4_: UtilsMap = asInstanceOf(this._SafeStr_3447.getValue(String(param1)), UtilsMap);
        if (_loc4_ == null) {
            return null;
        }
        return asGuarded(_loc4_.getValue(param2), isString);
    }

    private handleRoomObjectMouseEvent(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc4_: RoomObjectTileMouseEvent = null;
        let _loc3_: RoomAreaSelectionManager = null;
        if (param1 instanceof RoomObjectTileMouseEvent) {
            _loc4_ = param1 instanceof RoomObjectTileMouseEvent ? param1 : null;
            _loc3_ = asInstanceOf(this.roomEngine.areaSelectionManager, RoomAreaSelectionManager);
            _loc3_.handleTileMouseEvent(_loc4_);
        }
        switch (param1.type) {
            case "ROE_MOUSE_CLICK":
                this.handleRoomObjectMouseClick(param1, param2);
                break;
            case "ROE_MOUSE_MOVE":
                this.handleRoomObjectMouseMove(param1, param2);
                break;
            case "ROE_MOUSE_DOWN":
                this.handleRoomObjectMouseDown(param1, param2);
                break;
            case "ROE_MOUSE_ENTER":
                this.handleRoomObjectMouseEnter(param1, param2);
                break;
            case "ROE_MOUSE_LEAVE":
                this.handleRoomObjectMouseLeave(param1, param2);
        }
    }

    private clickRoomObject(param1: RoomObjectMouseEvent, param2: number): void {
        if (param1 == null || param1.altKey || param1.ctrlKey || param1.shiftKey) {
            return;
        }
        let _loc4_: number = param1.objectId;
        let _loc5_: string = param1.objectType;
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(_loc5_);
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            if (_loc3_ == 10) {
                this._roomEngine.connection.send(new ClickFurniMessageComposer(_loc4_));
            } else if (_loc3_ == 20) {
                this._roomEngine.connection.send(new ClickFurniMessageComposer(-_loc4_));
            } else if (_loc3_ == 100) {
                this._roomEngine.connection.send(new ClickCharacterComposer(_loc4_));
            }
        }
    }

    private handleRoomObjectMouseClick(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc14_: boolean = false;
        let _loc7_: boolean = false;
        let _loc11_: boolean = false;
        let _loc12_: string = null;
        let _loc6_: string = null;
        if (param1 == null) {
            return;
        }
        this.clickRoomObject(param1, param2);
        let _loc10_: boolean = false;
        let _loc5_: string = "OBJECT_UNDEFINED";
        let _loc9_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc9_ != null) {
            _loc5_ = _loc9_.operation;
        }
        if (this.isWhereYouClickWhereYouGo()) {
            if (_loc5_ == null || _loc5_ == "OBJECT_UNDEFINED") {
                _loc10_ = this.handleMoveTargetFurni(param2, param1);
            }
        }
        let _loc17_: number = param1.objectId;
        let _loc13_: string = param1.objectType;
        let _loc16_: number = this._roomEngine.getRoomObjectCategory(_loc13_);
        let _loc3_: string = param1.eventId;
        let _loc15_: RoomObjectTileMouseEvent = param1 instanceof RoomObjectTileMouseEvent ? param1 : null;
        let _loc4_: RoomObjectWallMouseEvent = param1 instanceof RoomObjectWallMouseEvent ? param1 : null;
        let _loc18_: boolean = false;
        let _loc8_: IEventDispatcher = this._roomEngine.events;
        switch (_loc5_) {
            case "OBJECT_MOVE":
                if (_loc16_ == 0) {
                    if (_loc9_ != null) {
                        this.modifyRoomObject(param2, _loc9_.id, _loc9_.category, "OBJECT_MOVE_TO");
                    }
                } else if (_loc16_ == 100) {
                    if (_loc9_ != null && (_loc13_ == "monsterplant" || _loc13_ == "rentable_bot")) {
                        this.modifyRoomObject(param2, _loc9_.id, _loc9_.category, "OBJECT_MOVE_TO");
                    }
                    if (_loc3_ != null) {
                        this.setMouseEventId(0, "click", _loc3_);
                    }
                    this.placeObjectOnUser(param2, _loc17_, _loc16_);
                }
                _loc18_ = true;
                if (_loc17_ != -1) {
                    this.setSelectedObject(param2, _loc17_, _loc16_, param1.altKey || param1.ctrlKey || param1.shiftKey);
                }
                break;
            case "OBJECT_PLACE":
                if (_loc16_ == 0) {
                    this.placeObject(param2, _loc15_ != null, _loc4_ != null);
                } else if (_loc16_ == 100) {
                    switch (_loc13_) {
                        case "monsterplant":
                        case "rentable_bot":
                            this.placeObject(param2, _loc15_ != null, _loc4_ != null);
                            break;
                        default:
                            if (_loc3_ != null) {
                                this.setMouseEventId(0, "click", _loc3_);
                            }
                            this.placeObjectOnUser(param2, _loc17_, _loc16_);
                    }
                }
                break;
            case "OBJECT_UNDEFINED":
                if (_loc16_ == 0) {
                    if (_loc15_ != null && !_loc10_) {
                        this.handleClickOnTile(param2, _loc15_);
                    }
                } else {
                    _loc14_ = !param1.ctrlKey && !param1.altKey && param1.shiftKey && _loc16_ == 100 && (_loc13_ == "rentable_bot" || _loc13_ == "monsterplant");
                    _loc7_ = false;
                    if (_loc14_) {
                        _loc7_ = this.modifyRoomObject(param2, _loc17_, _loc16_, "OBJECT_ROTATE_POSITIVE");
                    }
                    if (!_loc7_ && (!this.roomEngine.isAreaSelectionMode() || _loc16_ == 100)) {
                        this.setSelectedObject(param2, _loc17_, _loc16_, param1.altKey || param1.ctrlKey || param1.shiftKey);
                    } else if (!_loc7_) {
                        this.deselectObject(param2);
                        if (_loc8_ != null) {
                            _loc8_.dispatchEvent(new RoomEngineObjectEvent("REOE_DESELECTED", param2, -1, -2));
                        }
                    }
                    _loc11_ = false;
                    if (_loc16_ == 100) {
                        if (param1.ctrlKey && !param1.altKey && !param1.shiftKey && _loc13_ == "rentable_bot") {
                            this.modifyRoomObject(param2, _loc17_, _loc16_, "OBJECT_PICKUP_BOT");
                        } else if (_loc14_) {
                            if (!_loc7_) {
                                this.modifyRoomObject(param2, _loc17_, _loc16_, "OBJECT_ROTATE_POSITIVE");
                            }
                        } else if (param1.ctrlKey && !param1.altKey && !param1.shiftKey && _loc13_ == "monsterplant") {
                            this.modifyRoomObject(param2, _loc17_, _loc16_, "OBJECT_PICKUP_PET");
                        } else {
                            this.handleClickOnAvatar(_loc17_, param1);
                        }
                        if (!this._roomEngine.getActiveRoomIsPlayingGame()) {
                            _loc10_ = true;
                        } else {
                            _loc11_ = true;
                        }
                    } else if (_loc16_ == 10 || _loc16_ == 20) {
                        if ((param1.altKey || param1.ctrlKey || param1.shiftKey) && !this._roomEngine.isGameMode) {
                            if (!param1.ctrlKey && !param1.altKey && param1.shiftKey) {
                                if (_loc16_ == 10) {
                                    if (_loc8_ != null) {
                                        _loc8_.dispatchEvent(new RoomEngineObjectEvent("REOE_REQUEST_ROTATE", param2, _loc17_, _loc16_));
                                    }
                                }
                            } else if (param1.ctrlKey && !param1.altKey && !param1.shiftKey) {
                                if (_loc8_ != null) {
                                    _loc8_.dispatchEvent(new RoomEngineObjectEvent("REOE_REQUEST_PICKUP", param2, _loc17_, _loc16_));
                                }
                            }
                            if (!this._roomEngine.getActiveRoomIsPlayingGame()) {
                                _loc10_ = true;
                            } else {
                                _loc11_ = true;
                            }
                        }
                    }
                    if (_loc3_ != null) {
                        if (_loc10_) {
                            this.setMouseEventId(0, "click", _loc3_);
                        }
                        if (_loc11_) {
                            this.setMouseEventId(-2, "click", _loc3_);
                        }
                    }
                }
        }
        if (_loc16_ == 0) {
            _loc12_ = this.getMouseEventId(-2, "click");
            _loc6_ = this.getMouseEventId(100, "click");
            if (_loc12_ != _loc3_ && _loc6_ != _loc3_ && !_loc18_) {
                this.deselectObject(param2);
                if (_loc8_ != null) {
                    _loc8_.dispatchEvent(new RoomEngineObjectEvent("REOE_DESELECTED", param2, -1, -2));
                }
                this.setSelectedAvatar(param2, 0, false);
            }
        }
    }

    public recalibrateMovements(param1: number, param2: boolean = true): void {
        let _loc3_: string = null;
        let _loc4_: SelectedRoomObjectData = null;
        if (param2) {
            _loc3_ = "OBJECT_UNDEFINED";
            _loc4_ = this.getSelectedObjectData(param1);
            if (_loc4_ == null) {
                return;
            }
            _loc3_ = _loc4_.operation;
            if (_loc3_ != "OBJECT_MOVE" && _loc3_ != "OBJECT_PLACE") {
                return;
            }
        }
        this.handleRoomObjectMouseMove(this._moveMouseEventCache, param1);
    }

    public rotateActiveObjectPreview(param1: number, param2: boolean): boolean {
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param1);
        if (_loc4_ == null) {
            return false;
        }
        if (_loc4_.category != 10) {
            return false;
        }
        if (_loc4_.operation != "OBJECT_MOVE" && _loc4_.operation != "OBJECT_PLACE") {
            return false;
        }
        let _loc3_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param1, _loc4_.id, _loc4_.category), isIRoomObjectController);
        if (_loc3_ == null) {
            return false;
        }
        let _loc6_: number = this.getValidRoomObjectDirection(_loc3_, param2);
        if (_loc6_ == _loc3_.getDirection().x) {
            return false;
        }
        if (!this.validateFurnitureDirection(_loc3_, new Vector3d(_loc6_), this._roomEngine.getFurniStackingHeightMap(param1))) {
            return false;
        }
        let _loc5_: Vector3d = new Vector3d(_loc6_);
        _loc3_.setDirection(_loc5_);
        this.updateSelectedObjectData(param1, _loc4_.id, _loc4_.category, _loc3_.getLocation(), _loc5_, _loc4_.operation, _loc4_.typeId, _loc4_.instanceData, _loc4_.stuffData, _loc4_.state, _loc4_.animFrame, _loc4_.posture);
        this.recalibrateMovements(param1, false);
        return true;
    }

    private handleRoomObjectMouseMove(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc7_: IRoomObjectController = null;
        let _loc5_: RoomObjectTileCursorUpdateMessage = null;
        if (param1 == null) {
            return;
        }
        this._moveMouseEventCache = param1;
        let _loc3_: string = "OBJECT_UNDEFINED";
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc4_ != null) {
            _loc3_ = _loc4_.operation;
        }
        let _loc8_: string = param1.objectType;
        let _loc6_: number = this._roomEngine.getRoomObjectCategory(_loc8_);
        if (this._roomEngine != null) {
            _loc7_ = this._roomEngine.getTileCursor(param2);
            if (_loc7_ != null && _loc7_.getEventHandler() != null) {
                if (param1 instanceof RoomObjectTileMouseEvent) {
                    _loc5_ = this.handleMouseOverTile(param1 instanceof RoomObjectTileMouseEvent ? param1 : null, param2);
                } else if (param1.object != null && param1.object.getId() != -1) {
                    if (this.isWhereYouClickWhereYouGo()) {
                        _loc5_ = this.handleMouseOverObject(_loc6_, param2, param1);
                    }
                } else {
                    _loc5_ = new RoomObjectTileCursorUpdateMessage(null, 0, false, param1.eventId);
                }
                _loc7_.getEventHandler().processUpdateMessage(_loc5_);
            }
        }
        switch (_loc3_) {
            case "OBJECT_MOVE":
                if (_loc6_ == 0) {
                    this.handleObjectMove(param1, param2);
                }
                break;
            case "OBJECT_PLACE":
                if (_loc6_ == 0) {
                    this.handleObjectPlace(param1, param2);
                }
        }
    }

    private handleMouseOverTile(param1: RoomObjectTileMouseEvent, param2: number): RoomObjectTileCursorUpdateMessage {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc11_: IRoomInstance = null;
        let _loc3_: TileObjectMap = null;
        let _loc8_: IRoomObject = null;
        let _loc4_: FurniStackingHeightMap = null;
        let _loc12_: number = NaN;
        let _loc10_: number = NaN;
        if (this.isWhereYouClickWhereYouGo()) {
            return new RoomObjectTileCursorUpdateMessage(new Vector3d(param1.tileXAsInt, param1.tileYAsInt, param1.tileZAsInt), 0, true, param1.eventId);
        }
        let _loc9_: IRoomObjectController = this._roomEngine.getTileCursor(param2);
        if (_loc9_ != null && _loc9_.getEventHandler() != null) {
            _loc5_ = param1.tileXAsInt;
            _loc6_ = param1.tileYAsInt;
            _loc7_ = param1.tileZAsInt;
            _loc11_ = this._roomEngine.getRoom(param2);
            if (_loc11_ != null) {
                _loc3_ = this._roomEngine.getTileObjectMap(param2);
                if (_loc3_) {
                    _loc8_ = _loc3_.getObjectIntTile(_loc5_, _loc6_);
                    _loc4_ = this._roomEngine.getFurniStackingHeightMap(param2);
                    if (_loc4_) {
                        if (_loc8_ && _loc8_.getModel() && _loc8_.getModel().getNumber("furniture_is_variable_height") > 0) {
                            _loc12_ = _loc4_.getTileHeight(_loc5_, _loc6_);
                            _loc10_ = this._roomEngine.getLegacyGeometry(param2).getTileHeight(_loc5_, _loc6_);
                            return new RoomObjectTileCursorUpdateMessage(new Vector3d(_loc5_, _loc6_, _loc7_), _loc12_ - _loc10_, true, param1.eventId);
                        }
                        return new RoomObjectTileCursorUpdateMessage(new Vector3d(_loc5_, _loc6_, _loc7_), 0, true, param1.eventId);
                    }
                }
            }
        }
        return null;
    }

    private handleMouseOverObject(param1: number, param2: number, param3: RoomObjectMouseEvent): RoomObjectTileCursorUpdateMessage {
        let _loc5_: Vector3d = null;
        let _loc6_: FurniStackingHeightMap = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = NaN;
        let _loc4_: IRoomObject = null;
        if (param1 == 10) {
            _loc4_ = this._roomEngine.getRoomObject(param2, param3.objectId, 10);
            if (_loc4_) {
                _loc5_ = this.getActiveSurfaceLocation(_loc4_, param3);
                if (_loc5_) {
                    _loc6_ = this._roomEngine.getFurniStackingHeightMap(param2);
                    if (_loc6_) {
                        _loc7_ = _loc5_.x | 0;
                        _loc8_ = _loc5_.y | 0;
                        _loc9_ = _loc5_.z;
                        return new RoomObjectTileCursorUpdateMessage(new Vector3d(_loc7_, _loc8_, _loc4_.getLocation().z), _loc9_, true, param3.eventId);
                    }
                }
            }
        }
        return null;
    }

    private handleRoomObjectMouseEnter(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc6_: string = param1.objectType;
        let _loc4_: number = param1.objectId;
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(_loc6_);
        if (_loc3_ != 0) {
            if (_loc3_ == 100) {
                this.handleMouseEnterAvatar(_loc4_, param1, param2);
            }
        }
        let _loc5_: IEventDispatcher = this._roomEngine.events;
        if (_loc5_ != null) {
            _loc5_.dispatchEvent(new RoomEngineObjectEvent("REOE_MOUSE_ENTER", param2, param1.objectId, this._roomEngine.getRoomObjectCategory(param1.objectType)));
        }
    }

    private handleRoomObjectMouseLeave(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc4_: IRoomObjectController = null;
        let _loc5_: RoomObjectDataUpdateMessage = null;
        let _loc7_: string = param1.objectType;
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(_loc7_);
        if (_loc3_ != 0) {
            if (_loc3_ == 100) {
                _loc4_ = this._roomEngine.getTileCursor(param2);
                if (_loc4_) {
                    _loc5_ = new RoomObjectDataUpdateMessage(0, null);
                    _loc4_.getEventHandler().processUpdateMessage(_loc5_);
                }
            }
        }
        let _loc6_: IEventDispatcher = this._roomEngine.events;
        if (_loc6_ != null) {
            _loc6_.dispatchEvent(new RoomEngineObjectEvent("REOE_MOUSE_LEAVE", param2, param1.objectId, this._roomEngine.getRoomObjectCategory(param1.objectType)));
        }
    }

    private handleRoomObjectMouseDown(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc7_: IEventDispatcher = null;
        if (param1 == null) {
            return;
        }
        if (param1 instanceof RoomObjectTileMouseEvent) {
            return;
        }
        let _loc3_: string = "OBJECT_UNDEFINED";
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc4_ != null) {
            _loc3_ = _loc4_.operation;
        }
        let _loc6_: number = param1.objectId;
        let _loc8_: string = param1.objectType;
        let _loc5_: number = this._roomEngine.getRoomObjectCategory(_loc8_);
        let _loc9_: string = _loc3_;
        if ("OBJECT_UNDEFINED" === _loc9_) {
            if (_loc5_ == 10 || _loc5_ == 20 || _loc8_ == "monsterplant" || _loc8_ == "rentable_bot") {
                if ((param1.altKey && !param1.ctrlKey && !param1.shiftKey || this.decorateModeMove(param1)) && !this._roomEngine.isGameMode) {
                    _loc7_ = this._roomEngine.events;
                    if (_loc7_ != null) {
                        _loc7_.dispatchEvent(new RoomEngineObjectEvent("REOE_REQUEST_MOVE", param2, _loc6_, _loc5_));
                    }
                }
            }
        }
    }

    private decorateModeMove(param1: RoomObjectMouseEvent): boolean {
        return this._roomEngine.isDecorateMode && !(param1.ctrlKey || param1.shiftKey);
    }

    private handleObjectMove(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc14_: boolean = false;
        let _loc9_: FurniStackingHeightMap = null;
        let _loc10_: RoomObjectTileMouseEvent = null;
        let _loc3_: RoomObjectWallMouseEvent = null;
        let _loc12_: IVector3d = null;
        let _loc8_: IVector3d = null;
        let _loc6_: IVector3d = null;
        let _loc11_: number = NaN;
        let _loc13_: number = NaN;
        let _loc7_: number = NaN;
        if (param1 == null || this._roomEngine == null) {
            return;
        }
        let _loc15_: IEventDispatcher = this._roomEngine.events;
        if (_loc15_ == null) {
            return;
        }
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param2, _loc4_.id, _loc4_.category), isIRoomObjectController);
        if (_loc5_ != null) {
            _loc14_ = true;
            if (_loc4_.category == 10 || _loc4_.category == 100) {
                _loc9_ = this._roomEngine.getFurniStackingHeightMap(param2);
                _loc10_ = param1 instanceof RoomObjectTileMouseEvent ? param1 : null;
                if (!(_loc10_ != null && this.handleFurnitureMove(_loc5_, _loc4_, _loc10_.tileX + 0.5 | 0, _loc10_.tileY + 0.5 | 0, _loc9_))) {
                    this.handleFurnitureMove(_loc5_, _loc4_, _loc4_.loc.x | 0, _loc4_.loc.y | 0, _loc9_);
                    _loc14_ = false;
                }
            } else if (_loc4_.category == 20) {
                _loc14_ = false;
                _loc3_ = param1 instanceof RoomObjectWallMouseEvent ? param1 : null;
                if (_loc3_ != null) {
                    _loc12_ = _loc3_.wallLocation;
                    _loc8_ = _loc3_.wallWidth;
                    _loc6_ = _loc3_.wallHeight;
                    _loc11_ = _loc3_.x;
                    _loc13_ = _loc3_.y;
                    _loc7_ = _loc3_.direction;
                    if (this.handleWallItemMove(_loc5_, _loc4_, _loc12_, _loc8_, _loc6_, _loc11_, _loc13_, _loc7_)) {
                        _loc14_ = true;
                    }
                }
                if (!_loc14_) {
                    _loc5_.setLocation(_loc4_.loc);
                    _loc5_.setDirection(_loc4_.dir);
                }
                this._roomEngine.updateObjectRoomWindow(param2, _loc4_.id, _loc14_);
            }
            if (_loc14_) {
                this.setObjectAlphaMultiplier(_loc5_, 0.5);
                this._roomEngine.setObjectMoverIconSpriteVisible(false);
            } else {
                this.setObjectAlphaMultiplier(_loc5_, 0);
                this._roomEngine.setObjectMoverIconSpriteVisible(true);
            }
        }
    }

    private handleObjectPlace(param1: RoomObjectMouseEvent, param2: number): void {
        let _loc13_: IRoomObject = null;
        let _loc4_: IRoomObjectModelController = null;
        let _loc12_: any[] = null;
        let _loc21_: number = 0;
        let _loc16_: number = 0;
        let _loc5_: IVector3d = null;
        let _loc7_: boolean = false;
        let _loc15_: FurniStackingHeightMap = null;
        let _loc18_: IVector3d = null;
        let _loc11_: IVector3d = null;
        let _loc9_: IVector3d = null;
        let _loc17_: number = NaN;
        let _loc19_: number = NaN;
        let _loc10_: number = NaN;
        if (param1 == null || this._roomEngine == null) {
            return;
        }
        let _loc20_: IEventDispatcher = this._roomEngine.events;
        if (_loc20_ == null) {
            return;
        }
        let _loc6_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc6_ == null) {
            return;
        }
        let _loc8_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param2, _loc6_.id, _loc6_.category), isIRoomObjectController);
        let _loc14_: RoomObjectTileMouseEvent = param1 instanceof RoomObjectTileMouseEvent ? param1 : null;
        let _loc3_: RoomObjectWallMouseEvent = param1 instanceof RoomObjectWallMouseEvent ? param1 : null;
        if (_loc8_ == null) {
            if (_loc6_.category == 10 && _loc14_ != null) {
                this._roomEngine.addObjectFurniture(param2, _loc6_.id, _loc6_.typeId, _loc6_.loc, _loc6_.dir, _loc6_.state, _loc6_.stuffData, Number(_loc6_.instanceData), -1, 0, 0, "", false);
            } else if (_loc6_.category == 20 && _loc3_ != null) {
                this._roomEngine.addObjectWallItem(param2, _loc6_.id, _loc6_.typeId, _loc6_.loc, _loc6_.dir, 0, _loc6_.instanceData, 0);
            } else if (_loc6_.category == 100 && _loc14_ != null) {
                this._roomEngine.addObjectUser(param2, _loc6_.id, new Vector3d(), new Vector3d(180), 180, _loc6_.typeId, _loc6_.instanceData);
                _loc13_ = this._roomEngine.getRoomObject(param2, _loc6_.id, _loc6_.category);
                if (_loc13_) {
                    _loc4_ = asGuarded(_loc13_.getModel(), isIRoomObjectModelController);
                    if (_loc4_ != null && _loc6_.posture != null) {
                        _loc4_.setString("figure_posture", _loc6_.posture);
                    }
                }
            }
            _loc8_ = asGuarded(this._roomEngine.getRoomObject(param2, _loc6_.id, _loc6_.category), isIRoomObjectController);
            if (_loc8_ != null) {
                if (_loc6_.category == 10) {
                    if (_loc8_.getModel() != null) {
                        _loc12_ = _loc8_.getModel().getNumberArray("furniture_allowed_directions");
                        if (_loc12_ != null && _loc12_.length > 0) {
                            _loc21_ = _loc12_[0] | 0;
                            _loc16_ = _loc6_.dir.x | 0;
                            if (_loc12_.indexOf(_loc16_) >= 0) {
                                _loc21_ = _loc16_;
                            }
                            _loc5_ = new Vector3d(_loc21_);
                            _loc8_.setDirection(_loc5_);
                            this.updateSelectedObjectData(param2, _loc6_.id, _loc6_.category, _loc6_.loc, _loc5_, _loc6_.operation, _loc6_.typeId, _loc6_.instanceData, _loc6_.stuffData, _loc6_.state, _loc6_.animFrame, _loc6_.posture);
                            _loc6_ = this.getSelectedObjectData(param2);
                            if (_loc6_ == null) {
                                return;
                            }
                        }
                    }
                }
            }
            this.setObjectAlphaMultiplier(_loc8_, 0.5);
            this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }
        if (_loc8_ != null) {
            _loc7_ = true;
            _loc15_ = this._roomEngine.getFurniStackingHeightMap(param2);
            if (_loc6_.category == 10) {
                if (!(_loc14_ != null && this.handleFurnitureMove(_loc8_, _loc6_, _loc14_.tileX + 0.5 | 0, _loc14_.tileY + 0.5 | 0, _loc15_))) {
                    this._roomEngine.disposeObjectFurniture(param2, _loc6_.id);
                    _loc7_ = false;
                }
            } else if (_loc6_.category == 20) {
                _loc7_ = false;
                if (_loc3_ != null) {
                    _loc18_ = _loc3_.wallLocation;
                    _loc11_ = _loc3_.wallWidth;
                    _loc9_ = _loc3_.wallHeight;
                    _loc17_ = _loc3_.x;
                    _loc19_ = _loc3_.y;
                    _loc10_ = _loc3_.direction;
                    if (this.handleWallItemMove(_loc8_, _loc6_, _loc18_, _loc11_, _loc9_, _loc17_, _loc19_, _loc10_)) {
                        _loc7_ = true;
                    }
                }
                if (!_loc7_) {
                    this._roomEngine.disposeObjectWallItem(param2, _loc6_.id);
                }
                this._roomEngine.updateObjectRoomWindow(param2, _loc6_.id, _loc7_);
            } else if (_loc6_.category == 100) {
                if (!(_loc14_ != null && this.handleUserPlace(_loc8_, _loc14_.tileX + 0.5 | 0, _loc14_.tileY + 0.5 | 0, this._roomEngine.getLegacyGeometry(param2)))) {
                    this._roomEngine.disposeObjectUser(param2, _loc6_.id);
                    _loc7_ = false;
                }
            }
            this._roomEngine.setObjectMoverIconSpriteVisible(!_loc7_);
        }
    }

    private handleMoveTargetFurni(param1: number, param2: RoomObjectEvent): boolean {
        let _loc4_: IRoomObject = this._roomEngine.getRoomObject(param1, param2.objectId, 10);
        let _loc3_: Vector3d = this.getActiveSurfaceLocation(_loc4_, param2 instanceof RoomObjectMouseEvent ? param2 : null);
        if (_loc3_ && !this.roomEngine.isMoveBlocked()) {
            this.walkTo(_loc3_.x | 0, _loc3_.y | 0);
            return true;
        }
        return false;
    }

    private getActiveSurfaceLocation(param1: IRoomObject, param2: RoomObjectMouseEvent): Vector3d {
        let _loc20_: IRoomObjectModel = null;
        let _loc15_: number = 0;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc12_: number = 0;
        let _loc11_: number = NaN;
        let _loc9_: number = 0;
        let _loc16_: number = 0;
        let _loc5_: number = 0;
        let _loc17_: boolean = false;
        let _loc19_: number = NaN;
        let _loc6_: number = NaN;
        let _loc7_: number = NaN;
        let _loc3_: number = NaN;
        let _loc10_: number = NaN;
        let _loc8_: number = 0;
        let _loc4_: number = 0;
        let _loc21_: boolean = false;
        let _loc22_: number = NaN;
        if (param1 == null || param2 == null) {
            return null;
        }
        let _loc18_: IFurnitureData = this._roomEngine.sessionDataManager.getFloorItemDataByName(param1.getType());
        if (_loc18_ == null) {
            return null;
        }
        if (_loc18_.canStandOn || _loc18_.canSitOn || _loc18_.canLayOn) {
            _loc20_ = param1.getModel();
            if (_loc20_ == null) {
                return null;
            }
            _loc15_ = param1.getLocation().x | 0;
            _loc13_ = param1.getLocation().y | 0;
            _loc14_ = _loc20_.getNumber("furniture_size_x") | 0;
            _loc12_ = _loc20_.getNumber("furniture_size_y") | 0;
            _loc11_ = _loc20_.getNumber("furniture_size_z");
            _loc9_ = param1.getDirection().x | 0;
            if (_loc9_ == 90 || _loc9_ == 270) {
                _loc16_ = _loc14_;
                _loc14_ = _loc12_;
                _loc12_ = _loc16_;
            }
            if (_loc14_ < 1) {
                _loc14_ = 1;
            }
            if (_loc12_ < 1) {
                _loc12_ = 1;
            }
            if (this._roomEngine.getActiveRoomActiveCanvas() == null) {
                return null;
            }
            _loc5_ = this._roomEngine.getActiveRoomActiveCanvas().geometry.scale | 0;
            _loc17_ = _loc18_.canSitOn;
            _loc19_ = _loc17_ ? 0.5 : 0;
            _loc6_ = (_loc5_ / 2 + param2.spriteOffsetX + param2.localX) / (_loc5_ / 4);
            _loc7_ = (param2.spriteOffsetY + param2.localY + (_loc11_ - _loc19_) * _loc5_ / 2) / (_loc5_ / 4);
            _loc3_ = (_loc6_ + 2 * _loc7_) / 4;
            _loc10_ = (_loc6_ - 2 * _loc7_) / 4;
            _loc8_ = Math.floor(_loc15_ + _loc3_) | 0;
            _loc4_ = Math.floor(_loc13_ - _loc10_ + 1) | 0;
            _loc21_ = false;
            if (_loc8_ < _loc15_ || _loc8_ >= _loc15_ + _loc14_) {
                _loc21_ = true;
            } else if (_loc4_ < _loc13_ || _loc4_ >= _loc13_ + _loc12_) {
                _loc21_ = true;
            }
            _loc22_ = _loc17_ ? _loc11_ - 0.5 : _loc11_;
            if (!_loc21_) {
                return new Vector3d(_loc8_, _loc4_, _loc22_);
            }
        }
        return null;
    }

    protected handleObjectStateChange(param1: RoomObjectStateChangeEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        this.changeObjectState(param2, param1.objectId, param1.objectType, param1.param, false);
    }

    private handleObjectRandomStateChange(param1: RoomObjectStateChangeEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        this.changeObjectState(param2, param1.objectId, param1.objectType, param1.param, true);
    }

    private handleObjectWidgetRequestEvent(param1: RoomObjectEvent, param2: number): void {
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc6_: number = 0;
        if (this._roomEngine == null || param1 == null) {
            return;
        }
        let _loc7_: number = param1.objectId;
        let _loc9_: string = param1.objectType;
        let _loc5_: number = this._roomEngine.getRoomObjectCategory(_loc9_);
        let _loc8_: IEventDispatcher = this._roomEngine.events;
        if (_loc8_ != null) {
            switch (param1.type) {
                case "ROWRE_OPEN_WIDGET":
                    _loc3_ = castGuarded(param1.object, isIRoomObjectController, "com.sulake.room.object.IRoomObjectController").getEventHandler().widget;
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_OPEN_WIDGET", param2, _loc7_, _loc5_, _loc3_));
                    break;
                case "ROWRE_CLOSE_WIDGET":
                    _loc3_ = castGuarded(param1.object, isIRoomObjectController, "com.sulake.room.object.IRoomObjectController").getEventHandler().widget;
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_CLOSE_WIDGET", param2, _loc7_, _loc5_, _loc3_));
                    break;
                case "ROWRE_OPEN_FURNI_CONTEXT_MENU":
                    _loc4_ = castGuarded(param1.object, isIRoomObjectController, "com.sulake.room.object.IRoomObjectController").getEventHandler().contextMenu;
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_OPEN_FURNI_CONTEXT_MENU", param2, _loc7_, _loc5_, _loc4_));
                    break;
                case "ROWRE_CLOSE_FURNI_CONTEXT_MENU":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_CLOSE_FURNI_CONTEXT_MENU", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_PLACEHOLDER":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_PLACEHOLDER", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE__CREDITFURNI":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_CREDITFURNI", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE__STICKIE":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_STICKIE", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_PRESENT":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_PRESENT", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_TROPHY":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_TROPHY", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_TEASER":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_TEASER", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_ECOTRONBOX":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_ECOTRONBOX", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_DIMMER":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_DIMMER", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_WIDGET_REMOVE_DIMMER":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REMOVE_DIMMER", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_CLOTHING_CHANGE":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_CLOTHING_CHANGE", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_JUKEBOX_PLAYLIST_EDITOR":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_PLAYLIST_EDITOR", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_MANNEQUIN":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_MANNEQUIN", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_PET_PRODUCT_MENU":
                    _loc8_.dispatchEvent(new RoomEngineUseProductEvent("ROSM_USE_PRODUCT_FROM_ROOM", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_GUILD_FURNI_CONTEXT_MENU":
                    _loc6_ = param1.object.getModel().getNumber("furniture_guild_customized_guild_id") | 0;
                    this._roomEngine.connection.send(new GetGuildFurniContextMenuInfoMessageComposer(param1.objectId, _loc6_));
                    break;
                case "ROWRE_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_BACKGROUND_COLOR":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_BACKGROUND_COLOR", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_HIDE_AREA":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_AREA_HIDE", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_MYSTERYBOX_OPEN_DIALOG":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_EFFECTBOX_OPEN_DIALOG":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_MYSTERYTROPHY_OPEN_DIALOG":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_ACHIEVEMENT_RESOLUTION_OPEN":
                    this._roomEngine.connection.send(new GetResolutionAchievementsMessageComposer(param1.objectId, 0));
                    break;
                case "ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_ACHIEVEMENT_RESOLUTION_FAILED":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_FRIEND_FURNITURE_CONFIRM":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_FRIEND_FURNITURE_CONFIRM", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_FRIEND_FURNITURE_ENGRAVING":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_BADGE_DISPLAY_ENGRAVING":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_HIGH_SCORE_DISPLAY":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_HIGH_SCORE_DISPLAY", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_HIDE_HIGH_SCORE_DISPLAY":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_INTERNAL_LINK":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_INTERNAL_LINK", param2, _loc7_, _loc5_));
                    break;
                case "ROWRE_ROOM_LINK":
                    _loc8_.dispatchEvent(new RoomEngineToWidgetEvent("RETWE_REQUEST_ROOM_LINK", param2, _loc7_, _loc5_));
            }
        }
    }

    private handleObjectRoomAdEvent(param1: RoomObjectEvent, param2: number): void {
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc4_: string = null;
        if (this._roomEngine == null || this._roomEngine.events == null || param1 == null) {
            return;
        }
        let _loc9_: number = param1.objectId;
        let _loc10_: string = param1.objectType;
        let _loc8_: number = this._roomEngine.getRoomObjectCategory(_loc10_);
        let _loc5_: RoomObjectRoomAdEvent = param1 instanceof RoomObjectRoomAdEvent ? param1 : null;
        switch (param1.type) {
            case "RORAE_ROOM_AD_FURNI_CLICK":
                this._roomEngine.events.dispatchEvent(param1);
                if (_loc5_ != null && this._roomEngine.toolbar != null) {
                    if (_loc5_.clickUrl == "NAVIGATOR_GAMES") {
                        this._roomEngine.toolbar.toggleWindowVisibility("GAMES");
                    } else if (_loc5_.clickUrl != "") {
                        (this._roomEngine instanceof Component ? this._roomEngine : null).context.createLinkEvent(_loc5_.clickUrl);
                    }
                }
                _loc7_ = "RERAE_FURNI_CLICK";
                break;
            case "RORAE_ROOM_AD_FURNI_DOUBLE_CLICK":
                if (_loc5_ != null && this._roomEngine.catalog != null) {
                    _loc3_ = _loc5_.clickUrl;
                    _loc6_ = "CATALOG_PAGE:";
                    if (_loc3_ && _loc3_.indexOf(_loc6_) == 0) {
                        _loc4_ = _loc3_.substr(_loc6_.length);
                        this._roomEngine.catalog.openCatalogPage(_loc4_);
                    }
                }
                _loc7_ = "RERAE_FURNI_DOUBLE_CLICK";
                break;
            case "RORAE_ROOM_AD_TOOLTIP_SHOW":
                _loc7_ = "RERAE_TOOLTIP_SHOW";
                break;
            case "RORAE_ROOM_AD_TOOLTIP_HIDE":
                _loc7_ = "RERAE_TOOLTIP_HIDE";
                break;
            case "RORAE_ROOM_AD_LOAD_IMAGE":
                if (_loc5_ != null) {
                    this._roomEngine.requestRoomAdImage(param2, _loc9_, _loc8_, _loc5_.imageUrl, _loc5_.clickUrl);
                }
        }
        if (_loc7_ == null) {
            return;
        }
        this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(_loc7_, param2, _loc9_, _loc8_));
    }

    private handleObjectActionEvent(param1: RoomObjectEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        this.useObject(param2, param1.objectId, param1.objectType, param1.type);
    }

    private handleObjectSoundMachineEvent(param1: RoomObjectEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(param1.objectType);
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc4_ != null) {
            if (_loc4_.category == _loc3_ && _loc4_.id == param1.objectId) {
                if (_loc4_.operation == "OBJECT_PLACE") {
                    return;
                }
            }
        }
        switch (param1.type) {
            case "ROFCAE_SOUND_MACHINE_INIT":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_SOUND_MACHINE_INIT", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_SOUND_MACHINE_START":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_SOUND_MACHINE_SWITCHED_ON", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_SOUND_MACHINE_STOP":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_SOUND_MACHINE_SWITCHED_OFF", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_SOUND_MACHINE_DISPOSE":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_SOUND_MACHINE_DISPOSE", param2, param1.objectId, _loc3_));
        }
    }

    private handleObjectJukeboxEvent(param1: RoomObjectEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(param1.objectType);
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param2);
        if (_loc4_ != null) {
            if (_loc4_.category == _loc3_ && _loc4_.id == param1.objectId) {
                if (_loc4_.operation == "OBJECT_PLACE") {
                    return;
                }
            }
        }
        switch (param1.type) {
            case "ROFCAE_JUKEBOX_INIT":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_JUKEBOX_INIT", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_JUKEBOX_START":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_JUKEBOX_SWITCHED_ON", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_JUKEBOX_MACHINE_STOP":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_JUKEBOX_SWITCHED_OFF", param2, param1.objectId, _loc3_));
                break;
            case "ROFCAE_JUKEBOX_DISPOSE":
                this._roomEngine.events.dispatchEvent(new RoomEngineSoundMachineEvent("ROSM_JUKEBOX_DISPOSE", param2, param1.objectId, _loc3_));
        }
    }

    private handleObjectGroupBadgeEvent(param1: RoomObjectEvent, param2: number): void {
        let _loc3_: RoomObjectBadgeAssetEvent = null;
        if (this._roomEngine == null || this._roomEngine.events == null || param1 == null) {
            return;
        }
        let _loc5_: number = param1.objectId;
        let _loc6_: string = param1.objectType;
        let _loc4_: number = this._roomEngine.getRoomObjectCategory(_loc6_);
        if (param1.type == "ROGBE_LOAD_BADGE") {
            _loc3_ = param1 instanceof RoomObjectBadgeAssetEvent ? param1 : null;
            if (_loc3_ != null) {
                this._roomEngine.requestBadgeImageAsset(param2, _loc5_, _loc4_, _loc3_.badgeId, _loc3_.groupBadge);
            }
        }
    }

    private handleObjectFurniIconAssetEvent(param1: RoomObjectEvent, param2: number): void {
        let _loc3_: RoomObjectFurniIconAssetEvent = null;
        if (this._roomEngine == null || this._roomEngine.events == null || param1 == null) {
            return;
        }
        let _loc5_: number = param1.objectId;
        let _loc6_: string = param1.objectType;
        let _loc4_: number = this._roomEngine.getRoomObjectCategory(_loc6_);
        if (param1.type == "ROFIAE_LOAD_FURNI_ICON") {
            _loc3_ = param1 instanceof RoomObjectFurniIconAssetEvent ? param1 : null;
            if (_loc3_ != null) {
                this._roomEngine.requestFurniIconAsset(param2, _loc5_, _loc4_, _loc3_.wallItem, _loc3_.typeId, _loc3_.extra);
            }
        }
    }

    private handleObjectFloorHoleEvent(param1: RoomObjectEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        switch (param1.type) {
            case "ROFHO_ADD_HOLE":
                this._roomEngine.addFloorHole(param2, param1.objectId);
                break;
            case "ROFHO_REMOVE_HOLE":
                this._roomEngine.removeFloorHole(param2, param1.objectId);
        }
    }

    private handleRoomActionMouseRequestEvent(param1: RoomObjectEvent, param2: number): void {
        this._roomEngine.requestMouseCursor(param1.type, param1.objectId, param1.objectType);
    }

    private handleObjectDimmerStateEvent(param1: RoomObjectEvent, param2: number): void {
        let _loc4_: RoomObjectDimmerStateUpdateEvent = null;
        let _loc3_: RoomEngineDimmerStateEvent = null;
        if (param1 == null) {
            return;
        }
        let _loc5_: number = param1.objectId;
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            let _loc6_: any = param1.type;
            if ("RODSUE_DIMMER_STATE" === _loc6_) {
                _loc4_ = param1 instanceof RoomObjectDimmerStateUpdateEvent ? param1 : null;
                if (_loc4_ != null) {
                    _loc3_ = new RoomEngineDimmerStateEvent(param2, _loc5_, _loc4_.state, _loc4_.presetId, _loc4_.effectId, _loc4_.color, _loc4_.brightness);
                    this._roomEngine.events.dispatchEvent(_loc3_);
                }
            }
        }
    }

    private handleRoomObjectPlaySoundEvent(param1: RoomObjectPlaySoundIdEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(param1.objectType);
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            switch (param1.type) {
                case "ROPSIE_PLAY_SOUND":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlaySoundEvent("REPSE_PLAY_SOUND", param2, param1.objectId, _loc3_, param1.soundId, param1.pitch));
                    break;
                case "ROPSIE_PLAY_SOUND_AT_PITCH":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlaySoundEvent("REPSE_PLAY_SOUND_AT_PITCH", param2, param1.objectId, _loc3_, param1.soundId, param1.pitch));
            }
        }
    }

    private handleRoomObjectSamplePlaybackEvent(param1: RoomObjectSamplePlaybackEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(param1.objectType);
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            switch (param1.type) {
                case "ROPSPE_ROOM_OBJECT_INITIALIZED":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectSamplePlaybackEvent("REOSPE_ROOM_OBJECT_INITIALIZED", param2, param1.objectId, _loc3_, param1.sampleId, param1.pitch));
                    break;
                case "ROPSPE_ROOM_OBJECT_DISPOSED":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectSamplePlaybackEvent("REOSPE_ROOM_OBJECT_DISPOSED", param2, param1.objectId, _loc3_, param1.sampleId, param1.pitch));
                    break;
                case "ROPSPE_PLAY_SAMPLE":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectSamplePlaybackEvent("REOSPE_PLAY_SAMPLE", param2, param1.objectId, _loc3_, param1.sampleId, param1.pitch));
                    break;
                case "ROPSPE_CHANGE_PITCH":
                    this._roomEngine.events.dispatchEvent(new RoomEngineObjectSamplePlaybackEvent("REOSPE_CHANGE_PITCH", param2, param1.objectId, _loc3_, param1.sampleId, param1.pitch));
            }
        }
    }

    private handleRoomObjectHSLColorEnableEvent(param1: RoomObjectHSLColorEnableEvent, param2: number): void {
        if (param1 == null) {
            return;
        }
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            let _loc3_: any = param1.type;
            if ("ROHSLCEE_ROOM_BACKGROUND_COLOR" === _loc3_) {
                this._roomEngine.events.dispatchEvent(new RoomEngineHSLColorEnableEvent("ROHSLCEE_ROOM_BACKGROUND_COLOR", param2, param1.enable, param1.hue, param1.saturation, param1.lightness));
            }
        }
    }

    private handleRoomObjectDataRequestEvent(param1: RoomObjectEvent, param2: number): void {
        if (this._roomEngine == null || param1 == null || param1.object == null) {
            return;
        }
        let _loc3_: IRoomObjectModelController = asGuarded(param1.object.getModel(), isIRoomObjectModelController);
        switch (param1.type) {
            case "RODRE_CURRENT_USER_ID":
                _loc3_.setNumber("session_current_user_id", this._roomEngine.sessionDataManager.userId);
                break;
            case "RODRE_URL_PREFIX":
                _loc3_.setString("session_url_prefix", this._roomEngine.configuration.getProperty("url.prefix"));
        }
    }

    private handleSelectedObjectMove(param1: RoomObjectEvent, param2: number): void {
        let _loc3_: IVector3d = null;
        let _loc8_: RoomObjectUpdateMessage = null;
        if (this._roomEngine == null) {
            return;
        }
        let _loc7_: number = param1.objectId;
        let _loc9_: string = param1.objectType;
        let _loc6_: number = this._roomEngine.getRoomObjectCategory(_loc9_);
        let _loc4_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param2, _loc7_, _loc6_), isIRoomObjectController);
        let _loc5_: IRoomObjectController = this._roomEngine.getSelectionArrow(param2);
        if (_loc4_ != null && _loc5_ != null && _loc5_.getEventHandler() != null) {
            _loc3_ = _loc4_.getLocation();
            _loc8_ = new RoomObjectUpdateMessage(_loc3_, null);
            _loc5_.getEventHandler().processUpdateMessage(_loc8_);
        }
    }

    private handleSelectedObjectRemove(param1: RoomObjectEvent, param2: number): void {
        this.setSelectedAvatar(param2, 0, false);
    }

    private handleObjectSlide(param1: RoomObjectEvent, param2: number): void {
        if (this._roomEngine == null) {
            return;
        }
        let _loc3_: number = this._roomEngine.getRoomObjectCategory(param1.objectType);
        if (_loc3_ == 20) {
            this._roomEngine.updateObjectRoomWindow(param2, param1.objectId);
        }
    }

    private handleFurnitureMove(param1: IRoomObjectController, param2: SelectedRoomObjectData, param3: number, param4: number, param5: FurniStackingHeightMap): boolean {
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc6_: Vector3d = new Vector3d();
        _loc6_.assign(param1.getDirection());
        param1.setDirection(param2.dir);
        let _loc8_: Vector3d = new Vector3d(param3, param4, 0);
        let _loc7_: Vector3d = new Vector3d();
        _loc7_.assign(param1.getDirection());
        let _loc9_: Vector3d = this.validateFurnitureLocation(param1, _loc8_, param2.loc, param2.dir, param5);
        if (_loc9_ == null) {
            _loc7_.x = this.getValidRoomObjectDirection(param1, true);
            param1.setDirection(_loc7_);
            _loc9_ = this.validateFurnitureLocation(param1, _loc8_, param2.loc, param2.dir, param5);
        }
        if (_loc9_ == null) {
            param1.setDirection(_loc6_);
            return false;
        }
        param1.setLocation(_loc9_);
        if (_loc7_) {
            param1.setDirection(_loc7_);
        }
        return true;
    }

    private handleWallItemMove(param1: IRoomObjectController, param2: SelectedRoomObjectData, param3: IVector3d, param4: IVector3d, param5: IVector3d, param6: number, param7: number, param8: number): boolean {
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc9_: Vector3d = new Vector3d(param8);
        let _loc10_: Vector3d = this.validateWallItemLocation(param1, param3, param4, param5, param6, param7, param2);
        if (_loc10_ == null) {
            return false;
        }
        param1.setLocation(_loc10_);
        param1.setDirection(_loc9_);
        return true;
    }

    private handleUserPlace(param1: IRoomObjectController, param2: number, param3: number, param4: LegacyWallGeometry): boolean {
        if (!param4.isRoomTile(param2, param3)) {
            return false;
        }
        param1.setLocation(new Vector3d(param2, param3, param4.getTileHeight(param2, param3)));
        return true;
    }

    private validateFurnitureDirection(param1: IRoomObject, param2: IVector3d, param3: FurniStackingHeightMap): boolean {
        let _loc11_: boolean = false;
        if (param1 == null || param1.getModel() == null || param2 == null) {
            return false;
        }
        let _loc7_: IVector3d = param1.getDirection();
        let _loc4_: IVector3d = param1.getLocation();
        if (_loc7_ == null || _loc4_ == null) {
            return false;
        }
        if (_loc7_.x % 180 == param2.x % 180) {
            return true;
        }
        let _loc10_: number = param1.getModel().getNumber("furniture_size_x") | 0;
        let _loc8_: number = param1.getModel().getNumber("furniture_size_y") | 0;
        if (_loc10_ < 1) {
            _loc10_ = 1;
        }
        if (_loc8_ < 1) {
            _loc8_ = 1;
        }
        let _loc12_: number = _loc10_;
        let _loc9_: number = _loc8_;
        let _loc5_: number = 0;
        let _loc6_: number = (param2.x + 45 | 0) % 360 / 90 | 0;
        if (_loc6_ == 1 || _loc6_ == 3) {
            _loc5_ = _loc10_;
            _loc10_ = _loc8_;
            _loc8_ = _loc5_;
        }
        _loc6_ = (_loc7_.x + 45 | 0) % 360 / 90 | 0;
        if (_loc6_ == 1 || _loc6_ == 3) {
            _loc5_ = _loc12_;
            _loc12_ = _loc9_;
            _loc9_ = _loc5_;
        }
        if (param3 != null && _loc4_ != null) {
            _loc11_ = param1.getModel().getNumber("furniture_always_stackable") == 1;
            if (param3.validateLocation(_loc4_.x | 0, _loc4_.y | 0, _loc10_, _loc8_, _loc4_.x | 0, _loc4_.y | 0, _loc12_, _loc9_, _loc11_, _loc4_.z)) {
                return true;
            }
            return false;
        }
        return false;
    }

    private validateFurnitureLocation(param1: IRoomObject, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: FurniStackingHeightMap): Vector3d {
        let _loc16_: Vector3d = null;
        let _loc12_: boolean = false;
        if (param1 == null || param1.getModel() == null || param2 == null) {
            return null;
        }
        let _loc8_: IVector3d = param1.getDirection();
        if (_loc8_ == null) {
            return null;
        }
        if (param3 == null || param4 == null) {
            return null;
        }
        if (param2.x == param3.x && param2.y == param3.y) {
            if (_loc8_.x == param4.x) {
                _loc16_ = new Vector3d();
                _loc16_.assign(param3);
                return _loc16_;
            }
        }
        let _loc11_: number = param1.getModel().getNumber("furniture_size_x") | 0;
        let _loc9_: number = param1.getModel().getNumber("furniture_size_y") | 0;
        if (_loc11_ < 1) {
            _loc11_ = 1;
        }
        if (_loc9_ < 1) {
            _loc9_ = 1;
        }
        let _loc6_: number = param3.x | 0;
        let _loc7_: number = param3.y | 0;
        let _loc13_: number = _loc11_;
        let _loc10_: number = _loc9_;
        let _loc14_: number = 0;
        let _loc15_: number = (_loc8_.x + 45 | 0) % 360 / 90 | 0;
        if (_loc15_ == 1 || _loc15_ == 3) {
            _loc14_ = _loc11_;
            _loc11_ = _loc9_;
            _loc9_ = _loc14_;
        }
        _loc15_ = (param4.x + 45 | 0) % 360 / 90 | 0;
        if (_loc15_ == 1 || _loc15_ == 3) {
            _loc14_ = _loc13_;
            _loc13_ = _loc10_;
            _loc10_ = _loc14_;
        }
        if (param5 != null && param2 != null) {
            _loc12_ = param1.getModel().getNumber("furniture_always_stackable") == 1;
            if (param5.validateLocation(param2.x | 0, param2.y | 0, _loc11_, _loc9_, _loc6_, _loc7_, _loc13_, _loc10_, _loc12_)) {
                return new Vector3d(param2.x, param2.y, param5.getTileHeight(param2.x | 0, param2.y | 0));
            }
            return null;
        }
        return null;
    }

    private validateWallItemLocation(param1: IRoomObject, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: number, param6: number, param7: SelectedRoomObjectData): Vector3d {
        if (param1 == null || param1.getModel() == null || param2 == null || param3 == null || param4 == null || param7 == null) {
            return null;
        }
        let _loc11_: number = param1.getModel().getNumber("furniture_size_x");
        let _loc10_: number = param1.getModel().getNumber("furniture_size_z");
        let _loc8_: number = param1.getModel().getNumber("furniture_center_z");
        if (param5 < _loc11_ / 2 || param5 > param3.length - _loc11_ / 2 || param6 < _loc8_ || param6 > param4.length - (_loc10_ - _loc8_)) {
            if (param5 < _loc11_ / 2 && param5 <= param3.length - _loc11_ / 2) {
                param5 = _loc11_ / 2;
            } else if (param5 >= _loc11_ / 2 && param5 > param3.length - _loc11_ / 2) {
                param5 = param3.length - _loc11_ / 2;
            }
            if (param6 < _loc8_ && param6 <= param4.length - (_loc10_ - _loc8_)) {
                param6 = _loc8_;
            } else if (param6 >= _loc8_ && param6 > param4.length - (_loc10_ - _loc8_)) {
                param6 = param4.length - (_loc10_ - _loc8_);
            }
        }
        if (param5 < _loc11_ / 2 || param5 > param3.length - _loc11_ / 2 || param6 < _loc8_ || param6 > param4.length - (_loc10_ - _loc8_)) {
            return null;
        }
        let _loc9_: Vector3d = Vector3d.sum(Vector3d.product(param3, param5 / param3.length), Vector3d.product(param4, param6 / param4.length));
        return Vector3d.sum(param2, _loc9_);
    }

    private setObjectAlphaMultiplier(param1: IRoomObjectController, param2: number): void {
        if (param1 != null && param1.getModelController() != null) {
            if (param1.getType() == "rentable_bot" || param1.getType() == "user") {
                param1.getModelController().setNumber("figure_alpha_multiplier", param2);
            } else {
                param1.getModelController().setNumber("furniture_alpha_multiplier", param2);
            }
        }
    }

    public setSelectedAvatar(param1: number, param2: number, param3: boolean): void {
        if (this._roomEngine == null) {
            return;
        }
        let _loc6_: number = 100;
        let _loc7_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param1, this._SafeStr_4267, _loc6_), isIRoomObjectController);
        if (_loc7_ != null && _loc7_.getEventHandler() != null) {
            _loc7_.getEventHandler().processUpdateMessage(new RoomObjectAvatarSelectedMessage(false));
            this._SafeStr_4267 = -1;
        }
        let _loc4_: boolean = false;
        if (param3) {
            _loc7_ = asGuarded(this._roomEngine.getRoomObject(param1, param2, _loc6_), isIRoomObjectController);
            if (_loc7_ != null && _loc7_.getEventHandler() != null) {
                _loc7_.getEventHandler().processUpdateMessage(new RoomObjectAvatarSelectedMessage(true));
                _loc4_ = true;
                this._SafeStr_4267 = param2;
                if (!this._roomEngine.roomEvents.hasClickUserWired()) {
                    try {
                        this._roomEngine.connection.send(new LookToMessageComposer(_loc7_.getLocation().x | 0, _loc7_.getLocation().y | 0));
                    } catch (e) {
                    }
                }
            }
        }
        let _loc5_: IRoomObjectController = this._roomEngine.getSelectionArrow(param1);
        if (_loc5_ != null && _loc5_.getEventHandler() != null) {
            if (_loc4_ && !this._roomEngine.getActiveRoomIsPlayingGame()) {
                _loc5_.getEventHandler().processUpdateMessage(new RoomObjectVisibilityUpdateMessage("ROVUM_ENABLED"));
            } else {
                _loc5_.getEventHandler().processUpdateMessage(new RoomObjectVisibilityUpdateMessage("ROVUM_DISABLED"));
            }
        }
    }

    public getSelectedAvatarId(): number {
        return this._SafeStr_4267;
    }

    private getValidRoomObjectDirection(param1: IRoomObjectController, param2: boolean): number {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (param1 == null || param1.getModel() == null) {
            return 0;
        }
        let _loc3_: any[] = null;
        let _loc6_: string = param1.getType();
        if (param1.getModel() != null) {
            if (_loc6_ == "monsterplant") {
                _loc3_ = param1.getModel().getNumberArray("pet_allowed_directions");
            } else if (_loc6_ == "rentable_bot") {
                _loc3_ = RoomObjectEventHandler.USER_ALLOWED_DIRECTIONS;
            } else {
                _loc3_ = param1.getModel().getNumberArray("furniture_allowed_directions");
            }
        }
        let _loc7_: number = param1.getDirection().x | 0;
        if (_loc3_ != null && _loc3_.length > 0) {
            _loc4_ = _loc3_.indexOf(_loc7_);
            if (_loc4_ < 0) {
                _loc4_ = 0;
                _loc5_ = 0;
                while (_loc5_ < _loc3_.length) {
                    if (_loc7_ <= _loc3_[_loc5_]) {
                        break;
                    }
                    _loc4_++;
                    _loc5_++;
                }
                _loc4_ %= _loc3_.length;
            }
            if (param2) {
                _loc4_ = (_loc4_ + 1) % _loc3_.length;
            } else {
                _loc4_ = (_loc4_ - 1 + _loc3_.length) % _loc3_.length;
            }
            _loc7_ = _loc3_[_loc4_] | 0;
        }
        return _loc7_;
    }

    private sendMoveUserObjectMessage(param1: IRoomSession, param2: IRoomObjectController, param3: number, param4: number, param5: number, param6: number): boolean {
        let _loc7_: IUserData = null;
        if (this._roomEngine == null || this._roomEngine.connection == null || param2 == null) {
            return false;
        }
        if (param2.getType() == "rentable_bot") {
            this._roomEngine.connection.send(new MoveEntityInFlatMessageComposer(param3, param4, param5, param6));
            return true;
        }
        if (param2.getType() == "monsterplant" && param1 != null) {
            _loc7_ = param1.userDataManager.getUserDataByIndex(param3);
            if (_loc7_ != null) {
                this._roomEngine.connection.send(new MovePetMessageComposer(_loc7_.webID, param4, param5, param6));
                return true;
            }
        }
        return false;
    }

    public modifyRoomObjectData(param1: number, param2: number, param3: number, param4: string, param5: UtilsMap): boolean {
        if (this._roomEngine == null) {
            return false;
        }
        let _loc6_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param1, param2, param3), isIRoomObjectController);
        if (_loc6_ == null) {
            return false;
        }
        let _loc7_: string = param4;
        if ("OBJECT_SAVE_STUFF_DATA" !== _loc7_) {
            Logger.log("could not modify room object data, unknown operation " + param4);
        } else if (this._roomEngine.connection) {
            this._roomEngine.connection.send(new SetObjectDataMessageComposer(param2, param5));
        }
        return true;
    }

    public modifyRoomObject(param1: number, param2: number, param3: number, param4: string): boolean {
        let _loc6_: SelectedRoomObjectData = null;
        let _loc12_: LegacyWallGeometry = null;
        let _loc9_: string = null;
        if (this._roomEngine == null) {
            return false;
        }
        let _loc13_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param1, param2, param3), isIRoomObjectController);
        if (_loc13_ == null) {
            return false;
        }
        let _loc8_: number = 0;
        let _loc10_: number = 0;
        let _loc14_: number = 0;
        let _loc11_: boolean = true;
        let _loc7_: boolean = false;
        let _loc15_: IRoomSession = this._roomEngine.roomSessionManager.getSession(param1);
        let _loc5_: IUserData = null;
        if (_loc15_ != null && !this._roomEngine.activeRoomHasFreeFurniMovementsMode && _loc15_.playTestMode) {
            return false;
        }
        switch (param4) {
            case "OBJECT_ROTATE_POSITIVE":
            case "OBJECT_ROTATE_NEGATIVE":
                if (this._roomEngine.connection) {
                    if (param4 == "OBJECT_ROTATE_NEGATIVE") {
                        _loc14_ = this.getValidRoomObjectDirection(_loc13_, false);
                    } else {
                        _loc14_ = this.getValidRoomObjectDirection(_loc13_, true);
                    }
                    _loc8_ = _loc13_.getLocation().x | 0;
                    _loc10_ = _loc13_.getLocation().y | 0;
                    if (this.validateFurnitureDirection(_loc13_, new Vector3d(_loc14_), this._roomEngine.getFurniStackingHeightMap(param1))) {
                        _loc14_ = _loc14_ / 45 | 0;
                        if (_loc13_.getType() == "monsterplant" || _loc13_.getType() == "rentable_bot") {
                            _loc7_ = this.sendMoveUserObjectMessage(_loc15_, _loc13_, param2, _loc8_, _loc10_, _loc14_);
                        } else {
                            this._roomEngine.connection.send(new MoveObjectMessageComposer(param2, _loc8_, _loc10_, _loc14_));
                            _loc7_ = true;
                        }
                    }
                }
                break;
            case "OBJECT_EJECT":
            case "OBJECT_PICKUP":
                if (this._roomEngine.connection) {
                    this._roomEngine.connection.send(new PickupObjectMessageComposer(param2, param3));
                    _loc7_ = true;
                }
                break;
            case "OBJECT_PICKUP_PET":
                if (this._roomEngine.connection) {
                    if (_loc15_ != null) {
                        _loc5_ = _loc15_.userDataManager.getUserDataByIndex(param2);
                        if (_loc5_ != null) {
                            _loc15_.pickUpPet(_loc5_.webID);
                            _loc7_ = true;
                        }
                    }
                }
                break;
            case "OBJECT_PICKUP_BOT":
                if (this._roomEngine.connection) {
                    if (_loc15_ != null) {
                        _loc5_ = _loc15_.userDataManager.getUserDataByIndex(param2);
                        if (_loc5_ != null) {
                            this._roomEngine.connection.send(new RemoveBotFromFlatMessageComposer(_loc5_.webID));
                            _loc7_ = true;
                        }
                    }
                }
                break;
            case "OBJECT_MOVE":
                _loc11_ = false;
                this.setObjectAlphaMultiplier(_loc13_, 0.5);
                this.setSelectedObjectData(param1, _loc13_.getId(), param3, _loc13_.getLocation(), _loc13_.getDirection(), param4);
                this._roomEngine.setObjectMoverIconSprite(_loc13_.getId(), param3, true);
                this._roomEngine.setObjectMoverIconSpriteVisible(false);
                _loc7_ = true;
                break;
            case "OBJECT_MOVE_TO":
                _loc6_ = this.getSelectedObjectData(param1);
                this.updateSelectedObjectData(param1, _loc6_.id, _loc6_.category, _loc6_.loc, _loc6_.dir, "OBJECT_MOVE_TO", _loc6_.typeId, _loc6_.instanceData, _loc6_.stuffData, _loc6_.state, _loc6_.animFrame, _loc6_.posture);
                this.setObjectAlphaMultiplier(_loc13_, 1);
                this._roomEngine.removeObjectMoverIconSprite();
                if (this._roomEngine.connection) {
                    if (param3 == 10) {
                        _loc14_ = (_loc13_.getDirection().x | 0) % 360;
                        _loc8_ = _loc13_.getLocation().x | 0;
                        _loc10_ = _loc13_.getLocation().y | 0;
                        _loc14_ = _loc14_ / 45 | 0;
                        if (_loc15_ != null) {
                            _loc15_.trackEventLogOncePerSession("Tutorial", "interaction", "furniture.move");
                        }
                        this._roomEngine.connection.send(new MoveObjectMessageComposer(param2, _loc8_, _loc10_, _loc14_));
                        _loc7_ = true;
                    } else if (param3 == 100) {
                        _loc14_ = (_loc13_.getDirection().x | 0) % 360;
                        _loc8_ = _loc13_.getLocation().x | 0;
                        _loc10_ = _loc13_.getLocation().y | 0;
                        _loc14_ = _loc14_ / 45 | 0;
                        _loc7_ = this.sendMoveUserObjectMessage(_loc15_, _loc13_, param2, _loc8_, _loc10_, _loc14_);
                    } else if (param3 == 20) {
                        _loc14_ = (_loc13_.getDirection().x | 0) % 360;
                        _loc12_ = this._roomEngine.getLegacyGeometry(param1);
                        if (this._roomEngine.connection && _loc12_) {
                            _loc9_ = _loc12_.getOldLocationString(_loc13_.getLocation(), _loc14_);
                            if (_loc9_ != null) {
                                if (_loc15_ != null) {
                                    _loc15_.trackEventLogOncePerSession("Tutorial", "interaction", "furniture.move");
                                }
                                this._roomEngine.connection.send(new MoveWallItemMessageComposer(param2, 20, _loc9_));
                                _loc7_ = true;
                            }
                        }
                    }
                }
        }
        if (_loc11_) {
            this.resetSelectedObjectData(param1);
        }
        return _loc7_;
    }

    private placeObjectOnUser(param1: number, param2: number, param3: number): void {
        let _loc4_: SelectedRoomObjectData = this.getSelectedObjectData(param1);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IRoomObjectController = asGuarded(this._roomEngine.getRoomObject(param1, param2, param3), isIRoomObjectController);
        if (_loc5_ == null) {
            return;
        }
        if (this._roomEngine && this._roomEngine.events) {
            this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlacedOnUserEvent("REOE_PLACED_ON_USER", param1, param2, param3, _loc4_.id, _loc4_.category));
        }
    }

    private placeObject(param1: number, param2: boolean, param3: boolean): void {
        let _loc6_: IRoomObjectController = null;
        let _loc4_: IVector3d = null;
        let _loc16_: LegacyWallGeometry = null;
        let _loc9_: boolean = false;
        let _loc5_: SelectedRoomObjectData = this.getSelectedObjectData(param1);
        if (_loc5_ == null) {
            return;
        }
        let _loc14_: number = _loc5_.id;
        let _loc15_: number = _loc5_.category;
        let _loc11_: string = "";
        let _loc10_: number = 0;
        let _loc12_: number = 0;
        let _loc13_: number = 0;
        let _loc7_: number = 0;
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            _loc6_ = asGuarded(this._roomEngine.getRoomObject(param1, _loc14_, _loc15_), isIRoomObjectController);
            if (_loc6_ != null) {
                _loc7_ = _loc6_.getDirection().x | 0;
                _loc4_ = _loc6_.getLocation();
                if (_loc15_ == 10 || _loc15_ == 100) {
                    _loc10_ = _loc4_.x;
                    _loc12_ = _loc4_.y;
                    _loc13_ = _loc4_.z;
                } else if (_loc15_ == 20) {
                    _loc10_ = _loc4_.x;
                    _loc12_ = _loc4_.y;
                    _loc13_ = _loc4_.z;
                    _loc16_ = this._roomEngine.getLegacyGeometry(param1);
                    if (_loc16_ != null) {
                        _loc11_ = _loc16_.getOldLocationString(_loc4_, _loc7_);
                    }
                }
                _loc7_ = (_loc7_ / 45 % 8 + 8) % 8 | 0;
                if (_loc6_.getType() == "free_placement_room" && this.roomEngine.getRoom(param1).getObjectCountForType("free_placement_room", 10) > 1) {
                    this.roomEngine.windowManager.alert("One free placement furni already in room!", "There can be only one free_placement_room furni in a room. See intraweb for instructions on how to use it.", 0, null);
                    return;
                }
                if (_loc14_ < 0 && _loc15_ == 100) {
                    _loc14_ *= -1;
                }
                if (this._SafeStr_5660 == "inventory") {
                    if (_loc15_ == 100 && _loc5_.typeId == 2) {
                        this._roomEngine.connection.send(new PlacePetMessageComposer(_loc14_, _loc10_ | 0, _loc12_ | 0));
                    } else if (_loc15_ == 100 && _loc5_.typeId == 4) {
                        this._roomEngine.connection.send(new PlaceBotMessageComposer(_loc14_, _loc10_ | 0, _loc12_ | 0));
                    } else if (_loc6_.getModelController().getString("furniture_is_stickie") != null) {
                        this._roomEngine.connection.send(new PlacePostItMessageComposer(_loc14_, _loc11_));
                    } else {
                        this._roomEngine.connection.send(new PlaceObjectMessageComposer(_loc14_, _loc15_, _loc11_, _loc10_ | 0, _loc12_ | 0, _loc7_));
                    }
                }
            }
        }
        if (this._SafeStr_14635 && _loc15_ == 10 && _loc6_ != null) {
            this._SafeStr_14636 = _loc5_.typeId;
            this._SafeStr_14637 = _loc6_.getDirection().x | 0;
        }
        let _loc8_: SelectedRoomObjectData = new SelectedRoomObjectData(_loc5_.id, _loc5_.category, null, null, null);
        this._roomEngine.setPlacedObjectData(param1, _loc8_);
        this.resetSelectedObjectData(param1);
        if (this._roomEngine && this._roomEngine.events) {
            _loc9_ = !!(_loc6_ && _loc6_.getId() == _loc5_.id);
            this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlacedEvent("REOE_PLACED", param1, _loc14_, _loc15_, _loc11_, _loc10_, _loc12_, _loc13_, _loc7_, _loc9_, param2, param3, _loc5_.instanceData, this._SafeStr_5660));
        }
    }

    private changeObjectState(param1: number, param2: number, param3: string, param4: number, param5: boolean): void {
        let _loc6_: number = this._roomEngine.getRoomObjectCategory(param3);
        this.changeRoomObjectState(param1, param2, _loc6_, param4, param5);
    }

    private changeRoomObjectState(param1: number, param2: number, param3: number, param4: number, param5: boolean): boolean {
        let _loc8_: IRoomSession = null;
        let _loc6_: IRoomObject = null;
        let _loc7_: SelectedRoomObjectData = null;
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            _loc8_ = this._roomEngine.roomSessionManager.getSession(param1);
            if (_loc8_ != null && !this._roomEngine.activeRoomHasFreeFurniMovementsMode && _loc8_.playTestMode) {
                _loc6_ = this._roomEngine.getRoomObject(param1, param2, param3);
                if (_loc6_.getModel().getNumber("furniture_usage_policy") < 2) {
                    return false;
                }
            }
            _loc7_ = this.getSelectedObjectData(param1);
            if (_loc7_ == null || _loc7_.operation != "OBJECT_PLACE") {
                if (param3 == 10) {
                    if (!param5) {
                        this._roomEngine.connection.send(new UseFurnitureMessageComposer(param2, param4));
                    } else {
                        this._roomEngine.connection.send(new SetRandomStateMessageComposer(param2, param4));
                    }
                } else if (param3 == 20) {
                    this._roomEngine.connection.send(new UseWallItemMessageComposer(param2, param4));
                }
            }
            if (_loc8_ != null) {
                _loc8_.trackEventLogOncePerSession("Achievements", "interaction", "furniture.use");
            }
        }
        return true;
    }

    private useObject(param1: number, param2: number, param3: string, param4: string): void {
        let confirm: any;
        let roomId: number = param1;
        let objectId: number = param2;
        let objectType: string = param3;
        let useType: string = param4;
        if (this._roomEngine != null && this._roomEngine.connection != null) {
            switch (useType) {
                case "ROFCAE_DICE_ACTIVATE":
                    this._roomEngine.connection.send(new ThrowDiceMessageComposer(objectId));
                    break;
                case "ROFCAE_DICE_OFF":
                    this._roomEngine.connection.send(new DiceOffMessageComposer(objectId));
                    break;
                case "ROFCAE_USE_HABBOWHEEL":
                    this._roomEngine.connection.send(new SpinWheelOfFortuneMessageComposer(objectId));
                    break;
                case "ROFCAE_STICKIE":
                    this._roomEngine.connection.send(new GetItemDataMessageComposer(objectId));
                    break;
                case "ROFCAE_ENTER_ONEWAYDOOR":
                    this._roomEngine.connection.send(new EnterOneWayDoorMessageComposer(objectId));
                    break;
                case "ROFCAE_NFT_REWARD_BOX":
                    confirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
                      param1.dispose();
                      if (param2.type == "WE_OK") {
                          this._roomEngine.connection.send(new RedeemNftLootBoxMessageComposer(objectId));
                      }
                  };
                    this._roomEngine.windowManager.confirm("${collectibles.reward_box.confirm_title}", "${collectibles.reward_box.confirm_description}", 0, confirm);
            }
        }
    }

    public modifyWallItemData(param1: number, param2: number, param3: string, param4: string): boolean {
        if (this._roomEngine == null || this._roomEngine.connection == null) {
            return false;
        }
        this._roomEngine.connection.send(new SetItemDataMessageComposer(param2, param3, param4));
        return true;
    }

    public deleteWallItem(param1: number, param2: number): boolean {
        if (this._roomEngine == null || this._roomEngine.connection == null) {
            return false;
        }
        this._roomEngine.connection.send(new RemoveItemMessageComposer(param2));
        return true;
    }

    private handleClickOnTile(param1: number, param2: RoomObjectTileMouseEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (this._roomEngine.isDecorateMode) {
            return;
        }
        if (!this._roomEngine.roomSessionManager) {
            return;
        }
        let _loc3_: IRoomSession = this._roomEngine.roomSessionManager.getSession(param1);
        if (_loc3_ != null && _loc3_.isSpectatorMode) {
            return;
        }
        if (this._roomEngine.isGameMode) {
            if (this._roomEngine.playerUnderCursor >= 0) {
                this._roomEngine.gameEngine.handleClickOnHuman(this._roomEngine.playerUnderCursor, param2.altKey, param2.shiftKey);
            } else {
                this._roomEngine.gameEngine.handleClickOnTile(param2);
            }
        } else {
            if (_loc3_) {
                _loc3_.trackEventLogOncePerSession("Tutorial", "interaction", "avatar.move");
            }
            if (!this.roomEngine.isMoveBlocked()) {
                this.walkTo(param2.tileXAsInt, param2.tileYAsInt);
            }
        }
    }

    private walkTo(param1: number, param2: number): void {
        if (this._roomEngine.connection) {
            this._roomEngine.connection.send(new MoveAvatarMessageComposer(param1, param2));
        }
    }

    private handleClickOnAvatar(param1: number, param2: RoomObjectMouseEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (this.roomEngine.isDecorateMode) {
            return;
        }
        if (this._roomEngine.isGameMode) {
            this._roomEngine.gameEngine.handleClickOnHuman(param1, param2.altKey, param2.shiftKey);
        }
    }

    private handleMouseEnterAvatar(param1: number, param2: RoomObjectMouseEvent, param3: number): void {
        let _loc8_: IRoomObjectController = null;
        let _loc10_: IRoomObjectController = null;
        let _loc9_: RoomObjectUpdateMessage = null;
        let _loc4_: IVector3d = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        if (this._roomEngine == null) {
            return;
        }
        if (this.roomEngine.isDecorateMode) {
            return;
        }
        if (this._roomEngine.isGameMode) {
            _loc8_ = this._roomEngine.getTileCursor(param3);
            if (_loc8_ != null && _loc8_.getEventHandler() != null) {
                _loc10_ = asGuarded(this._roomEngine.getRoomObject(param3, param1, 100), isIRoomObjectController);
                _loc9_ = null;
                if (_loc10_ != null) {
                    _loc4_ = _loc10_.getLocation();
                    _loc5_ = _loc4_.x | 0;
                    _loc6_ = _loc4_.y | 0;
                    _loc7_ = _loc4_.z | 0;
                    _loc9_ = new RoomObjectUpdateMessage(new Vector3d(_loc5_, _loc6_, _loc7_), null);
                    _loc8_.getEventHandler().processUpdateMessage(_loc9_);
                }
            }
            this._roomEngine.gameEngine.handleMouseOverOnHuman(param1, param2.altKey, param2.shiftKey);
        }
    }

    private isWhereYouClickWhereYouGo(): boolean {
        return this.roomEngine.isWhereYouClickWhereYouGo();
    }
}
