import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CommunityGoalData } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalData';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import type { IRunningNumberWidget } from '@/com/sulake/habbo/window/widgets/IRunningNumberWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CommunityGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { GetCommunityGoalProgressMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetCommunityGoalProgressMessageComposer';
import { IDisableAwareElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IDisableAwareElement';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { IFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';
import { ILayoutNameProvider } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/ILayoutNameProvider';
import { isIRunningNumberWidget } from '@/com/sulake/habbo/window/widgets/IRunningNumberWidget';

export class CommunityGoalScoreCounterElementHandler implements IElementHandler, IDisposable, IFloatingElement, ILayoutNameProvider, IDisableAwareElement {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::CommunityGoalScoreCounterElementHandler'); }

    declare private _landingView: HabboLandingView;

    declare private _window: IWindowContainer;

    declare private _SafeStr_5529: boolean;
    static { (this.prototype as any)._SafeStr_5529 = false; }

    declare private _SafeStr_3267: Timer;

    declare private _SafeStr_4886: boolean;
    static { (this.prototype as any)._SafeStr_4886 = false; }

    constructor() {
    }

    public dispose(): void {
        if (this._landingView) {
            this._landingView.communicationManager.removeHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
            this._landingView = null;
        }
        if (this._SafeStr_3267) {
            this._SafeStr_3267.stop();
            this._SafeStr_3267.removeEventListener("timer", this.onPollTimer);
            this._SafeStr_3267 = null;
        }
        this._window = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._landingView = param1;
        this._window = castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc7_: number = param3[1] | 0;
        let _loc6_: number = param3[2] | 0;
        let _loc8_: number = param3[3] | 0;
        this._SafeStr_5529 = param3[4] == "true";
        let _loc5_: IWidgetWindow = castGuarded(this._window.findChildByName("running_number_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc9_: IRunningNumberWidget = castGuarded(_loc5_.widget, isIRunningNumberWidget, "com.sulake.habbo.window.widgets.IRunningNumberWidget");
        _loc9_.digits = _loc7_ >>> 0;
        _loc9_.updateFrequency = _loc6_;
        if (this._SafeStr_5529) {
            this._window.x = param3[5] | 0;
            this._window.y = param3[6] | 0;
        }
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
        this._SafeStr_3267 = new Timer(_loc8_);
        this._SafeStr_3267.addEventListener("timer", this.onPollTimer);
    }

    public disable(): void {
        this._SafeStr_3267.stop();
    }

    public refresh(): void {
        this._landingView.send(new GetCommunityGoalProgressMessageComposer());
        this._SafeStr_4886 = false;
        this._SafeStr_3267.start();
    }

    public isFloating(param1: boolean): boolean {
        return this._SafeStr_5529;
    }

    public get layoutName(): string {
        return "element_community_goal_score";
    }

    private onCommunityGoalProgress = (param1: CommunityGoalProgressMessageEvent): void => {
        let _loc4_: CommunityGoalData = null;
        let _loc2_: IWidgetWindow = null;
        let _loc3_: IRunningNumberWidget = null;
        if (this._landingView) {
            _loc4_ = param1.getParser().data;
            _loc2_ = castGuarded(this._window.findChildByName("running_number_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc3_ = castGuarded(_loc2_.widget, isIRunningNumberWidget, "com.sulake.habbo.window.widgets.IRunningNumberWidget");
            if (this._SafeStr_4886) {
                _loc3_.number = _loc4_.communityTotalScore;
            } else {
                _loc3_.initialNumber = _loc4_.communityTotalScore;
                this._SafeStr_4886 = true;
            }
        }
    };

    private onPollTimer = (param1: TimerEvent): void => {
        this._landingView.send(new GetCommunityGoalProgressMessageComposer());
    };

    get [IElementHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IFloatingElement](): true {
        return true;
    }

    get [ILayoutNameProvider](): true {
        return true;
    }

    get [IDisableAwareElement](): true {
        return true;
    }
}
