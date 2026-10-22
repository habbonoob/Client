import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { PendingGuideTicket } from '@/com/sulake/habbo/communication/messages/parser/help/data/PendingGuideTicket';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { ChatReviewReporterFeedbackCtrl } from '@/com/sulake/habbo/help/ChatReviewReporterFeedbackCtrl';
import { GuideSessionController } from '@/com/sulake/habbo/help/guidehelp/GuideSessionController';
import { HelpController } from '@/com/sulake/habbo/help/guidehelp/HelpController';

export class GuideHelpManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::GuideHelpManager'); }

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._SafeStr_3831 = new HelpController(this);
        this._SafeStr_3550 = new GuideSessionController(this);
        this._SafeStr_3932 = new ChatReviewReporterFeedbackCtrl(this._habboHelp);
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
    }

    declare private _SafeStr_3831: HelpController;

    declare private _SafeStr_3550: GuideSessionController;

    declare private _SafeStr_3932: ChatReviewReporterFeedbackCtrl;

    declare private _SafeStr_6636: boolean;
    static { (this.prototype as any)._SafeStr_6636 = false; }

    declare private _SafeStr_8009: number;
    static { (this.prototype as any)._SafeStr_8009 = 0; }

    declare private _panicRoomName: string;

    declare private _SafeStr_3636: Timer;

    declare private _habboHelp: HabboHelp;

    public get habboHelp(): HabboHelp {
        return this._habboHelp;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public openTourPopup(): void {
        this._SafeStr_3831.openTourPopup();
        this._SafeStr_6636 = true;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_3831) {
            this._SafeStr_3831.dispose();
            this._SafeStr_3831 = null;
        }
        if (this._SafeStr_3550) {
            this._SafeStr_3550.dispose();
            this._SafeStr_3550 = null;
        }
        if (this._SafeStr_3932) {
            this._SafeStr_3932.dispose();
            this._SafeStr_3932 = null;
        }
        if (this._SafeStr_3636) {
            this._SafeStr_3636.reset();
            this._SafeStr_3636 = null;
        }
        this._disposed = true;
    }

    public showGuideTool(): void {
        this._SafeStr_3550.showGuideTool();
    }

    public showPendingTicket(param1: PendingGuideTicket): void {
        this._SafeStr_3831.showPendingTicket(param1);
    }

    public createHelpRequest(param1: number): void {
        this._SafeStr_3550.createHelpRequest(param1);
    }

    public openReportWindow(): void {
        this._SafeStr_3550.openReportWindow();
    }

    public showFeedback(param1: string): void {
        this._SafeStr_3932.show(param1);
    }

    private onRoomEnter = (param1: IMessageEvent): void => {
        if (this._habboHelp.newUserTourEnabled && this._habboHelp.newIdentity && !this._SafeStr_6636 && !this._habboHelp.sessionDataManager.isRealNoob) {
            this._SafeStr_3636 = new Timer(this.getTourPopupDelay(), 1);
            this._SafeStr_3636.addEventListener("timer", this.onTourPopup);
            this._SafeStr_3636.start();
            this._habboHelp.tracking.trackEventLog("Help", "", "tour.new_user.create", "", this.getTourPopupDelay());
            this._habboHelp.trackGoogle("newbieTourWindow", "timer_popupCreated");
        }
    };

    private getTourPopupDelay(): number {
        return this._habboHelp.getInteger("guide.help.new.user.tour.popup.delay", 30) * 1000;
    }

    public onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            switch (param1.iconId) {
                case "HTIE_ICON_HELP":
                    this._habboHelp.toggleNewHelpWindow();
                    break;
                case "HTIE_ICON_GUIDE":
                    this.showGuideTool();
            }
        }
    }

    private onTourPopup = (param1: TimerEvent): void => {
        if (this._disposed) {
            return;
        }
        this._habboHelp.tracking.trackEventLog("Help", "", "tour.new_user.show", "", this.getTourPopupDelay());
        this._habboHelp.trackGoogle("newbieTourWindow", "timer_popupShown");
        this.openTourPopup();
    };

    get [IDisposable](): true {
        return true;
    }
}
