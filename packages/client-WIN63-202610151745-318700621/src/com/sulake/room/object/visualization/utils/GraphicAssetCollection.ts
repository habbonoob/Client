import { asGuarded, asInstanceOf, isClass, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';
import { GraphicAsset } from '@/com/sulake/room/object/visualization/utils/GraphicAsset';
import { GraphicAssetPalette } from '@/com/sulake/room/object/visualization/utils/GraphicAssetPalette';
import { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class GraphicAssetCollection implements IGraphicAssetCollection {
    static { registerClassName(this, 'com.sulake.room.object.visualization.utils::GraphicAssetCollection'); }

    private static readonly PALETTE_ASSET_DISPOSE_THRESHOLD: number = 10;
    private static readonly USE_LAZY_ASSETS: boolean = false;
    private static readonly PALETTE_ATTRIBUTES: any[] = ["id", "source"];

    declare private _assets: UtilsMap;

    declare private _SafeStr_2617: IAssetLibrary;

    declare private _palettes: UtilsMap;

    declare private _paletteAssetNames: any[];

    declare private _SafeStr_5346: UtilsMap;

    private _referenceCount: number = 0;
    private _SafeStr_5197: number = 0;

    declare private _SafeStr_2999: Map<any, any>;

    constructor() {
        this._assets = new UtilsMap();
        this._palettes = new UtilsMap();
        this._SafeStr_5346 = new UtilsMap();
        this._paletteAssetNames = [];
        this._SafeStr_2999 = new Dictionary();
    }

    public dispose(): void {
        let _loc1_: GraphicAssetPalette = null;
        let _loc2_: string = null;
        let _loc3_: GraphicAsset = null;
        if (this._palettes != null) {
            for (_loc2_ of keysOf(this._palettes)) {
                _loc1_ = this._palettes[_loc2_];
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
            }
            this._palettes.reset();
        }
        if (this._SafeStr_5346 != null) {
            this._palettes.reset();
        }
        if (this._paletteAssetNames != null) {
            this.disposePaletteAssets();
            this._paletteAssetNames = null;
        }
        if (this._assets != null) {
            for (_loc2_ of keysOf(this._assets)) {
                _loc3_ = this._assets[_loc2_];
                if (_loc3_ != null) {
                    _loc3_.recycle();
                }
            }
            this._assets.reset();
        }
        if (this._SafeStr_2999) {
            for (const _loc4_ of this._SafeStr_2999?.keys() ?? []) {
                this._SafeStr_2999.delete(_loc4_);
            }
        }
        this._SafeStr_2617 = null;
    }

    public set assetLibrary(param1: IAssetLibrary) {
        this._SafeStr_2617 = param1;
    }

    public addReference(): void {
        this._referenceCount = this._referenceCount + 1;
        this._SafeStr_5197 = getTimer();
    }

    public removeReference(): void {
        this._referenceCount = this._referenceCount - 1;
        if (this._referenceCount <= 0) {
            this._referenceCount = 0;
            this._SafeStr_5197 = getTimer();
            this.disposePaletteAssets(false);
        }
    }

    public getReferenceCount(): number {
        return this._referenceCount;
    }

    public getLastReferenceTimeStamp(): number {
        return this._SafeStr_5197;
    }

    public define(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc3_: XMLList = param1.child("asset");
        if (_loc3_ == null) {
            return false;
        }
        let _loc2_: XMLList = param1.child("palette");
        if (_loc2_ != null) {
            this.definePalettes(_loc2_);
        }
        this.defineAssets(_loc3_);
        return true;
    }

    private defineAssetsLazy(param1: XMLList): void {
        let _loc3_: string = null;
        let _loc2_: any = null;
        for (_loc2_ of param1 ?? []) {
            _loc3_ = _loc2_.attribute("name").toString();
            if (_loc3_.length > 0) {
                this._SafeStr_2999.set(_loc3_, _loc2_);
            }
        }
    }

    private defineAssets(param1: XMLList): void {
        let _loc3_: number = 0;
        let _loc2_: XML = null;
        let _loc10_: string = null;
        let _loc4_: string = null;
        let _loc5_: boolean = false;
        let _loc11_: boolean = false;
        let _loc6_: boolean = false;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc13_: IAsset = null;
        let _loc8_: boolean = false;
        let _loc12_: IGraphicAsset = null;
        let _loc14_: number = param1.length();
        _loc3_ = 0;
        while (_loc3_ < _loc14_) {
            _loc2_ = param1.item(_loc3_);
            _loc10_ = _loc2_.attribute("name").toString();
            if (_loc10_.length > 0) {
                _loc4_ = null;
                _loc5_ = false;
                _loc11_ = false;
                _loc6_ = false;
                _loc7_ = 0;
                _loc9_ = 0;
                _loc7_ = -(Number(_loc2_.attribute("x")) | 0);
                _loc9_ = -(Number(_loc2_.attribute("y")) | 0);
                _loc4_ = _loc2_.attribute("source").toString();
                if ((Number(_loc2_.attribute("flipH")) | 0) > 0) {
                    if (_loc4_.length > 0) {
                        _loc5_ = true;
                    }
                }
                if ((Number(_loc2_.attribute("flipV")) | 0) > 0) {
                    if (_loc4_.length > 0) {
                        _loc11_ = true;
                    }
                }
                _loc6_ = (Number(_loc2_.attribute("usesPalette")) | 0) != 0;
                if (_loc4_.length == 0) {
                    _loc4_ = _loc10_;
                }
                _loc13_ = this._SafeStr_2617.getAssetByName(_loc4_);
                if (_loc13_ != null) {
                    _loc8_ = this.createAsset(_loc10_, _loc4_, _loc13_, _loc5_, _loc11_, _loc7_, _loc9_, _loc6_);
                    if (!_loc8_) {
                        _loc12_ = this.getAsset(_loc10_);
                        if (_loc12_ != null && _loc12_.assetName != _loc12_.libraryAssetName) {
                            _loc8_ = this.replaceAsset(_loc10_, _loc4_, _loc13_, _loc5_, _loc11_, _loc7_, _loc9_, _loc6_);
                        }
                    }
                }
            }
            _loc3_++;
        }
    }

    private definePalettes(param1: XMLList): void {
        let _loc6_: string = null;
        let _loc7_: string = null;
        let _loc8_: IAsset = null;
        let _loc2_: ByteArray = null;
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: string = null;
        let _loc4_: GraphicAssetPalette = null;
        for (const _loc5_ of param1 ?? []) {
            if (XMLValidator.checkRequiredAttributes(_loc5_, GraphicAssetCollection.PALETTE_ATTRIBUTES)) {
                _loc6_ = _loc5_.attribute("id").toString();
                _loc7_ = _loc5_.attribute("source").toString();
                if (this._palettes[_loc6_] == null) {
                    _loc8_ = this._SafeStr_2617.getAssetByName(_loc7_);
                    if (_loc8_.content == null) {
                        Logger.log("Palette asset was null: " + _loc7_);
                    } else {
                        if (typeof _loc8_.content === "function") {
                            _loc2_ = asInstanceOf(new (asGuarded(_loc8_.content, isClass))(), ByteArray);
                        } else {
                            _loc2_ = asInstanceOf(_loc8_.content, ByteArray);
                        }
                        _loc3_ = 16777215;
                        _loc9_ = 16777215;
                        _loc10_ = _loc5_.attribute("color1").toString();
                        if (_loc10_.length > 0) {
                            _loc3_ = parseInt(_loc10_, 16) | 0;
                            _loc9_ = _loc3_;
                        }
                        _loc10_ = _loc5_.attribute("color2").toString();
                        if (_loc10_.length > 0) {
                            _loc9_ = parseInt(_loc10_, 16) | 0;
                        }
                        _loc4_ = new GraphicAssetPalette(_loc2_, _loc3_, _loc9_);
                        this._palettes[_loc6_] = _loc4_;
                        this._SafeStr_5346[_loc6_] = _loc5_;
                    }
                }
            }
        }
    }

    protected createAsset(param1: string, param2: string, param3: IAsset, param4: boolean, param5: boolean, param6: number, param7: number, param8: boolean): boolean {
        if (this._assets[param1] != null) {
            return false;
        }
        if (this._SafeStr_2999.get(param1)) {
            return false;
        }
        let _loc9_: GraphicAsset = GraphicAsset.allocate(param1, param2, param3, param4, param5, param6 | 0, param7 | 0, param8);
        this._assets[param1] = _loc9_;
        return true;
    }

    protected replaceAsset(param1: string, param2: string, param3: IAsset, param4: boolean, param5: boolean, param6: number, param7: number, param8: boolean): boolean {
        let _loc9_: GraphicAsset = this._assets.remove(param1);
        if (_loc9_ != null) {
            _loc9_.recycle();
        } else {
            this._SafeStr_2999.delete(param1);
        }
        return this.createAsset(param1, param2, param3, param4, param5, param6, param7, param8);
    }

    public getAsset(param1: string): IGraphicAsset {
        let _loc7_: string = null;
        let _loc8_: boolean = false;
        let _loc6_: boolean = false;
        let _loc9_: boolean = false;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc11_: IAsset = null;
        let _loc10_: IGraphicAsset = null;
        let _loc2_: IGraphicAsset = this._assets.getValue(param1);
        if (_loc2_) {
            return _loc2_;
        }
        let _loc5_: XML = this._SafeStr_2999.get(param1);
        if (_loc5_) {
            this._SafeStr_2999.delete(param1);
            _loc7_ = null;
            _loc8_ = false;
            _loc6_ = false;
            _loc9_ = false;
            _loc3_ = 0;
            _loc4_ = 0;
            _loc3_ = -(Number(_loc5_.attribute("x")) | 0);
            _loc4_ = -(Number(_loc5_.attribute("y")) | 0);
            _loc7_ = _loc5_.attribute("source").toString();
            if ((Number(_loc5_.attribute("flipH")) | 0) > 0) {
                if (_loc7_.length > 0) {
                    _loc8_ = true;
                }
            }
            if ((Number(_loc5_.attribute("flipV")) | 0) > 0) {
                if (_loc7_.length > 0) {
                    _loc6_ = true;
                }
            }
            _loc9_ = (Number(_loc5_.attribute("usesPalette")) | 0) != 0;
            if (_loc7_.length == 0) {
                _loc7_ = param1;
            }
            _loc11_ = this._SafeStr_2617.getAssetByName(_loc7_);
            if (_loc11_ != null) {
                if (this.createAsset(param1, _loc7_, _loc11_, _loc8_, _loc6_, _loc3_, _loc4_, _loc9_)) {
                    return this._assets[param1];
                }
                _loc10_ = this.getAsset(param1);
                if (_loc10_ != null && _loc10_.assetName != _loc10_.libraryAssetName) {
                    if (!this.replaceAsset(param1, _loc7_, _loc11_, _loc8_, _loc6_, _loc3_, _loc4_, _loc9_)) {
                        return null;
                    }
                }
            }
        }
        return null;
    }

    public getAssetWithPalette(param1: string, param2: string): IGraphicAsset {
        let _loc3_: IGraphicAsset = null;
        let _loc6_: string = null;
        let _loc4_: BitmapDataAsset = null;
        let _loc10_: BitmapData = null;
        let _loc7_: GraphicAssetPalette = null;
        let _loc5_: BitmapData = null;
        let _loc8_: string = param1 + "@" + param2;
        let _loc9_: IGraphicAsset = this.getAsset(_loc8_);
        if (_loc9_ == null) {
            _loc3_ = this.getAsset(param1);
            if (_loc3_ == null || !_loc3_.usesPalette) {
                return _loc3_;
            }
            _loc6_ = _loc3_.libraryAssetName + "@" + param2;
            _loc4_ = this.getLibraryAsset(_loc6_);
            if (_loc4_ == null) {
                _loc10_ = asInstanceOf(_loc3_.asset.content, BitmapData);
                if (_loc10_ != null) {
                    _loc7_ = this.getPalette(param2);
                    if (_loc7_ == null) {
                        return _loc3_;
                    }
                    _loc5_ = _loc10_.clone();
                    _loc7_.colorizeBitmap(_loc5_);
                    _loc4_ = this.addLibraryAsset(_loc6_, _loc5_);
                    if (_loc4_ == null) {
                        _loc5_.dispose();
                        return null;
                    }
                }
            }
            this._paletteAssetNames.push(_loc8_);
            this.createAsset(_loc8_, _loc6_, _loc4_, _loc3_.flipH, _loc3_.flipV, _loc3_.originalOffsetX, _loc3_.originalOffsetY, false);
            _loc9_ = this.getAsset(_loc8_);
        }
        return _loc9_;
    }

    public getPaletteNames(): any[] {
        return this._palettes.getKeys();
    }

    public getPaletteColors(param1: string): any[] {
        let _loc2_: GraphicAssetPalette = this.getPalette(param1);
        if (_loc2_ != null) {
            return [_loc2_.primaryColor, _loc2_.secondaryColor];
        }
        return null;
    }

    public getPaletteXML(param1: string): XML {
        return this._SafeStr_5346[param1];
    }

    private getPalette(param1: string): GraphicAssetPalette {
        return this._palettes[param1];
    }

    public addAsset(param1: string, param2: BitmapData, param3: boolean, param4: number = 0, param5: number = 0, param6: boolean = false, param7: boolean = false): boolean {
        let _loc9_: BitmapData = null;
        if (param1 == null || param2 == null) {
            return false;
        }
        if (this._SafeStr_2617 == null) {
            return false;
        }
        let _loc8_: BitmapDataAsset = this.getLibraryAsset(param1);
        if (_loc8_ == null) {
            _loc8_ = new BitmapDataAsset(this._SafeStr_2617.getAssetTypeDeclarationByClass(BitmapDataAsset));
            this._SafeStr_2617.setAsset(param1, _loc8_);
            _loc8_.setUnknownContent(param2);
            return this.createAsset(param1, param1, _loc8_, param6, param7, param4, param5, false);
        }
        if (param3) {
            _loc9_ = asInstanceOf(_loc8_.content, BitmapData);
            if (_loc9_ != null && _loc9_ != param2) {
                _loc9_.dispose();
            }
            _loc8_.setUnknownContent(param2);
            return true;
        }
        return false;
    }

    public disposeAsset(param1: string): void {
        let _loc3_: BitmapDataAsset = null;
        let _loc2_: GraphicAsset = this._assets.remove(param1);
        if (_loc2_ != null) {
            _loc3_ = this.getLibraryAsset(_loc2_.libraryAssetName);
            if (_loc3_ != null) {
                this._SafeStr_2617.removeAsset(_loc3_);
                _loc3_.dispose();
            }
            _loc2_.recycle();
        } else {
            this._SafeStr_2999.delete(param1);
        }
    }

    private getLibraryAsset(param1: string): BitmapDataAsset {
        return asInstanceOf(this._SafeStr_2617.getAssetByName(param1), BitmapDataAsset);
    }

    private addLibraryAsset(param1: string, param2: BitmapData): BitmapDataAsset {
        let _loc3_: BitmapDataAsset = this.getLibraryAsset(param1);
        if (_loc3_ == null) {
            _loc3_ = new BitmapDataAsset(this._SafeStr_2617.getAssetTypeDeclarationByClass(BitmapDataAsset));
            this._SafeStr_2617.setAsset(param1, _loc3_);
            _loc3_.setUnknownContent(param2);
            return _loc3_;
        }
        return null;
    }

    private disposePaletteAssets(param1: boolean = true): void {
        if (this._paletteAssetNames != null) {
            if (param1 || this._paletteAssetNames.length > 10) {
                for (const _loc2_ of this._paletteAssetNames ?? []) {
                    this.disposeAsset(stringOrNull(_loc2_));
                }
                this._paletteAssetNames = [];
            }
        }
    }

    public get assetLibrary(): IAssetLibrary {
        return this._SafeStr_2617;
    }

    get [IGraphicAssetCollection](): true {
        return true;
    }
}
