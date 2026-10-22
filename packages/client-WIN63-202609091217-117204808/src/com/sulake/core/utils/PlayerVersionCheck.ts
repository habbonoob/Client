import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';

export class PlayerVersionCheck {
    static { registerClassName(this, 'com.sulake.core.utils::PlayerVersionCheck'); }

    private static _majorVersion: number = 0;
    private static _SafeStr_7094: number = 0;
    private static _SafeStr_6341: boolean = false;

    constructor() {
    }

    public static isVersionAtLeast(param1: number, param2: number): boolean {
        if (param1 < PlayerVersionCheck.majorVersion) {
            return true;
        }
        if (param1 == PlayerVersionCheck.majorVersion && param2 <= PlayerVersionCheck.minorVersion) {
            return true;
        }
        return false;
    }

    public static get majorVersion(): number {
        PlayerVersionCheck.parseVersion();
        return PlayerVersionCheck._majorVersion;
    }

    public static get minorVersion(): number {
        PlayerVersionCheck.parseVersion();
        return PlayerVersionCheck._SafeStr_7094;
    }

    private static parseVersion(): void {
        if (PlayerVersionCheck._SafeStr_6341) {
            return;
        }
        let _loc2_: any[] = Capabilities.version.split(" ");
        let _loc3_: any[] = _loc2_[1].split(",");
        let _loc1_: number = _loc3_.length | 0;
        PlayerVersionCheck._majorVersion = (_loc1_ >= 1 ? parseInt(stringOrNull(_loc3_[0])) : 0) | 0;
        PlayerVersionCheck._SafeStr_7094 = (_loc1_ >= 2 ? parseInt(stringOrNull(_loc3_[1])) : 0) | 0;
        PlayerVersionCheck._SafeStr_6341 = true;
    }
}
