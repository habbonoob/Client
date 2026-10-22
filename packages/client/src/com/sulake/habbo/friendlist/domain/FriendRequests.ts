import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FriendRequest } from '@/com/sulake/habbo/friendlist/domain/FriendRequest';
import type { IFriendRequestsDeps } from '@/com/sulake/habbo/friendlist/domain/IFriendRequestsDeps';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendRequests {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.domain::FriendRequests'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendRequests.#initStatics();
        return FriendRequests._log;
    }

    constructor(param1: IFriendRequestsDeps, param2: number, param3: number) {
        this._deps = param1;
        this._limit = param2;
        this._clubLimit = param3;
    }

    declare private _deps: IFriendRequestsDeps;

    private _requests: any[] = [];

    declare private _limit: number;
    static { (this.prototype as any)._limit = 0; }

    public get limit(): number {
        return this._limit;
    }

    public set limit(param1: number) {
        this._limit = param1;
    }

    declare private _clubLimit: number;
    static { (this.prototype as any)._clubLimit = 0; }

    public get clubLimit(): number {
        return this._clubLimit;
    }

    public get requests(): any[] {
        return this._requests;
    }

    public clearAndUpdateView(param1: boolean): void {
        let _loc3_: any[] = [];
        for (const _loc2_ of this._requests ?? []) {
            if (!param1 || _loc2_.state != 1) {
                _loc3_.push(_loc2_);
            }
        }
        for (const _loc4_ of _loc3_ ?? []) {
            Util.remove(this._requests, _loc4_);
            if (this._deps.view != null) {
                this._deps.view.removeRequest(_loc4_);
            }
            _loc4_.dispose();
        }
        this.refreshShading();
    }

    public acceptFailed(param1: number): void {
        let _loc2_: FriendRequest = this.getRequestByRequesterId(param1);
        if (_loc2_ == null) {
            FriendRequests._log.warn("Failed to accept friend request from " + param1 + ", error retrieving the friendrequest.");
            return;
        }
        _loc2_.state = 4;
        this._deps.view.refreshRequestEntry(_loc2_);
    }

    public addRequest(param1: FriendRequest): void {
        this._requests.push(param1);
    }

    public addRequestAndUpdateView(param1: FriendRequest): void {
        this._requests.push(param1);
        this._deps.view.addRequest(param1);
    }

    public getRequest(param1: number): FriendRequest {
        for (const _loc2_ of this._requests ?? []) {
            if (_loc2_.requestId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getRequestByRequesterId(param1: number): FriendRequest {
        for (const _loc2_ of this._requests ?? []) {
            if (_loc2_.requesterUserId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public refreshShading(): void {
        let _loc1_: any = true;
        for (const _loc2_ of this._requests ?? []) {
            _loc1_ = !_loc1_;
            this._deps.view.refreshShading(_loc2_, _loc1_);
        }
    }

    public getCountOfOpenRequests(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this.requests ?? []) {
            if (_loc2_.state == 1) {
                _loc1_++;
            }
        }
        return _loc1_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendRequests.#staticsReady) return;
        FriendRequests.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendRequests, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendlist.domain.FriendRequests"));
    }
}
