import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import { AbstractPane } from '@/com/sulake/habbo/notifications/feed/view/pane/AbstractPane';

export class StatusPane extends AbstractPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::StatusPane'); }

    private static readonly _SafeStr_7651: string = "minimize_toggle";
    private static readonly NOTIFICATIONS: string = "notification_feed_button";
    private static readonly STREAM: string = "stream_feed_button";

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer) {
        super(param1, param2, param3, 0);
        this._window.findChildByName("minimize_toggle").addEventListener("WME_CLICK", this.onMinimizeToggle);
        this._window.findChildByName("notification_feed_button").addEventListener("WME_CLICK", this.onSwitchToNotifications);
        this._window.findChildByName("stream_feed_button").addEventListener("WME_CLICK", this.onSwitchToStream);
    }

    public override dispose(): void {
        if (this._window) {
            this._window.findChildByName("minimize_toggle").removeEventListener("WME_CLICK", this.onMinimizeToggle);
            this._window.findChildByName("notification_feed_button").removeEventListener("WME_CLICK", this.onMinimizeToggle);
            // AS3 calls the window itself here (a missing .removeEventListener): a TypeError, as in the original
            (this._window.findChildByName("stream_feed_button") as unknown as (...args: any[]) => void)("WME_CLICK", this.onMinimizeToggle);
        }
    }

    private onMinimizeToggle = (param1: WindowMouseEvent): void => {
        this._SafeStr_2276.toggleMinimized();
    };

    private onSwitchToNotifications = (param1: WindowMouseEvent): void => {
        this._SafeStr_2276.switchToPane("pane_notifications");
    };

    private onSwitchToStream = (param1: WindowMouseEvent): void => {
        this._SafeStr_2276.switchToPane("pane_stream");
    };
}
