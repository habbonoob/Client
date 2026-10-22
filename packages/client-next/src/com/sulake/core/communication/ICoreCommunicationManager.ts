import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IConnectionStateListener } from '@/com/sulake/core/communication/connection/IConnectionStateListener';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export interface ICoreCommunicationManager extends IUnknown {
    createConnection(param1?: IConnectionStateListener): IConnection;
}
