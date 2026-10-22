import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BrowserInfo {
    static { registerClassName(this, 'com.sulake.core.utils::BrowserInfo'); }

    public static readonly _SafeStr_8517: string = "win";
    public static readonly MAC_PLATFORM: string = "mac";
    public static readonly SAFARI_AGENT: string = "safari";
    public static readonly _SafeStr_7961: string = "opera";
    public static readonly IE_AGENT: string = "msie";
    public static readonly MOZILLA_AGENT: string = "mozilla";
    public static readonly CHROME_AGENT: string = "chrome";
    private _platform: string = "undefined";
    private _browser: string = "undefined";
    private _version: string = "undefined";

    constructor(param1: any, param2: any, param3: string) {
        if (!param1 || !param2 || !param3) {
            return;
        }
        this._version = stringOrNull(param1.version);
        for (const _loc5_ of keysOf(param1)) {
            if (_loc5_ != "version") {
                if (param1[_loc5_] == true) {
                    this._browser = stringOrNull(_loc5_);
                    break;
                }
            }
        }
        for (const _loc4_ of keysOf(param2)) {
            if (param2[_loc4_] == true) {
                this._platform = stringOrNull(_loc4_);
            }
        }
    }

    public get platform(): string {
        return this._platform;
    }

    public get browser(): string {
        return this._browser;
    }

    public get version(): string {
        return this._version;
    }
}
