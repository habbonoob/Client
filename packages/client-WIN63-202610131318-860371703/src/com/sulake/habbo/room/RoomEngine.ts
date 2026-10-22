import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { AdEvent } from '@/com/sulake/habbo/advertisement/events/AdEvent';
import type { IAdManager } from '@/com/sulake/habbo/advertisement/IAdManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FurniHighlightData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/FurniHighlightData';
import type { FurniTransparencyData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/FurniTransparencyData';
import type { UserHighlightData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/UserHighlightData';
import type { UserTransparencyData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/UserTransparencyData';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IAreaHideInfo } from '@/com/sulake/habbo/room/IAreaHideInfo';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import type { IRoomAreaSelectionManager } from '@/com/sulake/habbo/room/IRoomAreaSelectionManager';
import type { IRoomContentListener } from '@/com/sulake/habbo/room/IRoomContentListener';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';
import type { VariableFxStatusRemoveData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusRemoveData';
import type { PetColorResult } from '@/com/sulake/habbo/room/PetColorResult';
import type { BufferedRoomObjectModelDataEvent } from '@/com/sulake/habbo/room/utils/BufferedRoomObjectModelDataEvent';
import type { FurniStackingHeightMap } from '@/com/sulake/habbo/room/utils/FurniStackingHeightMap';
import type { LegacyWallGeometry } from '@/com/sulake/habbo/room/utils/LegacyWallGeometry';
import type { RoomCamera } from '@/com/sulake/habbo/room/utils/RoomCamera';
import type { SelectedRoomObjectData } from '@/com/sulake/habbo/room/utils/SelectedRoomObjectData';
import type { TileObjectMap } from '@/com/sulake/habbo/room/utils/TileObjectMap';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { FurniIconImageReadyEvent } from '@/com/sulake/habbo/session/events/FurniIconImageReadyEvent';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomManager } from '@/com/sulake/room/IRoomManager';
import type { IRoomManagerListener } from '@/com/sulake/room/IRoomManagerListener';
import type { IRoomObjectFactory } from '@/com/sulake/room/IRoomObjectFactory';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectVisualizationFactory } from '@/com/sulake/room/object/IRoomObjectVisualizationFactory';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IRoomRenderer } from '@/com/sulake/room/renderer/IRoomRenderer';
import type { IRoomRendererFactory } from '@/com/sulake/room/renderer/IRoomRendererFactory';
import type { IRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import type { LoaderInfo } from '@habbo-pixi/runtime/display/LoaderInfo';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { FileReference } from '@habbo-pixi/runtime/net/FileReference';
import { Mouse } from '@habbo-pixi/runtime/ui/Mouse';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { PNGEncoder } from '@/com/sulake/core/utils/images/PNGEncoder';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PlayerVersionCheck } from '@/com/sulake/core/utils/PlayerVersionCheck';
import { Set } from '@/com/sulake/core/utils/Set';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { RenderRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomMessageComposer';
import { RenderRoomThumbnailMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomThumbnailMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { AssetCallbackInfo } from '@/com/sulake/habbo/room/AssetCallbackInfo';
import { RoomEngineAreaHideStateWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineAreaHideStateWidgetEvent';
import { RoomEngineDragWithMouseEvent } from '@/com/sulake/habbo/room/events/RoomEngineDragWithMouseEvent';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import { RoomEngineFurnitureLabelEvent } from '@/com/sulake/habbo/room/events/RoomEngineFurnitureLabelEvent';
import { RoomEngineHSLColorEnableEvent } from '@/com/sulake/habbo/room/events/RoomEngineHSLColorEnableEvent';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import { RoomEngineRoomColorEvent } from '@/com/sulake/habbo/room/events/RoomEngineRoomColorEvent';
import { RoomEngineUseProductEvent } from '@/com/sulake/habbo/room/events/RoomEngineUseProductEvent';
import { RoomToObjectOwnAvatarMoveEvent } from '@/com/sulake/habbo/room/events/RoomToObjectOwnAvatarMoveEvent';
import { isIGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { IRoomCreator } from '@/com/sulake/habbo/room/IRoomCreator';
import { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { IRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import { RoomObjectAvatarBlockedUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarBlockedUpdateMessage';
import { RoomObjectAvatarCarryObjectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarCarryObjectUpdateMessage';
import { RoomObjectAvatarChatUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarChatUpdateMessage';
import { RoomObjectAvatarDanceUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarDanceUpdateMessage';
import { RoomObjectAvatarDirectionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarDirectionUpdateMessage';
import { RoomObjectAvatarEffectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarEffectUpdateMessage';
import { RoomObjectAvatarExperienceUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarExperienceUpdateMessage';
import { RoomObjectAvatarExpressionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarExpressionUpdateMessage';
import { RoomObjectAvatarFigureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarFigureUpdateMessage';
import { RoomObjectAvatarFlatControlUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarFlatControlUpdateMessage';
import { RoomObjectAvatarGestureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarGestureUpdateMessage';
import { RoomObjectAvatarGuideStatusUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarGuideStatusUpdateMessage';
import { RoomObjectAvatarHabbiconUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarHabbiconUpdateMessage';
import { RoomObjectAvatarMutedUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarMutedUpdateMessage';
import { RoomObjectAvatarOwnMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarOwnMessage';
import { RoomObjectAvatarPetGestureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPetGestureUpdateMessage';
import { RoomObjectAvatarPlayerValueUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPlayerValueUpdateMessage';
import { RoomObjectAvatarPlayingGameMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPlayingGameMessage';
import { RoomObjectAvatarPostureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPostureUpdateMessage';
import { RoomObjectAvatarSignUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSignUpdateMessage';
import { RoomObjectAvatarSleepUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSleepUpdateMessage';
import { RoomObjectAvatarTypingUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarTypingUpdateMessage';
import { RoomObjectAvatarUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarUpdateMessage';
import { RoomObjectAvatarUseObjectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarUseObjectUpdateMessage';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectFurniIconUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurniIconUpdateMessage';
import { RoomObjectFurnitureHighlightUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureHighlightUpdateMessage';
import { RoomObjectFurnitureLabelUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureLabelUpdateMessage';
import { RoomObjectFurnitureRegionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureRegionUpdateMessage';
import { RoomObjectFurnitureTransparencyUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureTransparencyUpdateMessage';
import { RoomObjectGroupBadgeUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectGroupBadgeUpdateMessage';
import { RoomObjectHeightUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectHeightUpdateMessage';
import { RoomObjectItemDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectItemDataUpdateMessage';
import { RoomObjectModelDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectModelDataUpdateMessage';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';
import { RoomObjectRoomAdUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomAdUpdateMessage';
import { RoomObjectRoomColorUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomColorUpdateMessage';
import { RoomObjectRoomFloorHoleUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomFloorHoleUpdateMessage';
import { RoomObjectRoomMaskUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomMaskUpdateMessage';
import { RoomObjectRoomPlanePropertyUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomPlanePropertyUpdateMessage';
import { RoomObjectRoomPlaneVisibilityUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomPlaneVisibilityUpdateMessage';
import { RoomObjectRoomUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomUpdateMessage';
import { RoomObjectTileCursorUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectTileCursorUpdateMessage';
import { RoomObjectVariableFxStatusRemoveMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVariableFxStatusRemoveMessage';
import { RoomObjectVariableFxStatusUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVariableFxStatusUpdateMessage';
import { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { FurnitureRegionData } from '@/com/sulake/habbo/room/object/data/FurnitureRegionData';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { StuffDataFactory } from '@/com/sulake/habbo/room/object/data/StuffDataFactory';
import { WiredFurnitureHighlightData } from '@/com/sulake/habbo/room/object/data/WiredFurnitureHighlightData';
import { WiredFurnitureTransparencyData } from '@/com/sulake/habbo/room/object/data/WiredFurnitureTransparencyData';
import { RoomObjectUserTypes } from '@/com/sulake/habbo/room/object/RoomObjectUserTypes';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { VariableFxStatusModelData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelData';
import { VariableFxStatusModelEntry } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelEntry';
import { VariableFxStatusUpdateData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusUpdateData';
import { RoomContentLoader } from '@/com/sulake/habbo/room/RoomContentLoader';
import { RoomMessageHandler } from '@/com/sulake/habbo/room/RoomMessageHandler';
import { RoomObjectEventHandler } from '@/com/sulake/habbo/room/RoomObjectEventHandler';
import { _SafeCls_6115 } from '@/com/sulake/habbo/room/utils/_SafeCls_6115';
import { FurnitureData } from '@/com/sulake/habbo/room/utils/FurnitureData';
import { RoomAreaSelectionManager } from '@/com/sulake/habbo/room/utils/RoomAreaSelectionManager';
import { RoomData } from '@/com/sulake/habbo/room/utils/RoomData';
import { RoomInstanceData } from '@/com/sulake/habbo/room/utils/RoomInstanceData';
import { RoomObjectBadgeImageAssetListener } from '@/com/sulake/habbo/room/utils/RoomObjectBadgeImageAssetListener';
import { RoomObjectFurniIconImageAssetListener } from '@/com/sulake/habbo/room/utils/RoomObjectFurniIconImageAssetListener';
import { SpriteDataCollector } from '@/com/sulake/habbo/room/utils/SpriteDataCollector';
import { FurniId } from '@/com/sulake/habbo/utils/FurniId';
import { IIDHabboAdManager } from '@/com/sulake/iid/IIDHabboAdManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomManager } from '@/com/sulake/iid/IIDRoomManager';
import { IIDRoomObjectFactory } from '@/com/sulake/iid/IIDRoomObjectFactory';
import { IIDRoomObjectVisualizationFactory } from '@/com/sulake/iid/IIDRoomObjectVisualizationFactory';
import { IIDRoomRendererFactory } from '@/com/sulake/iid/IIDRoomRendererFactory';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import { isIRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { isIRoomRenderer } from '@/com/sulake/room/renderer/IRoomRenderer';
import { RoomInstance } from '@/com/sulake/room/RoomInstance';
import { NumberBank } from '@/com/sulake/room/utils/NumberBank';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class RoomEngine extends Component implements IRoomEngine, IRoomManagerListener, IRoomCreator, IRoomEngineServices, IUpdateReceiver, IRoomContentListener {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomEngine'); }

    public static readonly SETUP_WITHOUT_TOOLBAR: number = 1;
    public static readonly _SafeStr_7557: number = 2;
    public static readonly SETUP_WITHOUT_GAME_MANAGER: number = 4;
    public static readonly _SafeStr_6118: number = 5;
    private static readonly ROOM_TEMP_ID: string = "temporary_room";
    public static readonly OBJECT_ID_ROOM: number = -1;
    private static readonly OBJECT_TYPE_ROOM: string = "room";
    private static readonly OBJECT_ID_ROOM_HIGHLIGHTER: number = -2;
    private static readonly OBJECT_TYPE_ROOM_HIGHLIGHTER: string = "tile_cursor";
    private static readonly _SafeStr_8293: number = -3;
    private static readonly _SafeStr_8779: string = "selection_arrow";
    private static readonly _SafeStr_8684: string = "overlay";
    private static readonly _SafeStr_8455: string = "object_icon_sprite";
    private static readonly ROOM_DRAG_THRESHOLD: number = 15;
    private static readonly _SafeStr_8477: number = 30;
    private static readonly _SafeStr_14618: number = 0;
    private static readonly _SafeStr_14619: number = 1;
    private static readonly _SafeStr_14620: number = 2;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomRendererFactory: IRoomRendererFactory;

    declare private _roomManager: IRoomManager;

    declare private _roomObjectFactory: IRoomObjectFactory;

    declare private _visualizationFactory: IRoomObjectVisualizationFactory;

    declare private _adManager: IAdManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _habboTracking: IHabboTracking;

    declare private _toolbar: IHabboToolbar;

    declare private _catalog: IHabboCatalog;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEvents: IHabboUserDefinedRoomEvents;

    declare private _eventHandler: RoomObjectEventHandler;

    declare private _SafeStr_2849: RoomMessageHandler;

    declare private _roomContentLoader: RoomContentLoader;

    declare private _SafeStr_7394: boolean;

    declare private _SafeStr_3404: NumberBank;

    declare private _SafeStr_4651: UtilsMap;

    declare private _SafeStr_3251: NumberBank;

    declare private _SafeStr_3769: UtilsMap;

    declare private _isInitialized: boolean;

    declare protected _activeRoomId: number;

    declare private _SafeStr_3235: number;

    declare private _SafeStr_5277: number;

    declare private _SafeStr_4941: number;

    declare private _SafeStr_3051: boolean;

    declare private _SafeStr_2716: boolean;

    declare private _SafeStr_7010: number;

    declare private _SafeStr_7063: number;

    declare private _roomDraggingAlwaysCenters: boolean;

    declare private _SafeStr_2799: UtilsMap;

    declare private _SafeStr_2626: UtilsMap;

    declare private _SafeStr_14621: _SafeCls_6115;

    declare private _skipFurnitureCreationForNextFrame: boolean;

    declare private _mouseCursorUpdate: boolean;

    declare private _SafeStr_2732: UtilsMap;

    declare private _SafeStr_2774: UtilsMap;

    declare private _gameManager: IHabboGameManager;

    declare private _isGameMode: boolean;

    declare private _playerUnderCursor: number;

    declare private _mouseEventsDisabledAboveY: number;

    declare private _mouseEventsDisabledLeftToX: number;

    declare private _SafeStr_14622: UtilsMap;

    declare private _clickThroughUsers: Set;

    declare private _SafeStr_14623: Set;

    declare private _SafeStr_7561: boolean;

    declare private _SafeStr_7059: boolean;

    declare private _areaSelectionManager: RoomAreaSelectionManager;

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }

    private static getWiredFurniCategory(param1: number): number {
        return param1 < 0 ? 20 : 10;
    }

    private static getWiredFurniObjectId(param1: number): number {
        return param1 < 0 ? -param1 : param1;
    }

    private static applyVariableFxStatus(param1: IRoomObjectController, param2: VariableFxStatusUpdateData, param3: boolean): void {
        param1.getEventHandler().processUpdateMessage(new RoomObjectVariableFxStatusUpdateMessage(param2.configId, param2.variableId, param2.value, param2.overrideMinValue, param2.overrideMaxValue, param2.extra, param3));
    }

    private static isFurnitureCategory(param1: number): boolean {
        return param1 == 10 || param1 == 20;
    }

    private static isReadyRoomObject(param1: IRoomObjectController): boolean {
        return param1 != null && Boolean(param1.isInitialized()) && param1.getEventHandler() != null;
    }

    public static furniIconListenerKey(param1: boolean, param2: number, param3: string): string {
        return (param1 ? "1" : "0") + "-" + param2 + "-" + param3;
    }

    public get mouseEventsDisabledAboveY(): number {
        return this._mouseEventsDisabledAboveY;
    }

    public set mouseEventsDisabledAboveY(param1: number) {
        this._mouseEventsDisabledAboveY = param1;
    }

    public get mouseEventsDisabledLeftToX(): number {
        return this._mouseEventsDisabledLeftToX;
    }

    public set mouseEventsDisabledLeftToX(param1: number) {
        this._mouseEventsDisabledLeftToX = param1;
    }

    public setMouseEventsDisabledRect(param1: string, param2: Rectangle): void {
        if (this._SafeStr_14622 == null || param1 == null || param1.length == 0) {
            return;
        }
        if (param2 == null || Boolean(param2.isEmpty())) {
            this._SafeStr_14622.remove(param1);
            return;
        }
        let _loc3_: Rectangle = param2.clone();
        if (this._SafeStr_14622.hasKey(param1)) {
            this._SafeStr_14622.replace(param1, _loc3_);
        } else {
            this._SafeStr_14622.add(param1, _loc3_);
        }
    }

    public removeMouseEventsDisabledRect(param1: string): void {
        if (this._SafeStr_14622 == null || param1 == null || param1.length == 0) {
            return;
        }
        this._SafeStr_14622.remove(param1);
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public get connection(): IConnection {
        return this._communication != null ? this._communication.connection : null;
    }

    public get activeRoomId(): number {
        return this._activeRoomId;
    }

    public get roomManager(): IRoomManager {
        return this._roomManager;
    }

    public get configuration(): ICoreConfiguration {
        return this;
    }

    protected get eventHandler(): RoomObjectEventHandler {
        return this._eventHandler;
    }

    private get useOffsetScrolling(): boolean {
        return true;
    }

    public get gameEngine(): IHabboGameManager {
        return this._gameManager;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDRoomObjectFactory(), (param1: IRoomObjectFactory): void => {
             this._roomObjectFactory = param1;
         }), new ComponentDependency(new IIDRoomObjectVisualizationFactory(), (param1: IRoomObjectVisualizationFactory): void => {
             this._visualizationFactory = param1;
         }), new ComponentDependency(new IIDRoomManager(), (param1: IRoomManager): void => {
             this._roomManager = param1;
         }), new ComponentDependency(new IIDRoomRendererFactory(), (param1: IRoomRendererFactory): void => {
             this._roomRendererFactory = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, (this.flags & 5) == 0), new ComponentDependency(new IIDHabboConfigurationManager(), null, true, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDHabboAdManager(), (param1: IAdManager): void => {
             this._adManager = param1;
         }, false, [{ "type": "AE_ROOM_AD_SHOW", "callback": this.showRoomAd }, { "type": "AE_ROOM_AD_IMAGE_LOADED", "callback": this.onRoomAdImageLoaded }, { "type": "AE_ROOM_AD_IMAGE_LOADING_FAILED", "callback": this.onRoomAdImageLoaded }]), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, false, [{ "type": "RSE_STARTED", "callback": this.onRoomSessionEvent }, { "type": "RSE_ENDED", "callback": this.onRoomSessionEvent }]), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onToolbarClicked }]), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._habboTracking = param1;
         }, false), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, false), new ComponentDependency(new IIDHabboUserDefinedRoomEvents(), (param1: IHabboUserDefinedRoomEvents): void => {
             this._roomEvents = param1;
         }, false), new ComponentDependency(new IIDHabboGameManager(), (param1: IHabboGameManager): void => {
             this._gameManager = param1;
         }, (this.flags & 4) == 0), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         })]);
    }

    protected override initComponent(): void {
        this._SafeStr_2626 = new UtilsMap();
        this.initializeBufferedRoomObjectModelDataManager();
        this._SafeStr_3404 = new NumberBank(1000);
        this._SafeStr_3251 = new NumberBank(1000);
        this._SafeStr_4651 = new UtilsMap();
        this._SafeStr_3769 = new UtilsMap();
        this._SafeStr_2799 = new UtilsMap();
        this._SafeStr_14622 = new UtilsMap();
        this._SafeStr_14623 = new Set();
        this._clickThroughUsers = new Set();
        this._eventHandler = this.createRoomObjectEventHandlerInstance();
        this._SafeStr_2849 = new RoomMessageHandler(this);
        this.registerUpdateReceiver(this, 1);
        this._roomObjectFactory.addObjectEventListener(this.roomObjectEventHandler);
        this._areaSelectionManager = new RoomAreaSelectionManager(this);
    }

    private initializeBufferedRoomObjectModelDataManager(): void {
        this._SafeStr_14621 = new _SafeCls_6115();
        this._SafeStr_14621.events.addEventListener("BROMDME_CAPTURE", this.captureFurnitureLabelData);
        this._SafeStr_14621.events.addEventListener("BROMDME_CAPTURE", this.captureFurnitureRegionData);
        this._SafeStr_14621.events.addEventListener("BROMDME_CAPTURE", this.captureWiredFurnitureTransparencyData);
        this._SafeStr_14621.events.addEventListener("BROMDME_CAPTURE", this.captureWiredFurnitureHighlightData);
        this._SafeStr_14621.events.addEventListener("BROMDME_CAPTURE", this.captureVariableFxStatusData);
        this._SafeStr_14621.events.addEventListener("BROMDME_RESTORE", this.restoreFurnitureLabelData);
        this._SafeStr_14621.events.addEventListener("BROMDME_RESTORE", this.restoreFurnitureRegionData);
        this._SafeStr_14621.events.addEventListener("BROMDME_RESTORE", this.restoreWiredFurnitureTransparencyData);
        this._SafeStr_14621.events.addEventListener("BROMDME_RESTORE", this.restoreWiredFurnitureHighlightData);
        this._SafeStr_14621.events.addEventListener("BROMDME_RESTORE", this.restoreVariableFxStatusData);
    }

    private disposeBufferedRoomObjectModelDataManager(): void {
        if (this._SafeStr_14621 == null) {
            return;
        }
        this._SafeStr_14621.events.removeEventListener("BROMDME_CAPTURE", this.captureFurnitureLabelData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_CAPTURE", this.captureFurnitureRegionData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_CAPTURE", this.captureWiredFurnitureTransparencyData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_CAPTURE", this.captureWiredFurnitureHighlightData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_CAPTURE", this.captureVariableFxStatusData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_RESTORE", this.restoreFurnitureLabelData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_RESTORE", this.restoreFurnitureRegionData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_RESTORE", this.restoreWiredFurnitureTransparencyData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_RESTORE", this.restoreWiredFurnitureHighlightData);
        this._SafeStr_14621.events.removeEventListener("BROMDME_RESTORE", this.restoreVariableFxStatusData);
        this._SafeStr_14621.dispose();
        this._SafeStr_14621 = null;
    }

    private onConfigurationComplete(param1: Event): void {
        if (this._roomContentLoader) {
            this._roomContentLoader.dispose();
            this.events.removeEventListener("RCL_LOADER_READY", this.onContentLoaderReady);
        }
        let _loc2_: DisplayObjectContainer = this.context.displayObjectContainer;
        let _loc3_: LoaderInfo = _loc2_.loaderInfo;
        this._roomContentLoader = new RoomContentLoader(_loc3_.loaderURL);
        this._roomContentLoader.initialize(this.events, this);
        this._roomContentLoader.iconAssets = this.assets;
        this._roomContentLoader.iconListener = this;
        this._roomContentLoader.visualizationFactory = this._visualizationFactory;
        this._roomManager.addObjectUpdateCategory(10);
        this._roomManager.addObjectUpdateCategory(20);
        this._roomManager.addObjectUpdateCategory(100);
        this._roomManager.addObjectUpdateCategory(200);
        this._roomManager.addObjectUpdateCategory(0);
        this._roomManager.setContentLoader(this._roomContentLoader);
        if (this._SafeStr_2849 && this._communication) {
            this._SafeStr_2849.connection = this._communication.connection;
        }
        this._roomDraggingAlwaysCenters = this.getBoolean("room.dragging.always_center");
        this._roomContentLoader.sessionDataManager = this._sessionDataManager;
        this.events.addEventListener("RCL_LOADER_READY", this.onContentLoaderReady);
    }

    protected createRoomObjectEventHandlerInstance(): RoomObjectEventHandler {
        return new RoomObjectEventHandler(this);
    }

    public override dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: RoomInstanceData = null;
        if (this.disposed) {
            return;
        }
        this._isInitialized = false;
        this.removeUpdateReceiver(this);
        this.disposeBufferedRoomObjectModelDataManager();
        if (this._areaSelectionManager != null) {
            this._areaSelectionManager.dispose();
            this._areaSelectionManager = null;
        }
        if (this._SafeStr_3404 != null) {
            this._SafeStr_3404.dispose();
            this._SafeStr_3404 = null;
        }
        if (this._SafeStr_3251 != null) {
            this._SafeStr_3251.dispose();
            this._SafeStr_3251 = null;
        }
        if (this._SafeStr_4651 != null) {
            this._SafeStr_4651.dispose();
        }
        if (this._SafeStr_3769 != null) {
            this._SafeStr_3769.dispose();
        }
        if (this._eventHandler != null) {
            this._eventHandler.dispose();
            this._eventHandler = null;
        }
        if (this._SafeStr_2849 != null) {
            this._SafeStr_2849.dispose();
            this._SafeStr_2849 = null;
        }
        if (this._roomContentLoader != null) {
            this._roomContentLoader.dispose();
            this._roomContentLoader = null;
        }
        if (this._SafeStr_2799 != null) {
            this._SafeStr_2799.dispose();
            this._SafeStr_2799 = null;
        }
        if (this._SafeStr_14622 != null) {
            this._SafeStr_14622.dispose();
            this._SafeStr_14622 = null;
        }
        if (this._SafeStr_2626 != null) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2626.length) {
                _loc1_ = asInstanceOf(this._SafeStr_2626.getWithIndex(_loc2_), RoomInstanceData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._SafeStr_2626.dispose();
            this._SafeStr_2626 = null;
        }
        if (this._SafeStr_2732 != null) {
            this._SafeStr_2732.dispose();
            this._SafeStr_2732 = null;
        }
        if (this._SafeStr_2774 != null) {
            this._SafeStr_2774.dispose();
            this._SafeStr_2774 = null;
        }
        super.dispose();
    }

    public set disableUpdate(param1: boolean) {
        if (param1) {
            this.removeUpdateReceiver(this);
        } else {
            this.removeUpdateReceiver(this);
            this.registerUpdateReceiver(this, 1);
        }
    }

    public runUpdate(): void {
        this.update(1);
    }

    private getRoomInstanceData(param1: number): RoomInstanceData {
        let _loc2_: string = this.getRoomIdentifier(param1);
        let _loc3_: RoomInstanceData = null;
        if (this._SafeStr_2626 != null) {
            _loc3_ = asInstanceOf(this._SafeStr_2626.getValue(_loc2_), RoomInstanceData);
            if (_loc3_ == null) {
                _loc3_ = new RoomInstanceData(param1);
                this._SafeStr_2626.add(_loc2_, _loc3_);
            }
        }
        return _loc3_;
    }

    public setFurniStackingHeightMap(param1: number, param2: FurniStackingHeightMap): void {
        let _loc3_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc3_ != null) {
            _loc3_.furniStackingHeightMap = param2;
        }
    }

    public getFurniStackingHeightMap(param1: number): FurniStackingHeightMap {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.furniStackingHeightMap;
        }
        return null;
    }

    public setWorldType(param1: number, param2: string): void {
        let _loc3_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc3_ != null) {
            _loc3_.worldType = param2;
        }
    }

    public getWorldType(param1: number): string {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.worldType;
        }
        return null;
    }

    public getLegacyGeometry(param1: number): LegacyWallGeometry {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.legacyGeometry;
        }
        return null;
    }

    public getTileObjectMap(param1: number): TileObjectMap {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.tileObjectMap;
        }
        return null;
    }

    private getActiveRoomCamera(): RoomCamera {
        return this.getRoomCamera(this._activeRoomId);
    }

    private getRoomCamera(param1: number): RoomCamera {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.roomCamera;
        }
        return null;
    }

    public setSelectedObjectData(param1: number, param2: SelectedRoomObjectData): void {
        let _loc3_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc3_ != null) {
            _loc3_.selectedObject = param2;
            if (param2 != null) {
                _loc3_.placedObject = null;
            }
        }
    }

    public getSelectedObjectData(param1: number): ISelectedRoomObjectData {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.selectedObject;
        }
        return null;
    }

    public setPlacedObjectData(param1: number, param2: SelectedRoomObjectData): void {
        let _loc3_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc3_ != null) {
            _loc3_.placedObject = param2;
        }
    }

    public getPlacedObjectData(param1: number): ISelectedRoomObjectData {
        let _loc2_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc2_ != null) {
            return _loc2_.placedObject;
        }
        return null;
    }

    public addObjectUpdateCategory(param1: number): void {
        this._roomManager.addObjectUpdateCategory(param1);
    }

    public removeObjectUpdateCategory(param1: number): void {
        this._roomManager.removeObjectUpdateCategory(param1);
    }

    public update(param1: number): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = null;
        RoomEnterEffect.turnVisualizationOn();
        let _loc2_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc2_ != null) {
            _loc2_.pingMs = this._habboTracking != null ? this._habboTracking.latencyPingMs : -1;
        }
        if (this._roomManager != null) {
            this.createRoomFurniture();
            this._roomManager.update(param1);
            _loc3_ = 0;
            while (_loc3_ < this._roomManager.getRoomCount()) {
                _loc4_ = this._roomManager.getRoomWithIndex(_loc3_);
                if (_loc4_ != null && _loc4_.getRenderer() != null) {
                    _loc4_.getRenderer().update(param1);
                }
                _loc3_++;
            }
            this.updateRoomCameras(param1);
            if (this._mouseCursorUpdate) {
                this.updateMouseCursor();
            }
        }
        RoomEnterEffect.turnVisualizationOff();
    }

    private updateMouseCursor(): void {
        this._mouseCursorUpdate = false;
        let _loc1_: RoomInstanceData = this.getRoomInstanceData(this._activeRoomId);
        if (_loc1_ && _loc1_.hasButtonMouseCursorOwners()) {
            Mouse.cursor = "button";
        } else {
            Mouse.cursor = "auto";
        }
    }

    public requestMouseCursor(param1: string, param2: number, param3: string): void {
        let _loc4_: number = this.getRoomObjectCategory(param3);
        let _loc5_: string = param1;
        if ("ROFCAE_MOUSE_BUTTON" !== _loc5_) {
            if (this.isGameMode && _loc4_ == 100) {
                this._playerUnderCursor = -1;
            }
            this.removeButtonMouseCursorOwner(this._activeRoomId, _loc4_, param2);
        } else {
            if (this.isGameMode && _loc4_ == 100) {
                this._playerUnderCursor = param2;
            }
            this.addButtonMouseCursorOwner(this._activeRoomId, _loc4_, param2);
        }
    }

    private addButtonMouseCursorOwner(param1: number, param2: number, param3: number): void {
        let _loc5_: string = null;
        let _loc4_: RoomInstanceData = null;
        let _loc6_: IRoomSession = this._roomSessionManager.getSession(param1);
        if (param2 != 10 && param2 != 20 || _loc6_ != null && _loc6_.roomControllerLevel >= 1) {
            _loc5_ = param2 + "_" + param3;
            _loc4_ = this.getRoomInstanceData(param1);
            if (_loc4_ != null) {
                if (_loc4_.addButtonMouseCursorOwner(_loc5_)) {
                    this._mouseCursorUpdate = true;
                }
            }
        }
    }

    private removeButtonMouseCursorOwner(param1: number, param2: number, param3: number): void {
        let _loc5_: string = null;
        let _loc4_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc4_ != null) {
            _loc5_ = param2 + "_" + param3;
            if (_loc4_.removeButtonMouseCursorOwner(_loc5_)) {
                this._mouseCursorUpdate = true;
            }
        }
    }

    private removeButtonMouseCursorOwners(param1: number, param2: number): void {
        let _loc4_: any[] = null;
        let _loc5_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc5_ != null) {
            _loc4_ = [];
            for (const _loc3_ of _loc5_.mouseButtonCursorOwners ?? []) {
                if (_loc3_.indexOf(param2 + "_") == 0) {
                    _loc4_.push(_loc3_);
                }
            }
            for (const _loc6_ of _loc4_ ?? []) {
                if (_loc5_.removeButtonMouseCursorOwner(stringOrNull(_loc6_))) {
                    this._mouseCursorUpdate = true;
                }
            }
        }
    }

    public setClickSettings(param1: string, param2: boolean, param3: boolean): void {
        let _loc4_: boolean = this.clickThroughUsers;
        let _loc5_: boolean = this.clickThroughFurni;
        if (param2 && !this._clickThroughUsers.contains(param1)) {
            this._clickThroughUsers.add(param1);
        } else if (!param2 && this._clickThroughUsers.contains(param1)) {
            this._clickThroughUsers.remove(param1);
        }
        if (param3 && !this._SafeStr_14623.contains(param1)) {
            this._SafeStr_14623.add(param1);
        } else if (!param3 && this._SafeStr_14623.contains(param1)) {
            this._SafeStr_14623.remove(param1);
        }
        if (!_loc4_ && param2) {
            this.removeButtonMouseCursorOwners(this._activeRoomId, 100);
        }
        if (!_loc5_ && param3) {
            this.removeButtonMouseCursorOwners(this._activeRoomId, 10);
            this.removeButtonMouseCursorOwners(this._activeRoomId, 20);
        }
    }

    public get clickThroughUsers(): boolean {
        return !this._clickThroughUsers.isEmpty();
    }

    public get clickThroughFurni(): boolean {
        return !this._SafeStr_14623.isEmpty();
    }

    public addFloorHole(param1: number, param2: number): void {
        let _loc8_: IRoomObjectController = null;
        let _loc9_: IRoomObjectController = null;
        let _loc5_: string = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        if (param2 >= 0) {
            _loc8_ = this.getObjectRoom(param1);
            _loc9_ = this.getObjectFurniture(param1, param2);
            if (_loc9_ != null && _loc9_.getModel() != null && _loc8_ != null && _loc8_.getEventHandler() != null) {
                _loc5_ = "RORPFHUM_ADD";
                _loc3_ = _loc9_.getLocation().x | 0;
                _loc4_ = _loc9_.getLocation().y | 0;
                _loc7_ = _loc9_.getModel().getNumber("furniture_size_x") | 0;
                _loc6_ = _loc9_.getModel().getNumber("furniture_size_y") | 0;
                _loc8_.getEventHandler().processUpdateMessage(new RoomObjectRoomFloorHoleUpdateMessage(_loc5_, param2, _loc3_, _loc4_, _loc7_, _loc6_));
            }
        }
    }

    public removeFloorHole(param1: number, param2: number): void {
        let _loc4_: IRoomObjectController = null;
        let _loc3_: string = null;
        if (param2 >= 0) {
            _loc4_ = this.getObjectRoom(param1);
            if (_loc4_ != null && _loc4_.getEventHandler() != null) {
                _loc3_ = "RORPFHUM_REMOVE";
                _loc4_.getEventHandler().processUpdateMessage(new RoomObjectRoomFloorHoleUpdateMessage(_loc3_, param2));
            }
        }
    }

    private createRoomFurniture(): void {
        let _loc6_: number = 0;
        _loc6_ = 4;
        let _loc1_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: FurnitureData = null;
        let _loc10_: boolean = false;
        let _loc7_: boolean = false;
        let _loc8_: string = null;
        let _loc9_: RoomInstance = null;
        let _loc5_: number = getTimer();
        for (const _loc2_ of valuesOf(this._SafeStr_2626)) {
            _loc4_ = 0;
            _loc3_ = null;
            _loc10_ = false;
            _loc7_ = false;
            while (true) {
                _loc3_ = _loc2_.getFurnitureData();
                if (_loc3_ == null) {
                    break;
                }
                _loc10_ = this.addObjectFurnitureFromData(_loc2_.roomId | 0, _loc3_.id, _loc3_);
                if (++_loc4_ % 4 == 0) {
                    _loc1_ = getTimer();
                    if (_loc1_ - _loc5_ >= 30 && !this._isGameMode) {
                        _loc7_ = true;
                        break;
                    }
                }
            }
            while (true) {
                _loc3_ = _loc2_.getWallItemData();
                if (!(!_loc7_ && _loc3_ != null)) {
                    break;
                }
                _loc10_ = this.addObjectWallItemFromData(_loc2_.roomId | 0, _loc3_.id, _loc3_);
                if (++_loc4_ % 4 == 0) {
                    _loc1_ = getTimer();
                    if (_loc1_ - _loc5_ >= 30 && !this._isGameMode) {
                        _loc7_ = true;
                        break;
                    }
                }
            }
            if (_loc10_ && this._isGameMode) {
                _loc8_ = this.getRoomIdentifier(_loc2_.roomId | 0);
                _loc9_ = asInstanceOf(this._roomManager.getRoom(_loc8_), RoomInstance);
                if (!_loc9_.hasUninitializedObjects()) {
                    this.objectsInitialized(_loc8_);
                }
            }
            if (_loc7_) {
                return;
            }
        }
    }

    private updateRoomCameras(param1: number): void {
        let _loc7_: number = 0;
        let _loc3_: RoomInstanceData = null;
        let _loc6_: RoomCamera = null;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc9_: IRoomObject = null;
        let _loc2_: number = 1;
        _loc7_ = 0;
        while (_loc7_ < this._SafeStr_2626.length) {
            _loc3_ = asInstanceOf(this._SafeStr_2626.getWithIndex(_loc7_), RoomInstanceData);
            _loc6_ = null;
            _loc8_ = 0;
            if (_loc3_ != null) {
                _loc6_ = _loc3_.roomCamera;
                _loc8_ = _loc3_.roomId;
            }
            if (_loc6_ != null) {
                _loc5_ = _loc6_.targetId;
                _loc4_ = _loc6_.targetCategory;
                _loc9_ = this.getRoomObject(_loc8_, _loc5_, _loc4_);
                if (_loc9_ != null) {
                    if (_loc8_ != this._activeRoomId || !this._SafeStr_3051) {
                        this.updateRoomCamera(_loc8_, _loc2_, _loc9_.getLocation(), param1);
                    }
                }
            }
            _loc7_++;
        }
    }

    public getRoomGeometry(param1: number): RoomGeometry {
        let _loc2_: IRoomRenderingCanvas = this.getRoomCanvas(param1, 1);
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.geometry, RoomGeometry);
    }

    public updateRoomCamera(param1: number, param2: number, param3: IVector3d, param4: number): void {
        let _loc46_: number = NaN;
        let _loc18_: Rectangle = null;
        let _loc26_: number = 0;
        let _loc25_: number = 0;
        let _loc41_: Rectangle = null;
        let _loc6_: Vector3d = null;
        let _loc31_: number = NaN;
        let _loc32_: number = NaN;
        let _loc9_: number = NaN;
        let _loc27_: number = NaN;
        let _loc22_: number = NaN;
        let _loc21_: number = NaN;
        let _loc19_: number = NaN;
        let _loc34_: Point = null;
        let _loc17_: number = NaN;
        let _loc20_: number = NaN;
        let _loc12_: Matrix = null;
        let _loc36_: number = NaN;
        let _loc38_: number = NaN;
        let _loc42_: number = NaN;
        let _loc40_: number = NaN;
        let _loc10_: number = NaN;
        let _loc8_: number = NaN;
        let _loc5_: Point = null;
        let _loc44_: boolean = false;
        let _loc43_: boolean = false;
        let _loc24_: boolean = false;
        let _loc23_: boolean = false;
        let _loc14_: number = NaN;
        let _loc13_: number = NaN;
        let _loc33_: number = NaN;
        let _loc37_: number = NaN;
        let _loc28_: number = NaN;
        let _loc15_: number = 0;
        let _loc16_: number = 0;
        let _loc39_: Point = null;
        let _loc29_: Vector3d = null;
        let _loc30_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        let _loc7_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc30_ == null || _loc7_ == null || _loc30_.scale != 1 || _loc30_.isFlipped) {
            return;
        }
        let _loc45_: RoomGeometry = asInstanceOf(_loc30_.geometry, RoomGeometry);
        let _loc11_: RoomCamera = _loc7_.roomCamera;
        let _loc35_: IRoomInstance = this.getRoom(param1);
        if (_loc45_ != null && _loc11_ != null && _loc35_ != null) {
            _loc46_ = Math.floor(param3.z) + 1;
            _loc18_ = this.getRoomCanvasRectangle(param1, param2);
            if (_loc18_ != null) {
                _loc26_ = Math.round(_loc18_.width) | 0;
                _loc25_ = Math.round(_loc18_.height) | 0;
                _loc41_ = this.getActiveRoomBoundingRectangle(param2);
                if (_loc41_ != null && (_loc41_.right < 0 || _loc41_.bottom < 0 || _loc41_.left >= _loc26_ || _loc41_.top >= _loc25_)) {
                    _loc11_.reset();
                }
                if (_loc11_.screenWd != _loc26_ || _loc11_.screenHt != _loc25_ || _loc11_.scale != _loc45_.scale || _loc11_.geometryUpdateId != _loc45_.updateId || !Vector3d.isEqual(param3, _loc11_.targetObjectLoc) || _loc11_.isMoving) {
                    _loc11_.targetObjectLoc = param3;
                    _loc6_ = new Vector3d();
                    _loc6_.assign(param3);
                    _loc6_.x = Math.round(_loc6_.x);
                    _loc6_.y = Math.round(_loc6_.y);
                    _loc31_ = _loc35_.getNumber("room_min_x") - 0.5;
                    _loc32_ = _loc35_.getNumber("room_min_y") - 0.5;
                    _loc9_ = _loc35_.getNumber("room_max_x") + 0.5;
                    _loc27_ = _loc35_.getNumber("room_max_y") + 0.5;
                    _loc22_ = Number(Math.round((_loc31_ + _loc9_) / 2));
                    _loc21_ = Number(Math.round((_loc32_ + _loc27_) / 2));
                    _loc19_ = 2;
                    _loc34_ = new Point(_loc6_.x - _loc22_, _loc6_.y - _loc21_);
                    _loc17_ = _loc45_.scale / Math.sqrt(2);
                    _loc20_ = _loc17_ / 2;
                    _loc12_ = new Matrix();
                    _loc12_.rotate(-(_loc45_.direction.x + 90) / 180 * 3.141592653589793);
                    _loc34_ = _loc12_.transformPoint(_loc34_);
                    _loc34_.y = _loc34_.y * (_loc20_ / _loc17_);
                    _loc36_ = _loc18_.width / 2 / _loc17_ - 1;
                    _loc38_ = _loc18_.height / 2 / _loc20_ - 1;
                    _loc42_ = 0;
                    _loc40_ = 0;
                    _loc10_ = 0;
                    _loc8_ = 0;
                    _loc5_ = _loc45_.getScreenPoint(new Vector3d(_loc22_, _loc21_, _loc19_));
                    if (!_loc5_) {
                        return;
                    }
                    _loc5_.x += Math.round(_loc18_.width / 2);
                    _loc5_.y += Math.round(_loc18_.height / 2);
                    if (_loc41_ == null) {
                        _loc45_.adjustLocation(new Vector3d(0, 0), 25);
                        return;
                    }
                    _loc41_.offset(-_loc30_.screenOffsetX, -_loc30_.screenOffsetY);
                    if (!(_loc41_.width > 1 && _loc41_.height > 1)) {
                        _loc45_.adjustLocation(new Vector3d(-30, -30), 25);
                        return;
                    }
                    _loc42_ = (_loc41_.left - _loc5_.x - _loc45_.scale * 0.25) / _loc17_;
                    _loc10_ = (_loc41_.right - _loc5_.x + _loc45_.scale * 0.25) / _loc17_;
                    _loc40_ = (_loc41_.top - _loc5_.y - _loc45_.scale * 0.5) / _loc20_;
                    _loc8_ = (_loc41_.bottom - _loc5_.y + _loc45_.scale * 0.5) / _loc20_;
                    _loc44_ = false;
                    _loc43_ = false;
                    _loc24_ = false;
                    _loc23_ = false;
                    _loc14_ = Number(Math.round((_loc10_ - _loc42_) * _loc17_));
                    if (_loc14_ < _loc18_.width) {
                        _loc46_ = 2;
                        _loc34_.x = (_loc10_ + _loc42_) / 2;
                        _loc24_ = true;
                    } else {
                        if (_loc34_.x > _loc10_ - _loc36_) {
                            _loc34_.x = _loc10_ - _loc36_;
                            _loc44_ = true;
                        }
                        if (_loc34_.x < _loc42_ + _loc36_) {
                            _loc34_.x = _loc42_ + _loc36_;
                            _loc44_ = true;
                        }
                    }
                    _loc13_ = Number(Math.round((_loc8_ - _loc40_) * _loc20_));
                    if (_loc13_ < _loc18_.height) {
                        _loc46_ = 2;
                        _loc34_.y = (_loc8_ + _loc40_) / 2;
                        _loc23_ = true;
                    } else {
                        if (_loc34_.y > _loc8_ - _loc38_) {
                            _loc34_.y = _loc8_ - _loc38_;
                            _loc43_ = true;
                        }
                        if (_loc34_.y < _loc40_ + _loc38_) {
                            _loc34_.y = _loc40_ + _loc38_;
                            _loc43_ = true;
                        }
                        if (_loc43_) {
                            _loc34_.y /= _loc20_ / _loc17_;
                        }
                    }
                    _loc12_.invert();
                    _loc34_ = _loc12_.transformPoint(_loc34_);
                    _loc34_.x = _loc34_.x + _loc22_;
                    _loc34_.y += _loc21_;
                    _loc33_ = 0.35;
                    _loc37_ = 0.2;
                    _loc28_ = 0.2;
                    _loc15_ = 10;
                    _loc16_ = 10;
                    if (_loc28_ * _loc26_ > 100) {
                        _loc28_ = 100 / _loc26_;
                    }
                    if (_loc33_ * _loc25_ > 150) {
                        _loc33_ = 150 / _loc25_;
                    }
                    if (_loc37_ * _loc25_ > 150) {
                        _loc37_ = 150 / _loc25_;
                    }
                    if (_loc11_.limitedLocationX && _loc11_.screenWd == _loc26_ && _loc11_.screenHt == _loc25_) {
                        _loc28_ = 0;
                    }
                    if (_loc11_.limitedLocationY && _loc11_.screenWd == _loc26_ && _loc11_.screenHt == _loc25_) {
                        _loc33_ = 0;
                        _loc37_ = 0;
                    }
                    _loc18_.right *= 1 - _loc28_ * 2;
                    _loc18_.bottom *= 1 - (_loc33_ + _loc37_);
                    if (_loc18_.right < _loc15_) {
                        _loc18_.right = _loc15_;
                    }
                    if (_loc18_.bottom < _loc16_) {
                        _loc18_.bottom = _loc16_;
                    }
                    if (_loc33_ + _loc37_ > 0) {
                        _loc18_.offset(-_loc18_.width / 2, -_loc18_.height * (_loc37_ / (_loc33_ + _loc37_)));
                    } else {
                        _loc18_.offset(-_loc18_.width / 2, -_loc18_.height / 2);
                    }
                    _loc5_ = _loc45_.getScreenPoint(_loc6_);
                    if (!_loc5_) {
                        return;
                    }
                    _loc5_.x += _loc30_.screenOffsetX;
                    _loc5_.y += _loc30_.screenOffsetY;
                    _loc6_.z = _loc46_;
                    _loc6_.x = Math.round(_loc34_.x * 2) / 2;
                    _loc6_.y = Math.round(_loc34_.y * 2) / 2;
                    if (_loc11_.location == null) {
                        _loc45_.location = _loc6_;
                        if (this.useOffsetScrolling) {
                            _loc11_.initializeLocation(new Vector3d(0, 0, 0));
                        } else {
                            _loc11_.initializeLocation(_loc6_);
                        }
                    }
                    _loc39_ = _loc45_.getScreenPoint(_loc6_);
                    _loc29_ = new Vector3d(0, 0, 0);
                    if (_loc39_ != null) {
                        _loc29_.x = _loc39_.x;
                        _loc29_.y = _loc39_.y;
                    }
                    if ((_loc5_.x < _loc18_.left || _loc5_.x > _loc18_.right) && !_loc11_.centeredLocX || (_loc5_.y < _loc18_.top || _loc5_.y > _loc18_.bottom) && !_loc11_.centeredLocY || _loc24_ && !_loc11_.centeredLocX && _loc11_.screenWd != _loc26_ || _loc23_ && !_loc11_.centeredLocY && _loc11_.screenHt != _loc25_ || (_loc11_.roomWd != _loc41_.width || _loc11_.roomHt != _loc41_.height) || (_loc11_.screenWd != _loc26_ || _loc11_.screenHt != _loc25_)) {
                        _loc11_.limitedLocationX = _loc44_;
                        _loc11_.limitedLocationY = _loc43_;
                        if (this.useOffsetScrolling) {
                            _loc11_.target = _loc29_;
                        } else {
                            _loc11_.target = _loc6_;
                        }
                    } else {
                        if (!_loc44_) {
                            _loc11_.limitedLocationX = false;
                        }
                        if (!_loc43_) {
                            _loc11_.limitedLocationY = false;
                        }
                    }
                    _loc11_.centeredLocX = _loc24_;
                    _loc11_.centeredLocY = _loc23_;
                    _loc11_.screenWd = _loc26_;
                    _loc11_.screenHt = _loc25_;
                    _loc11_.scale = _loc45_.scale | 0;
                    _loc11_.geometryUpdateId = _loc45_.updateId;
                    _loc11_.roomWd = _loc41_.width | 0;
                    _loc11_.roomHt = _loc41_.height | 0;
                    if (!this._sessionDataManager.isRoomCameraFollowDisabled) {
                        if (this.useOffsetScrolling) {
                            _loc11_.update(param4, 8);
                        } else {
                            _loc11_.update(param4, 0.5);
                        }
                    }
                    if (this.useOffsetScrolling) {
                        _loc30_.screenOffsetX = -_loc11_.location.x;
                        _loc30_.screenOffsetY = -_loc11_.location.y;
                    } else {
                        _loc45_.adjustLocation(_loc11_.location, 25);
                    }
                } else {
                    _loc11_.limitedLocationX = false;
                    _loc11_.limitedLocationY = false;
                    _loc11_.centeredLocX = false;
                    _loc11_.centeredLocY = false;
                }
            }
        }
    }

    private onContentLoaderReady(param1: Event): void {
        this._SafeStr_7394 = true;
        this._roomManager.initialize(new XML(`<nothing/>`), this);
    }

    private onRoomSessionEvent(param1: RoomSessionEvent): void {
        switch (param1.type) {
            case "RSE_STARTED":
                if (this._SafeStr_2849) {
                    this._SafeStr_2849.setCurrentRoom(param1.session.roomId);
                }
                if (this._eventHandler) {
                    this._eventHandler.enterNewRoom();
                }
                break;
            case "RSE_ENDED":
                if (this._SafeStr_2849) {
                    this._SafeStr_2849.resetCurrentRoom();
                    this.disposeRoom(param1.session.roomId);
                }
        }
    }

    private onToolbarClicked(param1: HabboToolbarEvent): void {
        let _loc2_: RoomCamera = null;
        if (param1.iconId == "HTIE_ICON_MEMENU") {
            _loc2_ = this.getActiveRoomCamera();
            if (_loc2_) {
                _loc2_.activateFollowing(this.cameraFollowDuration);
                _loc2_.reset();
            }
        }
    }

    public roomManagerInitialized(param1: boolean): void {
        let _loc3_: number = 0;
        let _loc2_: RoomData = null;
        if (param1) {
            this._isInitialized = true;
            this.events.dispatchEvent(new RoomEngineEvent("REE_ENGINE_INITIALIZED", 0));
            _loc3_ = 0;
            while (_loc3_ < this._SafeStr_2799.length) {
                _loc2_ = asInstanceOf(this._SafeStr_2799.getWithIndex(_loc3_), RoomData);
                if (_loc2_ != null) {
                    this.initializeRoom(_loc2_.roomId, _loc2_.data);
                }
                _loc3_++;
            }
        } else {
            Logger.log("[RoomEngine] Failed to initialize manager");
        }
    }

    public setActiveRoom(param1: number): void {
        this._activeRoomId = param1;
    }

    public getRoomIdentifier(param1: number): string {
        return String(param1);
    }

    private getRoomId(param1: string): number {
        let _loc2_: any[] = null;
        if (param1 != null) {
            _loc2_ = param1.split("_");
            if (_loc2_.length > 0) {
                return _loc2_[0] | 0;
            }
        }
        return -1;
    }

    public getRoomNumberValue(param1: number, param2: string): number {
        let _loc3_: IRoomInstance = this.getRoom(param1);
        if (_loc3_ != null) {
            if (!_loc3_.hasValueForName(param2)) {
                return NaN;
            }
            return _loc3_.getNumber(param2);
        }
        return NaN;
    }

    public getRoomStringValue(param1: number, param2: string): string {
        let _loc3_: IRoomInstance = this.getRoom(param1);
        if (_loc3_ != null) {
            return _loc3_.getString(param2);
        }
        return null;
    }

    public setIsPlayingGame(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = param2 ? 1 : 0;
            _loc4_.setNumber("is_playing_game", _loc3_);
            if (_loc3_ == 0) {
                this.events.dispatchEvent(new RoomEngineEvent("REE_NORMAL_MODE", param1));
            } else {
                this.events.dispatchEvent(new RoomEngineEvent("REE_GAME_MODE", param1));
            }
        }
    }

    public leaveSpectate(): void {
        this.events.dispatchEvent(new RoomEngineEvent("REE_ENTRANCE_AFTER_SPECTATE", this._activeRoomId));
    }

    public setHanditemControlBlocked(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = param2 ? 1 : 0;
            _loc4_.setNumber("handitem_control_blocked", _loc3_);
        }
    }

    public setChooserDisabled(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = param2 ? 1 : 0;
            _loc4_.setNumber("chooser_disabled", _loc3_);
        }
    }

    public setFreeFurniMovementsMode(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = param2 ? 1 : 0;
            _loc4_.setNumber("free_furni_movements_mode", _loc3_);
        }
    }

    public setInvisibleFurni(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = param2 ? 1 : 0;
            _loc4_.setNumber("invisible_furni", _loc3_);
            this.updateInvisibleFurniForRoom(param1, param2);
        }
    }

    private updateInvisibleFurniForRoom(param1: number, param2: boolean): void {
        this.updateInvisibleFurniForObjects(this.getRoomObjects(param1, 10), param2);
        this.updateInvisibleFurniForObjects(this.getRoomObjects(param1, 20), param2);
    }

    private updateInvisibleFurniForObjects(param1: any[], param2: boolean): void {
        let _loc3_: IRoomObjectController = null;
        let _loc4_: IRoomObjectModelController = null;
        if (param1 == null) {
            return;
        }
        let _loc5_: number = param2 ? 1 : 0;
        for (const _loc6_ of param1 ?? []) {
            _loc3_ = isIRoomObjectController(_loc6_) ? _loc6_ : null;
            if (_loc3_ != null) {
                _loc4_ = _loc3_.getModelController();
                if (_loc4_ != null) {
                    _loc4_.setNumber("furniture_invisible_layer", _loc5_);
                }
            }
        }
    }

    public getIsPlayingGame(param1: number): boolean {
        let _loc2_: number = NaN;
        if (param1 == this._activeRoomId && this._roomEvents != null && this._roomEvents.isGameMode) {
            return true;
        }
        let _loc3_: IRoomInstance = this.getRoom(param1);
        if (_loc3_ != null) {
            _loc2_ = _loc3_.getNumber("is_playing_game");
            if (_loc2_ > 0) {
                return true;
            }
        }
        return false;
    }

    public isRoomVariableActive(param1: number, param2: string): boolean {
        let _loc3_: number = NaN;
        let _loc4_: IRoomInstance = this.getRoom(param1);
        if (_loc4_ != null) {
            _loc3_ = _loc4_.getNumber(param2);
            if (_loc3_ > 0) {
                return true;
            }
        }
        return false;
    }

    public getActiveRoomIsPlayingGame(): boolean {
        return this.getIsPlayingGame(this._activeRoomId);
    }

    public get activeRoomHasHanditemControlBlocked(): boolean {
        return this.isRoomVariableActive(this._activeRoomId, "handitem_control_blocked");
    }

    public get activeRoomHasChooserDisabled(): boolean {
        return this.isRoomVariableActive(this._activeRoomId, "chooser_disabled");
    }

    public get activeRoomHasFreeFurniMovementsMode(): boolean {
        return this.isRoomVariableActive(this._activeRoomId, "free_furni_movements_mode");
    }

    public getRoom(param1: number): IRoomInstance {
        if (!this._isInitialized) {
            return null;
        }
        let _loc2_: string = this.getRoomIdentifier(param1);
        return this._roomManager.getRoom(_loc2_);
    }

    public initializeRoom(param1: number, param2: XML, param3: IVector3d = null, param4: IAreaHideInfo[] = null): void {
        let _loc5_: string = this.getRoomIdentifier(param1);
        let _loc8_: RoomData = null;
        let _loc9_: string = "111";
        let _loc10_: string = "201";
        let _loc7_: string = "1";
        if (!this._isInitialized) {
            _loc8_ = this._SafeStr_2799.remove(_loc5_);
            if (_loc8_ != null) {
                _loc9_ = _loc8_.floorType;
                _loc10_ = _loc8_.wallType;
                _loc7_ = _loc8_.landscapeType;
                if (!param3) {
                    param3 = _loc8_.cameraInitPosition;
                }
            }
            _loc8_ = new RoomData(param1, param2);
            _loc8_.floorType = _loc9_;
            _loc8_.wallType = _loc10_;
            _loc8_.landscapeType = _loc7_;
            _loc8_.cameraInitPosition = param3;
            this._SafeStr_2799.add(_loc5_, _loc8_);
            Logger.log("Room Engine not initilized yet, can not create room. Room data stored for later initialization.");
            return;
        }
        if (param2 == null) {
            Logger.log("Room property messages received before floor height map, will initialize when floor height map received.");
            return;
        }
        _loc8_ = this._SafeStr_2799.remove(_loc5_);
        if (_loc8_ != null) {
            if (_loc8_.floorType != null && _loc8_.floorType.length > 0) {
                _loc9_ = _loc8_.floorType;
            }
            if (_loc8_.wallType != null && _loc8_.wallType.length > 0) {
                _loc10_ = _loc8_.wallType;
            }
            if (_loc8_.landscapeType != null && _loc8_.landscapeType.length > 0) {
                _loc7_ = _loc8_.landscapeType;
            }
            if (_loc8_.cameraInitPosition != null) {
                param3 = _loc8_.cameraInitPosition;
            }
        }
        let _loc11_: IRoomInstance = this.createRoom(_loc5_, param2, _loc9_, _loc10_, _loc7_, param3);
        if (param4 != null) {
            for (const _loc6_ of param4 ?? []) {
                this.updateAreaHide(param1, _loc6_.furniId, _loc6_.on, _loc6_.rootX, _loc6_.rootY, _loc6_.width, _loc6_.length, _loc6_.invert);
            }
        }
        if (_loc11_ == null) {
            return;
        }
        this.events.dispatchEvent(new RoomEngineEvent("REE_INITIALIZED", param1));
    }

    private createRoom(param1: string, param2: XML, param3: string, param4: string, param5: string, param6: IVector3d): IRoomInstance {
        let _loc24_: number = 0;
        let _loc11_: XML = null;
        let _loc26_: number = NaN;
        let _loc9_: number = NaN;
        let _loc25_: number = NaN;
        let _loc8_: number = NaN;
        let _loc22_: RoomObjectRoomUpdateMessage = null;
        let _loc17_: XMLList = null;
        let _loc27_: any[] = null;
        let _loc10_: RoomObjectRoomMaskUpdateMessage = null;
        let _loc20_: number = 0;
        let _loc7_: XML = null;
        let _loc16_: number = NaN;
        let _loc14_: number = NaN;
        let _loc13_: number = NaN;
        let _loc12_: number = NaN;
        let _loc18_: string = null;
        let _loc21_: string = null;
        let _loc19_: Vector3d = null;
        if (!this._isInitialized) {
            return null;
        }
        let _loc23_: IRoomInstance = this._roomManager.createRoom(param1, param2);
        if (_loc23_ == null) {
            return null;
        }
        let _loc28_: number = 0;
        let _loc29_: IRoomObjectController = null;
        let _loc15_: number = 1;
        _loc29_ = asGuarded(_loc23_.createRoomObject(-1, "room", _loc28_), isIRoomObjectController);
        _loc23_.setNumber("room_is_public", 0, true);
        _loc23_.setNumber("room_z_scale", _loc15_, true);
        if (param2 != null) {
            _loc24_ = 0;
            if (param2.child("dimensions").length() == 1) {
                _loc11_ = param2.child("dimensions").item(0);
                _loc26_ = Number(_loc11_.attribute("minX"));
                _loc9_ = Number(_loc11_.attribute("maxX"));
                _loc25_ = Number(_loc11_.attribute("minY"));
                _loc8_ = Number(_loc11_.attribute("maxY"));
                _loc23_.setNumber("room_min_x", _loc26_);
                _loc23_.setNumber("room_max_x", _loc9_);
                _loc23_.setNumber("room_min_y", _loc25_);
                _loc23_.setNumber("room_max_y", _loc8_);
                _loc24_ = _loc24_ + (_loc26_ * 423 + _loc9_ * 671 + _loc25_ * 913 + _loc8_ * 7509) | 0;
                if (_loc29_ != null && _loc29_.getModelController() != null) {
                    _loc29_.getModelController().setNumber("room_random_seed", _loc24_, true);
                }
            }
            if (param6 != null) {
                _loc23_.setNumber("camera_init_x", param6.x);
                _loc23_.setNumber("camera_init_y", param6.y);
                _loc23_.setNumber("camera_init_z", param6.z);
            }
        }
        if (_loc29_ != null && _loc29_.getEventHandler() != null) {
            _loc29_.getEventHandler().initialize(param2);
            _loc22_ = null;
            if (param3 != null) {
                _loc22_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_FLOOR_UPDATE", param3);
                _loc29_.getEventHandler().processUpdateMessage(_loc22_);
                _loc23_.setString("room_floor_type", param3);
            }
            if (param4 != null) {
                _loc22_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_WALL_UPDATE", param4);
                _loc29_.getEventHandler().processUpdateMessage(_loc22_);
                _loc23_.setString("room_wall_type", param4);
            }
            if (param5 != null) {
                _loc22_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_LANDSCAPE_UPDATE", param5);
                _loc29_.getEventHandler().processUpdateMessage(_loc22_);
                _loc23_.setString("room_landscape_type", param5);
            }
            if (param2 != null) {
                if (param2.child("doors").child("door").length() > 0) {
                    _loc17_ = param2.child("doors").child("door");
                    _loc27_ = ["x", "y", "z", "dir"];
                    _loc10_ = null;
                    _loc20_ = 0;
                    while (_loc20_ < _loc17_.length()) {
                        _loc7_ = _loc17_.item(_loc20_);
                        if (XMLValidator.checkRequiredAttributes(_loc7_, _loc27_)) {
                            _loc16_ = Number(_loc7_.attribute("x"));
                            _loc14_ = Number(_loc7_.attribute("y"));
                            _loc13_ = Number(_loc7_.attribute("z"));
                            _loc12_ = Number(_loc7_.attribute("dir"));
                            _loc18_ = "door";
                            _loc21_ = "door_" + _loc20_;
                            _loc19_ = new Vector3d(_loc16_, _loc14_, _loc13_);
                            _loc10_ = new RoomObjectRoomMaskUpdateMessage("RORMUM_ADD_MASK", _loc21_, _loc18_, _loc19_, "hole");
                            _loc29_.getEventHandler().processUpdateMessage(_loc10_);
                            if (_loc12_ == 90 || _loc12_ == 180) {
                                if (_loc12_ == 90) {
                                    _loc23_.setNumber("room_door_x", _loc16_ - 0.5, true);
                                    _loc23_.setNumber("room_door_y", _loc14_, true);
                                }
                                if (_loc12_ == 180) {
                                    _loc23_.setNumber("room_door_x", _loc16_, true);
                                    _loc23_.setNumber("room_door_y", _loc14_ - 0.5, true);
                                }
                                _loc23_.setNumber("room_door_z", _loc13_, true);
                                _loc23_.setNumber("room_door_dir", _loc12_, true);
                            }
                        }
                        _loc20_++;
                    }
                }
            }
        }
        _loc23_.createRoomObject(-2, "tile_cursor", 200);
        if (!this.getBoolean("avatar.widget.enabled")) {
            _loc23_.createRoomObject(-3, "selection_arrow", 200);
        }
        return _loc23_;
    }

    public getObjectRoom(param1: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), -1, 0);
    }

    public updateObjectRoom(param1: number, param2: string = null, param3: string = null, param4: string = null, param5: boolean = false): boolean {
        let _loc6_: string = null;
        let _loc8_: RoomData = null;
        let _loc10_: IRoomObjectController = this.getObjectRoom(param1);
        let _loc7_: IRoomInstance = this.getRoom(param1);
        if (_loc10_ == null) {
            _loc6_ = this.getRoomIdentifier(param1);
            _loc8_ = this._SafeStr_2799.getValue(_loc6_);
            if (_loc8_ == null) {
                _loc8_ = new RoomData(param1, null);
                this._SafeStr_2799.add(_loc6_, _loc8_);
            }
            if (param2 != null) {
                _loc8_.floorType = param2;
            }
            if (param3 != null) {
                _loc8_.wallType = param3;
            }
            if (param4 != null) {
                _loc8_.landscapeType = param4;
            }
            return true;
        }
        if (_loc10_.getEventHandler() == null) {
            return false;
        }
        let _loc9_: RoomObjectRoomUpdateMessage = null;
        if (param2 != null) {
            if (_loc7_ != null && !param5) {
                _loc7_.setString("room_floor_type", param2);
            }
            _loc9_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_FLOOR_UPDATE", param2);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
        }
        if (param3 != null) {
            if (_loc7_ != null && !param5) {
                _loc7_.setString("room_wall_type", param3);
            }
            _loc9_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_WALL_UPDATE", param3);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
        }
        if (param4 != null) {
            if (_loc7_ != null && !param5) {
                _loc7_.setString("room_landscape_type", param4);
            }
            _loc9_ = new RoomObjectRoomUpdateMessage("RORUM_ROOM_LANDSCAPE_UPDATE", param4);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
        }
        return true;
    }

    public updateObjectRoomColor(param1: number, param2: number, param3: number, param4: boolean): boolean {
        let _loc6_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc6_ == null || _loc6_.getEventHandler() == null) {
            return false;
        }
        let _loc5_: RoomObjectRoomColorUpdateMessage = null;
        _loc5_ = new RoomObjectRoomColorUpdateMessage("RORCUM_BACKGROUND_COLOR", param2, param3, param4);
        _loc6_.getEventHandler().processUpdateMessage(_loc5_);
        this.events.dispatchEvent(new RoomEngineRoomColorEvent(param1, param2, param3 >>> 0, param4));
        return true;
    }

    public updateObjectRoomBackgroundColor(param1: number, param2: boolean, param3: number, param4: number, param5: number): boolean {
        let _loc6_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc6_ == null || _loc6_.getEventHandler() == null) {
            return false;
        }
        this.events.dispatchEvent(new RoomEngineHSLColorEnableEvent("ROHSLCEE_ROOM_BACKGROUND_COLOR", param1, param2, param3, param4, param5));
        return true;
    }

    public updateObjectRoomVisibilities(param1: number, param2: boolean, param3: boolean = true): boolean {
        let _loc4_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc4_ == null || _loc4_.getEventHandler() == null) {
            return false;
        }
        let _loc5_: RoomObjectRoomPlaneVisibilityUpdateMessage = null;
        _loc5_ = new RoomObjectRoomPlaneVisibilityUpdateMessage("RORPVUM_WALL_VISIBILITY", param2);
        _loc4_.getEventHandler().processUpdateMessage(_loc5_);
        _loc5_ = new RoomObjectRoomPlaneVisibilityUpdateMessage("RORPVUM_FLOOR_VISIBILITY", param3);
        _loc4_.getEventHandler().processUpdateMessage(_loc5_);
        return true;
    }

    public updateObjectRoomPlaneThicknesses(param1: number, param2: number, param3: number): boolean {
        let _loc4_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc4_ == null || _loc4_.getEventHandler() == null) {
            return false;
        }
        let _loc5_: RoomObjectRoomPlanePropertyUpdateMessage = null;
        _loc5_ = new RoomObjectRoomPlanePropertyUpdateMessage("RORPPUM_WALL_THICKNESS", param2);
        _loc4_.getEventHandler().processUpdateMessage(_loc5_);
        _loc5_ = new RoomObjectRoomPlanePropertyUpdateMessage("RORPVUM_FLOOR_THICKNESS", param3);
        _loc4_.getEventHandler().processUpdateMessage(_loc5_);
        return true;
    }

    public updateAreaHide(param1: number, param2: number, param3: boolean, param4: number, param5: number, param6: number, param7: number, param8: boolean): boolean {
        let _loc10_: RoomObjectRoomFloorHoleUpdateMessage = null;
        let _loc9_: RoomEngineAreaHideStateWidgetEvent = new RoomEngineAreaHideStateWidgetEvent(param1, param2, 10, param3);
        this.events.dispatchEvent(_loc9_);
        let _loc11_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc11_ == null || _loc11_.getEventHandler() == null) {
            return false;
        }
        if (param3) {
            _loc10_ = new RoomObjectRoomFloorHoleUpdateMessage("RORPFHUM_ADD", param2, param4, param5, param6, param7, param8);
        } else {
            _loc10_ = new RoomObjectRoomFloorHoleUpdateMessage("RORPFHUM_REMOVE", param2);
        }
        _loc11_.getEventHandler().processUpdateMessage(_loc10_);
        return true;
    }

    public disposeRoom(param1: number): void {
        this._SafeStr_14621.clearRoom(param1);
        let _loc2_: string = this.getRoomIdentifier(param1);
        this._roomManager.disposeRoom(_loc2_);
        let _loc3_: RoomInstanceData = this._SafeStr_2626.remove(_loc2_);
        if (_loc3_ != null) {
            _loc3_.dispose();
        }
        this.events.dispatchEvent(new RoomEngineEvent("REE_DISPOSED", param1));
    }

    public setOwnUserId(param1: number, param2: number): void {
        let _loc3_: IRoomSession = this._roomSessionManager.getSession(param1);
        if (_loc3_) {
            _loc3_.ownUserRoomId = param2;
        }
        let _loc4_: RoomCamera = this.getRoomCamera(param1);
        if (_loc4_ != null) {
            _loc4_.targetId = param2;
            _loc4_.targetCategory = 100;
            _loc4_.activateFollowing(this.cameraFollowDuration);
        }
    }

    public createRoomCanvas(param1: number, param2: number, param3: number, param4: number, param5: number): DisplayObject {
        let _loc17_: number = NaN;
        let _loc16_: number = NaN;
        let _loc14_: number = NaN;
        let _loc12_: number = NaN;
        let _loc13_: Vector3d = null;
        let _loc15_: Vector3d = null;
        let _loc8_: Sprite = null;
        let _loc11_: string = this.getRoomIdentifier(param1);
        let _loc9_: IRoomInstance = this._roomManager.getRoom(_loc11_);
        if (_loc9_ == null) {
            return null;
        }
        let _loc6_: IRoomRenderer = asGuarded(_loc9_.getRenderer(), isIRoomRenderer);
        if (_loc6_ == null) {
            _loc6_ = this._roomRendererFactory.createRenderer();
        }
        if (_loc6_ == null) {
            return null;
        }
        _loc6_.roomObjectVariableAccurateZ = "object_accurate_z_value";
        _loc9_.setRenderer(_loc6_);
        let _loc7_: IRoomRenderingCanvas = _loc6_.createCanvas(param2, param3, param4, param5);
        if (_loc7_ == null) {
            return null;
        }
        _loc7_.mouseListener = this._eventHandler;
        if (_loc7_.geometry != null) {
            _loc7_.geometry.z_scale = _loc9_.getNumber("room_z_scale");
        }
        if (_loc7_.geometry != null) {
            _loc17_ = _loc9_.getNumber("room_door_x");
            _loc16_ = _loc9_.getNumber("room_door_y");
            _loc14_ = _loc9_.getNumber("room_door_z");
            _loc12_ = _loc9_.getNumber("room_door_dir");
            _loc13_ = new Vector3d(_loc17_, _loc16_, _loc14_);
            _loc15_ = null;
            if (_loc12_ == 90) {
                _loc15_ = new Vector3d(-2000, 0, 0);
            }
            if (_loc12_ == 180) {
                _loc15_ = new Vector3d(0, -2000, 0);
            }
            _loc7_.geometry.setDisplacement(_loc13_, _loc15_);
        }
        let _loc10_: Sprite = asInstanceOf(_loc7_.displayObject, Sprite);
        if (_loc10_ != null) {
            _loc8_ = new Sprite();
            _loc8_.name = "overlay";
            _loc8_.mouseEnabled = false;
            _loc10_.addChild(_loc8_);
        }
        return _loc10_;
    }

    public setRoomCanvasScale(param1: number, param2: number, param3: number, param4: Point = null, param5: Point = null, param6: boolean = false, param7: boolean = false, param8: boolean = false): void {
        if (!this.getBoolean("zoom.enabled")) {
            return;
        }
        if (!param7 && !param6) {
            param3 = param3 < 1 ? 0.5 : Number(Math.floor(param3));
        }
        let _loc9_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc9_ != null) {
            if (param6) {
                _loc9_.setFlip(!_loc9_.isFlipped, param4, param5);
            } else {
                _loc9_.setScale(param3, param4, param5, param8);
            }
            this.syncRoomCameraLocationToCanvasOffset(param1, _loc9_);
            this.events.dispatchEvent(new RoomEngineEvent("REE_ROOM_ZOOMED", param1));
        }
    }

    public getRoomCanvasScale(param1: number = -1000, param2: number = -1): number {
        if (param1 == -1000) {
            param1 = this._activeRoomId;
        }
        if (param2 == -1) {
            param2 = this._SafeStr_3235;
        }
        let _loc3_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc3_ == null) {
            return 1;
        }
        return _loc3_.scale;
    }

    public getRoomCanvasIsFlipped(param1: number = -1000, param2: number = -1): boolean {
        if (param1 == -1000) {
            param1 = this._activeRoomId;
        }
        if (param2 == -1) {
            param2 = this._SafeStr_3235;
        }
        let _loc3_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        return _loc3_ != null && _loc3_.isFlipped;
    }

    public getRoomCanvas(param1: number, param2: number): IRoomRenderingCanvas {
        let _loc3_: string = this.getRoomIdentifier(param1);
        let _loc6_: IRoomInstance = this._roomManager.getRoom(_loc3_);
        if (_loc6_ == null) {
            return null;
        }
        let _loc4_: IRoomRenderer = asGuarded(_loc6_.getRenderer(), isIRoomRenderer);
        if (_loc4_ == null) {
            return null;
        }
        return _loc4_.getCanvas(param2);
    }

    public modifyRoomCanvas(param1: number, param2: number, param3: number, param4: number): boolean {
        let _loc5_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc5_ == null) {
            return false;
        }
        _loc5_.initialize(param3, param4);
        return true;
    }

    public setRoomCanvasMask(param1: number, param2: number, param3: boolean): void {
        let _loc4_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc4_ == null) {
            return;
        }
        _loc4_.useMask = param3;
    }

    private getRoomCanvasRectangle(param1: number, param2: number): Rectangle {
        let _loc3_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc3_ == null) {
            return null;
        }
        return new Rectangle(0, 0, _loc3_.width, _loc3_.height);
    }

    public getRoomCanvasGeometry(param1: number, param2: number = -1): IRoomGeometry {
        if (param2 == -1) {
            param2 = this._SafeStr_3235;
        }
        let _loc3_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc3_ == null) {
            return null;
        }
        return _loc3_.geometry;
    }

    public getRoomCanvasScreenOffset(param1: number, param2: number = -1): Point {
        if (param2 == -1) {
            param2 = this._SafeStr_3235;
        }
        let _loc3_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc3_ == null) {
            return null;
        }
        return new Point(_loc3_.screenOffsetX, _loc3_.screenOffsetY);
    }

    public setRoomCanvasScreenOffset(param1: number, param2: number, param3: Point): boolean {
        let _loc4_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (_loc4_ == null || param3 == null) {
            return false;
        }
        _loc4_.screenOffsetX = param3.x;
        _loc4_.screenOffsetY = param3.y;
        return true;
    }

    public snapshotRoomCanvasToBitmap(param1: number, param2: number, param3: BitmapData, param4: Matrix, param5: boolean): boolean {
        let _loc7_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (!_loc7_) {
            return false;
        }
        let _loc6_: DisplayObject = _loc7_.displayObject;
        if (!_loc6_) {
            return false;
        }
        param3.draw(_loc6_, param4, null, null, null, param5);
        return true;
    }

    private handleRoomDragging(param1: IRoomRenderingCanvas, param2: number, param3: number, param4: string, param5: boolean, param6: boolean, param7: boolean): boolean {
        let _loc10_: RoomInstanceData = null;
        let _loc11_: RoomCamera = null;
        let _loc12_: number = NaN;
        let _loc13_: number = NaN;
        let _loc14_: number = NaN;
        if (this._isGameMode) {
            return false;
        }
        if (this._areaSelectionManager.areaSelectionState == RoomAreaSelectionManager.SELECTING) {
            this._SafeStr_3051 = false;
            this._SafeStr_2716 = false;
            return false;
        }
        let _loc9_: number = param2 - this._SafeStr_5277;
        let _loc8_: number = param3 - this._SafeStr_4941;
        if (param4 == "mouseDown") {
            if (!param5 && !param6 && !param7 && !this.isDecorateMode) {
                this._SafeStr_3051 = true;
                this._SafeStr_2716 = false;
                this._SafeStr_7010 = this._SafeStr_5277;
                this._SafeStr_7063 = this._SafeStr_4941;
            }
        } else if (param4 == "mouseUp") {
            if (this._SafeStr_3051) {
                this._SafeStr_3051 = false;
                if (this._SafeStr_2716) {
                    _loc10_ = this.getRoomInstanceData(this._activeRoomId);
                    if (_loc10_ != null) {
                        _loc11_ = _loc10_.roomCamera;
                        if (_loc11_ != null) {
                            if (this.useOffsetScrolling) {
                                if (!_loc11_.isMoving) {
                                    _loc11_.centeredLocX = false;
                                    _loc11_.centeredLocY = false;
                                }
                                _loc12_ = this.getCanvasTransformScale(param1);
                                _loc13_ = Number(param1.isFlipped ? -param1.width : param1.width);
                                _loc14_ = Number(param1.isFlipped ? -param1.height : param1.height);
                                _loc11_.resetLocation(new Vector3d(-this.normalizeScreenOffsetForScale(param1.screenOffsetX, _loc13_, _loc12_), -this.normalizeScreenOffsetForScale(param1.screenOffsetY, _loc14_, _loc12_)));
                            }
                            if (this._roomDraggingAlwaysCenters) {
                                _loc11_.reset();
                            }
                        }
                    }
                    this.events.dispatchEvent(new RoomEngineDragWithMouseEvent("REDWME_DRAG_END", this._activeRoomId));
                }
            }
        } else if (param4 == "mouseMove") {
            if (this._SafeStr_3051) {
                if (!this._SafeStr_2716) {
                    _loc9_ = param2 - this._SafeStr_7010;
                    _loc8_ = param3 - this._SafeStr_7063;
                    if (_loc9_ <= -15 || _loc9_ >= 15 || _loc8_ <= -15 || _loc8_ >= 15) {
                        this._SafeStr_2716 = true;
                        this.events.dispatchEvent(new RoomEngineDragWithMouseEvent("REDWME_DRAG_START", this._activeRoomId));
                    }
                    _loc9_ = 0;
                    _loc8_ = 0;
                }
                if (_loc9_ != 0 || _loc8_ != 0) {
                    param1.screenOffsetX += _loc9_;
                    param1.screenOffsetY += _loc8_;
                    if (!this._SafeStr_2716) {
                        this.events.dispatchEvent(new RoomEngineDragWithMouseEvent("REDWME_DRAG_START", this._activeRoomId));
                    }
                    this._SafeStr_2716 = true;
                }
            }
        } else if (param4 == "click" || param4 == "doubleClick") {
            this._SafeStr_3051 = false;
            if (this._SafeStr_2716) {
                this._SafeStr_2716 = false;
                return true;
            }
        }
        return false;
    }

    private normalizeScreenOffsetForScale(param1: number, param2: number, param3: number): number {
        if (param3 == 0 || param3 == 1) {
            return param1;
        }
        let _loc4_: number = param2 / param3;
        let _loc5_: number = _loc4_ / 2;
        return _loc5_ - (_loc5_ - param1) / param3;
    }

    private syncRoomCameraLocationToCanvasOffset(param1: number, param2: IRoomRenderingCanvas): void {
        if (!this.useOffsetScrolling || param2 == null || param2.isFlipped) {
            return;
        }
        let _loc3_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc3_ == null || _loc3_.roomCamera == null) {
            return;
        }
        _loc3_.roomCamera.resetLocation(new Vector3d(-this.normalizeScreenOffsetForScale(param2.screenOffsetX, param2.width, param2.scale), -this.normalizeScreenOffsetForScale(param2.screenOffsetY, param2.height, param2.scale)));
    }

    private getCanvasTransformScale(param1: IRoomRenderingCanvas): number {
        return param1.isFlipped ? -param1.scale : param1.scale;
    }

    public handleRoomCanvasMouseEvent(param1: number, param2: number, param3: number, param4: string, param5: boolean, param6: boolean, param7: boolean, param8: boolean): void {
        let _loc12_: number = NaN;
        let _loc10_: Sprite = null;
        let _loc11_: Sprite = null;
        let _loc15_: Rectangle = null;
        let _loc14_: string = null;
        let _loc13_: RoomObjectEvent = null;
        if (!this._SafeStr_3051) {
            if (this._mouseEventsDisabledAboveY > 0 && param3 < this._mouseEventsDisabledAboveY) {
                return;
            }
            if (this._mouseEventsDisabledLeftToX > 0 && param2 < this._mouseEventsDisabledLeftToX) {
                return;
            }
            if (this.isMouseEventDisabledByRect(param2, param3)) {
                return;
            }
        }
        let _loc9_: IRoomRenderingCanvas = this.getRoomCanvas(this._activeRoomId, param1);
        if (_loc9_ != null) {
            if (param4 == "click" && param6 && param5) {
                _loc12_ = Number(param7 ? _loc9_.scale >> 1 : (_loc9_.scale < 1 ? 1 : _loc9_.scale << 1));
                this.setRoomCanvasScale(this.activeRoomId, this._SafeStr_3235, _loc12_, new Point(param2, param3));
                return;
            }
            _loc10_ = this.getOverlaySprite(_loc9_);
            _loc11_ = this.getOverlayIconSprite(_loc10_, "object_icon_sprite");
            if (_loc11_ != null) {
                _loc15_ = _loc11_.getRect(_loc11_);
                _loc11_.x = param2 - _loc15_.width / 2;
                _loc11_.y = param3 - _loc15_.height / 2;
            }
            if (param4 == "click" && this._areaSelectionManager.finishSelecting()) {
                this._areaSelectionManager.finishSelecting();
            } else if (!this.handleRoomDragging(_loc9_, param2, param3, param4, param5, param6, param7)) {
                if (!_loc9_.handleMouseEvent(param2, param3, param4, param5, param6, param7, param8)) {
                    _loc14_ = "";
                    if (param4 == "click") {
                        if (this.events != null) {
                            this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_DESELECTED", this._activeRoomId, -1, -2));
                        }
                        _loc14_ = "ROE_MOUSE_CLICK";
                    } else if (param4 == "mouseMove") {
                        _loc14_ = "ROE_MOUSE_MOVE";
                    } else if (param4 == "mouseDown") {
                        _loc14_ = "ROE_MOUSE_DOWN";
                    }
                    if (this._eventHandler != null) {
                        _loc13_ = new RoomObjectMouseEvent(_loc14_, this.getRoomObject(this._activeRoomId, -1, 0), null, param5);
                        this._eventHandler.handleRoomObjectEvent(_loc13_, this._activeRoomId);
                    }
                }
            }
            this._SafeStr_3235 = param1;
            this._SafeStr_5277 = param2;
            this._SafeStr_4941 = param3;
        }
    }

    private getOverlaySprite(param1: IRoomRenderingCanvas): Sprite {
        if (param1 == null) {
            return null;
        }
        let _loc3_: Sprite = asInstanceOf(param1.displayObject, Sprite);
        if (_loc3_ == null) {
            return null;
        }
        return asInstanceOf(_loc3_.getChildByName("overlay"), Sprite);
    }

    private addOverlayIconSprite(param1: Sprite, param2: string, param3: BitmapData): Sprite {
        if (param1 == null || param3 == null) {
            return null;
        }
        let _loc5_: Sprite = this.getOverlayIconSprite(param1, param2);
        if (_loc5_ != null) {
            return null;
        }
        _loc5_ = new Sprite();
        _loc5_.name = param2;
        _loc5_.mouseEnabled = false;
        let _loc4_: Bitmap = new Bitmap(param3);
        _loc5_.addChild(_loc4_);
        param1.addChild(_loc5_);
        return _loc5_;
    }

    private removeOverlayIconSprite(param1: Sprite, param2: string): boolean {
        let _loc5_: number = 0;
        let _loc4_: Sprite = null;
        let _loc3_: Bitmap = null;
        if (param1 == null) {
            return false;
        }
        _loc5_ = param1.numChildren - 1;
        while (_loc5_ >= 0) {
            _loc4_ = asInstanceOf(param1.getChildAt(_loc5_), Sprite);
            if (_loc4_ != null) {
                if (_loc4_.name == param2) {
                    param1.removeChildAt(_loc5_);
                    _loc3_ = asInstanceOf(_loc4_.getChildAt(0), Bitmap);
                    if (_loc3_ != null && _loc3_.bitmapData != null) {
                        _loc3_.bitmapData.dispose();
                        _loc3_.bitmapData = null;
                    }
                    return true;
                }
            }
            _loc5_--;
        }
        return false;
    }

    private getOverlayIconSprite(param1: Sprite, param2: string): Sprite {
        let _loc4_: number = 0;
        let _loc3_: Sprite = null;
        if (param1 == null) {
            return null;
        }
        _loc4_ = param1.numChildren - 1;
        while (_loc4_ >= 0) {
            _loc3_ = asInstanceOf(param1.getChildAt(_loc4_), Sprite);
            if (_loc3_ != null) {
                if (_loc3_.name == param2) {
                    return _loc3_;
                }
            }
            _loc4_--;
        }
        return null;
    }

    public setObjectMoverIconSprite(param1: number, param2: number, param3: boolean, param4: string = null, param5: IStuffData = null, param6: number = -1, param7: number = -1, param8: string = null): void {
        let _loc13_: string = null;
        let _loc12_: number = 0;
        let _loc14_: PetFigureData = null;
        let _loc10_: Sprite = null;
        let _loc11_: Sprite = null;
        let _loc15_: ImageResult = null;
        if (param3) {
            _loc15_ = this.getRoomObjectImage(this._activeRoomId, param1, param2, new Vector3d(), 1, null);
        } else if (this._roomContentLoader != null) {
            _loc13_ = null;
            _loc12_ = 0;
            if (param2 == 10) {
                _loc13_ = this._roomContentLoader.getActiveObjectType(param1);
                _loc12_ = this._roomContentLoader.getActiveObjectColorIndex(param1);
            } else if (param2 == 20) {
                _loc13_ = this._roomContentLoader.getWallItemType(param1, param4);
                _loc12_ = this._roomContentLoader.getWallItemColorIndex(param1);
            }
            if (param2 == 100) {
                _loc13_ = RoomObjectUserTypes.getName(param1);
                if (_loc13_ == "pet") {
                    _loc13_ = this.getPetType(param4);
                    _loc14_ = new PetFigureData(param4);
                    _loc15_ = this.getPetImage(_loc14_.typeId, _loc14_.paletteId, _loc14_.color, new Vector3d(180), 64, null, true, 0, _loc14_.customParts, param8);
                } else {
                    _loc15_ = this.getGenericRoomObjectImage(_loc13_, param4, new Vector3d(180), 1, null, 0, null, param5, param6, param7, param8);
                }
            } else {
                _loc15_ = this.getGenericRoomObjectImage(_loc13_, String(_loc12_), new Vector3d(), 1, null, 0, param4, param5, param6, param7, param8);
            }
        }
        if (_loc15_ == null || _loc15_.data == null) {
            return;
        }
        let _loc9_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc9_ != null) {
            _loc10_ = this.getOverlaySprite(_loc9_);
            this.removeOverlayIconSprite(_loc10_, "object_icon_sprite");
            _loc11_ = this.addOverlayIconSprite(_loc10_, "object_icon_sprite", _loc15_.data);
            if (_loc11_ != null) {
                _loc11_.x = this._SafeStr_5277 - _loc15_.data.width / 2;
                _loc11_.y = this._SafeStr_4941 - _loc15_.data.height / 2;
            }
        }
    }

    private isMouseEventDisabledByRect(param1: number, param2: number): boolean {
        let _loc4_: number = 0;
        let _loc3_: Rectangle = null;
        if (this._SafeStr_14622 == null) {
            return false;
        }
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_14622.length) {
            _loc3_ = asInstanceOf(this._SafeStr_14622.getWithIndex(_loc4_), Rectangle);
            if (_loc3_ != null && Boolean(_loc3_.contains(param1, param2))) {
                return true;
            }
            _loc4_++;
        }
        return false;
    }

    public setObjectMoverIconSpriteVisible(param1: boolean): void {
        let _loc3_: Sprite = null;
        let _loc4_: Sprite = null;
        let _loc2_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc2_ != null) {
            _loc3_ = this.getOverlaySprite(_loc2_);
            _loc4_ = this.getOverlayIconSprite(_loc3_, "object_icon_sprite");
            if (_loc4_ != null) {
                _loc4_.visible = param1;
            }
        }
    }

    public getObjectMoverIconSpriteVisible(): boolean {
        let _loc2_: Sprite = null;
        let _loc3_: Sprite = null;
        let _loc1_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc1_ != null) {
            _loc2_ = this.getOverlaySprite(_loc1_);
            _loc3_ = this.getOverlayIconSprite(_loc2_, "object_icon_sprite");
            if (_loc3_ != null) {
                return _loc3_.visible;
            }
        }
        return false;
    }

    public removeObjectMoverIconSprite(): void {
        let _loc2_: Sprite = null;
        let _loc1_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc1_ != null) {
            _loc2_ = this.getOverlaySprite(_loc1_);
            this.removeOverlayIconSprite(_loc2_, "object_icon_sprite");
        }
    }

    public getRoomObjectCount(param1: number, param2: number): number {
        if (!this._isInitialized) {
            return 0;
        }
        let _loc3_: string = this.getRoomIdentifier(param1);
        let _loc4_: IRoomInstance = this._roomManager.getRoom(_loc3_);
        if (_loc4_ == null) {
            return 0;
        }
        return _loc4_.getObjectCount(param2);
    }

    public getRoomObject(param1: number, param2: number, param3: number): IRoomObject {
        if (!this._isInitialized) {
            return null;
        }
        let _loc4_: string = this.getRoomIdentifier(param1);
        if (param1 == 0) {
            _loc4_ = "temporary_room";
        }
        return this.getObject(_loc4_, param2, param3);
    }

    public getObjectsByCategory(param1: number): any[] {
        let _loc2_: IRoomInstance = null;
        if (this._roomManager != null) {
            _loc2_ = this._roomManager.getRoom(this.getRoomIdentifier(this._activeRoomId));
        }
        if (_loc2_ == null) {
            return [];
        }
        return _loc2_.getObjects(param1);
    }

    public getRoomObjectWithIndex(param1: number, param2: number, param3: number): IRoomObject {
        if (!this._isInitialized) {
            return null;
        }
        let _loc4_: string = this.getRoomIdentifier(param1);
        let _loc5_: IRoomInstance = this._roomManager.getRoom(_loc4_);
        if (_loc5_ == null) {
            return null;
        }
        return _loc5_.getObjectWithIndex(param2, param3);
    }

    public getRoomObjects(param1: number, param2: number): any[] {
        let _loc3_: string = null;
        let _loc4_: IRoomInstance = null;
        if (this._isInitialized) {
            _loc3_ = this.getRoomIdentifier(param1);
            _loc4_ = this._roomManager.getRoom(_loc3_);
            if (_loc4_ != null) {
                return _loc4_.getObjects(param2);
            }
        }
        return [];
    }

    public modifyRoomObject(param1: number, param2: number, param3: string): boolean {
        if (this._eventHandler != null) {
            return this._eventHandler.modifyRoomObject(this._activeRoomId, param1, param2, param3);
        }
        return false;
    }

    public rotateActiveObjectPreview(param1: boolean): boolean {
        if (this._eventHandler != null) {
            return this._eventHandler.rotateActiveObjectPreview(this._activeRoomId, param1);
        }
        return false;
    }

    public modifyRoomObjectDataWithMap(param1: number, param2: number, param3: string, param4: UtilsMap): boolean {
        if (this._eventHandler != null) {
            if (param2 == 10) {
                return this._eventHandler.modifyRoomObjectData(this._activeRoomId, param1, param2, param3, param4);
            }
        }
        return false;
    }

    public modifyRoomObjectData(param1: number, param2: number, param3: string, param4: string): boolean {
        if (this._eventHandler != null) {
            if (param2 == 20) {
                return this._eventHandler.modifyWallItemData(this._activeRoomId, param1, param3, param4);
            }
        }
        return false;
    }

    public deleteRoomObject(param1: number, param2: number): boolean {
        if (this._eventHandler != null) {
            if (param2 == 20) {
                return this._eventHandler.deleteWallItem(this._activeRoomId, param1);
            }
        }
        return false;
    }

    public initializeRoomObjectInsert(param1: string, param2: number, param3: number, param4: number, param5: string = null, param6: IStuffData = null, param7: number = -1, param8: number = -1, param9: string = null, param10: boolean = false): boolean {
        let _loc11_: IRoomInstance = this.getRoom(this._activeRoomId);
        if (_loc11_ == null || _loc11_.getNumber("room_is_public") != 0) {
            return false;
        }
        if (this._eventHandler != null) {
            return this._eventHandler.initializeRoomObjectInsert(param1, this._activeRoomId, param2, param3, param4, param5, param6, param7, param8, param9, param10);
        }
        return false;
    }

    public cancelRoomObjectInsert(): void {
        if (this._eventHandler != null) {
            this._eventHandler.cancelRoomObjectInsert(this._activeRoomId);
        }
    }

    public useRoomObjectInActiveRoom(param1: number, param2: number): boolean {
        let _loc3_: IRoomObjectEventHandler = null;
        let _loc4_: IRoomObject = this.getRoomObject(this._activeRoomId, param1, param2);
        if (_loc4_ != null) {
            _loc3_ = asGuarded(_loc4_.getMouseHandler(), isIRoomObjectEventHandler);
            if (_loc3_ != null) {
                _loc3_.useObject();
                return true;
            }
        }
        return false;
    }

    private getRoomObjectAdURL(param1: string): string {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getRoomObjectAdURL(param1);
        }
        return "";
    }

    public setRoomObjectAlias(param1: string, param2: string): void {
        if (this._roomContentLoader != null) {
            this._roomContentLoader.setRoomObjectAlias(param1, param2);
        }
    }

    public updateVariableFxConfigs(param1: number, param2: any[]): void {
        this._roomManager.updateVariableFxConfigs(this.getRoomIdentifier(param1), param2);
    }

    public removeVariableFxConfigs(param1: number, param2: any[]): void {
        this._roomManager.removeVariableFxConfigs(this.getRoomIdentifier(param1), param2);
    }

    public updateVariableFxStatuses(param1: number, param2: any[]): void {
        let _loc3_: any = null;
        for (_loc3_ of param2 ?? []) {
            this.updateVariableFxStatus(param1, _loc3_);
        }
    }

    public removeVariableFxStatuses(param1: number, param2: any[]): void {
        let _loc3_: any = null;
        for (_loc3_ of param2 ?? []) {
            this.removeVariableFxStatus(param1, _loc3_);
        }
    }

    public updateWiredFurniTransparency(param1: number, param2: number[], param3: number, param4: boolean, param5: number): void {
        for (const _loc6_ of param2 ?? []) {
            this.applyOrBufferWiredFurniTransparency(param1, _loc6_, new WiredFurnitureTransparencyData(param3, param4, param5), false);
        }
    }

    public updateWiredFurniHighlight(param1: number, param2: number[], param3: number, param4: number, param5: number, param6: number, param7: number): void {
        for (const _loc8_ of param2 ?? []) {
            this.applyOrBufferWiredFurniHighlight(param1, _loc8_, new WiredFurnitureHighlightData(param3, param4, param5, param6, param7), false);
        }
    }

    public initializeWiredFurniVisualizationStates(param1: number, param2: FurniTransparencyData[], param3: FurniHighlightData[]): void {
        for (const _loc5_ of param2 ?? []) {
            this.applyOrBufferWiredFurniTransparency(param1, _loc5_.furniId, new WiredFurnitureTransparencyData(_loc5_.transparency, _loc5_.allowClickThrough, _loc5_.easingMode), true);
        }
        for (const _loc4_ of param3 ?? []) {
            this.applyOrBufferWiredFurniHighlight(param1, _loc4_.furniId, new WiredFurnitureHighlightData(_loc4_.highlightType, _loc4_.strength, _loc4_.color, _loc4_.animationMode, _loc4_.easingMode), true);
        }
    }

    private applyOrBufferWiredFurniTransparency(param1: number, param2: number, param3: WiredFurnitureTransparencyData, param4: boolean): void {
        let _loc5_: number = RoomEngine.getWiredFurniCategory(param2);
        let _loc6_: number = RoomEngine.getWiredFurniObjectId(param2);
        let _loc7_: IRoomObjectController = this.getReadyRoomObject(param1, _loc6_, _loc5_);
        if (_loc7_ == null) {
            this._SafeStr_14621.setData(param1, _loc6_, _loc5_, "wired_transparency", param3);
            return;
        }
        this._SafeStr_14621.removeData(param1, _loc6_, _loc5_, "wired_transparency");
        this.applyWiredFurniTransparency(_loc7_, param3, param4);
    }

    private applyWiredFurniTransparency(param1: IRoomObjectController, param2: WiredFurnitureTransparencyData, param3: boolean): void {
        param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureTransparencyUpdateMessage(param2.transparency, param2.allowClickThrough, param2.easingMode, param3));
    }

    private applyOrBufferWiredFurniHighlight(param1: number, param2: number, param3: WiredFurnitureHighlightData, param4: boolean): void {
        let _loc5_: number = RoomEngine.getWiredFurniCategory(param2);
        let _loc6_: number = RoomEngine.getWiredFurniObjectId(param2);
        let _loc7_: IRoomObjectController = this.getReadyRoomObject(param1, _loc6_, _loc5_);
        if (_loc7_ == null) {
            this._SafeStr_14621.setData(param1, _loc6_, _loc5_, "wired_highlight", param3);
            return;
        }
        this._SafeStr_14621.removeData(param1, _loc6_, _loc5_, "wired_highlight");
        this.applyWiredFurniHighlight(_loc7_, param3, param4);
    }

    private applyWiredFurniHighlight(param1: IRoomObjectController, param2: WiredFurnitureHighlightData, param3: boolean): void {
        param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureHighlightUpdateMessage(param2.highlightType, param2.strength, param2.color, param2.animationMode, param2.easingMode, param3));
    }

    public updateWiredUserTransparency(param1: number, param2: number[], param3: number, param4: boolean, param5: number): void {
        for (const _loc6_ of param2 ?? []) {
            this.applyOrBufferWiredUserTransparency(param1, _loc6_, new WiredFurnitureTransparencyData(param3, param4, param5), false);
        }
    }

    public updateWiredUserHighlight(param1: number, param2: number[], param3: number, param4: number, param5: number, param6: number, param7: number): void {
        for (const _loc8_ of param2 ?? []) {
            this.applyOrBufferWiredUserHighlight(param1, _loc8_, new WiredFurnitureHighlightData(param3, param4, param5, param6, param7), false);
        }
    }

    public initializeWiredUserVisualizationStates(param1: number, param2: UserTransparencyData[], param3: UserHighlightData[]): void {
        for (const _loc5_ of param2 ?? []) {
            this.applyOrBufferWiredUserTransparency(param1, _loc5_.roomIndex, new WiredFurnitureTransparencyData(_loc5_.transparency, _loc5_.allowClickThrough, _loc5_.easingMode), true);
        }
        for (const _loc4_ of param3 ?? []) {
            this.applyOrBufferWiredUserHighlight(param1, _loc4_.roomIndex, new WiredFurnitureHighlightData(_loc4_.highlightType, _loc4_.strength, _loc4_.color, _loc4_.animationMode, _loc4_.easingMode), true);
        }
    }

    private applyOrBufferWiredUserTransparency(param1: number, param2: number, param3: WiredFurnitureTransparencyData, param4: boolean): void {
        let _loc5_: number = 100;
        let _loc6_: number = param2;
        let _loc7_: IRoomObjectController = this.getReadyRoomObject(param1, _loc6_, _loc5_);
        if (_loc7_ == null) {
            this._SafeStr_14621.setData(param1, _loc6_, _loc5_, "wired_transparency", param3);
            return;
        }
        this._SafeStr_14621.removeData(param1, _loc6_, _loc5_, "wired_transparency");
        this.applyWiredFurniTransparency(_loc7_, param3, param4);
    }

    private applyOrBufferWiredUserHighlight(param1: number, param2: number, param3: WiredFurnitureHighlightData, param4: boolean): void {
        let _loc5_: number = 100;
        let _loc6_: number = param2;
        let _loc7_: IRoomObjectController = this.getReadyRoomObject(param1, _loc6_, _loc5_);
        if (_loc7_ == null) {
            this._SafeStr_14621.setData(param1, _loc6_, _loc5_, "wired_highlight", param3);
            return;
        }
        this._SafeStr_14621.removeData(param1, _loc6_, _loc5_, "wired_highlight");
        this.applyWiredFurniHighlight(_loc7_, param3, param4);
    }

    public replaceFurnitureLabelsAndRegions(param1: number, param2: FurnitureLabelData[]): void {
        let _loc6_: IRoomObjectController = null;
        let _loc5_: number = 0;
        this._SafeStr_14621.clearDataType(param1, "furniture_label");
        this._SafeStr_14621.clearDataType(param1, "furniture_region");
        for (const _loc4_ of this.getRoomObjects(param1, 10) ?? []) {
            _loc6_ = isIRoomObjectController(_loc4_) ? _loc4_ : null;
            _loc5_ = _loc4_.getId() | 0;
            if (RoomEngine.isReadyRoomObject(_loc6_) && this.applyFurnitureLabelOrRegion(_loc6_, null) == 2) {
                this.dispatchFurnitureLabelUpdated(param1, _loc5_);
            }
        }
        for (const _loc3_ of param2 ?? []) {
            if (this.applyOrBufferFurnitureLabelOrRegion(param1, _loc3_) == 2) {
                this.dispatchFurnitureLabelUpdated(param1, _loc3_.furnitureId);
            }
        }
    }

    public updateFurnitureLabelsAndRegions(param1: number, param2: FurnitureLabelData[], param3: number[]): void {
        let _loc4_: any = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: IRoomObjectController = null;
        for (_loc4_ of param2 ?? []) {
            _loc5_ = this.applyOrBufferFurnitureLabelOrRegion(param1, _loc4_);
            if (_loc5_ != 0) {
                this.dispatchFurnitureLabelUpdated(param1, _loc4_.furnitureId);
            }
        }
        for (_loc6_ of param3 ?? []) {
            this._SafeStr_14621.removeData(param1, _loc6_, 10, "furniture_label");
            this._SafeStr_14621.removeData(param1, _loc6_, 10, "furniture_region");
            _loc7_ = this.getReadyRoomObject(param1, _loc6_, 10);
            if (_loc7_ != null && this.applyFurnitureLabelOrRegion(_loc7_, null) == 2) {
                this.dispatchFurnitureLabelUpdated(param1, _loc6_);
            }
        }
    }

    private applyOrBufferFurnitureLabelOrRegion(param1: number, param2: FurnitureLabelData): number {
        let _loc3_: string = param2 instanceof FurnitureRegionData ? "furniture_region" : "furniture_label";
        let _loc4_: string = param2 instanceof FurnitureRegionData ? "furniture_label" : "furniture_region";
        this._SafeStr_14621.removeData(param1, param2.furnitureId, 10, _loc4_);
        let _loc5_: IRoomObjectController = this.getReadyRoomObject(param1, param2.furnitureId, 10);
        if (_loc5_ == null) {
            this._SafeStr_14621.setData(param1, param2.furnitureId, 10, _loc3_, param2);
            return 0;
        }
        this._SafeStr_14621.removeData(param1, param2.furnitureId, 10, _loc3_);
        return this.applyFurnitureLabelOrRegion(_loc5_, param2);
    }

    private applyFurnitureLabelOrRegion(param1: IRoomObjectController, param2: FurnitureLabelData): number {
        let _loc7_: FurnitureRegionData = null;
        let _loc4_: string = this._roomContentLoader.getLogicType(param1.getType());
        let _loc6_: IRoomObjectModel = param1.getModel();
        let _loc3_: FurnitureLabelData = asInstanceOf(_loc6_.getObject("furniture_label_data"), FurnitureLabelData);
        let _loc5_: FurnitureRegionData = asInstanceOf(_loc6_.getObject("furniture_region_data"), FurnitureRegionData);
        if (param2 instanceof FurnitureRegionData) {
            if (_loc4_ != "furniture_region") {
                if (_loc4_ == "furniture_label" && _loc3_ != null) {
                    param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureLabelUpdateMessage(null));
                    return 2;
                }
                return 0;
            }
            if (_loc5_ == null || !_loc5_.equals(param2)) {
                _loc7_ = castTo(param2, FurnitureRegionData);
                param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureRegionUpdateMessage(_loc7_.title, _loc7_.description, _loc7_.xOffset, _loc7_.yOffset, _loc7_.minWidth, _loc7_.minHeight, _loc7_.color, _loc7_.areas));
            }
        } else {
            if (param2 != null) {
                if (_loc4_ != "furniture_label") {
                    if (_loc4_ == "furniture_region" && _loc5_ != null) {
                        param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureRegionUpdateMessage(null));
                    }
                    return 1;
                }
                if (_loc3_ == null || !_loc3_.equals(param2)) {
                    param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureLabelUpdateMessage(param2.text, param2.bubbleColor, param2.visibility, param2.alwaysOpen));
                    return 2;
                }
                return 1;
            }
            if (_loc4_ == "furniture_label") {
                if (_loc3_ != null) {
                    param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureLabelUpdateMessage(null));
                    return 2;
                }
            } else if (_loc4_ == "furniture_region") {
                if (_loc5_ != null) {
                    param1.getEventHandler().processUpdateMessage(new RoomObjectFurnitureRegionUpdateMessage(null));
                }
            }
        }
        return 0;
    }

    private dispatchFurnitureLabelUpdated(param1: number, param2: number): void {
        if (this.events != null) {
            this.events.dispatchEvent(new RoomEngineFurnitureLabelEvent("REFLE_FURNITURE_LABEL_UPDATED", param1, param2));
        }
    }

    private updateVariableFxStatus(param1: number, param2: VariableFxStatusUpdateData): void {
        let _loc3_: number = param2.isUserEntity ? 100 : 10;
        let _loc4_: IRoomObjectController = this.getReadyRoomObject(param1, param2.entityId, _loc3_);
        if (_loc4_ == null) {
            this.bufferVariableFxStatus(param1, param2.entityId, _loc3_, param2);
            return;
        }
        this.removeBufferedVariableFxStatus(param1, param2.entityId, _loc3_, param2.statusKey);
        RoomEngine.applyVariableFxStatus(_loc4_, param2, param2.isInitialize);
    }

    private removeVariableFxStatus(param1: number, param2: VariableFxStatusRemoveData): void {
        let _loc4_: number = param2.isUserEntity ? 100 : 10;
        let _loc3_: string = param2.configId + "|" + param2.variableId;
        this.removeBufferedVariableFxStatus(param1, param2.entityId, _loc4_, _loc3_);
        let _loc5_: IRoomObjectController = this.getReadyRoomObject(param1, param2.entityId, _loc4_);
        if (_loc5_ == null) {
            return;
        }
        _loc5_.getEventHandler().processUpdateMessage(new RoomObjectVariableFxStatusRemoveMessage(param2.configId, param2.variableId));
    }

    private bufferVariableFxStatus(param1: number, param2: number, param3: number, param4: VariableFxStatusUpdateData): void {
        let _loc5_: UtilsMap = asInstanceOf(this._SafeStr_14621.getData(param1, param2, param3, "variable_fx_status"), UtilsMap);
        if (_loc5_ == null) {
            _loc5_ = new UtilsMap();
            this._SafeStr_14621.setData(param1, param2, param3, "variable_fx_status", _loc5_);
        }
        if (_loc5_.hasKey(param4.statusKey)) {
            _loc5_.replace(param4.statusKey, param4.clone());
        } else {
            _loc5_.add(param4.statusKey, param4.clone());
        }
    }

    private removeBufferedVariableFxStatus(param1: number, param2: number, param3: number, param4: string): void {
        let _loc5_: UtilsMap = asInstanceOf(this._SafeStr_14621.getData(param1, param2, param3, "variable_fx_status"), UtilsMap);
        if (_loc5_ == null) {
            return;
        }
        _loc5_.remove(param4);
        if (_loc5_.length == 0) {
            this._SafeStr_14621.removeData(param1, param2, param3, "variable_fx_status");
            _loc5_.dispose();
        }
    }

    private captureFurnitureLabelData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.category != 10) {
            return;
        }
        let _loc2_: FurnitureLabelData = asInstanceOf(param1.roomObject.getModel().getObject("furniture_label_data"), FurnitureLabelData);
        this.setCapturedRoomObjectModelData(param1, "furniture_label", _loc2_);
    }

    private captureFurnitureRegionData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.category != 10) {
            return;
        }
        let _loc2_: FurnitureRegionData = asInstanceOf(param1.roomObject.getModel().getObject("furniture_region_data"), FurnitureRegionData);
        this.setCapturedRoomObjectModelData(param1, "furniture_region", _loc2_);
    }

    private captureWiredFurnitureTransparencyData(param1: BufferedRoomObjectModelDataEvent): void {
        if (!RoomEngine.isFurnitureCategory(param1.category) && param1.category != 100) {
            return;
        }
        let _loc2_: WiredFurnitureTransparencyData = asInstanceOf(param1.roomObject.getModel().getObject("furniture_wired_transparency_data"), WiredFurnitureTransparencyData);
        this.setCapturedRoomObjectModelData(param1, "wired_transparency", _loc2_);
    }

    private captureWiredFurnitureHighlightData(param1: BufferedRoomObjectModelDataEvent): void {
        if (!RoomEngine.isFurnitureCategory(param1.category) && param1.category != 100) {
            return;
        }
        let _loc2_: WiredFurnitureHighlightData = asInstanceOf(param1.roomObject.getModel().getObject("furniture_wired_highlight_data"), WiredFurnitureHighlightData);
        this.setCapturedRoomObjectModelData(param1, "wired_highlight", _loc2_);
    }

    private captureVariableFxStatusData(param1: BufferedRoomObjectModelDataEvent): void {
        let _loc3_: number = 0;
        let _loc5_: UtilsMap = null;
        let _loc8_: number = 0;
        let _loc2_: VariableFxStatusModelEntry = null;
        let _loc6_: string = null;
        if (param1.category != 10 && param1.category != 100) {
            return;
        }
        let _loc4_: VariableFxStatusModelData = asInstanceOf(param1.roomObject.getModel().getObject("variable_fx_statuses"), VariableFxStatusModelData);
        if (_loc4_ == null || _loc4_.statusesByConfig == null) {
            this.setCapturedRoomObjectModelData(param1, "variable_fx_status", null);
            return;
        }
        let _loc7_: UtilsMap = new UtilsMap();
        _loc3_ = 0;
        while (_loc3_ < _loc4_.statusesByConfig.length) {
            _loc5_ = asInstanceOf(_loc4_.statusesByConfig.getWithIndex(_loc3_), UtilsMap);
            _loc8_ = 0;
            while (_loc8_ < _loc5_.length) {
                _loc2_ = asInstanceOf(_loc5_.getWithIndex(_loc8_), VariableFxStatusModelEntry);
                _loc6_ = _loc2_.configId + "|" + _loc2_.variableId;
                _loc7_.add(_loc6_, new VariableFxStatusUpdateData(_loc6_, true, param1.category == 100, param1.objectId, _loc2_.value, _loc2_.overrideMinValue, _loc2_.overrideMaxValue, _loc2_.extra.clone()));
                _loc8_++;
            }
            _loc3_++;
        }
        if (_loc7_.length == 0) {
            _loc7_.dispose();
            this.setCapturedRoomObjectModelData(param1, "variable_fx_status", null);
        } else {
            this.setCapturedRoomObjectModelData(param1, "variable_fx_status", _loc7_);
        }
    }

    private setCapturedRoomObjectModelData(param1: BufferedRoomObjectModelDataEvent, param2: string, param3: any): void {
        if (param3 == null) {
            this._SafeStr_14621.removeData(param1.roomId, param1.objectId, param1.category, param2);
        } else {
            this._SafeStr_14621.setData(param1.roomId, param1.objectId, param1.category, param2, param3);
        }
    }

    private restoreFurnitureLabelData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.dataType != "furniture_label" || param1.category != 10) {
            return;
        }
        let _loc2_: FurnitureLabelData = asInstanceOf(param1.data, FurnitureLabelData);
        if (_loc2_ == null) {
            return;
        }
        if (this.applyFurnitureLabelOrRegion(param1.roomObject, _loc2_) == 2) {
            this.dispatchFurnitureLabelUpdated(param1.roomId, param1.objectId);
        }
        param1.markRestored();
    }

    private restoreFurnitureRegionData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.dataType != "furniture_region" || param1.category != 10) {
            return;
        }
        let _loc2_: FurnitureRegionData = asInstanceOf(param1.data, FurnitureRegionData);
        if (_loc2_ == null) {
            return;
        }
        if (this.applyFurnitureLabelOrRegion(param1.roomObject, _loc2_) == 2) {
            this.dispatchFurnitureLabelUpdated(param1.roomId, param1.objectId);
        }
        param1.markRestored();
    }

    private restoreWiredFurnitureTransparencyData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.dataType != "wired_transparency" || !RoomEngine.isFurnitureCategory(param1.category) && param1.category != 100) {
            return;
        }
        let _loc2_: WiredFurnitureTransparencyData = asInstanceOf(param1.data, WiredFurnitureTransparencyData);
        if (_loc2_ == null) {
            return;
        }
        this.applyWiredFurniTransparency(param1.roomObject, _loc2_, true);
        param1.markRestored();
    }

    private restoreWiredFurnitureHighlightData(param1: BufferedRoomObjectModelDataEvent): void {
        if (param1.dataType != "wired_highlight" || !RoomEngine.isFurnitureCategory(param1.category) && param1.category != 100) {
            return;
        }
        let _loc2_: WiredFurnitureHighlightData = asInstanceOf(param1.data, WiredFurnitureHighlightData);
        if (_loc2_ == null) {
            return;
        }
        this.applyWiredFurniHighlight(param1.roomObject, _loc2_, true);
        param1.markRestored();
    }

    private restoreVariableFxStatusData(param1: BufferedRoomObjectModelDataEvent): void {
        let _loc3_: number = 0;
        let _loc4_: VariableFxStatusUpdateData = null;
        if (param1.dataType != "variable_fx_status" || param1.category != 10 && param1.category != 100) {
            return;
        }
        let _loc2_: UtilsMap = asInstanceOf(param1.data, UtilsMap);
        if (_loc2_ == null) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < _loc2_.length) {
            _loc4_ = asInstanceOf(_loc2_.getWithIndex(_loc3_), VariableFxStatusUpdateData);
            RoomEngine.applyVariableFxStatus(param1.roomObject, _loc4_, true);
            _loc3_++;
        }
        param1.markRestored();
    }

    private getReadyRoomObject(param1: number, param2: number, param3: number): IRoomObjectController {
        let _loc4_: IRoomObjectController = this.getExistingRoomObject(param1, param2, param3);
        return RoomEngine.isReadyRoomObject(_loc4_) ? _loc4_ : null;
    }

    private getExistingRoomObject(param1: number, param2: number, param3: number): IRoomObjectController {
        let _loc4_: IRoomInstance = this.getRoom(param1);
        return _loc4_ == null ? null : asGuarded(_loc4_.getObject(param2, param3), isIRoomObjectController);
    }

    private restoreBufferedRoomObjectModelData(param1: number, param2: number, param3: number, param4: IRoomObjectController): void {
        if (RoomEngine.isReadyRoomObject(param4)) {
            this._SafeStr_14621.restoreObject(param1, param2, param3, param4);
        }
    }

    public getRoomObjectCategory(param1: string): number {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getObjectCategory(param1);
        }
        return -2;
    }

    public getFurnitureType(param1: number): string {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getActiveObjectType(param1);
        }
        return "";
    }

    public getFurnitureTypeId(param1: string): number {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getActiveObjectTypeId(param1);
        }
        return 0;
    }

    public getWallItemType(param1: number, param2: string = null): string {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getWallItemType(param1, param2);
        }
        return "";
    }

    public getPetTypeId(param1: string): number {
        let _loc2_: any[] = null;
        let _loc3_: number = -1;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length > 1) {
                _loc3_ = parseInt(stringOrNull(_loc2_[0])) | 0;
            }
        }
        return _loc3_;
    }

    private getPetType(param1: string): string {
        let _loc2_: any[] = null;
        let _loc3_: number = 0;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length > 1) {
                _loc3_ = parseInt(stringOrNull(_loc2_[0])) | 0;
                if (this._roomContentLoader != null) {
                    return this._roomContentLoader.getPetType(_loc3_);
                }
                return "pet";
            }
        }
        return null;
    }

    public getPetColor(param1: number, param2: number): PetColorResult {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getPetColor(param1, param2);
        }
        return null;
    }

    public getPetColorsByTag(param1: number, param2: string): any[] {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getPetColorsByTag(param1, param2);
        }
        return null;
    }

    public getPetLayerIdForTag(param1: number, param2: string): number {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getPetLayerIdForTag(param1, param2);
        }
        return -1;
    }

    public getPetDefaultPalette(param1: number, param2: string): PetColorResult {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getPetDefaultPalette(param1, param2);
        }
        return null;
    }

    private getFurnitureColorIndex(param1: number): number {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getActiveObjectColorIndex(param1);
        }
        return 0;
    }

    private getWallItemColorIndex(param1: number): number {
        if (this._roomContentLoader != null) {
            return this._roomContentLoader.getWallItemColorIndex(param1);
        }
        return 0;
    }

    public getSelectionArrow(param1: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), -3, 200);
    }

    public getTileCursor(param1: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), -2, 200);
    }

    public setTileCursorState(param1: number, param2: number): void {
        let _loc4_: RoomObjectDataUpdateMessage = null;
        let _loc3_: IRoomObjectController = this.getTileCursor(param1);
        if (_loc3_ != null && _loc3_.getEventHandler() != null) {
            _loc4_ = new RoomObjectDataUpdateMessage(param2, null);
            _loc3_.getEventHandler().processUpdateMessage(_loc4_);
        }
    }

    public toggleTileCursorVisibility(param1: number, param2: boolean): void {
        let _loc4_: RoomObjectTileCursorUpdateMessage = null;
        let _loc3_: IRoomObjectController = this.getTileCursor(param1);
        if (_loc3_ != null && _loc3_.getEventHandler() != null) {
            _loc4_ = new RoomObjectTileCursorUpdateMessage(null, 0, param2, "", true);
            _loc3_.getEventHandler().processUpdateMessage(_loc4_);
        }
    }

    public addObjectFurniture(param1: number, param2: number, param3: number, param4: IVector3d, param5: IVector3d, param6: number, param7: IStuffData, param8: number = NaN, param9: number = -1, param10: number = 0, param11: number = 0, param12: string = "", param13: boolean = true, param14: boolean = true, param15: number = -1): boolean {
        let _loc17_: FurnitureData = null;
        let _loc16_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc16_ != null) {
            _loc17_ = new FurnitureData(param2, param3, null, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15);
            _loc16_.addFurnitureData(_loc17_);
        }
        return true;
    }

    public addObjectFurnitureByName(param1: number, param2: number, param3: string, param4: IVector3d, param5: IVector3d, param6: number, param7: IStuffData, param8: number = NaN): boolean {
        let _loc10_: FurnitureData = null;
        let _loc9_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc9_ != null) {
            _loc10_ = new FurnitureData(param2, 0, param3, param4, param5, param6, param7, param8, 0);
            _loc9_.addFurnitureData(_loc10_);
        }
        return true;
    }

    private addObjectFurnitureFromData(param1: number, param2: number, param3: FurnitureData): boolean {
        let _loc4_: RoomInstanceData = null;
        if (param3 == null) {
            _loc4_ = this.getRoomInstanceData(param1);
            if (_loc4_ != null) {
                param3 = _loc4_.getFurnitureDataWithId(param2);
            }
        }
        if (param3 == null) {
            return false;
        }
        let _loc6_: boolean = false;
        let _loc9_: string = param3.type;
        if (_loc9_ == null) {
            _loc9_ = this.getFurnitureType(param3.typeId);
            _loc6_ = true;
        }
        let _loc7_: number = this.getFurnitureColorIndex(param3.typeId);
        let _loc8_: string = this.getRoomObjectAdURL(_loc9_);
        if (_loc9_ == null) {
            _loc9_ = "";
        }
        let _loc10_: IRoomObjectController = this.createObjectFurniture(param1, param2, _loc9_);
        if (_loc10_ == null) {
            return false;
        }
        if (_loc10_ != null && _loc10_.getModelController() != null && _loc6_) {
            _loc10_.getModelController().setNumber("furniture_color", _loc7_, true);
            _loc10_.getModelController().setNumber("furniture_type_id", param3.typeId, true);
            _loc10_.getModelController().setString("furniture_ad_url", _loc8_, true);
            _loc10_.getModelController().setNumber("furniture_real_room_object", param3.realRoomObject ? 1 : 0, false);
            _loc10_.getModelController().setNumber("furniture_expiry_time", param3.expiryTime);
            _loc10_.getModelController().setNumber("furniture_expirty_timestamp", getTimer());
            _loc10_.getModelController().setNumber("furniture_usage_policy", param3.usagePolicy);
            _loc10_.getModelController().setNumber("furniture_owner_id", param3.ownerId);
            _loc10_.getModelController().setString("furniture_owner_name", param3.ownerName);
            _loc10_.getModelController().setNumber("furniture_extra", param3.extra);
        }
        if (!this.updateObjectFurniture(param1, param2, param3.loc, param3.dir, param3.state, param3.data, param3.extra)) {
            return false;
        }
        if (param3.sizeZ >= 0) {
            if (!this.updateObjectFurnitureHeight(param1, param2, param3.sizeZ)) {
                return false;
            }
        }
        this.restoreBufferedRoomObjectModelData(param1, param2, 10, _loc10_);
        if (this.events != null) {
            this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_ADDED", param1, param2, 10));
        }
        let _loc5_: ISelectedRoomObjectData = this.getPlacedObjectData(param1);
        if (_loc5_ && Math.abs(_loc5_.id) == param2 && _loc5_.category == 10) {
            this.selectRoomObject(param1, param2, 10);
        }
        if (_loc10_.isInitialized() && param3.synchronized) {
            this.addObjectToTileMap(param1, _loc10_);
        }
        return true;
    }

    public changeObjectState(param1: number, param2: number, param3: number): void {
        let _loc6_: number = NaN;
        let _loc5_: number = 0;
        let _loc4_: IStuffData = null;
        let _loc7_: RoomObjectDataUpdateMessage = null;
        let _loc8_: IRoomObjectController = this.getObject(this.getRoomIdentifier(param1), param2, param3);
        if (_loc8_ != null && _loc8_.getModelController() != null) {
            _loc6_ = Number(_loc8_.getModelController().getNumber("furniture_automatic_state_index"));
            if (isNaN(_loc6_)) {
                _loc6_ = 1;
            } else {
                _loc6_ += 1;
            }
            _loc8_.getModelController().setNumber("furniture_automatic_state_index", _loc6_);
            _loc5_ = _loc8_.getModel().getNumber("furniture_data_format") | 0;
            _loc4_ = StuffDataFactory.getStuffDataWrapperForType(_loc5_);
            _loc4_.initializeFromRoomObjectModel(_loc8_.getModel());
            _loc7_ = new RoomObjectDataUpdateMessage(_loc6_ | 0, _loc4_);
            if (_loc8_.getEventHandler() != null) {
                _loc8_.getEventHandler().processUpdateMessage(_loc7_);
            }
        }
    }

    public changeObjectModelData(param1: number, param2: number, param3: number, param4: string, param5: number): boolean {
        let _loc6_: RoomObjectModelDataUpdateMessage = null;
        let _loc7_: IRoomObjectController = this.getObject(this.getRoomIdentifier(param1), param2, param3);
        if (_loc7_ == null) {
            return false;
        }
        if (_loc7_ != null && _loc7_.getEventHandler() != null) {
            _loc6_ = new RoomObjectModelDataUpdateMessage(param4, param5);
            _loc7_.getEventHandler().processUpdateMessage(_loc6_);
        }
        return true;
    }

    public updateObjectFurniture(param1: number, param2: number, param3: IVector3d, param4: IVector3d, param5: number, param6: IStuffData, param7: number = NaN): boolean {
        let _loc10_: IRoomObjectController = this.getObjectFurniture(param1, param2);
        if (_loc10_ == null) {
            return false;
        }
        let _loc8_: RoomObjectUpdateMessage = new RoomObjectUpdateMessage(param3, param4);
        let _loc9_: RoomObjectDataUpdateMessage = new RoomObjectDataUpdateMessage(param5, param6, param7);
        if (_loc10_ != null && _loc10_.getEventHandler() != null) {
            _loc10_.getEventHandler().processUpdateMessage(_loc8_);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
            this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_UPDATED", param1, param2, 10));
        }
        return true;
    }

    public updateFurnitureColor(param1: number, param2: number[], param3: number, param4: number, param5: number): void {
        let _loc10_: IRoomObjectController = null;
        let _loc8_: IRoomObjectModel = null;
        let _loc7_: UtilsMap = null;
        let _loc6_: MapStuffData = null;
        for (const _loc9_ of param2 ?? []) {
            _loc10_ = this.getObjectFurniture(param1, _loc9_);
            if (_loc10_ != null) {
                _loc8_ = _loc10_.getModel();
                _loc7_ = _loc8_.getStringToStringMap("furniture_data");
                _loc7_["r"] = String(param3);
                _loc7_["g"] = String(param4);
                _loc7_["b"] = String(param5);
                _loc6_ = new MapStuffData(_loc7_);
                _loc6_.uniqueSerialNumber = _loc8_.getNumber("furniture_unique_serial_number") | 0;
                _loc6_.uniqueSeriesSize = _loc8_.getNumber("furniture_unique_edition_size") | 0;
                this.updateObjectFurniture(param1, _loc9_, null, null, _loc10_.getState(0), _loc6_);
            }
        }
    }

    public updateObjectFurnitureHeight(param1: number, param2: number, param3: number): boolean {
        let _loc4_: RoomObjectHeightUpdateMessage = null;
        let _loc5_: IRoomObjectController = this.getObjectFurniture(param1, param2);
        if (_loc5_ == null) {
            return false;
        }
        if (_loc5_ != null && _loc5_.getEventHandler() != null) {
            _loc4_ = new RoomObjectHeightUpdateMessage(null, null, param3);
            _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        }
        return true;
    }

    public updateObjectFurnitureLocation(param1: number, param2: number, param3: IVector3d, param4: IVector3d, param5: IVector3d, param6: number = NaN, param7: number = NaN, param8: number = NaN): boolean {
        let _loc9_: RoomObjectMoveUpdateMessage = null;
        let _loc10_: IRoomObjectController = this.getObjectFurniture(param1, param2);
        if (_loc10_ == null) {
            return false;
        }
        if (_loc10_ != null && _loc10_.getEventHandler() != null) {
            _loc9_ = new RoomObjectMoveUpdateMessage(param3, param5, param4, param6, param5 != null, false, param7, param8);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
        }
        return true;
    }

    public updateObjectFurnitureExpiryTime(param1: number, param2: number, param3: number): boolean {
        let _loc4_: IRoomObjectController = this.getObjectFurniture(param1, param2);
        if (_loc4_ == null) {
            return false;
        }
        _loc4_.getModelController().setNumber("furniture_expiry_time", param3);
        _loc4_.getModelController().setNumber("furniture_expirty_timestamp", getTimer());
        return true;
    }

    private createObjectFurniture(param1: number, param2: number, param3: string): IRoomObjectController {
        let _loc4_: number = 10;
        let _loc5_: IRoomObjectController = this.createObject(this.getRoomIdentifier(param1), param2, param3, _loc4_);
        this.applyInvisibleFurniState(param1, _loc5_);
        return _loc5_;
    }

    private getObjectFurniture(param1: number, param2: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), param2, 10);
    }

    public disposeObjectFurniture(param1: number, param2: number, param3: number = -1, param4: boolean = false, param5: boolean = false): void {
        let _loc16_: IRoomObject = null;
        let _loc14_: Point = null;
        let _loc11_: IRoomObjectModel = null;
        let _loc12_: boolean = false;
        let _loc13_: number = 0;
        let _loc8_: string = null;
        let _loc15_: number = 0;
        let _loc10_: IStuffData = null;
        let _loc6_: BitmapData = null;
        let _loc9_: IRoomObjectController = this.getExistingRoomObject(param1, param2, 10);
        if (param5) {
            if (RoomEngine.isReadyRoomObject(_loc9_)) {
                this._SafeStr_14621.captureObject(param1, param2, 10, _loc9_);
            }
        } else {
            this._SafeStr_14621.clearObject(param1, param2, 10);
        }
        let _loc7_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc7_ != null) {
            _loc7_.getFurnitureDataWithId(param2);
        }
        if (this._sessionDataManager && param3 == this._sessionDataManager.userId && !FurniId.isBuilderClubId(param2) && !FurniId.isTempId(param2)) {
            _loc16_ = _loc9_;
            if (_loc16_) {
                _loc14_ = this.getRoomObjectScreenLocation(param1, param2, 10, this._SafeStr_3235);
                if (_loc14_) {
                    _loc11_ = _loc16_.getModel();
                    _loc12_ = _loc11_.getNumber("furniture_disable_picking_animation") == 1;
                    if (!_loc12_) {
                        _loc13_ = _loc11_.getNumber("furniture_type_id") | 0;
                        _loc8_ = _loc11_.getString("furniture_extras");
                        _loc15_ = _loc11_.getNumber("furniture_data_format") | 0;
                        _loc10_ = StuffDataFactory.getStuffDataWrapperForType(_loc15_);
                        _loc6_ = this.getFurnitureIcon(_loc13_, null, _loc8_, _loc10_).data;
                        if (_loc6_) {
                            this._toolbar.createTransitionToIcon("HTIE_ICON_INVENTORY", _loc6_, _loc14_.x | 0, _loc14_.y | 0);
                        }
                    }
                }
            }
        }
        this.disposeObject(param1, param2, 10);
        this.removeButtonMouseCursorOwner(param1, 10, param2);
        if (param4) {
            this.refreshTileObjectMap(param1, "RoomEngine.disposeObjectFurniture()");
        }
    }

    public addObjectWallItem(param1: number, param2: number, param3: number, param4: IVector3d, param5: IVector3d, param6: number, param7: string, param8: number = 0, param9: number = 0, param10: string = "", param11: number = -1, param12: boolean = true): boolean {
        let _loc15_: LegacyStuffData = null;
        let _loc14_: FurnitureData = null;
        let _loc13_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc13_ != null) {
            _loc15_ = new LegacyStuffData();
            _loc15_.setString(param7);
            _loc14_ = new FurnitureData(param2, param3, null, param4, param5, param6, _loc15_, NaN, param11, param8, param9, param10, true, param12);
            _loc13_.addWallItemData(_loc14_);
        }
        return true;
    }

    private addObjectWallItemFromData(param1: number, param2: number, param3: FurnitureData): boolean {
        let _loc4_: RoomInstanceData = null;
        if (param3 == null) {
            _loc4_ = this.getRoomInstanceData(param1);
            if (_loc4_ != null) {
                param3 = _loc4_.getWallItemDataWithId(param2);
            }
        }
        if (param3 == null) {
            return false;
        }
        let _loc6_: string = "";
        if (param3.data != null) {
            _loc6_ = param3.data.getLegacyString();
        }
        let _loc9_: string = this.getWallItemType(param3.typeId, _loc6_);
        let _loc7_: number = this.getWallItemColorIndex(param3.typeId);
        let _loc8_: string = this.getRoomObjectAdURL(_loc9_);
        if (_loc9_ == null) {
            _loc9_ = "";
        }
        let _loc10_: IRoomObjectController = this.createObjectWallItem(param1, param2, _loc9_);
        if (_loc10_ == null) {
            return false;
        }
        if (_loc10_ != null && _loc10_.getModelController() != null) {
            _loc10_.getModelController().setNumber("furniture_color", _loc7_, false);
            _loc10_.getModelController().setNumber("furniture_type_id", param3.typeId, true);
            _loc10_.getModelController().setString("furniture_ad_url", _loc8_, true);
            _loc10_.getModelController().setNumber("furniture_real_room_object", param3.realRoomObject ? 1 : 0, false);
            _loc10_.getModelController().setNumber("object_accurate_z_value", 1, true);
            _loc10_.getModelController().setNumber("furniture_usage_policy", param3.usagePolicy);
            _loc10_.getModelController().setNumber("furniture_expiry_time", param3.expiryTime);
            _loc10_.getModelController().setNumber("furniture_expirty_timestamp", getTimer());
            _loc10_.getModelController().setNumber("furniture_owner_id", param3.ownerId);
            _loc10_.getModelController().setString("furniture_owner_name", param3.ownerName);
            _loc10_.getModelController().setNumber("furniture_extra", param3.extra);
        }
        _loc6_ = "";
        if (param3.data != null) {
            _loc6_ = param3.data.getLegacyString();
        }
        if (!this.updateObjectWallItem(param1, param2, param3.loc, param3.dir, param3.state, _loc6_)) {
            return false;
        }
        this.restoreBufferedRoomObjectModelData(param1, param2, 20, _loc10_);
        if (this.events != null) {
            this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_ADDED", param1, param2, 20));
        }
        let _loc5_: ISelectedRoomObjectData = this.getPlacedObjectData(param1);
        if (_loc5_ && _loc5_.id == param2 && _loc5_.category == 20) {
            this.selectRoomObject(param1, param2, 20);
        }
        return true;
    }

    public updateObjectWallItem(param1: number, param2: number, param3: IVector3d, param4: IVector3d, param5: number, param6: string): boolean {
        let _loc10_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc10_ == null) {
            return false;
        }
        let _loc8_: RoomObjectUpdateMessage = new RoomObjectUpdateMessage(param3, param4);
        let _loc7_: LegacyStuffData = new LegacyStuffData();
        _loc7_.setString(param6);
        let _loc9_: RoomObjectDataUpdateMessage = new RoomObjectDataUpdateMessage(param5, _loc7_);
        if (_loc10_ != null && _loc10_.getEventHandler() != null) {
            _loc10_.getEventHandler().processUpdateMessage(_loc8_);
            _loc10_.getEventHandler().processUpdateMessage(_loc9_);
        }
        this.updateObjectRoomWindow(param1, param2);
        return true;
    }

    public updateObjectWallItemState(param1: number, param2: number, param3: number, param4: string): boolean {
        let _loc7_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc7_ == null) {
            return false;
        }
        let _loc5_: LegacyStuffData = new LegacyStuffData();
        _loc5_.setString(param4);
        let _loc6_: RoomObjectDataUpdateMessage = new RoomObjectDataUpdateMessage(param3, _loc5_);
        if (_loc7_ != null && _loc7_.getEventHandler() != null) {
            _loc7_.getEventHandler().processUpdateMessage(_loc6_);
        }
        return true;
    }

    public updateObjectRoomWindow(param1: number, param2: number, param3: boolean = true): void {
        let _loc5_: string = null;
        let _loc4_: IVector3d = null;
        let _loc7_: string = "20_" + param2;
        let _loc6_: RoomObjectRoomMaskUpdateMessage = null;
        let _loc9_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc9_ != null) {
            if (_loc9_.getModel() != null) {
                if (_loc9_.getModel().getNumber("furniture_uses_plane_mask") > 0) {
                    _loc5_ = _loc9_.getModel().getString("furniture_plane_mask_type");
                    _loc4_ = _loc9_.getLocation();
                    if (param3) {
                        _loc6_ = new RoomObjectRoomMaskUpdateMessage("RORMUM_ADD_MASK", _loc7_, _loc5_, _loc4_);
                    } else {
                        _loc6_ = new RoomObjectRoomMaskUpdateMessage("RORMUM_REMOVE_MASK", _loc7_);
                    }
                }
            }
        } else {
            _loc6_ = new RoomObjectRoomMaskUpdateMessage("RORMUM_REMOVE_MASK", _loc7_);
        }
        let _loc8_: IRoomObjectController = this.getObjectRoom(param1);
        if (_loc8_ != null && _loc8_.getEventHandler() != null && _loc6_ != null) {
            _loc8_.getEventHandler().processUpdateMessage(_loc6_);
        }
    }

    public updateObjectWallItemData(param1: number, param2: number, param3: string): boolean {
        let _loc5_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc5_ == null) {
            return false;
        }
        let _loc4_: RoomObjectItemDataUpdateMessage = new RoomObjectItemDataUpdateMessage(param3);
        if (_loc5_ != null && _loc5_.getEventHandler() != null) {
            _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        }
        return true;
    }

    private createObjectWallItem(param1: number, param2: number, param3: string): IRoomObjectController {
        let _loc4_: number = 20;
        let _loc5_: IRoomObjectController = this.createObject(this.getRoomIdentifier(param1), param2, param3, _loc4_);
        this.applyInvisibleFurniState(param1, _loc5_);
        return _loc5_;
    }

    private applyInvisibleFurniState(param1: number, param2: IRoomObjectController): void {
        if (param2 == null) {
            return;
        }
        let _loc3_: IRoomObjectModelController = param2.getModelController();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: boolean = this.isRoomVariableActive(param1, "invisible_furni");
        _loc3_.setNumber("furniture_invisible_layer", _loc4_ ? 1 : 0);
    }

    private getObjectWallItem(param1: number, param2: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), param2, 20);
    }

    public updateObjectWallItemLocation(param1: number, param2: number, param3: IVector3d, param4: IVector3d = null, param5: number = NaN): boolean {
        let _loc6_: RoomObjectMoveUpdateMessage = null;
        let _loc7_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc7_ == null) {
            return false;
        }
        if (_loc7_.getEventHandler() != null) {
            _loc6_ = new RoomObjectMoveUpdateMessage(param3, param4, null, param5, param4 != null);
            _loc7_.getEventHandler().processUpdateMessage(_loc6_);
        }
        this.updateObjectRoomWindow(param1, param2);
        return true;
    }

    public updateObjectWallItemExpiryTime(param1: number, param2: number, param3: number): boolean {
        let _loc4_: IRoomObjectController = this.getObjectWallItem(param1, param2);
        if (_loc4_ == null) {
            return false;
        }
        _loc4_.getModelController().setNumber("furniture_expiry_time", param3);
        _loc4_.getModelController().setNumber("furniture_expirty_timestamp", getTimer());
        return true;
    }

    public disposeObjectWallItem(param1: number, param2: number, param3: number = -1, param4: boolean = false): void {
        let _loc12_: IRoomObject = null;
        let _loc7_: Point = null;
        let _loc9_: IRoomObjectModel = null;
        let _loc10_: number = 0;
        let _loc8_: string = null;
        let _loc5_: BitmapData = null;
        let _loc11_: IRoomObjectController = this.getExistingRoomObject(param1, param2, 20);
        if (param4) {
            if (RoomEngine.isReadyRoomObject(_loc11_)) {
                this._SafeStr_14621.captureObject(param1, param2, 20, _loc11_);
            }
        } else {
            this._SafeStr_14621.clearObject(param1, param2, 20);
        }
        let _loc6_: RoomInstanceData = this.getRoomInstanceData(param1);
        if (_loc6_ != null) {
            _loc6_.getWallItemDataWithId(param2);
        }
        if (this._sessionDataManager && param3 == this._sessionDataManager.userId && !FurniId.isBuilderClubId(param2) && !FurniId.isTempId(param2)) {
            _loc12_ = _loc11_;
            if (_loc12_ && _loc12_.getType().indexOf("post_it") == -1 && _loc12_.getType().indexOf("external_image_wallitem") == -1) {
                _loc7_ = this.getRoomObjectScreenLocation(param1, param2, 20, this._SafeStr_3235);
                _loc9_ = _loc12_.getModel();
                _loc10_ = _loc9_.getNumber("furniture_type_id") | 0;
                _loc8_ = _loc9_.getString("furniture_data");
                _loc5_ = this.getWallItemIcon(_loc10_, null, _loc8_).data;
                if (this._toolbar && _loc7_) {
                    this._toolbar.createTransitionToIcon("HTIE_ICON_INVENTORY", _loc5_, _loc7_.x | 0, _loc7_.y | 0);
                }
            }
        }
        this.disposeObject(param1, param2, 20);
        this.updateObjectRoomWindow(param1, param2, false);
        this.removeButtonMouseCursorOwner(param1, 20, param2);
    }

    public addObjectUser(param1: number, param2: number, param3: IVector3d, param4: IVector3d, param5: number, param6: number, param7: string = null): boolean {
        let _loc10_: RoomObjectUpdateMessage = null;
        let _loc8_: RoomObjectAvatarFigureUpdateMessage = null;
        let _loc9_: RoomObjectAvatarBlockedUpdateMessage = null;
        if (this.getObjectUser(param1, param2) != null) {
            return false;
        }
        let _loc11_: string = RoomObjectUserTypes.getName(param6);
        if (_loc11_ == "pet") {
            _loc11_ = this.getPetType(param7);
        }
        let _loc12_: IRoomObjectController = this.createObjectUser(param1, param2, _loc11_);
        if (_loc12_ == null) {
            return false;
        }
        if (_loc12_ != null && _loc12_.getEventHandler() != null) {
            _loc10_ = new RoomObjectAvatarUpdateMessage(this.fixedUserLocation(param1, param3), null, param4, param5 | 0, false, 0);
            _loc12_.getEventHandler().processUpdateMessage(_loc10_);
            if (param7 != null) {
                _loc8_ = new RoomObjectAvatarFigureUpdateMessage(param7);
                _loc12_.getEventHandler().processUpdateMessage(_loc8_);
            }
            if (_loc11_ == "user" && this.userIsBlocked(param1, param2)) {
                _loc9_ = new RoomObjectAvatarBlockedUpdateMessage(true);
                _loc12_.getEventHandler().processUpdateMessage(_loc9_);
            }
        }
        this.restoreBufferedRoomObjectModelData(param1, param2, 100, _loc12_);
        if (this.events != null) {
            this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_ADDED", param1, param2, 100));
        }
        return true;
    }

    public addObjectSnowWar(param1: number, param2: number, param3: IVector3d, param4: number): boolean {
        let _loc5_: string = null;
        let _loc6_: RoomObjectUpdateMessage = null;
        if (param4 == 201) {
            _loc5_ = "game_snowball";
        } else if (param4 == 202) {
            _loc5_ = "game_snowsplash";
        }
        let _loc7_: IRoomObjectController = this.createObjectSnowWar(param1, param2, _loc5_, param4);
        if (!_loc7_) {
            return false;
        }
        if (_loc7_.getEventHandler()) {
            _loc6_ = new RoomObjectUpdateMessage(param3, null);
            _loc7_.getEventHandler().processUpdateMessage(_loc6_);
        }
        return true;
    }

    public addObjectSnowSplash(param1: number, param2: number, param3: IVector3d): boolean {
        let _loc4_: RoomObjectUpdateMessage = null;
        this._roomManager.addObjectUpdateCategory(202);
        let _loc5_: IRoomObjectController = this.createObjectSnowWar(param1, param2, "game_snowsplash", 202);
        if (!_loc5_) {
            return false;
        }
        if (_loc5_.getEventHandler()) {
            _loc4_ = new RoomObjectUpdateMessage(param3, null);
            _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        }
        return true;
    }

    public updateObjectUser(param1: number, param2: number, param3: IVector3d, param4: IVector3d, param5: boolean = false, param6: number = 0, param7: IVector3d = null, param8: number = NaN, param9: number = NaN, param10: boolean = false, param11: number = NaN): boolean {
        let _loc13_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc13_ == null || _loc13_.getEventHandler() == null || _loc13_.getModel() == null) {
            return false;
        }
        if (param3 == null) {
            param3 = _loc13_.getLocation();
        }
        if (param7 == null) {
            param7 = _loc13_.getDirection();
        }
        if (isNaN(param8)) {
            param8 = Number(_loc13_.getModel().getNumber("head_direction"));
        }
        let _loc12_: RoomObjectUpdateMessage = new RoomObjectAvatarUpdateMessage(this.fixedUserLocation(param1, param3), this.fixedUserLocation(param1, param4), param7, param8 | 0, param5, param6, param9, param10, param11);
        _loc13_.getEventHandler().processUpdateMessage(_loc12_);
        if (this.roomSessionManager && this.roomSessionManager.getSession(param1) && param2 == this.roomSessionManager.getSession(param1).ownUserRoomId) {
            this._roomObjectFactory.events.dispatchEvent(new RoomToObjectOwnAvatarMoveEvent("ROAME_MOVE_TO", param4));
        }
        return true;
    }

    public updateObjectUserDir(param1: number, param2: number, param3: IVector3d, param4: number): boolean {
        let _loc6_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc6_ == null || _loc6_.getEventHandler() == null || _loc6_.getModel() == null) {
            return false;
        }
        let _loc5_: RoomObjectUpdateMessage = new RoomObjectAvatarDirectionUpdateMessage(null, param3, param4 | 0);
        _loc6_.getEventHandler().processUpdateMessage(_loc5_);
        return true;
    }

    public updateObjectSnowWar(param1: number, param2: number, param3: IVector3d, param4: number): boolean {
        let _loc5_: IRoomObjectController = this.getObject(this.getRoomIdentifier(param1), param2, param4);
        let _loc6_: RoomObjectUpdateMessage = new RoomObjectUpdateMessage(param3, null);
        _loc5_.getEventHandler().processUpdateMessage(_loc6_);
        return true;
    }

    public disposeObjectSnowWar(param1: number, param2: number, param3: number): void {
        this.disposeObject(param1, param2, param3);
    }

    public updateObjectUserFlatControl(param1: number, param2: number, param3: string): boolean {
        let _loc5_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc5_ == null || _loc5_.getEventHandler() == null) {
            return false;
        }
        let _loc4_: RoomObjectUpdateStateMessage = new RoomObjectAvatarFlatControlUpdateMessage(param3);
        _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        return true;
    }

    public updateObjectUserOwnUserAvatar(param1: number, param2: number): boolean {
        let _loc3_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc3_ == null || _loc3_.getEventHandler() == null) {
            return false;
        }
        let _loc4_: RoomObjectUpdateMessage = new RoomObjectAvatarOwnMessage();
        _loc3_.getEventHandler().processUpdateMessage(_loc4_);
        return true;
    }

    public updateObjectUserBlocked(param1: number, param2: number, param3: boolean): boolean {
        let _loc5_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc5_ == null || _loc5_.getEventHandler() == null) {
            return false;
        }
        let _loc4_: RoomObjectAvatarBlockedUpdateMessage = new RoomObjectAvatarBlockedUpdateMessage(param3);
        _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        return true;
    }

    public updateObjectUserFigure(param1: number, param2: number, param3: string, param4: string = null, param5: string = null, param6: boolean = false): boolean {
        let _loc8_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc8_ == null || _loc8_.getEventHandler() == null) {
            return false;
        }
        let _loc7_: RoomObjectUpdateStateMessage = new RoomObjectAvatarFigureUpdateMessage(param3, param4, param5, param6);
        _loc8_.getEventHandler().processUpdateMessage(_loc7_);
        return true;
    }

    private userIsBlocked(param1: number, param2: number): boolean {
        let _loc3_: IUserData = null;
        let _loc4_: IRoomSession = this._roomSessionManager.getSession(param1);
        if (_loc4_ && _loc4_.userDataManager) {
            _loc3_ = _loc4_.userDataManager.getUserDataByIndex(param2);
            if (_loc3_ != null && this._sessionDataManager.isBlocked(_loc3_.webID)) {
                return true;
            }
        }
        return false;
    }

    public updateObjectUserAction(param1: number, param2: number, param3: string, param4: number, param5: string = null): boolean {
        let _loc7_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc7_ == null || _loc7_.getEventHandler() == null) {
            return false;
        }
        if (this.userIsBlocked(param1, param2)) {
            return false;
        }
        let _loc6_: RoomObjectUpdateStateMessage = null;
        switch (param3) {
            case "figure_talk":
                _loc6_ = new RoomObjectAvatarChatUpdateMessage(param4);
                break;
            case "figure_sleep":
                _loc6_ = new RoomObjectAvatarSleepUpdateMessage(param4 != 0);
                break;
            case "figure_is_typing":
                _loc6_ = new RoomObjectAvatarTypingUpdateMessage(param4 != 0);
                break;
            case "figure_is_muted":
                _loc6_ = new RoomObjectAvatarMutedUpdateMessage(param4 != 0);
                break;
            case "figure_carry_object":
                _loc6_ = new RoomObjectAvatarCarryObjectUpdateMessage(param4, param5);
                break;
            case "figure_use_object":
                _loc6_ = new RoomObjectAvatarUseObjectUpdateMessage(param4);
                break;
            case "figure_dance":
                _loc6_ = new RoomObjectAvatarDanceUpdateMessage(param4);
                break;
            case "figure_gained_experience":
                _loc6_ = new RoomObjectAvatarExperienceUpdateMessage(param4);
                break;
            case "figure_number_value":
                _loc6_ = new RoomObjectAvatarPlayerValueUpdateMessage(param4);
                break;
            case "figure_sign":
                _loc6_ = new RoomObjectAvatarSignUpdateMessage(param4);
                break;
            case "figure_expression":
                _loc6_ = new RoomObjectAvatarExpressionUpdateMessage(param4);
                break;
            case "figure_is_playing_game":
                _loc6_ = new RoomObjectAvatarPlayingGameMessage(param4 != 0);
                break;
            case "figure_guide_status":
                _loc6_ = new RoomObjectAvatarGuideStatusUpdateMessage(param4);
                break;
            case "figure_habbicon":
                _loc6_ = new RoomObjectAvatarHabbiconUpdateMessage(param4);
        }
        _loc7_.getEventHandler().processUpdateMessage(_loc6_);
        return true;
    }

    public updateObjectUserPosture(param1: number, param2: number, param3: string, param4: string = ""): boolean {
        let _loc6_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc6_ == null || _loc6_.getEventHandler() == null) {
            return false;
        }
        let _loc5_: RoomObjectUpdateStateMessage = new RoomObjectAvatarPostureUpdateMessage(param3, param4);
        _loc6_.getEventHandler().processUpdateMessage(_loc5_);
        return true;
    }

    public updateObjectUserGesture(param1: number, param2: number, param3: number): boolean {
        let _loc5_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc5_ == null || _loc5_.getEventHandler() == null) {
            return false;
        }
        let _loc4_: RoomObjectUpdateStateMessage = new RoomObjectAvatarGestureUpdateMessage(param3);
        _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        return true;
    }

    public updateObjectPetGesture(param1: number, param2: number, param3: string): boolean {
        let _loc5_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc5_ == null || _loc5_.getEventHandler() == null) {
            return false;
        }
        let _loc4_: RoomObjectUpdateStateMessage = new RoomObjectAvatarPetGestureUpdateMessage(param3);
        _loc5_.getEventHandler().processUpdateMessage(_loc4_);
        return true;
    }

    public updateObjectUserEffect(param1: number, param2: number, param3: number, param4: number = 0): boolean {
        let _loc5_: IRoomObjectController = this.getObjectUser(param1, param2);
        if (_loc5_ == null || _loc5_.getEventHandler() == null) {
            return false;
        }
        _loc5_.getEventHandler().processUpdateMessage(new RoomObjectAvatarEffectUpdateMessage(param3, param4));
        return true;
    }

    private createObjectUser(param1: number, param2: number, param3: string): IRoomObjectController {
        let _loc4_: number = 100;
        return this.createObject(this.getRoomIdentifier(param1), param2, param3, _loc4_);
    }

    private createObjectSnowWar(param1: number, param2: number, param3: string, param4: number): IRoomObjectController {
        return this.createObject(this.getRoomIdentifier(param1), param2, param3, param4);
    }

    private getObjectUser(param1: number, param2: number): IRoomObjectController {
        return this.getObject(this.getRoomIdentifier(param1), param2, 100);
    }

    public disposeObjectUser(param1: number, param2: number): void {
        this._SafeStr_14621.clearObject(param1, param2, 100);
        this.disposeObject(param1, param2, 100);
    }

    private createObject(param1: string, param2: number, param3: string, param4: number): IRoomObjectController {
        let _loc5_: IRoomInstance = this._roomManager.getRoom(param1);
        if (_loc5_ == null) {
            return null;
        }
        let _loc6_: IRoomObjectController = null;
        return asGuarded(_loc5_.createRoomObject(param2, param3, param4), isIRoomObjectController);
    }

    private getObject(param1: string, param2: number, param3: number): IRoomObjectController {
        let _loc4_: IRoomInstance = null;
        if (this._roomManager != null) {
            _loc4_ = this._roomManager.getRoom(param1);
        }
        if (_loc4_ == null) {
            return null;
        }
        let _loc5_: IRoomObjectController = null;
        _loc5_ = asGuarded(_loc4_.getObject(param2, param3), isIRoomObjectController);
        if (_loc5_ == null) {
            if (param3 == 10) {
                this.addObjectFurnitureFromData(this.getRoomId(param1), param2, null);
                _loc5_ = asGuarded(_loc4_.getObject(param2, param3), isIRoomObjectController);
            } else if (param3 == 20) {
                this.addObjectWallItemFromData(this.getRoomId(param1), param2, null);
                _loc5_ = asGuarded(_loc4_.getObject(param2, param3), isIRoomObjectController);
            }
        }
        return _loc5_;
    }

    private disposeObject(param1: number, param2: number, param3: number): void {
        let _loc4_: IRoomInstance = null;
        if (this._roomManager != null) {
            _loc4_ = this.getRoom(param1);
            if (_loc4_ == null) {
                return;
            }
            if (_loc4_.disposeObject(param2, param3)) {
                if (this.events != null) {
                    this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_REMOVED", param1, param2, param3));
                }
            }
        }
    }

    private roomObjectEventHandler(param1: RoomObjectEvent): void {
        let _loc2_: string = null;
        let _loc3_: number = 0;
        if (this._eventHandler != null) {
            _loc2_ = this.getRoomObjectRoomIdentifier(param1.object);
            if (_loc2_ != null) {
                _loc3_ = this.getRoomId(_loc2_);
                this._eventHandler.handleRoomObjectEvent(param1, _loc3_);
            }
        }
    }

    private getRoomObjectRoomIdentifier(param1: IRoomObject): string {
        if (param1 != null && param1.getModel() != null) {
            return param1.getModel().getString("object_room_id");
        }
        return null;
    }

    public createScreenShot(param1: number, param2: number, param3: string): void {
        let _loc10_: ByteArray = null;
        let _loc7_: FileReference = null;
        let _loc5_: Date = null;
        let _loc6_: string = null;
        let _loc4_: RegExp = /[:\/\\\*\?"<>\|%]/g;
        param3 = param3.replace(_loc4_, "");
        let _loc9_: IRoomRenderingCanvas = this.getRoomCanvas(param1, param2);
        if (!_loc9_) {
            return;
        }
        let _loc8_: BitmapData = _loc9_.takeScreenShot();
        if (PlayerVersionCheck.isVersionAtLeast(11, 3)) {
        }
        if (_loc10_ == null) {
            _loc10_ = PNGEncoder.encode(_loc8_);
        }
        try {
            _loc7_ = new FileReference();
            _loc7_.save(_loc10_, param3);
        } catch (error) {
            _loc5_ = new Date();
            _loc6_ = [_loc5_.getFullYear(), _loc5_.getMonth(), _loc5_.getDate()].join("-") + " " + [_loc5_.getHours(), _loc5_.getMinutes(), _loc5_.getSeconds()].join(".");
            param3 = "Habbo " + _loc6_;
            _loc7_ = new FileReference();
            _loc7_.save(_loc10_, param3);
        }
    }

    public purgeRoomContent(): void {
        if (this._roomContentLoader) {
            this._roomContentLoader.purge();
        }
    }

    public getFurnitureIconUrl(param1: number): string {
        let _loc3_: string = null;
        let _loc2_: string = "";
        if (this._roomContentLoader != null) {
            _loc3_ = this._roomContentLoader.getActiveObjectType(param1);
            _loc2_ = String(this._roomContentLoader.getActiveObjectColorIndex(param1));
        }
        return this._roomContentLoader.getObjectUrl(_loc3_, _loc2_);
    }

    public getFurnitureIcon(param1: number, param2: IGetImageListener, param3: string = null, param4: IStuffData = null, param5: boolean = false): ImageResult {
        return this.getFurnitureImage(param1, new Vector3d(), 1, param2, 0, param3, -1, -1, param4, param5);
    }

    public getWallItemIconUrl(param1: number, param2: string = null): string {
        let _loc4_: string = null;
        let _loc3_: string = "";
        if (this._roomContentLoader != null) {
            _loc4_ = this._roomContentLoader.getWallItemType(param1, param2);
            _loc3_ = String(this._roomContentLoader.getWallItemColorIndex(param1));
        }
        return this._roomContentLoader.getObjectUrl(_loc4_, _loc3_);
    }

    public getWallItemIcon(param1: number, param2: IGetImageListener, param3: string = null): ImageResult {
        return this.getWallItemImage(param1, new Vector3d(), 1, param2, 0, param3);
    }

    public getFurnitureImage(param1: number, param2: IVector3d, param3: number, param4: IGetImageListener, param5: number = 0, param6: string = null, param7: number = -1, param8: number = -1, param9: IStuffData = null, param10: boolean = false): ImageResult {
        let _loc12_: string = null;
        let _loc11_: string = "";
        if (this._roomContentLoader != null) {
            _loc12_ = this._roomContentLoader.getActiveObjectType(param1);
            _loc11_ = String(this._roomContentLoader.getActiveObjectColorIndex(param1));
        }
        if (param3 == 1 && param4 != null && !param10) {
            return this.getGenericRoomObjectThumbnail(_loc12_, _loc11_, param4, param6, param9);
        }
        return this.getGenericRoomObjectImage(_loc12_, _loc11_, param2, param3, param4, param5, param6, param9, param7, param8);
    }

    public getPetImage(param1: number, param2: number, param3: number, param4: IVector3d, param5: number, param6: IGetImageListener, param7: boolean = true, param8: number = 0, param9: any[] = null, param10: string = null): ImageResult {
        let _loc11_: string = null;
        let _loc13_: string = param1 + " " + param2 + " " + param3.toString(16);
        if (!param7) {
            _loc13_ += " head";
        }
        if (param9 != null) {
            _loc13_ += " " + param9.length;
            for (const _loc12_ of param9 ?? []) {
                _loc13_ += " " + _loc12_.layerId + " " + _loc12_.partId + " " + _loc12_.paletteId;
            }
        }
        if (this._roomContentLoader != null) {
            _loc11_ = this._roomContentLoader.getPetType(param1);
        }
        return this.getGenericRoomObjectImage(_loc11_, _loc13_, param4, param5, param6, param8, null, null, -1, -1, param10);
    }

    public getWallItemImage(param1: number, param2: IVector3d, param3: number, param4: IGetImageListener, param5: number = 0, param6: string = null, param7: number = -1, param8: number = -1): ImageResult {
        let _loc10_: string = null;
        let _loc9_: string = "";
        if (this._roomContentLoader != null) {
            _loc10_ = this._roomContentLoader.getWallItemType(param1, param6);
            _loc9_ = String(this._roomContentLoader.getWallItemColorIndex(param1));
        }
        if (param3 == 1 && param4 != null) {
            return this.getGenericRoomObjectThumbnail(_loc10_, _loc9_, param4, param6, null);
        }
        return this.getGenericRoomObjectImage(_loc10_, _loc9_, param2, param3, param4, param5, param6, null, param7, param8);
    }

    public getRoomImage(param1: string, param2: string, param3: string, param4: number, param5: IGetImageListener, param6: string = null): ImageResult {
        if (param1 == null) {
            param1 = "";
        }
        if (param2 == null) {
            param2 = "";
        }
        if (param3 == null) {
            param3 = "";
        }
        let _loc8_: string = "room";
        let _loc7_: string = param1 + "\n" + param2 + "\n" + param3 + "\n";
        if (param6 != null) {
            _loc7_ += param6;
        }
        return this.getGenericRoomObjectImage(_loc8_, _loc7_, new Vector3d(), param4, param5);
    }

    public getRoomObjectImage(param1: number, param2: number, param3: number, param4: IVector3d, param5: number, param6: IGetImageListener, param7: number = 0): ImageResult {
        let _loc9_: string = null;
        let _loc16_: IRoomObject = null;
        let _loc8_: number = 0;
        let _loc10_: string = null;
        let _loc13_: string = "";
        let _loc14_: IStuffData = null;
        let _loc15_: number = -1;
        let _loc12_: string = this.getRoomIdentifier(param1);
        let _loc11_: IRoomInstance = this._roomManager.getRoom(_loc12_);
        if (_loc11_ != null) {
            _loc16_ = _loc11_.getObject(param2, param3);
            if (_loc16_ != null && _loc16_.getModel() != null) {
                _loc10_ = _loc16_.getType();
                _loc15_ = _loc16_.getId();
                switch (param3) {
                    case 10:
                    case 20:
                        _loc13_ = String(_loc16_.getModel().getNumber("furniture_color"));
                        _loc9_ = _loc16_.getModel().getString("furniture_extras");
                        _loc8_ = _loc16_.getModel().getNumber("furniture_data_format") | 0;
                        if (_loc8_ != 0) {
                            _loc14_ = StuffDataFactory.getStuffDataWrapperForType(_loc8_);
                            _loc14_.initializeFromRoomObjectModel(_loc16_.getModel());
                        }
                        break;
                    case 100:
                        _loc13_ = _loc16_.getModel().getString("figure");
                }
            }
        }
        return this.getGenericRoomObjectImage(_loc10_, _loc13_, param4, param5, param6, param7, _loc9_, _loc14_, -1, -1, null, _loc15_);
    }

    private initializeRoomForGettingImage(param1: IRoomObjectController, param2: string): void {
        let _loc3_: any[] = null;
        let _loc8_: string = null;
        let _loc9_: string = null;
        let _loc12_: string = null;
        let _loc4_: string = null;
        let _loc11_: number = 0;
        let _loc5_: RoomPlaneParser = null;
        let _loc14_: number = 0;
        let _loc13_: number = 0;
        let _loc6_: XML = null;
        let _loc7_: RoomObjectRoomMaskUpdateMessage = null;
        let _loc10_: string = null;
        if (param2 != null) {
            _loc3_ = param2.split("\n");
            if (_loc3_.length >= 3) {
                _loc8_ = stringOrNull(_loc3_[0]);
                _loc9_ = stringOrNull(_loc3_[1]);
                _loc12_ = stringOrNull(_loc3_[2]);
                _loc4_ = stringOrNull(_loc3_[3]);
                _loc11_ = 6;
                _loc5_ = new RoomPlaneParser();
                _loc5_.initializeTileMap(_loc11_ + 2, _loc11_ + 2);
                _loc14_ = 1;
                while (_loc14_ < 1 + _loc11_) {
                    _loc13_ = 1;
                    while (_loc13_ < 1 + _loc11_) {
                        _loc5_.setTileHeight(_loc13_, _loc14_, 0);
                        _loc13_++;
                    }
                    _loc14_++;
                }
                _loc5_.wallHeight = _loc11_;
                _loc5_.initializeFromTileData();
                _loc6_ = _loc5_.getXML();
                param1.getEventHandler().initialize(_loc6_);
                param1.getModelController().setString("room_floor_type", _loc8_);
                param1.getModelController().setString("room_wall_type", _loc9_);
                param1.getModelController().setString("room_landscape_type", _loc12_);
                if (_loc4_ != null) {
                    _loc7_ = null;
                    _loc10_ = "20_1";
                    _loc7_ = new RoomObjectRoomMaskUpdateMessage("RORMUM_ADD_MASK", _loc10_, _loc4_, new Vector3d(2.5, 0.5, 2));
                    param1.getEventHandler().processUpdateMessage(_loc7_);
                }
                _loc5_.dispose();
            }
        }
    }

    public getGenericRoomObjectThumbnail(param1: string, param2: string, param3: IGetImageListener, param4: string = null, param5: IStuffData = null): ImageResult {
        let _loc6_: AssetCallbackInfo = null;
        let _loc13_: BitmapDataAsset = null;
        let _loc9_: BitmapData = null;
        let _loc8_: ImageResult = new ImageResult();
        _loc8_.id = -1;
        if (!this._isInitialized || param1 == null) {
            return _loc8_;
        }
        let _loc7_: IRoomInstance = this._roomManager.getRoom("temporary_room");
        if (_loc7_ == null) {
            _loc7_ = this._roomManager.createRoom("temporary_room", null);
            if (_loc7_ == null) {
                return _loc8_;
            }
        }
        let _loc11_: number = this._SafeStr_3251.reserveNumber();
        let _loc12_: number = this.getRoomObjectCategory(param1);
        if (_loc11_ < 0) {
            return _loc8_;
        }
        _loc11_ += 1;
        _loc8_.id = _loc11_;
        _loc8_.data = null;
        let _loc10_: string = [param1, param2].join("_");
        if (!this.assets.hasAsset(_loc10_) && param3 != null) {
            _loc6_ = this._SafeStr_3769.getValue(_loc10_);
            if (_loc6_ == null) {
                _loc6_ = new AssetCallbackInfo(_loc11_);
                this._SafeStr_3769.add(_loc10_, _loc6_);
                this._roomContentLoader.loadThumbnailContent(_loc11_, param1, param2, null);
            } else {
                this._SafeStr_3251.freeNumber(_loc11_ - 1);
                _loc8_.id = _loc6_.id;
            }
            _loc6_.listeners.push(param3);
        } else {
            _loc13_ = asInstanceOf(this.assets.getAssetByName(_loc10_), BitmapDataAsset);
            if (_loc13_ && !_loc13_.disposed) {
                _loc9_ = asInstanceOf(_loc13_.content, BitmapData);
                try {
                    if (_loc9_ != null && _loc9_ instanceof BitmapData && _loc9_.width > 0 && _loc9_.height > 0) {
                        _loc8_.data = _loc9_.clone();
                    } else {
                        Logger.log("Could not process thumbnail for icon (disposed?): " + _loc10_);
                    }
                } catch (error) {
                    Logger.log("Could not process thumbnail for icon: " + _loc10_);
                }
            }
            this._SafeStr_3251.freeNumber(_loc11_ - 1);
            _loc8_.id = 0;
        }
        return _loc8_;
    }

    public getGenericRoomObjectImage(param1: string, param2: string, param3: IVector3d, param4: number, param5: IGetImageListener, param6: number = 0, param7: string = null, param8: IStuffData = null, param9: number = -1, param10: number = -1, param11: string = null, param12: number = -1): ImageResult {
        let _loc18_: PetFigureData = null;
        let _loc23_: RoomObjectDataUpdateMessage = null;
        let _loc15_: number = 0;
        let _loc17_: ImageResult = new ImageResult();
        _loc17_.id = -1;
        if (!this._isInitialized || param1 == null) {
            return _loc17_;
        }
        let _loc16_: IRoomInstance = this._roomManager.getRoom("temporary_room");
        if (_loc16_ == null) {
            _loc16_ = this._roomManager.createRoom("temporary_room", null);
            if (_loc16_ == null) {
                return _loc17_;
            }
        }
        let _loc21_: number = this._SafeStr_3404.reserveNumber();
        let _loc22_: number = this.getRoomObjectCategory(param1);
        if (_loc21_ < 0) {
            return _loc17_;
        }
        _loc21_ += 1;
        let _loc24_: IRoomObjectController = asGuarded(_loc16_.createRoomObject(_loc21_, param1, _loc22_), isIRoomObjectController);
        if (_loc24_ == null || _loc24_.getModelController() == null || _loc24_.getEventHandler() == null) {
            return _loc17_;
        }
        let _loc13_: IRoomObjectModelController = _loc24_.getModelController();
        switch (_loc22_) {
            case 10:
            case 20:
                _loc13_.setNumber("furniture_color", Number(param2) | 0);
                _loc13_.setString("furniture_extras", param7);
                break;
            case 100:
                if (param1 == "user" || param1 == "bot" || param1 == "rentable_bot" || param1 == "pet") {
                    _loc13_.setString("figure", param2);
                } else {
                    _loc18_ = new PetFigureData(param2);
                    _loc13_.setNumber("pet_palette_index", _loc18_.paletteId);
                    _loc13_.setNumber("pet_color", _loc18_.color);
                    if (_loc18_.headOnly) {
                        _loc13_.setNumber("pet_head_only", 1);
                    }
                    if (_loc18_.hasCustomParts) {
                        _loc13_.setNumberArray("pet_custom_layer_ids", _loc18_.customLayerIds);
                        _loc13_.setNumberArray("pet_custom_part_ids", _loc18_.customPartIds);
                        _loc13_.setNumberArray("pet_custom_palette_ids", _loc18_.customPaletteIds);
                    }
                    if (param11 != null) {
                        _loc13_.setString("figure_posture", param11);
                    }
                }
                break;
            case 0:
                this.initializeRoomForGettingImage(_loc24_, param2);
        }
        _loc24_.setDirection(param3);
        _loc24_.setState(param9, 0);
        let _loc14_: IRoomObjectSpriteVisualization = null;
        _loc14_ = asGuarded(_loc24_.getVisualization(), isIRoomObjectSpriteVisualization);
        if (_loc14_ == null) {
            _loc16_.disposeObject(_loc21_, _loc22_);
            return _loc17_;
        }
        if (param9 > -1 || param8) {
            if (param8 != null && param8.getLegacyString() != "") {
                _loc23_ = new RoomObjectDataUpdateMessage(Number(param8.getLegacyString()) | 0, param8);
            } else {
                _loc23_ = new RoomObjectDataUpdateMessage(param9, param8);
            }
            if (_loc24_.getEventHandler() != null) {
                _loc24_.getEventHandler().processUpdateMessage(_loc23_);
            }
        }
        let _loc20_: RoomGeometry = new RoomGeometry(param4, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));
        _loc14_.update(_loc20_, 0, true, false);
        if (param10 > 0) {
            _loc15_ = 0;
            while (_loc15_ < param10) {
                _loc14_.update(_loc20_, 0, true, false);
                _loc15_++;
            }
        }
        let _loc19_: BitmapData = _loc14_.getImage(param6 | 0, param12);
        _loc17_.data = _loc19_;
        _loc17_.id = _loc21_;
        if (!this.isRoomObjectContentAvailable(param1) && param5 != null) {
            this._SafeStr_4651.add(String(_loc21_), param5);
            _loc13_.setNumber("image_query_scale", param4, true);
        } else {
            _loc16_.disposeObject(_loc21_, _loc22_);
            this._SafeStr_3404.freeNumber(_loc21_ - 1);
            _loc17_.id = 0;
        }
        _loc20_.dispose();
        return _loc17_;
    }

    public getRoomObjectBoundingRectangle(param1: number, param2: number, param3: number, param4: number): Rectangle {
        let _loc13_: IRoomObject = null;
        let _loc5_: IRoomObjectVisualization = null;
        let _loc11_: Rectangle = null;
        let _loc6_: IRoomRenderingCanvas = null;
        let _loc9_: number = NaN;
        let _loc8_: Point = null;
        let _loc7_: number = NaN;
        let _loc10_: number = NaN;
        let _loc12_: IRoomGeometry = this.getRoomCanvasGeometry(param1, param4);
        if (_loc12_ != null) {
            _loc13_ = this.getRoomObject(param1, param2, param3);
            if (_loc13_ != null) {
                _loc5_ = _loc13_.getVisualization();
                if (_loc5_ != null) {
                    _loc11_ = _loc5_.boundingRectangle;
                    _loc6_ = this.getRoomCanvas(param1, param4);
                    _loc9_ = _loc6_ ? this.getCanvasTransformScale(_loc6_) : 1;
                    _loc8_ = _loc12_.getScreenPoint(_loc13_.getLocation());
                    if (_loc8_ != null) {
                        if (_loc9_ < 0) {
                            _loc11_.left = (_loc11_.left + _loc11_.width) * _loc9_;
                            _loc11_.top = (_loc11_.top + _loc11_.height) * _loc9_;
                            _loc11_.width *= -_loc9_;
                            _loc11_.height *= -_loc9_;
                        } else {
                            _loc11_.left *= _loc9_;
                            _loc11_.top *= _loc9_;
                            _loc11_.width *= _loc9_;
                            _loc11_.height *= _loc9_;
                        }
                        _loc8_.x *= _loc9_;
                        _loc8_.y *= _loc9_;
                        _loc11_.offset(_loc8_.x, _loc8_.y);
                        if (_loc6_ != null) {
                            _loc7_ = Number(_loc6_.isFlipped ? -_loc6_.width : _loc6_.width);
                            _loc10_ = Number(_loc6_.isFlipped ? -_loc6_.height : _loc6_.height);
                            _loc11_.offset(_loc7_ / 2 + _loc6_.screenOffsetX, _loc10_ / 2 + _loc6_.screenOffsetY);
                            return _loc11_;
                        }
                    }
                }
            }
        }
        return null;
    }

    public getRoomObjectScreenLocation(param1: number, param2: number, param3: number, param4: number = -1): Point {
        let _loc10_: IRoomObject = null;
        let _loc7_: Point = null;
        let _loc5_: IRoomRenderingCanvas = null;
        let _loc8_: number = NaN;
        let _loc6_: number = NaN;
        let _loc11_: number = NaN;
        if (param4 == -1) {
            param4 = this._SafeStr_3235;
        }
        let _loc9_: IRoomGeometry = this.getRoomCanvasGeometry(param1, param4);
        if (_loc9_ != null) {
            _loc10_ = this.getRoomObject(param1, param2, param3);
            if (_loc10_ != null) {
                _loc7_ = _loc9_.getScreenPoint(_loc10_.getLocation());
                if (_loc7_ != null) {
                    _loc5_ = this.getRoomCanvas(param1, param4);
                    if (_loc5_ != null) {
                        _loc8_ = this.getCanvasTransformScale(_loc5_);
                        _loc7_.x *= _loc8_;
                        _loc7_.y *= _loc8_;
                        _loc6_ = Number(_loc5_.isFlipped ? -_loc5_.width : _loc5_.width);
                        _loc11_ = Number(_loc5_.isFlipped ? -_loc5_.height : _loc5_.height);
                        _loc7_.offset(_loc6_ / 2 + _loc5_.screenOffsetX, _loc11_ / 2 + _loc5_.screenOffsetY);
                    }
                    return _loc7_;
                }
            }
        }
        return null;
    }

    public getActiveRoomBoundingRectangle(param1: number): Rectangle {
        return this.getRoomObjectBoundingRectangle(this._activeRoomId, -1, 0, param1);
    }

    public getActiveRoomActiveCanvas(): IRoomRenderingCanvas {
        return this.getRoomCanvas(this._activeRoomId, this._SafeStr_3235);
    }

    public isRoomObjectContentAvailable(param1: string): boolean {
        return this._roomManager.isContentAvailable(param1);
    }

    public iconLoaded(param1: number, param2: string, param3: boolean): void {
        let _loc7_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        if (this._roomContentLoader == null) {
            return;
        }
        if (param1 == -1) {
            return;
        }
        this._SafeStr_3251.freeNumber(param1 - 1);
        let _loc5_: AssetCallbackInfo = this._SafeStr_3769.getValue(param2);
        if (_loc5_ != null) {
            if (_loc5_.id != param1) {
                return;
            }
            this._SafeStr_3769.remove(param2);
            _loc7_ = asInstanceOf(this.assets.getAssetByName(param2), BitmapDataAsset);
            _loc4_ = asInstanceOf(_loc7_.content, BitmapData);
            if (_loc7_ && !_loc7_.disposed) {
                for (const _loc6_ of _loc5_.listeners ?? []) {
                    if (_loc6_ != null) {
                        try {
                            if (_loc4_ != null && _loc4_ instanceof BitmapData && _loc4_.width > 0 && _loc4_.height > 0) {
                                _loc6_.imageReady(param1, _loc4_.clone());
                            } else {
                                Logger.log("Could not load thumbnail for icon (disposed?): " + param2);
                            }
                        } catch (error) {
                            Logger.log("Could not load thumbnail for icon: " + param2);
                            continue;
                        }
                    }
                }
            }
        }
    }

    public contentLoaded(param1: string, param2: boolean): void {
        let _loc6_: number = 0;
        let _loc14_: IRoomObject = null;
        let _loc11_: number = 0;
        let _loc9_: BitmapData = null;
        let _loc4_: IRoomObjectSpriteVisualization = null;
        let _loc7_: number = NaN;
        let _loc5_: IGetImageListener = null;
        if (!param2) {
            Logger.log("[RoomEngine] Failed to load content:  " + param1);
        }
        let _loc8_: IRoomInstance = this._roomManager.getRoom("temporary_room");
        if (_loc8_ == null) {
            Logger.log("No room instance for " + param1 + " room: " + "temporary_room");
            return;
        }
        if (this._roomContentLoader == null) {
            return;
        }
        let _loc10_: RoomGeometry = null;
        let _loc13_: number = 0;
        let _loc12_: number = this._roomContentLoader.getObjectCategory(param1);
        let _loc3_: number = _loc8_.getObjectCount(_loc12_);
        _loc6_ = _loc3_ - 1;
        while (_loc6_ >= 0) {
            _loc14_ = _loc8_.getObjectWithIndex(_loc6_, _loc12_);
            if (_loc14_ != null && _loc14_.getModel() != null && _loc14_.getType() == param1) {
                _loc11_ = _loc14_.getId();
                _loc9_ = null;
                _loc4_ = null;
                _loc4_ = asGuarded(_loc14_.getVisualization(), isIRoomObjectSpriteVisualization);
                if (_loc4_ != null) {
                    _loc7_ = _loc14_.getModel().getNumber("image_query_scale");
                    if (_loc10_ != null && _loc13_ != _loc7_) {
                        _loc10_.dispose();
                        _loc10_ = null;
                    }
                    if (_loc10_ == null) {
                        _loc13_ = _loc7_;
                        _loc10_ = new RoomGeometry(_loc7_, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));
                    }
                    _loc4_.update(_loc10_, 0, true, false);
                    _loc9_ = _loc4_.image;
                }
                _loc8_.disposeObject(_loc11_, _loc12_);
                this._SafeStr_3404.freeNumber(_loc11_ - 1);
                _loc5_ = asGuarded(this._SafeStr_4651.remove(String(_loc11_)), isIGetImageListener);
                if (_loc5_ != null) {
                    if (_loc9_ != null) {
                        _loc5_.imageReady(_loc11_, _loc9_);
                    } else {
                        _loc5_.imageFailed(_loc11_);
                    }
                } else if (_loc9_ != null) {
                    _loc9_.dispose();
                }
            }
            _loc6_--;
        }
        if (_loc10_ != null) {
            _loc10_.dispose();
        }
    }

    public objectInitialized(param1: string, param2: number, param3: number): void {
        let _loc5_: number = 0;
        let _loc4_: IStuffData = null;
        let _loc6_: number = 0;
        let _loc7_: RoomObjectDataUpdateMessage = null;
        let _loc8_: number = this.getRoomId(param1);
        if (param3 == 20) {
            this.updateObjectRoomWindow(_loc8_, param2);
        }
        let _loc9_: IRoomObjectController = asGuarded(this.getRoomObject(_loc8_, param2, param3), isIRoomObjectController);
        if (_loc9_ != null && _loc9_.getModel() != null && _loc9_.getEventHandler() != null) {
            if (!isNaN(_loc9_.getModel().getNumber("furniture_data_format"))) {
                _loc5_ = _loc9_.getModel().getNumber("furniture_data_format") | 0;
                _loc4_ = StuffDataFactory.getStuffDataWrapperForType(_loc5_);
                _loc4_.initializeFromRoomObjectModel(_loc9_.getModel());
                _loc6_ = _loc9_.getState(0);
                _loc7_ = new RoomObjectDataUpdateMessage(_loc6_, _loc4_);
                _loc9_.getEventHandler().processUpdateMessage(_loc7_);
            }
            this.restoreBufferedRoomObjectModelData(_loc8_, param2, param3, _loc9_);
            if (this.events != null) {
                this.events.dispatchEvent(new RoomEngineObjectEvent("REOE_CONTENT_UPDATED", _loc8_, param2, param3));
            }
        }
        if (param1 != "temporary_room") {
            this.addObjectToTileMap(_loc8_, _loc9_);
        }
    }

    public objectsInitialized(param1: string): void {
        let _loc2_: number = 0;
        if (this.events != null) {
            _loc2_ = this.getRoomId(param1);
            this.events.dispatchEvent(new RoomEngineEvent("REE_OBJECTS_INITIALIZED", _loc2_));
        }
    }

    public selectAvatar(param1: number, param2: number): void {
        if (this._eventHandler != null) {
            this._eventHandler.setSelectedAvatar(param1, param2, true);
        }
    }

    public getSelectedAvatarId(): number {
        if (this._eventHandler != null) {
            return this._eventHandler.getSelectedAvatarId();
        }
        return -1;
    }

    public selectRoomObject(param1: number, param2: number, param3: number): void {
        if (this._eventHandler == null) {
            return;
        }
        this._eventHandler.setSelectedObject(param1, param2, param3);
    }

    protected addObjectToTileMap(param1: number, param2: IRoomObject): void {
        let _loc3_: TileObjectMap = this.getRoomInstanceData(param1).tileObjectMap;
        if (_loc3_) {
            _loc3_.addRoomObject(param2);
        }
    }

    public refreshTileObjectMap(param1: number, param2: string): void {
        let _loc3_: TileObjectMap = this.getRoomInstanceData(param1).tileObjectMap;
        if (_loc3_) {
            _loc3_.populate(this.getRoomObjects(param1, 10));
        }
        this._eventHandler.recalibrateMovements(param1);
    }

    private showRoomAd(param1: AdEvent): void {
        let _loc3_: IRoomObjectController = null;
        let _loc2_: RoomObjectRoomAdUpdateMessage = null;
        if (this._roomContentLoader != null) {
            _loc3_ = this.getObjectRoom(param1.roomId);
            if (_loc3_ == null) {
                return;
            }
            _loc2_ = null;
            _loc2_ = new RoomObjectRoomAdUpdateMessage("RORUM_ROOM_AD_ACTIVATE", "room_ad_image_asset", param1.clickUrl);
            _loc3_.getEventHandler().processUpdateMessage(_loc2_);
        }
    }

    public requestRoomAdImage(param1: number, param2: number, param3: number, param4: string, param5: string): void {
        if (this._adManager != null) {
            this._adManager.loadRoomAdImage(param1, param2, param3, param4, param5);
        }
    }

    private onRoomAdImageLoaded(param1: AdEvent): void {
        let _loc2_: RoomObjectRoomAdUpdateMessage = null;
        let _loc3_: IRoomObjectController = this.getObjectRoom(param1.roomId);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IRoomObjectController = this.getObjectFurniture(param1.roomId, param1.objectId);
        if (_loc4_ == null || _loc4_.getEventHandler() == null) {
            return;
        }
        if (param1.image != null) {
            this._roomContentLoader.addGraphicAsset(_loc4_.getType(), param1.imageUrl, param1.image, true);
        }
        switch (param1.type) {
            case "AE_ROOM_AD_IMAGE_LOADED":
                _loc2_ = new RoomObjectRoomAdUpdateMessage("RORUM_ROOM_BILLBOARD_IMAGE_LOADED", param1.imageUrl, param1.clickUrl, param1.objectId, param1.image);
                break;
            case "AE_ROOM_AD_IMAGE_LOADING_FAILED":
                _loc2_ = new RoomObjectRoomAdUpdateMessage("RORUM_ROOM_BILLBOARD_IMAGE_LOADING_FAILED", param1.imageUrl, param1.clickUrl, param1.objectId, param1.image);
        }
        if (_loc2_ != null) {
            _loc4_.getEventHandler().processUpdateMessage(_loc2_);
        }
    }

    public insertContentLibrary(param1: number, param2: number, param3: IAssetLibrary): boolean {
        return this._roomContentLoader.insertObjectContent(param1, param2, param3);
    }

    public setActiveObjectType(param1: number, param2: string): void {
        this._roomContentLoader.setActiveObjectType(param1, param2);
    }

    public override purge(): void {
        super.purge();
        if (this._roomContentLoader) {
            this._roomContentLoader.purge();
        }
    }

    public requestBadgeImageAsset(param1: number, param2: number, param3: number, param4: string, param5: boolean = true): void {
        let _loc10_: IRoomInstance = null;
        let _loc6_: any[] = null;
        let _loc11_: IRoomObjectController = null;
        if (param1 == 0) {
            _loc10_ = this._roomManager.getRoom("temporary_room");
            if (_loc10_ != null) {
                _loc11_ = asGuarded(_loc10_.getObject(param2, param3), isIRoomObjectController);
            }
        } else {
            _loc11_ = this.getObjectFurniture(param1, param2);
        }
        if (_loc11_ == null || _loc11_.getEventHandler() == null) {
            return;
        }
        let _loc8_: (...args: any[]) => any = param5 ? this._sessionDataManager.getGroupBadgeAssetName : this._sessionDataManager.getBadgeImageAssetName;
        let _loc7_: string = stringOrNull(_loc8_.call(null, param4));
        if (!_loc7_) {
            _loc7_ = "loading_icon";
            if (!this._SafeStr_2732) {
                this._SafeStr_2732 = new UtilsMap();
            }
            if (this._SafeStr_2732.length == 0) {
                this._sessionDataManager.events.addEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeLoaded);
            }
            _loc6_ = this._SafeStr_2732.getValue(param4);
            if (_loc6_ == null) {
                _loc6_ = [];
            }
            _loc6_.push(new RoomObjectBadgeImageAssetListener(_loc11_, param5));
            this._SafeStr_2732[param4] = _loc6_;
        } else {
            this.addBadgeGraphicAssets(_loc11_, param4, param5);
        }
        let _loc9_: RoomObjectGroupBadgeUpdateMessage = new RoomObjectGroupBadgeUpdateMessage(param4, _loc7_);
        if (_loc9_ != null) {
            _loc11_.getEventHandler().processUpdateMessage(_loc9_);
        }
    }

    private addBadgeGraphicAssets(param1: IRoomObjectController, param2: string, param3: boolean = false): void {
        let _loc9_: (...args: any[]) => any = param3 ? this._sessionDataManager.getGroupBadgeAssetName : this._sessionDataManager.getBadgeImageAssetName;
        let _loc10_: (...args: any[]) => any = param3 ? this._sessionDataManager.getGroupBadgeSmallAssetName : this._sessionDataManager.getBadgeImageSmallAssetName;
        let _loc11_: (...args: any[]) => any = param3 ? this._sessionDataManager.getGroupBadgeImage : this._sessionDataManager.getBadgeImage;
        let _loc8_: (...args: any[]) => any = param3 ? this._sessionDataManager.getGroupBadgeSmallImage : this._sessionDataManager.getBadgeSmallImage;
        let _loc7_: string = String(_loc9_.call(null, param2));
        let _loc4_: BitmapData = castTo(_loc11_.call(null, param2), BitmapData);
        this._roomContentLoader.addGraphicAsset(param1.getType(), _loc7_, _loc4_, false);
        let _loc5_: string = String(_loc10_.call(null, param2));
        let _loc6_: BitmapData = _loc8_.call(null, param2);
        if (_loc6_) {
            this._roomContentLoader.addGraphicAsset(param1.getType(), _loc5_, _loc6_, false);
        }
    }

    private onBadgeLoaded(param1: BadgeImageReadyEvent): void {
        let _loc4_: number = 0;
        let _loc3_: RoomObjectBadgeImageAssetListener = null;
        let _loc5_: (...args: any[]) => any = null;
        let _loc6_: RoomObjectGroupBadgeUpdateMessage = null;
        let _loc2_: any[] = asGuarded(this._SafeStr_2732.getValue(param1.badgeId), Array.isArray);
        if (_loc2_ == null) {
            Logger.log("Could not find matching objects for group badge asset request " + param1.badgeId);
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_ = _loc2_[_loc4_];
            this.addBadgeGraphicAssets(_loc3_.object, param1.badgeId, _loc3_.groupBadge);
            _loc5_ = _loc3_.groupBadge ? this._sessionDataManager.getGroupBadgeAssetName : this._sessionDataManager.getBadgeImageAssetName;
            _loc6_ = new RoomObjectGroupBadgeUpdateMessage(param1.badgeId, String(_loc5_.call(null, param1.badgeId)));
            if (_loc6_ != null && _loc3_.object.getEventHandler() != null) {
                _loc3_.object.getEventHandler().processUpdateMessage(_loc6_);
            }
            _loc4_++;
        }
        this._SafeStr_2732.remove(param1.badgeId);
        if (this._SafeStr_2732.length == 0) {
            this._sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeLoaded);
        }
    }

    public requestFurniIconAsset(param1: number, param2: number, param3: number, param4: boolean, param5: number, param6: string): void {
        let _loc10_: IRoomInstance = null;
        let _loc7_: any[] = null;
        let _loc12_: IRoomObjectController = null;
        if (param1 == 0) {
            _loc10_ = this._roomManager.getRoom("temporary_room");
            if (_loc10_ != null) {
                _loc12_ = asGuarded(_loc10_.getObject(param2, param3), isIRoomObjectController);
            }
        } else {
            _loc12_ = this.getObjectFurniture(param1, param2);
        }
        if (_loc12_ == null || _loc12_.getEventHandler() == null) {
            return;
        }
        let _loc8_: string = this._sessionDataManager.getFurniIconImageAssetName(param4, param5, param6);
        let _loc11_: string = RoomEngine.furniIconListenerKey(param4, param5, param6);
        if (!_loc8_) {
            _loc8_ = "loading_icon";
            if (!this._SafeStr_2774) {
                this._SafeStr_2774 = new UtilsMap();
            }
            if (this._SafeStr_2774.length == 0) {
                this._sessionDataManager.events.addEventListener("FIIRE_ICON_READY", this.onFurniIconLoaded);
            }
            _loc7_ = this._SafeStr_2774.getValue(_loc11_);
            if (_loc7_ == null) {
                _loc7_ = [];
            }
            _loc7_.push(new RoomObjectFurniIconImageAssetListener(_loc12_));
            this._SafeStr_2774[_loc11_] = _loc7_;
        } else {
            this.addFurniIconGraphicAssets(_loc12_, param4, param5, param6);
        }
        let _loc9_: RoomObjectFurniIconUpdateMessage = new RoomObjectFurniIconUpdateMessage(_loc8_, param4, param5, param6);
        if (_loc9_ != null) {
            _loc12_.getEventHandler().processUpdateMessage(_loc9_);
        }
    }

    private addFurniIconGraphicAssets(param1: IRoomObjectController, param2: boolean, param3: number, param4: string): void {
        let _loc6_: string = this._sessionDataManager.getFurniIconImageAssetName(param2, param3, param4);
        let _loc5_: BitmapData = this._sessionDataManager.getFurniIconImage(param2, param3, param4);
        this._roomContentLoader.addGraphicAsset(param1.getType(), _loc6_, _loc5_, false);
    }

    private onFurniIconLoaded(param1: FurniIconImageReadyEvent): void {
        let _loc4_: number = 0;
        let _loc3_: RoomObjectFurniIconImageAssetListener = null;
        let _loc5_: RoomObjectFurniIconUpdateMessage = null;
        let _loc6_: string = RoomEngine.furniIconListenerKey(param1.wallItem, param1.typeId, param1.extra);
        let _loc2_: any[] = asGuarded(this._SafeStr_2774.getValue(_loc6_), Array.isArray);
        if (_loc2_ == null) {
            Logger.log("Could not find matching objects for furni icon asset request " + _loc6_);
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_ = _loc2_[_loc4_];
            this.addFurniIconGraphicAssets(_loc3_.object, param1.wallItem, param1.typeId, param1.extra);
            _loc5_ = new RoomObjectFurniIconUpdateMessage(param1.assetName, param1.wallItem, param1.typeId, param1.extra);
            if (_loc5_ != null && _loc3_.object.getEventHandler() != null) {
                _loc3_.object.getEventHandler().processUpdateMessage(_loc5_);
            }
            _loc4_++;
        }
        this._SafeStr_2774.remove(_loc6_);
        if (this._SafeStr_2774.length == 0) {
            this._sessionDataManager.events.removeEventListener("FIIRE_ICON_READY", this.onFurniIconLoaded);
        }
    }

    public get isDecorateMode(): boolean {
        if (!this._roomSessionManager) {
            return false;
        }
        let _loc1_: IRoomSession = this._roomSessionManager.getSession(this._activeRoomId);
        return !!(_loc1_ && _loc1_.isUserDecorating);
    }

    public get isGameMode(): boolean {
        return this._isGameMode;
    }

    public set isGameMode(param1: boolean) {
        this._isGameMode = param1;
    }

    public showUseProductSelection(param1: number, param2: number, param3: number = -1): void {
        let _loc5_: number = 0;
        let _loc4_: string = null;
        if (this._roomContentLoader != null) {
            _loc4_ = this._roomContentLoader.getActiveObjectType(param2);
            _loc5_ = this.getRoomObjectCategory(_loc4_);
            this.events.dispatchEvent(new RoomEngineUseProductEvent("ROSM_USE_PRODUCT_FROM_INVENTORY", this._activeRoomId, param3, _loc5_, param1, param2));
        }
    }

    public setAvatarEffect(param1: number): void {
        if (this._sessionDataManager == null || this._roomSessionManager == null) {
            return;
        }
        let _loc2_: IRoomSession = this._roomSessionManager.getSession(this._activeRoomId);
        if (_loc2_ == null) {
            return;
        }
        this.updateObjectUserEffect(this.activeRoomId, _loc2_.ownUserRoomId, param1);
    }

    public setFpsCounterEnabled(param1: boolean): void {
        if (this._sessionDataManager == null || this._roomSessionManager == null) {
            return;
        }
        let _loc2_: IRoomRenderingCanvas = this.getActiveRoomActiveCanvas();
        if (_loc2_ != null) {
            _loc2_.fpsCounterEnabled = param1;
        }
    }

    public get playerUnderCursor(): number {
        return this._playerUnderCursor;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get roomEvents(): IHabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    private fixedUserLocation(param1: number, param2: IVector3d): IVector3d {
        if (param2 == null) {
            return null;
        }
        let _loc5_: FurniStackingHeightMap = this.getFurniStackingHeightMap(param1);
        let _loc7_: LegacyWallGeometry = this.getLegacyGeometry(param1);
        if (_loc5_ == null || _loc7_ == null) {
            return param2;
        }
        let _loc6_: number = param2.z;
        let _loc3_: number = _loc5_.getTileHeight(param2.x | 0, param2.y | 0);
        let _loc4_: number = _loc7_.getTileHeight(param2.x | 0, param2.y | 0);
        if (Math.abs(_loc6_ - _loc3_) < 0.02 && Math.abs(_loc3_ - _loc4_) < 0.02) {
            _loc6_ = _loc7_.getFloorAltitude(param2.x | 0, param2.y | 0);
        }
        return new Vector3d(param2.x, param2.y, _loc6_);
    }

    private get cameraFollowDuration(): number {
        return this.getBoolean("room.camera.follow_user") ? 1000 : 0;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public getRenderRoomMessage(param1: Rectangle, param2: number, param3: boolean = false, param4: boolean = true, param5: boolean = false, param6: number = -1): IMessageComposer {
        let _loc8_: IRoomRenderingCanvas = null;
        if (param6 > -1) {
            _loc8_ = this.getRoomCanvas(this._activeRoomId, param6);
        } else {
            _loc8_ = this.getActiveRoomActiveCanvas();
        }
        if (!_loc8_) {
            return null;
        }
        if (param5) {
            _loc8_.skipSpriteVisibilityChecking();
        }
        let _loc12_: number = -1;
        if (!param4 && this._roomSessionManager.getSession(this._activeRoomId) != null) {
            _loc12_ = this._roomSessionManager.getSession(this._activeRoomId).ownUserRoomId;
        }
        let _loc11_: SpriteDataCollector = new SpriteDataCollector();
        let _loc10_: string = _loc11_.getFurniData(param1, _loc8_, this, _loc12_);
        let _loc9_: string = _loc11_.getRoomRenderingModifiers(this);
        let _loc7_: any[] = _loc11_.getRoomPlanes(param1, _loc8_, this, param2);
        if (param5) {
            _loc8_.resumeSpriteVisibilityChecking();
        }
        if (param3) {
            return new RenderRoomThumbnailMessageComposer(_loc7_, _loc10_, _loc9_, this._activeRoomId, this._sessionDataManager.topSecurityLevel);
        }
        return new RenderRoomMessageComposer(_loc7_, _loc10_, _loc9_, this._activeRoomId, this._sessionDataManager.topSecurityLevel);
    }

    public get roomContentLoader(): RoomContentLoader {
        return this._roomContentLoader;
    }

    public isWhereYouClickWhereYouGo(): boolean {
        return this._SafeStr_7561 && !this.isAreaSelectionMode();
    }

    public isAreaSelectionMode(): boolean {
        return this._areaSelectionManager.areaSelectionState != RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public setMoveBlocked(param1: boolean): void {
        this._SafeStr_7059 = param1;
    }

    public isMoveBlocked(): boolean {
        return this._SafeStr_7059;
    }

    public get areaSelectionManager(): IRoomAreaSelectionManager {
        return this._areaSelectionManager;
    }

    protected override initInstanceFields(): void {
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onContentLoaderReady = this.onContentLoaderReady.bind(this);
        this.onRoomSessionEvent = this.onRoomSessionEvent.bind(this);
        this.onToolbarClicked = this.onToolbarClicked.bind(this);
        this.captureFurnitureLabelData = this.captureFurnitureLabelData.bind(this);
        this.captureFurnitureRegionData = this.captureFurnitureRegionData.bind(this);
        this.captureWiredFurnitureTransparencyData = this.captureWiredFurnitureTransparencyData.bind(this);
        this.captureWiredFurnitureHighlightData = this.captureWiredFurnitureHighlightData.bind(this);
        this.captureVariableFxStatusData = this.captureVariableFxStatusData.bind(this);
        this.restoreFurnitureLabelData = this.restoreFurnitureLabelData.bind(this);
        this.restoreFurnitureRegionData = this.restoreFurnitureRegionData.bind(this);
        this.restoreWiredFurnitureTransparencyData = this.restoreWiredFurnitureTransparencyData.bind(this);
        this.restoreWiredFurnitureHighlightData = this.restoreWiredFurnitureHighlightData.bind(this);
        this.restoreVariableFxStatusData = this.restoreVariableFxStatusData.bind(this);
        this.roomObjectEventHandler = this.roomObjectEventHandler.bind(this);
        this.showRoomAd = this.showRoomAd.bind(this);
        this.onRoomAdImageLoaded = this.onRoomAdImageLoaded.bind(this);
        this.onBadgeLoaded = this.onBadgeLoaded.bind(this);
        this.onFurniIconLoaded = this.onFurniIconLoaded.bind(this);
        this._communication = null;
        this._roomRendererFactory = null;
        this._roomManager = null;
        this._roomObjectFactory = null;
        this._visualizationFactory = null;
        this._adManager = null;
        this._sessionDataManager = null;
        this._roomSessionManager = null;
        this._habboTracking = null;
        this._toolbar = null;
        this._catalog = null;
        this._eventHandler = null;
        this._SafeStr_2849 = null;
        this._roomContentLoader = null;
        this._SafeStr_7394 = false;
        this._isInitialized = false;
        this._activeRoomId = 0;
        this._SafeStr_3235 = -1;
        this._SafeStr_5277 = 0;
        this._SafeStr_4941 = 0;
        this._SafeStr_3051 = false;
        this._SafeStr_2716 = false;
        this._SafeStr_7010 = 0;
        this._SafeStr_7063 = 0;
        this._roomDraggingAlwaysCenters = false;
        this._SafeStr_2799 = null;
        this._SafeStr_2626 = null;
        this._skipFurnitureCreationForNextFrame = false;
        this._mouseCursorUpdate = false;
        this._SafeStr_2732 = null;
        this._SafeStr_2774 = null;
        this._isGameMode = false;
        this._playerUnderCursor = -1;
        this._mouseEventsDisabledAboveY = 0;
        this._mouseEventsDisabledLeftToX = 0;
        this._SafeStr_14622 = null;
        this._clickThroughUsers = null;
        this._SafeStr_14623 = null;
        this._SafeStr_7561 = true;
        this._SafeStr_7059 = false;
        super.initInstanceFields();
    }

    get [IRoomEngine](): true {
        return true;
    }

    get [IRoomCreator](): true {
        return true;
    }

    get [IRoomEngineServices](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
