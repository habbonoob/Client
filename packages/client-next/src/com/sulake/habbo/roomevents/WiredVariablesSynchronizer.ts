import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { WiredAllVariablesDiffsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredAllVariablesDiffsMessageParser';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredAllVariablesDiffsEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredAllVariablesDiffsEvent';
import { WiredAllVariablesHashEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredAllVariablesHashEvent';
import { WiredGetAllVariablesDiffsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetAllVariablesDiffsMessageComposer';
import { WiredGetAllVariablesHashMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredGetAllVariablesHashMessageComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';

export class WiredVariablesSynchronizer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::WiredVariablesSynchronizer'); }

    private static STATUS_IDLE: number = 0;
    private static STATUS_AWAIT_HASH: number = 1;
    private static STATUS_AWAIT_DIFFS: number = 2;
    private static REQUEST_OFFSET: number = 800;
    private static INVALIDATE_REQUEST_OFFSET: number = 4000;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _SafeStr_2846: number = -1;
    private _status: number = WiredVariablesSynchronizer.STATUS_IDLE;

    declare private _allVariablesHash: number;
    static { (this.prototype as any)._allVariablesHash = 0; }

    private _SafeStr_2654: Map<any, any> = null;
    private _variableIdToHash: Map<any, any> = null;
    private _listeners: ((...args: any[]) => any)[] = [];

    declare private _events: HabboUserDefinedRoomEvents;

    declare private _messageEvents: any[];

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._events = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredAllVariablesHashEvent(this.onAllVariablesHashEvent));
        this._messageEvents.push(new WiredAllVariablesDiffsEvent(this.onAllVariablesDiffEvent));
        for (const _loc2_ of this._messageEvents ?? []) {
            this._events.communication.addHabboConnectionMessageEvent(_loc2_);
        }
    }

    public getAllVariables(param1: (...args: any[]) => any, param2: boolean = true, param3: number = 0): boolean {
        if (this._status != WiredVariablesSynchronizer.STATUS_IDLE && this._SafeStr_2846 < getTimer() - WiredVariablesSynchronizer.INVALIDATE_REQUEST_OFFSET) {
            this._status = WiredVariablesSynchronizer.STATUS_IDLE;
        }
        if (this._status != WiredVariablesSynchronizer.STATUS_IDLE) {
            this.addListener(param1);
            return false;
        }
        if (this._SafeStr_2846 > getTimer() - WiredVariablesSynchronizer.REQUEST_OFFSET) {
            param1(this.sortedCachedVariables);
            return true;
        }
        if (!param2 && this._SafeStr_2654 != null) {
            param1(this.sortedCachedVariables);
            return true;
        }
        this._SafeStr_2846 = getTimer();
        this._status = WiredVariablesSynchronizer.STATUS_AWAIT_HASH;
        this.addListener(param1);
        if (param3 != 0) {
            this.onAllVariablesHash(param3);
        } else {
            this._events.send(new WiredGetAllVariablesHashMessageComposer());
        }
        return false;
    }

    public getCachedVariableById(param1: string): WiredVariable {
        return this._SafeStr_2654.get(param1);
    }

    private onAllVariablesHashEvent = (param1: WiredAllVariablesHashEvent): void => {
        this.onAllVariablesHash(param1.getParser().allVariablesHash);
    };

    private onAllVariablesHash(param1: number): void {
        if (this._status != WiredVariablesSynchronizer.STATUS_AWAIT_HASH) {
            return;
        }
        this._SafeStr_2846 = getTimer();
        if (param1 == this._allVariablesHash) {
            this.updateListeners();
            this._status = WiredVariablesSynchronizer.STATUS_IDLE;
        } else {
            this._allVariablesHash = param1;
            this._status = WiredVariablesSynchronizer.STATUS_AWAIT_DIFFS;
            this._events.send(new WiredGetAllVariablesDiffsMessageComposer(this._variableIdToHash));
        }
    }

    private onAllVariablesDiffEvent = (param1: WiredAllVariablesDiffsEvent): void => {
        if (this._status != WiredVariablesSynchronizer.STATUS_AWAIT_DIFFS) {
            return;
        }
        this._SafeStr_2846 = getTimer();
        let _loc2_: WiredAllVariablesDiffsMessageParser = param1.getParser();
        this._allVariablesHash = _loc2_.allVariablesHash;
        if (this._SafeStr_2654 == null) {
            this._SafeStr_2654 = new Dictionary();
            this._variableIdToHash = new Dictionary();
        }
        this.deleteVariablesInCache(_loc2_.removedVariables);
        this.updateVariablesInCache(_loc2_.addedOrUpdated);
        if (_loc2_.isLastChunk) {
            this.updateListeners();
            this._status = WiredVariablesSynchronizer.STATUS_IDLE;
        }
    };

    private deleteVariablesInCache(param1: string[]): void {
        for (const _loc2_ of param1 ?? []) {
            if (this._SafeStr_2654.has(_loc2_)) {
                this._SafeStr_2654.delete(_loc2_);
                this._variableIdToHash.delete(_loc2_);
            }
        }
    }

    private updateVariablesInCache(param1: Map<any, any>): void {
        let _loc3_: number = 0;
        for (const _loc2_ of param1?.keys() ?? []) {
            _loc3_ = param1.get(_loc2_) | 0;
            this._SafeStr_2654.set(_loc2_.variableId, _loc2_);
            this._variableIdToHash.set(_loc2_.variableId, _loc3_);
        }
    }

    private get sortedCachedVariables(): WiredVariable[] {
        if (this._SafeStr_2654 == null) {
            return [];
        }
        let _loc1_: WiredVariable[] = [];
        for (const _loc2_ of this._SafeStr_2654?.values() ?? []) {
            _loc1_.push(_loc2_);
        }
        Util.sortVariables(_loc1_);
        return _loc1_;
    }

    private addListener(param1: (...args: any[]) => any): void {
        if (this._listeners.indexOf(param1) == -1) {
            this._listeners.push(param1);
        }
    }

    public removeListener(param1: (...args: any[]) => any): void {
        let _loc2_: number = this._listeners.indexOf(param1);
        if (_loc2_ != -1) {
            this._listeners.splice(_loc2_, 1)[0];
        }
    }

    private updateListeners(): void {
        let _loc1_: WiredVariable[] = this.sortedCachedVariables;
        for (const _loc2_ of this._listeners ?? []) {
            _loc2_(_loc1_);
        }
        this._listeners.splice(0, this._listeners.length);
    }

    public clear(): void {
        this._listeners = [];
        this._SafeStr_2654 = null;
        this._variableIdToHash = null;
        this._allVariablesHash = 0;
        this._SafeStr_2846 = -1;
        this._status = WiredVariablesSynchronizer.STATUS_IDLE;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._listeners = null;
        this._SafeStr_2846 = -1;
        this._status = WiredVariablesSynchronizer.STATUS_IDLE;
        this._allVariablesHash = 0;
        this._SafeStr_2654 = null;
        this._variableIdToHash = null;
        for (const _loc1_ of this._messageEvents ?? []) {
            this._events.communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._events = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
