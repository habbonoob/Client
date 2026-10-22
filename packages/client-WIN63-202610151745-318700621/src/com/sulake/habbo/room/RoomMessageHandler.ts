import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { ItemData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemData';
import type { ItemMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemMessageData';
import type { ObjectData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectData';
import type { ObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectMessageData';
import type { SlideObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/SlideObjectMessageData';
import type { UserMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserMessageData';
import type { UserUpdateMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserUpdateMessageData';
import type { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';
import type { AvatarEffectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/AvatarEffectMessageParser';
import type { CarryObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/CarryObjectMessageParser';
import type { DanceMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/DanceMessageParser';
import type { ExpressionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/ExpressionMessageParser';
import type { SleepMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/SleepMessageParser';
import type { UseObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/UseObjectMessageParser';
import type { ChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/ChatMessageParser';
import type { UserTypingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/UserTypingMessageParser';
import type { AreaHideMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/AreaHideMessageData';
import type { FloorHeightMapMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FloorHeightMapMessageParser';
import type { FurnitureAliasesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FurnitureAliasesMessageParser';
import type { HeightMapMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/HeightMapMessageParser';
import type { HeightMapUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/HeightMapUpdateMessageParser';
import type { ItemAddMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemAddMessageParser';
import type { ItemDataUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemDataUpdateMessageParser';
import type { ItemRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemRemoveMessageParser';
import type { ItemRemoveMultipleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemRemoveMultipleMessageParser';
import type { ItemsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemsMessageParser';
import type { ItemsStateUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemsStateUpdateMessageParser';
import type { ItemStateUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemStateUpdateMessageParser';
import type { ItemUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemUpdateMessageParser';
import type { ObjectAddMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectAddMessageParser';
import type { ObjectDataUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataUpdateMessageParser';
import type { ObjectRemoveConfirmMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveConfirmMessageParser';
import type { ObjectRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveMessageParser';
import type { ObjectRemoveMultipleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectRemoveMultipleMessageParser';
import type { ObjectsDataUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectsDataUpdateMessageParser';
import type { ObjectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectsMessageParser';
import type { ObjectUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectUpdateMessageParser';
import type { RoomPropertyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomPropertyMessageParser';
import type { RoomVisualizationSettingsParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomVisualizationSettingsParser';
import type { SlideObjectBundleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/SlideObjectBundleMessageParser';
import type { UserDirectionUpdateMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserDirectionUpdateMessageData';
import type { UserRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserRemoveMessageParser';
import type { UsersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UsersMessageParser';
import type { UserUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserUpdateMessageParser';
import type { WiredFurniMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredFurniMoveMessageData';
import type { WiredMovementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredMovementsMessageParser';
import type { WiredUserMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredUserMoveMessageData';
import type { WiredWallItemMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredWallItemMoveMessageData';
import type { AreaHideMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/AreaHideMessageParser';
import type { DiceValueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/DiceValueMessageParser';
import type { OneWayDoorStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OneWayDoorStatusMessageParser';
import type { RoomEntryTileMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/layout/RoomEntryTileMessageParser';
import type { PetExperienceParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetExperienceParser';
import type { PetFigureUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetFigureUpdateMessageParser';
import type { ConfigurationItemStatesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/ConfigurationItemStatesMessageParser';
import type { GamePlayerValueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/GamePlayerValueMessageParser';
import type { RoomReadyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomReadyMessageParser';
import type { YouAreNotSpectatorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouAreNotSpectatorMessageParser';
import type { YouArePlayingGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouArePlayingGameMessageParser';
import type { _SafeCls_6116 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6116';
import type { _SafeCls_6117 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6117';
import type { _SafeCls_6118 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6118';
import type { _SafeCls_6119 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6119';
import type { _SafeCls_6122 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6122';
import type { _SafeCls_6125 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6125';
import type { _SafeCls_6126 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6126';
import type { _SafeCls_6127 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6127';
import type { VariableFxConfigsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxConfigsMessageParser';
import type { VariableFxConfigsRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxConfigsRemovedMessageParser';
import type { VariableFxStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxStatusMessageParser';
import type { VariableFxStatusRemovedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/VariableFxStatusRemovedMessageParser';
import type { IRoomCreator } from '@/com/sulake/habbo/room/IRoomCreator';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { LegacyWallGeometry } from '@/com/sulake/habbo/room/utils/LegacyWallGeometry';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { GuideSessionEndedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionEndedMessageEvent';
import { GuideSessionErrorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionErrorMessageEvent';
import { GuideSessionStartedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideSessionStartedMessageEvent';
import { AvatarEffectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/AvatarEffectMessageEvent';
import { CarryObjectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/CarryObjectMessageEvent';
import { DanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/DanceMessageEvent';
import { ExpressionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/ExpressionMessageEvent';
import { SleepMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/SleepMessageEvent';
import { UseObjectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/UseObjectMessageEvent';
import { ChatMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/ChatMessageEvent';
import { ShoutMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/ShoutMessageEvent';
import { UserTypingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/UserTypingMessageEvent';
import { WhisperMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/WhisperMessageEvent';
import { BuildersClubPlacementWarningMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/BuildersClubPlacementWarningMessageEvent';
import { FloorHeightMapMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FloorHeightMapMessageEvent';
import { FurniRecolorUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FurniRecolorUpdateMessageEvent';
import { FurnitureAliasesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FurnitureAliasesMessageEvent';
import { HeightMapMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/HeightMapMessageEvent';
import { HeightMapUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/HeightMapUpdateMessageEvent';
import { ItemAddMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemAddMessageEvent';
import { ItemDataUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemDataUpdateMessageEvent';
import { ItemRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemRemoveMessageEvent';
import { ItemRemoveMultipleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemRemoveMultipleMessageEvent';
import { ItemsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemsMessageEvent';
import { ItemsStateUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemsStateUpdateMessageEvent';
import { ItemStateUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemStateUpdateMessageEvent';
import { ItemUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemUpdateMessageEvent';
import { ObjectAddMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectAddMessageEvent';
import { ObjectDataUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectDataUpdateMessageEvent';
import { ObjectRemoveConfirmMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveConfirmMessageEvent';
import { ObjectRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveMessageEvent';
import { ObjectRemoveMultipleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectRemoveMultipleMessageEvent';
import { ObjectsDataUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectsDataUpdateMessageEvent';
import { ObjectsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectsMessageEvent';
import { ObjectUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectUpdateMessageEvent';
import { RoomPropertyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomPropertyMessageEvent';
import { RoomVisualizationSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomVisualizationSettingsEvent';
import { SlideObjectBundleMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/SlideObjectBundleMessageEvent';
import { SpecialRoomEffectMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/SpecialRoomEffectMessageEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';
import { UserRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserRemoveMessageEvent';
import { UsersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UsersMessageEvent';
import { UserUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserUpdateMessageEvent';
import { WiredMovementsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/WiredMovementsMessageEvent';
import { AreaHideMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/AreaHideMessageEvent';
import { DiceValueMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/DiceValueMessageEvent';
import { OneWayDoorStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/OneWayDoorStatusMessageEvent';
import { RoomEntryTileMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/layout/RoomEntryTileMessageEvent';
import { PetExperienceEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetExperienceEvent';
import { PetFigureUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetFigureUpdateEvent';
import { ConfigurationItemStatesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/ConfigurationItemStatesMessageEvent';
import { GamePlayerValueMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/GamePlayerValueMessageEvent';
import { RoomReadyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/RoomReadyMessageEvent';
import { YouAreNotSpectatorMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/YouAreNotSpectatorMessageEvent';
import { YouArePlayingGameMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/YouArePlayingGameMessageEvent';
import { FurnitureLabelsAndRegionsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/FurnitureLabelsAndRegionsEvent';
import { FurnitureLabelsAndRegionsUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/FurnitureLabelsAndRegionsUpdateEvent';
import { VariableFxConfigsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableFxConfigsMessageEvent';
import { VariableFxConfigsRemovedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableFxConfigsRemovedMessageEvent';
import { VariableFxStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableFxStatusMessageEvent';
import { VariableFxStatusRemovedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableFxStatusRemovedMessageEvent';
import { WiredFurniHighlightEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniHighlightEvent';
import { WiredFurniTransparencyEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniTransparencyEvent';
import { WiredFurniVisualizationStateEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredFurniVisualizationStateEvent';
import { WiredUserHighlightEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredUserHighlightEvent';
import { WiredUserTransparencyEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredUserTransparencyEvent';
import { WiredUserVisualizationStateEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredUserVisualizationStateEvent';
import { BlockUserUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/BlockUserUpdateMessageEvent';
import { IgnoreResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/IgnoreResultMessageEvent';
import { BuildersClubPlaceRoomItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceRoomItemMessageComposer';
import { BuildersClubPlaceWallItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceWallItemMessageComposer';
import { PickupObjectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PickupObjectMessageComposer';
import { GuideSessionStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionStartedMessageParser';
import { BuildersClubPlacementWarningMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/BuildersClubPlacementWarningMessageParser';
import { SpecialRoomEffectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/SpecialRoomEffectMessageParser';
import { RoomEngineZoomEvent } from '@/com/sulake/habbo/room/events/RoomEngineZoomEvent';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { RoomObjectUserTypes } from '@/com/sulake/habbo/room/object/RoomObjectUserTypes';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { FurniStackingHeightMap } from '@/com/sulake/habbo/room/utils/FurniStackingHeightMap';
import { RoomRotatingEffect } from '@/com/sulake/room/utils/RoomRotatingEffect';
import { RoomShakingEffect } from '@/com/sulake/room/utils/RoomShakingEffect';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomMessageHandler {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomMessageHandler'); }

    private static readonly NOTIFICATION_STYLE_ID: number = 34;
    private static readonly NOTIFICATION_RANGE_START: number = 200;
    private static readonly NOTIFICATION_STYLE_END: number = 300;
    public static readonly _SafeStr_8306: number = 0;
    public static readonly EFFECT_ROOM_SHAKE: number = 1;
    public static readonly _SafeStr_8655: number = 2;
    public static readonly EFFECT_ROOM_DISCO: number = 3;
    private _connection: IConnection = null;
    private _SafeStr_2118: IRoomCreator = null;
    private _SafeStr_2206: RoomPlaneParser = null;
    private _SafeStr_3308: RoomEntryTileMessageEvent = null;
    private _SafeStr_5926: number = -1;
    private _SafeStr_8450: number = -1000000000;
    private _currentRoomId: number = 0;

    private _SafeStr_4574: any = {};

    private _guideId: number = -1;
    private _SafeStr_4141: number = -1;

    constructor(param1: IRoomCreator) {
        this._SafeStr_2118 = param1;
        this._SafeStr_2206 = new RoomPlaneParser();
    }

    public dispose(): void {
        this._connection = null;
        this._SafeStr_2118 = null;
        if (this._SafeStr_2206 != null) {
            this._SafeStr_2206.dispose();
            this._SafeStr_2206 = null;
        }
        this._SafeStr_3308 = null;
    }

    public setCurrentRoom(param1: number): void {
        if (this._currentRoomId != 0) {
            if (this._SafeStr_2118 != null) {
                this._SafeStr_2118.disposeRoom(this._currentRoomId);
            }
        }
        this._currentRoomId = param1;
        this._SafeStr_3308 = null;
    }

    public resetCurrentRoom(): void {
        this._currentRoomId = 0;
        this._SafeStr_3308 = null;
    }

    private getRoomId(param1: number): number {
        return this._currentRoomId;
    }

    public set connection(param1: IConnection) {
        if (this._connection != null) {
            return;
        }
        if (param1 != null) {
            this._connection = param1;
            param1.addMessageEvent(new UserObjectEvent(this.onOwnUserEvent));
            param1.addMessageEvent(new RoomReadyMessageEvent(this.onRoomReady));
            param1.addMessageEvent(new RoomPropertyMessageEvent(this.onRoomProperty));
            param1.addMessageEvent(new RoomEntryTileMessageEvent(this.onEntryTileData));
            param1.addMessageEvent(new FloorHeightMapMessageEvent(this.onFloorHeightMap));
            param1.addMessageEvent(new HeightMapMessageEvent(this.onHeightMap));
            param1.addMessageEvent(new HeightMapUpdateMessageEvent(this.onHeightMapUpdate));
            param1.addMessageEvent(new RoomVisualizationSettingsEvent(this.onRoomVisualizationSettings));
            param1.addMessageEvent(new FurnitureAliasesMessageEvent(this.onFurnitureAliases));
            param1.addMessageEvent(new AreaHideMessageEvent(this.onAreaHide));
            param1.addMessageEvent(new ObjectsMessageEvent(this.onObjects));
            param1.addMessageEvent(new ObjectAddMessageEvent(this.onObjectAdd));
            param1.addMessageEvent(new ObjectUpdateMessageEvent(this.onObjectUpdate));
            param1.addMessageEvent(new ObjectDataUpdateMessageEvent(this.onObjectDataUpdate));
            param1.addMessageEvent(new ObjectsDataUpdateMessageEvent(this.onObjectsDataUpdate));
            param1.addMessageEvent(new FurniRecolorUpdateMessageEvent(this.onFurniRecolorUpdate));
            param1.addMessageEvent(new ObjectRemoveMessageEvent(this.onObjectRemove));
            param1.addMessageEvent(new ObjectRemoveMultipleMessageEvent(this.onObjectRemoveMultiple));
            param1.addMessageEvent(new ItemsMessageEvent(this.onItems));
            param1.addMessageEvent(new ItemAddMessageEvent(this.onItemAdd));
            param1.addMessageEvent(new ItemRemoveMessageEvent(this.onItemRemove));
            param1.addMessageEvent(new ItemRemoveMultipleMessageEvent(this.onItemRemoveMultiple));
            param1.addMessageEvent(new ItemUpdateMessageEvent(this.onItemUpdate));
            param1.addMessageEvent(new ItemStateUpdateMessageEvent(this.onItemStateUpdate));
            param1.addMessageEvent(new ItemsStateUpdateMessageEvent(this.onItemsStateUpdate));
            param1.addMessageEvent(new ItemDataUpdateMessageEvent(this.onItemDataUpdate));
            param1.addMessageEvent(new UsersMessageEvent(this.onUsers));
            param1.addMessageEvent(new UserUpdateMessageEvent(this.onUserUpdate));
            param1.addMessageEvent(new UserRemoveMessageEvent(this.onUserRemove));
            param1.addMessageEvent(new UserChangeMessageEvent(this.onUserChange));
            param1.addMessageEvent(new ExpressionMessageEvent(this.onExpression));
            param1.addMessageEvent(new DanceMessageEvent(this.onDance));
            param1.addMessageEvent(new AvatarEffectMessageEvent(this.onAvatarEffect));
            param1.addMessageEvent(new SleepMessageEvent(this.onAvatarSleep));
            param1.addMessageEvent(new CarryObjectMessageEvent(this.onCarryObject));
            param1.addMessageEvent(new UseObjectMessageEvent(this.onUseObject));
            param1.addMessageEvent(new SlideObjectBundleMessageEvent(this.onSlideUpdate));
            param1.addMessageEvent(new WiredMovementsMessageEvent(this.onWiredMovements));
            param1.addMessageEvent(new VariableFxConfigsMessageEvent(this.onVariableFxConfigs));
            param1.addMessageEvent(new VariableFxConfigsRemovedMessageEvent(this.onVariableFxConfigsRemoved));
            param1.addMessageEvent(new VariableFxStatusMessageEvent(this.onVariableFxStatus));
            param1.addMessageEvent(new VariableFxStatusRemovedMessageEvent(this.onVariableFxStatusRemoved));
            param1.addMessageEvent(new WiredFurniTransparencyEvent(this.onWiredFurniTransparency));
            param1.addMessageEvent(new WiredUserTransparencyEvent(this.onWiredUserTransparency));
            param1.addMessageEvent(new WiredFurniHighlightEvent(this.onWiredFurniHighlight));
            param1.addMessageEvent(new WiredUserHighlightEvent(this.onWiredUserHighlight));
            param1.addMessageEvent(new WiredFurniVisualizationStateEvent(this.onWiredFurniVisualizationState));
            param1.addMessageEvent(new WiredUserVisualizationStateEvent(this.onWiredUserVisualizationState));
            param1.addMessageEvent(new FurnitureLabelsAndRegionsEvent(this.onFurnitureLabelsAndRegions));
            param1.addMessageEvent(new FurnitureLabelsAndRegionsUpdateEvent(this.onFurnitureLabelsAndRegionsUpdate));
            param1.addMessageEvent(new ChatMessageEvent(this.onChat));
            param1.addMessageEvent(new WhisperMessageEvent(this.onChat));
            param1.addMessageEvent(new ShoutMessageEvent(this.onChat));
            param1.addMessageEvent(new UserTypingMessageEvent(this.onTypingStatus));
            param1.addMessageEvent(new DiceValueMessageEvent(this.onDiceValue));
            param1.addMessageEvent(new OneWayDoorStatusMessageEvent(this.onOneWayDoorStatus));
            param1.addMessageEvent(new PetExperienceEvent(this.onPetExperience));
            param1.addMessageEvent(new YouArePlayingGameMessageEvent(this.onPlayingGame));
            param1.addMessageEvent(new YouAreNotSpectatorMessageEvent(this.onYouAreNotSpectator));
            param1.addMessageEvent(new GamePlayerValueMessageEvent(this.onGamePlayerNumberValue));
            param1.addMessageEvent(new ConfigurationItemStatesMessageEvent(this.onConfigurationItemStates));
            param1.addMessageEvent(new PetFigureUpdateEvent(this.onPetFigureUpdate));
            param1.addMessageEvent(new IgnoreResultMessageEvent(this.onIgnoreResult));
            param1.addMessageEvent(new GuideSessionStartedMessageEvent(this.onGuideSessionStarted));
            param1.addMessageEvent(new GuideSessionEndedMessageEvent(this.onGuideSessionEnded));
            param1.addMessageEvent(new GuideSessionErrorMessageEvent(this.onGuideSessionError));
            param1.addMessageEvent(new SpecialRoomEffectMessageEvent(this.onSpecialRoomEvent));
            param1.addMessageEvent(new BuildersClubPlacementWarningMessageEvent(this.onBCPlacementWarning));
            param1.addMessageEvent(new ObjectRemoveConfirmMessageEvent(this.onObjectRemoveConfirm));
            param1.addMessageEvent(new BlockUserUpdateMessageEvent(this.onBlockUserUpdate));
        }
    }

    private onObjectRemoveConfirm = (param1: IMessageEvent): void => {
        let parser: ObjectRemoveConfirmMessageParser;
        let composer: IMessageComposer;
        let event: IMessageEvent = param1;
        let confirmationEvent: ObjectRemoveConfirmMessageEvent = event instanceof ObjectRemoveConfirmMessageEvent ? event : null;
        if (confirmationEvent == null) {
            return;
        }
        parser = confirmationEvent.getParser();
        if (parser == null) {
            return;
        }
        composer = new PickupObjectMessageComposer(parser.id, parser.category, true);
        this._SafeStr_2118.windowManager.confirm("${" + parser.confirmTitle + "}", "${" + parser.confirmBody + "}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
             param1.dispose();
             if (param2.type == "WE_OK") {
                 event.connection.send(composer);
             }
         });
    };

    private onBCPlacementWarning = (param1: IMessageEvent): void => {
        let parser: BuildersClubPlacementWarningMessageParser;
        let composer: IMessageComposer;
        let event: IMessageEvent = param1;
        let warningEvent: BuildersClubPlacementWarningMessageEvent = event instanceof BuildersClubPlacementWarningMessageEvent ? event : null;
        if (warningEvent == null) {
            return;
        }
        parser = warningEvent.getParser();
        if (parser == null) {
            return;
        }
        if (parser.typeCode == BuildersClubPlacementWarningMessageParser._SafeStr_7421) {
            composer = new BuildersClubPlaceRoomItemMessageComposer(parser.pageId, parser.offerId, parser.extraParam, parser.x, parser.y, parser.direction, true);
        } else {
            composer = new BuildersClubPlaceWallItemMessageComposer(parser.pageId, parser.offerId, parser.extraParam, parser.wallLocation, true);
        }
        this._SafeStr_2118.windowManager.confirm("${generic.alert.title}", "${room.confirm.hide_room}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
             param1.dispose();
             if (param2.type == "WE_OK") {
                 event.connection.send(composer);
             }
         });
    };

    private onOwnUserEvent = (param1: IMessageEvent): void => {
        let _loc2_: UserObjectEvent = param1 instanceof UserObjectEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: UserObjectMessageParser = _loc2_.getParser();
        if (_loc3_ != null) {
            this._SafeStr_5926 = _loc3_.id;
        }
    };

    private onRoomReady = (param1: IMessageEvent): void => {
        let _loc4_: RoomReadyMessageEvent = param1 instanceof RoomReadyMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null || param1.connection == null) {
            return;
        }
        let _loc2_: RoomReadyMessageParser = _loc4_.getParser();
        if (this._currentRoomId != _loc2_.roomId) {
            this.setCurrentRoom(_loc2_.roomId);
        }
        let _loc3_: string = _loc2_.roomType;
        if (this._SafeStr_2118 != null) {
            this._SafeStr_2118.setWorldType(_loc2_.roomId, _loc3_);
        }
    };

    private onFurnitureAliases = (param1: IMessageEvent): void => {
        let _loc5_: FurnitureAliasesMessageEvent = null;
        let _loc2_: FurnitureAliasesMessageParser = null;
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: string = null;
        let _loc7_: string = null;
        if (this._SafeStr_2118 != null) {
            _loc5_ = param1 instanceof FurnitureAliasesMessageEvent ? param1 : null;
            if (_loc5_ == null || _loc5_.getParser() == null) {
                return;
            }
            _loc2_ = _loc5_.getParser();
            if (_loc2_ != null) {
                _loc3_ = _loc2_.aliasCount;
                _loc6_ = 0;
                while (_loc6_ < _loc3_) {
                    _loc4_ = _loc2_.getName(_loc6_);
                    _loc7_ = _loc2_.getAlias(_loc6_);
                    this._SafeStr_2118.setRoomObjectAlias(_loc4_, _loc7_);
                    _loc6_++;
                }
            }
        }
    };

    private onHeightMap = (param1: IMessageEvent): void => {
        let _loc9_: number = 0;
        let _loc8_: number = 0;
        let _loc12_: number = NaN;
        let _loc5_: boolean = false;
        let _loc2_: boolean = false;
        let _loc7_: HeightMapMessageEvent = param1 instanceof HeightMapMessageEvent ? param1 : null;
        if (_loc7_ == null || _loc7_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc4_: HeightMapMessageParser = _loc7_.getParser();
        let _loc11_: number = _loc4_.width;
        let _loc10_: number = _loc4_.height;
        let _loc6_: FurniStackingHeightMap = new FurniStackingHeightMap(_loc11_, _loc10_);
        let _loc3_: number = this._SafeStr_2118.configuration.getInteger("room.stacking_blocked_mask_bit", 14);
        _loc4_.stackingBlockedMaskBit = _loc3_;
        _loc9_ = 0;
        while (_loc9_ < _loc10_) {
            _loc8_ = 0;
            while (_loc8_ < _loc11_) {
                _loc12_ = _loc4_.getTileHeight(_loc8_, _loc9_);
                _loc5_ = _loc4_.getStackingBlocked(_loc8_, _loc9_);
                _loc2_ = _loc4_.isRoomTile(_loc8_, _loc9_);
                _loc6_.setTileHeight(_loc8_, _loc9_, _loc12_);
                _loc6_.setStackingBlocked(_loc8_, _loc9_, _loc5_);
                _loc6_.setIsRoomTile(_loc8_, _loc9_, _loc2_);
                _loc8_++;
            }
            _loc9_++;
        }
        this._SafeStr_2118.setFurniStackingHeightMap(this._currentRoomId, _loc6_);
    };

    private onHeightMapUpdate = (param1: IMessageEvent): void => {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc5_: HeightMapUpdateMessageEvent = param1 instanceof HeightMapUpdateMessageEvent ? param1 : null;
        if (_loc5_ == null || _loc5_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: HeightMapUpdateMessageParser = _loc5_.getParser();
        let _loc4_: FurniStackingHeightMap = this._SafeStr_2118.getFurniStackingHeightMap(this._currentRoomId);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: number = this._SafeStr_2118.configuration.getInteger("room.stacking_blocked_mask_bit", 14);
        _loc3_.stackingBlockedMaskBit = _loc2_;
        while (_loc3_.next()) {
            _loc6_ = _loc3_.x;
            _loc7_ = _loc3_.y;
            _loc4_.setTileHeight(_loc6_, _loc7_, _loc3_.tileHeight);
            _loc4_.setStackingBlocked(_loc6_, _loc7_, _loc3_.isStackingBlocked);
            _loc4_.setIsRoomTile(_loc6_, _loc7_, _loc3_.isRoomTile);
        }
        this._SafeStr_2118.refreshTileObjectMap(this._currentRoomId, "RoomMessageHandler.onHeightMapUpdate()");
    };

    private onRoomVisualizationSettings = (param1: IMessageEvent): void => {
        let _loc2_: RoomVisualizationSettingsEvent = param1 instanceof RoomVisualizationSettingsEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        let _loc3_: RoomVisualizationSettingsParser = _loc2_.getParser();
        let _loc7_: boolean = !_loc3_.wallsHidden;
        let _loc5_: boolean = true;
        let _loc4_: number = _loc3_.wallThicknessMultiplier;
        let _loc6_: number = _loc3_.floorThicknessMultiplier;
        if (this._SafeStr_2118 != null) {
            this._SafeStr_2118.updateObjectRoomVisibilities(this._currentRoomId, _loc7_, _loc5_);
            this._SafeStr_2118.updateObjectRoomPlaneThicknesses(this._currentRoomId, _loc4_, _loc6_);
        }
    };

    private onAreaHide = (param1: IMessageEvent): void => {
        let _loc4_: AreaHideMessageEvent = param1 instanceof AreaHideMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        let _loc2_: AreaHideMessageParser = _loc4_.getParser();
        let _loc3_: AreaHideMessageData = _loc2_.areaHideMessageData;
        if (this._SafeStr_2118 != null) {
            this._SafeStr_2118.updateAreaHide(this._currentRoomId, _loc3_.furniId, _loc3_.on, _loc3_.rootX, _loc3_.rootY, _loc3_.width, _loc3_.length, _loc3_.invert);
        }
    };

    private onRoomProperty = (param1: IMessageEvent): void => {
        let _loc6_: RoomPropertyMessageEvent = param1 instanceof RoomPropertyMessageEvent ? param1 : null;
        if (_loc6_ == null || _loc6_.getParser() == null) {
            return;
        }
        let _loc2_: RoomPropertyMessageParser = _loc6_.getParser();
        let _loc4_: string = _loc2_.floorType;
        let _loc5_: string = _loc2_.wallType;
        let _loc3_: string = _loc2_.landscapeType;
        if (this._SafeStr_2118 != null) {
            this._SafeStr_2118.updateObjectRoom(this._currentRoomId, _loc4_, _loc5_, _loc3_);
        }
    };

    private onEntryTileData = (param1: RoomEntryTileMessageEvent): void => {
        this._SafeStr_3308 = param1;
    };

    private onFloorHeightMap = (param1: IMessageEvent): void => {
        let _loc17_: number = 0;
        let _loc16_: number = 0;
        let _loc20_: number = 0;
        let _loc10_: number = 0;
        let _loc9_: number = 0;
        let _loc14_: FloorHeightMapMessageEvent = param1 instanceof FloorHeightMapMessageEvent ? param1 : null;
        if (_loc14_ == null || _loc14_.getParser() == null) {
            return;
        }
        let _loc12_: FloorHeightMapMessageParser = _loc14_.getParser();
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc18_: LegacyWallGeometry = this._SafeStr_2118.getLegacyGeometry(this._currentRoomId);
        if (_loc18_ == null) {
            return;
        }
        this._SafeStr_2206.reset();
        let _loc15_: number = _loc12_.width;
        let _loc19_: number = _loc12_.height;
        this._SafeStr_2206.initializeTileMap(_loc15_, _loc19_);
        let _loc5_: number = -1;
        let _loc6_: number = -1;
        let _loc2_: number = 0;
        let _loc11_: number = 0;
        let _loc3_: RoomEntryTileMessageParser = null;
        if (this._SafeStr_3308 != null) {
            _loc3_ = this._SafeStr_3308.getParser();
        }
        let _loc13_: FurniStackingHeightMap = this._SafeStr_2118.getFurniStackingHeightMap(this._currentRoomId);
        if (_loc13_ == null) {
            return;
        }
        _loc17_ = 0;
        while (_loc17_ < _loc19_) {
            _loc16_ = 0;
            while (_loc16_ < _loc15_) {
                _loc20_ = _loc12_.getTileHeight(_loc16_, _loc17_);
                if ((_loc17_ > 0 && _loc17_ < _loc19_ - 1 || _loc16_ > 0 && _loc16_ < _loc15_ - 1) && _loc20_ != -110 && (_loc3_ == null || _loc16_ == _loc3_.x && _loc17_ == _loc3_.y)) {
                    if (_loc12_.getTileHeight(_loc16_, _loc17_ - 1) == -110 && _loc12_.getTileHeight(_loc16_ - 1, _loc17_) == -110 && _loc12_.getTileHeight(_loc16_, _loc17_ + 1) == -110) {
                        _loc5_ = _loc16_ + 0.5;
                        _loc6_ = _loc17_;
                        _loc2_ = _loc20_;
                        _loc11_ = 90;
                    }
                    if (_loc12_.getTileHeight(_loc16_, _loc17_ - 1) == -110 && _loc12_.getTileHeight(_loc16_ - 1, _loc17_) == -110 && _loc12_.getTileHeight(_loc16_ + 1, _loc17_) == -110) {
                        _loc5_ = _loc16_;
                        _loc6_ = _loc17_ + 0.5;
                        _loc2_ = _loc20_;
                        _loc11_ = 180;
                    }
                }
                this._SafeStr_2206.setTileHeight(_loc16_, _loc17_, _loc20_);
                _loc16_++;
            }
            _loc17_++;
        }
        this._SafeStr_2206.setTileHeight(Math.floor(_loc5_) | 0, Math.floor(_loc6_) | 0, _loc2_);
        this._SafeStr_2206.initializeFromTileData(_loc14_.getParser().fixedWallsHeight);
        this._SafeStr_2206.setTileHeight(Math.floor(_loc5_) | 0, Math.floor(_loc6_) | 0, _loc2_ + this._SafeStr_2206.wallHeight);
        _loc18_.scale = _loc12_.scale | 0;
        _loc18_.initialize(_loc15_, _loc19_, this._SafeStr_2206.floorHeight | 0);
        _loc10_ = _loc12_.height - 1;
        while (_loc10_ >= 0) {
            _loc9_ = _loc12_.width - 1;
            while (_loc9_ >= 0) {
                _loc18_.setTileHeight(_loc9_, _loc10_, this._SafeStr_2206.getTileHeight(_loc9_, _loc10_));
                _loc9_--;
            }
            _loc10_--;
        }
        let _loc7_: XML = this._SafeStr_2206.getXML();
        let _loc4_: XML = new XML(`<doors><door x="${XML.escapeAttribute(_loc5_)}" y="${XML.escapeAttribute(_loc6_)}" z="${XML.escapeAttribute(_loc2_)}" dir="${XML.escapeAttribute(_loc11_)}"/></doors>`);
        _loc7_.appendChild(_loc4_);
        let _loc8_: Vector3d = new Vector3d(_loc12_.cameraInitX, _loc12_.cameraInitY, _loc12_.cameraInitZ);
        this._SafeStr_2118.initializeRoom(this._currentRoomId, _loc7_, _loc8_, Array.from(_loc12_.areaHideData));
        if (this._SafeStr_4574.objectData) {
            this.addActiveObject(this._currentRoomId, this._SafeStr_4574.objectData);
            this._SafeStr_4574.objectData = null;
        } else {
            this._SafeStr_4574.floorReady = true;
        }
    };

    private onObjects = (param1: IMessageEvent): void => {
        let _loc6_: number = 0;
        let _loc4_: ObjectMessageData = null;
        let _loc3_: ObjectsMessageEvent = param1 instanceof ObjectsMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        let _loc2_: ObjectsMessageParser = _loc3_.getParser();
        let _loc5_: number = _loc2_.getObjectCount();
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc4_ = _loc2_.getObject(_loc6_);
            this.addActiveObject(this._currentRoomId, _loc4_);
            _loc6_++;
        }
    };

    private onObjectAdd = (param1: IMessageEvent): void => {
        let _loc2_: ObjectAddMessageEvent = param1 instanceof ObjectAddMessageEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        let _loc3_: ObjectAddMessageParser = _loc2_.getParser();
        let _loc4_: ObjectMessageData = _loc3_.data;
        this.addActiveObject(this._currentRoomId, _loc4_);
    };

    private onObjectUpdate = (param1: IMessageEvent): void => {
        let _loc2_: IVector3d = null;
        let _loc6_: IVector3d = null;
        let _loc3_: ObjectUpdateMessageEvent = param1 instanceof ObjectUpdateMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc4_: ObjectUpdateMessageParser = _loc3_.getParser();
        let _loc5_: ObjectMessageData = _loc4_.data;
        if (_loc5_ != null) {
            _loc2_ = new Vector3d(_loc5_.x, _loc5_.y, _loc5_.z);
            _loc6_ = new Vector3d(_loc5_.dir);
            this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc5_.id, _loc2_, _loc6_, _loc5_.state, _loc5_.data, _loc5_.extra);
            this._SafeStr_2118.updateObjectFurnitureHeight(this._currentRoomId, _loc5_.id, _loc5_.sizeZ);
            this._SafeStr_2118.updateObjectFurnitureExpiryTime(this._currentRoomId, _loc5_.id, _loc5_.expiryTime);
        }
    };

    private onObjectDataUpdate = (param1: IMessageEvent): void => {
        let _loc4_: ObjectDataUpdateMessageEvent = param1 instanceof ObjectDataUpdateMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: ObjectDataUpdateMessageParser = _loc4_.getParser();
        let _loc5_: number = _loc2_.id;
        let _loc6_: number = _loc2_.state;
        let _loc3_: IStuffData = _loc2_.data;
        this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc5_, null, null, _loc6_, _loc3_);
    };

    private onFurniRecolorUpdate = (param1: FurniRecolorUpdateMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        for (const _loc2_ of param1.getParser().updates ?? []) {
            this._SafeStr_2118.updateFurnitureColor(this._currentRoomId, _loc2_.furniIds, _loc2_.red, _loc2_.green, _loc2_.blue);
        }
    };

    private onObjectsDataUpdate = (param1: IMessageEvent): void => {
        let _loc6_: number = 0;
        let _loc5_: ObjectData = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: IStuffData = null;
        let _loc4_: ObjectsDataUpdateMessageEvent = param1 instanceof ObjectsDataUpdateMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: ObjectsDataUpdateMessageParser = _loc4_.getParser();
        _loc6_ = 0;
        while (_loc6_ < _loc2_.objectCount) {
            _loc5_ = _loc2_.getObjectData(_loc6_);
            if (_loc5_ != null) {
                _loc7_ = _loc5_.id;
                _loc8_ = _loc5_.state;
                _loc3_ = _loc5_.data;
                this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc7_, null, null, _loc8_, _loc3_);
            }
            _loc6_++;
        }
    };

    private onObjectRemove = (param1: IMessageEvent): void => {
        let parser: ObjectRemoveMessageParser;
        let roomId: number = 0;
        let id: number = 0;
        let delay: number = 0;
        let pickerId: number = 0;
        let byInvisibleFurniManager: boolean = false;
        let event: IMessageEvent = param1;
        let objectRemoveEvent: ObjectRemoveMessageEvent = event instanceof ObjectRemoveMessageEvent ? event : null;
        if (objectRemoveEvent == null || objectRemoveEvent.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        parser = objectRemoveEvent.getParser();
        roomId = this._currentRoomId;
        id = parser.id;
        delay = parser.delay;
        pickerId = parser.isExpired ? -1 : parser.pickerId;
        byInvisibleFurniManager = parser.byInvisibleFurniManager;
        if (delay > 0) {
            setTimeout((): void => {
                this._SafeStr_2118.disposeObjectFurniture(roomId, id, pickerId, true, byInvisibleFurniManager);
            }, delay);
        } else {
            this._SafeStr_2118.disposeObjectFurniture(roomId, id, pickerId, true, byInvisibleFurniManager);
        }
    };

    private onObjectRemoveMultiple = (param1: IMessageEvent): void => {
        let _loc4_: ObjectRemoveMultipleMessageEvent = param1 instanceof ObjectRemoveMultipleMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: ObjectRemoveMultipleMessageParser = _loc4_.getParser();
        for (const _loc3_ of _loc2_.ids ?? []) {
            this._SafeStr_2118.disposeObjectFurniture(this._currentRoomId, _loc3_ | 0, _loc2_.pickerId, false, _loc2_.byInvisibleFurniManager);
        }
        this._SafeStr_2118.refreshTileObjectMap(this._currentRoomId, "RoomEngine.onObjectRemoveMultiple()");
    };

    private addActiveObject(param1: number, param2: ObjectMessageData): void {
        if (param2 == null || this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: IVector3d = new Vector3d(param2.x, param2.y, param2.z);
        let _loc4_: IVector3d = new Vector3d(param2.dir);
        if (param2.staticClass != null) {
            this._SafeStr_2118.addObjectFurnitureByName(param1, param2.id, param2.staticClass, _loc3_, _loc4_, param2.state, param2.data, param2.extra);
        } else {
            this._SafeStr_2118.addObjectFurniture(param1, param2.id, param2.type, _loc3_, _loc4_, param2.state, param2.data, param2.extra, param2.expiryTime, param2.usagePolicy, param2.ownerId, param2.ownerName, true, true, param2.sizeZ);
        }
    }

    private onItems = (param1: IMessageEvent): void => {
        let _loc5_: number = 0;
        let _loc3_: ItemMessageData = null;
        let _loc6_: ItemsMessageEvent = param1 instanceof ItemsMessageEvent ? param1 : null;
        if (_loc6_ == null || _loc6_.getParser() == null) {
            return;
        }
        let _loc2_: ItemsMessageParser = _loc6_.getParser();
        let _loc4_: number = _loc2_.getItemCount();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = _loc2_.getItem(_loc5_);
            this.addWallItem(this._currentRoomId, _loc3_);
            _loc5_++;
        }
    };

    private onItemAdd = (param1: IMessageEvent): void => {
        let _loc2_: ItemAddMessageEvent = param1 instanceof ItemAddMessageEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        let _loc3_: ItemAddMessageParser = _loc2_.getParser();
        let _loc4_: ItemMessageData = _loc3_.data;
        if (_loc4_ != null) {
            this.addWallItem(this._currentRoomId, _loc4_);
        }
    };

    private onItemRemove = (param1: IMessageEvent): void => {
        let _loc3_: ItemRemoveMessageEvent = param1 instanceof ItemRemoveMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: ItemRemoveMessageParser = _loc3_.getParser();
        this._SafeStr_2118.disposeObjectWallItem(this._currentRoomId, _loc2_.itemId, _loc2_.pickerId, _loc2_.byInvisibleFurniManager);
    };

    private onItemRemoveMultiple = (param1: IMessageEvent): void => {
        let _loc4_: ItemRemoveMultipleMessageEvent = param1 instanceof ItemRemoveMultipleMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: ItemRemoveMultipleMessageParser = _loc4_.getParser();
        for (const _loc2_ of _loc3_.itemIds ?? []) {
            this._SafeStr_2118.disposeObjectWallItem(this._currentRoomId, _loc2_ | 0, _loc3_.pickerId, _loc3_.byInvisibleFurniManager);
        }
    };

    private onItemUpdate = (param1: IMessageEvent): void => {
        let _loc2_: IVector3d = null;
        let _loc5_: IVector3d = null;
        let _loc6_: ItemUpdateMessageEvent = param1 instanceof ItemUpdateMessageEvent ? param1 : null;
        if (_loc6_ == null || _loc6_.getParser() == null) {
            return;
        }
        let _loc3_: ItemUpdateMessageParser = _loc6_.getParser();
        let _loc7_: LegacyWallGeometry = this._SafeStr_2118.getLegacyGeometry(this._currentRoomId);
        if (this._SafeStr_2118 == null || _loc7_ == null) {
            return;
        }
        let _loc4_: ItemMessageData = _loc3_.data;
        if (_loc4_ != null) {
            _loc2_ = _loc7_.getLocation(_loc4_.wallX | 0, _loc4_.wallY | 0, _loc4_.localX | 0, _loc4_.localY | 0, _loc4_.dir);
            _loc5_ = new Vector3d(_loc7_.getDirection(_loc4_.dir));
            this._SafeStr_2118.updateObjectWallItem(this._currentRoomId, _loc4_.id, _loc2_, _loc5_, _loc4_.state, _loc4_.data);
            this._SafeStr_2118.updateObjectWallItemExpiryTime(this._currentRoomId, _loc4_.id, _loc4_.secondsToExpiration);
        }
    };

    private onItemStateUpdate = (param1: IMessageEvent): void => {
        let _loc3_: ItemStateUpdateMessageEvent = param1 instanceof ItemStateUpdateMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        let _loc2_: ItemStateUpdateMessageParser = _loc3_.getParser();
        this._SafeStr_2118.updateObjectWallItemState(this._currentRoomId, _loc2_.id, _loc2_.state, _loc2_.itemData);
    };

    private onItemsStateUpdate = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc2_: ItemData = null;
        let _loc5_: ItemsStateUpdateMessageEvent = param1 instanceof ItemsStateUpdateMessageEvent ? param1 : null;
        if (_loc5_ == null || _loc5_.getParser() == null) {
            return;
        }
        let _loc3_: ItemsStateUpdateMessageParser = _loc5_.getParser();
        _loc4_ = 0;
        while (_loc4_ < _loc3_.itemCount) {
            _loc2_ = _loc3_.getItemData(_loc4_);
            this._SafeStr_2118.updateObjectWallItemState(this._currentRoomId, _loc2_.id, _loc2_.state, _loc2_.itemData);
            _loc4_++;
        }
    };

    private onMultipleItemStateUpdates(param1: IMessageEvent): void {
        let _loc3_: ItemStateUpdateMessageEvent = param1 instanceof ItemStateUpdateMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        let _loc2_: ItemStateUpdateMessageParser = _loc3_.getParser();
        this._SafeStr_2118.updateObjectWallItemState(this._currentRoomId, _loc2_.id, _loc2_.state, _loc2_.itemData);
    }

    private onItemDataUpdate = (param1: IMessageEvent): void => {
        let _loc3_: ItemDataUpdateMessageEvent = param1 instanceof ItemDataUpdateMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        let _loc2_: ItemDataUpdateMessageParser = _loc3_.getParser();
        this._SafeStr_2118.updateObjectWallItemData(this._currentRoomId, _loc2_.id, _loc2_.itemData);
    };

    private addWallItem(param1: number, param2: ItemMessageData): void {
        if (param2 == null || this._SafeStr_2118 == null) {
            return;
        }
        let _loc5_: LegacyWallGeometry = this._SafeStr_2118.getLegacyGeometry(param1);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: IVector3d = null;
        if (!param2.isOldFormat) {
            _loc3_ = _loc5_.getLocation(param2.wallX | 0, param2.wallY | 0, param2.localX | 0, param2.localY | 0, param2.dir);
        } else {
            _loc3_ = _loc5_.getLocationOldFormat(param2.y, param2.z, param2.dir);
        }
        let _loc4_: IVector3d = new Vector3d(_loc5_.getDirection(param2.dir));
        this._SafeStr_2118.addObjectWallItem(param1, param2.id, param2.type, _loc3_, _loc4_, param2.state, param2.data, param2.usagePolicy, param2.ownerId, param2.ownerName, param2.secondsToExpiration);
    }

    private onUsers = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc7_: UserMessageData = null;
        let _loc2_: IVector3d = null;
        let _loc6_: IVector3d = null;
        let _loc5_: number = 0;
        let _loc8_: UsersMessageEvent = param1 instanceof UsersMessageEvent ? param1 : null;
        if (_loc8_ == null || _loc8_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: UsersMessageParser = _loc8_.getParser();
        _loc4_ = 0;
        while (_loc4_ < _loc3_.getUserCount()) {
            _loc7_ = _loc3_.getUser(_loc4_);
            if (_loc7_ != null) {
                _loc2_ = new Vector3d(_loc7_.x, _loc7_.y, _loc7_.z);
                _loc6_ = new Vector3d(_loc7_.dir);
                _loc5_ = _loc7_.userType;
                this._SafeStr_2118.addObjectUser(this._currentRoomId, _loc7_.roomIndex, _loc2_, _loc6_, _loc7_.dir, _loc5_, _loc7_.figure);
                if (_loc7_.webID == this._SafeStr_5926) {
                    this._SafeStr_2118.setOwnUserId(this._currentRoomId, _loc7_.roomIndex);
                    this._SafeStr_2118.updateObjectUserOwnUserAvatar(this._currentRoomId, _loc7_.roomIndex);
                }
                this._SafeStr_2118.updateObjectUserFigure(this._currentRoomId, _loc7_.roomIndex, _loc7_.figure, _loc7_.sex, _loc7_.subType, _loc7_.isRiding);
                if (RoomObjectUserTypes.getName(_loc5_) == "pet") {
                    if (this._SafeStr_2118.getPetTypeId(_loc7_.figure) == 16) {
                        this._SafeStr_2118.updateObjectUserPosture(this._currentRoomId, _loc7_.roomIndex, _loc7_.petPosture);
                    }
                }
                if (this._SafeStr_2118.configuration.getBoolean("avatar.ignored.bubble.enabled")) {
                    this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc7_.roomIndex, "figure_is_muted", Number(this._SafeStr_2118.sessionDataManager.isIgnored(_loc7_.webID)) | 0);
                }
            }
            _loc4_++;
        }
        this.updateGuideMarker();
    };

    private onUserUpdate = (param1: IMessageEvent): void => {
        let _loc17_: any;
        let _loc10_: number = 0;
        let _loc6_: UserUpdateMessageData = null;
        let _loc16_: number = NaN;
        let _loc3_: IVector3d = null;
        let _loc11_: IVector3d = null;
        let _loc13_: IVector3d = null;
        let _loc18_: boolean = false;
        let _loc8_: boolean = false;
        let _loc9_: string = null;
        let _loc7_: string = null;
        let _loc5_: boolean = false;
        let _loc15_: boolean = false;
        let _loc2_: any = 0;
        let _loc4_: UserUpdateMessageEvent = param1 instanceof UserUpdateMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc14_: UserUpdateMessageParser = _loc4_.getParser();
        let _loc12_: IRoomInstance = this._SafeStr_2118.getRoom(this._currentRoomId);
        if (_loc12_ == null) {
            return;
        }
        let _loc19_: number = _loc12_.getNumber("room_z_scale");
        _loc10_ = 0;
        while (_loc10_ < _loc14_.userUpdateCount) {
            _loc6_ = _loc14_.getUserUpdateData(_loc10_);
            if (_loc6_ != null) {
                _loc16_ = _loc6_.localZ;
                if (_loc19_ != 0) {
                    _loc16_ /= _loc19_;
                }
                _loc3_ = new Vector3d(_loc6_.x, _loc6_.y, _loc6_.z + _loc16_);
                _loc11_ = new Vector3d(_loc6_.dir);
                _loc13_ = null;
                if (_loc6_.isMoving) {
                    _loc13_ = new Vector3d(_loc6_.targetX, _loc6_.targetY, _loc6_.targetZ);
                }
                this._SafeStr_2118.updateObjectUser(this._currentRoomId, _loc6_.id, _loc3_, _loc13_, _loc6_.canStandUp, _loc16_, _loc11_, _loc6_.dirHead, NaN, _loc6_.skipPositionUpdate, !_loc6_.isMoving ? 0 : _loc6_.jumpingPower);
                _loc18_ = true;
                _loc8_ = false;
                _loc9_ = "std";
                _loc7_ = "";
                this._SafeStr_2118.updateObjectUserFlatControl(this._currentRoomId, _loc6_.id, null);
                _loc5_ = false;
                _loc15_ = false;
                _loc2_ = _loc6_.actions.length;
                for (_loc17_ of _loc6_.actions ?? []) {
                    switch (_loc17_.actionType) {
                        case "flatctrl":
                            this._SafeStr_2118.updateObjectUserFlatControl(this._currentRoomId, _loc6_.id, stringOrNull(_loc17_.actionParameter));
                            break;
                        case "sign":
                            if (_loc2_ == 1) {
                                _loc18_ = false;
                            }
                            this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc6_.id, "figure_sign", _loc17_.actionParameter | 0);
                            break;
                        case "gst":
                            if (_loc2_ == 1) {
                                _loc18_ = false;
                            }
                            this._SafeStr_2118.updateObjectPetGesture(this._currentRoomId, _loc6_.id, stringOrNull(_loc17_.actionParameter));
                            break;
                        case "wav":
                        case "mv":
                            _loc15_ = true;
                            _loc8_ = true;
                            break;
                        case "swim":
                            _loc5_ = true;
                            _loc8_ = true;
                            _loc9_ = stringOrNull(_loc17_.actionType);
                            _loc7_ = stringOrNull(_loc17_.actionParameter);
                            break;
                        case "wf":
                            break;
                        case "trd":
                            break;
                        default:
                            _loc8_ = true;
                            _loc9_ = stringOrNull(_loc17_.actionType);
                            _loc7_ = stringOrNull(_loc17_.actionParameter);
                    }
                    _loc9_ = stringOrNull(_loc17_.actionType);
                    _loc7_ = stringOrNull(_loc17_.actionParameter);
                }
                if (!_loc15_ && _loc5_) {
                    _loc8_ = true;
                    _loc9_ = "float";
                }
                if (_loc8_) {
                    this._SafeStr_2118.updateObjectUserPosture(this._currentRoomId, _loc6_.id, _loc9_, _loc7_);
                } else if (_loc18_) {
                    this._SafeStr_2118.updateObjectUserPosture(this._currentRoomId, _loc6_.id, "std", "");
                }
            }
            _loc10_++;
        }
        this.updateGuideMarker();
    };

    private onUserRemove = (param1: IMessageEvent): void => {
        let _loc3_: UserRemoveMessageEvent = param1 instanceof UserRemoveMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: UserRemoveMessageParser = _loc3_.getParser();
        this._SafeStr_2118.disposeObjectUser(this._currentRoomId, _loc2_.id);
        this.updateGuideMarker();
    };

    private onUserChange = (param1: IMessageEvent): void => {
        let _loc2_: UserChangeMessageEvent = param1 instanceof UserChangeMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_2118.updateObjectUserFigure(this._currentRoomId, _loc2_.id, _loc2_.figure, _loc2_.sex);
    };

    private onPetFigureUpdate = (param1: IMessageEvent): void => {
        let _loc3_: PetFigureUpdateEvent = param1 instanceof PetFigureUpdateEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PetFigureUpdateMessageParser = _loc3_.getParser();
        this._SafeStr_2118.updateObjectUserFigure(this._currentRoomId, _loc2_.roomIndex, _loc2_.figureData.figureString, "", "", _loc2_.isRiding);
    };

    private onExpression = (param1: IMessageEvent): void => {
        let _loc2_: ExpressionMessageEvent = param1 instanceof ExpressionMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: ExpressionMessageParser = _loc2_.getParser();
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.userId, "figure_expression", _loc3_.expressionType);
    };

    private onDance = (param1: IMessageEvent): void => {
        let _loc2_: DanceMessageEvent = param1 instanceof DanceMessageEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: DanceMessageParser = _loc2_.getParser();
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.userId, "figure_dance", _loc3_.danceStyle);
    };

    private onAvatarEffect = (param1: IMessageEvent): void => {
        let _loc3_: AvatarEffectMessageEvent = param1 instanceof AvatarEffectMessageEvent ? param1 : null;
        if (_loc3_ == null || _loc3_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: AvatarEffectMessageParser = _loc3_.getParser();
        this._SafeStr_2118.updateObjectUserEffect(this._currentRoomId, _loc2_.userId, _loc2_.effectId, _loc2_.delayMilliSeconds);
    };

    private onAvatarSleep = (param1: IMessageEvent): void => {
        let _loc4_: SleepMessageEvent = param1 instanceof SleepMessageEvent ? param1 : null;
        if (_loc4_ == null || _loc4_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: SleepMessageParser = _loc4_.getParser();
        let _loc2_: number = 1;
        if (!_loc3_.sleeping) {
            _loc2_ = 0;
        }
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.userId, "figure_sleep", _loc2_);
    };

    private onCarryObject = (param1: IMessageEvent): void => {
        let _loc2_: CarryObjectMessageParser = null;
        if (this._SafeStr_2118 == null) {
            return;
        }
        if (param1 instanceof CarryObjectMessageEvent) {
            _loc2_ = (param1 instanceof CarryObjectMessageEvent ? param1 : null).getParser();
            this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc2_.userId, "figure_carry_object", _loc2_.itemType);
        }
    };

    private onUseObject = (param1: IMessageEvent): void => {
        let _loc2_: UseObjectMessageParser = null;
        if (this._SafeStr_2118 == null) {
            return;
        }
        if (param1 instanceof UseObjectMessageEvent) {
            _loc2_ = (param1 instanceof UseObjectMessageEvent ? param1 : null).getParser();
            this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc2_.userId, "figure_use_object", _loc2_.itemType);
        }
    };

    private onSlideUpdate = (param1: IMessageEvent): void => {
        let _loc3_: SlideObjectBundleMessageParser = null;
        let _loc6_: any[] = null;
        let _loc4_: number = 0;
        let _loc2_: SlideObjectMessageData = null;
        let _loc5_: SlideObjectMessageData = null;
        if (this._SafeStr_2118 == null) {
            return;
        }
        if (param1 instanceof SlideObjectBundleMessageEvent) {
            _loc3_ = (param1 instanceof SlideObjectBundleMessageEvent ? param1 : null).getParser();
            this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc3_.id, null, null, 1, null);
            this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc3_.id, null, null, 2, null);
            _loc6_ = _loc3_.objectList;
            _loc4_ = 0;
            while (_loc4_ < _loc6_.length) {
                _loc2_ = _loc6_[_loc4_];
                if (_loc2_ != null) {
                    this._SafeStr_2118.updateObjectFurnitureLocation(this._currentRoomId, _loc2_.id, _loc2_.loc, null, _loc2_.target);
                }
                _loc4_++;
            }
            if (_loc3_.avatar != null) {
                _loc5_ = _loc3_.avatar;
                this._SafeStr_2118.updateObjectUser(this._currentRoomId, _loc5_.id, _loc5_.loc, _loc5_.target);
                this.setUserMovePosture(_loc5_.id, _loc5_.moveType);
            }
        }
    };

    public onWiredMovements = (param1: IMessageEvent): void => {
        let _loc4_: WiredMovementsMessageParser = null;
        if (this._SafeStr_2118 == null) {
            return;
        }
        if (param1 instanceof WiredMovementsMessageEvent) {
            _loc4_ = (param1 instanceof WiredMovementsMessageEvent ? param1 : null).getParser();
            for (const _loc5_ of _loc4_.userMoves ?? []) {
                this.onWiredUserMove(_loc5_);
            }
            for (const _loc6_ of _loc4_.furniMoves ?? []) {
                this.onWiredFurniMove(_loc6_);
            }
            for (const _loc2_ of _loc4_.wallItemMoves ?? []) {
                this.onWiredWallItemMove(_loc2_);
            }
            for (const _loc3_ of _loc4_.userDirectionUpdates ?? []) {
                this.onUserDirectionUpdate(_loc3_);
            }
        }
    };

    private onVariableFxConfigs = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: VariableFxConfigsMessageParser = (param1 instanceof VariableFxConfigsMessageEvent ? param1 : null).getParser();
        this._SafeStr_2118.updateVariableFxConfigs(this._currentRoomId, _loc2_.configs);
    };

    private onVariableFxConfigsRemoved = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: VariableFxConfigsRemovedMessageParser = (param1 instanceof VariableFxConfigsRemovedMessageEvent ? param1 : null).getParser();
        this._SafeStr_2118.removeVariableFxConfigs(this._currentRoomId, _loc2_.configIds);
    };

    private onVariableFxStatus = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: VariableFxStatusMessageParser = (param1 instanceof VariableFxStatusMessageEvent ? param1 : null).getParser();
        this._SafeStr_2118.updateVariableFxStatuses(this._currentRoomId, _loc2_.statuses);
    };

    private onVariableFxStatusRemoved = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: VariableFxStatusRemovedMessageParser = (param1 instanceof VariableFxStatusRemovedMessageEvent ? param1 : null).getParser();
        this._SafeStr_2118.removeVariableFxStatuses(this._currentRoomId, _loc2_.statuses);
    };

    private onWiredFurniTransparency = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6118 = castTo(param1, WiredFurniTransparencyEvent).getParser();
        this._SafeStr_2118.updateWiredFurniTransparency(this._currentRoomId, _loc2_.furniIds, _loc2_.transparency, _loc2_.allowClickThrough, _loc2_.easingMode);
    };

    private onWiredFurniHighlight = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6117 = castTo(param1, WiredFurniHighlightEvent).getParser();
        this._SafeStr_2118.updateWiredFurniHighlight(this._currentRoomId, _loc2_.furniIds, _loc2_.highlightType, _loc2_.strength, _loc2_.color, _loc2_.animationMode, _loc2_.easingMode);
    };

    private onWiredFurniVisualizationState = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6119 = castTo(param1, WiredFurniVisualizationStateEvent).getParser();
        this._SafeStr_2118.initializeWiredFurniVisualizationStates(this._currentRoomId, _loc2_.transparencies, _loc2_.highlights);
    };

    private onWiredUserTransparency = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6126 = castTo(param1, WiredUserTransparencyEvent).getParser();
        this._SafeStr_2118.updateWiredUserTransparency(this._currentRoomId, _loc2_.roomIndices, _loc2_.transparency, _loc2_.allowClickThrough, _loc2_.easingMode);
    };

    private onWiredUserHighlight = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6122 = castTo(param1, WiredUserHighlightEvent).getParser();
        this._SafeStr_2118.updateWiredUserHighlight(this._currentRoomId, _loc2_.roomIndices, _loc2_.highlightType, _loc2_.strength, _loc2_.color, _loc2_.animationMode, _loc2_.easingMode);
    };

    private onWiredUserVisualizationState = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6116 = castTo(param1, WiredUserVisualizationStateEvent).getParser();
        this._SafeStr_2118.initializeWiredUserVisualizationStates(this._currentRoomId, _loc2_.transparencies, _loc2_.highlights);
    };

    private onFurnitureLabelsAndRegions = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6125 = castTo(param1, FurnitureLabelsAndRegionsEvent).getParser();
        this._SafeStr_2118.replaceFurnitureLabelsAndRegions(this._currentRoomId, _loc2_.entries);
    };

    private onFurnitureLabelsAndRegionsUpdate = (param1: IMessageEvent): void => {
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: _SafeCls_6127 = castTo(param1, FurnitureLabelsAndRegionsUpdateEvent).getParser();
        this._SafeStr_2118.updateFurnitureLabelsAndRegions(this._currentRoomId, _loc2_.addedOrUpdated, _loc2_.removedIds);
    };

    private onWiredFurniMove(param1: WiredFurniMoveMessageData): void {
        let _loc2_: IVector3d = new Vector3d(param1.rotation % 8 * 45);
        this._SafeStr_2118.updateObjectFurnitureLocation(this._currentRoomId, param1.furniId, this.roundLocation(param1.source), _loc2_, this.roundLocation(param1.target), param1.animationTime, param1.overshootingDistance, param1.curveStrength);
    }

    private roundLocation(param1: IVector3d): IVector3d {
        let _loc7_: RoomGeometry = this._SafeStr_2118.getRoomGeometry(this._currentRoomId);
        if (_loc7_ == null) {
            return param1;
        }
        let _loc6_: IVector3d = _loc7_.getScreenPosition(param1);
        if (_loc6_ == null) {
            return param1;
        }
        let _loc9_: IVector3d = new Vector3d(param1.x, param1.y, param1.z + 0.01);
        let _loc3_: IVector3d = _loc7_.getScreenPosition(_loc9_);
        if (_loc3_ == null) {
            return param1;
        }
        let _loc10_: number = _loc6_.y;
        let _loc4_: number = (_loc10_ - _loc3_.y) * 100;
        let _loc5_: number = _loc10_ - Math.round(_loc10_);
        let _loc2_: number = param1.z + _loc5_ / _loc4_;
        return new Vector3d(param1.x, param1.y, _loc2_);
    }

    private onWiredWallItemMove(param1: WiredWallItemMoveMessageData): void {
        let _loc4_: LegacyWallGeometry = this._SafeStr_2118.getLegacyGeometry(this._currentRoomId);
        let _loc3_: string = param1.isDirectionRight ? "r" : "l";
        let _loc2_: IVector3d = _loc4_.getLocation(param1.oldWallX, param1.oldWallY, param1.oldOffsetX, param1.oldOffsetY, _loc3_);
        let _loc5_: IVector3d = _loc4_.getLocation(param1.newWallX, param1.newWallY, param1.newOffsetX, param1.newOffsetY, _loc3_);
        this._SafeStr_2118.updateObjectWallItemLocation(this._currentRoomId, param1.itemId, this.roundLocation(_loc2_), this.roundLocation(_loc5_), param1.animationTime);
    }

    private onWiredUserMove(param1: WiredUserMoveMessageData): void {
        let _loc3_: IRoomObject = null;
        let _loc2_: IRoomInstance = null;
        let _loc5_: IRoomObjectModel = null;
        let _loc4_: boolean = false;
        if (param1.moveType == "sld") {
            _loc2_ = this._SafeStr_2118.getRoom(this._currentRoomId);
            if (_loc2_) {
                _loc3_ = _loc2_.getObject(param1.userIndex, 100);
                if (_loc3_ != null) {
                    _loc5_ = _loc3_.getModel();
                    _loc4_ = _loc5_.getNumber("figure_can_stand_up") > 0;
                }
            }
        }
        let _loc7_: IVector3d = new Vector3d(param1.bodyDirection % 8 * 45);
        let _loc6_: number = param1.headDirection % 8 * 45;
        this._SafeStr_2118.updateObjectUser(this._currentRoomId, param1.userIndex, this.roundLocation(param1.source), this.roundLocation(param1.target), _loc4_, 0, _loc7_, _loc6_, param1.animationTime, false, param1.jumpPower);
        this.setUserMovePosture(param1.userIndex, param1.moveType);
    }

    private onUserDirectionUpdate(param1: UserDirectionUpdateMessageData): void {
        let _loc3_: IVector3d = new Vector3d(param1.bodyDirection % 8 * 45);
        let _loc2_: number = param1.bodyDirection % 8 * 45;
        this._SafeStr_2118.updateObjectUserDir(this._currentRoomId, param1.userIndex, _loc3_, _loc2_);
    }

    private setUserMovePosture(param1: number, param2: string): void {
        let _loc5_: IRoomObject = null;
        let _loc6_: string = null;
        let _loc7_: IRoomObjectModel = null;
        let _loc4_: string = null;
        let _loc3_: IRoomInstance = this._SafeStr_2118.getRoom(this._currentRoomId);
        if (_loc3_) {
            _loc5_ = _loc3_.getObject(param1, 100);
        }
        if (_loc5_ != null && _loc5_.getType() != "monsterplant") {
            _loc7_ = _loc5_.getModel();
            switch (param2) {
                case "mv":
                    _loc6_ = "mv";
                    break;
                case "sld":
                    _loc4_ = _loc7_.getString("figure_posture");
                    _loc6_ = _loc4_ == "mv" ? "std" : _loc4_;
            }
            this._SafeStr_2118.updateObjectUserPosture(this._currentRoomId, param1, _loc6_);
        }
    }

    private styleIsNotification(param1: number): boolean {
        return param1 == 34 || param1 >= 200 && param1 < 300;
    }

    private onChat = (param1: IMessageEvent): void => {
        let _loc2_: ChatMessageParser = null;
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: IRoomSession = this._SafeStr_2118.roomSessionManager.getSession(this._currentRoomId);
        if (param1 instanceof ChatMessageEvent) {
            _loc2_ = (param1 instanceof ChatMessageEvent ? param1 : null).getParser();
        } else if (param1 instanceof WhisperMessageEvent) {
            _loc2_ = (param1 instanceof WhisperMessageEvent ? param1 : null).getParser();
            if (_loc2_ && _loc3_ && _loc2_.userId == _loc3_.ownUserRoomId) {
                return;
            }
        } else if (param1 instanceof ShoutMessageEvent) {
            _loc2_ = (param1 instanceof ShoutMessageEvent ? param1 : null).getParser();
        }
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.userId < 0 || this.styleIsNotification(_loc2_.styleId)) {
            return;
        }
        this._SafeStr_2118.updateObjectUserGesture(this._currentRoomId, _loc2_.userId, _loc2_.gesture);
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc2_.userId, "figure_talk", Math.ceil(_loc2_.text.length / 10) | 0);
    };

    private onTypingStatus = (param1: IMessageEvent): void => {
        let _loc2_: UserTypingMessageEvent = param1 instanceof UserTypingMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: UserTypingMessageParser = _loc2_.getParser();
        let _loc4_: number = 1;
        if (!_loc3_.isTyping) {
            _loc4_ = 0;
        }
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.userId, "figure_is_typing", _loc4_);
    };

    private onPetExperience = (param1: PetExperienceEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: PetExperienceParser = param1.getParser();
        this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc2_.petRoomIndex, "figure_gained_experience", _loc2_.gainedExperience);
    };

    private onDiceValue = (param1: IMessageEvent): void => {
        let _loc5_: DiceValueMessageEvent = param1 instanceof DiceValueMessageEvent ? param1 : null;
        if (_loc5_ == null || _loc5_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc2_: DiceValueMessageParser = _loc5_.getParser();
        let _loc4_: number = _loc2_.id;
        let _loc6_: number = _loc2_.value;
        let _loc3_: IStuffData = new LegacyStuffData();
        this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc4_, null, null, _loc6_, _loc3_);
    };

    private onOneWayDoorStatus = (param1: IMessageEvent): void => {
        let _loc2_: OneWayDoorStatusMessageEvent = param1 instanceof OneWayDoorStatusMessageEvent ? param1 : null;
        if (_loc2_ == null || _loc2_.getParser() == null) {
            return;
        }
        if (this._SafeStr_2118 == null) {
            return;
        }
        let _loc3_: OneWayDoorStatusMessageParser = _loc2_.getParser();
        let _loc5_: number = _loc3_.id;
        let _loc6_: number = _loc3_.status;
        let _loc4_: IStuffData = new LegacyStuffData();
        this._SafeStr_2118.updateObjectFurniture(this._currentRoomId, _loc5_, null, null, _loc6_, _loc4_);
    };

    private onPlayingGame = (param1: YouArePlayingGameMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc3_: YouArePlayingGameMessageParser = param1.getParser();
        let _loc2_: boolean = _loc3_.isPlaying;
        this._SafeStr_2118.setIsPlayingGame(this._currentRoomId, _loc2_);
    };

    private onYouAreNotSpectator = (param1: YouAreNotSpectatorMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: YouAreNotSpectatorMessageParser = param1.getParser();
        if (_loc2_ == null || _loc2_.flatId != this._currentRoomId) {
            return;
        }
        let _loc3_: IRoomSession = this._SafeStr_2118.roomSessionManager.getSession(this._currentRoomId);
        if (_loc3_ == null) {
            return;
        }
        if (!_loc3_.isSpectatorMode) {
            return;
        }
        _loc3_.isSpectatorMode = false;
        this._SafeStr_2118.leaveSpectate();
    };

    private onConfigurationItemStates = (param1: ConfigurationItemStatesMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc3_: ConfigurationItemStatesMessageParser = param1.getParser();
        let _loc5_: boolean = _loc3_.isHanditemControlBlocked;
        let _loc6_: boolean = _loc3_.chooserDisabled;
        let _loc4_: boolean = _loc3_.freeFurniMovementsEnabled;
        let _loc2_: boolean = _loc3_.invisibleFurni;
        this._SafeStr_2118.setHanditemControlBlocked(this._currentRoomId, _loc5_);
        this._SafeStr_2118.setChooserDisabled(this._currentRoomId, _loc6_);
        this._SafeStr_2118.setFreeFurniMovementsMode(this._currentRoomId, _loc4_);
        this._SafeStr_2118.setInvisibleFurni(this._currentRoomId, _loc2_);
    };

    private onGamePlayerNumberValue = (param1: IMessageEvent): void => {
        let _loc2_: GamePlayerValueMessageParser = null;
        let _loc3_: number = 0;
        if (this._SafeStr_2118 == null) {
            return;
        }
        if (param1 instanceof GamePlayerValueMessageEvent) {
            _loc2_ = (param1 instanceof GamePlayerValueMessageEvent ? param1 : null).getParser();
            _loc3_ = this.getRoomId(0);
            this._SafeStr_2118.updateObjectUserAction(_loc3_, _loc2_.userId, "figure_number_value", _loc2_.value);
        }
    };

    private onIgnoreResult = (param1: IMessageEvent): void => {
        if (!this._SafeStr_2118.configuration.getBoolean("avatar.ignored.bubble.enabled")) {
            return;
        }
        let _loc2_: IgnoreResultMessageEvent = param1 instanceof IgnoreResultMessageEvent ? param1 : null;
        let _loc3_: IUserData = this._SafeStr_2118.roomSessionManager.getSession(this._currentRoomId).userDataManager.getUserData(_loc2_.userId);
        if (_loc3_ != null) {
            switch (_loc2_.result - 1) {
                case 0:
                case 1:
                    this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.roomObjectId, "figure_is_muted", 1);
                    break;
                case 2:
                    this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.roomObjectId, "figure_is_muted", 0);
            }
        }
    };

    private onGuideSessionStarted = (param1: IMessageEvent): void => {
        let _loc2_: GuideSessionStartedMessageParser = asInstanceOf(param1.parser, GuideSessionStartedMessageParser);
        this._guideId = _loc2_.guideUserId;
        this._SafeStr_4141 = _loc2_.requesterUserId;
        this.updateGuideMarker();
    };

    private onGuideSessionEnded = (param1: IMessageEvent): void => {
        this.removeGuideMarker();
    };

    private onGuideSessionError = (param1: IMessageEvent): void => {
        this.removeGuideMarker();
    };

    public onSpecialRoomEvent = (param1: IMessageEvent): void => {
        let arrayIndex: number = 0;
        let discoColours: any[];
        let discoTimer: Timer;
        let event: IMessageEvent = param1;
        let eventParser: SpecialRoomEffectMessageParser = asInstanceOf(event.parser, SpecialRoomEffectMessageParser);
        switch (eventParser.effectId) {
            case 0:
                RoomRotatingEffect.init(250, 5000);
                RoomRotatingEffect.turnVisualizationOn();
                break;
            case 1:
                RoomShakingEffect.init(250, 5000);
                RoomShakingEffect.turnVisualizationOn();
                break;
            case 2:
                this._SafeStr_2118.roomSessionManager.events.dispatchEvent(new RoomEngineZoomEvent(this._currentRoomId, -1, true));
                break;
            case 3:
                arrayIndex = 0;
                discoColours = [29371, 16731195, 16764980, 10092288, 29371, 16731195, 16764980, 10092288, 0];
                discoTimer = new Timer(1000, discoColours.length + 1);
                discoTimer.addEventListener("timer", (param1: TimerEvent): void => {
                   if (arrayIndex == discoColours.length) {
                       this._SafeStr_2118.updateObjectRoomColor(this._currentRoomId, discoColours[arrayIndex++] >>> 0, 176, true);
                   } else {
                       this._SafeStr_2118.updateObjectRoomColor(this._currentRoomId, discoColours[arrayIndex++] >>> 0, 176, false);
                   }
               });
                discoTimer.start();
        }
    };

    private updateGuideMarker(): void {
        let _loc1_: number = this._SafeStr_2118.sessionDataManager.userId;
        this.setUserGuideStatus(this._guideId, this._SafeStr_4141 == _loc1_ ? 1 : 0);
        this.setUserGuideStatus(this._SafeStr_4141, this._guideId == _loc1_ ? 2 : 0);
    }

    private removeGuideMarker(): void {
        this.setUserGuideStatus(this._guideId, 0);
        this.setUserGuideStatus(this._SafeStr_4141, 0);
        this._guideId = -1;
        this._SafeStr_4141 = -1;
    }

    private setUserGuideStatus(param1: number, param2: number): void {
        if (!this._SafeStr_2118 || !this._SafeStr_2118.roomSessionManager) {
            return;
        }
        let _loc4_: IRoomSession = this._SafeStr_2118.roomSessionManager.getSession(this._currentRoomId);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IUserData = _loc4_.userDataManager.getUserDataByType(param1, 1);
        if (_loc3_ != null) {
            this._SafeStr_2118.updateObjectUserAction(this._currentRoomId, _loc3_.roomObjectId, "figure_guide_status", param2);
        }
    }

    private onBlockUserUpdate = (param1: IMessageEvent): void => {
        let _loc2_: IUserData = null;
        let _loc4_: BlockUserUpdateMessageEvent = param1 instanceof BlockUserUpdateMessageEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this._SafeStr_2118.roomSessionManager.getSession(this._currentRoomId);
        if (_loc3_ && _loc3_.userDataManager) {
            _loc2_ = _loc3_.userDataManager.getUserData(_loc4_.userId);
            if (_loc2_ != null) {
                this._SafeStr_2118.updateObjectUserBlocked(this._currentRoomId, _loc2_.roomObjectId, _loc4_.result == 1);
            }
        }
    };
}
