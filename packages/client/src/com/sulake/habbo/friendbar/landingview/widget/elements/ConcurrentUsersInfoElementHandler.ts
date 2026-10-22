import { asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ConcurrentUsersGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/ConcurrentUsersGoalProgressMessageEvent';
import { GetConcurrentUsersGoalProgressMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetConcurrentUsersGoalProgressMessageComposer';
import { GetConcurrentUsersRewardMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetConcurrentUsersRewardMessageComposer';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { TextElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/TextElementHandler';

export class ConcurrentUsersInfoElementHandler implements IElementHandler, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::ConcurrentUsersInfoElementHandler'); }

    private static readonly STATE_DISABLED: number = 0;
    private static readonly STATE_ACTIVE: number = 1;
    private static readonly STATE_REDEEM: number = 2;
    private static readonly STATE_REWARDED: number = 3;
    private static readonly UPDATE_INTERVAL_MS: number = 5000;

    constructor() {
        this._SafeStr_2342 = new Timer(5000);
        this._SafeStr_2342.addEventListener("timer", this.onUpdateTimer);
    }

    declare private _landingView: HabboLandingView;

    declare private _widget: GenericWidget;

    declare private _localizationKey: string;

    private _state: number = -1;
    private _userCount: number = -1;
    private _userCountGoal: number = -1;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2342: Timer;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
        this._SafeStr_2342 = null;
        this._disposed = true;
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._widget = param4;
        this._landingView = param1;
        this._window = isIWindowContainer(param2) ? param2 : null;
        this._localizationKey = stringOrNull(param3[1]);
        this._window.findChildByName("users_desc").caption = "${" + this._localizationKey + "}";
        let _loc5_: IStaticBitmapWrapperWindow = castGuarded(this._window.findChildByName("badge_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc6_: string = stringOrNull(param3.length > 2 ? param3[2] : "ConcurrentUsersReward");
        let _loc7_: string = "${image.library.url}album1584/" + _loc6_ + ".png";
        _loc5_.assetUri = _loc7_;
        this.updateLocalization();
        param2.procedure = this.onButton;
        param1.communicationManager.addHabboConnectionMessageEvent(new ConcurrentUsersGoalProgressMessageEvent(this.onConcurrentUsersGoalProgress));
        this._SafeStr_2342.start();
    }

    public refresh(): void {
        this._landingView.send(new GetConcurrentUsersGoalProgressMessageComposer());
    }

    protected onClick(): void {
        this._landingView.send(new GetConcurrentUsersRewardMessageComposer());
        this._landingView.send(new GetConcurrentUsersGoalProgressMessageComposer());
        this._window.findChildByName("state.active").disable();
    }

    private updateLocalization(): void {
        let _loc4_: string = "landing.view.concurrentusers.caption";
        let _loc3_: string = "landing.view.concurrentusers.bodytext";
        this._landingView.windowManager.registerLocalizationParameter(this._localizationKey, "userCount", this._userCount.toString());
        this._landingView.windowManager.registerLocalizationParameter(this._localizationKey, "userGoal", this._userCountGoal.toString());
        this._landingView.windowManager.registerLocalizationParameter("landing.view.concurrentusers.bodytext", "userCount", this._userCount.toString());
        this._landingView.windowManager.registerLocalizationParameter("landing.view.concurrentusers.bodytext", "userGoal", this._userCountGoal.toString());
        this._landingView.windowManager.registerLocalizationParameter("landing.view.concurrentusers.bodytext", "domain", this._landingView.localizationManager.getLocalization("landing.view.hotel.domain", "Habbo"));
        switch (this._state) {
            case 0:
                this._window.findChildByName("state.active").visible = true;
                this._window.findChildByName("state.achieved").visible = false;
                break;
            case 1:
                this._window.findChildByName("state.active").visible = true;
                this._window.findChildByName("state.achieved").visible = false;
                break;
            case 2:
                if (this._SafeStr_2342) {
                    this._SafeStr_2342.stop();
                }
                _loc4_ += ".success";
                _loc3_ += ".success";
                this._window.findChildByName("state.active").visible = false;
                this._window.findChildByName("state.active").enable();
                this._window.findChildByName("state.achieved").visible = true;
                this._window.findChildByName("action_button").visible = true;
                break;
            case 3:
                if (this._SafeStr_2342) {
                    this._SafeStr_2342.stop();
                }
                _loc4_ += ".success";
                _loc3_ += ".success";
                this._window.findChildByName("state.active").visible = false;
                this._window.findChildByName("state.achieved").visible = true;
                this._window.findChildByName("action_button").visible = false;
        }
        let _loc1_: TextElementHandler = asInstanceOf(this._widget.getElementByName("bodytext"), TextElementHandler);
        if (_loc1_) {
            _loc1_.localizationKey = _loc3_;
        }
        let _loc2_: TextElementHandler = asInstanceOf(this._widget.getElementByName("caption"), TextElementHandler);
        if (_loc2_) {
            _loc2_.localizationKey = _loc4_;
        }
    }

    private onConcurrentUsersGoalProgress = (param1: ConcurrentUsersGoalProgressMessageEvent): void => {
        this._state = param1.getParser().state;
        this._userCount = param1.getParser().userCount;
        this._userCountGoal = param1.getParser().userCountGoal;
        this.updateLocalization();
    };

    private onButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.onClick();
        }
    };

    private onUpdateTimer = (param1: TimerEvent): void => {
        if (this._window == null || this._window.visible == false || !this._landingView.isLandingViewVisible) {
            return;
        }
        this.refresh();
    };

    get [IElementHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
