import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';

export interface IDisposable {
    get disposed(): boolean;
    dispose(): void;
}

export const IDisposable = Symbol('com.sulake.core.runtime::IDisposable');
registerClassName(IDisposable, 'com.sulake.core.runtime::IDisposable');

export function isIDisposable(value: unknown): value is IDisposable {
    return (value as { [IDisposable]?: true } | null | undefined)?.[IDisposable] === true;
}

registerTypeDescriptions({"com.sulake.core.runtime::IDisposable":{"interface":true,"instance":[["r","disposed","Boolean"],["m","dispose","void",[],[]]]}});
