import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableLeaderboardPagingState {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard::VariableLeaderboardPagingState'); }

    public static readonly MAX_CLIENT_PAGE_SIZE: number = 20;
    public static readonly _SafeStr_14273: number = 50;

    declare private _SafeStr_14274: number;
    static { (this.prototype as any)._SafeStr_14274 = 0; }

    declare private _SafeStr_14275: number;
    static { (this.prototype as any)._SafeStr_14275 = 0; }

    declare private _SafeStr_14276: number;
    static { (this.prototype as any)._SafeStr_14276 = 0; }

    declare private _SafeStr_14277: boolean;
    static { (this.prototype as any)._SafeStr_14277 = false; }

    declare private _SafeStr_14033: number;
    static { (this.prototype as any)._SafeStr_14033 = 0; }

    declare private _subscribedChunkIndices: number[];

    constructor(param1: number) {
        this._SafeStr_14274 = param1;
        this._subscribedChunkIndices = [];
    }

    private static compareInts(param1: number, param2: number): number {
        return param1 < param2 ? -1 : (param1 > param2 ? 1 : 0);
    }

    public reset(): void {
        this._SafeStr_14275 = 0;
        this._SafeStr_14276 = 0;
        this._SafeStr_14277 = false;
        this._SafeStr_14033 = 0;
        this._subscribedChunkIndices = [];
    }

    public moveTo(param1: number): boolean {
        if (!this._SafeStr_14277 || param1 < 0 || param1 >= this.pageCount || param1 == this._SafeStr_14275) {
            return false;
        }
        this._SafeStr_14276 = param1 > this._SafeStr_14275 ? 1 : -1;
        this._SafeStr_14275 = param1;
        return true;
    }

    public applyExactTotal(param1: number): boolean {
        this._SafeStr_14277 = true;
        this._SafeStr_14033 = Math.max(0, param1) | 0;
        let _loc2_: number = this.pageCount - 1;
        if (this._SafeStr_14275 <= _loc2_) {
            return false;
        }
        this._SafeStr_14275 = _loc2_;
        this._SafeStr_14276 = -1;
        return true;
    }

    public desiredChunkIndices(): number[] {
        let _loc1_: number[] = [this.currentChunkIndex];
        if (this.lastChunkIndex != this.currentChunkIndex) {
            _loc1_.push(this.lastChunkIndex);
            return _loc1_;
        }
        if (!this._SafeStr_14277) {
            return _loc1_;
        }
        let _loc2_: number = -1;
        if (this._SafeStr_14276 > 0 && this.firstRowIndex + 3 * this._SafeStr_14274 > (this.currentChunkIndex + 1) * 50 && this.currentChunkIndex < this.chunkCount - 1) {
            _loc2_ = this.currentChunkIndex + 1;
        } else if (this._SafeStr_14276 < 0 && this.firstRowIndex - 2 * this._SafeStr_14274 < this.currentChunkIndex * 50 && this.currentChunkIndex > 0) {
            _loc2_ = this.currentChunkIndex - 1;
        }
        if (_loc2_ < 0) {
            for (const _loc3_ of this._subscribedChunkIndices ?? []) {
                if (_loc3_ != this.currentChunkIndex && Math.abs(_loc3_ - this.currentChunkIndex) == 1 && _loc3_ >= 0 && _loc3_ < this.chunkCount) {
                    _loc2_ = _loc3_;
                    break;
                }
            }
        }
        if (_loc2_ >= 0) {
            _loc1_.push(_loc2_);
            _loc1_.sort(VariableLeaderboardPagingState.compareInts);
        }
        return _loc1_;
    }

    public replaceSubscribedChunks(param1: number[]): void {
        this._subscribedChunkIndices = param1.slice();
        this._subscribedChunkIndices.sort(VariableLeaderboardPagingState.compareInts);
    }

    public get clientPage(): number {
        return this._SafeStr_14275;
    }

    public get entriesPerPage(): number {
        return this._SafeStr_14274;
    }

    public set entriesPerPage(param1: number) {
        if (this._SafeStr_14274 != param1) {
            this._SafeStr_14274 = param1;
            this._SafeStr_14275 = 0;
            this._SafeStr_14276 = 0;
        }
    }

    public get currentChunkIndex(): number {
        return Math.floor(this.firstRowIndex / 50) | 0;
    }

    public get lastChunkIndex(): number {
        let _loc1_: number = Math.min(this.firstRowIndex + this._SafeStr_14274, this._SafeStr_14033) | 0;
        return Math.floor(Math.max(this.firstRowIndex, _loc1_ - 1) / 50) | 0;
    }

    public get firstRowIndex(): number {
        return this._SafeStr_14275 * this._SafeStr_14274;
    }

    public get totalKnown(): boolean {
        return this._SafeStr_14277;
    }

    public get totalCount(): number {
        return this._SafeStr_14033;
    }

    public get pageCount(): number {
        return (this._SafeStr_14277 && this._SafeStr_14033 > 0 ? Math.ceil(this._SafeStr_14033 / this._SafeStr_14274) : 1) | 0;
    }

    public get chunkCount(): number {
        return (this._SafeStr_14277 && this._SafeStr_14033 > 0 ? Math.ceil(this._SafeStr_14033 / 50) : 1) | 0;
    }

    public get subscribedChunkIndices(): number[] {
        return this._subscribedChunkIndices.slice();
    }
}
