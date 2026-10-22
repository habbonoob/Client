import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DropBounce } from '@/com/sulake/core/window/motion/DropBounce';
import { Motions } from '@/com/sulake/core/window/motion/Motions';

export class Token implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs.tokens::Token'); }

    protected static readonly TITLE: string = "title";
    protected static readonly MESSAGE: string = "message";
    protected static readonly ICON_RECTANGLE: Rectangle = new Rectangle(0, 0, 25, 25);
    protected static _WINDOW_MANAGER: IHabboWindowManager;
    protected static _ASSETS: IAssetLibrary;
    protected static _GAMES: IHabboGameManager;

    public static set GAMES(param1: IHabboGameManager) {
        Token._GAMES = param1;
    }

    public static set WINDOWING(param1: IHabboWindowManager) {
        Token._WINDOW_MANAGER = param1;
    }

    public static set ASSETS(param1: IAssetLibrary) {
        Token._ASSETS = param1;
    }

    constructor(param1: IFriendNotification) {
        this._notification = param1;
    }

    declare protected _icon: IRegionWindow;

    declare protected _window: IWindowContainer;

    declare protected _notification: IFriendNotification;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get typeCode(): number {
        return this._notification.typeCode;
    }

    public get viewOnce(): boolean {
        return this._notification.viewOnce;
    }

    public get notification(): IFriendNotification {
        return this._notification;
    }

    public get iconElement(): IWindow {
        return this._icon;
    }

    public get windowElement(): IWindow {
        return this._window;
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._icon) {
            this._icon.dispose();
            this._icon = null;
        }
        this._notification = null;
        this._disposed = true;
    }

    protected prepare(param1: string, param2: string, param3: string, param4: string): void {
        this._window = asGuarded(Token._WINDOW_MANAGER.buildFromXML(asInstanceOf(Token._ASSETS.getAssetByName(param3).content, XML)), isIWindowContainer);
        this._window.findChildByName("title").caption = param1;
        this._window.findChildByName("message").caption = param2 ? param2 : "";
        this._icon = asGuarded(Token._WINDOW_MANAGER.create("ICON_" + this.typeCode, 5, 0, 1, Token.ICON_RECTANGLE), isIRegionWindow);
        this._icon.mouseThreshold = 0;
        let _loc5_: IStaticBitmapWrapperWindow = asGuarded(Token._WINDOW_MANAGER.create("BITMAP_" + this.typeCode, 23, 0, 0, Token.ICON_RECTANGLE), isIStaticBitmapWrapperWindow);
        _loc5_.assetUri = param4;
        this._icon.addChild(_loc5_);
        if (Motions.getMotionByTarget(this._icon) == null) {
            Motions.runMotion(new DropBounce(this._icon, 600, 32));
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
