import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PendingGuideTicket } from '@/com/sulake/habbo/communication/messages/parser/help/data/PendingGuideTicket';
import type { GuideHelpManager } from '@/com/sulake/habbo/help/GuideHelpManager';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIUpdatingTimeStampWidget } from '@/com/sulake/habbo/window/widgets/IUpdatingTimeStampWidget';

export class HelpController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help.guidehelp::HelpController'); }

    constructor(param1: GuideHelpManager) {
        this._habboHelp = param1.habboHelp;
        this._guideHelp = param1;
    }

    declare private _habboHelp: HabboHelp;

    declare private _guideHelp: GuideHelpManager;

    declare private _SafeStr_2711: IModalDialog;

    declare private _tourPopup: IWindowContainer;

    declare private _tourPopupShowTime: number;
    static { (this.prototype as any)._tourPopupShowTime = 0; }

    declare private _SafeStr_2651: IWindowContainer;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.closeWindow();
        this.closeTourPopup();
        this._habboHelp = null;
        this._guideHelp = null;
        this._disposed = true;
    }

    public closeWindow(): void {
        if (this._SafeStr_2711 != null) {
            this._SafeStr_2711.dispose();
            this._SafeStr_2711 = null;
        }
    }

    public openTourPopup(): void {
        if (this._tourPopup == null && !this.disposed) {
            this._tourPopupShowTime = getTimer();
            this._tourPopup = asGuarded(this._guideHelp.habboHelp.getXmlWindow("welcome_tour_popup"), isIWindowContainer);
            this._tourPopup.center();
            this._tourPopup.y *= 0.25;
            this._tourPopup.procedure = this.tourPopupEventProcedure;
        }
    }

    public showPendingTicket(param1: PendingGuideTicket): void {
        let _loc2_: string = null;
        if (param1.isGuide) {
            _loc2_ = "pending_guide_session";
        } else {
            switch (param1.type) {
                case 0:
                case 2:
                    _loc2_ = "pending_tour_request";
                    break;
                case 1:
                    _loc2_ = "pending_instructions_request";
                    break;
                case 3:
                    _loc2_ = "pending_bully_request";
                    break;
                default:
                    return;
            }
        }
        this._SafeStr_2651 = asGuarded(this._habboHelp.getXmlWindow(_loc2_), isIWindowContainer);
        this._SafeStr_2651.center();
        this._SafeStr_2651.procedure = this.onPendingReuqestEvent;
        if (param1.isGuide) {
            return;
        }
        switch (param1.type - 1) {
            case 0:
                this._SafeStr_2651.findChildByName("description").caption = param1.description;
                castGuarded(castGuarded(this._SafeStr_2651.findChildByName("timestamp"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIUpdatingTimeStampWidget, "com.sulake.habbo.window.widgets.IUpdatingTimeStampWidget").timeStamp = new Date().getTime() - param1.secondsAgo * 1000;
                break;
            case 2:
                this._SafeStr_2651.findChildByName("user_name").caption = param1.otherPartyName;
                castGuarded(castGuarded(this._SafeStr_2651.findChildByName("user_avatar"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = param1.otherPartyFigure;
                castGuarded(castGuarded(this._SafeStr_2651.findChildByName("timestamp"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIUpdatingTimeStampWidget, "com.sulake.habbo.window.widgets.IUpdatingTimeStampWidget").timeStamp = new Date().getTime() - param1.secondsAgo * 1000;
                this._habboHelp.localization.registerParameter("guide.pending.bully.room", "room", param1.roomName);
        }
    }

    private openWindow(): void {
        if (this._SafeStr_2711 == null && !this.disposed) {
            this._SafeStr_2711 = this._guideHelp.habboHelp.getModalXmlWindow("main_help");
            this._SafeStr_2711.rootWindow.procedure = this.windowEventProcedure;
        }
    }

    private windowEventProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ICheckBoxWindow = null;
        if (this.disposed || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.closeWindow();
                break;
            case "tour_button":
                this._guideHelp.createHelpRequest((this._habboHelp.newIdentity ? 0 : 2) >>> 0);
                this._habboHelp.trackGoogle("helpWindow", "click_userTour");
                this.closeWindow();
                break;
            case "bully_button":
                this.closeWindow();
                this._habboHelp.toggleNewHelpWindow();
                this._habboHelp.trackGoogle("helpWindow", "click_reportBully");
                break;
            case "instructions_button":
                this._guideHelp.createHelpRequest(1);
                this._habboHelp.trackGoogle("helpWindow", "click_instructions");
                this.closeWindow();
                break;
            case "self_help_link":
                HabboWebTools.openWebPage(this._habboHelp.getProperty("zendesk.url"), "habboMain");
                this._habboHelp.trackGoogle("helpWindow", "click_selfHelp");
                this.closeWindow();
                break;
            case "habboway_link":
                if (this._habboHelp.getBoolean("habboway.enabled")) {
                    this._habboHelp.showHabboWay();
                } else {
                    HabboWebTools.openWebPage(this._habboHelp.getProperty("habboway.url"), "habboMain");
                }
                this._habboHelp.trackGoogle("helpWindow", "click_habboWay");
                this.closeWindow();
                break;
            case "safetybooklet_link":
                this._habboHelp.showSafetyBooklet();
                this._habboHelp.trackGoogle("helpWindow", "click_showSafetyBooklet");
                this.closeWindow();
                break;
            case "emergency_button":
                _loc3_ = asGuarded(castGuarded(this._SafeStr_2711.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("leave_room"), isICheckBoxWindow);
                if (_loc3_ != null && Boolean(_loc3_.isSelected)) {
                    this._habboHelp.sendMessage(new QuitMessageComposer());
                }
                this.closeWindow();
                this._habboHelp.startEmergencyRequest();
                this._habboHelp.trackGoogle("helpWindow", "click_emergency");
        }
    };

    private closeTourPopup(): void {
        if (this._tourPopup != null) {
            this._tourPopup.dispose();
            this._tourPopup = null;
        }
    }

    private tourPopupEventProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (this.disposed || param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = (this._tourPopupShowTime - getTimer()) / 1000 | 0;
        switch (param2.name) {
            case "refuse_tour":
                this._habboHelp.tracking.trackEventLog("Help", "", "tour.new_user.cancel", "", _loc3_);
                this._habboHelp.trackGoogle("newbieTourWindow", "click_refuseTour");
                this.closeTourPopup();
                break;
            case "header_button_close":
                this._habboHelp.tracking.trackEventLog("Help", "", "tour.new_user.dismiss", "", _loc3_);
                this._habboHelp.trackGoogle("newbieTourWindow", "click_closeWindow");
                this.closeTourPopup();
                break;
            case "take_tour":
                this._guideHelp.createHelpRequest(0);
                this._habboHelp.tracking.trackEventLog("Help", "", "tour.new_user.accept", "", _loc3_);
                this._habboHelp.trackGoogle("newbieTourWindow", "click_acceptTour");
                this.closeTourPopup();
        }
    };

    private onPendingReuqestEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "header_button_close":
                case "close_button":
                    if (this._SafeStr_2651 != null && !this._SafeStr_2651.disposed) {
                        this._SafeStr_2651.dispose();
                        this._SafeStr_2651 = null;
                    }
            }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
