import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { FocusEvent } from '@habbo-pixi/runtime/events/FocusEvent';
import type { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import type { TextEvent } from '@habbo-pixi/runtime/events/TextEvent';
import { DropShadowFilter } from '@habbo-pixi/runtime/filters/DropShadowFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { HTMLTextController, InteractiveController, TextController } from '@/com/sulake/core/window/Classes.group';
import { IFocusWindow } from '@/com/sulake/core/window/components/IFocusWindow';
import { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { GraphicContext } from '@/com/sulake/core/window/graphics/GraphicContext';

const preSuperTextFieldController: ((self: TextFieldController) => void)[] = [];

export class TextFieldController extends TextController implements ITextFieldWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::TextFieldController'); }

    private static readonly _WORD_DELIMS: RegExp = /[~%&!\\;:"',<>?#\s\.\-()=\[\]\{\}\^_]/g;

    declare private _SafeStr_4891: DropShadowFilter;

    declare protected _toolTipDelay: number;

    declare protected _toolTipCaption: string;

    declare protected _toolTipIsDynamic: boolean;

    declare protected _interactiveCursorDisabled: boolean;

    declare protected _SafeStr_4217: boolean;

    declare protected _editable: boolean;

    declare protected _initialized: boolean;

    declare protected _filters: any[];

    declare protected _SafeStr_4199: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: boolean = true;
        if (param9 != null) {
            for (const _loc13_ of param9 ?? []) {
                if (_loc13_.key == "editable") {
                    _loc12_ = Boolean(typeof _loc13_.value === "boolean" ? _loc13_.value : null);
                    break;
                }
            }
        }
        if (_loc12_) {
            param4 &= ~0x10;
            param4 = (param4 | 1) >>> 0;
        }
        preSuperTextFieldController.push((self: TextFieldController) => {
            self._SafeStr_2126 = param6.x | 0;
            self._y = param6.y | 0;
            self._SafeStr_2132 = param6.width | 0;
            self._height = param6.height | 0;
            self._field = castTo(self.getGraphicContext(true).getDisplayObject(), TextField);
            self._field.antiAliasType = "advanced";
            self._field.gridFitType = "pixel";
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        if (_loc12_) {
            this._field.addEventListener("textInput", this.onTextInputEvent);
            this._field.addEventListener("keyDown", this.onKeyDownEvent);
            this._field.addEventListener("keyUp", this.onKeyUpEvent);
            this._field.addEventListener("change", this.onChangeEvent);
            this._field.addEventListener("focusIn", this.onFocusEvent);
            this._field.addEventListener("focusOut", this.onFocusEvent);
            this._field.addEventListener("removedFromStage", this.onRemovedEvent);
        }
        this.antiAliasType = "advanced";
        this.gridFitType = "pixel";
        this._SafeStr_2451 = false;
        this._initialized = true;
        this.refreshTextImage();
    }

    public static getWordPositions(param1: string): any[] {
        let _loc3_: any = null;
        let _loc2_: any[] = [];
        _loc2_.push(0);
        while (true) {
            _loc3_ = TextFieldController._WORD_DELIMS.exec(param1);
            if (_loc3_ == null) {
                break;
            }
            if (_loc3_.index < param1.length) {
                _loc2_.push(_loc3_.index + 1);
            }
        }
        return _loc2_;
    }

    public get focused(): boolean {
        if (this._field) {
            if (this._field.stage) {
                return this._field.stage.focus == this._field;
            }
        }
        return false;
    }

    public override enable(): boolean {
        if (super.enable()) {
            this._field.type = this._editable ? "input" : "dynamic";
            return true;
        }
        this._field.type = "dynamic";
        return false;
    }

    public override disable(): boolean {
        if (super.disable()) {
            this._field.type = "dynamic";
            return true;
        }
        this._field.type = this._editable ? "input" : "dynamic";
        return false;
    }

    public get editable(): boolean {
        return this._editable;
    }

    public set editable(param1: boolean) {
        if (!this._editable && param1 && this.getParamFlag(16)) {
            throw new Error("Editable text field needs its own graphics context");
        }
        this._editable = param1;
        this._field.type = param1 && this.isEnabled() ? "input" : "dynamic";
    }

    public get selectable(): boolean {
        return this._field.selectable;
    }

    public set selectable(param1: boolean) {
        this._field.selectable = param1;
    }

    public set displayAsPassword(param1: boolean) {
        this._field.displayAsPassword = param1;
    }

    public get displayAsPassword(): boolean {
        return this._field.displayAsPassword;
    }

    public set mouseCursorType(param1: number) {
    }

    public get mouseCursorType(): number {
        return 0;
    }

    public set toolTipCaption(param1: string) {
        this._toolTipCaption = param1 == null ? "" : param1;
    }

    public get toolTipCaption(): string {
        return this._toolTipCaption;
    }

    public set toolTipDelay(param1: number) {
        this._toolTipDelay = param1;
    }

    public get toolTipDelay(): number {
        return this._toolTipDelay;
    }

    public setMouseCursorForState(param1: number, param2: number): number {
        throw new Error("Unimplemented method!");
    }

    public getMouseCursorByState(param1: number): number {
        throw new Error("Unimplemented method!");
    }

    public showToolTip(param1: IToolTipWindow): void {
        throw new Error("Unimplemented method!");
    }

    public hideToolTip(): void {
        throw new Error("Unimplemented method!");
    }

    public override set autoSize(param1: string) {
        super.autoSize = param1;
        this.refreshAutoSize();
    }

    public override set background(param1: boolean) {
        this._field.background = param1;
        this._background = param1;
        this._fillColor = (this._background ? this._fillColor | this._alphaColor : this._fillColor & 0xFFFFFF) >>> 0;
    }

    public setSelection(param1: number, param2: number): void {
        this._field.setSelection(param1, param2);
    }

    public get selectionBeginIndex(): number {
        return this._field.selectionBeginIndex;
    }

    public get selectionEndIndex(): number {
        return this._field.selectionEndIndex;
    }

    public ensureCaretVisible(): void {
        let _loc1_: number = this._field.caretIndex;
        if (_loc1_ < 0) {
            return;
        }
        let _loc2_: number = _loc1_ == this._field.length ? this._field.numLines : this._field.getLineIndexOfChar(_loc1_) + 1;
        if (_loc2_ < this._field.scrollV) {
            this._field.scrollV = _loc2_;
        } else if (_loc2_ > this._field.bottomScrollV) {
            this._field.scrollV = Math.min(this._field.maxScrollV, this._field.scrollV + _loc2_ - this._field.bottomScrollV) | 0;
        }
    }

    public override getGraphicContext(param1: boolean): IGraphicContext {
        if (param1 && !this._SafeStr_2145) {
            this._SafeStr_2145 = new GraphicContext("GC {" + this._name + "}", 2, this.rectangle);
        }
        return this._SafeStr_2145;
    }

    public override dispose(): void {
        if (!this._disposed) {
            this._context.getWindowServices().getFocusManagerService().removeFocusWindow(this);
            this._SafeStr_4217 = false;
            if (this._field) {
                if (this.focused) {
                    this.unfocus();
                }
                this._field.removeEventListener("keyDown", this.onKeyDownEvent);
                this._field.removeEventListener("keyUp", this.onKeyUpEvent);
                this._field.removeEventListener("change", this.onChangeEvent);
                this._field.removeEventListener("focusIn", this.onFocusEvent);
                this._field.removeEventListener("focusOut", this.onFocusEvent);
                this._field.removeEventListener("removedFromStage", this.onRemovedEvent);
            }
            super.dispose();
        }
    }

    public override set text(param1: string) {
        super.text = param1;
        this.refreshAutoSize();
    }

    public override focus(): boolean {
        let _loc1_: boolean = super.focus();
        if (_loc1_) {
            if (this._field) {
                if (this._field.stage) {
                    if (this._field.stage.focus != this._field) {
                        this._field.stage.focus = this._field;
                    }
                }
            }
        }
        return _loc1_;
    }

    public override unfocus(): boolean {
        if (this._field) {
            if (this._field.stage) {
                if (this._field.stage.focus == this._field) {
                    this._field.stage.focus = null;
                }
            }
        }
        return super.unfocus();
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: boolean = super.update(param1, param2);
        switch (param2.type) {
            case "WE_ACTIVATED":
            case "WME_DOWN":
                this.focus();
                break;
            case "WE_RESIZED":
                if (param1 == this) {
                    this._field.width = this.width;
                    this._field.height = this.height;
                }
        }
        if (param1 == this) {
            InteractiveController.processInteractiveWindowEvents(this, param2);
        }
        return _loc3_;
    }

    protected refreshAutoSize(): void {
        let _loc2_: Point = null;
        let _loc1_: Point = null;
        if (this._initialized && this.autoSize != "none" && !(this instanceof HTMLTextController)) {
            if (this._SafeStr_2132 != (this._field.width | 0) || this._height != (this._field.height | 0)) {
                _loc2_ = this._field.localToGlobal(new Point(this._field.x, this._field.y));
                let _loc3_: Point = new Point();
                this.getGlobalPosition(_loc3_);
                _loc1_ = new Point(_loc2_.x - _loc3_.x, _loc2_.y - _loc3_.y);
                this.setRectangle(this._SafeStr_2126 + _loc1_.x | 0, this._y + _loc1_.y | 0, this._field.width | 0, this._field.height | 0);
            }
        }
    }

    public override set filters(param1: any[]) {
        this._SafeStr_4199 = true;
        this._filters = param1;
        this.updateFilters();
    }

    public override get filters(): any[] {
        return this._filters;
    }

    public override set etchingColor(param1: number) {
        this._SafeStr_4199 = true;
        super.etchingColor = param1;
    }

    private updateFilters(): void {
        let _loc1_: any[] = null;
        if (!this._SafeStr_4199) {
            return;
        }
        this._SafeStr_4199 = false;
        if ((this._etchingColor & 0xFF000000) != 0) {
            this._SafeStr_4891.color = (this._etchingColor & 0xFFFFFF) >>> 0;
            this._SafeStr_4891.alpha = (this._etchingColor >> 24 & 0xFF) / 255;
            _loc1_ = this._filters.slice();
            _loc1_.push(this._SafeStr_4891);
            this.getGraphicContext(true).filters = _loc1_;
        } else {
            this.getGraphicContext(true).filters = this._filters;
        }
    }

    protected override refreshTextImage(param1: boolean = false): void {
        let _loc3_: WindowEvent = null;
        if (!this._initialized) {
            return;
        }
        let _loc2_: boolean = false;
        this.updateFilters();
        if (this._SafeStr_2132 != this._field.width) {
            if (this.autoSize != "none") {
                this.width = this._field.width | 0;
                _loc2_ = true;
            } else {
                this._field.width = this.width;
            }
        }
        if (this._height != this._field.height) {
            if (this.autoSize != "none") {
                this.height = this._field.height | 0;
                _loc2_ = true;
            } else {
                this._field.height = this.height;
            }
        }
        if (!_loc2_ && !param1 && this._events) {
            _loc3_ = WindowEvent.allocate("WE_RESIZED", this, null);
            this._events.dispatchEvent(_loc3_);
            _loc3_.recycle();
        }
    }

    private onTextInputEvent(param1: TextEvent): void {
        if (this.hasTooManyLines(param1.text)) {
            param1.preventDefault();
        }
    }

    private hasTooManyLines(param1: string): boolean {
        let _loc2_: string = null;
        let _loc3_: number = 0;
        let _loc4_: boolean = false;
        if (this.multiline && this.maxLines > 0) {
            _loc4_ = this.numLines > this.maxLines;
            if (param1 != null) {
                _loc2_ = this._field.text;
                _loc3_ = this._field.caretIndex;
                this._field.text = _loc2_.substring(0, _loc3_) + param1 + _loc2_.substring(_loc3_, _loc2_.length);
                if (this.numLines > this.maxLines) {
                    _loc4_ = true;
                }
                this._field.text = _loc2_;
            }
        }
        return _loc4_;
    }

    private onKeyDownEvent(param1: KeyboardEvent): void {
        let _loc3_: WindowKeyboardEvent = null;
        try {
            this._caption = this._field.text;
            _loc3_ = WindowKeyboardEvent.allocate_WindowKeyboardEvent("WKE_KEY_DOWN", param1, this, null);
            this.update(this, _loc3_);
            if (this.disposed) {
                return;
            }
            for (const _loc2_ of this._context.inputEventTrackers ?? []) {
                _loc2_.eventReceived(_loc3_, this);
            }
            _loc3_.recycle();
        } catch (e) {
            this._context.handleError(5, e);
        }
    }

    private onKeyUpEvent(param1: KeyboardEvent): void {
        let _loc3_: WindowKeyboardEvent = null;
        try {
            this._caption = this._field.text;
            _loc3_ = WindowKeyboardEvent.allocate_WindowKeyboardEvent("WKE_KEY_UP", param1, this, null);
            this.update(this, _loc3_);
            if (this.disposed) {
                return;
            }
            for (const _loc2_ of this._context.inputEventTrackers ?? []) {
                _loc2_.eventReceived(_loc3_, this);
            }
            _loc3_.recycle();
        } catch (e) {
            this._context.handleError(5, e);
        }
    }

    public requestChangeEvent(): void {
        this.onChangeEvent(null);
    }

    private onChangeEvent(param1: Event): void {
        let _loc2_: WindowEvent = null;
        try {
            this.refreshAutoSize();
            _loc2_ = WindowEvent.allocate("WE_CHANGE", this, null);
            this.update(this, _loc2_);
            _loc2_.recycle();
        } catch (e) {
            this._context.handleError(5, e);
        }
    }

    private onFocusEvent(param1: FocusEvent): void {
        try {
            if (param1.type == "focusIn") {
                if (!this.getStateFlag(2)) {
                    this.focus();
                }
            } else if (param1.type == "focusOut") {
                if (this.getStateFlag(2)) {
                    this.unfocus();
                }
            }
        } catch (e) {
            this._context.handleError(5, e);
        }
    }

    private onRemovedEvent(param1: Event): void {
        try {
            if (this.getStateFlag(2)) {
                this.unfocus();
            }
        } catch (e) {
            this._context.handleError(5, e);
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = InteractiveController.writeInteractiveWindowProperties(this, super.properties);
        _loc1_.push(this.createProperty("editable", this._editable));
        _loc1_.push(this.createProperty("focus_capturer", this._SafeStr_4217));
        _loc1_.push(this.createProperty("selectable", this._field.selectable));
        _loc1_.push(this.createProperty("display_as_password", this._field.displayAsPassword));
        _loc1_.push(this.createProperty("display_raw", this._displayRaw));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        InteractiveController.readInteractiveWindowProperties(this, param1);
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "focus_capturer":
                    this._SafeStr_4217 = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    if (this._SafeStr_4217) {
                        this._context.getWindowServices().getFocusManagerService().registerFocusWindow(this);
                    }
                    break;
                case "selectable":
                    this._field.selectable = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "editable":
                    this.editable = _loc2_.value;
                    break;
                case "display_as_password":
                    this._field.displayAsPassword = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "display_raw":
                    this._displayRaw = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    public set toolTipIsDynamic(param1: boolean) {
        this._toolTipIsDynamic = param1;
    }

    public get toolTipIsDynamic(): boolean {
        return this._toolTipIsDynamic;
    }

    public get interactiveCursorDisabled(): boolean {
        return this._interactiveCursorDisabled;
    }

    public set interactiveCursorDisabled(param1: boolean) {
        this._interactiveCursorDisabled = param1;
    }

    public set displayRaw(param1: boolean) {
        this._displayRaw = param1;
    }

    public get displayRaw(): boolean {
        return this._displayRaw;
    }

    public override set localization(param1: string) {
        super.localization = this._displayRaw ? this._caption : param1;
    }

    public getWordAt(param1: number, param2: number): string {
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc3_: number = this.getCharIndexAtPoint(param1, param2);
        let _loc6_: string = this._field.text;
        let _loc4_: any[] = TextFieldController.getWordPositions(_loc6_);
        let _loc7_: string = "";
        _loc5_ = 0;
        while (_loc5_ < _loc4_.length) {
            _loc8_ = _loc4_[_loc5_] | 0;
            _loc9_ = _loc6_.length;
            if (_loc5_ + 1 < _loc4_.length) {
                _loc9_ = _loc4_[_loc5_ + 1] - 1 | 0;
            }
            if (_loc3_ >= _loc8_ && _loc3_ <= _loc9_) {
                _loc7_ = _loc6_.substring(_loc8_, _loc9_);
                break;
            }
            _loc5_++;
        }
        return _loc7_;
    }

    protected override initInstanceFields(): void {
        this.onTextInputEvent = this.onTextInputEvent.bind(this);
        this.onKeyDownEvent = this.onKeyDownEvent.bind(this);
        this.onKeyUpEvent = this.onKeyUpEvent.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onFocusEvent = this.onFocusEvent.bind(this);
        this.onRemovedEvent = this.onRemovedEvent.bind(this);
        this._SafeStr_4891 = new DropShadowFilter(1, 90, 16777215, 1, 0, 0);
        this._toolTipDelay = 500;
        this._toolTipCaption = "";
        this._toolTipIsDynamic = false;
        this._interactiveCursorDisabled = false;
        this._SafeStr_4217 = false;
        this._editable = true;
        this._initialized = false;
        this._filters = [];
        this._SafeStr_4199 = false;
        preSuperTextFieldController.pop()!(this);
        super.initInstanceFields();
    }

    public override get autoSize(): string {
        return super.autoSize;
    }

    public override get background(): boolean {
        return super.background;
    }

    public override get text(): string {
        return super.text;
    }

    public override get etchingColor(): number {
        return super.etchingColor;
    }

    get [ITextFieldWindow](): true {
        return true;
    }

    get [IFocusWindow](): true {
        return true;
    }

    get [IInteractiveWindow](): true {
        return true;
    }
}
