import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import type { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import type { HtmlTextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/HtmlTextParam';
import type { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';
import type { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import type { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import type { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import type { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import type { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import type { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import type { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import type { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { ChronoMaskFilterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/ChronoMaskFilterPreset';
import { ChronoRangeFilterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/ChronoRangeFilterPreset';
import { FloorDrawingPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/FloorDrawingPreset';
import { FloorEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/FloorEditorPreset';
import { LevelXpPreviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LevelXpPreviewPreset';
import { SubVariableCreatorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/SubVariableCreatorPreset';
import { AssetButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonPreset';
import { AssetButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonRowPreset';
import { AvatarImagePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AvatarImagePreset';
import { BitmapViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/BitmapViewPreset';
import { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import { ButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonRowPreset';
import { CenteredContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CenteredContainerPreset';
import { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import { CollapseExpandSectionButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CollapseExpandSectionButtonPreset';
import { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import { NamedTextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedTextInputPreset';
import { RewardListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/RewardListPreset';
import { RewardRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/RewardRowPreset';
import { ContainerButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ContainerButtonPreset';
import { ChestItemIconPreviewerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/ChestItemIconPreviewerPreset';
import { ItemTypeSelectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/ItemTypeSelectionPreset';
import { NodeOverviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/NodeOverviewPreset';
import { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import { TradeRuleListEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleListEditorPreset';
import { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import { HorizontalSectionListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HorizontalSectionListPreset';
import { HtmlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HtmlPreset';
import { IconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/IconButtonPreset';
import { AdvancedSettingsWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/AdvancedSettingsWrapperPreset';
import { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import { IlluminaHeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/IlluminaHeaderPreset';
import { InnerBorderFramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/InnerBorderFramePreset';
import { InputSourceSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/InputSourceSection';
import { LegacyInputWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/LegacyInputWrapperPreset';
import { VolterHeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/VolterHeaderPreset';
import { MenuPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/MenuPreset';
import { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import { PressedButtonMiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PressedButtonMiniAssetIconButtonPreset';
import { RadioButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioButtonPreset';
import { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import { ScrollListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ScrollListPreset';
import { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import { BorderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/BorderSection';
import { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import { ItemTypeSelectionSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ItemTypeSelectionSection';
import { PlaceholderNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/PlaceholderNameSection';
import { PlaceholderTypeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/PlaceholderTypeSection';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';
import { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import { UsageWarningSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageWarningSection';
import { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import { VariablePlaceholderModeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariablePlaceholderModeSection';
import { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import { SliderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SliderPreset';
import { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import { SpacerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacerPreset';
import { SpacingPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacingPreset';
import { SplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SplitterPreset';
import { StaticBitmapAssetWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/StaticBitmapAssetWrapperPreset';
import { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import { TextualButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextualButtonPreset';
import { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import { VolterMiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VolterMiniAssetIconButtonPreset';

export class PresetManager {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder::PresetManager'); }

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    private _presetTemplates: UtilsMap = new UtilsMap();

    public get wiredStyle(): WiredStyle {
        return this._roomEvents.wiredCtrl.wiredStyle;
    }

    public createRadioButton(param1: RadioButtonParam, param2: boolean = false): RadioButtonPreset {
        return new RadioButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createRadioGroup(param1: any[], param2: (...args: any[]) => any = null, param3: number = 1): RadioGroupPreset {
        return new RadioGroupPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createCheckboxOption(param1: CheckboxOptionParam, param2: boolean = false): CheckboxOptionPreset {
        return new CheckboxOptionPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createCheckboxGroup(param1: any[], param2: (...args: any[]) => any = null, param3: number = 1): CheckboxGroupPreset {
        return new CheckboxGroupPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createSection(param1: string, param2: WiredUIPreset, param3: SectionParam = null): SectionPreset {
        return new SectionPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createBorderSection(param1: string, param2: WiredUIPreset, param3: SectionParam = null): BorderSection {
        return new BorderSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createSourceTypeSelector(param1: SourceTypeSelectorParam): SourceTypeSelectorPreset {
        return new SourceTypeSelectorPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createCollapseExpandSectionButton(param1: (...args: any[]) => any = null, param2: boolean = true): CollapseExpandSectionButtonPreset {
        return new CollapseExpandSectionButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createTextInput(param1: TextInputParam): TextInputPreset {
        return new TextInputPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createNumberInput(param1: NumberInputParam): NumberInputPreset {
        return new NumberInputPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createNamedNumberInput(param1: NumberInputParam, param2: string, param3: boolean = false): NamedNumberInputPreset {
        return new NamedNumberInputPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createNamedTextInput(param1: TextInputParam, param2: string, param3: boolean = false): NamedTextInputPreset {
        return new NamedTextInputPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createNamedDropdown(param1: DropdownParam, param2: string, param3: boolean = false): NamedDropdownPreset {
        return new NamedDropdownPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createChronoRangeFilter(param1: string, param2: string, param3: string, param4: number, param5: number, param6: number, param7: number): ChronoRangeFilterPreset {
        return new ChronoRangeFilterPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6, param7);
    }

    public createChronoMaskFilter(param1: any[], param2: number = 1): ChronoMaskFilterPreset {
        return new ChronoMaskFilterPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createRewardList(param1: number, param2: number): RewardListPreset {
        return new RewardListPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createRewardRow(): RewardRowPreset {
        return new RewardRowPreset(this._roomEvents, this, this.wiredStyle);
    }

    public createAssetButtonRow(param1: any[]): AssetButtonRowPreset {
        return new AssetButtonRowPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createBitmapViewPreset(): BitmapViewPreset {
        return new BitmapViewPreset(this._roomEvents, this, this.wiredStyle);
    }

    public createFloorDrawingPreset(param1: (...args: any[]) => any): FloorDrawingPreset {
        return new FloorDrawingPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createFloorEditorPreset(param1: AssetButtonRowPreset, param2: FloorDrawingPreset): FloorEditorPreset {
        return new FloorEditorPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createTextArea(param1: TextAreaParam): TextAreaPreset {
        return new TextAreaPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createSimpleListView(param1: boolean, param2: any[], param3: boolean = false): SimpleListViewPreset {
        return new SimpleListViewPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createScrollList(param1: any[], param2: ListScrollParams, param3: boolean = false): ScrollListPreset {
        return new ScrollListPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createSplitter(): SplitterPreset {
        return new SplitterPreset(this._roomEvents, this, this.wiredStyle);
    }

    public createSpacer(param1: number): SpacerPreset {
        return new SpacerPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createText(param1: string, param2: TextParam = null): TextPreset {
        if (param2 == null) {
            param2 = TextParam.DEFAULT;
        }
        return new TextPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createHtml(param1: string, param2: HtmlTextParam): HtmlPreset {
        return new HtmlPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createLevelXpPreview(param1: any[]): LevelXpPreviewPreset {
        return new LevelXpPreviewPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createSubVariableCreator(param1: string, param2: any[]): SubVariableCreatorPreset {
        return new SubVariableCreatorPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createVariablePicker(param1: (...args: any[]) => any = null, param2: (...args: any[]) => any = null): VariablePickerPreset {
        return new VariablePickerPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createDropdown(param1: DropdownParam): DropdownPreset {
        return new DropdownPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createSpacing(param1: boolean, param2: number): SpacingPreset {
        return new SpacingPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createValueOrVariableSection(param1: number, param2: any[], param3: string, param4: number, param5: number): ValueOrVariableSection {
        return new ValueOrVariableSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5);
    }

    public createChooseVariableSection(param1: number = -1, param2: any[] = null, param3: (...args: any[]) => any = null, param4: (...args: any[]) => any = null, param5: string = null): ChooseVariableSection {
        return new ChooseVariableSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5);
    }

    public createVariableNameSection(): VariableNameSection {
        return new VariableNameSection(this._roomEvents, this, this.wiredStyle);
    }

    public createUsageInfoSection(param1: string, param2: boolean = false, param3: string = null): UsageInfoSection {
        return new UsageInfoSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createUsageWarningSection(param1: string): UsageWarningSection {
        return new UsageWarningSection(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createPlaceholderNameSection(param1: string, param2: string): PlaceholderNameSection {
        return new PlaceholderNameSection(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createPlaceholderTypeSection(param1: string = null): PlaceholderTypeSection {
        return new PlaceholderTypeSection(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createVariablePlaceholderModeSection(param1: string): VariablePlaceholderModeSection {
        return new VariablePlaceholderModeSection(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createBitmapWrapperPreset(param1: string): StaticBitmapAssetWrapperPreset {
        return new StaticBitmapAssetWrapperPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createAvatarImagePreset(): AvatarImagePreset {
        return new AvatarImagePreset(this._roomEvents, this, this.wiredStyle);
    }

    public createTextualButtonPreset(param1: string, param2: (...args: any[]) => any): TextualButtonPreset {
        return new TextualButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createHeaderPreset(param1: string, param2: ElementTypeHolder, param3: number, param4: (...args: any[]) => any, param5: (...args: any[]) => any, param6: (...args: any[]) => any): HeaderPreset {
        if (this.wiredStyle.isVolter) {
            return new VolterHeaderPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6);
        }
        if (this.wiredStyle.name == "illumina") {
            return new IlluminaHeaderPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6);
        }
        throw new Error("Header preset for unsupported style");
    }

    public createIconButtonPreset(param1: string, param2: (...args: any[]) => any): IconButtonPreset {
        return new IconButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createSliderPreset(param1: number = 0, param2: number = 1, param3: number = 0): SliderPreset {
        return new SliderPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createSliderSection(param1: string, param2: string, param3: SliderValueConverter, param4: number = 0, param5: number = 1, param6: number = 0, param7: boolean = true): SliderSection {
        return new SliderSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6, param7);
    }

    public createButton(param1: string, param2: (...args: any[]) => any, param3: number = 0): ButtonPreset {
        return new ButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createButtonRow(param1: any[]): ButtonRowPreset {
        return new ButtonRowPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createFooterPreset(param1: (...args: any[]) => any, param2: (...args: any[]) => any): FooterPreset {
        return new FooterPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createFramePreset(param1: any[], param2: (...args: any[]) => any, param3: string = null, param4: number = -1, param5: boolean = false, param6: boolean = false, param7: ListScrollParams = null, param8: boolean = false): FramePreset {
        if (this.wiredStyle.useInnerBorder) {
            return new InnerBorderFramePreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5);
        }
        return new FramePreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6, param7, param8);
    }

    public createLegacyInputWrapperPreset(param1: string, param2: number, param3: boolean): LegacyInputWrapperPreset {
        return new LegacyInputWrapperPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createInputSourceSection(param1: string, param2: number, param3: number, param4: any[] = null, param5: boolean = false, param6: boolean = false): InputSourceSection {
        return new InputSourceSection(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6);
    }

    public createAdvancedSettingsWrapperPreset(param1: any[], param2: boolean): AdvancedSettingsWrapperPreset {
        return new AdvancedSettingsWrapperPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createPaddedContainerPreset(param1: WiredUIPreset, param2: number, param3: number, param4: number, param5: number, param6: IWindowContainer = null, param7: boolean = false): PaddedContainerPreset {
        return new PaddedContainerPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5, param6, param7);
    }

    public createContainerButtonPreset(param1: WiredUIPreset, param2: (...args: any[]) => any, param3: boolean = true): ContainerButtonPreset {
        return new ContainerButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createCenteredContainerPreset(param1: WiredUIPreset, param2: number, param3: IWindowContainer = null): CenteredContainerPreset {
        return new CenteredContainerPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createMiniAssetIconButtonPreset(param1: string, param2: string, param3: (...args: any[]) => any): MiniAssetIconButtonPreset {
        if (this.wiredStyle.isVolter) {
            return new VolterMiniAssetIconButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
        }
        return new PressedButtonMiniAssetIconButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createAssetButtonPreset(param1: string, param2: string, param3: (...args: any[]) => any): AssetButtonPreset {
        return new AssetButtonPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3);
    }

    public createMenuPreset(param1: any[], param2: IWindow): MenuPreset {
        return new MenuPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createHorizontalSectionListPreset(param1: any[]): HorizontalSectionListPreset {
        return new HorizontalSectionListPreset(this._roomEvents, this, this.wiredStyle, param1);
    }

    public createLayout(param1: string): IWindow {
        if (this._presetTemplates.hasKey(param1)) {
            return this._presetTemplates.getValue(param1).clone();
        }
        let _loc2_: IWindow = this._roomEvents.getXmlWindow(param1);
        this._presetTemplates.add(param1, _loc2_);
        return _loc2_.clone();
    }

    public createRuleEditorPreset(param1: string, param2: (...args: any[]) => any, param3: (...args: any[]) => any, param4: (...args: any[]) => any = null, param5: (...args: any[]) => any = null): TradeRuleEditorPreset {
        return new TradeRuleEditorPreset(this._roomEvents, this, this.wiredStyle, param1, param2, param3, param4, param5);
    }

    public createRuleListEditorPreset(param1: (...args: any[]) => any, param2: (...args: any[]) => any): TradeRuleListEditorPreset {
        return new TradeRuleListEditorPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }

    public createChestItemIconPreviewerPreset(): ChestItemIconPreviewerPreset {
        return new ChestItemIconPreviewerPreset(this._roomEvents, this, this.wiredStyle);
    }

    public createItemTypeSelectionPreset(): ItemTypeSelectionPreset {
        return new ItemTypeSelectionPreset(this._roomEvents, this, this.wiredStyle);
    }

    public createItemTypeSelectionSection(): ItemTypeSelectionSection {
        return new ItemTypeSelectionSection(this._roomEvents, this, this.wiredStyle);
    }

    public createNodeOverviewPreset(param1: string, param2: (...args: any[]) => any = null): NodeOverviewPreset {
        return new NodeOverviewPreset(this._roomEvents, this, this.wiredStyle, param1, param2);
    }
}
