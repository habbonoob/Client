import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';

export class IssueBundle {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueBundle'); }

    constructor(param1: number, param2: IssueMessageData) {
        this._id = param1;
        this._issues = new UtilsMap();
        this._state = param2.state;
        this._pickerUserId = param2.pickerUserId;
        this._pickerName = param2.pickerUserName;
        this._reportedUserId = param2.reportedUserId;
        this._groupingId = param2.groupingId;
        this.addIssue(param2);
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    private _pickerUserId: number = 0;

    declare private _reportedUserId: number;
    static { (this.prototype as any)._reportedUserId = 0; }

    declare private _groupingId: number;
    static { (this.prototype as any)._groupingId = 0; }

    private _messageCount: number = 0;
    private _issueAgeInMilliseconds: number = 0;
    private _SafeStr_3288: IssueMessageData = null;
    private _highestPriorityIssue: IssueMessageData = null;

    declare private _issues: UtilsMap;

    public get issues(): any[] {
        return this._issues.getValues();
    }

    private _pickerName: string = "";

    public get pickerName(): string {
        return this._pickerName;
    }

    public get id(): number {
        return this._id;
    }

    public get state(): number {
        return this._state;
    }

    public get pickerUserId(): number {
        return this._pickerUserId;
    }

    public get highestPriority(): number {
        if (this._highestPriorityIssue == null) {
            this.getHighestPriorityIssue();
        }
        if (this._highestPriorityIssue != null) {
            return this._highestPriorityIssue.priority;
        }
        return 0;
    }

    public get reportedUserId(): number {
        return this._reportedUserId;
    }

    public get issueAgeInMilliseconds(): number {
        return this._issueAgeInMilliseconds;
    }

    public matches(param1: IssueMessageData, param2: boolean = false): boolean {
        if (this._groupingId == 0 || param1.groupingId == 0) {
            return false;
        }
        if (this._groupingId != param1.groupingId || this._reportedUserId != param1.reportedUserId) {
            return false;
        }
        if (!param2) {
            if (this.state != param1.state) {
                return false;
            }
            if (this.pickerUserId != param1.pickerUserId) {
                return false;
            }
        }
        return true;
    }

    public contains(param1: number): boolean {
        if (this._issues == null) {
            return false;
        }
        return this._issues.getKeys().indexOf(param1) > -1;
    }

    public updateIssue(param1: IssueMessageData): void {
        this.removeIssue(param1.issueId);
        this.addIssue(param1);
    }

    public removeIssue(param1: number): IssueMessageData {
        let _loc2_: IssueMessageData = asInstanceOf(this._issues.remove(param1), IssueMessageData);
        if (_loc2_ != null) {
            if (_loc2_.message != null && _loc2_.message != "") {
                this._messageCount = this._messageCount - 1;
            }
            if (this._SafeStr_3288 == _loc2_) {
                this._SafeStr_3288 = null;
            }
            if (this._highestPriorityIssue == _loc2_) {
                this._highestPriorityIssue = null;
            }
        }
        return _loc2_;
    }

    public getHighestPriorityIssue(): IssueMessageData {
        let _loc3_: any = null;
        let _loc4_: any = null;
        let _loc2_: number = 0;
        let _loc1_: IssueMessageData = null;
        let _loc5_: boolean = false;
        if (this._highestPriorityIssue == null) {
            if (this._issues == null || this._issues.length < 1) {
                return null;
            }
            _loc2_ = 0;
            while (_loc2_ < this._issues.length) {
                _loc1_ = this._issues.getWithIndex(_loc2_);
                _loc5_ = _loc1_.reportedCategoryId > 0 && _loc1_.reportedCategoryId < 100;
                if (_loc5_) {
                    if (_loc4_ == null || _loc4_.priority > _loc1_.priority) {
                        _loc4_ = _loc1_;
                    }
                } else if (_loc3_ == null || _loc3_.priority > _loc1_.priority) {
                    _loc3_ = _loc1_;
                }
                _loc2_++;
            }
            if (_loc4_ != null) {
                this._highestPriorityIssue = _loc4_;
            } else {
                this._highestPriorityIssue = _loc3_;
            }
        }
        return this._highestPriorityIssue;
    }

    public getIssueCount(): number {
        if (this._issues == null) {
            return 0;
        }
        return this._issues.length | 0;
    }

    public getIssueIds(): any[] {
        if (this._issues == null) {
            return [];
        }
        return this._issues.getKeys();
    }

    public getMessageCount(): number {
        return this._messageCount;
    }

    public getOpenTime(param1: number): string {
        let _loc2_: any = null;
        let _loc3_: any = this._SafeStr_3288;
        if (_loc3_ == null) {
            for (_loc2_ of valuesOf(this._issues)) {
                if (_loc3_ == null || _loc2_.issueAgeInMilliseconds > _loc3_.issueAgeInMilliseconds) {
                    _loc3_ = _loc2_;
                }
            }
            this._SafeStr_3288 = _loc3_;
        }
        if (_loc3_ != null) {
            return stringOrNull(_loc3_.getOpenTime(param1));
        }
        return "";
    }

    private addIssue(param1: IssueMessageData): void {
        this._issues.add(param1.issueId, param1);
        this._issueAgeInMilliseconds = param1.issueAgeInMilliseconds | 0;
        if (param1.message != null && param1.message != "") {
            this._messageCount = this._messageCount + 1;
        }
        if (this._SafeStr_3288 == null || param1.issueAgeInMilliseconds > this._SafeStr_3288.issueAgeInMilliseconds) {
            this._SafeStr_3288 = param1;
        }
        this._highestPriorityIssue = null;
        this.getHighestPriorityIssue();
    }
}
