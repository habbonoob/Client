import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AvatarImageBodyPartContainer } from '@/com/sulake/habbo/avatar/AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '@/com/sulake/habbo/avatar/AvatarImagePartContainer';

export class AvatarImageDirectionCache {
    static { registerClassName(this, 'com.sulake.habbo.avatar.cache::AvatarImageDirectionCache'); }

    private static readonly KEY_SEPARATOR: string = "/";
    private static readonly NO_FRAMES_KEY: string = "-";

    constructor(param1: AvatarImagePartContainer[]) {
        this._images = new Dictionary();
        this._SafeStr_3211 = param1;
        this._keyCache = new Dictionary();
    }

    declare private _SafeStr_3211: AvatarImagePartContainer[];

    declare private _images: Map<any, any>;

    declare private _keyCache: Map<any, any>;

    public dispose(): void {
        for (const _loc1_ of this._images?.values() ?? []) {
            if (_loc1_) {
                _loc1_.dispose();
            }
        }
        this._images = null;
        this._SafeStr_3211 = null;
        this._keyCache = null;
    }

    public getPartList(): AvatarImagePartContainer[] {
        return this._SafeStr_3211;
    }

    public getImageContainer(param1: number): AvatarImageBodyPartContainer {
        let _loc2_: string = this.getCacheKey(param1);
        return this._images.get(_loc2_);
    }

    public updateImageContainer(param1: AvatarImageBodyPartContainer, param2: number): void {
        let _loc4_: AvatarImageBodyPartContainer = null;
        let _loc3_: string = this.getCacheKey(param2);
        if (this._images.get(_loc3_)) {
            _loc4_ = asInstanceOf(this._images.get(_loc3_), AvatarImageBodyPartContainer);
            if (_loc4_) {
                _loc4_.dispose();
            }
        }
        this._images.set(_loc3_, param1);
    }

    private getCacheKey(param1: number): string {
        let _loc4_: number = 0;
        if (this._SafeStr_3211 == null || this._SafeStr_3211.length == 0) {
            return "-";
        }
        let _loc2_: string = stringOrNull(this._keyCache.get(param1));
        if (_loc2_) {
            return _loc2_;
        }
        let _loc5_: AvatarImagePartContainer = asInstanceOf(this._SafeStr_3211[0], AvatarImagePartContainer);
        _loc2_ = _loc5_.getCacheableKey(param1);
        let _loc3_: number = this._SafeStr_3211.length | 0;
        _loc4_ = 1;
        while (_loc4_ < _loc3_) {
            _loc5_ = asInstanceOf(this._SafeStr_3211[_loc4_], AvatarImagePartContainer);
            _loc2_ += "/" + _loc5_.getCacheableKey(param1);
            _loc4_++;
        }
        this._keyCache.set(param1, _loc2_);
        return _loc2_;
    }
}
