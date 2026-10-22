import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarImageActionCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageActionCache';

export class AvatarImageBodyPartCache {
    static { registerClassName(this, 'com.sulake.habbo.avatar.cache::AvatarImageBodyPartCache'); }

    declare private _cache: UtilsMap;

    declare private _SafeStr_2985: IActiveActionData;

    declare private _currentDirection: number;
    static { (this.prototype as any)._currentDirection = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor() {
        this._cache = new UtilsMap();
    }

    public setAction(param1: IActiveActionData, param2: number): void {
        if (this._SafeStr_2985 == null) {
            this._SafeStr_2985 = param1;
        }
        let _loc3_: AvatarImageActionCache = this.getActionCache(this._SafeStr_2985);
        if (_loc3_ != null) {
            _loc3_.setLastAccessTime(param2);
        }
        this._SafeStr_2985 = param1;
    }

    public dispose(): void {
        let _loc1_: any[] = null;
        let _loc3_: AvatarImageActionCache = null;
        if (this._disposed) {
            return;
        }
        if (this._cache) {
            _loc1_ = this._cache.getKeys();
            for (const _loc2_ of _loc1_ ?? []) {
                _loc3_ = asInstanceOf(this._cache.getValue(_loc2_), AvatarImageActionCache);
                if (_loc3_) {
                    _loc3_.dispose();
                }
            }
            this._cache.dispose();
            this._cache = null;
        }
        this._SafeStr_2985 = null;
        this._currentDirection = 0;
        this._disposed = true;
    }

    public disposeActions(param1: number, param2: number): void {
        let _loc3_: number = 0;
        let _loc5_: AvatarImageActionCache = null;
        let _loc6_: any = null;
        if (this._cache == null || this._disposed) {
            return;
        }
        let _loc4_: any[] = this._cache.getKeys();
        for (_loc6_ of _loc4_ ?? []) {
            _loc5_ = asInstanceOf(this._cache.getValue(_loc6_), AvatarImageActionCache);
            if (_loc5_ != null) {
                _loc3_ = _loc5_.getLastAccessTime();
                if (param2 - _loc3_ >= param1) {
                    _loc5_.dispose();
                    this._cache.remove(_loc6_);
                }
            }
        }
    }

    public getAction(): IActiveActionData {
        return this._SafeStr_2985;
    }

    public setDirection(param1: number): void {
        this._currentDirection = param1;
    }

    public getDirection(): number {
        return this._currentDirection;
    }

    public getActionCache(param1: IActiveActionData = null): AvatarImageActionCache {
        if (!this._SafeStr_2985) {
            return null;
        }
        if (param1 == null) {
            param1 = this._SafeStr_2985;
        }
        if (param1.overridingAction != null) {
            return asInstanceOf(this._cache.getValue(param1.overridingAction), AvatarImageActionCache);
        }
        return asInstanceOf(this._cache.getValue(param1.id), AvatarImageActionCache);
    }

    public updateActionCache(param1: IActiveActionData, param2: AvatarImageActionCache): void {
        if (param1.overridingAction != null) {
            this._cache.add(param1.overridingAction, param2);
        } else {
            this._cache.add(param1.id, param2);
        }
    }

    private debugInfo(param1: string): void {
    }
}
