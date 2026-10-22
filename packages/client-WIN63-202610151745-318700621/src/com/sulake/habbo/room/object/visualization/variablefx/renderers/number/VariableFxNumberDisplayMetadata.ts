import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxNumberDisplayMetadata {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::VariableFxNumberDisplayMetadata'); }

    constructor() {
    }

    public static getRecolorableDesign(param1: string): any {
        switch (param1) {
            case "blocky":
                return { "design": "blocky", "digitHeight": 22, "digitSpacing": 3, "iconContentYOffsetPx": 0, "iconOverlapPx": -6, "digits": [VariableFxNumberDisplayMetadata.digit("0", 0, 13), VariableFxNumberDisplayMetadata.digit("1", 14, 9), VariableFxNumberDisplayMetadata.digit("2", 24, 13), VariableFxNumberDisplayMetadata.digit("3", 38, 13), VariableFxNumberDisplayMetadata.digit("4", 52, 13), VariableFxNumberDisplayMetadata.digit("5", 66, 13), VariableFxNumberDisplayMetadata.digit("6", 80, 13), VariableFxNumberDisplayMetadata.digit("7", 94, 13), VariableFxNumberDisplayMetadata.digit("8", 108, 13), VariableFxNumberDisplayMetadata.digit("9", 122, 13), VariableFxNumberDisplayMetadata.digit("-", 136, 13)], "layers": { "numbers": "variablefx_number_blocky_numbers", "darkening": "variablefx_number_blocky_darkening", "lighting": "variablefx_number_blocky_lighting" } };
            case "shalimar":
                return { "design": "shalimar", "digitHeight": 23, "digitSpacing": 3, "iconContentYOffsetPx": 0, "iconOverlapPx": -6, "digits": [VariableFxNumberDisplayMetadata.digit("0", 0, 17), VariableFxNumberDisplayMetadata.digit("1", 18, 17), VariableFxNumberDisplayMetadata.digit("2", 36, 17), VariableFxNumberDisplayMetadata.digit("3", 54, 17), VariableFxNumberDisplayMetadata.digit("4", 72, 17), VariableFxNumberDisplayMetadata.digit("5", 90, 17), VariableFxNumberDisplayMetadata.digit("6", 108, 17), VariableFxNumberDisplayMetadata.digit("7", 126, 17), VariableFxNumberDisplayMetadata.digit("8", 144, 17), VariableFxNumberDisplayMetadata.digit("9", 162, 17), VariableFxNumberDisplayMetadata.digit("-", 180, 17)], "layers": { "numbers": "variablefx_number_shalimar_numbers", "numberLines": "variablefx_number_shalimar_number_lines", "darkening": "variablefx_number_shalimar_darkening", "lighting": "variablefx_number_shalimar_lighting" } };
            default:
                return null;
        }
    }

    public static getBakedColorDesign(param1: string): any {
        let _loc2_: string = param1;
        if ("freeze_style" !== _loc2_) {
            return null;
        }
        return { "design": "freeze_style", "digitHeight": 21, "digitSpacing": -4, "iconContentYOffsetPx": 0, "iconOverlapPx": -1, "digits": [VariableFxNumberDisplayMetadata.digit("0", 0, 16), VariableFxNumberDisplayMetadata.digit("1", 17, 13), VariableFxNumberDisplayMetadata.digit("2", 31, 16), VariableFxNumberDisplayMetadata.digit("3", 48, 16), VariableFxNumberDisplayMetadata.digit("4", 65, 16), VariableFxNumberDisplayMetadata.digit("5", 82, 16), VariableFxNumberDisplayMetadata.digit("6", 99, 16), VariableFxNumberDisplayMetadata.digit("7", 116, 16), VariableFxNumberDisplayMetadata.digit("8", 133, 16), VariableFxNumberDisplayMetadata.digit("9", 150, 16), VariableFxNumberDisplayMetadata.digit("-", 167, 16)], "colorRows": { "RED": 0, "GREEN": 22, "BLUE": 44, "YELLOW": 66, "WHITE": 88 } };
    }

    private static digit(param1: string, param2: number, param3: number): any {
        return { "sourceX": param2, "value": param1, "width": param3 };
    }
}
