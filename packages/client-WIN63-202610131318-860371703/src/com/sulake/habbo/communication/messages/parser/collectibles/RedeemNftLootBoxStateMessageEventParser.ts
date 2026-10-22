import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class RedeemNftLootBoxStateMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::RedeemNftLootBoxStateMessageEventParser'); }

    declare private _state: any;

    declare private _openerAvatarId: number;
    static { (this.prototype as any)._openerAvatarId = 0; }

    declare private _reward: CollectibleBaseItem;

    constructor() {
    }

    public flush(): boolean {
        this._state = -1;
        this._openerAvatarId = -1;
        this._reward = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._state = param1.readShort();
        this._openerAvatarId = param1.readInteger();
        this._reward = new CollectibleBaseItem(param1);
        return true;
    }

    public get start(): boolean {
        return this._state == 0;
    }

    public get finish(): boolean {
        return this._state == 1;
    }

    public get state(): any {
        return this._state;
    }

    public get openerAvatarId(): number {
        return this._openerAvatarId;
    }

    public get reward(): CollectibleBaseItem {
        return this._reward;
    }
}
