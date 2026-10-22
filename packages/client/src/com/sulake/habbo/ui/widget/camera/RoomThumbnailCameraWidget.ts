import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { RenderRoomThumbnailMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomThumbnailMessageComposer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { RoomThumbnailCameraWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomThumbnailCameraWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class RoomThumbnailCameraWidget extends RoomWidgetBase implements IUpdateReceiver, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::RoomThumbnailCameraWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: ICoreConfiguration, param5: IHabboLocalizationManager, param6: RoomUI) {
        super(param1, param2, param3, param5);
        this._component = param6;
        this.handler.widget = this;
        if (this.roomEngine) {
            this.roomEngine.events.addEventListener("REE_DISPOSED", this.onRoomDisposed);
            this.roomEngine.events.addEventListener("REE_ROOM_ZOOMED", this.onRoomZoomed);
        }
        (param2 instanceof Component ? param2 : null).context.addLinkEventTracker(this);
    }

    declare private _component: RoomUI;

    private _window: IFrameWindow = null;

    declare private _SafeStr_2341: IBitmapWrapperWindow;

    public get container(): IRoomWidgetHandlerContainer {
        return this.handler ? this.handler.container : null;
    }

    public get handler(): RoomThumbnailCameraWidgetHandler {
        return this._SafeStr_2143 instanceof RoomThumbnailCameraWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get roomEngine(): IRoomEngine {
        return this.container ? this.container.roomEngine : null;
    }

    public get viewPort(): Rectangle {
        let _loc1_: Point = new Point(0, 0);
        this._SafeStr_2341.getGlobalPosition(_loc1_);
        return new Rectangle(_loc1_.x, _loc1_.y, this._SafeStr_2341.width, this._SafeStr_2341.height);
    }

    public get linkPattern(): string {
        return "roomThumbnailCamera";
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        (asInstanceOf(this.windowManager, Component)).context.removeLinkEventTracker(this);
        super.dispose();
    }

    public update(param1: number): void {
        let _loc2_: Point = null;
        let _loc3_: Matrix = null;
        let _loc4_: IRoomSession = null;
        if (this._window && this._SafeStr_2341) {
            if (this._SafeStr_2341.bitmap == null) {
                this._SafeStr_2341.bitmap = new BitmapData(this._SafeStr_2341.width, this._SafeStr_2341.height, false, 0);
            }
            this._SafeStr_2341.bitmap.fillRect(this._SafeStr_2341.bitmap.rect, this.handler.roomDesktop.roomBackgroundColor);
            _loc2_ = new Point(0, 0);
            this._SafeStr_2341.getGlobalPosition(_loc2_);
            _loc3_ = new Matrix();
            _loc3_.translate(-_loc2_.x, -_loc2_.y);
            _loc4_ = this.container.roomSession;
            this.roomEngine.snapshotRoomCanvasToBitmap(_loc4_.roomId, this.container.getFirstCanvasId(), this._SafeStr_2341.bitmap, _loc3_, false);
            this._SafeStr_2341.invalidate();
        }
    }

    public startTakingPhoto(): void {
        if (this.roomEngine && this.roomEngine.getRoomCanvasScale() != 1) {
            this.windowManager.alert("Camera only works on normal zoom!", "Return to normal zoom level and try again!", 0, null);
            return;
        }
        if (!this._window) {
            this.createWindow();
        }
    }

    public destroy(): void {
        if (this._window) {
            this._window.destroy();
            this._window = null;
            this._component.removeUpdateReceiver(this);
        }
    }

    public triggerCameraShutterSound(): void {
        this.container.soundManager.playSound("CAMERA_shutter");
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        let _loc3_: number = _loc2_.length | 0;
        if (_loc3_ < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.startTakingPhoto();
        }
    }

    private createWindow(): void {
        if (this._window) {
            this.destroy();
        }
        this._window = castGuarded(this.windowManager.buildFromXML(XML.from(this._component.assets.getAssetByName("iro_room_thumbnail_camera_xml").content)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._SafeStr_2341 = castGuarded(this._window.findChildByName("viewfinder"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        this._window.procedure = this.windowProcedure;
        this._window.center();
        this._component.registerUpdateReceiver(this, 10);
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: RenderRoomThumbnailMessageComposer = null;
        let _loc4_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        if (_loc4_ && _loc4_.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_capture":
                    this.triggerCameraShutterSound();
                    _loc3_ = this.handler.collectPhotoData();
                    if (_loc3_ != null && _loc3_.isSendable()) {
                        this.handler.sendPhotoData(_loc3_);
                        this._window.findChildByName("button_capture").disable();
                        this._window.findChildByName("button_cancel").disable();
                        this._component.removeUpdateReceiver(this);
                    } else {
                        this.windowManager.alert("${generic.alert.title}", "${camera.alert.too_much_stuff}", 0, null);
                    }
                    return;
                case "header_button_close":
                case "button_cancel":
                    this.destroy();
            }
        }
    };

    private onRoomDisposed = (param1: RoomEngineEvent): void => {
        this.destroy();
    };

    private onRoomZoomed = (param1: RoomEngineEvent): void => {
        if (this.roomEngine && this.roomEngine.getRoomCanvasScale() != 1) {
            this.destroy();
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
