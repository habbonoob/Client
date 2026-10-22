import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Game2ExitGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2ExitGameMessageComposer';
import { SnowWarEngine, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarAnimatedWindowElement } from '@/com/sulake/habbo/game/snowwar/utils/SnowWarAnimatedWindowElement';

export class SnowWarUI implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::SnowWarUI'); }

    private static readonly EMPTY_AMMO_FLASH_FRAMES: number = 4;
    private static readonly EMPTY_AMMO_FRAME_LENGTH: number = 75;
    private static readonly SCORE_FLASH_FRAMES: number = 4;
    private static readonly SCORE_FRAME_LENGTH: number = 50;
    private static readonly MAX_SNOWBALLS: number = 5;
    private static readonly MAX_ENERGY: number = 5;

    declare private _gameEngine: SnowWarEngine;

    declare private _exit: IWindowContainer;

    declare private _snowballs: IWindowContainer;

    declare private _SafeStr_2681: IWindowContainer;

    declare private _SafeStr_2458: IWindowContainer;

    declare private _teamScores: IWindowContainer;

    declare private _SafeStr_2759: IWindowContainer;

    declare private _checksumIndicatorColor: RGBColor;

    declare private _tweenColor: RGBColor;

    declare private _SafeStr_2371: IBitmapWrapperWindow;

    private _disposed: boolean = false;
    private _countDown: number = 1;

    declare private _timeSinceLastUpdate: number;
    static { (this.prototype as any)._timeSinceLastUpdate = 0; }

    private _SafeStr_6507: number = -1;
    private _SafeStr_5513: number = 5;

    declare private _SafeStr_5432: IBitmapWrapperWindow;

    private _makingSnowballs: boolean = false;
    private _SafeStr_6214: number = 5;

    declare private _SafeStr_4229: IBitmapWrapperWindow;

    declare private _SafeStr_3076: SnowWarAnimatedWindowElement;

    declare private _emptyAmmoFlash: IBitmapWrapperWindow;

    declare private _emptyAmmoAnimation: SnowWarAnimatedWindowElement;

    declare private _SafeStr_4250: IBitmapWrapperWindow;

    private _SafeStr_3496: number = 0;
    private _scoreBackgroundAsset: string = "";

    declare private _SafeStr_3092: Timer;

    declare private _SafeStr_4473: boolean;
    static { (this.prototype as any)._SafeStr_4473 = false; }

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
        this._gameEngine.windowManager.getDesktop(1).visible = false;
        this._SafeStr_4473 = this._gameEngine.sessionDataManager.hasSecurity(4);
        if (this._SafeStr_4473) {
            this._checksumIndicatorColor = new RGBColor();
            this._tweenColor = new RGBColor(16777215);
        }
    }

    public dispose(): void {
        this._gameEngine.windowManager.getDesktop(1).visible = true;
        this._gameEngine = null;
        if (this._exit) {
            this._exit.dispose();
            this._exit = null;
        }
        if (this._snowballs) {
            this._SafeStr_5432 = null;
            this._SafeStr_4229 = null;
            this._emptyAmmoFlash = null;
            this._snowballs.dispose();
            this._snowballs = null;
        }
        if (this._SafeStr_2681) {
            this._SafeStr_4250 = null;
            this._SafeStr_2681.dispose();
            this._SafeStr_2681 = null;
        }
        if (this._SafeStr_2458) {
            this._SafeStr_2458.dispose();
            this._SafeStr_2458 = null;
        }
        if (this._teamScores) {
            this._teamScores.dispose();
            this._teamScores = null;
        }
        if (this._SafeStr_2371) {
            this._SafeStr_2371.dispose();
            this._SafeStr_2371 = null;
        }
        if (this._emptyAmmoAnimation != null) {
            this._emptyAmmoAnimation.dispose();
            this._emptyAmmoAnimation = null;
        }
        if (this._SafeStr_2759) {
            this._SafeStr_2759.dispose();
            this._SafeStr_2759 = null;
        }
        if (this._SafeStr_3092) {
            this._SafeStr_3092.removeEventListener("timerComplete", this.onTimerHider);
            this._SafeStr_3092.stop();
            this._SafeStr_3092 = null;
        }
        this.disposeLoadIcon();
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public init(): void {
        this._exit = asGuarded(WindowUtils.createWindow("snowwar_exit"), isIWindowContainer);
        this._exit.addEventListener("WME_CLICK", this.onExit);
        this._exit.x = 0;
        this._exit.y = 10;
        this._snowballs = asGuarded(WindowUtils.createWindow("snowwar_snowballs"), isIWindowContainer);
        let _loc1_: IWindow = this._snowballs.findChildByName("make_snowball");
        _loc1_.addEventListener("WME_DOWN", this.onMakeSnowballDown);
        _loc1_.addEventListener("WME_UP", this.onMakeSnowballUp);
        _loc1_.addEventListener("WME_OUT", this.onMakeSnowballUp);
        this._snowballs.center();
        this._snowballs.x = 10;
        this._SafeStr_5432 = asGuarded(this._snowballs.findChildByName("makeSnowballImage"), isIBitmapWrapperWindow);
        this._emptyAmmoFlash = asGuarded(this._snowballs.findChildByName("emptyFlashImage"), isIBitmapWrapperWindow);
        this._emptyAmmoFlash.visible = false;
        this._emptyAmmoAnimation = new SnowWarAnimatedWindowElement(this._gameEngine.assets, this._emptyAmmoFlash, "ui_no_balls_", 4, 75, true);
        this._SafeStr_4229 = asGuarded(this._snowballs.findChildByName("ballProgress"), isIBitmapWrapperWindow);
        this._SafeStr_2681 = asGuarded(WindowUtils.createWindow("snowwar_own_stats"), isIWindowContainer);
        this._SafeStr_2681.x = 10;
        this._SafeStr_2681.y = this._SafeStr_2681.desktop.height - this._SafeStr_2681.height - 10;
        this._SafeStr_4250 = asGuarded(this._SafeStr_2681.findChildByName("backgroundFlashImage"), isIBitmapWrapperWindow);
        this.updateUserImage();
        this._teamScores = asGuarded(WindowUtils.createWindow("snowwar_team_scores"), isIWindowContainer);
        this._teamScores.x = this._teamScores.desktop.width - this._teamScores.width - 10;
        this._teamScores.y = 10;
        this._teamScores.visible = this._gameEngine.gameArena.numberOfTeams != 1;
        this._SafeStr_2458 = asGuarded(WindowUtils.createWindow("snowwar_timer"), isIWindowContainer);
        this._SafeStr_2458.x = this._SafeStr_2458.desktop.width - this._SafeStr_2458.width - 50;
        this._SafeStr_2458.y = 105;
        this.timer = 0;
        this._SafeStr_2371 = asGuarded(WindowUtils.createWindow("counter"), isIBitmapWrapperWindow);
        this._SafeStr_2371.center();
        if (this._SafeStr_4473) {
            this._SafeStr_2458.getChildByName("checksumIndicator").visible = true;
            this._checksumIndicatorColor.fromInt(this._SafeStr_2458.color);
        }
        this._SafeStr_5513 = 5;
    }

    public avatarImageReady(param1: string): void {
        this.updateUserImage();
    }

    private updateUserImage(): void {
        let _loc1_: BitmapData = null;
        let _loc3_: string = this._gameEngine.sessionDataManager.figure;
        let _loc2_: string = this._gameEngine.sessionDataManager.gender;
        let _loc4_: IAvatarImage = this._gameEngine.avatarManager.createAvatarImage(_loc3_, "h", _loc2_, this);
        if (_loc4_ != null) {
            _loc4_.setDirection("full", 2);
            _loc1_ = _loc4_.getCroppedImage("head");
            _loc4_.dispose();
            WindowUtils.setElementImage(this._SafeStr_2681.findChildByName("user_image"), _loc1_);
            _loc1_.dispose();
        }
    }

    private getBitmap(param1: string): BitmapData {
        return asInstanceOf(this._gameEngine.assets.getAssetByName(param1).content, BitmapData);
    }

    private getElement(param1: IWindowContainer, param2: string): IWindow {
        return param1.findChildByName(param2);
    }

    private onMakeSnowballDown = (param1: WindowMouseEvent): void => {
        this.makeSnowballButtonPressed(true);
        if (this._gameEngine.makeSnowball()) {
            this.startWaitingForSnowball();
        }
    };

    private onMakeSnowballUp = (param1: WindowMouseEvent): void => {
        this.makeSnowballButtonPressed(false);
    };

    public startWaitingForSnowball(): void {
        if (this._SafeStr_3076 != null) {
            this._SafeStr_3076.dispose();
            this._SafeStr_3076 = null;
        }
        this._SafeStr_3076 = new SnowWarAnimatedWindowElement(this._gameEngine.assets, this._SafeStr_4229, "load_", 8);
        SnowWarEngine.playSound("HBSTG_snowwar_make_snowball");
    }

    public stopWaitingForSnowball(): void {
        this.disposeLoadIcon();
        SnowWarEngine.stopSound("HBSTG_snowwar_make_snowball");
        if (this._makingSnowballs) {
            this.onMakeSnowballDown(null);
        }
    }

    private disposeLoadIcon(): void {
        if (this._SafeStr_3076 != null) {
            this._SafeStr_3076.dispose();
            this._SafeStr_3076 = null;
        }
    }

    private onExit = (param1: WindowMouseEvent): void => {
        if (!this._SafeStr_2759) {
            this._SafeStr_2759 = asGuarded(WindowUtils.createWindow("snowwar_exit_confirmation"), isIWindowContainer);
            this._SafeStr_2759.findChildByName("yes").addEventListener("WME_CLICK", this.confirmationHandler);
            this._SafeStr_2759.findChildByName("no").addEventListener("WME_CLICK", this.confirmationHandler);
            this._SafeStr_2759.findChildByTag("close").addEventListener("WME_CLICK", this.confirmationHandler);
        } else {
            this._SafeStr_2759.visible = true;
            this._SafeStr_2759.activate();
        }
    };

    private confirmationHandler = (param1: WindowMouseEvent): void => {
        if (param1.window.name == "yes") {
            this._gameEngine.send(new Game2ExitGameMessageComposer());
            this._gameEngine.resetGameSession();
            this._gameEngine.resetRoomSession();
        } else {
            this._SafeStr_2759.visible = false;
        }
    };

    public set snowballs(param1: number) {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < 5) {
            this._snowballs.findChildByName("ball_" + _loc3_).visible = _loc3_ < param1;
            _loc3_++;
        }
        this._SafeStr_6214 = param1;
        let _loc2_: IWindow = this._snowballs.findChildByName("ball_" + param1);
        if (_loc2_ != null) {
            this._SafeStr_4229.x = _loc2_.x;
            this._SafeStr_4229.y = _loc2_.y;
        }
    }

    public set ownScore(param1: number) {
        WindowUtils.setCaption(this._SafeStr_2681.findChildByName("personal_score"), param1.toString());
    }

    public set timer(param1: number) {
        if (this._SafeStr_4473) {
            if (this._checksumIndicatorColor) {
                this._checksumIndicatorColor.tweenTo(this._tweenColor);
                this._SafeStr_2458.getChildByName("checksumIndicator").color = this._checksumIndicatorColor.rgb;
            }
        }
        if (this._SafeStr_6507 == param1) {
            return;
        }
        this._SafeStr_6507 = param1;
        let _loc2_: string = "" + (param1 / 60 | 0);
        let _loc3_: string = "" + param1 % 60;
        if ((Number(_loc2_) | 0) < 10) {
            _loc2_ = "0" + _loc2_;
        }
        if ((Number(_loc3_) | 0) < 10) {
            _loc3_ = "0" + _loc3_;
        }
        WindowUtils.showElement(this._SafeStr_2458, "time_left");
        WindowUtils.setCaption(this._SafeStr_2458.findChildByName("time_left"), _loc2_ + ":" + _loc3_);
        if (param1 <= 5 && param1 > 0) {
            SnowWarEngine.playSound("HBST_call_for_help");
            if (!this._SafeStr_3092) {
                this._SafeStr_3092 = new Timer(500, 1);
                this._SafeStr_3092.addEventListener("timerComplete", this.onTimerHider);
            }
            this._SafeStr_3092.reset();
            this._SafeStr_3092.start();
        }
    }

    private onTimerHider = (param1: TimerEvent): void => {
        if (this._SafeStr_2458) {
            WindowUtils.hideElement(this._SafeStr_2458, "time_left");
        }
    };

    public set hitPoints(param1: number) {
        if (this._SafeStr_5513 != param1) {
            WindowUtils.setElementImage(this.getElement(this._SafeStr_2681, "energy_bar"), this.getBitmap("ui_me_health_" + Math.min(5, param1)));
            this._SafeStr_5513 = param1;
        }
    }

    public showChecksumError(param1: number): void {
        if (this._SafeStr_4473) {
            this._SafeStr_2458.color = param1;
            if (this._checksumIndicatorColor) {
                this._checksumIndicatorColor.fromInt(param1);
            }
        }
    }

    public initCounter(): void {
        this._timeSinceLastUpdate = 0;
        this._countDown = 1;
    }

    public update(param1: number): void {
        this.updateAmmoDisplay();
        this.updateCounterImage(param1);
        this.updateScoreFlash(param1);
        this.updateTeamScores();
    }

    private updateScoreFlash(param1: number): void {
        let _loc2_: number = 0;
        if (this._SafeStr_3496 > 0) {
            _loc2_ = this._SafeStr_3496 / 50 + 1 | 0;
            if (_loc2_ > 4) {
                this._SafeStr_3496 = 0;
                this._SafeStr_4250.visible = false;
            } else {
                this._SafeStr_3496 += param1;
                this._SafeStr_4250.visible = true;
                WindowUtils.setElementImage(this._SafeStr_4250, this.getBitmap(this._scoreBackgroundAsset + _loc2_));
            }
        }
    }

    public flashOwnScore(param1: boolean): void {
        this._SafeStr_3496 = 1;
        this._scoreBackgroundAsset = param1 ? "ui_me_plus_" : "ui_me_minus_";
    }

    private updateAmmoDisplay(): void {
        this._emptyAmmoFlash.visible = this._SafeStr_6214 == 0 && this._SafeStr_3076 == null;
    }

    private updateCounterImage(param1: number): void {
        let _loc2_: BitmapData = null;
        let _loc3_: Point = null;
        let _loc5_: boolean = false;
        this._timeSinceLastUpdate += param1;
        if (this._countDown < 6) {
            if (this._timeSinceLastUpdate >= 1000) {
                _loc5_ = true;
                this._timeSinceLastUpdate = 0;
            }
        } else if (this._countDown < 11) {
            if (this._timeSinceLastUpdate > 100) {
                _loc5_ = true;
                this._timeSinceLastUpdate = 0;
            }
        } else if (this._SafeStr_2371) {
            this._SafeStr_2371.dispose();
            this._SafeStr_2371 = null;
        }
        if (!_loc5_ || this._disposed || !this._SafeStr_2371) {
            return;
        }
        let _loc4_: BitmapDataAsset = asInstanceOf(this._gameEngine.assets.getAssetByName(this.padName("explosion", this._countDown)), BitmapDataAsset);
        if (_loc4_) {
            _loc2_ = asInstanceOf(_loc4_.content, BitmapData);
            if (!this._SafeStr_2371.bitmap) {
                this._SafeStr_2371.bitmap = new BitmapData(this._SafeStr_2371.width, this._SafeStr_2371.height, true, 16777215);
            }
            this._SafeStr_2371.bitmap.fillRect(this._SafeStr_2371.bitmap.rect, 16777215);
            _loc3_ = new Point(-_loc4_.offset.x, -_loc4_.offset.y);
            this._SafeStr_2371.bitmap.copyPixels(_loc2_, _loc2_.rect, _loc3_, null, null, true);
            this._SafeStr_2371.invalidate();
        }
        this._countDown = this._countDown + 1;
    }

    private padName(param1: string, param2: number, param3: number = 4): string {
        let _loc4_: string = param2.toString();
        while (_loc4_.length < param3) {
            _loc4_ = "0" + _loc4_;
        }
        return param1 + _loc4_;
    }

    private updateTeamScores(): void {
        let _loc1_: any[] = this._gameEngine.gameArena.getTeamScores();
        if (_loc1_.length >= 2) {
            WindowUtils.setCaption(this._teamScores.findChildByName("score_blue"), stringOrNull(_loc1_[0]));
            WindowUtils.setCaption(this._teamScores.findChildByName("score_red"), stringOrNull(_loc1_[1]));
        }
    }

    private makeSnowballButtonPressed(param1: boolean): void {
        if (this._makingSnowballs != param1) {
            WindowUtils.setElementImage(this._SafeStr_5432, this.getBitmap("ui_make_balls_" + (param1 ? "down" : "up")));
        }
        this._makingSnowballs = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}

class RGBColor {
    declare private _r: number;
    static { (this.prototype as any)._r = 0; }

    declare private _g: number;
    static { (this.prototype as any)._g = 0; }

    declare private _b: number;
    static { (this.prototype as any)._b = 0; }

    declare private _a: number;
    static { (this.prototype as any)._a = 0; }

    constructor(param1: number = 0) {
        this.fromInt(param1);
    }

    public get r(): number {
        return this._r;
    }

    public get g(): number {
        return this._g;
    }

    public get b(): number {
        return this._b;
    }

    public get a(): number {
        return this._a;
    }

    public fromInt(param1: number): void {
        this._a = (param1 >> 24 & 0xFF) >>> 0;
        this._r = (param1 >> 16 & 0xFF) >>> 0;
        this._g = (param1 >> 8 & 0xFF) >>> 0;
        this._b = (param1 >> 0 & 0xFF) >>> 0;
    }

    public get rgb(): number {
        return (this._a << 24 | this._r << 16 | this._g << 8 | this._b) >>> 0;
    }

    public tweenTo(param1: RGBColor): void {
        this._a = this._a + (param1.a - this.a) / 24 >>> 0;
        this._r = this._r + (param1.r - this.r) / 24 >>> 0;
        this._g = this._g + (param1.g - this.g) / 24 >>> 0;
        this._b = this._b + (param1.b - this.b) / 24 >>> 0;
    }
}
