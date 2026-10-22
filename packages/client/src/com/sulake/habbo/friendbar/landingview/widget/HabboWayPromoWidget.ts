import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CommunityGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { GetCommunityGoalProgressMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetCommunityGoalProgressMessageComposer';

export class HabboWayPromoWidget implements ILandingViewWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::HabboWayPromoWidget'); }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    declare private _SafeStr_7177: number;
    static { (this.prototype as any)._SafeStr_7177 = 0; }

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
        this._container = castGuarded(this._landingView.getXmlWindow("habbo_way_promo"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.findChildByName("go_button").procedure = this.onGoButton;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
    }

    public refresh(): void {
        this._landingView.send(new GetCommunityGoalProgressMessageComposer());
        this.refreshContent();
    }

    private onGoButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.habboHelp.showHabboWay();
        }
    };

    private onCommunityGoalProgress = (param1: CommunityGoalProgressMessageEvent): void => {
        this._SafeStr_7177 = param1.getParser().data.communityTotalScore;
        this.refreshContent();
    };

    private refreshContent(): void {
        let _loc1_: string = "" + this._SafeStr_7177;
        while (_loc1_.length < 8) {
            _loc1_ = "0" + _loc1_;
        }
        this._container.findChildByName("counter_txt").caption = _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}
