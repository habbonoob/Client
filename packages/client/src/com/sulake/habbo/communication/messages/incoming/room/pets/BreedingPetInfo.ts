import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BreedingPetInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::BreedingPetInfo'); }

    constructor(param1: IMessageDataWrapper) {
        this._webId = param1.readInteger();
        this._name = param1.readString();
        this._level = param1.readInteger();
        this._figure = param1.readString();
        this._owner = param1.readString();
    }

    declare private _webId: number;
    static { (this.prototype as any)._webId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _figure: string;

    declare private _owner: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get webId(): number {
        return this._webId;
    }

    public get level(): number {
        return this._level;
    }

    public get figure(): string {
        return this._figure;
    }

    public get owner(): string {
        return this._owner;
    }

    public dispose(): void {
        this._webId = 0;
        this._name = "";
        this._level = 0;
        this._figure = "";
        this._owner = "";
    }
}
