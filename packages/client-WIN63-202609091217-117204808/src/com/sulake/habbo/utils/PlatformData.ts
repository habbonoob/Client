import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { INativeApplicationProxy } from '@/com/sulake/habbo/utils/air/INativeApplicationProxy';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';

export class PlatformData {
    static { registerClassName(this, 'com.sulake.habbo.utils::PlatformData'); }

    public static readonly DEVICE_TYPE_PHONE: number = 0;
    public static readonly DEVICE_TYPE_TABLET: number = 1;
    public static readonly DEVICE_TYPE_DESKTOP: number = 2;
    public static readonly PLATFORM_DESKTOP: number = -1;
    public static readonly PLATFORM_ANDROID: number = 0;
    public static readonly PLATFORM_IOS: number = 1;
    private static readonly MAX_DYNAMIC_TEXTURE_DIMENSION_SD: number = 512;
    private static readonly MAX_DYNAMIC_TEXTURE_DIMENSION_HD: number = 2048;
    private static readonly ORIGINAL_DPI_IPHONE_RETINA: number = 326;
    private static readonly ORIGINAL_DPI_IPAD_RETINA: number = 264;
    private static _scale: number = NaN;
    private static _SafeStr_7648: number = NaN;
    private static _SafeStr_4439: number = -1;
    private static _SafeStr_3305: number = -1;
    private static _isLowMemoryDevice: boolean = false;
    private static _nativeApplicationProxy: INativeApplicationProxy;
    public static PHONE_SCALE_FACTOR: number = 0.65;

    constructor() {
    }

    public static init(): void {
        PlatformData.initOs();
        PlatformData.initScale();
        PlatformData.initDeviceType();
        PlatformData.initLowMem();
    }

    public static set nativeApplicationProxy(param1: INativeApplicationProxy) {
        PlatformData._nativeApplicationProxy = param1;
    }

    public static get nativeApplicationProxy(): INativeApplicationProxy {
        return PlatformData._nativeApplicationProxy;
    }

    public static get isDeviceHD(): boolean {
        if (Math.max(Capabilities.screenResolutionX, Capabilities.screenResolutionY) < 1600) {
            return false;
        }
        return PlatformData.scale > 0.75;
    }

    public static get isSmallScreenDevice(): boolean {
        return !PlatformData.isDeviceHD || PlatformData.isPhone();
    }

    public static get isWideScreenDevice(): boolean {
        return false;
    }

    public static get requiresWideMargins(): boolean {
        return PlatformData.isiPhoneX;
    }

    public static get isiPhoneX(): boolean {
        return false;
    }

    public static get isLowMemoryDevice(): boolean {
        return PlatformData._isLowMemoryDevice;
    }

    public static smartScaleFactor(): number {
        return PlatformData.isDeviceHD ? 2 : 1;
    }

    public static get scale(): number {
        return PlatformData._scale;
    }

    public static evenScale(param1: number): number {
        param1 = param1 * PlatformData.scale | 0;
        return (param1 | 1) - 1;
    }

    public static get maxDynamicTextureDimension(): number {
        return PlatformData.isLowMemoryDevice ? 512 : 2048;
    }

    public static isAndroid(): boolean {
        return PlatformData.platformId() == 0;
    }

    public static isIos(): boolean {
        return PlatformData.platformId() == 1;
    }

    public static isDesktop(): boolean {
        return PlatformData.platformId() == -1;
    }

    public static isPhone(): boolean {
        return PlatformData._SafeStr_4439 == 0;
    }

    public static platformId(): number {
        return PlatformData._SafeStr_3305;
    }

    public static platformString(): string {
        switch (PlatformData._SafeStr_3305 - -1) {
            case 0:
                return "desktop";
            case 1:
                return "android";
            case 2:
                return "ios";
            default:
                return "unknown";
        }
    }

    public static deviceType(): number {
        return PlatformData._SafeStr_4439;
    }

    private static initOs(): void {
        let _loc1_: string = Capabilities.version.toLowerCase();
        if (_loc1_.indexOf("and") > -1) {
            PlatformData._SafeStr_3305 = 0;
            return;
        }
        if (_loc1_.indexOf("ios") > -1) {
            PlatformData._SafeStr_3305 = 1;
            return;
        }
        PlatformData._SafeStr_3305 = -1;
    }

    public static initScale(): void {
    }

    private static initDeviceType(): void {
        let _loc1_: string = Capabilities.version.toLowerCase();
        if (_loc1_.indexOf("win") > -1 || _loc1_.indexOf("mac") > -1 || _loc1_.indexOf("lnx") > -1) {
            PlatformData._SafeStr_4439 = 2;
            return;
        }
        PlatformData._SafeStr_4439 = 0;
    }

    private static initLowMem(): void {
        let _loc1_: any[] = null;
        let _loc2_: string = null;
        if (PlatformData._SafeStr_3305 == 1) {
            _loc1_ = ["iPhone4,1", "iPad2,1", "iPad2,2", "iPad2,3", "iPad2,4", "iPad2,5", "iPad2,6", "iPad2,7", "iPod5,1"];
            _loc2_ = Capabilities.os;
            for (const _loc3_ of _loc1_ ?? []) {
                if (_loc2_.indexOf(stringOrNull(_loc3_)) != -1) {
                    PlatformData._isLowMemoryDevice = true;
                    return;
                }
            }
            PlatformData._isLowMemoryDevice = false;
        } else if (PlatformData._SafeStr_3305 != 0) {
        }
    }

    private static isLowMemProfile(param1: string): boolean {
        let _loc2_: any[] = ["baseline", "baselineConstrained"];
        return _loc2_.indexOf(param1) != -1;
    }

    public static isIOSSimulator(): boolean {
        return PlatformData.isIos() && Capabilities.os.indexOf("x86") != -1;
    }

    public static getDeviceStringForLogging(): string {
        let _loc1_: string = null;
        if (PlatformData.isAndroid()) {
            _loc1_ += "ANDROID";
        } else if (PlatformData.isIos()) {
            _loc1_ += "IOS";
        } else {
            _loc1_ += "FLASH";
        }
        _loc1_ += ".";
        if (PlatformData.isDesktop()) {
            _loc1_ += "UNKNOWN";
        } else if (PlatformData.isPhone()) {
            _loc1_ += "PHONE";
        } else {
            _loc1_ += "TABLET";
        }
        return _loc1_;
    }
}
