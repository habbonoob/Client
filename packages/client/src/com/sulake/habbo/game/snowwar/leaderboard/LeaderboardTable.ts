import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { Game2GetFriendsLeaderboardComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/score/Game2GetFriendsLeaderboardComposer';
import { LeaderboardEntry } from '@/com/sulake/habbo/communication/messages/parser/game/score/LeaderboardEntry';

export class LeaderboardTable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.leaderboard::LeaderboardTable'); }

    public static readonly SCROLL_DOWN: number = 0;
    public static readonly SCROLL_UP: number = 1;

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
        this._SafeStr_5926 = this._gameEngine.sessionDataManager.userId;
        this._viewSize = this._gameEngine.config.getInteger("games.highscores.viewSize", 8);
        this._SafeStr_3110 = this._gameEngine.config.getInteger("games.highscores.windowSize", 50);
    }

    declare protected _gameEngine: SnowWarEngine;

    declare protected _SafeStr_8564: boolean;
    static { (this.prototype as any)._SafeStr_8564 = false; }

    declare protected _SafeStr_5926: number;
    static { (this.prototype as any)._SafeStr_5926 = 0; }

    protected _favouriteGroupId: number = -1;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare protected _entries: any[];

    protected _SafeStr_2236: number = -1;

    declare protected _totalListSize: number;
    static { (this.prototype as any)._totalListSize = 0; }

    protected _viewSize: number = 8;
    protected _SafeStr_3110: number = 50;
    protected _SafeStr_2540: boolean = true;

    declare protected _SafeStr_5558: number;
    static { (this.prototype as any)._SafeStr_5558 = 0; }

    public get viewSize(): number {
        return this._viewSize;
    }

    public get favouriteGroupId(): number {
        return this._favouriteGroupId;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.disposeTable();
        this._gameEngine = null;
        this._entries = null;
        this._disposed = true;
    }

    public disposeTable(): void {
        this._SafeStr_2236 = -1;
        this._entries = null;
        this._totalListSize = -1;
        this._SafeStr_2540 = true;
    }

    public addEntries(param1: any[], param2: number): void {
        this._totalListSize = param2;
        if (!this._entries) {
            this._entries = param1;
            this.initializeList();
        } else {
            this._entries = param1;
            this.updateCurrentIndex();
        }
        this._SafeStr_2540 = false;
    }

    public addGroupEntries(param1: any[], param2: number, param3: number): void {
        this._favouriteGroupId = param3;
        this._totalListSize = param2;
        if (!this._entries) {
            this._entries = param1;
            this.initializeList();
        } else {
            this._entries = param1;
            this.updateCurrentIndex();
        }
        this._SafeStr_2540 = false;
    }

    public isInitialized(): boolean {
        return this._entries != null;
    }

    public scrollUp(): boolean {
        let _loc2_: number = 0;
        let _loc1_: IMessageComposer = null;
        if (this._SafeStr_2540) {
            return false;
        }
        this._SafeStr_2236 -= this._viewSize;
        if (this._SafeStr_2236 < 0) {
            if (this._entries[0].rank > 1) {
                _loc2_ = Math.max(1, this._entries[0].rank - this._SafeStr_3110) | 0;
                _loc1_ = this.getMessageComposer(this._SafeStr_5558, _loc2_, 1);
                this._gameEngine.communication.connection.send(_loc1_);
                this._SafeStr_2540 = true;
                return false;
            }
            this._SafeStr_2236 = 0;
        }
        return true;
    }

    public scrollDown(): boolean {
        let _loc2_: number = 0;
        let _loc1_: IMessageComposer = null;
        if (this._SafeStr_2540) {
            return false;
        }
        this._SafeStr_2236 += this._viewSize;
        if (this._SafeStr_2236 + this._viewSize >= this._entries.length) {
            if (this._entries[this._entries.length - 1].rank < this._totalListSize) {
                _loc2_ = this._entries[this._entries.length - 1].rank + 1 | 0;
                _loc1_ = this.getMessageComposer(this._SafeStr_5558, _loc2_, 0);
                this._gameEngine.communication.connection.send(_loc1_);
                this._SafeStr_2540 = true;
                return false;
            }
        }
        return true;
    }

    public revertToDefaultView(param1: number): void {
        this.disposeTable();
        let _loc2_: IMessageComposer = this.getMessageComposer(param1, -1, 0);
        this._gameEngine.communication.connection.send(_loc2_);
        this._SafeStr_2540 = true;
        this._SafeStr_5558 = param1;
    }

    public getVisibleEntries(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        if (!this._entries) {
            return _loc1_;
        }
        let _loc3_: number = Math.min(this._entries.length, this._SafeStr_2236 + this._viewSize) | 0;
        _loc2_ = this._SafeStr_2236;
        while (_loc2_ < _loc3_) {
            _loc1_.push(this._entries[_loc2_]);
            _loc2_++;
        }
        return _loc1_;
    }

    public canScrollUp(): boolean {
        if (this._SafeStr_2540 || !this._entries || this._entries.length == 0) {
            return false;
        }
        if (this._entries[0].rank == 1 && this._SafeStr_2236 <= 0) {
            return false;
        }
        return true;
    }

    public canScrollDown(): boolean {
        if (this._SafeStr_2540 || !this._entries || this._entries.length == 0) {
            return false;
        }
        if (this._entries[this._entries.length - 1].rank >= this._totalListSize && this._SafeStr_2236 + this._viewSize >= this._entries.length) {
            return false;
        }
        return true;
    }

    protected initializeList(): void {
        let _loc3_: number = 0;
        let _loc1_: any = false;
        let _loc2_: any = 0;
        _loc3_ = 0;
        while (_loc3_ < this._entries.length) {
            _loc1_ = (asInstanceOf(this._entries[_loc3_], LeaderboardEntry)).gender == "g";
            if (!_loc1_ && (asInstanceOf(this._entries[_loc3_], LeaderboardEntry)).userId == this._SafeStr_5926) {
                _loc2_ = _loc3_;
                break;
            }
            if (_loc1_ && (asInstanceOf(this._entries[_loc3_], LeaderboardEntry)).userId == this._favouriteGroupId) {
                _loc2_ = _loc3_;
                break;
            }
            _loc3_++;
        }
        if (_loc2_ >= this._viewSize) {
            this._SafeStr_2236 = _loc2_ - this._viewSize / 2 | 0;
        } else {
            this._SafeStr_2236 = 0;
        }
    }

    protected getMessageComposer(param1: number, param2: number, param3: number): IMessageComposer {
        return new Game2GetFriendsLeaderboardComposer(param1, param2, param3, this._viewSize, this._SafeStr_3110);
    }

    private updateCurrentIndex(): void {
        if (this._SafeStr_2236 < 0) {
            this._SafeStr_2236 += this._SafeStr_3110;
        } else {
            this._SafeStr_2236 -= this._SafeStr_3110;
        }
    }
}
