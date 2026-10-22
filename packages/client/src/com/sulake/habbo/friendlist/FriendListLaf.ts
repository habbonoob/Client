import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FriendListLaf {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendListLaf'); }

    public getSelectedEntryBgColor(): number {
        return 4290306812;
    }

    public getFriendTextColor(param1: boolean): number {
        return 4278190080;
    }

    public getTabFooterTextColor(param1: boolean): number {
        return param1 ? 4293848814 : 4289900703;
    }

    public getRowShadingColor(param1: number, param2: boolean): number {
        if (param1 == 1) {
            return param2 ? 4294967295 : 4293848814;
        }
        if (param1 == 2) {
            return param2 ? 4294967295 : 4293848814;
        }
        return param2 ? 4290164406 : 4288651167;
    }

    public getTabTextColor(param1: boolean, param2: number): number {
        if (param1) {
            return 4294967295;
        }
        if (param2 == 1) {
            return 4278190080;
        }
        if (param2 == 2) {
            return 4294375158;
        }
        return 4293914607;
    }

    public getTabBgColor(param1: number): number {
        if (param1 == 1) {
            return 4294967295;
        }
        if (param1 == 2) {
            return 4294967295;
        }
        return 4290164406;
    }
}
