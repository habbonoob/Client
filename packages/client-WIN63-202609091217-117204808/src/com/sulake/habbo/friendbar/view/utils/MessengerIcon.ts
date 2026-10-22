import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Icon } from '@/com/sulake/habbo/friendbar/view/utils/Icon';

export class MessengerIcon extends Icon {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.utils::MessengerIcon'); }

    private static readonly NOTIFY_DELAY: number = 500;

    declare private _assets: IAssetLibrary;

    constructor(param1: IAssetLibrary, param2: IBitmapWrapperWindow) {
        super();
        this._assets = param1;
        this.alignment = (1 | 8) >>> 0;
        this.image = asInstanceOf(param1.getAssetByName("icon_messenger_png"), BitmapDataAsset);
        this.canvas = param2;
    }

    public override notify(param1: boolean): void {
        super.notify(param1);
        this.image = asInstanceOf(this._assets.getAssetByName(param1 ? "icon_messenger_notify_1_png" : "icon_messenger_png"), BitmapDataAsset);
        this.toggleTimer(param1, 500);
    }

    public override hover(param1: boolean): void {
        super.hover(param1);
    }

    public override enable(param1: boolean): void {
        super.enable(param1);
        this.canvas.visible = param1;
    }

    protected override onTimerEvent(param1: TimerEvent): void {
        if (this._notify) {
            this._frame = this._frame == 1 ? 0 : 1;
            this.image = asInstanceOf(this._assets.getAssetByName("icon_messenger_notify_" + this._frame + "_png"), BitmapDataAsset);
        }
    }
}
