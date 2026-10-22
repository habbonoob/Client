import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { FuseObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/FuseObjectData';

export class GameLevelData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameLevelData'); }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _heightMap: string;

    private _fuseObjects: any[] = [];

    constructor(param1: IMessageDataWrapper) {
        this.parse(param1);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get heightMap(): string {
        return this._heightMap;
    }

    public get fuseObjects(): any[] {
        return this._fuseObjects;
    }

    public parse(param1: IMessageDataWrapper): void {
        let _loc3_: number = 0;
        let _loc4_: FuseObjectData = null;
        this._width = param1.readInteger();
        this._height = param1.readInteger();
        this._heightMap = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new FuseObjectData();
            _loc4_.parse(param1);
            this._fuseObjects.push(_loc4_);
            _loc3_++;
        }
    }
}
