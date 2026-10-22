import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6026 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6026';
import type { BadgeLeaderboardResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/BadgeLeaderboardResultMessageParser';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GetBadgeLeaderboardMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetBadgeLeaderboardMessageComposer';
import { BadgeLeaderboardPageData } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardPageData';
import { BadgeLeaderboardDataServerChunk } from '@/com/sulake/habbo/groups/badge_leaderboard/server/BadgeLeaderboardDataServerChunk';
import { BadgeLeaderboardDataServerContext } from '@/com/sulake/habbo/groups/badge_leaderboard/server/BadgeLeaderboardDataServerContext';
import { BadgeLeaderboardResolvedPage } from '@/com/sulake/habbo/groups/badge_leaderboard/server/BadgeLeaderboardResolvedPage';

export class BadgeLeaderboardDataServer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard.server::BadgeLeaderboardDataServer'); }

    public static readonly PAGE_SIZE: number = 10;
    private static readonly _SafeStr_15008: number = 50;
    private static readonly PAGES_PER_FETCH: number = 5;
    private static readonly STALE_AFTER_MS: number = 60000;
    private static readonly PREFETCH_BOUNDARY_DISTANCE: number = 1;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_15009: (...args: any[]) => any;

    declare private _SafeStr_15010: Map<any, any>;

    declare private _activeContextKey: string;

    declare private _SafeStr_15011: number;
    static { (this.prototype as any)._SafeStr_15011 = 0; }

    declare private _activeCallback: (...args: any[]) => any;

    declare private _SafeStr_15012: number;
    static { (this.prototype as any)._SafeStr_15012 = 0; }

    private _activeDeliveredChunkSyncTime: number = -1;
    private _SafeStr_15013: number = -1;

    constructor(param1: (...args: any[]) => any) {
        this._SafeStr_15009 = param1;
        this._SafeStr_15010 = new Dictionary();
    }

    public requestPage(param1: number, param2: number, param3: number, param4: (...args: any[]) => any): void {
        let _loc5_: BadgeLeaderboardDataServerContext = null;
        let _loc6_: BadgeLeaderboardResolvedPage = null;
        let _loc7_: number = 0;
        if (this._disposed) {
            return;
        }
        if (param3 < 0) {
            param3 = 0;
        }
        _loc5_ = this.getContext(param1, param2);
        this._activeContextKey = _loc5_.key;
        this._SafeStr_15011 = param3;
        this._activeCallback = param4;
        this._SafeStr_15012 = this._SafeStr_15012 + 1;
        this._activeDeliveredChunkSyncTime = -1;
        this._SafeStr_15013 = -1;
        _loc6_ = this.resolvePage(_loc5_, param3);
        if (_loc6_ != null) {
            this.deliverPage(_loc6_);
            if (_loc6_.isStale) {
                this.synchronizeChunk(_loc5_, _loc6_.chunkIndex);
            }
        } else {
            _loc7_ = this.getChunkIndex(param3);
            if (this.canChunkExist(_loc5_, _loc7_)) {
                this.synchronizeChunk(_loc5_, _loc7_);
            } else {
                this.deliverPage(new BadgeLeaderboardResolvedPage(new BadgeLeaderboardPageData(param1, param2, param3, _loc5_.totalEntries, [], _loc5_.ownEntry), _loc7_, -1, false));
            }
        }
        this.prefetchAroundPage(_loc5_, param3);
    }

    public onBadgeLeaderboardResult(param1: BadgeLeaderboardResultMessageParser): void {
        let _loc3_: BadgeLeaderboardDataServerContext = null;
        let _loc2_: number = 0;
        let _loc4_: BadgeLeaderboardDataServerChunk = null;
        if (this._disposed || param1 == null || param1.size != 50) {
            return;
        }
        _loc3_ = this.getContext(param1.type, param1.rarity);
        _loc2_ = getTimer();
        _loc4_ = new BadgeLeaderboardDataServerChunk(param1.page, param1.totalEntries, param1.entries == null ? [] : param1.entries.concat(), param1.ownEntry, _loc2_);
        _loc3_._SafeStr_3664.set(_loc4_.chunkIndex, _loc4_);
        _loc3_.inFlightChunkIndices.set(_loc4_.chunkIndex, false);
        _loc3_.totalEntries = param1.totalEntries;
        _loc3_.ownEntry = param1.ownEntry;
        if (this._activeContextKey == _loc3_.key) {
            this.deliverActivePageIfAvailable(_loc3_);
            this.prefetchAroundPage(_loc3_, this._SafeStr_15011);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_15009 = null;
        this._SafeStr_15010 = null;
        this._activeContextKey = null;
        this._activeCallback = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private deliverActivePageIfAvailable(param1: BadgeLeaderboardDataServerContext): void {
        let _loc2_: BadgeLeaderboardResolvedPage = this.resolvePage(param1, this._SafeStr_15011);
        if (_loc2_ != null) {
            this.deliverPage(_loc2_);
        }
    }

    private deliverPage(param1: BadgeLeaderboardResolvedPage): void {
        if (this._activeCallback == null || param1 == null || this._disposed) {
            return;
        }
        if (param1.data.page != this._SafeStr_15011 || this.getContextKey(param1.data.type, param1.data.rarity) != this._activeContextKey) {
            return;
        }
        if (this._SafeStr_15013 == this._SafeStr_15012 && this._activeDeliveredChunkSyncTime == param1.chunkSyncTime) {
            return;
        }
        this._SafeStr_15013 = this._SafeStr_15012;
        this._activeDeliveredChunkSyncTime = param1.chunkSyncTime;
        this._activeCallback(param1.data);
    }

    private resolvePage(param1: BadgeLeaderboardDataServerContext, param2: number): BadgeLeaderboardResolvedPage {
        let _loc9_: number = 0;
        let _loc6_: BadgeLeaderboardDataServerChunk = null;
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        let _loc10_: any[] = null;
        let _loc7_: number = 0;
        let _loc11_: number = 0;
        let _loc4_: boolean = false;
        let _loc3_: _SafeCls_6026 = null;
        _loc9_ = this.getChunkIndex(param2);
        _loc6_ = asInstanceOf(param1._SafeStr_3664.get(_loc9_), BadgeLeaderboardDataServerChunk);
        if (_loc6_ == null) {
            return null;
        }
        _loc5_ = param2 % 5;
        _loc8_ = _loc5_ * 10;
        _loc10_ = [];
        _loc11_ = Math.max(0, Math.min(10, _loc6_.entries.length - _loc8_)) | 0;
        _loc7_ = 0;
        while (_loc7_ < _loc11_) {
            _loc10_.push(_loc6_.entries[_loc8_ + _loc7_]);
            _loc7_++;
        }
        _loc3_ = _loc6_.ownEntry ?? param1.ownEntry;
        _loc4_ = getTimer() - _loc6_.lastSynchronizedAt > 60000;
        return new BadgeLeaderboardResolvedPage(new BadgeLeaderboardPageData(param1.type, param1.rarity, param2, _loc6_.totalEntries, _loc10_, _loc3_), _loc9_, _loc6_.lastSynchronizedAt, _loc4_);
    }

    private prefetchAroundPage(param1: BadgeLeaderboardDataServerContext, param2: number): void {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: BadgeLeaderboardDataServerChunk = null;
        _loc5_ = this.getChunkIndex(param2);
        _loc6_ = (_loc5_ + 1) * 5 - 1 - param2;
        if (_loc6_ > 1) {
            return;
        }
        _loc4_ = _loc5_ + 1;
        if (!this.canChunkExist(param1, _loc4_)) {
            return;
        }
        _loc3_ = asInstanceOf(param1._SafeStr_3664.get(_loc4_), BadgeLeaderboardDataServerChunk);
        if (_loc3_ == null || getTimer() - _loc3_.lastSynchronizedAt > 60000) {
            this.synchronizeChunk(param1, _loc4_);
        }
    }

    private synchronizeChunk(param1: BadgeLeaderboardDataServerContext, param2: number): void {
        if (this._disposed || param1 == null || this._SafeStr_15009 == null || !this.canChunkExist(param1, param2) || param1.inFlightChunkIndices.get(param2)) {
            return;
        }
        param1.inFlightChunkIndices.set(param2, true);
        this._SafeStr_15009(new GetBadgeLeaderboardMessageComposer(param1.type, param1.rarity, param2, 50));
    }

    private canChunkExist(param1: BadgeLeaderboardDataServerContext, param2: number): boolean {
        if (param2 < 0) {
            return false;
        }
        if (param1.totalEntries < 0) {
            return true;
        }
        return param2 * 50 < param1.totalEntries;
    }

    private getContext(param1: number, param2: number): BadgeLeaderboardDataServerContext {
        let _loc4_: string = this.getContextKey(param1, param2);
        let _loc3_: BadgeLeaderboardDataServerContext = asInstanceOf(this._SafeStr_15010.get(_loc4_), BadgeLeaderboardDataServerContext);
        if (_loc3_ == null) {
            _loc3_ = new BadgeLeaderboardDataServerContext(param1, param2, _loc4_);
            this._SafeStr_15010.set(_loc4_, _loc3_);
        }
        return _loc3_;
    }

    private getChunkIndex(param1: number): number {
        return param1 / 5 | 0;
    }

    private getContextKey(param1: number, param2: number): string {
        return param1.toString() + ":" + param2.toString();
    }

    get [IDisposable](): true {
        return true;
    }
}
