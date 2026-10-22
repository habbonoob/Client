import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TextPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::TextPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: TextParam) {
        super(param1, param2, param3);
        this._SafeStr_3112 = param5;
        this._window = this.createView();
        if (this._SafeStr_3112.fontSize != -1) {
            this._window.fontSize = this._SafeStr_3112.fontSize >>> 0;
        }
        if (this._SafeStr_3112.textColor != 0) {
            this._window.textColor = this._SafeStr_3112.textColor;
        }
        this._window.text = param4;
        this.initializeMode(param5);
    }

    declare private _SafeStr_3112: TextParam;

    declare protected _window: ITextWindow;

    public override get window(): IWindow {
        return this._window;
    }

    public override get staticWidth(): number {
        if (this.canStretch) {
            return this._window.width;
        }
        throw new Exception("Non stretching text has no static width");
    }

    public get text(): string {
        return this._window.text;
    }

    public set text(param1: string) {
        this._window.text = param1;
    }

    public get canStretch(): boolean {
        return this._SafeStr_3112.mode == 0;
    }

    public get width(): number {
        return this._window.width;
    }

    public get fontSize(): number {
        return (isITextWindow(this._window) ? this._window : null).fontSize | 0;
    }

    public override hasStaticWidth(): boolean {
        return this.canStretch;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        if (!this.canStretch) {
            this._window.width = param1;
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._SafeStr_3112 = null;
    }

    protected initializeMode(param1: TextParam): void {
        if (param1.mode == 1) {
            this._window.multiline = true;
            this._window.wordWrap = true;
            this._window.maxLines = param1.maxLines;
            if (param1.alignment != null) {
                this._window.autoSize = param1.alignment;
            }
        }
        if (param1.mode == 2) {
            this._window.overflowReplace = "...";
            this._window.autoSize = "none";
        }
    }

    protected createView(): ITextWindow {
        let _loc1_: ITextWindow = this._SafeStr_2144.createTextView(this._SafeStr_3112.bold);
        _loc1_.underline = this._SafeStr_3112.underline;
        return _loc1_;
    }
}
