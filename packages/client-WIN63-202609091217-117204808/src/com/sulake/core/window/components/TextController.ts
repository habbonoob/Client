import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Font } from '@habbo-pixi/runtime/text/Font';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import type { TextLineMetrics } from '@habbo-pixi/runtime/text/TextLineMetrics';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { FontEnum } from '@/com/sulake/core/utils/FontEnum';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { XMLVariableParser } from '@/com/sulake/core/utils/XMLVariableParser';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { PropertyKeys } from '@/com/sulake/core/window/theme/PropertyKeys';
import { ITextFieldContainer } from '@/com/sulake/core/window/utils/ITextFieldContainer';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { TextMargins } from '@/com/sulake/core/window/utils/TextMargins';
import { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';
import { TextStyleManager } from '@/com/sulake/core/window/utils/TextStyleManager';

const preSuperTextController: ((self: TextController) => void)[] = [];

export class TextController extends WindowController implements ITextWindow, ITextFieldContainer, ILocalizable {
    static { registerClassName(this, 'com.sulake.core.window.components::TextController'); }

    static #staticsReady = false;

    private static get ALL_FONTS(): any[] {
        TextController.#initStatics();
        return TextController.ALL_FONTS;
    }
    private static set ALL_FONTS(value: any[]) {
        TextController.#initStatics();
        TextController.ALL_FONTS = value;
    }

    private static get REPLACE_RANDOM_CHARS(): any[] {
        TextController.#initStatics();
        return TextController.REPLACE_RANDOM_CHARS;
    }

    protected static get _SafeStr_5670(): Map<any, any> {
        TextController.#initStatics();
        return TextController._SafeStr_5670;
    }

    declare private _overFlowReplace: string;

    declare private _SafeStr_3887: boolean;

    declare protected _field: TextField;

    declare protected _SafeStr_3444: number;

    declare protected _SafeStr_2928: number;

    declare protected _drawing: boolean;

    declare protected _margins: TextMargins;

    declare protected _SafeStr_2591: string;

    declare protected _localized: boolean;

    declare protected _maxLines: number;

    declare protected _displayRaw: boolean;

    declare protected _etchingColor: number;

    declare protected _etchingPosition: string;

    declare protected _SafeStr_7517: TextFormat;

    declare private _textStyleName: string;

    declare private _SafeStr_2410: TextStyle;

    declare protected _settingRectangle: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        preSuperTextController.push((self: TextController) => {
            self._margins = new TextMargins(0, 0, 0, 0, self.setTextMargins);
            if (self._field == null) {
                self._field = new TextField();
                if (param6) {
                    self._field.width = param6.width;
                    self._field.height = param6.height;
                }
                self._field.antiAliasType = "advanced";
                self._field.gridFitType = "pixel";
                self._field.mouseWheelEnabled = false;
            }
            self._textStyleName = String(param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3)._SafeStr_2119("text_style"));
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        TextController.setTextFormatting(this);
        TextStyleManager.events.addEventListener("change", this.onTextStyleChanged);
        this.gridFitType = "pixel";
        if (this._field.autoSize == "none") {
            this._field.width = this._SafeStr_2132;
            this._field.height = this._height;
        }
    }

    private static setAntiAliasType(param1: TextController, param2: string): void {
        param2 = param2 == "normal" ? "normal" : "advanced";
        param1._SafeStr_2410.antiAliasType = param2;
        param1._field.antiAliasType = param2;
        param1.refreshTextImage();
    }

    private static setAlwaysShowSelection(param1: TextController, param2: boolean): void {
        param1._field.alwaysShowSelection = param2;
    }

    private static setAutoSize(param1: TextController, param2: string): void {
        let _loc3_: TextFormat = null;
        if (param2 != param1._SafeStr_2591) {
            param1._SafeStr_2591 = param2;
            param1._field.autoSize = param2 != "none" ? "left" : "none";
            _loc3_ = param1.defaultTextFormat;
            switch (param2) {
                case "center":
                    _loc3_.align = "center";
                    break;
                case "right":
                    _loc3_.align = "right";
                    break;
                default:
                    _loc3_.align = "left";
            }
            param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
            param1.defaultTextFormat = _loc3_;
            param1.refreshTextImage();
        }
    }

    private static setTextBackground(param1: TextController, param2: boolean): void {
        param1.background = param2;
    }

    private static setTextBackgroundColor(param1: TextController, param2: number): void {
        param1.color = param2;
    }

    private static setBold(param1: TextController, param2: boolean): void {
        let _loc3_: TextFormat = param1.defaultTextFormat;
        _loc3_.bold = param2;
        param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
        param1.defaultTextFormat = _loc3_;
        param1._SafeStr_2410.fontWeight = "bold";
    }

    private static setBorder(param1: TextController, param2: boolean): void {
        param1._field.border = param2;
        param1.refreshTextImage();
    }

    private static setBorderColor(param1: TextController, param2: number): void {
        param1._field.borderColor = param2;
        param1.refreshTextImage();
    }

    private static setCondenseWhite(param1: TextController, param2: boolean): void {
        param1._field.condenseWhite = param2;
        param1.refreshTextImage();
    }

    private static setDefaultTextFormat(param1: TextController, param2: TextFormat): void {
        param1._field.defaultTextFormat = param2;
        param1.refreshTextImage();
    }

    private static setEmbedFonts(param1: TextController, param2: boolean): void {
        param1._field.embedFonts = param2;
    }

    private static setFontFace(param1: TextController, param2: string): void {
        let _loc3_: TextFormat = param1.defaultTextFormat;
        _loc3_.font = param2;
        param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
        param1._field.embedFonts = FontEnum.isEmbeddedFont(param2);
        param1.defaultTextFormat = _loc3_;
        param1._SafeStr_2410.fontFamily = param2;
    }

    private static setFontSize(param1: TextController, param2: number): void {
        let _loc3_: TextFormat = param1.defaultTextFormat;
        _loc3_.size = param2;
        param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
        param1.defaultTextFormat = _loc3_;
        param1._SafeStr_2410.fontSize = param2;
    }

    private static setGridFitType(param1: TextController, param2: string): void {
        param1._field.gridFitType = param2;
        param1.refreshTextImage();
    }

    private static setHtmlText(param1: TextController, param2: string): void {
        if (param2 == null) {
            return;
        }
        if (param1._localized) {
            param1.context.removeLocalizationListener(param1._caption.slice(2, param1._caption.indexOf("}")), param1);
            param1._localized = false;
        }
        param1._caption = param2;
        if (param1._caption.charAt(0) == "$" && param1._caption.charAt(1) == "{") {
            param1.context.registerLocalizationListener(param1._caption.slice(2, param1._caption.indexOf("}")), param1);
            param1._localized = true;
        } else if (param1._field != null) {
            param1._field.htmlText = param1._caption;
            param1.refreshTextImage();
        }
    }

    private static setItalic(param1: TextController, param2: boolean): void {
        let _loc3_: TextFormat = param1.defaultTextFormat;
        _loc3_.italic = param2;
        param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
        param1.defaultTextFormat = _loc3_;
        param1._SafeStr_2410.fontStyle = param2 ? "italic" : "normal";
    }

    private static setKerning(param1: TextController, param2: boolean): void {
        let _loc4_: TextFormat = param1.defaultTextFormat;
        _loc4_.kerning = param2;
        let _loc3_: TextFormat = new TextFormat(_loc4_.font, _loc4_.size, _loc4_.color, _loc4_.bold, _loc4_.italic, _loc4_.underline, _loc4_.url, _loc4_.target, _loc4_.align, _loc4_.leftMargin, _loc4_.rightMargin, _loc4_.indent, _loc4_.leading);
        _loc3_.kerning = param2;
        param1.setTextFormat(_loc3_);
        param1.defaultTextFormat = _loc4_;
        param1._SafeStr_2410.kerning = param2;
    }

    private static setTextMarginMap(param1: TextController, param2: UtilsMap): void {
        if (param1._margins) {
            param1._margins.assign(param2["left"] | 0, param2["top"] | 0, param2["right"] | 0, param2["bottom"] | 0, param1.setTextMargins);
        } else {
            param1._margins = new TextMargins(param2["left"] | 0, param2["top"] | 0, param2["right"] | 0, param2["bottom"] | 0, param1.setTextMargins);
        }
        param1.refreshTextImage();
    }

    private static setMarginLeft(param1: TextController, param2: number): void {
        if (param1._margins && param1._margins.left != param2) {
            param1.margins.left = param2;
        }
    }

    private static setMarginTop(param1: TextController, param2: number): void {
        if (param1._margins && param1._margins.top != param2) {
            param1.margins.top = param2;
        }
    }

    private static setMarginRight(param1: TextController, param2: number): void {
        if (param1._margins && param1._margins.right != param2) {
            param1.margins.right = param2;
        }
    }

    private static setMarginBottom(param1: TextController, param2: number): void {
        if (param1._margins && param1._margins.bottom != param2) {
            param1.margins.bottom = param2;
        }
    }

    private static setMaxChars(param1: TextController, param2: number): void {
        param1._field.maxChars = param2;
        param1.refreshTextImage();
    }

    private static setMouseWheelEnabled(param1: TextController, param2: boolean): void {
        param1._field.mouseWheelEnabled = param2;
    }

    private static setMultiline(param1: TextController, param2: boolean): void {
        param1._field.multiline = param2;
        param1.refreshTextImage();
    }

    private static setRestrict(param1: TextController, param2: string): void {
        param1._field.restrict = param2;
    }

    private static setSharpness(param1: TextController, param2: number): void {
        param1._field.sharpness = param2;
        param1.refreshTextImage();
        param1._SafeStr_2410.sharpness = param2;
    }

    private static setSpacing(param1: TextController, param2: number): void {
        let _loc4_: TextFormat = param1.defaultTextFormat;
        _loc4_.letterSpacing = param2;
        let _loc3_: TextFormat = new TextFormat(_loc4_.font, _loc4_.size, _loc4_.color, _loc4_.bold, _loc4_.italic, _loc4_.underline, _loc4_.url, _loc4_.target, _loc4_.align, _loc4_.leftMargin, _loc4_.rightMargin, _loc4_.indent, _loc4_.leading);
        _loc3_.letterSpacing = param2;
        param1.setTextFormat(_loc3_);
        param1.defaultTextFormat = _loc4_;
        param1._SafeStr_2410.letterSpacing = param2;
    }

    private static setMaxLines(param1: TextController, param2: number): void {
        param1._maxLines = param2;
        param1.refreshTextImage();
    }

    private static setLeading(param1: TextController, param2: number): void {
        let _loc4_: TextFormat = param1.defaultTextFormat;
        _loc4_.leading = param2;
        let _loc3_: TextFormat = new TextFormat(_loc4_.font, _loc4_.size, _loc4_.color, _loc4_.bold, _loc4_.italic, _loc4_.underline, _loc4_.url, _loc4_.target, _loc4_.align, _loc4_.leftMargin, _loc4_.rightMargin, _loc4_.indent, _loc4_.leading);
        _loc3_.leading = param2;
        param1.setTextFormat(_loc3_);
        param1.defaultTextFormat = _loc4_;
        param1._SafeStr_2410.leading = param2;
    }

    private static setTextColor(param1: TextController, param2: number): void {
        param1._field.textColor = param2;
        param1.refreshTextImage();
        param1._SafeStr_2410.color = param2;
    }

    private static setTextStyle(param1: TextController, param2: TextStyle): void {
        if (!param1 || !param2) {
            return;
        }
        let _loc3_: TextStyle = TextStyleManager.getStyle(param2.name);
        if (_loc3_ && !_loc3_.equals(param2)) {
            _loc3_ = TextStyleManager.findMatchingTextStyle(param2.toString());
        }
        if (_loc3_) {
            param1._textStyleName = _loc3_.name;
            TextController.setTextFormatting(param1);
            param1.refreshTextImage();
        }
    }

    private static setTextStyleString(param1: TextController, param2: string): void {
        let _loc4_: TextFormat = null;
        let _loc3_: TextStyle = TextStyleManager.getStyle(param2);
        if (!_loc3_) {
            _loc3_ = TextStyleManager.findMatchingTextStyle(param2);
        }
        if (_loc3_) {
            param1._textStyleName = _loc3_.name;
            TextController.setTextFormatting(param1);
            param1.refreshTextImage();
        } else {
            _loc3_ = TextStyleManager.parseCSS(param2)[0];
            if (_loc3_) {
                if (!TextStyleManager.getStyle(_loc3_.name)) {
                    TextStyleManager.setStyle(_loc3_.name, _loc3_);
                }
                TextController.setTextStyle(param1, _loc3_);
            }
        }
        if (param1._SafeStr_2591 == "center") {
            _loc4_ = new TextFormat();
            _loc4_.align = "center";
            param1._field.setTextFormat(_loc4_);
        }
    }

    private static setThickness(param1: TextController, param2: number): void {
        param1._field.thickness = param2;
        param1.refreshTextImage();
        param1._SafeStr_2410.thickness = param2;
    }

    private static setUnderline(param1: TextController, param2: boolean): void {
        let _loc3_: TextFormat = param1.defaultTextFormat;
        _loc3_.underline = param2;
        param1.setTextFormat(new TextFormat(_loc3_.font, _loc3_.size, _loc3_.color, _loc3_.bold, _loc3_.italic, _loc3_.underline, _loc3_.url, _loc3_.target, _loc3_.align, _loc3_.leftMargin, _loc3_.rightMargin, _loc3_.indent, _loc3_.leading));
        param1.defaultTextFormat = _loc3_;
        param1._SafeStr_2410.textDecoration = param2 ? "underline" : "none";
    }

    private static setWordWrap(param1: TextController, param2: boolean): void {
        param1._field.wordWrap = param2;
        param1.refreshTextImage();
    }

    private static setOverflowReplace(param1: TextController, param2: string): void {
        param1._overFlowReplace = param2;
        param1.refreshTextImage();
    }

    protected static setTextFormatting(param1: TextController): void {
        let _loc3_: TextField = param1._field;
        let _loc4_: string = param1._textStyleName;
        let _loc2_: TextStyle = param1._SafeStr_2410;
        let _loc5_: TextStyle = TextStyleManager.getStyle(_loc4_);
        let _loc6_: TextFormat = _loc3_.defaultTextFormat;
        if (!_loc5_) {
            _loc5_ = TextStyleManager.getStyle("regular");
        }
        if (!_loc5_.color) {
            _loc5_.color = 0;
        }
        if (!_loc2_.fontFamily) {
            _loc6_.font = _loc5_.fontFamily;
        }
        if (!_loc2_.fontSize) {
            _loc6_.size = _loc5_.fontSize;
        }
        if (!_loc2_.color) {
            _loc6_.color = _loc5_.color;
        }
        if (!_loc2_.fontWeight) {
            _loc6_.bold = _loc5_.fontWeight == "bold" ? true : null;
        }
        if (!_loc2_.fontStyle) {
            _loc6_.italic = _loc5_.fontStyle == "italic" ? true : null;
        }
        if (!_loc2_.textDecoration) {
            _loc6_.underline = _loc5_.textDecoration == "underline" ? true : null;
        }
        if (!_loc2_.textIndent) {
            _loc6_.indent = _loc5_.textIndent;
        }
        if (!_loc2_.leading) {
            _loc6_.leading = _loc5_.leading;
        }
        if (!_loc2_.kerning) {
            _loc6_.kerning = _loc5_.kerning;
        }
        if (!_loc2_.letterSpacing) {
            _loc6_.letterSpacing = _loc5_.letterSpacing;
        }
        if (!_loc2_.antiAliasType) {
            if (_loc5_.antiAliasType == "normal") {
                _loc3_.antiAliasType = "normal";
            } else {
                _loc3_.antiAliasType = "advanced";
                _loc3_.gridFitType = "pixel";
            }
        }
        if (!_loc2_.sharpness) {
            _loc3_.sharpness = _loc5_.sharpness | 0;
        }
        if (!_loc2_.thickness) {
            _loc3_.thickness = _loc5_.thickness | 0;
        }
        if (_loc2_.etchingColor == null) {
            param1.etchingColor = _loc5_.etchingColor >>> 0;
        }
        if (_loc2_.etchingPosition == null) {
            param1.etchingPosition = String(_loc5_.etchingPosition);
        }
        if (!_loc5_.fontWeight && !_loc2_.fontWeight) {
            _loc6_.bold = false;
        }
        if (!_loc5_.fontStyle && !_loc2_.fontStyle) {
            _loc6_.italic = false;
        }
        if (!_loc5_.textDecoration && !_loc2_.textDecoration) {
            _loc6_.underline = false;
        }
        if (!_loc5_.textIndent && !_loc2_.textIndent) {
            _loc6_.indent = 0;
        }
        if (!_loc5_.leading && !_loc2_.leading) {
            _loc6_.leading = 0;
        }
        if (!_loc5_.kerning && !_loc2_.kerning) {
            _loc6_.kerning = false;
        }
        if (!_loc5_.letterSpacing && !_loc2_.letterSpacing) {
            _loc6_.letterSpacing = 0;
        }
        if (!_loc5_.antiAliasType && !_loc2_.antiAliasType) {
            _loc3_.antiAliasType = "advanced";
            _loc3_.gridFitType = "pixel";
        }
        if (!_loc5_.sharpness && !_loc2_.sharpness) {
            _loc3_.sharpness = 0;
        }
        if (!_loc5_.thickness && !_loc2_.thickness) {
            _loc3_.thickness = 0;
        }
        if (_loc5_.etchingColor == null && _loc2_.etchingColor == null) {
            param1.etchingColor = 0;
        }
        if (_loc5_.etchingPosition == null && _loc2_.etchingPosition == null) {
            param1.etchingPosition = "bottom";
        }
        _loc3_.setTextFormat(_loc6_);
        _loc3_.embedFonts = FontEnum.isEmbeddedFont(_loc6_.font);
        _loc3_.defaultTextFormat = _loc6_;
        param1._SafeStr_7517 = _loc6_;
    }

    protected static createPropertySetterTable(): Map<any, any> {
        let _loc1_: Map<any, any> = new Dictionary();
        _loc1_.set("always_show_selection", TextController.setAlwaysShowSelection);
        _loc1_.set("background", TextController.setTextBackground);
        _loc1_.set("background_color", TextController.setTextBackgroundColor);
        _loc1_.set("bold", TextController.setBold);
        _loc1_.set("border", TextController.setBorder);
        _loc1_.set("border_color", TextController.setBorderColor);
        _loc1_.set("condense_white", TextController.setCondenseWhite);
        _loc1_.set("default_text_format", TextController.setDefaultTextFormat);
        _loc1_.set("etching_color", TextController.setEtchingColor);
        _loc1_.set("etching_position", TextController.setEtchingPosition);
        _loc1_.set("font_face", TextController.setFontFace);
        _loc1_.set("font_size", TextController.setFontSize);
        _loc1_.set("grid_fit_type", TextController.setGridFitType);
        _loc1_.set("italic", TextController.setItalic);
        _loc1_.set("kerning", TextController.setKerning);
        _loc1_.set("max_chars", TextController.setMaxChars);
        _loc1_.set("multiline", TextController.setMultiline);
        _loc1_.set("restrict", TextController.setRestrict);
        _loc1_.set("spacing", TextController.setSpacing);
        _loc1_.set("sharpness", TextController.setSharpness);
        _loc1_.set("thickness", TextController.setThickness);
        _loc1_.set("underline", TextController.setUnderline);
        _loc1_.set("word_wrap", TextController.setWordWrap);
        _loc1_.set("margins", TextController.setTextMarginMap);
        _loc1_.set("max_lines", TextController.setMaxLines);
        _loc1_.set("leading", TextController.setLeading);
        _loc1_.set("antialias_type", TextController.setAntiAliasType);
        _loc1_.set("auto_size", TextController.setAutoSize);
        _loc1_.set("mouse_wheel_enabled", TextController.setMouseWheelEnabled);
        _loc1_.set("text_color", TextController.setTextColor);
        _loc1_.set("text_style", TextController.setTextStyleString);
        _loc1_.set("margin_left", TextController.setMarginLeft);
        _loc1_.set("margin_top", TextController.setMarginTop);
        _loc1_.set("margin_right", TextController.setMarginRight);
        _loc1_.set("margin_bottom", TextController.setMarginBottom);
        _loc1_.set("overflow_replace", TextController.setOverflowReplace);
        return _loc1_;
    }

    private static setEtchingColor(param1: TextController, param2: number): void {
        param1._etchingColor = param2;
        param1.refreshTextImage();
        param1._SafeStr_2410.etchingColor = param1._etchingColor;
    }

    private static setEtchingPosition(param1: TextController, param2: string): void {
        param1._etchingPosition = param2;
        param1.refreshTextImage();
        param1._SafeStr_2410.etchingPosition = param1._etchingPosition;
    }

    public get antiAliasType(): string {
        return this._field.antiAliasType;
    }

    public get autoSize(): string {
        return this._SafeStr_2591;
    }

    public get bold(): boolean {
        return this._field.defaultTextFormat.bold;
    }

    public get border(): boolean {
        return this._field.border;
    }

    public get borderColor(): number {
        return this._field.borderColor;
    }

    public get bottomScrollV(): number {
        return this._field.bottomScrollV;
    }

    public get defaultTextFormat(): TextFormat {
        return this._field.defaultTextFormat;
    }

    public get embedFonts(): boolean {
        return this._field.embedFonts;
    }

    public get fontFace(): string {
        return this._field.defaultTextFormat.font;
    }

    public get fontSize(): number {
        return (this._field.defaultTextFormat.size == null ? 12 : this._field.defaultTextFormat.size >>> 0) >>> 0;
    }

    public get gridFitType(): string {
        return this._field.gridFitType;
    }

    public get htmlText(): string {
        return this._field.htmlText;
    }

    public get italic(): boolean {
        return this._field.defaultTextFormat.italic;
    }

    public get kerning(): boolean {
        return this._field.defaultTextFormat.kerning;
    }

    public get length(): number {
        return this._field.length;
    }

    public get margins(): IMargins {
        return this._margins;
    }

    public get maxChars(): number {
        return this._field.maxChars;
    }

    public get multiline(): boolean {
        return this._field.multiline;
    }

    public get numLines(): number {
        return this._field.numLines;
    }

    public get restrict(): string {
        return this._field.restrict;
    }

    public get sharpness(): number {
        return this._field.sharpness;
    }

    public get spacing(): number {
        return Number(this._field.defaultTextFormat.letterSpacing);
    }

    public get text(): string {
        return this._field != null ? this._field.text : "";
    }

    public get textColor(): number {
        return this._field.textColor;
    }

    public get textBackground(): boolean {
        return this.background;
    }

    public get textBackgroundColor(): number {
        return this.color;
    }

    public get textHeight(): number {
        return this._field.textHeight;
    }

    public get textWidth(): number {
        return this._field.textWidth;
    }

    public get textStyle(): TextStyle {
        return TextStyleManager.getStyle(this._textStyleName);
    }

    public get thickness(): number {
        return this._field.thickness;
    }

    public get underline(): boolean {
        return this._field.defaultTextFormat.underline;
    }

    public get wordWrap(): boolean {
        return this._field.wordWrap;
    }

    public get textField(): TextField {
        return this._field;
    }

    public get maxLines(): number {
        return this._maxLines;
    }

    public get leading(): number {
        return Number(this._field.defaultTextFormat.leading);
    }

    public get isOverflowReplaceOn(): boolean {
        return this._overFlowReplace != "";
    }

    public get overflowReplace(): string {
        return this._overFlowReplace;
    }

    public get scrollH(): number {
        return this._SafeStr_3444;
    }

    public get scrollV(): number {
        return this._SafeStr_2928;
    }

    public get maxScrollH(): number {
        return this._field.maxScrollH;
    }

    public get maxScrollV(): number {
        return Math.max(this._field.textHeight - this.height, 0) | 0;
    }

    public set antiAliasType(param1: string) {
        TextController.setAntiAliasType(this, param1);
    }

    public set autoSize(param1: string) {
        TextController.setAutoSize(this, param1);
    }

    public set bold(param1: boolean) {
        TextController.setBold(this, param1);
    }

    public set border(param1: boolean) {
        TextController.setBorder(this, param1);
    }

    public set borderColor(param1: number) {
        TextController.setBorderColor(this, param1);
    }

    public set defaultTextFormat(param1: TextFormat) {
        TextController.setDefaultTextFormat(this, param1);
    }

    public set embedFonts(param1: boolean) {
        TextController.setEmbedFonts(this, param1);
    }

    public set fontFace(param1: string) {
        TextController.setFontFace(this, param1);
    }

    public set fontSize(param1: number) {
        TextController.setFontSize(this, param1);
    }

    public set gridFitType(param1: string) {
        TextController.setGridFitType(this, param1);
    }

    public set htmlText(param1: string) {
        TextController.setHtmlText(this, param1);
    }

    public set italic(param1: boolean) {
        TextController.setItalic(this, param1);
    }

    public set kerning(param1: boolean) {
        TextController.setKerning(this, param1);
    }

    public set maxChars(param1: number) {
        TextController.setMaxChars(this, param1);
    }

    public set multiline(param1: boolean) {
        TextController.setMultiline(this, param1);
    }

    public set restrict(param1: string) {
        TextController.setRestrict(this, param1);
    }

    public set sharpness(param1: number) {
        TextController.setSharpness(this, param1);
    }

    public set spacing(param1: number) {
        TextController.setSpacing(this, param1);
    }

    public set textColor(param1: number) {
        TextController.setTextColor(this, param1);
    }

    public set textBackground(param1: boolean) {
        TextController.setTextBackground(this, param1);
    }

    public set textBackgroundColor(param1: number) {
        TextController.setTextBackgroundColor(this, param1);
    }

    public set textStyle(param1: TextStyle) {
        TextController.setTextStyle(this, param1);
    }

    public set thickness(param1: number) {
        TextController.setThickness(this, param1);
    }

    public set underline(param1: boolean) {
        TextController.setUnderline(this, param1);
    }

    public set wordWrap(param1: boolean) {
        TextController.setWordWrap(this, param1);
    }

    public set maxLines(param1: number) {
        TextController.setMaxLines(this, param1);
    }

    public set leading(param1: number) {
        TextController.setLeading(this, param1);
    }

    public set overflowReplace(param1: string) {
        TextController.setOverflowReplace(this, param1);
    }

    protected limitStringLength(param1: string): string {
        return this.maxChars > 0 ? param1.substr(0, this.maxChars) : param1;
    }

    public override setRectangle(param1: number, param2: number, param3: number, param4: number): void {
        if (this._settingRectangle || !this.multiline || !this.wordWrap) {
            super.setRectangle(param1, param2, param3, param4);
            return;
        }
        if (this._SafeStr_2126 == param1 && this._SafeStr_2132 == param3) {
            super.setRectangle(param1, param2, param3, param4);
            return;
        }
        this._settingRectangle = true;
        let _loc5_: string = this.autoSize;
        this.autoSize = "none";
        super.setRectangle(param1, param2, param3, param4);
        this.autoSize = _loc5_;
        this._settingRectangle = false;
    }

    public set scrollH(param1: number) {
        this._SafeStr_3444 = param1;
        this._field.scrollH = this._SafeStr_3444 * this._field.maxScrollH | 0;
        this.refreshTextImage();
    }

    public set scrollV(param1: number) {
        if (param1 > this._SafeStr_2928) {
            this._SafeStr_2928 = param1;
            this._field.scrollV = Math.max(this._field.scrollV, param1 * this._field.maxScrollV + 1) | 0;
            this.refreshTextImage();
        } else if (param1 < this._SafeStr_2928) {
            this._SafeStr_2928 = param1;
            this._field.scrollV = Math.min(this._field.scrollV, param1 * this._field.maxScrollV - 1) | 0;
            this.refreshTextImage();
        }
    }

    public get visibleRegion(): Rectangle {
        return new Rectangle(this._SafeStr_3444 * this.maxScrollH, this._SafeStr_2928 * this.maxScrollV, this.width, this.height);
    }

    public get scrollableRegion(): Rectangle {
        return new Rectangle(0, 0, this.maxScrollH + this.width, this.maxScrollV + this.height);
    }

    private replaceNonRenderableCharacters(param1: string): string {
        let _loc5_: Font = null;
        let _loc6_: string = null;
        let _loc4_: number = 0;
        let _loc2_: string = null;
        let _loc3_: TextFormat = this._field.getTextFormat();
        if (!_loc3_ || !_loc3_.font) {
            return param1;
        }
        let _loc7_: any[] = TextController.ALL_FONTS;
        for (const _loc8_ of _loc7_ ?? []) {
            if (_loc8_.fontName.toLowerCase() == _loc3_.font.toLowerCase()) {
                _loc5_ = _loc8_;
            }
        }
        if (_loc5_ == null) {
            return param1;
        }
        if (_loc5_.hasGlyphs(param1)) {
            return param1;
        }
        _loc6_ = "";
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc2_ = param1.charAt(_loc4_);
            if (!_loc5_.hasGlyphs(_loc2_) && _loc2_ != "\r" && _loc2_ != "\n") {
                _loc6_ += TextController.REPLACE_RANDOM_CHARS[Math.floor(Math.random() * TextController.REPLACE_RANDOM_CHARS.length)];
            } else {
                _loc6_ += _loc2_;
            }
            _loc4_++;
        }
        return _loc6_;
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
        if (!this._displayRaw && this._caption.charAt(0) == "$" && this._caption.charAt(1) == "{") {
            this._localized = true;
            this.context.registerLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
        } else if (this._field != null) {
            this._field.text = this.replaceNonRenderableCharacters(this._caption);
            this.refreshTextImage();
        }
    }

    public override set caption(param1: string) {
        this.text = param1;
    }

    public override set color(param1: number) {
        super.color = param1;
        this._field.backgroundColor = param1;
    }

    public override set background(param1: boolean) {
        super.background = param1;
        this._field.background = param1;
    }

    public set localization(param1: string) {
        if (param1 != null && this._field != null) {
            this._field.text = this.limitStringLength(param1);
            this.refreshTextImage();
        }
    }

    public override clone(): IWindow {
        let _loc1_: TextController = asInstanceOf(super.clone(), TextController);
        _loc1_._field.backgroundColor = this.color;
        _loc1_._field.background = this.background;
        _loc1_._field.antiAliasType = "advanced";
        _loc1_._field.gridFitType = "pixel";
        _loc1_._SafeStr_3444 = this._SafeStr_3444;
        _loc1_._SafeStr_2928 = this._SafeStr_2928;
        _loc1_._margins = this._margins.clone(_loc1_.setTextMargins);
        _loc1_._SafeStr_2591 = this._SafeStr_2591;
        _loc1_._localized = this._localized;
        return _loc1_;
    }

    public override dispose(): void {
        this.immediateClickMode = false;
        TextStyleManager.events.removeEventListener("change", this.onTextStyleChanged);
        if (this._localized) {
            this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
        }
        if (this._margins != null) {
            this._margins.dispose();
            this._margins = null;
        }
        this._field = null;
        super.dispose();
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (!this._drawing) {
            if (param2.type == "WE_RESIZED") {
                this.refreshTextImage(true);
            }
        }
        return super.update(param1, param2);
    }

    protected refreshTextImage(param1: boolean = false): void {
        let _loc16_: number = 0;
        let _loc17_: any = 0;
        let _loc10_: string = null;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc11_: string = null;
        let _loc12_: number = 0;
        let _loc9_: TextFormat = null;
        let _loc8_: number = 0;
        let _loc14_: WindowEvent = null;
        if (this._drawing) {
            return;
        }
        this._drawing = true;
        this._SafeStr_3887 = false;
        _loc16_ = this._margins.left + this._margins.right;
        let _loc15_: number = this._margins.top + this._margins.bottom;
        let _loc3_: number = this._SafeStr_2132 - _loc16_;
        let _loc6_: number = this._height - _loc15_;
        let _loc2_: number = Math.floor(this._field.width) + (this._field.border ? 1 : 0) | 0;
        let _loc13_: boolean = false;
        if ((this._SafeStr_2591 == "none" || this._SafeStr_2591 == "right") && this.isOverflowReplaceOn) {
            _loc10_ = this._field.text;
            if (this._field.textHeight + _loc15_ > _loc6_) {
                _loc5_ = this._field.numLines - 1;
                while (this._field.getCharBoundaries(this._field.getLineOffset(_loc5_)) == null || this._field.getCharBoundaries(this._field.getLineOffset(_loc5_)).bottom > _loc6_) {
                    _loc5_--;
                }
                _loc4_ = this._field.getLineOffset(_loc5_);
                _loc17_ = _loc7_ = _loc4_ + this._field.getLineLength(_loc5_);
                while (this._field.textHeight + _loc15_ > _loc6_ && _loc17_ > 0) {
                    this._field.text = _loc10_.slice(0, --_loc17_) + this.overflowReplace;
                    this._SafeStr_3887 = true;
                }
            }
            _loc11_ = this._field.text;
            if (this._field.textWidth + _loc16_ > _loc3_) {
                _loc12_ = this._field.text.length - 1;
                while (this._field.getCharBoundaries(_loc12_) == null || this._field.getCharBoundaries(_loc12_).right > _loc3_) {
                    _loc12_--;
                }
                _loc9_ = this.getTextFormat(0, _loc12_);
                _loc17_ = _loc12_;
                _loc8_ = _loc16_ + _loc9_.indent + _loc9_.leftMargin + _loc9_.rightMargin | 0;
                while (this._field.textWidth + _loc8_ > _loc3_ && _loc17_ > 0) {
                    this._field.text = _loc11_.slice(0, --_loc17_) + this.overflowReplace;
                    this._SafeStr_3887 = true;
                }
            }
            _loc2_ = Math.floor(this._field.width) + (this._field.border ? 1 : 0) | 0;
        }
        if (_loc2_ != _loc3_) {
            if (this._SafeStr_2591 == "left") {
                this.setRectangle(this._SafeStr_2126, this._y, _loc2_ + _loc16_, Math.floor(this._field.height) + _loc15_ | 0);
                _loc13_ = true;
            } else if (this._SafeStr_2591 != "right") {
                if (this._SafeStr_2591 != "center") {
                    this._field.width = _loc3_ - (this._field.border ? 1 : 0);
                    this._field.height = _loc6_ - (this._field.border ? 1 : 0);
                }
            }
        }
        if (this._field.height + (this._field.border ? 1 : 0) < _loc6_) {
            if (this._SafeStr_2591 == "none") {
                this._field.height = _loc6_ - (this._field.border ? 1 : 0);
            } else {
                this.height = Math.floor(this._field.height) + _loc15_ | 0;
                _loc13_ = true;
            }
        } else if (this._field.height + (this._field.border ? 1 : 0) > _loc6_) {
            if (this._SafeStr_2591 != "none") {
                this.height = Math.floor(this._field.height) + _loc15_ | 0;
                _loc13_ = true;
            }
        }
        this._drawing = false;
        this._context.invalidate(this, null, 1);
        if (!_loc13_ && !param1 && this._events) {
            _loc14_ = WindowEvent.allocate("WE_RESIZED", this, null);
            this._events.dispatchEvent(_loc14_);
            _loc14_.recycle();
        }
    }

    public appendText(param1: string): void {
        this._field.appendText(param1);
        this.refreshTextImage();
    }

    public getCharBoundaries(param1: number): Rectangle {
        return this._field.getCharBoundaries(param1);
    }

    public getCharIndexAtPoint(param1: number, param2: number): number {
        return this._field.getCharIndexAtPoint(param1, param2);
    }

    public getFirstCharInParagraph(param1: number): number {
        return this._field.getFirstCharInParagraph(param1);
    }

    public getImageReference(param1: string): DisplayObject {
        return this._field.getImageReference(param1);
    }

    public getLineIndexAtPoint(param1: number, param2: number): number {
        return this._field.getLineIndexAtPoint(param1, param2);
    }

    public getLineIndexOfChar(param1: number): number {
        return this._field.getLineIndexOfChar(param1);
    }

    public getLineLength(param1: number): number {
        return this._field.getLineLength(param1);
    }

    public getLineMetrics(param1: number): TextLineMetrics {
        return this._field.getLineMetrics(param1);
    }

    public getLineOffset(param1: number): number {
        return this._field.getLineOffset(param1);
    }

    public getLineText(param1: number): string {
        return this._field.getLineText(param1);
    }

    public getParagraphLength(param1: number): number {
        return this._field.getParagraphLength(param1);
    }

    public getTextFormat(param1: number = -1, param2: number = -1): TextFormat {
        return this._field.getTextFormat(param1, param2);
    }

    public replaceText(param1: number, param2: number, param3: string): void {
        this._field.replaceText(param1, param2, param3);
        this.refreshTextImage();
    }

    public setTextFormat(param1: TextFormat, param2: number = -1, param3: number = -1): void {
        if (param2 >= 0 && param3 > param2 && param3 < this._field.length) {
            this._field.setTextFormat(param1, param2, param3);
            this.refreshTextImage();
        }
    }

    public setTextMargins(param1: IMargins): void {
        if (param1 != this._margins) {
            this._margins.dispose();
            this._margins = new TextMargins(param1.left, param1.top, param1.right, param1.bottom, this.setTextMargins);
        }
        if (this._SafeStr_2591 == "left") {
            this._field.width = this._SafeStr_2132 - this._margins.left - this._margins.right;
        }
        this.refreshTextImage();
    }

    private onTextStyleChanged(param1: Event): void {
        TextController.setTextFormatting(this);
        this.refreshTextImage();
    }

    protected parseVariableSet(param1: XML): void {
        let _loc3_: (...args: any[]) => any = null;
        let _loc4_: string = null;
        if (param1 != null) {
            let _loc2_: UtilsMap = new UtilsMap();
            XMLVariableParser.parseVariableList(param1.children(), _loc2_);
            this._drawing = true;
            for (_loc4_ of keysOf(_loc2_)) {
                _loc3_ = TextController._SafeStr_5670.get(_loc4_);
                if (_loc3_ != null) {
                    _loc3_(this, _loc2_[_loc4_]);
                }
            }
            this._drawing = false;
        }
    }

    public override set properties(param1: any[]) {
        let _loc3_: (...args: any[]) => any = null;
        this._drawing = true;
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = TextController._SafeStr_5670.get(_loc2_.key);
            if (_loc3_ != null) {
                _loc3_(this, _loc2_.value);
            }
        }
        this._drawing = false;
        super.properties = param1;
        this.refreshTextImage();
    }

    public override get properties(): any[] {
        let _loc3_: any[] = super.properties;
        let _loc2_: TextStyle = TextStyleManager.getStyle(this._textStyleName);
        _loc3_.push(this.createProperty("always_show_selection", this._field.alwaysShowSelection));
        _loc3_.push(new PropertyStruct("antialias_type", this._field.antiAliasType, "String", this._field.antiAliasType != _loc2_.antiAliasType, PropertyKeys.ANTIALIAS_TYPE_RANGE));
        _loc3_.push(this.createProperty("auto_size", this._SafeStr_2591));
        _loc3_.push(this.createProperty("border", this._field.border));
        _loc3_.push(this.createProperty("border_color", this._field.borderColor));
        _loc3_.push(new PropertyStruct("etching_color", this._etchingColor, "hex", this._etchingColor != _loc2_.etchingColor >>> 0));
        _loc3_.push(new PropertyStruct("etching_position", this._etchingPosition, "String", this._etchingPosition != String(_loc2_.etchingPosition), PropertyKeys.ETCHING_POSITION_RANGE));
        _loc3_.push(this.createProperty("condense_white", this._field.condenseWhite));
        _loc3_.push(new PropertyStruct("font_face", this.defaultTextFormat.font, "String", this.defaultTextFormat.font != _loc2_.fontFamily));
        _loc3_.push(new PropertyStruct("font_size", this.defaultTextFormat.size, "uint", this.defaultTextFormat.size != _loc2_.fontSize));
        _loc3_.push(this.createProperty("grid_fit_type", this._field.gridFitType));
        let _loc1_: number = (_loc2_.color ?? this.getDefaultProperty("text_color").value) >>> 0;
        _loc3_.push(new PropertyStruct("text_color", this._field.textColor, "hex", this._field.textColor != _loc1_));
        _loc3_.push(this.createProperty("text_style", this._textStyleName));
        _loc3_.push(this.createProperty("margin_left", this._margins.left));
        _loc3_.push(this.createProperty("margin_top", this._margins.top));
        _loc3_.push(this.createProperty("margin_right", this._margins.right));
        _loc3_.push(this.createProperty("margin_bottom", this._margins.bottom));
        _loc3_.push(this.createProperty("mouse_wheel_enabled", this._field.mouseWheelEnabled));
        _loc3_.push(this.createProperty("max_chars", this._field.maxChars));
        _loc3_.push(this.createProperty("multiline", this._field.multiline));
        _loc3_.push(this.createProperty("restrict", this._field.restrict));
        _loc3_.push(new PropertyStruct("sharpness", this._field.sharpness, "Number", this._field.sharpness != _loc2_.sharpness));
        _loc3_.push(new PropertyStruct("thickness", this._field.thickness, "Number", this._field.thickness != _loc2_.thickness));
        _loc3_.push(this.createProperty("word_wrap", this._field.wordWrap));
        _loc3_.push(this.createProperty("max_lines", this.maxLines));
        _loc3_.push(this.createProperty("overflow_replace", this.overflowReplace));
        _loc3_.push(new PropertyStruct("bold", this._field.defaultTextFormat.bold != false, "Boolean", this._field.defaultTextFormat.bold != (_loc2_.fontWeight == "bold")));
        _loc3_.push(new PropertyStruct("italic", this._field.defaultTextFormat.italic != false, "Boolean", this._field.defaultTextFormat.italic != (_loc2_.fontStyle == "italic")));
        _loc3_.push(new PropertyStruct("underline", this._field.defaultTextFormat.underline != false, "Boolean", this._field.defaultTextFormat.underline != (_loc2_.textDecoration == "underline")));
        _loc3_.push(new PropertyStruct("kerning", this._field.defaultTextFormat.kerning != false, "Boolean", this._field.defaultTextFormat.kerning != _loc2_.kerning));
        _loc3_.push(new PropertyStruct("spacing", this._field.defaultTextFormat.letterSpacing, "Number", this._field.defaultTextFormat.letterSpacing != _loc2_.letterSpacing));
        _loc3_.push(new PropertyStruct("leading", this._field.defaultTextFormat.leading, "Number", this._field.defaultTextFormat.leading != _loc2_.leading));
        return _loc3_;
    }

    public get etchingColor(): number {
        return this._etchingColor;
    }

    public set etchingColor(param1: number) {
        TextController.setEtchingColor(this, param1);
    }

    public set styleSheet(param1: StyleSheet) {
        this.setStyleSheet(this, param1);
    }

    private setStyleSheet(param1: TextController, param2: StyleSheet): void {
        param1._field.styleSheet = param2;
        this.refreshTextImage();
    }

    public get etchingPosition(): string {
        return this._etchingPosition;
    }

    public set etchingPosition(param1: string) {
        TextController.setEtchingPosition(this, param1);
    }

    public resetExplicitStyle(): void {
        this._SafeStr_2410 = new TextStyle();
    }

    public get isOverflown(): boolean {
        return this._SafeStr_3887;
    }

    protected override initInstanceFields(): void {
        this.setTextMargins = this.setTextMargins.bind(this);
        this.onTextStyleChanged = this.onTextStyleChanged.bind(this);
        this._overFlowReplace = "";
        this._SafeStr_3887 = false;
        this._SafeStr_3444 = 0;
        this._SafeStr_2928 = 0;
        this._drawing = false;
        this._SafeStr_2591 = "none";
        this._localized = false;
        this._maxLines = 0;
        this._displayRaw = false;
        this._etchingColor = 0;
        this._SafeStr_2410 = new TextStyle();
        this._settingRectangle = false;
        preSuperTextController.pop()!(this);
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextController.#staticsReady) return;
        TextController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextController, name, { value, writable: true, configurable: true, enumerable: true });
        set("ALL_FONTS", null);
        set("REPLACE_RANDOM_CHARS", null);
        set("_SafeStr_5670", null);
        set("ALL_FONTS", Font.enumerateFonts());
        set("REPLACE_RANDOM_CHARS", ["a", "B", "c", "D", "e"]);
        set("_SafeStr_5670", TextController.createPropertySetterTable());
    }

    public override get caption(): string {
        return super.caption;
    }

    public override get color(): number {
        return super.color;
    }

    public override get background(): boolean {
        return super.background;
    }

    get [ITextWindow](): true {
        return true;
    }

    get [IScrollableWindow](): true {
        return true;
    }

    get [ITextFieldContainer](): true {
        return true;
    }

    get [ILocalizable](): true {
        return true;
    }
}
