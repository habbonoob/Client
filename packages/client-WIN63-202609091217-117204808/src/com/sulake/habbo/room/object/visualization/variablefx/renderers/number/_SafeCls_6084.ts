import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6084 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::_SafeCls_6084'); }

    constructor() {
    }

    public static getRecolorableDesign(param1: string): any {
        switch (param1) {
            case "blocky":
                return { "design": "blocky", "digitHeight": 22, "digitSpacing": 3, "iconContentYOffsetPx": 0, "iconOverlapPx": -6, "digits": [_SafeCls_6084.digit("0", 0, 13), _SafeCls_6084.digit("1", 14, 9), _SafeCls_6084.digit("2", 24, 13), _SafeCls_6084.digit("3", 38, 13), _SafeCls_6084.digit("4", 52, 13), _SafeCls_6084.digit("5", 66, 13), _SafeCls_6084.digit("6", 80, 13), _SafeCls_6084.digit("7", 94, 13), _SafeCls_6084.digit("8", 108, 13), _SafeCls_6084.digit("9", 122, 13), _SafeCls_6084.digit("-", 136, 13)], "layers": { "numbers": "variablefx_number_blocky_numbers", "darkening": "variablefx_number_blocky_darkening", "lighting": "variablefx_number_blocky_lighting" } };
            case "shalimar":
                return { "design": "shalimar", "digitHeight": 23, "digitSpacing": 3, "iconContentYOffsetPx": 0, "iconOverlapPx": -6, "digits": [_SafeCls_6084.digit("0", 0, 17), _SafeCls_6084.digit("1", 18, 17), _SafeCls_6084.digit("2", 36, 17), _SafeCls_6084.digit("3", 54, 17), _SafeCls_6084.digit("4", 72, 17), _SafeCls_6084.digit("5", 90, 17), _SafeCls_6084.digit("6", 108, 17), _SafeCls_6084.digit("7", 126, 17), _SafeCls_6084.digit("8", 144, 17), _SafeCls_6084.digit("9", 162, 17), _SafeCls_6084.digit("-", 180, 17)], "layers": { "numbers": "variablefx_number_shalimar_numbers", "numberLines": "variablefx_number_shalimar_number_lines", "darkening": "variablefx_number_shalimar_darkening", "lighting": "variablefx_number_shalimar_lighting" } };
            default:
                return null;
        }
    }

    public static getBakedColorDesign(param1: string): any {
        let _loc2_: string = param1;
        if ("freeze_style" !== _loc2_) {
            return null;
        }
        return { "design": "freeze_style", "digitHeight": 21, "digitSpacing": -4, "iconContentYOffsetPx": 0, "iconOverlapPx": -1, "digits": [_SafeCls_6084.digit("0", 0, 16), _SafeCls_6084.digit("1", 17, 13), _SafeCls_6084.digit("2", 31, 16), _SafeCls_6084.digit("3", 48, 16), _SafeCls_6084.digit("4", 65, 16), _SafeCls_6084.digit("5", 82, 16), _SafeCls_6084.digit("6", 99, 16), _SafeCls_6084.digit("7", 116, 16), _SafeCls_6084.digit("8", 133, 16), _SafeCls_6084.digit("9", 150, 16), _SafeCls_6084.digit("-", 167, 16)], "colorRows": { "RED": 0, "GREEN": 22, "BLUE": 44, "YELLOW": 66, "WHITE": 88 } };
    }

    private static digit(param1: string, param2: number, param3: number): any {
        return { "sourceX": param2, "value": param1, "width": param3 };
    }
}
