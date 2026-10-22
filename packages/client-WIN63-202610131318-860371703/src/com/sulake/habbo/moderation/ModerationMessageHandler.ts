import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { CfhSanctionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhSanctionMessageParser';
import type { CfhTopicsInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhTopicsInitMessageParser';
import type { CfhChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/CfhChatlogMessageParser';
import type { IssueDeletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueDeletedMessageParser';
import type { IssueInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueInfoMessageParser';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { IssuePickFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssuePickFailedMessageParser';
import type { ModeratorActionResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorActionResultMessageParser';
import type { ModeratorInitData } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorInitData';
import type { ModeratorInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorInitMessageParser';
import type { ModeratorRoomInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorRoomInfoMessageParser';
import type { ModeratorToolPreferencesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorToolPreferencesMessageParser';
import type { ModeratorUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorUserInfoMessageParser';
import type { RoomChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/RoomChatlogMessageParser';
import type { RoomVisitsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/RoomVisitsMessageParser';
import type { UserChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/UserChatlogMessageParser';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { UserClassificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userclassification/UserClassificationMessageParser';
import type { IChatLogListener } from '@/com/sulake/habbo/moderation/IChatLogListener';
import type { IUserInfoListener } from '@/com/sulake/habbo/moderation/IUserInfoListener';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import type { RoomToolCtrl } from '@/com/sulake/habbo/moderation/RoomToolCtrl';
import type { RoomVisitsCtrl } from '@/com/sulake/habbo/moderation/RoomVisitsCtrl';
import { CfhSanctionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CfhSanctionMessageEvent';
import { CfhTopicsInitMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CfhTopicsInitMessageEvent';
import { CfhChatlogEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/CfhChatlogEvent';
import { IssueDeletedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/IssueDeletedMessageEvent';
import { IssueInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/IssueInfoMessageEvent';
import { IssuePickFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/IssuePickFailedMessageEvent';
import { ModeratorActionResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorActionResultMessageEvent';
import { ModeratorInitMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorInitMessageEvent';
import { ModeratorRoomInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorRoomInfoEvent';
import { ModeratorToolPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorToolPreferencesEvent';
import { ModeratorUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorUserInfoEvent';
import { RoomChatlogEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomChatlogEvent';
import { RoomVisitsEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomVisitsEvent';
import { UserChatlogEvent } from '@/com/sulake/habbo/communication/messages/incoming/moderation/UserChatlogEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { UserClassificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userclassification/UserClassificationMessageEvent';
import { GetModeratorUserInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/GetModeratorUserInfoMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { UserClassificationCtrl } from '@/com/sulake/habbo/moderation/UserClassificationCtrl';
import { UserClassificationData } from '@/com/sulake/habbo/userclassification/UserClassificationData';

export class ModerationMessageHandler {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ModerationMessageHandler'); }

    declare private _moderationManager: ModerationManager;

    private _userInfoListeners: any[] = [];
    private _roomVisitsListeners: any[] = [];
    private _SafeStr_4992: any[] = [];
    private _chatlogListeners: any[] = [];
    private _roomInfoListeners: any[] = [];
    private _roomEnterListeners: any[] = [];

    constructor(param1: ModerationManager) {
        this._moderationManager = param1;
        let _loc2_: IConnection = param1.connection;
        _loc2_.addMessageEvent(new ModeratorToolPreferencesEvent(this.onModeratorToolPreferences));
        _loc2_.addMessageEvent(new CfhTopicsInitMessageEvent(this.onCfhTopics));
        _loc2_.addMessageEvent(new ModeratorRoomInfoEvent(this.onRoomInfo));
        _loc2_.addMessageEvent(new RoomChatlogEvent(this.onRoomChatlog));
        _loc2_.addMessageEvent(new CfhChatlogEvent(this.onCfhChatlog));
        _loc2_.addMessageEvent(new ModeratorActionResultMessageEvent(this.onModeratorActionResult));
        _loc2_.addMessageEvent(new CfhSanctionMessageEvent(this.onSanctions));
        _loc2_.addMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        _loc2_.addMessageEvent(new ModeratorInitMessageEvent(this.onModeratorInit));
        _loc2_.addMessageEvent(new IssuePickFailedMessageEvent(this.onIssuePickFailed));
        _loc2_.addMessageEvent(new CloseConnectionMessageEvent(this.onRoomExit));
        _loc2_.addMessageEvent(new UserChatlogEvent(this.onUserChatlog));
        _loc2_.addMessageEvent(new UserClassificationMessageEvent(this.onRoomUserClassification));
        _loc2_.addMessageEvent(new ModeratorUserInfoEvent(this.onUserInfo));
        _loc2_.addMessageEvent(new RoomVisitsEvent(this.onRoomVisits));
        _loc2_.addMessageEvent(new IssueInfoMessageEvent(this.onIssueInfo));
        _loc2_.addMessageEvent(new IssueDeletedMessageEvent(this.onIssueDeleted));
    }

    private onIssueInfo = (param1: IssueInfoMessageEvent): void => {
        if (param1 == null || this._moderationManager == null) {
            return;
        }
        let _loc2_: IssueInfoMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IssueMessageData = _loc2_.issueData;
        this._moderationManager.issueManager.playSound(_loc3_);
        this._moderationManager.issueManager.updateIssue(_loc3_);
    };

    private onModeratorInit = (param1: ModeratorInitMessageEvent): void => {
        let _loc4_: any = null;
        if (param1 == null || this._moderationManager == null) {
            return;
        }
        let _loc3_: ModeratorInitMessageParser = param1.getParser();
        if (_loc3_ == null || _loc3_.data == null) {
            return;
        }
        let _loc2_: ModeratorInitData = _loc3_.data;
        let _loc6_: any[] = _loc2_.issues;
        let _loc5_: any[] = _loc2_.messageTemplates;
        for (_loc4_ of _loc6_ ?? []) {
            this._moderationManager.issueManager.updateIssue(_loc4_);
        }
        this._moderationManager.issueManager.updateIssueBrowser();
        this._moderationManager.initMsg = _loc2_;
        this._moderationManager.startPanel.show();
    };

    private onModeratorToolPreferences = (param1: ModeratorToolPreferencesEvent): void => {
        let _loc2_: ModeratorToolPreferencesMessageParser = null;
        if (this._moderationManager && this._moderationManager.issueManager) {
            _loc2_ = param1.getParser();
            this._moderationManager.issueManager.setToolPreferences(_loc2_.windowX, _loc2_.windowY, _loc2_.windowHeight, _loc2_.windowWidth);
        }
    };

    private onIssuePickFailed = (param1: IssuePickFailedMessageEvent): void => {
        let alert: boolean = false;
        let issues: any[];
        let retryEnabled: boolean = false;
        let retryCount: number = 0;
        let pickedAlready: boolean = false;
        let event: IssuePickFailedMessageEvent = param1;
        let parser: IssuePickFailedMessageParser = event.getParser();
        if (parser == null) {
            return;
        }
        alert = true;
        issues = parser.issues;
        retryEnabled = parser.retryEnabled;
        retryCount = parser.retryCount;
        pickedAlready = this._moderationManager.issueManager.issuePickFailed(issues);
        if (pickedAlready) {
            if (retryEnabled) {
                if (retryCount < 10) {
                    alert = false;
                    this._moderationManager.issueManager.autoPick("pick failed retry", retryEnabled, retryCount);
                }
            }
        }
        if (alert) {
            this._moderationManager.windowManager.alert("Error", "Issue picking failed", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
        }
    };

    private onIssueDeleted = (param1: IssueDeletedMessageEvent): void => {
        if (param1 == null || this._moderationManager == null) {
            return;
        }
        let _loc2_: IssueDeletedMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        this._moderationManager.issueManager.removeIssue(_loc2_.issueId);
    };

    private onUserInfo = (param1: ModeratorUserInfoEvent): void => {
        let _loc3_: ModeratorUserInfoMessageParser = param1.getParser();
        Logger.log("GOT USER INFO: " + _loc3_.data.userId + ", " + _loc3_.data.cautionCount);
        for (const _loc2_ of this._userInfoListeners ?? []) {
            _loc2_.onUserInfo(_loc3_.data);
        }
    };

    private onRoomInfo = (param1: ModeratorRoomInfoEvent): void => {
        let _loc2_: any = null;
        let _loc3_: ModeratorRoomInfoMessageParser = param1.getParser();
        for (_loc2_ of this._roomInfoListeners ?? []) {
            _loc2_.onRoomInfo(_loc3_.data);
        }
    };

    private onCfhChatlog = (param1: CfhChatlogEvent): void => {
        let _loc3_: CfhChatlogMessageParser = param1.getParser();
        let _loc2_: any[] = [];
        _loc2_.push(_loc3_.data.chatRecord);
        let _loc4_: Map<any, any> = new Dictionary();
        _loc4_.set(_loc3_.data.callerUserId, 0);
        _loc4_.set(_loc3_.data.reportedUserId, 1);
        this.onChatlog("Call For Help Evidence #" + _loc3_.data.chatRecordId, 3, _loc3_.data.callId, _loc2_, _loc4_);
    };

    private onRoomChatlog = (param1: RoomChatlogEvent): void => {
        let _loc3_: RoomChatlogMessageParser = param1.getParser();
        let _loc2_: any[] = [];
        _loc2_.push(_loc3_.data);
        let _loc4_: Map<any, any> = new Dictionary();
        this.onChatlog("Room Chatlog: " + _loc3_.data.roomName, 4, _loc3_.data.roomId, _loc2_, _loc4_);
    };

    private onUserChatlog = (param1: UserChatlogEvent): void => {
        let _loc2_: UserChatlogMessageParser = param1.getParser();
        let _loc3_: Map<any, any> = new Dictionary();
        _loc3_.set(_loc2_.data.userId, 0);
        this.onChatlog("User Chatlog: " + _loc2_.data.userName, 5, _loc2_.data.userId, _loc2_.data.rooms, _loc3_);
    };

    private onChatlog(param1: string, param2: number, param3: number, param4: any[], param5: Map<any, any>): void {
        let _loc6_: any[] = this._chatlogListeners.concat();
        for (const _loc7_ of _loc6_ ?? []) {
            _loc7_.onChatlog(param1, param2, param3, param4, param5);
        }
    }

    private onRoomVisits = (param1: RoomVisitsEvent): void => {
        let _loc2_: any = null;
        let _loc4_: RoomVisitsMessageParser = param1.getParser();
        let _loc3_: any[] = this._roomVisitsListeners.concat();
        for (_loc2_ of _loc3_ ?? []) {
            _loc2_.onRoomVisits(_loc4_.data);
        }
    };

    private onRoomUserClassification = (param1: UserClassificationMessageEvent): void => {
        let _loc9_: any = null;
        let _loc5_: UserClassificationMessageParser = (param1 instanceof UserClassificationMessageEvent ? param1 : null).getParser();
        let _loc10_: UtilsMap = _loc5_.classifiedUsernameMap;
        let _loc3_: UtilsMap = _loc5_.classifiedUserTypeMap;
        let _loc6_: number = 1;
        let _loc7_: any[] = [];
        for (const _loc8_ of _loc10_.getKeys() ?? []) {
            _loc7_.push(new UserClassificationData(_loc8_ | 0, stringOrNull(_loc10_[_loc8_]), stringOrNull(_loc3_[_loc8_])));
        }
        let _loc2_: UserClassificationCtrl = new UserClassificationCtrl(this._moderationManager, _loc6_);
        _loc2_.show();
        let _loc4_: any[] = this._SafeStr_4992.concat();
        for (_loc9_ of _loc4_ ?? []) {
            _loc9_.onUserClassification(_loc6_, _loc7_);
        }
    };

    private onSanctions = (param1: CfhSanctionMessageEvent): void => {
        let _loc2_: CfhSanctionMessageParser = param1.getParser();
        Logger.log("Got sanction data..." + [_loc2_.issueId, _loc2_.accountId, _loc2_.sanctionType]);
        this._moderationManager.issueManager.updateSanctionData(_loc2_.issueId, _loc2_.accountId, _loc2_.sanctionType);
    };

    private onCfhTopics = (param1: CfhTopicsInitMessageEvent): void => {
        let _loc2_: any = undefined;
        let _loc3_: CfhTopicsInitMessageParser = param1.getParser();
        _loc2_ = _loc3_.callForHelpCategories;
        this._moderationManager.cfhTopics = _loc2_;
    };

    private onRoomEnter = (param1: RoomEntryInfoMessageEvent): void => {
        let _loc2_: any = null;
        let _loc3_: RoomEntryInfoMessageParser = param1.getParser();
        this._moderationManager.currentFlatId = _loc3_.guestRoomId;
        this._moderationManager.startPanel.guestRoomEntered(_loc3_);
        for (_loc2_ of this._roomEnterListeners ?? []) {
            _loc2_.onRoomChange();
        }
    };

    private onRoomExit = (param1: CloseConnectionMessageEvent): void => {
        let _loc2_: any = null;
        this._moderationManager.currentFlatId = 0;
        this._moderationManager.startPanel.roomExited();
        for (_loc2_ of this._roomEnterListeners ?? []) {
            _loc2_.onRoomChange();
        }
    };

    private onModeratorActionResult = (param1: ModeratorActionResultMessageEvent): void => {
        let _loc2_: ModeratorActionResultMessageParser = param1.getParser();
        Logger.log("GOT MOD ACTION RESULT: " + _loc2_.userId + ", " + _loc2_.success);
        if (_loc2_.success) {
            this._moderationManager.connection.send(new GetModeratorUserInfoMessageComposer(_loc2_.userId));
        } else {
            this._moderationManager.windowManager.alert("Alert", "Moderation action failed. If you tried to ban a user, please check if the user is already banned.", 0, this.onAlertClose);
        }
    };

    public addUserInfoListener(param1: IUserInfoListener): void {
        this._userInfoListeners.push(param1);
    }

    public removeUserInfoListener(param1: IUserInfoListener): void {
        let _loc3_: any[] = [];
        for (const _loc2_ of this._userInfoListeners ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._userInfoListeners = _loc3_;
    }

    public addRoomInfoListener(param1: RoomToolCtrl): void {
        this._roomInfoListeners.push(param1);
    }

    public removeRoomInfoListener(param1: RoomToolCtrl): void {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._roomInfoListeners ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._roomInfoListeners = _loc3_;
    }

    public addRoomEnterListener(param1: RoomToolCtrl): void {
        this._roomEnterListeners.push(param1);
    }

    public removeRoomEnterListener(param1: RoomToolCtrl): void {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._roomEnterListeners ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._roomEnterListeners = _loc3_;
    }

    public addRoomVisitsListener(param1: RoomVisitsCtrl): void {
        this._roomVisitsListeners.push(param1);
    }

    public removeRoomVisitsListener(param1: RoomVisitsCtrl): void {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._roomVisitsListeners ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._roomVisitsListeners = _loc3_;
    }

    public addChatlogListener(param1: IChatLogListener): void {
        this._chatlogListeners.push(param1);
    }

    public removeChatlogListener(param1: IChatLogListener): void {
        let _loc3_: any[] = [];
        for (const _loc2_ of this._chatlogListeners ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._chatlogListeners = _loc3_;
    }

    public addUserClassificationListener(param1: UserClassificationCtrl): void {
        this._SafeStr_4992.push(param1);
    }

    public removeUserClassificationListener(param1: UserClassificationCtrl): void {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._SafeStr_4992 ?? []) {
            if (_loc2_ != param1) {
                _loc3_.push(_loc2_);
            }
        }
        this._roomVisitsListeners = _loc3_;
    }

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };
}
