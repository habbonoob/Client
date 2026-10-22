import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class GuildBadgeSettings {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildBadgeSettings'); }

    constructor(param1: IMessageDataWrapper) {
        this._partId = param1.readInteger();
        this._colorId = param1.readInteger();
        this._position = param1.readInteger();
    }

    declare private _partId: number;
    static { (this.prototype as any)._partId = 0; }

    declare private _colorId: number;
    static { (this.prototype as any)._colorId = 0; }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    public get partId(): number {
        return this._partId;
    }

    public get colorId(): number {
        return this._colorId;
    }

    public get position(): number {
        return this._position;
    }
}
