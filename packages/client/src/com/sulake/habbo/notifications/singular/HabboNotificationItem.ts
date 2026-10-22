import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboNotificationItemStyle } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItemStyle';
import type { SingularNotificationController } from '@/com/sulake/habbo/notifications/singular/SingularNotificationController';

export class HabboNotificationItem {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::HabboNotificationItem'); }

    declare private _style: HabboNotificationItemStyle;

    declare private _content: string;

    declare private _controller: SingularNotificationController;

    constructor(param1: string, param2: HabboNotificationItemStyle, param3: SingularNotificationController) {
        this._content = param1;
        this._style = param2;
        this._controller = param3;
    }

    public get style(): HabboNotificationItemStyle {
        return this._style;
    }

    public get content(): string {
        return this._content;
    }

    public dispose(): void {
        this._content = null;
        if (this._style != null) {
            this._style.dispose();
            this._style = null;
        }
        this._controller = null;
    }

    public ExecuteUiLinks(): void {
        if (this._style.internalLink) {
            this._controller.onInternalLink(this._style.internalLink);
        }
    }
}
