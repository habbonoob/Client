import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MessageEditorPreviewPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorPreviewPreset'); }

    private static readonly EXPANDED_BOTTOM_PADDING: number = 5;

    declare private _container: IWindowContainer;

    declare private _bitmapData: BitmapData;

    declare private _SafeStr_14367: number;
    static { (this.prototype as any)._SafeStr_14367 = 0; }

    declare private _SafeStr_14368: number;
    static { (this.prototype as any)._SafeStr_14368 = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._container = param3.createMessageEditorPreview();
        this._container.enableLookupCache();
        this._SafeStr_14367 = this.previewArea.height;
        this._SafeStr_14368 = this._container.height - this._SafeStr_14367;
        this.previewTitle.textColor = param3.softTextColor;
    }

    public update(param1: string, param2: string, param3: number, param4: number, param5: number): void {
        let _loc6_: BitmapData = this._roomEvents.roomUI == null ? null : this._roomEvents.roomUI.createChatMessagePreviewBitmap(param1, param2, param3, param4, param5);
        this.setBitmap(_loc6_);
    }

    private setBitmap(param1: BitmapData): void {
        this.previewBitmap.bitmap = null;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        if (param1 == null) {
            this.setPreviewAreaHeight(this._SafeStr_14367);
            return;
        }
        let _loc2_: number = Number(Math.min(1, this.previewArea.width / param1.width));
        let _loc3_: number = Math.ceil(param1.height * _loc2_) | 0;
        let _loc4_: number = Math.max(this._SafeStr_14367, _loc3_) | 0;
        this.setPreviewAreaHeight(_loc4_, _loc4_ > this._SafeStr_14367 ? 5 : 0);
        let _loc5_: number = Number(Math.min(1, _loc2_, this.previewArea.height / param1.height));
        if (_loc5_ < 1) {
            this._bitmapData = new BitmapData(Math.max(1, param1.width * _loc5_ | 0) | 0, Math.max(1, param1.height * _loc5_ | 0) | 0, true, 0);
            this._bitmapData.draw(param1, new Matrix(_loc5_, 0, 0, _loc5_), null, null, null, true);
            param1.dispose();
        } else {
            this._bitmapData = param1;
        }
        this.previewBitmap.bitmap = this._bitmapData;
        this.previewBitmap.width = this._bitmapData.width;
        this.previewBitmap.height = this._bitmapData.height;
        this.positionBitmap();
    }

    private setPreviewAreaHeight(param1: number, param2: number = 0): void {
        this._container.height = this._SafeStr_14368 + param1 + param2;
        this.previewArea.height = param1;
    }

    private positionBitmap(): void {
        this.previewBitmap.x = (this.previewArea.width - this.previewBitmap.width) / 2 | 0;
        this.previewBitmap.y = (this.previewArea.height - this.previewBitmap.height) / 2 | 0;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
        this.previewTitle.width = param1;
        this.previewArea.width = param1;
        this.positionBitmap();
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.previewBitmap.bitmap = null;
        if (this._bitmapData != null) {
            this._bitmapData.dispose();
            this._bitmapData = null;
        }
        this._container.dispose();
        this._container = null;
        super.dispose();
    }

    private get previewTitle(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_title"), isITextWindow);
    }

    private get previewArea(): IWindowContainer {
        return asGuarded(this._container.findChildByName("preview_area"), isIWindowContainer);
    }

    private get previewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("preview_bitmap"), isIBitmapWrapperWindow);
    }
}
