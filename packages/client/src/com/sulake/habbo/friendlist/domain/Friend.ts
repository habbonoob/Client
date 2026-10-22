import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendData';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class Friend implements IFriend, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::Friend'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        Friend.#initStatics();
        return Friend._log;
    }

    public static get GENDER_FEMALE(): number {
        Friend.#initStatics();
        return Friend.GENDER_FEMALE;
    }

    public static get GENDER_MALE(): number {
        Friend.#initStatics();
        return Friend.GENDER_MALE;
    }

    constructor(param1: FriendData) {
        if (param1 == null) {
            return;
        }
        this._id = param1.id;
        this._name = param1.name;
        this._gender = param1.gender;
        this._online = param1.online;
        this._followingAllowed = param1.followingAllowed && param1.online;
        this._figure = param1.figure;
        this._motto = param1.motto;
        this._lastAccess = param1.lastAccess;
        this._categoryId = 0;
        this._realName = param1.realName;
        this._persistedMessageUser = param1.persistedMessageUser;
        this._vipMember = param1.vipMember;
        this._pocketHabboUser = param1.pocketHabboUser;
        this._relationshipStatus = param1.relationshipStatus;
        Friend._log.info("Creating friend: " + this.id + ", " + this.name + ", " + this.gender + ", " + this.online + ", " + this.followingAllowed + ", " + this.figure + ", " + this.categoryId);
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _gender: number;
    static { (this.prototype as any)._gender = 0; }

    declare private _online: boolean;
    static { (this.prototype as any)._online = false; }

    declare private _followingAllowed: boolean;
    static { (this.prototype as any)._followingAllowed = false; }

    declare private _figure: string;

    declare private _motto: string;

    declare private _lastAccess: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _view: IWindowContainer;

    declare private _SafeStr_2500: BitmapData;

    declare private _persistedMessageUser: boolean;
    static { (this.prototype as any)._persistedMessageUser = false; }

    declare private _pocketHabboUser: boolean;
    static { (this.prototype as any)._pocketHabboUser = false; }

    declare private _vipMember: boolean;
    static { (this.prototype as any)._vipMember = false; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _realName: string;

    public get realName(): string {
        return this._realName;
    }

    public set realName(param1: string) {
        this._realName = param1;
    }

    declare private _relationshipStatus: number;
    static { (this.prototype as any)._relationshipStatus = 0; }

    public get relationshipStatus(): number {
        return this._relationshipStatus;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get gender(): number {
        return this._gender;
    }

    public set gender(param1: number) {
        this._gender = param1;
    }

    public get online(): boolean {
        return this._online;
    }

    public set online(param1: boolean) {
        this._online = param1;
    }

    public get followingAllowed(): boolean {
        return this._followingAllowed;
    }

    public set followingAllowed(param1: boolean) {
        this._followingAllowed = param1;
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public get motto(): string {
        return this._motto;
    }

    public set motto(param1: string) {
        this._motto = param1;
    }

    public get lastAccess(): string {
        return this._lastAccess;
    }

    public set lastAccess(param1: string) {
        this._lastAccess = param1;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }

    public get view(): IWindowContainer {
        return this._view;
    }

    public set view(param1: IWindowContainer) {
        this._view = param1;
    }

    public get face(): BitmapData {
        return this._SafeStr_2500;
    }

    public set face(param1: BitmapData) {
        this._SafeStr_2500 = param1;
    }

    public get persistedMessageUser(): boolean {
        return this._persistedMessageUser;
    }

    public set persistedMessageUser(param1: boolean) {
        this._persistedMessageUser = param1;
    }

    public get pocketHabboUser(): boolean {
        return this._pocketHabboUser;
    }

    public set pocketHabboUser(param1: boolean) {
        this._pocketHabboUser = param1;
    }

    public get vipMember(): boolean {
        return this._vipMember;
    }

    public set vipMember(param1: boolean) {
        this._vipMember = param1;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_2500 != null) {
            this._SafeStr_2500.dispose();
            this._SafeStr_2500 = null;
        }
        this._disposed = true;
        this._view = null;
    }

    public isGroupFriend(): boolean {
        return this._id < 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Friend.#staticsReady) return;
        Friend.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Friend, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("GENDER_FEMALE", 0);
        set("GENDER_MALE", 0);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.domain.Friend"));
        set("GENDER_FEMALE", "F".charCodeAt(0) | 0);
        set("GENDER_MALE", "M".charCodeAt(0) | 0);
    }

    get [IDisposable](): true {
        return true;
    }
}
