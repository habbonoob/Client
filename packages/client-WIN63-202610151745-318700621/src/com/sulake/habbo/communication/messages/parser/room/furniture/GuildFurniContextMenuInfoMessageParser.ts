import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuildFurniContextMenuInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::GuildFurniContextMenuInfoMessageParser'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    declare private _guildName: string;

    declare private _guildHomeRoomId: number;
    static { (this.prototype as any)._guildHomeRoomId = 0; }

    declare private _userIsMember: boolean;
    static { (this.prototype as any)._userIsMember = false; }

    declare private _guildHasReadableForum: boolean;
    static { (this.prototype as any)._guildHasReadableForum = false; }

    constructor() {
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get guildId(): number {
        return this._guildId;
    }

    public get guildName(): string {
        return this._guildName;
    }

    public get guildHomeRoomId(): number {
        return this._guildHomeRoomId;
    }

    public get userIsMember(): boolean {
        return this._userIsMember;
    }

    public get guildHasReadableForum(): boolean {
        return this._guildHasReadableForum;
    }

    public flush(): boolean {
        this._objectId = -1;
        this._guildId = -1;
        this._guildName = "";
        this._guildHomeRoomId = -1;
        this._userIsMember = false;
        this._guildHasReadableForum = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._objectId = param1.readInteger();
        this._guildId = param1.readInteger();
        this._guildName = param1.readString();
        this._guildHomeRoomId = param1.readInteger();
        this._userIsMember = param1.readBoolean();
        this._guildHasReadableForum = param1.readBoolean();
        return true;
    }
}
