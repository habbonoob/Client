import { asGuarded, isClass } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IConnectionStateListener } from '@/com/sulake/core/communication/connection/IConnectionStateListener';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { ICoreCommunicationManager } from '@/com/sulake/core/communication/ICoreCommunicationManager';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageConfiguration } from '@/com/sulake/core/communication/messages/IMessageConfiguration';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { IWireFormat } from '@/com/sulake/core/communication/wireformat/IWireFormat';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import type { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Socket } from '@habbo-pixi/runtime/net/Socket';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getDefinitionByName } from '@habbo-pixi/runtime/utils/getDefinitionByName';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';
import { MessageClassManager } from '@/com/sulake/core/communication/messages/MessageClassManager';
import { EvaWireFormat } from '@/com/sulake/core/communication/wireformat/EvaWireFormat';
import { Core, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { ClassUtils } from '@/com/sulake/core/utils/ClassUtils';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';

export class SocketConnection extends EventDispatcherWrapper implements IConnection, IDisposable {
    static { registerClassName(this, 'com.sulake.core.communication.connection::SocketConnection'); }

    public static readonly DEFAULT_SOCKET_TIMEOUT: number = 10000;

    private static getKeyValue(param1: any[], param2: number): string {
        let _loc4_: any;
        let _loc5_: string = "";
        for (const _loc3_ of param1 ?? []) {
            for (_loc4_ of valuesOf(_loc3_)) {
                _loc5_ += String.fromCharCode(65290 - _loc4_ + param2--);
            }
        }
        return _loc5_;
    }

    constructor(param1: ICoreCommunicationManager, param2: IConnectionStateListener) {
        super();
        this._communicationManager = param1;
        this._SafeStr_2850 = new MessageClassManager();
        this._SafeStr_4249 = new EvaWireFormat();
        this.createSocket();
        this._SafeStr_2483 = new Timer(10000, 1);
        this._SafeStr_2483.addEventListener("timer", this.onTimeOutTimer);
        this._SafeStr_2533 = param2;
    }

    declare private _SafeStr_2196: Socket;

    declare private _SafeStr_2483: Timer;

    declare private _SafeStr_3601: number;
    static { (this.prototype as any)._SafeStr_3601 = 0; }

    declare private _SafeStr_2407: ByteArray;

    declare private _SafeStr_4249: IWireFormat;

    declare private _SafeStr_3838: IEncryption;

    declare private _SafeStr_4084: IEncryption;

    declare private _SafeStr_2850: MessageClassManager;

    declare private _communicationManager: ICoreCommunicationManager;

    declare private _SafeStr_2533: IConnectionStateListener;

    declare private _SafeStr_5760: boolean;
    static { (this.prototype as any)._SafeStr_5760 = false; }

    declare private _configurationReady: boolean;
    static { (this.prototype as any)._configurationReady = false; }

    declare private _pendingClientMessages: IMessageComposer[];

    declare private _pendingServerMessages: IMessageDataWrapper[];

    declare private _lastProcessedMessage: IMessageDataWrapper;

    public set timeout(param1: number) {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2483.delay = param1;
    }

    public get connected(): boolean {
        if (this._SafeStr_2196 == null) {
            return false;
        }
        return this._SafeStr_2196.connected;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.disposeSocket();
            if (this._SafeStr_2483) {
                this._SafeStr_2483.stop();
                this._SafeStr_2483.removeEventListener("timer", this.onTimeOutTimer);
            }
            this._SafeStr_2483 = null;
            this._SafeStr_2407 = null;
            this._SafeStr_2533 = null;
            this._SafeStr_3838 = null;
            this._SafeStr_4084 = null;
            this._SafeStr_4249 = null;
            if (this._SafeStr_2850) {
                this._SafeStr_2850.dispose();
            }
            this._SafeStr_2850 = null;
            this._communicationManager = null;
            this._SafeStr_2533 = null;
            this._lastProcessedMessage = null;
            super.dispose();
        }
    }

    public addListener(param1: string, param2: (...args: any[]) => any): void {
        this.addEventListener(param1, param2);
    }

    public createSocket(): void {
        this.disposeSocket();
        this._SafeStr_2407 = new ByteArray();
        this._SafeStr_4084 = null;
        this._SafeStr_3838 = null;
        this._SafeStr_2196 = new Socket();
        this._SafeStr_2196.addEventListener("connect", this.onConnect);
        this._SafeStr_2196.addEventListener("complete", this.onComplete);
        this._SafeStr_2196.addEventListener("close", this.onClose);
        this._SafeStr_2196.addEventListener("socketData", this.onRead);
        this._SafeStr_2196.addEventListener("securityError", this.onSecurityError);
        this._SafeStr_2196.addEventListener("ioError", this.onIOError);
    }

    public init(param1: string, param2: number = 0, param3: boolean = true): boolean {
        if (this._SafeStr_2533) {
            this._SafeStr_2533.connectionInit(param1, param2 | 0);
        }
        this._SafeStr_2483.start();
        this._SafeStr_3601 = getTimer();
        this._SafeStr_2196.connect(param1 + (param3 ? "?TCP_NODELAY" : ""), param2 | 0);
        return true;
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2850.registerMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2850.unregisterMessageEvent(param1);
    }

    public isAuthenticated(): void {
        this._SafeStr_5760 = true;
    }

    public isConfigured(): void {
        let _loc1_: number = 0;
        let _loc3_: any[] = null;
        this._configurationReady = true;
        if (this._pendingServerMessages) {
            for (const _loc4_ of this._pendingServerMessages ?? []) {
                _loc1_ = _loc4_.getID();
                _loc3_ = this.parseReceivedMessage(_loc4_);
                if (_loc3_ != null) {
                    this.handleReceivedMessage(_loc1_, _loc3_);
                }
            }
        }
        if (this._pendingClientMessages) {
            for (const _loc2_ of this._pendingClientMessages ?? []) {
                this.send(_loc2_);
            }
            this._pendingClientMessages = null;
        }
        this._pendingClientMessages = new Array<IMessageComposer>(0).fill(null);
        this._pendingServerMessages = new Array<IMessageDataWrapper>(0).fill(null);
    }

    public send(param1: IMessageComposer): boolean {
        if (this.disposed) {
            return false;
        }
        if (this._SafeStr_5760 && !this._configurationReady) {
            if (this._pendingClientMessages == null) {
                this._pendingClientMessages = new Array<IMessageComposer>(0).fill(null);
            }
            this._pendingClientMessages.push(param1);
            return false;
        }
        let _loc4_: number = this._SafeStr_2850.getMessageIDForComposer(param1);
        if (_loc4_ < 0) {
            return false;
        }
        let _loc2_: any[] = param1.getMessageArray();
        let _loc3_: ByteArray = this._SafeStr_4249.encode(_loc4_, _loc2_);
        if (this._SafeStr_2533) {
            this._SafeStr_2533.messageSent(String(_loc4_));
        }
        if (this._SafeStr_3838 == null) {
            return false;
        }
        if (this._SafeStr_2196.connected) {
            this._SafeStr_3838.encipher(_loc3_);
            this._SafeStr_2196.writeBytes(_loc3_);
            this._SafeStr_2196.flush();
        } else {
            return false;
        }
        return true;
    }

    public sendUnencrypted(param1: IMessageComposer): boolean {
        if (this.disposed) {
            return false;
        }
        let _loc4_: number = this._SafeStr_2850.getMessageIDForComposer(param1);
        if (_loc4_ < 0) {
            return false;
        }
        let _loc2_: any[] = param1.getMessageArray();
        let _loc3_: ByteArray = this._SafeStr_4249.encode(_loc4_, _loc2_);
        let _loc6_: string = getQualifiedClassName(param1);
        let _loc5_: any = asGuarded(getDefinitionByName(_loc6_), isClass);
        if (!ClassUtils.implementsInterface(_loc5_, IPreEncryptionMessage)) {
            return false;
        }
        if (this._SafeStr_2533) {
            this._SafeStr_2533.messageSent(String(_loc4_));
        }
        if (this._SafeStr_2196.connected) {
            this._SafeStr_2196.writeBytes(_loc3_);
            this._SafeStr_2196.flush();
        } else {
            return false;
        }
        return true;
    }

    public setEncryption(param1: IEncryption, param2: IEncryption): void {
        this._SafeStr_3838 = param1;
        this._SafeStr_4084 = param2;
    }

    public registerMessageClasses(param1: IMessageConfiguration): void {
        this._SafeStr_2850.registerMessages(param1);
    }

    public processReceivedData(): void {
        if (this.disposed) {
            return;
        }
        try {
            this.processData();
        } catch (e) {
            if (this._SafeStr_2533 && this._lastProcessedMessage) {
                this._SafeStr_2533.messageParseError(this._lastProcessedMessage);
            }
            if (!this.disposed) {
                throw e;
            }
        }
    }

    public close(): void {
        if (this._SafeStr_2196 == null) {
            return;
        }
        try {
            this._SafeStr_2196.close();
        } catch (e) {
        }
    }

    public getServerToClientEncryption(): IEncryption {
        return this._SafeStr_4084;
    }

    private disposeSocket(): void {
        if (this._SafeStr_2196) {
            this._SafeStr_2196.removeEventListener("connect", this.onConnect);
            this._SafeStr_2196.removeEventListener("complete", this.onComplete);
            this._SafeStr_2196.removeEventListener("close", this.onClose);
            this._SafeStr_2196.removeEventListener("socketData", this.onRead);
            this._SafeStr_2196.removeEventListener("securityError", this.onSecurityError);
            this._SafeStr_2196.removeEventListener("ioError", this.onIOError);
            if (this._SafeStr_2196.connected) {
                this._SafeStr_2196.close();
            }
            this._SafeStr_2196 = null;
        }
    }

    private processData(): void {
        let _loc1_: any[] = null;
        let _loc2_: number = 0;
        let _loc3_: any[] = null;
        _loc1_ = this.splitReceivedMessages();
        for (this._lastProcessedMessage of _loc1_ ?? []) {
            _loc2_ = this._lastProcessedMessage.getID();
            if (this._SafeStr_2533) {
                this._SafeStr_2533.messageReceived(String(_loc2_));
            }
            if (this._SafeStr_5760 && !this._configurationReady) {
                if (this._pendingServerMessages == null) {
                    this._pendingServerMessages = new Array<IMessageDataWrapper>(0).fill(null);
                }
                this._pendingServerMessages.push(this._lastProcessedMessage);
            } else {
                _loc3_ = this.parseReceivedMessage(this._lastProcessedMessage);
                if (_loc3_ != null) {
                    this.handleReceivedMessage(_loc2_, _loc3_);
                }
            }
        }
    }

    private splitReceivedMessages(): any[] {
        let _loc1_: ByteArray = null;
        this._SafeStr_2407.position = 0;
        if (this._SafeStr_2407.bytesAvailable == 0) {
            return [];
        }
        let _loc2_: any[] = this._SafeStr_4249.splitMessages(this._SafeStr_2407, this);
        if (this._SafeStr_2407.bytesAvailable == 0) {
            this._SafeStr_2407 = new ByteArray();
        } else if (this._SafeStr_2407.position > 0) {
            _loc1_ = new ByteArray();
            _loc1_.writeBytes(this._SafeStr_2407, this._SafeStr_2407.position);
            this._SafeStr_2407 = _loc1_;
        }
        return _loc2_;
    }

    private parseReceivedMessage(param1: IMessageDataWrapper): any[] {
        let _loc2_: IMessageParser = null;
        let _loc3_: any[] = this._SafeStr_2850.getMessageEventsForID(param1.getID());
        if (_loc3_ != null) {
            _loc2_ = (asGuarded(_loc3_[0], isIMessageEvent)).parser;
            try {
                _loc2_.flush();
                _loc2_.parse(param1);
            } catch (e) {
                Core.crash(SocketConnection.getKeyValue([[65220, 65192, 65183, 65179], [65185, 65185, 65252, 65167], [65171, 65249, 65168, 65182], [65164, 65162, 65175, 65243], [65169, 65163, 65173, 65160], [65161, 65164, 65158, 65164], [65234, 65156, 65163, 65148], [65147, 65164, 65157, 65158], [65226, 65140, 65141, 65150, 65144, 65150]], 0) + getQualifiedClassName(_loc2_), (e.errorID ?? 0), e);
            }
        }
        return _loc3_;
    }

    private handleReceivedMessage(param1: number, param2: any[]): void {
        for (const _loc3_ of param2 ?? []) {
            _loc3_.connection = this;
            _loc3_.callback.call(null, _loc3_);
        }
    }

    private onRead = (param1: ProgressEvent): void => {
        if (this._SafeStr_2196 == null) {
            return;
        }
        this._SafeStr_2407.position = this._SafeStr_2407.length;
        this._SafeStr_2196.readBytes(this._SafeStr_2407, this._SafeStr_2407.position);
    };

    private onConnect = (param1: Event): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65182], [65182, 65249, 65175, 65169, 65246]], 0) + (getTimer() - this._SafeStr_3601));
        this.dispatchEvent(param1);
    };

    private onClose = (param1: Event): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65223, 65181, 65177, 65172], [65185, 65185, 65252, 65178], [65172, 65249]], 0) + (getTimer() - this._SafeStr_3601));
        this.dispatchEvent(param1);
    };

    private onComplete = (param1: Event): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65223, 65178, 65179, 65175], [65178, 65184, 65168, 65182], [65182, 65249, 65175, 65169, 65246]], 0) + (getTimer() - this._SafeStr_3601));
        this.dispatchEvent(param1);
    };

    private onSecurityError = (param1: SecurityErrorEvent): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65207, 65188, 65189, 65170], [65172, 65180, 65168, 65162], [65213, 65167, 65166, 65168], [65164, 65245, 65171, 65165, 65242]], 0) + (getTimer() - this._SafeStr_3601));
        this.dispatchEvent(param1);
    };

    private onIOError = (param1: IOErrorEvent): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65217, 65210, 65219, 65173], [65172, 65174, 65170, 65251], [65177, 65171, 65248]], 0) + (getTimer() - this._SafeStr_3601));
        switch (param1.type) {
            case "ioError":
            case "diskError":
            case "networkError":
            case "verifyError":
        }
        this.dispatchEvent(param1);
    };

    private onTimeOutTimer = (param1: TimerEvent): void => {
        this._SafeStr_2483.stop();
        ErrorReportStorage.addDebugData(SocketConnection.getKeyValue([[65223, 65178, 65178, 65177], [65185, 65186, 65168, 65178], [65171, 65171, 65196, 65174], [65169, 65176, 65162]], 0), SocketConnection.getKeyValue([[65206, 65184, 65179, 65186], [65207, 65168, 65168, 65251], [65177, 65171, 65248, 65247]], 0) + (getTimer() - this._SafeStr_3601));
        let _loc2_: IOErrorEvent = new IOErrorEvent("ioError");
        _loc2_.text = SocketConnection.getKeyValue([[65207, 65178, 65189, 65180], [65185, 65169, 65252, 65199], [65177, 65172, 65179, 65168], [65161, 65161, 65244, 65235]], 0) + this._SafeStr_2483.delay + SocketConnection.getKeyValue([[65258, 65180, 65173, 65246], [65240, 65253, 65204, 65172], [65167, 65166, 65175, 65181], [65170, 65176, 65244, 65205], [65169, 65159, 65171, 65152], [65173, 65161, 65160, 65221]], 0);
        this.dispatchEvent(_loc2_);
    };
}
