import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageConfiguration } from '@/com/sulake/core/communication/messages/IMessageConfiguration';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IMessageEvent, isIMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { ClassUtils } from '@/com/sulake/core/utils/ClassUtils';

export class MessageClassManager {
    static { registerClassName(this, 'com.sulake.core.communication.messages::MessageClassManager'); }

    constructor() {
    }

    private _SafeStr_5292: Map<any, any> = new Dictionary();
    private _SafeStr_4417: Map<any, any> = new Dictionary();
    private _SafeStr_3151: Map<any, any> = new Dictionary();

    public dispose(): void {
        let _loc1_: IMessageEvent = null;
        if (this._SafeStr_3151) {
            for (const _loc2_ of this._SafeStr_3151?.values() ?? []) {
                _loc1_ = this._SafeStr_3151.get(_loc2_);
                if (_loc1_) {
                    _loc1_.dispose();
                }
            }
        }
    }

    public registerMessages(param1: IMessageConfiguration): void {
        let _loc2_: string = null;
        for (_loc2_ of keysOf(param1.events)) {
            this.registerMessageEventClass(parseInt(_loc2_) | 0, param1.events[_loc2_]);
        }
        for (_loc2_ of keysOf(param1.composers)) {
            this.registerMessageComposerClass(parseInt(_loc2_) | 0, param1.composers[_loc2_]);
        }
    }

    public registerMessageEvent(param1: IMessageEvent): void {
        let _loc4_: string = getQualifiedClassName(param1);
        let _loc2_: any = this._SafeStr_4417.get(_loc4_);
        if (_loc2_ == null) {
            throw new Error("Unknown message event class " + _loc4_);
        }
        let _loc3_: any[] = this._SafeStr_3151.get(_loc2_);
        if (_loc3_ != null) {
            param1.parser = (asGuarded(_loc3_[0], isIMessageEvent)).parser;
        } else {
            _loc3_ = [];
            this._SafeStr_3151.set(_loc2_, _loc3_);
            param1.parser = new param1.parserClass();
        }
        _loc3_.push(param1);
    }

    public unregisterMessageEvent(param1: IMessageEvent): void {
        let _loc5_: string = getQualifiedClassName(param1);
        let _loc2_: any = this._SafeStr_4417.get(_loc5_);
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: any[] = this._SafeStr_3151.get(_loc2_);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: number = _loc4_.indexOf(param1);
        if (_loc3_ >= 0) {
            _loc4_.splice(_loc3_, 1);
            if (_loc4_.length == 0) {
                this._SafeStr_3151.delete(_loc2_);
            }
        }
    }

    public getMessageIDForComposer(param1: IMessageComposer): number {
        let _loc2_: any = this._SafeStr_5292.get(getQualifiedClassName(param1));
        if (_loc2_ == null) {
            return -1;
        }
        return _loc2_ | 0;
    }

    public getMessageEventsForID(param1: number): any[] {
        return this._SafeStr_3151.get(param1);
    }

    private registerMessageComposerClass(param1: number, param2: any): void {
        if (!ClassUtils.implementsInterface(param2, IMessageComposer)) {
            throw new Error("Invalid composer class for message ID " + param1);
        }
        let _loc3_: string = getQualifiedClassName(param2);
        if (this._SafeStr_5292.get(_loc3_) != null) {
            throw new Error("Duplicate message ID definition for composer class " + _loc3_);
        }
        this._SafeStr_5292.set(_loc3_, param1);
    }

    private registerMessageEventClass(param1: number, param2: any): void {
        if (!ClassUtils.implementsInterface(param2, IMessageEvent)) {
            throw new Error("Invalid event class for message ID " + param1);
        }
        let _loc3_: string = getQualifiedClassName(param2);
        if (this._SafeStr_4417.get(_loc3_) != null) {
            throw new Error("Duplicate message ID definition for event class " + _loc3_);
        }
        this._SafeStr_4417.set(_loc3_, param1);
    }
}
