import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { AbstractPane } from '@/com/sulake/habbo/notifications/feed/view/pane/AbstractPane';

export class InfoPane extends AbstractPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::InfoPane'); }

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer) {
        super(param1, param2, param3, 2);
        (asGuarded(this._window.findChildByName("info_ok"), isIContainerButtonWindow)).addEventListener("WME_CLICK", this.onOkClick);
    }

    public override dispose(): void {
        let _loc1_: IContainerButtonWindow = null;
        super.dispose();
        if (this._window) {
            _loc1_ = asGuarded(this._window.findChildByName("info_ok"), isIContainerButtonWindow);
            if (_loc1_) {
                _loc1_.removeEventListener("WME_CLICK", this.onOkClick);
                _loc1_ = null;
            }
        }
    }

    private onOkClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2276.closePaneLevel(2);
    };
}
