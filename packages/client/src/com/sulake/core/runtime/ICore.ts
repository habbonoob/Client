import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IFileProxy } from '@/com/sulake/core/utils/IFileProxy';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface ICore extends IContext, ICoreConfiguration {
    get fileProxy(): IFileProxy;
    get arguments(): Map<any, any>;
    initialize(): void;
    purge(): void;
    hibernate(param1: number, param2?: number): void;
    resume(): void;
    writeDictionaryToProxy(param1: string, param2: Map<any, any>): boolean;
    readDictionaryFromProxy(param1: string): Map<any, any>;
    writeXMLToProxy(param1: string, param2: XML): boolean;
    readXMLFromProxy(param1: string): XML;
    readStringFromProxy(param1: string): string;
    writeStringToProxy(param1: string, param2: string): boolean;
    readConfigDocument(param1: XML, param2?: IEventDispatcher): void;
    getNumberOfFilesPending(): number;
    getNumberOfFilesLoaded(): number;
    setProfilerMode(param1: boolean): void;
    clearArguments(): void;
}

export const ICore = Symbol('com.sulake.core.runtime::ICore');
registerClassName(ICore, 'com.sulake.core.runtime::ICore');

export function isICore(value: unknown): value is ICore {
    return (value as { [ICore]?: true } | null | undefined)?.[ICore] === true;
}
