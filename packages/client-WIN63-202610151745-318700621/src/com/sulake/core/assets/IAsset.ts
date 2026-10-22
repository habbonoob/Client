import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';

export interface IAsset extends IDisposable {
    get url(): string;
    get content(): any;
    get declaration(): AssetTypeDeclaration;
    setUnknownContent(param1: any): void;
    setFromOtherAsset(param1: IAsset): void;
    setParamsDesc(param1: XMLList): void;
}

export const IAsset = Symbol('com.sulake.core.assets::IAsset');
registerClassName(IAsset, 'com.sulake.core.assets::IAsset');

export function isIAsset(value: unknown): value is IAsset {
    return (value as { [IAsset]?: true } | null | undefined)?.[IAsset] === true;
}
