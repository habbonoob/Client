import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { FriendListUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendListUpdateMessageParser';
import type { FriendCategory } from '@/com/sulake/habbo/friendlist/domain/FriendCategory';
import type { IFriendCategoriesDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendCategoriesDeps';
import type { IFriendsView } from '@/com/sulake/habbo/friendlist/IFriendsView';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { FriendListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendListUpdateEvent';
import { Friend } from '@/com/sulake/habbo/friendlist/domain/Friend';
import { FriendOnlineImageListener } from '@/com/sulake/habbo/friendlist/domain/FriendOnlineImageListener';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendCategories {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendCategories'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendCategories.#initStatics();
        return FriendCategories._log;
    }

    private static readonly STOP_SORTING_FRIENDLIST: number = 200;

    constructor(param1: IFriendCategoriesDeps) {
        this._deps = param1;
    }

    declare private _deps: IFriendCategoriesDeps;

    private _categories: any[] = [];
    private _SafeStr_3711: Map<any, any> = new Dictionary();

    public get view(): IFriendsView {
        return this._deps.view;
    }

    public get deps(): IFriendCategoriesDeps {
        return this._deps;
    }

    public addFriend(param1: Friend): FriendCategory {
        let _loc2_: number = param1.online ? param1.categoryId : -1;
        let _loc3_: FriendCategory = this.findCategory(_loc2_);
        if (_loc3_ != null) {
            _loc3_.addFriend(param1);
            this._SafeStr_3711.set(param1.id, param1);
            return _loc3_;
        }
        FriendCategories._log.warn("No category " + _loc2_ + " found for friend " + param1.id + ". Ignoring");
        return null;
    }

    public sort(param1: boolean = false): void {
        for (const _loc2_ of this._categories ?? []) {
            if (!param1 || _loc2_.friends.length < 200) {
                _loc2_.sort();
            }
        }
    }

    public getSelectedFriends(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._categories ?? []) {
            _loc2_.getSelectedFriends(_loc1_);
        }
        return _loc1_;
    }

    public getSelectedFriend(): Friend {
        let _loc1_: any[] = this.getSelectedFriends();
        return _loc1_.length == 1 ? _loc1_[0] : null;
    }

    public getAllFriends(): Map<any, any> {
        return this._SafeStr_3711;
    }

    public getFriendCount(param1: boolean, param2: boolean = false): number {
        let _loc3_: number = 0;
        for (const _loc4_ of this._categories ?? []) {
            _loc3_ = _loc3_ + _loc4_.getFriendCount(param1, param2) | 0;
        }
        return _loc3_;
    }

    public getCategories(): any[] {
        return this._categories;
    }

    public addCategory(param1: FriendCategory): void {
        this._categories.push(param1);
    }

    public findFriend(param1: number): Friend {
        return this._SafeStr_3711.get(param1);
    }

    public findCategory(param1: number): FriendCategory {
        for (const _loc2_ of this._categories ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public onFriendListUpdate(param1: IMessageEvent): void {
        let _loc5_: Friend = null;
        let _loc8_: boolean = false;
        let _loc3_: Friend = null;
        let _loc2_: FriendListUpdateMessageParser = (param1 instanceof FriendListUpdateEvent ? param1 : null).getParser();
        this.updateCategories(_loc2_.cats);
        for (const _loc4_ of _loc2_.removedFriendIds ?? []) {
            this.removeFriend(_loc4_ | 0, true);
        }
        for (const _loc7_ of _loc2_.updatedFriends ?? []) {
            FriendCategories._log.info("Got UPDATE: " + _loc7_.id + ", " + _loc7_.online + ", " + _loc7_.name + ", " + _loc7_.followingAllowed);
            this._deps.messenger.setFollowingAllowed(_loc7_.id | 0, !!(_loc7_.followingAllowed && _loc7_.online));
            _loc8_ = this.isFriendOnline(_loc7_.id | 0);
            if (_loc8_ && !_loc7_.online) {
                this._deps.messenger.setOnlineStatus(_loc7_.id | 0, _loc7_.online);
            }
            if (!_loc8_ && _loc7_.online) {
                this._deps.messenger.setOnlineStatus(_loc7_.id | 0, _loc7_.online);
                this._deps.view.setNewMessageArrived();
            }
            _loc3_ = this.removeFriend(_loc7_.id | 0, true);
            _loc5_ = new Friend(_loc7_);
            _loc5_.selected = _loc3_ != null ? _loc3_.selected : false;
            this.addFriend(_loc5_);
            if (_loc3_ != null && !_loc3_.online && _loc5_.online) {
                this.notifyFriendOnline(_loc5_);
            }
        }
        for (const _loc6_ of _loc2_.addedFriends ?? []) {
            _loc5_ = new Friend(_loc6_);
            FriendCategories._log.info("Got INSERT: " + _loc6_.id + ", " + _loc6_.name);
            this.removeFriend(_loc6_.id | 0, true);
            this.addFriend(_loc5_);
        }
        this.sort(true);
        this._deps.view.refreshList();
    }

    public getFriendNames(): any[] {
        if (this._SafeStr_3711 == null) {
            return [];
        }
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_3711?.values() ?? []) {
            if (_loc2_ != null) {
                _loc1_.push(_loc2_.name);
            }
        }
        return _loc1_;
    }

    public notifyFriendOnline(param1: Friend, param2: IAvatarImage = null): void {
        let _loc4_: FriendOnlineImageListener = null;
        if (!(asInstanceOf(this._deps.messenger, Component)).getBoolean("friend_online_indicator.enabled")) {
            return;
        }
        let _loc3_: BitmapData = null;
        if (param2 == null) {
            _loc4_ = new FriendOnlineImageListener(param1, this);
            param2 = this._deps.avatarManager.createAvatarImage(param1.figure, "h", null, _loc4_);
        }
        if (param2 == null || param2.isPlaceholder()) {
            if (param2 != null) {
                param2.dispose();
            }
            return;
        }
        _loc3_ = HabboFaceFocuser.focusUserFace(param2, "head", 2, 1);
        _loc3_ = HabboFaceFocuser.cutCircleFromBitmap(_loc3_, 22);
        param2.dispose();
        let _loc5_: string = this._deps.localizations.getLocalizationWithParams("notifications.friend_online", "", "name", param1.name);
        this._deps.notifications.addItemWithBitmap(_loc5_, "friendonline", _loc3_, "messenger/" + param1.id);
    }

    private updateCategories(param1: any[]): void {
        let _loc3_: FriendCategory = null;
        this.flushReceivedStatus();
        this.findCategory(-1).received = true;
        this.findCategory(0).received = true;
        for (const _loc4_ of param1 ?? []) {
            _loc3_ = this.findCategory(_loc4_.id | 0);
            if (_loc3_ != null) {
                _loc3_.received = true;
                if (_loc3_.name != _loc4_.name) {
                    _loc3_.name = stringOrNull(_loc4_.name);
                }
            }
        }
        for (const _loc2_ of this.getCategoriesNotReceived() ?? []) {
            if (_loc2_.friends.length <= 0) {
                Util.remove(this._categories, _loc2_);
                _loc2_.dispose();
            }
        }
    }

    private removeFriend(param1: number, param2: boolean): Friend {
        if (param2) {
            this._SafeStr_3711.set(param1, null);
        }
        let _loc4_: Friend = null;
        for (const _loc3_ of this._categories ?? []) {
            _loc4_ = _loc3_.removeFriend(param1);
            if (_loc4_ != null) {
                if (param2) {
                    _loc4_.dispose();
                }
            }
        }
        return _loc4_;
    }

    private flushReceivedStatus(): void {
        for (const _loc1_ of this._categories ?? []) {
            _loc1_.received = false;
        }
    }

    private getCategoriesNotReceived(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._categories ?? []) {
            if (!_loc2_.received) {
                _loc1_.push(_loc2_);
            }
        }
        return _loc1_;
    }

    private isFriendOnline(param1: number): boolean {
        let _loc2_: Friend = this.findFriend(param1);
        return _loc2_ != null ? _loc2_.online : false;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendCategories.#staticsReady) return;
        FriendCategories.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendCategories, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.domain.FriendCategories"));
    }
}
