import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { IsBadgeRequestFulfilledEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/IsBadgeRequestFulfilledEvent';
import { WiredRewardResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredRewardResultMessageEvent';
import { GetIsBadgeRequestFulfilledComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/GetIsBadgeRequestFulfilledComposer';
import { IFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class RequestBadgeButtonElementHandler extends AbstractButtonElementHandler implements IFloatingElement {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::RequestBadgeButtonElementHandler'); }

    declare private _badgeRequestCode: string;

    private _SafeStr_5958: boolean = true;

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._badgeRequestCode = stringOrNull(param3[2]);
        param2.x = param3[3] | 0;
        param2.y = param3[4] | 0;
        if (param3.length > 5) {
            this._SafeStr_5958 = param3[5] == "true";
        }
        param1.communicationManager.addHabboConnectionMessageEvent(new IsBadgeRequestFulfilledEvent(this.onInfo));
        param1.communicationManager.addHabboConnectionMessageEvent(new WiredRewardResultMessageEvent(this.onReward));
    }

    protected override onClick(): void {
        this.landingView.requestBadge(this._badgeRequestCode);
        this.landingView.tracking.trackGoogle("landingView", "click_requestbadge_" + this._badgeRequestCode);
    }

    public override refresh(): void {
        super.refresh();
        this.landingView.send(new GetIsBadgeRequestFulfilledComposer(this._badgeRequestCode));
    }

    public isFloating(param1: boolean): boolean {
        return this._SafeStr_5958;
    }

    private onInfo = (param1: IsBadgeRequestFulfilledEvent): void => {
        if (param1.getParser().requestCode == this._badgeRequestCode) {
            this.window.visible = !param1.getParser().fulfilled;
        }
    };

    private onReward = (param1: WiredRewardResultMessageEvent): void => {
        if (this.window) {
            this.landingView.send(new GetIsBadgeRequestFulfilledComposer(this._badgeRequestCode));
        }
    };

    get [IFloatingElement](): true {
        return true;
    }
}
