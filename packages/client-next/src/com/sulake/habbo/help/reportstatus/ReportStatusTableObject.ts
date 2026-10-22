import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { CfhReportMessage } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhReportMessage';
import { MyReportStatus } from '@/com/sulake/habbo/help/MyReportStatus.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class ReportStatusTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.help.reportstatus::ReportStatusTableObject'); }

    declare private _myReportStatus: MyReportStatus;

    declare private _message: CfhReportMessage;

    declare private _SafeStr_4438: DateTimeFormatter;

    declare private _SafeStr_5502: any;

    constructor(param1: MyReportStatus, param2: CfhReportMessage) {
        this._myReportStatus = param1;
        this._message = param2;
        this._SafeStr_4438 = new DateTimeFormatter("i-default");
        this._SafeStr_4438.setDateTimePattern("dd/MM/yyyy");
        this._SafeStr_5502 = this.getReportedUserDeleted(this._message.reportedAccountName);
    }

    public get identifier(): string {
        return String(this._message.id);
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return true;
    }

    public isUpdated(param1: any): boolean {
        return true;
    }

    public getTableCell(param1: string): TableCell {
        let _loc2_: string = null;
        let _loc3_: TableCell = null;
        switch (param1) {
            case MyReportStatus.COLUMN_REPORT_DATE:
                _loc2_ = this._SafeStr_4438.format(new Date(this._message.creationTime));
                return new TableCell(TableCell._SafeStr_2166, _loc2_);
            case MyReportStatus.COLUMN_REPORTED_ACCOUNT:
                return new TableCell(TableCell._SafeStr_2166, this._SafeStr_5502.userName, false, false, null, null, false, null, this._SafeStr_5502.textColor >>> 0);
            case MyReportStatus.COLUMN_REASON:
                return new TableCell(TableCell._SafeStr_2166, this._myReportStatus.localize("help.cfh.topic." + this._message.userCategory));
            case MyReportStatus.COLUMN_APPEAL_STATUS:
                _loc3_ = new TableCell(TableCell._SafeStr_2166, this.statusText);
                if (!this._SafeStr_5502.deleted) {
                    _loc3_.setExtraBtn("icons_info_grey", this.onExtraClick);
                }
                return _loc3_;
            default:
                return null;
        }
    }

    private onExtraClick = (): void => {
        this._myReportStatus.clickInfoButton(this);
    };

    private get statusText(): string {
        if (this._message.appealStatus == CfhReportMessage._SafeStr_7312) {
            return this._myReportStatus.localize("report.status.state.appealed");
        }
        if (this._message.closeTime != -1) {
            return this._myReportStatus.localize("report.status.state.decided");
        }
        return this._myReportStatus.localize("report.status.state.pending");
    }

    private getReportedUserDeleted(param1: string): any {
        let _loc2_: boolean = param1 == null || param1 == "";
        let _loc4_: string = _loc2_ ? this._myReportStatus.localize("report.status.deleted", "Deleted") : param1;
        let _loc3_: number = _loc2_ ? 13762560 : 0;
        return { "deleted": _loc2_, "userName": _loc4_, "textColor": _loc3_ };
    }

    public get message(): CfhReportMessage {
        return this._message;
    }
}
