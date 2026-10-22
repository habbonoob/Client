import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FriendRequestData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestData';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FriendRequestsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::FriendRequestsMessageParser'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FriendRequestsMessageParser.#initStatics();
        return FriendRequestsMessageParser._log;
    }

    constructor() {
    }

    declare private _totalReqCount: number;
    static { (this.prototype as any)._totalReqCount = 0; }

    declare private _reqs: any[];

    public get totalReqCount(): number {
        return this._totalReqCount;
    }

    public get reqs(): any[] {
        return this._reqs;
    }

    public flush(): boolean {
        this._reqs = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._totalReqCount = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        FriendRequestsMessageParser._log.info("Received friend requests: " + this._totalReqCount + ", " + _loc2_);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._reqs.push(new FriendRequestData(param1));
            _loc3_++;
        }
        return true;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FriendRequestsMessageParser.#staticsReady) return;
        FriendRequestsMessageParser.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FriendRequestsMessageParser, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.messages.parser.friendlist.FriendRequestsMessageParser"));
    }
}
