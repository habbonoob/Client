import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { AbstractPane } from '@/com/sulake/habbo/notifications/feed/view/pane/AbstractPane';

export class StreamPane extends AbstractPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::StreamPane'); }

    declare private _SafeStr_2221: IItemListWindow;

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer) {
        super(param1, param2, param3, 1);
        this._SafeStr_2221 = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
    }

    public override dispose(): void {
        this._SafeStr_2221 = null;
        super.dispose();
    }

    public addItem(param1: IFeedEntity): void {
        this._SafeStr_2221.addListItem(param1.window);
    }
}
