import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CallForHelpCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpCategoryData';
import type { CfhSanctionTypeData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CfhSanctionTypeData';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IIssueHandler } from '@/com/sulake/habbo/moderation/IIssueHandler';
import type { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';
import type { ModActionCtrl } from '@/com/sulake/habbo/moderation/ModActionCtrl';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { CloseIssueDefaultActionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/CloseIssueDefaultActionMessageComposer';
import { CloseIssuesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/CloseIssuesMessageComposer';
import { ModToolSanctionComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModToolSanctionComposer';
import { PickIssuesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/PickIssuesMessageComposer';
import { ReleaseIssuesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ReleaseIssuesMessageComposer';
import { IssueBrowser } from '@/com/sulake/habbo/moderation/IssueBrowser';
import { IssueBundle } from '@/com/sulake/habbo/moderation/IssueBundle';
import { IssueHandler } from '@/com/sulake/habbo/moderation/IssueHandler';
import { isITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class IssueManager {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueManager'); }

    public static readonly _SafeStr_8335: string = "issue_bundle_open";
    public static readonly BUNDLE_MY: string = "issue_bundle_my";
    public static readonly _SafeStr_8471: string = "issue_bundle_picked";
    public static readonly PRIORITY_UPDATE_INTERVAL_MS: number = 15000;
    public static readonly RESOLUTION_USELESS: number = 1;
    public static readonly RESOLUTION_RESOLVED: number = 3;

    constructor(param1: ModerationManager) {
        this._moderationManager = param1;
        this._issues = new UtilsMap();
        this._bundles = new UtilsMap();
        this._SafeStr_3918 = new UtilsMap();
        this._SafeStr_3534 = new IssueBrowser(this, this._moderationManager.windowManager, this._moderationManager.assets);
        this._SafeStr_3377 = [];
        this._SafeStr_4148 = [];
        this._issueHandlers = new UtilsMap();
        this._SafeStr_5443 = new UtilsMap();
        this._SafeStr_7382 = this._moderationManager.getInteger("chf.score.updatefactor", 60);
        this._issueListLimit = this._moderationManager.getInteger("max.call_for_help.results", 200);
        this._SafeStr_5771 = new Timer(15000, 0);
        this._SafeStr_5771.addEventListener("timer", this.updateIssueBrowser);
        this._SafeStr_5771.start();
    }

    declare private _moderationManager: ModerationManager;

    declare private _SafeStr_3534: IssueBrowser;

    declare private _issues: UtilsMap;

    declare private _bundles: UtilsMap;

    declare private _SafeStr_3918: UtilsMap;

    declare private _SafeStr_3377: any[];

    declare private _SafeStr_4148: any[];

    declare private _issueHandlers: UtilsMap;

    declare private _SafeStr_5443: UtilsMap;

    private _SafeStr_6755: number = 1;

    declare private _SafeStr_7382: number;
    static { (this.prototype as any)._SafeStr_7382 = 0; }

    declare private _SafeStr_5771: Timer;

    declare private _windowX: number;
    static { (this.prototype as any)._windowX = 0; }

    declare private _windowY: number;
    static { (this.prototype as any)._windowY = 0; }

    declare private _windowWidth: number;
    static { (this.prototype as any)._windowWidth = 0; }

    declare private _windowHeight: number;
    static { (this.prototype as any)._windowHeight = 0; }

    declare private _SafeStr_6056: CallForHelpCategoryData[];

    declare private _issueListLimit: number;
    static { (this.prototype as any)._issueListLimit = 0; }

    public get issueListLimit(): number {
        return this._issueListLimit;
    }

    public init(): void {
        this._SafeStr_3534.show();
    }

    public pickBundle(param1: number, param2: string, param3: boolean = false, param4: number = 0): void {
        let _loc5_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc5_ == null) {
            return;
        }
        this.sendPick(_loc5_.getIssueIds(), param3, param4, param2);
        this._SafeStr_3377 = this._SafeStr_3377.concat(_loc5_.getIssueIds());
    }

    public autoPick(param1: string, param2: boolean = false, param3: number = 0): void {
        let _loc4_: any = null;
        let _loc6_: any = null;
        let _loc5_: any[] = this._bundles.getValues();
        for (_loc6_ of _loc5_ ?? []) {
            if (_loc6_.state == 1 && (_loc4_ == null || this.isBundleHigherPriorityOrOlder(_loc6_, _loc4_))) {
                _loc4_ = _loc6_;
            }
        }
        if (_loc4_ == null) {
            return;
        }
        this.pickBundle(_loc4_.id | 0, param1, param2, param3);
    }

    public releaseAll(): void {
        let _loc3_: any = null;
        if (this._bundles == null) {
            return;
        }
        let _loc1_: number = this._moderationManager.sessionDataManager.userId;
        let _loc2_: any[] = [];
        for (_loc3_ of valuesOf(this._bundles)) {
            if (_loc3_.state == 2 && _loc3_.pickerUserId == _loc1_) {
                _loc2_ = _loc2_.concat(_loc3_.getIssueIds());
            }
        }
        this.sendRelease(_loc2_);
    }

    public releaseBundle(param1: number): void {
        if (this._bundles == null) {
            return;
        }
        let _loc2_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc2_ == null) {
            return;
        }
        this.sendRelease(_loc2_.getIssueIds());
    }

    public playSound(param1: IssueMessageData): void {
        if (this._issues[param1.issueId] != null) {
            return;
        }
        if (this._SafeStr_3534 == null || !this._SafeStr_3534.isOpen()) {
            this._moderationManager.soundManager.playSound("HBST_call_for_help");
        }
    }

    public updateIssue(param1: IssueMessageData): void {
        let _loc9_: any = null;
        let _loc3_: any = null;
        let _loc2_: number = 0;
        let _loc4_: any[] = null;
        let _loc5_: boolean = false;
        let _loc7_: any = null;
        let _loc8_: number = 0;
        if (param1 == null) {
            return;
        }
        this._issues.remove(param1.issueId);
        this._issues.add(param1.issueId, param1);
        let _loc6_: number = this._SafeStr_3918.getValue(param1.issueId) | 0;
        if (_loc6_ != 0) {
            _loc9_ = asInstanceOf(this._bundles.getValue(_loc6_), IssueBundle);
            if (_loc9_ != null) {
                if (_loc9_.matches(param1)) {
                    _loc9_.updateIssue(param1);
                } else {
                    _loc9_.removeIssue(param1.issueId);
                    if (_loc9_.getIssueCount() == 0) {
                        this._bundles.remove(_loc9_.id);
                        this.removeHandler(_loc9_.id | 0);
                    }
                    this._SafeStr_3918.remove(param1.issueId);
                    _loc9_ = null;
                }
            }
        }
        if (param1.state == 3) {
            this._issues.remove(param1.issueId);
            return;
        }
        if (_loc9_ == null) {
            for (_loc3_ of valuesOf(this._bundles)) {
                if (_loc3_.matches(param1)) {
                    _loc9_ = _loc3_;
                    _loc9_.updateIssue(param1);
                    this._SafeStr_3918.add(param1.issueId, _loc9_.id);
                    break;
                }
            }
        }
        if (_loc9_ == null) {
            _loc6_ = this._SafeStr_6755++;
            _loc9_ = new IssueBundle(_loc6_, param1);
            this._SafeStr_3918.add(param1.issueId, _loc6_);
            this._bundles.add(_loc6_, _loc9_);
        }
        if (_loc9_ == null) {
            return;
        }
        if (this._SafeStr_3377.indexOf(param1.issueId) != -1) {
            this.handleBundle(_loc9_.id | 0);
            _loc2_ = this._moderationManager.sessionDataManager.userId;
            if (_loc2_ != param1.pickerUserId) {
                if (param1.state == 2) {
                    this.unhandleBundle(_loc9_.id | 0);
                }
            }
        }
        if (param1.state == 1) {
            _loc4_ = this.getBundles("issue_bundle_my");
            _loc5_ = false;
            for (_loc7_ of _loc4_ ?? []) {
                if (_loc7_.matches(param1, true)) {
                    _loc5_ = true;
                    break;
                }
            }
            _loc8_ = this._SafeStr_4148.indexOf(param1.issueId);
            if (_loc8_ == -1 && _loc5_) {
                this.sendPick([param1.issueId], false, 0, "matches bundle with issue: " + _loc7_.getHighestPriorityIssue().issueId);
            } else {
                this._SafeStr_4148.splice(_loc8_, 1);
            }
        }
        this.updateHandler(_loc9_.id | 0);
        this._SafeStr_3534.update();
    }

    public removeHandler(param1: number): void {
        let _loc2_: IIssueHandler = this._issueHandlers.remove(param1);
        if (_loc2_ != null) {
            _loc2_.dispose();
            _loc2_ = null;
        }
    }

    public addModActionView(param1: number, param2: ModActionCtrl): void {
        this._SafeStr_5443.add(param1, param2);
    }

    public removeModActionView(param1: number): void {
        this._SafeStr_5443.remove(param1);
    }

    public removeIssue(param1: number): void {
        let _loc3_: IssueBundle = null;
        if (this._issues == null) {
            return;
        }
        let _loc2_: number = this._SafeStr_3918.getValue(param1) | 0;
        if (_loc2_ != 0) {
            _loc3_ = asInstanceOf(this._bundles.getValue(_loc2_), IssueBundle);
            if (_loc3_ != null) {
                _loc3_.removeIssue(param1);
                if (_loc3_.getIssueCount() == 0) {
                    this._bundles.remove(_loc3_.id);
                }
            }
        }
        this._issues.remove(param1);
        this._SafeStr_3534.update();
    }

    public getBundles(param1: string): any[] {
        let _loc4_: any = null;
        if (this._bundles == null) {
            return [];
        }
        let _loc3_: any[] = [];
        let _loc2_: number = this._moderationManager.sessionDataManager.userId;
        for (_loc4_ of valuesOf(this._bundles)) {
            switch (param1) {
                case "issue_bundle_open":
                    if (_loc4_.state == 1) {
                        _loc3_.push(_loc4_);
                    }
                    break;
                case "issue_bundle_my":
                    if (_loc4_.state == 2 && _loc4_.pickerUserId == _loc2_) {
                        _loc3_.push(_loc4_);
                    }
                    break;
                case "issue_bundle_picked":
                    if (_loc4_.state == 2 && _loc4_.pickerUserId != _loc2_) {
                        _loc3_.push(_loc4_);
                    }
            }
        }
        return _loc3_;
    }

    public handleBundle(param1: number): void {
        let _loc5_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: IIssueHandler = new IssueHandler(this._moderationManager, _loc5_, this._SafeStr_6056, this._windowX, this._windowY, this._windowWidth, this._windowHeight);
        this._moderationManager.windowTracker.show(isITrackedWindow(_loc4_) ? _loc4_ : null, null, false, false, false, true, this._windowX, this._windowY, this._windowWidth, this._windowHeight);
        this.removeHandler(param1);
        this._issueHandlers.add(param1, _loc4_);
        let _loc2_: any[] = [];
        for (const _loc3_ of this._SafeStr_3377 ?? []) {
            if (!_loc5_.contains(_loc3_ | 0)) {
                _loc2_ = _loc2_.concat(_loc3_);
            }
        }
        this._SafeStr_3377 = _loc2_;
    }

    public unhandleBundle(param1: number): void {
        let _loc3_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: ITrackedWindow = this._issueHandlers.remove(param1);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
    }

    public closeBundle(param1: number, param2: number): void {
        let _loc3_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc3_ == null) {
            return;
        }
        this.sendClose(_loc3_.getIssueIds(), param2);
    }

    public closeDefaultAction(param1: number, param2: number): void {
        let _loc6_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc6_ == null) {
            return;
        }
        let _loc5_: number = _loc6_.getHighestPriorityIssue().issueId;
        let _loc4_: any[] = [];
        for (const _loc3_ of _loc6_.getIssueIds() ?? []) {
            if (_loc3_ != _loc5_) {
                _loc4_.push(_loc3_);
            }
        }
        this.sendCloseDefaultAction(_loc5_, _loc4_, param2);
    }

    public requestSanctionData(param1: number, param2: number): void {
        let _loc3_: IssueBundle = asInstanceOf(this._bundles.getValue(param1), IssueBundle);
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.getHighestPriorityIssue() != null) {
            this._moderationManager.connection.send(new ModToolSanctionComposer(_loc3_.getHighestPriorityIssue().issueId, -1, param2));
        }
    }

    public requestSanctionDataForAccount(param1: number, param2: number): void {
        this._moderationManager.connection.send(new ModToolSanctionComposer(-1, param1, param2));
    }

    public updateSanctionData(param1: number, param2: number, param3: CfhSanctionTypeData): void {
        let _loc4_: IIssueHandler = null;
        let _loc5_: ModActionCtrl = null;
        let _loc6_: string = param3.name + (param3.avatarOnly ? " (avatar) " : " ");
        if (param3.sanctionLengthInHours > 24) {
            _loc6_ += param3.sanctionLengthInHours / 24 + " days";
        } else {
            _loc6_ += param3.sanctionLengthInHours + "h";
        }
        if (!StringUtil.isEmpty(param3.tradeLockInfo)) {
            _loc6_ += " & " + param3.tradeLockInfo;
        }
        if (!StringUtil.isEmpty(param3.machineBanInfo)) {
            _loc6_ += " & " + param3.machineBanInfo;
        }
        if (param1 > 0) {
            for (const _loc7_ of valuesOf(this._bundles)) {
                if (_loc7_.contains(param1)) {
                    _loc4_ = this._issueHandlers.getValue(_loc7_.id);
                    if (_loc4_ != null) {
                        _loc4_.showDefaultSanction(param2, _loc6_);
                    }
                }
            }
        } else {
            _loc5_ = this._SafeStr_5443.getValue(param2);
            if (_loc5_ != null) {
                _loc5_.showDefaultSanction(param2, _loc6_);
            }
        }
    }

    public autoHandle(param1: number): void {
        let _loc3_: any = null;
        let _loc5_: any = null;
        let _loc4_: any[] = this._bundles.getValues();
        let _loc2_: number = this._moderationManager.sessionDataManager.userId;
        for (_loc5_ of _loc4_ ?? []) {
            if (_loc5_.state == 2 && _loc5_.pickerUserId == _loc2_ && _loc5_.id != param1 && (_loc3_ == null || _loc5_.highestPriority < _loc3_.highestPriority)) {
                _loc3_ = _loc5_;
            }
        }
        if (_loc3_ == null) {
            this.autoPick("issue manager pick next");
            return;
        }
        this.handleBundle(_loc3_.id | 0);
    }

    public issuePickFailed(param1: any[]): boolean {
        let _loc6_: any = null;
        let _loc4_: number = 0;
        let _loc10_: string = null;
        let _loc2_: number = 0;
        let _loc13_: any = null;
        let _loc5_: any = null;
        let _loc11_: any[] = null;
        let _loc12_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: IIssueHandler = null;
        if (!param1) {
            return false;
        }
        let _loc7_: boolean = false;
        let _loc9_: number = this._moderationManager.sessionDataManager.userId;
        for (_loc6_ of param1 ?? []) {
            _loc4_ = _loc6_.issueId | 0;
            _loc10_ = stringOrNull(_loc6_.pickerUserName);
            _loc2_ = _loc6_.pickerUserId | 0;
            if (_loc2_ != -1 && _loc2_ != _loc9_) {
                _loc7_ = true;
            }
            _loc13_ = null;
            for (_loc5_ of valuesOf(this._bundles)) {
                _loc11_ = _loc5_.getIssueIds();
                if (_loc11_ != null) {
                    for (_loc12_ of _loc11_ ?? []) {
                        if (_loc4_ == _loc12_) {
                            _loc13_ = _loc5_;
                            break;
                        }
                    }
                }
            }
            if (_loc13_ != null) {
                _loc8_ = _loc13_.id | 0;
                _loc3_ = this._issueHandlers.getValue(_loc8_);
                if (_loc3_ != null) {
                    _loc3_.dispose();
                }
                this.releaseBundle(_loc8_);
            }
        }
        return _loc7_;
    }

    public setToolPreferences(param1: number, param2: number, param3: number, param4: number): void {
        this._windowX = param1;
        this._windowY = param2;
        this._windowHeight = param3;
        this._windowWidth = param4;
    }

    public setCfhTopics(param1: CallForHelpCategoryData[]): void {
        this._SafeStr_6056 = param1;
    }

    public getCfhTopics(): CallForHelpCategoryData[] {
        return this._SafeStr_6056;
    }

    private isBundleHigherPriorityOrOlder(param1: IssueBundle, param2: IssueBundle): boolean {
        if (param1.highestPriority < param2.highestPriority) {
            return true;
        }
        return param1.highestPriority == param2.highestPriority && param1.issueAgeInMilliseconds < param2.issueAgeInMilliseconds;
    }

    private sendRelease(param1: any[]): void {
        if (param1 == null || param1.length == 0 || this._moderationManager == null || this._moderationManager.connection == null) {
            return;
        }
        this._moderationManager.connection.send(new ReleaseIssuesMessageComposer(param1));
        this._SafeStr_4148 = this._SafeStr_4148.concat(param1);
    }

    private updateHandler(param1: number): void {
        let _loc2_: IIssueHandler = this._issueHandlers.getValue(param1);
        if (_loc2_ != null) {
            _loc2_.updateIssuesAndMessages();
        }
    }

    private sendClose(param1: any[], param2: number): void {
        if (param1 == null || this._moderationManager == null || this._moderationManager.connection == null) {
            return;
        }
        this._moderationManager.connection.send(new CloseIssuesMessageComposer(param1, param2));
    }

    private sendPick(param1: any[], param2: boolean, param3: number, param4: string): void {
        if (param1 == null || this._moderationManager == null || this._moderationManager.connection == null) {
            return;
        }
        this._moderationManager.connection.send(new PickIssuesMessageComposer(param1, param2, param3, param4));
    }

    private sendCloseDefaultAction(param1: number, param2: any[], param3: number): void {
        this._moderationManager.connection.send(new CloseIssueDefaultActionMessageComposer(param1, param2, param3));
    }

    public updateIssueBrowser = (param1: Event = null): void => {
        if (this._moderationManager == null) {
            return;
        }
        if (this._SafeStr_3534 != null) {
            this._SafeStr_3534.update();
        }
    };
}
