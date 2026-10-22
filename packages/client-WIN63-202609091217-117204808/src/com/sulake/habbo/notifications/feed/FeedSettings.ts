import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { NotificationController } from '@/com/sulake/habbo/notifications/feed/NotificationController';

export class FeedSettings {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed::FeedSettings'); }

    public static readonly _SafeStr_8029: number = 0;
    public static readonly _SafeStr_7800: number = 1;
    public static readonly _SafeStr_8396: number = 2;
    public static readonly _SafeStr_8381: number = 3;
    public static readonly FEED_CATEGORY_ME: number = 0;
    public static readonly _SafeStr_8310: number = 1;
    public static readonly FEED_CATEGORY_HOTEL: number = 2;

    declare private _SafeStr_6934: NotificationController;

    declare private _visibleFeedCategories: number[];

    constructor(param1: NotificationController) {
        this._visibleFeedCategories = [];
        this._visibleFeedCategories.push(1);
        this._visibleFeedCategories.push(0);
        this._visibleFeedCategories.push(2);
    }

    public dispose(): void {
        this._SafeStr_6934 = null;
        this._visibleFeedCategories = null;
    }

    public getVisibleFeedCategories(): number[] {
        return this._visibleFeedCategories;
    }

    public toggleVisibleFeedCategory(param1: number): void {
        this._SafeStr_6934.updateFeedCategoryFiltering();
    }
}
