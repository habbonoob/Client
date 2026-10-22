import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';

export class GameObjectsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameObjectsData'); }

    private _gameObjects: any[] = [];

    constructor(param1: IMessageDataWrapper) {
        this.parse(param1);
    }

    public get gameObjects(): any[] {
        return this._gameObjects;
    }

    public parse(param1: IMessageDataWrapper): void {
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: SnowWarGameObjectData = null;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = param1.readInteger();
            _loc4_ = param1.readInteger();
            _loc6_ = SnowWarGameObjectData.create(_loc5_, _loc4_);
            _loc6_.parse(param1);
            this._gameObjects.push(_loc6_);
            _loc3_++;
        }
    }
}
