import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetAliasCollection } from '@/com/sulake/habbo/avatar/alias/AssetAliasCollection';
import type { AvatarFigureContainer } from '@/com/sulake/habbo/avatar/AvatarFigureContainer';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { EffectAssetDownloadManager } from '@/com/sulake/habbo/avatar/EffectAssetDownloadManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarImage } from '@/com/sulake/habbo/avatar/AvatarImage';

export class BlockedAvatarImage extends AvatarImage {
    static { registerClassName(this, 'com.sulake.habbo.avatar::BlockedAvatarImage'); }

    static #staticsReady = false;

    public static get _fullImageCache(): UtilsMap {
        BlockedAvatarImage.#initStatics();
        return BlockedAvatarImage._fullImageCache;
    }
    public static set _fullImageCache(value: UtilsMap) {
        BlockedAvatarImage.#initStatics();
        BlockedAvatarImage._fullImageCache = value;
    }

    constructor(param1: AvatarStructure, param2: AssetAliasCollection, param3: AvatarFigureContainer, param4: string, param5: EffectAssetDownloadManager) {
        super(param1, param2, param3, param4, param5, null);
    }

    public override dispose(): void {
        if (!this._disposed) {
            if (this._cache) {
                this._cache.dispose();
                this._cache = null;
            }
            this._SafeStr_2176 = null;
            this._assets = null;
            this._SafeStr_2277 = null;
            this._figure = null;
            this._avatarSpriteData = null;
            this._SafeStr_2403 = null;
            if (!this._SafeStr_3244 && this._image) {
                this._image.dispose();
            }
            this._image = null;
            this._SafeStr_2793 = null;
            this._disposed = true;
        }
    }

    protected override getFullImage(param1: string): BitmapData {
        return BlockedAvatarImage._fullImageCache[param1];
    }

    protected override cacheFullImage(param1: string, param2: BitmapData): void {
        if (BlockedAvatarImage._fullImageCache.getValue(param1)) {
            (asInstanceOf(BlockedAvatarImage._fullImageCache.getValue(param1), BitmapData)).dispose();
            BlockedAvatarImage._fullImageCache.remove(param1);
        }
        BlockedAvatarImage._fullImageCache[param1] = param2;
    }

    public override appendAction(param1: string, ...rest: any[]): boolean {
        let _loc3_: string = null;
        if (rest != null && rest.length > 0) {
            _loc3_ = stringOrNull(rest[0]);
        }
        switch (param1) {
            case "posture":
                switch (_loc3_) {
                    case "lay":
                    case "mv":
                    case "std":
                    case "swim":
                    case "float":
                    case "sit":
                        Reflect.apply(super.appendAction.bind(this), null, [param1].concat(rest));
                        break;
                }
                break;
            case "fx":
            case "dance":
            case "wave":
            case "sign":
            case "cri":
            case "usei":
            case "blow":
                Reflect.apply(this.addActionData, null, [param1].concat(rest));
        }
        return true;
    }

    public override isBlocked(): boolean {
        return true;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BlockedAvatarImage.#staticsReady) return;
        BlockedAvatarImage.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BlockedAvatarImage, name, { value, writable: true, configurable: true, enumerable: true });
        set("_fullImageCache", null);
        set("_fullImageCache", new UtilsMap());
    }
}
