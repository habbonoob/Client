import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CursedDragonAdoptionController } from '@/com/sulake/habbo/catalog/cursed_dragon_adoption/CursedDragonAdoptionController';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomObjectUserTypes } from '@/com/sulake/habbo/room/object/RoomObjectUserTypes';
import { isIRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class CursedDragonPreviewView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.cursed_dragon_adoption::CursedDragonPreviewView'); }

    private static readonly CANVAS_ID: number = 1;
    private static readonly PET_TYPE: number = 37;
    private static readonly ZOOM: number = 2;
    private static readonly _SafeStr_14841: number = 24000;
    private static readonly PERCH_Y: number = 18;

    declare private _controller: CursedDragonAdoptionController;

    declare private _window: IWindowContainer;

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_4176: RoomPreviewer;

    declare private _canvas: Sprite;

    declare private _background: Bitmap;

    declare private _SafeStr_14842: boolean;
    static { (this.prototype as any)._SafeStr_14842 = false; }

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    declare private _SafeStr_14843: number;
    static { (this.prototype as any)._SafeStr_14843 = 0; }

    private _postures: string[] = new Array<string>(2).fill(null);

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: CursedDragonAdoptionController, param2: IWindowContainer) {
        this._controller = param1;
        this._window = param2;
        this._roomEngine = param1.roomEngine;
        this._SafeStr_4176 = (asGuarded(this.previewWidget.widget, isIRoomPreviewerWidget)).roomPreviewer;
        this._SafeStr_4176.disableUpdate = true;
        this.previewWidget.visible = false;
    }

    public show(): void {
        if (this._visible) {
            return;
        }
        this._visible = true;
        this._SafeStr_14843 = 0;
        this._controller.registerUpdateReceiver(this, 1);
        this.update(0);
    }

    public hide(): void {
        if (!this._visible) {
            return;
        }
        this._visible = false;
        this._controller.removeUpdateReceiver(this);
        this.previewWidget.visible = false;
        if (this._SafeStr_14842) {
            this._roomEngine.disposeObjectUser(this._SafeStr_4176.previewRoomId, 1);
            this._roomEngine.disposeObjectUser(this._SafeStr_4176.previewRoomId, 2);
            this._SafeStr_14842 = false;
        }
    }

    public update(param1: number): void {
        if (!this._visible || !this._SafeStr_4176.isRoomEngineReady) {
            return;
        }
        if (this._canvas == null && !this.initializeCanvas()) {
            return;
        }
        if (!this._SafeStr_14842) {
            this.addPet(1, 0, 2, this.bluePackage);
            this.addPet(2, 1, 4, this.purplePackage);
            this._SafeStr_14842 = true;
            this._postures[0] = this._postures[1] = "";
        }
        if (this._roomEngine.getPetColor(37, 0) == null || this._roomEngine.getPetColor(37, 1) == null) {
            return;
        }
        this.previewWidget.visible = true;
        this._SafeStr_14843 = (this._SafeStr_14843 + param1) % 24000 >>> 0;
        this.setPosture(1, this._SafeStr_14843 >= 3000 && this._SafeStr_14843 < 7000 ? "flm" : (this._SafeStr_14843 >= 11000 && this._SafeStr_14843 < 17000 ? "eat" : "std"));
        this.setPosture(2, this._SafeStr_14843 >= 5000 && this._SafeStr_14843 < 9000 ? "flm" : (this._SafeStr_14843 >= 13000 && this._SafeStr_14843 < 19000 ? "eat" : "std"));
    }

    private initializeCanvas(): boolean {
        let _loc3_: IWindowContainer = asGuarded(this.previewWidget.rootWindow, isIWindowContainer);
        let _loc4_: IDisplayObjectWrapper = asGuarded(_loc3_.findChildByName("room_canvas"), isIDisplayObjectWrapper);
        let _loc1_: Sprite = asInstanceOf(_loc4_.getDisplayObject(), Sprite);
        if (_loc1_ == null || this._roomEngine.getRoomCanvasGeometry(this._SafeStr_4176.previewRoomId, 1) == null || this.sceneBackground.bitmapData == null || this.bluePackage.bitmapData == null || this.purplePackage.bitmapData == null) {
            return false;
        }
        this._canvas = _loc1_;
        this._SafeStr_4176.modifyRoomCanvas(this.previewWidget.width / 2 | 0, this.previewWidget.height / 2 | 0);
        this._SafeStr_4176.updateRoomWallsAndFloorVisibility(false, false);
        this._roomEngine.setRoomCanvasScreenOffset(this._SafeStr_4176.previewRoomId, 1, new Point());
        this._canvas.scaleX = this._canvas.scaleY = 2;
        this._canvas.mouseEnabled = this._canvas.mouseChildren = false;
        let _loc2_: BitmapData = new BitmapData(this.previewWidget.width, this.previewWidget.height, false, 0);
        this.drawWindowBitmap(_loc2_, this.sceneBackground);
        this.drawWindowBitmap(_loc2_, this.bluePackage);
        this.drawWindowBitmap(_loc2_, this.purplePackage);
        this._background = new Bitmap(_loc2_, "auto", false);
        this._background.scaleX = this._background.scaleY = 1 / 2;
        this._canvas.addChildAt(this._background, 0);
        this._canvas.blendMode = "layer";
        return true;
    }

    private drawWindowBitmap(param1: BitmapData, param2: IStaticBitmapWrapperWindow): void {
        let _loc3_: Point = this.relativePosition(param2);
        param1.draw(param2.bitmapData, new Matrix(param2.zoomX, 0, 0, param2.zoomY, _loc3_.x, _loc3_.y), null, null, null, false);
    }

    private addPet(param1: number, param2: number, param3: number, param4: IStaticBitmapWrapperWindow): void {
        let _loc8_: Point = this.relativePosition(param4);
        _loc8_.x = _loc8_.x + param4.width / 2;
        _loc8_.y += 18 * param4.zoomY;
        let _loc7_: IRoomGeometry = this._roomEngine.getRoomCanvasGeometry(this._SafeStr_4176.previewRoomId, 1);
        let _loc6_: Point = new Point(_loc8_.x / 2 - (this.previewWidget.width / 2 / 2 | 0), _loc8_.y / 2 - (this.previewWidget.height / 2 / 2 | 0));
        let _loc5_: Point = _loc7_.getPlanePosition(_loc6_, new Vector3d(), new Vector3d(1, 0, 0), new Vector3d(0, 1, 0));
        this._roomEngine.addObjectUser(this._SafeStr_4176.previewRoomId, param1, new Vector3d(_loc5_.x, _loc5_.y, 0), new Vector3d(param3 * 45), param3 * 45, RoomObjectUserTypes.getTypeId("pet"), "37 " + param2 + " ffffff");
        this._roomEngine.updateObjectUserPosture(this._SafeStr_4176.previewRoomId, param1, "std");
    }

    private setPosture(param1: number, param2: string): void {
        if (this._postures[param1 - 1] != param2) {
            this._postures[param1 - 1] = param2;
            this._roomEngine.updateObjectUserPosture(this._SafeStr_4176.previewRoomId, param1, param2);
        }
    }

    private relativePosition(param1: IWindow): Point {
        let _loc3_: Point = new Point();
        let _loc2_: Point = new Point();
        param1.getGlobalPosition(_loc3_);
        this.previewWidget.getGlobalPosition(_loc2_);
        return _loc3_.subtract(_loc2_);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.hide();
        this._disposed = true;
        if (this._background != null) {
            this._canvas.removeChild(this._background);
            this._background.bitmapData.dispose();
            this._background.bitmapData = null;
            this._background = null;
        }
        this._roomEngine.disposeRoom(this._SafeStr_4176.previewRoomId);
        this._canvas = null;
        this._SafeStr_4176 = null;
        this._roomEngine = null;
        this._window = null;
        this._controller = null;
    }

    private get previewWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("dragon_live_preview"), isIWidgetWindow);
    }

    private get sceneBackground(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("scene_background"), isIStaticBitmapWrapperWindow);
    }

    private get bluePackage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("blue_package"), isIStaticBitmapWrapperWindow);
    }

    private get purplePackage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("purple_package"), isIStaticBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
