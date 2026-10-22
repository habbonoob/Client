import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';

export class VolterGreenWiredStyle extends WiredStyle {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.styles::VolterGreenWiredStyle'); }

    public static readonly NAME: string = "volter_green";

    declare private _styleTemplate: IWindowContainer;

    constructor(param1: HabboUserDefinedRoomEvents) {
        super(param1);
        this._styleTemplate = castGuarded(param1.getXmlWindow("wired_style_volter_green"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    protected override get styleTemplate(): IWindowContainer {
        return this._styleTemplate;
    }

    public override get radioButtonSpacing(): number {
        return 6;
    }

    public override get checkboxSpacing(): number {
        return 2;
    }

    public override get checkboxYOffset(): number {
        return 0;
    }

    public override get namedInputOffset(): number {
        return 0;
    }

    public override get namedDropdownOffset(): number {
        return 0;
    }

    public override get radioButtonYOffset(): number {
        return 0;
    }

    public override get namedTextYOffset(): number {
        return 0;
    }

    public override get genericHorizontalSpacing(): number {
        return 5;
    }

    public override get genericVerticalSpacing(): number {
        return 5;
    }

    public override get sectionSpacing(): number {
        return 4;
    }

    public override get sectionLeftRightMargin(): number {
        return 5;
    }

    public override get headerMargin(): number {
        return 5;
    }

    public override get headerBottomMarginWithLink(): number {
        return 1;
    }

    public override get headerNameFontSize(): number {
        return 9;
    }

    public override get minimumOptionHeight(): number {
        return 20;
    }

    public override get minimumOptionSpacing(): number {
        return 4;
    }

    public override get optionExtraUnderSpacing(): number {
        return 3;
    }

    public override get optionExtraUnderLeftMargin(): number {
        return 25;
    }

    public override get LRContainerMargin(): number {
        return 9;
    }

    public override get LRContainerSpacing(): number {
        return 6;
    }

    public override get LRContainerTopBottomPadding(): number {
        return 4;
    }

    public override get inputSourceListMinHeight(): number {
        return 23;
    }

    public override get buttonRowSpacing(): number {
        return 12;
    }

    public override get menuRightOffset(): number {
        return 12;
    }

    public override get verticalSplitterColor(): number {
        return 4280492835;
    }

    public override get frameColor(): number {
        return 7909520;
    }

    public override get backgroundColor(): number {
        return 12572361;
    }

    public override get advancedBackgroundColor(): number {
        return 11323319;
    }

    public override get invalidInputBackgroundColor(): number {
        return 16762569;
    }

    public override get surroundingBorderStyleId(): number {
        return 0;
    }

    public override get yellowTextColor(): number {
        return 16777130;
    }

    public override get name(): string {
        return "volter_green";
    }

    public override get isVolter(): boolean {
        return true;
    }

    public override get useInnerBorder(): boolean {
        return true;
    }
}
