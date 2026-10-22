import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IMessageComposer {
    getMessageArray(): any[];
    dispose(): void;
}

export const IMessageComposer = Symbol('com.sulake.core.communication.messages::IMessageComposer');
registerClassName(IMessageComposer, 'com.sulake.core.communication.messages::IMessageComposer');

export function isIMessageComposer(value: unknown): value is IMessageComposer {
    return (value as { [IMessageComposer]?: true } | null | undefined)?.[IMessageComposer] === true;
}
