import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ThreadData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ThreadData'); }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _SafeStr_6707: number;
    static { (this.prototype as any)._SafeStr_6707 = 0; }

    declare private _threadAuthorId: string;

    declare private _threadAuthorName: number;
    static { (this.prototype as any)._threadAuthorName = 0; }

    declare private _header: string;

    declare private _nMessages: number;
    static { (this.prototype as any)._nMessages = 0; }

    declare private _nUnreadMessages: number;
    static { (this.prototype as any)._nUnreadMessages = 0; }

    declare private _lastMessageId: number;
    static { (this.prototype as any)._lastMessageId = 0; }

    declare private _lastMessageAuthorId: number;
    static { (this.prototype as any)._lastMessageAuthorId = 0; }

    declare private _lastMessageAuthorName: string;

    declare private _lastMessageTimeAsSecondsAgo: number;
    static { (this.prototype as any)._lastMessageTimeAsSecondsAgo = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _SafeStr_6343: number;
    static { (this.prototype as any)._SafeStr_6343 = 0; }

    declare private _SafeStr_6505: string;

    declare private _SafeStr_6719: number;
    static { (this.prototype as any)._SafeStr_6719 = 0; }

    declare private _isSticky: boolean;
    static { (this.prototype as any)._isSticky = false; }

    declare private _isLocked: boolean;
    static { (this.prototype as any)._isLocked = false; }

    constructor() {
    }

    public static readFromMessage(param1: IMessageDataWrapper): ThreadData {
        let _loc2_: ThreadData = new ThreadData();
        _loc2_.threadId = param1.readInteger();
        _loc2_.threadAuthorId = param1.readInteger();
        _loc2_.threadAuthorName = param1.readString();
        _loc2_.header = param1.readString();
        _loc2_.isSticky = param1.readBoolean();
        _loc2_.isLocked = param1.readBoolean();
        _loc2_.creationTimeAsSecondsAgo = param1.readInteger();
        _loc2_.nMessages = param1.readInteger();
        _loc2_.nUnreadMessages = param1.readInteger();
        _loc2_.lastMessageId = param1.readInteger();
        _loc2_.lastMessageAuthorId = param1.readInteger();
        _loc2_.lastMessageAuthorName = param1.readString();
        _loc2_.lastMessageTimeAsSecondsAgo = param1.readInteger();
        _loc2_.state = param1.readByte();
        _loc2_.adminId = param1.readInteger();
        _loc2_.adminName = param1.readString();
        _loc2_.adminOperationTimeAsSecondsAgo = param1.readInteger();
        return _loc2_;
    }

    public get adminOperationTimeAsSecondsAgo(): number {
        return this._SafeStr_6719;
    }

    public set adminOperationTimeAsSecondsAgo(param1: number) {
        this._SafeStr_6719 = param1;
    }

    public get lastMessageTimeAsSecondsAgo(): number {
        return this._lastMessageTimeAsSecondsAgo;
    }

    public set lastMessageTimeAsSecondsAgo(param1: number) {
        this._lastMessageTimeAsSecondsAgo = param1;
    }

    public get threadId(): number {
        return this._threadId;
    }

    public set threadId(param1: number) {
        this._threadId = param1;
    }

    public get threadAuthorId(): number {
        return this._SafeStr_6707;
    }

    public set threadAuthorId(param1: number) {
        this._SafeStr_6707 = param1;
    }

    public get threadAuthorName(): string {
        return this._threadAuthorId;
    }

    public set threadAuthorName(param1: string) {
        this._threadAuthorId = param1;
    }

    public get creationTimeAsSecondsAgo(): number {
        return this._threadAuthorName;
    }

    public set creationTimeAsSecondsAgo(param1: number) {
        this._threadAuthorName = param1;
    }

    public get header(): string {
        return this._header;
    }

    public set header(param1: string) {
        this._header = param1;
    }

    public get lastMessageId(): number {
        return this._lastMessageId;
    }

    public set lastMessageId(param1: number) {
        this._lastMessageId = param1;
    }

    public get lastMessageAuthorId(): number {
        return this._lastMessageAuthorId;
    }

    public set lastMessageAuthorId(param1: number) {
        this._lastMessageAuthorId = param1;
    }

    public get lastMessageAuthorName(): string {
        return this._lastMessageAuthorName;
    }

    public set lastMessageAuthorName(param1: string) {
        this._lastMessageAuthorName = param1;
    }

    public get nMessages(): number {
        return this._nMessages;
    }

    public set nMessages(param1: number) {
        this._nMessages = param1;
    }

    public get nUnreadMessages(): number {
        return this._nUnreadMessages;
    }

    public set nUnreadMessages(param1: number) {
        this._nUnreadMessages = param1;
    }

    public get state(): number {
        return this._state;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    public get adminId(): number {
        return this._SafeStr_6343;
    }

    public set adminId(param1: number) {
        this._SafeStr_6343 = param1;
    }

    public get adminName(): string {
        return this._SafeStr_6505;
    }

    public set adminName(param1: string) {
        this._SafeStr_6505 = param1;
    }

    public get isSticky(): boolean {
        return this._isSticky;
    }

    public set isSticky(param1: boolean) {
        this._isSticky = param1;
    }

    public get isLocked(): boolean {
        return this._isLocked;
    }

    public set isLocked(param1: boolean) {
        this._isLocked = param1;
    }
}
