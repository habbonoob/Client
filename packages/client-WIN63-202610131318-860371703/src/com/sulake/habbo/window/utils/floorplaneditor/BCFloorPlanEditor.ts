import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BuildersClubSubscriptionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BuildersClubSubscriptionStatusMessageParser';
import type { PerkAllowancesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/perk/PerkAllowancesMessageParser';
import type { RoomVisualizationSettingsParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomVisualizationSettingsParser';
import type { RoomEntryTileMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/layout/RoomEntryTileMessageParser';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { BuildersClubSubscriptionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BuildersClubSubscriptionStatusMessageEvent';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { FloorHeightMapMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FloorHeightMapMessageEvent';
import { RoomVisualizationSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomVisualizationSettingsEvent';
import { RoomEntryTileMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/layout/RoomEntryTileMessageEvent';
import { RoomOccupiedTilesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/layout/RoomOccupiedTilesMessageEvent';
import { GetOccupiedTilesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/layout/GetOccupiedTilesMessageComposer';
import { GetRoomEntryTileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/layout/GetRoomEntryTileMessageComposer';
import { UpdateFloorPropertiesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/layout/UpdateFloorPropertiesMessageComposer';
import { ImportExportDialog } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor.group';
import { FloorPlanCache } from '@/com/sulake/habbo/window/utils/floorplaneditor/FloorPlanCache';
import { FloorPlanPreviewer } from '@/com/sulake/habbo/window/utils/floorplaneditor/FloorPlanPreviewer';
import { HeightMapEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/HeightMapEditor';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

const floor_plan_editor_layout_binAsset = embedBytes("window/floor_plan_editor_layout.bin");
const floor_plan_editor_export_import_binAsset = embedBytes("window/floor_plan_editor_export_import.bin");

export class BCFloorPlanEditor implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.floorplaneditor::BCFloorPlanEditor'); }

    private static readonly PREVIEW_UPDATE_MS: number = 2000;
    private static readonly WALL_HEIGHT_LIMIT: number = 16;

    public static floor_plan_editor_layout = floor_plan_editor_layout_binAsset;

    public static floor_plan_editor_export_import = floor_plan_editor_export_import_binAsset;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _floorHeightMapMessageEvent: FloorHeightMapMessageEvent;

    declare private _entryTileDataMessageEvent: RoomEntryTileMessageEvent;

    declare private _occupiedTilesMessageEvent: RoomOccupiedTilesMessageEvent;

    declare private _roomVisualizationSettingsMessageEvent: RoomVisualizationSettingsEvent;

    declare private _buildersClubSubscriptionStatusMessageEvent: BuildersClubSubscriptionStatusMessageEvent;

    declare private _perkAllowancesMessageEvent: PerkAllowancesMessageEvent;

    declare private _floorPlanCache: FloorPlanCache;

    declare private _floorPlanPreviewer: FloorPlanPreviewer;

    declare private _heightMapEditor: HeightMapEditor;

    declare private _importExportDialog: ImportExportDialog;

    declare private _lastReceivedMapEvent: FloorHeightMapMessageEvent;

    declare private _editorWindow: IFrameWindow;

    private _drawModes: any[] = ["add_tile", "remove_tile", "increase_height", "decrease_height", "set_enter_tile"];
    private _drawMode: string = stringOrNull(this._drawModes[0]);

    declare private _floorThickness: number;
    static { (this.prototype as any)._floorThickness = 0; }

    declare private _wallThickness: number;
    static { (this.prototype as any)._wallThickness = 0; }

    declare private _msSinceLastPreviewUpdate: number;
    static { (this.prototype as any)._msSinceLastPreviewUpdate = 0; }

    private _bcSecondsLeft: number = 0;

    declare private _bcSecondsCountdownTimer: Timer;

    private _largeFloorPlansAllowed: boolean = false;

    declare private _fixedWallsHeight: number;
    static { (this.prototype as any)._fixedWallsHeight = 0; }

    private _colorMapMouseDown: boolean = false;
    private _wallHeightSliderMouseDown: boolean = false;

    constructor(param1: HabboWindowManagerComponent) {
        this._floorPlanCache = new FloorPlanCache(this);
        this._windowManager = param1;
        if (this._windowManager.communication != null) {
            this._floorHeightMapMessageEvent = new FloorHeightMapMessageEvent(this.onFloorHeightMap);
            this._entryTileDataMessageEvent = new RoomEntryTileMessageEvent(this.onEntryTileData);
            this._occupiedTilesMessageEvent = new RoomOccupiedTilesMessageEvent(this.onOccupiedTiles);
            this._roomVisualizationSettingsMessageEvent = new RoomVisualizationSettingsEvent(this.onRoomVisualizationSettings);
            this._buildersClubSubscriptionStatusMessageEvent = new BuildersClubSubscriptionStatusMessageEvent(this.onBcStatus);
            this._perkAllowancesMessageEvent = new PerkAllowancesMessageEvent(this.onPerkAllowances);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._floorHeightMapMessageEvent);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._buildersClubSubscriptionStatusMessageEvent);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._entryTileDataMessageEvent);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._occupiedTilesMessageEvent);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._roomVisualizationSettingsMessageEvent);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._perkAllowancesMessageEvent);
        }
        if (param1.roomEngine) {
            param1.roomEngine.events.addEventListener("REE_DISPOSED", this.onRoomDisposed);
        }
        param1.registerUpdateReceiver(this, 0);
    }

    public static getThicknessSettingBySelectionIndex(param1: number): number {
        switch (param1) {
            case 0:
                return -2;
            case 1:
                return -1;
            case 3:
                return 1;
            default:
                return 0;
        }
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._floorHeightMapMessageEvent != null) {
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._floorHeightMapMessageEvent);
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._entryTileDataMessageEvent);
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._occupiedTilesMessageEvent);
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._roomVisualizationSettingsMessageEvent);
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._buildersClubSubscriptionStatusMessageEvent);
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._perkAllowancesMessageEvent);
            this._floorHeightMapMessageEvent = null;
            this._entryTileDataMessageEvent = null;
            this._occupiedTilesMessageEvent = null;
            this._roomVisualizationSettingsMessageEvent = null;
        }
        if (this.windowManager.roomEngine && !this.windowManager.roomEngine.disposed) {
            this.windowManager.roomEngine.events.removeEventListener("REE_DISPOSED", this.onRoomDisposed);
        }
        this._windowManager.removeUpdateReceiver(this);
        this._windowManager = null;
    }

    public get disposed(): boolean {
        return this._windowManager == null;
    }

    private onBcStatus = (param1: BuildersClubSubscriptionStatusMessageEvent): void => {
        let _loc2_: BuildersClubSubscriptionStatusMessageParser = param1.getParser();
        this._bcSecondsLeft = _loc2_.secondsLeft;
        if (!this._bcSecondsCountdownTimer) {
            this._bcSecondsCountdownTimer = new Timer(10000);
            this._bcSecondsCountdownTimer.addEventListener("timer", this.onBcCountdownTimerEvent);
            this._bcSecondsCountdownTimer.start();
        }
    };

    private onBcCountdownTimerEvent = (param1: TimerEvent): void => {
        this._bcSecondsLeft -= 10;
        if (this._editorWindow && this._editorWindow.visible) {
            if (this._bcSecondsLeft > 0 || this._windowManager.sessionDataManager.hasSecurity(4)) {
                this._editorWindow.findChildByName("save").enable();
            } else {
                this._editorWindow.findChildByName("save").disable();
            }
        }
    };

    public set visible(param1: boolean) {
        if (this._editorWindow == null || Boolean(this._editorWindow.disposed)) {
            if (!param1) {
                return;
            }
            this.createEditorWindow();
        }
        this._editorWindow.visible = param1;
        if (param1) {
            this._windowManager.communication.connection.send(new GetRoomEntryTileMessageComposer());
            this._windowManager.communication.connection.send(new GetOccupiedTilesMessageComposer());
            this.updateThicknessSelection();
            this.centerScrollableViews();
            this.updateWallHeight(this._fixedWallsHeight);
        } else {
            this._heightMapEditor.colorPickMode = false;
        }
    }

    public get visible(): boolean {
        return this._editorWindow != null && Boolean(this._editorWindow.visible);
    }

    private createEditorWindow(): void {
        let _loc1_: ByteArray = asInstanceOf(new BCFloorPlanEditor.floor_plan_editor_layout(), ByteArray);
        let _loc2_: XML = new XML(_loc1_.readUTFBytes(_loc1_.length));
        this._editorWindow = asGuarded(this._windowManager.buildFromXML(_loc2_, 1), isIFrameWindow);
        this._editorWindow.enableLookupCache();
        this._editorWindow.procedure = this.editorWindowProcedure;
        this._editorWindow.findChildByName("tile_height_colormap").procedure = this.colorMapWindowProcedure;
        this._editorWindow.findChildByName("wall_height_slider").procedure = this.wallHeightSliderProcedure;
        this._editorWindow.center();
        this._floorPlanPreviewer = new FloorPlanPreviewer(this);
        this._heightMapEditor = new HeightMapEditor(this);
        _loc1_ = asInstanceOf(new BCFloorPlanEditor.floor_plan_editor_export_import(), ByteArray);
        this._importExportDialog = new ImportExportDialog(this, new XML(_loc1_.readUTFBytes(_loc1_.length)));
        this._floorPlanPreviewer.updatePreview();
        this._heightMapEditor.refreshFromCache();
        this.createTileHeightColorMap(this._heightMapEditor.heigthColorMap);
        this.setDrawMode("add_tile");
        if (!this._windowManager.sessionDataManager.hasSecurity(4) && this._bcSecondsLeft <= 0) {
            this._editorWindow.findChildByName("save").disable();
        }
    }

    public update(param1: number): void {
        if (this._drawMode != "" && this._editorWindow) {
            for (const _loc2_ of this._drawModes ?? []) {
                if (this._drawMode == _loc2_) {
                    castTo(this._editorWindow.findChildByName(stringOrNull(_loc2_)), InteractiveController).state = (castTo(this._editorWindow.findChildByName(stringOrNull(_loc2_)), InteractiveController).state | 0x10) >>> 0;
                } else {
                    castTo(this._editorWindow.findChildByName(stringOrNull(_loc2_)), InteractiveController).state = (castTo(this._editorWindow.findChildByName(stringOrNull(_loc2_)), InteractiveController).state & ~0x10) >>> 0;
                }
            }
        }
        this._msSinceLastPreviewUpdate += param1;
        if (this._msSinceLastPreviewUpdate > 2000 && this._floorPlanPreviewer) {
            this._floorPlanPreviewer.updatePreview();
            this._msSinceLastPreviewUpdate = 0;
        }
    }

    private get isWallHeightSettingSelected(): boolean {
        return castGuarded(this._editorWindow.findChildByName("walls_fixed_height_enabled_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected;
    }

    private editorWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "header_button_close":
                case "cancel":
                    this.visible = false;
                    break;
                case "refresh":
                    this._floorPlanPreviewer.updatePreview();
                    break;
                case "save":
                    this._floorThickness = castGuarded(this._editorWindow.findChildByName("floor_thickness_drop"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
                    this._wallThickness = castGuarded(this._editorWindow.findChildByName("wall_thickness_drop"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
                    this._windowManager.communication.connection.send(new UpdateFloorPropertiesMessageComposer(this._floorPlanCache.getData(), this._floorPlanCache.entryPoint.x | 0, this._floorPlanCache.entryPoint.y | 0, this._floorPlanCache.entryPointDir, BCFloorPlanEditor.getThicknessSettingBySelectionIndex(this._wallThickness), BCFloorPlanEditor.getThicknessSettingBySelectionIndex(this._floorThickness), this.isWallHeightSettingSelected ? this._fixedWallsHeight : -1));
                    break;
                case "reload":
                    this._floorPlanCache.onFloorHeightMap(this._lastReceivedMapEvent);
                    if (this._floorPlanPreviewer) {
                        this._floorPlanPreviewer.updatePreview();
                    }
                    if (this._heightMapEditor) {
                        this._heightMapEditor.refreshFromCache();
                    }
                    this._windowManager.communication.connection.send(new GetOccupiedTilesMessageComposer());
                    this._windowManager.communication.connection.send(new GetRoomEntryTileMessageComposer());
                    break;
                case "import_export":
                    this._importExportDialog.visible = !this._importExportDialog.visible;
                    break;
                case "enterdirection_left":
                    this._floorPlanCache.entryPointDir++;
                    this.updateEntryDirectionAvatar();
                    break;
                case "enterdirection_right":
                    this._floorPlanCache.entryPointDir--;
                    this.updateEntryDirectionAvatar();
                    break;
                case "zoom":
                    if (this._heightMapEditor.zoomLevel == 1) {
                        this._heightMapEditor.zoomLevel = 2;
                    } else {
                        this._heightMapEditor.zoomLevel = 1;
                    }
                    this._heightMapEditor.refreshFromCache();
                    break;
                case "walls_fixed_height_enabled_checkbox":
                    this.enableWallHeightControls(this.isWallHeightSettingSelected);
                    if (this.isWallHeightSettingSelected && this._fixedWallsHeight == -1) {
                        this._fixedWallsHeight = parseInt(this._editorWindow.findChildByName("wall_height_number").caption) - 1 | 0;
                    }
            }
            if (this._drawModes.indexOf(param2.name) != -1) {
                this.setDrawMode(param2.name);
            }
        }
    };

    public onKeyboardEvent(param1: KeyboardEvent): void {
        if (param1.type == "keyDown") {
            switch (param1.keyCode) {
                case 107:
                    this._heightMapEditor.drawingHeight++;
                    break;
                case 109:
                    this._heightMapEditor.drawingHeight++;
                    break;
                case 16:
                    if (this._heightMapEditor) {
                        this._heightMapEditor.colorPickMode = true;
                    }
            }
        } else if (param1.type == "keyUp") {
            if (param1.keyCode == 16) {
                if (this._heightMapEditor) {
                    this._heightMapEditor.colorPickMode = false;
                }
            }
        }
    }

    private setDrawMode(param1: string): void {
        this._drawMode = param1;
    }

    private colorMapWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: WindowMouseEvent = null;
        let _loc4_: any = 0;
        if (param1.type == "WME_DOWN") {
            this._colorMapMouseDown = true;
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            this._colorMapMouseDown = false;
        } else if (param1.type == "WME_CLICK" || this._colorMapMouseDown && param1.type == "WME_MOVE") {
            _loc3_ = param1 instanceof WindowMouseEvent ? param1 : null;
            _loc4_ = _loc3_.localX / this._editorWindow.findChildByName("tile_height_colormap").width * this._heightMapEditor.heigthColorMap.length >>> 0;
            this.updateColorSliderTrack(_loc4_ >>> 0);
            this._heightMapEditor.drawingHeight = _loc4_ | 0;
        }
    };

    public updateColorSliderTrack(param1: number): void {
        this._editorWindow.findChildByName("tile_height_slider_track").x = param1 * (Number(this._editorWindow.findChildByName("tile_height_colormap").width) / this._heightMapEditor.heigthColorMap.length) | 0;
    }

    private wallHeightSliderProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: WindowMouseEvent = null;
        let _loc4_: any = 0;
        if (param1.type == "WME_DOWN") {
            this._wallHeightSliderMouseDown = true;
        } else if (param1.type == "WME_UP" || param1.type == "WME_UP_OUTSIDE") {
            this._wallHeightSliderMouseDown = false;
        } else if (param1.type == "WME_CLICK" || this._wallHeightSliderMouseDown && param1.type == "WME_MOVE") {
            _loc3_ = param1 instanceof WindowMouseEvent ? param1 : null;
            _loc4_ = _loc3_.localX / this._editorWindow.findChildByName("wall_height_slider").width * 16 >>> 0;
            this.updateWallHeight(_loc4_ | 0);
            this._fixedWallsHeight = _loc4_ | 0;
        }
        param1.stopPropagation();
    };

    public updateWallHeight(param1: number): void {
        if (param1 == -1) {
            castGuarded(this._editorWindow.findChildByName("walls_fixed_height_enabled_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").unselect();
            this.enableWallHeightControls(false);
        } else {
            castGuarded(this._editorWindow.findChildByName("walls_fixed_height_enabled_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").select();
            this.enableWallHeightControls(true);
            this._editorWindow.findChildByName("wall_height_number").caption = (param1 + 1).toString();
            this._editorWindow.findChildByName("wall_height_slider_track").x = param1 * (Number(this._editorWindow.findChildByName("wall_height_slider").width) / 16) | 0;
        }
    }

    private enableWallHeightControls(param1: boolean): void {
        if (param1) {
            this._editorWindow.findChildByName("wall_height_text").enable();
            this._editorWindow.findChildByName("wall_height_number").enable();
            this._editorWindow.findChildByName("wall_height_slider").enable();
            this._editorWindow.findChildByName("wall_height_slider_track").enable();
            this._editorWindow.findChildByName("wall_height_text").blend = 1;
            this._editorWindow.findChildByName("wall_height_number").blend = 1;
            this._editorWindow.findChildByName("wall_height_slider").blend = 1;
            this._editorWindow.findChildByName("wall_height_slider_track").blend = 1;
        } else {
            this._editorWindow.findChildByName("wall_height_text").disable();
            this._editorWindow.findChildByName("wall_height_number").disable();
            this._editorWindow.findChildByName("wall_height_slider").disable();
            this._editorWindow.findChildByName("wall_height_slider_track").disable();
            this._editorWindow.findChildByName("wall_height_text").blend = 0.6;
            this._editorWindow.findChildByName("wall_height_number").blend = 0.6;
            this._editorWindow.findChildByName("wall_height_slider").blend = 0.6;
            this._editorWindow.findChildByName("wall_height_slider_track").blend = 0.6;
        }
    }

    private onFloorHeightMap = (param1: FloorHeightMapMessageEvent): void => {
        this._lastReceivedMapEvent = param1;
        this._floorPlanCache.onFloorHeightMap(param1);
        this._fixedWallsHeight = param1.getParser().fixedWallsHeight;
        if (this._floorPlanPreviewer) {
            this._floorPlanPreviewer.updatePreview();
        }
        if (this._heightMapEditor) {
            this._heightMapEditor.refreshFromCache();
        }
        if (this._editorWindow) {
            this.updateWallHeight(this._fixedWallsHeight);
        }
    };

    private onEntryTileData = (param1: RoomEntryTileMessageEvent): void => {
        if (!this._editorWindow) {
            return;
        }
        let _loc2_: RoomEntryTileMessageParser = param1.getParser();
        this._floorPlanCache.entryPoint = new Point(_loc2_.x, _loc2_.y);
        this._floorPlanCache.entryPointDir = _loc2_.dir | 0;
        if (this._heightMapEditor) {
            this._heightMapEditor.refreshFromCache();
        }
        this.updateEntryDirectionAvatar();
    };

    private onOccupiedTiles = (param1: RoomOccupiedTilesMessageEvent): void => {
        this._floorPlanCache.onOccupiedTiles(param1);
        if (this._heightMapEditor) {
            this._heightMapEditor.refreshFromCache();
        }
    };

    private onRoomVisualizationSettings = (param1: RoomVisualizationSettingsEvent): void => {
        let _loc2_: RoomVisualizationSettingsParser = param1.getParser();
        this._floorThickness = this.getThicknessSelectionIndex(_loc2_.floorThicknessMultiplier);
        this._wallThickness = this.getThicknessSelectionIndex(_loc2_.wallThicknessMultiplier);
        this.updateThicknessSelection();
    };

    private onPerkAllowances = (param1: PerkAllowancesMessageEvent): void => {
        let _loc2_: PerkAllowancesMessageParser = param1.getParser();
        this._largeFloorPlansAllowed = _loc2_.isPerkAllowed("BUILDER_AT_WORK");
    };

    public updatePreviewBitmap(param1: BitmapData): void {
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._editorWindow.findChildByName("preview_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = param1;
    }

    private createTileHeightColorMap(param1: any[][]): void {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: any = 0;
        let _loc6_: IBitmapWrapperWindow = asGuarded(this._editorWindow.findChildByName("tile_height_colormap"), isIBitmapWrapperWindow);
        _loc6_.bitmap = new BitmapData(_loc6_.width, _loc6_.height, false, 0);
        let _loc3_: Rectangle = new Rectangle(0, 0, 1, _loc6_.height);
        _loc4_ = 0;
        while (_loc4_ < _loc6_.width) {
            _loc5_ = _loc4_ / _loc6_.width * param1.length | 0;
            _loc2_ = (255 * param1[_loc5_][0] >>> 0 << 16) + (255 * param1[_loc5_][1] >>> 0 << 8) + (255 * param1[_loc5_][2] >>> 0) >>> 0;
            _loc3_.x = _loc4_;
            _loc6_.bitmap.fillRect(_loc3_, _loc2_ >>> 0);
            _loc4_++;
        }
    }

    private updateEntryDirectionAvatar(): void {
        let _loc1_: IAvatarImageWidget = asGuarded(castGuarded(this._editorWindow.findChildByName("enterdirection_ghost_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget);
        _loc1_.direction = this._floorPlanCache.entryPointDir;
    }

    private getThicknessSelectionIndex(param1: number): number {
        switch (param1) {
            case 0.25:
                return 0;
            case 0.5:
                return 1;
            case 2:
                return 3;
            default:
                return 2;
        }
    }

    private updateThicknessSelection(): void {
        if (this._editorWindow) {
            castGuarded(this._editorWindow.findChildByName("wall_thickness_drop"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection = this._wallThickness;
            castGuarded(this._editorWindow.findChildByName("floor_thickness_drop"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection = this._floorThickness;
        }
    }

    private centerScrollableViews(): void {
        let _loc1_: IScrollbarWindow = asGuarded(this._editorWindow.findChildByName("heightmap_scroll_horizontal"), isIScrollbarWindow);
        let _loc2_: IScrollbarWindow = asGuarded(this._editorWindow.findChildByName("heightmap_scroll_vertical"), isIScrollbarWindow);
        let _loc4_: IScrollbarWindow = asGuarded(this._editorWindow.findChildByName("preview_scroll_horizontal"), isIScrollbarWindow);
        let _loc3_: IScrollbarWindow = asGuarded(this._editorWindow.findChildByName("preview_scroll_vertical"), isIScrollbarWindow);
        _loc1_.scrollH = 0.5;
        _loc2_.scrollV = 0.5;
        _loc4_.scrollH = 0.5;
        _loc3_.scrollV = 0.5;
    }

    private onRoomDisposed = (param1: RoomEngineEvent): void => {
        this.visible = false;
    };

    public get windowManager(): HabboWindowManagerComponent {
        return this._windowManager;
    }

    public get heightMapBitmapElement(): IBitmapWrapperWindow {
        return asGuarded(this._editorWindow.findChildByName("heightmap_bitmap"), isIBitmapWrapperWindow);
    }

    public get heightMapMouseCapturer(): IRegionWindow {
        return asGuarded(this._editorWindow.findChildByName("mouse_capturer"), isIRegionWindow);
    }

    public get floorPlanCache(): FloorPlanCache {
        return this._floorPlanCache;
    }

    public get drawModes(): any[] {
        return this._drawModes;
    }

    public get drawMode(): string {
        return this._drawMode;
    }

    public get heightMapEditor(): HeightMapEditor {
        return this._heightMapEditor;
    }

    public get largeFloorPlansAllowed(): boolean {
        return this._largeFloorPlansAllowed;
    }

    public get lastReceivedFloorPlan(): string {
        if (this._lastReceivedMapEvent) {
            return this._lastReceivedMapEvent.getParser().text;
        }
        return "";
    }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public get bcSecondsLeft(): number {
        return this._bcSecondsLeft;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
