import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class CatalogObjectMover implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::CatalogObjectMover'); }

    private static readonly OVERLAY_SPRITE_NAME: string = "CatalogOverlaySprite";

    declare private _roomEngine: IRoomEngine;

    declare private _mainContainer: IWindowContainer;

    private _state: boolean = false;

    constructor() {
    }

    public set roomEngine(param1: IRoomEngine) {
        this._roomEngine = param1;
    }

    public set mainContainer(param1: IWindowContainer) {
        this._mainContainer = param1;
    }

    public get state(): boolean {
        return this._state;
    }

    public dispose(): void {
        this.releaseOverlaySprite();
        this._mainContainer = null;
        this._roomEngine = null;
        this._state = false;
    }

    public imageReady(param1: number, param2: BitmapData): void {
    }

    public imageFailed(param1: number): void {
    }

    public onMainContainerEvent(param1: WindowEvent, param2: IWindow, param3: ISelectedRoomObjectData): void {
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: ImageResult = null;
        if (this._roomEngine == null) {
            return;
        }
        let _loc5_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        switch (param1.type) {
            case "WME_MOVE":
                if (param3 == null || param3.operation != "OBJECT_PLACE") {
                    return;
                }
                _loc4_ = _loc5_.stageX | 0;
                _loc7_ = _loc5_.stageY | 0;
                if (this.getIconSprite() == null) {
                    _loc6_ = this.getFurniImageResult(param3);
                    if (_loc6_ == null) {
                        return;
                    }
                    this.createOverlaySprite(_loc6_.data);
                }
                this._state = true;
                this.moveOverlaySprite(_loc4_, _loc7_);
                break;
            case "WME_OUT":
                if (this._state) {
                    if (_loc5_.localX >= 0 && _loc5_.localX < param1.target.width && _loc5_.localY >= 0 && _loc5_.localY < param1.target.height) {
                        return;
                    }
                    this.resetIcon();
                }
        }
    }

    public resetIcon(): void {
        if (this._state) {
            this.releaseOverlaySprite();
            this._state = false;
        }
    }

    private getFurniImageResult(param1: ISelectedRoomObjectData): ImageResult {
        let _loc2_: any = null;
        if (param1 == null || this._roomEngine == null) {
            return null;
        }
        if (param1.category == 10) {
            return this._roomEngine.getFurnitureIcon(param1.typeId, this);
        }
        if (param1.category == 20) {
            return this._roomEngine.getWallItemIcon(param1.typeId, this, param1.instanceData);
        }
        return null;
    }

    private createOverlaySprite(param1: BitmapData): void {
        if (param1 == null || this._mainContainer == null || this._mainContainer.desktop == null || this.getIconSprite() != null) {
            return;
        }
        let _loc4_: Sprite = asInstanceOf(this._mainContainer.desktop.getDisplayObject(), Sprite);
        let _loc2_: Sprite = new Sprite();
        _loc2_.name = "CatalogOverlaySprite";
        _loc2_.mouseEnabled = false;
        _loc2_.visible = true;
        let _loc3_: Bitmap = new Bitmap(param1);
        _loc2_.addChild(_loc3_);
        _loc4_.addChild(_loc2_);
    }

    private getIconSprite(): Sprite {
        if (this._mainContainer == null || this._mainContainer.desktop == null) {
            return null;
        }
        let _loc2_: Sprite = asInstanceOf(this._mainContainer.desktop.getDisplayObject(), Sprite);
        return asInstanceOf(_loc2_.getChildByName("CatalogOverlaySprite"), Sprite);
    }

    private moveOverlaySprite(param1: number, param2: number): void {
        let _loc3_: Sprite = this.getIconSprite();
        if (_loc3_ == null) {
            return;
        }
        _loc3_.x = param1 - Math.round(_loc3_.width / 2);
        _loc3_.y = param2 - Math.round(_loc3_.height / 2);
    }

    private releaseOverlaySprite(): void {
        if (this._mainContainer == null || this._mainContainer.desktop == null || this.getIconSprite() == null) {
            return;
        }
        let _loc3_: Sprite = asInstanceOf(this._mainContainer.desktop.getDisplayObject(), Sprite);
        let _loc1_: Sprite = asInstanceOf(_loc3_.getChildByName("CatalogOverlaySprite"), Sprite);
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: Bitmap = asInstanceOf(_loc1_.removeChildAt(0), Bitmap);
        if (_loc2_ != null && _loc2_.bitmapData != null) {
            _loc2_.bitmapData.dispose();
        }
        _loc3_.removeChild(_loc3_.getChildByName("CatalogOverlaySprite"));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
