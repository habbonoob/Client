import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TextStyle {
    static { registerClassName(this, 'com.sulake.core.window.utils::TextStyle'); }

    public static readonly NORMAL: string = "normal";
    public static readonly ITALIC: string = "italic";
    public static readonly BOLD: string = "bold";
    public static readonly _SafeStr_7454: string = "underline";
    public static readonly NONE: string = "none";
    public static readonly ADVANCED: string = "advanced";
    public static readonly TOP_LEFT: string = "top-left";
    public static readonly TOP: string = "top";
    public static readonly TOP_RIGHT: string = "top-right";
    public static readonly _SafeStr_6016: string = "left";
    public static readonly RIGHT: string = "right";
    public static readonly BOTTOM_LEFT: string = "bottom-left";
    public static readonly BOTTOM: string = "bottom";
    public static readonly BOTTOM_RIGHT: string = "bottom-right";

    declare public name: string;

    declare public color: any;

    declare public fontFamily: string;

    public fontSize: any = null;
    public fontStyle: string = null;
    public fontWeight: string = null;
    public kerning: any = null;
    public leading: any = null;
    public letterSpacing: any = null;
    public textDecoration: string = null;
    public textIndent: any = null;
    public antiAliasType: string = null;
    public sharpness: any = null;
    public thickness: any = null;
    public etchingColor: any = null;
    public etchingPosition: any = null;

    public toString(): string {
        let _loc1_: string = "";
        _loc1_ += this.name + " {\n";
        if (this.color) {
            _loc1_ += "\tcolor: #" + this.color.toString() + ";\n";
        }
        if (this.fontFamily) {
            _loc1_ += "\tfont-family: " + this.fontFamily + ";\n";
        }
        if (this.fontSize) {
            _loc1_ += "\tfont-size: " + this.fontSize + ";\n";
        }
        if (this.fontStyle) {
            _loc1_ += "\tfont-style: " + this.fontStyle + ";\n";
        }
        if (this.fontWeight) {
            _loc1_ += "\tfont-weight: " + this.fontWeight + ";\n";
        }
        if (this.kerning) {
            _loc1_ += "\tkerning: " + this.kerning + ";\n";
        }
        if (this.leading) {
            _loc1_ += "\tleading: " + this.leading + ";\n";
        }
        if (this.letterSpacing) {
            _loc1_ += "\tletter-spacing: " + this.letterSpacing + ";\n";
        }
        if (this.textDecoration) {
            _loc1_ += "\ttext-decoration: " + this.textDecoration + ";\n";
        }
        if (this.textIndent) {
            _loc1_ += "\ttext-indent: " + this.textIndent + ";\n";
        }
        if (this.antiAliasType) {
            _loc1_ += "\tanti-alias-type: " + this.antiAliasType + ";\n";
        }
        if (this.sharpness) {
            _loc1_ += "\tsharpness: " + this.sharpness + ";\n";
        }
        if (this.thickness) {
            _loc1_ += "\tthickness: " + this.thickness + ";\n";
        }
        if (this.etchingColor) {
            _loc1_ += "\tetching-color: #" + this.etchingColor.toString() + ";\n";
        }
        if (this.etchingPosition) {
            _loc1_ += "\tetching-direction: " + this.etchingPosition + ";\n";
        }
        return _loc1_ + "}";
    }

    public equals(param1: TextStyle): boolean {
        return this.color == param1.color && this.fontFamily == param1.fontFamily && this.fontSize == param1.fontSize && this.fontStyle == param1.fontStyle && this.fontWeight == param1.fontWeight && this.kerning == param1.kerning && this.leading == param1.leading && this.letterSpacing == param1.letterSpacing && this.textDecoration == param1.textDecoration && this.textIndent == param1.textIndent && this.antiAliasType == param1.antiAliasType && this.sharpness == param1.sharpness && this.thickness == param1.thickness && this.etchingColor == param1.etchingColor && this.etchingPosition == param1.etchingPosition;
    }

    public clone(): TextStyle {
        let _loc1_: TextStyle = new TextStyle();
        _loc1_.name = this.name;
        _loc1_.color = this.color;
        _loc1_.fontFamily = this.fontFamily;
        _loc1_.fontSize = this.fontSize;
        _loc1_.fontStyle = this.fontStyle;
        _loc1_.fontWeight = this.fontWeight;
        _loc1_.kerning = this.kerning;
        _loc1_.leading = this.leading;
        _loc1_.letterSpacing = this.letterSpacing;
        _loc1_.textDecoration = this.textDecoration;
        _loc1_.textIndent = this.textIndent;
        _loc1_.antiAliasType = this.antiAliasType;
        _loc1_.sharpness = this.sharpness;
        _loc1_.thickness = this.thickness;
        _loc1_.etchingColor = this.etchingColor;
        _loc1_.etchingPosition = this.etchingPosition;
        return _loc1_;
    }
}
