import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { IsUserPartOfCompetitionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/IsUserPartOfCompetitionMessageEvent';
import { ForwardToASubmittableRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/ForwardToASubmittableRoomMessageComposer';
import { GetIsUserPartOfCompetitionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetIsUserPartOfCompetitionMessageComposer';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class SubmitCompetitionRoomElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::SubmitCompetitionRoomElementHandler'); }

    declare private _submittedKey: string;

    declare private _goalCode: string;

    declare private _isPartOf: boolean;
    static { (this.prototype as any)._isPartOf = false; }

    declare private _targetId: number;
    static { (this.prototype as any)._targetId = 0; }

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._submittedKey = stringOrNull(param3[2]);
        this._goalCode = stringOrNull(param3[3]);
        param1.communicationManager.addHabboConnectionMessageEvent(new IsUserPartOfCompetitionMessageEvent(this.onInfo));
    }

    public override refresh(): void {
        super.refresh();
        this.landingView.send(new GetIsUserPartOfCompetitionMessageComposer(this._goalCode));
    }

    protected override onClick(): void {
        this.landingView.questEngine.reenableRoomCompetitionWindow();
        if (this._isPartOf) {
            this.landingView.navigator.goToPrivateRoom(this._targetId);
            this.landingView.tracking.trackGoogle("landingView", "click_submittedroom");
        } else {
            this.landingView.send(new ForwardToASubmittableRoomMessageComposer());
            this.landingView.tracking.trackGoogle("landingView", "click_startsubmit");
        }
    }

    private onInfo = (param1: IsUserPartOfCompetitionMessageEvent): void => {
        this._isPartOf = param1.getParser().isPartOf;
        this._targetId = param1.getParser().targetId;
        if (this._isPartOf) {
            this.window.caption = "${" + this._submittedKey + "}";
        }
    };
}
