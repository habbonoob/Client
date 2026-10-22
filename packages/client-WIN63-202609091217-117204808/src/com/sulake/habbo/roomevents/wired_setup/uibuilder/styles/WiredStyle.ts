import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class WiredStyle {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.styles::WiredStyle'); }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
    }

    protected get styleTemplate(): IWindowContainer {
        return null;
    }

    public get radioButtonSpacing(): number {
        return 0;
    }

    public get checkboxSpacing(): number {
        return 0;
    }

    public get checkboxYOffset(): number {
        return 0;
    }

    public get radioButtonYOffset(): number {
        return 0;
    }

    public get namedTextYOffset(): number {
        return 0;
    }

    public get namedInputOffset(): number {
        return 0;
    }

    public get namedDropdownOffset(): number {
        return 0;
    }

    public get genericHorizontalSpacing(): number {
        return 0;
    }

    public get genericVerticalSpacing(): number {
        return 0;
    }

    public get sectionSpacing(): number {
        return 0;
    }

    public get sectionLeftRightMargin(): number {
        return 0;
    }

    public get headerMargin(): number {
        return 0;
    }

    public get headerBottomMarginWithLink(): number {
        return 0;
    }

    public get headerNameFontSize(): number {
        return 0;
    }

    public get frameColor(): number {
        return 0;
    }

    public get backgroundColor(): number {
        return 0;
    }

    public get advancedBackgroundColor(): number {
        return 0;
    }

    public get invalidInputBackgroundColor(): number {
        return 0;
    }

    public get surroundingBorderStyleId(): number {
        return 0;
    }

    public get yellowTextColor(): number {
        return 0;
    }

    public get softTextColor(): number {
        return 0;
    }

    public get redTextColor(): number {
        return 0;
    }

    public get minimumOptionHeight(): number {
        return 0;
    }

    public get minimumOptionSpacing(): number {
        return 0;
    }

    public get optionExtraUnderSpacing(): number {
        return 0;
    }

    public get optionExtraUnderLeftMargin(): number {
        return 0;
    }

    public get LRContainerMargin(): number {
        return 0;
    }

    public get LRContainerSpacing(): number {
        return 0;
    }

    public get LRContainerTopBottomPadding(): number {
        return 0;
    }

    public get inputSourceListMinHeight(): number {
        return 0;
    }

    public get buttonRowSpacing(): number {
        return 0;
    }

    public get menuRightOffset(): number {
        return 0;
    }

    public get verticalSplitterColor(): number {
        return 0;
    }

    public get name(): string {
        return "";
    }

    public get isVolter(): boolean {
        return false;
    }

    public get useInnerBorder(): boolean {
        return false;
    }

    public get containerButtonPaddingTop(): number {
        return 0;
    }

    public get containerButtonPaddingLeft(): number {
        return 0;
    }

    public get paddedSectionTop(): number {
        return 0;
    }

    public get paddedSectionLeft(): number {
        return 0;
    }

    public createSplitterView(): IWindowContainer {
        return asGuarded(this.recreateElement("ruler_view"), isIWindowContainer);
    }

    public createSplitterVerticalView(): IWindowContainer {
        return asGuarded(this.recreateElement("ruler_view_vertical"), isIWindowContainer);
    }

    public createTextView(param1: boolean = true): ITextWindow {
        return asGuarded(this.recreateElement(param1 ? "text_bold_view" : "text_view"), isITextWindow);
    }

    public createHtmlView(): IHTMLTextWindow {
        return asGuarded(this.recreateElement("text_html"), isIHTMLTextWindow);
    }

    public createTextInputView(): IWindow {
        return asGuarded(this.recreateElement("input_template"), isIWindow);
    }

    public createCheckboxView(): ICheckBoxWindow {
        return asGuarded(this.recreateElement("checkbox_view"), isICheckBoxWindow);
    }

    public createRadioButtonView(): IRadioButtonWindow {
        return asGuarded(this.recreateElement("radiobutton_view"), isIRadioButtonWindow);
    }

    public createExpandCollapseSectionRegion(): IRegionWindow {
        return asGuarded(this.recreateElement("expand_collapse_region"), isIRegionWindow);
    }

    public createSourceTypeSelector(): IItemListWindow {
        return asGuarded(this.recreateElement("sourcetype_selector_view"), isIItemListWindow);
    }

    public createDropdown(): IDropMenuWindow {
        return asGuarded(this.recreateElement("dropdown_view"), isIDropMenuWindow);
    }

    public createSlider(): IWindowContainer {
        return asGuarded(this.recreateElement("slider"), isIWindowContainer);
    }

    public createButton(): IButtonWindow {
        return asGuarded(this.recreateElement("button"), isIButtonWindow);
    }

    public createAssetButton(): IContainerButtonWindow {
        return asGuarded(this.recreateElement("asset_button"), isIContainerButtonWindow);
    }

    public createIconButton(param1: string): IWindow {
        return this.recreateElement("iconbutton_" + param1);
    }

    public createMiniButton(): IWindow {
        return this.recreateElement("mini_button_view");
    }

    public createFrame(): IFrameWindow {
        return asGuarded(this.recreateElement("frame"), isIFrameWindow);
    }

    public createQuickMenu(): IWindowContainer {
        return asGuarded(this.recreateElement("quick_menu"), isIWindowContainer);
    }

    public createInnerBorder(): IBorderWindow {
        return asGuarded(this.recreateElement("inner_border"), isIBorderWindow);
    }

    public createBorder(): IBorderWindow {
        return asGuarded(this.recreateElement("border"), isIBorderWindow);
    }

    public createSurroundingBorder(): IBorderWindow {
        let _loc1_: IBorderWindow = this.createBorder();
        if (this.surroundingBorderStyleId > 0) {
            _loc1_.style = this.surroundingBorderStyleId >>> 0;
        }
        return _loc1_;
    }

    public createContainerButton(): IContainerButtonWindow {
        return asGuarded(this.recreateElement("container_button"), isIContainerButtonWindow);
    }

    private recreateElement(param1: string): IWindow {
        let _loc2_: IWindow = this.styleTemplate.findChildByName(param1);
        _loc2_ = _loc2_.clone();
        _loc2_.visible = true;
        return _loc2_;
    }

    public createTradeRequirementRule(): IBorderWindow {
        return asGuarded(this.recreateElement("requirement_rule"), isIBorderWindow);
    }

    public createProductIconPreviewer(): IBorderWindow {
        return asGuarded(this.recreateElement("product_icon_previewer"), isIBorderWindow);
    }
}
