import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { GuideTicketCreationResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideTicketCreationResultMessageEvent';
import { GuideTicketResolutionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/GuideTicketResolutionMessageEvent';

export class ChatReviewReporterFeedbackCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::ChatReviewReporterFeedbackCtrl'); }

    declare private _habboHelp: HabboHelp;

    declare private _window: IFrameWindow;

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideTicketResolutionMessageEvent(this.onTicketResolved));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new GuideTicketCreationResultMessageEvent(this.onCreateResult));
    }

    public dispose(): void {
        this._habboHelp = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._habboHelp == null;
    }

    private onTicketResolved = (param1: GuideTicketResolutionMessageEvent): void => {
        this.show(param1.getParser().localizationCode);
    };

    private onCreateResult = (param1: GuideTicketCreationResultMessageEvent): void => {
        this.show(param1.getParser().localizationCode);
    };

    public show(param1: string): void {
        if (!this.enabled) {
            return;
        }
        this.prepare();
        this.setText("caption_txt", param1, "caption");
        this.setText("body_txt", param1, "body");
        this.setText("note_txt", param1, "note");
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("caption_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        this._window.findChildByName("body_txt").y = _loc2_.y + _loc2_.textHeight + 5 | 0;
        this._window.visible = true;
    }

    private setText(param1: string, param2: string, param3: string): void {
        let _loc4_: string = "guide.bully.request.reporter." + param2 + "." + param3;
        if (this._habboHelp.localization.getLocalization(_loc4_, "") == "") {
            _loc4_ = "guide.bully.request.reporter." + param3;
        }
        this._window.findChildByName(param1).caption = "${" + _loc4_ + "}";
    }

    private prepare(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._habboHelp.getXmlWindow("chat_review_reporter_feedback"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.procedure = this.windowProcedure;
        this._window.center();
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK" || this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        if (param2.name == "close_button" || param2.name == "header_button_close") {
            this._window.visible = false;
        }
    };

    private get enabled(): boolean {
        return this._habboHelp.getBoolean("chatreviewreporterfeedbackctrl.enabled");
    }

    get [IDisposable](): true {
        return true;
    }
}
