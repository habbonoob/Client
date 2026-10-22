import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';

export class ImageElementHandler implements IElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::ImageElementHandler'); }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        let _loc5_: IStaticBitmapWrapperWindow = castGuarded(param2, isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc6_: string = "${image.library.url}" + param3[1];
        _loc5_.assetUri = _loc6_;
        _loc5_.x = param3[2] | 0;
    }

    public refresh(): void {
    }

    get [IElementHandler](): true {
        return true;
    }
}
