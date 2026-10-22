import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class AvatarImageWidget implements IAvatarImageWidget, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::AvatarImageWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "avatar_image";
    private static readonly FIGURE_KEY: string = "avatar_image:figure";
    private static readonly SCALE_KEY: string = "avatar_image:scale";
    private static readonly _SafeStr_7644: string = "avatar_image:only_head";
    private static readonly CROPPED_KEY: string = "avatar_image:cropped";
    private static readonly _SafeStr_7582: string = "avatar_image:direction";
    private static readonly _SafeStr_8616: string = "avatar_image:zoomX";
    private static readonly _SafeStr_8758: string = "avatar_image:zoomY";
    private static readonly _SafeStr_3917: any[] = ["northeast", "east", "southeast", "south", "southwest", "west", "northwest", "north"];

    private static get FIGURE_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.FIGURE_DEFAULT;
    }

    private static get SCALE_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.SCALE_DEFAULT;
    }

    private static get ONLY_HEAD_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.ONLY_HEAD_DEFAULT;
    }

    private static get CROPPED_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.CROPPED_DEFAULT;
    }

    private static get DIRECTION_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.DIRECTION_DEFAULT;
    }

    private static get ZOOM_X_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.ZOOM_X_DEFAULT;
    }

    private static get ZOOM_Y_DEFAULT(): PropertyStruct {
        AvatarImageWidget.#initStatics();
        return AvatarImageWidget.ZOOM_Y_DEFAULT;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _bitmap: IBitmapWrapperWindow;

    declare private _SafeStr_2394: IRegionWindow;

    private _figure: string = String(AvatarImageWidget.FIGURE_DEFAULT.value);
    private _SafeStr_6454: boolean = false;
    private _scale: string = String(AvatarImageWidget.SCALE_DEFAULT.value);
    private _onlyHead: boolean = Boolean(AvatarImageWidget.ONLY_HEAD_DEFAULT.value);
    private _cropped: boolean = Boolean(AvatarImageWidget.CROPPED_DEFAULT.value);
    private _direction: number = AvatarImageWidget._SafeStr_3917.indexOf(String(AvatarImageWidget.DIRECTION_DEFAULT.value));
    private _zoomX: number = Number(AvatarImageWidget.ZOOM_X_DEFAULT.value);
    private _zoomY: number = Number(AvatarImageWidget.ZOOM_Y_DEFAULT.value);

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _SafeStr_4292: boolean;
    static { (this.prototype as any)._SafeStr_4292 = false; }

    private readonly rc: number = 0.3333333333333333;
    private readonly gc: number = 0.3333333333333333;
    private readonly bc: number = 0.3333333333333333;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("avatar_image_xml").content, XML)), isIWindowContainer);
        this._bitmap = asGuarded(this._root.findChildByName("bitmap"), isIBitmapWrapperWindow);
        this._SafeStr_2394 = asGuarded(this._root.findChildByName("region"), isIRegionWindow);
        this._SafeStr_2394.addEventListener("WME_CLICK", this.onClick);
        this.refresh();
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    private static cleanupAvatarString(param1: string): string {
        return param1 == null || param1.length == 0 ? String(AvatarImageWidget.FIGURE_DEFAULT.value) : param1.replace(/NaN/g, "");
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2394 != null) {
                this._SafeStr_2394.removeEventListener("WME_CLICK", this.onClick);
                this._SafeStr_2394.dispose();
                this._SafeStr_2394 = null;
            }
            this._bitmap = null;
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            if (this._SafeStr_4292) {
                this._windowManager.avatarRenderer.events.removeEventListener("AVATAR_RENDER_READY", this.onAvatarRendererReady);
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(AvatarImageWidget.FIGURE_DEFAULT.withValue(this._figure));
        _loc1_.push(AvatarImageWidget.SCALE_DEFAULT.withValue(this._scale));
        _loc1_.push(AvatarImageWidget.ONLY_HEAD_DEFAULT.withValue(this._onlyHead));
        _loc1_.push(AvatarImageWidget.CROPPED_DEFAULT.withValue(this._cropped));
        _loc1_.push(AvatarImageWidget.DIRECTION_DEFAULT.withValue(AvatarImageWidget._SafeStr_3917[this._direction]));
        _loc1_.push(AvatarImageWidget.ZOOM_X_DEFAULT.withValue(this._zoomX));
        _loc1_.push(AvatarImageWidget.ZOOM_Y_DEFAULT.withValue(this._zoomY));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "avatar_image:figure":
                    this.figure = String(_loc2_.value);
                    break;
                case "avatar_image:scale":
                    this.scale = String(_loc2_.value);
                    break;
                case "avatar_image:only_head":
                    this.onlyHead = Boolean(_loc2_.value);
                    break;
                case "avatar_image:cropped":
                    this.cropped = Boolean(_loc2_.value);
                    break;
                case "avatar_image:direction":
                    this.direction = AvatarImageWidget._SafeStr_3917.indexOf(String(_loc2_.value));
                    break;
                case "avatar_image:zoomX":
                    this.zoomX = Number(_loc2_.value);
                    break;
                case "avatar_image:zoomY":
                    this.zoomY = Number(_loc2_.value);
            }
        }
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        if (param1 != this._figure) {
            this._SafeStr_6454 = param1 == null || param1.length == 0;
            this._figure = AvatarImageWidget.cleanupAvatarString(param1);
            this.refresh();
        }
    }

    public get scale(): string {
        return this._scale;
    }

    public set scale(param1: string) {
        if (param1 != this._scale) {
            this._scale = param1;
            this.refresh();
        }
    }

    public get onlyHead(): boolean {
        return this._onlyHead;
    }

    public set onlyHead(param1: boolean) {
        if (param1 != this._onlyHead) {
            this._onlyHead = param1;
            this.refresh();
        }
    }

    public get cropped(): boolean {
        return this._cropped;
    }

    public set cropped(param1: boolean) {
        if (param1 != this._cropped) {
            this._cropped = param1;
            this.refresh();
        }
    }

    public get direction(): number {
        return this._direction;
    }

    public set direction(param1: number) {
        if (param1 != this._direction) {
            this._direction = param1;
            this.refresh();
        }
    }

    public get zoomX(): number {
        return this._zoomX;
    }

    public set zoomX(param1: number) {
        if (param1 != this._zoomX) {
            this._zoomX = param1;
            this.refresh();
        }
    }

    public get zoomY(): number {
        return this._zoomY;
    }

    public set zoomY(param1: number) {
        if (param1 != this._zoomY) {
            this._zoomY = param1;
            this.refresh();
        }
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        if (this._userId != param1) {
            this._userId = param1;
            this._SafeStr_2394.visible = this._userId > 0;
        }
    }

    public avatarImageReady(param1: string): void {
        if (AvatarImageWidget.cleanupAvatarString(param1) == this._figure) {
            this.refresh();
        }
    }

    private onAvatarRendererReady = (param1: Event): void => {
        this._SafeStr_4292 = false;
        this._windowManager.avatarRenderer.events.removeEventListener("AVATAR_RENDER_READY", this.onAvatarRendererReady);
        this.refresh();
    };

    private refresh(): void {
        let _loc3_: number = NaN;
        let _loc1_: IAvatarImage = null;
        let _loc2_: string = null;
        this._bitmap.bitmap = null;
        if (this._windowManager.avatarRenderer != null) {
            if (!this._windowManager.avatarRenderer.isReady) {
                if (!this._SafeStr_4292) {
                    this._windowManager.avatarRenderer.events.addEventListener("AVATAR_RENDER_READY", this.onAvatarRendererReady);
                    this._SafeStr_4292 = true;
                }
            } else {
                _loc3_ = this._scale == "h" ? 1 : 0.5;
                _loc1_ = this._windowManager.avatarRenderer.createAvatarImage(this._figure, "h", null, this);
                if (_loc1_ != null) {
                    _loc1_.setDirection(this._onlyHead ? "head" : "full", this._direction);
                    if (this._cropped) {
                        this._bitmap.bitmap = _loc1_.getCroppedImage(this._onlyHead ? "head" : "full", _loc3_);
                    } else {
                        this._bitmap.bitmap = _loc1_.getImage(this._onlyHead ? "head" : "full", true, _loc3_);
                    }
                    if (this._SafeStr_6454) {
                        this.greyBitmap(this._bitmap);
                    }
                    this._bitmap.disposesBitmap = true;
                    _loc1_.dispose();
                }
            }
        }
        if (this._bitmap.bitmap == null || this._bitmap.bitmap.width < 2) {
            _loc2_ = "placeholder_avatar" + (this._scale == "sh" ? "_small" : "") + (this._onlyHead ? "_head" : "") + (this._cropped ? "_cropped" : "") + "_png";
            this._bitmap.bitmap = asInstanceOf(this._windowManager.assets.getAssetByName(_loc2_).content, BitmapData);
            this._bitmap.disposesBitmap = false;
            this.greyBitmap(this._bitmap);
        }
        if (this._zoomX != 1 || this._zoomY != 1) {
            this._bitmap.bitmap = this.zoomBitmapData(this._bitmap.bitmap, this._zoomX, this._zoomY);
            this._bitmap.disposesBitmap = true;
        }
        this._bitmap.invalidate();
        this._SafeStr_2293.width = this._bitmap.bitmap.width;
        this._SafeStr_2293.height = this._bitmap.bitmap.height;
    }

    private zoomBitmapData(param1: BitmapData, param2: number, param3: number): BitmapData {
        let _loc4_: BitmapData = new BitmapData(param1.width * param2 | 0, param1.height * param3 | 0, true, 0);
        let _loc5_: Matrix = new Matrix();
        _loc5_.scale(param2, param3);
        _loc4_.draw(param1, _loc5_);
        return _loc4_;
    }

    private greyBitmap(param1: IBitmapWrapperWindow): void {
        this._bitmap.bitmap.applyFilter(this._bitmap.bitmap, this._bitmap.bitmap.rect, new Point(), new ColorMatrixFilter([0.3333333333333333, 0.3333333333333333, 0.3333333333333333, 0, 0, 0.3333333333333333, 0.3333333333333333, 0.3333333333333333, 0, 0, 0.3333333333333333, 0.3333333333333333, 0.3333333333333333, 0, 0, 0, 0, 0, 1, 0]));
    }

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._userId > 0) {
            this._windowManager.communication.connection.send(new GetExtendedProfileMessageComposer(this._userId));
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarImageWidget.#staticsReady) return;
        AvatarImageWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarImageWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("FIGURE_DEFAULT", null);
        set("SCALE_DEFAULT", null);
        set("ONLY_HEAD_DEFAULT", null);
        set("CROPPED_DEFAULT", null);
        set("DIRECTION_DEFAULT", null);
        set("ZOOM_X_DEFAULT", null);
        set("ZOOM_Y_DEFAULT", null);
        set("FIGURE_DEFAULT", new PropertyStruct("avatar_image:figure", "hd-180-1.ch-210-66.lg-270-82.sh-290-81", "String"));
        set("SCALE_DEFAULT", new PropertyStruct("avatar_image:scale", "h", "String", false, ["sh", "h"]));
        set("ONLY_HEAD_DEFAULT", new PropertyStruct("avatar_image:only_head", false, "Boolean"));
        set("CROPPED_DEFAULT", new PropertyStruct("avatar_image:cropped", false, "Boolean"));
        set("DIRECTION_DEFAULT", new PropertyStruct("avatar_image:direction", AvatarImageWidget._SafeStr_3917[2], "String", false, AvatarImageWidget._SafeStr_3917));
        set("ZOOM_X_DEFAULT", new PropertyStruct("avatar_image:zoomX", 1, "Number"));
        set("ZOOM_Y_DEFAULT", new PropertyStruct("avatar_image:zoomY", 1, "Number"));
    }

    get [IAvatarImageWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
