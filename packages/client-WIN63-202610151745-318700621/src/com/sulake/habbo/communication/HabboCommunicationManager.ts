import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BigInteger } from '@/com/hurlant/math/BigInteger';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IConnectionStateListener } from '@/com/sulake/core/communication/connection/IConnectionStateListener';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { IKeyExchange } from '@/com/sulake/core/communication/handshake/IKeyExchange';
import type { ICoreCommunicationManager } from '@/com/sulake/core/communication/ICoreCommunicationManager';
import type { IMessageConfiguration } from '@/com/sulake/core/communication/messages/IMessageConfiguration';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboWebApiListener } from '@/com/sulake/habbo/communication/IHabboWebApiListener';
import type { IHabboWebApiSession } from '@/com/sulake/habbo/communication/IHabboWebApiSession';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component, Core } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { ArcFour } from '@/com/sulake/habbo/communication/encryption/ArcFour';
import { DiffieHellman } from '@/com/sulake/habbo/communication/encryption/DiffieHellman';
import { HabboMessages } from '@/com/sulake/habbo/communication/HabboMessages';
import { HabboWebApiSession } from '@/com/sulake/habbo/communication/HabboWebApiSession';
import { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import { DisconnectMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/DisconnectMessageComposer';
import { IIDCoreCommunicationManager } from '@/com/sulake/iid/IIDCoreCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';

export class HabboCommunicationManager extends Component implements IHabboCommunicationManager, IConnectionStateListener {
    static { registerClassName(this, 'com.sulake.habbo.communication::HabboCommunicationManager'); }

    private static readonly DEFAULT_CONNECTION_ATTEMPTS: number = 2;

    declare private _communication: ICoreCommunicationManager;

    declare private _messages: IMessageConfiguration;

    declare private _SafeStr_6907: string;

    declare private _SafeStr_2781: any[];

    declare private _tcpNoDelay: boolean;

    declare private _SafeStr_2575: number;

    declare private _SafeStr_5578: Timer;

    declare private _SafeStr_3544: number;

    declare private _SafeStr_2284: string;

    declare private _SafeStr_6539: boolean;

    declare private _SafeStr_7211: boolean;

    declare private _a4: any[];

    declare private _suggestedLoginActions: any[];

    declare private _SafeStr_2859: IHabboWebApiSession;

    declare private _connection: IConnection;

    declare private _mode: number;

    declare private _requiresInitialRetryAttempt: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        param1.events.addEventListener("unload", this.unloading);
    }

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

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDCoreCommunicationManager(), (param1: ICoreCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboConfigurationManager(), null, false, [{ "type": "complete", "callback": this.onConfigurationComplete }])]);
    }

    private onAuthenticated(param1: Event): void {
        this._connection.isAuthenticated();
    }

    private onConfigurationComplete(param1: Event): void {
        this._connection.isConfigured();
    }

    public disconnect(): void {
        if (this._connection) {
            this._connection.close();
        }
    }

    public get connection(): IConnection {
        return this._connection;
    }

    public get mode(): number {
        return 0;
    }

    public set mode(param1: number) {
        this._mode = param1;
    }

    public get port(): number {
        if (this._SafeStr_2781.length == 0 || this._SafeStr_2575 < 0 || this._SafeStr_2575 >= this._SafeStr_2781.length) {
            return 0;
        }
        return this._SafeStr_2781[this._SafeStr_2575] | 0;
    }

    public get suggestedLoginActions(): any[] {
        return this._suggestedLoginActions;
    }

    public set suggestedLoginActions(param1: any[]) {
        this._suggestedLoginActions = param1;
    }

    protected override initComponent(): void {
        this.context.events.addEventListener("HABBO_CONNECTION_EVENT_AUTHENTICATED", this.onAuthenticated);
        this._connection = this._communication.createConnection(this);
        this._connection.registerMessageClasses(this._messages);
        this._connection.addListener("ioError", this.onIOError);
        this._connection.addListener("securityError", this.onSecurityError);
        this._connection.addListener("connect", this.onConnect);
        this.updateHostParameters();
        if (this._SafeStr_7211) {
            this.nextPort();
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._connection) {
            this._connection.dispose();
            this._connection = null;
        }
        if (this._SafeStr_2859) {
            this._SafeStr_2859.dispose();
            this._SafeStr_2859 = null;
        }
        super.dispose();
    }

    public updateHostParameters(): void {
        let _loc6_: string = null;
        let _loc4_: any[] = null;
        let _loc7_: number = 0;
        let _loc10_: any[] = [65162, 65162, 65158, 65155];
        let _loc9_: any[] = [65234, 65174, 65168, 65175, 65165, 65229];
        let _loc2_: any[] = [65170, 65162, 65157, 65155];
        let _loc1_: any[] = [65186, 65168, 65178, 65171, 65171];
        let _loc5_: string = this.getProperty(HabboCommunicationManager.getKeyValue([this._a4, _loc1_, _loc9_, _loc2_], 0), null);
        if (_loc5_ == null) {
            Core.crash(HabboCommunicationManager.getKeyValue([this._a4, _loc1_, _loc9_, _loc2_], 0), 30);
            return;
        }
        _loc4_ = [];
        _loc7_ = 1;
        while (_loc7_ < 5) {
            switch (_loc7_ - 1) {
                case 0:
                    _loc4_.push(this._a4);
                    break;
                case 1:
                    _loc4_.push(_loc1_);
                    break;
                case 2:
                    _loc4_.push(_loc9_);
                    break;
                case 3:
                    _loc4_.push(_loc10_);
            }
            _loc7_++;
        }
        _loc6_ = this.getProperty(HabboCommunicationManager.getKeyValue(_loc4_, 0), null);
        if (_loc6_ == null) {
            Core.crash(HabboCommunicationManager.getKeyValue([this._a4, _loc1_, _loc9_, _loc10_], 0), 30);
            return;
        }
        this._SafeStr_2781 = [];
        let _loc8_: any[] = _loc6_.split(",");
        for (const _loc3_ of _loc8_ ?? []) {
            this._SafeStr_2781.push(parseInt(stringOrNull(_loc3_.replace(" ", ""))));
        }
        this._SafeStr_6907 = _loc5_;
    }

    public renewSocket(): void {
        this._SafeStr_3544 = 1;
        this._requiresInitialRetryAttempt = true;
        if (this._connection != null) {
            this._connection.createSocket();
        }
    }

    public initConnection(param1: string): void {
        let _loc2_: string = param1;
        if ("habbo" === _loc2_) {
            if (this._connection == null) {
                Core.crash("Tried to connect to proxy but connection was null", 30);
                return;
            }
            this._SafeStr_7211 = true;
            if (this.allRequiredDependenciesInjected) {
                this.nextPort();
            }
        }
    }

    public addHabboConnectionMessageEvent(param1: IMessageEvent): IMessageEvent {
        if (this._connection) {
            this._connection.addMessageEvent(param1);
        }
        return param1;
    }

    public removeHabboConnectionMessageEvent(param1: IMessageEvent): void {
        if (this._connection) {
            this._connection.removeMessageEvent(param1);
        }
    }

    public connectionInit(param1: string, param2: number): void {
        ErrorReportStorage.setParameter("host", param1);
        ErrorReportStorage.setParameter("port", String(param2));
    }

    public messageReceived(param1: string): void {
        ErrorReportStorage.setParameter("rece_msg_time", String(new Date().getTime()));
        if (this._SafeStr_2284.length > 0) {
            this._SafeStr_2284 += ",R:" + param1;
        } else {
            this._SafeStr_2284 = "R:" + param1;
        }
        if (this._SafeStr_2284.length > 150) {
            this._SafeStr_2284 = this._SafeStr_2284.substring(this._SafeStr_2284.length - 150);
        }
    }

    public messageSent(param1: string): void {
        ErrorReportStorage.setParameter("sent_msg_time", String(new Date().getTime()));
        if (this._SafeStr_2284.length > 0) {
            this._SafeStr_2284 += ",S:" + param1;
        } else {
            this._SafeStr_2284 = "S:" + param1;
        }
        if (this._SafeStr_2284.length > 150) {
            this._SafeStr_2284 = this._SafeStr_2284.substring(this._SafeStr_2284.length - 150);
        }
    }

    public messageParseError(param1: IMessageDataWrapper): void {
        ErrorReportStorage.setParameter("sent_msg_data", stringOrNull((param1).toString()));
        ErrorReportStorage.addDebugData("MESSAGE_QUEUE", this._SafeStr_2284);
    }

    public setMessageQueueErrorDebugData(): void {
        ErrorReportStorage.addDebugData("MESSAGE_QUEUE", this._SafeStr_2284);
    }

    public initializeEncryption(): IEncryption {
        return new ArcFour();
    }

    public set tcpNoDelay(param1: boolean) {
        this._tcpNoDelay = param1;
    }

    public initializeKeyExchange(param1: BigInteger, param2: BigInteger): IKeyExchange {
        return new DiffieHellman(param1, param2);
    }

    private nextPort(): void {
        let _loc1_: number = 0;
        if (!this._connection) {
            return;
        }
        if (this._connection.connected) {
            return;
        }
        this._SafeStr_2575 = this._SafeStr_2575 + 1;
        if (this._SafeStr_2575 >= this._SafeStr_2781.length) {
            ErrorReportStorage.addDebugData("ConnectionRetry", "Connection attempt " + this._SafeStr_3544);
            this._SafeStr_3544 = this._SafeStr_3544 + 1;
            _loc1_ = 2;
            if (this._SafeStr_2781.length == 1) {
                _loc1_++;
            }
            if (this._SafeStr_3544 > _loc1_) {
                if (this._SafeStr_6539) {
                    return;
                }
                this._SafeStr_6539 = true;
                Core.error("Connection failed to host and ports", true, 30);
                return;
            }
            this._SafeStr_2575 = 0;
        }
        this._connection.timeout = this._SafeStr_3544 * 10000;
        // host lock: the configured host as written (tools/fixes/host_lock.py)
        this._connection.init(this._SafeStr_6907, this._SafeStr_2781[this._SafeStr_2575] >>> 0, this._tcpNoDelay);
        if (this._requiresInitialRetryAttempt) {
            this._SafeStr_2575 = this._SafeStr_2575 - 1;
            this._requiresInitialRetryAttempt = false;
        }
    }

    private tryNextPort(): void {
        this._SafeStr_5578.addEventListener("timer", this.onTryNextPort);
        this._SafeStr_5578.start();
    }

    private unloading(param1: Event): void {
        if (this._connection) {
            this._connection.send(new DisconnectMessageComposer());
        }
    }

    private onIOError(param1: IOErrorEvent): void {
        switch (param1.type) {
            case "ioError":
            case "diskError":
            case "networkError":
            case "verifyError":
        }
        ErrorReportStorage.addDebugData("Communication IO Error", "IOError " + param1.type + " on connect: " + param1.text + ". Port was " + this._SafeStr_2781[this._SafeStr_2575]);
        this.tryNextPort();
    }

    private onConnect(param1: Event): void {
        ErrorReportStorage.addDebugData("Connection", "Connected with " + this._SafeStr_3544 + " attempts");
    }

    private onTryNextPort(param1: TimerEvent): void {
        this.nextPort();
    }

    private onSecurityError(param1: SecurityErrorEvent): void {
        ErrorReportStorage.addDebugData("Communication Security Error", "SecurityError on connect: " + param1.text + ". Port was " + this._SafeStr_2781[this._SafeStr_2575]);
        this.tryNextPort();
    }

    public createHabboWebApiSession(param1: IHabboWebApiListener, param2: string): IHabboWebApiSession {
        if (this._SafeStr_2859 != null) {
            this.resetHabboWebApiSession();
        }
        let _loc3_: HabboWebApiSession = new HabboWebApiSession(param2);
        _loc3_.addListener(param1);
        this._SafeStr_2859 = _loc3_;
        this.events.dispatchEvent(new Event("HABBO_POCKET_SESSION_CREATED"));
        return _loc3_;
    }

    public getHabboWebApiSession(): IHabboWebApiSession {
        return this._SafeStr_2859;
    }

    public resetHabboWebApiSession(): void {
        if (this._SafeStr_2859) {
            this._SafeStr_2859.dispose();
            this._SafeStr_2859 = null;
        }
    }

    protected override initInstanceFields(): void {
        this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.unloading = this.unloading.bind(this);
        this.onIOError = this.onIOError.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onTryNextPort = this.onTryNextPort.bind(this);
        this.onSecurityError = this.onSecurityError.bind(this);
        this._messages = new HabboMessages();
        this._SafeStr_6907 = "";
        this._SafeStr_2781 = [];
        this._tcpNoDelay = true;
        this._SafeStr_2575 = -1;
        this._SafeStr_5578 = new Timer(100, 1);
        this._SafeStr_3544 = 1;
        this._SafeStr_2284 = "";
        this._SafeStr_6539 = false;
        this._SafeStr_7211 = false;
        this._a4 = [65191, 65178, 65178, 65177, 65185];
        this._suggestedLoginActions = [];
        this._mode = 0;
        this._requiresInitialRetryAttempt = true;
        super.initInstanceFields();
    }

    get [IHabboCommunicationManager](): true {
        return true;
    }
}
