import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Perk {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.perk::Perk'); }

    declare private _code: string;

    private _isAllowed: boolean = false;
    private _errorMessage: string = "";

    constructor() {
    }

    public get code(): string {
        return this._code;
    }

    public set code(param1: string) {
        this._code = param1;
    }

    public get isAllowed(): boolean {
        return this._isAllowed;
    }

    public set isAllowed(param1: boolean) {
        this._isAllowed = param1;
    }

    public get errorMessage(): string {
        return this._errorMessage;
    }

    public set errorMessage(param1: string) {
        this._errorMessage = param1;
    }
}
