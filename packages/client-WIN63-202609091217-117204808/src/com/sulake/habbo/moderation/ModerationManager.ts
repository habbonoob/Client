import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { CallForHelpCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpCategoryData';
import type { ModeratorInitData } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorInitData';
import type { IHabboFriendBar } from '@/com/sulake/habbo/friendbar/IHabboFriendBar';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboModeration } from '@/com/sulake/habbo/moderation/IHabboModeration';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { HabboComponentFlags } from '@/com/sulake/habbo/configuration/enum/HabboComponentFlags';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IssueCategoryNames } from '@/com/sulake/habbo/moderation/IssueCategoryNames';
import { IssueManager } from '@/com/sulake/habbo/moderation/IssueManager';
import { ModerationMessageHandler } from '@/com/sulake/habbo/moderation/ModerationMessageHandler';
import { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { StartPanelCtrl } from '@/com/sulake/habbo/moderation/StartPanelCtrl';
import { WindowTracker } from '@/com/sulake/habbo/moderation/WindowTracker';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFriendBar } from '@/com/sulake/iid/IIDHabboFriendBar';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDNewModerationTool } from '@/com/sulake/iid/IIDNewModerationTool';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class ModerationManager extends Component implements IHabboModeration {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ModerationManager'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _navigator: IHabboNavigator;

    declare private _soundManager: IHabboSoundManager;

    declare private _tracking: IHabboTracking;

    declare private _friendBar: IHabboFriendBar;

    declare private _messageHandler: ModerationMessageHandler;

    declare private _issueManager: IssueManager;

    declare private _startPanel: StartPanelCtrl;

    declare private _windowTracker: WindowTracker;

    declare private _initMsg: ModeratorInitData;

    declare private _SafeStr_6700: number;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._startPanel = new StartPanelCtrl(this);
        this._windowTracker = new WindowTracker();
        param1.attachComponent(new NewModerationTool(param1, param2, param3), [new IIDNewModerationTool()]);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._tracking = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             IssueCategoryNames.setLocalizationManager(param1);
         }), new ComponentDependency(new IIDHabboFriendBar(), (param1: IHabboFriendBar): void => {
             this._friendBar = param1;
         })]);
    }

    protected override initComponent(): void {
        if (HabboComponentFlags.isRoomViewerMode(this.flags | 0)) {
            return;
        }
        this._messageHandler = new ModerationMessageHandler(this);
        this._issueManager = new IssueManager(this);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._startPanel != null) {
            this._startPanel.dispose();
            this._startPanel = null;
        }
        super.dispose();
    }

    public userSelected(param1: number, param2: string): void {
        Logger.log("USER SELECTED: " + param1 + ", " + param2);
        this._startPanel.userSelected(param1, param2);
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get issueManager(): IssueManager {
        return this._issueManager;
    }

    public get connection(): IConnection {
        return this._communication.connection;
    }

    public get startPanel(): StartPanelCtrl {
        return this._startPanel;
    }

    public get initMsg(): ModeratorInitData {
        return this._initMsg;
    }

    public get messageHandler(): ModerationMessageHandler {
        return this._messageHandler;
    }

    public get windowTracker(): WindowTracker {
        return this._windowTracker;
    }

    public get currentFlatId(): number {
        return this._SafeStr_6700;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public set initMsg(param1: ModeratorInitData) {
        this._initMsg = param1;
    }

    public set currentFlatId(param1: number) {
        this._SafeStr_6700 = param1;
    }

    public get isModerator(): boolean {
        return this._sessionDataManager.hasSecurity(5);
    }

    public getXmlWindow(param1: string, param2: string = "_xml", param3: number = 1): IWindow {
        let _loc6_: IAsset = null;
        let _loc4_: XmlAsset = null;
        let _loc5_: IWindow = null;
        try {
            _loc6_ = this.assets.getAssetByName(param1 + param2);
            _loc4_ = castTo(_loc6_, XmlAsset);
            _loc5_ = this._windowManager.buildFromXML(XML.from(_loc4_.content), param3 >>> 0);
        } catch (e) {
        }
        return _loc5_;
    }

    public openHkPage(param1: string, param2: string): void {
        let _loc4_: string = this.getProperty(param1);
        let _loc5_: string = _loc4_ + param2;
        let _loc3_: string = "housekeeping";
        HabboWebTools.navigateToURL(_loc5_, _loc3_);
    }

    public goToRoom(param1: number): void {
        this._navigator.goToPrivateRoom(param1);
    }

    public openThread(param1: number, param2: number): void {
        this.context.createLinkEvent("groupforum/" + param1 + "/" + param2);
    }

    public openThreadMessage(param1: number, param2: number, param3: number): void {
        this.context.createLinkEvent("groupforum/" + param1 + "/" + param2 + "/" + param3);
    }

    public logEvent(param1: string, param2: string): void {
        if (this._tracking != null) {
            this._tracking.trackEventLog("Moderation", param2, param1);
        }
    }

    public trackGoogle(param1: string, param2: number = -1): void {
        if (this._tracking != null) {
            this._tracking.trackGoogle("moderationManager", param1, param2);
        }
    }

    public set cfhTopics(param1: CallForHelpCategoryData[]) {
        this._issueManager.setCfhTopics(param1);
    }

    protected override initInstanceFields(): void {
        this._SafeStr_6700 = 0;
        super.initInstanceFields();
    }
}
