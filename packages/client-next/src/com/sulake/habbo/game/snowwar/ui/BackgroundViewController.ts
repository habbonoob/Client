import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';

export class BackgroundViewController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::BackgroundViewController'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _gameEngine: SnowWarEngine;

    declare private _background: IWindowContainer;

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._gameEngine = null;
        if (this._background) {
            this._background.dispose();
            this._background = null;
        }
        this._disposed = true;
    }

    public get background(): IWindow {
        if (!this._background) {
            this.createView();
        }
        return this._background;
    }

    private createView(): void {
        let _loc1_: IDesktopWindow = this._gameEngine.windowManager.getDesktop(0);
        this._background = asGuarded(WindowUtils.createWindow("snowwar_loading_background_xml", 1), isIWindowContainer);
        this._background.width = _loc1_.width;
        this._background.height = _loc1_.height;
        _loc1_.addChildAt(this._background, 0);
        this.setBitmap("bg_sky", "sky", this._background);
        this.setBitmap("bg_sunshine", "sunshine", this._background);
        this.setBitmap("bg_vista_1", "vista_1", this._background, true);
        this.setBitmap("bg_vista_2", "vista_2", this._background, true);
        this.setBitmap("bg_vista_3", "vista_3", this._background, true);
    }

    private setBitmap(param1: string, param2: string, param3: IWindowContainer, param4: boolean = false): void {
        let _loc8_: BitmapData = null;
        let _loc6_: number = 0;
        let _loc9_: BitmapDataAsset = asInstanceOf(this._gameEngine.assets.getAssetByName(param1), BitmapDataAsset);
        let _loc7_: IBitmapWrapperWindow = asGuarded(param3.findChildByName(param2), isIBitmapWrapperWindow);
        let _loc5_: BitmapData = asInstanceOf(_loc9_.content, BitmapData);
        if (param4) {
            _loc8_ = new BitmapData(param3.width, _loc5_.height, true, 0);
            _loc6_ = 0;
            while (_loc6_ < param3.width / _loc5_.width + 1) {
                _loc8_.copyPixels(_loc5_, _loc5_.rect, new Point(_loc6_ * _loc5_.width, 0));
                _loc6_++;
            }
            _loc7_.bitmap = _loc8_;
        } else {
            _loc7_.bitmap = _loc5_;
            _loc7_.disposesBitmap = false;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
