import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CampaignCalendarData } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CalendarItemWiggle } from '@/com/sulake/habbo/campaign/calendar/CalendarItemWiggle';

export class CalendarItem {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarItem'); }

    public static readonly STATE_UNLOCKED: number = 1;
    public static readonly STATE_LOCKED_AVAILABLE: number = 2;
    public static readonly STATE_LOCKED_EXPIRED: number = 3;
    public static readonly STATE_LOCKED_FUTURE: number = 4;
    private static readonly IMAGE_CLOSED: string = "campaign_calendar_day_generic_button";
    private static readonly IMAGE_ACTIVATED: string = "campaign_calendar_day_generic_activated";
    private static readonly IMAGE_OPENED_BG: string = "campaign_calendar_opened";
    private static readonly ICON_LOCKED: string = "campaign_calendar_generic_lock";
    private static readonly PACKAGE_IMAGE_OFFSETS: Point[] = [new Point(-2, -5), new Point(3, -4), new Point(-3, -3)];
    private static readonly THUMBNAIL_OFFSET_Y: number = -6;

    public static populateItem(template: IWindowContainer, calendarData: CampaignCalendarData, dayIndex: number): IWindowContainer {
        let item: IWindowContainer = asGuarded(template.clone(), isIWindowContainer);
        let background: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        let openedBackground: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_opened_bg"), isIStaticBitmapWrapperWindow);
        let lock: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_lock"), isIStaticBitmapWrapperWindow);
        switch (CalendarItem.resolveDayState(calendarData, dayIndex)) {
            case CalendarItem.STATE_UNLOCKED:
                background.assetUri = CalendarItem.IMAGE_ACTIVATED;
                lock.assetUri = "";
                openedBackground.visible = true;
                break;
            case CalendarItem.STATE_LOCKED_AVAILABLE:
                background.assetUri = CalendarItem.IMAGE_CLOSED;
                lock.assetUri = null;
                openedBackground.visible = false;
                break;
            case CalendarItem.STATE_LOCKED_EXPIRED:
            case CalendarItem.STATE_LOCKED_FUTURE:
                background.assetUri = CalendarItem.IMAGE_CLOSED;
                lock.assetUri = CalendarItem.ICON_LOCKED;
                openedBackground.visible = false;
        }
        return item;
    }

    public static updateState(item: IWindowContainer, calendarData: CampaignCalendarData, dayIndex: number, selectedIndex: number): void {
        let background: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        if (!background) {
            return;
        }
        if (dayIndex == selectedIndex) {
            if (CalendarItem.resolveDayState(calendarData, dayIndex) == CalendarItem.STATE_LOCKED_AVAILABLE) {
                CalendarItem.showWiggleEffect(background);
            }
        }
    }

    public static updateThumbnail(item: IWindowContainer, image: any): void {
        let background: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        let openedBackground: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_opened_bg"), isIStaticBitmapWrapperWindow);
        let assetIcon: IStaticBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_icon"), isIStaticBitmapWrapperWindow);
        let bitmapIcon: IBitmapWrapperWindow = asGuarded(item.findChildByName("bitmap_icon2"), isIBitmapWrapperWindow);
        background.assetUri = CalendarItem.IMAGE_ACTIVATED;
        bitmapIcon.y = assetIcon.y = CalendarItem.THUMBNAIL_OFFSET_Y;
        openedBackground.visible = true;
        if (typeof image === "string") {
            assetIcon.assetUri = typeof image === "string" ? image : null;
            bitmapIcon.bitmap = null;
            CalendarItem.showWiggleEffect(assetIcon);
        }
        if (image instanceof BitmapData) {
            assetIcon.assetUri = "";
            bitmapIcon.bitmap = image instanceof BitmapData ? image : null;
            CalendarItem.showWiggleEffect(assetIcon);
            CalendarItem.showWiggleEffect(bitmapIcon);
        }
    }

    public static showWiggleEffect(window: IWindow): void {
        new CalendarItemWiggle(window);
    }

    public static resolveDayState(calendarData: CampaignCalendarData, dayIndex: number): number {
        if (calendarData.openedDays.indexOf(dayIndex) > -1) {
            return CalendarItem.STATE_UNLOCKED;
        }
        switch (true) {
            case dayIndex > calendarData.currentDay:
                return CalendarItem.STATE_LOCKED_FUTURE;
            case calendarData.missedDays.indexOf(dayIndex) > -1:
                return CalendarItem.STATE_LOCKED_EXPIRED;
            default:
                return CalendarItem.STATE_LOCKED_AVAILABLE;
        }
    }
}
