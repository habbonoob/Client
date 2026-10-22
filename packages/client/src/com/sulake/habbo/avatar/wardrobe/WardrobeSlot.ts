import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IOutfit } from '@/com/sulake/habbo/avatar/IOutfit';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WardrobeSlot implements IOutfit, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar.wardrobe::WardrobeSlot'); }

    constructor(param1: IWindow, param2: HabboAvatarEditor, param3: number, param4: boolean, param5: string = null, param6: string = null) {
        this._controller = param2;
        this._SafeStr_5501 = param3;
        this.createView(param1);
        this.update(param5, param6, param4);
    }

    declare private _controller: HabboAvatarEditor;

    declare private _figure: string;

    declare private _gender: string;

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    declare private _view: IWindowContainer;

    declare private _SafeStr_2766: IBitmapWrapperWindow;

    declare private _SafeStr_5501: number;
    static { (this.prototype as any)._SafeStr_5501 = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get id(): number {
        return this._SafeStr_5501;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public update(param1: string, param2: string, param3: boolean): void {
        switch (param2) {
            case "M":
            case "m":
            case "M":
                param2 = "M";
                break;
            case "F":
            case "f":
            case "F":
                param2 = "F";
        }
        this._figure = param1;
        this._gender = param2;
        this._isEnabled = param3;
        this.updateView();
    }

    public dispose(): void {
        this._controller = null;
        this._figure = null;
        this._gender = null;
        this._SafeStr_2766 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._disposed = true;
    }

    public updateView(): void {
        let _loc1_: BitmapData = null;
        let _loc5_: IAvatarImage = null;
        let _loc9_: BitmapDataAsset = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc8_: boolean = true;
        let _loc6_: boolean = this._controller.manager.getBoolean("zoom.enabled");
        if (this._figure && this._isEnabled) {
            _loc5_ = this._controller.manager.avatarRenderManager.createAvatarImage(this.figure, _loc6_ ? "h" : "sh", this._gender, this);
            if (_loc5_) {
                _loc5_.setDirection("full", 4);
                _loc1_ = _loc5_.getCroppedImage("full", _loc6_ ? 0.5 : 1);
                _loc5_.dispose();
            }
        } else {
            _loc9_ = asInstanceOf(this._controller.manager.windowManager.assets.getAssetByName("avatar_editor_wardrobe_empty_slot"), BitmapDataAsset);
            if (_loc9_) {
                _loc1_ = asInstanceOf(_loc9_.content, BitmapData);
                _loc8_ = false;
            }
        }
        if (!_loc1_) {
            return;
        }
        if (this._SafeStr_2766) {
            if (this._SafeStr_2766.bitmap) {
                this._SafeStr_2766.bitmap.dispose();
            }
            this._SafeStr_2766.bitmap = new BitmapData(this._SafeStr_2766.width, this._SafeStr_2766.height, true, 0);
            _loc3_ = (this._SafeStr_2766.width - _loc1_.width) / 2 | 0;
            _loc4_ = (this._SafeStr_2766.height - _loc1_.height) / 2 | 0;
            this._SafeStr_2766.bitmap.draw(_loc1_, new Matrix(1, 0, 0, 1, _loc3_, _loc4_));
        }
        if (_loc8_) {
            _loc1_.dispose();
        }
        let _loc7_: IContainerButtonWindow = asGuarded(this._view.findChildByName("set_button"), isIContainerButtonWindow);
        if (_loc7_) {
            _loc7_.visible = this._isEnabled;
        }
        let _loc2_: IContainerButtonWindow = asGuarded(this._view.findChildByName("get_button"), isIContainerButtonWindow);
        if (_loc2_) {
            _loc2_.visible = this._isEnabled && this._figure != null;
        }
    }

    public avatarImageReady(param1: string): void {
        this.updateView();
    }

    private createView(param1: IWindow): void {
        this._view = asGuarded(param1.clone(), isIWindowContainer);
        this._view.procedure = this.eventHandler;
        this._view.visible = false;
        this._SafeStr_2766 = asGuarded(this._view.findChildByName("image"), isIBitmapWrapperWindow);
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (!this._controller.verifyClubLevel()) {
            return;
        }
        switch (param2.name) {
            case "set_button":
                this._figure = this._controller.figureData.getFigureString();
                this._gender = this._controller.gender;
                this._controller.handler.saveWardrobeOutfit(this._SafeStr_5501, this);
                this.updateView();
                break;
            case "get_button":
            case "get_figure":
                if (this._figure) {
                    this._controller.setNftOutfit(null);
                    this._controller.loadAvatarInEditor(this._figure, this._gender, this._controller.clubMemberLevel);
                }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
