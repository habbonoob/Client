import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';
import type { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';
import type { VariableLeaderboardView } from '@/com/sulake/habbo/roomevents/variable_leaderboard/views/VariableLeaderboardView';
import type { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import { VariableLeaderboardChunkState } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardChunkState';
import { VariableLeaderboardPagingState } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardPagingState';

export class VariableLeaderboardOverlayState {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard::VariableLeaderboardOverlayState'); }

    declare private _SafeStr_14280: VariableLeaderboardDescriptor;

    declare private _SafeStr_14031: string;

    declare private _SafeStr_14281: VariableLeaderboardPagingState;

    declare private _SafeStr_14282: any;

    declare private _SafeStr_14283: string;

    declare private _view: VariableLeaderboardView;

    declare private _SafeStr_14284: boolean;
    static { (this.prototype as any)._SafeStr_14284 = false; }

    declare private _SafeStr_14285: VariableLeaderboardConfig;

    private _SafeStr_14286: boolean = true;

    declare private _SafeStr_14287: string;

    declare private _SafeStr_14288: boolean;
    static { (this.prototype as any)._SafeStr_14288 = false; }

    private _SafeStr_14289: number = -1;
    private _renderedPageNumber: number = -1;
    private _SafeStr_14290: number = -1;

    declare private _SafeStr_14291: boolean;
    static { (this.prototype as any)._SafeStr_14291 = false; }

    declare private _SafeStr_14292: boolean;
    static { (this.prototype as any)._SafeStr_14292 = false; }

    declare private _SafeStr_14293: VariableLeaderboardRow[];

    declare private _SafeStr_14294: boolean;
    static { (this.prototype as any)._SafeStr_14294 = false; }

    constructor(param1: VariableLeaderboardDescriptor) {
        this._SafeStr_14280 = param1;
        this._SafeStr_14281 = new VariableLeaderboardPagingState(param1.entriesPerPage);
        this._SafeStr_14282 = {};
        this._SafeStr_14293 = new Array<VariableLeaderboardRow>(20).fill(null);
    }

    private static vectorsEqual(param1: number[], param2: number[]): boolean {
        let _loc3_: number = 0;
        if (param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] != param2[_loc3_]) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private static compareInts(param1: number, param2: number): number {
        return param1 < param2 ? -1 : (param1 > param2 ? 1 : 0);
    }

    public offers(param1: string): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of this._SafeStr_14280.choices ?? []) {
            if (_loc2_.variableId == param1) {
                return true;
            }
        }
        return false;
    }

    public applyDescriptor(param1: VariableLeaderboardDescriptor): void {
        this._SafeStr_14280 = param1;
        this._SafeStr_14286 = true;
    }

    public resetQueryScope(param1: string): void {
        this._SafeStr_14031 = param1;
        this._SafeStr_14281.reset();
        this._SafeStr_14282 = {};
        this._SafeStr_14283 = null;
        this.invalidateVisibleRendering();
    }

    public replaceSubscription(param1: number[]): boolean {
        let _loc3_: VariableLeaderboardChunkState = null;
        let _loc2_: number[] = param1.slice();
        _loc2_.sort(VariableLeaderboardOverlayState.compareInts);
        if (this._SafeStr_14283 == this._SafeStr_14031 && VariableLeaderboardOverlayState.vectorsEqual(this._SafeStr_14281.subscribedChunkIndices, _loc2_)) {
            return false;
        }
        this._SafeStr_14283 = this._SafeStr_14031;
        this._SafeStr_14281.replaceSubscribedChunks(_loc2_);
        for (const _loc5_ of keysOf(this._SafeStr_14282)) {
            if (_loc2_.indexOf(_loc5_ | 0) < 0) {
                delete this._SafeStr_14282[_loc5_];
            }
        }
        for (const _loc4_ of _loc2_ ?? []) {
            _loc3_ = asInstanceOf(this._SafeStr_14282[String(_loc4_)], VariableLeaderboardChunkState);
            if (_loc3_ == null) {
                _loc3_ = new VariableLeaderboardChunkState();
                this._SafeStr_14282[String(_loc4_)] = _loc3_;
            }
        }
        return true;
    }

    public clearSubscription(): void {
        this._SafeStr_14283 = null;
        this._SafeStr_14281.replaceSubscribedChunks([]);
        this._SafeStr_14282 = {};
        this.invalidateVisibleRendering();
    }

    public getChunk(param1: number): VariableLeaderboardChunkState {
        return asInstanceOf(this._SafeStr_14282[String(param1)], VariableLeaderboardChunkState);
    }

    public hasRequestedChunk(param1: number): boolean {
        return this._SafeStr_14281.subscribedChunkIndices.indexOf(param1) >= 0;
    }

    public set view(param1: VariableLeaderboardView) {
        this._view = param1;
        this._SafeStr_14284 = false;
        this.invalidateViewRendering();
    }

    public invalidateViewRendering(): void {
        this._SafeStr_14286 = true;
        this._SafeStr_14287 = null;
        this._SafeStr_14288 = false;
        this._SafeStr_14289 = -1;
        this._renderedPageNumber = -1;
        this._SafeStr_14290 = -1;
        this._SafeStr_14291 = false;
        this._SafeStr_14292 = false;
        this.invalidateVisibleRendering();
    }

    public invalidateVisibleRendering(): void {
        this._SafeStr_14293 = new Array<VariableLeaderboardRow>(20).fill(null);
        this._SafeStr_14294 = false;
    }

    public disposeView(): void {
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._SafeStr_14284 = false;
    }

    public get overlayInstanceId(): number {
        return this._SafeStr_14280.overlayInstanceId;
    }

    public get descriptor(): VariableLeaderboardDescriptor {
        return this._SafeStr_14280;
    }

    public get selectedVariableId(): string {
        return this._SafeStr_14031;
    }

    public get paging(): VariableLeaderboardPagingState {
        return this._SafeStr_14281;
    }

    public get subscribedVariableId(): string {
        return this._SafeStr_14283;
    }

    public get view(): VariableLeaderboardView {
        return this._view;
    }

    public get viewAttached(): boolean {
        return this._SafeStr_14284;
    }

    public set viewAttached(param1: boolean) {
        this._SafeStr_14284 = param1;
    }

    public get editDraft(): VariableLeaderboardConfig {
        return this._SafeStr_14285;
    }

    public set editDraft(param1: VariableLeaderboardConfig) {
        this._SafeStr_14285 = param1;
    }

    public get descriptorDirty(): boolean {
        return this._SafeStr_14286;
    }

    public markDescriptorRendered(): void {
        this._SafeStr_14286 = false;
    }

    public get renderedSelection(): string {
        return this._SafeStr_14287;
    }

    public get renderedSelectionSet(): boolean {
        return this._SafeStr_14288;
    }

    public markRenderedSelection(param1: string): void {
        this._SafeStr_14287 = param1;
        this._SafeStr_14288 = true;
    }

    public get renderedBodyState(): number {
        return this._SafeStr_14289;
    }

    public set renderedBodyState(param1: number) {
        this._SafeStr_14289 = param1;
    }

    public get renderedPageNumber(): number {
        return this._renderedPageNumber;
    }

    public get renderedPageCount(): number {
        return this._SafeStr_14290;
    }

    public get renderedPreviousEnabled(): boolean {
        return this._SafeStr_14291;
    }

    public get renderedNextEnabled(): boolean {
        return this._SafeStr_14292;
    }

    public markRenderedPager(param1: number, param2: number, param3: boolean, param4: boolean): void {
        this._renderedPageNumber = param1;
        this._SafeStr_14290 = param2;
        this._SafeStr_14291 = param3;
        this._SafeStr_14292 = param4;
    }

    public renderedRowAt(param1: number): VariableLeaderboardRow {
        return this._SafeStr_14293[param1];
    }

    public setRenderedRowAt(param1: number, param2: VariableLeaderboardRow): void {
        this._SafeStr_14293[param1] = param2;
    }

    public get renderedRowsInitialized(): boolean {
        return this._SafeStr_14294;
    }

    public markRenderedRowsInitialized(): void {
        this._SafeStr_14294 = true;
    }
}
