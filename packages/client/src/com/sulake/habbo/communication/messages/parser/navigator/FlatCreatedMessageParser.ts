import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FlatCreatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::FlatCreatedMessageParser'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FlatCreatedMessageParser.#initStatics();
        return FlatCreatedMessageParser._log;
    }

    constructor() {
    }

    declare private _flatName: string;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    public get flatId(): number {
        return this._flatId;
    }

    public get flatName(): string {
        return this._flatName;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._flatName = param1.readString();
        FlatCreatedMessageParser._log.info("FLAT CREATED: " + this._flatId + ", " + this._flatName);
        return true;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FlatCreatedMessageParser.#staticsReady) return;
        FlatCreatedMessageParser.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FlatCreatedMessageParser, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.messages.parser.navigator.FlatCreatedMessageParser"));
    }
}
