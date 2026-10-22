import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class BadgeLeaderboardEntryView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard::BadgeLeaderboardEntryView'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_14998: boolean;
    static { (this.prototype as any)._SafeStr_14998 = false; }

    declare private _rankTextName: string;

    declare private _window: IWindowContainer;

    constructor(param1: IWindowContainer, param2: boolean = true, param3: string = "rank_number") {
        this._SafeStr_14998 = param2;
        this._rankTextName = param3;
        this._window = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_14998) {
            this._window.dispose();
        }
        this._window = null;
        this._rankTextName = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get evenBackground(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("entry_bg_even"), isIStaticBitmapWrapperWindow);
    }

    public get unevenBackground(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("entry_bg_uneven"), isIStaticBitmapWrapperWindow);
    }

    public get rankText(): ITextWindow {
        return asGuarded(this._window.findChildByName(this._rankTextName), isITextWindow);
    }

    public get rankBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("rank_border"), isIBorderWindow);
    }

    public get profileRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("region_profile"), isIRegionWindow);
    }

    public get profileCanvas(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("canvas"), isIBitmapWrapperWindow);
    }

    public get usernameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("username_txt"), isITextWindow);
    }

    public get scoreText(): ITextWindow {
        return asGuarded(this._window.findChildByName("score_txt"), isITextWindow);
    }

    public get rankTypeImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("rank_type_img"), isIStaticBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
