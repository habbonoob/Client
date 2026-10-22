import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChatStyle } from '@/com/sulake/habbo/freeflowchat/style/IChatStyle';
import type { IChatStyleInternal } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/style/IChatStyleInternal';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';

export class ChatStyle implements IChatStyle, IChatStyleInternal {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization.style::ChatStyle'); }

    declare private _background: BitmapData;

    declare private _scale9Grid: Rectangle;

    declare private _pointer: BitmapData;

    declare private _pointerY: number;
    static { (this.prototype as any)._pointerY = 0; }

    declare private _pointerXMargins: any[];

    declare private _SafeStr_15047: Rectangle;

    declare private _textFormat: TextFormat;

    declare private _SafeStr_15048: BitmapData;

    declare private _SafeStr_15049: Point;

    declare private _SafeStr_15050: BitmapData;

    declare private _SafeStr_15051: Point;

    declare private _iconImage: BitmapData;

    declare private _SafeStr_15052: Point;

    declare private _SafeStr_15053: BitmapData;

    declare private _color: BitmapData;

    declare private _SafeStr_15054: Point;

    declare private _overlap: Rectangle;

    declare private _SafeStr_15055: boolean;
    static { (this.prototype as any)._SafeStr_15055 = false; }

    declare private _isSystemStyle: boolean;
    static { (this.prototype as any)._isSystemStyle = false; }

    declare private _purchasable: boolean;
    static { (this.prototype as any)._purchasable = false; }

    declare private _isHcOnly: boolean;
    static { (this.prototype as any)._isHcOnly = false; }

    declare private _isAmbassadorOnly: boolean;
    static { (this.prototype as any)._isAmbassadorOnly = false; }

    declare private _isAnonymous: boolean;
    static { (this.prototype as any)._isAnonymous = false; }

    declare private _allowHTML: boolean;
    static { (this.prototype as any)._allowHTML = false; }

    declare private _styleSheet: StyleSheet;

    declare private _SafeStr_15056: boolean;
    static { (this.prototype as any)._SafeStr_15056 = false; }

    declare private _usePixelPerfectNineSlice: boolean;
    static { (this.prototype as any)._usePixelPerfectNineSlice = false; }

    constructor(param1: BitmapData, param2: Rectangle, param3: BitmapData, param4: number, param5: any[], param6: Rectangle, param7: TextFormat, param8: boolean, param9: BitmapData, param10: Point, param11: BitmapData, param12: Point, param13: Point, param14: BitmapData, param15: BitmapData, param16: boolean, param17: boolean, param18: boolean, param19: boolean, param20: boolean, param21: boolean, param22: BitmapData = null, param23: Point = null, param24: Rectangle = null, param25: boolean = false, param26: StyleSheet = null, param27: boolean = false) {
        this._background = param1;
        this._scale9Grid = param2;
        this._pointer = param3;
        this._pointerY = param4;
        this._pointerXMargins = param5;
        this._SafeStr_15047 = param6;
        this._textFormat = param7;
        this._isAnonymous = param8;
        this._SafeStr_15048 = param9;
        this._SafeStr_15049 = param10;
        this._SafeStr_15050 = param11;
        this._SafeStr_15051 = param12;
        this._SafeStr_15052 = param13;
        this._iconImage = param14;
        this._SafeStr_15053 = param15;
        this._SafeStr_15055 = param16;
        this._isSystemStyle = param17;
        this._purchasable = param18;
        this._isHcOnly = param20;
        this._isAmbassadorOnly = param19;
        this._color = param22;
        this._SafeStr_15054 = param23;
        this._overlap = param24;
        this._allowHTML = param25;
        this._styleSheet = param26;
        this._SafeStr_15056 = param21;
        this._usePixelPerfectNineSlice = param27;
    }

    public getNewBackgroundSprite(param1: number = 16777215): Sprite {
        let _loc4_: BitmapData = null;
        let _loc2_: any = 0;
        let _loc5_: any = 0;
        let _loc3_: any = 0;
        if (this._color != null) {
            _loc4_ = new BitmapData(this._background.width, this._background.height, this._background.transparent, 0);
            _loc4_.copyPixels(this._background, this._background.rect, new Point(0, 0));
            _loc2_ = (param1 >> 16 & 0xFF) >>> 0;
            _loc5_ = (param1 >> 8 & 0xFF) >>> 0;
            _loc3_ = (param1 >> 0 & 0xFF) >>> 0;
            _loc4_.draw(this._color, null, new ColorTransform(_loc2_ / 255, _loc5_ / 255, _loc3_ / 255), "darken");
        } else {
            _loc4_ = this._background;
        }
        return this._usePixelPerfectNineSlice ? HabboFreeFlowChat.createPixelPerfect9SliceSprite(this._scale9Grid, _loc4_) : HabboFreeFlowChat.create9SliceSprite(this._scale9Grid, _loc4_);
    }

    public get textFormat(): TextFormat {
        return this._textFormat;
    }

    public get styleSheet(): StyleSheet {
        return this._styleSheet;
    }

    public get pointer(): BitmapData {
        return this._pointer;
    }

    public get pointerOffsetToBubbleBottom(): number {
        return this._background.height - this._pointerY;
    }

    public getPointerLeftMargin(param1: number): number {
        if (this._pointerXMargins == null || this._pointerXMargins.length < 1) {
            return param1;
        }
        return this._pointerXMargins[0] | 0;
    }

    public getPointerRightMargin(param1: number): number {
        if (this._pointerXMargins == null || this._pointerXMargins.length < 2) {
            return param1;
        }
        return this._pointerXMargins[1] | 0;
    }

    public get isAnonymous(): boolean {
        return this._isAnonymous;
    }

    public get faceOffset(): Point {
        return this._SafeStr_15052;
    }

    public getEmblem(param1: boolean = false): BitmapData {
        if (param1 && this._SafeStr_15050 != null && this._SafeStr_15051 != null) {
            return this._SafeStr_15050;
        }
        return this._SafeStr_15049 != null ? this._SafeStr_15048 : null;
    }

    public getEmblemOffset(param1: boolean = false): Point {
        if (param1 && this._SafeStr_15050 != null && this._SafeStr_15051 != null) {
            return this._SafeStr_15051;
        }
        return this._SafeStr_15049;
    }

    public get iconImage(): BitmapData {
        return this._iconImage;
    }

    public get textFieldMargins(): Rectangle {
        return this._SafeStr_15047;
    }

    public get overlap(): Rectangle {
        return this._overlap;
    }

    public get selectorPreview(): BitmapData {
        return this._SafeStr_15053;
    }

    public get isSystemStyle(): boolean {
        return this._SafeStr_15055;
    }

    public get purchasable(): boolean {
        return this._isSystemStyle;
    }

    public get isHcOnly(): boolean {
        return this._purchasable;
    }

    public get isAmbassadorOnly(): boolean {
        return this._isHcOnly;
    }

    public get isStaffOverrideable(): boolean {
        return this._isAmbassadorOnly;
    }

    public get allowHTML(): boolean {
        return this._allowHTML;
    }

    public get isNotification(): boolean {
        return this._SafeStr_15056;
    }
}
