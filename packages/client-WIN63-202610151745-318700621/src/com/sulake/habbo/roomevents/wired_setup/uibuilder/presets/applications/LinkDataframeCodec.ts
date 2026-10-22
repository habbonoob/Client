import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class LinkDataframeCodec {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::LinkDataframeCodec'); }

    public static readonly MAX_ROWS: number = 12;
    public static readonly MAX_TEXT_BYTES: number = 3000;
    public static readonly MAX_MESSAGE_BYTES: number = 200;
    public static readonly NUMBER_LITERAL: number = 0;
    public static readonly NUMBER_VARIABLE: number = 1;
    public static readonly VARIABLE_TEXT: number = 2;
    public static readonly CUSTOM_MESSAGE: number = 3;
    public static readonly _SafeStr_14386: number = 0;
    public static readonly VARIABLE_DESTINATION: number = 1;

    constructor() {
    }

    public static decode(param1: string, param2: number): any[] {
        let _loc3_: any[] = null;
        if (param2 < 0 || param2 > 12) {
            return null;
        }
        if (param1 == "" && param2 == 0) {
            return [];
        }
        try {
            _loc3_ = asGuarded(JSON.parse(param1), Array.isArray);
        } catch (error) {
            return null;
        }
        if (_loc3_ == null || _loc3_.length != param2) {
            return null;
        }
        for (const _loc4_ of _loc3_ ?? []) {
            if (!(Array.isArray(_loc4_)) || _loc4_.length != 2 || !(typeof _loc4_[0] === "string") || !(typeof _loc4_[1] === "string")) {
                return null;
            }
        }
        return _loc3_;
    }

    public static normalizeKey(param1: string): string {
        return param1.replace(/_/g, " ").replace(/^[\x00- ]+|[\x00- ]+$/g, "").replace(/ /g, "_").toLowerCase();
    }

    public static keyError(param1: string): string {
        param1 = LinkDataframeCodec.normalizeKey(param1);
        if (param1.length == 0 || param1.length > 40) {
            return "wiredfurni.error.link.key_length";
        }
        if (!/^\w+$/.test(param1)) {
            return "wiredfurni.error.variables.name_syntax";
        }
        return null;
    }

    public static placeholderError(param1: string): string {
        if (param1.length == 0 || param1.length > 40) {
            return "wiredfurni.error.placeholder.name_length";
        }
        if (!/^\w+$/.test(param1)) {
            return "wiredfurni.error.placeholder.name_syntax";
        }
        if (param1.toLowerCase() == "trigger_text") {
            return "wiredfurni.error.placeholder.reserved";
        }
        return null;
    }

    public static isTarget(param1: number): boolean {
        return param1 == 0 || param1 == 1 || param1 == -10 || param1 == -20;
    }

    public static isLiteral(param1: string): boolean {
        let _loc2_: number = Number(param1);
        return /^-?\d+$/.test(param1) && _loc2_ >= -2147483648 && _loc2_ <= 2147483647 && _loc2_ == Math.floor(_loc2_);
    }

    public static utf8Length(param1: string): number {
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.writeUTFBytes(param1);
        return _loc2_.length | 0;
    }

    public static storageError(param1: string, param2: any[], param3: any[]): string {
        if (LinkDataframeCodec.utf8Length(param1) > 3000) {
            return "wiredfurni.error.link.configuration_too_large";
        }
        if (param2.join("|").length > 400 || param3.join("|").length > 240) {
            return "wiredfurni.error.link.configuration_too_large";
        }
        return null;
    }
}
