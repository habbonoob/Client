import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { TextPlaceholders } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/TextPlaceholders';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { MessageEditorPopupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorPopupPreset';
import type { AssetButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MessageEditorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorPreset'); }

    declare private _SafeStr_2147: TextAreaParam;

    declare private _SafeStr_14396: boolean;
    static { (this.prototype as any)._SafeStr_14396 = false; }

    declare private _SafeStr_14397: (...args: any[]) => any;

    declare private _previewBubbleWidth: (...args: any[]) => any;

    declare private _SafeStr_14398: (...args: any[]) => any;

    declare private _previewUsername: (...args: any[]) => any;

    private _placeholderNames: string[] = Array.from([]);

    declare private _SafeStr_14399: TextAreaPreset;

    declare private _SafeStr_14400: AssetButtonPreset;

    declare private _SafeStr_3375: SimpleListViewPreset;

    declare private _popup: MessageEditorPopupPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: TextAreaParam, param5: (...args: any[]) => any, param6: (...args: any[]) => any, param7: (...args: any[]) => any, param8: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_2147 = param4;
        this._SafeStr_14397 = param5;
        this._previewBubbleWidth = param6;
        this._SafeStr_14398 = param7;
        this._previewUsername = param8;
        this._SafeStr_14399 = param2.createTextArea(param4);
        this._SafeStr_14400 = param2.createAssetButtonPreset("message_editor_popout", "${wiredfurni.params.message_editor.open.tooltip}", this.openEditor);
        this._SafeStr_3375 = param2.createSimpleListView(false, [this._SafeStr_14399, this._SafeStr_14400], true);
        this._SafeStr_14399.addChangeListener(this.onCompactTextChanged);
    }

    public get text(): string {
        return this._SafeStr_14399.text;
    }

    public set text(param1: string) {
        this._SafeStr_14399.text = param1;
    }

    public hideEditor(): void {
        if (this._popup != null) {
            this._popup.hide();
        }
    }

    public refreshPreview(): void {
        if (this._popup != null && this._popup.isOpen) {
            this._popup.refreshPreview();
        }
    }

    public setTextReferences(param1: TextPlaceholders): void {
        this._placeholderNames = param1?.placeholderNames;
        if (this._popup != null) {
            this._popup.setTextReferences(this._placeholderNames);
        }
    }

    private openEditor = (): void => {
        if (this._popup == null) {
            this._popup = this._presetManager.createMessageEditorPopup(this._SafeStr_2147.maxCharacters, this._SafeStr_2147.maxLines, this._SafeStr_2147.wordwrap, this.onPopupTextChanged, this._SafeStr_14397, this._previewBubbleWidth, this._SafeStr_14398, this._previewUsername);
        }
        this._popup.setTextReferences(this._placeholderNames);
        this._popup.open(this._SafeStr_14399.text);
    };

    private onCompactTextChanged = (param1: string): void => {
        if (this._SafeStr_14396) {
            return;
        }
        this._SafeStr_14396 = true;
        try {
            if (this._popup != null) {
                this._popup.syncText(param1);
            }
        } finally {
            this._SafeStr_14396 = false;
        }
    };

    private onPopupTextChanged = (param1: string): void => {
        if (this._SafeStr_14396) {
            return;
        }
        this._SafeStr_14396 = true;
        try {
            this._SafeStr_14399.text = param1;
        } finally {
            this._SafeStr_14396 = false;
        }
    };

    public override get window(): IWindow {
        return this._SafeStr_3375.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_3375.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return this._popup == null ? [this._SafeStr_3375] : [this._SafeStr_3375, this._popup];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_14399.removeChangeListener(this.onCompactTextChanged);
        this.hideEditor();
        super.dispose();
        this._SafeStr_2147 = null;
        this._SafeStr_14397 = null;
        this._previewBubbleWidth = null;
        this._SafeStr_14398 = null;
        this._previewUsername = null;
        this._placeholderNames = null;
        this._SafeStr_14399 = null;
        this._SafeStr_14400 = null;
        this._SafeStr_3375 = null;
        this._popup = null;
    }
}
