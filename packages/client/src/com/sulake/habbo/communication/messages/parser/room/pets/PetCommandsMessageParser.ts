import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetCommandsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetCommandsMessageParser'); }

    constructor() {
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _allCommands: any[];

    declare private _SafeStr_4496: any[];

    public get petId(): number {
        return this._petId;
    }

    public get allCommands(): any[] {
        return this._allCommands;
    }

    public get enabledCommands(): any[] {
        return this._SafeStr_4496;
    }

    public flush(): boolean {
        this._petId = -1;
        this._allCommands = null;
        this._SafeStr_4496 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._petId = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        this._allCommands = [];
        while (_loc3_-- > 0) {
            this._allCommands.push(param1.readInteger());
        }
        let _loc2_: number = param1.readInteger();
        this._SafeStr_4496 = [];
        while (_loc2_-- > 0) {
            this._SafeStr_4496.push(param1.readInteger());
        }
        return true;
    }
}
