import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class EventCategory {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::EventCategory'); }

    constructor(param1: IMessageDataWrapper) {
        this._categoryId = param1.readInteger();
        this._categoryName = param1.readString();
        this._visible = param1.readBoolean();
    }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _categoryName: string;

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get categoryName(): string {
        return this._categoryName;
    }

    public get visible(): boolean {
        return this._visible;
    }
}
