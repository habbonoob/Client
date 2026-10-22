import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarImageDirectionCache } from '@/com/sulake/habbo/avatar/cache/AvatarImageDirectionCache';

export class AvatarImageActionCache {
    static { registerClassName(this, 'com.sulake.habbo.avatar.cache::AvatarImageActionCache'); }

    constructor() {
        this._cache = new UtilsMap();
        this.setLastAccessTime(getTimer());
    }

    declare private _cache: UtilsMap;

    declare private _lastAccessTime: number;
    static { (this.prototype as any)._lastAccessTime = 0; }

    public dispose(): void {
        this.debugInfo("[dispose]");
        if (this._cache != null) {
            for (const _loc1_ of valuesOf(this._cache)) {
                _loc1_.dispose();
            }
            this._cache.dispose();
            this._cache = null;
        }
        this._lastAccessTime = 0;
    }

    public getDirectionCache(param1: number): AvatarImageDirectionCache {
        let _loc2_: string = param1.toString();
        return asInstanceOf(this._cache.getValue(_loc2_), AvatarImageDirectionCache);
    }

    public updateDirectionCache(param1: number, param2: AvatarImageDirectionCache): void {
        let _loc3_: string = param1.toString();
        this._cache.add(_loc3_, param2);
    }

    public setLastAccessTime(param1: number): void {
        this._lastAccessTime = param1;
    }

    public getLastAccessTime(): number {
        return this._lastAccessTime;
    }

    private debugInfo(param1: string): void {
    }
}
