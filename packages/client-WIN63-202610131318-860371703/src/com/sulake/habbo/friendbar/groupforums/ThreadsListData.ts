import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ThreadData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ThreadData';

export class ThreadsListData {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ThreadsListData'); }

    public static readonly PAGE_SIZE: number = 20;

    declare private _totalThreads: number;
    static { (this.prototype as any)._totalThreads = 0; }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _threads: any[];

    declare private _threadsById: Map<any, any>;

    constructor(param1: number, param2: number, param3: any[]) {
        let _loc4_: number = 0;
        let _loc5_: ThreadData = null;
        this._totalThreads = param1;
        this._startIndex = param2;
        this._threads = param3;
        this._threadsById = new Dictionary();
        _loc4_ = 0;
        while (_loc4_ < param3.length) {
            _loc5_ = param3[_loc4_];
            this._threadsById.set(_loc5_.threadId, _loc5_);
            _loc4_++;
        }
    }

    public get totalThreads(): number {
        return this._totalThreads;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get threads(): any[] {
        return this._threads;
    }

    public get threadsById(): Map<any, any> {
        return this._threadsById;
    }

    public get size(): number {
        return this._threads.length | 0;
    }

    public updateThread(param1: ThreadData): boolean {
        let _loc3_: number = 0;
        let _loc2_: ThreadData = null;
        this.threadsById.set(param1.threadId, param1);
        _loc3_ = 0;
        while (_loc3_ < this.threads.length) {
            _loc2_ = this.threads[_loc3_];
            if (_loc2_.threadId == param1.threadId) {
                this.threads[_loc3_] = param1;
                return true;
            }
            _loc3_++;
        }
        return false;
    }
}
