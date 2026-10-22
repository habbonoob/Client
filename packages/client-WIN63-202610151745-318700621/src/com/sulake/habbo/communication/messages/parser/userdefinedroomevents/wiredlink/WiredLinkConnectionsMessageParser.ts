import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredLinkConnection } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConnection';

export class WiredLinkConnectionsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredlink::WiredLinkConnectionsMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_14106: string;

    declare private _SafeStr_3503: WiredLinkConnection[];

    constructor() {
    }

    public flush(): boolean {
        this._roomId = 0;
        this._furniId = 0;
        this._SafeStr_14106 = "0";
        this._SafeStr_3503 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._roomId = param1.readInteger();
        this._furniId = param1.readInteger();
        this._SafeStr_14106 = param1.readString();
        this._SafeStr_3503 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_3503.push(new WiredLinkConnection(param1));
            _loc3_++;
        }
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get networkId(): string {
        return this._SafeStr_14106;
    }

    public get connections(): WiredLinkConnection[] {
        return this._SafeStr_3503;
    }
}
