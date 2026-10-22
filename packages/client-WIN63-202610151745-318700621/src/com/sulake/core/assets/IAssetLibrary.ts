import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderStruct } from '@/com/sulake/core/assets/AssetLoaderStruct';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { LibraryLoader } from '@/com/sulake/core/utils/LibraryLoader';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IAssetLibrary extends IDisposable {
    get url(): string;
    get name(): string;
    get isReady(): boolean;
    get numAssets(): number;
    get manifest(): XML;
    get nameArray(): any[];
    loadFromFile(param1: LibraryLoader, param2?: boolean): void;
    loadFromResource(param1: XML, param2: any): boolean;
    unload(): void;
    loadAssetFromFile(param1: string, param2: URLRequest, param3?: string, param4?: number): AssetLoaderStruct;
    getAssetByName(param1: string): IAsset;
    getAssetByContent(param1: any): IAsset;
    getAssetByIndex(param1: number): IAsset;
    getAssetIndex(param1: IAsset): number;
    hasAsset(param1: string): boolean;
    setAsset(param1: string, param2: IAsset, param3?: boolean): boolean;
    createAsset(param1: string, param2: AssetTypeDeclaration): IAsset;
    removeAsset(param1: IAsset): IAsset;
    registerAssetTypeDeclaration(param1: AssetTypeDeclaration, param2?: boolean): boolean;
    getAssetTypeDeclarationByMimeType(param1: string, param2?: boolean): AssetTypeDeclaration;
    getAssetTypeDeclarationByClass(param1: any, param2?: boolean): AssetTypeDeclaration;
    getAssetTypeDeclarationByFileName(param1: string, param2?: boolean): AssetTypeDeclaration;
}

export const IAssetLibrary = Symbol('com.sulake.core.assets::IAssetLibrary');
registerClassName(IAssetLibrary, 'com.sulake.core.assets::IAssetLibrary');

export function isIAssetLibrary(value: unknown): value is IAssetLibrary {
    return (value as { [IAssetLibrary]?: true } | null | undefined)?.[IAssetLibrary] === true;
}
