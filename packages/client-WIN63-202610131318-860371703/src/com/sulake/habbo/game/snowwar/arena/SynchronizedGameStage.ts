import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISynchronizedGameObject } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameObject';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { HabboGamesCom, HumanGameObject } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { DefaultGameStage } from '@/com/sulake/habbo/game/snowwar/arena/DefaultGameStage';
import { isISynchronizedGameObject } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameObject';
import { QuickRandom } from '@/com/sulake/habbo/game/snowwar/utils/QuickRandom';

export class SynchronizedGameStage extends DefaultGameStage {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.arena::SynchronizedGameStage'); }

    protected _gameObjects: UtilsMap = new UtilsMap();
    private _gameObjectsToBeDeleted: any[] = [];
    private _SafeStr_3549: any[] = [];

    constructor() {
        super();
    }

    private static zeroPad2digit(param1: number): string {
        if (param1 < 10) {
            return "0" + param1;
        }
        return param1.toString();
    }

    public override dispose(): void {
        super.dispose();
        if (this._gameObjects != null) {
            for (const _loc1_ of valuesOf(this._gameObjects)) {
                _loc1_.dispose();
            }
            this._gameObjects.dispose();
            this._gameObjects = null;
        }
        this._gameObjectsToBeDeleted = [];
        this._SafeStr_3549 = [];
    }

    public addGameObject(param1: number, param2: ISynchronizedGameObject): void {
        this._gameObjects.add(param1, param2);
        param2.isActive = true;
    }

    public addInactiveGameObject(param1: number, param2: ISynchronizedGameObject): void {
        this._gameObjects.add(param1, param2);
        param2.isActive = false;
    }

    public addGameObjectById(param1: number, param2: ISynchronizedGameObject): void {
        this._gameObjects.add(param1, param2);
        param2.isActive = true;
        if (param2.gameObjectId != param1) {
            throw new Exception("Could not add gameobject with id:" + param1);
        }
    }

    public removeGameObject(param1: number): void {
        let _loc2_: ISynchronizedGameObject = this._gameObjects.remove(param1);
        if (_loc2_) {
            _loc2_.onRemove();
            this._SafeStr_3549.push(_loc2_);
        }
    }

    public removeAllGameObjects(): void {
        for (const _loc1_ of this._gameObjects.getValues() ?? []) {
            _loc1_.onRemove();
            this._SafeStr_3549.push(_loc1_);
        }
        this._gameObjects = new UtilsMap();
    }

    public putGameObjectOnDeleteList(param1: ISynchronizedGameObject): void {
        if (param1 == null) {
            HabboGamesCom.log("Trying to put null in delete list.");
            return;
        }
        this._gameObjectsToBeDeleted.push(param1);
        param1.isActive = false;
    }

    public getGameObject(param1: number): ISynchronizedGameObject {
        return asGuarded(this._gameObjects.getValue(param1), isISynchronizedGameObject);
    }

    public getGameObjects(): any[] {
        return this._gameObjects.getValues();
    }

    public subturn(): void {
        for (const _loc2_ of this._gameObjects.getValues() ?? []) {
            _loc2_.subturn(this);
        }
        if (this._gameObjectsToBeDeleted.length > 0) {
            for (const _loc1_ of this._gameObjectsToBeDeleted ?? []) {
                this.removeGameObject(_loc1_.gameObjectId | 0);
            }
            this._gameObjectsToBeDeleted = [];
        }
    }

    public calculateChecksum(param1: number): number {
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = QuickRandom.iterateSeed(param1);
        let _loc8_: number = 1;
        let _loc9_: number = 0;
        let _loc4_: string = "";
        let _loc3_: string = "";
        if (HabboGamesCom.logEnabled && param1 % _loc8_ == 0) {
            _loc4_ = "";
            _loc4_ = _loc4_ + ("\nturn ### " + param1 + " ###\n");
            _loc4_ = _loc4_ + ("seed " + _loc6_ + "\n");
            _loc3_ = "";
        }
        for (const _loc10_ of valuesOf(this._gameObjects)) {
            if (_loc10_.isGhost && _loc10_ instanceof HumanGameObject) {
                castTo(_loc10_, HumanGameObject).addGhostLocation(param1);
            } else if (!(!_loc10_.isActive || Boolean(_loc10_.isGhost))) {
                _loc7_ = 1;
                _loc5_ = _loc10_.numberOfVariables | 0;
                _loc2_ = 0;
                while (_loc2_ < _loc5_) {
                    _loc6_ = _loc6_ + _loc10_.getVariable(_loc2_) * _loc7_ | 0;
                    _loc7_++;
                    if (HabboGamesCom.logEnabled && param1 % _loc8_ == 0) {
                        _loc3_ += _loc10_.getVariable(_loc2_);
                        if (_loc2_ < _loc5_ - 1) {
                            _loc3_ += ",";
                        }
                    }
                    _loc2_++;
                }
                if (HabboGamesCom.logEnabled && param1 % _loc8_ == 0) {
                    _loc4_ += "++ \"O" + SynchronizedGameStage.zeroPad2digit(_loc9_ + 1) + "-CS:" + _loc6_ + " Parms:" + _loc3_ + "\"\n";
                    _loc3_ = "";
                    _loc9_++;
                }
            }
        }
        if (param1 % _loc8_ == 0) {
            HabboGamesCom.log(_loc4_.toString());
        }
        return _loc6_;
    }

    public appendGameObjects(param1: any): void {
        let _loc3_: any = null;
        let _loc2_: number = 0;
        for (_loc3_ of this._gameObjects.getValues() ?? []) {
            if (_loc3_.isActive) {
                _loc2_++;
            }
        }
        param1.writeInt(_loc2_);
        for (_loc3_ of this._gameObjects.getValues() ?? []) {
            if (_loc3_.isActive) {
            }
        }
    }

    public resetRemovedGameObjects(): any[] {
        let _loc1_: any[] = this._SafeStr_3549;
        this._SafeStr_3549 = [];
        return _loc1_;
    }
}
