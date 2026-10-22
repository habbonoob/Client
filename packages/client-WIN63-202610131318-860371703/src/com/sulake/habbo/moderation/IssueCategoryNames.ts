import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class IssueCategoryNames {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueCategoryNames'); }

    private static _SafeStr_2259: IHabboLocalizationManager;

    constructor() {
    }

    public static setLocalizationManager(param1: IHabboLocalizationManager): void {
        IssueCategoryNames._SafeStr_2259 = param1;
    }

    public static getSourceName(param1: number): string {
        switch (param1 - 1) {
            case 0:
            case 1:
                return "Normal";
            case 2:
                return "Automatic";
            case 3:
                return "Automatic IM";
            case 4:
                return "Guide System";
            case 5:
                return "IM";
            case 6:
                return "Room";
            case 7:
                return "Panic";
            case 8:
                return "Guardian";
            case 9:
                return "Automatic Helper";
            case 10:
                return "Discussion";
            case 11:
                return "Selfie";
            case 13:
                return "Photo";
            case 14:
                return "Ambassador";
            default:
                return "Unknown";
        }
    }

    public static getCategoryName(param1: number): string {
        let _loc2_: string = null;
        if (IssueCategoryNames._SafeStr_2259 != null) {
            _loc2_ = IssueCategoryNames._SafeStr_2259.getLocalization("help.cfh.topic." + param1);
            if (!StringUtil.isEmpty(_loc2_)) {
                return _loc2_;
            }
        }
        switch (param1) {
            case 0:
                return "Automatic";
            case 101:
                return "Sex";
            case 102:
                return "PII";
            case 103:
                return "Scam";
            case 104:
                return "Bullying";
            case 105:
                return "Disruption";
            case 106:
                return "Other";
            case 111:
                return "Sex";
            case 112:
                return "Scam";
            case 113:
                return "Disruption";
            case 114:
                return "Other";
            case 121:
                return "Sex";
            case 122:
                return "PII";
            case 123:
                return "Bullying";
            case 124:
                return "Other";
            case 130:
                return "Hate";
            case 131:
                return "Violence";
            case 132:
                return "Sex";
            case 133:
                return "Illegal";
            case 134:
                return "PII";
            case 135:
                return "Copyright";
            case 136:
                return "Spam";
            case 1024:
                return "Guide";
            case 1025:
                return "Bullying";
            case 1026:
                return "Severe Alert";
            default:
                return "Unknown";
        }
    }
}
