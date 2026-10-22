import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestBasedItem } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestBasedItem';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { EmptyStuffData } from '@/com/sulake/habbo/room/object/data/EmptyStuffData';

export class TransactionChestItemWrapper implements ChestBasedItem {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.details.furni_overview::TransactionChestItemWrapper'); }

    static #staticsReady = false;

    private static get EMPTY_STUFF_DATA(): IStuffData {
        TransactionChestItemWrapper.#initStatics();
        return TransactionChestItemWrapper.EMPTY_STUFF_DATA;
    }

    constructor(param1: ChestItemType) {
        this._type = param1;
    }

    declare private _type: ChestItemType;

    public get type(): ChestItemType {
        return this._type;
    }

    public get specialType(): number {
        return 1;
    }

    public get stuffData(): IStuffData {
        return TransactionChestItemWrapper.EMPTY_STUFF_DATA;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TransactionChestItemWrapper.#staticsReady) return;
        TransactionChestItemWrapper.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TransactionChestItemWrapper, name, { value, writable: true, configurable: true, enumerable: true });
        set("EMPTY_STUFF_DATA", null);
        set("EMPTY_STUFF_DATA", new EmptyStuffData());
    }
}
