import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { AbstractPane } from '@/com/sulake/habbo/notifications/feed/view/pane/AbstractPane';

export class NotificationsPane extends AbstractPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::NotificationsPane'); }

    private static readonly SECTIONS_LIST: string = "list";
    private static readonly _SafeStr_8561: string = "list_urgent";
    private static readonly _SafeStr_7986: string = "list_actions";
    private static readonly _SafeStr_7956: string = "list_persistent";
    private static readonly _SafeStr_7636: string = "list_notifications";

    declare private _SafeStr_2221: IItemListWindow;

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer) {
        super(param1, param2, param3, 1);
        this.setUp();
    }

    public override dispose(): void {
        this._SafeStr_2221 = null;
        super.dispose();
    }

    private setUp(): void {
        this._SafeStr_2221 = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
    }

    public addItem(param1: number, param2: IFeedEntity): void {
        let _loc3_: IItemListWindow = this.getSection(param1);
        _loc3_.addListItemAt(param2.window, 0);
    }

    private getSection(param1: number): IItemListWindow {
        let _loc2_: string = null;
        switch (param1) {
            case 0:
                _loc2_ = "list_urgent";
                break;
            case 1:
                _loc2_ = "list_actions";
                break;
            case 2:
                _loc2_ = "list_persistent";
                break;
            case 3:
                _loc2_ = "list_notifications";
        }
        return asGuarded(this._SafeStr_2221.getListItemByName(_loc2_), isIItemListWindow);
    }
}
