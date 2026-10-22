import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FeedSettings } from '@/com/sulake/habbo/notifications/feed/FeedSettings';
import type { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import { AbstractPane } from '@/com/sulake/habbo/notifications/feed/view/pane/AbstractPane';

export class SettingsPane extends AbstractPane {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.pane::SettingsPane'); }

    constructor(param1: string, param2: NotificationView, param3: IWindowContainer) {
        super(param1, param2, param3, 2);
        this.applySettingsToView();
        this._window.procedure = this.onWindowEventProc;
    }

    public override dispose(): void {
        super.dispose();
    }

    private applySettingsToView(): void {
        let _loc1_: FeedSettings = this._SafeStr_2276.controller.getSettings();
        _loc1_.getVisibleFeedCategories();
    }

    public onWindowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: FeedSettings = null;
        let _loc5_: number = 0;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._SafeStr_2276.controller.getSettings();
            for (const _loc4_ of param2.tags ?? []) {
                switch (_loc4_) {
                    case "ME":
                        _loc5_ = 0;
                        break;
                    case "HOTEL":
                        _loc5_ = 2;
                        break;
                    case "FRIENDS":
                        _loc5_ = 1;
                }
                _loc3_.toggleVisibleFeedCategory(_loc5_);
            }
            this.applySettingsToView();
        }
    };
}
