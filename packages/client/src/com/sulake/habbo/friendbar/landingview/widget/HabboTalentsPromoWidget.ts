import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';

export class HabboTalentsPromoWidget implements ILandingViewWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::HabboTalentsPromoWidget'); }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    public get container(): IWindow {
        return this._container;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("habbo_talents_promo"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.findChildByName("go_button").procedure = this.onGoButton;
        HabboLandingView.positionAfterAndStretch(this._container, "title_txt", "hdr_line");
    }

    public refresh(): void {
    }

    private onGoButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.tracking.trackTalentTrackOpen(this._landingView.sessionDataManager.currentTalentTrack, "landingpagepromo");
            this._landingView.send(new GetTalentTrackMessageComposer(this._landingView.sessionDataManager.currentTalentTrack));
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
