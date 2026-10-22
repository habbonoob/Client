import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredLinkNetwork } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkNetwork';

export class WiredLinkConfigurationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredlink::WiredLinkConfigurationMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_14102: string;

    declare private _SafeStr_14103: boolean;
    static { (this.prototype as any)._SafeStr_14103 = false; }

    declare private _SafeStr_14105: WiredLinkNetwork[];

    constructor() {
    }

    public flush(): boolean {
        this._roomId = 0;
        this._furniId = 0;
        this._SafeStr_14102 = "0";
        this._SafeStr_14103 = false;
        this._SafeStr_14105 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._roomId = param1.readInteger();
        this._furniId = param1.readInteger();
        this._SafeStr_14102 = param1.readString();
        this._SafeStr_14103 = param1.readBoolean();
        this._SafeStr_14105 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14105.push(new WiredLinkNetwork(param1));
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

    public get selectedNetworkId(): string {
        return this._SafeStr_14102;
    }

    public get receiveLocal(): boolean {
        return this._SafeStr_14103;
    }

    public get networks(): WiredLinkNetwork[] {
        return this._SafeStr_14105;
    }
}
