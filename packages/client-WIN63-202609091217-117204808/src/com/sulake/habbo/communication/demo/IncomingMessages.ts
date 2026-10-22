import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { IKeyExchange } from '@/com/sulake/core/communication/handshake/IKeyExchange';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { HabboCommunicationDemo } from '@/com/sulake/habbo/communication/demo/HabboCommunicationDemo';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { LoginFailedHotelClosedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/LoginFailedHotelClosedMessageParser';
import type { ErrorReportMessageParser } from '@/com/sulake/habbo/communication/messages/parser/error/ErrorReportMessageParser';
import type { GenericErrorParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/GenericErrorParser';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { RSAKey } from '@/com/hurlant/crypto/rsa/RSAKey';
import { BigInteger } from '@/com/hurlant/math/BarrettReduction.group';
import { CryptoTools } from '@/com/sulake/core/communication/encryption/CryptoTools';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { _SafeCls_6001 } from '@/com/sulake/habbo/_SafeCls_6001';
import { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import { LoginFailedHotelClosedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/LoginFailedHotelClosedMessageEvent';
import { MaintenanceStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/availability/MaintenanceStatusMessageEvent';
import { ErrorReportEvent } from '@/com/sulake/habbo/communication/messages/incoming/error/ErrorReportEvent';
import { AuthenticationOKMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/AuthenticationOKMessageEvent';
import { CompleteDiffieHandshakeEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/CompleteDiffieHandshakeEvent';
import { DisconnectReasonEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/DisconnectReasonEvent';
import { GenericErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/GenericErrorEvent';
import { IdentityAccountsEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/IdentityAccountsEvent';
import { InitDiffieHandshakeEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/InitDiffieHandshakeEvent';
import { PingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/PingMessageEvent';
import { UniqueMachineIDEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UniqueMachineIDEvent';
import { ClientHelloMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/ClientHelloMessageComposer';
import { CompleteDiffieHandshakeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/CompleteDiffieHandshakeMessageComposer';
import { InfoRetrieveMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/InfoRetrieveMessageComposer';
import { InitDiffieHandshakeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/InitDiffieHandshakeMessageComposer';
import { PongMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/PongMessageComposer';
import { GetFurnitureAliasesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/GetFurnitureAliasesMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { MaintenanceStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/MaintenanceStatusMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class IncomingMessages {
    static { registerClassName(this, 'com.sulake.habbo.communication.demo::IncomingMessages'); }

    declare private _component: HabboCommunicationDemo;

    declare private _communication: IHabboCommunicationManager;

    declare private _SafeStr_3223: IKeyExchange;

    declare private _privateKey: string;

    declare private _handshakeInProgress: boolean;
    static { (this.prototype as any)._handshakeInProgress = false; }

    declare private _logoutInProgress: boolean;
    static { (this.prototype as any)._logoutInProgress = false; }

    private _messageEvents: IMessageEvent[] = new Array<IMessageEvent>(0).fill(null);

    declare private _rsa: RSAKey;

    constructor(param1: HabboCommunicationDemo, param2: IHabboCommunicationManager) {
        this._component = param1;
        this._communication = param2;
        let _loc3_: IConnection = this._communication.connection;
        if (_loc3_ == null) {
            throw new Error("Connection is required to initialize!");
        }
        _loc3_.addEventListener("connect", this.onConnectionEstablished);
        _loc3_.addEventListener("close", this.onConnectionDisconnected);
        this.addHabboConnectionMessageEvent(new MaintenanceStatusMessageEvent(this.onMaintenance));
        this.addHabboConnectionMessageEvent(new CompleteDiffieHandshakeEvent(this.onCompleteDiffieHandshake));
        this.addHabboConnectionMessageEvent(new DisconnectReasonEvent(this.onDisconnectReason));
        this.addHabboConnectionMessageEvent(new LoginFailedHotelClosedMessageEvent(this.onLoginFailedHotelClosed));
        this.addHabboConnectionMessageEvent(new IdentityAccountsEvent(this.onIdentityAccounts));
        this.addHabboConnectionMessageEvent(new InitDiffieHandshakeEvent(this.onInitDiffieHandshake));
        this.addHabboConnectionMessageEvent(new GenericErrorEvent(this.onGenericError));
        this.addHabboConnectionMessageEvent(new AuthenticationOKMessageEvent(this.onAuthenticationOK));
        this.addHabboConnectionMessageEvent(new ErrorReportEvent(this.onErrorReport));
        this.addHabboConnectionMessageEvent(new UniqueMachineIDEvent(this.onUniqueMachineId));
        this.addHabboConnectionMessageEvent(new PingMessageEvent(this.onPing));
        this._component.context.events.addEventListener("unload", this.unloading);
    }

    private static setReasonProperty(param1: string, param2: string): string {
        if (param1.indexOf("%reason%") != -1) {
            return param1.replace("%reason%", param2);
        }
        return param1;
    }

    public dispose(): void {
        let _loc1_: IConnection = null;
        if (this._communication) {
            _loc1_ = this._communication.connection;
            if (_loc1_ != null) {
                _loc1_.removeEventListener("connect", this.onConnectionEstablished);
                _loc1_.removeEventListener("close", this.onConnectionDisconnected);
            }
            for (const _loc2_ of this._messageEvents ?? []) {
                this._communication.removeHabboConnectionMessageEvent(_loc2_);
            }
            this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        }
        this._component = null;
        this._communication = null;
        this._SafeStr_3223 = null;
    }

    private addHabboConnectionMessageEvent(param1: IMessageEvent): void {
        this._communication.addHabboConnectionMessageEvent(param1);
        this._messageEvents.push(param1);
    }

    private unloading = (param1: Event): void => {
        this._logoutInProgress = true;
    };

    private onInitDiffieHandshake = (param1: IMessageEvent): void => {
        let _loc9_: string = null;
        let _loc16_: IConnection = param1.connection;
        let _loc2_: InitDiffieHandshakeEvent = param1 instanceof InitDiffieHandshakeEvent ? param1 : null;
        let _loc3_: ByteArray = new ByteArray();
        let _loc4_: ByteArray = new ByteArray();
        _loc3_.writeBytes(CryptoTools.hexStringToByteArray(_loc2_.encryptedPrime));
        _loc4_.writeBytes(CryptoTools.hexStringToByteArray(_loc2_.encryptedGenerator));
        let _loc5_: ByteArray = new ByteArray();
        let _loc8_: ByteArray = new ByteArray();
        console.log(_SafeCls_6001._SafeStr_14012(-1820302793));
        this._rsa = RSAKey.parsePublicKey(_SafeCls_6001._SafeStr_14012(-1820302793), "10001");
        this._rsa.verify(_loc3_, _loc5_, _loc3_.length);
        this._rsa.verify(_loc4_, _loc8_, _loc4_.length);
        let _loc11_: BigInteger = new BigInteger(_loc5_.toString(), 10);
        let _loc12_: BigInteger = new BigInteger(_loc8_.toString(), 10);
        let _loc10_: BigInteger = BigInteger.nbv(2);
        if (_loc11_.compareTo(_loc10_) <= 0 || _loc12_.compareTo(_loc11_) >= 0) {
            Core.crash("Invalid DH prime and generator", 29);
            return;
        }
        if (_loc11_.equals(_loc12_)) {
            Core.crash("Invalid DH prime and generator", 29);
            return;
        }
        this._SafeStr_3223 = this._communication.initializeKeyExchange(_loc11_, _loc12_);
        let _loc6_: string = null;
        let _loc13_: number = 10;
        let _loc7_: string = null;
        while (_loc13_ > 0) {
            _loc7_ = this.generateRandomHexString(30);
            this._SafeStr_3223.init(_loc7_);
            _loc9_ = this._SafeStr_3223.getPublicKey(10);
            if (_loc9_.length >= 64) {
                _loc6_ = _loc9_;
                this._privateKey = _loc7_;
                break;
            }
            if (_loc6_ == null || _loc9_.length > _loc6_.length) {
                _loc6_ = _loc9_;
                this._privateKey = _loc7_;
            }
            _loc13_--;
        }
        if (_loc7_ != this._privateKey) {
            this._SafeStr_3223.init(this._privateKey);
        }
        let _loc15_: ByteArray = new ByteArray();
        let _loc14_: ByteArray = new ByteArray();
        _loc15_.writeMultiByte(_loc6_, "iso-8859-1");
        this._rsa.encrypt(_loc15_, _loc14_, _loc15_.length);
        _loc16_.sendUnencrypted(new CompleteDiffieHandshakeMessageComposer(CryptoTools.byteArrayToHexString(_loc14_)));
    };

    private onCompleteDiffieHandshake = (param1: IMessageEvent): void => {
        let _loc9_: IEncryption = null;
        let _loc7_: IConnection = param1.connection;
        let _loc4_: CompleteDiffieHandshakeEvent = param1 instanceof CompleteDiffieHandshakeEvent ? param1 : null;
        let _loc6_: ByteArray = new ByteArray();
        let _loc3_: ByteArray = new ByteArray();
        _loc6_.writeBytes(CryptoTools.hexStringToByteArray(_loc4_.encryptedPublicKey));
        this._rsa.verify(_loc6_, _loc3_, _loc6_.length);
        this._rsa.dispose();
        this._SafeStr_3223.generateSharedKey(_loc3_.toString(), 10);
        let _loc2_: string = this._SafeStr_3223.getSharedKey(16).toUpperCase();
        if (!this._SafeStr_3223.isValidServerPublicKey()) {
            return;
        }
        let _loc8_: ByteArray = CryptoTools.hexStringToByteArray(_loc2_);
        _loc8_.position = 0;
        let _loc5_: IEncryption = this._communication.initializeEncryption();
        _loc5_.init(_loc8_);
        if (_loc4_.serverClientEncryption) {
            _loc9_ = this._communication.initializeEncryption();
            _loc9_.init(_loc8_);
        }
        _loc7_.setEncryption(_loc5_, _loc9_);
        this._handshakeInProgress = false;
        this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_HANDSHAKED");
        this._component.sendConnectionParameters(_loc7_);
    };

    private onAuthenticationOK = (param1: AuthenticationOKMessageEvent): void => {
        let _loc4_: IConnection = param1.connection;
        this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_AUTHENTICATED");
        let _loc2_: InfoRetrieveMessageComposer = new InfoRetrieveMessageComposer();
        _loc4_.send(_loc2_);
        let _loc3_: EventLogMessageComposer = new EventLogMessageComposer("Login", "socket", "client.auth_ok");
        _loc4_.send(_loc3_);
        let _loc5_: GetFurnitureAliasesMessageComposer = new GetFurnitureAliasesMessageComposer();
        _loc4_.send(_loc5_);
        this._communication.suggestedLoginActions = param1.suggestedLoginActions;
        this._component.loginOk();
    };

    private onLoginFailedHotelClosed = (param1: IMessageEvent): void => {
        let _loc2_: LoginFailedHotelClosedMessageParser = (param1 instanceof LoginFailedHotelClosedMessageEvent ? param1 : null).getParser();
        this._component.handleLoginFailedHotelClosedMessage(_loc2_.openHour, _loc2_.openMinute);
    };

    private onGenericError = (param1: IMessageEvent): void => {
        let _loc2_: GenericErrorParser = (param1 instanceof GenericErrorEvent ? param1 : null).getParser();
        switch (_loc2_.errorCode) {
            case -3:
                this._component.alert("${connection.error.id.title}", "${connection.login.error.-3.desc}");
                break;
            case -400:
                this._component.alert("${connection.error.id.title}", "${connection.login.error.-400.desc}");
        }
    };

    private onPing = (param1: IMessageEvent): void => {
        let _loc2_: IConnection = param1.connection;
        let _loc3_: PongMessageComposer = new PongMessageComposer();
        _loc2_.send(_loc3_);
    };

    // [SecureSWF(controlFlow="0",codeWrap="off")]
    private onUniqueMachineId = (param1: UniqueMachineIDEvent): void => {
        CommunicationUtils.writeSOLProperty("machineid", param1.machineID);
    };

    private onIdentityAccounts = (param1: IdentityAccountsEvent): void => {
        let _loc3_: string = null;
        let _loc6_: AvatarData = null;
        let _loc4_: AvatarData[] = new Array<AvatarData>(0).fill(null);
        let _loc2_: Map<any, any> = param1.getParser().accounts;
        for (const _loc5_ of _loc2_?.keys() ?? []) {
            _loc3_ = stringOrNull(_loc2_.get(_loc5_));
            _loc6_ = new AvatarData(null);
            _loc6_.id = parseInt(stringOrNull(_loc5_)) | 0;
            _loc6_.name = _loc3_;
            _loc4_.push(_loc6_);
        }
        this._component.onUserList(_loc4_);
    };

    private onErrorReport = (param1: IMessageEvent): void => {
        let _loc2_: ErrorReportMessageParser = (param1 instanceof ErrorReportEvent ? param1 : null).getParser();
        let _loc3_: number = _loc2_.errorCode;
        let _loc4_: number = _loc2_.messageId;
        this._component.handleErrorMessage(_loc3_, _loc4_);
    };

    private onConnectionEstablished = (param1: Event = null): void => {
        let _loc2_: IConnection = this._communication.connection;
        if (_loc2_ != null) {
            this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_ESTABLISHED");
            this._logoutInProgress = false;
            this._handshakeInProgress = true;
            this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_HANDSHAKING");
            _loc2_.sendUnencrypted(new ClientHelloMessageComposer());
            _loc2_.sendUnencrypted(new InitDiffieHandshakeMessageComposer());
        }
    };

    private onMaintenance = (param1: MaintenanceStatusMessageEvent): void => {
        let _loc2_: MaintenanceStatusMessageParser = asInstanceOf(param1.parser, MaintenanceStatusMessageParser);
        Logger.log("Got maintenance status, with minutes left: " + _loc2_.minutesUntilMaintenance.toString());
        this._component.localization.registerParameter("disconnected.maintenance_status", "%minutes%", _loc2_.minutesUntilMaintenance.toString());
        let _loc3_: string = this._component.localization.getLocalization("disconnected.maintenance_status");
        this._component.disconnected(-2, _loc3_);
    };

    private onDisconnectReason = (param1: DisconnectReasonEvent): void => {
        if (this._handshakeInProgress) {
            this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL");
        }
        Logger.log("[HabboLogin] Got disconnect reason: " + param1.reason);
        this._component.disconnected(param1.reason, param1.getReasonName());
        this._handshakeInProgress = false;
        this._logoutInProgress = true;
    };

    private handleWebLogout(param1: DisconnectReasonEvent): void {
        let _loc2_: string = this._component.getProperty("logout.url");
        if (_loc2_.length > 0) {
            _loc2_ = IncomingMessages.setReasonProperty(_loc2_, param1.reasonString);
            _loc2_ = this.setOriginProperty(_loc2_);
            _loc2_ += "&id=" + param1.reason;
            if (this._component.context.configuration.getInteger("spaweb", 0) == 1) {
                HabboWebTools.sendDisconnectToWeb(param1.reason, param1.reasonString);
            } else {
                HabboWebTools.openWebPage(_loc2_, "_self");
            }
        }
    }

    private setOriginProperty(param1: string): string {
        if (param1.indexOf("%origin%") != -1) {
            return param1.replace("%origin%", this._component.getProperty("flash.client.origin"));
        }
        return param1;
    }

    private onConnectionDisconnected = (param1: Event): void => {
        let _loc2_: string = null;
        if (this._component.isRoomViewerMode) {
            return;
        }
        if (this._handshakeInProgress) {
            this._component.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL");
        }
        if (ExternalInterface.available) {
            ExternalInterface.call("FlashExternalInterface.logDisconnection", "Communication failure, client disconnected.");
            if (param1.type == "close" && !this._logoutInProgress) {
                _loc2_ = this._component.getProperty("logout.disconnect.url");
                _loc2_ = this.setOriginProperty(_loc2_);
                if (this._component.context.configuration.getInteger("spaweb", 0) == 1) {
                    HabboWebTools.sendDisconnectToWeb(-1, "HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL");
                } else {
                    HabboWebTools.openWebPage(_loc2_, "_self");
                }
            }
        }
        if (param1.type == "close" && !this._logoutInProgress) {
            this._component.disconnected(-3, "");
        }
    };

    private generateRandomHexString(param1: number = 16): string {
        let _loc5_: number = 0;
        let _loc4_: any = 0;
        let _loc3_: string = null;
        let _loc2_: string = "";
        _loc5_ = 0;
        while (_loc5_ < param1) {
            _loc4_ = Math.random() * 255 >>> 0;
            _loc3_ = stringOrNull(_loc4_.toString(16));
            if (_loc3_.length < 2) {
                _loc3_ = "0" + _loc3_;
            }
            _loc2_ += _loc3_;
            _loc5_++;
        }
        return _loc2_;
    }
}
