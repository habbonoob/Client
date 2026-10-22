import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { GenericNotificationItemData } from '@/com/sulake/habbo/notifications/feed/data/GenericNotificationItemData';
import { FeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/FeedEntity';

export class EntityFactory {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.view.content::EntityFactory'); }

    constructor() {
    }

    public dispose(): void {
    }

    public createNotificationEntity(param1: GenericNotificationItemData): IFeedEntity {
        if (param1 instanceof GenericNotificationItemData) {
            return this.createGenericFeedEntity(param1);
        }
        return null;
    }

    private createGenericFeedEntity(param1: GenericNotificationItemData): IFeedEntity {
        let _loc2_: FeedEntity = FeedEntity.allocate();
        _loc2_.icon = param1.iconImage;
        _loc2_.title = param1.title;
        _loc2_.minutesElapsed = (param1.timeStamp - getTimer()) / 1000 / 60 | 0;
        _loc2_.message = param1.description;
        _loc2_.decoration = param1.decorationImage;
        _loc2_.setButton(param1.buttonAction, param1.buttonCaption);
        _loc2_.updateContainerSize();
        return _loc2_;
    }
}
