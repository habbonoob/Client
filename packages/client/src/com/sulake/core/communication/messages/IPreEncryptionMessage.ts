import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IPreEncryptionMessage {
}

export const IPreEncryptionMessage = Symbol('com.sulake.core.communication.messages::IPreEncryptionMessage');
registerClassName(IPreEncryptionMessage, 'com.sulake.core.communication.messages::IPreEncryptionMessage');

export function isIPreEncryptionMessage(value: unknown): value is IPreEncryptionMessage {
    return (value as { [IPreEncryptionMessage]?: true } | null | undefined)?.[IPreEncryptionMessage] === true;
}
