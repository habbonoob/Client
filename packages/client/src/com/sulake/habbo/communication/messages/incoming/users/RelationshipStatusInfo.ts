import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RelationshipStatusInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::RelationshipStatusInfo'); }

    constructor(param1: IMessageDataWrapper) {
        this._relationshipStatusType = param1.readInteger();
        this._friendCount = param1.readInteger();
        this._randomFriendId = param1.readInteger();
        this._randomFriendName = param1.readString();
        this._randomFriendFigure = param1.readString();
    }

    declare private _relationshipStatusType: number;
    static { (this.prototype as any)._relationshipStatusType = 0; }

    declare private _friendCount: number;
    static { (this.prototype as any)._friendCount = 0; }

    declare private _randomFriendId: number;
    static { (this.prototype as any)._randomFriendId = 0; }

    declare private _randomFriendName: string;

    declare private _randomFriendFigure: string;

    public get relationshipStatusType(): number {
        return this._relationshipStatusType;
    }

    public get friendCount(): number {
        return this._friendCount;
    }

    public get randomFriendId(): number {
        return this._randomFriendId;
    }

    public get randomFriendName(): string {
        return this._randomFriendName;
    }

    public get randomFriendFigure(): string {
        return this._randomFriendFigure;
    }
}
