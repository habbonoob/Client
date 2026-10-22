import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import type { FriendFurniEngravingWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingWidget';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IllegalOperationError } from '@habbo-pixi/runtime/errors/IllegalOperationError';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class FriendFurniEngravingView implements IAvatarImageListener, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.friendfurni::FriendFurniEngravingView'); }

    declare private _stuffData: StringArrayStuffData;

    declare private _widget: FriendFurniEngravingWidget;

    private _window: IWindowContainer = null;
    private _disposed: boolean = false;

    constructor(param1: FriendFurniEngravingWidget, param2: StringArrayStuffData) {
        this._widget = param1;
        this._stuffData = param2;
    }

    private static setElementImage(param1: IWindow, param2: BitmapData, param3: number = 0, param4: number = 0, param5: number = 0): void {
        let _loc9_: IBitmapWrapperWindow = null;
        let _loc6_: IDisplayObjectWrapper = null;
        if (param2 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (param1.disposed) {
            return;
        }
        let _loc10_: number = param3 > 0 ? param3 : param1.height;
        let _loc7_: number = (param1.width - param2.width) / 2 + param4 | 0;
        let _loc8_: number = (_loc10_ - param2.height) / 2 + param5 | 0;
        if ((isIBitmapWrapperWindow(param1) ? param1 : null) != null) {
            _loc9_ = castGuarded(param1, isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc9_.bitmap == null || param3 > 0) {
                _loc9_.bitmap = new BitmapData(param1.width, _loc10_, true, 0);
            }
            _loc9_.bitmap.fillRect(_loc9_.bitmap.rect, 0);
            _loc9_.bitmap.copyPixels(param2, param2.rect, new Point(_loc7_, _loc8_), null, null, false);
            param1.invalidate();
        } else if ((isIDisplayObjectWrapper(param1) ? param1 : null) != null) {
            _loc6_ = castGuarded(param1, isIDisplayObjectWrapper, "com.sulake.core.window.components.IDisplayObjectWrapper");
            _loc6_.setDisplayObject(new Bitmap(param2));
        }
    }

    protected get stuffData(): StringArrayStuffData {
        return this._stuffData;
    }

    protected get widget(): FriendFurniEngravingWidget {
        return this._widget;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this.disposed) {
            this.destroyWindow();
            this._widget = null;
            this._stuffData = null;
            this._disposed = true;
        }
    }

    public open(): void {
        this.createWindow();
    }

    public close(): void {
        this.destroyWindow();
    }

    protected assetName(): string {
        throw new IllegalOperationError("Must implement in concrete view!");
    }

    private createWindow(): void {
        let _loc2_: IAvatarImage = null;
        let _loc1_: IAvatarImage = null;
        if (!this._window) {
            this._window = castGuarded(this.widget.windowManager.buildFromXML(XML.from(this.widget.assets.getAssetByName(this.assetName()).content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._window.procedure = this.windowProc;
            this._window.center();
            this._window.findChildByName("name_left").caption = this.stuffData.getValue(1);
            this._window.findChildByName("name_right").caption = this.stuffData.getValue(2);
            this._window.findChildByName("date").caption = this.stuffData.getValue(5);
            _loc2_ = this.widget.engravingWidgetHandler.container.avatarRenderManager.createAvatarImage(this.stuffData.getValue(3), "h", null, this);
            _loc1_ = this.widget.engravingWidgetHandler.container.avatarRenderManager.createAvatarImage(this.stuffData.getValue(4), "h", null, this);
            if (!_loc2_.isPlaceholder()) {
                this.setAvatarImage("avatar_left", _loc2_.getCroppedImage("full"));
            }
            if (!_loc1_.isPlaceholder()) {
                _loc1_.setDirection("full", 4);
                this.setAvatarImage("avatar_right", _loc1_.getCroppedImage("full"));
            }
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc3_: IAvatarImage = null;
        let _loc2_: IAvatarImage = null;
        if (param1 == this.stuffData.getValue(3)) {
            _loc3_ = this.widget.engravingWidgetHandler.container.avatarRenderManager.createAvatarImage(this.stuffData.getValue(3), "h", null, this);
            this.setAvatarImage("avatar_left", _loc3_.getCroppedImage("full"));
        }
        if (param1 == this.stuffData.getValue(4)) {
            _loc2_ = this.widget.engravingWidgetHandler.container.avatarRenderManager.createAvatarImage(this.stuffData.getValue(4), "h", null, this);
            _loc2_.setDirection("full", 4);
            this.setAvatarImage("avatar_right", _loc2_.getCroppedImage("full"));
        }
    }

    private setAvatarImage(param1: string, param2: BitmapData): void {
        let _loc3_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        FriendFurniEngravingView.setElementImage(_loc3_, param2, 0, 0, 0);
    }

    private destroyWindow(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    private windowProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            let _loc3_: string = param2.name;
            if ("header_button_close" === _loc3_) {
                this.widget.close(this.widget.stuffId);
            }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
