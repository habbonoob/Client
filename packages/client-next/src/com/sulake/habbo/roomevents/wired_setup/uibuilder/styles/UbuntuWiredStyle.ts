import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';

export class UbuntuWiredStyle extends WiredStyle {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.styles::UbuntuWiredStyle'); }

    public static readonly NAME: string = "ubuntu";

    declare private _styleTemplate: IWindowContainer;

    constructor(param1: HabboUserDefinedRoomEvents) {
        super(param1);
        this._styleTemplate = castGuarded(param1.getXmlWindow("wired_style_ubuntu"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    protected override get styleTemplate(): IWindowContainer {
        return this._styleTemplate;
    }

    public override get radioButtonSpacing(): number {
        return 3;
    }

    public override get checkboxSpacing(): number {
        return 3;
    }

    public override get checkboxYOffset(): number {
        return -1;
    }

    public override get radioButtonYOffset(): number {
        return -1;
    }

    public override get namedTextYOffset(): number {
        return 2;
    }

    public override get genericHorizontalSpacing(): number {
        return 5;
    }

    public override get genericVerticalSpacing(): number {
        return 5;
    }

    public override get sectionSpacing(): number {
        return 7;
    }

    public override get sectionLeftRightMargin(): number {
        return 7;
    }

    public override get headerMargin(): number {
        return 5;
    }

    public override get headerBottomMarginWithLink(): number {
        return 1;
    }

    public override get headerNameFontSize(): number {
        return 12;
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

    public override get frameColor(): number {
        return 4296112;
    }

    public override get backgroundColor(): number {
        return 15329761;
    }

    public override get advancedBackgroundColor(): number {
        return 14277073;
    }

    public override get invalidInputBackgroundColor(): number {
        return 16762569;
    }

    public override get surroundingBorderStyleId(): number {
        return 0;
    }

    public override get yellowTextColor(): number {
        return 8685354;
    }

    public override get softTextColor(): number {
        return 3355443;
    }

    public override get redTextColor(): number {
        return 16069173;
    }

    public override get containerButtonPaddingLeft(): number {
        return 10;
    }

    public override get containerButtonPaddingTop(): number {
        return 5;
    }

    public override get paddedSectionTop(): number {
        return 10;
    }

    public override get paddedSectionLeft(): number {
        return 5;
    }

    public override get name(): string {
        return "ubuntu";
    }
}
