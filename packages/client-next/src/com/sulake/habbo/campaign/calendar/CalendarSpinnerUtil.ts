import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { CalendarView } from '@/com/sulake/habbo/campaign/calendar/CalendarView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';

export class CalendarSpinnerUtil {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarSpinnerUtil'); }

    constructor() {
    }

    public static createGradients(param1: CalendarView, param2: number): void {
        let _loc6_: IBitmapWrapperWindow = asGuarded(param1.window.findChildByName("gradient1"), isIBitmapWrapperWindow);
        let _loc7_: number = Math.max(1, param1.calculateItemListWidth(param2) - param1.itemList.scrollH * param1.itemList.maxScrollH) | 0;
        let _loc4_: BitmapData = new BitmapData(_loc7_, param1.itemList.height, true, 0);
        let _loc5_: Sprite = new Sprite();
        let _loc3_: Matrix = new Matrix();
        _loc3_.createGradientBox(_loc4_.width, _loc4_.height);
        _loc5_.graphics.beginGradientFill("linear", [987168, 987168], [0.6, 0.2], [0, 255], _loc3_);
        _loc5_.graphics.drawRect(0, 0, _loc4_.width, _loc4_.height);
        _loc4_.draw(_loc5_);
        _loc6_.bitmap = _loc4_;
        _loc6_ = asGuarded(param1.window.findChildByName("gradient2"), isIBitmapWrapperWindow);
        _loc7_ = Math.max(1, param1.scrollerWidth - (_loc7_ + param1.itemWidth + param1.itemGap)) | 0;
        _loc4_ = new BitmapData(_loc7_, param1.itemList.height, true, 0);
        _loc3_.createGradientBox(_loc4_.width, _loc4_.height);
        _loc5_.graphics.clear();
        _loc5_.graphics.beginGradientFill("linear", [987168, 987168], [0.2, 0.6], [0, 255], _loc3_);
        _loc5_.graphics.drawRect(0, 0, _loc4_.width, _loc4_.height);
        _loc4_.draw(_loc5_);
        _loc6_.x = param1.scrollerWidth - _loc7_;
        _loc6_.bitmap = _loc4_;
    }
}
