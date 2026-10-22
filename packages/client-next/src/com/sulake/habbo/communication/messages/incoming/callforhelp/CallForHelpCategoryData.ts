import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { INamed } from '@/com/sulake/habbo/communication/messages/incoming/moderation/INamed';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CallForHelpTopicData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpTopicData';

export class CallForHelpCategoryData implements INamed, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::CallForHelpCategoryData'); }

    declare private _name: string;

    declare private _topics: CallForHelpTopicData[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._topics = [];
        this._name = param1.readString();
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._topics.push(new CallForHelpTopicData(param1));
            _loc2_++;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._topics = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get name(): string {
        return this._name;
    }

    public get topics(): CallForHelpTopicData[] {
        return this._topics;
    }

    get [IDisposable](): true {
        return true;
    }
}
