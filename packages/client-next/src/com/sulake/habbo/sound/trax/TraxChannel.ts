import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { TraxChannelItem } from '@/com/sulake/habbo/sound/trax/TraxChannelItem';

export class TraxChannel {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxChannel'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _items: any[];

    constructor(param1: number) {
        this._id = param1;
        this._items = [];
    }

    public get itemCount(): number {
        return this._items.length | 0;
    }

    public addChannelItem(param1: TraxChannelItem): void {
        this._items.push(param1);
    }

    public getItem(param1: number): TraxChannelItem {
        return asInstanceOf(this._items[param1], TraxChannelItem);
    }
}
