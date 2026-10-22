import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/IconButtonPreset';
import type { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class InputSourceSection extends AbstractSectionPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::InputSourceSection'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: number, param6: number, param7: any[], param8: boolean = false, param9: boolean = false) {
        let param: SectionParam;
        let roomEvents: HabboUserDefinedRoomEvents = param1;
        let presetManager: PresetManager = param2;
        let wiredStyle: WiredStyle = param3;
        let title: string = param4;
        let sourceType: number = param5;
        let id: number = param6;
        let sourceOptionIds: any[] = param7;
        let hasCustomTypePicker: boolean = param8;
        let dualFurniPickingMode: boolean = param9;
        super(roomEvents, presetManager, wiredStyle);
        this._picker = new WiredInputSourcePicker(roomEvents, sourceType, id);
        this._SafeStr_4277 = presetManager.createIconButtonPreset("left", (): void => {
                this._picker.onChangeInputSource(false);
                this.updateUI();
            });
        this._textPreset = presetManager.createText("", new TextParam(1, false, 0, false, "center"));
        this._SafeStr_4545 = presetManager.createIconButtonPreset("right", (): void => {
                this._picker.onChangeInputSource(true);
                this.updateUI();
            });
        this._listPreset = presetManager.createSimpleListView(false, [this._SafeStr_4277, this._textPreset, this._SafeStr_4545], true);
        this._listPreset.minHeight = wiredStyle.inputSourceListMinHeight;
        this._listPreset.spacing = wiredStyle.LRContainerSpacing;
        this._preset = presetManager.createPaddedContainerPreset(this._listPreset, wiredStyle.LRContainerMargin, wiredStyle.LRContainerTopBottomPadding, wiredStyle.LRContainerMargin, wiredStyle.LRContainerTopBottomPadding);
        param = null;
        if (sourceType == WiredInputSourcePicker.MERGED_SOURCE && !hasCustomTypePicker) {
            param = new SectionParam(new SourceTypeSelectorParam(sourceOptionIds, this));
        }
        if (dualFurniPickingMode) {
            if (param == null) {
                param = new SectionParam();
            }
            this._furniPicking1Button = presetManager.createMiniAssetIconButtonPreset("furni_picks_1", "${wiredfurni.params.furni_picking.tooltip}", this.onFurniPicks1Clicked);
            this._furniPicking2Button = presetManager.createMiniAssetIconButtonPreset("furni_picks_2", "${wiredfurni.params.furni_picking.tooltip}", this.onFurniPicks2Clicked);
            param.addHeaderOption(this._furniPicking1Button);
            param.addHeaderOption(this._furniPicking2Button);
        }
        this.initializeSection(title, this._preset, param);
    }

    declare private _preset: WiredUIPreset;

    declare private _listPreset: SimpleListViewPreset;

    declare private _textPreset: TextPreset;

    declare private _picker: WiredInputSourcePicker;

    declare private _SafeStr_4277: IconButtonPreset;

    declare private _SafeStr_4545: IconButtonPreset;

    private _furniPicking1Button: MiniAssetIconButtonPreset = null;
    private _furniPicking2Button: MiniAssetIconButtonPreset = null;

    public get baseSourceType(): number {
        return this._picker.sourceType;
    }

    public get id(): number {
        return this._picker.id;
    }

    public set sourceType(param1: number) {
        this._picker.sourceType = param1;
        let _loc2_: SourceTypeSelectorPreset = this._SafeStr_2848.getSourceTypeSelector();
        if (_loc2_ != null) {
            _loc2_.select(param1);
        }
        this.updateUI();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._preset = null;
        this._listPreset = null;
        this._textPreset = null;
        this._picker.dispose();
        this._picker = null;
        this._SafeStr_4277 = null;
        this._SafeStr_4545 = null;
    }

    public activeFurniPicksChanged(): void {
        if (this._furniPicking1Button != null && this._furniPicking1Button.visible) {
            this._furniPicking1Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 1;
        } else if (this._furniPicking2Button != null && this._furniPicking2Button.visible) {
            this._furniPicking2Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 2;
        }
    }

    public refresh(param1: Triggerable, param2: Element): void {
        this._picker.refreshContainer(param1, param2);
        this.updateUI();
    }

    public updateUI(): void {
        this.disabled = this._picker.disabled;
        this._SafeStr_4277.disabled = this._picker.isButtonsDisabled;
        this._SafeStr_4545.disabled = this._picker.isButtonsDisabled;
        this._textPreset.text = this._picker.selectedText;
        if (this._furniPicking1Button != null && this._furniPicking2Button != null) {
            switch (this._picker.stuffPickingSpecialMode) {
                case WiredInputSourcePicker.STUFF_PICKING_MODE_1:
                    this._furniPicking1Button.visible = true;
                    this._furniPicking2Button.visible = false;
                    this._furniPicking1Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 1;
                    break;
                case WiredInputSourcePicker.STUFF_PICKING_MODE_2:
                    this._furniPicking1Button.visible = false;
                    this._furniPicking2Button.visible = true;
                    this._furniPicking2Button.selected = this._roomEvents.wiredCtrl.activeFurniPicks == 2;
                    break;
                default:
                    this._furniPicking1Button.visible = false;
                    this._furniPicking2Button.visible = false;
            }
        }
        this._SafeStr_2848.refreshAlignments();
    }

    private onFurniPicks1Clicked = (): void => {
        this._roomEvents.wiredCtrl.activeFurniPicks = 1;
    };

    private onFurniPicks2Clicked = (): void => {
        this._roomEvents.wiredCtrl.activeFurniPicks = 2;
    };
}
