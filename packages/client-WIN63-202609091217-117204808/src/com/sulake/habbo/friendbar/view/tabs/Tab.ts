import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboFriendBarData } from '@/com/sulake/habbo/friendbar/data/IHabboFriendBarData';
import type { IHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import type { TextCropper } from '@/com/sulake/habbo/friendbar/view/utils/TextCropper';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ITab } from '@/com/sulake/habbo/friendbar/view/tabs/ITab';

export class Tab implements ITab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::Tab'); }

    public static WIDTH: number = 127;
    public static HEIGHT: number = 36;
    public static DATA: IHabboFriendBarData;
    public static FRIENDS: IHabboFriendList;
    public static GAMES: IHabboGameManager;
    public static VIEW: IHabboFriendBarView;
    public static ASSETS: IAssetLibrary;
    public static WINDOWING: IHabboWindowManager;
    public static _SafeStr_2508: IHabboLocalizationManager;
    public static TRACKING: IHabboTracking;
    public static CROPPER: TextCropper;
    public static AVATAR_RENDER_MANAGER: IAvatarRenderManager;
    protected static readonly _SafeStr_8193: boolean = false;
    protected static readonly _MOTION_TIME: number = 80;
    protected static readonly _SafeStr_7806: number = 3;

    declare protected _window: IWindowContainer;

    declare protected _recycled: boolean;
    static { (this.prototype as any)._recycled = false; }

    declare private _exposed: boolean;
    static { (this.prototype as any)._exposed = false; }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor() {
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public get recycled(): boolean {
        return this._recycled;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    protected get exposed(): boolean {
        return this._exposed;
    }

    public select(param1: boolean): void {
        this.conceal();
        this._selected = true;
    }

    public deselect(param1: boolean): void {
        this._selected = false;
    }

    public recycle(): void {
        this.conceal();
        this._recycled = true;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            this._disposed = true;
        }
    }

    protected expose(): void {
        this._exposed = true;
    }

    protected conceal(): void {
        this._exposed = false;
    }

    protected onMouseClick = (param1: WindowMouseEvent): void => {
        if (this.disposed || this.recycled) {
            return;
        }
        if (this.selected) {
            Tab.VIEW.deSelect(true);
        } else {
            Tab.VIEW.selectTab(this, true);
        }
    };

    protected onMouseOver = (param1: WindowMouseEvent): void => {
        if (this.disposed || this.recycled) {
            return;
        }
        if (!this.selected) {
            this.expose();
        }
    };

    protected onMouseOut = (param1: WindowMouseEvent): void => {
        if (this.disposed || this.recycled || this._window == null) {
            return;
        }
        if (!this.selected) {
            if (!this._window.hitTestGlobalPoint(new Point(param1.stageX, param1.stageY))) {
                this.conceal();
            }
        }
    };

    get [ITab](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
