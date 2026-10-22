import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import type { _SafeCls_6113 } from '@/com/sulake/habbo/ui/handler/_SafeCls_6113';
import type { FurnitureLabelWidget } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelWidget';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ScaledWindow } from '@/com/sulake/core/window/utils/ScaledWindow';

export class FurnitureLabelView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.label::FurnitureLabelView'); }

    private static readonly PREVIEW_BLEND: number = 0.7;
    private static readonly _SafeStr_14604: number = 4;
    private static readonly TEXT_FIELD_PADDING: number = 4;
    private static readonly _SafeStr_14278: number = 64;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _widget: FurnitureLabelWidget;

    declare private _SafeStr_2143: _SafeCls_6113;

    declare private _window: IWindowContainer;

    declare private _scaledWindow: ScaledWindow;

    declare private _SafeStr_14605: boolean;
    static { (this.prototype as any)._SafeStr_14605 = false; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_14603: number;
    static { (this.prototype as any)._SafeStr_14603 = 0; }

    private _confirmedText: string = "";

    declare private _lastSubmittedText: string;

    declare private _isOpen: boolean;
    static { (this.prototype as any)._isOpen = false; }

    declare private _SafeStr_2874: boolean;
    static { (this.prototype as any)._SafeStr_2874 = false; }

    declare private _alwaysOpen: boolean;
    static { (this.prototype as any)._alwaysOpen = false; }

    declare private _canModify: boolean;
    static { (this.prototype as any)._canModify = false; }

    constructor(param1: FurnitureLabelWidget, param2: _SafeCls_6113, param3: IWindowContainer, param4: number, param5: number) {
        this._widget = param1;
        this._SafeStr_2143 = param2;
        this._roomId = param4;
        this._SafeStr_14603 = param5;
        this._window = asGuarded(this._widget.windowManager.buildFromXML(XML.from(this._widget.assets.getAssetByName("furniture_label_xml").content)), isIWindowContainer);
        this.input.addEventListener("WE_CHANGE", this.onInputChanged);
        this.input.addEventListener("WE_FOCUS", this.onInputFocused);
        this.input.addEventListener("WE_FOCUSED", this.onInputFocused);
        this.input.addEventListener("WE_UNFOCUS", this.onInputUnfocused);
        this.input.addEventListener("WE_UNFOCUSED", this.onInputUnfocused);
        this.placeholder.ignoreMouseEvents = true;
        this.updateInputSize();
        this._scaledWindow = new ScaledWindow(this._window);
        this._scaledWindow.window.visible = false;
        param3.addChild(this._scaledWindow.window);
        this.updatePresentation();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public get needsPositionUpdate(): boolean {
        return this._isOpen || this._SafeStr_2874 || this._alwaysOpen;
    }

    public setHovered(param1: boolean): void {
        this._SafeStr_2874 = param1;
        this.updatePresentation();
    }

    public setOpen(param1: boolean): void {
        if (this._isOpen == param1) {
            return;
        }
        if (!param1) {
            this.saveIfChanged();
        }
        this._isOpen = param1;
        this.updatePresentation();
        if (param1) {
            this._scaledWindow.window.activate();
            this.input.unfocus();
            this.input.setSelection(0, 0);
        }
    }

    public applyData(param1: FurnitureLabelData, param2: boolean): void {
        let _loc4_: string = this._confirmedText;
        let _loc3_: boolean = this.input.focused && this.input.text != _loc4_ && this.input.text != this._lastSubmittedText;
        this._confirmedText = param1.text;
        this._alwaysOpen = param1.alwaysOpen;
        this._canModify = param2;
        this._window.color = param1.bubbleColor >>> 0;
        this._lastSubmittedText = null;
        if (!_loc3_ || !this._canModify) {
            this.input.text = this._confirmedText;
        }
        this.updateInputSize();
        this.updatePresentation();
    }

    public saveIfChanged(): void {
        if (!this._canModify) {
            this.input.text = this._confirmedText;
            this.updateInputSize();
            this.updatePlaceholder();
            return;
        }
        let _loc1_: string = this.input.text;
        if (_loc1_ == this._confirmedText || _loc1_ == this._lastSubmittedText) {
            return;
        }
        this._SafeStr_2143.saveLabel(this._SafeStr_14603, _loc1_);
        this._lastSubmittedText = _loc1_;
    }

    public updatePosition(param1: IRoomEngine, param2: number, param3: Rectangle): void {
        let _loc5_: Rectangle = param1.getRoomObjectBoundingRectangle(this._roomId, this._SafeStr_14603, 10, param2);
        let _loc4_: Point = param1.getRoomObjectScreenLocation(this._roomId, this._SafeStr_14603, 10, param2);
        if (_loc5_ == null || _loc4_ == null || param3 == null) {
            this._SafeStr_14605 = false;
            this._scaledWindow.window.visible = false;
            return;
        }
        _loc5_.offset(param3.x, param3.y);
        _loc4_.offset(param3.x, param3.y);
        this._scaledWindow.scale = param1.getRoomCanvasGeometry(this._roomId, param2).scale / 64 * Math.abs(param1.getRoomCanvasScale(this._roomId, param2));
        this._scaledWindow.window.x = Math.round(_loc4_.x - this._scaledWindow.window.width / 2) | 0;
        this._scaledWindow.window.y = Math.round(_loc5_.top - this._scaledWindow.window.height - 4 * this._scaledWindow.scale) | 0;
        this._SafeStr_14605 = true;
        this.updatePresentation();
    }

    private updatePresentation(): void {
        let _loc2_: boolean = this._isOpen || this._alwaysOpen;
        let _loc1_: boolean = this._isOpen || this._alwaysOpen && this._canModify;
        this._scaledWindow.window.visible = this._SafeStr_14605 && (_loc2_ || this._SafeStr_2874);
        this._window.blend = _loc2_ ? 1 : 0.7;
        this._window.ignoreMouseEvents = !_loc1_;
        this._scaledWindow.window.ignoreMouseEvents = !_loc1_;
        this._scaledWindow.nativeMouseInput = _loc1_;
        this.input.ignoreMouseEvents = !_loc1_;
        this.input.editable = _loc1_ && this._canModify;
        this.input.selectable = _loc1_;
        this.updatePlaceholder();
    }

    private updatePlaceholder(): void {
        this.placeholder.visible = (this._isOpen || this._alwaysOpen) && this._canModify && this.input.text.length == 0;
    }

    private updateInputSize(): void {
        let _loc1_: ITextFieldWindow = this.input;
        if (_loc1_.wordWrap) {
            _loc1_.wordWrap = false;
        }
        let _loc2_: number = Math.ceil(_loc1_.textWidth) + _loc1_.margins.left + _loc1_.margins.right + 4 | 0;
        let _loc3_: boolean = _loc2_ > _loc1_.limits.maxWidth;
        _loc1_.width = Math.max(_loc1_.limits.minWidth, Math.min(_loc1_.limits.maxWidth, _loc2_)) | 0;
        if (_loc3_) {
            _loc1_.wordWrap = true;
        }
        _loc1_.scrollH = 0;
        let _loc5_: number = Math.ceil(_loc1_.textHeight) + _loc1_.margins.top + _loc1_.margins.bottom + 4 | 0;
        let _loc4_: boolean = _loc5_ > _loc1_.limits.maxHeight;
        _loc1_.height = Math.max(_loc1_.limits.minHeight, Math.min(_loc1_.limits.maxHeight, _loc5_)) | 0;
        this.scrollbar.visible = _loc4_;
        if (!_loc4_) {
            _loc1_.scrollV = 0;
        }
    }

    private onInputChanged = (param1: WindowEvent): void => {
        this.updateInputSize();
        if (this.input.editable) {
            this.input.ensureCaretVisible();
        }
        this.updatePlaceholder();
    };

    private onInputFocused = (param1: WindowEvent): void => {
        this.updatePlaceholder();
    };

    private onInputUnfocused = (param1: WindowEvent): void => {
        this.saveIfChanged();
        this.updatePlaceholder();
    };

    private get input(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
    }

    private get scrollbar(): IScrollbarWindow {
        return asGuarded(this._window.findChildByName("scrollbar"), isIScrollbarWindow);
    }

    private get placeholder(): ITextWindow {
        return asGuarded(this._window.findChildByName("placeholder"), isITextWindow);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.input.removeEventListener("WE_CHANGE", this.onInputChanged);
        this.input.removeEventListener("WE_FOCUS", this.onInputFocused);
        this.input.removeEventListener("WE_FOCUSED", this.onInputFocused);
        this.input.removeEventListener("WE_UNFOCUS", this.onInputUnfocused);
        this.input.removeEventListener("WE_UNFOCUSED", this.onInputUnfocused);
        this._scaledWindow.dispose();
        this._scaledWindow = null;
        this._window = null;
        this._SafeStr_2143 = null;
        this._widget = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
