import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLibraryCollection } from '@/com/sulake/core/assets/AssetLibraryCollection';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AvatarRenderManager } from '@/com/sulake/habbo/avatar/AvatarRenderManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetAlias } from '@/com/sulake/habbo/avatar/alias/AssetAlias';

export class AssetAliasCollection {
    static { registerClassName(this, 'com.sulake.habbo.avatar.alias::AssetAliasCollection'); }

    declare private _assets: AssetLibraryCollection;

    declare private _aliases: Map<any, any>;

    declare private _avatarRenderManager: AvatarRenderManager;

    declare private _missingAssetNames: any;

    constructor(param1: AvatarRenderManager, param2: AssetLibraryCollection) {
        this._avatarRenderManager = param1;
        this._aliases = new Dictionary();
        this._assets = param2;
        this._missingAssetNames = {};
    }

    public dispose(): void {
        this._assets = null;
        this._aliases = null;
    }

    public reset(): void {
        this._missingAssetNames = {};
        this.init();
    }

    public onAvatarAssetsLibraryReady(param1: string): void {
        let _loc3_: string = null;
        let _loc2_: AssetAlias = null;
        let _loc4_: IAssetLibrary = this._assets.getAssetLibraryByPartialUrl("/" + param1 + ".swf");
        if (_loc4_) {
            for (const _loc5_ of _loc4_.manifest.descendants("alias") ?? []) {
                _loc3_ = String(_loc5_.attribute("name"));
                _loc2_ = new AssetAlias(_loc5_);
                this._aliases.set(_loc3_, _loc2_);
            }
        }
    }

    public init(): void {
        let _loc5_: any;
        let _loc4_: string = null;
        let _loc2_: AssetAlias = null;
        let _loc3_: any[] = this._assets.getManifests();
        for (const _loc1_ of _loc3_ ?? []) {
            for (_loc5_ of _loc1_.descendants("alias") ?? []) {
                _loc4_ = String(_loc5_.attribute("name"));
                _loc2_ = new AssetAlias(_loc5_);
                this._aliases.set(_loc4_, _loc2_);
            }
        }
    }

    public addAlias(param1: string, param2: string, param3: boolean = false, param4: boolean = false): void {
        let _loc6_: XML = new XML(`<alias name="" link="" fliph="0" flipv="0" />`);
        _loc6_.setAttribute("name", param1);
        _loc6_.setAttribute("link", param2);
        let _loc5_: AssetAlias = new AssetAlias(_loc6_);
        this._aliases.set(param1, _loc5_);
    }

    public hasAlias(param1: string): boolean {
        let _loc2_: AssetAlias = asInstanceOf(this._aliases.get(param1), AssetAlias);
        return _loc2_ != null;
    }

    public getAssetName(param1: string): string {
        let _loc4_: AssetAlias = null;
        let _loc2_: string = param1;
        let _loc3_: number = 5;
        while (this.hasAlias(_loc2_) && _loc3_ >= 0) {
            _loc4_ = asInstanceOf(this._aliases.get(_loc2_), AssetAlias);
            _loc2_ = _loc4_.link;
            _loc3_--;
        }
        return _loc2_;
    }

    public getAssetByName(param1: string): IAsset {
        param1 = this.getAssetName(param1);
        if (this._missingAssetNames[param1]) {
            return null;
        }
        let _loc2_: IAsset = this._assets.getAssetByName(param1);
        if (_loc2_ == null && !this._missingAssetNames[param1]) {
            this._missingAssetNames[param1] = true;
        }
        return _loc2_;
    }
}
