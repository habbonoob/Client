import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SaveableRoomSettingsData } from '@/com/sulake/habbo/communication/messages/outgoing/roomsettings/SaveableRoomSettingsData';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class SaveRoomSettingsMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.roomsettings::SaveRoomSettingsMessageComposer'); }

    constructor(param1: SaveableRoomSettingsData) {
        let _loc4_: any[] = null;
        this._array = [];
        this._array.push(param1.roomId);
        this._array.push(param1.name);
        this._array.push(param1.description);
        this._array.push(param1.doorMode);
        this._array.push(param1.password != null ? param1.password : "");
        this._array.push(param1.maximumVisitors);
        this._array.push(param1.categoryId);
        if (param1.tags) {
            _loc4_ = [];
            for (const _loc3_ of param1.tags ?? []) {
                if (_loc3_ && _loc3_ !== "") {
                    _loc4_.push(_loc3_);
                }
            }
            this._array.push(_loc4_.length);
            for (const _loc2_ of _loc4_ ?? []) {
                this._array.push(_loc2_);
            }
        } else {
            this._array.push(0);
        }
        this._array.push(param1.tradeMode);
        this._array.push(param1.allowPets);
        this._array.push(param1.allowFoodConsume);
        this._array.push(param1.allowWalkThrough);
        this._array.push(param1.hideWalls);
        this._array.push(param1.wallThickness);
        this._array.push(param1.floorThickness);
        this._array.push(param1.whoCanMute);
        this._array.push(param1.whoCanKick);
        this._array.push(param1.whoCanBan);
        this._array.push(param1.chatMode);
        this._array.push(param1.chatBubbleSize);
        this._array.push(param1.chatScrollUpFrequency);
        this._array.push(param1.chatFullHearRange);
        this._array.push(param1.chatFloodSensitivity);
        this._array.push(param1.allowNavigatorDynCats);
    }

    declare private _array: any[];

    public get disposed(): boolean {
        return false;
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
