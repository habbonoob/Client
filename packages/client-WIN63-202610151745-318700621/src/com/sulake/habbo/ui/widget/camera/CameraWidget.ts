import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { CameraPublishStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraPublishStatusMessageEvent';
import type { CompetitionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CompetitionStatusMessageEvent';
import type { RenderRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomMessageComposer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { CameraWidgetHandler } from '@/com/sulake/habbo/ui/handler/CameraWidgetHandler';
import { RoomDesktop } from '@/com/sulake/habbo/ui/RoomDesktop';
import { CameraPhotoLab } from '@/com/sulake/habbo/ui/widget/camera/CameraPhotoLab';
import { CameraViewFinder } from '@/com/sulake/habbo/ui/widget/camera/CameraViewFinder';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class CameraWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraWidget'); }

    declare private _component: RoomUI;

    declare private _SafeStr_2953: CameraViewFinder;

    declare private _SafeStr_2256: CameraPhotoLab;

    declare public url: string;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: ICoreConfiguration, param5: IHabboLocalizationManager, param6: RoomUI) {
        super(param1, param2, param3, param5);
        this._component = param6;
        this.handler.widget = this;
        this._SafeStr_2953 = new CameraViewFinder(this);
        if (this.roomEngine) {
            this.roomEngine.events.addEventListener("REE_DISPOSED", this.onRoomDisposed);
            this.roomEngine.events.addEventListener("REE_ROOM_ZOOMED", this.onRoomZoomed);
        }
        this.handler.sendInitCameraMessage();
        let _loc7_: IHabboQuestEngine = this.handler.roomDesktop.questEngine;
        if (_loc7_ != null) {
            _loc7_.ensureAchievementsInitialized();
        }
    }

    public get catalog(): IHabboCatalog {
        return this._component.catalog;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2953) {
            this._SafeStr_2953.dispose();
            this._SafeStr_2953 = null;
        }
        if (this._SafeStr_2256) {
            this._SafeStr_2256.dispose();
            this._SafeStr_2256 = null;
        }
        super.dispose();
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this.handler ? this.handler.container : null;
    }

    public get handler(): CameraWidgetHandler {
        return this._SafeStr_2143 instanceof CameraWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get roomEngine(): IRoomEngine {
        return this.container ? this.container.roomEngine : null;
    }

    public startTakingPhoto(param1: string): void {
        if (this.roomEngine && (this.roomEngine.getRoomCanvasScale() < 1 || this.roomEngine.getRoomCanvasIsFlipped())) {
            this.windowManager.alert(this._SafeStr_2259.getLocalization("camera.zoom.missing.header"), this._SafeStr_2259.getLocalization("camera.zoom.missing.body"), 0, null);
            return;
        }
        if (this.component.getProperty("camera.effects.enabled") == "true") {
            CameraPhotoLab.preloadEffects(this._component.context.configuration.getProperty("image.library.url"), this._component.getProperty("camera.available.effects"), this._SafeStr_2259);
        }
        if (this._SafeStr_2256) {
            this._SafeStr_2256.dispose();
        }
        this._SafeStr_2953.toggleVisible(param1);
    }

    public get component(): RoomUI {
        return this._component;
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1 + "_xml");
            _loc3_ = castTo(_loc5_, XmlAsset);
            _loc4_ = this.windowManager.buildFromXML(XML.from(_loc3_.content), param2);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboNavigator", "Failed to build window " + param1 + "_xml, " + _loc5_ + ", " + this.windowManager + "!");
            throw e;
        }
        return _loc4_;
    }

    private onRoomDisposed = (param1: RoomEngineEvent): void => {
        this.hide();
    };

    private onRoomZoomed = (param1: RoomEngineEvent): void => {
        if (this.roomEngine && (this.roomEngine.getRoomCanvasScale() < 1 || this.roomEngine.getRoomCanvasIsFlipped())) {
            this.hide();
        }
    };

    private hide(): void {
        if (this._SafeStr_2953) {
            this._SafeStr_2953.hide();
        }
        if (this._SafeStr_2256) {
            this._SafeStr_2256.dispose();
        }
    }

    public snapShotRoomCanvas(param1: BitmapData, param2: Matrix, param3: boolean): boolean {
        let _loc4_: IRoomSession = this.container.roomSession;
        return this.roomEngine.snapshotRoomCanvasToBitmap(_loc4_.roomId, this.container.getFirstCanvasId(), param1, param2, param3);
    }

    public triggetCameraShutterSound(): void {
        this.container.soundManager.playSound("CAMERA_shutter");
    }

    public editPhoto(param1: BitmapData): void {
        this._SafeStr_2256 = new CameraPhotoLab(this);
        this._SafeStr_2256.openPhotoLab(param1);
    }

    public changeCaptionFieldText(param1: string, param2: boolean = false): void {
        if (this._SafeStr_2256) {
            this._SafeStr_2256.setCaptionText(param1);
            if (param2) {
                this._SafeStr_2256.show();
                this._SafeStr_2256.closePurchaseConfirmation();
            }
        }
    }

    public getViewPort(): Rectangle {
        if (this._SafeStr_2953) {
            return this._SafeStr_2953.getViewPort();
        }
        return new Rectangle(0, 0, 0, 0);
    }

    public purchaseSuccessful(): void {
        if (this._SafeStr_2256) {
            this._SafeStr_2256.animateSuccessfulPurchase();
        }
    }

    public setRenderedPhotoUrl(param1: string): void {
        if (this._SafeStr_2256) {
            this._SafeStr_2256.setRenderedPhotoUrl(param1);
        }
    }

    public publishingStatus(param1: CameraPublishStatusMessageEvent): void {
        if (this._SafeStr_2256) {
            this._SafeStr_2256.publishingStatus(param1);
        }
    }

    public competitionStatus(param1: CompetitionStatusMessageEvent): void {
        if (this._SafeStr_2256) {
            this._SafeStr_2256.competitionStatus(param1);
        }
    }

    public sendPhotoData(): boolean {
        let _loc1_: RenderRoomMessageComposer = this._SafeStr_2953.getRenderRoomMessage();
        if (this._SafeStr_2256) {
            _loc1_.addEffectData(this._SafeStr_2256.getEffectDataJson());
            _loc1_.setZoom(this._SafeStr_2256.getZoom());
        }
        _loc1_.compressData();
        if (_loc1_.isSendable()) {
            this.handler.sendPhotoData(_loc1_);
            return true;
        }
        return false;
    }

    public override release(): void {
        super.release();
        (this._SafeStr_2143 instanceof CameraWidgetHandler ? this._SafeStr_2143 : null).roomDesktop = null;
    }

    public override reuse(param1: IRoomDesktop): void {
        super.reuse(param1);
        (this._SafeStr_2143 instanceof CameraWidgetHandler ? this._SafeStr_2143 : null).roomDesktop = param1 instanceof RoomDesktop ? param1 : null;
    }
}
