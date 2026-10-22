import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Icon } from '@/com/sulake/habbo/friendbar/view/utils/Icon';

export class FriendListIcon extends Icon {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.utils::FriendListIcon'); }

    private static readonly _SafeStr_7980: number = 200;
    private static readonly NOTIFY_DELAY: number = 500;

    declare private _assets: IAssetLibrary;

    constructor(param1: IAssetLibrary, param2: IBitmapWrapperWindow) {
        super();
        this._assets = param1;
        this.alignment = (1 | 8) >>> 0;
        this.image = asInstanceOf(param1.getAssetByName("icon_friendlist_png"), BitmapDataAsset);
        this.canvas = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._assets = null;
            super.dispose();
        }
    }

    public override notify(param1: boolean): void {
        super.notify(param1);
        this.enable(param1);
        this.toggleTimer(param1 || this._hover, this._hover ? 200 : 500);
        if (!this._notify && !this._hover) {
            this.image = asInstanceOf(this._assets.getAssetByName("icon_friendlist_png"), BitmapDataAsset);
        }
    }

    public override hover(param1: boolean): void {
        super.hover(param1);
        this.toggleTimer(param1 || this._notify, this._hover ? 200 : 500);
        if (!this._notify && !this._hover) {
            this.image = asInstanceOf(this._assets.getAssetByName("icon_friendlist_png"), BitmapDataAsset);
        }
    }

    public override enable(param1: boolean): void {
        this.canvas.blend = this.disabled ? 0.5 : 1;
    }

    protected override onTimerEvent(param1: TimerEvent): void {
        if (this._hover) {
            this._frame = ++this._frame % 4;
            this.image = asInstanceOf(this._assets.getAssetByName("icon_friendlist_hover_" + this._frame + "_png"), BitmapDataAsset);
        } else if (this._notify) {
            this._frame = ++this._frame % 2;
            this.image = asInstanceOf(this._assets.getAssetByName("icon_friendlist_notify_" + this._frame + "_png"), BitmapDataAsset);
        }
    }
}
