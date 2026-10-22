import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AchievementsResolutionController } from '@/com/sulake/habbo/quest/AchievementsResolutionController';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class AchievementResolutionCompletedView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::AchievementResolutionCompletedView'); }

    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7763: string = "cancel_button";

    declare private _controller: AchievementsResolutionController;

    declare private _window: IFrameWindow;

    declare private _badgeCode: string;

    declare private _stuffCode: string;

    constructor(param1: AchievementsResolutionController) {
        this._controller = param1;
    }

    public dispose(): void {
        this._controller = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._controller != null;
    }

    public get visible(): boolean {
        if (!this._window) {
            return false;
        }
        return this._window.visible;
    }

    public show(param1: string, param2: string): void {
        if (this._window == null) {
            this.createWindow();
        }
        this.initializeWindow();
        this._stuffCode = param1;
        this._badgeCode = param2;
        this.setBadge(this._badgeCode);
        this._window.visible = true;
    }

    private createWindow(): void {
        this._window = castGuarded(this._controller.questEngine.getXmlWindow("AchievementResolutionCompleted"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this.addClickListener("header_button_close");
        this.addClickListener("cancel_button");
    }

    private addClickListener(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseClick);
        }
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_button":
                this.close();
        }
    };

    private initializeWindow(): void {
        this._window.center();
    }

    private setBadge(param1: string): void {
        let _loc3_: IWidgetWindow = asGuarded(this._window.findChildByName("achievement_badge"), isIWidgetWindow);
        let _loc2_: IBadgeImageWidget = asGuarded(_loc3_.widget, isIBadgeImageWidget);
        castGuarded(castGuarded(_loc3_.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "common_loading_icon";
        _loc2_.badgeId = param1;
        _loc3_.visible = true;
    }

    public close(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
