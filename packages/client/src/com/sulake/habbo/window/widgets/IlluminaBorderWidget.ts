import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IIlluminaBorderWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaBorderWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class IlluminaBorderWidget implements IIlluminaBorderWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::IlluminaBorderWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "illumina_border";
    public static readonly BORDER_STYLE_ILLUMINA_LIGHT: string = "illumina_light";
    public static readonly BORDER_STYLE_ILLUMINA_DARK: string = "illumina_dark";
    public static readonly BORDER_STYLE_KEY: string = "illumina_border:border_style";
    private static readonly CONTENT_CHILD_KEY: string = "illumina_border:content_child";
    private static readonly CONTENT_PADDING_KEY: string = "illumina_border:content_padding";
    private static readonly SIDE_PADDING_KEY: string = "illumina_border:side_padding";
    private static readonly CHILD_MARGIN_KEY: string = "illumina_border:child_margin";
    private static readonly TOP_LEFT_CHILD_KEY: string = "illumina_border:top_left_child";
    private static readonly TOP_CENTER_CHILD_KEY: string = "illumina_border:top_center_child";
    private static readonly TOP_RIGHT_CHILD_KEY: string = "illumina_border:top_right_child";
    private static readonly BOTTOM_LEFT_CHILD_KEY: string = "illumina_border:bottom_left_child";
    private static readonly BOTTOM_CENTER_CHILD_KEY: string = "illumina_border:bottom_center_child";
    private static readonly BOTTOM_RIGHT_CHILD_KEY: string = "illumina_border:bottom_right_child";
    private static readonly LANDING_VIEW_MODE_KEY: string = "illumina_border:landing_view_mode";
    private static readonly TOP_LEFT: string = "top_left";
    private static readonly TOP: string = "top_center";
    private static readonly TOP_RIGHT: string = "top_right";
    private static readonly RIGHT: string = "center_right";
    private static readonly BOTTOM_RIGHT: string = "bottom_right";
    private static readonly BOTTOM: string = "bottom_center";
    private static readonly BOTTOM_LEFT: string = "bottom_left";
    private static readonly _SafeStr_6016: string = "center_left";
    public static readonly BORDER_STYLES: any[] = ["illumina_light", "illumina_dark"];

    private static get CONTENT_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.CONTENT_CHILD_DEFAULT;
    }

    private static get CONTENT_PADDING_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.CONTENT_PADDING_DEFAULT;
    }

    private static get SIDE_PADDING_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.SIDE_PADDING_DEFAULT;
    }

    private static get CHILD_MARGIN_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.CHILD_MARGIN_DEFAULT;
    }

    private static get TOP_LEFT_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.TOP_LEFT_CHILD_DEFAULT;
    }

    private static get TOP_CENTER_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.TOP_CENTER_CHILD_DEFAULT;
    }

    private static get TOP_RIGHT_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.TOP_RIGHT_CHILD_DEFAULT;
    }

    private static get BOTTOM_LEFT_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.BOTTOM_LEFT_CHILD_DEFAULT;
    }

    private static get BOTTOM_CENTER_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.BOTTOM_CENTER_CHILD_DEFAULT;
    }

    private static get BOTTOM_RIGHT_CHILD_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.BOTTOM_RIGHT_CHILD_DEFAULT;
    }

    private static get LANDING_VIEW_MODE_DEFAULT(): PropertyStruct {
        IlluminaBorderWidget.#initStatics();
        return IlluminaBorderWidget.LANDING_VIEW_MODE_DEFAULT;
    }

    private static readonly MATRIX: Matrix = new Matrix();
    private static readonly BORDER_PIECES: any[] = ["top_left", "top_center", "top_right", "center_right", "bottom_right", "bottom_center", "bottom_left", "center_left"];

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("illumina_border_xml").content, XML)), isIWindowContainer);
        this._canvas = asGuarded(this._root.getChildByName("canvas"), isIBitmapWrapperWindow);
        this._children = asGuarded(this._root.getChildByName("children"), isIWindowContainer);
        this.borderStyle = String(this._SafeStr_2293.getDefaultProperty("illumina_border:border_style").value);
        this._SafeStr_2293.addEventListener("WE_RESIZE", this.onChange);
        this._SafeStr_2293.addEventListener("WE_RESIZED", this.onChange);
        this._children.addEventListener("WE_CHILD_ADDED", this.onChange);
        this._children.addEventListener("WE_CHILD_REMOVED", this.onChange);
        this._children.addEventListener("WE_CHILD_RELOCATED", this.onChange);
        this._children.addEventListener("WE_CHILD_RESIZED", this.onChange);
        this._SafeStr_2293.rootWindow = this._root;
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
    }

    declare private _borderPieces: Map<any, any>;

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _canvas: IBitmapWrapperWindow;

    declare private _SafeStr_2414: BitmapData;

    declare private _children: IWindowContainer;

    private _settingProperties: boolean = false;
    private _SafeStr_2809: boolean = false;

    declare private _borderStyle: string;

    private _contentChild: string = String(IlluminaBorderWidget.CONTENT_CHILD_DEFAULT.value);
    private _contentPadding: number = IlluminaBorderWidget.CONTENT_PADDING_DEFAULT.value >>> 0;
    private _sidePadding: number = IlluminaBorderWidget.SIDE_PADDING_DEFAULT.value >>> 0;
    private _topLeftChild: string = String(IlluminaBorderWidget.TOP_LEFT_CHILD_DEFAULT.value);
    private _topCenterChild: string = String(IlluminaBorderWidget.TOP_CENTER_CHILD_DEFAULT.value);
    private _topRightChild: string = String(IlluminaBorderWidget.TOP_RIGHT_CHILD_DEFAULT.value);
    private _bottomLeftChild: string = String(IlluminaBorderWidget.BOTTOM_LEFT_CHILD_DEFAULT.value);
    private _bottomCenterChild: string = String(IlluminaBorderWidget.BOTTOM_CENTER_CHILD_DEFAULT.value);
    private _bottomRightChild: string = String(IlluminaBorderWidget.BOTTOM_RIGHT_CHILD_DEFAULT.value);

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _childMargin: number = IlluminaBorderWidget.CHILD_MARGIN_DEFAULT.value >>> 0;

    public get childMargin(): number {
        return this._childMargin;
    }

    public set childMargin(param1: number) {
        this._childMargin = param1;
        this.refresh();
    }

    private _landingViewMode: boolean = Boolean(IlluminaBorderWidget.LANDING_VIEW_MODE_DEFAULT.value);

    public get landingViewMode(): boolean {
        return this._landingViewMode;
    }

    public set landingViewMode(param1: boolean) {
        this._landingViewMode = param1;
        this.refresh();
    }

    public get iterator(): IIterator {
        return this._children.iterator;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(this._SafeStr_2293.createProperty("illumina_border:border_style", this._borderStyle));
        _loc1_.push(IlluminaBorderWidget.CONTENT_CHILD_DEFAULT.withValue(this._contentChild));
        _loc1_.push(IlluminaBorderWidget.CONTENT_PADDING_DEFAULT.withValue(this._contentPadding));
        _loc1_.push(IlluminaBorderWidget.SIDE_PADDING_DEFAULT.withValue(this._sidePadding));
        _loc1_.push(IlluminaBorderWidget.CHILD_MARGIN_DEFAULT.withValue(this._childMargin));
        _loc1_.push(IlluminaBorderWidget.TOP_LEFT_CHILD_DEFAULT.withValue(this._topLeftChild));
        _loc1_.push(IlluminaBorderWidget.TOP_CENTER_CHILD_DEFAULT.withValue(this._topCenterChild));
        _loc1_.push(IlluminaBorderWidget.TOP_RIGHT_CHILD_DEFAULT.withValue(this._topRightChild));
        _loc1_.push(IlluminaBorderWidget.BOTTOM_LEFT_CHILD_DEFAULT.withValue(this._bottomLeftChild));
        _loc1_.push(IlluminaBorderWidget.BOTTOM_CENTER_CHILD_DEFAULT.withValue(this._bottomCenterChild));
        _loc1_.push(IlluminaBorderWidget.BOTTOM_RIGHT_CHILD_DEFAULT.withValue(this._bottomRightChild));
        _loc1_.push(IlluminaBorderWidget.LANDING_VIEW_MODE_DEFAULT.withValue(this._landingViewMode));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        this._settingProperties = true;
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "illumina_border:border_style":
                    this.borderStyle = String(_loc2_.value);
                    break;
                case "illumina_border:content_child":
                    this.contentChild = String(_loc2_.value);
                    break;
                case "illumina_border:content_padding":
                    this.contentPadding = _loc2_.value >>> 0;
                    break;
                case "illumina_border:side_padding":
                    this.sidePadding = _loc2_.value >>> 0;
                    break;
                case "illumina_border:child_margin":
                    this.childMargin = _loc2_.value >>> 0;
                    break;
                case "illumina_border:top_left_child":
                    this.topLeftChild = String(_loc2_.value);
                    break;
                case "illumina_border:top_center_child":
                    this.topCenterChild = String(_loc2_.value);
                    break;
                case "illumina_border:top_right_child":
                    this.topRightChild = String(_loc2_.value);
                    break;
                case "illumina_border:bottom_left_child":
                    this.bottomLeftChild = String(_loc2_.value);
                    break;
                case "illumina_border:bottom_center_child":
                    this.bottomCenterChild = String(_loc2_.value);
                    break;
                case "illumina_border:bottom_right_child":
                    this.bottomRightChild = String(_loc2_.value);
                    break;
                case "illumina_border:landing_view_mode":
                    this.landingViewMode = Boolean(_loc2_.value);
            }
        }
        this._settingProperties = false;
        this.refresh();
    }

    public get borderStyle(): string {
        return this._borderStyle;
    }

    public set borderStyle(param1: string) {
        this._borderStyle = param1;
        this._borderPieces = new Dictionary();
        for (const _loc2_ of IlluminaBorderWidget.BORDER_PIECES ?? []) {
            this._borderPieces.set(_loc2_, this._windowManager.assets.getAssetByName(this._borderStyle + "_border_" + _loc2_));
        }
        this.refresh();
    }

    public get contentChild(): string {
        return this._contentChild;
    }

    public set contentChild(param1: string) {
        this._contentChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get contentPadding(): number {
        return this._contentPadding;
    }

    public set contentPadding(param1: number) {
        this._contentPadding = param1;
        this.refresh();
    }

    public get sidePadding(): number {
        return this._sidePadding;
    }

    public set sidePadding(param1: number) {
        this._sidePadding = param1;
        this.refresh();
    }

    public get topLeftChild(): string {
        return this._topLeftChild;
    }

    public set topLeftChild(param1: string) {
        this._topLeftChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get topCenterChild(): string {
        return this._topCenterChild;
    }

    public set topCenterChild(param1: string) {
        this._topCenterChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get topRightChild(): string {
        return this._topRightChild;
    }

    public set topRightChild(param1: string) {
        this._topRightChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get bottomLeftChild(): string {
        return this._bottomLeftChild;
    }

    public set bottomLeftChild(param1: string) {
        this._bottomLeftChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get bottomCenterChild(): string {
        return this._bottomCenterChild;
    }

    public set bottomCenterChild(param1: string) {
        this._bottomCenterChild = param1 != null ? param1 : "";
        this.refresh();
    }

    public get bottomRightChild(): string {
        return this._bottomRightChild;
    }

    public set bottomRightChild(param1: string) {
        this._bottomRightChild = param1 != null ? param1 : "";
        this.refresh();
    }

    private get topPadding(): number {
        return Math.max(this.getChildHeight(this._topCenterChild), Math.max(this.getChildHeight(this._topLeftChild), this.getChildHeight(this._topRightChild))) / 2 | 0;
    }

    private get bottomPadding(): number {
        return Math.max(this.getChildHeight(this._bottomCenterChild), Math.max(this.getChildHeight(this._bottomLeftChild), this.getChildHeight(this._bottomRightChild))) / 2 | 0;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2414 != null) {
                this._SafeStr_2414.dispose();
                this._SafeStr_2414 = null;
            }
            if (this._canvas != null) {
                this._canvas.removeEventListener("WE_RESIZE", this.onChange);
                this._canvas.removeEventListener("WE_RESIZED", this.onChange);
                this._canvas = null;
            }
            if (this._children != null) {
                this._children.removeEventListener("WE_CHILD_ADDED", this.onChange);
                this._children.removeEventListener("WE_CHILD_REMOVED", this.onChange);
                this._children.removeEventListener("WE_CHILD_RELOCATED", this.onChange);
                this._children.removeEventListener("WE_CHILD_RESIZED", this.onChange);
                this._children = null;
            }
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._borderPieces = null;
            this._windowManager = null;
            this._disposed = true;
        }
    }

    private onChange = (param1: WindowEvent): void => {
        this.refresh();
    };

    private getPiece(param1: string): BitmapDataAsset {
        return this._borderPieces.get(param1);
    }

    private getChildHeight(param1: string): number {
        let _loc2_: IWindow = this._children.getChildByName(param1);
        return param1 != null && param1.length > 0 && _loc2_ != null ? _loc2_.height : 0;
    }

    private refresh(): void {
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: BitmapDataAsset = null;
        let _loc6_: BitmapData = null;
        let _loc13_: Rectangle = null;
        let _loc4_: Rectangle = null;
        let _loc1_: number = 0;
        let _loc8_: number = 0;
        if (this._settingProperties || this._SafeStr_2809 || this.disposed) {
            return;
        }
        this._root.limits.setEmpty();
        this._root.width = this._SafeStr_2293.width;
        this._root.height = this._SafeStr_2293.height;
        let _loc2_: IWindow = this._children.getChildByName(this._contentChild);
        if (_loc2_ != null) {
            _loc3_ = Math.max(1, _loc2_.width + 2 * this._contentPadding) | 0;
            _loc9_ = Math.max(1, _loc2_.height + 2 * this._contentPadding + this.topPadding + this.bottomPadding) | 0;
            this._SafeStr_2809 = true;
            if (this._SafeStr_2293.testParamFlag(131072)) {
                this._root.limits.minWidth = _loc3_;
                this._root.limits.minHeight = _loc9_;
            }
            if (this._SafeStr_2293.testParamFlag(147456)) {
                this._root.limits.minWidth = _loc3_;
                this._root.limits.minHeight = _loc9_;
                this._root.limits.maxWidth = _loc3_;
                this._root.limits.maxHeight = _loc9_;
            }
            this._SafeStr_2809 = false;
        }
        if (this._SafeStr_2414 == null || this._SafeStr_2414.width != this._root.width || this._SafeStr_2414.height != this._root.height) {
            this._canvas.width = this._root.width;
            this._canvas.height = this._root.height;
            this._children.width = this._root.width;
            this._children.height = this._root.height;
            if (this._SafeStr_2414 != null) {
                this._SafeStr_2414.dispose();
            }
            this._SafeStr_2414 = new BitmapData(this._canvas.width, this._canvas.height, true, 0);
            this._canvas.bitmap = this._SafeStr_2414;
        }
        let _loc12_: Rectangle = this._canvas.rectangle;
        _loc12_.y = _loc12_.y + this.topPadding;
        _loc12_.height -= this.topPadding + this.bottomPadding;
        this._SafeStr_2414.lock();
        this._SafeStr_2414.fillRect(new Rectangle(0, 0, this._canvas.width, this._canvas.height), 0);
        for (const _loc5_ of this._borderPieces?.keys() ?? []) {
            _loc10_ = this.getPiece(stringOrNull(_loc5_));
            if (!(_loc10_ == null || this._landingViewMode && (_loc5_ == "top_left" || _loc5_ == "center_left" || _loc5_ == "bottom_left"))) {
                _loc6_ = asInstanceOf(_loc10_.content, BitmapData);
                _loc13_ = _loc10_.rectangle;
                _loc4_ = new Rectangle(_loc12_.x, _loc12_.y, _loc13_.width, _loc13_.height);
                switch (_loc5_) {
                    case "top_left":
                        break;
                    case "top_center":
                        _loc4_.x += this.getPiece("top_left").rectangle.width;
                        _loc4_.width = _loc12_.width - this.getPiece("top_left").rectangle.width - this.getPiece("top_right").rectangle.width;
                        break;
                    case "top_right":
                        _loc4_.x += _loc12_.width - _loc13_.width;
                        break;
                    case "center_right":
                        _loc4_.x += _loc12_.width - _loc13_.width;
                        _loc4_.y += this.getPiece("top_right").rectangle.height;
                        _loc4_.height = _loc12_.height - this.getPiece("top_right").rectangle.height - this.getPiece("bottom_right").rectangle.height;
                        break;
                    case "bottom_right":
                        _loc4_.x += _loc12_.width - _loc13_.width;
                        _loc4_.y += _loc12_.height - _loc13_.height;
                        break;
                    case "bottom_center":
                        _loc4_.x += this.getPiece("bottom_left").rectangle.width;
                        _loc4_.y += _loc12_.height - _loc13_.height;
                        _loc4_.width = _loc12_.width - this.getPiece("bottom_left").rectangle.width - this.getPiece("bottom_right").rectangle.width;
                        if (this._landingViewMode) {
                            _loc1_ = _loc4_.width / 2 | 0;
                            _loc4_.x += _loc1_;
                            _loc4_.width -= _loc1_;
                        }
                        break;
                    case "bottom_left":
                        _loc4_.y += _loc12_.height - _loc13_.height;
                        break;
                    case "center_left":
                        _loc4_.y += this.getPiece("top_left").rectangle.height;
                        _loc4_.height = _loc12_.height - this.getPiece("top_left").rectangle.height - this.getPiece("bottom_left").rectangle.height;
                        break;
                    default:
                        continue;
                }
                IlluminaBorderWidget.MATRIX.a = _loc4_.width / _loc13_.width;
                IlluminaBorderWidget.MATRIX.d = _loc4_.height / _loc13_.height;
                IlluminaBorderWidget.MATRIX.tx = _loc4_.x - _loc13_.x * IlluminaBorderWidget.MATRIX.a;
                IlluminaBorderWidget.MATRIX.ty = _loc4_.y - _loc13_.y * IlluminaBorderWidget.MATRIX.d;
                this._SafeStr_2414.draw(_loc6_, IlluminaBorderWidget.MATRIX, null, null, _loc4_, false);
            }
        }
        let _loc11_: any[] = [this._topLeftChild, this._topCenterChild, this._topRightChild, this._bottomLeftChild, this._bottomCenterChild, this._bottomRightChild];
        for (const _loc7_ of valuesOf(this._children.iterator)) {
            if (_loc7_.name != null && _loc7_.name.length > 0) {
                _loc8_ = _loc11_.indexOf(_loc7_.name);
                if (_loc8_ < 0) {
                    if (_loc7_.name == this._contentChild) {
                        _loc7_.x = _loc12_.x + this.contentPadding;
                        _loc7_.y = _loc12_.y + this.contentPadding;
                        _loc7_.visible = true;
                    } else {
                        _loc7_.visible = false;
                    }
                } else {
                    switch (_loc8_ % 3) {
                        case 0:
                            _loc7_.x = Math.min(this._sidePadding, this._canvas.width - _loc7_.width);
                            break;
                        case 1:
                            _loc7_.x = Math.max(this._canvas.width - _loc7_.width, 0) / 2;
                            break;
                        case 2:
                            _loc7_.x = Math.max(this._canvas.width - _loc7_.width - this._sidePadding, 0);
                    }
                    if (_loc8_ < 3) {
                        _loc7_.y = this.topPadding - _loc7_.height / 2;
                    } else {
                        _loc7_.y = this._canvas.height - (this.bottomPadding + _loc7_.height / 2);
                    }
                    _loc7_.visible = true;
                    this._SafeStr_2414.fillRect(new Rectangle(_loc7_.x - this._childMargin, Number(_loc7_.y), Number(_loc7_.width + this._childMargin * 2), Number(_loc7_.height)), 0);
                }
            } else {
                _loc7_.visible = false;
            }
        }
        this._SafeStr_2414.unlock();
        this._canvas.invalidate();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IlluminaBorderWidget.#staticsReady) return;
        IlluminaBorderWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IlluminaBorderWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("CONTENT_CHILD_DEFAULT", null);
        set("CONTENT_PADDING_DEFAULT", null);
        set("SIDE_PADDING_DEFAULT", null);
        set("CHILD_MARGIN_DEFAULT", null);
        set("TOP_LEFT_CHILD_DEFAULT", null);
        set("TOP_CENTER_CHILD_DEFAULT", null);
        set("TOP_RIGHT_CHILD_DEFAULT", null);
        set("BOTTOM_LEFT_CHILD_DEFAULT", null);
        set("BOTTOM_CENTER_CHILD_DEFAULT", null);
        set("BOTTOM_RIGHT_CHILD_DEFAULT", null);
        set("LANDING_VIEW_MODE_DEFAULT", null);
        set("CONTENT_CHILD_DEFAULT", new PropertyStruct("illumina_border:content_child", "", "String"));
        set("CONTENT_PADDING_DEFAULT", new PropertyStruct("illumina_border:content_padding", 5, "uint"));
        set("SIDE_PADDING_DEFAULT", new PropertyStruct("illumina_border:side_padding", 15, "uint"));
        set("CHILD_MARGIN_DEFAULT", new PropertyStruct("illumina_border:child_margin", 3, "uint"));
        set("TOP_LEFT_CHILD_DEFAULT", new PropertyStruct("illumina_border:top_left_child", "", "String"));
        set("TOP_CENTER_CHILD_DEFAULT", new PropertyStruct("illumina_border:top_center_child", "", "String"));
        set("TOP_RIGHT_CHILD_DEFAULT", new PropertyStruct("illumina_border:top_right_child", "", "String"));
        set("BOTTOM_LEFT_CHILD_DEFAULT", new PropertyStruct("illumina_border:bottom_left_child", "", "String"));
        set("BOTTOM_CENTER_CHILD_DEFAULT", new PropertyStruct("illumina_border:bottom_center_child", "", "String"));
        set("BOTTOM_RIGHT_CHILD_DEFAULT", new PropertyStruct("illumina_border:bottom_right_child", "", "String"));
        set("LANDING_VIEW_MODE_DEFAULT", new PropertyStruct("illumina_border:landing_view_mode", false, "Boolean"));
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
