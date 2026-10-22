import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MyCfhReportStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/MyCfhReportStatusMessageEvent';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AppealCfhMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/AppealCfhMessageComposer';
import { CfhReportMessage } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhReportMessage';
import { MyCfhReportStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/MyCfhReportStatusMessageParser';
import { ReportStatusTableObject } from '@/com/sulake/habbo/help/MyReportStatus.group';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class MyReportStatus implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::MyReportStatus'); }

    public static COLUMN_REPORT_DATE: string = "report_date";
    public static COLUMN_REPORTED_ACCOUNT: string = "account";
    public static COLUMN_REASON: string = "reason";
    public static COLUMN_APPEAL_STATUS: string = "appeal_status";

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._SafeStr_4438 = new DateTimeFormatter("i-default");
        this._SafeStr_4438.setDateTimePattern("dd/MM/yyyy");
    }

    declare private _window: IWindowContainer;

    declare private _habboHelp: HabboHelp;

    declare private _SafeStr_2737: TableView;

    declare private _shownObject: ReportStatusTableObject;

    declare private _SafeStr_4077: boolean;
    static { (this.prototype as any)._SafeStr_4077 = false; }

    declare private _SafeStr_2356: IBubbleWindow;

    declare private _SafeStr_4438: DateTimeFormatter;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private get reportsTableContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("reports_table_cont"), isIWindowContainer);
    }

    private get reportedDateText(): ITextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("reported_date_txt"), isITextWindow);
    }

    private get decisionDateText(): ITextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("decision_date_txt"), isITextWindow);
    }

    private get createdKeyText(): ITextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("created_key_txt"), isITextWindow);
    }

    private get actionText(): ITextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("action_txt"), isITextWindow);
    }

    private get actionDescText(): ITextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("action_desc_txt"), isITextWindow);
    }

    private get appealButton(): IButtonWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("appeal_button"), isIButtonWindow);
    }

    private get sanctionInfoText(): IHTMLTextWindow {
        return asGuarded(this._SafeStr_2356.findChildByName("sanction_info_txt"), isIHTMLTextWindow);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_2737) {
            this._SafeStr_2737.dispose();
            this._SafeStr_2737 = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._shownObject = null;
        if (this._SafeStr_2356) {
            this._SafeStr_2356.dispose();
            this._SafeStr_2356 = null;
        }
        this._SafeStr_4077 = false;
        this._disposed = true;
    }

    public openWindow(param1: MyCfhReportStatusMessageEvent): void {
        this.dispose();
        this._disposed = false;
        this._window = asGuarded(this._habboHelp.getXmlWindow("my_reports"), isIWindowContainer);
        this._SafeStr_2356 = asGuarded(this._window.findChildByName("status_info_bubble"), isIBubbleWindow);
        this._window.desktop.addChild(this._SafeStr_2356);
        this._SafeStr_2356.visible = false;
        this.appealButton.addEventListener("WME_CLICK", this.onClickAppeal);
        this._window.center();
        this._window.procedure = this.windowEventHandler;
        this.createTable();
        let _loc2_: MyCfhReportStatusMessageParser = asInstanceOf(param1.getParser(), MyCfhReportStatusMessageParser);
        this.setTableObjects(_loc2_.messages);
    }

    public createTable(): void {
        this._SafeStr_2737 = new TableView(this._habboHelp.windowManager, this.reportsTableContainer);
        let _loc1_: any[] = [new TableColumn(MyReportStatus.COLUMN_REPORT_DATE, this.localize("report.status.col.report_date"), 0.26, "left"), new TableColumn(MyReportStatus.COLUMN_REPORTED_ACCOUNT, this.localize("report.status.col.reported_account"), 0.18, "left"), new TableColumn(MyReportStatus.COLUMN_REASON, this.localize("report.status.col.reason"), 0.38, "left"), new TableColumn(MyReportStatus.COLUMN_APPEAL_STATUS, this.localize("report.status.col.appeal_status"), 0.18, "left")];
        this._SafeStr_2737.initialize(Array.from(_loc1_), true, false);
        this._SafeStr_2737.onRowHoveredCallback = this.onRowHover;
    }

    public setTableObjects(param1: CfhReportMessage[]): void {
        let message: CfhReportMessage;
        let messages: CfhReportMessage[] = param1;
        let tableObjects: ITableObject[] = [];
        messages.sort((param1: CfhReportMessage, param2: CfhReportMessage): number => {
                if (param1.creationTime > param2.creationTime) {
                    return -1;
                }
                if (param1.creationTime < param2.creationTime) {
                    return 1;
                }
                return 0;
            });
        for (message of messages ?? []) {
            tableObjects.push(new ReportStatusTableObject(this, message));
        }
        this._SafeStr_2737.setObjects(tableObjects);
    }

    public localize(param1: string, param2: string = null): string {
        return this._habboHelp.localization.getLocalization(param1, param2 != null ? param2 : param1);
    }

    public clickInfoButton(param1: ReportStatusTableObject): void {
        this._SafeStr_4077 = !this._SafeStr_4077;
        this.setFocusRow(this._SafeStr_4077 ? param1 : null);
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (this._disposed || !this._window || param1.type != "WME_CLICK" || !param2) {
            return;
        }
        let _loc3_: any = param2.name;
        if ("header_button_close" === _loc3_) {
            this.dispose();
        }
    };

    private onRowHover = (param1: ReportStatusTableObject): void => {
        if (param1 != null && this._shownObject != param1 && this._SafeStr_4077) {
            this.setFocusRow(param1);
        }
    };

    private setFocusRow(param1: ReportStatusTableObject): void {
        if (param1 == this._shownObject) {
            return;
        }
        this._shownObject = param1;
        this._SafeStr_2356.visible = this._shownObject != null;
        if (this._SafeStr_2356.visible) {
            this.refreshBubbleUI();
            this.relocateBubbleAndFocus();
        }
    }

    private refreshBubbleUI(): void {
        let _loc8_: string = null;
        let _loc9_: string = null;
        let _loc7_: string = null;
        let _loc4_: CfhReportMessage = this._shownObject.message;
        let _loc6_: any = _loc4_.appealStatus != CfhReportMessage._SafeStr_7393;
        let _loc5_: boolean = _loc6_ ? _loc4_.appealResolutionTime != -1 : _loc4_.closeTime != -1;
        let _loc10_: string = _loc6_ ? (_loc5_ ? this._SafeStr_4438.format(new Date(_loc4_.appealResolutionTime)) : "-") : (_loc5_ ? this._SafeStr_4438.format(new Date(_loc4_.closeTime)) : "-");
        let _loc3_: string = _loc6_ ? "report.status.info.appealed" : "report.status.info.reported";
        if (_loc5_) {
            _loc8_ = _loc4_.sanctioned ? "report.status.info.action" : "report.status.info.no_action";
            this.actionDescText.text = this.localize(this.getActionExplanation(_loc4_.sanctioned, _loc4_.sanctionGivenByAutoModeration, _loc4_.appealStatus));
        } else {
            _loc8_ = "report.status.info.sanction_pending";
            this.actionDescText.text = "";
        }
        this.actionText.text = this.localize(_loc8_);
        this.createdKeyText.text = this.localize(_loc3_);
        let _loc1_: number = _loc6_ ? _loc4_.appealCreationTime : _loc4_.creationTime;
        this.reportedDateText.text = this._SafeStr_4438.format(new Date(_loc1_));
        this.decisionDateText.text = _loc10_;
        let _loc2_: boolean = _loc4_.appealStatus == CfhReportMessage._SafeStr_7393 && _loc5_ && !_loc4_.sanctioned;
        if (_loc2_) {
            this.appealButton.enable();
        } else {
            this.appealButton.disable();
        }
        if (_loc4_.sanctioned) {
            _loc9_ = this._habboHelp.getProperty("zendesk.url");
            _loc7_ = this._habboHelp.localization.getLocalizationWithParams("report.status.info.sanction_help", "", "url", _loc9_);
            this.sanctionInfoText.text = _loc7_;
            this.sanctionInfoText.initializeLinkStyle();
            this.sanctionInfoText.addEventListener("WE_LINK", this.onClickHtmlLink);
        } else {
            this.sanctionInfoText.text = "";
        }
    }

    private onClickHtmlLink = (param1: WindowEvent): void => {
        let _loc2_: WindowLinkEvent = param1 instanceof WindowLinkEvent ? param1 : null;
        if (_loc2_ != null) {
            HabboWebTools.openWebPageAndMinimizeClient(_loc2_.link);
        }
    };

    private onClickAppeal = (param1: WindowMouseEvent): void => {
        if (this._shownObject == null) {
            return;
        }
        this._habboHelp.sendMessage(new AppealCfhMessageComposer(this._shownObject.message.id));
        this.appealButton.disable();
    };

    private getActionExplanation(param1: boolean, param2: boolean, param3: number): string {
        if (param3 == CfhReportMessage._SafeStr_7538) {
            return "report.status.info.appeal.action";
        }
        if (param3 == CfhReportMessage._SafeStr_7515) {
            return "report.status.info.appeal.no_action";
        }
        return param2 ? (param1 ? "report.status.info.auto_moderated.action" : "report.status.info.auto_moderated.no_action") : (param1 ? "report.status.info.manually_moderated.action" : "report.status.info.manually_moderated.no_action");
    }

    private relocateBubbleAndFocus(): void {
        let _loc1_: Rectangle = this._SafeStr_2737.getGlobalRowRectangle(this._shownObject);
        this._SafeStr_2356.position = new Point(_loc1_.x + _loc1_.width - 2, _loc1_.y + _loc1_.height / 2 - this._SafeStr_2356.height / 2);
        this._SafeStr_2356.activate();
    }

    get [IDisposable](): true {
        return true;
    }
}
