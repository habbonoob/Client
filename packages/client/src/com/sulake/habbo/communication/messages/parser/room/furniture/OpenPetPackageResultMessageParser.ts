import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class OpenPetPackageResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::OpenPetPackageResultMessageParser'); }

    constructor() {
    }

    private _objectId: number = 0;
    private _nameValidationStatus: number = 0;

    public get nameValidationStatus(): number {
        return this._nameValidationStatus;
    }

    private _nameValidationInfo: string = null;

    public get nameValidationInfo(): string {
        return this._nameValidationInfo;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public flush(): boolean {
        this._objectId = 0;
        this._nameValidationStatus = 0;
        this._nameValidationInfo = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._objectId = param1.readInteger();
        this._nameValidationStatus = param1.readInteger();
        this._nameValidationInfo = param1.readString();
        return true;
    }
}
