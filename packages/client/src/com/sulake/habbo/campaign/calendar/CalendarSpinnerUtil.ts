import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { CalendarView } from '@/com/sulake/habbo/campaign/calendar/CalendarView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { GradientType } from '@habbo-pixi/runtime/display/GradientType';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';

export class CalendarSpinnerUtil {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarSpinnerUtil'); }

    private static readonly GRADIENT_COLOR: number = 0x0F1020;
    private static readonly ALPHA_OPAQUE: number = 0.6;
    private static readonly ALPHA_FADED: number = 0.2;
    private static readonly GRADIENT_RATIOS: any[] = [0, 255];

    public static createGradients(view: CalendarView, selectedIndex: number): void {
        let gradientWindow: IBitmapWrapperWindow = asGuarded(view.window.findChildByName("gradient1"), isIBitmapWrapperWindow);
        let gradientWidth: number = Math.max(1, view.calculateItemListWidth(selectedIndex) - view.itemList.scrollH * view.itemList.maxScrollH) | 0;
        let bitmapData: BitmapData = new BitmapData(gradientWidth, view.itemList.height, true, 0);
        let sprite: Sprite = new Sprite();
        let matrix: Matrix = new Matrix();
        matrix.createGradientBox(bitmapData.width, bitmapData.height);
        sprite.graphics.beginGradientFill(GradientType.LINEAR, [CalendarSpinnerUtil.GRADIENT_COLOR, CalendarSpinnerUtil.GRADIENT_COLOR], [CalendarSpinnerUtil.ALPHA_OPAQUE, CalendarSpinnerUtil.ALPHA_FADED], CalendarSpinnerUtil.GRADIENT_RATIOS, matrix);
        sprite.graphics.drawRect(0, 0, bitmapData.width, bitmapData.height);
        bitmapData.draw(sprite);
        gradientWindow.bitmap = bitmapData;
        gradientWindow = asGuarded(view.window.findChildByName("gradient2"), isIBitmapWrapperWindow);
        gradientWidth = Math.max(1, view.scrollerWidth - (gradientWidth + view.itemWidth + view.itemGap)) | 0;
        bitmapData = new BitmapData(gradientWidth, view.itemList.height, true, 0);
        matrix.createGradientBox(bitmapData.width, bitmapData.height);
        sprite.graphics.clear();
        sprite.graphics.beginGradientFill(GradientType.LINEAR, [CalendarSpinnerUtil.GRADIENT_COLOR, CalendarSpinnerUtil.GRADIENT_COLOR], [CalendarSpinnerUtil.ALPHA_FADED, CalendarSpinnerUtil.ALPHA_OPAQUE], CalendarSpinnerUtil.GRADIENT_RATIOS, matrix);
        sprite.graphics.drawRect(0, 0, bitmapData.width, bitmapData.height);
        bitmapData.draw(sprite);
        gradientWindow.x = view.scrollerWidth - gradientWidth;
        gradientWindow.bitmap = bitmapData;
    }
}
