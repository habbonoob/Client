import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IssueInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueInfoMessageParser';

export class ModeratorInitData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorInitData'); }

    declare private _messageTemplates: any[];

    declare private _roomMessageTemplates: any[];

    declare private _issues: any[];

    declare private _cfhPermission: boolean;
    static { (this.prototype as any)._cfhPermission = false; }

    declare private _chatlogsPermission: boolean;
    static { (this.prototype as any)._chatlogsPermission = false; }

    declare private _alertPermission: boolean;
    static { (this.prototype as any)._alertPermission = false; }

    declare private _kickPermission: boolean;
    static { (this.prototype as any)._kickPermission = false; }

    declare private _banPermission: boolean;
    static { (this.prototype as any)._banPermission = false; }

    declare private _roomAlertPermission: boolean;
    static { (this.prototype as any)._roomAlertPermission = false; }

    declare private _roomKickPermission: boolean;
    static { (this.prototype as any)._roomKickPermission = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc2_: IssueInfoMessageParser = new IssueInfoMessageParser();
        this._issues = [];
        this._messageTemplates = [];
        this._roomMessageTemplates = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            if (_loc2_.parse(param1)) {
                this._issues.push(_loc2_.issueData);
            }
            _loc4_++;
        }
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._messageTemplates.push(param1.readString());
            _loc4_++;
        }
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            param1.readString();
            _loc4_++;
        }
        this._cfhPermission = param1.readBoolean();
        this._chatlogsPermission = param1.readBoolean();
        this._alertPermission = param1.readBoolean();
        this._kickPermission = param1.readBoolean();
        this._banPermission = param1.readBoolean();
        this._roomAlertPermission = param1.readBoolean();
        this._roomKickPermission = param1.readBoolean();
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._roomMessageTemplates.push(param1.readString());
            _loc4_++;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._messageTemplates = null;
        this._roomMessageTemplates = null;
        this._issues = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get messageTemplates(): any[] {
        return this._messageTemplates;
    }

    public get roomMessageTemplates(): any[] {
        return this._roomMessageTemplates;
    }

    public get issues(): any[] {
        return this._issues;
    }

    public get cfhPermission(): boolean {
        return this._cfhPermission;
    }

    public get chatlogsPermission(): boolean {
        return this._chatlogsPermission;
    }

    public get alertPermission(): boolean {
        return this._alertPermission;
    }

    public get kickPermission(): boolean {
        return this._kickPermission;
    }

    public get banPermission(): boolean {
        return this._banPermission;
    }

    public get roomAlertPermission(): boolean {
        return this._roomAlertPermission;
    }

    public get roomKickPermission(): boolean {
        return this._roomKickPermission;
    }

    get [IDisposable](): true {
        return true;
    }
}
