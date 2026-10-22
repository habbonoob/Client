import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActivatorController, BackgroundController, BitmapFillController, BitmapWrapperController, BorderController, BoxSizerController, BubbleController, ButtonController, CheckBoxController, CloseButtonController, ContainerButtonController, ContainerController, DisplayObjectWrapperController, DropListController, DropListItemController, DropMenuController, DropMenuItemController, FormattedTextController, FrameController, GradientController, HTMLTextController, HeaderController, IconButtonController, IconController, ItemGridController, ItemListController, PasswordFieldController, RadioButtonController, RegionController, ScalerController, ScrollBarController, ScrollBarLiftController, ScrollableItemGridWindow, ScrollableItemListWindow, SelectableButtonController, SelectorController, SelectorListController, ShapeController, StaticBitmapWrapperController, StrokeController, TabButtonController, TabContainerButtonController, TabContextController, TextController, TextFieldController, TextLabelController, TextLinkController, ToolTipController, WidgetWindowController, WindowController } from '@/com/sulake/core/window/Classes.group';

export class Classes {
    static { registerClassName(this, 'com.sulake.core.window::Classes'); }

    protected static _SafeStr_2130: Map<any, any>;

    constructor() {
    }

    public static init(): void {
        if (!Classes._SafeStr_2130) {
            Classes._SafeStr_2130 = new Dictionary();
            Classes._SafeStr_2130.set(0, WindowController);
            Classes._SafeStr_2130.set(40, ActivatorController);
            Classes._SafeStr_2130.set(2, BackgroundController);
            Classes._SafeStr_2130.set(30, BorderController);
            Classes._SafeStr_2130.set(17, BoxSizerController);
            Classes._SafeStr_2130.set(45, BubbleController);
            Classes._SafeStr_2130.set(46, WindowController);
            Classes._SafeStr_2130.set(47, WindowController);
            Classes._SafeStr_2130.set(48, WindowController);
            Classes._SafeStr_2130.set(49, WindowController);
            Classes._SafeStr_2130.set(60, ButtonController);
            Classes._SafeStr_2130.set(61, ButtonController);
            Classes._SafeStr_2130.set(67, SelectableButtonController);
            Classes._SafeStr_2130.set(68, SelectableButtonController);
            Classes._SafeStr_2130.set(69, SelectableButtonController);
            Classes._SafeStr_2130.set(26, BitmapFillController);
            Classes._SafeStr_2130.set(21, BitmapWrapperController);
            Classes._SafeStr_2130.set(70, CheckBoxController);
            Classes._SafeStr_2130.set(4, ContainerController);
            Classes._SafeStr_2130.set(41, ContainerButtonController);
            Classes._SafeStr_2130.set(72, CloseButtonController);
            Classes._SafeStr_2130.set(20, DisplayObjectWrapperController);
            Classes._SafeStr_2130.set(76, ScrollBarLiftController);
            Classes._SafeStr_2130.set(102, DropMenuController);
            Classes._SafeStr_2130.set(103, DropMenuItemController);
            Classes._SafeStr_2130.set(105, DropListController);
            Classes._SafeStr_2130.set(106, DropListItemController);
            Classes._SafeStr_2130.set(15, FormattedTextController);
            Classes._SafeStr_2130.set(35, FrameController);
            Classes._SafeStr_2130.set(24, GradientController);
            Classes._SafeStr_2130.set(6, HeaderController);
            Classes._SafeStr_2130.set(11, HTMLTextController);
            Classes._SafeStr_2130.set(1, IconController);
            Classes._SafeStr_2130.set(79, IconButtonController);
            Classes._SafeStr_2130.set(50, ItemListController);
            Classes._SafeStr_2130.set(51, ItemListController);
            Classes._SafeStr_2130.set(50, ItemListController);
            Classes._SafeStr_2130.set(52, ItemGridController);
            Classes._SafeStr_2130.set(54, ItemGridController);
            Classes._SafeStr_2130.set(53, ItemGridController);
            Classes._SafeStr_2130.set(12, TextLabelController);
            Classes._SafeStr_2130.set(14, TextLinkController);
            Classes._SafeStr_2130.set(78, PasswordFieldController);
            Classes._SafeStr_2130.set(71, RadioButtonController);
            Classes._SafeStr_2130.set(5, RegionController);
            Classes._SafeStr_2130.set(120, ScalerController);
            Classes._SafeStr_2130.set(130, ScrollBarController);
            Classes._SafeStr_2130.set(131, ScrollBarController);
            Classes._SafeStr_2130.set(139, ButtonController);
            Classes._SafeStr_2130.set(137, ButtonController);
            Classes._SafeStr_2130.set(138, ButtonController);
            Classes._SafeStr_2130.set(136, ButtonController);
            Classes._SafeStr_2130.set(132, ScrollBarLiftController);
            Classes._SafeStr_2130.set(133, ScrollBarLiftController);
            Classes._SafeStr_2130.set(134, WindowController);
            Classes._SafeStr_2130.set(135, WindowController);
            Classes._SafeStr_2130.set(56, ScrollableItemListWindow);
            Classes._SafeStr_2130.set(140, ScrollableItemGridWindow);
            Classes._SafeStr_2130.set(42, SelectorController);
            Classes._SafeStr_2130.set(43, SelectorListController);
            Classes._SafeStr_2130.set(22, ShapeController);
            Classes._SafeStr_2130.set(25, StrokeController);
            Classes._SafeStr_2130.set(23, StaticBitmapWrapperController);
            Classes._SafeStr_2130.set(93, TabButtonController);
            Classes._SafeStr_2130.set(94, TabContainerButtonController);
            Classes._SafeStr_2130.set(90, ContainerController);
            Classes._SafeStr_2130.set(91, TabContextController);
            Classes._SafeStr_2130.set(92, SelectorListController);
            Classes._SafeStr_2130.set(10, TextController);
            Classes._SafeStr_2130.set(77, TextFieldController);
            Classes._SafeStr_2130.set(8, ToolTipController);
            Classes._SafeStr_2130.set(16, WidgetWindowController);
        }
    }

    public static getWindowClassByType(param1: number): any {
        return Classes._SafeStr_2130.get(param1);
    }
}
