import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';

export class VariableLeaderboardConfigCodec {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.leaderboard::VariableLeaderboardConfigCodec'); }

    public static readonly INT_PARAM_COUNT: number = 19;
    public static readonly VARIABLE_ID_COUNT: number = 12;
    public static readonly STRING_FIELD_COUNT: number = 17;
    public static readonly MAX_COLUMNS: number = 4;
    public static readonly MAX_DISPLAY_OVERRIDES: number = 10;
    public static readonly MAX_SELECTABLE_CHOICES: number = 10;
    private static readonly MAX_INT_PARAMS_STORAGE_LENGTH: number = 400;
    private static readonly MAX_VARIABLE_IDS_STORAGE_LENGTH: number = 240;
    private static readonly MAX_STRING_PARAM_UTF8_LENGTH: number = 1000;
    private static readonly COLUMN_WIDTH_PARAM_OFFSET: number = 14;
    private static readonly _SafeStr_14535: number = 14;
    public static readonly MIN_TITLE_LENGTH: number = 1;
    public static readonly MAX_TITLE_LENGTH: number = 50;
    public static readonly MAX_DESCRIPTION_LENGTH: number = 80;
    public static readonly MIN_COLUMN_LABEL_LENGTH: number = 2;
    public static readonly MAX_COLUMN_LABEL_LENGTH: number = 12;
    public static readonly MIN_OVERRIDE_LENGTH: number = 1;
    public static readonly MAX_OVERRIDE_LENGTH: number = 22;
    public static readonly _SafeStr_14294: number = -32;
    public static readonly MAX_OFFSET_X: number = 32;
    private static readonly MAX_SIGNED_LONG: string = "9223372036854775807";
    private static readonly MIN_SIGNED_LONG_MAGNITUDE: string = "9223372036854775808";
    public static readonly DEFAULT_USERNAME_LABEL: string = "Username";
    public static readonly DEFAULT_VALUE_LABEL: string = "Value";

    constructor() {
    }

    public static decodeParams(param1: any[], param2: any[], param3: string): VariableLeaderboardConfig {
        let _loc20_: number = 0;
        let _loc14_: number = 0;
        let _loc17_: string = null;
        let _loc18_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: string = null;
        let _loc7_: string = null;
        VariableLeaderboardConfigCodec.requireArray(param1, "integer parameters");
        VariableLeaderboardConfigCodec.requireArray(param2, "variable IDs");
        if (param3 == null) {
            throw VariableLeaderboardConfigCodec.invalid("missing string parameter");
        }
        VariableLeaderboardConfigCodec.validateIntParamTypes(param1);
        VariableLeaderboardConfigCodec.validateVariableIdTypes(param2);
        VariableLeaderboardConfigCodec.validateStorageLengths(param1, param2, param3);
        if (param3.length == 0) {
            return VariableLeaderboardConfigCodec.decodeUnpublished();
        }
        if (param1.length < 14) {
            throw VariableLeaderboardConfigCodec.invalid("expected at least 14 integer parameters");
        }
        if (param2.length < 12) {
            throw VariableLeaderboardConfigCodec.invalid("expected at least 12 variable IDs");
        }
        let _loc9_: number = param1[0] | 0;
        VariableLeaderboardConfigCodec.validateSortMode(_loc9_);
        let _loc10_: number = param1[1] | 0;
        if (_loc10_ < 1 || _loc10_ > 4) {
            throw VariableLeaderboardConfigCodec.invalid("invalid column count");
        }
        let _loc16_: string[] = VariableLeaderboardConfigCodec.decodeStrings(param3);
        let _loc6_: VariableLeaderboardColumn[] = [];
        _loc20_ = 0;
        while (_loc20_ < _loc10_) {
            _loc14_ = param1[2 + _loc20_] | 0;
            VariableLeaderboardConfigCodec.validateColumnType(_loc14_);
            _loc17_ = _loc16_[2 + _loc20_];
            if (_loc14_ == -1) {
                throw VariableLeaderboardConfigCodec.invalid("active column cannot be unused");
            }
            _loc18_ = Number(14 + _loc20_ < param1.length ? param1[14 + _loc20_] : VariableLeaderboardColumn.defaultWidth(_loc14_)) | 0;
            if (!VariableLeaderboardColumn.isValidWidth(_loc18_)) {
                _loc18_ = VariableLeaderboardColumn.defaultWidth(_loc14_);
            }
            _loc6_.push(new VariableLeaderboardColumn(_loc14_, _loc17_, _loc18_));
            _loc20_++;
        }
        let _loc11_: boolean = VariableLeaderboardConfigCodec.decodeBoolean(param1[6] | 0, "filter enabled");
        let _loc23_: boolean = _loc11_ && VariableLeaderboardConfigCodec.decodeBoolean(param1[7] | 0, "comparison enabled");
        let _loc21_: number = Number(_loc23_ ? param1[8] : 0) | 0;
        if (_loc23_) {
            VariableLeaderboardConfigCodec.validateOperandKind(_loc21_);
        }
        let _loc12_: number = param1[9] | 0;
        if (_loc12_ < 0 || _loc12_ > 10) {
            throw VariableLeaderboardConfigCodec.invalid("invalid display override count");
        }
        let _loc8_: string = _loc11_ ? VariableLeaderboardConfigCodec.canonicalizeNullVariableId(stringOrNull(param2[0])) : "0";
        if (_loc11_ && VariableLeaderboardConfigCodec.isNullVariableId(_loc8_)) {
            throw VariableLeaderboardConfigCodec.invalid("enabled filter requires a variable ID");
        }
        let _loc15_: string = "0";
        let _loc13_: string = "";
        if (_loc23_) {
            if (_loc21_ == 0) {
                _loc13_ = _loc16_[6];
                if (!VariableLeaderboardConfigCodec.isCanonicalSignedLong(_loc13_)) {
                    throw VariableLeaderboardConfigCodec.invalid("literal comparison must contain a canonical signed 64-bit literal");
                }
            } else {
                _loc15_ = VariableLeaderboardConfigCodec.canonicalizeNullVariableId(stringOrNull(param2[1]));
                if (VariableLeaderboardConfigCodec.isNullVariableId(_loc15_)) {
                    throw VariableLeaderboardConfigCodec.invalid("global comparison requires a variable ID");
                }
            }
        }
        let _loc19_: any = {};
        _loc5_ = 0;
        while (_loc5_ < _loc12_) {
            _loc4_ = stringOrNull(param2[2 + _loc5_]);
            _loc7_ = _loc16_[7 + _loc5_];
            if (VariableLeaderboardConfigCodec.isNullVariableId(_loc4_) || _loc7_.length == 0) {
                throw VariableLeaderboardConfigCodec.invalid("populated display override must have an ID and name");
            }
            if (_loc19_.hasOwnProperty(_loc4_)) {
                throw VariableLeaderboardConfigCodec.invalid("duplicate display override ID");
            }
            _loc19_[_loc4_] = _loc7_;
            _loc5_++;
        }
        let _loc22_: VariableLeaderboardConfig = new VariableLeaderboardConfig(_loc16_[0], _loc16_[1], _loc6_, _loc9_, _loc11_, _loc8_, _loc23_, _loc21_, _loc15_, _loc13_, _loc19_, new VariableLeaderboardLocation(param1[10] | 0, param1[11] | 0, param1[12] | 0, param1[13] | 0), param1[18] | 0);
        VariableLeaderboardConfigCodec.validate(_loc22_);
        return _loc22_;
    }

    public static encode(param1: VariableLeaderboardConfig): any {
        let _loc3_: any;
        let _loc9_: number = 0;
        VariableLeaderboardConfigCodec.validate(param1);
        let _loc7_: VariableLeaderboardColumn[] = param1.columns;
        let _loc4_: string[] = param1.displayOverrideIds;
        let _loc2_: any[] = [param1.sortMode, _loc7_.length | 0];
        _loc9_ = 0;
        while (_loc9_ < 4) {
            _loc2_.push(_loc9_ < _loc7_.length ? _loc7_[_loc9_].type : -1);
            _loc9_++;
        }
        _loc2_.push(param1.filterEnabled ? 1 : 0);
        _loc2_.push(param1.comparisonEnabled ? 1 : 0);
        _loc2_.push(param1.operandKind);
        _loc2_.push(_loc4_.length | 0);
        _loc2_.push(param1.location.tileX);
        _loc2_.push(param1.location.tileY);
        _loc2_.push(param1.location.offsetX);
        _loc2_.push(param1.location.altitude);
        _loc9_ = 0;
        while (_loc9_ < 4) {
            _loc2_.push(_loc9_ < _loc7_.length ? _loc7_[_loc9_].width : 0);
            _loc9_++;
        }
        _loc2_.push(param1.pageSizeOption);
        let _loc8_: any[] = [VariableLeaderboardConfigCodec.canonicalizeNullVariableId(param1.filterVariableId), VariableLeaderboardConfigCodec.canonicalizeNullVariableId(param1.globalOperandVariableId)];
        for (_loc3_ of _loc4_ ?? []) {
            _loc8_.push(_loc3_);
        }
        while (_loc8_.length < 12) {
            _loc8_.push("0");
        }
        let _loc6_: string[] = [];
        _loc6_.push(param1.title);
        _loc6_.push(param1.description);
        _loc9_ = 0;
        while (_loc9_ < 4) {
            _loc6_.push(_loc9_ < _loc7_.length ? _loc7_[_loc9_].label : "");
            _loc9_++;
        }
        _loc6_.push(param1.literal);
        for (_loc3_ of _loc4_ ?? []) {
            _loc6_.push(param1.displayOverrideFor(_loc3_));
        }
        while (_loc6_.length < 17) {
            _loc6_.push("");
        }
        let _loc5_: string = VariableLeaderboardConfigCodec.encodeStrings(_loc6_);
        VariableLeaderboardConfigCodec.validateStorageLengths(_loc2_, _loc8_, _loc5_);
        return { "intParams": _loc2_, "variableIds": _loc8_, "stringParam": _loc5_ };
    }

    public static validate(param1: VariableLeaderboardConfig): void {
        let _loc5_: string = null;
        if (param1 == null) {
            throw VariableLeaderboardConfigCodec.invalid("missing configuration");
        }
        if (!VariableLeaderboardConfigCodec.hasLength(param1.title, 1, 50)) {
            throw VariableLeaderboardConfigCodec.invalid("invalid title length");
        }
        if (!VariableLeaderboardConfigCodec.hasLength(param1.description, 0, 80)) {
            throw VariableLeaderboardConfigCodec.invalid("invalid description length");
        }
        VariableLeaderboardConfigCodec.validateSortMode(param1.sortMode);
        if (param1.pageSizeOption < 0 || param1.pageSizeOption >= VariableLeaderboardDescriptor._SafeStr_14046.length) {
            throw VariableLeaderboardConfigCodec.invalid("invalid page size option");
        }
        VariableLeaderboardConfigCodec.validateOperandKind(param1.operandKind);
        let _loc4_: VariableLeaderboardColumn[] = param1.columns;
        if (_loc4_.length < 1 || _loc4_.length > 4) {
            throw VariableLeaderboardConfigCodec.invalid("invalid column count");
        }
        if (_loc4_[0] == null || _loc4_[0].type != 0) {
            throw VariableLeaderboardConfigCodec.invalid("first column must be Username");
        }
        let _loc7_: any = {};
        for (const _loc6_ of _loc4_ ?? []) {
            if (_loc6_ == null) {
                throw VariableLeaderboardConfigCodec.invalid("missing column");
            }
            VariableLeaderboardConfigCodec.validateColumnType(_loc6_.type);
            if (_loc6_.type == -1) {
                throw VariableLeaderboardConfigCodec.invalid("active column cannot be unused");
            }
            if (_loc7_[_loc6_.type]) {
                throw VariableLeaderboardConfigCodec.invalid("duplicate column type");
            }
            _loc7_[_loc6_.type] = true;
            if (!VariableLeaderboardConfigCodec.hasLength(_loc6_.label, 2, 12)) {
                throw VariableLeaderboardConfigCodec.invalid("invalid column label length");
            }
            if (!VariableLeaderboardColumn.isValidWidth(_loc6_.width)) {
                throw VariableLeaderboardConfigCodec.invalid("invalid column width");
            }
        }
        VariableLeaderboardConfigCodec.validateConditionalFields(param1);
        let _loc3_: string[] = param1.displayOverrideIds;
        if (_loc3_.length > 10) {
            throw VariableLeaderboardConfigCodec.invalid("too many display overrides");
        }
        for (const _loc2_ of _loc3_ ?? []) {
            if (VariableLeaderboardConfigCodec.isNullVariableId(_loc2_)) {
                throw VariableLeaderboardConfigCodec.invalid("display override requires a variable ID");
            }
            _loc5_ = param1.displayOverrideFor(_loc2_);
            if (!VariableLeaderboardConfigCodec.hasLength(_loc5_, 1, 22)) {
                throw VariableLeaderboardConfigCodec.invalid("invalid display override length");
            }
        }
        if (param1.location == null) {
            throw VariableLeaderboardConfigCodec.invalid("missing location");
        }
        if (param1.location.offsetX < -32 || param1.location.offsetX > 32) {
            throw VariableLeaderboardConfigCodec.invalid("offsetX must be between -32 and 32");
        }
    }

    private static isCanonicalSignedLong(param1: string): boolean {
        if (param1 == null || param1.length == 0) {
            return false;
        }
        let _loc2_: boolean = param1.charAt(0) == "-";
        let _loc4_: string = _loc2_ ? param1.substr(1) : param1;
        if (!VariableLeaderboardConfigCodec.isCanonicalUnsignedDecimal(_loc4_) || _loc2_ && _loc4_ == "0") {
            return false;
        }
        let _loc3_: string = _loc2_ ? "9223372036854775808" : "9223372036854775807";
        if (_loc4_.length != _loc3_.length) {
            return _loc4_.length < _loc3_.length;
        }
        return VariableLeaderboardConfigCodec.compareSerializedIds(_loc4_, _loc3_) <= 0;
    }

    private static decodeUnpublished(): VariableLeaderboardConfig {
        return new VariableLeaderboardConfig("", "", Array.from([new VariableLeaderboardColumn(0, "Username", 3), new VariableLeaderboardColumn(1, "Value", 0)]), 0, false, "0", false, 0, "0", "", {}, new VariableLeaderboardLocation(0, 0, 0, 0));
    }

    private static validateConditionalFields(param1: VariableLeaderboardConfig): void {
        if (!param1.filterEnabled) {
            if (!VariableLeaderboardConfigCodec.isNullVariableId(param1.filterVariableId) || !VariableLeaderboardConfigCodec.isNullVariableId(param1.globalOperandVariableId) || param1.comparisonEnabled || param1.operandKind != 0 || param1.literal.length != 0) {
                throw VariableLeaderboardConfigCodec.invalid("disabled filter must be canonical");
            }
            return;
        }
        if (!VariableLeaderboardConfigCodec.isPopulatedVariableId(param1.filterVariableId)) {
            throw VariableLeaderboardConfigCodec.invalid("enabled filter requires a variable ID");
        }
        if (!param1.comparisonEnabled) {
            if (!VariableLeaderboardConfigCodec.isNullVariableId(param1.globalOperandVariableId) || param1.operandKind != 0 || param1.literal.length != 0) {
                throw VariableLeaderboardConfigCodec.invalid("disabled comparison must be canonical");
            }
            return;
        }
        if (param1.operandKind == 0) {
            if (!VariableLeaderboardConfigCodec.isNullVariableId(param1.globalOperandVariableId) || !VariableLeaderboardConfigCodec.isCanonicalSignedLong(param1.literal)) {
                throw VariableLeaderboardConfigCodec.invalid("literal comparison must contain a canonical signed 64-bit literal");
            }
        } else if (param1.operandKind == 1) {
            if (!VariableLeaderboardConfigCodec.isPopulatedVariableId(param1.globalOperandVariableId) || param1.literal.length != 0) {
                throw VariableLeaderboardConfigCodec.invalid("global comparison must contain a global variable ID only");
            }
        }
    }

    private static decodeStrings(param1: string): string[] {
        let _loc3_: number = 0;
        let _loc4_: any[] = param1.split("\t");
        let _loc2_: string[] = [];
        _loc3_ = 0;
        while (_loc3_ < 17) {
            _loc2_.push(_loc3_ < _loc4_.length ? String(_loc4_[_loc3_]) : "");
            _loc3_++;
        }
        return _loc2_;
    }

    private static encodeStrings(param1: string[]): string {
        if (param1 == null || param1.length != 17) {
            throw VariableLeaderboardConfigCodec.invalid("incorrect string field count");
        }
        return param1.join("\t");
    }

    private static validateSortMode(param1: number): void {
        switch (param1) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return;
            default:
                throw VariableLeaderboardConfigCodec.invalid("unknown sort mode " + param1);
        }
    }

    private static validateColumnType(param1: number): void {
        switch (param1 - -1) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return;
            default:
                throw VariableLeaderboardConfigCodec.invalid("unknown column type " + param1);
        }
    }

    private static validateOperandKind(param1: number): void {
        if (param1 != 0 && param1 != 1) {
            throw VariableLeaderboardConfigCodec.invalid("unknown operand kind " + param1);
        }
    }

    private static decodeBoolean(param1: number, param2: string): boolean {
        if (param1 == 0) {
            return false;
        }
        if (param1 == 1) {
            return true;
        }
        throw VariableLeaderboardConfigCodec.invalid(param2 + " must be zero or one");
    }

    private static validateStorageLengths(param1: any[], param2: any[], param3: string): void {
        if (param1.join("|").length > 400) {
            throw VariableLeaderboardConfigCodec.invalid("integer parameters exceed storage limit");
        }
        if (param2.join("|").length > 240) {
            throw VariableLeaderboardConfigCodec.invalid("variable IDs exceed storage limit");
        }
        let _loc4_: ByteArray = new ByteArray();
        _loc4_.writeUTFBytes(param3);
        if (_loc4_.length > 1000) {
            throw VariableLeaderboardConfigCodec.invalid("string parameter exceeds storage limit");
        }
    }

    private static validateIntParamTypes(param1: any[]): void {
        for (const _loc2_ of param1 ?? []) {
            if (!(typeof _loc2_ === "number" && (_loc2_ | 0) === _loc2_)) {
                throw VariableLeaderboardConfigCodec.invalid("integer parameters must contain only integers");
            }
        }
    }

    private static validateVariableIdTypes(param1: any[]): void {
        for (const _loc2_ of param1 ?? []) {
            if (!(typeof _loc2_ === "string") || String(_loc2_).length == 0) {
                throw VariableLeaderboardConfigCodec.invalid("variable IDs must contain nonempty Strings");
            }
        }
    }

    private static requireArray(param1: any[], param2: string): void {
        if (param1 == null) {
            throw VariableLeaderboardConfigCodec.invalid("missing " + param2);
        }
    }

    private static hasLength(param1: string, param2: number, param3: number): boolean {
        return param1 != null && param1.length >= param2 && param1.length <= param3;
    }

    private static isNullVariableId(param1: string): boolean {
        return param1 == "0" || param1 == WiredVariable._SafeStr_2375;
    }

    private static canonicalizeNullVariableId(param1: string): string {
        return VariableLeaderboardConfigCodec.isNullVariableId(param1) ? "0" : param1;
    }

    private static isPopulatedVariableId(param1: string): boolean {
        return param1 != null && param1.length > 0 && !VariableLeaderboardConfigCodec.isNullVariableId(param1);
    }

    private static isCanonicalUnsignedDecimal(param1: string): boolean {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        if (param1 == null || param1.length == 0 || param1.length > 1 && param1.charAt(0) == "0") {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            _loc3_ = param1.charCodeAt(_loc2_) | 0;
            if (_loc3_ < 48 || _loc3_ > 57) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }

    private static compareSerializedIds(param1: string, param2: string): number {
        if (param1 < param2) {
            return -1;
        }
        if (param1 > param2) {
            return 1;
        }
        return 0;
    }

    private static invalid(param1: string): ArgumentError {
        return new ArgumentError("Invalid variable leaderboard configuration: " + param1);
    }
}
