import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MessageEditorToolbarPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorToolbarPreset'); }

    private static readonly REFERENCE_DROPDOWN_WIDTH: number = 180;
    private static readonly REFERENCE_BUTTON_SPACING: number = 5;

    declare private _container: IWindowContainer;

    declare private _SafeStr_14386: (...args: any[]) => any;

    declare private _SafeStr_14387: (...args: any[]) => any;

    declare private _SafeStr_14388: (...args: any[]) => any;

    declare private _SafeStr_14389: (...args: any[]) => any;

    declare private _SafeStr_14390: (...args: any[]) => any;

    declare private _placeholderDropdown: DropdownPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: (...args: any[]) => any, param6: (...args: any[]) => any, param7: (...args: any[]) => any, param8: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_14386 = param4;
        this._SafeStr_14387 = param5;
        this._SafeStr_14388 = param6;
        this._SafeStr_14389 = param7;
        this._SafeStr_14390 = param8;
        this._container = param3.createMessageEditorToolbar();
        this._container.enableLookupCache();
        this._placeholderDropdown = param2.createDropdown(new DropdownParam("", Array.from([]), this.onPlaceholderOptionSelected, "", 180));
        this._container.addChild(this._placeholderDropdown.window);
        this.boldLabel.bold = true;
        this.italicLabel.italic = true;
        this.underlineLabel.underline = true;
        this.colorIndicator = 9115929;
        this.counter.textColor = param3.softTextColor;
        this.boldButton.toolTipCaption = "${wiredfurni.params.message_editor.bold.tooltip}";
        this.italicButton.toolTipCaption = "${wiredfurni.params.message_editor.italic.tooltip}";
        this.underlineButton.toolTipCaption = "${wiredfurni.params.message_editor.underline.tooltip}";
        this.colorButton.toolTipCaption = "${wiredfurni.params.message_editor.color.tooltip}";
        this.alignButton.caption = "${wiredfurni.params.message_editor.align}";
        this.alignButton.toolTipCaption = "${wiredfurni.params.message_editor.align.tooltip}";
        this.placeholderButton.caption = "${wiredfurni.params.message_editor.add_placeholder}";
        let _loc9_: TextFormat = this.counter.defaultTextFormat;
        _loc9_.align = "right";
        this.counter.defaultTextFormat = _loc9_;
        this.layoutControls(this._container.width);
        this.boldButton.addEventListener("WME_CLICK", this.onBoldClicked);
        this.italicButton.addEventListener("WME_CLICK", this.onItalicClicked);
        this.underlineButton.addEventListener("WME_CLICK", this.onUnderlineClicked);
        this.colorButton.addEventListener("WME_CLICK", this.onColorClicked);
        this.alignButton.addEventListener("WME_CLICK", this.onAlignClicked);
        this.placeholderButton.addEventListener("WME_CLICK", this.onPlaceholderClicked);
        this.setTextReferences(Array.from([]));
        this._placeholderDropdown.window.addEventListener("WE_EXPANDED", this.onDropdownExpanded);
        this._placeholderDropdown.window.addEventListener("WE_COLLAPSE", this.onDropdownCollapsed);
    }

    private static setButtonEnabled(param1: IButtonWindow, param2: boolean): void {
        if (param2) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    private static createOptions(param1: string[]): ExpandableDropdownOption[] {
        let _loc3_: number = 0;
        let _loc2_: ExpandableDropdownOption[] = Array.from([]);
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_, param1[_loc3_]));
            _loc3_++;
        }
        return _loc2_;
    }

    private static positionDropdown(param1: DropdownPreset, param2: IWindow): void {
        param1.window.x = param2.x + param2.width - param1.window.width;
        param1.window.y = param2.y + param2.height;
        param1.visible = false;
    }

    public setTextReferences(param1: string[]): void {
        let _loc2_: ExpandableDropdownOption[] = MessageEditorToolbarPreset.createOptions(param1);
        this._placeholderDropdown.reinit(_loc2_, -1);
        MessageEditorToolbarPreset.setButtonEnabled(this.placeholderButton, _loc2_.length > 0);
    }

    private layoutControls(param1: number): void {
        let _loc2_: number = this.alignButton.width + this.placeholderButton.width + 5;
        this.alignButton.x = (param1 - _loc2_) / 2 | 0;
        this.placeholderButton.x = this.alignButton.x + this.alignButton.width + 5;
        this.counter.x = param1 - this.counter.width;
        MessageEditorToolbarPreset.positionDropdown(this._placeholderDropdown, this.placeholderButton);
    }

    public updateCounter(param1: number, param2: number): void {
        this.counter.text = param1 + "/" + param2;
    }

    public set colorIndicator(param1: number) {
        this.colorLabel.textColor = param1;
    }

    public get colorIndicator(): number {
        return this.colorLabel.textColor;
    }

    public get colorButtonWindow(): IWindow {
        return this.colorButton;
    }

    private onBoldClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14386("b");
    };

    private onItalicClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14386("i");
    };

    private onUnderlineClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14386("u");
    };

    private onColorClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14387();
    };

    private onAlignClicked = (param1: WindowMouseEvent): void => {
        this._SafeStr_14388();
    };

    private onPlaceholderClicked = (param1: WindowMouseEvent): void => {
        this._placeholderDropdown.requestOpen();
        this._placeholderDropdown.visible = false;
    };

    private onDropdownExpanded = (param1: WindowEvent): void => {
        this._SafeStr_14390(true);
    };

    private onDropdownCollapsed = (param1: WindowEvent): void => {
        this._SafeStr_14390(false);
    };

    private onPlaceholderOptionSelected = (param1: ExpandableDropdownOption): void => {
        this._SafeStr_14389(param1.displayString);
        this._placeholderDropdown.selectedId = -1;
    };

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
        this.layoutControls(param1);
    }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return [this._placeholderDropdown];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.boldButton.removeEventListener("WME_CLICK", this.onBoldClicked);
        this.italicButton.removeEventListener("WME_CLICK", this.onItalicClicked);
        this.underlineButton.removeEventListener("WME_CLICK", this.onUnderlineClicked);
        this.colorButton.removeEventListener("WME_CLICK", this.onColorClicked);
        this.alignButton.removeEventListener("WME_CLICK", this.onAlignClicked);
        this.placeholderButton.removeEventListener("WME_CLICK", this.onPlaceholderClicked);
        this._placeholderDropdown.window.removeEventListener("WE_EXPANDED", this.onDropdownExpanded);
        this._placeholderDropdown.window.removeEventListener("WE_COLLAPSE", this.onDropdownCollapsed);
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_14386 = null;
        this._SafeStr_14387 = null;
        this._SafeStr_14388 = null;
        this._SafeStr_14389 = null;
        this._SafeStr_14390 = null;
        this._placeholderDropdown = null;
    }

    private get boldButton(): IContainerButtonWindow {
        return asGuarded(this._container.findChildByName("bold_button"), isIContainerButtonWindow);
    }

    private get italicButton(): IContainerButtonWindow {
        return asGuarded(this._container.findChildByName("italic_button"), isIContainerButtonWindow);
    }

    private get underlineButton(): IContainerButtonWindow {
        return asGuarded(this._container.findChildByName("underline_button"), isIContainerButtonWindow);
    }

    private get colorButton(): IContainerButtonWindow {
        return asGuarded(this._container.findChildByName("color_button"), isIContainerButtonWindow);
    }

    private get alignButton(): IButtonWindow {
        return asGuarded(this._container.findChildByName("align_button"), isIButtonWindow);
    }

    private get placeholderButton(): IButtonWindow {
        return asGuarded(this._container.findChildByName("placeholder_button"), isIButtonWindow);
    }

    private get boldLabel(): ITextWindow {
        return asGuarded(this._container.findChildByName("bold_label"), isITextWindow);
    }

    private get italicLabel(): ITextWindow {
        return asGuarded(this._container.findChildByName("italic_label"), isITextWindow);
    }

    private get underlineLabel(): ITextWindow {
        return asGuarded(this._container.findChildByName("underline_label"), isITextWindow);
    }

    private get colorLabel(): ITextWindow {
        return asGuarded(this._container.findChildByName("color_label"), isITextWindow);
    }

    private get counter(): ITextWindow {
        return asGuarded(this._container.findChildByName("counter"), isITextWindow);
    }
}
