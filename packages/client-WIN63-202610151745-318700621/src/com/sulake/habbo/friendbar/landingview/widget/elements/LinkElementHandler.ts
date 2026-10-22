import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class LinkElementHandler implements IElementHandler, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::LinkElementHandler'); }

    declare private _landingView: HabboLandingView;

    declare private _SafeStr_2991: string;

    constructor() {
    }

    public dispose(): void {
        this._landingView = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._landingView = param1;
        let _loc5_: string = stringOrNull(param3[1]);
        this._SafeStr_2991 = stringOrNull(param3[2]);
        param2.procedure = this.onLink;
        castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("link_txt").caption = "${" + _loc5_ + "}";
    }

    private onLink = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, null);
            HabboWebTools.openWebPage(this._SafeStr_2991);
            this._landingView.tracking.trackGoogle("landingView", "click_link");
        }
    };

    public refresh(): void {
    }

    get [IElementHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
