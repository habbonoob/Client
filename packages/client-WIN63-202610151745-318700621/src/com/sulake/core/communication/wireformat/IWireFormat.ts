import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export interface IWireFormat {
    dispose(): void;
    encode(param1: number, param2: any[]): ByteArray;
    splitMessages(param1: ByteArray, param2: IConnection): any[];
}
