import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboEarnings } from '@/com/sulake/habbo/catalog/earnings/IHabboEarnings';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IncomeRewardClaimResponseMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeRewardClaimResponseMessageEventParser';
import type { IncomeRewardStatusMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeRewardStatusMessageEventParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { EarningsView } from '@/com/sulake/habbo/catalog/earnings/EarningsView';
import { IncomeRewardClaimResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/vault/IncomeRewardClaimResponseMessageEvent';
import { IncomeRewardNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/vault/IncomeRewardNotificationMessageEvent';
import { IncomeRewardStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/vault/IncomeRewardStatusMessageEvent';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class EarningsController extends Component implements ILinkEventTracker, IHabboEarnings {
    static { registerClassName(this, 'com.sulake.habbo.catalog.earnings::EarningsController'); }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _notifications: IHabboNotifications;

    declare private _catalog: IHabboCatalog;

    declare private _toolbar: IHabboToolbar;

    declare private _view: EarningsView;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_6866: boolean;

    declare private _showingIndicator: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         })]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new IncomeRewardStatusMessageEvent(this.onIncomeRewardStatusMessageEvent));
        this.addMessageEvent(new IncomeRewardClaimResponseMessageEvent(this.onIncomeRewardClaimResponseMessageEvent));
        this.addMessageEvent(new IncomeRewardNotificationMessageEvent(this.onIncomeRewardNotificationMessageEvent));
        this.context.addLinkEventTracker(this);
    }

    private addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._messageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(param1));
    }

    private onIncomeRewardStatusMessageEvent(param1: IncomeRewardStatusMessageEvent): void {
        let _loc3_: IncomeRewardStatusMessageEventParser = param1.getParser();
        if (this._view && !this._view.disposed) {
            this._view.onIncomeRewardDataReceived(_loc3_.data);
        }
        if (this._SafeStr_6866) {
            this._SafeStr_6866 = false;
            for (const _loc2_ of _loc3_.data ?? []) {
                if (_loc2_.rewardType != 0 && _loc2_.amount > 0) {
                    this._showingIndicator = true;
                    break;
                }
            }
            if (this._showingIndicator) {
                this._toolbar.refreshPurseAreaIndicators();
            }
        }
    }

    private onIncomeRewardClaimResponseMessageEvent(param1: IncomeRewardClaimResponseMessageEvent): void {
        let _loc2_: IncomeRewardClaimResponseMessageEventParser = null;
        if (this._view && !this._view.disposed) {
            _loc2_ = param1.getParser();
            this._view.onIncomeRewardClaimResponse(_loc2_.rewardCategory, _loc2_.result);
        }
    }

    private onIncomeRewardNotificationMessageEvent(param1: IncomeRewardNotificationMessageEvent): void {
        this._notifications.addItem("${notification.earning.new}", "earning", null, "habboUI/open/vault");
        if (this._view) {
            this._sessionDataManager.getIncomeRewardStatus();
        }
        if (!this._view || this._view.disposed) {
            this._showingIndicator = true;
            this._toolbar.refreshPurseAreaIndicators();
        }
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public openCatalogue(): void {
        this.context.createLinkEvent("catalog/open");
    }

    public get linkPattern(): string {
        return "habboUI/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 3) {
            return;
        }
        if (_loc2_[1] == "open") {
            let _loc3_: any = _loc2_[2];
            if ("vault" === _loc3_) {
                this.showEarnings();
            }
        }
    }

    public withdrawVaultCredits(): void {
        this._sessionDataManager.withdrawCreditVault();
    }

    public claimReward(param1: number): void {
        this._sessionDataManager.claimReward(param1);
    }

    private showEarnings(): void {
        if (this._showingIndicator) {
            this._showingIndicator = false;
            this._toolbar.refreshPurseAreaIndicators();
        }
        this._sessionDataManager.getIncomeRewardStatus();
        if (!this._view || this._view.disposed) {
            this._view = new EarningsView(this, this._windowManager);
        }
    }

    public get showingIndicator(): boolean {
        return this._showingIndicator;
    }

    public removeView(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public override dispose(): void {
        if (this._messageEvents != null && this._communicationManager != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        this.removeView();
        this._messageEvents = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onIncomeRewardStatusMessageEvent = this.onIncomeRewardStatusMessageEvent.bind(this);
        this.onIncomeRewardClaimResponseMessageEvent = this.onIncomeRewardClaimResponseMessageEvent.bind(this);
        this.onIncomeRewardNotificationMessageEvent = this.onIncomeRewardNotificationMessageEvent.bind(this);
        this._SafeStr_6866 = true;
        this._showingIndicator = false;
        super.initInstanceFields();
    }
}
