import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';

export class AssetLoaderStruct extends EventDispatcherWrapper implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.assets::AssetLoaderStruct'); }

    declare private _assetLoader: IAssetLoader;

    declare private _assetName: string;

    constructor(param1: string, param2: IAssetLoader) {
        super();
        this._assetName = param1;
        this._assetLoader = param2;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get assetLoader(): IAssetLoader {
        return this._assetLoader;
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._assetLoader != null) {
                if (!this._assetLoader.disposed) {
                    this._assetLoader.dispose();
                    this._assetLoader = null;
                }
            }
            super.dispose();
        }
    }
}
