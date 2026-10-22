import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ChestItemType {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests.storage::ChestItemType'); }

    public static readFromMessage(param1: IMessageDataWrapper): ChestItemType {
        let _loc3_: boolean = param1.readBoolean();
        let _loc4_: number = param1.readInteger();
        let _loc2_: string = param1.readString();
        return new ChestItemType(_loc3_, _loc4_, _loc2_ == "" ? null : _loc2_);
    }

    constructor(param1: boolean, param2: number, param3: string) {
        this._isWallItem = param1;
        this._typeId = param2;
        this._SafeStr_5644 = param3;
    }

    declare private _isWallItem: boolean;
    static { (this.prototype as any)._isWallItem = false; }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _SafeStr_5644: string;

    public get isWallItem(): boolean {
        return this._isWallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get legacyPosterId(): string {
        return this._SafeStr_5644 == null ? "" : this._SafeStr_5644;
    }

    public addToComposer(param1: any[]): void {
        param1.push(this._isWallItem);
        param1.push(this._typeId);
        param1.push(this.legacyPosterId);
    }
}
