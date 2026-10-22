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

    constructor() {
    }

    public static populateItem(param1: IWindowContainer, param2: CampaignCalendarData, param3: number): IWindowContainer {
        let _loc6_: IWindowContainer = asGuarded(param1.clone(), isIWindowContainer);
        let _loc7_: IStaticBitmapWrapperWindow = asGuarded(_loc6_.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        let _loc8_: IStaticBitmapWrapperWindow = asGuarded(_loc6_.findChildByName("bitmap_opened_bg"), isIStaticBitmapWrapperWindow);
        let _loc4_: IStaticBitmapWrapperWindow = asGuarded(_loc6_.findChildByName("bitmap_lock"), isIStaticBitmapWrapperWindow);
        let _loc5_: number = 0;
        switch ((_loc5_ = CalendarItem.resolveDayState(param2, param3)) - 1) {
            case 0:
                _loc7_.assetUri = "campaign_calendar_day_generic_activated";
                _loc4_.assetUri = "";
                _loc8_.visible = true;
                break;
            case 1:
                _loc7_.assetUri = "campaign_calendar_day_generic_button";
                _loc4_.assetUri = null;
                _loc8_.visible = false;
                break;
            case 2:
            case 3:
                _loc7_.assetUri = "campaign_calendar_day_generic_button";
                _loc4_.assetUri = "campaign_calendar_generic_lock";
                _loc8_.visible = false;
        }
        return _loc6_;
    }

    public static updateState(param1: IWindowContainer, param2: CampaignCalendarData, param3: number, param4: number): void {
        let _loc5_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        if (!_loc5_) {
            return;
        }
        if (param3 == param4) {
            if (CalendarItem.resolveDayState(param2, param3) == 2) {
                CalendarItem.showWiggleEffect(_loc5_);
            }
        }
    }

    public static updateThumbnail(param1: IWindowContainer, param2: any): void {
        let _loc5_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("bitmap_bg"), isIStaticBitmapWrapperWindow);
        let _loc6_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("bitmap_opened_bg"), isIStaticBitmapWrapperWindow);
        let _loc3_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("bitmap_icon"), isIStaticBitmapWrapperWindow);
        let _loc4_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("bitmap_icon2"), isIBitmapWrapperWindow);
        _loc5_.assetUri = "campaign_calendar_day_generic_activated";
        _loc4_.y = _loc3_.y = -6;
        _loc6_.visible = true;
        if (typeof param2 === "string") {
            _loc3_.assetUri = typeof param2 === "string" ? param2 : null;
            _loc4_.bitmap = null;
            CalendarItem.showWiggleEffect(_loc3_);
        }
        if (param2 instanceof BitmapData) {
            _loc3_.assetUri = "";
            _loc4_.bitmap = param2 instanceof BitmapData ? param2 : null;
            CalendarItem.showWiggleEffect(_loc3_);
            CalendarItem.showWiggleEffect(_loc4_);
        }
    }

    public static showWiggleEffect(param1: IWindow): void {
        new CalendarItemWiggle(param1);
    }

    public static resolveDayState(param1: CampaignCalendarData, param2: number): number {
        if (param1.openedDays.indexOf(param2) > -1) {
            return 1;
        }
        switch (true) {
            case param2 > param1.currentDay:
                return 4;
            case param1.missedDays.indexOf(param2) > -1:
                return 3;
            default:
                return 2;
        }
    }
}
