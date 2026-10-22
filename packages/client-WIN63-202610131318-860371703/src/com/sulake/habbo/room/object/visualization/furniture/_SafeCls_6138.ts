import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { isIRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { RoomObjectSprite } from '@/com/sulake/room/object/visualization/RoomObjectSprite';

export class _SafeCls_6138 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::_SafeCls_6138'); }

    private static readonly PADDING: number = 32;
    private static readonly DEPTH_EPSILON: number = 0.0005;
    private static readonly ASSET_NAME: string = "wired_highlight_composite";
    private static readonly SPRITE_TAG: string = "wired_highlight";
    private static readonly ZERO_POINT: Point = new Point();
    private _sprite: RoomObjectSprite = new RoomObjectSprite();

    declare private _SafeStr_14739: BitmapData;

    declare private _SafeStr_14740: BitmapData;

    declare private _SafeStr_14741: BitmapData;

    private _sourceStates: any[] = [];

    declare private _filters: any[];

    declare private _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare private _SafeStr_14742: number;
    static { (this.prototype as any)._SafeStr_14742 = 0; }

    constructor() {
    }

    private static disposeBitmap(param1: BitmapData): void {
        if (param1 != null) {
            param1.dispose();
        }
    }

    public get sprite(): IRoomObjectSprite {
        return this._sprite;
    }

    public update(param1: any[], param2: any[], param3: number, param4: string, param5: number, param6: boolean, param7: boolean): void {
        this.applySpriteDefaults(param4, param5);
        if (param2 == null || param2.length == 0) {
            this.clear(false);
            return;
        }
        if (param1.length == 0 || param3 <= 0) {
            this._sprite.visible = false;
            this._sprite.alpha = 0;
            return;
        }
        let _loc8_: boolean = param7 || this.sourcesChanged(param1);
        if (_loc8_) {
            this.rebuildSilhouette(param1);
        }
        if (this._SafeStr_14739 == null) {
            this.clear(false);
            return;
        }
        if (_loc8_ || param2 !== this._filters || this._SafeStr_14740 == null) {
            this.renderFilters(param2);
            this._filters = param2;
        }
        this._sprite.asset = this._SafeStr_14740;
        this._sprite.assetName = "wired_highlight_composite_" + this._SafeStr_14742;
        this._sprite.offsetX = this._offsetX;
        this._sprite.offsetY = this._offsetY;
        this._sprite.relativeDepth = this.getCompositeDepth(param1, param6);
        this._sprite.alpha = param3;
        this._sprite.visible = true;
    }

    public clear(param1: boolean): void {
        this._sprite.visible = false;
        this._sprite.alpha = 0;
        this._sprite.asset = null;
        this._sprite.filters = null;
        this._filters = null;
        if (param1) {
            this.disposeBitmapsAndState();
        }
    }

    public dispose(): void {
        this.clear(true);
        this._sprite.dispose();
        this._sprite = null;
    }

    private applySpriteDefaults(param1: string, param2: number): void {
        this._sprite.objectType = param1;
        this._sprite.libraryAssetName = "";
        this._sprite.assetPosture = null;
        this._sprite.tag = "wired_highlight";
        this._sprite.color = 16777215;
        this._sprite.blendMode = "normal";
        this._sprite.filters = null;
        this._sprite.flipH = false;
        this._sprite.flipV = false;
        this._sprite.direction = param2;
        this._sprite.alphaTolerance = 256;
        this._sprite.clickHandling = false;
        this._sprite.skipMouseHandling = true;
        this._sprite.spriteType = RoomObjectSpriteType.DEFAULT;
        this._sprite.varyingDepth = false;
        this._sprite.planeId = 0;
    }

    private sourcesChanged(param1: any[]): boolean {
        let _loc3_: number = 0;
        let _loc2_: IRoomObjectSprite = null;
        let _loc4_: any = null;
        if (this._sourceStates.length != param1.length) {
            return true;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_ = asGuarded(param1[_loc3_], isIRoomObjectSprite);
            _loc4_ = this._sourceStates[_loc3_];
            if (_loc4_.sprite !== _loc2_ || _loc4_.asset !== _loc2_.asset || _loc4_.assetName != _loc2_.assetName || _loc4_.offsetX != _loc2_.offsetX || _loc4_.offsetY != _loc2_.offsetY || _loc4_.flipH != _loc2_.flipH || _loc4_.flipV != _loc2_.flipV) {
                return true;
            }
            _loc3_++;
        }
        return false;
    }

    private rebuildSilhouette(param1: any[]): void {
        let _loc7_: any = null;
        let _loc4_: IRoomObjectSprite = asGuarded(param1[0], isIRoomObjectSprite);
        let _loc3_: number = _loc4_.offsetX;
        let _loc2_: number = _loc4_.offsetY;
        let _loc6_: number = _loc3_ + _loc4_.asset.width;
        let _loc5_: number = _loc2_ + _loc4_.asset.height;
        for (_loc7_ of param1 ?? []) {
            _loc3_ = Math.min(_loc3_, Number(_loc7_.offsetX)) | 0;
            _loc2_ = Math.min(_loc2_, Number(_loc7_.offsetY)) | 0;
            _loc6_ = Math.max(_loc6_, Number(_loc7_.offsetX + _loc7_.asset.width)) | 0;
            _loc5_ = Math.max(_loc5_, Number(_loc7_.offsetY + _loc7_.asset.height)) | 0;
        }
        let _loc8_: number = _loc6_ - _loc3_ + 32 * 2;
        let _loc10_: number = _loc5_ - _loc2_ + 32 * 2;
        this.ensureBitmapSize(_loc8_, _loc10_);
        this._SafeStr_14739.fillRect(this._SafeStr_14739.rect, 0);
        let _loc9_: Matrix = new Matrix();
        for (_loc7_ of param1 ?? []) {
            _loc9_.identity();
            _loc9_.a = _loc7_.flipH ? -1 : 1;
            _loc9_.d = _loc7_.flipV ? -1 : 1;
            _loc9_.tx = Number(_loc7_.offsetX - _loc3_ + 32 + (_loc7_.flipH ? _loc7_.asset.width : 0));
            _loc9_.ty = Number(_loc7_.offsetY - _loc2_ + 32 + (_loc7_.flipV ? _loc7_.asset.height : 0));
            this._SafeStr_14739.draw(_loc7_.asset, _loc9_, null, "normal", null, false);
        }
        this._SafeStr_14739.threshold(this._SafeStr_14739, this._SafeStr_14739.rect, _SafeCls_6138.ZERO_POINT, ">", 0, 4294967295, 4278190080, false);
        this._offsetX = _loc3_ - 32;
        this._offsetY = _loc2_ - 32;
        this.captureSourceStates(param1);
    }

    private ensureBitmapSize(param1: number, param2: number): void {
        if (this._SafeStr_14739 != null && this._SafeStr_14739.width == param1 && this._SafeStr_14739.height == param2) {
            return;
        }
        this._sprite.asset = null;
        _SafeCls_6138.disposeBitmap(this._SafeStr_14739);
        _SafeCls_6138.disposeBitmap(this._SafeStr_14740);
        _SafeCls_6138.disposeBitmap(this._SafeStr_14741);
        this._SafeStr_14739 = new BitmapData(param1, param2, true, 0);
        this._SafeStr_14740 = new BitmapData(param1, param2, true, 0);
        this._SafeStr_14741 = new BitmapData(param1, param2, true, 0);
    }

    private renderFilters(param1: any[]): void {
        let _loc3_: number = 0;
        let _loc2_: BitmapFilter = null;
        this._SafeStr_14740.fillRect(this._SafeStr_14740.rect, 0);
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_ = asInstanceOf(param1[_loc3_], BitmapFilter);
            if (_loc3_ == 0) {
                this._SafeStr_14740.applyFilter(this._SafeStr_14739, this._SafeStr_14739.rect, _SafeCls_6138.ZERO_POINT, _loc2_);
            } else {
                this._SafeStr_14741.fillRect(this._SafeStr_14741.rect, 0);
                this._SafeStr_14741.applyFilter(this._SafeStr_14739, this._SafeStr_14739.rect, _SafeCls_6138.ZERO_POINT, _loc2_);
                this._SafeStr_14740.draw(this._SafeStr_14741, null, null, "normal", null, false);
            }
            _loc3_++;
        }
        this._SafeStr_14742 = this._SafeStr_14742 + 1;
    }

    private captureSourceStates(param1: any[]): void {
        this._sourceStates = [];
        for (const _loc2_ of param1 ?? []) {
            this._sourceStates.push({ "sprite": _loc2_, "asset": _loc2_.asset, "assetName": _loc2_.assetName, "offsetX": _loc2_.offsetX, "offsetY": _loc2_.offsetY, "flipH": _loc2_.flipH, "flipV": _loc2_.flipV });
        }
    }

    private getCompositeDepth(param1: any[], param2: boolean): number {
        let _loc3_: number = Number(castGuarded(param1[0], isIRoomObjectSprite, "com.sulake.room.object.visualization.IRoomObjectSprite").relativeDepth);
        for (const _loc4_ of param1 ?? []) {
            _loc3_ = Number(param2 ? Math.min(_loc3_, Number(_loc4_.relativeDepth)) : Number(Math.max(_loc3_, Number(_loc4_.relativeDepth))));
        }
        return _loc3_ + (param2 ? -0.0005 : 0.0005);
    }

    private disposeBitmapsAndState(): void {
        _SafeCls_6138.disposeBitmap(this._SafeStr_14739);
        _SafeCls_6138.disposeBitmap(this._SafeStr_14740);
        _SafeCls_6138.disposeBitmap(this._SafeStr_14741);
        this._SafeStr_14739 = null;
        this._SafeStr_14740 = null;
        this._SafeStr_14741 = null;
        this._sourceStates = [];
    }
}
