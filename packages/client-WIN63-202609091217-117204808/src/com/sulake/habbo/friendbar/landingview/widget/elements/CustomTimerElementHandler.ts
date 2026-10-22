import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { SecondsUntilMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/SecondsUntilMessageEvent';
import { GetSecondsUntilMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetSecondsUntilMessageComposer';
import { AbstractTimerElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractTimerElementHandler';

export class CustomTimerElementHandler extends AbstractTimerElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::CustomTimerElementHandler'); }

    declare private _timeStr: string;

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._timeStr = stringOrNull(param3[6]);
        param1.communicationManager.addHabboConnectionMessageEvent(new SecondsUntilMessageEvent(this.onTime));
    }

    public override refresh(): void {
        this.landingView.send(new GetSecondsUntilMessageComposer(this._timeStr));
    }

    private onTime = (param1: SecondsUntilMessageEvent): void => {
        if (param1.getParser().timeStr == this._timeStr) {
            this.setTimer(param1.getParser().secondsUntil);
        }
    };
}
