import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class _SafeCls_6114 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::_SafeCls_6114'); }

    public static readonly _SafeStr_2166: number = 0;
    public static readonly _SafeStr_14775: number = 1;

    declare private _SafeStr_6717: number;
    static { (this.prototype as any)._SafeStr_6717 = 0; }

    declare private _messageText: string;

    declare private _SafeStr_14156: number;
    static { (this.prototype as any)._SafeStr_14156 = 0; }

    constructor(param1: number, param2: string = "", param3: number = 0) {
        this._SafeStr_6717 = param1;
        this._messageText = param2;
        this._SafeStr_14156 = param3;
    }

    public static parse(param1: IMessageDataWrapper): _SafeCls_6114 {
        let _loc2_: number = param1.readInteger();
        switch (_loc2_) {
            case 0:
                return new _SafeCls_6114(0, param1.readString(), 0);
            case 1:
                return new _SafeCls_6114(1, "", param1.readInteger());
            default:
                return new _SafeCls_6114(0, "", 0);
        }
    }

    public get messageType(): number {
        return this._SafeStr_6717;
    }

    public get messageText(): string {
        return this._messageText;
    }

    public get habbiconId(): number {
        return this._SafeStr_14156;
    }
}
