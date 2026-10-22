import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IAssetLoader extends IEventDispatcher, IDisposable {
    get url(): string;
    get content(): any;
    get bytes(): ByteArray;
    get mimeType(): string;
    get bytesLoaded(): number;
    get bytesTotal(): number;
    get errorCode(): number;
    get id(): number;
    load(param1: URLRequest): void;
}

export const IAssetLoader = Symbol('com.sulake.core.assets.loaders::IAssetLoader');
registerClassName(IAssetLoader, 'com.sulake.core.assets.loaders::IAssetLoader');

export function isIAssetLoader(value: unknown): value is IAssetLoader {
    return (value as { [IAssetLoader]?: true } | null | undefined)?.[IAssetLoader] === true;
}
