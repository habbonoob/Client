import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PlayListEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListEntry';

export class PlayListMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::PlayListMessageParser'); }

    declare private _synchronizationCount: number;
    static { (this.prototype as any)._synchronizationCount = 0; }

    declare private _playList: any[];

    constructor() {
    }

    public get synchronizationCount(): number {
        return this._synchronizationCount;
    }

    public get playList(): any[] {
        return this._playList;
    }

    public flush(): boolean {
        this._synchronizationCount = -1;
        this._playList = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc2_: string = null;
        this._synchronizationCount = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc6_ = 0;
        while (_loc6_ < _loc3_) {
            _loc7_ = param1.readInteger();
            _loc4_ = param1.readInteger();
            _loc5_ = param1.readString();
            _loc2_ = param1.readString();
            this._playList.push(new PlayListEntry(_loc7_, _loc4_, _loc5_, _loc2_));
            _loc6_++;
        }
        return true;
    }
}
