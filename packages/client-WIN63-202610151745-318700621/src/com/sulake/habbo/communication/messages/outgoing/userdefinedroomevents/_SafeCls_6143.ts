import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FurnitureRegionData } from '@/com/sulake/habbo/room/object/data/FurnitureRegionData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class _SafeCls_6143 implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents::_SafeCls_6143'); }

    private _array: any[] = [];

    constructor(param1: FurnitureRegionData) {
        this._array.push(param1.furnitureId, param1.title, param1.description, param1.xOffset, param1.yOffset, param1.minWidth, param1.minHeight, param1.color);
        let _loc3_: Rectangle[] = param1.areas;
        this._array.push(_loc3_.length);
        for (const _loc2_ of _loc3_ ?? []) {
            this._array.push(_loc2_.x | 0, _loc2_.y | 0, _loc2_.width | 0, _loc2_.height | 0);
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return false;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
