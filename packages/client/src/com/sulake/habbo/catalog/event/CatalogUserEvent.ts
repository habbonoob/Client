import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';

export class CatalogUserEvent extends CatalogEvent {
    static { registerClassName(this, 'com.sulake.habbo.catalog.event::CatalogUserEvent'); }

    constructor(param1: string, param2: number, param3: string, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._userId = param2;
        this._userName = param3;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }
}
