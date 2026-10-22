import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import { IRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';

export class RoomPreviewerWidget implements IRoomPreviewerWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::RoomPreviewerWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "room_previewer";
    private static readonly SCALE_KEY: string = "room_previewer:scale";
    private static readonly _SafeStr_8680: string = "room_previewer:offsetx";
    private static readonly _SafeStr_7638: string = "room_previewer:offsety";
    private static readonly _SafeStr_8241: string = "room_previewer:zoom";

    private static get SCALE_DEFAULT(): PropertyStruct {
        RoomPreviewerWidget.#initStatics();
        return RoomPreviewerWidget.SCALE_DEFAULT;
    }

    private static get OFFSET_X_DEFAULT(): PropertyStruct {
        RoomPreviewerWidget.#initStatics();
        return RoomPreviewerWidget.OFFSET_X_DEFAULT;
    }

    private static get OFFSET_Y_DEFAULT(): PropertyStruct {
        RoomPreviewerWidget.#initStatics();
        return RoomPreviewerWidget.OFFSET_Y_DEFAULT;
    }

    private static get ZOOM_DEFAULT(): PropertyStruct {
        RoomPreviewerWidget.#initStatics();
        return RoomPreviewerWidget.ZOOM_DEFAULT;
    }

    private static ROOM_ID_COUNTER: number = 2;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        if (param2.roomEngine) {
            param2.roomEngine.events.addEventListener("REE_INITIALIZED", this.onRoomInitialized);
        }
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("room_previewer_xml").content, XML)), isIWindowContainer);
        this._SafeStr_2691 = asGuarded(this._root.findChildByName("room_canvas"), isIDisplayObjectWrapper);
        this._roomPreviewer = new RoomPreviewer(param2.roomEngine, RoomPreviewerWidget.ROOM_ID_COUNTER++);
        this._roomPreviewer.createRoomForPreviews();
        this._root.addEventListener("WME_CLICK", this.onClickRoomView);
        this._root.addEventListener("WE_RESIZE", this.onResizeCanvas);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
        this._roomPreviewer.modifyRoomCanvas(this._root.width, this._root.height);
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _SafeStr_2691: IDisplayObjectWrapper;

    declare private _roomPreviewer: RoomPreviewer;

    private _scale: number = RoomPreviewerWidget.SCALE_DEFAULT.value | 0;
    private _zoom: number = RoomPreviewerWidget.ZOOM_DEFAULT.value | 0;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _offsetX: number = 0;

    public get offsetX(): number {
        return this._offsetX;
    }

    public set offsetX(param1: number) {
        this._offsetX = param1;
        this.refresh();
    }

    private _offsetY: number = 0;

    public get offsetY(): number {
        return this._offsetY;
    }

    public set offsetY(param1: number) {
        this._offsetY = param1;
        this.refresh();
    }

    public get scale(): number {
        return this._scale;
    }

    public set scale(param1: number) {
        this._scale = param1;
        this.refresh();
    }

    public get zoom(): number {
        return this._zoom;
    }

    public set zoom(param1: number) {
        this._zoom = param1;
        this.refresh();
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(RoomPreviewerWidget.SCALE_DEFAULT.withValue(this._scale));
        _loc1_.push(RoomPreviewerWidget.OFFSET_X_DEFAULT.withValue(this._offsetX));
        _loc1_.push(RoomPreviewerWidget.OFFSET_Y_DEFAULT.withValue(this._offsetY));
        _loc1_.push(RoomPreviewerWidget.ZOOM_DEFAULT.withValue(this._zoom));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "room_previewer:scale":
                    this.scale = _loc2_.value | 0;
                    break;
                case "room_previewer:offsetx":
                    this.offsetX = _loc2_.value | 0;
                    break;
                case "room_previewer:offsety":
                    this.offsetY = _loc2_.value | 0;
                    break;
                case "room_previewer:zoom":
                    this.zoom = _loc2_.value | 0;
            }
        }
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get roomPreviewer(): RoomPreviewer {
        return this._roomPreviewer;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._roomPreviewer != null) {
                this._roomPreviewer.dispose();
                this._roomPreviewer = null;
            }
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            if (this._windowManager && this._windowManager.roomEngine && this._windowManager.roomEngine.events) {
                this._windowManager.roomEngine.events.removeEventListener("REE_INITIALIZED", this.onRoomInitialized);
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public toString(): string {
        return "RoomPreviewerWidget";
    }

    public showPreview(param1: BitmapData): void {
        let _loc2_: Bitmap = new Bitmap(param1);
        _loc2_.scaleX = 2;
        _loc2_.scaleY = 2;
        this._SafeStr_2691.setDisplayObject(_loc2_);
    }

    private refresh(): void {
        let _loc1_: DisplayObject = null;
        if (this._roomPreviewer && this._roomPreviewer.isRoomEngineReady) {
            this._scale == 64 ? this._roomPreviewer.zoomIn() : this._roomPreviewer.zoomOut();
            this._roomPreviewer.addViewOffset = new Point(this._offsetX, this._offsetY);
            _loc1_ = this._SafeStr_2691.getDisplayObject();
            _loc1_.scaleX = _loc1_.scaleY = this.zoom;
            _loc1_.x = this.offsetX;
            _loc1_.y = this.offsetY;
        }
    }

    private onResizeCanvas = (param1: WindowEvent, param2: IWindow = null): void => {
        let _loc3_: number = param1.window.width;
        let _loc4_: number = param1.window.height;
        this._roomPreviewer.modifyRoomCanvas(_loc3_, _loc4_);
    };

    private onClickRoomView = (param1: WindowMouseEvent): void => {
        this._roomPreviewer.changeRoomObjectState();
    };

    private onRoomInitialized = (param1: RoomEngineEvent): void => {
        let _loc2_: DisplayObject = null;
        let _loc3_: any = param1.type;
        if ("REE_INITIALIZED" === _loc3_) {
            if (this._roomPreviewer && param1.roomId == this._roomPreviewer.previewRoomId) {
                this._roomPreviewer.reset(false);
                _loc2_ = this._roomPreviewer.getRoomCanvas(this._SafeStr_2691.width, this._SafeStr_2691.height);
                if (_loc2_ != null) {
                    this._SafeStr_2691.setDisplayObject(_loc2_);
                }
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomPreviewerWidget.#staticsReady) return;
        RoomPreviewerWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomPreviewerWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("SCALE_DEFAULT", null);
        set("OFFSET_X_DEFAULT", null);
        set("OFFSET_Y_DEFAULT", null);
        set("ZOOM_DEFAULT", null);
        set("SCALE_DEFAULT", new PropertyStruct("room_previewer:scale", 64, "int", false, [32, 64]));
        set("OFFSET_X_DEFAULT", new PropertyStruct("room_previewer:offsetx", 0, "int", false));
        set("OFFSET_Y_DEFAULT", new PropertyStruct("room_previewer:offsety", 0, "int", false));
        set("ZOOM_DEFAULT", new PropertyStruct("room_previewer:zoom", 1, "int", false));
    }

    get [IRoomPreviewerWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
