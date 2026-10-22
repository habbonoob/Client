import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';

export class HabboAlertDialogManager {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::HabboAlertDialogManager'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _habboHelp: IHabboHelp;

    constructor(param1: IHabboWindowManager, param2: IHabboLocalizationManager, param3: IHabboHelp) {
        this._windowManager = param1;
        this._localization = param2;
        this._habboHelp = param3;
    }

    private static getTimeZeroPadded(param1: number): string {
        let _loc2_: string = "0" + String(param1);
        return _loc2_.substr(_loc2_.length - 2, _loc2_.length);
    }

    public dispose(): void {
        this._windowManager = null;
        this._localization = null;
        this._habboHelp = null;
    }

    public handleModeratorCaution(param1: string, param2: string = ""): void {
        this.showModerationMessage(param1, param2);
    }

    public handleModeratorMessage(param1: string, param2: string = ""): void {
        this.showModerationMessage(param1, param2, false);
    }

    public handleUserBannedMessage(param1: string): void {
        this.showModerationMessage(param1, "");
    }

    private showModerationMessage(param1: string, param2: string, param3: boolean = true): void {
        let message: string = param1;
        let url: string = param2;
        let showHabboWay: boolean = param3;
        let p: RegExp = /\\r/g;
        message = message.replace(p, "\r");
        this._windowManager.simpleAlert("", "${mod.alert.title}", message, "${mod.alert.link}", url, null, "illumina_alert_illustrations_frank_neutral_png", null, (): void => {
             if (this._habboHelp != null && showHabboWay) {
                 this._habboHelp.showHabboWay();
             }
         });
    }

    public handleHotelClosingMessage(param1: number): void {
        this._localization.registerParameter("opening.hours.shutdown", "m", String(param1));
        this._windowManager.simpleAlert("", "${opening.hours.title}", "${opening.hours.shutdown}");
    }

    public handleHotelMaintenanceMessage(param1: number, param2: number): void {
        this._localization.registerParameter("maintenance.shutdown", "m", String(param1));
        this._localization.registerParameter("maintenance.shutdown", "d", String(param2));
        this._windowManager.simpleAlert("", "${opening.hours.title}", "${maintenance.shutdown}");
    }

    public handleHotelClosedMessage(param1: number, param2: number, param3: boolean): void {
        let openHour: number = param1;
        let openMinute: number = param2;
        let userThrownOutAtClose: boolean = param3;
        if (userThrownOutAtClose) {
            this._localization.registerParameter("opening.hours.disconnected", "h", HabboAlertDialogManager.getTimeZeroPadded(openHour));
            this._localization.registerParameter("opening.hours.disconnected", "m", HabboAlertDialogManager.getTimeZeroPadded(openMinute));
            this._windowManager.alert("${opening.hours.title}", "${opening.hours.disconnected}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        } else {
            this._localization.registerParameter("opening.hours.closed", "h", HabboAlertDialogManager.getTimeZeroPadded(openHour));
            this._localization.registerParameter("opening.hours.closed", "m", HabboAlertDialogManager.getTimeZeroPadded(openMinute));
            this._windowManager.alert("${opening.hours.title}", "${opening.hours.closed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        }
    }

    public handleLoginFailedHotelClosedMessage(param1: number, param2: number): void {
        let openHour: number = param1;
        let openMinute: number = param2;
        this._localization.registerParameter("opening.hours.disconnected", "h", HabboAlertDialogManager.getTimeZeroPadded(openHour));
        this._localization.registerParameter("opening.hours.disconnected", "m", HabboAlertDialogManager.getTimeZeroPadded(openMinute));
        this._windowManager.alert("${opening.hours.title}", "${opening.hours.disconnected}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         });
    }

    public handleBanInfoMessage(param1: string, param2: number, param3: string): void {
        let dateText: string;
        let reason: string = param1;
        let expiryDateSeconds: number = param2;
        let localizedReason: string = param3;
        let getDescriptionText: any = (): string => {
             if (localizedReason != null && localizedReason != "") {
                 return localizedReason.replace("{expiryDate}", dateText);
             }
             let _loc2_: string = this._localization.getLocalization("login.banned.until");
             let _loc1_: string = this._localization.getLocalization("login.banned.reason");
             return "<b>" + _loc2_ + "</b><br>" + dateText + "<br><b>" + _loc1_ + "</b><br>" + reason;
         };
        let banExpiryDate: Date = new Date();
        banExpiryDate.setTime(banExpiryDate.getTime() + expiryDateSeconds * 1000);
        dateText = expiryDateSeconds > -1 ? banExpiryDate.toLocaleString() : "";
        this._windowManager.simpleAlert("", "", stringOrNull(getDescriptionText()));
    }
}
