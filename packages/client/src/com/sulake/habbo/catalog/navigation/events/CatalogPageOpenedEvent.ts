import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogPageOpenedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation.events::CatalogPageOpenedEvent'); }

    public static readonly CATALOG_PAGE_OPENED: string = "CATALOG_PAGE_OPENED";

    constructor(param1: number, param2: string, param3: boolean = false, param4: boolean = false) {
        super("CATALOG_PAGE_OPENED", param3, param4);
        this._pageId = param1;
        this._pageLocalization = param2;
    }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _pageLocalization: string;

    public get pageId(): number {
        return this._pageId;
    }

    public get pageLocalization(): string {
        return this._pageLocalization;
    }
}
