import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RenderRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomMessageComposer';
import type { CameraWidget } from '@/com/sulake/habbo/ui/widget/camera/CameraWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { JSON } from '@habbo-pixi/runtime/json/JSON';
import { SharedObject } from '@habbo-pixi/runtime/net/SharedObject';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { CameraSlotData } from '@/com/sulake/habbo/ui/widget/camera/CameraSlotData';

export class CameraViewFinder implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraViewFinder'); }

    private static readonly _SafeStr_8506: number = 350;
    private static readonly NUMBER_OF_SLOTS: number = 5;
    private static _SafeStr_5130: boolean = false;
    private static _shotImages: CameraSlotData[] = new Array<CameraSlotData>(5).fill(null);
    private static _renderRoomMessages: RenderRoomMessageComposer[] = new Array<RenderRoomMessageComposer>(5).fill(null);

    declare private _widget: CameraWidget;

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    declare private _SafeStr_2341: IBitmapWrapperWindow;

    declare private _flash: IBitmapWrapperWindow;

    declare private _imageWidth: number;
    static { (this.prototype as any)._imageWidth = 0; }

    declare private _SafeStr_6256: number;
    static { (this.prototype as any)._SafeStr_6256 = 0; }

    private _previewImageMode: boolean = false;
    private _SafeStr_2248: number = 0;
    private _isLoadingFromCache: boolean = false;

    declare private _imageLoader: Loader;

    private _flashStartTime: number = 0;

    constructor(param1: CameraWidget) {
        let _loc2_: IWindow = null;
        this._widget = param1;
        this.openViewFinder();
        this._SafeStr_2248 = 0;
        while (this._SafeStr_2248 < 5) {
            this.clearCurrentSlot(true);
            this._SafeStr_2248 = this._SafeStr_2248 + 1;
        }
        this._SafeStr_2248 = 0;
        let _loc3_: boolean = this.getFromMemoryCache();
        if (_loc3_) {
            _loc2_ = this._window.findChildByName("slot_container");
            _loc2_.visible = true;
        }
        this.setMode(false);
        this.setActiveSlot(0);
        this._flash = asGuarded(this._window.findChildByName("flash"), isIBitmapWrapperWindow);
        this._flash.bitmap = new BitmapData(this._flash.width, this._flash.height, false, 16777215);
        this._flash.visible = false;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._flash = null;
        this._SafeStr_2341 = null;
        this._widget.component.removeUpdateReceiver(this);
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private openViewFinder(): void {
        if (this._window != null) {
            return;
        }
        this._window = asGuarded(this._widget.getXmlWindow("camera_interface"), isIWindowContainer);
        this._window.center();
        this._window.visible = false;
        this._SafeStr_2341 = asGuarded(this._window.findChildByName("image"), isIBitmapWrapperWindow);
        this._imageWidth = this._SafeStr_2341.width;
        this._SafeStr_6256 = this._SafeStr_2341.height;
        this._SafeStr_2341.visible = true;
        this._window.procedure = this.windowProcedure;
    }

    public update(param1: number): void {
        if (this._previewImageMode) {
            return;
        }
        if (this._SafeStr_2341.bitmap == null) {
            this._SafeStr_2341.bitmap = new BitmapData(this._imageWidth, this._SafeStr_6256, false, 0);
        }
        this._SafeStr_2341.bitmap.fillRect(this._SafeStr_2341.bitmap.rect, this._widget.handler.roomDesktop.roomBackgroundColor);
        let _loc3_: Matrix = new Matrix();
        let _loc2_: Rectangle = this.getViewPort();
        _loc3_.translate(-_loc2_.x, -_loc2_.y);
        this._widget.snapShotRoomCanvas(this._SafeStr_2341.bitmap, _loc3_, false);
        this._SafeStr_2341.invalidate();
        if (this._flashStartTime > 0) {
            this.updateFlash();
        }
    }

    private updateFlash(): void {
        this._flash.visible = true;
        let _loc2_: number = getTimer() - this._flashStartTime;
        let _loc1_: number = (350 - _loc2_) / 350;
        this._flash.blend = _loc1_;
        if (_loc2_ > 350) {
            this._flashStartTime = 0;
            this._flash.visible = false;
        }
    }

    public getViewPort(): Rectangle {
        let _loc1_: IWindow = isIWindow(this._window) ? this._window : null;
        return new Rectangle(this._window.x + this._SafeStr_2341.x, this._window.y + this._SafeStr_2341.y, this._SafeStr_2341.width, this._SafeStr_2341.height);
    }

    public toggleVisible(param1: string): void {
        if (this._window.visible) {
            this.hide();
        } else {
            HabboTracking.getInstance().trackEventLog("Stories", "camera", "stories.camera.opened", param1);
            this.show();
            this.setMode(false);
        }
    }

    public show(): void {
        this._window.visible = true;
        // brought to the front: the window is built on entering the room, so whatever opened since stood over it
        this._window.activate();
        this._window.center();
        this._widget.component.registerUpdateReceiver(this, 100);
    }

    public hide(): void {
        this._window.visible = false;
        this._widget.component.removeUpdateReceiver(this);
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: IStaticBitmapWrapperWindow = null;
        let _loc4_: RenderRoomMessageComposer = null;
        let _loc3_: IWindow = null;
        let _loc6_: string = null;
        let _loc7_: CameraSlotData = null;
        let _loc8_: number = 0;
        if (param2.name == "button_release") {
            _loc5_ = castGuarded(this._window.findChildByName("release_bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            switch (param1.type) {
                case "WME_DOWN":
                    _loc5_.assetUri = "camera_camera_btn_down";
                    break;
                case "WME_UP":
                    _loc5_.assetUri = "camera_cam_btn_hi";
                    break;
                case "WME_OVER":
                    _loc5_.assetUri = "camera_cam_btn_hi";
                    break;
                case "WME_OUT":
                    _loc5_.assetUri = "camera_camera_btn";
            }
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param1.target.name) {
            case "header_button_close":
                this.hide();
                break;
            case "button_editor":
                this.hide();
                this._widget.editPhoto(this._SafeStr_2341.bitmap.clone());
                break;
            case "delete_photo_button":
                this.clearCurrentSlot();
                this.setMode(false);
                break;
            case "header_button_help":
                this._widget.component.context.createLinkEvent("habbopages/camera");
                break;
            case "button_release":
                if (this._previewImageMode) {
                    this.setMode(false);
                } else {
                    this._widget.triggetCameraShutterSound();
                    _loc4_ = this._widget.handler.collectPhotoData();
                    if (_loc4_ != null && _loc4_.isSendable()) {
                        CameraViewFinder._renderRoomMessages[this._SafeStr_2248] = _loc4_;
                        this.addToCurrentSlot(this._SafeStr_2341.bitmap.clone());
                        this._flashStartTime = getTimer() >>> 0;
                        HabboTracking.getInstance().trackEventLog("Stories", "camera", "stories.photo.taken");
                        _loc3_ = this._window.findChildByName("slot_container");
                        _loc3_.visible = true;
                    } else {
                        this._widget.windowManager.alert("${generic.alert.title}", "${camera.alert.too_much_stuff}", 0, null);
                    }
                }
        }
        if (param1.target.name.indexOf("cameraButton_") != -1) {
            _loc6_ = param1.target.name.charAt(param1.target.name.length - 1);
            if (CameraViewFinder._shotImages[Number(_loc6_) | 0].isEmpty) {
                this.setActiveSlot(Number(_loc6_) | 0);
                this.setMode(false);
                return;
            }
            _loc7_ = CameraViewFinder._shotImages[Number(_loc6_) | 0];
            this._SafeStr_2341.bitmap = _loc7_.image.clone();
            this.setMode(true);
            this.setActiveSlot(Number(_loc6_) | 0);
        }
        if (param1.target.name.indexOf("chooseSlotButton_") != -1) {
            _loc8_ = Number(param1.target.name.charAt(param1.target.name.length - 1)) | 0;
            if (CameraViewFinder._shotImages.length < _loc8_) {
                return;
            }
            this.setActiveSlot(_loc8_);
            this.setMode(false);
        }
    };

    private setActiveSlot(param1: number): void {
        (asGuarded(this._window.findChildByName("slotImage_" + this._SafeStr_2248), isIStaticBitmapWrapperWindow)).assetUri = "camera_arrow_gray";
        this._SafeStr_2248 = param1;
        (asGuarded(this._window.findChildByName("slotImage_" + this._SafeStr_2248), isIStaticBitmapWrapperWindow)).assetUri = "camera_arrow_green";
        let _loc2_: IWindow = this._window.findChildByName("photo_border");
        let _loc4_: IWindow = this._window.findChildByName("cameraButton_" + this._SafeStr_2248);
        _loc2_.x = _loc4_.x - 1 + _loc4_.parent.x;
        _loc2_.y = _loc4_.y - 3 + _loc4_.parent.y;
        _loc2_.visible = true;
        let _loc3_: IWindow = this._window.findChildByName("delete_photo_button");
        _loc3_.y = _loc2_.y;
        _loc3_.x = _loc2_.right - _loc3_.width;
    }

    private setMode(param1: boolean): void {
        this._previewImageMode = param1;
        let _loc3_: IWindow = this._window.findChildByName("button_editor");
        let _loc5_: IWindow = this._window.findChildByName("camera_crosshair");
        let _loc2_: IWindow = this._window.findChildByName("photo_date");
        let _loc7_: IWindow = this._window.findChildByName("photo_roomname");
        let _loc6_: IWindow = this._window.findChildByName("buyButtonBg");
        _loc2_.visible = _loc7_.visible = false;
        let _loc4_: IWindow = this._window.findChildByName("delete_photo_button");
        _loc5_.visible = !param1;
        _loc4_.visible = _loc3_.visible = _loc6_.visible = param1;
    }

    private onPurchaseError(param1: Event): void {
        let _loc2_: any = null;
        try {
            _loc2_ = JSON.decode(stringOrNull(castTo(param1.target, URLLoader).data));
            switch (_loc2_.error.code) {
                case "PURCHASING_FAILED":
                    this._widget.windowManager.alert("Something went wrong", "sorry, purhcase failed. We will investigate the issue. #code 1", 0, null);
                    break;
                case "MODERATED":
                    this._widget.windowManager.alert("Inappropriate text", "Your photo caption contained inappropriate words. They were changed to bobba. Please edit the text and try again.", 0, null);
                    this._widget.changeCaptionFieldText(stringOrNull(_loc2_.error.message), true);
            }
        } catch (error) {
            this._widget.windowManager.alert("Something went wrong", "sorry, purhcase failed. We will investigate the issue. # code 2", 0, null);
        }
    }

    private getFromMemoryCache(): boolean {
        let _loc2_: number = 0;
        let _loc1_: boolean = false;
        _loc2_ = 0;
        while (_loc2_ < CameraViewFinder._shotImages.length) {
            if (CameraViewFinder._shotImages[_loc2_].isEmpty == false) {
                this.drawImageToSlot(_loc2_, CameraViewFinder._shotImages[_loc2_]);
                _loc1_ = true;
            }
            _loc2_++;
        }
        return _loc1_;
    }

    private drawImageToSlot(param1: number, param2: CameraSlotData): void {
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("cameraSlot_" + param1), isIBitmapWrapperWindow);
        _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height, false, 0);
        let _loc3_: number = (_loc4_.width - 2) / this._imageWidth;
        let _loc5_: Matrix = new Matrix();
        _loc5_.scale(_loc3_, _loc3_);
        _loc5_.tx = _loc5_.ty = 1;
        _loc4_.bitmap.draw(param2.image, _loc5_, null, null, null, true);
    }

    private getFromLocalCache(): boolean {
        let _loc2_: SharedObject = null;
        try {
            _loc2_ = SharedObject.getLocal("camera_image_" + this._SafeStr_2248);
        } catch (error) {
            return false;
        }
        if (_loc2_.size == 0 || !_loc2_.data) {
            return false;
        }
        let _loc1_: ByteArray = asInstanceOf(_loc2_.data.photo, ByteArray);
        if (!_loc1_) {
            return false;
        }
        if (!this._imageLoader) {
            this._imageLoader = new Loader();
        }
        this._imageLoader.loadBytes(_loc1_);
        this._imageLoader.contentLoaderInfo.addEventListener("complete", this.onImageLoadedFromCache);
        let _loc3_: CameraSlotData = new CameraSlotData();
        _loc3_.setDate(new Date());
        if ((_loc2_.data.date | 0) > 0) {
            _loc3_.setDate(new Date(_loc2_.data.date | 0));
        }
        CameraViewFinder._shotImages[this._SafeStr_2248] = _loc3_;
        return true;
    }

    private onImageLoadedFromCache = (param1: Event): void => {
        let _loc2_: BitmapData = new BitmapData(this._imageLoader.width | 0, this._imageLoader.height | 0, false);
        _loc2_.draw(this._imageLoader);
        CameraViewFinder._shotImages[this._SafeStr_2248].image = _loc2_.clone();
        this.addToCurrentSlot(_loc2_, false, true);
        if (this._SafeStr_2248 < 5 && this._isLoadingFromCache) {
            this.getFromLocalCache();
            if (this._SafeStr_2248 == 5 - 1) {
                this._isLoadingFromCache = false;
            }
        } else {
            CameraViewFinder._SafeStr_5130 = true;
        }
    };

    private findNextEmptySlotIndex(): number {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < CameraViewFinder._shotImages.length) {
            if (CameraViewFinder._shotImages[_loc1_].isEmpty) {
                return _loc1_;
            }
            _loc1_++;
        }
        return -1;
    }

    private clearCurrentSlot(param1: boolean = false): void {
        if (param1 && CameraViewFinder._shotImages[this._SafeStr_2248] && !CameraViewFinder._shotImages[this._SafeStr_2248].isEmpty) {
            return;
        }
        CameraViewFinder._shotImages[this._SafeStr_2248] = null;
        this.addToCurrentSlot(new BitmapData(320, 320, false, 13816530), true);
        this._SafeStr_2341.bitmap = CameraViewFinder._shotImages[this._SafeStr_2248].image.clone();
        this.setMode(false);
    }

    private addToCurrentSlot(param1: BitmapData, param2: boolean = false, param3: boolean = false): void {
        let _loc5_: number = 0;
        let _loc4_: CameraSlotData = new CameraSlotData();
        _loc4_.image = param1;
        if (param2) {
            _loc4_.isEmpty = true;
        } else {
            _loc4_.setDate(new Date());
            _loc4_.isEmpty = false;
        }
        if (!param3 && !param2 || CameraViewFinder._shotImages[this._SafeStr_2248] == null) {
            CameraViewFinder._shotImages[this._SafeStr_2248] = _loc4_;
        }
        this.drawImageToSlot(this._SafeStr_2248, _loc4_);
        if (!param2) {
            _loc5_ = this.findNextEmptySlotIndex();
            if (_loc5_ >= 0) {
                this.setActiveSlot(_loc5_);
            } else if (!CameraViewFinder._SafeStr_5130 && !param3) {
                this._widget.windowManager.alert(this._widget.localizations.getLocalization("camera.full.header"), this._widget.localizations.getLocalization("camera.full.body"), 0, null);
                CameraViewFinder._SafeStr_5130 = true;
            }
        }
    }

    public getRenderRoomMessage(): RenderRoomMessageComposer {
        return CameraViewFinder._renderRoomMessages[this._SafeStr_2248];
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
