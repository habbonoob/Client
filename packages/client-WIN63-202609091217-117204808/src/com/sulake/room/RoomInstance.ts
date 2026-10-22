import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomInstanceContainer } from '@/com/sulake/room/IRoomInstanceContainer';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomRendererBase } from '@/com/sulake/room/renderer/IRoomRendererBase';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import { isIRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';

export class RoomInstance implements IRoomInstance {
    static { registerClassName(this, 'com.sulake.room::RoomInstance'); }

    declare private _SafeStr_3003: Map<any, any>;

    declare private _SafeStr_2968: Map<any, any>;

    declare private _SafeStr_4554: any[];

    declare private _SafeStr_4448: any[];

    declare private _managers: UtilsMap;

    declare private _updateCategories: any[];

    declare private _renderer: IRoomRendererBase;

    declare private _container: IRoomInstanceContainer;

    declare private _id: string;

    constructor(param1: string, param2: IRoomInstanceContainer) {
        this._managers = new UtilsMap();
        this._updateCategories = [];
        this._container = param2;
        this._id = param1;
        this._SafeStr_3003 = new Dictionary();
        this._SafeStr_2968 = new Dictionary();
        this._SafeStr_4554 = [];
        this._SafeStr_4448 = [];
    }

    public get id(): string {
        return this._id;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: IRoomObjectManager = null;
        let _loc3_: string = null;
        if (this._managers != null) {
            _loc2_ = 0;
            while (_loc2_ < this._managers.length) {
                _loc1_ = asGuarded(this._managers.getWithIndex(_loc2_), isIRoomObjectManager);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._managers.dispose();
            this._managers = null;
        }
        if (this._renderer != null) {
            this._renderer.dispose();
            this._renderer = null;
        }
        this._container = null;
        this._updateCategories = null;
        if (this._SafeStr_3003 != null) {
            for (_loc3_ of this._SafeStr_3003?.keys() ?? []) {
                this._SafeStr_3003.delete(_loc3_);
            }
            this._SafeStr_3003 = null;
        }
        if (this._SafeStr_2968 != null) {
            for (_loc3_ of this._SafeStr_2968?.keys() ?? []) {
                this._SafeStr_2968.delete(_loc3_);
            }
            this._SafeStr_2968 = null;
        }
        this._SafeStr_4448 = [];
        this._SafeStr_4554 = [];
    }

    public hasValueForName(param1: string): boolean {
        return this._SafeStr_3003.has(param1);
    }

    public getNumber(param1: string): number {
        return Number(this._SafeStr_3003.get(param1));
    }

    public setNumber(param1: string, param2: number, param3: boolean = false): void {
        if (this._SafeStr_4554.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4554.push(param1);
        }
        if (this._SafeStr_3003.get(param1) != param2) {
            this._SafeStr_3003.set(param1, param2);
        }
    }

    public getString(param1: string): string {
        return stringOrNull(this._SafeStr_2968.get(param1));
    }

    public setString(param1: string, param2: string, param3: boolean = false): void {
        if (this._SafeStr_4448.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4448.push(param1);
        }
        if (this._SafeStr_2968.get(param1) != param2) {
            this._SafeStr_2968.set(param1, param2);
        }
    }

    public addObjectUpdateCategory(param1: number): void {
        let _loc2_: number = this._updateCategories.indexOf(param1);
        if (_loc2_ >= 0) {
            return;
        }
        this._updateCategories.push(param1);
    }

    public removeObjectUpdateCategory(param1: number): void {
        let _loc2_: number = this._updateCategories.indexOf(param1);
        if (_loc2_ >= 0) {
            this._updateCategories.splice(_loc2_, 1);
        }
    }

    public update(): void {
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: IRoomObjectManager = null;
        let _loc4_: number = 0;
        let _loc7_: IRoomObjectController = null;
        let _loc5_: IRoomObjectEventHandler = null;
        let _loc1_: number = getTimer();
        _loc3_ = this._updateCategories.length - 1;
        while (_loc3_ >= 0) {
            _loc6_ = this._updateCategories[_loc3_] | 0;
            _loc2_ = this.getObjectManager(_loc6_);
            if (_loc2_ != null) {
                _loc4_ = _loc2_.getObjectCount() - 1;
                while (_loc4_ >= 0) {
                    _loc7_ = _loc2_.getObjectWithIndex(_loc4_);
                    if (_loc7_ != null) {
                        _loc5_ = _loc7_.getEventHandler();
                        if (_loc5_ != null) {
                            _loc5_.update(_loc1_);
                        }
                    }
                    _loc4_--;
                }
            }
            _loc3_--;
        }
    }

    public createRoomObject(param1: number, param2: string, param3: number): IRoomObject {
        if (this._container != null) {
            return this._container.createRoomObject(this._id, param1, param2, param3);
        }
        return null;
    }

    public createObjectInternal(param1: number, param2: number, param3: string, param4: number): IRoomObject {
        let _loc6_: IRoomObjectController = null;
        let _loc5_: IRoomObjectManager = this.createObjectManager(param4);
        if (_loc5_ != null) {
            _loc6_ = _loc5_.createObject(param1, param2 >>> 0, param3);
            if (this._renderer != null) {
                this._renderer.feedRoomObject(_loc6_);
            }
            return _loc6_;
        }
        return null;
    }

    public getObject(param1: number, param2: number): IRoomObject {
        let _loc3_: IRoomObjectManager = this.getObjectManager(param2);
        if (_loc3_ != null) {
            return _loc3_.getObject(param1);
        }
        return null;
    }

    public getObjects(param1: number): any[] {
        let _loc2_: IRoomObjectManager = this.getObjectManager(param1);
        return _loc2_ ? _loc2_.getObjects() : [];
    }

    public getObjectWithIndex(param1: number, param2: number): IRoomObject {
        let _loc3_: IRoomObjectManager = this.getObjectManager(param2);
        if (_loc3_ != null) {
            return _loc3_.getObjectWithIndex(param1);
        }
        return null;
    }

    public getObjectCount(param1: number): number {
        let _loc2_: IRoomObjectManager = this.getObjectManager(param1);
        if (_loc2_ != null) {
            return _loc2_.getObjectCount();
        }
        return 0;
    }

    public getObjectWithIndexAndType(param1: number, param2: string, param3: number): IRoomObject {
        let _loc4_: IRoomObjectManager = this.getObjectManager(param3);
        if (_loc4_ != null) {
            return _loc4_.getObjectWithIndexAndType(param1, param2);
        }
        return null;
    }

    public getObjectCountForType(param1: string, param2: number): number {
        let _loc3_: IRoomObjectManager = this.getObjectManager(param2);
        if (_loc3_ != null) {
            return _loc3_.getObjectCountForType(param1);
        }
        return 0;
    }

    public disposeObject(param1: number, param2: number): boolean {
        let _loc4_: IRoomObject = null;
        let _loc3_: IRoomObjectManager = this.getObjectManager(param2);
        if (_loc3_ != null) {
            _loc4_ = _loc3_.getObject(param1);
            if (_loc4_ != null) {
                _loc4_.tearDown();
                if (this._renderer) {
                    this._renderer.removeRoomObject(_loc4_);
                }
                return _loc3_.disposeObject(param1);
            }
        }
        return false;
    }

    public disposeObjects(param1: number): number {
        let _loc4_: number = 0;
        let _loc5_: IRoomObjectController = null;
        let _loc3_: number = 0;
        let _loc2_: IRoomObjectManager = this.getObjectManager(param1);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getObjectCount();
            _loc4_ = 0;
            while (_loc4_ < _loc3_) {
                _loc5_ = asGuarded(_loc2_.getObjectWithIndex(_loc4_), isIRoomObjectController);
                if (_loc5_ != null) {
                    if (this._renderer) {
                        this._renderer.removeRoomObject(_loc5_);
                    }
                    _loc5_.dispose();
                }
                _loc4_++;
            }
            _loc2_.reset();
        }
        return _loc3_;
    }

    public setRenderer(param1: IRoomRendererBase): void {
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: IRoomObjectController = null;
        if (param1 == this._renderer) {
            return;
        }
        if (this._renderer != null) {
            this._renderer.dispose();
        }
        this._renderer = param1;
        if (this._renderer == null) {
            return;
        }
        this._renderer.reset();
        let _loc5_: any[] = this.getObjectManagerIds();
        _loc3_ = _loc5_.length - 1;
        while (_loc3_ >= 0) {
            _loc6_ = _loc5_[_loc3_] | 0;
            _loc2_ = this.getObjectCount(_loc6_);
            _loc4_ = _loc2_ - 1;
            while (_loc4_ >= 0) {
                _loc7_ = asGuarded(this.getObjectWithIndex(_loc4_, _loc6_), isIRoomObjectController);
                if (_loc7_ != null) {
                    this._renderer.feedRoomObject(_loc7_);
                }
                _loc4_--;
            }
            _loc3_--;
        }
    }

    public getRenderer(): IRoomRendererBase {
        return this._renderer;
    }

    public getObjectManagerIds(): any[] {
        return this._managers.getKeys();
    }

    protected createObjectManager(param1: number): IRoomObjectManager {
        let _loc3_: string = String(param1);
        if (this._managers.getValue(_loc3_) != null) {
            return asGuarded(this._managers.getValue(_loc3_), isIRoomObjectManager);
        }
        if (this._container == null) {
            return null;
        }
        let _loc2_: IRoomObjectManager = this._container.createRoomObjectManager();
        if (_loc2_ != null) {
            this._managers.add(_loc3_, _loc2_);
        }
        return _loc2_;
    }

    protected getObjectManager(param1: number): IRoomObjectManager {
        return asGuarded(this._managers.getValue(String(param1)), isIRoomObjectManager);
    }

    protected disposeObjectManager(param1: number): boolean {
        let _loc2_: IRoomObjectManager = null;
        let _loc3_: string = String(param1);
        this.disposeObjects(param1);
        if (this._managers.getValue(_loc3_) != null) {
            _loc2_ = asGuarded(this._managers.remove(_loc3_), isIRoomObjectManager);
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
            return true;
        }
        return false;
    }

    public hasUninitializedObjects(): boolean {
        let _loc1_: number = 0;
        let _loc3_: number = 0;
        for (const _loc2_ of valuesOf(this._managers)) {
            _loc1_ = _loc2_.getObjectCount() | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc1_) {
                if (!_loc2_.getObjectWithIndex(_loc3_).isInitialized()) {
                    return true;
                }
                _loc3_++;
            }
        }
        return false;
    }

    get [IRoomInstance](): true {
        return true;
    }
}
