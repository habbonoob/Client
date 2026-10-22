import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export interface ICoreConfiguration extends IUnknown {
    propertyExists(param1: string): boolean;
    getProperty(param1: string, param2?: Map<any, any>): string;
    setProperty(param1: string, param2: string, param3?: boolean, param4?: boolean): void;
    getBoolean(param1: string): boolean;
    getInteger(param1: string, param2: number): number;
    interpolate(param1: string): string;
    updateUrlProtocol(param1: string): string;
}

export const ICoreConfiguration = Symbol('com.sulake.core.runtime::ICoreConfiguration');
registerClassName(ICoreConfiguration, 'com.sulake.core.runtime::ICoreConfiguration');

export function isICoreConfiguration(value: unknown): value is ICoreConfiguration {
    return (value as { [ICoreConfiguration]?: true } | null | undefined)?.[ICoreConfiguration] === true;
}
