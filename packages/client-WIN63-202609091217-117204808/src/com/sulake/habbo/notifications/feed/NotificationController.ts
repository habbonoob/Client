import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GenericNotificationItemData } from '@/com/sulake/habbo/notifications/feed/data/GenericNotificationItemData';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import { FeedSettings } from '@/com/sulake/habbo/notifications/feed/FeedSettings';
import { NotificationView } from '@/com/sulake/habbo/notifications/feed/NotificationView';
import { EntityFactory } from '@/com/sulake/habbo/notifications/feed/view/content/EntityFactory';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class NotificationController {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed::NotificationController'); }

    declare private _component: HabboNotifications;

    declare private _SafeStr_3031: NotificationView;

    declare private _SafeStr_3112: FeedSettings;

    declare private _SafeStr_3909: EntityFactory;

    constructor(param1: HabboNotifications) {
        this._component = param1;
        this._SafeStr_3112 = new FeedSettings(this);
        this._SafeStr_3031 = new NotificationView(this, param1);
        this._SafeStr_3909 = new EntityFactory();
        this._component.roomSessionManager.events.addEventListener("RSE_CREATED", this.roomSessionStateEventHandler);
        this._component.roomSessionManager.events.addEventListener("RSE_STARTED", this.roomSessionStateEventHandler);
        this._component.roomSessionManager.events.addEventListener("RSE_ENDED", this.roomSessionStateEventHandler);
    }

    public dispose(): void {
        if (this._SafeStr_3031) {
            this._SafeStr_3031.dispose();
            this._SafeStr_3031 = null;
        }
        this._component.roomSessionManager.events.removeEventListener("RSE_CREATED", this.roomSessionStateEventHandler);
        this._component.roomSessionManager.events.removeEventListener("RSE_STARTED", this.roomSessionStateEventHandler);
        this._component.roomSessionManager.events.removeEventListener("RSE_ENDED", this.roomSessionStateEventHandler);
        this._component = null;
        if (this._SafeStr_3112) {
            this._SafeStr_3112.dispose();
            this._SafeStr_3112 = null;
        }
        if (this._SafeStr_3909) {
            this._SafeStr_3909.dispose();
            this._SafeStr_3909 = null;
        }
    }

    private roomSessionStateEventHandler = (param1: RoomSessionEvent): void => {
        switch (param1.type) {
            case "RSE_CREATED":
            case "RSE_STARTED":
            case "RSE_ENDED":
                if (this._SafeStr_3031) {
                    this._SafeStr_3031.setGameMode(param1.session.isGameSession);
                }
        }
    };

    public setFeedEnabled(param1: boolean): void {
        if (this._SafeStr_3031) {
            this._SafeStr_3031.setViewEnabled(param1);
        }
    }

    public getSettings(): FeedSettings {
        return this._SafeStr_3112;
    }

    public updateFeedCategoryFiltering(): void {
    }

    public addFeedItem(param1: number, param2: GenericNotificationItemData): void {
        let _loc3_: IFeedEntity = this._SafeStr_3909.createNotificationEntity(param2);
        this._SafeStr_3031.addNotificationFeedItem(param1, _loc3_);
    }

    public executeAction(param1: string): void {
        if (param1.indexOf("http") == 0) {
            HabboWebTools.openWebPage(param1);
        }
    }
}
