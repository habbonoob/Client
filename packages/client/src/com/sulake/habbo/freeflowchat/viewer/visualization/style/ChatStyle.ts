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

    constructor(param1: BitmapData, param2: Rectangle, param3: BitmapData, param4: number, param5: any[], param6: Rectangle, param7: TextFormat, param8: boolean, param9: Point, param10: BitmapData, param11: BitmapData, param12: boolean, param13: boolean, param14: boolean, param15: boolean, param16: boolean, param17: boolean, param18: BitmapData = null, param19: Point = null, param20: Rectangle = null, param21: boolean = false, param22: StyleSheet = null) {
        this._background = param1;
        this._scale9Grid = param2;
        this._pointer = param3;
        this._pointerY = param4;
        this._pointerXMargins = param5;
        this._textFieldMargins = param6;
        this._textFormat = param7;
        this._isAnonymous = param8;
        this._iconOffset = param9;
        this._iconImage = param10;
        this._selectorPreview = param11;
        this._isSystemStyle = param12;
        this._purchasable = param13;
        this._isHcOnly = param14;
        this._isAmbassadorOnly = param16;
        this._isStaffOverrideable = param15;
        this._color = param18;
        this._colorOffset = param19;
        this._overlap = param20;
        this._allowHTML = param21;
        this._styleSheet = param22;
        this._isNotification = param17;
    }

    declare private _background: BitmapData;

    declare private _scale9Grid: Rectangle;

    declare private _pointer: BitmapData;

    declare private _pointerY: number;
    static { (this.prototype as any)._pointerY = 0; }

    declare private _pointerXMargins: any[];

    declare private _textFieldMargins: Rectangle;

    declare private _textFormat: TextFormat;

    declare private _iconImage: BitmapData;

    declare private _iconOffset: Point;

    declare private _selectorPreview: BitmapData;

    declare private _color: BitmapData;

    declare private _colorOffset: Point;

    declare private _isSystemStyle: boolean;
    static { (this.prototype as any)._isSystemStyle = false; }

    declare private _purchasable: boolean;
    static { (this.prototype as any)._purchasable = false; }

    declare private _isHcOnly: boolean;
    static { (this.prototype as any)._isHcOnly = false; }

    declare private _isAmbassadorOnly: boolean;
    static { (this.prototype as any)._isAmbassadorOnly = false; }

    declare private _isStaffOverrideable: boolean;
    static { (this.prototype as any)._isStaffOverrideable = false; }

    declare private _styleSheet: StyleSheet;

    declare private _isNotification: boolean;
    static { (this.prototype as any)._isNotification = false; }

    declare private _overlap: Rectangle;

    public get overlap(): Rectangle {
        return this._overlap;
    }

    declare private _isAnonymous: boolean;
    static { (this.prototype as any)._isAnonymous = false; }

    public get isAnonymous(): boolean {
        return this._isAnonymous;
    }

    declare private _allowHTML: boolean;
    static { (this.prototype as any)._allowHTML = false; }

    public get allowHTML(): boolean {
        return this._allowHTML;
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

    public get faceOffset(): Point {
        return this._iconOffset;
    }

    public get iconImage(): BitmapData {
        return this._iconImage;
    }

    public get textFieldMargins(): Rectangle {
        return this._textFieldMargins;
    }

    public get selectorPreview(): BitmapData {
        return this._selectorPreview;
    }

    public get isSystemStyle(): boolean {
        return this._isSystemStyle;
    }

    public get purchasable(): boolean {
        return this._purchasable;
    }

    public get isHcOnly(): boolean {
        return this._isHcOnly;
    }

    public get isAmbassadorOnly(): boolean {
        return this._isAmbassadorOnly;
    }

    public get isStaffOverrideable(): boolean {
        return this._isStaffOverrideable;
    }

    public get isNotification(): boolean {
        return this._isNotification;
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
        return HabboFreeFlowChat.create9SliceSprite(this._scale9Grid, _loc4_);
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
}
