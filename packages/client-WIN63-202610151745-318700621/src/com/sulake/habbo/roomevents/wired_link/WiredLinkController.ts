import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredLinkNetwork } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkNetwork';
import type { WiredLinkConfigurationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkConfigurationMessageParser';
import type { WiredLinkConnectionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkConnectionsMessageParser';
import type { WiredLinkInvalidatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkInvalidatedMessageParser';
import type { WiredLinkOperationResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredlink/WiredLinkOperationResultMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { WiredLinkConfigurationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConfigurationMessageEvent';
import { WiredLinkConnectionsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConnectionsMessageEvent';
import { WiredLinkInvalidatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkInvalidatedMessageEvent';
import { WiredLinkOpenMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkOpenMessageEvent';
import { WiredLinkOperationResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkOperationResultMessageEvent';
import { WiredLinkCreateNetworkMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkCreateNetworkMessageComposer';
import { WiredLinkDeleteNetworkMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkDeleteNetworkMessageComposer';
import { WiredLinkGetConnectionsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkGetConnectionsMessageComposer';
import { WiredLinkOpenMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkOpenMessageComposer';
import { WiredLinkRenameNetworkMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkRenameNetworkMessageComposer';
import { WiredLinkSaveConfigurationMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredlink/WiredLinkSaveConfigurationMessageComposer';
import { WiredLinkView } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class WiredLinkController extends Component {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_link::WiredLinkController'); }

    public static readonly SAVE: number = 1;
    public static readonly CREATE: number = 2;
    public static readonly RENAME: number = 3;
    public static readonly DELETE: number = 4;
    public static readonly CONNECTIONS: number = 5;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _sessionData: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _view: WiredLinkView;

    declare private _messageEvents: IMessageEvent[];

    declare private _roomId: number;

    declare private _furniId: number;

    declare private _SafeStr_14102: string;

    declare private _SafeStr_14563: string;

    declare private _SafeStr_14103: boolean;

    declare private _SafeStr_14105: WiredLinkNetwork[];

    declare private _SafeStr_14564: string;

    declare private _disposed_WiredLinkController: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override initComponent(): void {
        this._messageEvents = Array.from([new WiredLinkOpenMessageEvent(this.onOpen), new WiredLinkConfigurationMessageEvent(this.onConfiguration), new WiredLinkOperationResultMessageEvent(this.onResult), new WiredLinkConnectionsMessageEvent(this.onConnections), new WiredLinkInvalidatedMessageEvent(this.onInvalidated)]);
        for (const _loc1_ of this._messageEvents ?? []) {
            this._communication.addHabboConnectionMessageEvent(_loc1_);
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat(Array.from([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionData = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REE_DISPOSED", "callback": this.onRoomDisposed }, { "type": "REOE_REMOVED", "callback": this.onObjectChanged }, { "type": "REOE_UPDATED", "callback": this.onObjectChanged }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.onRoomStarted }])]));
    }

    private ownsTarget(param1: number, param2: number): boolean {
        if (this._roomEngine == null || param1 != this._roomEngine.activeRoomId) {
            return false;
        }
        let _loc3_: IRoomObject = this._roomEngine.getRoomObject(param1, param2, 10);
        return _loc3_ != null && _loc3_.getModel() != null && _loc3_.getModel().getNumber("furniture_owner_id") == this._sessionData.userId;
    }

    private matchesTarget(param1: number, param2: number): boolean {
        return this._furniId != 0 && param1 == this._roomId && param2 == this._furniId && this.ownsTarget(param1, param2);
    }

    private onOpen(param1: WiredLinkOpenMessageEvent): void {
        let _loc2_: number = param1.getParser().furniId;
        if (!this.ownsTarget(this._roomEngine.activeRoomId, _loc2_)) {
            return;
        }
        this.send(new WiredLinkOpenMessageComposer(_loc2_));
    }

    private onConfiguration(param1: WiredLinkConfigurationMessageEvent): void {
        let _loc2_: WiredLinkConfigurationMessageParser = param1.getParser();
        if (!this.ownsTarget(_loc2_.roomId, _loc2_.furniId)) {
            return;
        }
        this._roomId = _loc2_.roomId;
        this._furniId = _loc2_.furniId;
        this._SafeStr_14564 = "0";
        this._SafeStr_14102 = _loc2_.selectedNetworkId;
        this._SafeStr_14563 = this._SafeStr_14102;
        this._SafeStr_14103 = _loc2_.receiveLocal;
        this._SafeStr_14105 = _loc2_.networks.concat();
        if (this._view == null) {
            this._view = new WiredLinkView(this, this._windowManager);
        }
        this._view.showConfiguration();
    }

    private onResult(param1: WiredLinkOperationResultMessageEvent): void {
        let _loc3_: number = 0;
        let _loc2_: WiredLinkOperationResultMessageParser = param1.getParser();
        if (!this.matchesTarget(_loc2_.roomId, _loc2_.furniId)) {
            return;
        }
        if (_loc2_.resultCode != 0) {
            this._view.operationFailed(_loc2_.resultCode, _loc2_.operation);
            return;
        }
        if (_loc2_.hasConfiguration) {
            this._SafeStr_14102 = _loc2_.selectedNetworkId;
        }
        if (this._SafeStr_14563 == _loc2_.removedNetworkId) {
            this._SafeStr_14563 = "0";
        }
        this.removeNetwork(_loc2_.removedNetworkId);
        for (const _loc4_ of _loc2_.networks ?? []) {
            _loc3_ = this.networkIndex(_loc4_.id);
            if (_loc3_ < 0) {
                this._SafeStr_14105.push(_loc4_);
            } else {
                this._SafeStr_14105[_loc3_] = _loc4_;
            }
        }
        this._view.operationSucceeded(_loc2_.operation, _loc2_.removedNetworkId, _loc2_.networks);
    }

    private onConnections(param1: WiredLinkConnectionsMessageEvent): void {
        let _loc2_: WiredLinkConnectionsMessageParser = param1.getParser();
        if (!this.matchesTarget(_loc2_.roomId, _loc2_.furniId) || _loc2_.networkId != this._SafeStr_14564) {
            return;
        }
        this._SafeStr_14564 = "0";
        this._view.showConnections(_loc2_.networkId, _loc2_.connections);
    }

    private onInvalidated(param1: WiredLinkInvalidatedMessageEvent): void {
        let _loc2_: WiredLinkInvalidatedMessageParser = param1.getParser();
        if (!this.matchesTarget(_loc2_.roomId, _loc2_.furniId)) {
            return;
        }
        this.removeNetwork(_loc2_.deletedNetworkId);
        if (this._SafeStr_14102 == _loc2_.deletedNetworkId) {
            this._SafeStr_14102 = "0";
        }
        if (this._SafeStr_14563 == _loc2_.deletedNetworkId) {
            this._SafeStr_14563 = "0";
        }
        this._view.networkDeleted(_loc2_.deletedNetworkId);
    }

    private canEdit(): boolean {
        if (!this.ownsTarget(this._roomId, this._furniId)) {
            this.invalidate();
            return false;
        }
        return true;
    }

    public save(param1: string, param2: boolean): void {
        if (!this.canEdit()) {
            return;
        }
        if (!this.canConnect(param1)) {
            this._view.operationFailed(5, 1);
            return;
        }
        this._SafeStr_14563 = param1;
        this._SafeStr_14103 = param2;
        this.send(new WiredLinkSaveConfigurationMessageComposer(this._furniId, param1, param2));
    }

    public setReceiveLocal(param1: boolean): void {
        this.save(this._SafeStr_14563, param1);
        if (param1 && this._SafeStr_14563 == "0" && this._furniId != 0) {
            this._view.showReceiveLocalInfo();
        }
    }

    private validName(param1: string, param2: number): boolean {
        if (param1.length <= 255 && Boolean(/\S/.test(param1))) {
            return true;
        }
        this._view.operationFailed(3, param2);
        return false;
    }

    public createNetwork(param1: string): void {
        if (this.validName(param1, 2) && this.canEdit()) {
            this.send(new WiredLinkCreateNetworkMessageComposer(this._furniId, param1));
        }
    }

    public renameNetwork(param1: string, param2: string): void {
        if (this.getNetwork(param1) != null && this.validName(param2, 3) && this.canEdit()) {
            this.send(new WiredLinkRenameNetworkMessageComposer(this._furniId, param1, param2));
        }
    }

    public deleteNetwork(param1: string): void {
        if (this.getNetwork(param1) != null && this.canEdit()) {
            this.send(new WiredLinkDeleteNetworkMessageComposer(this._furniId, param1));
        }
    }

    public getConnections(param1: string): void {
        if (this.getNetwork(param1) != null && this.canEdit()) {
            this._SafeStr_14564 = param1;
            this._view.showConnectionsLoading(param1, this.getNetwork(param1).name);
            this.send(new WiredLinkGetConnectionsMessageComposer(this._furniId, param1));
        }
    }

    public canConnect(param1: string): boolean {
        if (param1 == "0") {
            return true;
        }
        let _loc2_: WiredLinkNetwork = this.getNetwork(param1);
        return _loc2_ != null && (!_loc2_.linkedInCurrentRoom || param1 == this._SafeStr_14102);
    }

    public getNetwork(param1: string): WiredLinkNetwork {
        let _loc2_: number = this.networkIndex(param1);
        return _loc2_ < 0 ? null : this._SafeStr_14105[_loc2_];
    }

    private networkIndex(param1: string): number {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14105.length) {
            if (this._SafeStr_14105[_loc2_].id == param1) {
                return _loc2_;
            }
            _loc2_++;
        }
        return -1;
    }

    private removeNetwork(param1: string): void {
        let _loc2_: number = this.networkIndex(param1);
        if (_loc2_ >= 0) {
            this._SafeStr_14105.splice(_loc2_, 1);
        }
    }

    public visitRoom(param1: number): void {
        this.context.createLinkEvent("navigator/goto/" + param1);
    }

    private send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    private onRoomDisposed(param1: RoomEngineEvent): void {
        if (param1.roomId == this._roomId) {
            this.invalidate();
        }
    }

    private onRoomStarted(param1: RoomSessionEvent): void {
        this.invalidate();
    }

    private onObjectChanged(param1: RoomEngineObjectEvent): void {
        if (param1.roomId == this._roomId && param1.objectId == this._furniId && param1.category == 10 && (param1.type == "REOE_REMOVED" || !this.ownsTarget(this._roomId, this._furniId))) {
            this.invalidate();
        }
    }

    private invalidate(): void {
        this._roomId = 0;
        this._furniId = 0;
        this._SafeStr_14564 = "0";
        this._SafeStr_14105.length = 0;
        this._SafeStr_14102 = "0";
        this._SafeStr_14563 = "0";
        this._SafeStr_14103 = false;
        if (this._view != null) {
            this._view.hide();
        }
    }

    public get networks(): WiredLinkNetwork[] {
        return this._SafeStr_14105;
    }

    public get selectedNetworkId(): string {
        return this._SafeStr_14102;
    }

    public get receiveLocal(): boolean {
        return this._SafeStr_14103;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localization;
    }

    public override dispose(): void {
        if (this._disposed_WiredLinkController) {
            return;
        }
        this._disposed_WiredLinkController = true;
        for (const _loc1_ of this._messageEvents ?? []) {
            this._communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        if (this._view != null) {
            this._view.dispose();
        }
        this._view = null;
        this._SafeStr_14105 = null;
        this._communication = null;
        this._localization = null;
        this._sessionData = null;
        this._windowManager = null;
        this._roomEngine = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onOpen = this.onOpen.bind(this);
        this.onConfiguration = this.onConfiguration.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onConnections = this.onConnections.bind(this);
        this.onInvalidated = this.onInvalidated.bind(this);
        this.onRoomDisposed = this.onRoomDisposed.bind(this);
        this.onRoomStarted = this.onRoomStarted.bind(this);
        this.onObjectChanged = this.onObjectChanged.bind(this);
        this._roomId = 0;
        this._furniId = 0;
        this._SafeStr_14102 = "0";
        this._SafeStr_14563 = "0";
        this._SafeStr_14103 = false;
        this._SafeStr_14105 = [];
        this._SafeStr_14564 = "0";
        this._disposed_WiredLinkController = false;
        super.initInstanceFields();
    }
}
