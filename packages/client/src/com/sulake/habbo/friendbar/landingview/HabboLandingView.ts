import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { NavigatorSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/NavigatorSettingsEvent';
import { RequestABadgeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/RequestABadgeComposer';
import { CommunityGoalVoteMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/landingview/votes/CommunityGoalVoteMessageComposer';
import { ForwardToARandomPromotedRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/ForwardToARandomPromotedRoomMessageComposer';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';
import { IHabboLandingView } from '@/com/sulake/habbo/friendbar/IHabboLandingView';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { OnBoardingHcFlow } from '@/com/sulake/habbo/friendbar/onBoardingHc/OnBoardingHcFlow';
import { AbstractView } from '@/com/sulake/habbo/friendbar/view/AbstractView';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboAvatarEditor } from '@/com/sulake/iid/IIDHabboAvatarEditor';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboQuestEngine } from '@/com/sulake/iid/IIDHabboQuestEngine';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboLandingView extends AbstractView implements IHabboLandingView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview::HabboLandingView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboLandingView.#initStatics();
        return HabboLandingView._log;
    }

    public static positionAfterAndStretch(param1: IWindowContainer, param2: string, param3: string): void {
        let _loc5_: IWindow = param1.findChildByName(param2);
        let _loc6_: IWindow = param1.findChildByName(param3);
        let _loc4_: number = _loc6_.x;
        _loc6_.x = _loc5_.x + _loc5_.width + 5;
        _loc6_.width += _loc4_ - _loc6_.x;
    }

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    declare private _landingViewLayout: WidgetContainerLayout;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _toolbar: IHabboToolbar;

    declare private _gameManager: IHabboGameManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _errorLayout: IWindow;

    declare private _SafeStr_2553: OnBoardingHcFlow;

    declare private _isInitialized: boolean;

    declare private _SafeStr_7293: boolean;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
                this._roomSessionManager = param1;
            }), new ComponentDependency(new IIDHabboConfigurationManager(), null), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
                this._catalog = param1;
            }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
                this._navigator = param1;
            }), new ComponentDependency(new IIDHabboQuestEngine(), (param1: IHabboQuestEngine): void => {
                this._questEngine = param1;
            }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
                this._toolbar = param1;
            }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
                this._habboHelp = param1;
            }), new ComponentDependency(new IIDHabboGameManager(), (param1: IHabboGameManager): void => {
                this._gameManager = param1;
            }, false), new ComponentDependency(new IIDHabboAvatarEditor(), (param1: IHabboAvatarEditor): void => {
                this._avatarEditor = param1;
            }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
                this._avatarRenderManager = param1;
            }, true, [{ "type": "AVATAR_RENDER_READY", "callback": this.onAvatarRendererReady }]), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
                this._roomEngine = param1;
            })]);
    }

    declare private _communicationManager: IHabboCommunicationManager;

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    declare private _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    declare private _navigator: IHabboNavigator;

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    declare private _questEngine: IHabboQuestEngine;

    public get questEngine(): IHabboQuestEngine {
        return this._questEngine;
    }

    declare private _habboHelp: IHabboHelp;

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    declare private _avatarEditor: IHabboAvatarEditor;

    public get avatarEditor(): IHabboAvatarEditor {
        return this._avatarEditor;
    }

    declare private _roomEngine: IRoomEngine;

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get isLandingViewVisible(): boolean {
        return this._landingViewLayout != null && this._landingViewLayout.window != null && Boolean(this._landingViewLayout.window.visible);
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public set toolbarExtensionExtraMargin(param1: boolean) {
        if (this._toolbar && this._toolbar.extensionView) {
            this._toolbar.extensionView.extraMargin = param1 ? 10 : 0;
        }
    }

    public get newIdentity(): boolean {
        return this.getInteger("new.identity", 0) > 0;
    }

    public get dynamicLayoutLeftPaneWidth(): number {
        return this.getInteger("landing.view.dynamic.leftPaneWidth", 500);
    }

    public get dynamicLayoutRightPaneWidth(): number {
        return this.getInteger("landing.view.dynamic.rightPaneWidth", 250);
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._isInitialized = false;
            if (this._landingViewLayout) {
                this._landingViewLayout.dispose();
                this._landingViewLayout = null;
            }
            if (this._SafeStr_2553) {
                this._SafeStr_2553.removeEventListener("NewUserFlowFinished", this.onNewUserReceptionFinished);
                this._SafeStr_2553.dispose();
                this._SafeStr_2553 = null;
            }
            if (this._toolbar != null && this._toolbar.events != null) {
                this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
            }
            if (this._errorLayout) {
                this._errorLayout.dispose();
                this._errorLayout = null;
            }
            super.dispose();
        }
    }

    protected override initComponent(): void {
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
        this._catalog.events.addEventListener("CATALOG_INVISIBLE_PAGE_VISITED", this.onExpiredLinkClick);
        this._communicationManager.addHabboConnectionMessageEvent(new NavigatorSettingsEvent(this.onNavigatorSettings));
    }

    public initialize(): void {
        let _loc3_: any[] = null;
        let _loc5_: number = 0;
        let _loc4_: string = null;
        this._isInitialized = true;
        let _loc2_: IDesktopWindow = this._windowManager.getDesktop(0);
        let _loc1_: IWindow = _loc2_.getChildByName("hotel_view_welcome_window");
        if (_loc1_ != null) {
            _loc2_.removeChild(_loc1_);
            _loc1_.dispose();
        }
        if (this.newIdentity && this.getBoolean("landing.view.new_identity_override_enabled")) {
            _loc3_ = this.getProperty("landing.view.new_identity_widgets").split(",");
            _loc5_ = 1;
            while (_loc5_ <= 6) {
                _loc4_ = "landing.view.dynamic.slot." + _loc5_ + ".";
                if (_loc5_ == 1 || _loc5_ == 6) {
                    this.setProperty(_loc4_ + "widget", "");
                } else {
                    this.setProperty(_loc4_ + "widget", "widgetcontainer");
                    this.setProperty(_loc4_ + "conf", "2001-01-01 00:00," + _loc3_[_loc5_ - 2]);
                }
                _loc5_++;
            }
            this.setProperty("landing.view.dynamic.leftPaneWidth", "400");
            this.setProperty("landing.view.dynamic.rightPaneWidth", "400");
        }
        this._landingViewLayout = new WidgetContainerLayout(this);
        this.activate();
    }

    public activate(): void {
        if (this.isOnboardingRequired(this._communicationManager.suggestedLoginActions)) {
            if (this._toolbar) {
                this._toolbar.setToolbarState("HTE_STATE_HIDDEN");
            }
            return;
        }
        if (!this._isInitialized) {
            this.tryInitialize();
        }
        if (this._toolbar) {
            this._toolbar.setToolbarState("HTE_STATE_HOTEL_VIEW");
        }
        if (this._landingViewLayout != null) {
            this._landingViewLayout.activate();
        } else {
            HabboLandingView._log.error("ERROR - Landing view layout is not initialized and cannot be activated - See caught errors in tryInitialize()");
        }
    }

    public disable(): void {
        if (this._landingViewLayout != null) {
            this._landingViewLayout.disable();
            this.toolbarExtensionExtraMargin = false;
        }
    }

    public send(param1: IMessageComposer): void {
        if (this._communicationManager) {
            this._communicationManager.connection.send(param1);
        }
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1 + "_xml");
            _loc3_ = castTo(_loc5_, XmlAsset);
            if (_loc5_ == null || _loc3_ == null) {
                return null;
            }
            _loc4_ = this._windowManager.buildFromXML(XML.from(_loc3_.content), param2);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboLandingView", "Failed to build window " + param1 + "_xml!");
            throw e;
        }
        return _loc4_;
    }

    public goToRoom(param1: string = null): void {
        if (param1 == null) {
            param1 = this.getProperty("landing.view.roomcategory");
        }
        if (param1 != null) {
            this.send(new ForwardToARandomPromotedRoomMessageComposer(param1));
        }
    }

    public getProductData(param1: string, param2: IProductDataListener): IProductData {
        if (this._sessionDataManager.loadProductData(param2)) {
            return this._sessionDataManager.getProductData(param1);
        }
        return null;
    }

    public requestBadge(param1: string): void {
        this.send(new RequestABadgeComposer(param1));
    }

    public communityGoalVote(param1: number): void {
        this.send(new CommunityGoalVoteMessageComposer(param1));
    }

    private isOnboardingRequired(param1: any[]): boolean {
        if (param1 == null) {
            return false;
        }
        if (this._SafeStr_7293) {
            return false;
        }
        return param1.indexOf(0) >= 0 || param1.indexOf(1) >= 0;
    }

    private onNavigatorSettings(param1: NavigatorSettingsEvent): void {
        if (param1.getParser().roomIdToEnter <= 0) {
            this.tryInitialize();
        }
    }

    private tryInitialize(): void {
        this._errorLayout = this.getXmlWindow("initialization_error");
        this._errorLayout.visible = false;
        try {
            this.initialize();
            castGuarded(this._errorLayout.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._errorLayout);
        } catch (e) {
            ErrorReportStorage.addDebugData("HabboLandingView", "Landing view layout initialization failed!");
            this._landingViewLayout.dispose();
            this._landingViewLayout = null;
            this.windowManager.getDesktop(0).addChild(this._errorLayout);
            this._errorLayout.center();
            this._errorLayout.visible = true;
            this.context.root.error(e.message + " Landing view initialization failed because of a Flash Error. Landing view removed and disposed!", false, (e.errorID ?? 0), e);
        }
    }

    private onAvatarRendererReady(param1: Event = null): void {
        if (this.isOnboardingRequired(this._communicationManager.suggestedLoginActions)) {
            this._SafeStr_2553 = new OnBoardingHcFlow(this._avatarRenderManager, this._localizationManager, this._communicationManager);
            this._SafeStr_2553.addEventListener("NewUserFlowFinished", this.onNewUserReceptionFinished);
            this._SafeStr_2553.setHcVisibility(false);
            this.context.displayObjectContainer.addChild(this._SafeStr_2553);
            this._SafeStr_2553.init(this._communicationManager.suggestedLoginActions);
        }
    }

    private onToolbarClick(param1: HabboToolbarEvent): void {
        switch (param1.iconId) {
            case "HTIE_ICON_RECEPTION":
                if (this._roomSessionManager.getSession(-1)) {
                    this.send(new QuitMessageComposer());
                    this._roomSessionManager.disposeSession(-1);
                }
                break;
            case "HTIE_ICON_GAMES":
                if (this.getBoolean("game.center.enabled")) {
                    this.disable();
                }
        }
    }

    private onExpiredLinkClick(param1: CatalogEvent): void {
        if (this._isInitialized && this._landingViewLayout != null && this._landingViewLayout.window != null && Boolean(this._landingViewLayout.window.visible)) {
            this.activate();
        }
    }

    private onNewUserReceptionFinished(param1: Event): void {
        this._SafeStr_7293 = true;
        if (this._SafeStr_2553) {
            this._SafeStr_2553.dispose();
            this._SafeStr_2553 = null;
        }
        this._communicationManager.suggestedLoginActions = [];
        this.activate();
    }

    protected override initInstanceFields(): void {
        this.onNavigatorSettings = this.onNavigatorSettings.bind(this);
        this.onAvatarRendererReady = this.onAvatarRendererReady.bind(this);
        this.onToolbarClick = this.onToolbarClick.bind(this);
        this.onExpiredLinkClick = this.onExpiredLinkClick.bind(this);
        this.onNewUserReceptionFinished = this.onNewUserReceptionFinished.bind(this);
        this._isInitialized = false;
        this._SafeStr_7293 = false;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboLandingView.#staticsReady) return;
        HabboLandingView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboLandingView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendbar.landingview.HabboLandingView"));
    }

    get [IHabboLandingView](): true {
        return true;
    }
}
