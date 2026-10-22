import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AchievementsResolutionController } from '@/com/sulake/habbo/quest/AchievementsResolutionController';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class AchievementResolutionProgressView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementResolutionProgressView'); }

    private static readonly PROGRESSBAR_LEFT: string = "achieved_left";
    private static readonly PROGRESSBAR_MID: string = "achieved_mid";
    private static readonly PROGRESSBAR_RIGHT: string = "achieved_right";

    constructor(param1: AchievementsResolutionController) {
        this._controller = param1;
    }

    declare private _SafeStr_7082: number;
    static { (this.prototype as any)._SafeStr_7082 = 0; }

    declare private _controller: AchievementsResolutionController;

    declare private _window: IFrameWindow;

    declare private _achievementId: number;
    static { (this.prototype as any)._achievementId = 0; }

    declare private _badgeCode: string;

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    public get stuffId(): number {
        return this._stuffId;
    }

    public get disposed(): boolean {
        return this._controller == null;
    }

    public get achievementId(): number {
        return this._achievementId;
    }

    public get visible(): boolean {
        if (!this._window) {
            return false;
        }
        return this._window.visible;
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
    }

    public show(param1: number, param2: number, param3: string, param4: number, param5: number, param6: number): void {
        if (this._window == null) {
            this.createWindow();
        }
        if (param2 != this._achievementId) {
            this.initializeWindow();
            this._window.center();
        }
        this._stuffId = param1;
        this._achievementId = param2;
        this._badgeCode = param3;
        this.setProgress(param4, param5);
        this.setBadge(this._badgeCode);
        this.setLocalizations();
        this.setCountdown(param6);
        this._window.visible = true;
    }

    public close(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    private setProgress(param1: number, param2: number): void {
        let _loc3_: number = Math.min(1, param1 / param2);
        if (_loc3_ > 0) {
            this._window.setVisibleChildren(true, ["achieved_left", "achieved_mid"]);
            this._window.findChildByName("achieved_right").visible = _loc3_ == 1;
        }
        this._window.findChildByName("achieved_mid").width = this._SafeStr_7082 * _loc3_ | 0;
        this._controller.questEngine.localization.registerParameter("resolution.progress.progress", "progress", param1.toString());
        this._controller.questEngine.localization.registerParameter("resolution.progress.progress", "total", param2.toString());
    }

    private setBadge(param1: string): void {
        let _loc3_: IWidgetWindow = asGuarded(this._window.findChildByName("achievement_badge"), isIWidgetWindow);
        let _loc2_: IBadgeImageWidget = asGuarded(_loc3_.widget, isIBadgeImageWidget);
        castGuarded(castGuarded(_loc3_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc2_.badgeId = param1;
        _loc3_.visible = true;
    }

    private setLocalizations(): void {
        this._window.findChildByName("achievement.name").caption = this._controller.questEngine.localization.getBadgeName(this._badgeCode);
        this._window.findChildByName("achievement.desc").caption = this._controller.questEngine.localization.getBadgeDesc(this._badgeCode);
    }

    private setCountdown(param1: number): void {
        let _loc2_: IWidgetWindow = castGuarded(this._window.findChildByName("time_left_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc3_: ICountdownWidget = castGuarded(_loc2_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc3_.seconds = param1;
        _loc3_.running = true;
    }

    private createWindow(): void {
        this._window = castGuarded(this._controller.questEngine.getXmlWindow("AchievementResolutionProgress"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onWindowClose;
        this._window.findChildByName("reset_button").procedure = this.onResetButton;
        this._SafeStr_7082 = this._window.findChildByName("achieved_mid").width;
    }

    private initializeWindow(): void {
        this._window.center();
        this._window.setVisibleChildren(false, ["achieved_left", "achieved_mid", "achieved_right"]);
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
        }
    };

    private onResetButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._controller.resetResolution(this._stuffId);
            this.close();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
