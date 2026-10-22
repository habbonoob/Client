import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { IWiredCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/IWiredCtrl';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { WiredClickUserMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/WiredClickUserMessageComposer';
import { isIRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import { IncomingMessages } from '@/com/sulake/habbo/roomevents/IncomingMessages';
import { SelfDonationTool } from '@/com/sulake/habbo/roomevents/misc/SelfDonationTool';
import { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import { NewVariablePickerHelper } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePickerHelper';
import { UserDefinedRoomEventsCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/UserDefinedRoomEventsCtrl';
import { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController.group';
import { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import { RewardNotificationController } from '@/com/sulake/habbo/roomevents/wired_trading/reward_notification/RewardNotificationController';
import { WiredTransactionDetailsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/WiredTransactionDetailsController';
import { WiredTransactionLogsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/overview/WiredTransactionLogsController';
import { WiredEnvironment } from '@/com/sulake/habbo/roomevents/WiredEnvironment';
import { WiredVariablesSynchronizer } from '@/com/sulake/habbo/roomevents/WiredVariablesSynchronizer';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRewardNotificationController } from '@/com/sulake/iid/IIDRewardNotificationController';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSelfDonationTool } from '@/com/sulake/iid/IIDSelfDonationTool';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { IIDTransactionDetailsController } from '@/com/sulake/iid/IIDTransactionDetailsController';
import { IIDTransactionLogsController } from '@/com/sulake/iid/IIDTransactionLogsController';
import { IIDWiredChestController } from '@/com/sulake/iid/IIDWiredChestController';
import { IIDWiredMenuController } from '@/com/sulake/iid/IIDWiredMenuController';

export class HabboUserDefinedRoomEvents extends Component implements IHabboUserDefinedRoomEvents {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::HabboUserDefinedRoomEvents'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._wiredCtrl = new UserDefinedRoomEventsCtrl(this);
        this._variablesSynchronizer = new WiredVariablesSynchronizer(this);
        this._SafeStr_3635 = new WiredEnvironment(this);
        this._wiredMenu = new WiredMenuController(this, param1, 0, param3);
        this._wiredChest = new WiredChestController(this, param1, 0, param3);
        this._transactionLogs = new WiredTransactionLogsController(this, param1, 0, param3);
        this._transactionDetails = new WiredTransactionDetailsController(this, param1, 0, param3);
        this._variablePickerHelper = new NewVariablePickerHelper(this);
        this._SafeStr_4586 = new WiredContractController(this);
        this._rewardNotificationController = new RewardNotificationController(this, param1, 0, param3);
        this._selfDonationTool = new SelfDonationTool(this, param1, 0, param3);
        param1.attachComponent(this._wiredMenu, [new IIDWiredMenuController()]);
        param1.attachComponent(this._wiredChest, [new IIDWiredChestController()]);
        param1.attachComponent(this._transactionLogs, [new IIDTransactionLogsController()]);
        param1.attachComponent(this._transactionDetails, [new IIDTransactionDetailsController()]);
        param1.attachComponent(this._rewardNotificationController, [new IIDRewardNotificationController()]);
        param1.attachComponent(this._selfDonationTool, [new IIDSelfDonationTool()]);
    }

    declare private _toolbar: IHabboToolbar;

    declare private _wiredCtrl: IWiredCtrl;

    declare private _incomingMessages: IncomingMessages;

    declare private _roomSession: IRoomSession;

    declare private _wiredMenu: WiredMenuController;

    declare private _wiredChest: WiredChestController;

    declare private _transactionLogs: WiredTransactionLogsController;

    declare private _SafeStr_4586: WiredContractController;

    declare private _rewardNotificationController: RewardNotificationController;

    declare private _variablesSynchronizer: WiredVariablesSynchronizer;

    declare private _SafeStr_3635: WiredEnvironment;

    declare private _variablePickerHelper: NewVariablePickerHelper;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communication = param1;
            }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
                this._windowManager = param1;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localization = param1;
            }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
                this._notifications = param1;
            }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
                this._roomEngine = param1;
            }, true, [{ "type": "REOE_ADDED", "callback": this.roomObjectAddedHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_CREATED", "callback": this.roomSessionStateEventHandler }, { "type": "RSE_STARTED", "callback": this.roomSessionStateEventHandler }, { "type": "RSE_ENDED", "callback": this.roomSessionStateEventHandler }]), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionDataManager = param1;
            }), new ComponentDependency(new IIDHabboRoomUI(), (param1: IRoomUI): void => {
                this._roomUI = param1;
            }, false), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
                this._toolbar = param1;
            }, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onHabboToolbarEvent }])]);
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _communication: IHabboCommunicationManager;

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    declare private _localization: IHabboLocalizationManager;

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    declare private _notifications: IHabboNotifications;

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    declare private _roomEngine: IRoomEngine;

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    declare private _sessionDataManager: ISessionDataManager;

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    declare private _transactionDetails: WiredTransactionDetailsController;

    public get transactionDetails(): WiredTransactionDetailsController {
        return this._transactionDetails;
    }

    declare private _selfDonationTool: SelfDonationTool;

    public get selfDonationTool(): SelfDonationTool {
        return this._selfDonationTool;
    }

    declare private _roomUI: IRoomUI;

    public get roomUI(): IRoomUI {
        return this._roomUI;
    }

    public get wiredWhisperDisabled(): boolean {
        return this._wiredMenu.wiredWhisperDisabled;
    }

    public set wiredWhisperDisabled(param1: boolean) {
        this._wiredMenu.wiredWhisperDisabled = param1;
    }

    public get wiredCtrl(): IWiredCtrl {
        return this._wiredCtrl;
    }

    public get roomId(): number {
        return this._roomSession ? this._roomSession.roomId : 0;
    }

    public get roomSession(): IRoomSession {
        return this._roomSession;
    }

    public get wiredMenu(): WiredMenuController {
        return this._wiredMenu;
    }

    public get wiredChest(): WiredChestController {
        return this._wiredChest;
    }

    public get transactionLogs(): WiredTransactionLogsController {
        return this._transactionLogs;
    }

    public get rewardNotificationController(): RewardNotificationController {
        return this._rewardNotificationController;
    }

    public get roomDesktop(): IRoomDesktop {
        return this._roomUI.desktop;
    }

    public get variablesSynchronizer(): WiredVariablesSynchronizer {
        return this._variablesSynchronizer;
    }

    public get variablePickerHelper(): NewVariablePickerHelper {
        return this._variablePickerHelper;
    }

    protected override initComponent(): void {
        this._incomingMessages = new IncomingMessages(this);
        this._roomEngine.events.addEventListener("REE_DISPOSED", this.onRoomEngineEvent);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._incomingMessages != null) {
            this._incomingMessages.dispose();
            this._incomingMessages = null;
        }
        if (this._variablesSynchronizer != null) {
            this._variablesSynchronizer.dispose();
            this._variablesSynchronizer = null;
        }
        if (this._SafeStr_3635 != null) {
            this._SafeStr_3635.dispose();
            this._SafeStr_3635 = null;
        }
        this._wiredMenu.dispose();
        this._wiredChest.dispose();
        this._transactionLogs.dispose();
        this._transactionDetails.dispose();
        this._SafeStr_4586.dispose();
        this._rewardNotificationController.dispose();
        this._selfDonationTool.dispose();
        this._wiredMenu = null;
        this._wiredChest = null;
        this._transactionLogs = null;
        this._transactionDetails = null;
        this._SafeStr_4586 = null;
        this._rewardNotificationController = null;
        this._selfDonationTool = null;
        super.dispose();
    }

    public stuffSelected(param1: number): void {
        let _loc2_: ISelectedRoomObjectData = (isIRoomEngineServices(this._roomEngine) ? this._roomEngine : null).getPlacedObjectData(this.roomId);
        if (_loc2_ && _loc2_.id == -param1) {
            (isIRoomEngineServices(this._roomEngine) ? this._roomEngine : null).setPlacedObjectData(this.roomId, null);
            return;
        }
        this._wiredCtrl.stuffSelected(param1);
        this._wiredMenu.furniSelected(param1);
    }

    public userSelected(param1: number): void {
        if (this.hasClickUserWired()) {
            this.send(new WiredClickUserMessageComposer(param1));
        }
        this._wiredMenu.userSelected(param1);
    }

    public showInspectButton(): boolean {
        return this._wiredMenu.isEnabled && this._wiredMenu.hasReadPermission && this.wiredMenu.wiredInspectButton;
    }

    public showToolbarMenuButton(): boolean {
        return this._wiredMenu.isEnabled && this._wiredMenu.hasReadPermission && this.wiredMenu.wiredMenuButton;
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IWindow = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1 + "_xml");
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this._windowManager.buildFromXML(XML.from(_loc2_.content));
        } catch (e) {
        }
        return _loc3_;
    }

    public refreshButton(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any, param5: number, param6: string = null): void {
        if (!param6) {
            param6 = param2;
        }
        let _loc7_: IBitmapWrapperWindow = asGuarded(param1.findChildByName(param2), isIBitmapWrapperWindow);
        if (!param3) {
            _loc7_.visible = false;
        } else {
            this.prepareButton(_loc7_, param6, param4, param5);
            _loc7_.visible = true;
        }
    }

    public getButtonImage(param1: string, param2: string = "_png"): BitmapData {
        let _loc4_: string = param1 + param2;
        let _loc6_: IAsset = this.assets.getAssetByName(_loc4_);
        let _loc5_: BitmapDataAsset = castTo(_loc6_, BitmapDataAsset);
        let _loc3_: BitmapData = castTo(_loc5_.content, BitmapData);
        return _loc3_.clone();
    }

    public hasClickUserWired(): boolean {
        return this._SafeStr_3635.hasClickUserWired;
    }

    public switchPlayTestMode(): void {
        this._wiredMenu.setPlayTestMode(!this._wiredMenu.playTestMode, true, true);
    }

    public resetCache(): void {
        this._wiredCtrl.clearCache();
    }

    public hasWiredUIOpen(): boolean {
        return this._wiredCtrl.hasUIOpen() || this._wiredMenu.hasUIOpen();
    }

    private prepareButton(param1: IBitmapWrapperWindow, param2: string, param3: (...args: any[]) => any, param4: number): void {
        param1.id = param4;
        param1.procedure = param3;
        if (param1.bitmap != null) {
            return;
        }
        param1.bitmap = this.getButtonImage(param2);
        param1.width = param1.bitmap.width;
        param1.height = param1.bitmap.height;
    }

    private roomObjectAddedHandler(param1: RoomEngineObjectEvent): void {
        let _loc2_: number = param1.objectId;
        let _loc3_: number = param1.category;
        switch (_loc3_ - 10) {
            case 0:
                this._wiredCtrl.stuffAdded(_loc2_);
                break;
            case 10:
                this._wiredCtrl.stuffAdded(-_loc2_);
        }
    }

    private onHabboToolbarEvent(param1: HabboToolbarEvent): void {
        if (param1.type != "HTE_TOOLBAR_CLICK") {
            return;
        }
        if (param1.iconId == "HTIE_ICON_WIRED_MENU") {
            this._wiredMenu.toggleView();
        }
    }

    private roomSessionStateEventHandler(param1: RoomSessionEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        switch (param1.type) {
            case "RSE_CREATED":
            case "RSE_STARTED":
            case "RSE_ENDED":
                this._roomSession = param1.session;
        }
    }

    private onRoomEngineEvent(param1: RoomEngineEvent): void {
        if (param1 == null) {
            return;
        }
        if (param1.type == "REE_DISPOSED") {
            this._variablesSynchronizer.clear();
            this._SafeStr_3635.clear();
            this._wiredCtrl.close();
            this._SafeStr_4586.clear();
        }
    }

    protected override initInstanceFields(): void {
        this.roomObjectAddedHandler = this.roomObjectAddedHandler.bind(this);
        this.onHabboToolbarEvent = this.onHabboToolbarEvent.bind(this);
        this.roomSessionStateEventHandler = this.roomSessionStateEventHandler.bind(this);
        this.onRoomEngineEvent = this.onRoomEngineEvent.bind(this);
        super.initInstanceFields();
    }
}
