import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';

export class ExtendedForumData extends ForumData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ExtendedForumData'); }

    declare private _readPermissions: number;
    static { (this.prototype as any)._readPermissions = 0; }

    declare private _postMessagePermissions: number;
    static { (this.prototype as any)._postMessagePermissions = 0; }

    declare private _postThreadPermissions: number;
    static { (this.prototype as any)._postThreadPermissions = 0; }

    declare private _moderatePermissions: number;
    static { (this.prototype as any)._moderatePermissions = 0; }

    declare private _readPermissionError: string;

    declare private _postMessagePermissionError: string;

    declare private _postThreadPermissionError: string;

    declare private _moderatePermissionError: string;

    declare private _reportPermissionError: string;

    declare private _canChangeSettings: boolean;
    static { (this.prototype as any)._canChangeSettings = false; }

    declare private _isStaff: boolean;
    static { (this.prototype as any)._isStaff = false; }

    constructor() {
        super();
    }

    public static readFromMessage_ExtendedForumData(param1: IMessageDataWrapper): ExtendedForumData {
        let _loc2_: ExtendedForumData = new ExtendedForumData();
        ForumData.fillFromMessage(_loc2_, param1);
        _loc2_._readPermissions = param1.readInteger();
        _loc2_._postMessagePermissions = param1.readInteger();
        _loc2_._postThreadPermissions = param1.readInteger();
        _loc2_._moderatePermissions = param1.readInteger();
        _loc2_._readPermissionError = param1.readString();
        _loc2_._postMessagePermissionError = param1.readString();
        _loc2_._postThreadPermissionError = param1.readString();
        _loc2_._moderatePermissionError = param1.readString();
        _loc2_._reportPermissionError = param1.readString();
        _loc2_._canChangeSettings = param1.readBoolean();
        _loc2_._isStaff = param1.readBoolean();
        return _loc2_;
    }

    public get readPermissions(): number {
        return this._readPermissions;
    }

    public get postMessagePermissions(): number {
        return this._postMessagePermissions;
    }

    public get postThreadPermissions(): number {
        return this._postThreadPermissions;
    }

    public get moderatePermissions(): number {
        return this._moderatePermissions;
    }

    public get canRead(): boolean {
        return this._readPermissionError.length == 0;
    }

    public get canReport(): boolean {
        return true;
    }

    public get canPostMessage(): boolean {
        return this._postMessagePermissionError.length == 0;
    }

    public get canPostThread(): boolean {
        return this._postThreadPermissionError.length == 0;
    }

    public get canModerate(): boolean {
        return this._moderatePermissionError.length == 0;
    }

    public get canChangeSettings(): boolean {
        return this._canChangeSettings;
    }

    public get isStaff(): boolean {
        return this._isStaff;
    }

    public get readPermissionError(): string {
        return this._readPermissionError;
    }

    public get postMessagePermissionError(): string {
        return this._postMessagePermissionError;
    }

    public get postThreadPermissionError(): string {
        return this._postThreadPermissionError;
    }

    public get moderatePermissionError(): string {
        return this._moderatePermissionError;
    }

    public get reportPermissionError(): string {
        return this._reportPermissionError;
    }
}
