import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomVisitHistoryEntry } from '@/com/sulake/habbo/ui/widget/roomtools/RoomVisitHistoryEntry';

export class RoomVisitHistory {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomVisitHistory'); }

    static #staticsReady = false;

    private static readonly MAX_HISTORY_LENGTH: number = 20;

    private static get _SafeStr_14760(): RoomVisitHistory {
        RoomVisitHistory.#initStatics();
        return RoomVisitHistory._SafeStr_14760;
    }

    private _history: RoomVisitHistoryEntry[] = [];
    private _SafeStr_2236: number = -1;

    constructor() {
    }

    public static get shared(): RoomVisitHistory {
        return RoomVisitHistory._SafeStr_14760;
    }

    public get currentIndex(): number {
        return this._SafeStr_2236;
    }

    public get length(): number {
        return this._history.length | 0;
    }

    public get currentRoom(): RoomVisitHistoryEntry {
        if (this._SafeStr_2236 < 0 || this._SafeStr_2236 >= this._history.length) {
            return null;
        }
        return this._history[this._SafeStr_2236];
    }

    public canGoBack(): boolean {
        return this._SafeStr_2236 > 0 && this._history.length > 0;
    }

    public canGoForward(): boolean {
        return this._SafeStr_2236 >= 0 && this._SafeStr_2236 < this._history.length - 1;
    }

    public goBack(): RoomVisitHistoryEntry {
        if (!this.canGoBack()) {
            return null;
        }
        this._SafeStr_2236 = this._SafeStr_2236 - 1;
        return this._history[this._SafeStr_2236];
    }

    public goForward(): RoomVisitHistoryEntry {
        if (!this.canGoForward()) {
            return null;
        }
        this._SafeStr_2236 = this._SafeStr_2236 + 1;
        return this._history[this._SafeStr_2236];
    }

    public updateRoomName(param1: number, param2: string): void {
        for (const _loc3_ of this._history ?? []) {
            if (_loc3_.flatId == param1) {
                _loc3_.roomName = param2;
            }
        }
    }

    public onRoomEntered(param1: number, param2: string): void {
        this.updateRoomName(param1, param2);
        if (this._history.length == 0) {
            this.appendEntry(param1, param2);
            return;
        }
        this.normalizeCurrentIndex();
        let _loc3_: RoomVisitHistoryEntry = this.currentRoom;
        if (_loc3_ != null && _loc3_.flatId == param1) {
            _loc3_.roomName = param2;
            return;
        }
        if (this._SafeStr_2236 < this._history.length - 1) {
            this.reverseSuffix(this._SafeStr_2236, this._history.length - 1);
        }
        let _loc4_: RoomVisitHistoryEntry = this._history.length > 0 ? this._history[this._history.length - 1] : null;
        if (_loc4_ != null && _loc4_.flatId == param1) {
            _loc4_.roomName = param2;
            this._SafeStr_2236 = this._history.length - 1;
            return;
        }
        this.appendEntry(param1, param2);
    }

    public getRawHistory(): RoomVisitHistoryEntry[] {
        return this.copyEntries(this._history);
    }

    public getHistoryView(): RoomVisitHistoryEntry[] {
        let _loc3_: number = 0;
        let _loc2_: RoomVisitHistoryEntry = null;
        let _loc4_: string = null;
        let _loc1_: RoomVisitHistoryEntry[] = [];
        let _loc5_: any = {};
        _loc3_ = this._history.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = this._history[_loc3_];
            _loc4_ = String(_loc2_.flatId);
            if (!_loc5_[_loc4_]) {
                _loc5_[_loc4_] = true;
                _loc1_.unshift(_loc2_.copy());
            }
            _loc3_--;
        }
        return _loc1_;
    }

    private appendEntry(param1: number, param2: string): void {
        this._history.push(new RoomVisitHistoryEntry(param1, param2));
        this._SafeStr_2236 = this._history.length - 1;
        this.trimToMaxLength();
    }

    private trimToMaxLength(): void {
        while (this._history.length > 20) {
            this._history.shift();
            this._SafeStr_2236 = this._SafeStr_2236 - 1;
        }
        this.normalizeCurrentIndex();
    }

    private normalizeCurrentIndex(): void {
        if (this._history.length == 0) {
            this._SafeStr_2236 = -1;
        } else if (this._SafeStr_2236 < 0) {
            this._SafeStr_2236 = 0;
        } else if (this._SafeStr_2236 >= this._history.length) {
            this._SafeStr_2236 = this._history.length - 1;
        }
    }

    private reverseSuffix(param1: number, param2: number): void {
        let _loc3_: RoomVisitHistoryEntry = null;
        if (this._history.length == 0) {
            return;
        }
        param1 = Math.max(0, param1) | 0;
        param2 = Math.min(param2, this._history.length - 1) | 0;
        while (param1 < param2) {
            _loc3_ = this._history[param1];
            this._history[param1] = this._history[param2];
            this._history[param2] = _loc3_;
            param1++;
            param2--;
        }
    }

    private copyEntries(param1: RoomVisitHistoryEntry[]): RoomVisitHistoryEntry[] {
        let _loc2_: RoomVisitHistoryEntry[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(_loc3_.copy());
        }
        return _loc2_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomVisitHistory.#staticsReady) return;
        RoomVisitHistory.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomVisitHistory, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_14760", null);
        set("_SafeStr_14760", new RoomVisitHistory());
    }
}
