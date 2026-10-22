import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import type { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { TextFieldCache } from '@/com/sulake/core/window/utils/TextFieldCache';
import { TextMargins } from '@/com/sulake/core/window/utils/TextMargins';
import { TextStyleManager } from '@/com/sulake/core/window/utils/TextStyleManager';

const preSuperTextLabelController: ((self: TextLabelController) => void)[] = [];

export class TextLabelController extends WindowController implements ILabelWindow, ILocalizable {
    static { registerClassName(this, 'com.sulake.core.window.components::TextLabelController'); }

    static #staticsReady = false;

    private static get MARGINS_KEY(): string {
        TextLabelController.#initStatics();
        return TextLabelController.MARGINS_KEY;
    }

    declare private _textColor: any;

    declare private _textStyleName: string;

    declare private _text: string;

    declare private _localized: boolean;

    declare private _margins: TextMargins;

    declare private _SafeStr_7078: number;

    declare private _textWidth: number;

    declare private _SafeStr_4202: boolean;

    declare private _vertical: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        preSuperTextLabelController.push((self: TextLabelController) => {
            self._textStyleName = String(param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3)._SafeStr_2119("text_style"));
            TextStyleManager.events.addEventListener("change", self.onTextStyleChanged);
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public get antiAliasType(): string {
        return this.textField.antiAliasType;
    }

    public get autoSize(): string {
        return this.textField.autoSize;
    }

    public get bold(): boolean {
        return this.textField.defaultTextFormat.bold;
    }

    public get border(): boolean {
        return this.textField.border;
    }

    public get borderColor(): number {
        return this.textField.borderColor;
    }

    public get defaultTextFormat(): TextFormat {
        return this.textField.defaultTextFormat;
    }

    public get embedFonts(): boolean {
        return this.textField.embedFonts;
    }

    public get fontFace(): string {
        return this.textField.defaultTextFormat.font;
    }

    public get fontSize(): number {
        return (this.textField.defaultTextFormat.size == null ? 12 : this.textField.defaultTextFormat.size >>> 0) >>> 0;
    }

    public get gridFitType(): string {
        return this.textField.gridFitType;
    }

    public get italic(): boolean {
        return this.textField.defaultTextFormat.italic;
    }

    public get kerning(): boolean {
        return this.textField.defaultTextFormat.kerning;
    }

    public get length(): number {
        return this._text.length;
    }

    public get margins(): IMargins {
        if (!this._margins) {
            this._margins = new TextMargins(0, 0, 0, 0, this.setTextMargins);
        }
        return this._margins;
    }

    public get maxChars(): number {
        return this.textField.maxChars;
    }

    public get sharpness(): number {
        return this.textField.sharpness;
    }

    public get spacing(): number {
        return Number(this.textField.defaultTextFormat.letterSpacing);
    }

    public get text(): string {
        return this._text;
    }

    public get textColor(): number {
        return this._textColor >>> 0;
    }

    public get textBackground(): boolean {
        return this.background;
    }

    public get textBackgroundColor(): number {
        return this.color;
    }

    public get textHeight(): number {
        return this._SafeStr_7078;
    }

    public get textWidth(): number {
        return this._textWidth;
    }

    public get textStyle(): TextStyle {
        return TextStyleManager.getStyle(this._textStyleName);
    }

    public get thickness(): number {
        return this.textField.thickness;
    }

    public get underline(): boolean {
        return this.textField.defaultTextFormat.underline;
    }

    public get drawOffsetX(): number {
        return this._margins ? this._margins.left : 0;
    }

    public get drawOffsetY(): number {
        return this._margins ? this._margins.top : 0;
    }

    public get hasTextColor(): boolean {
        return this._textColor != null;
    }

    protected get textField(): TextField {
        let _loc1_: TextField = TextFieldCache.getTextFieldByStyleName(this._textStyleName);
        if (_loc1_) {
            _loc1_.text = this._text;
            if (this._textColor != null) {
                _loc1_.textColor = this._textColor >>> 0;
            }
        }
        return _loc1_;
    }

    public set text(param1: string) {
        if (param1 == null) {
            return;
        }
        if (this._localized) {
            this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = false;
        }
        this._caption = param1;
        if (this._caption.charAt(0) == "$" && this._caption.charAt(1) == "{") {
            this.context.registerLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = true;
        } else {
            this._text = param1;
            this.refresh();
        }
    }

    public override set caption(param1: string) {
        this.text = param1;
    }

    public set localization(param1: string) {
        if (param1 != null) {
            this._text = param1;
            this.refresh();
        }
    }

    public set textStyle(param1: TextStyle) {
        if (param1 == null) {
            return;
        }
        if (this._textStyleName != param1.name) {
            this._textStyleName = param1.name;
            this.refresh();
        }
    }

    public set textColor(param1: number) {
        if (param1 != this._textColor) {
            this._textColor = param1;
            this.refresh();
        }
    }

    public override dispose(): void {
        if (!this._disposed) {
            TextStyleManager.events.removeEventListener("change", this.onTextStyleChanged);
            if (this._localized) {
                this._localized = false;
                this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            }
            if (this._margins) {
                this._margins.dispose();
                this._margins = null;
            }
            super.dispose();
        }
    }

    private refresh(param1: boolean = false): void {
        let _loc11_: number = 0;
        let _loc7_: WindowEvent = null;
        if (this._SafeStr_4202) {
            return;
        }
        this._SafeStr_4202 = true;
        let _loc3_: TextField = this.textField;
        if (!_loc3_) {
            this._SafeStr_4202 = false;
            return;
        }
        this._textWidth = _loc3_.textWidth;
        this._SafeStr_7078 = _loc3_.textHeight;
        let _loc9_: number = _loc3_.border ? 1 : 0;
        _loc11_ = this._margins ? this._margins.left + this._margins.right : 0;
        let _loc10_: number = this._margins ? this._margins.top + this._margins.bottom : 0;
        let _loc4_: number = this._SafeStr_2132 - _loc11_;
        let _loc8_: number = this._height - _loc10_;
        let _loc2_: number = Math.floor(_loc3_.width) + _loc9_ | 0;
        let _loc6_: number = Math.floor(_loc3_.height) + _loc9_ | 0;
        let _loc5_: boolean = false;
        if (this._vertical) {
            if (_loc2_ != _loc8_) {
                this.setRectangle(this._SafeStr_2126, this._y, _loc6_ + _loc11_, Math.floor(_loc3_.width) + _loc10_ | 0);
                _loc5_ = true;
            }
            if (_loc6_ < _loc4_) {
                _loc3_.height = _loc4_ - _loc9_;
            } else if (_loc6_ > _loc4_) {
                this.setRectangle(this._SafeStr_2126, this._y, _loc6_ + _loc11_, Math.floor(_loc3_.width) + _loc10_ | 0);
                _loc5_ = true;
            }
        } else {
            if (_loc2_ != _loc4_) {
                this.setRectangle(this._SafeStr_2126, this._y, _loc2_ + _loc11_, Math.floor(_loc3_.height) + _loc10_ | 0);
                _loc5_ = true;
            }
            if (_loc6_ < _loc8_) {
                _loc3_.height = _loc8_ - _loc9_;
            } else if (_loc6_ > _loc8_) {
                this.setRectangle(this._SafeStr_2126, this._y, _loc2_ + _loc11_, Math.floor(_loc3_.height) + _loc10_ | 0);
                _loc5_ = true;
            }
        }
        this._SafeStr_4202 = false;
        this._context.invalidate(this, null, 1);
        if (!_loc5_ && !param1 && this._events) {
            _loc7_ = WindowEvent.allocate("WE_RESIZED", this, null);
            this._events.dispatchEvent(_loc7_);
            _loc7_.recycle();
        }
    }

    private setTextMargins(param1: IMargins): void {
        if (param1 && param1 != this._margins) {
            if (this._margins) {
                this._margins.assign(param1.left, param1.top, param1.right, param1.bottom, this.setTextMargins);
            } else {
                this._margins = new TextMargins(param1.left, param1.top, param1.right, param1.bottom, this.setTextMargins);
            }
        }
        this.refresh();
    }

    private onTextStyleChanged(param1: Event): void {
        this.refresh();
    }

    private setTextMarginMap(param1: UtilsMap): void {
        if (this._margins) {
            this._margins.assign(param1["left"] | 0, param1["top"] | 0, param1["right"] | 0, param1["bottom"] | 0, this.setTextMargins);
        } else {
            this._margins = new TextMargins(param1["left"] | 0, param1["top"] | 0, param1["right"] | 0, param1["bottom"] | 0, this.setTextMargins);
        }
        this.refresh();
    }

    public override get properties(): any[] {
        let _loc3_: any[] = super.properties;
        let _loc2_: TextStyle = TextStyleManager.getStyle(this._textStyleName);
        _loc3_.push(this.createProperty("text_style", this._textStyleName));
        let _loc1_: number = (_loc2_.color ?? this.getDefaultProperty("text_color").value) >>> 0;
        _loc3_.push(new PropertyStruct("text_color", this._textColor == null ? _loc1_ : this._textColor, "hex", this._textColor != null && this._textColor != _loc1_));
        _loc3_.push(this.createProperty("vertical", this._vertical));
        if (this._margins != null) {
            _loc3_.push(this.createProperty("margin_left", this._margins.left));
            _loc3_.push(this.createProperty("margin_top", this._margins.top));
            _loc3_.push(this.createProperty("margin_right", this._margins.right));
            _loc3_.push(this.createProperty("margin_bottom", this._margins.bottom));
        } else {
            _loc3_.push(this.getDefaultProperty("margin_left"));
            _loc3_.push(this.getDefaultProperty("margin_top"));
            _loc3_.push(this.getDefaultProperty("margin_right"));
            _loc3_.push(this.getDefaultProperty("margin_bottom"));
        }
        return _loc3_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "text_style":
                    this.textStyle = TextStyleManager.getStyle(typeof _loc2_.value === "string" ? _loc2_.value : null);
                    break;
                case "text_color":
                    this._textColor = typeof _loc2_.value === "number" && _loc2_.value >>> 0 === _loc2_.value ? _loc2_.value : null;
                    break;
                case "margin_left":
                    if (this._margins != null || _loc2_.valid) {
                        this.margins.left = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    }
                    break;
                case "margin_top":
                    if (this._margins != null || _loc2_.valid) {
                        this.margins.top = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    }
                    break;
                case "margin_right":
                    if (this._margins != null || _loc2_.valid) {
                        this.margins.right = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    }
                    break;
                case "margin_bottom":
                    if (this._margins != null || _loc2_.valid) {
                        this.margins.bottom = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    }
                    break;
                case "margins":
                    this.setTextMarginMap(_loc2_.value instanceof UtilsMap ? _loc2_.value : null);
                    break;
                case "vertical":
                    this.vertical = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    public get vertical(): boolean {
        return this._vertical;
    }

    public set vertical(param1: boolean) {
        this._vertical = param1;
        this.refresh();
    }

    protected override initInstanceFields(): void {
        this.setTextMargins = this.setTextMargins.bind(this);
        this.onTextStyleChanged = this.onTextStyleChanged.bind(this);
        this._textColor = null;
        this._text = "";
        this._localized = false;
        this._SafeStr_7078 = 0;
        this._textWidth = 0;
        this._SafeStr_4202 = false;
        this._vertical = false;
        preSuperTextLabelController.pop()!(this);
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextLabelController.#staticsReady) return;
        TextLabelController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextLabelController, name, { value, writable: true, configurable: true, enumerable: true });
        set("MARGINS_KEY", null);
        set("MARGINS_KEY", "margins");
    }

    public override get caption(): string {
        return super.caption;
    }

    get [ILabelWindow](): true {
        return true;
    }

    get [ILocalizable](): true {
        return true;
    }
}
