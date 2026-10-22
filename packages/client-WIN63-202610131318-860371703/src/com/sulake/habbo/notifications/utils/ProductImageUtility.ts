import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class ProductImageUtility implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.notifications.utils::ProductImageUtility'); }

    declare private _roomEngine: IRoomEngine;

    declare private _inventory: IHabboInventory;

    constructor(param1: IRoomEngine, param2: IHabboInventory) {
        this._roomEngine = param1;
        this._inventory = param2;
    }

    public dispose(): void {
        this._roomEngine = null;
        this._inventory = null;
    }

    public getProductImage(param1: string, param2: number, param3: string): BitmapData {
        let _loc7_: BitmapDataAsset = null;
        let _loc4_: ImageResult = null;
        let _loc6_: BitmapData = null;
        let _loc5_: number = 0;
        switch (param1) {
            case "s":
                _loc4_ = this._roomEngine.getFurnitureIcon(param2, this);
                break;
            case "i":
                _loc5_ = this.tempCategoryMapping("I", param2);
                if (_loc5_ == 1) {
                    _loc4_ = this._roomEngine.getWallItemIcon(param2, this, param3);
                } else {
                    switch (_loc5_ - 2) {
                        case 0:
                            _loc7_ = asInstanceOf((this._inventory instanceof Component ? this._inventory : null).assets.getAssetByName("icon_wallpaper_png"), BitmapDataAsset);
                            if (_loc7_ != null) {
                                _loc6_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
                            }
                            break;
                        case 1:
                            _loc7_ = asInstanceOf((this._inventory instanceof Component ? this._inventory : null).assets.getAssetByName("icon_floor_png"), BitmapDataAsset);
                            if (_loc7_ != null) {
                                _loc6_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
                            }
                            break;
                        case 2:
                            _loc7_ = asInstanceOf((this._inventory instanceof Component ? this._inventory : null).assets.getAssetByName("icon_landscape_png"), BitmapDataAsset);
                            if (_loc7_ != null) {
                                _loc6_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
                            }
                    }
                    _loc4_ = null;
                }
                break;
            case "e":
                _loc7_ = asInstanceOf((this._inventory instanceof Component ? this._inventory : null).assets.getAssetByName("fx_icon_" + param2 + "_png"), BitmapDataAsset);
                if (_loc7_ != null) {
                    _loc6_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
                }
                break;
            default:
                Logger.log("[HabboNotifications] Can not yet handle this type of product: ");
        }
        if (_loc4_ != null) {
            _loc6_ = _loc4_.data;
        }
        return _loc6_;
    }

    public imageReady(param1: number, param2: BitmapData): void {
    }

    public imageFailed(param1: number): void {
    }

    private tempCategoryMapping(param1: string, param2: number): number {
        if (param1 == "S") {
            return 1;
        }
        if (param1 == "I") {
            if (param2 == 3001) {
                return 2;
            }
            if (param2 == 3002) {
                return 3;
            }
            if (param2 == 4057) {
                return 4;
            }
            return 1;
        }
        return 1;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
