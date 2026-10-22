import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IFigurePart } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePart';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class AvatarEditorGridPartItem implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::AvatarEditorGridPartItem'); }

    static #staticsReady = false;

    private readonly THUMB_DIRECTIONS: any[] = [2, 6, 0, 4, 3, 1];

    private static get _downloadIcon(): BitmapData {
        AvatarEditorGridPartItem.#initStatics();
        return AvatarEditorGridPartItem._downloadIcon;
    }
    private static set _downloadIcon(value: BitmapData) {
        AvatarEditorGridPartItem.#initStatics();
        AvatarEditorGridPartItem._downloadIcon = value;
    }

    private static get DRAW_ORDER(): any[] {
        AvatarEditorGridPartItem.#initStatics();
        return AvatarEditorGridPartItem.DRAW_ORDER;
    }
    private static set DRAW_ORDER(value: any[]) {
        AvatarEditorGridPartItem.#initStatics();
        AvatarEditorGridPartItem.DRAW_ORDER = value;
    }

    constructor(param1: IWindowContainer, param2: IAvatarEditorCategoryModel, param3: IFigurePartSet, param4: any[], param5: boolean = true, param6: boolean = false) {
        let _loc7_: any = null;
        let _loc8_: any[] = null;
        this._SafeStr_2134 = param2;
        this._partSet = param3;
        this._window = param1;
        this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        this._colors = param4;
        this._useColors = param5;
        this._isDisabledForWearing = param6;
        if (param3 == null) {
            this._iconImage = new BitmapData(1, 1, true, 16777215);
        }
        if (param3 != null) {
            _loc8_ = param3.parts;
            for (_loc7_ of _loc8_ ?? []) {
                this._colorLayerCount = Math.max(this._colorLayerCount, Number(_loc7_.colorLayerIndex)) | 0;
            }
        }
        this._renderManager = this._SafeStr_2134.controller.manager.avatarRenderManager;
        this._window.addEventListener("WME_OVER", this.onMouseOver);
        this._window.addEventListener("WME_OUT", this.onMousetOut);
        this.updateThumbVisualization();
    }

    declare private _SafeStr_2134: IAvatarEditorCategoryModel;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3024: IWindow;

    declare private _partSet: IFigurePartSet;

    declare private _useColors: boolean;
    static { (this.prototype as any)._useColors = false; }

    private _isSelected: boolean = false;

    declare private _iconImage: BitmapData;

    declare private _SafeStr_2790: Rectangle;

    private _colorLayerCount: number = 0;

    declare private _renderManager: IAvatarRenderManager;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _colors: any[];

    public set colors(param1: any[]) {
        this._colors = param1;
        this.updateThumbVisualization();
    }

    declare private _isDisabledForWearing: boolean;
    static { (this.prototype as any)._isDisabledForWearing = false; }

    public get isDisabledForWearing(): boolean {
        return this._isDisabledForWearing;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get view(): IWindowContainer {
        return this._window;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(param1: boolean) {
        this._isSelected = param1;
        this.updateThumbVisualization();
    }

    public get id(): number {
        if (this._partSet == null) {
            return -1;
        }
        return this._partSet.id;
    }

    public get colorLayerCount(): number {
        return this._colorLayerCount;
    }

    public set iconImage(param1: BitmapData) {
        this._iconImage = param1;
        this.updateThumbVisualization();
    }

    public get partSet(): IFigurePartSet {
        return this._partSet;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_2134 = null;
        this._partSet = null;
        if (this._window != null) {
            if (!this._window.disposed) {
                this._window.dispose();
            }
        }
        this._window = null;
        if (this._iconImage) {
            this._iconImage.dispose();
        }
        this._iconImage = null;
        this._disposed = true;
        AvatarEditorGridPartItem._downloadIcon = null;
        this._SafeStr_3024 = null;
        this._SafeStr_2790 = null;
        this._renderManager = null;
        this._disposed = true;
        this._colors = null;
    }

    public update(): void {
        this.updateThumbVisualization();
    }

    public avatarImageReady(param1: string): void {
        if (!this.analyzePartLayers()) {
            return;
        }
        this.updateThumbVisualization();
    }

    private onMousetOut = (param1: WindowMouseEvent): void => {
        if (!this._isSelected) {
            this._SafeStr_3024.visible = false;
        }
        this._SafeStr_3024.blend = 1;
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        if (!this._isSelected) {
            this._SafeStr_3024.visible = true;
            this._SafeStr_3024.blend = 0.5;
        }
    };

    private updateThumbVisualization(): void {
        let _loc1_: BitmapData = null;
        let _loc3_: BitmapData = null;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
        if (_loc5_) {
            if (this._iconImage != null && !this._useColors) {
                _loc1_ = this._iconImage;
            } else {
                _loc1_ = this.renderThumb();
                if (!_loc1_) {
                    return;
                }
            }
            _loc3_ = _loc5_.bitmap ? _loc5_.bitmap : new BitmapData(_loc5_.width, _loc5_.height);
            _loc3_.fillRect(_loc3_.rect, 16777215);
            _loc4_ = (_loc3_.width - _loc1_.width) / 2 | 0;
            _loc6_ = (_loc3_.height - _loc1_.height) / 2 | 0;
            _loc3_.copyPixels(_loc1_, _loc1_.rect, new Point(_loc4_, _loc6_), null, null, true);
            _loc5_.bitmap = _loc3_;
        }
        let _loc7_: IWindow = this._window.findChildByTag("CLUB_ICON");
        let _loc2_: IStaticBitmapWrapperWindow = asGuarded(this._window.findChildByTag("SELLABLE_ICON"), isIStaticBitmapWrapperWindow);
        if (this._partSet) {
            _loc7_.visible = this._partSet.clubLevel > 0;
            _loc2_.visible = this._partSet.isSellable;
        } else {
            _loc7_.visible = false;
            _loc2_.visible = false;
        }
        if (this._isDisabledForWearing) {
            this.setAlpha(_loc3_, 0.2);
        }
        if (this._SafeStr_3024 == null) {
            return;
        }
        this._SafeStr_3024.visible = this._isSelected;
        this._SafeStr_3024.blend = 1;
        this._window.invalidate();
    }

    private analyzePartLayers(): boolean {
        let _loc4_: any = null;
        let _loc6_: string = null;
        let _loc7_: BitmapDataAsset = null;
        let _loc3_: BitmapData = null;
        if (this._SafeStr_2134 == null) {
            this._SafeStr_2790 = null;
            return false;
        }
        if (!this.partSet || !this.partSet.parts || this.partSet.parts.length == 0) {
            this._SafeStr_2790 = null;
            return false;
        }
        if (!this._renderManager) {
            return false;
        }
        let _loc2_: IAvatarFigureContainer = this._renderManager.createFigureContainer(this.partSet.type + "-" + this.partSet.id);
        if (!this._renderManager.isFigureReady(_loc2_)) {
            this._renderManager.downloadFigure(_loc2_, this);
            return false;
        }
        let _loc8_: number = 0;
        let _loc5_: boolean = false;
        let _loc1_: Rectangle = new Rectangle();
        for (_loc4_ of this.partSet.parts ?? []) {
            if (_loc5_) {
                _loc6_ = "h_std_" + _loc4_.type + "_" + _loc4_.id + "_" + this.THUMB_DIRECTIONS[_loc8_] + "_" + "0";
                _loc7_ = asInstanceOf(this._renderManager.getAssetByName(_loc6_), BitmapDataAsset);
            } else {
                _loc8_ = 0;
                while (!_loc5_ && _loc8_ < this.THUMB_DIRECTIONS.length) {
                    _loc6_ = "h_std_" + _loc4_.type + "_" + _loc4_.id + "_" + this.THUMB_DIRECTIONS[_loc8_] + "_" + "0";
                    _loc7_ = asInstanceOf(this._renderManager.getAssetByName(_loc6_), BitmapDataAsset);
                    if (_loc7_ && _loc7_.content) {
                        _loc5_ = true;
                    } else {
                        _loc8_++;
                    }
                }
            }
            if (_loc7_ && _loc7_.content) {
                _loc3_ = asInstanceOf(_loc7_.content, BitmapData);
                _loc1_ = _loc1_.union(new Rectangle(-1 * _loc7_.offset.x, -1 * _loc7_.offset.y, _loc7_.rectangle.width, _loc7_.rectangle.height));
            }
        }
        if (_loc1_ && _loc1_.width > 0) {
            this._SafeStr_2790 = _loc1_;
            return true;
        }
        return false;
    }

    private renderThumb(): BitmapData {
        let _loc11_: IAsset = null;
        let _loc4_: BitmapData = null;
        let _loc3_: any = null;
        let _loc10_: string = null;
        let _loc12_: BitmapDataAsset = null;
        let _loc1_: BitmapData = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc13_: ColorTransform = null;
        let _loc2_: IPartColor = null;
        let _loc6_: Rectangle = null;
        if (this.partSet == null) {
            return null;
        }
        if (this._SafeStr_2134 == null) {
            return null;
        }
        if (this._SafeStr_2790 == null) {
            if (!this.analyzePartLayers()) {
                if (!AvatarEditorGridPartItem._downloadIcon) {
                    _loc11_ = this._SafeStr_2134.controller.manager.windowManager.assets.getAssetByName("avatar_editor_avatar_editor_download_icon");
                    AvatarEditorGridPartItem._downloadIcon = asInstanceOf(_loc11_.content, BitmapData);
                }
                return AvatarEditorGridPartItem._downloadIcon;
            }
        }
        if (!this._renderManager) {
            return null;
        }
        _loc4_ = new BitmapData(this._SafeStr_2790.width | 0, this._SafeStr_2790.height | 0, true, 16777215);
        let _loc5_: number = 0;
        let _loc9_: boolean = false;
        let _loc14_: any[] = this.partSet.parts.concat().sort(this.sortByDrawOrder);
        for (_loc3_ of _loc14_ ?? []) {
            _loc12_ = null;
            if (_loc9_) {
                _loc10_ = "h_std_" + _loc3_.type + "_" + _loc3_.id + "_" + this.THUMB_DIRECTIONS[_loc5_] + "_" + "0";
                _loc12_ = asInstanceOf(this._renderManager.getAssetByName(_loc10_), BitmapDataAsset);
            } else {
                _loc5_ = 0;
                while (!_loc9_ && _loc5_ < this.THUMB_DIRECTIONS.length) {
                    _loc10_ = "h_std_" + _loc3_.type + "_" + _loc3_.id + "_" + this.THUMB_DIRECTIONS[_loc5_] + "_" + "0";
                    _loc12_ = asInstanceOf(this._renderManager.getAssetByName(_loc10_), BitmapDataAsset);
                    if (_loc12_ && _loc12_.content) {
                        _loc9_ = true;
                    } else {
                        _loc5_++;
                    }
                }
            }
            if (_loc12_) {
                _loc1_ = castTo(_loc12_.content, BitmapData);
                _loc7_ = -1 * _loc12_.offset.x - this._SafeStr_2790.x | 0;
                _loc8_ = -1 * _loc12_.offset.y - this._SafeStr_2790.y | 0;
                _loc13_ = null;
                if (this._useColors && _loc3_.colorLayerIndex > 0) {
                    _loc2_ = this._colors[_loc3_.colorLayerIndex - 1];
                    if (_loc2_ != null) {
                        _loc13_ = _loc2_.colorTransform;
                    }
                }
                if (_loc13_) {
                    _loc6_ = new Rectangle(_loc7_, _loc8_, _loc12_.rectangle.width, _loc12_.rectangle.height);
                    _loc4_.draw(asInstanceOf(_loc12_.content, BitmapData), new Matrix(1, 0, 0, 1, -_loc12_.rectangle.x + _loc7_, -_loc12_.rectangle.y + _loc8_), _loc13_, null, _loc6_);
                } else {
                    _loc4_.copyPixels(_loc1_, _loc12_.rectangle, new Point(_loc7_, _loc8_), null, null, true);
                }
            }
        }
        return _loc4_;
    }

    private setAlpha(param1: BitmapData, param2: number): BitmapData {
        let _loc3_: Rectangle = new Rectangle(0, 0, param1.width, param1.height);
        let _loc4_: ColorTransform = new ColorTransform();
        _loc4_.alphaMultiplier = param2;
        param1.colorTransform(_loc3_, _loc4_);
        return param1;
    }

    private sortByDrawOrder = (param1: IFigurePart, param2: IFigurePart): number => {
        let _loc3_: number = Number(AvatarEditorGridPartItem.DRAW_ORDER.indexOf(param1.type));
        let _loc4_: number = Number(AvatarEditorGridPartItem.DRAW_ORDER.indexOf(param2.type));
        if (_loc3_ < _loc4_) {
            return -1;
        }
        if (_loc3_ > _loc4_) {
            return 1;
        }
        if (param1.index < param2.index) {
            return -1;
        }
        if (param1.index > param2.index) {
            return 1;
        }
        return 0;
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarEditorGridPartItem.#staticsReady) return;
        AvatarEditorGridPartItem.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarEditorGridPartItem, name, { value, writable: true, configurable: true, enumerable: true });
        set("_downloadIcon", null);
        set("DRAW_ORDER", null);
        set("_downloadIcon", null);
        set("DRAW_ORDER", []);
        AvatarEditorGridPartItem.DRAW_ORDER.push("li");
        AvatarEditorGridPartItem.DRAW_ORDER.push("lh");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ls");
        AvatarEditorGridPartItem.DRAW_ORDER.push("lc");
        AvatarEditorGridPartItem.DRAW_ORDER.push("mcl");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ptl");
        AvatarEditorGridPartItem.DRAW_ORDER.push("bd");
        AvatarEditorGridPartItem.DRAW_ORDER.push("sh");
        AvatarEditorGridPartItem.DRAW_ORDER.push("lg");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ch");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ca");
        AvatarEditorGridPartItem.DRAW_ORDER.push("cc");
        AvatarEditorGridPartItem.DRAW_ORDER.push("cp");
        AvatarEditorGridPartItem.DRAW_ORDER.push("mc");
        AvatarEditorGridPartItem.DRAW_ORDER.push("pt");
        AvatarEditorGridPartItem.DRAW_ORDER.push("wa");
        AvatarEditorGridPartItem.DRAW_ORDER.push("rh");
        AvatarEditorGridPartItem.DRAW_ORDER.push("rs");
        AvatarEditorGridPartItem.DRAW_ORDER.push("rc");
        AvatarEditorGridPartItem.DRAW_ORDER.push("mcr");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ptr");
        AvatarEditorGridPartItem.DRAW_ORDER.push("hd");
        AvatarEditorGridPartItem.DRAW_ORDER.push("fc");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ey");
        AvatarEditorGridPartItem.DRAW_ORDER.push("hr");
        AvatarEditorGridPartItem.DRAW_ORDER.push("hrb");
        AvatarEditorGridPartItem.DRAW_ORDER.push("fa");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ea");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ha");
        AvatarEditorGridPartItem.DRAW_ORDER.push("he");
        AvatarEditorGridPartItem.DRAW_ORDER.push("ri");
    }

    get [IDisposable](): true {
        return true;
    }
}
