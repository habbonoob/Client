import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { MessageEditorPalettePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorPalettePreset';
import type { MessageEditorPreviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorPreviewPreset';
import type { MessageEditorToolbarPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorToolbarPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import type { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MessageEditorPopupPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorPopupPreset'); }

    private static readonly WIDTH: number = 700;
    private static readonly EDITOR_HEIGHT: number = 140;
    private static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _SafeStr_14391: (...args: any[]) => any;

    declare private _SafeStr_14382: (...args: any[]) => any;

    declare private _previewBubbleWidth: (...args: any[]) => any;

    declare private _SafeStr_14383: (...args: any[]) => any;

    declare private _previewUsername: (...args: any[]) => any;

    declare private _SafeStr_14381: boolean;
    static { (this.prototype as any)._SafeStr_14381 = false; }

    declare private _SafeStr_14392: boolean;
    static { (this.prototype as any)._SafeStr_14392 = false; }

    declare private _SafeStr_14375: boolean;
    static { (this.prototype as any)._SafeStr_14375 = false; }

    declare private _referenceDropdownOpen: boolean;
    static { (this.prototype as any)._referenceDropdownOpen = false; }

    declare private _editor: TextAreaPreset;

    declare private _toolbar: MessageEditorToolbarPreset;

    declare private _palette: MessageEditorPalettePreset;

    declare private _preview: MessageEditorPreviewPreset;

    declare private _SafeStr_2221: SimpleListViewPreset;

    declare private _content: PaddedContainerPreset;

    declare private _frame: FramePreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: number, param6: boolean, param7: (...args: any[]) => any, param8: (...args: any[]) => any, param9: (...args: any[]) => any, param10: (...args: any[]) => any, param11: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_14391 = param7;
        this._SafeStr_14382 = param8;
        this._previewBubbleWidth = param9;
        this._SafeStr_14383 = param10;
        this._previewUsername = param11;
        this._editor = param2.createTextArea(new TextAreaParam(140, -1, param5, -1, param4, "", null, null, true, param6));
        this._toolbar = param2.createMessageEditorToolbar(this.onFormat, this.onColorRequested, this.onAlign, this.onPlaceholderSelected, this.onReferenceDropdownOpenChanged);
        this._palette = param2.createMessageEditorPalette(this.onColorSelected, this.onSwatchHoverChanged);
        this._preview = param2.createMessageEditorPreview();
        this._SafeStr_2221 = param2.createSimpleListView(true, [this._toolbar, this._editor, this._preview]);
        this._SafeStr_2221.spacing = param3.genericVerticalSpacing;
        this._content = param2.createPaddedContainerPreset(this._SafeStr_2221, 8, 8, 8, 8);
        this._frame = param2.createFramePreset([this._content], this.hide);
        this._frame.title = this.loc("wiredfurni.params.message_editor.title");
        this._frame.resizeToWidth(700);
        this.frameContent.addChild(this._palette.window);
        this._frame.window.visible = false;
        this._editor.addChangeListener(this.onEditorTextChanged);
        this._toolbar.updateCounter(this._editor.currentLength, this._editor.maxCharacters);
    }

    public open(param1: string): void {
        let _loc2_: IDesktopWindow = null;
        this.syncText(param1);
        this.refreshPreview();
        if (this._frame.window.parent == null) {
            _loc2_ = this._roomEvents.windowManager.getDesktop(1);
            _loc2_.addChild(this._frame.window);
        }
        this._frame.window.visible = true;
        if (!this._SafeStr_14392) {
            this._frame.window.center();
            this._SafeStr_14392 = true;
        }
        this._frame.window.activate();
    }

    public syncText(param1: string): void {
        this._SafeStr_14381 = true;
        try {
            this._editor.text = param1;
        } finally {
            this._SafeStr_14381 = false;
        }
        this._toolbar.updateCounter(this._editor.currentLength, this._editor.maxCharacters);
    }

    public setTextReferences(param1: string[]): void {
        this._toolbar.setTextReferences(param1);
    }

    public hide = (): void => {
        let _loc1_: IDesktopWindow = null;
        this._palette.hide();
        if (this._frame.window.parent != null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            _loc1_.removeChild(this._frame.window);
        }
        this._frame.window.visible = false;
    };

    public get isOpen(): boolean {
        return this._frame.window.parent != null && this._frame.window.visible;
    }

    public refreshPreview(): void {
        this._preview.update(this._editor.text, stringOrNull(this._previewUsername()), this._SafeStr_14382() | 0, this._SafeStr_14383() | 0, this._previewBubbleWidth() | 0);
    }

    private onEditorTextChanged = (param1: string): void => {
        this._toolbar.updateCounter(this._editor.currentLength, this._editor.maxCharacters);
        if (this.isOpen) {
            this.refreshPreview();
        }
        if (!this._SafeStr_14381) {
            this._SafeStr_14391(param1);
        }
    };

    private onFormat = (param1: string): void => {
        this.applyTag(param1);
    };

    private onColorRequested = (): void => {
        if (this._palette.isOpen) {
            this._palette.hide();
            return;
        }
        let _loc2_: Point = new Point();
        this._toolbar.colorButtonWindow.getGlobalPosition(_loc2_);
        let _loc1_: Point = new Point();
        this.frameContent.getGlobalPosition(_loc1_);
        this._palette.window.x = _loc2_.x - _loc1_.x | 0;
        this._palette.window.y = _loc2_.y - _loc1_.y + this._toolbar.colorButtonWindow.height | 0;
        this._palette.toggle();
    };

    private onColorSelected = (param1: string, param2: number): void => {
        if (this.applyTag(param1)) {
            this._toolbar.colorIndicator = param2;
        }
    };

    private onAlign = (): void => {
        this._editor.insertText("[a]");
        this._editor.focus();
    };

    private onPlaceholderSelected = (param1: string): void => {
        this._editor.insertText("$(" + param1 + ")");
        this._editor.focus();
    };

    private onSwatchHoverChanged = (param1: boolean): void => {
        this._SafeStr_14375 = param1;
        this.updateEditorSelectable();
    };

    private onReferenceDropdownOpenChanged = (param1: boolean): void => {
        this._referenceDropdownOpen = param1;
        this.updateEditorSelectable();
    };

    private updateEditorSelectable(): void {
        this._editor.selectable = !this._SafeStr_14375 && !this._referenceDropdownOpen;
    }

    private applyTag(param1: string): boolean {
        let _loc2_: boolean = this._editor.wrapSelection("[" + param1 + "]", "[/" + param1 + "]");
        this._editor.focus();
        return _loc2_;
    }

    public override get window(): IWindow {
        return this._frame.window;
    }

    protected override get childPresets(): any[] {
        return [this._frame, this._palette];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        this._editor.removeChangeListener(this.onEditorTextChanged);
        this._SafeStr_14391 = null;
        this._SafeStr_14382 = null;
        this._previewBubbleWidth = null;
        this._SafeStr_14383 = null;
        this._previewUsername = null;
        this.frameContent.removeChild(this._palette.window);
        super.dispose();
        this._editor = null;
        this._toolbar = null;
        this._palette = null;
        this._preview = null;
        this._SafeStr_2221 = null;
        this._content = null;
        this._frame = null;
    }

    private get frameContent(): IWindowContainer {
        return castGuarded(this._frame.window, isIFrameWindow, "com.sulake.core.window.components.IFrameWindow").content;
    }
}
